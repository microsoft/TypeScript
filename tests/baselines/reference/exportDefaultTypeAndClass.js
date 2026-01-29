//// [tests/cases/compiler/exportDefaultTypeAndClass.ts] ////

//// [exportDefaultTypeAndClass.ts]
export default class Foo {}
type Bar = {}
export default Bar


//// [exportDefaultTypeAndClass.js]
export default class Foo {
}
