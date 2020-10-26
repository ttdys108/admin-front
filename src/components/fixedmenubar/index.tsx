import React, {useState} from "react";
import {Badge, Button, Divider, Modal} from "antd";
import {CustomerServiceOutlined, PhoneOutlined} from '@ant-design/icons';
import style from './index.module.css';
import Chat, {Message} from "../chat";

const FixedMenuBar = () => {

    const [chatVisible, setChatVisible] = useState(false);


    return (
        <div className={style.wrapper}>
            <div>
                <a href={'#'}>
                    <PhoneOutlined />
                </a>
            </div>
            <Divider style={{margin: '10px 0'}}/>
            <Badge count={2} dot >
                <a onClick={() => setChatVisible(true)} href={'#'} style={{fontSize: '20px'}}>
                    <CustomerServiceOutlined />
                </a>
            </Badge>
            <Modal footer={null} visible={chatVisible} title={'客服小妹-雪儿 很高兴为您服务'} onCancel={() => setChatVisible(false)}>
                <Chat currentUser={'tmp'} toUser={'xuer'} height={'300px'}></Chat>
            </Modal>
        </div>
    )
}

export default FixedMenuBar;