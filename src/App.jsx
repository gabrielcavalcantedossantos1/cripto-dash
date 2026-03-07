import { useEffect, useState } from "react";
const API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=10&page=1&sparkline=false";

const App = () => {
  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setCoins(data);
      } catch (error) {
        setError("Ocorreu um erro ao buscar as moedas");
        console.error("Error: ",error);
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
      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      <ul className="coin-list">
        {coins.map((coin) => (
          <li key={coin.id}>
            <p>{coin.name}</p>
            <p>{coin.symbol}</p>
            <p>{coin.current_price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
