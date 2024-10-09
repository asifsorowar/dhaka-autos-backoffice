/* eslint-disable @next/next/no-img-element */

import React from 'react';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';
import { AppMenuItem } from '../../types/types';

const AppMenu = () => {
    let model: AppMenuItem[] = [];

    const exampleAdminMenuModel = [
        {
            label: 'Home',
            items: [{ icon: 'pi pi-fw pi-home', label: 'Dashboard', to: '/' }],
        },
        {
            label: 'Menu',
            items: [
                {
                    icon: 'pi pi-fw pi-user',
                    label: 'User Management',
                    items: [
                        {
                            label: 'Roles',
                            to: '/roles',
                        },
                        {
                            label: 'Users',
                            to: '/users',
                        },
                    ],
                },
                {
                    icon: 'pi pi-fw pi-file',
                    label: 'File Management',
                    to: '/folders',
                },
                {
                    icon: 'pi pi-fw pi-file',
                    label: 'Banner Management',
                    to: '/banners',
                },
                {
                    icon: 'pi pi-fw pi-file',
                    label: 'Car Management',
                    items: [
                        {
                            label: 'Car Brands',
                            to: '/cars/brands',
                        },
                        {
                            label: 'Car Models',
                            to: '/cars/models',
                        },
                        {
                            label: 'Create Car',
                            to: '/cars/create',
                        },
                        {
                            label: 'Car List',
                            to: '/cars',
                        },
                    ],
                },
                {
                    icon: 'pi pi-fw pi-file',
                    label: 'Blog Management',
                    items: [
                        {
                            label: 'Create Blog',
                            to: '/blogs/create',
                        },
                        {
                            label: 'Blog List',
                            to: '/blogs',
                        },
                    ],
                },
                // {
                //     icon: 'pi pi-fw pi-file',
                //     label: 'Contact-Us Management',
                //     to: '/contacts',
                // },
                // {
                //     icon: 'pi pi-fw pi-file',
                //     label: 'Pre-Order Management',
                //     to: '/website-content',
                // },
            ],
        },
    ];

    model = exampleAdminMenuModel;

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? (
                        <AppMenuitem item={item} root={true} index={i} key={item.label} />
                    ) : (
                        <li className="menu-separator"></li>
                    );
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
