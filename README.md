# Doomscan

`Doomscan` is a high-density, web-based infrastructure reconnaissance utility. It provides automated asset discovery, network interface mapping, and historical path telemetry in a single, monolithic environment.

## Features

* **Infrastructure Fingerprinting:** Identifies server environments, backend frameworks, and missing security headers.
* **Network Interface Mapping:** Scans for exposed TCP/IP ports on the target asset.
* **Subdomain Inventory:** Automated DNS enumeration to discover related infrastructure.
* **Historical Telemetry:** Integrates with the Wayback Machine API to uncover forgotten or hidden endpoints (`?id=`, `/api/`, etc.).

## Architecture

* **Backend:** Python / FastAPI (REST API, multi-threaded scanning engine)
* **Frontend:** React / Vite (High-density data inspector UI)
* **Styling:** Tailwind CSS (Obsidian/Emerald palette)

## Installation

### 1. Initialize the Core Engine (Backend)
Requires Python 3.8+

```bash
cd backend
pip install -r requirements.txt
python api.py
```
*The engine will start listening on `http://localhost:8000`.*

### 2. Initialize the Inspector (Frontend)
Requires Node.js 18+

```bash
cd annihilator-web
npm install
npm run dev
```
*The web dashboard will be accessible at `http://localhost:5173`.*

## Usage

1. Launch both the backend and frontend servers.
2. Navigate to the local Inspector URL.
3. Input the target domain (e.g., `example.com`) into the command field.
4. Execute the inquiry. The system will retrieve and format the telemetry data in real-time.

## Disclaimer

`Doomscan` is developed strictly for educational purposes, authorized penetration testing, and defensive infrastructure auditing. The developers assume no liability and are not responsible for any misuse or damage caused by this program. Only execute inquiries against assets you own or have explicit permission to audit. 

## License
MIT
