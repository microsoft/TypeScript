// @target: es5
// @module: esnext
// @experimentalDecorators: true

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
