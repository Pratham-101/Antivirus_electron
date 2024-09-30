import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';

const antivirusEngines = [
  { name: 'Windows Defender', color: '#3b82f6' },
  { name: 'Trend Micro Maximum Security', color: '#ef4444' },
  { name: 'ESET Internet Security', color: '#22c55e' },
];

const mockScanResults = [
  { fileName: 'keylog.txt', status: 'clean' },
  { fileName: 'keylogger.exe', status: 'infected' },
  { fileName: 'keylogger.py', status: 'infected' },
];

const Dashboard = () => {
  const [scanning, setScanning] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  const [results, setResults] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState({});
  const [expandedFile, setExpandedFile] = useState(null);
  const [showChatBot, setShowChatBot] = useState(false);
  
  // Chat bot state
  const [userInput, setUserInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    let overallInterval;
    let engineIntervals = [];

    if (scanning) {
      setLoadingProgress(antivirusEngines.reduce((acc, engine) => {
        acc[engine.name] = 0;
        return acc;
      }, {}));

      overallInterval = setInterval(() => {
        setOverallProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(overallInterval);
            return 100;
          }
          return Math.min(prevProgress + 10, 100);
        });
      }, 500);

      engineIntervals = antivirusEngines.map((engine) => {
        return setInterval(() => {
          setLoadingProgress((prevProgress) => {
            const newProgress = Math.min(prevProgress[engine.name] + 20, 100);
            if (newProgress >= 100) {
              clearInterval(engineIntervals[antivirusEngines.indexOf(engine)]);
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

  const toggleExpand = (fileName) => {
    setExpandedFile(expandedFile === fileName ? null : fileName);
  };

  const toggleChatBot = () => {
    setShowChatBot(!showChatBot);
  };

  // Handle user question submission
  const handleUserInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleUserSubmit = () => {
    if (userInput.trim()) {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'user', text: userInput },
        { sender: 'ai', text: `AI Response: You asked about "${userInput}"` }, // Simulated AI response
      ]);
      setUserInput('');
    }
  };

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <h3 className={styles.sidebarTitle}>Dashboard</h3>
        <ul className={styles.sidebarMenu}>
          <li>Scan</li>
          <li>Updates</li>
          <li onClick={toggleChatBot}>Chat bot</li>
        </ul>
      </div>

      {/* Main Dashboard Content */}
      <div className={styles.mainContent}>
        <h1 className={styles.title}>Multi-Antivirus Scanner Dashboard</h1>

        <div className={styles.grid}>
          {antivirusEngines.map((engine) => (
            <div key={engine.name} className={styles.engineCard}>
              <h2 className={styles.engineName}>{engine.name}</h2>
              <div className={styles.progressBarContainer}>
                <div
                  className={styles.progressBar}
                  style={{
                    width: `${loadingProgress[engine.name] || 0}%`,
                    backgroundColor: engine.color,
                  }}
                />
              </div>
              {loadingProgress[engine.name] !== undefined && (
                <div className={styles.engineLoading}>
                  {loadingProgress[engine.name] < 100 ? 'Checking...' : 'Done'}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Overall Scan Progress */}
        <div className={styles.progressCard}>
          <h2 className={styles.cardTitle}>Overall Scan Progress</h2>
          <div className={styles.progressBarContainer}>
            <div
              className={styles.progressBar}
              style={{
                width: `${overallProgress}%`,
                backgroundColor: '#ffffff',
                transition: 'width 0.5s ease-in-out',
              }}
            />
          </div>
          <div className={styles.progressText}>{overallProgress}% Complete</div>
        </div>

        {/* Start Scan Button */}
        <div className={styles.actionArea}>
          <button
            onClick={startScan}
            disabled={scanning}
            className={`${styles.button} ${scanning ? styles.buttonDisabled : ''}`}
          >
            {scanComplete ? 'Done' : scanning ? 'Scanning...' : 'Start Scan'}
          </button>
        </div>

        {/* Scan Results */}
        {scanComplete && (
          <>
            {mockScanResults.map((result, index) => (
              <div key={index} className={styles.resultsCard}>
                <h2 className={styles.cardTitle} onClick={() => toggleExpand(result.fileName)}>
                  {result.fileName}
                  <span>{expandedFile === result.fileName ? ' ▲' : ' ▼'}</span>
                </h2>
                {expandedFile === result.fileName && (
                  <ul className={styles.resultsList}>
                    {antivirusEngines.map((engine) => (
                      <li key={engine.name} className={styles.resultItem}>
                        <span>{engine.name}</span>
                        <span
                          className={
                            result.status === 'clean' ? styles.statusClean : styles.statusInfected
                          }
                        >
                          {result.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </>
        )}

        {/* Alert Box */}
        {scanComplete && (
          <div className={styles.alertBox}>
            All engines have completed the scan. Please review the results above.
          </div>
        )}
      </div>

      {/* Chatbot Popup */}
      {showChatBot && (
        <div className={styles.chatBotPopup}>
          <h3>Chat Bot</h3>
          <div className={styles.chatBotContent}>
            <div className={styles.chatMessages}>
              {chatMessages.map((msg, index) => (
                <div key={index} className={styles.chatMessage}>
                  <strong>{msg.sender === 'user' ? 'You' : 'AI'}:</strong> {msg.text}
                </div>
              ))}
            </div>
            <input
              type="text"
              value={userInput}
              onChange={handleUserInputChange}
              placeholder="Type your question..."
              className={styles.chatInput}
            />
            <button onClick={handleUserSubmit} className={styles.chatSubmitButton}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
