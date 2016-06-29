define(["require", "exports", "m1"], function (require, exports, m1) {
    "use strict";
    exports.m1 = m1;
    var val = m1("works", 42);
    void (m1.name + ": " + val);
});
