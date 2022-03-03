// @module: es2020
// @target: es2020
// @declaration: true

// @filename: 0.ts
export function foo() { return "foo"; }

// @filename: 1.ts
declare function getPath(): string;
import * as Zero from "./0";
import("./0");

export var p0: Promise<typeof Zero> = import(getPath());
export var p1: Promise<typeof Zero> = import("./0");
export var p2: Promise<any> = import("./0");
