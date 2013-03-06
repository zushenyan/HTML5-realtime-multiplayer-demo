function Rectangle(sx, sy, ex, ey){
	this.setStartPosition(sx || 0, sy || 0);
	this.setEndPosition(ex || 0, ey || 0);
}

Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.setStartPosition = function(x, y){
	this._sx = x;
	this._sy = y;
};

Rectangle.prototype.getStartPosition = function(){
	return {
		x : this._sx,
		y : this._sy
	};
};

Rectangle.prototype.setEndPosition = function(x, y){
	this._ex = x;
	this._ey = y;
};

Rectangle.prototype.getEndPosition = function(){
	return {
		x : this._ex,
		y : this._ey
	};
};

Rectangle.prototype.getWidth = function(){
	return this._sx - this._ex;
};

Rectangle.prototype.getHeight = function(){
	return this._sy - this._ey;
};

/*
	move the entire rectangle with specificted offset value.
*/
Rectangle.prototype.move = function(offsetX, offsetY){
	this._sx += offsetX;
	this._sy += offsetY;
	this._ex += offsetX;
	this._ey += offsetY;
};