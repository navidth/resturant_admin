import { Spin } from "antd"
const contentStyle: React.CSSProperties = {
      padding: 50,
      background: 'rgba(0, 0, 0, 0.05)',
      borderRadius: 4,
};

const content = <div style={contentStyle} />;
const Loading = () => {
      return (
            <div className='absolute top-0 left-0 w-screen h-screen bg-white flex items-center justify-center '>
                  <Spin tip="Loading" size="large">
                        {content}
                  </Spin>
            </div>
      )
}

export default Loading
