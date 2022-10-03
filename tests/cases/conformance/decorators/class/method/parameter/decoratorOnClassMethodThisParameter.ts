// @target:es5
// @experimentaldecorators: true
declare function dec(target: Object, propertyKey: string | symbol, parameterIndex: number): void;

class C {
    method(@dec this: C) {}
}

class C2 {
    method(@dec allowed: C2, @dec this: C2) {}
}