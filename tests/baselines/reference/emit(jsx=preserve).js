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
    var __rewriteRelativeImportExtension = (this && this.__rewriteRelativeImportExtension) || function (path, preserveJsx) {
    if (typeof path === "string" && path[0] === "." && (path[1] === "/" || path[1] === "." && path[2] === "/")) {
        if (path.substring(path.length - 4) === ".tsx") {
            return path.substring(0, path.length - 4) + (preserveJsx ? ".jsx" : ".js");
        }
        if (path.substring(path.length - 3) === ".ts") {
            var dot = path.lastIndexOf(".", path.length - 4);
            if (dot >= 0 && (path.substring(dot - 2, dot) === ".d" || path.substring(dot, dot + 2) === ".d")) {
                return path;
            }
        }
        return path.replace(/(?<!\.d)\.[cm]ts$/, function (ext) { return ext === ".mts" ? ".mjs" : ".cjs"; });
    }
    return path;
};
import {} from "./foo.js";
import {} from "../foo.mjs";
import {} from "../../foo.cjs";
import {} from "./foo.jsx";
const foo = require("./foo.js");
import "./foo.js";
export * from "./foo.js";
import(__rewriteRelativeImportExtension("./foo.ts", true));
import(__rewriteRelativeImportExtension("./foo.ts", true), { with: { attr: "value" } });
//// [js.js]
    var __rewriteRelativeImportExtension = (this && this.__rewriteRelativeImportExtension) || function (path, preserveJsx) {
    if (typeof path === "string" && path[0] === "." && (path[1] === "/" || path[1] === "." && path[2] === "/")) {
        if (path.substring(path.length - 4) === ".tsx") {
            return path.substring(0, path.length - 4) + (preserveJsx ? ".jsx" : ".js");
        }
        if (path.substring(path.length - 3) === ".ts") {
            var dot = path.lastIndexOf(".", path.length - 4);
            if (dot >= 0 && (path.substring(dot - 2, dot) === ".d" || path.substring(dot, dot + 2) === ".d")) {
                return path;
            }
        }
        return path.replace(/(?<!\.d)\.[cm]ts$/, function (ext) { return ext === ".mts" ? ".mjs" : ".cjs"; });
    }
    return path;
};
import {} from "./foo.js";
import {} from "../foo.mjs";
import {} from "../../foo.cjs";
import {} from "./foo.jsx";
import "./foo.js";
export * from "./foo.js";
import(__rewriteRelativeImportExtension("./foo.ts", true));
import(__rewriteRelativeImportExtension("./foo.ts", true), { with: { attr: "value" } });
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
