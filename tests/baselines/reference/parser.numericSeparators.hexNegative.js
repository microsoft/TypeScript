//// [tests/cases/conformance/parser/ecmascript2021/numericSeparators/parser.numericSeparators.hexNegative.ts] ////

//// [1.ts]
0x00_

//// [2.ts]
0x_110

//// [3.ts]
0_X0101

//// [4.ts]
0x01__11

//// [5.ts]
0X0110_0110__

//// [6.ts]
0x___0111010_0101_1


//// [1.js]
0;
//// [2.js]
272;
//// [3.js]
0;
X0101;
//// [4.js]
273;
//// [5.js]
17826064;
//// [6.js]
1172542853137;
