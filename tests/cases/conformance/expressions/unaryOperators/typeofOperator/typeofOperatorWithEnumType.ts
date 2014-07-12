// typeof  operator on enum type

enum ENUM { };
enum ENUM1 { 1, 2, "" };

// enum type var
var ResultIsString1 = typeof ENUM;
var ResultIsString2 = typeof ENUM1;

// enum type expressions
var ResultIsString3 = typeof ENUM1[0];
var ResultIsString4 = typeof (ENUM[0] + ENUM1[1]);

// multiple typeof  operators
var ResultIsString5 = typeof typeof ENUM;
var ResultIsString6 = typeof typeof typeof (ENUM[0] + ENUM1[1]);

// miss assignment operators
typeof ENUM;
typeof ENUM1;
typeof ENUM1[1];
typeof ENUM, ENUM1;

// use typeof in type query
enum z { };
z: typeof ENUM;
z: typeof ENUM1;