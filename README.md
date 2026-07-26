# Attend-Wise-VNRVJIET-

# 🎓 Attendance Companion

> A Chrome extension that helps students understand, predict, and manage their attendance using mathematical calculations based on their timetable and academic calendar.

---

## Overview

Attendance Companion is a lightweight Chrome extension that works alongside the VNR VJIET Student Portal to provide insights that the portal itself doesn't.

Instead of simply displaying your current attendance, the extension estimates how your attendance will change throughout the semester based on your timetable and academic calendar.

Using your current attendance, weekly class schedule, semester duration, holidays, and additional working days, it predicts how many classes remain, calculates safe bunk limits, and lets you simulate future attendance before deciding to miss classes.

Everything is calculated locally inside your browser using straightforward mathematics and date-based logic.

---

## Features

### 📊 Attendance Dashboard

* Displays current attendance percentage.
* Reads attendance directly from the student portal.
* Shows your attendance at a glance.

---

### 📅 Automatic Timetable Analysis

The extension analyses your weekly timetable to determine:

* Number of classes each weekday
* Weekly academic load
* Remaining instructional periods in the semester

Unlike generic attendance calculators, predictions are based on your actual class schedule.

---

### 📆 Semester-Based Prediction

Attendance calculations consider:

* Semester end date
* Weekly timetable
* Sundays (excluded automatically)
* User-defined holidays
* Extra working days

This allows predictions to adapt whenever the academic calendar changes.

---

### 📈 Safe Bunk Calculator

Rather than showing only the theoretical maximum number of classes you can miss, the extension recommends a practical safe range that leaves room for unexpected absences.

---

### 🔮 Attendance Simulator

Experiment with different numbers of future bunks to instantly see:

* Projected attendance percentage
* Impact on eligibility
* Remaining attendance margin

This helps students make informed decisions before skipping classes.

---

### ⚙️ Custom Academic Calendar

Users can:

* Set the semester end date
* Add holidays
* Remove holidays
* Add extra working days
* Update the calendar whenever the college schedule changes

---

### 😂 Fun Messages

To make attendance checking a little less boring, the extension includes a collection of humorous Telugu messages that change depending on your attendance status.

---

## How It Works

```
Current Attendance
        │
        ▼
Read Weekly Timetable
        │
        ▼
Calculate Remaining Teaching Days
        │
        ▼
Exclude Sundays
        │
        ▼
Apply Holidays
        │
        ▼
Include Extra Working Days
        │
        ▼
Estimate Remaining Periods
        │
        ▼
Calculate Safe Bunk Limit
        │
        ▼
Generate Attendance Projection
```

---

## Technology

* JavaScript
* HTML5
* CSS3
* Chrome Extension Manifest V3
* Chrome Storage API
* Chrome Scripting API

No backend services.

No external APIs.

No cloud processing.

Everything runs locally.

---

## Installation

1. Clone this repository.

```bash
git clone https://github.com/yourusername/attendance-companion.git
```

2. Open Chrome.

3. Navigate to:

```
chrome://extensions
```

4. Enable **Developer Mode**.

5. Click **Load unpacked**.

6. Select this project folder.

7. Open the VNR Student Portal.

---

## Future Improvements

* Subject-wise attendance analysis
* Attendance history graphs
* Calendar integration
* Automatic academic calendar import
* Attendance notifications
* Multiple college support

---

## Disclaimer

Attendance Companion is an independent student-developed project.

It is **not affiliated with or endorsed by VNR VJIET**.

The extension only reads information already visible to the logged-in user and performs all calculations locally inside the browser. It does not modify attendance records or communicate with external servers.

---

### Built for students who prefer planning ahead instead of calculating attendance after every bunk.
