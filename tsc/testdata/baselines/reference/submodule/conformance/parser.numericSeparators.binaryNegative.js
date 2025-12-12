//// [tests/cases/conformance/parser/ecmascript2021/numericSeparators/parser.numericSeparators.binaryNegative.ts] ////

//// [1.ts]
0b00_

//// [2.ts]
0b_110

//// [3.ts]
0_B0101

//// [4.ts]
0b01__11

//// [5.ts]
0B0110_0110__

//// [6.ts]
0b___0111010_0101_1


//// [1.js]
0;
//// [2.js]
6;
//// [3.js]
0;
B0101;
//// [4.js]
7;
//// [5.js]
102;
//// [6.js]
1867;
