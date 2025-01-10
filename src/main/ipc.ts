import {spawn, ChildProcess} from 'child_process';
import {BrowserWindow} from "electron";

let childProcess: ChildProcess | null = null;

export function ipcHandle(ipcMain: Electron.IpcMain, win: BrowserWindow) {

    // 监听启动子进程的事件
    ipcMain.on('start-process', () => {
        childProcess = spawn('node', ['path/to/your/script.js']); // 启动子进程
        if (childProcess) {
            // 监听子进程的输出
            childProcess.stdout?.on('data', (data) => {
                win.webContents.send('process-output', data.toString()); // 发送输出到渲染进程
            });

            // 监听子进程的错误输出
            childProcess.stderr?.on('data', (data) => {
                win.webContents.send('process-error', data.toString()); // 发送错误输出到渲染进程
            });

            // 监听子进程退出
            childProcess.on('exit', (code) => {
                win.webContents.send('process-exit', code); // 发送退出代码到渲染进程
            });
        }
    });

    // 监听关闭子进程的事件
    ipcMain.on('close-process', () => {
        if (childProcess) {
            childProcess.kill(); // 关闭子进程
            childProcess = null;
        }
    });

    // 监听来自渲染进程的输入
    ipcMain.on('send-input', (_event, input: string) => {
        console.log("[send-input]", input)
        if (childProcess) {
            childProcess.stdin?.write(input + '\n'); // 发送输入到子进程
        }
    });

    // 监听来自渲染进程的输入
    ipcMain.on('update-game', (event) => {
        event.ports
        // 通知渲染进程操作完成
        win.webContents.send('update-game-complete', '更新成功');
    });

    // 监听来自渲染进程的输入
    ipcMain.on('readFile', (_event, input: string) => {
        console.log("[send-input]", input)
        if (childProcess) {
            childProcess.stdin?.write(input + '\n'); // 发送输入到子进程
        }
    });

}