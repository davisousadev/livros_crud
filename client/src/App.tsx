import React from "react";
import { Books } from "./components/books/index.tsx";
import { Header } from "./components/layout/header/index.tsx";
import { CreateBook } from "./components/createBook/index.tsx";

function App() {
  const [isCreateBookModalOpen, setIsCreateBookModalOpen] = React.useState(false);

  return (
    <>
      <Header onAddBookClick={() => setIsCreateBookModalOpen(true)} />
      <main className="container mx-auto p-4">
        <Books />
      </main>

      <CreateBook
        isOpen={isCreateBookModalOpen}
        onClose={() => setIsCreateBookModalOpen(false)}
      />
    </>
  );
}

export default App;
