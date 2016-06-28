// @target: ES5
// @experimentaldecorators: true
declare function dec<T>(target: T): T;

class C {
    @dec method() {}
}