//// [tests/cases/compiler/defaultNamedExportWithType2.ts] ////

//// [defaultNamedExportWithType2.ts]
type Foo = number;
const Foo = 1;
export default Foo;


//// [defaultNamedExportWithType2.js]
const Foo = 1;
export default Foo;
