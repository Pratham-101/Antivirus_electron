import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';

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
    <div className={styles.container}>
      <h1 className={styles.title}>Multi-Antivirus Scanner Dashboard</h1>
      
      <div className={styles.engineGrid}>
        {antivirusEngines.map((engine) => (
          <div key={engine.name} className={styles.engineCard}>
            <h2 className={styles.engineName}>{engine.name}</h2>
            <div className={styles.engineBar} style={{backgroundColor: engine.color}}></div>
          </div>
        ))}
      </div>

      <div className={styles.progressCard}>
        <h2 className={styles.cardTitle}>Scan Progress</h2>
        <div className={styles.progressBarContainer}>
          <div className={styles.progressBar} style={{width: `${progress}%`}}></div>
        </div>
        <div className={styles.progressText}>{progress}% Complete</div>
      </div>

      <div className={styles.actionArea}>
        <button 
          onClick={startScan} 
          disabled={scanning}
          className={scanning ? styles.buttonDisabled : styles.button}
        >
          {scanning ? 'Scanning...' : 'Start Scan'}
        </button>
        {scanComplete && (
          <div className={styles.alertBox}>
            <p className={styles.alertTitle}>Scan Completed</p>
            <p>All files have been scanned. Check the results below.</p>
          </div>
        )}
      </div>

      <div className={styles.resultsCard}>
        <h2 className={styles.cardTitle}>Scan Results</h2>
        {results.length > 0 ? (
          <ul className={styles.resultsList}>
            {results.map((file, index) => (
              <li key={index} className={styles.resultItem}>
                <span>{file.fileName}</span>
                <span className={file.status === 'clean' ? styles.statusClean : styles.statusInfected}>
                  {file.status === 'clean' ? 'Clean' : 'Infected'}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.noResults}>No scan results yet. Start a scan to see results.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;