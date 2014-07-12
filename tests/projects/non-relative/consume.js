define(["require", "exports", "decl", "lib/foo/a", "lib/bar/a"], function(require, exports, __mod__, __x__, __y__) {
    var mod = __mod__;

    var x = __x__;

    var y = __y__;

    x.hello();
    y.hello();
    var str = mod.call();
        if(str !== "success") {
        fail();
    }
})
