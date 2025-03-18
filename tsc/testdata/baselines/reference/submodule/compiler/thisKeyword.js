//// [tests/cases/compiler/thisKeyword.ts] ////

//// [thisKeyword.ts]
module foo {
    this.bar = 4;
}

//// [thisKeyword.js]
var foo;
(function (foo) {
    this.bar = 4;
})(foo || (foo = {}));
