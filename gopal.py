import paho.mqtt.client as paho
import os
duration = 1  # seconds
freq = 440  # Hz
def on_subscribe(client, userdata, mid, granted_qos):
    print("Subscribed: "+str(mid)+" "+str(granted_qos))

def on_message(client, userdata, msg):
    print(msg.topic+" "+str(msg.qos)+"--- "+str(msg.payload))
    msg.payload = msg.payload.decode('utf-8')
    print(msg.payload)
    if (str(msg.payload) == 'attendance'):
        print("/n attendance assd")
        os.system('play -nq -t alsa synth {} sine {}'.format(duration, freq))
        while True:
            try:
                os.system('play -nq -t alsa synth {} sine {}'.format(duration, freq))            
            except KeyboardInterrupt:
                break
client = paho.Client()
client.on_subscribe = on_subscribe
client.on_message = on_message
client.connect('broker.mqttdashboard.com', 1883)
client.subscribe('mtrs_bit/attendance', qos=1)

client.loop_forever()