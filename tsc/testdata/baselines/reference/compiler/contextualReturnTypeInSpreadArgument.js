//// [tests/cases/compiler/contextualReturnTypeInSpreadArgument.ts] ////

//// [contextualReturnTypeInSpreadArgument.ts]
enum Kind { A, B }

interface ItemA { kind: Kind.A; name: string }
interface ItemB { kind: Kind.B; size: number }
type Item = ItemA | ItemB;

declare function create(options: { items?: () => readonly Item[]; label: string }): void;

function test(flag: boolean) {
    create({
        label: "x",
        ...(flag ? {} : {
            items: () => [{ kind: Kind.A, name: "a" }],
        }),
    });
}


//// [contextualReturnTypeInSpreadArgument.js]
"use strict";
var Kind;
(function (Kind) {
    Kind[Kind["A"] = 0] = "A";
    Kind[Kind["B"] = 1] = "B";
})(Kind || (Kind = {}));
function test(flag) {
    create({
        label: "x",
        ...(flag ? {} : {
            items: () => [{ kind: Kind.A, name: "a" }],
        }),
    });
}
