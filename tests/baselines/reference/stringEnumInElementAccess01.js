//// [tests/cases/conformance/expressions/elementAccess/stringEnumInElementAccess01.ts] ////

//// [stringEnumInElementAccess01.ts]
enum E {
    A = "a",
    B = "b",
    C = "c",
}

interface Item {
    a: string;
    b: number;
    c: boolean;
}

declare const item: Item;
declare const e: E;
const snb: string | number | boolean = item[e];


//// [stringEnumInElementAccess01.js]
var E;
(function (E) {
    E["A"] = "a";
    E["B"] = "b";
    E["C"] = "c";
})(E || (E = {}));
var snb = item[e];
