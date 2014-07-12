//// [overloadsAndTypeArgumentArity.ts]
declare function Callbacks(flags?: string): void;
declare function Callbacks<T>(flags?: string): void;
declare function Callbacks<T1, T2>(flags?: string): void;
declare function Callbacks<T1, T2, T3>(flags?: string): void;

Callbacks<number, string, boolean>('s'); // no error
new Callbacks<number, string, boolean>('s'); // no error

//// [overloadsAndTypeArgumentArity.js]
Callbacks('s'); // no error
new Callbacks('s'); // no error
