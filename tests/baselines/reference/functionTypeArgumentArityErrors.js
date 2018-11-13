//// [functionTypeArgumentArityErrors.ts]
// Overloaded functions with default type arguments
declare function f1<A = any>(): void;
declare function f1<A, B, C, D = any>(): void;
f1<number, number>();
f1<number, number, number, number, number>();

// Overloaded functions with no default type arguments
declare function f2<A>(): void;
declare function f2<A, B, C>(): void;
f2<number, number>();
f2<number, number, number, number>();

// Overloaded non-generic functions
declare function f3(): void;
declare function f3(a): void;
f3<number>();

// Generic function with default type parameters
declare function f4<A, B, C = any>(): void;
f4<number>();
f4<number, number, number, number>();

// Generic function with no default type arguments
declare function f5<A, B>(): void;
f5<number>();
f5<number, number, number>();


//// [functionTypeArgumentArityErrors.js]
f1();
f1();
f2();
f2();
f3();
f4();
f4();
f5();
f5();
