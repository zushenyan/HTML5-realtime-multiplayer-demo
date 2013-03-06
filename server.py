from gevent import monkey; monkey.patch_all()
import gevent

from socketio import socketio_manage
from socketio.server import SocketIOServer
from socketio.namespace import BaseNamespace
from socketio.mixins import RoomsMixin, BroadcastMixin

import json

playerList = [];

def broadcastPlayerList(server, ns_name="", event="recv_players"):
	while True:
		gevent.sleep(0.01);
		jp = json.dumps([dict(i) for i in playerList]);
		package = dict(
			type = "event",
			name = event,
			args = jp,
			end_point = ns_name
			);
		for sessid, socket in server.sockets.iteritems():
			socket.send_packet(package);

class MultiPlayerNamespace(BaseNamespace):
	def on_joinGame(self, player):
		p = json.loads(player);
		playerList.append(p);
		self.session["name"] = p["name"];

		print(p["name"] + " has joined the room.");
		print([i["name"] for i in playerList]);

	def on_playerMove(self, player):
		deplayer = json.loads(player);
		p = self.findPlayer();
		p["x"] = deplayer["x"];
		p["y"] = deplayer["y"];

	def recv_disconnect(self):
		player = self.findPlayer();
		try:
			playerList.remove(player);
		except ValueError:
			print("no such player " + p["name"]);

		print(self.session["name"] + " has left the room.");
		print([i["name"] for i in playerList]);
		self.disconnect();

	def findPlayer(self):
		player = None;
		for i in playerList:
			if i["name"] is self.session["name"]:
				player = i;
				break;
		return player;

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
	print("start listening on localhost:8080...");
	server = SocketIOServer(("127.0.0.1", 8080), App(), policy_server=False);
	gevent.spawn(broadcastPlayerList, server);
	server.serve_forever();
