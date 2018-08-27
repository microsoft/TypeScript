//// [typeFromPropertyAssignment31.ts]
function ExpandoMerge(n: number) {
    return n;
}
ExpandoMerge.p1 = 111
ExpandoMerge.m = function(n: number) {
    return n + 1;
}
namespace ExpandoMerge {
    export var p2 = 222;
}
ExpandoMerge.p4 = 44444; // ok
ExpandoMerge.p6 = 66666; // error: duplicate
namespace ExpandoMerge {
    export var p3 = 333;
    export var p4 = 4; // ok
    export var p5 = 5; // ok
    export let p6 = 6; // error: duplicate
    export let p7 = 7; // error: duplicate
}
ExpandoMerge.p5 = 555555; // should be ok
ExpandoMerge.p7 = 777777; // error: duplicate
var n = ExpandoMerge.p1 + ExpandoMerge.p2 + ExpandoMerge.p3 + ExpandoMerge.p4 + ExpandoMerge.p5 + ExpandoMerge.m(12) + ExpandoMerge(1001);


//// [typeFromPropertyAssignment31.js]
function ExpandoMerge(n) {
    return n;
}
ExpandoMerge.p1 = 111;
ExpandoMerge.m = function (n) {
    return n + 1;
};
(function (ExpandoMerge) {
    ExpandoMerge.p2 = 222;
})(ExpandoMerge || (ExpandoMerge = {}));
ExpandoMerge.p4 = 44444; // ok
ExpandoMerge.p6 = 66666; // error: duplicate
(function (ExpandoMerge) {
    ExpandoMerge.p3 = 333;
    ExpandoMerge.p4 = 4; // ok
    ExpandoMerge.p5 = 5; // ok
    ExpandoMerge.p6 = 6; // error: duplicate
    ExpandoMerge.p7 = 7; // error: duplicate
})(ExpandoMerge || (ExpandoMerge = {}));
ExpandoMerge.p5 = 555555; // should be ok
ExpandoMerge.p7 = 777777; // error: duplicate
var n = ExpandoMerge.p1 + ExpandoMerge.p2 + ExpandoMerge.p3 + ExpandoMerge.p4 + ExpandoMerge.p5 + ExpandoMerge.m(12) + ExpandoMerge(1001);
