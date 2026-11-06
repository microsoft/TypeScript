// @strict: true
// @noEmit: true
// @jsx: preserve
// @jsxImportSource: @solidjs/web
// @module: esnext
// @moduleResolution: bundler

// https://github.com/microsoft/TypeScript/issues/64438
// A file that is not a module should resolve the implicit JSX runtime import
// the same way a module does.

// @filename: /node_modules/@solidjs/web/package.json
{
    "name": "@solidjs/web",
    "version": "1.0.0",
    "exports": {
        "./jsx-runtime": { "types": "./jsx-runtime.d.ts" }
    }
}

// @filename: /node_modules/@solidjs/web/jsx-runtime.d.ts
export namespace JSX {
    type Element = { readonly __solid: true };
    interface IntrinsicElements {
        div: { children?: unknown };
    }
}
export declare function jsx(type: any, props: any): JSX.Element;
export declare function Fragment(props: { children?: unknown }): JSX.Element;

// @filename: /script.tsx
const ok = <><div>hi</div></>;
const bad = <span />; // error, not in the runtime's JSX.IntrinsicElements

// @filename: /module.tsx
const ok = <><div>hi</div></>;
const bad = <span />; // error, not in the runtime's JSX.IntrinsicElements
export {};
