// ChartComponent.js

import { useState, useEffect } from 'react';

export default function ChartComponent() {

  const [chart, setChart] = useState(null);

  useEffect(() => {
    async function fetchChart() {
      const response = await fetch('/charts/chart.png') // API endpoint
      const imageUrl = response.url; // Get URL of image
      setChart(imageUrl); // Set image state
    }
    fetchChart();
  }, []);

  return (
    <img src={chart} /> // Display image
  );

}