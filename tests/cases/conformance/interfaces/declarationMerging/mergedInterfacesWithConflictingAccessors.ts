// @target: esnext
// @noemit: true

interface A {
    get x(): number;
}
interface A {
    get x(): string;
}

interface B {
    get x(): number;
}
interface B {
    set x(value: string);
}

interface C {
    x: number;
}
interface C {
    get x(): number;
    set x(value: number);
}
