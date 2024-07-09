//// [tests/cases/compiler/declarationEmitDefaultExport7.ts] ////

//// [declarationEmitDefaultExport7.ts]
class A {}
export default new A();


//// [declarationEmitDefaultExport7.js]
class A {
}
export default new A();


//// [declarationEmitDefaultExport7.d.ts]
declare class A {
}
declare const _default: A;
export default _default;
