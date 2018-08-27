// @Filename: expando.ts
function ExpandoMerge(n: number) {
    return n;
}
ExpandoMerge.p1 = 111
ExpandoMerge.m = function(n: number) {
    return n + 1;
}
ExpandoMerge.p4 = 44444; // ok
ExpandoMerge.p6 = 66666; // error: duplicate
ExpandoMerge.p5 = 555555; // should be ok
ExpandoMerge.p7 = 777777; // error: duplicate
var n = ExpandoMerge.p1 + ExpandoMerge.p2 + ExpandoMerge.p3 + ExpandoMerge.p4 + ExpandoMerge.p5 + ExpandoMerge.m(12) + ExpandoMerge(1001);

// @Filename: ns.ts
namespace ExpandoMerge {
    export var p3 = 333;
    export var p4 = 4; // ok
    export var p5 = 5; // ok
    export let p6 = 6; // error: duplicate
    export let p7 = 7; // error: duplicate
}
namespace ExpandoMerge {
    export var p2 = 222;
}
