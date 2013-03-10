function Model(){
	this._player = new Character("", 10);
	this._playerList = null;
	this._monsterList = null;
	this._map = new Map();
	this._socket = io.connect();

	var _this = this;
	this._socket.on("recv_players", function(pl){
		var jpl = JSON.parse(pl);
		_this._playerList = jpl;

		for(var i in jpl){
			if(jpl[i].name == _this._player.getName()){
				_this._player.setXY(jpl[i].x, jpl[i].y);
				break;
			}
		}
	});

	this._socket.on("recv_monsters", function(ml){
		var jml = JSON.parse(ml);
		_this._monsterList = jml;
	});

	this._socket.emit("requireMap");
	this._socket.on("recv_map", function(map){
		map = JSON.parse(map);
		_this._map.setMap(map.map);
	});
}

Model.prototype.constructor = Model;

Model.prototype.movePlayer = function(direction){
	this._socket.emit("playerMove", direction);
};

Model.prototype.getSocket = function(){
	return this._socket;
};

Model.prototype.getPlayerName = function(){
	return this._player.getName();
};

Model.prototype.getPlayerPosition = function(){
	return this._player.getXY();
};

Model.prototype.getMap = function(){
	return this._map.getMap();
};

Model.prototype.getPlayerList = function(){
	return this._playerList;
};

Model.prototype.getMonsterList = function(){
	return this._monsterList;
};

Model.prototype.joinGame = function(name){
	this._player.setName(name);
	this._socket.emit("joinGame", name);
};

Model.prototype.leaveGame = function(){
	this._socket.disconnect();
};