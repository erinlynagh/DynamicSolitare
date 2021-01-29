a1 = ['C','D','H','S']
a2 = [1,2,3,4,5,6,7,8,9,10,'J','Q','K']
a3 = []

a1 = ['C','S']
a2 = [1,2,3,4,5,6,7,8]


for i in a1:
    for _ in a2:
        a3.append(str(_)+i)

print(a3)