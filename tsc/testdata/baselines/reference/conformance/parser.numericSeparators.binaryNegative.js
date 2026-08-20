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
"use strict";
0;
//// [2.js]
"use strict";
6;
//// [3.js]
"use strict";
0;
B0101;
//// [4.js]
"use strict";
7;
//// [5.js]
"use strict";
102;
//// [6.js]
"use strict";
1867;
