import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-animated';

interface SubCategory {
    label: string;
    value: string;
}

interface Category {
    name: string;
    subCategories?: SubCategory[];
}

interface FilterAccordionProps {
    category: Category;
    onSelect: (value: string) => void;
    currentCategory: string;
}

export const FilterAccordion = ({ category, onSelect, currentCategory }: FilterAccordionProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-white/10">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center py-4 text-left font-semibold text-gray-200 hover:text-white transition"
            >
                {category.name}
                {isOpen ? <ChevronUpIcon size={18} /> : <ChevronDownIcon size={18} />}
            </button>

            {isOpen && (
                <div className="pb-4 space-y-2 pl-4 animate-in slide-in-from-top-2 duration-300">
                    {/* Agregamos el ?. y un fallback || [] por seguridad */}
                    {(category?.subCategories ?? []).map((sub) => (
                        <button
                            key={sub.value}
                            onClick={() => onSelect(sub.value)}
                            className={`block w-full text-left text-sm py-1 transition-colors ${currentCategory === sub.value ? "text-red-500 font-bold" : "text-gray-400 hover:text-white"
                                }`}
                        >
                            {sub.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};