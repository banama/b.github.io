def f(t):
	a = 4
	flag = 2
	while 1:
		for i in range(2, int(a**0.5)+1):
			if a%i == 0:
				break
			if i == int(a**0.5):
				flag += 1
		if flag == t:
			return a
		a += 1


print f(10001)
