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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var n;
fn(1); // no error
fn(1, 2, 3, 4);
takeTwo(1, 2, 3, 4);
withRest.apply(void 0, __spreadArray(['a'], n)); // no error
withRest();
withRest.apply(void 0, n);
