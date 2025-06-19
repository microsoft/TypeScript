//// [tests/cases/conformance/externalModules/rewriteRelativeImportExtensions/emit.ts] ////

//// [globals.d.ts]
declare function require(module: string): any;

//// [main.ts]
// Rewrite
import {} from "./foo.ts";
import {} from "../foo.mts";
import {} from "../../foo.cts";
import {} from "./foo.tsx";
import foo = require("./foo.ts");
import "./foo.ts";
export * from "./foo.ts";
//Shim
import("./foo.ts");
import("./foo.ts").then(() => {});
function acceptAny(arg: any) {}
acceptAny(import("./foo.ts"));
import("./foo.ts", { with: { attr: "value" } });
import("" + "./foo.ts");
//// [js.js]
// Rewrite
import {} from "./foo.ts";
import {} from "../foo.mts";
import {} from "../../foo.cts";
import {} from "./foo.tsx";
import "./foo.ts";
export * from "./foo.ts";
// Shim
import("./foo.ts");
import("./foo.ts", { with: { attr: "value" } });
require("./foo.ts");
{
  require("./foo.ts");
  require(getPath());
}

// No rewrite or shim
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
(require)("./foo.ts");
import("node:path");
require("node:path");

//// [lol.ts]
// Sad face https://github.com/microsoft/TypeScript/blob/6b04f5039429b9d412696fe2febe39ecc69ad365/src/testRunner/compilerRunner.ts#L207


//// [main.js]
var __rewriteRelativeImportExtension = (this && this.__rewriteRelativeImportExtension) || function (path, preserveJsx) {
    if (typeof path === "string" && /^\.\.?\//.test(path)) {
        return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
            return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : (d + ext + "." + cm.toLowerCase() + "js");
        });
    }
    return path;
};
// Rewrite
import {} from "./foo.js";
import {} from "../foo.mjs";
import {} from "../../foo.cjs";
import {} from "./foo.jsx";
const foo = require("./foo.js");
import "./foo.js";
export * from "./foo.js";
//Shim
import("./foo.js");
import("./foo.js").then(() => { });
function acceptAny(arg) { }
acceptAny(import("./foo.js"));
import("./foo.js", { with: { attr: "value" } });
import(__rewriteRelativeImportExtension("" + "./foo.ts", true));
//// [js.js]
var __rewriteRelativeImportExtension = (this && this.__rewriteRelativeImportExtension) || function (path, preserveJsx) {
    if (typeof path === "string" && /^\.\.?\//.test(path)) {
        return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
            return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : (d + ext + "." + cm.toLowerCase() + "js");
        });
    }
    return path;
};
// Rewrite
import {} from "./foo.js";
import {} from "../foo.mjs";
import {} from "../../foo.cjs";
import {} from "./foo.jsx";
import "./foo.js";
export * from "./foo.js";
// Shim
import("./foo.js");
import("./foo.js", { with: { attr: "value" } });
require("./foo.js");
{
    require("./foo.js");
    require(__rewriteRelativeImportExtension(getPath(), true));
}
// No rewrite or shim
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
(require)("./foo.ts");
import("node:path");
require("node:path");
//// [lol.js]
// Sad face https://github.com/microsoft/TypeScript/blob/6b04f5039429b9d412696fe2febe39ecc69ad365/src/testRunner/compilerRunner.ts#L207
