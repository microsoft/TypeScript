//// [tests/cases/compiler/defaultNamedExportWithType1.ts] ////

//// [defaultNamedExportWithType1.ts]
type Foo = number;
export const Foo = 1;
export default Foo;


//// [defaultNamedExportWithType1.js]
export const Foo = 1;
export default Foo;
