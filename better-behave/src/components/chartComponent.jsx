import { useState, useEffect } from 'react';

export default function ChartComponent() {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    // async function fetchChart() {
    //   const response = await fetch('/charts/chart.png') // API endpoint
    //   console.log(response)
    //   const imageUrl = response.url; // Get URL of image
    //   setChart(imageUrl); // Set image state
    // }
    // fetchChart();
  }, []);

  const iframeStyle = {
    width: '100%',
    height: '30%',
    border: 'none',
  };

  return (
    <iframe src='http://localhost:5000/' style={iframeStyle} title="Chart" /> 
  );
}
