//// [tests/cases/conformance/es2022/arbitraryModuleNamespaceIdentifiers/arbitraryModuleNamespaceIdentifiers_syntax.ts] ////

//// [values.ts]
// Valid
export const foo = 123;
export { foo as "valid 1" };
import { "valid 1" as bar } from "./values";
export { "valid 1" as "valid 2" } from "./values";
export { foo as "valid 3" } from "./values";
export * as "valid 4" from "./values";

// Invalid
import { "invalid 1" } from "./values";
import { foo as "invalid 2" } from "./values";
export { "invalid 3" as baz };

//// [types1.ts]
// Valid
export type foo = 123;
export type { foo as "valid 1" };
import type { "valid 1" as bar } from "./types1";
export type { "valid 1" as "valid 2" } from "./types1";
export type { foo as "valid 3" } from "./types1";
export type * as "valid 4" from "./types1";

// Invalid
import type { "invalid 1" } from "./types1";
import type { foo as "invalid 2" } from "./types1";
export type { "invalid 3" as baz };

//// [types2.ts]
// Valid
export type foo = 123;
export { type foo as "valid 1" };
import { type "valid 1" as bar } from "./types2";
export { type "valid 1" as "valid 2" } from "./types2";
export { type foo as "valid 3" } from "./types2";

// Invalid
import { type "invalid 1" } from "./types2";
import { type foo as "invalid 2" } from "./types2";
export { type "invalid 3" as baz };


//// [values.js]
// Valid
export const foo = 123;
export { foo as "valid 1" };
export { "valid 1" as "valid 2" } from "./values";
export { foo as "valid 3" } from "./values";
export * as "valid 4" from "./values";
export { "invalid 3" as baz };
//// [types1.js]
export {};
//// [types2.js]
export {};


//// [values.d.ts]
export declare const foo = 123;
export { foo as "valid 1" };
export { "valid 1" as "valid 2" } from "./values";
export { foo as "valid 3" } from "./values";
export * as "valid 4" from "./values";
export { "invalid 3" as baz };
//// [types1.d.ts]
export type foo = 123;
export type { foo as "valid 1" };
export type { "valid 1" as "valid 2" } from "./types1";
export type { foo as "valid 3" } from "./types1";
export type * as "valid 4" from "./types1";
export type { "invalid 3" as baz };
//// [types2.d.ts]
export type foo = 123;
export { type foo as "valid 1" };
export { type "valid 1" as "valid 2" } from "./types2";
export { type foo as "valid 3" } from "./types2";
export { type "invalid 3" as baz };
