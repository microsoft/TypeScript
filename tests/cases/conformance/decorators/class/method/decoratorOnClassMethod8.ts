// @target: ES5
declare function dec<T>(target: T): T;

class C {
    @dec method() {}
}