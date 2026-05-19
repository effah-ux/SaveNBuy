import { Truck, Wallet, Smartphone, ChevronRight } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free shipping on all orders",
    subtitle: "Limited-time offer",
    iconColor: "text-green-400",
    bgColor: "bg-green-400/20",
  },
  {
    icon: Wallet,
    title: "Delivery guarantee",
    subtitle: "Refund for any issues",
    iconColor: "text-yellow-400",
    bgColor: "bg-yellow-400/20",
  },
  {
    icon: Smartphone,
    title: "Get the SaveNBuy App",
    subtitle: "Download now",
    iconColor: "text-yellow-400",
    bgColor: "bg-yellow-400/20",
  },
];

export function BrandCarousel() {
  return (
    <section className="bg-black text-white py-3 border-y border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 group cursor-pointer hover:bg-gray-900 p-2 rounded-lg transition-colors"
            >
              <div className={`${feature.bgColor} rounded-full p-2`}>
                <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white text-sm mb-0">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-400">{feature.subtitle}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-500 group-hover:text-white transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
