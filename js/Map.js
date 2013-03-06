function Map(){
	this._map = [
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,2,2,2,2,2,2,1,1,1,1,1,1,1,1],
		[1,2,2,2,1,1,1,1,1,1,2,2,2,1,1],
		[1,1,1,1,1,1,1,1,1,1,2,1,2,1,1],
		[1,1,1,2,2,2,2,2,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,2,2,1,1,1,1,1,1],
		[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[2,1,1,1,1,1,2,2,2,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,1,1,2,1,1,1,2,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,2,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	];
}

Map.prototype.constructor = Map;

Map.TILE_NONE = 0;
Map.TILE_GRASS = 1;
Map.TILE_WATER = 2;

Map.prototype.getTile = function(x, y){
	return this._map[y][x];
};

Map.prototype.isObstacle = function(x, y){
	return this.isTileObstacle(this.getTile(x, y));
};

Map.prototype.isTileObstacle = function(tile){
	switch(tile){
		case Map.TILE_WATER:
			return true;
		default:
			return false;
	}
};

Map.prototype.getSize = function(){
	return {
		width : this._map[0].length,
		height : this._map.length
	};
};

Map.prototype.inBoundary = function(x, y){
	if(
		((x < this._map[0].length) && (x >= 0)) &&
		((y < this._map.length) && (y >= 0))
		){
		return true;
	}
	return false;
};