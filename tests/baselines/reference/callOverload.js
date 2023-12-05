//// [tests/cases/conformance/expressions/functionCalls/callOverload.ts] ////

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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var n;
fn(1); // no error
fn(1, 2, 3, 4);
takeTwo(1, 2, 3, 4);
withRest.apply(void 0, __spreadArray(['a'], n, false)); // no error
withRest();
withRest.apply(void 0, n);
