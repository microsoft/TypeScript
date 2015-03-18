declare function dec(target: Function, parameterIndex: number): void;

class C {
    constructor(public @dec p: number) {}
}