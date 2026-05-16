import { useQuery } from "@tanstack/react-query";
import React from "react";
import type { Book } from "../../types/types";
import { booksService } from "../../services/booksService";
import { PenIcon, TrashIcon } from "lucide-react";
import { ModalEditBooks } from "../modalEditBook/index";
import { ModalDeleteBook } from "../modalDeleteBook/index";

export function Books() {
  const [selectedBook, setSelectedBook] = React.useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedBookToDelete, setSelectedBookToDelete] =
    React.useState<Book | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

  const {
    data: books = [],
    isLoading,
    isError,
  } = useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: booksService.getBooks,
  });

  function handleEditClick(book: Book) {
    setSelectedBook(book);
    setIsModalOpen(true);
  }

  function handleDeleteClick(book: Book) {
    setSelectedBookToDelete(book);
    setIsDeleteModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedBook(null);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
    setSelectedBookToDelete(null);
  }

  if (isLoading) {
    return <p className="text-center text-gray-600">Carregando livros...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-600">
        Não foi possível carregar os livros.
      </p>
    );
  }

  if (books.length === 0) {
    return (
      <p className="text-center text-gray-600">Nenhum livro cadastrado.</p>
    );
  }

  return (
    <>
      <div>
        <h1 className="text-3xl text-center font-bold mb-2 text-gray-900">
          Minha Biblioteca
        </h1>
        <div className="flex flex-wrap ">
          {books.map((book) => (
            <div
              className="rounded-2xl border border-gray-200 bg-white shadow-sm w-1/4 p-4 m-2"
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
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <ModalDeleteBook
        book={selectedBookToDelete}
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
      />
    </>
  );
}
