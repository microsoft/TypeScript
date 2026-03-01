//// [tests/cases/compiler/exportInterfaceClassAndValueWithDuplicatesInImportList.ts] ////

//// [exportInterfaceClassAndValueWithDuplicatesInImportList.ts]
const foo = 1
class Foo {}
interface Foo {}

export {foo, Foo, Foo}


//// [exportInterfaceClassAndValueWithDuplicatesInImportList.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = exports.foo = void 0;
const foo = 1;
exports.foo = foo;
class Foo {
}
exports.Foo = Foo;
