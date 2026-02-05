// @target: ES5, ES2015
// @experimentaldecorators: true
declare function dec(target: Function, paramIndex: number): void;

class C {
    @dec method() {}
}