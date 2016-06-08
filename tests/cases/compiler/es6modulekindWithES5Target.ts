// @target: es5
// @module: es2015
// @experimentalDecorators: true

export class C {
    static s = 0;
    p = 1;
    method() { }
}

declare function foo(...args: any[]): any;
@foo
export class D {
    static s = 0;
    p = 1;
    method() { }
}

class E { }
export {E};