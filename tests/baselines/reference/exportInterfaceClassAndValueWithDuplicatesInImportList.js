//// [tests/cases/compiler/exportInterfaceClassAndValueWithDuplicatesInImportList.ts] ////

//// [exportInterfaceClassAndValueWithDuplicatesInImportList.ts]
const foo = 1
class Foo {}
interface Foo {}

export {foo, Foo, Foo}


//// [exportInterfaceClassAndValueWithDuplicatesInImportList.js]
const foo = 1;
class Foo {
}
export { foo, Foo, Foo };
