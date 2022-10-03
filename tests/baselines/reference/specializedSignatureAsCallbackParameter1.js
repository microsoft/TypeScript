//// [specializedSignatureAsCallbackParameter1.ts]
function x3(a: number, cb: (x: number) => number);
function x3(a: string, cb: (x: number) => number);
function x3(a: any, cb: (x: number) => number) {
   cb(a);
}
// both are errors
x3(1, (x: string) => 1); 
x3(1, (x: 'hm') => 1); 

//// [specializedSignatureAsCallbackParameter1.js]
function x3(a, cb) {
    cb(a);
}
// both are errors
x3(1, function (x) { return 1; });
x3(1, function (x) { return 1; });
