// ++ operator on enum type

enum ENUM1 { 1, 2, "" };

// expression
var ResultIsNumber1 = ++ENUM1[1];
var ResultIsNumber2 = ENUM1[1]++;

// miss assignment operator
++ENUM1[1];

ENUM1[1]++;