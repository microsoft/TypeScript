/// <reference path="fourslash.ts" />

////declare let v1: string & {} | "a" | "b" | "c";
////v1 = "/*1*/";
////declare let v2: number & {} | 0 | 1 | 2;
////v2 = /*2*/;

verify.completions({ marker: "1", includes: ["a", "b", "c"] });
verify.completions({ marker: "2", includes: ["0", "1", "2"], isNewIdentifierLocation: true });
