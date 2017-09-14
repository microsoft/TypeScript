//// [typeCallSpreads.ts]
type Fn = <T>(v: T) => T;
type a = Fn(...[1]);


//// [typeCallSpreads.js]
[1];
;
