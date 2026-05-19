import { useState } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { CategorySection } from "./components/CategorySection";
import { FlashDeals } from "./components/FlashDeals";
import { BrandCarousel } from "./components/BrandCarousel";
import { ProductGrid, Product } from "./components/ProductGrid";
import { ShoppingCartModal, CartItem } from "./components/ShoppingCartModal";
import { Footer } from "./components/Footer";
import { toast } from "sonner";
import { Toaster } from "./components/ui/sonner";

// Mock product data
const flashDealsProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Earbuds Pro - Premium Sound Quality",
    price: 29.99,
    originalPrice: 89.99,
    rating: 4.5,
    reviews: 2341,
    image: "https://images.unsplash.com/photo-1620783770629-122b7f187703?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljcyUyMGdhZGdldHMlMjBwcm9kdWN0fGVufDF8fHx8MTc3OTE4MTU2OXww&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 67,
    badge: "Flash",
  },
  {
    id: 2,
    name: "Premium Smartphone Case with Screen Protector",
    price: 12.99,
    originalPrice: 24.99,
    rating: 4.8,
    reviews: 5432,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwdGVjaG5vbG9neSUyMGRldmljZXxlbnwxfHx8fDE3NzkxODE1NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 48,
  },
  {
    id: 3,
    name: "Luxury Analog Watch - Stainless Steel Band",
    price: 39.99,
    originalPrice: 129.99,
    rating: 4.6,
    reviews: 987,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRjaCUyMHRpbWVwaWVjZSUyMGx1eHVyeXxlbnwxfHx8fDE3NzkxODE1NzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 69,
    badge: "Hot",
  },
  {
    id: 4,
    name: "Stylish Running Sneakers - Breathable Mesh",
    price: 34.99,
    originalPrice: 79.99,
    rating: 4.7,
    reviews: 3245,
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2VycyUyMHNob2VzJTIwZmFzaGlvbnxlbnwxfHx8fDE3NzkwMTA1NzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 56,
  },
  {
    id: 5,
    name: "Travel Backpack - Water Resistant Large Capacity",
    price: 24.99,
    originalPrice: 49.99,
    rating: 4.4,
    reviews: 1876,
    image: "https://images.unsplash.com/photo-1509762774605-f07235a08f1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNrcGFjayUyMHRyYXZlbCUyMGJhZ3xlbnwxfHx8fDE3NzkxMDgzMTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 50,
  },
  {
    id: 6,
    name: "Beauty Cosmetics Set - Complete Makeup Kit",
    price: 19.99,
    originalPrice: 59.99,
    rating: 4.9,
    reviews: 4521,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBjb3NtZXRpY3MlMjBwcm9kdWN0c3xlbnwxfHx8fDE3NzkwOTYwNzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 67,
    badge: "Flash",
  },
];

const recommendedProducts: Product[] = [
  {
    id: 7,
    name: "Modern Kitchen Appliance Set - 5 Piece Collection",
    price: 49.99,
    originalPrice: 99.99,
    rating: 4.5,
    reviews: 876,
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwYXBwbGlhbmNlcyUyMG1vZGVybnxlbnwxfHx8fDE3NzkxODE1NzF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 50,
  },
  {
    id: 8,
    name: "Elegant Gold Jewelry Set - Necklace & Earrings",
    price: 44.99,
    originalPrice: 119.99,
    rating: 4.8,
    reviews: 654,
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXdlbHJ5JTIwYWNjZXNzb3JpZXMlMjBsdXh1cnl8ZW58MXx8fHwxNzc5MDE4MTk2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 62,
  },
  {
    id: 9,
    name: "Home Decor Wall Art - Modern Abstract Design",
    price: 22.99,
    originalPrice: 44.99,
    rating: 4.3,
    reviews: 432,
    image: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwZGVjb3IlMjBpdGVtc3xlbnwxfHx8fDE3NzkxODE1NzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 49,
  },
  {
    id: 10,
    name: "Fashion Clothing Bundle - Trendy Outfit Set",
    price: 54.99,
    originalPrice: 129.99,
    rating: 4.6,
    reviews: 2134,
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmclMjBzdG9yZXxlbnwxfHx8fDE3NzkwNzI5MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 58,
  },
  {
    id: 11,
    name: "Sports Equipment - Professional Fitness Gear",
    price: 64.99,
    originalPrice: 149.99,
    rating: 4.7,
    reviews: 1543,
    image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBlcXVpcG1lbnQlMjBmaXRuZXNzfGVufDF8fHx8MTc3OTEyMDcxNXww&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 57,
  },
  {
    id: 12,
    name: "Educational Toys Set - STEM Learning Kit for Kids",
    price: 27.99,
    originalPrice: 54.99,
    rating: 4.9,
    reviews: 3421,
    image: "https://images.unsplash.com/photo-1599623560574-39d485900c95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3lzJTIwY2hpbGRyZW4lMjBwbGF5ZnVsfGVufDF8fHx8MTc3OTE4MTU3MXww&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 49,
  },
  {
    id: 13,
    name: "Premium Leather Wallet - RFID Blocking Protection",
    price: 18.99,
    originalPrice: 39.99,
    rating: 4.6,
    reviews: 1234,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwd2FsbGV0JTIwYWNjZXNzb3J5fGVufDF8fHx8MTc3OTE4MTU3MXww&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 53,
  },
  {
    id: 14,
    name: "Portable Bluetooth Speaker - Waterproof Design",
    price: 32.99,
    originalPrice: 69.99,
    rating: 4.7,
    reviews: 2876,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVldG9vdGglMjBzcGVha2VyJTIwcG9ydGFibGV8ZW58MXx8fHwxNzc5MTgxNTcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 53,
  },
  {
    id: 15,
    name: "Gaming Mouse - RGB LED High Precision Optical",
    price: 25.99,
    originalPrice: 49.99,
    rating: 4.8,
    reviews: 3987,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb3VzZSUyMGNvbXB1dGVyfGVufDF8fHx8MTc3OTE4MTU3MXww&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 48,
    badge: "Hot",
  },
  {
    id: 16,
    name: "Organic Skincare Set - Natural Beauty Collection",
    price: 29.99,
    originalPrice: 59.99,
    rating: 4.9,
    reviews: 2345,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMGJlYXV0eSUyMHByb2R1Y3RzfGVufDF8fHx8MTc3OTE4MTU3MXww&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 50,
  },
  {
    id: 17,
    name: "Wireless Charging Pad - Fast Charge Technology",
    price: 21.99,
    originalPrice: 44.99,
    rating: 4.5,
    reviews: 1654,
    image: "https://images.unsplash.com/photo-1591290619762-d2c9f7a99a29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGNoYXJnZXIlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3OTE4MTU3MXww&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 51,
  },
  {
    id: 18,
    name: "Stainless Steel Water Bottle - Insulated 32oz",
    price: 16.99,
    originalPrice: 34.99,
    rating: 4.7,
    reviews: 2987,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGJvdHRsZSUyMHN0YWlubGVzcyUyMHN0ZWVsfGVufDF8fHx8MTc3OTE4MTU3MXww&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 51,
  },
];

const falaaaDealsProducts: Product[] = [
  {
    id: 31,
    name: "Smart LED TV 43-inch - 4K Ultra HD Display",
    price: 299.99,
    originalPrice: 599.99,
    rating: 4.7,
    reviews: 3421,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0diUyMHRlbGV2aXNpb24lMjBzY3JlZW58ZW58MXx8fHwxNzc5MTgxNTcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 50,
    badge: "Falaaa",
  },
  {
    id: 32,
    name: "Wireless Gaming Controller - Dual Vibration",
    price: 34.99,
    originalPrice: 69.99,
    rating: 4.8,
    reviews: 5621,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb250cm9sbGVyJTIwd2lyZWxlc3N8ZW58MXx8fHwxNzc5MTgxNTcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 50,
    badge: "Falaaa",
  },
  {
    id: 33,
    name: "Digital Camera - 24MP Professional DSLR",
    price: 449.99,
    originalPrice: 899.99,
    rating: 4.9,
    reviews: 2134,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NzkxODE1NzF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 50,
    badge: "Falaaa",
  },
  {
    id: 34,
    name: "Noise Cancelling Headphones - Premium Audio",
    price: 89.99,
    originalPrice: 199.99,
    rating: 4.6,
    reviews: 4532,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmVzJTIwYXVkaW98ZW58MXx8fHwxNzc5MTgxNTcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 55,
    badge: "Falaaa",
  },
  {
    id: 35,
    name: "Robot Vacuum Cleaner - Smart Navigation",
    price: 159.99,
    originalPrice: 349.99,
    rating: 4.7,
    reviews: 2876,
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdCUyMHZhY3V1bSUyMGNsZWFuZXJ8ZW58MXx8fHwxNzc5MTgxNTcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 54,
  },
  {
    id: 36,
    name: "Instant Pot - 6-Quart Multi-Use Pressure Cooker",
    price: 79.99,
    originalPrice: 149.99,
    rating: 4.9,
    reviews: 6543,
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVzc3VyZSUyMGNvb2tlciUyMGtpdGNoZW58ZW58MXx8fHwxNzc5MTgxNTcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 47,
    badge: "Falaaa",
  },
  {
    id: 37,
    name: "Standing Desk Converter - Adjustable Height",
    price: 119.99,
    originalPrice: 249.99,
    rating: 4.5,
    reviews: 1876,
    image: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFuZGluZyUyMGRlc2slMjBvZmZpY2V8ZW58MXx8fHwxNzc5MTgxNTcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 52,
  },
  {
    id: 38,
    name: "Electric Scooter - Foldable Commuter Model",
    price: 329.99,
    originalPrice: 649.99,
    rating: 4.6,
    reviews: 2341,
    image: "https://images.unsplash.com/photo-1568763992294-977264e5f46c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMHNjb290ZXJ8ZW58MXx8fHwxNzc5MTgxNTcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 49,
    badge: "Falaaa",
  },
  {
    id: 39,
    name: "Espresso Machine - Automatic Milk Frother",
    price: 199.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviews: 3210,
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3ByZXNzbyUyMG1hY2hpbmUlMjBjb2ZmZWV8ZW58MXx8fHwxNzc5MTgxNTcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 50,
  },
  {
    id: 40,
    name: "Monitor 27-inch - QHD 144Hz Gaming Display",
    price: 249.99,
    originalPrice: 499.99,
    rating: 4.7,
    reviews: 4123,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25pdG9yJTIwZ2FtaW5nJTIwZGlzcGxheXxlbnwxfHx8fDE3NzkxODE1NzF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 50,
    badge: "Falaaa",
  },
  {
    id: 41,
    name: "Drone with 4K Camera - GPS Auto Return",
    price: 279.99,
    originalPrice: 599.99,
    rating: 4.6,
    reviews: 1987,
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcm9uZSUyMGNhbWVyYSUyMGFlcmlhbHxlbnwxfHx8fDE3NzkxODE1NzF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 53,
  },
  {
    id: 42,
    name: "Massage Gun - Deep Tissue Percussion Therapy",
    price: 69.99,
    originalPrice: 149.99,
    rating: 4.8,
    reviews: 5234,
    image: "https://images.unsplash.com/photo-1608045742930-e3c2e6b79cdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXNzYWdlJTIwZ3VuJTIwZml0bmVzc3xlbnwxfHx8fDE3NzkxODE1NzF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 53,
    badge: "Falaaa",
  },
];

const dealsProducts: Product[] = [
  {
    id: 19,
    name: "Mechanical Keyboard - RGB Backlit Gaming",
    price: 45.99,
    originalPrice: 109.99,
    rating: 4.8,
    reviews: 4521,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNoYW5pY2FsJTIwa2V5Ym9hcmQlMjBnYW1pbmd8ZW58MXx8fHwxNzc5MTgxNTcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 58,
    badge: "Hot",
  },
  {
    id: 20,
    name: "Smart Fitness Tracker - Heart Rate Monitor",
    price: 28.99,
    originalPrice: 79.99,
    rating: 4.6,
    reviews: 3234,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwdHJhY2tlciUyMHdhdGNofGVufDF8fHx8MTc3OTE4MTU3MXww&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 64,
  },
  {
    id: 21,
    name: "HD Webcam - 1080p Video Streaming Camera",
    price: 35.99,
    originalPrice: 89.99,
    rating: 4.7,
    reviews: 2876,
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWJjYW0lMjBjYW1lcmElMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3OTE4MTU3MXww&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 60,
  },
  {
    id: 22,
    name: "Yoga Mat Set - Non-Slip Exercise Equipment",
    price: 19.99,
    originalPrice: 49.99,
    rating: 4.9,
    reviews: 5432,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbWF0JTIwZXhlcmNpc2V8ZW58MXx8fHwxNzc5MTgxNTcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 60,
    badge: "Flash",
  },
  {
    id: 23,
    name: "Desk Lamp - LED Adjustable Reading Light",
    price: 22.99,
    originalPrice: 54.99,
    rating: 4.5,
    reviews: 1987,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNrJTIwbGFtcCUyMGxlZHxlbnwxfHx8fDE3NzkxODE1NzF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 58,
  },
  {
    id: 24,
    name: "Insulated Lunch Box - Leak Proof Container",
    price: 14.99,
    originalPrice: 34.99,
    rating: 4.6,
    reviews: 2345,
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdW5jaCUyMGJveCUyMGNvbnRhaW5lcnxlbnwxfHx8fDE3NzkxODE1NzF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 57,
  },
  {
    id: 25,
    name: "Hair Dryer - Professional Ionic Technology",
    price: 31.99,
    originalPrice: 79.99,
    rating: 4.8,
    reviews: 3456,
    image: "https://images.unsplash.com/photo-1526045431048-f857369baa09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwZHJ5ZXIlMjBiZWF1dHl8ZW58MXx8fHwxNzc5MTgxNTcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 60,
  },
  {
    id: 26,
    name: "USB-C Hub - 7-in-1 Multiport Adapter",
    price: 26.99,
    originalPrice: 64.99,
    rating: 4.7,
    reviews: 2134,
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2IlMjBodWIlMjBhZGFwdGVyJTIwdGVjaHxlbnwxfHx8fDE3NzkxODE1NzF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 58,
  },
  {
    id: 27,
    name: "Air Purifier - HEPA Filter for Home Office",
    price: 52.99,
    originalPrice: 129.99,
    rating: 4.9,
    reviews: 4987,
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXIlMjBwdXJpZmllciUyMGhvbWV8ZW58MXx8fHwxNzc5MTgxNTcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 59,
    badge: "Hot",
  },
  {
    id: 28,
    name: "Coffee Maker - Programmable Brew Machine",
    price: 38.99,
    originalPrice: 94.99,
    rating: 4.6,
    reviews: 3654,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBtYWtlciUyMG1hY2hpbmV8ZW58MXx8fHwxNzc5MTgxNTcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 59,
  },
  {
    id: 29,
    name: "Electric Toothbrush - Sonic Cleaning Technology",
    price: 24.99,
    originalPrice: 59.99,
    rating: 4.8,
    reviews: 2876,
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b290aGJydXNoJTIwZWxlY3RyaWMlMjBoZWFsdGh8ZW58MXx8fHwxNzc5MTgxNTcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 58,
  },
  {
    id: 30,
    name: "Sunglasses - Polarized UV Protection Designer",
    price: 15.99,
    originalPrice: 39.99,
    rating: 4.7,
    reviews: 3210,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5nbGFzc2VzJTIwZmFzaGlvbiUyMGFjY2Vzc29yeXxlbnwxfHx8fDE3NzkxODE1NzF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 60,
  },
];

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      
      if (existingItem) {
        toast.success("Updated cart quantity!");
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast.success("Added to cart!");
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("Removed from cart");
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white">
      <Header cartCount={totalItems} onCartClick={() => setIsCartOpen(true)} />
      
      <main>
        <HeroSection onAddToCart={handleAddToCart} />
        <CategorySection />
        <FlashDeals products={flashDealsProducts} onAddToCart={handleAddToCart} />
        <BrandCarousel />

        {/* Falaaa Deals Section */}
        <section className="py-12 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Falaaa Deals 😮 <span className="text-purple-600">| Save Up to 50%</span>
              </h2>
              <p className="text-gray-600">Unbelievable prices on amazing products</p>
            </div>
            <ProductGrid products={falaaaDealsProducts} onAddToCart={handleAddToCart} />
          </div>
        </section>

        {/* Recommended Products */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Recommended for You</h2>
              <p className="text-gray-600">Handpicked products just for you</p>
            </div>
            <ProductGrid products={recommendedProducts} onAddToCart={handleAddToCart} />
          </div>
        </section>

        {/* Deals Section */}
        <section className="py-12 bg-gradient-to-br from-blue-50 to-cyan-50">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Deals You Don't Want to Miss <span className="text-orange-500">| Up to 60% off</span>
              </h2>
              <p className="text-gray-600">Limited time offers on top products</p>
            </div>
            <ProductGrid products={dealsProducts} onAddToCart={handleAddToCart} />
          </div>
        </section>
      </main>

      <Footer />

      <ShoppingCartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <Toaster position="bottom-right" />
    </div>
  );
}
