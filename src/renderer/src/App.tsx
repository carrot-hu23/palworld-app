import {HashRouter} from "react-router";
import Routes from "./routes";
import {ThemeProvider2} from "./hooks/useTheme";

function App() {
    // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

    return (
        <>
            <ThemeProvider2>
                <HashRouter>
                    <Routes/>
                </HashRouter>
            </ThemeProvider2>
        </>
    )
}

export default App
