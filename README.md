# ISO 15939 Measurement Process Simulator

An interactive web-based educational tool designed to simulate the **ISO/IEC 15939 Measurement Process** using the **ISO/IEC 25010 System and Software Quality Models**.

This tool guides users through the full measurement lifecycle: from defining information needs to analyzing quantified results with visualizations.

## 🚀 Features

The application follows a structured 4-step "Wizard" process:

1.  **Define (ISO 25010):**
    * Select quality characteristics based on **ISO/IEC 25010** standard (Functional Suitability, Performance Efficiency, Security, etc.).
    * Includes predefined case studies (IoT System, Healthcare, Mobile App).
2.  **Plan:**
    * Assign weights to selected quality dimensions.
    * Validates that total weight equals 100% logic.
3.  **Collect (ISO 25023):**
    * Input simulated measurement data using **ISO/IEC 25023** standard metrics.
    * Supports various unit types (ms, %, count, score).
4.  **Analyze (ISO 15939):**
    * **Radar Chart Visualization:** Compare performance across dimensions.
    * **Gap Analysis:** Identify critical weaknesses.
    * **Automated Recommendations:** Context-aware improvement suggestions based on low scores.

## 🛠️ Tech Stack

* **Framework:** React (Vite)
* **Language:** JavaScript (ES6+)
* **Styling:** Custom CSS (Modern Dashboard UI)
* **Visualization:** Chart.js & React-Chartjs-2
* **Standard Compliance:** ISO/IEC 15939, ISO/IEC 25010, ISO/IEC 25023

## 📦 Installation & Usage

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ineedcoffey/ISO-15939-Measurement-Process-Simulator.git
    cd iso-simulator
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open in browser:**
    Visit `http://localhost:5173` to start the simulation.

## 📚 References

* **ISO/IEC 15939:** Systems and software engineering — Measurement process.
* **ISO/IEC 25010:2011:** Systems and software Quality Requirements and Evaluation (SQuaRE) — System and software quality models.
* **ISO/IEC 25023:2016:** Measurement of system and software product quality.

---
Developed as a Software Quality Assurance project.