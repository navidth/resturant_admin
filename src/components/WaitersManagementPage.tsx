"use client"
import { useMemo, useState } from "react";
import type { ProgressProps } from "antd";
import {
      Card,
      Row,
      Col,
      Space,
      Typography,
      Avatar,
      Badge,
      Tag,
      Progress,
      Switch,
      Popover,
      Button,
      Divider,
      Descriptions,
      message,
} from "antd";
import {
      MoreOutlined,
      PlusOutlined,
      ReloadOutlined,
      RobotOutlined,
      ThunderboltOutlined,
      WarningOutlined,
} from "@ant-design/icons";
const { Text, Title } = Typography;

type RobotError = {
      hasError: boolean;
      code: string;
      text: string;
};

type Robot = {
      id: string;
      name: string;
      logoUrl: string;
      isOn: boolean;
      error: RobotError;
      battery: number;
      workStatus: string;
      distanceTodayKm: number;
      distanceTotalKm: number;
      tasksToday: number;
      tasksTotal: number;
      lastService: string;
      nextService: string;
};

const mockRobots = Array.from({ length: 14 }).map((_, i) => ({
      id: `RB-${100 + i}`,
      name: `Robot ${i + 1}`,
      logoUrl: "/images/robot-img.jpeg",
      isOn: i % 4 !== 0,
      error: i % 6 === 0 ? { hasError: true, code: "E-204", text: "Lidar blocked" } : { hasError: false, code: "", text: "OK" },
      battery: Math.max(10, 100 - i * 6),
      workStatus:
            i % 5 === 0
                  ? "idle"
                  : i % 2 === 0
                        ? "meal deliver to A1-2"
                        : "Bill delivery to R3-1",
      distanceTodayKm: +(Math.random() * 6).toFixed(1),
      distanceTotalKm: +(120 + Math.random() * 900).toFixed(1),
      tasksToday: Math.floor(Math.random() * 25),
      tasksTotal: 200 + Math.floor(Math.random() * 1200),
      lastService: "2026-01-22",
      nextService: "2026-03-01",
}));

function statusTag(workStatus: string) {
      if (workStatus === "idle") return <Tag color="default">idle</Tag>;
      if (workStatus.toLowerCase().includes("meal")) return <Tag color="blue">Delivering Meal</Tag>;
      if (workStatus.toLowerCase().includes("bill")) return <Tag color="purple">Delivering Bill</Tag>;
      return <Tag>working</Tag>;
}

function batteryStatusColor(battery: number): ProgressProps["status"] {
      if (battery <= 20) return "exception";
      if (battery <= 50) return "normal";
      return "success";
}

type RobotMorePopoverProps = {
      robot: Robot;
      onReset: (id: string) => void;
};

function RobotMorePopover({ robot, onReset }: RobotMorePopoverProps) {
      return (
            <div style={{ width: 260 }}>
                  <Space direction="vertical" size={10} style={{ width: "100%" }}>
                        <Button
                              icon={<ReloadOutlined />}
                              block
                              onClick={() => onReset(robot.id)}
                        >
                              Reset timer & counters
                        </Button>

                        <Divider style={{ margin: "6px 0" }} />

                        <Descriptions size="small" column={1} bordered>
                              <Descriptions.Item label="Last service">
                                    {robot.lastService}
                              </Descriptions.Item>
                              <Descriptions.Item label="Next service">
                                    {robot.nextService}
                              </Descriptions.Item>
                        </Descriptions>
                  </Space>
            </div>
      );
}

type RobotCardProps = {
      robot: Robot;
      onTogglePower: (id: string, isOn: boolean) => void;
      onReset: (id: string) => void;
};

function RobotCard({ robot, onTogglePower, onReset }: RobotCardProps) {
      const hasError = robot.error?.hasError;

      return (
            <Card
                  hoverable
                  style={{
                        borderRadius: 22,
                        border: "1px solid #d9e4f5",
                        boxShadow: "0 14px 34px rgba(15, 43, 77, 0.12)",
                        overflow: "hidden",
                  }}
                  styles={{
                        header: {
                              background: "linear-gradient(135deg, #eef5ff 0%, #f7fbff 100%)",
                              borderBottom: "1px solid #d9e4f5",
                              padding: "12px 16px",
                        },
                        body: { padding: 18 },
                  }}
                  title={
                        <Space size={12}>
                              <Avatar
                                    size={74}
                                    shape="square"
                                    src={robot.logoUrl || undefined}
                                    icon={!robot.logoUrl ? <RobotOutlined /> : undefined}
                                    style={{ borderRadius: 18, border: "2px solid #ffffff" }}
                              />
                              <div style={{ lineHeight: 1.2 }}>
                                    <Text strong style={{ fontSize: 16 }}>{robot.name}</Text>
                                    <br />
                                    <Text type="secondary" style={{ fontSize: 13 }}>{robot.id}</Text>
                              </div>
                        </Space>
                  }
                  extra={
                        <Space>
                              <Popover
                                    trigger="click"
                                    placement="bottomRight"
                                    content={<RobotMorePopover robot={robot} onReset={onReset} />}
                              >
                                    <Button shape="circle" icon={<MoreOutlined />} />
                              </Popover>
                        </Space>
                  }
            >
                  <Space direction="vertical" size={12} style={{ width: "100%" }}>
                        {/* Power + Error */}
                        <Row justify="space-between" align="middle">
                              <Col>
                                    <Space>
                                          <ThunderboltOutlined />
                                          <Text>Power</Text>
                                    </Space>
                              </Col>

                              <Col>
                                    <Space>
                                          <Switch
                                                checked={robot.isOn}
                                                onChange={(checked) => onTogglePower(robot.id, checked)}
                                          />
                                          <Badge
                                                status={robot.isOn ? "success" : "default"}
                                                text={robot.isOn ? "ON" : "OFF"}
                                          />
                                    </Space>
                              </Col>
                        </Row>

                        <Row justify="space-between" align="middle">
                              <Col>
                                    <Space>
                                          <WarningOutlined />
                                          <Text>Error</Text>
                                    </Space>
                              </Col>
                              <Col>
                                    {hasError ? (
                                          <Tag color="red">{robot.error.code}</Tag>
                                    ) : (
                                          <Tag color="green">OK</Tag>
                                    )}
                              </Col>
                        </Row>

                        {hasError && (
                              <Text type="danger" style={{ fontSize: 12 }}>
                                    {robot.error.text}
                              </Text>
                        )}

                        {/* Battery */}
                        <div>
                              <Row justify="space-between" align="middle" style={{ marginBottom: 6 }}>
                                    <Col><Text>Battery</Text></Col>
                                    <Col><Text strong>{robot.battery}%</Text></Col>
                              </Row>
                              <Progress
                                    percent={robot.battery}
                                    status={batteryStatusColor(robot.battery)}
                                    showInfo={false}
                              />
                        </div>

                        {/* Work status */}
                        <Row justify="space-between" align="middle">
                              <Col><Text>Work status</Text></Col>
                              <Col>
                                    <Space size={6}>
                                          {statusTag(robot.workStatus)}
                                    </Space>
                              </Col>
                        </Row>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                              {robot.workStatus}
                        </Text>

                        <Divider style={{ margin: "6px 0" }} />

                        {/* Metrics */}
                        <Row gutter={[10, 10]}>
                              <Col span={12}>
                                    <Text type="secondary" style={{ fontSize: 12 }}>Distance today</Text>
                                    <div><Text strong>{robot.distanceTodayKm} km</Text></div>
                              </Col>
                              <Col span={12}>
                                    <Text type="secondary" style={{ fontSize: 12 }}>Distance total</Text>
                                    <div><Text strong>{robot.distanceTotalKm} km</Text></div>
                              </Col>
                              <Col span={12}>
                                    <Text type="secondary" style={{ fontSize: 12 }}>Tasks today</Text>
                                    <div><Text strong>{robot.tasksToday}</Text></div>
                              </Col>
                              <Col span={12}>
                                    <Text type="secondary" style={{ fontSize: 12 }}>Tasks total</Text>
                                    <div><Text strong>{robot.tasksTotal}</Text></div>
                              </Col>
                        </Row>
                  </Space>
            </Card>
      );
}

export default function RobotsPage() {
      const [robots, setRobots] = useState<Robot[]>(mockRobots);
      const onTogglePower = (id: string, isOn: boolean) => {
            setRobots((prev) => prev.map((r) => (r.id === id ? { ...r, isOn } : r)));
            message.success(`${id} power ${isOn ? "ON" : "OFF"}`);
      };

      const onReset = (id: string) => {
            setRobots((prev) =>
                  prev.map((r) =>
                        r.id === id
                              ? { ...r, distanceTodayKm: 0, tasksToday: 0 }
                              : r
                  )
            );
            message.success(`Reset done for ${id}`);
      };

      const sortedRobots = useMemo(() => {
            // اگر خطا داشت بیاد بالا، بعد باتری کم، بعد بقیه
            return [...robots].sort((a, b) => {
                  const ae = a.error?.hasError ? 1 : 0;
                  const be = b.error?.hasError ? 1 : 0;
                  if (ae !== be) return be - ae;
                  return a.battery - b.battery;
            });
      }, [robots]);

      return (
            <div style={{ padding: 24, minHeight: "100vh" }}>
                  <Row align="middle" justify="space-between" style={{ marginBottom: 16 }}>
                        <Col>
                              <Title level={3} style={{ margin: 0 }}>
                                    Robots / Management
                              </Title>
                              <Text type="secondary">Cards update based on project & robot count</Text>
                        </Col>
                        <Col>
                              <Space wrap>
                                    {/* AddWaiterButton */}
                                    <Button type="primary" size="large" icon={<PlusOutlined />}>
                                          Add Robots
                                    </Button>
                              </Space>
                        </Col>
                  </Row>

                  {/* Grid */}
                  <Row gutter={[16, 16]}>
                        {sortedRobots.map((robot) => (
                              <Col key={robot.id} xs={24} sm={12} md={8} lg={6} xl={6}>
                                    <RobotCard
                                          robot={robot}
                                          onTogglePower={onTogglePower}
                                          onReset={onReset}
                                    />
                              </Col>
                        ))}
                  </Row>
            </div>
      );
}
