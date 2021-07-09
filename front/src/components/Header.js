import { Layout, Menu } from 'antd'
import { useSelector } from 'react-redux'

const { Header } = Layout

function MyHeader() {
    const theme = useSelector((state) => state.theme.theme)

    return <>
        <Header className="header">
            <div className="logo" />
            <Menu theme={theme} mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
        </Header> 
    </>
}

export default MyHeader