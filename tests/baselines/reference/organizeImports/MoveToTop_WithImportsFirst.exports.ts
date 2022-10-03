// ==ORIGINAL==

import { F1, F2 } from "lib";
1;
export { F1, F2 } from "lib";
2;
import * as NS from "lib";
3;
export * from "lib";
4;
F1(); F2(); NS.F1();

// ==ORGANIZED==

import * as NS from "lib";
import { F1, F2 } from "lib";
1;
export * from "lib";
export { F1, F2 } from "lib";
2;
3;
4;
F1(); F2(); NS.F1();
