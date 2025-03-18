//// [tests/cases/conformance/esDecorators/classDeclaration/esDecorators-classDeclaration-commonjs-classNamespaceMerge.ts] ////

//// [esDecorators-classDeclaration-commonjs-classNamespaceMerge.ts]
declare var deco: any;

@deco
export class Example {
    static foo() {}
}

export namespace Example {
    export const x = 1;
}

Example.foo();

//// [esDecorators-classDeclaration-commonjs-classNamespaceMerge.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Example = void 0;
@deco
class Example {
    static foo() { }
}
exports.Example = Example;
(function (Example) {
    Example.x = 1;
})(Example || (exports.Example = Example = {}));
Example.foo();
