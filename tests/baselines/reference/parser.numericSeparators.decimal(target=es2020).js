//// [tests/cases/conformance/parser/ecmascript2021/numericSeparators/parser.numericSeparators.decimal.ts] ////

//// [parser.numericSeparators.decimal.ts]
1_000_000_000
1.1_00_01
1e1_0
1e+1_0
1e-1_0
1.1e10_0
1.1e+10_0
1.1e-10_0
12_34_56
1_22_333
1_2.3_4
1_2.3_4e5_6
1_2.3_4e+5_6
1_2.3_4e-5_6


//// [parser.numericSeparators.decimal.js]
1000000000;
1.10001;
10000000000;
10000000000;
1e-10;
1.1e+100;
1.1e+100;
1.1e-100;
123456;
122333;
12.34;
1.234e+57;
1.234e+57;
1.234e-55;
