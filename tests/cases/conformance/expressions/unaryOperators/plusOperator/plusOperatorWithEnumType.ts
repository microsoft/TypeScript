// + operator on enum type

enum ENUM { };
enum ENUM1 { A, B, "" };

// enum type var
var ResultIsNumber1 = +ENUM;
var ResultIsNumber2 = +ENUM1;

// enum type expressions
var ResultIsNumber3 = +ENUM1["A"];
var ResultIsNumber4 = +(ENUM[0] + ENUM1["B"]);

// miss assignment operators
+ENUM;
+ENUM1;
+ENUM1.B;
+ENUM, ENUM1;