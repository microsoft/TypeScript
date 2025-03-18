//// [tests/cases/conformance/esDecorators/classDeclaration/esDecorators-classDeclaration-commonjs.ts] ////

//// [esDecorators-classDeclaration-commonjs.ts]
declare var deco: any;

@deco
export class Example {
    static foo() {}
}

Example.foo();

//// [esDecorators-classDeclaration-commonjs.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Example = void 0;
@deco
class Example {
    static foo() { }
}
exports.Example = Example;
Example.foo();
