import React from "react";
import {Layout} from "antd";


const {Content, Header, Sider} = Layout;

const AppLayout: React.FC = ({children}) => {


    return (
        <Layout>
            <Sider>
                sider
            </Sider>
            <Layout>
                <Header>header</Header>
                <Content>
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

export default AppLayout;