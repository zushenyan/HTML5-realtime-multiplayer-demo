# Realtime Multiplayer Demo

A HTML5 realtime multiplayer demonstration.
The game is written in Javascript on client and Python on server.

## Library in use
Javascript: [socket.io](https://github.com/learnboost/socket.io)
Python: [gevent-socket.io](https://github.com/abourget/gevent-socketio)

## How to run
First, make sure you have `libevent` in your environment. If you are on mac, you can `brew` one.

Second, run `pip install gevent-socketio` to get gevent-socket.io library. It is required to run this program.

Finally, `cd` to this directory and type `python server.py` and open your browser with `localhost:8080/index.html`.

## How to play
For now, you can only walk around the map with arrow keys. Maybe I will add more feature in the future.

## Changelog
* ver 1.0 (2013/3/6):
 * initial commit.

## Author
Program by andrew yan (aka zushenyan)
