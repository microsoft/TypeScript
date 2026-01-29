//// [tests/cases/compiler/declarationEmitClassInherritsAny.ts] ////

//// [declarationEmitClassInherritsAny.ts]
const anyThing = class {} as any;
export class Foo extends anyThing {}

//// [declarationEmitClassInherritsAny.js]
const anyThing = class {
};
export class Foo extends anyThing {
}


//// [declarationEmitClassInherritsAny.d.ts]
declare const anyThing: any;
export declare class Foo extends anyThing {
}
export {};
