import React from "react";
import {isProd} from "./common";

/** 环境相关的数据, 环境无关的常量数据请查看static_data */
const data: any = {
    default: {


    },
    dev: {
        baseUrl: 'http://localhost:8080',

    },
    prod: {
        baseUrl: 'http://121.36.137.124:80/apispd',

    }


}

const getProperty = (key: string) => {
    if(isProd()) {
        if(key in data.prod) {
            return data.prod[key];
        } else {
            return data.default[key];
        }
    } else {
        if(key in data.dev) {
            return data.dev[key];
        } else {
            return data.default[key];
        }
    }
}

export {getProperty, }