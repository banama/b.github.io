from ipdb import set_trace
def com(a, b):
	c = [['' for i in range(len(b)+1)] for j in range(len(a)+1)]
	print len(c[0])
	print len(c)

	for i in range(1, len(a)+1):
		for j in range(1, len(b)+1):
			if a[i-1] == b[j-1]:
				c[i][j] = c[i-1][j-1] + b[j-1]
			else:
				l1 = len(c[i-1][j-1])
				l2 = len(c[i-1][j])
				l3 = len(c[i][j-1])
				if l1 >= l2 and l1 >= l3:
					c[i][j] = c[i-1][j-1]
				if l2>=l1 and l2 >= l3:
					c[i][j] = c[i-1][j]
				if l3>=l1 and l3 >= l2:
					c[i][j] = c[i][j-1]
			if len(c[i][j]) == i:
				break
			print c
			print '---------\n'

	print c


com('ABCBDAB', 'BCDBA')