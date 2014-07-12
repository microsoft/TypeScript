var outer;
(function (outer) {
    var g = __g__;

    outer.a = g.square(5);
    outer.b = "foo";
})(outer || (outer = {}));
