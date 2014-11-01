# (n-1)*t + (n-1)*2

def f(n):
	c = [[0 for i in range(n+1)] for j in range(n+1)]
	print c
	for i in range(n+1):
		c[0][i] = 1
	print c
	for j in range(n+1):
		c[j][0] = 1
	print c

	for i in range(1, n+1):
		for j in range(1, n+1):
			c[i][j] = c[i-1][j] + c[i][j-1]
	print c
	return c[-1][-1]

print f(20)