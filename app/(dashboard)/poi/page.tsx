"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  Space,
  Table,
  Tag,
  Typography,
  message,
} from "antd";
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

/* ================= MOCK DATA ================= */
const mockPoints: PoiPoint[] = [
  { code: "A1", name: "Table A1", x: 10, y: 5, yaw: 90 },
  { code: "A2", name: "Table A2", x: 12, y: 6, yaw: 180 },
  { code: "B1", name: "Table B1", x: 8, y: 3, yaw: 0 },
  { code: "B2", name: "Table B2", x: 7, y: 2, yaw: 45 },
  { code: "KITCHEN", name: "Kitchen", x: 2, y: 1, yaw: 0 },
];

/* ================= CONFIG ================= */
const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");
const LIST_ENDPOINT =
  process.env.NEXT_PUBLIC_POI_LIST_ENDPOINT || `${API_BASE}/api/poi`;
const UPDATE_ENDPOINT =
  process.env.NEXT_PUBLIC_POI_UPDATE_ENDPOINT ||
  `${API_BASE}/api/poi/update-coordinate`;

function toNumber(value?: number) {
  return typeof value === "number" ? value.toFixed(2) : "-";
}

export default function PoiPage() {
  const [points, setPoints] = useState<PoiPoint[]>([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [updatingCode, setUpdatingCode] = useState<string | null>(null);

  /* ===== kitchen states ===== */
  const [selectedKitchen, setSelectedKitchen] =
    useState<PoiPoint | null>(null);
  const [currentKitchen, setCurrentKitchen] =
    useState<PoiPoint | null>(null);
  const [savingKitchen, setSavingKitchen] = useState(false);

  /* ================= LOAD DATA ================= */
  const loadPoints = useCallback(async () => {
    setTableLoading(true);
    try {
      const { data } = await axios.get(LIST_ENDPOINT);
      const rows = Array.isArray(data) ? data : mockPoints;

      setPoints(rows.length ? rows : mockPoints);

      const kitchen = rows.find((p: PoiPoint) => p.code === "KITCHEN");
      if (kitchen) setCurrentKitchen(kitchen);
    } catch {
      setPoints(mockPoints);
      const kitchen = mockPoints.find((p) => p.code === "KITCHEN");
      if (kitchen) setCurrentKitchen(kitchen);
    } finally {
      setTableLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPoints();
  }, [loadPoints]);

  /* ================= UPDATE POINT ================= */
  const onUpdateCoordinate = async (point: PoiPoint) => {
    setUpdatingCode(point.code);
    try {
      await axios.post(UPDATE_ENDPOINT, { pointCode: point.code });
      message.success(`Updated ${point.code}`);
    } catch {
      message.error("Update failed");
    } finally {
      setUpdatingCode(null);
    }
  };

  /* ================= SAVE KITCHEN ================= */
  const onSaveKitchen = async () => {
    if (!selectedKitchen) {
      message.warning("Select a location");
      return;
    }

    setSavingKitchen(true);
    try {
      await axios.post(UPDATE_ENDPOINT, {
        pointCode: "KITCHEN",
        fromCode: selectedKitchen.code,
      });

      message.success("Kitchen updated");
      setCurrentKitchen(selectedKitchen);
    } catch {
      message.error("Save failed");
    } finally {
      setSavingKitchen(false);
    }
  };

  /* ================= MAIN TABLE ================= */
  const columns: ColumnsType<PoiPoint> = useMemo(
    () => [
      {
        title: "Code",
        dataIndex: "code",
        key: "code",
        render: (v: string) => <Text strong>{v}</Text>,
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "X",
        dataIndex: "x",
        render: toNumber,
      },
      {
        title: "Y",
        dataIndex: "y",
        render: toNumber,
      },
      {
        title: "Yaw",
        dataIndex: "yaw",
        render: toNumber,
      },
      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Button
            icon={<ReloadOutlined />}
            loading={updatingCode === record.code}
            onClick={() => onUpdateCoordinate(record)}
          >
            Update
          </Button>
        ),
      },
    ],
    [updatingCode]
  );

  /* ================= KITCHEN TABLE ================= */
  const kitchenColumns: ColumnsType<PoiPoint> = [
    {
      title: "Code",
      dataIndex: "code",
      render: (v) => <Text>{v}</Text>,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Select",
      render: (_, record) => (
        <Button
          type={
            selectedKitchen?.code === record.code ? "primary" : "default"
          }
          onClick={() => setSelectedKitchen(record)}
        >
          Select
        </Button>
      ),
    },
  ];

  /* ================= UI ================= */
  return (
    <div style={{ padding: 24 }}>
      <Space direction="vertical" size={20} style={{ width: "100%" }}>
        {/* ===== MAIN TABLE ===== */}
        <div>
          <Title level={3}>Point Management</Title>
        </div>

        <Table
          rowKey={(r) => r.code}
          dataSource={points}
          columns={columns}
          loading={tableLoading}
          pagination={false}
        />

        {/* ===== KITCHEN SECTION ===== */}
        <div>
          <Title level={3} style={{ marginTop: 40 }}>
            Kitchen Location
          </Title>
        </div>

        {/* CURRENT + SELECTED */}
        <Card>
          <Space direction="vertical" size={12}>
            <div>
              <Text strong>Current: </Text>
              {currentKitchen ? (
                <Tag color="green">
                  {currentKitchen.name} ({currentKitchen.code})
                </Tag>
              ) : (
                <Text type="secondary">Not set</Text>
              )}
            </div>

            <div>
              <Text strong>Selected: </Text>
              {selectedKitchen ? (
                <Tag color="blue">
                  {selectedKitchen.name} ({selectedKitchen.code})
                </Tag>
              ) : (
                <Text type="secondary">None</Text>
              )}
            </div>

            <Button
              type="primary"
              onClick={onSaveKitchen}
              loading={savingKitchen}
              disabled={!selectedKitchen}
            >
              Save Kitchen Location
            </Button>
          </Space>
        </Card>

        {/* SELECT TABLE */}
        <Card>
          <Table
            rowKey={(r) => r.code}
            dataSource={points.filter((p) => p.code !== "KITCHEN")}
            columns={kitchenColumns}
            loading={tableLoading}
            pagination={false}
          />
        </Card>
      </Space>
    </div>
  );
}