import {Button, Form, FormProps, Input, message} from "antd";
import {useEffect} from "react";
import {fetchConfig, saveConfig} from "../../api/gameApi";
import {Config} from "../../types";


export default function System() {

    const [form] = Form.useForm()
    const onFinish: FormProps<Config>['onFinish'] = (values) => {
        console.log('Success:', values);
        saveConfig(values)
            .then(resp=>{
                if (resp.code === 200) {
                    message.success("保存成功")
                } else {
                    console.log(resp.message)
                }
            })
    };
    useEffect(() => {
        fetchConfig().then(resp=>{
            if (resp.code === 200) {
                form.setFieldsValue(resp.data)
            }
        })
    }, []);

    return (
        <>
            <Form
                onFinish={onFinish}
                form={form}
                layout="vertical"
            >
                <Form.Item
                    label="steamcmd 路径"
                    name="steamcmd"
                    rules={[{required: true, message: 'Please input your steamcmd path!'}]}
                >
                    <Input placeholder="steamcmd path"/>
                </Form.Item>

                <Form.Item
                    label="palServer 路径"
                    name="force_install_dir"
                    rules={[{required: true, message: 'Please input your force_install_dir path!'}]}
                >
                    <Input placeholder="palServer path"/>
                </Form.Item>
                <Form.Item
                    label={'备份路径'}
                    name="backupPath"
                    rules={[
                        {
                            required: true,
                            message: 'Please input backup path',
                        },
                    ]}
                >
                    <Input placeholder="游戏存档备份路径"/>
                </Form.Item>
                <Form.Item label={null}>
                    <Button type={'primary'} htmlType="submit">保存</Button>
                </Form.Item>
            </Form>
        </>
    )
}