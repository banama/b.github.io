#coding:utf8
def f(n):
	a = 3
	t = 3
	m = 0
	while 1:
		flag = 1
		t += a

		for i in range(1, t/2+1):
			if t%i == 0:
				flag += 1
		if flag > n:
			print '--'
			print a,t,flag
			break
		if flag >= m:
			m = flag
			print '----',m
		a += 1


f(500)
#12375 76576500 576



