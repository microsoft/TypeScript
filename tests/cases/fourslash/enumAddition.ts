/// <reference path="fourslash.ts" />

//// module m { export enum Color { Red } }
//// var /**/t = m.Color.Red + 1;

goTo.marker();
verify.quickInfoExists();
verify.quickInfoIs('(var) t: number');
