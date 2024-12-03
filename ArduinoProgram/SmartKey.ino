#include <SoftwareSerial.h>
#include <Servo.h>
SoftwareSerial myserial(2,3);
Servo ser;
String kode;
#define led 13
bool pinjam = 0;
bool kembalikan = 0;
void setup() {
  // put your setup code here, to run once:
  pinMode(4, INPUT_PULLUP);
  Serial.begin(9600);
  myserial.begin(9600);
  myserial.setTimeout(100);
  pinMode(led, OUTPUT);
  ser.attach(5);
  ser.write(145);
  delay(2000);
}

void loop() {
  ser.write(165);
  if (myserial.available() > 0 || Serial.available() > 0) {
    char data = Serial.read();
    if(!data) Serial.end();
    if(data == 'K') {
      digitalWrite(led, LOW);
      pinjam = false;
      kembalikan = true;
    } else if (data == 'P') {
      digitalWrite(led, HIGH);
      pinjam = true;
      kembalikan = false;
    }
    
    kode = myserial.readString();
    Serial.println(kode);
  
   }
   while(pinjam){
//    Serial.println("Pinjam");
//      int sensorKunci = digitalRead(4);
//      if(sensorKunci == LOW){
//        Serial.println("K1");
//      } else {
//        Serial.println("K0");
//      }

      if (Serial.available() > 0){
        char data = Serial.read();
        if(!data) Serial.end();
        Serial.println(data);
        if(data == 'O'){
          pinjam = false;
          Serial.println("Kembali ke index");
        }
        if(data == 'B'){
          pinjam = false;
          Serial.println("Buka kunci");
          ser.write(145);
          delay(5000);
          ser.write(170);
//          Serial.println("Tutup Kunci");
        }
        if(data == 'K'){
          pinjam = false;
          kembalikan = true;
          Serial.println("Pindah Ke Kembalikan");
        }
      }      
    }
    while(kembalikan){
//      Serial.println("Kembalikan");
      ser.write(145);
      int sensorKunci = digitalRead(4);
      if(sensorKunci == LOW){
        Serial.println("K1");
      } else {
        Serial.println("K0");
      }
      if (Serial.available() > 0){
        char data = Serial.read();
        if(!data) Serial.end();
        Serial.println(data);
        if(data == 'O'){
          kembalikan = false;
//          Serial.println("Kembali ke index");
        }
        if(data == 'T'){
          ser.write(165);
          kembalikan = false;
          Serial.println("menutup");
        }
        if(data == 'P'){
          pinjam = true;
          kembalikan = false;
          Serial.println("Pindah Ke Pinjam");
        }
      }      
    }
}
