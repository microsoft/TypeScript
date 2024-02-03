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

namespace Problem5 {
  declare const obj: { [key: string]: string | undefined };
  declare const key: string;
  if (obj[key]) {
    while(!!true) {
      obj[key].toUpperCase() // should Ok
    }
  } 
}

namespace Problem6 {
  declare const obj: { [key: string]: string | undefined };
  declare const key: string;
  while(!!true) {
    if (obj[key]) {
      obj[key].toUpperCase() // should Ok
    } 
  }
}

namespace Problem7 {
  declare const obj: { [key: string]: string | undefined };
  declare const key: string;
  if (obj[key]) {
    while(!!true) {
      obj[key].toUpperCase() // should error
      obj[key] = undefined
    }
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
var Problem5;
(function (Problem5) {
    if (obj[key]) {
        while (!!true) {
            obj[key].toUpperCase(); // should Ok
        }
    }
})(Problem5 || (Problem5 = {}));
var Problem6;
(function (Problem6) {
    while (!!true) {
        if (obj[key]) {
            obj[key].toUpperCase(); // should Ok
        }
    }
})(Problem6 || (Problem6 = {}));
var Problem7;
(function (Problem7) {
    if (obj[key]) {
        while (!!true) {
            obj[key].toUpperCase(); // should error
            obj[key] = undefined;
        }
    }
})(Problem7 || (Problem7 = {}));
