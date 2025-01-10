import {Tabs, TabsProps} from "antd";
import Panel from "./Panel";
import Log from "./Log";

export default function Dashboard() {

    const items: TabsProps['items'] = [
        {
            key: "1",
            label: '操作',
            children: <Panel/>
        },
        {
            key: "2",
            label: '日志',
            children: <Log/>
        }
    ]

    return (
        <>
            <Tabs items={items}/>
        </>
    )
}