// ==ORIGINAL==

import { F1, F2 } from "lib";
import * as NS from "lib";
import D from "lib";

NS.F1();
D();
F1();
F2();

// ==ORGANIZED==

import * as NS from "lib";
import D, { F1, F2 } from "lib";

NS.F1();
D();
F1();
F2();
