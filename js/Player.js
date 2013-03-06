function Player(name, x, y){
	this.setName(name);
	this.setX((x || 0));
	this.setY((y || 0));
}

Player.prototype.constructor = Player;

Player.MOVE_UP = 1;
Player.MOVE_DOWN = 2;
Player.MOVE_LEFT = 3;
Player.MOVE_RIGHT = 4;

Player.prototype.setName = function(name){
	this._name = name;
};

Player.prototype.getName = function(){
	return this._name;
};

Player.prototype.setX = function(x){
	this._x = x;
};

Player.prototype.getX = function(){
	return this._x;
};

Player.prototype.setY = function(y){
	this._y = y;
};

Player.prototype.getY = function(){
	return this._y;
};

Player.prototype.getXY = function(){
	return {
		x : this.getX(),
		y : this.getY()
	};
};

/*
	it will not actually move the player however will return an copy version of modified X,Y location.
*/
Player.prototype.dryMove = function(direction){
	var oriX = this.getX();
	var oriY = this.getY();
	var posi = {x : oriX, y : oriY};

	if(direction == Player.MOVE_RIGHT){
		posi["x"] += 1;
	}
	else if(direction == Player.MOVE_LEFT){
		posi["x"] -= 1;
	}
	else if(direction == Player.MOVE_DOWN){
		posi["y"] += 1;
	}
	else if(direction == Player.MOVE_UP){
		posi["y"] -= 1;
	}
	else{
		throw "invalid movement code!";
	}
	return posi;
};

Player.prototype.move = function(direction){
	if(direction == Player.MOVE_RIGHT){ 
		this.setX(this.getX() + 1);
	}
	else if(direction == Player.MOVE_LEFT){
		this.setX(this.getX() - 1);
	}
	else if(direction == Player.MOVE_DOWN){
		this.setY(this.getY() + 1);
	}
	else if(direction == Player.MOVE_UP){
		this.setY(this.getY() - 1);
	}
	else{
		throw "invalid movement code!";
	}
};

Player.prototype.toJSON = function(){
	var p = {};
	p.name = this.getName();
	p.x = this.getX();
	p.y = this.getY();
	return JSON.stringify(p);
};