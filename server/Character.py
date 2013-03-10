class Character(object):
	def __init__(self, name = "", hp = 10, damage = 1, atkSpeed = 1, cx = 0, cy = 0):
		self.name = name;
		self.setCurrentHP(hp);
		self.setMaxHP(hp);
		self.damage = damage;
		self.attackSpeed = atkSpeed;
		self.isAlive = True;
		self.x = cx;
		self.y = cy;

		self.elapsedTime = 0;
		self.attackTimer = 0;
		self.opponent = None;

	def setName(self, name):
		self.name = name;

	def setDamage(self, dmg):
		self.damage = dmg;

	def setAlive(self, state):
		self.isAlive = state;
		if self.isAlive == False:
			self.cancelAttack();

	def setCurrentHP(self, hp):
		self.currentHP = (hp >= 0) and hp or 0;
		if self.currentHP == 0:
			self.setAlive(False);

	def setMaxHP(self, hp):
		self.maxHP = (hp >= 0) and hp or 0;

	def toDict(self):
		d = self.__dict__.copy();
		if d.has_key("elapsedTime"):
			d.pop("elapsedTime");
		if d.has_key("attackTimer"):
			d.pop("attackTimer");
		if d.has_key("opponent"):
			d.pop("opponent");
		return d;

	def isCollideWithMe(self, x, y):
		if x == self.x and y == self.y:
			return True;
		return False;

	def isSideWithMe(self, x, y):
		if (x == (self.x + 1) and y == self.y) or \
			(x == (self.x - 1) and y == self.y) or \
			(y == (self.y + 1) and x == self.x) or \
			(y == (self.y - 1) and x == self.x):
			return True;

	def update(self, elapsedTime):
		self.elapsedTime = elapsedTime;
		self.attack();

	def attack(self):
		if self.opponent:
			if not self.opponent.isAlive:
				self.cancelAttack();
			elif not self.isSideWithMe(self.opponent.x, self.opponent.y):
				self.cancelAttack();
				return;
			self.attackTimer += self.elapsedTime;
			if (self.attackTimer / self.attackSpeed) >= 1:
				count = int(self.attackTimer / self.attackSpeed);
				for i in xrange(count):
					self.opponent.setCurrentHP(self.opponent.currentHP - self.damage);
				self.attackTimer = self.attackTimer % self.elapsedTime;

	def attackWho(self, whom):
		self.opponent = whom;

	def cancelAttack(self):
		self.opponent = None;
		self.attackTimer = 0;