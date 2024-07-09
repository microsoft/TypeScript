// ==ORIGINAL==

import { F1, F2 } from "lib";
F1();
F2();
import * as NS from "lib";
NS.F1();
import D from "lib";
D();

// ==ORGANIZED==

import * as NS from "lib";
import D, { F1, F2 } from "lib";
F1();
F2();
NS.F1();
D();
