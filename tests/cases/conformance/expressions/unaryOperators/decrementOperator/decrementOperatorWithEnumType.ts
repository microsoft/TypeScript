// -- operator on enum type

enum ENUM1 { A, B, "" };

// expression
var ResultIsNumber1 = --ENUM1["A"];
var ResultIsNumber2 = ENUM1.A--;

// miss assignment operator
--ENUM1["A"];

ENUM1[A]--;
