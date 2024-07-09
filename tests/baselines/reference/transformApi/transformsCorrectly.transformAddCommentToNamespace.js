/*comment*/
var Foo;
(function (Foo) {
    Foo.x = 1;
})(Foo || (Foo = {}));
/*comment*/
(function (Foo) {
    Foo.y = 1;
})(Foo || (Foo = {}));
