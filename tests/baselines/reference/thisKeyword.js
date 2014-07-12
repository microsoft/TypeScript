//// [thisKeyword.js]
var foo;
(function (foo) {
    this.bar = 4;
})(foo || (foo = {}));
