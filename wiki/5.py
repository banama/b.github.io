from ipdb import set_trace
def f(n):
	a = 2
	def _(k, l):
		if min(k, l) == 1:
			return l
		for i in range(2, min(k, l)+1):
			if k % i==0 and l%i == 0:
				return _(k/i, l/i)
			if i == min(k, l):
				return l

	for i in range(2,n+1):
		if i == 2:
			a = 2
		else:
			a = a * _(a, i)
	print a


f(20)

