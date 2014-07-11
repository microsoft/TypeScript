//// [interfacedecl.ts]
interface a0 {
    (): string;
    (a, b, c?: string): number;
    
    new (): string;
    new (s: string);

    [n: number]: ()=>string;
    [s: string]: any;

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

class c1 implements a {
}
var instance2 = new c1();

//// [interfacedecl.js]
var c1 = (function () {
    function c1() {
    }
    return c1;
})();
var instance2 = new c1();


//// [interfacedecl.d.ts]
interface a0 {
    ();
    (a, b, c?);
    new ();
    new (s);
    [n];
    [s];
    p1;
    p2;
    p3?;
    p4?;
    p5;
    f1();
    f2?();
    f3(a);
    f4?(s);
}
interface a1 {
    [n];
}
interface a2 {
    [s];
}
interface a {
}
interface b extends a {
}
interface c extends a, b {
}
interface d extends a {
}
declare class c1 implments a {
}
declare var instance2;
