import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductList } from "./sections/productList/ProductList";
import { NavigationMenuCategory} from "@/sections/navigationMenu/navigationMenu";


export function App() {
  return (
    <Card>
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
  );
}

export default App;
