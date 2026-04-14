import { Header } from "antd/es/layout/layout";
import { useTableStore } from "../stores/slices/cardSlice";
import { Button, Divider, Flex, theme } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

const QueueList = () => {
      const {
            token: { colorBgContainer, borderRadiusLG, colorBgLayout },
      } = theme.useToken();
      const { tableStatus } = useTableStore();
      const listQueue = [
            {
                  id: 1,
                  task: "#164Lng-Test",
                  table: "P1"
            },
            {
                  id: 2,
                  task: "#165 1343",
                  table: "P1"
            }, {
                  id: 3,
                  task: "#164Deliver",
                  table: "A1"
            },
      ]


      return (
            <Header style={{ background: colorBgContainer, minHeight: "100px" }} className='mb-4 flex flex-row-reverse items-center justify-between  px-3! '>
                  {/* LIST NEXT QUEUE*/}
                  <Flex align='center' justify="center" gap="large">
                        <p className="font-semibold">
                              Next  Queue:
                        </p>
                        {listQueue && listQueue.map((item) => (
                              <Flex key={item.id} align='center' className='bg-[#f5f5f5] px-4! max-h-10 rounded-lg '  >
                                    <span className='mr-0.5'>
                                          {`${item.id})`} 
                                    </span>
                                    <span className='text-sm font-semibold'>
                                          {item.task}.
                                    </span>
                                    <span className='text-sm font-semibold'>
                                          {item.table}
                                    </span>
                              </Flex>
                        ))}
                        <Button type="link" color="primary" variant="solid" icon={<ArrowRightOutlined />} iconPlacement="end" className="h-10! ml-7! mr-4!" href="/tasks" >
                              All Tasks
                        </Button>
                  </Flex>
            </Header>
      )
}

export default QueueList