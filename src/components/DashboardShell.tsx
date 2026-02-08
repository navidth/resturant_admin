"use client";
import React from 'react';
import { Layout, theme } from 'antd';
import { StatusTable } from '../types';
import { useTableStore } from '../stores/slices/cardSlice';
import ModalTable from './ModalTable';
import Navbar from './Navbar';
import HeaderDashboard from './HeaderDashboard';
import GridTable from './GridTable';
import { useTableOverviewStore } from '../stores/slices/tableOverview';

const { Content, Sider } = Layout;

function DashboardShell() {
      const {
            token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();

      const {
            isModalOpen,
            selectedTable,
            tableStatus,
            openTableModal,
      } = useTableStore();
      const { isGrid, setIsGrid } = useTableOverviewStore()

      const statusToColor = (s: StatusTable) => {
            switch (s) {
                  case "EMPTY":
                        return { bg: "#9E9E9E", border: "#9E9E9E", tag: "success", label: "EMPTY" };
                  case "OCCUPIED":
                        return { bg: "#2ECC71", border: "#2ECC71", tag: "processing", label: "OCCUPIED" };
            }
      };


      return (
            <>
                  {isModalOpen && <ModalTable />}
                  <Layout>
                        <Navbar />
                        <HeaderDashboard isGrid={isGrid} setIsGrid={setIsGrid} />
                        {/* <Breadcrumb
                                    items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
                                    style={{ margin: '16px 0' }}
                  /> */}
                        <Layout>
                              <Sider width={200} style={{ background: colorBgContainer }}>
                              </Sider>

                              <Layout style={{ padding: '0 24px 24px' }}>
                                    <Content style={{
                                          padding: 24,
                                          margin: 0,
                                          minHeight: 280,
                                          background: colorBgContainer,
                                          borderRadius: borderRadiusLG,
                                    }}>
                                          {isGrid ? (
                                                <GridTable tableStatus={tableStatus} statusToColor={statusToColor} selectedTable={selectedTable} openTableModal={openTableModal} />
                                          ) : null}
                                    </Content>
                              </Layout>
                        </Layout>
                  </Layout>
            </>
      );
};

export default DashboardShell;