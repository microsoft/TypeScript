//// [tests/cases/compiler/exportDefaultClassAndValue.ts] ////

//// [exportDefaultClassAndValue.ts]
const foo = 1
export default foo
export default class Foo {}


//// [exportDefaultClassAndValue.js]
const foo = 1;
export default foo;
export default class Foo {
}
