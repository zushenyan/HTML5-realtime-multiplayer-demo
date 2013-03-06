# HTML5 Realtime Multiplayer Demo

A HTML5 realtime multiplayer demonstration.
The game is written in Javascript on client and Python on server.

## Library in use
* Javascript: [socket.io](https://github.com/learnboost/socket.io)
* Python: [gevent-socket.io](https://github.com/abourget/gevent-socketio)


## How to run
1. Make sure you have `libevent` in your environment. If you are on mac, you can `brew` one.
2. Run `pip install gevent-socketio` to get gevent-socket.io library. It is required to run this program.
3. `cd` to this directory and type `python server.py` and open your browser with `http://localhost:8080/index.html`.

note: run the server.py with Python 2.7.3, or system will dump a lot of errors.

## How to play
For now, you can only walk around on the map with arrow keys. Maybe I will add more feature in the future.

## Changelog
* ver 1.0 (2013/3/6):
 * initial commit.

## Author
Program by andrew yan (aka zushenyan)
