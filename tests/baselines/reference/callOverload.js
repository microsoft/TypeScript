//// [callOverload.ts]
declare function fn(x: any): void;
declare function takeTwo(x: any, y: any): void;
declare function withRest(a: any, ...args: Array<any>): void;
var n: number[];

fn(1) // no error
fn(1, 2, 3, 4)
takeTwo(1, 2, 3, 4)
withRest('a', ...n); // no error
withRest();
withRest(...n); 

//// [callOverload.js]
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var n;
fn(1); // no error
fn(1, 2, 3, 4);
takeTwo(1, 2, 3, 4);
withRest.apply(void 0, __spreadArrays(['a'], n)); // no error
withRest();
withRest.apply(void 0, n);
