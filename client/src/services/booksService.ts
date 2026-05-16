import type { Book } from "../types/types";

const API_URL = "http://localhost:5000";

export const booksService = {
  async getBooks(): Promise<Book[]> {
    const response = await fetch(`${API_URL}/books`);
    const data = await response.json();
    return data;
  },

  async createBook(book: Omit<Book, "id">): Promise<Book> {
    const response = await fetch(`${API_URL}/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });
    const data = await response.json();
    return data;
  },

  async updateBook(id: number, book: Omit<Book, "id">): Promise<Book> {
    const response = await fetch(`${API_URL}/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });
    const data = await response.json();
    return data;
  },

  async deleteBook(id: number): Promise<void> {
    await fetch(`${API_URL}/books/${id}`, {
      method: "DELETE",
    });
  },
};
