function Map(map){
	this._map = map || null;
}

Map.prototype.constructor = Map;

Map.TILE_NONE = 0;
Map.TILE_GRASS = 1;
Map.TILE_WATER = 2;

Map.prototype.getTile = function(x, y){
	return this._map[y][x];
};

Map.prototype.setMap = function(map){
	this._map = map;
};

Map.prototype.getMap = function(map){
	return this._map;
};

Map.prototype.getSize = function(){
	return {
		width : this._map[0].length,
		height : this._map.length
	};
};