// @module: commonjs
// @declaration: true
// @emitDeclarationOnly: true
// @outFile: ./dist/out.d.ts
// @bundledPackageName: my-pkg

// @Filename: index.ts
export {}

// @Filename: nested/base.ts
import { C } from "./";

export function f() {
    return new C();
}

// @Filename: nested/derived.ts
import { f } from "./base";

export function g() {
    return f();
}

// @Filename: nested/index.ts
export * from "./base";
export * from "./derived";
export class C {}
