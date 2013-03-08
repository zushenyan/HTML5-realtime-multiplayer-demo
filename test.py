import random
import json

f = open("map.json", "r");

map = json.loads(f.read());

print(map);