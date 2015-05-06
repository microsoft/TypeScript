var outer;
(function (outer) {
    outer.a = g.square(5);
    outer.b = "foo";
})(outer || (outer = {}));
