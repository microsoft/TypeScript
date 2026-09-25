// @target: esnext
// @module: nodenext
// @moduleDetection: legacy
// @jsx: preserve
// @jsxImportSource: @solidjs/web
// @strict: true
// @filename: package.json
{
    "type": "module"
}
// @filename: node_modules/@solidjs/web/package.json
{
    "name": "@solidjs/web",
    "type": "module",
    "exports": {
        "./jsx-runtime": {
            "import": "./jsx-runtime.d.ts"
        }
    }
}
// @filename: node_modules/@solidjs/web/jsx-runtime.d.ts
export namespace JSX {
    interface Element {}
    interface IntrinsicElements {
        div: {};
    }
}
// @filename: script.tsx
const scriptElement = <div>hi</div>;
// @filename: module.tsx
export {};
const moduleElement = <div>hi</div>;
