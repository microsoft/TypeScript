//// [stringLiteralTypesTypePredicates01.ts]

type Kind = "A" | "B"

function kindIs(kind: Kind, is: "A"): kind is "A";
function kindIs(kind: Kind, is: "B"): kind is "B";
function kindIs(kind: Kind, is: Kind): boolean {
    return kind === is;
}

var x: Kind = "A";

if (kindIs(x, "A")) {
    let a = x;
}
else {
    let b = x;
}

if (!kindIs(x, "B")) {
    let c = x;
}
else {
    let d = x;
}

//// [stringLiteralTypesTypePredicates01.js]
"A" | "B";
"A";
"B";
function kindIs(kind, is) {
    return kind === is;
}
var x = "A";
if (kindIs(x, "A")) {
    var a = x;
}
else {
    var b = x;
}
if (!kindIs(x, "B")) {
    var c = x;
}
else {
    var d = x;
}
