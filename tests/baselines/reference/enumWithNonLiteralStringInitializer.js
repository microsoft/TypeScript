//// [tests/cases/compiler/enumWithNonLiteralStringInitializer.ts] ////

//// [helpers.ts]
export const foo = 2;
export const bar = "bar";

//// [bad.ts]
import { bar } from "./helpers";
enum A {
   a = bar,
}

//// [good.ts]
import { foo } from "./helpers";
enum A {
   a = `${foo}`,
   b = "" + 2,
   c = 2 + "",
   d = ("foo"),
}


//// [helpers.js]
export const foo = 2;
export const bar = "bar";
//// [bad.js]
import { bar } from "./helpers";
var A;
(function (A) {
    A["a"] = "bar";
})(A || (A = {}));
//// [good.js]
import { foo } from "./helpers";
var A;
(function (A) {
    A["a"] = "2";
    A["b"] = "2";
    A["c"] = "2";
    A["d"] = "foo";
})(A || (A = {}));
