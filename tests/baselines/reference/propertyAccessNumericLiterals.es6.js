//// [tests/cases/conformance/es6/propertyAccess/propertyAccessNumericLiterals.es6.ts] ////

//// [propertyAccessNumericLiterals.es6.ts]
0xffffffff.toString();
0o01234.toString();
0b01101101.toString();
1234..toString();
1e0.toString();


//// [propertyAccessNumericLiterals.es6.js]
0xffffffff.toString();
0o01234.toString();
0b01101101.toString();
1234..toString();
1e0.toString();
