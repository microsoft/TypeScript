// @target: esnext
// @module: preserve
// @verbatimModuleSyntax: true
// @allowJs: true
// @outDir: dist
// @rewriteRelativeImportExtensions: true
// @noTypesAndSymbols: true
// @jsx: react,preserve

// @Filename: globals.d.ts
declare function require(module: string): any;

// @Filename: main.ts
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
// @Filename: js.js
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
// @Filename: no.ts
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

// @Filename: lol.ts
// Sad face https://github.com/microsoft/TypeScript/blob/6b04f5039429b9d412696fe2febe39ecc69ad365/src/testRunner/compilerRunner.ts#L207
