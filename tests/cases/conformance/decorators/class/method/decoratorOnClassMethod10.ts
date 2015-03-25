// @target: ES5
declare function dec(target: Function, paramIndex: number): void;

class C {
    @dec method() {}
}