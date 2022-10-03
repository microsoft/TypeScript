//// [tests/cases/conformance/dynamicImport/importCallExpressionDeclarationEmit3.ts] ////

//// [0.ts]
export function foo() { return "foo"; }

//// [1.ts]
declare function getPath(): string;
import * as Zero from "./0";
import("./0");

export var p0: Promise<typeof Zero> = import(getPath());
export var p1: Promise<typeof Zero> = import("./0");
export var p2: Promise<any> = import("./0");


//// [0.js]
export function foo() { return "foo"; }
//// [1.js]
import("./0");
export var p0 = import(getPath());
export var p1 = import("./0");
export var p2 = import("./0");


//// [0.d.ts]
export declare function foo(): string;
//// [1.d.ts]
import * as Zero from "./0";
export declare var p0: Promise<typeof Zero>;
export declare var p1: Promise<typeof Zero>;
export declare var p2: Promise<any>;
