/// <reference path="fourslash.ts" />

////; (function f() { })();
////const a = 3;
////+ 4;
////const b = 3
////+ 4;
////const c = 3 +
////4;
////class C {
////    prop;
////    ["p"];
////    zero: void;
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
////interface I {
////    new;
////    ();
////    foo;
////    ();
////}
////type T = {
////    new;
////    ();
////    foo;
////    ();
////}

format.setFormatOptions({ ...format.copyFormatOptions(), semicolons: ts.SemicolonPreference.Remove });
format.document();
verify.currentFileContentIs(`; (function f() { })()
const a = 3;
+ 4
const b = 3
    + 4
const c = 3 +
    4
class C {
    prop
    ["p"]
    zero: void
    ["one"] = {};
    ["two"]
    ;
}
a;
\`b\`
b;
(3)
4;
/ regex /
;
[];
/** blah */[0]
interface I {
    new;
    ()
    foo;
    ()
}
type T = {
    new;
    ()
    foo;
    ()
}`);