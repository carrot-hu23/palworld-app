import {Form, Input, InputNumber, Select, Switch, Tabs, Button} from "antd";
import configData from "../../assets/serverConfig.json";
import {useEffect} from "react";
import {FooterToolbar} from "@ant-design/pro-components";

const {TabPane} = Tabs;

interface Parameter {
    name: string;
    label: string;
    type: string;
    placeholder?: string;
    default?: any;
    options?: string[];
    min?: number;
    max?: number;
}

interface Tab {
    title: string;
    key: string;
    parameters: Parameter[];
}

interface Config {
    tabs: Tab[];
}

// 读取配置文件内容
const serverConfig = `[/Script/Pal.PalGameWorldSettings]
OptionSettings=(Difficulty=None,RandomizerType=All,RandomizerSeed="",DayTimeSpeedRate=0.900000,NightTimeSpeedRate=1.000000,ExpRate=1.000000,PalCaptureRate=0.800000,PalSpawnNumRate=1.000000,PalDamageRateAttack=1.000000,PalDamageRateDefense=0.900000,PlayerDamageRateAttack=1.000000,PlayerDamageRateDefense=1.000000,PlayerStomachDecreaceRate=1.000000,PlayerStaminaDecreaceRate=1.000000,PlayerAutoHPRegeneRate=1.000000,PlayerAutoHpRegeneRateInSleep=1.000000,PalStomachDecreaceRate=1.000000,PalStaminaDecreaceRate=1.000000,PalAutoHPRegeneRate=1.000000,PalAutoHpRegeneRateInSleep=1.000000,BuildObjectHpRate=1.000000,BuildObjectDamageRate=1.000000,BuildObjectDeteriorationDamageRate=1.000000,CollectionDropRate=1.000000,CollectionObjectHpRate=1.000000,CollectionObjectRespawnSpeedRate=1.000000,EnemyDropItemRate=1.000000,DeathPenalty=All,bEnablePlayerToPlayerDamage=False,bEnableFriendlyFire=False,bEnableInvaderEnemy=True,EnablePredatorBossPal=True,bActiveUNKO=False,bEnableAimAssistPad=True,bEnableAimAssistKeyboard=False,DropItemMaxNum=3000,DropItemMaxNum_UNKO=100,BaseCampMaxNum=128,BaseCampMaxNumInGuild=3,BaseCampWorkerMaxNum=15,DropItemAliveMaxHours=1.000000,bAutoResetGuildNoOnlinePlayers=False,AutoResetGuildTimeNoOnlinePlayers=72.000000,GuildPlayerMaxNum=20,PalEggDefaultHatchingTime=72.000000,WorkSpeedRate=1.000000,AutoSaveSpan=30.000000,AllowConnectPlatform=Steam,LogFormatType=Text,bIsMultiplay=False,bIsPvP=False,bHardcore=False,bPalLost=False,bCanPickupOtherGuildDeathPenaltyDrop=False,bEnableNonLoginPenalty=True,bEnableFastTravel=True,bIsStartLocationSelectByMap=True,bExistPlayerAfterLogout=False,bEnableDefenseOtherGuildPlayer=False,bInvisibleOtherGuildBaseCampAreaFX=False,bBuildAreaLimit=False,ItemWeightRate=1.000000,bShowPlayerList=False,CoopPlayerMaxNum=4,ServerPlayerMaxNum=32,ServerName="Default Palworld Server",ServerDescription="",AdminPassword="",ServerPassword="",PublicPort=8211,PublicIP="",RCONEnabled=False,RCONPort=25575,RESTAPIEnabled=False,RESTAPIPort=8212,bIsUseBackupSaveData=True,Region="",bUseAuth=True,BanListURL="https://api.palworldgame.com/api/banlist.txt",SupplyDropSpan=180,ChatPostLimitPerMinute=10,MaxBuildingLimitNum=0,ServerReplicatePawnCullDistance=15000.000000)`;


function parseSettings(input: string): Record<string, string | number | boolean> {
    const match = input.match(/OptionSettings=\((.*?)\)/);
    if (!match) throw new Error("Invalid input format");

    const settingsString = match[1];
    const settingsArray = settingsString.split(",").map(item => item.trim());

    const settingsObject: Record<string, string | number | boolean> = {};

    settingsArray.forEach(item => {
        const [key, value] = item.split("=");
        if (key && value) {
            const cleanedKey = key.trim();
            let cleanedValue: string | number | boolean = value.trim();

            // Handle boolean values
            if (cleanedValue === "True" || cleanedValue === "False") {
                cleanedValue = cleanedValue === "True";
            } else if (!isNaN(Number(cleanedValue))) {
                cleanedValue = parseFloat(cleanedValue);
            } else {
                cleanedValue = cleanedValue.replaceAll("\"", "")
            }
            settingsObject[cleanedKey] = cleanedValue;
        }
    });

    return settingsObject;
}

const config = configData as Config;
// ServerConfig

export default function ServerConfig() {
    const [form] = Form.useForm();

    const renderField = (field: Parameter) => {
        const {type, name, label, placeholder, default: defaultValue, options, min, max} = field;

        switch (type) {
            case "text":
                return (
                    <Form.Item name={name} label={label} initialValue={defaultValue}>
                        <Input placeholder={placeholder}/>
                    </Form.Item>
                );
            case "password":
                return (
                    <Form.Item name={name} label={label} initialValue={defaultValue}>
                        <Input.Password placeholder={placeholder}/>
                    </Form.Item>
                );
            case "number":
                return (
                    <Form.Item name={name} label={label} initialValue={defaultValue}>
                        <InputNumber placeholder={placeholder} min={min} max={max} style={{width: "100%"}}/>
                    </Form.Item>
                );
            case "checkbox":
                return (
                    <Form.Item name={name} label={label} valuePropName="checked" initialValue={defaultValue}>
                        <Switch/>
                    </Form.Item>
                );
            case "select":
                return (
                    <Form.Item name={name} label={label} initialValue={defaultValue}>
                        <Select placeholder={placeholder}
                                options={options?.map((opt) => ({value: opt['value'], label: opt['label']}))}/>
                    </Form.Item>
                );
            case "textarea":
                return (
                    <Form.Item name={name} label={label} initialValue={defaultValue}>
                        <Input.TextArea placeholder={placeholder} rows={4}/>
                    </Form.Item>
                );
            default:
                return null;
        }
    };


    useEffect(() => {
        const configSettings = parseSettings(serverConfig);
        console.log(configSettings)
        form.setFieldsValue(configSettings)
    }, [])

    return (
        <div>
            <Tabs defaultActiveKey="0">
                {config.tabs.map((tab, index) => (
                    <TabPane tab={tab.title} key={tab.key || `${index}`}>
                        <Form form={form} layout="vertical">
                            {tab.parameters.map((field) => renderField(field))}
                        </Form>
                    </TabPane>
                ))}
            </Tabs>

            <FooterToolbar>
                <Button type="primary" onClick={() => {
                    console.log(form.getFieldValue)
                }}>
                    保存
                </Button>
            </FooterToolbar>
        </div>
    );
};