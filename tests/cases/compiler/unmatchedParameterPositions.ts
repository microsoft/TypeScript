// @strict: true

// Repros from #40251

declare let s: (...items: never[]) => never[];
let t1: () => unknown[] = s;
let t2: (...args: []) => unknown[] = s;
