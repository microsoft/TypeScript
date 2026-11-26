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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
class Foo {
}
export default class extends Foo {
    constructor() {
        super(...arguments);
        this.observer = this.handleIntersection;
        this.handleIntersection = __setFunctionName(() => { }, "handleIntersection");
    }
}
