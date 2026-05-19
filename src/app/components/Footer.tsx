import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-white text-xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              SaveNBuy
            </h3>
            <p className="text-sm mb-4">
              Your one-stop destination for amazing deals on millions of products.
              Shop with confidence and save big every day!
            </p>
            <div className="flex gap-3">
              <Button size="icon" variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
                <Facebook className="h-4 w-4 text-white" />
              </Button>
              <Button size="icon" variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
                <Twitter className="h-4 w-4 text-white" />
              </Button>
              <Button size="icon" variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
                <Instagram className="h-4 w-4 text-white" />
              </Button>
              <Button size="icon" variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
                <Youtube className="h-4 w-4 text-white" />
              </Button>
            </div>
          </div>

          {/* Customer Service & About - Mobile Grid */}
          <div className="md:col-span-2 lg:col-span-1 grid grid-cols-2 md:grid-cols-1 gap-8">
            {/* Customer Service */}
            <div>
              <h4 className="text-white font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-orange-500 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Track Order</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Returns & Refunds</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* About */}
            <div>
              <h4 className="text-white font-semibold mb-4">About</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-orange-500 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Sell on SaveNBuy</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-4">Newsletter</h4>
            <p className="text-sm mb-4">Subscribe to get special offers and updates</p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
              <Button className="bg-orange-500 hover:bg-orange-600">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>&copy; 2026 SaveNBuy. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-orange-500 transition-colors">Privacy</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Terms</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
