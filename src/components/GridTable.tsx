import { Card, Col, Row } from 'antd';
import React from 'react'
import { tableItems, tableSeatCount } from '../lib/constants';
import { StatusTable } from '../types';

export type GridTableProps = {
      tableStatus: Record<string, StatusTable>;
      statusToColor: (s: StatusTable) => Record<string, string>
      selectedTable: string | null;
      openTableModal: (tableName: string, seatCount: number) => void;
}

const GridTable: React.FC<GridTableProps> = ({ tableStatus, statusToColor, selectedTable, openTableModal }) => {
      return (
            <Row gutter={[16, 24]}>
                  {tableItems.map((item, i) => {
                        const status = tableStatus[i] ?? "EMPTY";
                        const styleCard = statusToColor(status);
                        const isActive = item.name === selectedTable;

                        return (
                              <Col key={i} xs={12}
                                    sm={8}
                                    md={6}
                                    lg={4}
                                    xl={4}
                                    xxl={4}
                              >
                                    <Card
                                          hoverable
                                          variant="borderless"
                                          onClick={() => openTableModal(item.name, tableSeatCount[item.name])}
                                          style={{
                                                background: isActive ? "#2ECC71" : styleCard.bg,
                                                color: isActive ? "white" : styleCard.color,
                                                overflow: "hidden",
                                          }}
                                          styles={{ body: { padding: 0, height: "100%" } }}
                                          className="h-30 cursor-pointer">
                                          <Row style={{ width: "100%", height: "100%", margin: 0 }}>
                                                <Col className={``} span={12} style={{ minHeight: "50%" }} />
                                                <Col className={``} span={12} style={{ minHeight: "50%" }} />
                                                <Col className={``} span={12} style={{ minHeight: "50%" }} />
                                                <Col className={``} span={12} style={{ minHeight: "50%" }} />
                                          </Row>
                                    </Card>
                              </Col>
                        );
                  })}
            </Row>

      )
}

export default GridTable
