import { Card, Col, Flex, Row, Tag } from 'antd';
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
                        const status = tableStatus[item] ?? "EMPTY";
                        const styleCard = statusToColor(status);
                        const isActive = item === selectedTable;

                        return (
                              <Col
                                    key={i}
                                    xs={12}   // موبایل: 2 تا در هر ردیف
                                    sm={8}    // تبلت: 3 تا در هر ردیف
                                    md={6}    // لپتاپ کوچیک: 4 تا در هر ردیف
                                    lg={4}    // دسکتاپ: دقیقاً 6 تا در هر ردیف ✅
                                    xl={4}    // بزرگ‌تر هم 6 تا ✅
                                    xxl={4}   // خیلی بزرگ هم 6 تا ✅
                              >
                                    <Card
                                          hoverable
                                          variant="borderless"
                                          onClick={() => openTableModal(item, tableSeatCount[item])}
                                          style={{
                                                background: isActive ? "#2ECC71" : styleCard.bg,
                                                color: isActive ? "white" : styleCard.color,
                                          }}
                                          className="h-30 flex flex-col items-center justify-center cursor-pointer"
                                    >
                                          <Flex vertical gap={8}>
                                                <Flex vertical justify="space-between" align="center">
                                                      <span style={{ fontWeight: 700, fontSize: 26 }}>{item}</span>
                                                      <Tag variant="outlined" color={styleCard.tag} style={{ margin: 0 }}>
                                                            {styleCard.label}
                                                      </Tag>
                                                </Flex>
                                          </Flex>
                                    </Card>
                              </Col>
                        );
                  })}
            </Row>

      )
}

export default GridTable