// void  operator on enum type

enum ENUM { };
enum ENUM1 { 1, 2, "" };

// enum type var
var ResultIsAny1 = void ENUM;
var ResultIsAny2 = void ENUM1;

// enum type expressions
var ResultIsAny3 = void ENUM1[0];
var ResultIsAny4 = void (ENUM[0] + ENUM1[1]);

// multiple void  operators
var ResultIsAny5 = void void ENUM;
var ResultIsAny6 = void void void (ENUM[0] + ENUM1[1]);

// miss assignment operators
void ENUM;
void ENUM1;
void ENUM1[1];
void ENUM, ENUM1;