import { createContext, useEffect, useState } from "react";
import { useLocalStorage } from "use-hooks";

export const StateContext = createContext({} as any);

export const ContextProvider = ({ children }: any) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [theme, setTheme] = useLocalStorage("theme", "light");
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);



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
        <StateContext.Provider value={{
            theme, setTheme, loading, toggleTheme,
            selectedCategoryId, setSelectedCategoryId, selectedBrandId, setSelectedBrandId
        }}>
            {children}
        </StateContext.Provider>
    );

}

