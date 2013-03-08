/*
inherited from LazyDisplay.js
*/
function View(model, canvas, elements){
	LazyDisplay.call(this, canvas);

	this._model = model;

	this.nameField = elements.nameField;
	this.sendButton = elements.sendButton;
}

View.prototype = new LazyDisplay();
View.prototype.constructor = View;

View.prototype.update = function(ctx, elapsedTime){
	//just draw some empty background
	ctx.fillStyle = "rgb(215, 215, 215)";
	ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);

	//make offset
	var offsetStartX = (this._canvas.width / 2) - MediaResource.getImageWidth() / 2;
	var offsetStartY = (this._canvas.height / 2) - MediaResource.getImageHeight() / 2;

	//draw map
	var playerX = this._model.getPlayerPosition()["x"];
	var playerY = this._model.getPlayerPosition()["y"];

	var map = this._model.getMap();
	if(map){
		for(var y = 0; y < map.length; y++){
			for(var x = 0; x < map[y].length; x++){
				var image = null;
				if(map[y][x] == Map.TILE_GRASS){
					image = MediaResource.IMAGE_GRASS;
				}
				else if(map[y][x] == Map.TILE_WATER){
					image = MediaResource.IMAGE_WATER;
				}

				var posX = image.width * x - image.width * playerX + offsetStartX;
				var posY = image.height * y - image.height * playerY + offsetStartY;

				ctx.drawImage(image, posX, posY);
			}
		}
	}	

	//draw players
	var pl = this._model.getPlayerList();
	for(var i in pl){
		//draw player
		var px = (pl[i].x - playerX) * MediaResource.getImageWidth();
		var py = (pl[i].y - playerY) * MediaResource.getImageHeight();
		ctx.drawImage(MediaResource.IMAGE_PLAYER, px + offsetStartX, py + offsetStartY);

		//draw name
		var textWidth = ctx.measureText(pl[i].name);
		var nameOffsetX = (this._canvas.width - textWidth.width) / 2;
		var nameOffsetY = offsetStartY - 10;
		ctx.fillStyle = "rgb(0,0,0)";
		ctx.font = "20px Helvetica";
		ctx.fillText(pl[i].name, px + nameOffsetX, py + nameOffsetY);

		//draw life bar
		var barWidth = 64;
		var barOffsetX = (this._canvas.width - barWidth) / 2;
		var barOffsetY = offsetStartY - 5;
		var bw = barWidth * (pl[i].currentHP / pl[i].maxHP);
		ctx.fillStyle = "rgb(255,0,0)";
		ctx.fillRect(px + barOffsetX, py +barOffsetY, bw, 5);
	}

	//draw monsters
	var ml = this._model.getMonsterList();
	for(var i in ml){
		//draw monster
		var mx = (ml[i].x - playerX) * MediaResource.getImageWidth();
		var my = (ml[i].y - playerY) * MediaResource.getImageHeight();
		ctx.drawImage(MediaResource.IMAGE_MONSTER, mx + offsetStartX, my + offsetStartY);

		//draw name
		var textWidth = ctx.measureText(ml[i].name);
		var nameOffsetX = (this._canvas.width - textWidth.width) / 2;
		var nameOffsetY = offsetStartY - 10;
		ctx.fillStyle = "rgb(0,0,0)";
		ctx.font = "20px Helvetica";
		ctx.fillText(ml[i].name, mx + nameOffsetX, my + nameOffsetY);

		//draw life bar
		var barWidth = 64;
		var barOffsetX = (this._canvas.width - barWidth) / 2;
		var barOffsetY = offsetStartY - 5;
		var bw = barWidth * (ml[i].currentHP / ml[i].maxHP);
		ctx.fillStyle = "rgb(255,0,0)";
		ctx.fillRect(mx + barOffsetX, my + barOffsetY, bw, 5);
	}
};