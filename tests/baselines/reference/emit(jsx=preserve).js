//// [tests/cases/conformance/externalModules/rewriteRelativeImportExtensions/emit.ts] ////

//// [globals.d.ts]
declare function require(module: string): any;

// Rewrite
//// [main.ts]
import {} from "./foo.ts";
import {} from "../foo.mts";
import {} from "../../foo.cts";
import {} from "./foo.tsx";
import foo = require("./foo.ts");
import "./foo.ts";
export * from "./foo.ts";
import("./foo.ts");
import("./foo.ts", { with: { attr: "value" } });
//// [js.js]
import {} from "./foo.ts";
import {} from "../foo.mts";
import {} from "../../foo.cts";
import {} from "./foo.tsx";
import "./foo.ts";
export * from "./foo.ts";
import("./foo.ts");
import("./foo.ts", { with: { attr: "value" } });
require("./foo.ts");
{ require("./foo.ts"); }

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
require("./foo.ts");
import("" + "./foo.ts");

//// [lol.ts]
// Sad face https://github.com/microsoft/TypeScript/blob/6b04f5039429b9d412696fe2febe39ecc69ad365/src/testRunner/compilerRunner.ts#L207


//// [main.js]
import {} from "./foo.js";
import {} from "../foo.mjs";
import {} from "../../foo.cjs";
import {} from "./foo.jsx";
const foo = require("./foo.js");
import "./foo.js";
export * from "./foo.js";
import("./foo.js");
import("./foo.js", { with: { attr: "value" } });
//// [js.js]
import {} from "./foo.js";
import {} from "../foo.mjs";
import {} from "../../foo.cjs";
import {} from "./foo.jsx";
import "./foo.js";
export * from "./foo.js";
import("./foo.js");
import("./foo.js", { with: { attr: "value" } });
require("./foo.ts");
{
    require("./foo.ts");
}
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
require("./foo.ts");
import("" + "./foo.ts");
//// [lol.js]
// Sad face https://github.com/microsoft/TypeScript/blob/6b04f5039429b9d412696fe2febe39ecc69ad365/src/testRunner/compilerRunner.ts#L207
