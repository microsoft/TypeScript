/// <reference path="fourslash.ts" />

////interface point {
////    x: number;
////    y: number;
////}
////interface thing {
////    name: string;
////    pos: point;
////}
////var t: thing;
////t.pos = { x: 4, y: 3 + t./**/ };

verify.completions({ marker: "", exact: ["name", "pos"] });
