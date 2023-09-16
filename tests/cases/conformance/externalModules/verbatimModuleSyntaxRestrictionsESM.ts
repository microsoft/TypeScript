// @verbatimModuleSyntax: true
// @target: esnext
// @module: esnext
// @moduleResolution: node
// @esModuleInterop: true, false

// @Filename: /decl.d.ts
declare class CJSy {}
export = CJSy;

// @Filename: /ambient.d.ts
declare module "ambient" {
    const _export: number;
    export = _export;
}

// @Filename: /types.ts
interface Typey {}
export type { Typey };

// @Filename: /main.ts
import CJSy = require("./decl"); // error
import type CJSy2 = require("./decl"); // ok I guess?
import CJSy3 from "./decl"; // ok in esModuleInterop
import * as types from "./types"; // ok
CJSy;

// @Filename: /ns.ts
export namespace ns {
    export enum A {}
}
