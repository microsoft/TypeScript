// @module: commonjs
// @declaration: true
// @moduleResolution: node
// @emitDeclarationOnly: true
// @outFile: ./dist/out.d.ts

// @Filename: index.ts
export * from "./nested";

// @Filename: nested/base.ts
import { B } from "./shared";

export function f() {
    return new B();
}

// @Filename: nested/derived.ts
import { f } from "./base";

export function g() {
    return f();
}

// @Filename: nested/index.ts
export * from "./base";

export * from "./derived";
export * from "./shared";

// @Filename: nested/shared.ts
export class B {}
