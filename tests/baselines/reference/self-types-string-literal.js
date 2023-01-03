//// [self-types-string-literal.ts]
type StringLiteral =
  self extends string
    ? string extends self
        ? Never<`Type '${Print<self>}' is not assignable to type 'StringLiteral'`>
        : self
    : string

let x: StringLiteral = "x" as "x"
let y: StringLiteral = "y" as string
let xx: { x: StringLiteral } = { x: "x" as "x" }
let yy: { y: StringLiteral } = { y: "y" as string }
let zs: StringLiteral[] = ["z0" as "z0", "z1" as string, "z2" as "z2"]
let a: StringLiteral = "a" as StringLiteral
let b: StringLiteral = "b"
let cs: StringLiteral[] = ["c0", "c1", "c2"]


//// [self-types-string-literal.js]
var x = "x";
var y = "y";
var xx = { x: "x" };
var yy = { y: "y" };
var zs = ["z0", "z1", "z2"];
var a = "a";
var b = "b";
var cs = ["c0", "c1", "c2"];
