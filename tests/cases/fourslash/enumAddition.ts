/// <reference path="fourslash.ts" />

//// namespace m { export enum Color { Red } }
//// var /**/t = m.Color.Red + 1;

verify.quickInfoAt("", "var t: number");
