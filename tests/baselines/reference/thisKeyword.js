//// [tests/cases/compiler/thisKeyword.ts] ////

//// [thisKeyword.ts]
namespace foo {
    this.bar = 4;
}

//// [thisKeyword.js]
var foo;
(function (foo) {
    this.bar = 4;
})(foo || (foo = {}));
