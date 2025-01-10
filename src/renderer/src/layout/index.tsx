import type {ProSettings} from '@ant-design/pro-components';
import {
    PageContainer,
    ProCard,
    ProConfigProvider,
    ProLayout,
    // SettingDrawer,
} from '@ant-design/pro-components';
import {ConfigProvider, Switch} from 'antd';
import {useState} from 'react';
import defaultProps from './_defaultProps';
import {Outlet, useLocation} from "react-router";
import {useNavigate} from "react-router-dom";

import logo from './../assets/palworld.png'
import {useTheme} from "../hooks/useTheme";
import ToggleTheme from "./ToggleTheme";
import ToggleTheme2 from "./ToggleTheme2";

export default () => {
    // @ts-ignore
    const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
        fixSiderbar: true,
        layout: 'side',
        // splitMenus: false,
        // contentWidth: 'Fluid',
        siderMenuType: 'sub',
        title: 'PalWorld'
    });
    const firstPagePath = '/panel';
    const location = useLocation()
    const [pathname, setPathname] = useState(location.pathname);
    const paddingInlinePageContainerContent = 24;
    if (typeof document === 'undefined') {
        return <div/>;
    }

    const navigate = useNavigate()
    const theme = useTheme()
    // @ts-ignore
    return (
        <div
            id="test-pro-layout"
            style={{overflow: 'auto'}}
        >
            <ProConfigProvider dark={theme.theme === 'dark'}>
                <ConfigProvider
                    getTargetContainer={() => {
                        return document.getElementById('test-pro-layout') || document.body;
                    }}
                >
                    <ProLayout
                        {...defaultProps}
                        location={{
                            pathname,
                        }}
                        logo={logo}
                        // siderWidth={200}
                        onMenuHeaderClick={(e) => console.log(e)}
                        menuItemRender={(item, dom) => (
                            <div
                                onClick={() => {
                                    navigate(item.path as string)
                                    setPathname(item.path || firstPagePath);
                                }}
                            >
                                {dom}
                            </div>
                        )}
                        menuFooterRender={(props) => {
                            if (props?.collapsed) return undefined;
                            return (
                                <div
                                    style={{
                                        // textAlign: 'center',
                                        // paddingBlockStart: 24,
                                        paddingLeft: 16
                                    }}
                                >
                                    <ToggleTheme2 />

                                </div>
                            );
                        }}
                        {...settings}
                    >
                        <PageContainer
                            token={{
                                paddingInlinePageContainerContent,
                            }}
                            // 去掉面包屑
                            breadcrumbRender={false}
                            // title={false}
                        >
                            <ProCard>
                                <Outlet/>
                            </ProCard>
                        </PageContainer>
                        {/*
                        <SettingDrawer
                            pathname={pathname}
                            enableDarkTheme
                            getContainer={(e: any) => {
                                if (typeof window === 'undefined') return e;
                                return document.getElementById('test-pro-layout');
                            }}
                            settings={settings}
                            onSettingChange={(changeSetting) => {
                                setSetting(changeSetting);
                            }}
                            disableUrlParams={false}
                        />
                        */}
                    </ProLayout>
                </ConfigProvider>
            </ProConfigProvider>
        </div>
    );
};