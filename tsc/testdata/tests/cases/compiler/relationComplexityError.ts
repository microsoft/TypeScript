// @target: es2015
// @strict: true
// @noEmit: true
// @checkOrder: default, typesfirst

// Repro from #55630
// Every comparison that needs a comparison that is too complex is too complex
// itself, whether or not that comparison happened before.

type Digits = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7';
type T1 = `${Digits}${Digits}${Digits}${Digits}` | undefined;
type T2 = { a: string } | { b: number };

function f0(x: { p: T1 | null }, y: { p: T1 & T2 }) {
    x = y;  // Complexity error
}

function f1(x: T1, y: T1 & T2) {
    x = y;
}

function f2(x: T1 | null, y: T1 & T2) {
    x = y;  // Complexity error
}

function f3(x: T1 | null, y: T1 & T2) {
    x = y;  // Complexity error
}

function f4(x: { p: T1 | null }, y: { p: T1 & T2 }) {
    x = y;  // Complexity error
}
