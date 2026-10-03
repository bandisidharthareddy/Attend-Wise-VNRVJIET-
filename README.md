# Attend-Wise: VNR VJIET Attendance Companion

A lightweight Manifest V3 Chrome extension designed to help students at VNR VJIET calculate, predict, and manage attendance directly alongside the student portal.

## Overview

The standard college portal displays your current attendance figures, but does not provide forward-looking insights such as remaining classes in the semester, how many classes you can afford to miss, or what your attendance will look like before you take time off.

**Attend-Wise** runs directly inside the browser. It reads your attendance figures and weekly timetable from the active portal tab, factors in your semester calendar, holidays, and extra working days, and calculates safe bunk allowances and attendance projections.

All computations are executed locally in the browser. No login credentials or attendance records are transmitted to external servers.

## Features

- **Portal Data Extraction**: Automatically extracts attended periods, total periods, and current attendance percentage directly from the portal DOM using regex pattern matching.
- **Timetable Parsing**: Scrapes the weekly timetable schedule from the portal table, automatically excluding non-instructional slots (e.g., LIBRARY, ECA, CCA, MTP) to calculate true weekly period loads.
- **Calendar Customization**: Allows students to configure the semester end date, add custom holidays, and define extra working days (stored persistently via `chrome.storage.local`).
- **Safe Bunk Calculator**: Calculates the safe margin of classes that can be missed while remaining comfortably above the college's 75% attendance threshold.
- **Interactive Attendance Simulator**: Provides an interactive bunk slider that lets students simulate missing $N$ future periods and immediately view the projected attendance percentage.
- **Contextual Status Commentary**: Features a collection of humorous Telugu commentary messages tailored to different attendance brackets (e.g., >90%, 80-90%, 75-80%, <75%).

## Tech Stack

- **Platform**: Chrome Extension Manifest V3
- **Languages**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Chrome APIs**: `chrome.tabs`, `chrome.scripting`, `chrome.storage.local`

## How It Works

```text
VNR Student Portal DOM
         │
         ▼
[Script Injection via chrome.scripting]
 ├── Regex match: Attended / Total / Percentage
 └── Parse weekly timetable table (filters out non-instructional slots)
         │
         ▼
[Date & Schedule Computation]
 ├── Exclude Sundays & user holidays
 ├── Include extra scheduled working days
 └── Estimate remaining instructional periods
         │
         ▼
[Outputs in Extension Popup]
 ├── Current percentage display
 ├── Safe bunk threshold (to preserve >= 75%)
 └── Interactive bunk slider simulator with contextual Telugu messages
```

## Project Structure

```text
Attend-Wise-VNRVJIET-/
├── manifest.json   # Chrome extension configuration (Manifest V3)
├── content.js      # Content script
├── popup.html      # Popup interface layout
├── popup.js        # DOM extraction, calendar math, simulation & storage logic
├── styles.css      # Popup styling and responsive layout
└── README.md
```

## Installation & Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/bandisidharthareddy/Attend-Wise-VNRVJIET-.git
   cd Attend-Wise-VNRVJIET-
   ```

2. Open Google Chrome and navigate to:
   ```text
   chrome://extensions
   ```

3. Enable **Developer Mode** using the toggle switch in the top right corner.

4. Click **Load unpacked** in the top left corner.

5. Select the `Attend-Wise-VNRVJIET-` folder.

6. Log in to the [VNR Student Automation Portal](https://automation.vnrvjiet.ac.in).

7. Click the **Attend-Wise** extension icon in your Chrome toolbar to open the dashboard.

## Disclaimer

Attend-Wise is an independent, student-developed open-source utility. It is **not affiliated with or endorsed by VNR VJIET**. The extension operates strictly client-side on the user's active session and does not alter any official college records.

## Author

Bandi Sidhartha Reddy  
- GitHub: [bandisidharthareddy](https://github.com/bandisidharthareddy)  
- LinkedIn: [Bandi Sidhartha Reddy](https://www.linkedin.com/in/bandisidharthareddy/)
