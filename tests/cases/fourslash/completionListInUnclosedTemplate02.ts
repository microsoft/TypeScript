/// <reference path='fourslash.ts' />

////var x;
////var y = (p) => `abc ${ 123 } ${ /*1*/

verify.completions({ marker: "1", includes: ["p", "x"], isNewIdentifierLocation: true });
