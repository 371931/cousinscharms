import { Sparkles } from "lucide-react";

export default function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "h-8",
    md: "h-12",
    lg: "h-20",
  };

  return (
    <div className={`flex flex-col items-center ${sizes[size]}`}>
      <div className="relative flex items-center justify-center">
        <div className="rounded-full bg-charm-yellow border-2 border-charm-black p-2 flex items-center justify-center">
          <div className="text-charm-black font-bold text-center">
            <div className="relative">
              <Sparkles
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-charm-black sparkle"
                size={size === "lg" ? 24 : size === "md" ? 16 : 12}
              />
              <div className="text-xs sm:text-sm md:text-base lg:text-lg tracking-tight">
                COUSINS_CHARMS
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
