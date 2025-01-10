import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// 定义主题类型
type Theme = 'light' | 'dark';

// 创建主题上下文
interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

// 创建上下文，默认值为 undefined，这样 TypeScript 会要求你在使用时提供合适的值
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 自定义 Hook
export function useTheme(): ThemeContextType {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

// ThemeProvider 组件
interface ThemeProviderProps {
    children: ReactNode;
}

export function ThemeProvider2({ children }: ThemeProviderProps): JSX.Element {
    const [theme, setTheme] = useState<Theme>(() => {
        const storedTheme = localStorage.getItem('theme') as Theme | null;
        return storedTheme || 'dark';
    });

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const themeContextValue = {
        theme,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={themeContextValue}>
            {children}
        </ThemeContext.Provider>
    );
}
