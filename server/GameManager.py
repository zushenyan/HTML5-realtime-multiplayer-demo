from gevent import monkey; monkey.patch_all()
import gevent

from Map import *
import time

class GameManager(object):
	def __init__(self):
		self._map = Map("map.json", 3);
		self._lastTime = time.time();

	def start(self):
		gevent.spawn(self.update, 0.01);
		gevent.spawn(self.spawnMonster, 3);

	def update(self, interval):
		while True:
			gevent.sleep(interval);
			elapsedTime = time.time() - self._lastTime;

			self._map.update(elapsedTime);
			self._map.clearCorpse();

			self._lastTime = time.time();

	def spawnMonster(self, interval):
		while True:
			gevent.sleep(interval);
			self._map.spawnMonster();

	def movePlayer(self, player, direction):
		self._map.movePlayer(player, direction);

	def addPlayer(self, player):
		self._map.playerList.append(player);

	def removePlayer(self, player):
		self._map.playerList.remove(player);

	def getPlayerList(self):
		return self._map.playerList;

	def getMonsterList(self):
		return self._map.monsterList;

	def getMap(self):
		return self._map.getMap();