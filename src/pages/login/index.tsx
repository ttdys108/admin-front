import React from "react";
import style from "./index.module.css";
import {Row, Col, Form, Input, Alert, Button} from "antd";
import Particles from "react-tsparticles";
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import AuthUtil from "../../utils/auth";
import {useLocation, useHistory} from 'react-router-dom';
import {log_info} from "../../utils/common";

//登录页面
const Login = () => {
    const location = useLocation(), history = useHistory();

    const doLogin = (values: any) => {
        AuthUtil.setToken('dummy');
        log_info('location', location.state);
        const {from} = location.state as any || {from: '/'};
        history.replace(from);
    }

    return (
        <div>
            <Row justify={'center'} className={style.panel}>
                <Col span={20} md={12} lg={6}>
                    <div >
                        <img className={style.logo} src={require('../../assets/img/logo.png')} />
                        <span className={style.title}>欢迎登录管理平台</span>
                    </div>
                    <div className={'mt-4'}>
                        <Alert closable={true} type={'success'} message={'测试账号：admin/admin'} className={'mb-2'}/>
                        <Alert closable={true} type={'error'} message={'密码错误！'} className={'mb-2'}/>
                        <Form onFinish={doLogin}>
                            <Form.Item>
                                <Input placeholder={'用户名'} prefix={<UserOutlined />}/>
                            </Form.Item>
                            <Form.Item>
                                <Input.Password placeholder={'密码'} prefix={<LockOutlined />} />
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType={'submit'} type={'primary'} className={'w-100'}>登录</Button>
                                <Button className={'f-left'} type={'link'}>忘记密码？</Button>
                                <Button className={'f-right'} type={'link'}>注册账号</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Col>
            </Row>
            <Particles className={style.particles}
                options={{
                    fpsLimit: 60,
                    interactivity: {
                        detectsOn: "canvas",
                        events: {
                            onClick: {
                                enable: true,
                                mode: "push",
                            },
                            onHover: {
                                enable: true,
                                mode: "repulse",
                            },
                            resize: true,
                        },
                        modes: {
                            bubble: {
                                distance: 400,
                                duration: 2,
                                opacity: 0.8,
                                size: 40,
                            },
                            push: {
                                quantity: 4,
                            },
                            repulse: {
                                distance: 200,
                                duration: 0.4,
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: "#c7d2dd",
                        },
                        links: {
                            color: "#c7d2dd",
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1,
                        },
                        collisions: {
                            enable: true,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outMode: "bounce",
                            random: false,
                            speed: 2,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                value_area: 1000,
                            },
                            value: 80,
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            random: true,
                            value: 5,
                        },
                    },
                    detectRetina: true,
                }}
            />
        </div>
    )
}

export default Login;