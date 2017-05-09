//// [destructuringObjectBindingElementWithPropertyNames.ts]
interface I {
    property1: number;
    property2: string;
}

var elems: I[];
for (let { property1: p } of elems) {
}
for (let { property1 } of elems) {
}
for (var { property1: p1 } of elems) {
}
var p2;
for ({ property1 : p2 } of elems) {
}


//// [destructuringObjectBindingElementWithPropertyNames.js]
var elems;
for (var _i = 0, elems_1 = elems; _i < elems_1.length; _i++) {
    var p = elems_1[_i].property1;
}
for (var _a = 0, elems_2 = elems; _a < elems_2.length; _a++) {
    var property1 = elems_2[_a].property1;
}
for (var _b = 0, elems_3 = elems; _b < elems_3.length; _b++) {
    var p1 = elems_3[_b].property1;
}
var p2;
for (var _c = 0, elems_4 = elems; _c < elems_4.length; _c++) {
    p2 = elems_4[_c].property1;
}
