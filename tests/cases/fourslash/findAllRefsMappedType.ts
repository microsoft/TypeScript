/// <reference path='fourslash.ts'/>

////interface T { [|[|{| "isDefinition": true, "contextRangeIndex": 0 |}a|]: number;|] }
////type U = { readonly [K in keyof T]?: string };
////declare const t: T;
////t.[|a|];
////declare const u: U;
////u.[|a|];

verify.singleReferenceGroup("(property) T.a: number", "a");
