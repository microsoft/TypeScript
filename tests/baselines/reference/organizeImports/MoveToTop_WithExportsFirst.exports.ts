// ==ORIGINAL==

export { F1, F2 } from "lib";
1;
import { F1, F2 } from "lib";
2;
export * from "lib";
3;
import * as NS from "lib";
4;
F1(); F2(); NS.F1();

// ==ORGANIZED==

export * from "lib";
export { F1, F2 } from "lib";
1;
import * as NS from "lib";
import { F1, F2 } from "lib";
2;
3;
4;
F1(); F2(); NS.F1();
