// @declaration: true

// @Filename: /node_modules/foo/index.d.ts
export = foo;
declare namespace foo {
    export type T = number;
}

// @Filename: /a.ts
import * as foo from "foo";
declare module "foo" {
    export function f(): T; // OK
}

// @Filename: /b.ts
import * as foo from "foo";
declare module "foo" {
    export function g(): foo.T; // OK
}
