import React, { useState, useEffect } from 'react';

const antivirusEngines = [
  { name: 'Windows Defender', color: '#3b82f6' },
  { name: 'Trend Micro Maximum Security', color: '#ef4444' },
  { name: 'ESET Internet Security', color: '#22c55e' },
];

const mockScanResults = [
  { fileName: 'document1.pdf', status: 'clean' },
  { fileName: 'image.jpg', status: 'infected' },
  { fileName: 'script.js', status: 'clean' },
  { fileName: 'archive.zip', status: 'infected' },
];

const Dashboard = () => {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (scanning) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            setScanning(false);
            setScanComplete(true);
            return 100;
          }
          return prevProgress + 10;
        });
      }, 500);

      return () => clearInterval(interval);
    }
  }, [scanning]);

  const startScan = () => {
    setScanning(true);
    setScanComplete(false);
    setProgress(0);
    setResults([]);
  };

  useEffect(() => {
    if (scanComplete) {
      setResults(mockScanResults);
    }
  }, [scanComplete]);

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Multi-Antivirus Scanner Dashboard</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {antivirusEngines.map((engine) => (
          <div key={engine.name} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 'medium', marginBottom: '8px' }}>{engine.name}</h2>
            <div style={{ width: '100%', height: '8px', backgroundColor: engine.color, borderRadius: '4px' }}></div>
          </div>
        ))}
      </div>

      <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>Scan Progress</h2>
        <div style={{ width: '100%', height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px' }}>
          <div style={{ width: `${progress}%`, height: '100%', backgroundColor: '#3b82f6', borderRadius: '4px' }}></div>
        </div>
        <div style={{ marginTop: '8px', fontSize: '14px', color: '#6b7280' }}>{progress}% Complete</div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <button 
          onClick={startScan} 
          disabled={scanning}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: scanning ? '#9ca3af' : '#3b82f6', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: scanning ? 'not-allowed' : 'pointer' 
          }}
        >
          {scanning ? 'Scanning...' : 'Start Scan'}
        </button>
        {scanComplete && (
          <div style={{ padding: '8px 16px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>
            <p style={{ fontWeight: 'bold' }}>Scan Completed</p>
            <p>All files have been scanned. Check the results below.</p>
          </div>
        )}
      </div>

      <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>Scan Results</h2>
        {results.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {results.map((file, index) => (
              <li key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', backgroundColor: '#f3f4f6', borderRadius: '4px', marginBottom: '8px' }}>
                <span>{file.fileName}</span>
                <span style={{ color: file.status === 'clean' ? '#22c55e' : '#ef4444' }}>
                  {file.status === 'clean' ? 'Clean' : 'Infected'}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ textAlign: 'center', color: '#6b7280' }}>No scan results yet. Start a scan to see results.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;