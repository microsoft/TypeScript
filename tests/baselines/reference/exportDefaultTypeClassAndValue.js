//// [tests/cases/compiler/exportDefaultTypeClassAndValue.ts] ////

//// [exportDefaultTypeClassAndValue.ts]
const foo = 1
export default foo
export default class Foo {}
type Bar = {}
export default Bar


//// [exportDefaultTypeClassAndValue.js]
const foo = 1;
export default foo;
export default class Foo {
}
