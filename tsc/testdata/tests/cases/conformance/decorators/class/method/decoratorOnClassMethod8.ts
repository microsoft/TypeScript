// @target: ES5, ES2015
// @experimentaldecorators: true
declare function dec<T>(target: T): T;

class C {
    @dec method() {}
}