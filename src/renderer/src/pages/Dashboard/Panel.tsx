import {Button, Space} from "antd";
import UpdateGameBtn from "./UpdateGameBtn";

export default function Panel() {

    return (
        <>
            <Space size={16} wrap>
                <Button type={'primary'}>启动游戏</Button>
                <UpdateGameBtn/>
            </Space>
        </>
    )
}