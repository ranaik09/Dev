# Underwater Communication Prototype Wiring

## 1. Arduino UNO Wiring

| Component                  | Pin on Arduino UNO      | Details / Notes                          |
|---------------------------|------------------------|-----------------------------------------|
| JSN-SR04T Ultrasonic       | TRIG -> D8             | TRIG pin                               |
|                           | ECHO -> D9             | ECHO pin                              |
|                           | VCC -> 5V              | Power                                 |
|                           | GND -> GND             | Ground                               |
| BMP280 (I2C Interface)     | SDA -> A4              | I2C SDA                              |
|                           | SCL -> A5              | I2C SCL                              |
|                           | VCC -> 3.3V            | Power (3.3V only)                     |
|                           | GND -> GND             | Ground                               |
| MPU6050 (I2C Interface)    | SDA -> A4              | Share I2C bus                        |
|                           | SCL -> A5              | Share I2C bus                        |
|                           | VCC -> 3.3V            | Power (3.3V)                        |
|                           | GND -> GND             | Ground                              |
| 433 MHz RF Transmitter     | DATA -> D2             | Data pin                            |
|                           | VCC -> 5V              | Power                              |
|                           | GND -> GND             | Ground                             |
| Motor Driver L298N         | IN1 -> D3              | Motor control input 1               |
|                           | IN2 -> D4              | Motor control input 2               |
|                           | ENA -> D5 PWM          | Enable (PWM speed)                  |
|                           | VCC -> external supply | Motor power                        |
|                           | GND -> GND             | Common ground                     |

---

## 2. Raspberry Pi Pico Wiring

| Component                   | Pin on Pico (GP Pin)    | Notes / Interface                      |
|----------------------------|------------------------|--------------------------------------|
| JSN-SR04T Ultrasonic        | TRIG -> GP8            | Trigger pin                         |
|                            | ECHO -> GP9            | Echo pin                            |
|                            | VCC -> 5V (VBUS)       | Power supply (do NOT connect to 3.3V)  |
|                            | GND -> GND             | Ground                              |
| BMP280 (I2C)               | SDA -> GP0             | I2C Data                           |
|                            | SCL -> GP1             | I2C Clock                          |
|                            | VCC -> 3.3V            | Power (3.3V only)                   |
|                            | GND -> GND             | Ground                            |
| MPU6050 (I2C)              | SDA -> GP0             | Share I2C bus                      |
|                            | SCL -> GP1             | Share I2C bus                      |
|                            | VCC -> 3.3V            | Power (3.3V)                      |
|                            | GND -> GND             | Ground                          |
| Motor Driver L298N          | IN1 -> GP3             | Motor control input 1             |
|                            | IN2 -> GP4             | Motor control input 2             |
|                            | ENA -> GP5 PWM         | Enable pin (PWM speed control)     |
|                            | VCC -> external motor supply | Motor power                   |
|                            | GND -> Common ground   | Common ground                      |

---

## Notes

- All sensors requiring 3.3V power must NOT be connected to 5V.
- The JSN-SR04T ultrasonic sensor requires 5V power on its VCC pin, but microcontroller interface pins can tolerate 5V logic.
- Common ground between all devices and microcontroller is essential for signals to work correctly.
- Use level shifting if necessary for 5V signals to the Pico (which is 3.3V logic).
- Motor power supply should be separate or capable of handling the current needed by the motors.
- When testing underwater, ensure waterproofing of the entire electronic setup and proper sealing of sensor probes.

---

## Testing Sequence

1. Power ON system and observe serial monitor for sensor readings (distance, depth, orientation, temperature).
2. Trigger ultrasonic sensor underwater and check distance readings scale.
3. Monitor motor behavior doing periodic ON/OFF cycles.
4. Check RF transmission is sent and received correctly in paired setup if available.