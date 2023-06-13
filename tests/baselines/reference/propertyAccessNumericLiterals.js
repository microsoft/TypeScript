//// [tests/cases/conformance/expressions/propertyAccess/propertyAccessNumericLiterals.ts] ////

//// [propertyAccessNumericLiterals.ts]
0xffffffff.toString();
0o01234.toString();
0b01101101.toString();
1234..toString();
1e0.toString();
000.toString();
08.8e5.toString();
0_8.8e5.toString();
8.8e5.toString();
088e4.toString();
88_e4.toString();
88e4.toString();
8_8e4.toString();

//// [propertyAccessNumericLiterals.js]
0xffffffff.toString();
668..toString();
109..toString();
1234..toString();
1e0.toString();
0..toString();
880000..toString();
880000..toString();
8.8e5.toString();
880000..toString();
880000..toString();
88e4.toString();
880000..toString();
