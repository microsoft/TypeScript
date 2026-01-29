//// [tests/cases/compiler/exportDefaultInterfaceClassAndValue.ts] ////

//// [exportDefaultInterfaceClassAndValue.ts]
const foo = 1
export default foo
export default class Foo {}
export default interface Foo {}


//// [exportDefaultInterfaceClassAndValue.js]
const foo = 1;
export default foo;
export default class Foo {
}
