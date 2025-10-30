import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { CategoryBadge } from "@/components/CategoryBadge";
import type { Expense } from "@/pages/Index";

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

export const ExpenseList = ({ expenses, onDeleteExpense }: ExpenseListProps) => {
  return (
    <Card className="p-6 border-border bg-card shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-foreground">Recent Transactions</h2>
      
      {expenses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No expenses yet. Add your first expense to get started!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/5 transition-all duration-300 group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <CategoryBadge category={expense.category} />
                  <p className="text-sm text-muted-foreground">
                    {new Date(expense.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <p className="text-sm text-foreground font-medium truncate">{expense.description}</p>
              </div>
              
              <div className="flex items-center gap-4 ml-4">
                <p className="text-lg font-bold text-accent">
                  ${expense.amount.toFixed(2)}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteExpense(expense.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
