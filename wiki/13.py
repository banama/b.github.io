from ipdb import set_trace
def arr():
	f = file('13.text', 'r')
	a = []
	for i in f.readlines():
		a.append([])
		a[-1] = int(i)
	return a

def f():
	a = arr()
	c = 0
	for i in a:
		c += i
	print c

f()