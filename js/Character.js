function Character(name, hp, x, y){
	this.setName(name);
	this.setX((x || 0));
	this.setY((y || 0));
	this.setCurrentHP(hp || 10);
	this.setMaxHP(hp || 10);
}

Character.prototype.constructor = Character;

Character.MOVE_UP = "up";
Character.MOVE_DOWN = "down";
Character.MOVE_LEFT = "left";
Character.MOVE_RIGHT = "right";

Character.TYPE_PLAYER = 1;
Character.TYPE_MONSTER = 2;

Character.prototype.setName = function(name){
	this._name = name;
};

Character.prototype.getName = function(){
	return this._name;
};

Character.prototype.setX = function(x){
	this._x = x;
};

Character.prototype.getX = function(){
	return this._x;
};

Character.prototype.setY = function(y){
	this._y = y;
};

Character.prototype.getY = function(){
	return this._y;
};

Character.prototype.setXY = function(x, y){
	this.setX(x);
	this.setY(y);
};

Character.prototype.getXY = function(){
	return {
		x : this.getX(),
		y : this.getY()
	};
};

Character.prototype.setCurrentHP = function(hp){
	this._currentHP = (hp >= 0) ? hp : 0;
};

Character.prototype.getCurrentHP = function(){
	return this._currentHP;
};

Character.prototype.setMaxHP = function(hp){
	this._maxHP = hp;
};

Character.prototype.getMaxHP = function(){
	return this._maxHP;
};

// Character.prototype.toJSON = function(){
// 	var p = {};
// 	p.name = this.getName();
// 	p.x = this.getX();
// 	p.y = this.getY();
// 	p.currentHP = this.getCurrentHP();
// 	p.maxHP = this.getMaxHP();
// 	return JSON.stringify(p);
// };