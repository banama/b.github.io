def f():
	x = int(1000/(2+2**0.5))
	for i in range(1, x+1):
		for j in range(x+1, 500):
			if i**2 + j**2 == (1000-i-j)**2:
				print i,j,1000-i-j
				print i**2,j**2,(1000-i-j)**2
				print i**2 + j**2 == (1000-i-j)**2
				break

f()