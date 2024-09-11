//// [tests/cases/conformance/externalModules/rewriteRelativeImportExtensions/emit.ts] ////

//// [main.ts]
import {} from "./foo.ts";
import {} from "../foo.mts";
import {} from "../../foo.cts";
import {} from "./foo.tsx";
import foo = require("./foo.ts");
import "./foo.ts";
export * from "./foo.ts";
//// [js.js]
import {} from "./foo.ts";
import {} from "../foo.mts";
import {} from "../../foo.cts";
import {} from "./foo.tsx";
import "./foo.ts";
export * from "./foo.ts";

// No rewrite
//// [no.ts]
import {} from "./foo.ts/foo.js";
import {} from "foo.ts";
import {} from "pkg/foo.ts";
import {} from ".foo.ts";
import {} from "./foo.d.ts";
import {} from "./foo.d.mts";
import {} from "./foo.d.css.ts";
import {} from "#internal/foo.ts";
import {} from "node:foo.ts";


//// [main.js]
import {} from "./foo.js";
import {} from "../foo.mjs";
import {} from "../../foo.cjs";
import {} from "./foo.js";
var foo = require("./foo.js");
import "./foo.js";
export * from "./foo.js";
//// [js.js]
import {} from "./foo.js";
import {} from "../foo.mjs";
import {} from "../../foo.cjs";
import {} from "./foo.js";
import "./foo.js";
export * from "./foo.js";
// No rewrite
//// [no.js]
import {} from "./foo.ts/foo.js";
import {} from "foo.ts";
import {} from "pkg/foo.ts";
import {} from ".foo.ts";
import {} from "./foo.d.ts";
import {} from "./foo.d.mts";
import {} from "./foo.d.css.ts";
import {} from "#internal/foo.ts";
import {} from "node:foo.ts";
