// @strict: true
// @noEmit: true

// Repro from #57122

function foo<T extends string[]>(
    fa: (s: string, ...args: string[]) => string,
    fb: (s: string, ...args: T) => string
) {
    const f1: (...args: any) => string = fa;
    const f2: (...args: any[]) => string = fa;
    const f3: (...args: any) => string = fb;
    const f4: (...args: any[]) => string = fb;
}
