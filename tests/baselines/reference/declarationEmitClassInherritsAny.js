//// [tests/cases/compiler/declarationEmitClassInherritsAny.ts] ////

//// [declarationEmitClassInherritsAny.ts]
const anyThing = class {} as any;
export class Foo extends anyThing {}

//// [declarationEmitClassInherritsAny.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
const anyThing = class {
};
class Foo extends anyThing {
}
exports.Foo = Foo;


//// [declarationEmitClassInherritsAny.d.ts]
declare const anyThing: any;
export declare class Foo extends anyThing {
}
export {};
