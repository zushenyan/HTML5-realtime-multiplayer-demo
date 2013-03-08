class Character(object):
	def __init__(self, name = "", hp = 10, damage = 1, cx = 0, cy = 0):
		self.name = name;
		self.setCurrentHP(hp);
		self.setMaxHP(hp);
		self.x = cx;
		self.y = cy;

	def setName(self, name):
		self.name = name;

	def setDamage(self, dmg):
		self.damage = dmg;

	def setCurrentHP(self, hp):
		self.currentHP = (hp >= 0) and hp or 10;

	def setMaxHP(self, hp):
		self.maxHP = (hp >= 0) and hp or 10;

	def isCollideWithMe(self, x, y):
		if x == self.x and y == self.y:
			return True;
		return False;