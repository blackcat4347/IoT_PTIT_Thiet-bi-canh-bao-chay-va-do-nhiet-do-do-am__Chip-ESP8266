
//@Author: EPCB TECH
//@Date: 2020
//@Description: ESP8266 With ThingSpeak 

#include <DHT.h>
#include <ESP8266WiFi.h>
#include <Wire.h>
#include "DHT.h"
#include "ThingSpeak.h"

#define Buzzer D5 
#define Sensor D7
#define DHTPIN 5 

//#define DHTTYPE DHT21   // DHT 21 (AM2301)
#define DHTTYPE DHT11   // DHT 11
DHT dht(DHTPIN, DHTTYPE);

//#define DHTTYPE DHT22   // DHT 22  (AM2302), AM2321

float humi; 
float temp;
int fire = 0;

//WiFiSetting
const char* ssid      = "Tang 3";
const char* password  = "37khuongtrung";

WiFiClient client;

//ThingSpeakSetting
const int channelID		= 2384827;// Enter Channel ID ;
String writeAPIKey		= "PCGSX1024GXGFYA2";
const char* server		= "api.thingspeak.com";

//FunctionDeclare
void    wifiSetup();
void    thingConnect();
void    readSensor(void);

void    printData(void);

void setup() {
  Serial.begin(115200);
  Serial.println("Start Reading Sensor!\n");
  dht.begin();
  wifiSetup();
  pinMode(Buzzer, OUTPUT);
  pinMode(Sensor, INPUT);
  

}

void loop() {
  thingConnect();
  readSensor();
  notifiaction();
  printData();
}

void wifiSetup() {
  Serial.print("Connecting");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(100);
  }
  Serial.print("\r\nWiFi connected");
  //ThingSpeak.begin(client);
  logoConsole();
}

void readSensor(void) {
  temp 	= dht.readTemperature();
  humi 	= dht.readHumidity();
  
}

void notifiaction() {
  int sensor = digitalRead(Sensor);
  if (sensor == 1) {  
      digitalWrite(Buzzer, LOW);
      Serial.println("No fire detected\n");
      fire = 0;
  } else if (sensor == 0) {  
      digitalWrite(Buzzer, HIGH);
      Serial.println("Warning! A fire was detected\n");
      fire = 1;
    }
}
void thingConnect() {
  if (client.connect(server, 80)) {
    String body = "field1=" + String(fire) + "&field2=" + String(temp, 1) + "&field3=" + String(humi,1) ;
    client.print("POST /update HTTP/1.1\n");
    client.print("Host: api.thingspeak.com\n");
    client.print("Connection: close\n");
    client.print("X-THINGSPEAKAPIKEY: " + writeAPIKey + "\n");
    client.print("Content-Type: application/x-www-form-urlencoded\n");
    client.print("Content-Length: ");
    client.print(body.length());
    client.print("\n\n");
    client.print(body);
    client.print("\n\n");
  }
}

void printData(void) {
  Serial.printf("Temp: %s°C - Humi: %s%\r - Fire: %d%\r\n", String(temp, 1).c_str(), String(humi, 1).c_str(), fire);
  // ThingSpeak.setField(1,temp);
  // ThingSpeak.setField(2,humi);
  // ThingSpeak.setField(3,fire);
  // int x = ThingSpeak.writeFields(channelID,writeAPIKey);
  // if(x == 200){
  //   Serial.println("Data pushed successfull");
  // }else{
  //   Serial.println("Push error" + String(x));
  // }
}


void logoConsole(void) {
  Serial.printf("Nhóm 24\n");
  Serial.printf("Ninh Chí Hướng - B20DCAT094\n");
  Serial.printf("Nguyễn Văn Khang - B20DCAT102\n");

}
