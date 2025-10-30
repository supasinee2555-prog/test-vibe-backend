import { ShoppingBag, Utensils, Car, Film, Receipt, Heart, GraduationCap, Package } from "lucide-react";

interface CategoryBadgeProps {
  category: string;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Food & Dining":
      return <Utensils className="w-3.5 h-3.5" />;
    case "Transportation":
      return <Car className="w-3.5 h-3.5" />;
    case "Shopping":
      return <ShoppingBag className="w-3.5 h-3.5" />;
    case "Entertainment":
      return <Film className="w-3.5 h-3.5" />;
    case "Bills & Utilities":
      return <Receipt className="w-3.5 h-3.5" />;
    case "Healthcare":
      return <Heart className="w-3.5 h-3.5" />;
    case "Education":
      return <GraduationCap className="w-3.5 h-3.5" />;
    default:
      return <Package className="w-3.5 h-3.5" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Food & Dining":
      return "bg-chart-1/10 text-chart-1 border-chart-1/20";
    case "Transportation":
      return "bg-chart-2/10 text-chart-2 border-chart-2/20";
    case "Shopping":
      return "bg-chart-3/10 text-chart-3 border-chart-3/20";
    case "Entertainment":
      return "bg-chart-4/10 text-chart-4 border-chart-4/20";
    case "Bills & Utilities":
      return "bg-chart-5/10 text-chart-5 border-chart-5/20";
    case "Healthcare":
      return "bg-destructive/10 text-destructive border-destructive/20";
    case "Education":
      return "bg-primary/10 text-primary border-primary/20";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

export const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${getCategoryColor(category)}`}>
      {getCategoryIcon(category)}
      <span>{category}</span>
    </div>
  );
};
