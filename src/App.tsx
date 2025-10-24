import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductList } from "./sections/productList/ProductList";
import { NavigationMenuCategory} from "@/sections/navigationMenu/navigationMenu";
import { CategoryProvider } from "@/context/CategoryContext";


export function App() {
  return (
    <CategoryProvider>
      <Card >  
        <NavigationMenuCategory />
        <CardHeader>
          <CardTitle>Catálogo de Productos</CardTitle>
          <CardDescription>
            Productos obtenidos de la API externa: <code>api.escuelajs.co</code>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductList />
        </CardContent>
      </Card>
    </CategoryProvider>
  );
}

export default App;
