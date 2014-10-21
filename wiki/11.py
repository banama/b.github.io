from ipdb import set_trace
def arr():
	f = file('11.text', 'r')
	a = []
	for i in f.readlines():
		a.append([])
		a[-1] = i.replace('\n','').split(' ')
	
	return a

def f(a, bu):
	for i in range(len(a[0])-3):
		for j in range(len(a) - 3):
			x, y, z, t = 1, 1, 1, 1
			for k in range(0,bu):
				x = x * int(a[i][j+k])
			for k in range(0,bu):
				y = y * int(a[i+k][j])
			for k in range(0,bu):
				z = z * int(a[i+k][j+k])
			if i >= 3:
				for k in range(0, bu):
					t = t * int(a[i-k][j+k])
					# set_trace()
			# a[i][j] = max(x,y,z, t)

			if i == 0 and j == 0:
				a[i][j] = max(x, y, z)
				# set_trace()			
				continue

			if j == 0:
				a[i][0] = max(int(a[i][0]), a[i-1][0])
				continue
			a[i][0] = max(int(a[i][0]),x, y, z, t)


	for i in range(len(a[0])-3):
		for j in range(len(a) - 3, len(a)):
			y = 1
			for k in range(1,bu):
				# a[i][j] = int(a[i][j]) * int(a[i+k][j])
				y = y * int(a[i+k][j])
			a[0-bu][0] = max(a[0-bu][0], y)

	for i in range(len(a[0])-3, len(a)):
		for j in range(len(a) - 3):
			x, t = 1, 1
			for k in range(0,bu):
				x = x * int(a[i][j+k])
			for k in range(0,bu):
				t = t * int(a[i-k][j+k])
			# a[i][j] = max(x, t)
			a[0-bu][0] = max(a[0-bu][0], x, t)
	
	for i in range(len(a)):
		print a[i]
	print '++++++++++++++++'
	return a[0-bu][0]

print f(arr(), 4)