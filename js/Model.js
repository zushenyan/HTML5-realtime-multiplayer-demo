function Model(){
	this._player = new Player("");
	this._playerList = null;
	this._map = new Map();
	this._socket = io.connect();

	var _this = this;
	this._socket.on("recv_players", function(pl){
		var jpl = JSON.parse(pl);
		_this._playerList = jpl;
	});
}

Model.prototype.constructor = Model;

Model.prototype.movePlayer = function(direction){
	var position = this._player.dryMove(direction);

	if(this._map.inBoundary(position["x"], position["y"])){
		if(!this._map.isObstacle(position["x"], position["y"])){
			this._player.move(direction);
			this.emitPLayerMove();
		}
		else{
			console.log("is obstacle");
		}
	}
	else{
		console.log("out of bounds");
	}
};

Model.prototype.emitPLayerMove = function(){
	this._socket.emit("playerMove", this._player.toJSON());
}

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
	return this._map._map;
};

Model.prototype.getPlayerList = function(){
	return this._playerList;
};

Model.prototype.joinGame = function(name){
	this._player.setName(name);
	this._socket.emit("joinGame", this._player.toJSON());
};

Model.prototype.leaveGame = function(){
	this._socket.disconnect();
};