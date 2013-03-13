from CharacterFactory import *
import json
import random

class Map(object):
	TILE_GRASS = 1;
	TILE_WATER = 2;

	def __init__(self, mapName, monsterLimit = 3):
		self._map = json.loads(open(mapName, "r").read());
		self._monsterLimit = monsterLimit;
		self._monsterSerial = 0;
		self.playerList = [];
		self.monsterList = [];

	def update(self, elapsedTime):
		for i in self.playerList:
			i.update(elapsedTime);
		for i in self.monsterList:
			i.update(elapsedTime);

	def clearCorpse(self):
		for i in self.playerList:
			if not i.isAlive:
				i.setCurrentHP(10);
				i.setAlive(True);
				i.x = 0;
				i.y = 0;

		for i in self.monsterList:
			if not i.isAlive:
				self.monsterList.remove(i);
				del i;

	def spawnMonster(self):
		if len(self.monsterList) < self._monsterLimit:
			isSpawning = self.playerList and True or False;
			while isSpawning:
				x = random.randint(0, len(self._map["map"]) - 1);
				y = random.randint(0, len(self._map["map"]) - 1);

				# check map first
				m = self._map["map"];
				# don't spawn at player start point
				if x != 0 and y != 0:
					if m[y][x] != Map.TILE_WATER:
						# check player's position:
						if self.playerList:
							pcounter = 0;
							mcounter = 0;
							for i in self.playerList:
								if (x == i.x) and (y == i.y):
									pcounter += 1;

							for i in self.monsterList:
								if (x == i.x) and (y == i.y):
									mcounter += 1;

							if pcounter == 0 and mcounter == 0:
								self._monsterSerial += 1;
								monster = CharacterFactory.createSlime("slime" + str(self._monsterSerial), x, y);
								self.monsterList.append(monster);
								isSpawning = False;

	def movePlayer(self, player, direction):
		m = self._map["map"];
		x = player.x;
		y = player.y;

		if direction == "up":
			y -= 1;
		elif direction == "down":
			y += 1;
		elif direction == "right":
			x += 1;
		elif direction == "left":
			x -= 1;

		if (x >= 0 and x < len(m)) and (y >= 0 and y < len(m)):
			if m[y][x] is not Map.TILE_WATER:
				count = 0;
				for i in self.monsterList:
					if i.isCollideWithMe(x, y):
						count += 1;
						player.attackWho(i);
						i.attackWho(player);
				if(count == 0):
					player.x = x;
					player.y = y;

	def getMap(self):
		return self._map;