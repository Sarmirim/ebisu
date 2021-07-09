import { Layout, Menu, Button, notification } from 'antd'
import { UserOutlined, } from '@ant-design/icons'
// import { LaptopOutlined, NotificationOutlined } from '@ant-design/icons'
import { RenderLineChart } from './Charts'
import { CoinCard } from './Cards'
import { SearchInput } from './ETC'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

const { SubMenu } = Menu
const { Content, Sider } = Layout

function Body() {
    const dispatch = useDispatch()
    const coin = useSelector(state => state.coin)

    const showNot = () =>  notification.info({
        message: `Symbol = ${coin.Symbol || "empty"}`,
        description: `Price = ${coin.Price || "empty"}`,
    })

    const newData = () => {
        const payload = [{xAxis: new Date().toLocaleTimeString('ru-RU'), price: Math.round(Math.random() * 1000)}]
        dispatch({type: "dots/newData", payload: payload})
    }

    const clearChart = () => {
        dispatch({type: "dots/clearArray"})
    }

    return(
    <Layout>
        <Sider width={200} className="site-layout-background">
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
            >
                <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                    <Menu.Item key="1">option1</Menu.Item>
                    {/* <Menu.Item key="2">option2</Menu.Item>
                    <Menu.Item key="3">option3</Menu.Item>
                    <Menu.Item key="4">option4</Menu.Item> */}
                </SubMenu>
                {/* <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                    <Menu.Item key="5">option5</Menu.Item>
                    <Menu.Item key="6">option6</Menu.Item>
                    <Menu.Item key="7">option7</Menu.Item>
                    <Menu.Item key="8">option8</Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                    <Menu.Item key="9">option9</Menu.Item>
                    <Menu.Item key="10">option10</Menu.Item>
                    <Menu.Item key="11">option11</Menu.Item>
                    <Menu.Item key="12">option12</Menu.Item>
                </SubMenu> */}
            </Menu>
        </Sider>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial', backgroundColor: '#ffffff' }}>
            <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>CONTENT</div>
            <CoinCard />
            <SearchInput />
            <Button type="primary" onClick={() => showNot()}>Notification</Button>
            <Button type="primary" onClick={() => newData()}>Random Data</Button>
            <Button type="primary" onClick={() => clearChart()}>Clear Chart</Button>
            <RenderLineChart />
        </Content>
    </Layout>
    )
}

export default Body