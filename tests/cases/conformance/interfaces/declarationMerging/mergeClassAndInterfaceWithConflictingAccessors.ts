// @target: esnext
// @noemit: true

declare class A {
    get x(): number;
}
interface A {
    get x(): string;
}

declare class B {
    get x(): number;
}
interface B {
    set x(value: string);
}

declare class C {
    get x(): number;
    set x(value: number);
}
interface C {
    x: number;
}

declare class D {
    x: number;
}
interface D {
    get x(): number;
    set x(value: number);
}

declare class E {
    get x(): number;
}
interface E {
    get x(): number; // ok
}

declare class F {
    set x(value: string);
}
interface F {
    get x(): string; // ok
}

declare class G {
    get x(): number;
    set x(value: number);
}
interface G {
    get x(): number;
    set x(value: number);
}

declare class H {
    x: number;
}
interface H {
    x: number;
}
