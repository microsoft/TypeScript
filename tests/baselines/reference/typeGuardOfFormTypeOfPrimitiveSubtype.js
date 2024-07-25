//// [tests/cases/conformance/expressions/typeGuards/typeGuardOfFormTypeOfPrimitiveSubtype.ts] ////

//// [typeGuardOfFormTypeOfPrimitiveSubtype.ts]
let a: {};
let b: {toString(): string};
if (typeof a === "number") {
    let c: number = a;
}
if (typeof a === "string") {
    let c: string = a;
}
if (typeof a === "boolean") {
    let c: boolean = a;
}

if (typeof b === "number") {
    let c: number = b;
}
if (typeof b === "string") {
    let c: string = b;
}
if (typeof b === "boolean") {
    let c: boolean = b;
}


//// [typeGuardOfFormTypeOfPrimitiveSubtype.js]
var a;
var b;
if (typeof a === "number") {
    var c = a;
}
if (typeof a === "string") {
    var c = a;
}
if (typeof a === "boolean") {
    var c = a;
}
if (typeof b === "number") {
    var c = b;
}
if (typeof b === "string") {
    var c = b;
}
if (typeof b === "boolean") {
    var c = b;
}
