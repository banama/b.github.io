def f(n):
	a = 2 ** n
	b = 0
	for i in str(a):
		b += int(i)
	return b

print f(1000)