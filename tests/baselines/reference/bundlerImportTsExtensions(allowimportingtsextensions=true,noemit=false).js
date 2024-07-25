//// [tests/cases/conformance/moduleResolution/bundler/bundlerImportTsExtensions.ts] ////

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
WOMP WOMP BINARY DATA

//// [e.ts]
export {};

//// [e.txt]
The letter e is for elephant
This poem is not about elephants
It is about the letter e
- Authored by GitHub Copilot, Nov 2022

//// [e.txt.ts]
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

// These should not resolve, but preventing them has
// relatively little utility compared to the cost of
// the filesystem hits.
import {} from "./e";
import {} from "./e.txt";

//// [types.d.ts]
import {} from "./a.ts";
import {} from "./a.d.ts";
import type {} from "./a.d.ts";

//// [a.js]
export {};
//// [index.js]
export {};
//// [e.js]
export {};
//// [e.txt.js]
export {};
//// [main.js]
export {};
