"use client";
import { Layout, theme } from 'antd';
import { StatusTable } from '../types';
import { useTableStore } from '../stores/slices/cardSlice';
import ModalTable from './ModalTable';
import HeaderDashboard from './HeaderDashboard';
import GridTable from './GridTable';
import { useTableOverviewStore } from '../stores/slices/tableOverview';
import { useEffect } from 'react';
import apiCall from "@/src/lib/services/axiosInstance";
import axios from 'axios';
import QueueList from './QueueList';
const { Content, Sider } = Layout;

function DashboardShell() {
      const {
            token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();

      const {
            isModalOpen,
            selectedTable,
            tableStatus,
            seatsByTable,
            arrowsByTable,
            draftArrows,
            openTableModal,
      } = useTableStore();
      const { isGrid, setIsGrid } = useTableOverviewStore()

      const statusToColor = (s: StatusTable) => {
            switch (s) {
                  case "EMPTY":
                        return { bg: "#d4d2d2", border: "#d4d2d2", tag: "success", label: "EMPTY", color: "black" };
                  case "OCCUPIED":
                        return { bg: "#2ab464", border: "#2ECC71", tag: "processing", label: "OCCUPIED", color: "white" };
            }
      };

      // useEffect(() => {
      //       const apiCalls = async () => {
      //             try {
      //                   const res = await axios.get(
      //                         `${process.env.NEXT_PUBLIC_API_URL}/dashboard/overview`,
      //                         {
      //                               headers: {
      //                                     "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
      //                               }
      //                         });

      //                   return Response.json(res.data);
      //             } catch (error: any) {
      //                   return new Response(JSON.stringify(error.response?.data), {
      //                         status: error.response?.status || 500,
      //                   });
      //             }
      //       }
      //       apiCalls()
      // }, [])

      return (
            <>
                  {isModalOpen && <ModalTable />}
                  <Layout>
                        <HeaderDashboard isGrid={isGrid} setIsGrid={setIsGrid} />
                        <QueueList />
                        <Layout>
                              {/* <Sider width={350} style={{ background: colorBgContainer }}>
                              </Sider> */}

                              <Layout style={{ padding: '0 24px 24px' }}>
                                    <Content style={{
                                          padding: 24,
                                          margin: 0,
                                          minHeight: 280,
                                          background: colorBgContainer,
                                          borderRadius: borderRadiusLG,
                                    }}>
                                          {isGrid ? (
                                                <GridTable
                                                      tableStatus={tableStatus}
                                                      seatsByTable={seatsByTable}
                                                      statusToColor={statusToColor}
                                                      selectedTable={selectedTable}
                                                      openTableModal={openTableModal}
                                                      arrowsByTable={arrowsByTable}
                                                      draftArrows={draftArrows}
                                                />
                                          ) : null}
                                    </Content>
                              </Layout>
                        </Layout>
                  </Layout>
            </>
      );
};

export default DashboardShell;
