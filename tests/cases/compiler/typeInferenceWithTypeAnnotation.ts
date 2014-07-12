declare function f<T>(p: (t: T) => T): T;

f((n: number) => n); 