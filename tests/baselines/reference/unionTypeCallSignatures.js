//// [unionTypeCallSignatures.ts]
var numOrDate: number | Date;
var strOrBoolean: string | boolean;
var strOrNum: string | number;

// If each type in U has call signatures and the sets of call signatures are identical ignoring return types, 
// U has the same set of call signatures, but with return types that are unions of the return types of the respective call signatures from each type in U.
var unionOfDifferentReturnType: { (a: number): number; } | { (a: number): Date; };
numOrDate = unionOfDifferentReturnType(10);
strOrBoolean = unionOfDifferentReturnType("hello"); // error 
unionOfDifferentReturnType1(true); // error in type of parameter

var unionOfDifferentReturnType1: { (a: number): number; (a: string): string; } | { (a: number): Date; (a: string): boolean; };
numOrDate = unionOfDifferentReturnType1(10);
strOrBoolean = unionOfDifferentReturnType1("hello");
unionOfDifferentReturnType1(true); // error in type of parameter
unionOfDifferentReturnType1(); // error missing parameter

var unionOfDifferentParameterTypes: { (a: number): number; } | { (a: string): Date; };
unionOfDifferentParameterTypes(10);// error - no call signatures
unionOfDifferentParameterTypes("hello");// error - no call signatures
unionOfDifferentParameterTypes();// error - no call signatures

var unionOfDifferentNumberOfSignatures: { (a: number): number; } | { (a: number): Date; (a: string): boolean; };
unionOfDifferentNumberOfSignatures(); // error - no call signatures
unionOfDifferentNumberOfSignatures(10); // error - no call signatures
unionOfDifferentNumberOfSignatures("hello"); // error - no call signatures

var unionWithDifferentParameterCount: { (a: string): string; } | { (a: string, b: number): number; } ;
unionWithDifferentParameterCount();// needs more args
unionWithDifferentParameterCount("hello");// needs more args
unionWithDifferentParameterCount("hello", 10);// OK

var unionWithOptionalParameter1: { (a: string, b?: number): string; } | { (a: string, b?: number): number; };
strOrNum = unionWithOptionalParameter1('hello');
strOrNum = unionWithOptionalParameter1('hello', 10);
strOrNum = unionWithOptionalParameter1('hello', "hello"); // error in parameter type
strOrNum = unionWithOptionalParameter1(); // error

var unionWithOptionalParameter2: { (a: string, b?: number): string; } | { (a: string, b: number): number };
strOrNum = unionWithOptionalParameter2('hello'); // error no call signature
strOrNum = unionWithOptionalParameter2('hello', 10); // error no call signature
strOrNum = unionWithOptionalParameter2('hello', "hello"); // error no call signature
strOrNum = unionWithOptionalParameter2(); // error no call signature

var unionWithOptionalParameter3: { (a: string, b?: number): string; } | { (a: string): number; };
strOrNum = unionWithOptionalParameter3('hello');
strOrNum = unionWithOptionalParameter3('hello', 10); // ok
strOrNum = unionWithOptionalParameter3('hello', "hello"); // wrong argument type
strOrNum = unionWithOptionalParameter3(); // needs more args

var unionWithRestParameter1: { (a: string, ...b: number[]): string; } | { (a: string, ...b: number[]): number };
strOrNum = unionWithRestParameter1('hello');
strOrNum = unionWithRestParameter1('hello', 10);
strOrNum = unionWithRestParameter1('hello', 10, 11);
strOrNum = unionWithRestParameter1('hello', "hello"); // error in parameter type
strOrNum = unionWithRestParameter1(); // error

var unionWithRestParameter2: { (a: string, ...b: number[]): string; } | { (a: string, b: number): number };
strOrNum = unionWithRestParameter2('hello'); // error no call signature
strOrNum = unionWithRestParameter2('hello', 10); // error no call signature
strOrNum = unionWithRestParameter2('hello', 10, 11); // error no call signature
strOrNum = unionWithRestParameter2('hello', "hello"); // error no call signature
strOrNum = unionWithRestParameter2(); // error no call signature

var unionWithRestParameter3: { (a: string, ...b: number[]): string; } | { (a: string): number };
strOrNum = unionWithRestParameter3('hello');
strOrNum = unionWithRestParameter3('hello', 10); // error no call signature
strOrNum = unionWithRestParameter3('hello', 10, 11); // error no call signature
strOrNum = unionWithRestParameter3('hello', "hello"); // wrong argument type
strOrNum = unionWithRestParameter3(); // error no call signature

var unionWithRestParameter4: { (...a: string[]): string; } | { (a: string, b: string): number; };
strOrNum = unionWithRestParameter4("hello"); // error supplied parameters do not match any call signature
strOrNum = unionWithRestParameter4("hello", "world");


//// [unionTypeCallSignatures.js]
var numOrDate;
var strOrBoolean;
var strOrNum;
// If each type in U has call signatures and the sets of call signatures are identical ignoring return types, 
// U has the same set of call signatures, but with return types that are unions of the return types of the respective call signatures from each type in U.
var unionOfDifferentReturnType;
numOrDate = unionOfDifferentReturnType(10);
strOrBoolean = unionOfDifferentReturnType("hello"); // error 
unionOfDifferentReturnType1(true); // error in type of parameter
var unionOfDifferentReturnType1;
numOrDate = unionOfDifferentReturnType1(10);
strOrBoolean = unionOfDifferentReturnType1("hello");
unionOfDifferentReturnType1(true); // error in type of parameter
unionOfDifferentReturnType1(); // error missing parameter
var unionOfDifferentParameterTypes;
unionOfDifferentParameterTypes(10); // error - no call signatures
unionOfDifferentParameterTypes("hello"); // error - no call signatures
unionOfDifferentParameterTypes(); // error - no call signatures
var unionOfDifferentNumberOfSignatures;
unionOfDifferentNumberOfSignatures(); // error - no call signatures
unionOfDifferentNumberOfSignatures(10); // error - no call signatures
unionOfDifferentNumberOfSignatures("hello"); // error - no call signatures
var unionWithDifferentParameterCount;
unionWithDifferentParameterCount(); // needs more args
unionWithDifferentParameterCount("hello"); // needs more args
unionWithDifferentParameterCount("hello", 10); // OK
var unionWithOptionalParameter1;
strOrNum = unionWithOptionalParameter1('hello');
strOrNum = unionWithOptionalParameter1('hello', 10);
strOrNum = unionWithOptionalParameter1('hello', "hello"); // error in parameter type
strOrNum = unionWithOptionalParameter1(); // error
var unionWithOptionalParameter2;
strOrNum = unionWithOptionalParameter2('hello'); // error no call signature
strOrNum = unionWithOptionalParameter2('hello', 10); // error no call signature
strOrNum = unionWithOptionalParameter2('hello', "hello"); // error no call signature
strOrNum = unionWithOptionalParameter2(); // error no call signature
var unionWithOptionalParameter3;
strOrNum = unionWithOptionalParameter3('hello');
strOrNum = unionWithOptionalParameter3('hello', 10); // ok
strOrNum = unionWithOptionalParameter3('hello', "hello"); // wrong argument type
strOrNum = unionWithOptionalParameter3(); // needs more args
var unionWithRestParameter1;
strOrNum = unionWithRestParameter1('hello');
strOrNum = unionWithRestParameter1('hello', 10);
strOrNum = unionWithRestParameter1('hello', 10, 11);
strOrNum = unionWithRestParameter1('hello', "hello"); // error in parameter type
strOrNum = unionWithRestParameter1(); // error
var unionWithRestParameter2;
strOrNum = unionWithRestParameter2('hello'); // error no call signature
strOrNum = unionWithRestParameter2('hello', 10); // error no call signature
strOrNum = unionWithRestParameter2('hello', 10, 11); // error no call signature
strOrNum = unionWithRestParameter2('hello', "hello"); // error no call signature
strOrNum = unionWithRestParameter2(); // error no call signature
var unionWithRestParameter3;
strOrNum = unionWithRestParameter3('hello');
strOrNum = unionWithRestParameter3('hello', 10); // error no call signature
strOrNum = unionWithRestParameter3('hello', 10, 11); // error no call signature
strOrNum = unionWithRestParameter3('hello', "hello"); // wrong argument type
strOrNum = unionWithRestParameter3(); // error no call signature
var unionWithRestParameter4;
strOrNum = unionWithRestParameter4("hello"); // error supplied parameters do not match any call signature
strOrNum = unionWithRestParameter4("hello", "world");
