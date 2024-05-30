//// [tests/cases/conformance/es2022/arbitraryModuleNamespaceIdentifiers/arbitraryModuleNamespaceIdentifiers_syntax.ts] ////

//// [values-valid.ts]
export const foo = 123;
export { foo as "valid 1" };
import { "valid 1" as bar } from "./values-valid";
export { "valid 1" as "valid 2" } from "./values-valid";
export { foo as "valid 3" } from "./values-valid";
export * as "valid 4" from "./values-valid";

//// [values-bad-import.ts]
import { foo as "invalid 2" } from "./values-valid";

//// [values-bad-export.ts]
export { "invalid 3" as baz };

//// [values-no-as.ts]
import { "invalid 1" } from "./values-valid";

//// [values-type-as.ts]
import { type as "invalid 4" } from "./values-valid";


//// [type-decls-valid.ts]
export type foo = 123;
export type { foo as "valid 1" };
import type { "valid 1" as bar } from "./type-decls-valid";
export type { "valid 1" as "valid 2" } from "./type-decls-valid";
export type { foo as "valid 3" } from "./type-decls-valid";
export type * as "valid 4" from "./type-decls-valid";

//// [type-decls-bad-import.ts]
import type { foo as "invalid 2" } from "./type-decls-valid";

//// [type-decls-bad-export.ts]
export type { "invalid 3" as baz };

//// [type-decls-no-as.ts]
import type { "invalid 1" } from "./type-decls-valid";

//// [type-decls-type-as.ts]
import type { type as "invalid 4" } from "./type-decls-valid";

//// [type-clause-valid.ts]
export type foo = 123;
export { type foo as "valid 1" };
import { type "valid 1" as bar } from "./type-clause-valid";
export { type "valid 1" as "valid 2" } from "./type-clause-valid";
export { type foo as "valid 3" } from "./type-clause-valid";

//// [type-clause-bad-import.ts]
import { type foo as "invalid 2" } from "./type-clause-valid";

//// [type-clause-bad-export.ts]
export { type "invalid 3" as baz };

//// [type-clause-no-as.ts]
import { type "invalid 1" } from "./type-clause-valid";

//// [type-clause-type-as-as.ts]
import { type as as "invalid 4" } from "./type-clause-valid";


//// [values-valid.js]
export const foo = 123;
export { foo as "valid 1" };
export { "valid 1" as "valid 2" } from "./values-valid";
export { foo as "valid 3" } from "./values-valid";
export * as "valid 4" from "./values-valid";
//// [values-bad-import.js]
export {};
//// [values-bad-export.js]
export { "invalid 3" as baz };
//// [values-no-as.js]
export {};
//// [values-type-as.js]
export {};
//// [type-decls-valid.js]
export {};
//// [type-decls-bad-import.js]
export {};
//// [type-decls-bad-export.js]
export {};
//// [type-decls-no-as.js]
export {};
//// [type-decls-type-as.js]
export {};
//// [type-clause-valid.js]
export {};
//// [type-clause-bad-import.js]
export {};
//// [type-clause-bad-export.js]
export {};
//// [type-clause-no-as.js]
export {};
//// [type-clause-type-as-as.js]
export {};


//// [values-valid.d.ts]
export declare const foo = 123;
export { foo as "valid 1" };
export { "valid 1" as "valid 2" } from "./values-valid";
export { foo as "valid 3" } from "./values-valid";
export * as "valid 4" from "./values-valid";
//// [values-bad-import.d.ts]
export {};
//// [values-bad-export.d.ts]
export { "invalid 3" as baz };
//// [values-no-as.d.ts]
export {};
//// [values-type-as.d.ts]
export {};
//// [type-decls-valid.d.ts]
export type foo = 123;
export type { foo as "valid 1" };
export type { "valid 1" as "valid 2" } from "./type-decls-valid";
export type { foo as "valid 3" } from "./type-decls-valid";
export type * as "valid 4" from "./type-decls-valid";
//// [type-decls-bad-import.d.ts]
export {};
//// [type-decls-bad-export.d.ts]
export type { "invalid 3" as baz };
//// [type-decls-no-as.d.ts]
export {};
//// [type-decls-type-as.d.ts]
export {};
//// [type-clause-valid.d.ts]
export type foo = 123;
export { type foo as "valid 1" };
export { type "valid 1" as "valid 2" } from "./type-clause-valid";
export { type foo as "valid 3" } from "./type-clause-valid";
//// [type-clause-bad-import.d.ts]
export {};
//// [type-clause-bad-export.d.ts]
export { type "invalid 3" as baz };
//// [type-clause-no-as.d.ts]
export {};
//// [type-clause-type-as-as.d.ts]
export {};
