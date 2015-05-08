//// [tests/cases/compiler/packageDeclarationEmit.ts] ////

//// [index.ts]

export * from './ext';

//// [ext.ts]
export function func(): void {
}

//// [ext.js]
function func() {
}
exports.func = func;
//// [index.js]
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./ext'));


//// [app.d.ts]
declare module "app/tests/cases/compiler/ext" {
    function func(): void;
}
declare module "app/tests/cases/compiler/index" {
    export * from "app/tests/cases/compiler/ext";
}