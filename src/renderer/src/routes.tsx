import {Navigate, useRoutes} from 'react-router-dom';
import Layout from "./layout/index";
import Dashboard from "./pages/Dashboard";
import ServerConfig from "./pages/ServerConfig";
import Github from "./pages/Github";
import System from "./pages/System";

export default function Routes() {
    return useRoutes([
        {
            path: '/',
            element: <Layout/>,
            children: [
                {element: <Navigate to="/dashboard"/>, index: true,},
                {path: '/dashboard', element: <Dashboard/>},
                {path: '/serverConfig', element: <ServerConfig/>},
                {path: '/system', element: <System/>},
                {path: '/github', element: <Github/>},
            ],
        },
        // {
        //     path: 'login',
        //     element: <Login/>,
        // },
        // {
        //     path: 'init',
        //     element: <Begin/>,
        // },
        {
            path: '*',
            element: <Navigate to="/404" replace/>,
        },
    ]);
}
