// @module: preserve
// @verbatimModuleSyntax: true
// @allowJs: true
// @outDir: dist
// @rewriteRelativeImportExtensions: true
// @noTypesAndSymbols: true
// @jsx: react,preserve

// Rewrite
// @Filename: main.ts
import {} from "./foo.ts";
import {} from "../foo.mts";
import {} from "../../foo.cts";
import {} from "./foo.tsx";
import foo = require("./foo.ts");
import "./foo.ts";
export * from "./foo.ts";
// @Filename: js.js
import {} from "./foo.ts";
import {} from "../foo.mts";
import {} from "../../foo.cts";
import {} from "./foo.tsx";
import "./foo.ts";
export * from "./foo.ts";

// No rewrite
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
