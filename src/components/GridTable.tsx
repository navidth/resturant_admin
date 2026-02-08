import { Card, Flex, Tag } from 'antd';
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
            <Flex wrap align='center' gap="middle">
                  {tableItems && tableItems.map((item, i) => {
                        const status = tableStatus[item] ?? "EMPTY";
                        const styleCard = statusToColor(status);
                        const isActive = item === selectedTable;

                        return (
                              <Card
                                    hoverable
                                    key={i}
                                    variant="borderless"
                                    onClick={() => openTableModal(item, tableSeatCount[item])}
                                    style={{ background: isActive ? "#2ECC71" : styleCard.bg }} className={`w-44 h-44 flex flex-col items-center justify-center cursor-pointer`} >
                                    <Flex vertical gap={8}>
                                          <Flex vertical justify="space-between" align="center">
                                                <span style={{ fontWeight: 700, fontSize: 18 }}>{item}</span>
                                                <Tag variant='outlined' color={styleCard.tag} style={{ margin: 0 }}>
                                                      {styleCard.label}
                                                </Tag>
                                          </Flex>

                                          <span style={{ fontSize: 12, opacity: 0.7 }}>
                                                {isActive ? "Selected" : "Click to open"}
                                          </span>
                                    </Flex>
                              </Card>
                        )
                  })}
            </Flex>
      )
}

export default GridTable