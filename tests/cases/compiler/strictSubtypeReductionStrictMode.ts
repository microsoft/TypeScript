// @strict: true
// Repro from #41977

class S1 {
    static f(a: number | string): void { }
}

class S2 {
    static f(a: number): void { }
    static g(a: number): void { }
}

function f(a: number): void { }
function g(a: number): void { }

// Declaring the following type aliases should have no effect

type T1 = typeof S2.g;
type T2 = typeof g;

// All should have type ((a: number) => void)[]

const y1 = [S1.f, f];
const y2 = [S1.f, g];
const y3 = [S1.f, S2.f];
const y4 = [S1.f, S2.g];

// All assignments should be errors

const x1: ((ctrl: number | string) => void)[] = y1;
const x2: ((ctrl: number | string) => void)[] = y2;
const x3: ((ctrl: number | string) => void)[] = y3;
const x4: ((ctrl: number | string) => void)[] = y4;