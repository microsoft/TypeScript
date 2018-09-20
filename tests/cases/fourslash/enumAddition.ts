/// <reference path="fourslash.ts" />

//// module m { export enum Color { Red } }
//// var /**/t = m.Color.Red + 1;

verify.quickInfoAt("", "var t: number");
