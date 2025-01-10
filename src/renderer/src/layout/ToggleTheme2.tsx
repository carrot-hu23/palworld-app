import {useTheme} from "../hooks/useTheme";
import {Switch} from "antd";

export default () => {
    const {theme, toggleTheme} = useTheme();
    return (
        <>
            <Switch checkedChildren={'dark'} unCheckedChildren={'light'} value={theme === 'dark'} onClick={toggleTheme}/>
        </>
    )
}