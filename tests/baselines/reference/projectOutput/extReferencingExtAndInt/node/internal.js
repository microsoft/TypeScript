var outer;
(function (outer) {
    outer.b = "foo";
})(outer || (outer = {}));
