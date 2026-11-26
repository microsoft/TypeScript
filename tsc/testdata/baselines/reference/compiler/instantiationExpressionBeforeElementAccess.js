//// [tests/cases/compiler/instantiationExpressionBeforeElementAccess.ts] ////

//// [instantiationExpressionBeforeElementAccess.ts]
declare const f: { <T>(): T; label: string };
declare const a: { f: typeof f };

f<number>
["label"];

a?.f<number>
["label"];

a?.f<number> /*
*/ ["label"];

(f<number>)
["label"];

(a?.f<number>)["label"];
a?.f<number>?.["label"];


//// [instantiationExpressionBeforeElementAccess.js]
"use strict";
f["label"];
(a?.f)["label"];
(a?.f) /*
*/["label"];
(f)["label"];
((a?.f))["label"];
(a?.f)?.["label"];
