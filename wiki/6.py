def f(a):
	t = (a/2+a*a/2) ** 2
	for i in range(a+1):
		print t
		t = t - i**2
	return t

print f(100)
