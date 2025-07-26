import React, { createContext, useContext, useState } from "react";

export interface Row {
    username: string;
    name: string;
    title: string;
    department: string;
    phoneNumber: string;
    mail: string;
}

interface SearchContextType {
    data: Row[];
    setData: React.Dispatch<React.SetStateAction<Row[]>>;
    selectedBox: Row | null;
    setSelectedBox: React.Dispatch<React.SetStateAction<Row | null>>;
    selectedIndex: number | null;
    setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [data, setData] = useState<Row[]>([]);
    const [selectedBox, setSelectedBox] = useState<Row | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    return (
        <SearchContext.Provider value={{ data, setData, selectedBox, setSelectedBox, selectedIndex, setSelectedIndex }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) throw new Error("useSearch must be used within a SearchProvider");
    return context;
};