from machine import Pin, PWM, I2C
import utime

# Ultrasonic Sensor Pins
TRIG_PIN = 8
ECHO_PIN = 9
trig = Pin(TRIG_PIN, Pin.OUT)
echo = Pin(ECHO_PIN, Pin.IN)

# I2C for BMP280 and MPU6050
i2c = I2C(0, sda=Pin(0), scl=Pin(1), freq=400000)

# Motor control pins
IN1 = Pin(3, Pin.OUT)
IN2 = Pin(4, Pin.OUT)
ENA = PWM(Pin(5))
ENA.freq(1000)
ENA.duty_u16(0)

# Placeholder BMP280 reading (replace with driver)
def read_bmp280():
    # Return temperature C, pressure Pa
    # Use bmp280 micropython library for actual readings
    return 25.0, 101325.0

# Placeholder MPU6050 reading (replace with driver)
def read_mpu6050():
    # Return pitch, roll, yaw dummy values (degrees)
    return 0.0, 0.0, 0.0

def read_ultrasonic():
    trig.low()
    utime.sleep_us(2)
    trig.high()
    utime.sleep_us(10)
    trig.low()    

    start = utime.ticks_us()
    while echo.value() == 0:
        start = utime.ticks_us()

    stop = utime.ticks_us()
    while echo.value() == 1:
        stop = utime.ticks_us()

    duration = utime.ticks_diff(stop, start)
    distance_cm = (duration / 2) * 0.0343
    # Scale to water speed of sound (~1500 m/s)
    distance_cm = distance_cm * (1500 / 343)
    if distance_cm < 2 or distance_cm > 400:
        return -1
    return distance_cm

while True:
    dist = read_ultrasonic()
    temp_c, pressure_pa = read_bmp280()
    depth_cm = (pressure_pa - 101325) / (997 * 9.81) * 100
    pitch, roll, yaw = read_mpu6050()

    print(f"Distance_cm: {dist:.2f}")
    print(f"Depth_cm: {depth_cm:.2f}")
    print(f"Pitch: {pitch:.2f} Roll: {roll:.2f} Yaw: {yaw:.2f}")
    print(f"Temp_C: {temp_c:.2f}")

    # Motor control: runs 2 sec every 8 sec
    t = utime.ticks_ms() % 8000
    if t < 2000:
        IN1.high()
        IN2.low()
        ENA.duty_u16(int(65535 * 0.7))
    else:
        IN1.low()
        IN2.low()
        ENA.duty_u16(0)

    utime.sleep_ms(500)