import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';

// third-party imports
import { useRouter } from 'next/router';
import Link from 'next/link';
import { classNames } from 'primereact/utils';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';

// application imports
import { AppTopbarRef } from '../../types/types';
import { LayoutContext } from './context/layoutcontext';
import { destroyLogin } from '../../libs/auth';

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const router = useRouter();

    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);
    const menu = useRef<Menu>(null);

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current,
    }));

    const toggleMenu: React.MouseEventHandler<HTMLButtonElement> | undefined = event => {
        menu.current?.toggle(event);
    };

    return (
        <div className="layout-topbar">
            <Link href="/" className="layout-topbar-logo">
                <p>Dhaka Autos</p>
                {/* <img src={'/images/example-1920x720.png'} width="auto" height={'100%'} alt="bo.example.com" /> */}
            </Link>

            <button
                ref={menubuttonRef}
                type="button"
                className="p-link layout-menu-button layout-topbar-button"
                onClick={onMenuToggle}
            >
                <i className="pi pi-bars" />
            </button>

            <Button
                ref={topbarmenubuttonRef}
                type="button"
                className="layout-topbar-menu-button layout-topbar-button"
                onClick={toggleMenu}
            >
                <i className="pi pi-cog" />
            </Button>

            <div
                ref={topbarmenuRef}
                className={classNames('layout-topbar-menu', {
                    'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible,
                })}
            >
                <Menu
                    className="mt-4"
                    ref={menu}
                    model={[
                        {
                            label: 'Profile',
                            icon: 'pi pi-user',
                            command: () => {
                                if (router.pathname.includes('/v-p/') || router.pathname === '/v-p') {
                                    router.push('/v-p/auth/profile');
                                } else {
                                    router.push('/auth/profile');
                                }
                            },
                        },
                        {
                            separator: true,
                        },
                        {
                            label: 'Logout',
                            icon: 'pi pi-sign-out',
                            command: () => {
                                const success = destroyLogin();

                                if (success) {
                                    if (router.pathname.includes('/v-p/') || router.pathname === '/v-p') {
                                        router.push('/v-p/auth/login');
                                    } else {
                                        router.push('/auth/login');
                                    }
                                }
                            },
                        },
                    ]}
                    popup
                />
                <Button type="button" icon="pi pi-cog" onClick={toggleMenu} />
            </div>
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
