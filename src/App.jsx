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
        console.log(data);
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
        <div className="grid">
          {coins.map((coin) => {
            return (
              <div className="coin-container" key={coin.id}>
                <div className="coin-row">
                  <div className="coin">
                    <img src={coin.image} alt={coin.name} />
                    <h1>{coin.name}</h1>
                  </div>
                  <div className="coin-data">
                    <p className="coin-price">${coin.current_price}</p>
                    <p className="coin-volume">${coin.market_cap}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default App;
