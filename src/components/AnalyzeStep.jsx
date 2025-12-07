import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const AnalyzeStep = ({ data }) => {
  const selectedChars = data.characteristics.filter(c => c.selected);

  const calculateMetricScore = (metric) => {
    let val = parseFloat(metric.value !== undefined ? metric.value : metric.default);
    if (val < metric.min) val = metric.min;
    if (val > metric.max) val = metric.max;

    let score = 0;
    if (metric.inverse) {
        score = ((metric.max - val) / (metric.max - metric.min)) * 100;
    } else {
        score = ((val - metric.min) / (metric.max - metric.min)) * 100;
    }
    return Math.round(score);
  };

  const scores = selectedChars.map(char => {
    if (!char.metrics || char.metrics.length === 0) return { ...char, score: 0 };
    const totalMetricScore = char.metrics.reduce((acc, m) => acc + calculateMetricScore(m), 0);
    const avgScore = Math.round(totalMetricScore / char.metrics.length);
    return { ...char, score: avgScore };
  });

  const overallScore = scores.reduce((acc, char) => {
    return acc + (char.score * (char.weight / 100));
  }, 0).toFixed(1);

  let ratingText = "Poor";
  if (overallScore >= 90) ratingText = "Excellent";
  else if (overallScore >= 80) ratingText = "Very Good";
  else if (overallScore >= 60) ratingText = "Good";
  else if (overallScore >= 40) ratingText = "Fair";

  const chartData = {
    labels: scores.map(c => c.name),
    datasets: [
      {
        label: 'Quality Score',
        data: scores.map(c => c.score),
        backgroundColor: 'rgba(76, 81, 191, 0.2)',
        borderColor: '#4c51bf',
        borderWidth: 2,
        pointBackgroundColor: '#4c51bf',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#4c51bf'
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { color: '#e2e8f0' },
        grid: { color: '#e2e8f0' },
        pointLabels: {
          font: { size: 12, weight: '600', family: "'Segoe UI', sans-serif" },
          color: '#4a5568'
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: { stepSize: 20, backdropColor: 'transparent', display: false } // Ticks gizlendi daha temiz görünüm için
      },
    },
    plugins: {
      legend: { display: false }
    }
  };

  const recommendations = scores
    .filter(c => c.score < 80) // 80 altı için öneri verelim
    .map(c => {
        switch(c.id) {
            case 'perf': return "Optimize database queries, enable caching, and compress assets to improve response times.";
            case 'sec': return "Conduct a security audit, enforce strong authentication, and review data encryption protocols.";
            case 'rel': return "Implement redundancy systems and improve error handling to maximize availability.";
            case 'usab': return "Conduct A/B testing, simplify navigation flows, and ensure accessibility standards are met.";
            case 'comp': return "Verify API standards and test integration with legacy systems.";
            case 'maint': return "Refactor code to reduce complexity and improve modularity for easier maintenance.";
            case 'port': return "Containerize the application (e.g., Docker) to ensure consistency across environments.";
            case 'func': return "Review user requirements and implement missing core functionalities.";
            default: return `Focus on improving ${c.name} metrics.`;
        }
    });

  return (
    <div>
      <div className="section-header">
        <p className="section-subtitle">
          Analysis results based on ISO 25010 quality model and ISO 15939 measurement process.
        </p>
      </div>

      <div className="results-grid">
        {/* 1. KART: GENEL SKOR */}
        <div className="result-card">
          <h3>Overall Weighted Quality Score</h3>
          <div className="result-score">
            {overallScore}<span style={{fontSize: '0.4em', opacity: 0.7}}>/100</span>
          </div>
          <div className="result-rating">{ratingText} Quality</div>
        </div>

        {/* 2. KART: RADAR GRAFİĞİ */}
        <div className="radar-chart">
          <div className="chart-title">Quality Dimensions Radar Chart </div>
          <div style={{ width: '100%', height: '300px', position: 'relative' }}>
            <Radar data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* 3. KART: GAP ANALİZİ */}
        <div className="gap-analysis">
          <div className="chart-title">⚠️ Gap Analysis (Target: 100)</div>
          <div style={{marginTop: '15px'}}>
            {scores.map(char => (
              <div key={char.id} className={`gap-item ${char.score < 60 ? 'critical' : (char.score < 80 ? 'moderate' : '')}`}>
                <div style={{display:'flex', alignItems:'center'}}>
                  <span className="gap-name">{char.name}</span>
                  {char.score < 60 && <span className="gap-badge critical">Critical</span>}
                  {char.score >= 60 && char.score < 80 && <span className="gap-badge moderate">Moderate</span>}
                </div>
                <div className="gap-score">
                  <div className="gap-score-value">{char.score}</div>
                  {char.score < 100 ? (
                      <div className="gap-score-diff">Gap: -{100 - char.score}</div>
                  ) : (
                      <div className="gap-score-diff" style={{color:'green'}}>Perfect</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. KART: ÖNERİLER */}
        <div className="recommendations">
          <div className="chart-title" style={{color: '#434190'}}>💡 Automated Recommendations</div>
          <div style={{marginTop: '20px'}}>
            {recommendations.length > 0 ? (
              recommendations.map((rec, index) => (
                <div key={index} className="recommendation-item">
                  <div className="rec-number">{index + 1}.</div>
                  <div className="rec-text">{rec}</div>
                </div>
              ))
            ) : (
              <div className="recommendation-item" style={{background: '#f0fff4', border: '1px solid #9ae6b4'}}>
                  <div className="rec-number" style={{color: '#2f855a'}}>✓</div>
                  <div className="rec-text" style={{color: '#22543d'}}>
                      Excellent work! All quality dimensions are performing at a high level. No critical improvements needed.
                  </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyzeStep;