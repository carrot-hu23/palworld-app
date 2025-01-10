import { Divider, Typography } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

export default function Github(){
    return(
        <Typography>
            <Title>介绍</Title>

            <Paragraph>
                PalWorld Panel with electron and react
            </Paragraph>
            <Title level={2}>指导帮助</Title>

            <Paragraph>
               在系统设置页面，设置steamcmd路径和palwold-server 路径
            </Paragraph>

            <Divider />

            <Title>Introduction</Title>

            <Paragraph>
                PalWorld Panel with electron and react
            </Paragraph>
            <Title level={2}>Guidelines and Resources</Title>

            <Paragraph>
                11111
            </Paragraph>

        </Typography>
    )
};