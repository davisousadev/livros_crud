import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { SubmitEvent } from "react";
import React from "react";
import { X } from "lucide-react";
import type { Book } from "../../types/types";
import { booksService } from "../../services/booksService";
import { ModalWrapper } from "../modalWrapper";

interface ModalEditBooksProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ModalEditBooks({ book, isOpen, onClose }: ModalEditBooksProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = React.useState(() => ({
    title: book?.title ?? "",
    author: book?.author ?? "",
    rating: String(book?.rating ?? "5"),
    description: book?.description ?? "",
  }));

  const updateBookMutation = useMutation({
    mutationFn: (data: Omit<Book, "id">) =>
      booksService.updateBook(book!.id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["books"] });
      onClose();
    },
  });

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    await updateBookMutation.mutateAsync({
      title: formData.title,
      author: formData.author,
      rating: Number(formData.rating),
      description: formData.description,
    });
  }

  if (!isOpen || !book) {
    return null;
  }

  return (
    <ModalWrapper>
      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 hover:bg-gray-100"
          aria-label="Fechar modal"
        >
          <X className="h-6 w-6 text-gray-600" />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Editar livro</h2>
          <p className="mt-1 text-sm text-gray-600">
            Atualize os dados do livro
          </p>
        </div>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-medium text-gray-700">Título</span>
              <input
                className="rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
                type="text"
                value={formData.title}
                onChange={(event) =>
                  setFormData({ ...formData, title: event.target.value })
                }
                placeholder="Ex: Dom Casmurro"
                required
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-gray-700">Autor</span>
              <input
                className="rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
                type="text"
                value={formData.author}
                onChange={(event) =>
                  setFormData({ ...formData, author: event.target.value })
                }
                placeholder="Ex: Machado de Assis"
                required
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-[180px_1fr]">
            <label className="grid gap-2">
              <span className="text-sm font-medium text-gray-700">Nota</span>
              <input
                className="rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={formData.rating}
                onChange={(event) =>
                  setFormData({ ...formData, rating: event.target.value })
                }
                required
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-gray-700">
                Descrição
              </span>
              <input
                className="rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
                type="text"
                value={formData.description}
                onChange={(event) =>
                  setFormData({ ...formData, description: event.target.value })
                }
                placeholder="Resumo rápido do livro"
                required
              />
            </label>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="rounded-xl bg-gray-900 px-5 py-3 font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-400"
              type="submit"
              disabled={updateBookMutation.isPending}
            >
              {updateBookMutation.isPending ? "Salvando..." : "Atualizar livro"}
            </button>

            <button
              className="rounded-xl border border-gray-300 px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
              type="button"
              onClick={onClose}
              disabled={updateBookMutation.isPending}
            >
              Cancelar
            </button>

            {updateBookMutation.isError ? (
              <p className="text-sm text-red-600">
                Não foi possível atualizar o livro.
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
}
