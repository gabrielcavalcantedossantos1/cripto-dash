import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_COIN_API_URL;

export function CoinsDetails() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
          throw new Error("Ocorreu um erro ao buscar as moedas");
        }
        const data = await response.json();
        setCoin(data);
      } catch (error) {
        setError("Ocorreu um erro ao buscar as moedas");
        console.error("Error: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, []);

  return (
    <div className="coin-details-container">
      <Link to="/">⬅️ Voltar para a Home</Link>

      <h1 className="coin-details-title">
        {coin ? (
          `${coin.name} (${coin.symbol.toUpperCase()})`
        ) : (
          <div className="spinner"></div>
        )}
      </h1>

      {loading && <div className="spinner"></div>}

      {error && <div className="error">{error}</div>}
    </div>
  );
}
