from ipdb import set_trace
import copy
def h1003(a):
	c = [[[] for i in range(len(a)+1)] for j in range(len(a)+1)]

	for i in range(1,len(a)+1):
		for j in range(1, len(a)+1):
			l1 = sum(c[i-1][j-1])
			l2 = sum(c[i-1][j])
			l3 = sum(c[i][j-1])
			maxs =  max(l1,l2,l3)
			if a[j-1] < 0:
				if l1 >= l2 and l1 >= l3:
					c[i][j] = copy.deepcopy(c[i-1][j-1])
				if l2>=l1 and l2 >= l3:
					c[i][j] = copy.deepcopy(c[i-1][j])
				if l3>=l1 and l3 >= l2:
					c[i][j] = copy.deepcopy(c[i][j-1])
			else:
				if l1 == maxs:
					c[i-1][j-1].append(a[j-1])
					c[i][j] = c[i-1][j-1]
				elif l2 == maxs:
					c[i-1][j].append(a[j-1])
					c[i][j] = c[i-1][j]

				elif l3 == maxs:
					c[i][j-1].append(a[j-1])
					c[i][j] = c[i][j-1]
				else:
					pass
		if i == 1:
			return c

print h1003([2,-1,8,7,-6])