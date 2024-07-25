// @strict: true

// @filename: src/core/_namespaces/ts.ts
import * as Debug from "../debug";
export { Debug };

// @filename: src/core/debug.ts
export declare function assert(expression: unknown): asserts expression;


// @filename: src/core/foo.ts
import * as ts from "./_namespaces/ts";
import { Debug } from "./_namespaces/ts";

ts.Debug.assert(true);
Debug.assert(true);


// @filename: src/other/_namespaces/ts.ts
export * from "../../core/_namespaces/ts"


// @filename: src/other/bar.ts
import * as ts from "./_namespaces/ts";
import { Debug } from "./_namespaces/ts";

ts.Debug.assert(true);
Debug.assert(true);
