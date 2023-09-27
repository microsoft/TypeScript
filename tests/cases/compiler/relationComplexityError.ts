// @strict: true
// @noEmit: true

// Repro from #55630

type Digits = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type T1 = `${Digits}${Digits}${Digits}${Digits}` | undefined;
type T2 = { a: string } | { b: number };

function f1(x: T1, y: T1 & T2) {
    x = y;
}

function f2(x: T1 | null, y: T1 & T2) {
    x = y;  // Complexity error
}
