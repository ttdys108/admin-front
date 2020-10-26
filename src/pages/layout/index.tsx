import React, {useState} from "react";
import {Layout, Menu, Row, Col, Button, Drawer, Tabs} from "antd";
import style from "./index.module.css";
import {HomeOutlined, UserOutlined, SettingOutlined, WindowsOutlined, MessageOutlined} from "@ant-design/icons";
import SideMenu, {MenuData} from "../../components/sidemenu";
import {isXScreen, screenWidth} from "../../utils/common";
import ResizeObserver from 'rc-resize-observer';
import FixedMenuBar from "../../components/fixedmenubar";

const {Content, Header, Sider} = Layout;
const { TabPane } = Tabs;

const menus: MenuData[] = [
    {
        key: 'home',
        name: '首页',
        route: '/',
        icon: <HomeOutlined />
    },
    {
        key: 'message',
        name: '消息',
        route: '/message',
        icon: <MessageOutlined />
    },
    {
        key: 'user',
        name: '用户管理',
        icon: <UserOutlined />,
        children: [
            {
                key: 'user_add',
                name: '用户管理',
                route: '/user/manage'
            },
            {
                key: 'user_query',
                name: '用户查询',
                route: '/user/query'
            },
        ]
    },
    {
        key: 'system',
        name: '系统设置',
        icon: <SettingOutlined />,
        children: [
            {
                key: 'system_zd_add',
                name: '字典管理',
                route: '/system/zd/add'
            },
            {
                key: 'system_zd_query',
                name: '字典查询',
                route: '/user/query'
            },
        ]
    },

]


const AppLayout: React.FC = ({children}) => {

    const [collapse, setCollapse] = useState(false);
    const [width, setWidth] = useState<number>(screenWidth());

    const onResize = (width: number) => {
        setWidth(width);
        setCollapse(width <= 800);
    }

    const renderTabBar = (props: any, DefaultTabBar: any) => {
        return <DefaultTabBar {...props} style={{borderBottom: '1px solid #dedede', backgroundColor: '#E4E7ED'}}/>
    }

    return (
        <ResizeObserver onResize={({width}) => onResize(width)}>
            <Layout style={{minHeight: '100%'}}>
                {width > 800 && !collapse &&
                <Sider theme={'light'}>
                    <div className={style.logo}>
                        <img src={require('../../assets/img/logo.png')}/>
                        <span>AD管理平台</span>
                    </div>
                    <div>
                        <SideMenu menus={menus}/>
                    </div>
                </Sider>
                }
                {width <= 800 && !collapse &&
                    <Drawer visible={!collapse} placement={'left'} onClose={() => setCollapse(true)} closable={false}>
                        <SideMenu menus={menus}/>
                    </Drawer>
                }
                <Layout>
                    <Header className={style.header}>
                        <div className={'f-left'}>
                            <span onClick={() => setCollapse(!collapse)} className={style.menuBtn}><WindowsOutlined /></span>
                        </div>
                        <div className={'f-right'}>

                        </div>
                    </Header>
                    <Content>
                        <div>
                            {children}
                        </div>
                        <FixedMenuBar/>
                    </Content>
                </Layout>
            </Layout>
        </ResizeObserver>

    )
}

export default AppLayout;