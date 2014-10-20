from ipdb import set_trace

def bool(arr):
    mark = len(arr)
    flag = 1
    while mark != 1 and flag ==1:
        flag = 0
        for i in range(0, mark-1):
            if arr[i] > arr[i+1]:
                arr[i],arr[i+1] = arr[i+1], arr[i]
                flag = 1
        mark = mark - 1
        print arr
    print 'finish',arr

# 

def quicksort(arr, low, high):
    k, l, h = arr[low], low, high

    while low < high:

        while low < high and arr[high] < k:
            low = low + 1
            if low != high:
                arr[low], arr[high] = arr[high], arr[low]

        while low < high and arr[high] >= k:
            high = high - 1

    arr[l],arr[low] = arr[low], k

    if h > l + 1:
        quicksort(arr,l ,low)
        quicksort(arr,low + 1, h)

# arr = [8,10,9,6,4,16,5,13,26,18,2,45,34,23,1,7,3]
# quicksort(arr,0, len(arr)-1)


def _f(arr):
    cal = 0
    for i in range(0, len(arr)):
        if i == len(arr)/2:
            if len(arr)%2 == 0:
                if cal == 0:
                    return 'middle',i
                m = 0
                if cal < 0 :
                    for j in range(i+1, len(arr)):
                        m = m + 2*arr[j]
                        if cal + m == 0:
                            return 'that',i
                        elif cal + m >0:
                            print j
                            return '1no'
                else:
                    for j in range(i+1, len(arr)):
                        m = m + 2*arr[-1-i]
                        if cal + m == 0:
                            return 'that',i
                        elif cal + m < 0:
                            return '2no'
                        else:
                            return 'final'
            else:
                if cal == 0:
                    return '3no'
                m = 0
                if cal < 0 :
                    for j in range(i+1, len(arr)):
                        if j == len(arr)/2 + 1:
                            m = m + arr[j]
                        else:
                            m = m + 2*arr[j]
                        if cal + m == 0:
                            return 'that',i
                        elif cal + m >0:
                            return '4no'
                else:
                    for j in range(i, len(arr)):
                        if j == len(arr)/2 + 1:
                            m = m + arr[j]
                        else:
                            m = m + 2*arr[j]
                        if cal + m == 0:
                            return '5that',i
                        elif cal + m < 0:
                            return '6no'
                        else:
                            return 'final'
            return 'haha no'
        cal = cal + arr[i] - arr[0-i-1]


#!/usr/bin/env python
#coding=utf-8
from ipdb import set_trace
def word_distance(m,n):
    """compute the least steps number to convert m to n by insert , delete , replace .
    >>> print word_distance("abc","abec")
    1
    >>> print word_distance("ababec","abc")
    3
    """
    len_1=lambda x:len(x)+1
    
    c= [[0 for i in range(len_1(m)) ] for j in range(len_1(n))]
    c[0]=[j for j in range(0,len_1(n))]
    for j in range(1,len_1(n)):
        c[j][0] = j
    print c
    
    for i in range(1,len(m)+1):
        for j in range(1,len(n)+1):
            c[i][j] = (
                min(
                    c[i][j-1]+1,
                    c[i-1][j]+1,
                    c[i-1][j-1] + (0 if m[i-1]==n[j-1] else 1 )#
                )
            )
            # set_trace()
            print c[i][j],m[i-1],n[j-1],' ',
        print ''
    return c[-1][-1]
 

print word_distance('abcd','dcba')


