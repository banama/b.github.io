from ipdb import set_trace
def f():

	a = 999*999
	while 1:
		flag = 1
		b = str(a)
		for i in range(len(b)/2):
			if b[i] != b[-1-i]:
				flag = 0
				a -= 1
				break
				
		if flag == 0:
			continue


		for i in range(100, 1000):
			if a%i == a/i < 1000:
				return a,i,a/i
		a -= 1

print f()