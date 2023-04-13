// @target:es2015
// @experimentaldecorators: true

// https://github.com/microsoft/TypeScript/issues/50305

declare function dec(target: Object, propertyKey: PropertyKey, parameterIndex: number): void;

const s = Symbol();
function f() { return s };
function add(a: number, b: number) { return a + b }
function concat(a: string, b: string) { return a + b }

class C {
    [s](@dec a: any) {}
    [f()](@dec a: any) {}
    ['method'](@dec a: any) {}
    ['some' + 'method'](@dec a: any) {}
    [concat('hello', 'world')](@dec a: any) {}
    [1](@dec a: any) {}
    [Math.PI](@dec a: any) {}
    [1 + 1](@dec a: any) {}
    [add(1, 2)](@dec a: any) {}
}
