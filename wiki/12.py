#coding:utf8
def f(n):
	a = 3
	t = 3
	m = 100
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
			print a,t,flag
			if m > n:
				break
		a += 1


f(500)



