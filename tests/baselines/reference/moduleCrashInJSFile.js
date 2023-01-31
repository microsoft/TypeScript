//// [a.js]
//// [thisKeyword.ts]
module foo {
    this.bar = 4;
}

//// [thisKeyword.js]
var foo;
(function (foo) {
    this.bar = 4;
})(foo || (foo = {}));

//// [a.js]
//// [thisKeyword.ts]
var foo;
(function (foo) {
    this.bar = 4;
})(foo || (foo = {}));
//// [thisKeyword.js]
var foo;
(function (foo) {
    this.bar = 4;
})(foo || (foo = {}));
