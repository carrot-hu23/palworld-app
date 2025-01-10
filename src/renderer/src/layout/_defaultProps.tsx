import {
    DashboardOutlined,
    GithubOutlined,
    HomeOutlined,
    SettingOutlined,
} from '@ant-design/icons';
export default {
    route: {
        routes: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                icon: <DashboardOutlined />,
            },
            {
                path: '/serverConfig',
                name: '房间设置',
                icon: <HomeOutlined />,
                // routes: [
                //     {
                //         path: '/home/clusterIni',
                //         name: 'menu.home.clusterIni',
                //     },
                //     {
                //         path: '/home/adminlist',
                //         name: 'menu.home.adminlist',
                //     },
                //     {
                //         path: '/home/whitelist',
                //         name: 'menu.home.whitelist',
                //     },
                //     {
                //         path: '/home/blacklist',
                //         name: 'menu.home.blacklist',
                //     },
                // ]
            },
            // {
            //     path: '/backup',
            //     name: '游戏备份',
            //     icon: <FolderOutlined />,
            // },
            {
                path: '/system',
                name: '系统设置',
                icon: <SettingOutlined />,
            },
            {
                path: '/github',
                name: 'Github',
                icon: <GithubOutlined />,
            },
        ],
    },
    location: {
        pathname: '/dashboard',
    },
    appList: [
        {
            // icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
            title: 'PalWorld 配置文件可视化',
            desc: '在线可视化配置文件生成',
            url: 'https://pal-conf.bluefissure.com/',
            target: '_blank',
        },
    ],
};