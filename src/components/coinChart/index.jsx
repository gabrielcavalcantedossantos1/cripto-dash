import { useEffect, useState } from "react";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
);

const API_URL = import.meta.env.VITE_COIN_API_URL;

export function CoinChart({ coinId }) {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [days, setDays] = useState(7);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${API_URL}/${coinId}/market_chart?vs_currency=brl&days=${days}`,
        );

        if (!response.ok) {
          throw new Error("Ocorreu um erro ao buscar as moedas");
        }

        const data = await response.json();
        const prices = data.prices.map((price) => ({
          x: price[0],
          y: price[1],
        }));

        console.log("Preços", prices);
        setChartData({
          datasets: [
            {
              label: "Preço (BRL)",
              data: prices,
              fill: true,
              borderColor: "#007bff",
              backgroundColor: "rgba(0,123,255,0.1)",
              pointRadius: 0,
              tension: 0.3,
            },
          ],
        });
      } catch (error) {
        setError("Ocorreu um erro ao buscar as moedas");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, [coinId, days]);

  return <>chart</>;
}
