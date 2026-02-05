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
class Foo {
}
export default class extends Foo {
    observer = this.handleIntersection;
    handleIntersection = () => { };
}
