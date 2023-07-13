//// [tests/cases/compiler/defaultNamedExportWithType4.ts] ////

//// [defaultNamedExportWithType4.ts]
interface Foo {}
const Foo = {};
export default Foo;


//// [defaultNamedExportWithType4.js]
const Foo = {};
export default Foo;
