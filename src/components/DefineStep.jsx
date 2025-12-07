import React from 'react';

const DefineStep = ({ data, setData }) => {

  // Hazır Senaryo Verileri
  const caseStudies = [
    {
      id: 'iot',
      title: 'IoT System',
      desc: 'Internet of Things device with resource constraints and connectivity requirements.',
      targets: ['perf', 'rel', 'sec', 'comp'] // Bu ID'leri otomatik seçecek
    },
    {
      id: 'health',
      title: 'Safety Critical (Health)',
      desc: 'Healthcare system where reliability and accuracy are life-critical.',
      targets: ['rel', 'sec', 'func', 'usab']
    },
    {
      id: 'mobile',
      title: 'Mobile Application',
      desc: 'Consumer mobile app focused on user experience and cross-platform compatibility.',
      targets: ['usab', 'perf', 'comp', 'port']
    }
  ];

  // Senaryo Seçme Fonksiyonu
  const handleScenarioSelect = (scenario) => {
    // 1. Tüm özellikleri sıfırla (seçimleri kaldır)
    const resetCharacteristics = data.characteristics.map(char => ({
      ...char,
      selected: false
    }));

    // 2. Senaryoya ait olanları 'true' yap
    const updatedCharacteristics = resetCharacteristics.map(char => {
      if (scenario.targets.includes(char.id)) {
        return { ...char, selected: true };
      }
      return char;
    });

    // 3. State'i güncelle
    setData({
      ...data,
      selectedScenario: scenario.id,
      characteristics: updatedCharacteristics
    });
  };

  // Manuel Özellik Seçme/Kaldırma Fonksiyonu
  const toggleCharacteristic = (id) => {
    const updatedCharacteristics = data.characteristics.map(char => {
      if (char.id === id) {
        return { ...char, selected: !char.selected };
      }
      return char;
    });

    setData({
      ...data,
      selectedScenario: 'custom', // Manuel seçim yapıldığı için 'custom' olur
      characteristics: updatedCharacteristics
    });
  };

  // Seçili özellik sayısını hesapla
  const selectedCount = data.characteristics.filter(c => c.selected).length;

  return (
    <div>
      {/* --- BÖLÜM 1: HAZIR SENARYOLAR --- */}
      <div className="case-study-container">
        <div className="case-study-title">
          📋 Load Predefined Case Study
        </div>
        <div className="case-cards">
          {caseStudies.map((scenario) => (
            <div 
              key={scenario.id}
              className={`case-card ${data.selectedScenario === scenario.id ? 'selected' : ''}`}
              onClick={() => handleScenarioSelect(scenario)}
            >
              <div className="case-card-title">{scenario.title}</div>
              <div className="case-card-desc">{scenario.desc}</div>
              <div className="case-card-info">{scenario.targets.length} dimensions included</div>
            </div>
          ))}
        </div>
      </div>

      <h3 style={{ marginTop: '30px', marginBottom: '15px', color: '#2d3748', fontSize: '1.2em' }}>
        Or Select Dimensions Manually (ISO 25010)
      </h3>

      {/* --- BÖLÜM 2: MANUEL SEÇİM KARTLARI --- */}
      <div className="dimension-grid">
        {data.characteristics.map((char) => (
          <div 
            key={char.id}
            className={`dimension-card ${char.selected ? 'selected' : ''}`}
            onClick={() => toggleCharacteristic(char.id)}
          >
            <div className="dimension-info">
              <h3>{char.name}</h3>
              <p>Click to select/deselect</p>
            </div>
            <div className="check-icon">
              {char.selected && '✓'}
            </div>
          </div>
        ))}
      </div>

      <p style={{ marginTop: '20px', color: '#718096' }}>
        Selected: <span style={{ color: '#4c51bf', fontWeight: '600' }}>{selectedCount} dimension(s)</span>
      </p>
    </div>
  );
};

export default DefineStep;