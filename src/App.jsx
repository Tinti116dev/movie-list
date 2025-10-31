import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import NavBar from "./components/NavBar";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <MovieProvider>
      <ErrorBoundary>
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </ErrorBoundary>
    </MovieProvider>
  );
}

export default App;