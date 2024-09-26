# Multi-Antivirus Scanner Dashboard

## Overview

The **Multi-Antivirus Scanner Dashboard** is a web-based application built with React that simulates scanning files for viruses using multiple antivirus engines. It provides a user-friendly interface to initiate scans, display progress, and present scan results. Additionally, the application is integrated with Electron to create a cross-platform desktop application.

## Features

- **Multi-Antivirus Support**: Simulates scanning files with multiple antivirus engines.
- **Scan Progress Tracking**: Displays the progress of the scanning operation.
- **Scan Results Display**: Shows results indicating whether files are clean or infected.
- **Desktop Application**: Built with Electron for a native desktop experience.

## Technologies Used

- **Frontend**: React, CSS Modules
- **Backend**: Electron (for desktop application)
- **Icons**: Lucide React (for UI icons)

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/nonvegetable/antivirus-electron-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd antivirus-electron-app
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

4. To run the application in development mode:
   ```bash
   npm start
   ```

To build the Electron app, you may need to package it using a tool like electron-packager or electron-builder. Follow their respective documentation for packaging instructions.

## Usage

1. Launch the application to view the dashboard.
2. Click on the Start Scan button to initiate a scan.
3. Monitor the progress bar for scanning updates.
4. Once completed, check the scan results displayed below.

## Running Electron

To run the Electron version of the app:

1. Ensure you have Electron installed. If not, install it globally:
   ```bash
   npm install -g electron
   ```

2. Start the Electron application:
   ```bash
   electron .
   ```

This will open the application in a native window.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you have any suggestions or improvements.