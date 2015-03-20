// @target:es5
declare function dec(target: Function, parameterIndex: number): void;

class C {
    method(@dec p: number) {}
}