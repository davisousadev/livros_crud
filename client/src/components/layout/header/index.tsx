interface HeaderProps {
  onAddBookClick: () => void;
}

export function Header({ onAddBookClick }: HeaderProps) {
  return (
    <header className="bg-blue-600 text-white p-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold">Minha Biblioteca</h1>
      <button
        type="button"
        onClick={onAddBookClick}
        className="bg-white text-blue-600 px-4 py-2 rounded-lg mt-2 hover:bg-gray-100"
      >
        Adicionar Livro
      </button>
    </header>
  );
}