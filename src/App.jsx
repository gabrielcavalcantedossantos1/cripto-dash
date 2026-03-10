import { useEffect, useState } from "react";

import { CoinCard } from "./components/CoinCard";
import { LimitSelector } from "./components/limitSelector";
import { FilterInput } from "./components/filterInput";
import { SortSelector } from "./components/sortSelector";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_desc");

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

  const filteredCoins = coins
    .filter((coin) => {
      return (
        coin.name.toLowerCase().includes(filter.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(filter.toLowerCase())
      );
    })
    .slice()
    .sort((a, b) => {
      switch (sortBy) {
        case "market_cap_desc":
          return b.market_cap - a.market_cap;
        case "market_cap_asc":
          return a.market_cap - b.market_cap;
        case "price_desc":
          return b.current_price - a.current_price;
        case "price_asc":
          return a.current_price - b.current_price;
        case "change_desc":
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        case "change_asc":
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
        default:
          return 0;
      }
    });

  return (
    <div>
      <h1>🚀 Crypto Dash</h1>

      <div className="top-controls">
        <FilterInput filter={filter} setFilter={setFilter} />

        <SortSelector sortBy={sortBy} setSortBy={setSortBy} />

        <LimitSelector limit={limit} setLimit={setLimit} />
      </div>

      {loading ? (
        <div className="spinner"></div>
      ) : error ? (
        <div style={{ textAlign: "center" }}>{error}</div>
      ) : (
        <main className="grid">
          {filteredCoins.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </main>
      )}
    </div>
  );
};

export default App;
