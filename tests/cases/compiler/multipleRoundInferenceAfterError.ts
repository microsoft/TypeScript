// Fixes #18715
declare function inference<T>(target: T, name: keyof T): void;
inference({ a: 1, b: 2, c: 3, d(n) { return n } }, "d");
