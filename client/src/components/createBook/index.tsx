import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { SubmitEvent } from "react";
import React from "react";
import { booksService } from "../../services/booksService";

export function CreateBook() {
  const queryClient = useQueryClient();
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [rating, setRating] = React.useState("5");
  const [description, setDescription] = React.useState("");

  const createBookMutation = useMutation({
    mutationFn: booksService.createBook,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["books"] });
      setTitle("");
      setAuthor("");
      setRating("5");
      setDescription("");
    },
  });

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    await createBookMutation.mutateAsync({
      title,
      author,
      rating: Number(rating),
      description,
    });
  }

  return (
    <section className="mx-auto m-8 max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Novo livro</h2>
        <p className="mt-1 text-sm text-gray-600">
          Preencha os dados abaixo para criar um novo registro.
        </p>
      </div>

      <form className="grid gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-gray-700">Título</span>
            <input
              className="rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Ex: Dom Casmurro"
              required
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-gray-700">Autor</span>
            <input
              className="rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
              type="text"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              placeholder="Ex: Machado de Assis"
              required
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-[180px_1fr]">
          <label className="flex flex-col gap-2 items-start">
            <span className="text-sm font-medium text-gray-700 h-fit">
              Nota
            </span>
            <div className="w-full h-full">
              <input
                className="rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900 h-fit w-full"
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={rating}
                onChange={(event) => setRating(event.target.value)}
                required
              />
            </div>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-gray-700">Descrição</span>
            <textarea
              className="rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900 resize-none"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Resumo rápido do livro"
              rows={4}
              required
            />
          </label>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="rounded-xl bg-gray-900 px-5 py-3 font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            type="submit"
            disabled={createBookMutation.isPending}
          >
            {createBookMutation.isPending ? "Salvando..." : "Criar livro"}
          </button>

          {createBookMutation.isError ? (
            <p className="text-sm text-red-600">
              Não foi possível criar o livro.
            </p>
          ) : null}
        </div>
      </form>
    </section>
  );
}
