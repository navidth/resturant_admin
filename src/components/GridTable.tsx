import { Card, Col, Row } from "antd";
import React from "react";
import { arrowPosList, tableItems, tableSeatCount } from "../lib/constants";
import { StatusTable } from "../types";
import { ArrowPos, SeatStatus } from "../stores/slices/cardSlice";
import SideArrow from "./SideArrow";

export type GridTableProps = {
      tableStatus: Record<string, StatusTable>;
      seatsByTable: Record<string, SeatStatus[]>;
      arrowsByTable: Record<string, SeatStatus[]>;
      statusToColor: (s: StatusTable) => Record<string, string>;
      selectedTable: string | null;
      draftArrows: SeatStatus[];
      openTableModal: (tableName: string, seatCount: number) => void;
};

const seatStatusToColor = (seatStatus: SeatStatus) => {
      switch (seatStatus) {
            case "NEW_GUEST":
                  return "#ae55d5";
            case "OCCUPIED":
                  return "#4be58c";
            case "WAITING":
                  return "#efcc3f";
            case "DELIVER":
                  return "#4c8ae1";
            case "EMPTY":
            default:
                  return "transparent";
      }
};

const GridTable: React.FC<GridTableProps> = ({
      tableStatus,
      seatsByTable,
      arrowsByTable,
      statusToColor,
      selectedTable,
      draftArrows,
      openTableModal,
}) => {
      const map: Record<ArrowPos, React.CSSProperties> = {
            top: { top: -6, left: "50%", transform: "translateX(-50%) rotate(0deg)" },
            bottom: { bottom: -6, left: "50%", transform: "translateX(-50%) rotate(180deg)" },
            left: { left: -6, top: "50%", transform: "translateY(-50%) rotate(-90deg)" },
            right: { right: -6, top: "50%", transform: "translateY(-50%) rotate(90deg)" },
            topLeft: { top: -6, left: -6, transform: "rotate(320deg)" },
            topRight: { top: -6, right: -6, transform: "rotate(50deg)" },
            bottomLeft: { bottom: -6, left: -6, transform: "rotate(220deg)" },
            bottomRight: { bottom: -6, right: -6, transform: "rotate(140deg)" },
      };
      return (
            <Row gutter={[16, 24]}>
                  {tableItems.map((item, i) => {
                        const status = tableStatus[item.name] ?? "EMPTY";
                        const styleCard = statusToColor(status);
                        const isActive = item.name === selectedTable;
                        const fourSeatTable = item.seat === 4;
                        const arrowsToRender: ArrowPos[] = fourSeatTable
                              ? ["top", "bottom", ...arrowPosList]
                              : [...arrowPosList];
                        const seats =
                              seatsByTable[item.name] ??
                              Array.from({ length: item.seat }, () => "EMPTY" as const);
                        const savedArrows =
                              arrowsByTable[item.name] ??
                              Array.from({ length: arrowsToRender.length }, () => "EMPTY" as const);
                        const currentArrows = isActive && draftArrows.length > 0 ? draftArrows : savedArrows;

                        return (
                              <Col key={i} xs={12} sm={8} md={6} lg={4} xl={4} xxl={4}>
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
                                          className="h-30 cursor-pointer relative "
                                    >
                                          <p className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] z-10 font-bold text-2xl">
                                                {item.name}
                                          </p>
                                          {arrowsToRender.map((arrow, i) => (
                                                <SideArrow
                                                      size={42}
                                                      key={i}
                                                      map={map}
                                                      pos={arrow}
                                                      status={currentArrows[i] ?? "EMPTY"}
                                                      hideWhenEmpty
                                                />
                                          ))}
                                          <Row style={{ width: "100%", height: "100%", margin: 0 }}>
                                                {[...Array(item.seat)].map((_, seatIndex) => {
                                                      const seatColor = seatStatusToColor(
                                                            seats[seatIndex] ?? "EMPTY"
                                                      );
                                                      return (
                                                            <Col
                                                                  key={seatIndex}
                                                                  span={item.name.includes("G") ? 24 : 12}
                                                                  style={{
                                                                        minHeight: "50%",
                                                                        background: seatColor,
                                                                        opacity: seatColor === "transparent" ? 1 : 0.9,
                                                                  }}
                                                            />
                                                      );
                                                })}
                                          </Row>
                                    </Card>
                              </Col>
                        );
                  })}
            </Row>
      );
};

export default GridTable;
