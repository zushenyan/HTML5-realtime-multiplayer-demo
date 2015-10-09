# HTML5 Realtime Multiplayer Demo

A HTML5 realtime multiplayer demonstration.
The game is written in Javascript for client and Python for server.

<div align="center">
  <img src="http://farm9.staticflickr.com/8108/8556002245_dd486532a7_b.jpg" alt="mmo"/>
</div>

demo video click [here](http://www.youtube.com/watch?v=vRHEdagTP1s&feature=youtu.be).

# About platforms
works on the latest version of Chrome, Firefox, Safari, Opera and IE 10+.

## Library in use
* Javascript: 
 * [socket.io](https://github.com/learnboost/socket.io)
 * [jQuery](http://jquery.com/)
 * [jQuery slimScroll](http://rocha.la/jQuery-slimScroll?page=1)
* Python: [gevent-socket.io](https://github.com/abourget/gevent-socketio)

## Why gevent
Back in 2013, I happened to read [this article](http://blog.ez2learn.com/2010/07/17/talk-about-coroutine-and-gevent/)(chinese) on the internet. It indicates there are 5 server architectures:
* Blocking Single Process - Only one process. Subsequent requests can't not be processed until current one is done.
* Blocking Multi Process - Open up a new process/thread to handle things whenever a new request comes in. Have context-switch overhead.
* Blocking Multi Process/Thread - Benefit the good part of above method, but doesn't need to deal with context-switch. However, new problems like dead lock, race condition pop up.
* Non-blocking Event Driven - You only do things in a one-threaded, single loop. With this one, you don't have to fight problems like dead lock, race condition and so on. But, still, nothing goes perfect. You now have to remember program's state here and there. Program becomes complex now.
* Coroutine - So, is there any method that doesn't suffer from blocking, issues that multi-threading have, and doesn't even make our program hard to maintain? Oh, sure! Coroutine comes to rescue! (Or at least this post thought so.)

I wondered how good it is. Without hesitation, I decided to give it a try.

## How to run
1. Make sure you have [libevent](http://libevent.org/) in your environment. If you are on mac and have [homebrew](http://mxcl.github.com/homebrew/), you can `brew` one.
2. Run `pip install gevent-socketio` to get gevent-socket.io library. It is required to run this program.
3. `cd` to this directory and type `python server.py` and open your browser with `http://localhost:8080/index.html`.

note: run the server.py with Python 2.7.3. Don't use python 2.7.3 above, or system will dump errors. :/

## How to play
Use arrow keys to move. Run into slimes with arrow keys to attack. Dont't worry if you are dead, you will be sent back to player spawn point.

## To do
* nothing to do so far.

## Changelog
* ver 1.5 (2013/3/13):
 * make server side code structure more reasonable.
 * add a simple enter nickname screen.
 * chat window will now show at correct position when page was loaded.
* ver 1.4 (2013/3/12):
 * add chat window.
* ver 1.3 (2013/3/10):
 * slimes will now spawn correctly at right position and quantity.
 * add fighting system. Move yourself toward slime will try to attack it. Move away to stop fighting.
 * when player is dead, will be moved to player spawn point.
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
