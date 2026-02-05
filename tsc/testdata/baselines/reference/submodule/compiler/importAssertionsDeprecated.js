//// [tests/cases/compiler/importAssertionsDeprecated.ts] ////

//// [a.ts]
import json from "./package.json" assert { type: "json" };

//// [b.ts]
import * as data from "./data.json" assert { type: "json" };

//// [c.ts]
export { default as config } from "./config.json" assert { type: "json" };

//// [package.json]
{}

//// [data.json]
{}

//// [config.json]
{}


//// [a.js]
export {};
//// [b.js]
export {};
//// [c.js]
export { default as config } from "./config.json" assert { type: "json" };
