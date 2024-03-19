int dataPin = 2;
int clockPin = 3;
int data = 0;
int clock = 0;
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(dataPin, INPUT);
  pinMode(clockPin, INPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  clock = digitalRead(clockPin);
  if (clock == HIGH){
    data = digitalRead(dataPin);
    if (data == HIGH){
      Serial.print("1");
      Serial.println();
    } else{
      Serial.print("0");
      Serial.println();
    }
  }
}
