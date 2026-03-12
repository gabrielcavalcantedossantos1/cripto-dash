import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";

import { formatLargeNumber } from "../../components/utils/formatLargeNumber";

const API_URL = import.meta.env.VITE_COIN_API_URL;

export function CoinsDetails() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

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
        console.log(data);
      } catch (error) {
        setError("Ocorreu um erro ao buscar as moedas");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, [id]);

  const description =
    coin?.description?.pt ||
    coin?.description?.en ||
    "Descrição não disponível";

  const shortDescription =
    description.split(".").slice(0, 3).join(".").trim() + ".";

  return (
    <div className="coin-details-container">
      <Link to="/">⬅️ Voltar para a Home</Link>

      <h1 className="coin-details-title">
        {coin
          ? `${coin.name} (${coin.symbol?.toUpperCase()})`
          : "Detalhe da Moeda"}
      </h1>

      {loading && <div className="spinner"></div>}

      {error && <div className="error">{error}</div>}

      {!loading && !error && coin && (
        <>
          <img
            src={coin.image?.large}
            alt={coin.name}
            className="coin-details-image"
          />

          <p
            dangerouslySetInnerHTML={{
              __html: showFullDescription ? description : shortDescription,
            }}
          ></p>

          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="coin-button"
          >
            {!showFullDescription ? "Mostrar mais" : "Mostrar menos"}
          </button>

          <div className="coin-details-info">
            <h3>Rank: #{coin.market_cap_rank}</h3>

            <h3>
              Preço:{" "}
              {coin.market_data?.current_price?.brl?.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              }) || "N/A"}
            </h3>

            <h4>
              Valor de Mercado:{" "}
              {formatLargeNumber(coin.market_data?.market_cap?.brl) || "N/A"}
            </h4>

            <h4>
              Baixa de 24H:{" "}
              {coin.market_data?.low_24h?.brl?.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              }) || "N/A"}
            </h4>

            <h4>
              Alta de 24H:{" "}
              {coin.market_data?.high_24h?.brl?.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              }) || "N/A"}
            </h4>

            <h4>
              Mudança de preço em 24H:{" "}
              {coin.market_data?.price_change_24h?.toFixed(2) || "N/A"} (
              {coin.market_data?.price_change_percentage_24h?.toFixed(2) ||
                "N/A"}
              %)
            </h4>

            <h4>
              Oferta Disponível:{" "}
              {coin.market_data?.circulating_supply?.toLocaleString("pt-BR") ||
                "N/A"}{" "}
              {coin.symbol?.toUpperCase()}
            </h4>

            <h4>
              Oferta Total:{" "}
              {coin.market_data?.total_supply?.toLocaleString("pt-BR") || "N/A"}{" "}
              {coin.symbol?.toUpperCase()}
            </h4>

            <h4>
              Recorde Histórico:{" "}
              {coin.market_data?.ath?.brl?.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              }) || "N/A"}{" "}
              em{" "}
              {coin.market_data?.ath_date?.brl
                ? new Date(coin.market_data.ath_date.brl).toLocaleDateString(
                    "pt-BR",
                  )
                : "N/A"}
            </h4>

            <h4>
              Menor Preço Histórico:{" "}
              {coin.market_data?.atl?.brl?.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              }) || "N/A"}{" "}
              em{" "}
              {coin.market_data?.atl_date?.brl
                ? new Date(coin.market_data.atl_date.brl).toLocaleDateString(
                    "pt-BR",
                  )
                : "N/A"}
            </h4>

            <h4>
              Mudança de Preço em 7D:{" "}
              {coin.market_data?.price_change_percentage_7d?.toFixed(2) ||
                "N/A"}
              %
            </h4>

            <h4>
              Última atualização:{" "}
              {coin.last_updated
                ? new Date(coin.last_updated).toLocaleString("pt-BR")
                : "N/A"}
            </h4>

            <div className="coin-details-links">
              {coin.links.homepage[0] && (
                <p>
                  🌐{" "}
                  <a
                    href={coin.links.homepage}
                    target="_blank"
                    rel="nooppener noreferrer"
                  >
                    Website
                  </a>{" "}
                </p>
              )}

              {coin.links.blockchain_site[0] && (
                <p>
                  🧩{" "}
                  <a
                    href={coin.links.blockchain_site}
                    target="_blank"
                    rel="nooppener noreferrer"
                  >
                    Blockchain Site
                  </a>{" "}
                </p>
              )}

              {coin.categories.length > 0 && (
                <p>
                  📚 <strong>Categoria</strong>: {coin.categories.join(", ")}
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
