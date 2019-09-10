/// <reference path="fourslash.ts" />

////;(function f() { })();
////const a = 3;
////+ 4;
////const b = 3
////+ 4;
////const c = 3 +
////4;
////class C {
////    ["one"] = {};
////    ["two"];
////    ;
////}
////a;
////`b`;
////b;
////(3);
////4;
////    / regex /;
////;
////[];
/////** blah */[0];

format.setFormatOptions({ ...format.copyFormatOptions(), insertTrailingSemicolon: false });
format.document();
verify.currentFileContentIs(`;(function f() { })()
const a = 3;
+ 4
const b = 3
    + 4
const c = 3 +
    4
class C {
    zero: void
    ["one"] = {};
    ["two"];
    ;
}
a;
\`b\`;
b;
(3);
4;
    / regex /;
;
[];
/** blah */[0]`);
