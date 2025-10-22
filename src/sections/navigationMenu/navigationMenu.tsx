import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useProductsByCategory } from "../../store/useProductsByCategory.controller";
import { navigationMenuTriggerStyle } from "./navigationMenu.css";

export function NavigationMenuCategory() {
    const { categories } = useProductsByCategory();

    return (
        <NavigationMenu>
            <NavigationMenuList className="flex-wrap">
                <NavigationMenuItem className="titleNav">
                    Bape
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Categorías</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {categories.map((category) => (
                                <li key={category.id} className="p-3 rounded-md hover:bg-gray-100">
                                    <NavigationMenuLink
                                        href="#"
                                    >
                                        {category.name}
                                    </NavigationMenuLink>
                                </li>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
};