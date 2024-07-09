declare function g<T>(a: T, b: T, c: (t: T) => T): T;

g("", 3, a => a);