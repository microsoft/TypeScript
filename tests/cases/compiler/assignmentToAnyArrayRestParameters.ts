// @strict: true
// @noEmit: true

// Repros from #57122

function foo<T extends string[]>(
    fa: (s: string, ...args: string[]) => string,
    fb: (s: string, ...args: T) => string
) {
    const f1: (...args: any) => string = fa;
    const f2: (...args: any[]) => string = fa;
    const f3: (...args: any) => string = fb;
    const f4: (...args: any[]) => string = fb;
}

function bar<T extends string[], K extends number>() {
    type T00 = string[]["0"];
    type T01 = string[]["0.0"];  // Error
    type T02 = string[][K | "0"];
    type T10 = T["0"];
    type T11 = T["0.0"];  // Error
    type T12 = T[K | "0"];
}
