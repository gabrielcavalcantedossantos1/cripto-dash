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
              backgroundColor: (context) => {
                const chart = context.chart;
                const { ctx, chartArea } = chart;

                if (!chartArea) return null;

                const gradient = ctx.createLinearGradient(
                  0,
                  chartArea.top,
                  0,
                  chartArea.bottom,
                );

                gradient.addColorStop(0, "rgba(0,123,255,0.4)");
                gradient.addColorStop(1, "rgba(0,123,255,0)");

                return gradient;
              },
              pointRadius: 0,
              tension: 0.3,
            },
          ],
        });
      } catch (error) {
        setError("Ocorreu um erro ao carregar o gráfico");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, [coinId, days]);

  if (loading) return <div className="spinner"></div>;
  if (error) return <p>{error}</p>;
  if (!chartData) return null;

  return (
    <div style={{ marginTop: "30px", width: "100%", height: "400px" }}>
      <label htmlFor="dias" style={{ marginRight: "10px" }}>
        Período do gráfico
      </label>{" "}
      <select
        value={days}
        id="dias"
        onChange={(e) => setDays(Number(e.target.value))}
        className="days-select"
      >
        {PERIOD_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: { mode: "index", intersect: false },
          },
          scales: {
            x: {
              type: "time",
              time: {
                unit: days === 1 ? "hour" : "day",
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 365,
              },
            },
            y: {
              ticks: {
                callback: (v) =>
                  v.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }),
              },
            },
          },
        }}
      />
    </div>
  );
}
const PERIOD_OPTIONS = [
  { label: "1 dia", value: 1 },
  { label: "3 dias", value: 3 },
  { label: "7 dias", value: 7 },
  { label: "15 dias", value: 15 },
  { label: "30 dias", value: 30 },
  { label: "60 dias", value: 60 },
  { label: "90 dias", value: 90 },
  { label: "180 dias", value: 180 },
  { label: "365 dias", value: 365 },
];
