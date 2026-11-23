// @target: esnext
// @module: preserve
// @moduleResolution: bundler
// @noImplicitReferences: true
// @traceResolution: true

// An import inside an ambient module declaration that names the same module
// resolves to that declaration, so the real package must not be pulled in.

// @filename: /node_modules/foo/package.json
{ "name": "foo", "version": "1.0.0", "types": "index.d.ts" }

// @filename: /node_modules/foo/index.d.ts
declare global {
    var fooGlobal: string;
}
declare function foo(value: unknown): boolean;
export default foo;

// @filename: /declarations.d.ts
declare module "foo" {
    import _foo from "foo";
    export function isFoo(value: unknown): boolean;
}

// @filename: /a.ts
/// <reference path="declarations.d.ts" />
fooGlobal;
