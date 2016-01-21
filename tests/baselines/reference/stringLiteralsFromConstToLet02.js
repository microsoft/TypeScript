//// [stringLiteralsFromConstToLet02.ts]

const a = "A";
const b = a;

let c = a;
c = "A";
c = "B";
c = "C";

let d = b;
d = "A";
d = "B";
d = "C";


//// [stringLiteralsFromConstToLet02.js]
var a = "A";
var b = a;
var c = a;
c = "A";
c = "B";
c = "C";
var d = b;
d = "A";
d = "B";
d = "C";


//// [stringLiteralsFromConstToLet02.d.ts]
declare const a: "A";
declare const b: "A";
declare let c: string;
declare let d: string;
