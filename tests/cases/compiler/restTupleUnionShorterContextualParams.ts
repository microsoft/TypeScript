// @noEmit: true

// repro #48663

// showcase how those transitive assignments are OK
const f1: (x: string | number) => void = x => {};
const f2: (x: string | number, y: string | number) => void = f1;
const f3: (...args: [number, string] | [string, number]) => void = f2;

// by extension those should be OK too
const f4: (...args: [number, string] | [string, number]) => void = (item) => {}
const f5: (...args: [number, string] | [string, number]) => void = (item: number | string) => {}
