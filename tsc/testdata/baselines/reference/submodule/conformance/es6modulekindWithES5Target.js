//// [tests/cases/conformance/externalModules/es6/es6modulekindWithES5Target.ts] ////

//// [es6modulekindWithES5Target.ts]
export class C {
    static s = 0;
    p = 1;
    method() { }
}
export { C as C2 };

declare function foo(...args: any[]): any;
@foo
export class D {
    static s = 0;
    p = 1;
    method() { }
}
export { D as D2 };

class E { }
export {E};


//// [es6modulekindWithES5Target.js]
export class C {
    static s = 0;
    p = 1;
    method() { }
}
export { C as C2 };
@foo
export class D {
    static s = 0;
    p = 1;
    method() { }
}
export { D as D2 };
class E {
}
export { E };
