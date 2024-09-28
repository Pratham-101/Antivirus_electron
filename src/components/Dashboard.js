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
];

const Dashboard = () => {
  const [scanning, setScanning] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  const [results, setResults] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState({});

  useEffect(() => {
    let overallInterval;
    let engineIntervals = [];

    if (scanning) {
      // Reset progress for each engine
      setLoadingProgress(antivirusEngines.reduce((acc, engine) => {
        acc[engine.name] = 0;
        return acc;
      }, {}));

      // Start overall progress interval
      overallInterval = setInterval(() => {
        setOverallProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(overallInterval);
            return 100;
          }
          return Math.min(prevProgress + 10, 100); // Increase progress by 10%
        });
      }, 500); // Overall progress every 0.5 seconds

      // Start individual engine progress intervals
      engineIntervals = antivirusEngines.map((engine) => {
        return setInterval(() => {
          setLoadingProgress((prevProgress) => {
            const newProgress = Math.min(prevProgress[engine.name] + 20, 100); // Increase each engine's progress by 20%
            if (newProgress >= 100) {
              clearInterval(engineIntervals);
              return { ...prevProgress, [engine.name]: 100 };
            }
            return { ...prevProgress, [engine.name]: newProgress };
          });
        }, 500);
      });

      return () => {
        clearInterval(overallInterval);
        engineIntervals.forEach(clearInterval);
      };
    }
  }, [scanning]);

  const startScan = () => {
    setScanning(true);
    setScanComplete(false);
    setOverallProgress(0);
    setResults([]);
  };

  useEffect(() => {
    if (overallProgress >= 100) {
      setScanComplete(true);
      setResults(mockScanResults);
    }
  }, [overallProgress]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Multi-Antivirus Scanner Dashboard</h1>

      <div className={styles.grid}>
        {antivirusEngines.map((engine) => (
          <div key={engine.name} className={styles.engineCard}>
            <h2 className={styles.engineName}>{engine.name}</h2>
            <div className={styles.progressBarContainer}>
              <div 
                className={styles.progressBar} 
                style={{ width: `${loadingProgress[engine.name] || 0}%`, backgroundColor: engine.color }} 
              ></div>
            </div>
            {loadingProgress[engine.name] !== undefined && (
              <div className={styles.engineLoading}>
                {loadingProgress[engine.name] < 100 ? 'Checking...' : 'Done'}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.progressCard}>
        <h2 className={styles.cardTitle}>Overall Scan Progress</h2>
        <div className={styles.progressBarContainer}>
          <div 
            className={styles.progressBar} 
            style={{ width: `${overallProgress}%`, transition: 'width 0.5s ease-in-out' }} 
          ></div>
        </div>
        <div className={styles.progressText}>{overallProgress}% Complete</div>
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
