//// [tests/cases/compiler/thisKeyword.ts] ////

//// [thisKeyword.ts]
namespace foo {
    this.bar = 4;
}

//// [thisKeyword.js]
"use strict";
var foo;
(function (foo) {
    this.bar = 4;
})(foo || (foo = {}));
