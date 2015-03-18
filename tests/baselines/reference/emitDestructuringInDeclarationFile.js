//// [emitDestructuringInDeclarationFile.ts]
var {a, b} = { a:10, b:"10"};
var {c, d}: {c:string, d:string} = { c:"true", d:"false" };
let {k, j} = { k:true, j:{a:10}};

var a1 = ["string", 10];
var [x] = a1;
var [x, y] = a1;
var [x, y, z] = a1;
let [x1] = a1;

//// [emitDestructuringInDeclarationFile.js]
var _a = {
    a: 10,
    b: "10"
}, a = _a.a, b = _a.b;
var _b = {
    c: "true",
    d: "false"
}, c = _b.c, d = _b.d;
var _c = {
    k: true,
    j: {
        a: 10
    }
}, k = _c.k, j = _c.j;
var a1 = [
    "string",
    10
];
var x = a1[0];
var x = a1[0], y = a1[1];
var x = a1[0], y = a1[1], z = a1[2];
var x1 = a1[0];


//// [emitDestructuringInDeclarationFile.d.ts]
declare var a: number, b: string;
declare var c: string, d: string;
declare let k: boolean, j: {
    a: number;
};
declare var a1: (string | number)[];
declare var x: string | number;
declare var x: string | number, y: string | number;
declare var x: string | number, y: string | number, z: string | number;
declare let x1: string | number;
