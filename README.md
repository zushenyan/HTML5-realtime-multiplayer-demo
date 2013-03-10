# HTML5 Realtime Multiplayer Demo

A HTML5 realtime multiplayer demonstration.
The game is written in Javascript for client and Python for server.

## Library in use
* Javascript: [socket.io](https://github.com/learnboost/socket.io)
* Python: [gevent-socket.io](https://github.com/abourget/gevent-socketio)


## How to run
1. Make sure you have [libevent](http://libevent.org/) in your environment. If you are on mac, you can `brew` one.
2. Run `pip install gevent-socketio` to get gevent-socket.io library. It is required to run this program.
3. `cd` to this directory and type `python server.py` and open your browser with `http://localhost:8080/index.html`.

note: run the server.py with Python 2.7.3. Don't use python 2.7.3 above, or system will dump errors. :/

## How to play
For now, you can only walk around on the map with arrow keys. Maybe I will add more feature in the future.

## To do
* program's structure still needs more reconstruct
* add chat room.

## Changelog
* ver 1.3 (2013/3/10):
 * slimes will now spawn correctly at right position and quantity.
 * add fighting system. Move yourself toward slime will try to attack it. Move away to stop fighting.
 * when player is dead, will be move to player spawn point.
* ver 1.2 (2013/3/8):
 * you can finally connect to the server from other computers. (sorry for my dumbness =_=)
 * client remains pure client, which means you can't modify Javascript to make the whole game as you like.
 * some change of program structure.
 * whoa! slimes everywhere!
 * everybody has health bar now.
* ver 1.0 (2013/3/6):
 * initial commit.

## Author
Program by andrew yan (aka zushenyan)
