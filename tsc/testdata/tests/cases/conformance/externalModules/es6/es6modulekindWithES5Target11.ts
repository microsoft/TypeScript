// @target: es5, es2015
// @module: es2015
// @experimentalDecorators: true

declare function foo(...args: any[]): any;
@foo
export default class C {
    static x() { return C.y; }
    static y = 1
    p = 1;
    method() { }
}