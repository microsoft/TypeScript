//// [tests/cases/compiler/uniqueSymbolDeclarationEmitImportsTag.ts] ////

//// [brand.ts]
export declare const tag: unique symbol;
export type Branded<Type, Name extends string> = Type & { readonly [tag]: Name };

//// [otherBrand.ts]
export declare const tag: unique symbol;
export type OtherBranded = { readonly [tag]: "Other" };

//// [index.ts]
import type { Branded } from "./brand.js";
import type { OtherBranded } from "./otherBrand.js";

declare const user: Branded<{ name: string }, "User"> & OtherBranded;
const tag = "local";

export const copy = { ...user };


//// [brand.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [otherBrand.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copy = void 0;
const tag = "local";
exports.copy = { ...user };


//// [brand.d.ts]
export declare const tag: unique symbol;
export type Branded<Type, Name extends string> = Type & {
    readonly [tag]: Name;
};
//// [otherBrand.d.ts]
export declare const tag: unique symbol;
export type OtherBranded = {
    readonly [tag]: "Other";
};
//// [index.d.ts]
import type { tag as tag_1 } from "./brand.js";
import type { tag as tag_2 } from "./otherBrand.js";
export declare const copy: {
    [tag_1]: "User";
    [tag_2]: "Other";
    name: string;
};
