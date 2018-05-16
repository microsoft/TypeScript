function foo (x) {
    var a = x;
    return function (c) {
        a += c;
    };
}
