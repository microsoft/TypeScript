// @declaration: true
// @outFile: mylib.js
// @filename: extensions.ts
/// <reference no-default-lib="true"/>
class Foo {
    public: string;
}
// @filename: core.ts
interface Array<T> {}
interface Boolean {}
interface Function {}
interface IArguments {}
interface Number {}
interface Object {}
interface RegExp {}
interface String {}
