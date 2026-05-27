import { useQuery } from "@tanstack/react-query";
import type { Book } from "../../types/types";
import { booksService } from "../../services/booksService";
import { PenIcon, TrashIcon } from "lucide-react";
import { ModalEditBooks } from "../modalEditBook/index";
import { ModalDeleteBook } from "../modalDeleteBook/index";
import { useModalFunctions } from "../../hooks/modalFunctions";

export function Books() {

  const { selectedItem, activeModal, handleEditClick, handleDeleteClick, handleCloseModal } = useModalFunctions<Book>();

  const {
    data: books = [],
    isLoading,
    isError,
  } = useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: booksService.getBooks,
    retry: 2,
  });

  if (isLoading) return <p className="text-center text-gray-600">Carregando livros...</p>;

  if (isError) {
    return (
      <p className="text-center text-red-600">
        Não foi possível carregar os livros.
      </p>
    );
  }

  if (books.length === 0) return <p className="text-center text-gray-600">Nenhum livro cadastrado.</p>
    

  return (
    <>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
          {books.map((book) => (
            <div
              className="rounded-2xl border border-gray-200 bg-white shadow-sm w-full p-4 m-2"
              key={book.id}
            >
              <h2 className="text-xl font-bold">{book.title}</h2>
              <p className="text-gray-600 italic">{book.author}</p>
              <div className="w-full bg-black h-1 rounded-full mb-2" />
              <p className="text-gray-700 max-h-30 overflow-hidden text-ellipsis overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-white">
                {book.description}
              </p>
              <div className="flex gap-4 mt-4">
                <TrashIcon
                  size={35}
                  className="bg-red-500 text-white p-2 rounded-full cursor-pointer"
                  onClick={() => handleDeleteClick(book)}
                />
                <PenIcon
                  size={35}
                  className="bg-blue-500 text-white p-2 rounded-full cursor-pointer"
                  onClick={() => handleEditClick(book)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <ModalEditBooks
        book={selectedItem}
        isOpen={activeModal === "edit"}
        onClose={handleCloseModal}
      />

      <ModalDeleteBook
        book={selectedItem}
        isOpen={activeModal === "delete"}
        onClose={handleCloseModal}
      />
    </>
  );
}
