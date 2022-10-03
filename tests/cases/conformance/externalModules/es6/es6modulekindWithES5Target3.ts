// @target: es5
// @module: es2015
// @experimentalDecorators: true


declare function foo(...args: any[]): any;
@foo
export default class D {
    static s = 0;
    p = 1;
    method() { }
}