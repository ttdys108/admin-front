import React from "react";
import {Button} from "antd";
import {commonRequest, log_info} from "../../utils/common";
import {alipay} from "../../api/alipay";
import style from './index.module.css';

const Home = () => {

    const doAlipay = () => {
        commonRequest(alipay, undefined, (data: any) => {
            const newWindow = window.open("", "_self");
            newWindow!.document.write(data);
            newWindow!.focus();
        })
    }

    return (
        <div>
            <p>home</p>
            <Button onClick={doAlipay}>支付</Button>
        </div>
    )
}

export default Home;