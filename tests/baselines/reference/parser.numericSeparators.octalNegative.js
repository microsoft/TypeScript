//// [tests/cases/conformance/parser/ecmascript2021/numericSeparators/parser.numericSeparators.octalNegative.ts] ////

//// [1.ts]
0o00_

//// [2.ts]
0o_110

//// [3.ts]
0_O0101

//// [4.ts]
0o01__11

//// [5.ts]
0O0110_0110__

//// [6.ts]
0o___0111010_0101_1


//// [1.js]
0;
//// [2.js]
72;
//// [3.js]
0;
O0101;
//// [4.js]
73;
//// [5.js]
294984;
//// [6.js]
1224999433;
