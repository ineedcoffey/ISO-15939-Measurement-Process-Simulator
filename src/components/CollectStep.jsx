import React, { useEffect } from 'react';

// ISO 25023 Standart Metrik Kütüphanesi
const METRIC_LIBRARY = {
  func: [
    { id: 'm_func_1', name: 'Functional Completeness', desc: 'Missing functions / Total functions', unit: '%', min: 0, max: 100, default: 95, inverse: false },
    { id: 'm_func_2', name: 'Functional Correctness', desc: 'Correct functions / Total functions', unit: '%', min: 0, max: 100, default: 98, inverse: false }
  ],
  perf: [
    { id: 'm_perf_1', name: 'Mean Response Time', desc: 'Average time to respond to user input', unit: 'ms', min: 0, max: 5000, default: 200, inverse: true },
    { id: 'm_perf_2', name: 'CPU Utilization', desc: 'Average processor usage under load', unit: '%', min: 0, max: 100, default: 45, inverse: true }
  ],
  comp: [
    { id: 'm_comp_1', name: 'Co-existence', desc: 'Conflicts with other installed software', unit: 'count', min: 0, max: 100, default: 0, inverse: true },
    { id: 'm_comp_2', name: 'Data Exchangeability', desc: 'Successful data exchange formats', unit: '%', min: 0, max: 100, default: 100, inverse: false }
  ],
  usab: [
    { id: 'm_usab_1', name: 'Task Success Rate', desc: 'Users completing task successfully', unit: '%', min: 0, max: 100, default: 90, inverse: false },
    { id: 'm_usab_2', name: 'User Error Rate', desc: 'User errors per task session', unit: 'count', min: 0, max: 50, default: 2, inverse: true }
  ],
  rel: [
    { id: 'm_rel_1', name: 'Availability', desc: 'System uptime percentage', unit: '%', min: 0, max: 100, default: 99.9, inverse: false },
    { id: 'm_rel_2', name: 'Mean Recovery Time', desc: 'Time to recover from failure', unit: 'min', min: 0, max: 600, default: 5, inverse: true }
  ],
  sec: [
    { id: 'm_sec_1', name: 'Vulnerability Density', desc: 'Known vulnerabilities per KLOC', unit: 'v/KLOC', min: 0, max: 100, default: 0.5, inverse: true },
    { id: 'm_sec_2', name: 'Encryption Strength', desc: 'Key length conformity (100=Pass)', unit: 'score', min: 0, max: 100, default: 100, inverse: false }
  ],
  maint: [
    { id: 'm_maint_1', name: 'Modularity', desc: 'Coupling dependency score', unit: 'score', min: 0, max: 100, default: 80, inverse: false },
    { id: 'm_maint_2', name: 'Reusability', desc: 'Assets usable in other systems', unit: '%', min: 0, max: 100, default: 30, inverse: false }
  ],
  port: [
    { id: 'm_port_1', name: 'Installability', desc: 'Installation time', unit: 'min', min: 0, max: 120, default: 2, inverse: true },
    { id: 'm_port_2', name: 'Adaptability', desc: 'Environments supported without change', unit: 'count', min: 0, max: 50, default: 3, inverse: false }
  ]
};

const CollectStep = ({ data, setData }) => {
  // Sadece seçili özellikleri al
  const selectedChars = data.characteristics.filter(c => c.selected);

  // Bileşen yüklendiğinde: Eğer metrikler boşsa, kütüphaneden varsayılanları yükle
  useEffect(() => {
    let hasChanges = false;
    const updatedCharacteristics = data.characteristics.map(char => {
      // Seçiliyse VE henüz metriği yoksa
      if (char.selected && (!char.metrics || char.metrics.length === 0)) {
        hasChanges = true;
        return { 
          ...char, 
          metrics: METRIC_LIBRARY[char.id] || [] // Kütüphaneden çek
        };
      }
      return char;
    });

    if (hasChanges) {
      setData({ ...data, characteristics: updatedCharacteristics });
    }
  }, [data.characteristics, data.selectedScenario]); // Bağımlılıklar

  // Input değişimini yönet
  const handleMetricChange = (charId, metricId, value) => {
    // Sayısal giriş kontrolü (Boş veya geçerli sayı)
    if (value !== '' && isNaN(Number(value))) return;

    const updatedCharacteristics = data.characteristics.map(char => {
      if (char.id === charId) {
        const updatedMetrics = char.metrics.map(m => {
          if (m.id === metricId) {
            return { ...m, value: value }; // Değeri güncelle
          }
          return m;
        });
        return { ...char, metrics: updatedMetrics };
      }
      return char;
    });

    setData({ ...data, characteristics: updatedCharacteristics });
  };

  return (
    <div>
      <div className="section-header">
        <p className="section-subtitle">
          Enter simulated measurement values for each sub-characteristic based on ISO 25023 metrics.
        </p>
      </div>

      <div className="metrics-container">
        {selectedChars.map((char) => (
          <div key={char.id} className="metric-dimension">
            <div className="metric-dimension-title">{char.name}</div>
            
            <div className="metric-items">
              {char.metrics && char.metrics.length > 0 ? (
                char.metrics.map((metric) => (
                  <div key={metric.id} className="metric-item">
                    <div className="metric-row">
                      <div>
                        <div className="metric-name">{metric.name}</div>
                        <div className="metric-desc">{metric.desc}</div>
                      </div>
                      <div className="metric-input-row">
                        <input
                          type="text"
                          className="metric-input"
                          value={metric.value !== undefined ? metric.value : metric.default}
                          onChange={(e) => handleMetricChange(char.id, metric.id, e.target.value)}
                        />
                        <span className="metric-unit">{metric.unit}</span>
                      </div>
                    </div>
                    <div className="metric-info">
                      <span>Range: {metric.min} - {metric.max}</span>
                      {metric.inverse && <span className="inverse-badge">Lower is better</span>}
                    </div>
                  </div>
                ))
              ) : (
                <p style={{color: '#718096'}}>Loading standard metrics...</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectStep;