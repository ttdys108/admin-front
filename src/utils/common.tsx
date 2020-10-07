import React from "react";

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