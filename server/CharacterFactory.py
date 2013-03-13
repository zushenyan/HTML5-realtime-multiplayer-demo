from Character import *

class CharacterFactory(object):
	@staticmethod
	def createDefaultPlayer():
		c = Character(name = "", hp = 10, damage = 1, atkSpeed = 0.5, cx = 0, cy = 0);
		return c;

	@staticmethod
	def createSlime(name, x, y):
		c = Character(name = name, hp = 10, damage = 1, atkSpeed = 1, cx = x, cy = y);
		return c;