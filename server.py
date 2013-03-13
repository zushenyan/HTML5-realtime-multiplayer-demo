from gevent import monkey; monkey.patch_all()
import gevent

from socketio import socketio_manage
from socketio.server import SocketIOServer
from socketio.namespace import BaseNamespace
from socketio.mixins import RoomsMixin, BroadcastMixin

import json

from server.Character import *
from server.CharacterFactory import *
from server.GameManager import *

gm = GameManager("./server/map.json");
gm.start();

def broadcastData(server, ns_name=""):
	while True:
		gevent.sleep(0.01);
		jp = json.dumps([i.toDict() for i in gm.getPlayerList()]);
		jm = json.dumps([i.toDict() for i in gm.getMonsterList()]);

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

class MultiPlayerNamespace(BaseNamespace, BroadcastMixin):
	def initialize(self):
		self.player = CharacterFactory.createDefaultPlayer();

	def on_requireMap(self):
		self.emit("recv_map", json.dumps(gm.getMap()));

	def on_joinGame(self, name):
		self.player.setName(name);
		gm.addPlayer(self.player);

		print(self.player.name + " has joined the room.");
		print([i.name for i in gm.getPlayerList()]);

	def on_chatMsg(self, chat):
		self.broadcast_event("recv_chatMsg", chat);

	def on_playerMove(self, direction):
		gm.movePlayer(self.player, direction);

	def recv_disconnect(self):
		try:	
			gm.removePlayer(self.player);
			print(self.player.name + " has left the room.");
			print([i.name for i in gm.getPlayerList()]);
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

		if path.startswith("lib/") or path.startswith("images/") or path.startswith("client/") or path == "style.css" or path == "index.html":
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
	gevent.spawn(broadcastData, server);
	server.serve_forever();
