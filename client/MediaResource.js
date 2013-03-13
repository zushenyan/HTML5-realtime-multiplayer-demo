var MediaResource = {};

MediaResource.IMAGE_GRASS_SRC = "./images/grass.png";
MediaResource.IMAGE_WATER_SRC = "./images/water.png";
MediaResource.IMAGE_PLAYER_SRC = "./images/player.png";
MediaResource.IMAGE_MONSTER_SRC = "./images/monster.png";

MediaResource.IMAGE_GRASS = (function(){
	var i = new Image();
	i.src = MediaResource.IMAGE_GRASS_SRC;

	return i;
})();

MediaResource.IMAGE_WATER = (function(){
	var i = new Image();
	i.src = MediaResource.IMAGE_WATER_SRC;

	return i;
})();

MediaResource.IMAGE_PLAYER = (function(){
	var i = new Image();
	i.src = MediaResource.IMAGE_PLAYER_SRC;

	return i;
})();

MediaResource.IMAGE_MONSTER = (function(){
	var i = new Image();
	i.src = MediaResource.IMAGE_MONSTER_SRC;

	return i;
})();

MediaResource.getImageWidth = function(){
	return MediaResource.IMAGE_GRASS.width;
};

MediaResource.getImageHeight = function(){
	return MediaResource.IMAGE_GRASS.height;
};