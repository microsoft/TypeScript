//// [stringLiteralsFromConstToLet01.ts]

declare var randVal: boolean;

const a = randVal ? "A" : "B";
const b = a;

let c = a;
c = "A";
c = "B";
c = "C";

let d = b;
d = "A";
d = "B";
d = "C";


//// [stringLiteralsFromConstToLet01.js]
var a = randVal ? "A" : "B";
var b = a;
var c = a;
c = "A";
c = "B";
c = "C";
var d = b;
d = "A";
d = "B";
d = "C";


//// [stringLiteralsFromConstToLet01.d.ts]
declare var randVal: boolean;
declare const a: "A" | "B";
declare const b: "A" | "B";
declare let c: "A" | "B";
declare let d: "A" | "B";
