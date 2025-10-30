import { useState } from "react";
import { Card } from "@/components/ui/card";
import { AddExpenseForm } from "@/components/AddExpenseForm";
import { ExpenseList } from "@/components/ExpenseList";
import { ExpenseChart } from "@/components/ExpenseChart";
import { Wallet, TrendingDown, Calendar } from "lucide-react";

export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

const Index = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "1",
      amount: 45.99,
      category: "Food & Dining",
      description: "Grocery shopping",
      date: new Date().toISOString().split('T')[0],
    },
    {
      id: "2",
      amount: 120.00,
      category: "Transportation",
      description: "Monthly metro pass",
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    },
  ]);

  const addExpense = (expense: Omit<Expense, "id">) => {
    const newExpense = {
      ...expense,
      id: Date.now().toString(),
    };
    setExpenses([newExpense, ...expenses]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const monthExpenses = expenses.filter(
    (e) => new Date(e.date).getMonth() === new Date().getMonth()
  ).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-md">
              <Wallet className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Expense Tracker</h1>
          </div>
          <p className="text-muted-foreground ml-14">Track and manage your expenses effortlessly</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6 hover:shadow-lg transition-all duration-300 border-border bg-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
                <p className="text-3xl font-bold text-foreground">${totalExpenses.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-accent/10 rounded-lg">
                <TrendingDown className="w-5 h-5 text-accent" />
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all duration-300 border-border bg-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">This Month</p>
                <p className="text-3xl font-bold text-foreground">{monthExpenses}</p>
                <p className="text-xs text-muted-foreground mt-1">transactions</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all duration-300 border-border bg-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Average/Transaction</p>
                <p className="text-3xl font-bold text-foreground">
                  ${expenses.length > 0 ? (totalExpenses / expenses.length).toFixed(2) : "0.00"}
                </p>
              </div>
              <div className="p-3 bg-success/10 rounded-lg">
                <Wallet className="w-5 h-5 text-success" />
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add Expense Form */}
          <div className="lg:col-span-1">
            <AddExpenseForm onAddExpense={addExpense} />
          </div>

          {/* Expenses Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chart */}
            <ExpenseChart expenses={expenses} />

            {/* Expense List */}
            <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
