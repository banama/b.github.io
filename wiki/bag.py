def bag(n,h,w,v):  
	len_1 = lambda x:len(x) + 1
	c = [[0 for i in range(h+1)] for j in range(n+1)]

	for i in range(1, n + 1):
		for j in range(1, h + 1):
			c[i][j] = c[i-1][j]
			if j > w[i-1]:
				print i
				c[i][j] = max(c[i-1][j], c[i-1][j-w[i-1]]+v[i-1])
		print c

  
if __name__=='__main__':  
    n=5  
    c=10  
    w=[2,2,6,5,4]  
    v=[6,3,5,4,6]  
    res=bag(n,c,w,v)  
