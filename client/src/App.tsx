import { Books } from "./components/books/index.tsx";
import { Header } from "./components/layout/header/index.tsx";
import { CreateBook } from "./components/createBook/index.tsx";
import { useModalFunctions } from "./hooks/modalFunctions.tsx";

function App() {
  const {handleCloseModal, activeModal, handleOpenCreateModal} = useModalFunctions();

  return (
    <>
      <Header onAddBookClick={handleOpenCreateModal} />
      <main className="container mx-auto p-4">
        <Books />
      </main>

      <CreateBook
        isOpen={activeModal === "create"}
        onClose={handleCloseModal}
      />
    </>
  );
}

export default App;
