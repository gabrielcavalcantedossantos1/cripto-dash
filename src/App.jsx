import { useEffect, useState } from "react";

import { CoinCard } from "./components/CoinCard";

const API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=10&page=1&sparkline=false";

const App = () => {
  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Ocorreu um erro ao buscar as moedas");
        }
        const data = await response.json();
        setCoins(data);
      } catch (error) {
        setError("Ocorreu um erro ao buscar as moedas");
        console.error("Error: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 

  return (
    <div>
      <h1>🚀 Crypto Dash</h1>
      {loading ? (
        <div className="spinner"></div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <main className="grid">
          {coins.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </main>
      )}
    </div>
  );
};

export default App;
