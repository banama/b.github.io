#coding:utf8
def f(arr):
	c = [[0 for i in range(len(arr)) ] for j in range(len(arr))]

	for i in range(len(arr)):
		for j in range(len(arr)):
			if i == 0 and j == 0:
				c[i][j] = arr[i][j]
			elif i == 0:
				c[i][j] = max(arr[i][j], c[i][j-1])
			elif j == 0:
				c[i][j] = max(arr[i][j], c[i-1][j])
			else:
				c[i][j] = c[i-1][j] + max(c[i][j-1], arr[i][j])
		print c,'---'
	return c[-1][-1]

arr = [[7,58,183,439,863],[497,383,563,79,973],[287,63,343,169,583],[627,343,773,959,943],[767,473,103,669,303]]
print f(arr)