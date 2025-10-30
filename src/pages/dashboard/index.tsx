import { useState, useEffect } from "react";
import { AddExpenseForm } from "@/components/AddExpenseForm";
import { ExpenseList } from "@/components/ExpenseList";
import { ExpenseChart } from "@/components/ExpenseChart";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface Category {
  id: string;
  name: string;
  color: string;
}

interface Expense {
  id: string;
  amount: number;
  description: string;
  date: string;
  category: Category;
}

export default function DashboardPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const { toast } = useToast();

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch categories",
          variant: "destructive",
        });
      }
    };

    fetchCategories();
  }, [toast]);

  // Fetch expenses
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/expenses");
        const data = await response.json();
        setExpenses(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch expenses",
          variant: "destructive",
        });
      }
    };

    fetchExpenses();
  }, [toast]);

  // Handle adding new expense
  const handleAddExpense = async (values: any) => {
    try {
      const response = await fetch("http://localhost:3000/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Failed to add expense");

      const newExpense = await response.json();
      setExpenses((prev) => [...prev, newExpense]);
      toast({
        title: "Success",
        description: "Expense added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add expense",
        variant: "destructive",
      });
    }
  };

  // Handle editing expense
  const handleEditExpense = async (expense: Expense) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/expenses/${expense.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(expense),
        }
      );

      if (!response.ok) throw new Error("Failed to update expense");

      const updatedExpense = await response.json();
      setExpenses((prev) =>
        prev.map((exp) => (exp.id === expense.id ? updatedExpense : exp))
      );
      toast({
        title: "Success",
        description: "Expense updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update expense",
        variant: "destructive",
      });
    }
  };

  // Handle deleting expense
  const handleDeleteExpense = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/expenses/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete expense");

      setExpenses((prev) => prev.filter((exp) => exp.id !== id));
      toast({
        title: "Success",
        description: "Expense deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete expense",
        variant: "destructive",
      });
    }
  };

  // Calculate chart data
  const chartData = categories.map((category) => ({
    category: category.name,
    color: category.color,
    amount: expenses
      .filter((expense) => expense.category.id === category.id)
      .reduce((sum, expense) => sum + expense.amount, 0),
  }));

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Add New Expense</h2>
          <AddExpenseForm categories={categories} onSubmit={handleAddExpense} />
        </Card>
        <ExpenseChart data={chartData} />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Expenses</h2>
        <ExpenseList
          expenses={expenses}
          onEdit={handleEditExpense}
          onDelete={handleDeleteExpense}
        />
      </div>
    </div>
  );
}