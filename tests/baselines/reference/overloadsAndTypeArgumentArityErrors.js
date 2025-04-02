//// [tests/cases/compiler/overloadsAndTypeArgumentArityErrors.ts] ////

//// [overloadsAndTypeArgumentArityErrors.ts]
declare function Callbacks(flags?: string): void;
declare function Callbacks<T>(flags?: string): void;
declare function Callbacks<T1, T2>(flags?: string): void;

Callbacks<number, string, boolean>('s'); // wrong number of type arguments
new Callbacks<number, string, boolean>('s'); // wrong number of type arguments

declare function f<A, B = {}>(arg: number): void;
f<number>(); // wrong number of arguments (#25683)


//// [overloadsAndTypeArgumentArityErrors.js]
Callbacks('s'); // wrong number of type arguments
new Callbacks('s'); // wrong number of type arguments
f(); // wrong number of arguments (#25683)
