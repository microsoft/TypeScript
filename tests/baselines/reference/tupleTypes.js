//// [tupleTypes.ts]
var v1: [];  // Error
var v2: [number];
var v3: [number, string];
var v4: [number, [string, string]];

var t: [number, string];
var t0 = t[0];   // number
var t0: number;
var t1 = t[1];   // string
var t1: string;
var t2 = t[2];   // number|string
var t2: number|string;

t = [];               // Error
t = [1];              // Error
t = [1, "hello"];     // Ok
t = ["hello", 1];     // Error
t = [1, "hello", 2];  // Error

var tf: [string, (x: string) => number] = ["hello", x => x.length];

declare function ff<T, U>(a: T, b: [T, (x: T) => U]): U;
var ff1 = ff("hello", ["foo", x => x.length]);
var ff1: number;

function tuple2<T0, T1>(item0: T0, item1: T1): [T0, T1]{
    return [item0, item1];
}

var tt = tuple2(1, "string");
var tt0 = tt[0];
var tt0: number;
var tt1 = tt[1];
var tt1: string;
var tt2 = tt[2]; 
var tt2: number | string;

tt = tuple2(1, undefined);
tt = [1, undefined];
tt = [undefined, undefined];
tt = [];  // Error

var a: number[];
var a1: [number, string];
var a2: [number, number];
var a3: [number, {}];
a = a1;   // Error
a = a2;
a = a3;   // Error
a1 = a2;  // Error
a1 = a3;  // Error
a3 = a1;
a3 = a2;


//// [tupleTypes.js]
var v1; // Error
var v2;
var v3;
var v4;
var t;
var t0 = t[0]; // number
var t0;
var t1 = t[1]; // string
var t1;
var t2 = t[2]; // number|string
var t2;
t = []; // Error
t = [1]; // Error
t = [1, "hello"]; // Ok
t = ["hello", 1]; // Error
t = [1, "hello", 2]; // Error
var tf = ["hello", function (x) { return x.length; }];
var ff1 = ff("hello", ["foo", function (x) { return x.length; }]);
var ff1;
function tuple2(item0, item1) {
    return [item0, item1];
}
var tt = tuple2(1, "string");
var tt0 = tt[0];
var tt0;
var tt1 = tt[1];
var tt1;
var tt2 = tt[2];
var tt2;
tt = tuple2(1, undefined);
tt = [1, undefined];
tt = [undefined, undefined];
tt = []; // Error
var a;
var a1;
var a2;
var a3;
a = a1; // Error
a = a2;
a = a3; // Error
a1 = a2; // Error
a1 = a3; // Error
a3 = a1;
a3 = a2;
