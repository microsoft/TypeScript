/// <reference path="fourslash.ts" />

// @module: NodeNext
// @traceResolution: true

// @filename: node_modules/inner/index.d.mts
//// export const esm = true;

// @filename: node_modules/inner/package.json
//// { "name": "inner", "exports": { "./mjs": "./index.mjs" } }

// @filename: foo.ts
//// export /*a*/function/*b*/ fn() {
////     return import("inner/mjs")
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Infer function return type",
    actionName: "Infer function return type",
    actionDescription: "Infer function return type",
    newContent:
`export function fn(): Promise<typeof import("/tests/cases/fourslash/node_modules/inner/index", { with: { "resolution-mode": "import" } })> {
    return import("inner/mjs")
}`
});

