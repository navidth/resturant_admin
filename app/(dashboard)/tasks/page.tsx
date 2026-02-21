"use client";

import { useMemo, useState } from "react";
import {
  Button,
  Card,
  Col,
  Input,
  List,
  Row,
  Select,
  Space,
  Tag,
  Typography,
  message,
} from "antd";

const { Title, Text } = Typography;

type TaskStatus = "PENDING" | "IN_PROGRESS" | "DONE";
type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

type Task = {
  id: string;
  title: string;
  table: string;
  status: TaskStatus;
  assignedWaiter: string;
  etaMinutes: number;
  priority: TaskPriority;
  createdAt: string;
};

const mockTasks: Task[] = [
  {
    id: "TSK-101",
    title: "Deliver meal to A2",
    table: "A2",
    status: "IN_PROGRESS",
    assignedWaiter: "Robot-3",
    etaMinutes: 4,
    priority: "HIGH",
    createdAt: "2026-02-21 12:10",
  },
  {
    id: "TSK-102",
    title: "Deliver bill to B4",
    table: "B4",
    status: "PENDING",
    assignedWaiter: "Robot-1",
    etaMinutes: 7,
    priority: "MEDIUM",
    createdAt: "2026-02-21 12:14",
  },
  {
    id: "TSK-103",
    title: "Pickup dishes from C1",
    table: "C1",
    status: "DONE",
    assignedWaiter: "Robot-2",
    etaMinutes: 0,
    priority: "LOW",
    createdAt: "2026-02-21 11:52",
  },
  {
    id: "TSK-104",
    title: "Deliver drink to D2",
    table: "D2",
    status: "PENDING",
    assignedWaiter: "Robot-4",
    etaMinutes: 5,
    priority: "HIGH",
    createdAt: "2026-02-21 12:18",
  },
];

const priorityRank: Record<TaskPriority, number> = { HIGH: 0, MEDIUM: 1, LOW: 2 };
const statusColor: Record<TaskStatus, string> = {
  PENDING: "gold",
  IN_PROGRESS: "blue",
  DONE: "green",
};
const priorityColor: Record<TaskPriority, string> = {
  LOW: "default",
  MEDIUM: "orange",
  HIGH: "red",
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [selectedTaskId, setSelectedTaskId] = useState<string>(mockTasks[0].id);
  const [filterStatus, setFilterStatus] = useState<"ALL" | TaskStatus>("ALL");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"priority" | "eta" | "latest">("priority");
  const [newAssignee, setNewAssignee] = useState<string>("Robot-1");

  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();
    const output = tasks.filter((task) => {
      const statusOk = filterStatus === "ALL" ? true : task.status === filterStatus;
      const searchOk =
        query.length === 0
          ? true
          : task.id.toLowerCase().includes(query) ||
            task.title.toLowerCase().includes(query) ||
            task.table.toLowerCase().includes(query);
      return statusOk && searchOk;
    });

    return output.sort((a, b) => {
      if (sortBy === "priority") return priorityRank[a.priority] - priorityRank[b.priority];
      if (sortBy === "eta") return a.etaMinutes - b.etaMinutes;
      return b.createdAt.localeCompare(a.createdAt);
    });
  }, [tasks, filterStatus, search, sortBy]);

  const selectedTask =
    filteredTasks.find((task) => task.id === selectedTaskId) ?? filteredTasks[0] ?? null;

  const onReassign = () => {
    if (!selectedTask) return;
    setTasks((prev) =>
      prev.map((task) =>
        task.id === selectedTask.id ? { ...task, assignedWaiter: newAssignee } : task
      )
    );
    message.success(`Task ${selectedTask.id} reassigned to ${newAssignee}`);
  };

  return (
    <div style={{ padding: 24 }}>
      <Space direction="vertical" size={16} style={{ width: "100%" }}>
        <Card>
          <Row gutter={[12, 12]} align="middle">
            <Col xs={24} md={8}>
              <Select
                style={{ width: "100%" }}
                value={filterStatus}
                onChange={setFilterStatus}
                options={[
                  { label: "All Status", value: "ALL" },
                  { label: "Pending", value: "PENDING" },
                  { label: "In Progress", value: "IN_PROGRESS" },
                  { label: "Done", value: "DONE" },
                ]}
              />
            </Col>
            <Col xs={24} md={10}>
              <Input.Search
                placeholder="Search by task id, title, table"
                allowClear
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>
            <Col xs={24} md={6}>
              <Select
                style={{ width: "100%" }}
                value={sortBy}
                onChange={setSortBy}
                options={[
                  { label: "Sort: Priority", value: "priority" },
                  { label: "Sort: ETA", value: "eta" },
                  { label: "Sort: Latest", value: "latest" },
                ]}
              />
            </Col>
          </Row>
        </Card>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={14}>
            <Card title="TaskList">
              <List
                dataSource={filteredTasks}
                locale={{ emptyText: "No tasks found" }}
                renderItem={(task) => (
                  <List.Item
                    onClick={() => setSelectedTaskId(task.id)}
                    style={{
                      cursor: "pointer",
                      paddingInline: 12,
                      borderRadius: 10,
                      marginBottom: 8,
                      border: task.id === selectedTask?.id ? "1px solid #1677ff" : "1px solid #f0f0f0",
                      background: task.id === selectedTask?.id ? "#f0f7ff" : "white",
                    }}
                  >
                    <Space direction="vertical" size={2} style={{ width: "100%" }}>
                      <Space style={{ width: "100%", justifyContent: "space-between" }}>
                        <Text strong>{task.title}</Text>
                        <Tag color={statusColor[task.status]}>{task.status}</Tag>
                      </Space>
                      <Space style={{ width: "100%", justifyContent: "space-between" }}>
                        <Text type="secondary">{task.id}</Text>
                        <Tag color={priorityColor[task.priority]}>{task.priority}</Tag>
                      </Space>
                    </Space>
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          <Col xs={24} lg={10}>
            <Card title="TaskDetailsPanel">
              {selectedTask ? (
                <Space direction="vertical" size={14} style={{ width: "100%" }}>
                  <div>
                    <Text type="secondary">TaskInfo</Text>
                    <Title level={5} style={{ margin: "4px 0 0" }}>
                      {selectedTask.title}
                    </Title>
                    <Text>{selectedTask.id}</Text>
                  </div>

                  <div>
                    <Text type="secondary">AssignedWaiter</Text>
                    <div>
                      <Tag color="cyan">{selectedTask.assignedWaiter}</Tag>
                    </div>
                  </div>

                  <div>
                    <Text type="secondary">ETA</Text>
                    <div>
                      <Text strong>{selectedTask.etaMinutes} min</Text>
                    </div>
                  </div>

                  <div>
                    <Text type="secondary">Priority</Text>
                    <div>
                      <Tag color={priorityColor[selectedTask.priority]}>{selectedTask.priority}</Tag>
                    </div>
                  </div>

                  <Space.Compact style={{ width: "100%" }}>
                    <Select
                      style={{ width: "70%" }}
                      value={newAssignee}
                      onChange={setNewAssignee}
                      options={[
                        { value: "Robot-1", label: "Robot-1" },
                        { value: "Robot-2", label: "Robot-2" },
                        { value: "Robot-3", label: "Robot-3" },
                        { value: "Robot-4", label: "Robot-4" },
                      ]}
                    />
                    <Button type="primary" style={{ width: "30%" }} onClick={onReassign}>
                      Reassign
                    </Button>
                  </Space.Compact>
                </Space>
              ) : (
                <Text type="secondary">Task row را انتخاب کنید.</Text>
              )}
            </Card>
          </Col>
        </Row>
      </Space>
    </div>
  );
}
