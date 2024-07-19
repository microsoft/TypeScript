// @strict: true
// @noEmit: true

enum E { A }

declare let n: number;
declare let e: E;

e = n as E;

export {}
