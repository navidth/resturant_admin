import { Alert, Badge, Divider, Flex, Switch, theme } from 'antd'
import { Header } from 'antd/es/layout/layout'
import { tableItems } from '../lib/constants'
import { useTableStore } from '../stores/slices/cardSlice'

type PropsHeaderDash = {
      isGrid: boolean,
      setIsGrid: (chekecd: boolean) => void
}

const HeaderDashboard: React.FC<PropsHeaderDash> = ({ isGrid, setIsGrid }) => {
      const {
            token: { colorBgContainer, borderRadiusLG, colorBgLayout },
      } = theme.useToken();
      const { tableStatus } = useTableStore();




      return (
            <Header style={{ background: colorBgContainer, minHeight: "100px" }} className='flex items-center justify-between  px-3! '>
                  {/* header name section */}
                  <Flex vertical align='flex-start' justify='center' >
                        <Flex align='baseline' gap="middle" >
                              <h1 className='text-2xl! mb-0!'>Robot Management System</h1>
                              <Switch checked={isGrid}
                                    onChange={(checked) => setIsGrid(checked)} style={{ background: isGrid ? "#2ECC71" : "#9B59B6" }} checkedChildren="Grid" unCheckedChildren="Floor" />
                        </Flex>
                        <p className='mb-0! leading-5! '>
                              Tom Yum Tai Resturant-Dubai Outlet Mall
                        </p>
                  </Flex>
                  {/* status robots */}
                  <Flex align='stretch' gap="large">

                        <Flex align='center' gap="middle" style={{ padding: "8px", height: "60px", borderRadius: borderRadiusLG }} >
                              {/* STATUS ROBOTS */}
                              <Flex vertical>
                                    <Divider style={{ margin: 0, borderColor: "#D9D9D9" }} titlePlacement="center">Robots</Divider>
                                    <Flex align='center' gap="middle" style={{ padding: "8px", height: "60px", borderRadius: borderRadiusLG }} >
                                          <Flex align='center' className='bg-[#f5f5f5] py-4! px-4! min-h-[52px]! rounded-lg '  >
                                                <div className='w-2 h-2 bg-black/50 rounded-full relative -left-2'></div>
                                                <span className='text-sm font-semibold'>MR-01: </span>
                                                <span className='text-sm font-semibold'>1343/ Deliver Order</span>
                                          </Flex>
                                          <Flex align='center' className='bg-[#f5f5f5] py-4! px-6! rounded-lg '  >
                                                <div className='w-2 h-2 bg-black/50 rounded-full relative -left-2'></div>
                                                <span className='text-sm font-semibold'>MR-01: </span>
                                                <span className='text-sm font-semibold'>1343/ Deliver Order</span>
                                          </Flex>
                                    </Flex>
                              </Flex>
                              {/* ERROR ROBOTS */}
                              <Flex vertical>
                                    <Divider style={{ margin: 0, borderColor: "#D9D9D9" }} titlePlacement="center">Errors</Divider>
                                    <Flex align='center' gap="large" style={{ padding: "8px", height: "60px", borderRadius: borderRadiusLG }} >
                                          <Alert type="error" className='max-w-87.5 rounded-lg! min-w-50 min-h-[52px]!' title="MR-01:ERROR:API requast error" banner />
                                    </Flex>
                              </Flex>


                        </Flex>
                  </Flex>
            </Header>
      )
}

export default HeaderDashboard