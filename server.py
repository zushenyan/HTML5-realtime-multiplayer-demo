from gevent import monkey; monkey.patch_all()
import gevent

from socketio import socketio_manage
from socketio.server import SocketIOServer
from socketio.namespace import BaseNamespace
from socketio.mixins import RoomsMixin, BroadcastMixin

import json
import random

from server.Character import *

# map relative
map = json.loads(open("map.json", "r").read());
MAP_TILE_GRASS = 1;
MAP_TILE_WATER = 2;

# list
playerList = [];
monsterList = [];

def doSomethingPeriod():
	while True:
		gevent.sleep(3);
		spawnMonster();

def spawnMonster():
	if len(monsterList) < 3:
		isSpawning = playerList and True or False;
		while isSpawning:
			x = random.randint(0, len(map["map"]) - 1);
			y = random.randint(0, len(map["map"]) - 1);

			# check map first
			m = map["map"];
			if m[y][x] is not MAP_TILE_WATER:
				# check player's position:
				if playerList:
					for i in playerList:
						if (x is not i.x) and (y is not i.y):
							monster = Character(name = "slime", hp = 5, cx = x, cy = y);
							monsterList.append(monster);
							isSpawning = False;


def broadcastData(server, ns_name=""):
	while True:
		gevent.sleep(0.01);
		jp = json.dumps([i.__dict__ for i in playerList]);
		jm = json.dumps([i.__dict__ for i in monsterList]);

		packagePlayer = dict(
			type = "event",
			name = "recv_players",
			args = jp,
			end_point = ns_name
			);

		packageMonster = dict(
			type = "event",
			name = "recv_monsters",
			args = jm,
			end_point = ns_name
			);

		for sessid, socket in server.sockets.iteritems():
			socket.send_packet(packagePlayer);
			socket.send_packet(packageMonster);

def movePlayer(player, direction):
	m = map["map"];
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
		if m[y][x] is not MAP_TILE_WATER:
			count = 0;
			for i in monsterList:
				if i.isCollideWithMe(x, y):
					count += 1;

			if(count == 0):
				player.x = x;
				player.y = y;

class MultiPlayerNamespace(BaseNamespace):
	def initialize(self):
		self.player = Character("", 10, 0, 0);

	def on_requireMap(self):
		self.emit("recv_map", json.dumps(map));

	def on_joinGame(self, name):
		self.player.setName(name);
		playerList.append(self.player);

		print(self.player.name + " has joined the room.");
		print([i.name for i in playerList]);

	def on_playerMove(self, direction):
		movePlayer(self.player, direction);
		self.emit("recv_playerSelf", json.dumps(self.player.__dict__));

	def recv_disconnect(self):
		try:
			playerList.remove(self.player);	
			print(self.player.name + " has left the room.");
			print([i.name for i in playerList]);
		except ValueError:
			print("it seems this player has not even register his nickname...");
		self.disconnect();

class App(object):
	def __init__(self):
		self.buffer = [];

	def __call__(self, environ, start_response):
		path = environ['PATH_INFO'].strip('/');

		if not path:
			start_response('200 OK', [('Content-Type', 'text/html')]);
			return ["okokokok"];

		if path.startswith("lib/") or path.startswith("images/") or path.startswith("js/") or path == "style.css" or path == "index.html":
			try:
				data = open(path).read();
			except Exception:
				return not_found(start_response);

			if path.endswith(".js"):
				content_type = "text/javascript";
			elif path.endswith(".png"):
				content_type = "image/png";
			elif path.endswith(".css"):
				content_type = "text/css";
			else:
				content_type = "text/html";

			start_response('200 OK', [('Content-Type', content_type)]);
			return [data];

		if path.startswith("socket.io"):
			socketio_manage(environ, {'': MultiPlayerNamespace});
		else:
			return notFound(start_response);

def notFound(start_response):
	start_response("404", []);
	return ["404"];

if __name__ == "__main__":
	port = 8080;
	print("start listening on localhost:" + str(port) + "...");
	server = SocketIOServer(("0.0.0.0", port), App(), policy_server=False);
	gevent.spawn(doSomethingPeriod);
	gevent.spawn(broadcastData, server);
	server.serve_forever();
