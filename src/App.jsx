import React, { useState } from 'react';
import DefineStep from './components/DefineStep';
import PlanStep from './components/PlanStep';
import CollectStep from './components/CollectStep';
import AnalyzeStep from './components/AnalyzeStep'; // YENİ: İçe aktarıldı

function App() {
  const [currentStep, setCurrentStep] = useState(1);

  // TÜM PROJE VERİSİ
  const [projectData, setProjectData] = useState({
    projectName: 'My ISO 15939 Project',
    selectedScenario: null,
    // ISO 25010 Karakteristikleri
    characteristics: [
      { id: 'func', name: 'Functional Suitability', selected: false, weight: 0, metrics: [] },
      { id: 'perf', name: 'Performance Efficiency', selected: false, weight: 0, metrics: [] },
      { id: 'comp', name: 'Compatibility', selected: false, weight: 0, metrics: [] },
      { id: 'usab', name: 'Usability', selected: false, weight: 0, metrics: [] },
      { id: 'rel',  name: 'Reliability', selected: false, weight: 0, metrics: [] },
      { id: 'sec',  name: 'Security', selected: false, weight: 0, metrics: [] },
      { id: 'maint', name: 'Maintainability', selected: false, weight: 0, metrics: [] },
      { id: 'port', name: 'Portability', selected: false, weight: 0, metrics: [] }
    ]
  });

  // NAVİGASYON MANTIĞI
  const nextStep = () => {
    // ADIM 1 KONTROLÜ
    if (currentStep === 1) {
      const selectedCount = projectData.characteristics.filter(c => c.selected).length;
      if (selectedCount === 0) {
        alert("Please select at least one quality characteristic.");
        return;
      }
      // Otomatik Ağırlık Dağıtımı
      if (projectData.selectedScenario && projectData.characteristics.some(c => c.selected && c.weight === 0)) {
         const count = selectedCount;
         const baseWeight = Math.floor(100 / count);
         const remainder = 100 % count;
         const newChars = projectData.characteristics.map((c, index) => {
             if (c.selected) {
                 return { ...c, weight: baseWeight + (index < remainder ? 1 : 0) };
             }
             return c;
         });
         setProjectData({...projectData, characteristics: newChars});
      }
    }

    // ADIM 2 KONTROLÜ
    if (currentStep === 2) {
      const totalWeight = projectData.characteristics
        .filter(c => c.selected)
        .reduce((sum, c) => sum + (c.weight || 0), 0);
      if (totalWeight !== 100) {
        alert(`Total weight must be 100%. Currently: ${totalWeight}%`);
        return;
      }
    }

    if (currentStep === 4) {
      // Başa dön (Reset)
      if(window.confirm("Start a new measurement? Current data will be lost.")) {
        window.location.reload(); 
      }
      return;
    }

    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="container">
      {/* HEADER */}
      <h1 className="app-title">ISO 15939 Measurement Process Simulator</h1>
      <p className="app-subtitle">Learn software quality measurement using ISO 25010 quality model</p>

      {/* STEP INDICATOR */}
      <div className="step-indicator">
        <div className={`step ${currentStep === 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
          <div className="step-circle">{currentStep > 1 ? '✓' : '1'}</div>
          <div className="step-label">Define</div>
        </div>
        <div className={`step ${currentStep === 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
          <div className="step-circle">{currentStep > 2 ? '✓' : '2'}</div>
          <div className="step-label">Plan</div>
        </div>
        <div className={`step ${currentStep === 3 ? 'active' : ''} ${currentStep > 3 ? 'completed' : ''}`}>
          <div className="step-circle">{currentStep > 3 ? '✓' : '3'}</div>
          <div className="step-label">Collect</div>
        </div>
        <div className={`step ${currentStep === 4 ? 'active' : ''}`}>
          <div className="step-circle">4</div>
          <div className="step-label">Analyse</div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="content-area">
        {currentStep === 1 && (
            <div>
                <h2 className="section-title">Step 1: Define Quality Dimensions</h2>
                <p className="section-subtitle">Select the ISO 25010 quality characteristics to measure.</p>
                <DefineStep data={projectData} setData={setProjectData} />
            </div>
        )}
        
        {currentStep === 2 && (
             <div>
                <h2 className="section-title">Step 2: Plan - Assign Weights</h2>
                <PlanStep data={projectData} setData={setProjectData} />
             </div>
        )}

        {currentStep === 3 && (
             <div>
                <h2 className="section-title">Step 3: Collect Data</h2>
                <CollectStep data={projectData} setData={setProjectData} />
             </div>
        )}

        {currentStep === 4 && (
             <div>
                <h2 className="section-title">Step 4: Analysis & Results</h2>
                <AnalyzeStep data={projectData} />
             </div>
        )}
      </div>

      {/* NAVIGATION */}
      <div className="navigation">
        <button className="nav-btn" onClick={prevStep} disabled={currentStep === 1}>Previous</button>
        <div className="nav-info">{currentStep} / 4</div>
        <button 
          className="nav-btn" 
          onClick={nextStep}
          style={currentStep === 4 ? {backgroundColor: '#48bb78'} : {}}
        >
          {currentStep === 4 ? 'New Measurement' : 'Next'}
        </button>
      </div>
    </div>
  );
}

export default App;