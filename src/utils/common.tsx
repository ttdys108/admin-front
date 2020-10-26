import React from "react";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {message, notification} from "antd";
import {HttpResponse} from "../api/request";

export function log_info(...infos: any[]) {
    infos.forEach(info => console.log(info));
}

export function log_err(...errs: any[]) {
    errs.forEach(err => console.error(err));
}

export function isXScreen() {
    return screenWidth() < 800;
}

export function screenWidth() {
    return document.documentElement.clientHeight || document.body.clientHeight;
}

export function notifyRequestFail(msg?: string) {
    notification.open({
        message: '请求失败',
        description: msg,
        icon: <ExclamationCircleOutlined style={{color: 'red'}}/>
    })
}

export function notifySucceed(msg: string) {
    message.success(msg);
}

export function isProd() {
    return process.env.NODE_ENV === 'production';
}

export function isSucceed(resp: HttpResponse) {
    return resp.code === '000000';
}

export function commonRequest(request: any, params: any, handler?: any, fhandler?: VoidFunction) {
    request(params).then((resp: HttpResponse) => {
        if(isSucceed(resp)) {
            handler && handler(resp.data);
        } else {
            notifyRequestFail(resp.msg);
        }
        fhandler && fhandler();
    }).catch((err: any) => {
        log_err(err);
        fhandler && fhandler();
    })
}