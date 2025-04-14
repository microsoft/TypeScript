// @strict: true
// @noEmit: true

// Repro from #56232

declare function foo2<T extends { [P in keyof T & string as Capitalize<P>]: V }, V extends string>(a: T): T;
export const r2 = foo2({A: "a"});
