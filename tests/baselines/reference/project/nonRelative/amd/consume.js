define(["require", "exports", "decl", "lib/foo/a", "lib/bar/a"], function (require, exports, mod, x, y) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    x.hello();
    y.hello();
    var str = mod.call();
    if (str !== "success") {
        fail();
    }
});
