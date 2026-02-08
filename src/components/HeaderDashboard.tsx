import { Badge, Divider, Flex, Switch, theme } from 'antd'
import { Header } from 'antd/es/layout/layout'

type PropsHeaderDash = {
      isGrid: boolean,
      setIsGrid: (chekecd: boolean) => void
}

const HeaderDashboard: React.FC<PropsHeaderDash> = ({ isGrid, setIsGrid }) => {
      const {
            token: { colorBgContainer, borderRadiusLG, colorBgLayout },
      } = theme.useToken();
      return (
            <Header style={{ background: colorBgContainer, height: "100px" }} className='mb-4 flex items-center justify-between '>
                  <Flex align='center' gap="middle">
                        <h1 className='text-3xl'>Table Overview</h1>
                        <Switch checked={isGrid}
                              onChange={(checked) => setIsGrid(checked)} style={{ background: isGrid ? "#2ECC71" : "#9B59B6" }} checkedChildren="Grid" unCheckedChildren="Floor" />
                  </Flex>

                  <Flex align='stretch' gap="large">
                        <Flex vertical>
                              <Divider style={{ margin: 0, borderColor: "#D9D9D9" }} titlePlacement="center">Waiters</Divider>

                              <Flex align='center' gap="large" style={{ padding: "8px", height: "60px", background: colorBgLayout, borderRadius: borderRadiusLG }} >
                                    <Flex align='center' vertical >
                                          <span className='text-sm font-semibold'>Waiter1</span>
                                          <Badge showZero color="#20b85f" count={"Active"} />
                                    </Flex>
                                    <Flex align='center' vertical >
                                          <span className='text-sm font-semibold'>Waiter2</span>
                                          <Badge showZero color="#1F6EE0" count={"Busy"} />
                                    </Flex>
                              </Flex>
                        </Flex>
                        <Flex vertical  >
                              <Divider style={{ margin: 0, borderColor: "#D9D9D9" }} titlePlacement="center">Tables</Divider>
                              <Flex align='center' gap="middle" style={{ padding: "8px", height: "60px", background: colorBgLayout, borderRadius: borderRadiusLG }} >
                                    <Flex align='center' vertical >
                                          <Badge showZero color="#20b85f" count={12} />
                                          <span className='text-xs font-semibold'>Available</span>
                                    </Flex>
                                    <Flex align='center' vertical >
                                          <Badge showZero color="#9E9E9E" count={0} />
                                          <span className='text-xs font-semibold'>Occupied</span>
                                    </Flex>
                                    <Flex align='center' vertical >
                                          <Badge showZero color="#e3bb1b " content='Dirty' count={3} />
                                          <span className='text-xs font-semibold'>Done Soon</span>
                                    </Flex>
                                    <Flex align='center' vertical >
                                          <Badge showZero color="#1F6EE0" count={12} />
                                          <span className='text-xs font-semibold'>Reserved</span>
                                    </Flex>
                              </Flex>
                        </Flex>
                  </Flex>
            </Header>
      )
}

export default HeaderDashboard