/// <reference path="fourslash.ts" />

////declare let v1: string & {} | "a" | "b" | "c";
////v1 = "/*1*/";
////declare let v2: number & {} | 0 | 1 | 2;
////v2 = /*2*/;
////declare let v3: string & Record<never, never> | "a" | "b" | "c";
////v3 = "/*3*/";
////type LiteralUnion1<T extends U, U> = T | U & {};
////type LiteralUnion2<T extends U, U> = T | U & Record<never, never>;
////declare let v4: LiteralUnion1<"a" | "b" | "c", string>;
////v4 = "/*4*/";
////declare let v5: LiteralUnion2<"a" | "b" | "c", string>;
////v5 = "/*5*/";

verify.completions({ marker: "1", includes: ["a", "b", "c"] });
verify.completions({ marker: "2", includes: ["0", "1", "2"], isNewIdentifierLocation: true });
verify.completions({ marker: "3", includes: ["a", "b", "c"] });
verify.completions({ marker: "4", exact: [] });
verify.completions({ marker: "5", includes: ["a", "b", "c"] });
