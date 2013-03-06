function Controller(model, view){
	this._model = model;
	this._view = view;

	var _this = this;

	this._view.sendButton.addEventListener("click", function(e){
		_this._model.joinGame(_this._view.nameField.value);

		_this._view.sendButton.style.display = "none";
		_this._view.nameField.style.display = "none";
		_this.allowKeyboardAccess();
	});

	window.addEventListener("beforeunload", function(e){
		_this._model.leaveGame();
	});
}

Controller.prototype.constructor = Controller;

Controller.prototype.allowKeyboardAccess = function(){
	var _this = this;
	window.addEventListener("keydown", function(e){
		switch(e.keyCode){
			//left
			case 37 :
				_this._model.movePlayer(Player.MOVE_LEFT);
				break;

			//up
			case 38 :
				_this._model.movePlayer(Player.MOVE_UP);
				break;

			//right
			case 39 :
				_this._model.movePlayer(Player.MOVE_RIGHT);
				break;

			//down
			case 40 :
				_this._model.movePlayer(Player.MOVE_DOWN);
				break;

			default:
				break;
		}
	});
};