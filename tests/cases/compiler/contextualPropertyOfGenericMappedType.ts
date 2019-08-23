// Repro for #24694
// @noImplicitAny: true

declare function f<T extends object>(data: T, handlers: { [P in keyof T]: (value: T[P], prop: P) => void; }): void;
f({ data: 0 }, { data(value, key) {} });
