def f():
	a = [0, 0]
	b = 2

	large = 0
	index = 0
	flag = 0
	
	
	while 1:
		ls = 0
		if b == 1000000:
			break
		flag = b
		while 1:
			if flag == 1:
				ls += 1
				break
			if flag < b:
				ls += a[flag]
				break
			if flag%2 == 0:
				flag /= 2
				ls += 1
			else:
				flag = 3*flag + 1
				ls += 1


		if ls > large:
			index = b 
			large = ls
		b += 1
		a.append(ls)

	return (index, large)
print f()