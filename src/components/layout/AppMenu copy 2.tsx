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
                    label: 'Concern Management',
                    to: '/concerns',
                },
                {
                    icon: 'pi pi-fw pi-file',
                    label: 'Client Management',
                    to: '/clients',
                },
                {
                    icon: 'pi pi-fw pi-file',
                    label: 'Product Category Management',
                    to: '/product-categories',
                },
                {
                    icon: 'pi pi-fw pi-file',
                    label: 'Home Management',
                    items: [
                        {
                            label: 'Hero Banner',
                            to: '/hero-banners',
                        },
                        {
                            label: 'Home About Us',
                            to: '/home-about-us',
                        },
                    ],
                },
                {
                    icon: 'pi pi-fw pi-file',
                    label: 'Product Management',
                    items: [
                        {
                            label: 'Create Product',
                            to: '/products/create',
                        },
                        {
                            label: 'Product List',
                            to: '/products',
                        },
                    ],
                },
                {
                    icon: 'pi pi-fw pi-file',
                    label: 'Contact Management',
                    to: '/contacts',
                },
                {
                    icon: 'pi pi-fw pi-file',
                    label: 'Contact Request Management',
                    to: '/website-content',
                },
                {
                    icon: 'pi pi-fw pi-file',
                    label: 'Company Management',
                    to: '/company-management',
                },
                {
                    icon: 'pi pi-fw pi-file',
                    label: 'Career Management',
                    to: '/job',
                },
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
