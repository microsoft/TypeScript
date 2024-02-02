//// [tests/cases/compiler/typeGuardNarrowsIndexedAccessOfAnyProperty.ts] ////

//// [typeGuardNarrowsIndexedAccessOfAnyProperty.ts]
namespace Problem1 {
  declare const obj: { [key: string]: string | undefined };
  declare let key: "a";
  if (obj[key]) { obj[key].toUpperCase() } // should Ok
}

namespace Problem2 {
  declare const obj: { [key: string]: string | undefined };
  declare const key: string;
  if (obj[key]) { obj[key].toUpperCase() } // should Ok
}

namespace Problem3 {
  declare const obj: { a?: string, b?: string };
  declare const key: "a" | "b";
  if (obj[key]) { obj[key].toUpperCase() } // should Ok
}

namespace Problem4 {
  function f<K extends string>(obj: { [P in K]?: string }, k: K) {
    const key: K = k;
    if (obj[key]) { obj[key].toUpperCase() } // should Ok
  }
}

//// [typeGuardNarrowsIndexedAccessOfAnyProperty.js]
"use strict";
var Problem1;
(function (Problem1) {
    if (obj[key]) {
        obj[key].toUpperCase();
    } // should Ok
})(Problem1 || (Problem1 = {}));
var Problem2;
(function (Problem2) {
    if (obj[key]) {
        obj[key].toUpperCase();
    } // should Ok
})(Problem2 || (Problem2 = {}));
var Problem3;
(function (Problem3) {
    if (obj[key]) {
        obj[key].toUpperCase();
    } // should Ok
})(Problem3 || (Problem3 = {}));
var Problem4;
(function (Problem4) {
    function f(obj, k) {
        var key = k;
        if (obj[key]) {
            obj[key].toUpperCase();
        } // should Ok
    }
})(Problem4 || (Problem4 = {}));
