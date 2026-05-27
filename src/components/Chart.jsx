import React from "react";

// Lightweight SVG sparkline based on a coin's rate
function Chart({ currency }) {
  const points = Array.from({ length: 30 }, (_, i) => {
    const t = i / 29;
    const variation =
      Math.sin(t * Math.PI * 2 * (1 + (currency.rate % 3))) * 0.03;
    const jitter = ((i % 7) - 3) * 0.002;
    return currency.rate * (1 + variation + jitter);
  });

  const min = Math.min(...points);
  const max = Math.max(...points);

  const width = 220;
  const height = 60;

  const pathPoints = points
    .map((v, i) => {
      const x = (i / (points.length - 1)) * width;
      const y = height - ((v - min) / (max - min || 1)) * height;
      return `${x},${y}`;
    })
    .join(" ");

  const polygonPoints = `${pathPoints} ${width},${height} 0,${height}`;

  return (
    <div className="chart-card">
      <div className="chart-header">
        <strong>{currency.name}</strong>
        <span className="code">{currency.code}</span>
      </div>

      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="sparkline"
        role="img"
        aria-label={`${currency.name} sparkline`}
      >
        <defs>
          <linearGradient id={`g-${currency.code}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#58dbe6" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        <polygon points={polygonPoints} fill={`url(#g-${currency.code})`} />
        <polyline
          points={pathPoints}
          fill="none"
          stroke="#58dbe6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default Chart;
