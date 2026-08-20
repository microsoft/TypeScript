// @target: es2020, es2022
// @experimentalDecorators: true

declare function dec(...args: any[]): any;

@dec
class C {
    constructor() {}
    [C.name]() {}
    get [C.name]() { return 1; }
    set [C.name](value: number) {}
}

@dec
class D {
    @dec
    static [D.name] = 1;
    static getSelf() {
        return D;
    }
}

@dec
class Outer {
    method() {
        return class {
            [Outer.name]() {}
        };
    }
}
