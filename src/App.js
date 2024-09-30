import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
// import SidebarDrawer from './components/SidebarDrawer';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <SidebarDrawer /> */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* Add more routes here as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
