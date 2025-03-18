//// [tests/cases/conformance/decorators/class/method/parameter/decoratorOnClassMethodThisParameter.ts] ////

//// [decoratorOnClassMethodThisParameter.ts]
declare function dec(target: Object, propertyKey: string | symbol, parameterIndex: number): void;

class C {
    method(@dec this: C) {}
}

class C2 {
    method(@dec allowed: C2, @dec this: C2) {}
}

//// [decoratorOnClassMethodThisParameter.js]
class C {
    method() { }
}
class C2 {
    method(allowed) { }
}
