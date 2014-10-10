// - operator on enum type

enum ENUM { };
enum ENUM1 { A, B, "" };

// enum type var
var ResultIsNumber1 = -ENUM;

// expressions
var ResultIsNumber2 = -ENUM1["B"];
var ResultIsNumber3 = -(ENUM1.B + ENUM1[""]);

// miss assignment operators
-ENUM;
-ENUM1;
-ENUM1["B"];
-ENUM, ENUM1;