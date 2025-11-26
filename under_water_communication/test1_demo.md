# Underwater Communication Prototype Demo Coverage

This document summarizes which demo scenarios are covered by your current Arduino UNO and Raspberry Pi Pico prototype codes and hardware setup for underwater experimentation.

## âœ… Covered Demo Scenarios (Fully Implemented)

### 1. Underwater Obstacle Detection
- **Component:** JSN-SR04T Waterproof Ultrasonic Sensor
- **Function:** Measures distance to obstacles underwater using sound waves calibrated for water speed (1500 m/s).
- **Code Reference:** `readSonar()` in Arduino, `read_sonar()` in Pico Python
- **Result:** Real-time distance display and obstacle warning.

### 2. Depth Measurement and Tracking
- **Component:** BMP280 Barometric Pressure Sensor
- **Function:** Reads ambient pressure and converts to water depth (cm) using density and pressure differential.
- **Code Reference:** `readDepthAndTemp()` in Arduino, `calculate_depth()` in Pico Python
- **Result:** Accurate depth reporting throughout the dive/surface cycle.

### 3. Orientation Stability Monitoring
- **Component:** MPU6050/MPU9250 IMU
- **Function:** Tracks device orientation with pitch, roll, and yaw angles.
- **Code Reference:** `readOrientation()` in Arduino, `read_mpu6050()` in Pico Python
- **Result:** Live printout of tilt, bank, and heading (detection of instability, orientation changes).

### 4. Motorized Underwater Navigation
- **Component:** L298N Motor Driver, Mini DC Waterproof Motors
- **Function:** Cycles motors for simulated dive, surface, and hold depth maneuvers.
- **Code Reference:** `underwaterNavigationDemo()` in Arduino, motor control in Pico main loop
- **Result:** Motor responds to programmed cycleâ€”demonstrates autonomous movement.

### 5. Surface Wireless Telemetry
- **Component:** FS1000A 433MHz RF Module
- **Function:** Transmits sensor data summary wirelessly when surfaced.
- **Code Reference:** `transmitTelemetry()` in Arduino, RF pulse in Pico Python
- **Result:** Sends a CSV/packet with latest readings to receiver, proving underwater-to-surface communication capacity.

### 6. Acoustic Environment Sensing (Hydrophone)
- **Component:** Hydrophone or Waterproof Microphone
- **Function:** Records ambient sound level (receive-only demo) via analog input.
- **Code Reference:** `readHydrophone()` in Arduino, `hydrophone.read_u16()` in Pico Python
- **Result:** Prints raw sound pressure level, optionally displays on serial plotter/PC.

### 7. Live Serial Logging for Debugging and Demo
- **Result:** All readings are displayed in formatted output on Serial Monitor. Easy to capture demo screenshots for DRDO approval.


## ðŸŸ¡ Partially Covered / Proof-of-Concept

- **Water Temperature:** BMP280 reports sensor temp (proxy for actual water temp; not accurate if enclosure heats up)
- **Simple Alerts/LEDs:** Not included; add if needed for enhanced demo.

## âŒ Not Covered (pending hardware arrival)
- Two-way underwater acoustic digital communication
- Precise water temperature using DS18B20

---

## Demo Sequence Example
1. **Power on:** Serial monitor/LED activity confirms system startup.
2. **Submerge prototype:** Observe depth change and sonar readings.
3. **Move obstacle:** Watch distance reading update.
4. **Tilt/turn device:** IMU values reflect orientation change.
5. **Motor drives:** Device moves for set time interval, shows propulsion cycle.
6. **Surface device:** Observe RF data sent and received.
7. **Make underwater sound (tap, motor, etc.):** Hydrophone level changes.

---

## Next Steps
- Expand demo by saving data to SD card (optional)
- Record hydrophone signal on PC audio application for advanced acoustic demo
- Add LEDs/buzzer for visual or audible alerts
- Integrate piezoelectric transducer when available for acoustic comms upgrade

**Document Version:** 1.0  
**Date:** 2025-11-26  
**Status:** All available hardware demo scenarios are covered as per your research and prototype 