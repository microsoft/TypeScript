//// [tests/cases/compiler/declarationEmitBundlePreservesHasNoDefaultLibDirective.ts] ////

//// [extensions.ts]
/// <reference no-default-lib="true"/>
class Foo {
    public: string;
}
//// [core.ts]
interface Array<T> {}
interface Boolean {}
interface Function {}
interface IArguments {}
interface Number {}
interface Object {}
interface RegExp {}
interface String {}


//// [mylib.js]
/// <reference no-default-lib="true"/>
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());


//// [mylib.d.ts]
/// <reference no-default-lib="true"/>
declare class Foo {
    public: string;
}
interface Array<T> {
}
interface Boolean {
}
interface Function {
}
interface IArguments {
}
interface Number {
}
interface Object {
}
interface RegExp {
}
interface String {
}
