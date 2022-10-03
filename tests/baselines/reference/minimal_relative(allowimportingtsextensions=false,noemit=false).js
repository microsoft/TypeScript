//// [tests/cases/conformance/moduleResolution/minimal_relative.ts] ////

//// [a.ts]
export {};

//// [b.ts]
export {};

//// [b.js]
export {};

//// [b.d.ts]
export {};

//// [c.ts]
export {};

//// [c.tsx]
export {};

//// [index.ts]
export {};

//// [e]
export {};

//// [main.ts]
import {} from "./a";
import {} from "./a.js";
import {} from "./a.ts";

import {} from "./b";
import {} from "./b.js";
import {} from "./b.ts";
import {} from "./b.d.ts";
import type {} from "./b.d.ts";

import {} from "./c.ts";
import {} from "./c.tsx";

import {} from "./d";
import {} from "./d/index";
import {} from "./d/index.ts";

import {} from "./e";

//// [types.d.ts]
import {} from "./a.ts";
import {} from "./a.d.ts";
import type {} from "./a.d.ts";


//// [a.js]
"use strict";
exports.__esModule = true;
//// [b.js]
"use strict";
exports.__esModule = true;
//// [index.js]
"use strict";
exports.__esModule = true;
//// [main.js]
"use strict";
exports.__esModule = true;
