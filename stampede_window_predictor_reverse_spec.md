# Reverse Spec — Stampede Window Predictor for Gujarat Pilgrimage Corridors

> **Evidence note (critical):** This repository contains no implementation to reverse-engineer (only `README.md` with a title). Therefore, everything below is **inferred solely from the provided problem statement** and should be treated as a *proposed/derived* specification, not an observed one.
>
> **Intended output path:** `specs/stampede_window_predictor_reverse_spec.md` (folder not present in repo).

## 1) Problem Context (from prompt)
- Target sites: **Ambaji, Dwarka, Somnath, Pavagadh**.
- Peak load: **1.2+ crore** pilgrims during Navratri.
- Risk location: **200–500 m upstream** in narrow corridors/choke alleys (not at the temple gate).
- Current gap: CCTV is watched **reactively**.
- Goal: Real-time crowd pressure intelligence using:
  - simulated corridor entry flow rates
  - transport arrival bursts
  - corridor width constraints
- Outputs:
  - Corridor Pressure Index (CPI)
  - **Crush-risk window prediction 8–12 minutes ahead**
  - **Coordinated alert** to police + temple trust + transport authority
  - **Single shared dashboard** (not fragmented WhatsApp groups)

## 2) System Overview (inferred)
A real-time decision-support system that fuses corridor geometry + simulated inflow + bursty arrivals into a pressure metric and short-horizon risk forecast.

### 2.1 Actors (inferred)
- **Police control room operator** (primary incident responder)
- **Temple trust operations staff** (queue/corridor stewarding)
- **Transport authority operator** (bus/rail dispatch + crowd release modulation)
- **Admin/analyst** (configuration, corridor models, replay)

### 2.2 High-level components (inferred)
1. **Input layer**
   - Corridor configuration (width, length, choke points, segment graph)
   - Simulated / estimated entry flow rates (people/min)
   - Transport arrival feed producing bursts (vehicles/min, passenger estimates)
2. **Pressure computation engine**
   - Computes CPI per corridor segment and aggregated corridor CPI
3. **Prediction engine**
   - Forecasts CPI 8–12 minutes ahead; identifies continuous *risk windows*
4. **Alerting/orchestration**
   - Applies thresholds + hysteresis; sends a single “incident card” to all stakeholders
5. **Shared dashboard**
   - Map/list of corridors; CPI now vs forecast; alerts; recommended actions; audit log

## 3) Data Model (inferred)
- **Site**: {id, name, timezone}
- **Corridor**: {id, siteId, name, geometryRef}
- **Segment**: {id, corridorId, startNode, endNode, lengthM, widthM, capacityModel}
- **FlowInput** (time series): {ts, segmentId/corridorId, entryRatePpm, uncertainty}
- **TransportBurst**: {ts, stationId/stopId, vehiclesArriving, paxEstimate, dispersionToCorridors[]}
- **CPI** (time series): {ts, segmentId, cpiValue, contributingFactors}
- **RiskWindow**: {startTs, endTs, segmentId/corridorId, severity, leadTimeMin}
- **Alert**: {id, createdTs, scope, severity, status, recipients, acknowledgements, actionsTaken}

## 4) Observed Requirements (EARS format) — derived from problem statement

> **Tagging:** These are *derived* requirements (no code evidence).

### 4.1 Pressure Index computation
- **Ubiquitous:** The system shall compute a **Corridor Pressure Index (CPI)** for each monitored corridor (and/or corridor segment).
- **Ubiquitous:** The system shall use **corridor width constraints** as an input to CPI computation.
- **Ubiquitous:** The system shall incorporate **entry flow rates** into CPI computation.
- **Ubiquitous:** The system shall incorporate **transport arrival bursts** into CPI computation.

### 4.2 Prediction (8–12 minute lookahead)
- **Ubiquitous:** The system shall predict a **crush-risk window**.
- **Timing:** The system shall produce predictions **8–12 minutes ahead** of the predicted risk window.
- **Ubiquitous:** The system shall update the predicted risk window as new flow/burst inputs arrive.

### 4.3 Alerting and coordination
- **Event-driven:** When the predicted crush-risk window is within the configured lead time, the system shall trigger an **alert**.
- **Ubiquitous:** The system shall send the alert to **police, temple trust, and transport authority**.
- **Ubiquitous:** The system shall present alerts on a **single shared dashboard** accessible by all stakeholders.
- **Constraint:** The system shall avoid fragmented communication channels (e.g., separate WhatsApp groups) by using a shared incident view.

### 4.4 Focus on upstream risk zones
- **Ubiquitous:** The system shall support monitoring of corridor segments **200–500 meters upstream** of the temple gate.

## 5) Functional Behavior Details (inferred)
### 5.1 CPI calculation (needs definition)
Minimum expected behavior:
- Inputs: width (m), effective cross-sectional capacity, inflow rate, burst load injection
- Outputs: normalized CPI scale (e.g., 0–1 or 0–100)

### 5.2 Risk window detection
- Risk window = contiguous period where forecast CPI exceeds a severity threshold.
- Should support severity tiers (e.g., watch / warning / critical).

### 5.3 Dashboard
- Real-time tiles per corridor: CPI now, CPI forecast (sparkline), risk window start/end, severity.
- Incident card: who acknowledged, recommended actions, current status.

## 6) Non-Functional Requirements (inferred)
- **Latency:** End-to-end ingest → CPI → forecast → dashboard update should be near real-time (target needs confirmation).
- **Reliability:** Alert delivery should be resilient to partial network failures.
- **Auditability:** The system should log alerts, acknowledgements, and configuration changes.
- **Security:** Role-based access control separating admin vs operator views.
- **Availability:** Designed for Navratri peak periods; graceful degradation if a feed fails.
- **Explainability:** Show drivers of CPI/risk (burst vs sustained inflow vs width choke).

## 7) Inferred Acceptance Criteria (examples)
- Given a corridor with a configured width constraint and injected transport burst, the system displays a CPI increase and produces a risk window prediction with **≥ 8 minutes lead time**.
- When predicted risk reaches configured threshold, a single alert is visible to all stakeholder roles and supports acknowledgement tracking.

## 8) Uncertainties / Questions to Resolve
1. **CPI definition:** exact formula, scale, thresholds, calibration method.
2. **Prediction approach:** rules-based extrapolation vs ML vs queueing/flow model.
3. **Data sources:** what is real vs simulated; any integration with CCTV analytics later.
4. **Update frequency:** how often to recompute CPI and forecast.
5. **Spatial model:** corridor segmentation and how transport bursts map to specific corridors.
6. **Alert policy:** hysteresis, cooldowns, duplicate suppression, escalation ladder.
7. **Recommended actions:** what operational playbooks to attach to alerts.

## 9) Recommendations (next steps)
- Add a minimal project skeleton and define CPI + forecast math explicitly.
- Create a corridor/segment configuration schema (JSON) and replayable simulation inputs.
- Define a single incident/alert data contract to unify stakeholders on one dashboard.
