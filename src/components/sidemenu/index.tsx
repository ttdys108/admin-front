import React, {ReactElement} from "react";
import {Menu} from "antd";
import {Link} from 'react-router-dom';

const {SubMenu} = Menu;

export interface MenuData {
    key: string;
    route?: string;
    name: string;
    icon?: ReactElement;
    children?: MenuData[];
}

const label = (menu: MenuData) => {
    return menu.icon ? <>{menu.icon}<span>{menu.name}</span></> : <span>{menu.name}</span>;
}

//antd menu不支持自定义组件，只能写为函数来实现迭代
const menuitem = (menu: MenuData) => {
    return menu.children ?
        <SubMenu title={label(menu)} key={menu.key}>
            {menu.children.map(sub =>
                menuitem(sub)
            )}
        </SubMenu>
        :
        <Menu.Item key={menu.key}>
            <Link to={menu.route!}>
                {label(menu)}
            </Link>
        </Menu.Item>
}

export interface SideMenuProps {
    menus?: MenuData[];
}

const SideMenu: React.FC<SideMenuProps> = ({menus}) => {


    return (
        <Menu mode={'inline'}>
            {menus?.map(menu => menuitem(menu))}
        </Menu>
    )
}

export default SideMenu;