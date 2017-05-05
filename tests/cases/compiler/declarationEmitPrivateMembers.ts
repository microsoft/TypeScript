// @declaration: true
// @target: es5

class A {
    // private fields
    private field1: number;
    private static field1: number;
    private readonly field2: number;
    private static readonly field2: number;
    // private properties
    private get prop1(): string { return "string"; }
    private set prop1(v: string) { }
    private get prop2(): string { return "string"; }
    private set prop3(v: string) { }
    private static get prop1(): string { return "string"; }
    private static set prop1(v: string) { }
    private static get prop2(): string { return "string"; }
    private static set prop3(v: string) { }
    // private methods
    private method1(a: number): string { return "string"; }
    private static method1(a: number): string { return "string"; }
    // private methods with overloads
    private method2(a: string): void;
    private method2(a: number): void;
    private method2(a: string | number): void { }
    private static method2(a: string): void;
    private static method2(a: number): void;
    private static method2(a: string | number): void { }
    // private methods as fields
    private method3: (a: number) => string;
    private static method3: (a: number) => string;
    // private constructors with overloads
    private constructor(a: number);
    private constructor(a: string);
    private constructor(a: number | string) { }
}