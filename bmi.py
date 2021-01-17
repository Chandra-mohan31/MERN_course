height = float(input("enter your height in meters"))
weight = int(input("enter your weight in kg"))
bmi = weight/pow(height,2)
if bmi >= 26:
    print("you are overweight")
    print(bmi)
elif bmi <=17:
    print("you are underweight")
    print(bmi)
else:
    print("you are fit")
    print(bmi)
