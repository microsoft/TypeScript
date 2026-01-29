//// [tests/cases/compiler/assertionFunctionWildcardImport1.ts] ////

//// [ts.ts]
import * as Debug from "../debug";
export { Debug };

//// [debug.ts]
export declare function assert(expression: unknown): asserts expression;


//// [foo.ts]
import * as ts from "./_namespaces/ts";
import { Debug } from "./_namespaces/ts";

ts.Debug.assert(true);
Debug.assert(true);


//// [ts.ts]
export * from "../../core/_namespaces/ts"


//// [bar.ts]
import * as ts from "./_namespaces/ts";
import { Debug } from "./_namespaces/ts";

ts.Debug.assert(true);
Debug.assert(true);


//// [debug.js]
export {};
//// [ts.js]
import * as Debug from "../debug";
export { Debug };
//// [foo.js]
import * as ts from "./_namespaces/ts";
import { Debug } from "./_namespaces/ts";
ts.Debug.assert(true);
Debug.assert(true);
//// [ts.js]
export * from "../../core/_namespaces/ts";
//// [bar.js]
import * as ts from "./_namespaces/ts";
import { Debug } from "./_namespaces/ts";
ts.Debug.assert(true);
Debug.assert(true);
