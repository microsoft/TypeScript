//// [thisKeyword.ts]
module foo {
    this.bar = 4;
}

//// [thisKeyword.js]
var foo = foo || (foo = {});
(function (foo) {
    this.bar = 4;
})(foo);
