import { Books } from "./components/books/index.tsx";
import { CreateBook } from "./components/createBook/index.tsx";

function App() {
  return (
    <main className="container mx-auto p-4">
      <Books />
      <CreateBook />
    </main>
  );
}

export default App;
