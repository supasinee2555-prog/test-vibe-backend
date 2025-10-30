const API_URL = "http://localhost:3000/api";

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface Expense {
  id: string;
  amount: number;
  description: string;
  date: string;
  category: Category;
}

export const api = {
  expenses: {
    getAll: async (): Promise<Expense[]> => {
      const response = await fetch(`${API_URL}/expenses`);
      if (!response.ok) throw new Error("Failed to fetch expenses");
      return response.json();
    },

    create: async (data: Omit<Expense, "id">): Promise<Expense> => {
      const response = await fetch(`${API_URL}/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create expense");
      return response.json();
    },

    update: async (id: string, data: Partial<Expense>): Promise<Expense> => {
      const response = await fetch(`${API_URL}/expenses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update expense");
      return response.json();
    },

    delete: async (id: string): Promise<void> => {
      const response = await fetch(`${API_URL}/expenses/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete expense");
    },
  },

  categories: {
    getAll: async (): Promise<Category[]> => {
      const response = await fetch(`${API_URL}/categories`);
      if (!response.ok) throw new Error("Failed to fetch categories");
      return response.json();
    },

    create: async (data: Omit<Category, "id">): Promise<Category> => {
      const response = await fetch(`${API_URL}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create category");
      return response.json();
    },

    update: async (id: string, data: Partial<Category>): Promise<Category> => {
      const response = await fetch(`${API_URL}/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update category");
      return response.json();
    },

    delete: async (id: string): Promise<void> => {
      const response = await fetch(`${API_URL}/categories/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete category");
    },
  },
};