import { ShoppingCart, Search, Menu, User, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { useState } from "react";

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

export function Header({ cartCount, onCartClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap text-sm">
          <span className="inline-block px-8">
            🎉 Free shipping on orders over GHC ¢29 | New user coupon: Extra 30% off
          </span>
          <span className="inline-block px-8">
            🎉 Free shipping on orders over GHC ¢29 | New user coupon: Extra 30% off
          </span>
          <span className="inline-block px-8">
            🎉 Free shipping on orders over GHC ¢29 | New user coupon: Extra 30% off
          </span>
          <span className="inline-block px-8">
            🎉 Free shipping on orders over GHC ¢29 | New user coupon: Extra 30% off
          </span>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3 gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent whitespace-nowrap">
                SaveNBuy
              </h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-3xl hidden md:block">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="I'm shopping for..."
                  className="pl-4 pr-12 w-full h-10 rounded-full border-2 border-orange-400 focus:border-orange-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  size="icon"
                  className="absolute right-0 top-0 h-10 w-10 rounded-full bg-orange-500 hover:bg-orange-600"
                >
                  <Search className="h-4 w-4 text-white" />
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <span className="text-xl">🇬🇭</span>
              </Button>
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative" onClick={onCartClick}>
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-orange-500 text-white">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-3">
            <div className="relative">
              <Input
                type="text"
                placeholder="I'm shopping for..."
                className="pl-4 pr-12 w-full rounded-full border-2 border-orange-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                size="icon"
                className="absolute right-0 top-0 h-10 w-10 rounded-full bg-orange-500 hover:bg-orange-600"
              >
                <Search className="h-4 w-4 text-white" />
              </Button>
            </div>
          </div>
        </div>
      </div>

    </header>
  );
}
