// ++ operator on enum type

enum ENUM1 { A, B, "" };

// expression
var ResultIsNumber1 = ++ENUM1["B"];
var ResultIsNumber2 = ENUM1.B++;

// miss assignment operator
++ENUM1["B"];

ENUM1.B++;