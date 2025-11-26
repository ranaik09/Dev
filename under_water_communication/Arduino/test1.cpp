#include <Wire.h>
#include <Adafruit_BMP280.h>
#include <MPU6050_tockn.h>
#include <RH_ASK.h>

// BMP280 sensor (pressure and temperature)
Adafruit_BMP280 bmp;

// MPU6050 IMU (orientation)
MPU6050 mpu6050(Wire);

// RF 433 MHz (FS1000A) transmitter
RH_ASK rf_driver(2000, 12, 2); // Bitrate, rx_pin (none), tx_pin=2

// Sonar ultrasonic sensor pins
#define TRIG_PIN 8
#define ECHO_PIN 9

// Motor driver pins
#define IN1 3
#define IN2 4
#define ENA 5

void setup() {
  Serial.begin(9600);

  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);

  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(ENA, OUTPUT);

  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  analogWrite(ENA, 0); // Motor off initially

  Wire.begin();
  if (!bmp.begin(0x76)) {
    Serial.println("BMP280 init failed!");
  }
  mpu6050.begin();
  mpu6050.calcGyroOffsets(true);

  if (!rf_driver.init()) {
    Serial.println("RF init failed!");
  }
}

long readUltrasonicDistance() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  long duration = pulseIn(ECHO_PIN, HIGH, 30000);
  long distance_cm = duration * 0.0343 / 2; // Speed of sound in water approx 1500 m/s (adjust factor below)
  distance_cm = distance_cm * (1500.0 / 343.0); // Scale from air to water speed approx
  return distance_cm;
}

void loop() {
  // Read ultrasonic distance
  long distance = readUltrasonicDistance();

  // Read BMP280 pressure and temperature
  float pressure = bmp.readPressure(); // Pascals
  float temp = bmp.readTemperature();

  // Calculate depth in cm (pressure relative to surface atmospheric pressure)
  float depth_cm = (pressure - 101325) / (997 * 9.81) * 100;

  // Read IMU angles
  mpu6050.update();
  float pitch = mpu6050.getAngleX();
  float roll = mpu6050.getAngleY();
  float yaw = mpu6050.getAngleZ();

  // Display sensor data on Serial
  Serial.print("Distance_cm: "); Serial.println(distance);
  Serial.print("Depth_cm: "); Serial.println(depth_cm);
  Serial.print("Pitch: "); Serial.print(pitch);
  Serial.print(", Roll: "); Serial.print(roll);
  Serial.print(", Yaw: "); Serial.println(yaw);
  Serial.print("Temp_C: "); Serial.println(temp);

  // Prepare data string to transmit via RF
  char msg[64];
  snprintf(msg, sizeof(msg), "%ld,%.1f,%.1f,%.1f,%.1f,%.1f", distance, depth_cm, pitch, roll, yaw, temp);

  rf_driver.send((uint8_t*)msg, strlen(msg));
  rf_driver.waitPacketSent();

  // Motor control demo: runs motor forward for 2 sec every 10 sec
  unsigned long t = millis() % 10000;
  if (t < 2000) {
    digitalWrite(IN1, HIGH);
    digitalWrite(IN2, LOW);
    analogWrite(ENA, 180);
  } else {
    digitalWrite(IN1, LOW);
    digitalWrite(IN2, LOW);
    analogWrite(ENA, 0);
  }

  delay(500);
}