import React from 'react';

const PlanStep = ({ data, setData }) => {
  // Sadece "selected: true" olan özellikleri filtrele
  const selectedChars = data.characteristics.filter(c => c.selected);

  // Ağırlık Değişimini Yönet
  const handleWeightChange = (id, value) => {
    // Sadece sayı girilmesini sağla
    const val = value === '' ? 0 : parseInt(value);
    
    if (isNaN(val)) return;

    const updatedCharacteristics = data.characteristics.map(char => {
      if (char.id === id) {
        return { ...char, weight: val };
      }
      return char;
    });

    setData({
      ...data,
      characteristics: updatedCharacteristics
    });
  };

  // Toplam Ağırlığı Hesapla
  const totalWeight = data.characteristics
    .filter(c => c.selected)
    .reduce((sum, char) => sum + (char.weight || 0), 0);

  const isTotalValid = totalWeight === 100;

  return (
    <div>
      <div className="section-header">
        <p className="section-subtitle">
          Assign percentage weights to each selected dimension. Total must equal 100%.
        </p>
      </div>

      {data.selectedScenario && data.selectedScenario !== 'custom' && (
        <div style={{ background: '#dbeafe', border: '2px solid #93c5fd', borderRadius: '8px', padding: '15px', marginBottom: '25px' }}>
          <p style={{ color: '#1e40af', fontSize: '0.95em', margin: 0 }}>
            <strong>Case Study Mode:</strong> You can adjust the pre-configured weights below.
          </p>
        </div>
      )}

      <div className="weight-list">
        {selectedChars.map((char) => (
          <div key={char.id} className="weight-item">
            <div className="weight-label">{char.name}</div>
            <div className="weight-input-group">
              <input 
                type="text" 
                className="weight-input" 
                value={char.weight} 
                onChange={(e) => handleWeightChange(char.id, e.target.value)}
                maxLength="3"
              />
              <span className="weight-percent">%</span>
            </div>
          </div>
        ))}
      </div>

      <div className={`total-weight ${!isTotalValid ? 'error' : ''}`}>
        <span className="total-weight-text">
          {isTotalValid ? 'Total Weight Correct' : 'Total Weight must be 100%'}
        </span>
        <span className="total-weight-value">{totalWeight}%</span>
      </div>
    </div>
  );
};

export default PlanStep;