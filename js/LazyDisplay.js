function LazyDisplay(canvas){
	this._canvas = canvas;
	this._lastTime = null;

	window.requestAnimationFrame = 
		window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(callback){
			window.setTimeout(callback, 1000 / 60);
		};
}

LazyDisplay.prototype.constructor = LazyDisplay;

LazyDisplay.prototype.start = function(){
	var elapsedTime = Date.now() - this._lastTime;
	var ctx = this._canvas.getContext("2d");

	//clear screen
	ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

	this.update(ctx, elapsedTime);

	this._lastTime = Date.now();

	window.requestAnimationFrame(this.start.bind(this));
};

LazyDisplay.prototype.getCanvas = function(){
	return this._canvas;
};

//implement it!
LazyDisplay.prototype.update = function(ctx, elapsedTime){};