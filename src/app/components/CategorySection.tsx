import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const categories = [
  {
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1620783770629-122b7f187703?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljcyUyMGdhZGdldHMlMjBwcm9kdWN0fGVufDF8fHx8MTc3OTE4MTU2OXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmclMjBzdG9yZXxlbnwxfHx8fDE3NzkwNzI5MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "Home Decor",
    image: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwZGVjb3IlMjBpdGVtc3xlbnwxfHx8fDE3NzkxODE1NzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "Beauty",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBjb3NtZXRpY3MlMjBwcm9kdWN0c3xlbnwxfHx8fDE3NzkwOTYwNzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "Sports",
    image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBlcXVpcG1lbnQlMjBmaXRuZXNzfGVufDF8fHx8MTc3OTEyMDcxNXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "Toys",
    image: "https://images.unsplash.com/photo-1599623560574-39d485900c95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3lzJTIwY2hpbGRyZW4lMjBwbGF5ZnVsfGVufDF8fHx8MTc3OTE4MTU3MXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "Kitchen",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwYXBwbGlhbmNlcyUyMG1vZGVybnxlbnwxfHx8fDE3NzkxODE1NzF8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "Jewelry",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXdlbHJ5JTIwYWNjZXNzb3JpZXMlMjBsdXh1cnl8ZW58MXx8fHwxNzc5MDE4MTk2fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function CategorySection() {
  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">Shop by Category</h2>
      </div>

      <div className="relative">
        <div className="flex animate-marquee-slow gap-4">
          {[...categories, ...categories].map((category, index) => (
            <div
              key={`${category.name}-${index}`}
              className="group cursor-pointer transition-all duration-300 flex-shrink-0 flex flex-col items-center gap-3"
            >
              <div className="w-32 h-32 relative overflow-hidden rounded-full shadow-md hover:shadow-xl transition-shadow">
                <ImageWithFallback
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">{category.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
