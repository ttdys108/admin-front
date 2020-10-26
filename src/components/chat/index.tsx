import React, {useEffect, useState} from "react";
import style from './index.module.css';
import {Button, Input, Row, Col, Form} from "antd";
import {log_info} from "../../utils/common";

export interface Message {
    id: string;
    user: string;
    avatar?: string;
    read?: boolean;
    msg: string;
    time: string;
    to: string;
}


export interface ChatProps {
    width?: string;
    height: string;
    currentUser: string;
    toUser: string;
}

const Chat: React.FC<ChatProps> = ({height, width, currentUser, toUser}) => {
    const [form] = Form.useForm();
    const [messages, setMessages] = useState<Message[]>([]);
    const [socket, setSocket] = useState<WebSocket>();
    const ref = React.useRef<any>();

    const sendMessage = () => {
        const msg = form.getFieldValue('message');
        if(!msg)
            return;
        log_info(msg)
        const now = new Date();
        const message: Message = {
            id: Math.random() + '',
            user: currentUser,
            to: toUser,
            msg,
            avatar: '',
            time: now.getHours() + ':' + now.getMinutes()
        }
        messages.push(message);
        setMessages([...messages]);
        justifyScroll();
        //socket send msg
        if(socket) {
            log_info('send message to socket')
            socket.send(JSON.stringify(message))
        }
    }

    useEffect(() => {
        if(!currentUser)
            return;
        setSocket(new WebSocket('ws://localhost:8080/message/' + currentUser));
        return () => {
            if(socket) {
                log_info('socket closed')
                socket.close();
            }
        }
    }, [currentUser])

    useEffect(() => {
        if(socket) {
            socket.onopen = () => {
                log_info('socket opened');
            }
            socket.onclose = () => {
                log_info('socket closed');
            }
            socket.onerror = () => {
                log_info('socket error');
            }
            socket.onmessage = (evt) => {
                log_info('onmessage', evt.data);
                const msg = JSON.parse(evt.data);
                messages.push(msg);
                setMessages([...messages]);
                justifyScroll();
            }
        }
    }, [socket, messages])

    const justifyScroll = () => {
        log_info('justify')
        if(ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }
    }

    return (
        <div style={{height, width: width||'100%'}} className={style.container}>
            <div ref={ref} className={style.messageBox} style={{height: 'calc('+height+' - 70px)'}}>
                {messages.map(msg =>
                    <div className={msg.user === currentUser ? style.msgWrapRight : style.msgWrapLeft} key={msg.id}>
                        <div className={msg.user === currentUser ? style.avatarRight : style.avatar}>
                            <img width={'100%'} height={'100%'} src={msg.avatar}/>
                        </div>
                        <div className={msg.user === currentUser ? style.msgRight : style.msgLeft}>
                            <span className={msg.user === currentUser ? style.msgInfoRight : style.msgInfo}>{msg.user} {msg.time}</span>
                            <span className={msg.user === currentUser ? style.textRight : style.textLeft}>{msg.msg}</span>
                        </div>
                    </div>
                )}
            </div>
            <Form form={form} onFinish={sendMessage}>
                <Row className={style.sendBox} gutter={8}>
                    <Col span={20}>
                        <Form.Item name={'message'} className={'mb-1'}>
                            <Input maxLength={1000} autoComplete={'off'}/>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Button htmlType={'submit'} block>发送</Button>
                    </Col>
                </Row>
            </Form>
        </div>

    )
}

export default Chat;