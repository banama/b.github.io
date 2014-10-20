def f(a, b, s=0):
    m = a + b
    s += (lambda x: x%2 == 0 and x or 0)(b)
    if m < 4000000:
        f(b,m, s)
    else:
        tt = s
		print tt
