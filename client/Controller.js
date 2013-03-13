function Controller(model, view){
	this._model = model;
	this._view = view;

	var _this = this;

	this._view.joinButton.click(function(e){
		_this._model.joinGame(_this._view.nameField.val());

		_this._view.nicknameBox.css("display", "none");		
		_this._view.gameContainer.css("display", "block");

		_this.allowKeyboardAccess();
	});

	this._view.msgField.keydown(function(e){
		//on enter
		if(e.keyCode == 13){
			data = _this._view.msgField.val();
			if(data != ""){
				_this._model.sendMsg(data);
			}
		}	
	});

	this._model.recvChatMsgEvent.attach(function(sender, chat){
		_this._view.chatDisplay.append("<p>" + chat.name + " : " + chat.msg + "</p>");
		_this._view.msgField.val("");
		_this._view.chatDisplay.slimScroll({ scrollBy: "999px"});
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
				//prevent window scrolling event
				e.preventDefault();
				_this._model.movePlayer(Character.MOVE_LEFT);
				break;

			//up
			case 38 :
				e.preventDefault();
				_this._model.movePlayer(Character.MOVE_UP);
				break;

			//right
			case 39 :
				e.preventDefault();
				_this._model.movePlayer(Character.MOVE_RIGHT);
				break;

			//down
			case 40 :
				e.preventDefault();
				_this._model.movePlayer(Character.MOVE_DOWN);
				break;

			//enter key
			case 13:
				e.preventDefault();
				if(!_this._view.msgField.is(":focus")){
					_this._view.msgField.focus();
				}
				else{
					_this._view.msgField.blur();
				}

			default:
				break;
		}
	});
};