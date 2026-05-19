import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Star, ShoppingCart } from "lucide-react";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  discount?: number;
  badge?: string;
}

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {products.map((product) => (
        <Card
          key={product.id}
          className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden"
        >
          <div className="relative aspect-square overflow-hidden bg-gray-100">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {product.discount && (
              <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                -{product.discount}%
              </Badge>
            )}
            {product.badge && (
              <Badge className="absolute top-2 right-2 bg-orange-500 text-white">
                {product.badge}
              </Badge>
            )}
          </div>
          
          <div className="p-3 space-y-2">
            <h3 className="text-sm line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
            
            <div className="flex items-center gap-1 text-xs">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-500">({product.reviews})</span>
            </div>
            
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-orange-500">
                GHC ¢{product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  GHC ¢{product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            
            <Button
              size="sm"
              className="w-full bg-orange-500 hover:bg-orange-600"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add to Cart
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
