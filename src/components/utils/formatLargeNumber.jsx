export function formatLargeNumber(value) {
    if (value >= 1_000_000_000_000) {
      return (value / 1_000_000_000_000).toFixed(1) + " T";
    }

    if (value >= 1_000_000_000) {
      return (value / 1_000_000_000).toFixed(1) + " B";
    }

    if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(1) + " M";
    }

    return value.toLocaleString("pt-BR");
  }