import time
def f(a):
	flag = 4
	sum = 5
	start = time.time()
	while a-flag:
		for i in range(2, int(flag ** 0.5 + 1)):
			if flag%i == 0:
				break
			if i == int(flag**0.5):
				sum += flag
		flag += 1
	print time.time() - start
	return sum

print f(2000000)