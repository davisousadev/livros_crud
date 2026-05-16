import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2, X } from "lucide-react";
import type { Book } from "../../types/types";
import { booksService } from "../../services/booksService";
import { ModalWrapper } from "../modalWrapper/index";

interface ModalDeleteBookProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ModalDeleteBook({
  book,
  isOpen,
  onClose,
}: ModalDeleteBookProps) {
  const queryClient = useQueryClient();

  const deleteBookMutation = useMutation({
    mutationFn: () => booksService.deleteBook(book!.id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["books"] });
      onClose();
    },
  });

  async function handleDelete() {
    await deleteBookMutation.mutateAsync();
  }

  if (!isOpen || !book) {
    return null;
  }

  return (
    <ModalWrapper>
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 transition hover:bg-gray-100"
          aria-label="Fechar modal"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>

        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <Trash2 className="h-6 w-6 text-red-600" />
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">Deletar livro?</h2>
            <p className="mt-2 text-sm text-gray-600">
              Tem certeza que deseja deletar{" "}
              <span className="font-semibold">{book.title}</span>? Essa ação não
              pode ser desfeita.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-gray-300 px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-50"
            disabled={deleteBookMutation.isPending}
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="rounded-xl bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-300"
            disabled={deleteBookMutation.isPending}
          >
            {deleteBookMutation.isPending ? "Deletando..." : "Deletar"}
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}
