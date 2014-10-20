from ipdb import set_trace
def num(a):
	l = len(a)
	c = [[0 for i in range(l)] for j in range(l)]
	for i in range(l):
		c[0][i] = a[l-1	][i]
	
	for i in range(1,l):
		for j in range(l-i):
			c[i][j] = max(c[i-1][j], c[i-1][j+1]) + a[l-i-1][j]
	print c

n = raw_input('n:')
# a = [[9], [12, 15], [10, 6, 8], [2, 18, 9, 5], [19, 7, 10, 4, 16]]
a = []
for i in range(int(n)):
	a.append([0 for i in range(i+1)])
	for j in range(i+1):
		a[i][j] = int(raw_input(str(i)+' '+str(j)+' '))
print a

num(a)