/// <reference path="fourslash.ts"/>

//// let a: [... any[]];
//// let b: [...   number[]];
//// let c: [...     string[]];

format.document();
verify.currentFileContentIs(
    `let a: [...any[]];
let b: [...number[]];
let c: [...string[]];`
);
