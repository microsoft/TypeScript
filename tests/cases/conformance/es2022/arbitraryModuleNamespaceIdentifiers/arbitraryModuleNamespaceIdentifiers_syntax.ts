//@module: ES2022
//@target: ES2022
//@declaration: true


// @filename: values-valid.ts
export const foo = 123;
export { foo as "valid 1" };
import { "valid 1" as bar } from "./values-valid";
export { "valid 1" as "valid 2" } from "./values-valid";
export { foo as "valid 3" } from "./values-valid";
export * as "valid 4" from "./values-valid";

// @filename: values-bad-import.ts
import { foo as "invalid 2" } from "./values-valid";

// @filename: values-bad-export.ts
export { "invalid 3" as baz };

// @filename: values-no-as.ts
import { "invalid 1" } from "./values-valid";

// @filename: values-type-as.ts
import { type as "invalid 4" } from "./values-valid";


// @filename: type-decls-valid.ts
export type foo = 123;
export type { foo as "valid 1" };
import type { "valid 1" as bar } from "./type-decls-valid";
export type { "valid 1" as "valid 2" } from "./type-decls-valid";
export type { foo as "valid 3" } from "./type-decls-valid";
export type * as "valid 4" from "./type-decls-valid";

// @filename: type-decls-bad-import.ts
import type { foo as "invalid 2" } from "./type-decls-valid";

// @filename: type-decls-bad-export.ts
export type { "invalid 3" as baz };

// @filename: type-decls-no-as.ts
import type { "invalid 1" } from "./type-decls-valid";

// @filename: type-decls-type-as.ts
import type { type as "invalid 4" } from "./type-decls-valid";

// @filename: type-clause-valid.ts
export type foo = 123;
export { type foo as "valid 1" };
import { type "valid 1" as bar } from "./type-clause-valid";
export { type "valid 1" as "valid 2" } from "./type-clause-valid";
export { type foo as "valid 3" } from "./type-clause-valid";

// @filename: type-clause-bad-import.ts
import { type foo as "invalid 2" } from "./type-clause-valid";

// @filename: type-clause-bad-export.ts
export { type "invalid 3" as baz };

// @filename: type-clause-no-as.ts
import { type "invalid 1" } from "./type-clause-valid";

// @filename: type-clause-type-as-as.ts
import { type as as "invalid 4" } from "./type-clause-valid";
