//// [tests/cases/compiler/classMergedWithInterfaceMultipleBasesNoError.ts] ////

//// [classMergedWithInterfaceMultipleBasesNoError.ts]
interface Bar { }
interface Baz { }
interface Q { }
interface Foo extends Bar, Baz { }
class Foo { }

export default class extends Foo {
    readonly observer = this.handleIntersection;
    readonly handleIntersection = () => { }
}

//// [classMergedWithInterfaceMultipleBasesNoError.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Foo {
}
class default_1 extends Foo {
    observer = this.handleIntersection;
    handleIntersection = () => { };
}
exports.default = default_1;
