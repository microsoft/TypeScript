//// [tests/cases/compiler/interfacedeclWithIndexerErrors.ts] ////

//// [interfacedeclWithIndexerErrors.ts]
interface a0 {
    (): string;
    (a, b, c?: string): number;
    
    new (): string;
    new (s: string);

    [n: number]: ()=>string;
    [s: string]: ()=>string;

    p1;
    p2: string;
    p3?;
    p4?: number;
    p5: (s: number) =>string;

    f1();
    f2? ();
    f3(a: string): number;
    f4? (s: number): string;
}


interface a1 {
    [n: number]: number;
}

interface a2 {
    [s: string]: number;
}

interface a {
}

interface b extends a {
}

interface c extends a, b {
}

interface d extends a {
}

interface e extends number {
}

interface f {
    prop: typeof string;
}

class c1 implements a {
}
var instance2 = new c1();

//// [interfacedeclWithIndexerErrors.js]
var c1 = /** @class */ (function () {
    function c1() {
    }
    return c1;
}());
var instance2 = new c1();
