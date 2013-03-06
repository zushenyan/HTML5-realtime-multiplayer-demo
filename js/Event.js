function Event(sender){
	this._sender = sender;
	this._actions = [];
}

Event.prototype.attach = function(action){
	this._actions.push(action);
};

Event.prototype.notify = function(args){
	for(var i in this._actions){
		this._actions[i](this._sender, args);
	}
};