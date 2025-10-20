import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductList } from "./ProductList";

export function App() {
  return (
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>🛍️ Catálogo de Productos</CardTitle>
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
