interface X { }
interface Y {
    n: number;
}
interface Z {
    s: string;
}

interface A {
    a: Y;
    b: X;
    1: Z;
}

interface B extends A {
    [n: number]: string;
    c: boolean;
    3: boolean;
    6(): string;
}

interface B {
    4: boolean;
    5: string;
}

interface C extends A {
    [s: string]: number;
    c: boolean;
    3: boolean;
}

interface D extends B, C {
    2: Z;
    Infinity: number;
    zoo: string;
}

class P {
    [n: string]: string
}

class Q extends P {
    t: number;
}

var c: {
    [n: number]: string;
    c: boolean;
    3: boolean;
};