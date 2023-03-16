import { createContext, useEffect, useState } from "react";
import { useLocalStorage } from "use-hooks";

export const StyleContext = createContext({} as any);

export const StyleProvider = ({ children }: any) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [theme, setTheme] = useLocalStorage("theme", "light");

    //toggles the theme
    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    //modify data-theme attribute on document.body when theme changes
    useEffect(() => {
        const body = document.body;
        body.setAttribute("data-theme", theme);
    }, [theme]);

    return (
        <StyleContext.Provider value={{ theme, setTheme, loading, toggleTheme }}>
            {children}
        </StyleContext.Provider>
    );

}

