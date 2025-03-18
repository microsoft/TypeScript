//// [tests/cases/compiler/declarationEmitDefaultExport6.ts] ////

//// [declarationEmitDefaultExport6.ts]
export class A {}
export default new A();


//// [declarationEmitDefaultExport6.js]
export class A {
}
export default new A();
