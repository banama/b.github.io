from ipdb import set_trace
def f():
	a = 2

	def s(k,i):
		if i == 2:
			return 1

		for j in range(2,max(k,if)):
			if k == 1:
				return 1
			elif i%j == 0 and k%j ==0:
				return s((k/j),i/j)
			elif j==i-1:
				return k
			else:
				continue


	for i in range(2,21):
		t = s(a, i)
		print t

		a *= t
	return a
f()

