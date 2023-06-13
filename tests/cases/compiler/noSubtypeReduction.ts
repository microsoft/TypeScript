// @strict: true
// @noEmit: true

// Repro from #53425

export interface IA {
    arr: { A: number; }[];
}

export interface IAB {
    arr: { A: number; B: number; }[];
}

export function F(x: IA | IAB) {
    const useB = (t: number) => { };
    for (const el of x.arr) {
        if ('A' in el) { }
        if ('B' in el) {
            useB(el.B);
        }
    }
}
