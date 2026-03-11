import { useEffect } from "react";

//paginas
import { Home } from "./page/home";

//routes
import { Routes, Route } from "react-router";
import { About } from "./page/about";
import { NotFound } from "./page/notFound";

//context
import { useMyContext } from "./context/context";

//components
import { Header } from "./components/header";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const { setLoading, setCoins, setError, limit } = useMyContext();

  useEffect(() => {
    if (!API_URL) {
      setError("API_URL não encontrada");
      return;
    }

    const fetchCoins = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`,
        );

        if (!response.ok) {
          throw new Error("Ocorreu um erro ao buscar as moedas");
        }
        const data = await response.json();
        setCoins(Array.isArray(data) ? data : []);
      } catch (error) {
        setError("Ocorreu um erro ao buscar as moedas");
        console.error("Error: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [limit]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
