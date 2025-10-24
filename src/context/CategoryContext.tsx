import { createContext, useContext, useState, useMemo } from 'react';
import type { ReactNode } from 'react';

interface CategoryContextType {
    selectedCategory: string | null;
    setSelectedCategory: (categoryId: string | null) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

interface CategoryProviderProps {
    children: ReactNode;
}

export const CategoryProvider = ({ children }: CategoryProviderProps) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>('all');

    const value = useMemo(() => ({
        selectedCategory,
        setSelectedCategory
    }), [selectedCategory]);
    
    return (
        <CategoryContext.Provider value={value}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategoryContext = () => {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error('useCategoryContext must be used within CategoryProvider');
    }
    return context;
};