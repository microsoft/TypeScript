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
namespace ExpandoMerge {
    export var p3 = 333;
    export var p4 = 4;
}
ExpandoMerge.p4 = 44444;
var n = ExpandoMerge.p1 + ExpandoMerge.p2 + ExpandoMerge.p3 + ExpandoMerge.p4 + ExpandoMerge.m(12) + ExpandoMerge(1001);



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
(function (ExpandoMerge) {
    ExpandoMerge.p3 = 333;
    ExpandoMerge.p4 = 4;
})(ExpandoMerge || (ExpandoMerge = {}));
ExpandoMerge.p4 = 44444;
var n = ExpandoMerge.p1 + ExpandoMerge.p2 + ExpandoMerge.p3 + ExpandoMerge.p4 + ExpandoMerge.m(12) + ExpandoMerge(1001);
