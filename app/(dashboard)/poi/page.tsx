"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Button, Card, Space, Table, Tag, Typography, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ReloadOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

type PoiPoint = {
  id?: string;
  code: string;
  name?: string;
  x?: number;
  y?: number;
  yaw?: number;
  updatedAt?: string;
};

const mockPoints: PoiPoint[] = [
  { code: "A2T2F", name: "Table A2 / Stop", x: 12.2, y: 5.4, yaw: 90, updatedAt: "2026-02-20T10:33:00Z" },
  { code: "B1T1F", name: "Table B1 / Stop", x: 9.6, y: 3.1, yaw: 180, updatedAt: "2026-02-20T10:20:00Z" },
  { code: "KITCHEN", name: "Kitchen", x: 2.1, y: 0.8, yaw: 0, updatedAt: "2026-02-20T09:59:00Z" },
];

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");
const LIST_ENDPOINT = process.env.NEXT_PUBLIC_POI_LIST_ENDPOINT || `${API_BASE}/api/poi`;
const UPDATE_ENDPOINT =
  process.env.NEXT_PUBLIC_POI_UPDATE_ENDPOINT || `${API_BASE}/api/poi/update-coordinate`;

function normalizePoints(payload: unknown): PoiPoint[] {
  if (Array.isArray(payload)) return payload as PoiPoint[];
  if (payload && typeof payload === "object" && "items" in payload) {
    const maybeItems = (payload as { items?: unknown }).items;
    if (Array.isArray(maybeItems)) return maybeItems as PoiPoint[];
  }
  return [];
}

function toNumber(value: number | undefined) {
  if (typeof value !== "number") return "-";
  return value.toFixed(2);
}

export default function PoiPage() {
  const [points, setPoints] = useState<PoiPoint[]>([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [updatingCode, setUpdatingCode] = useState<string | null>(null);

  const loadPoints = useCallback(async (silent = false) => {
    if (!silent) setTableLoading(true);
    try {
      const { data } = await axios.get(LIST_ENDPOINT);
      const rows = normalizePoints(data);
      setPoints(rows.length > 0 ? rows : mockPoints);
    } catch {
      setPoints(mockPoints);

    } finally {
      if (!silent) setTableLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPoints();
  }, [loadPoints]);

  const onUpdateCoordinate = useCallback(
    async (point: PoiPoint) => {
      setUpdatingCode(point.code);
      try {
        await axios.post(UPDATE_ENDPOINT, { pointCode: point.code });
        message.success(`مختصات نقطه ${point.code} آپدیت شد.`);
        await loadPoints(true);
      } catch (error) {
        const errMsg =
          axios.isAxiosError(error) && error.response?.data?.message
            ? String(error.response.data.message)
            : `آپدیت مختصات ${point.code} انجام نشد.`;
      } finally {
        setUpdatingCode(null);
      }
    },
    [loadPoints]
  );

  const columns: ColumnsType<PoiPoint> = useMemo(
    () => [
      {
        title: "Point Code",
        dataIndex: "code",
        key: "code",
        render: (value: string) => <Text strong>{value}</Text>,
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (value?: string) => value || "-",
      },
      {
        title: "X",
        dataIndex: "x",
        key: "x",
        width: 120,
        render: (value?: number) => toNumber(value),
      },
      {
        title: "Y",
        dataIndex: "y",
        key: "y",
        width: 120,
        render: (value?: number) => toNumber(value),
      },
      {
        title: "Yaw",
        dataIndex: "yaw",
        key: "yaw",
        width: 120,
        render: (value?: number) => toNumber(value),
      },
      {
        title: "Last Update",
        dataIndex: "updatedAt",
        key: "updatedAt",
        render: (value?: string) => (value ? new Date(value).toLocaleString() : "-"),
      },
      {
        title: "Action",
        key: "action",
        width: 220,
        render: (_, record) => (
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            loading={updatingCode === record.code}
            onClick={() => onUpdateCoordinate(record)}
          >
            Update Coordinate
          </Button>
        ),
      },
    ],
    [onUpdateCoordinate, updatingCode]
  );

  return (
    <div style={{ padding: 24 }}>
      <Space direction="vertical" size={16} style={{ width: "100%" }}>
        <div>
          <Title level={3} style={{ marginBottom: 4 }}>
            POI Management
          </Title>
          <Text type="secondary">
            Move the robot to the desired point and press the Update Coordinate button in the same row.
          </Text>
        </div>

        <Card>
          <Space style={{ marginBottom: 12 }}>
            <Tag color="blue">Endpoint: {UPDATE_ENDPOINT}</Tag>
          </Space>
          <Table<PoiPoint>
            rowKey={(record) => record.id || record.code}
            dataSource={points}
            columns={columns}
            loading={tableLoading}
            pagination={false}
          />
        </Card>
      </Space>
    </div>
  );
}
