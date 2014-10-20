def num(num):
    while 1:
        flag = 2
        while flag:
            if flag >= num:
                flag = 0
                break
            if num % flag == 0:
                break
            flag += 1
        if flag != 0 and num % flag == 0 :
            num /= flag
            continue
        if flag == 0:
            return num
            
print num(600851475143)