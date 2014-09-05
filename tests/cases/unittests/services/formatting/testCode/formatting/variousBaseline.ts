function f(a, b, c, d) {
    for (var i = 0; i < 10; i++) {
        var a = 0;
        var b = a + a + a * a % a / 2 - 1;
        b += a;
        ++b;
        f(a, b, c, d);
        if (1 === 1) {
            var m = function(e, f) {
                return e ^ f;
            }
        }
    }
}

for (var i = 0   ; i < this.foo(); i++) {
}