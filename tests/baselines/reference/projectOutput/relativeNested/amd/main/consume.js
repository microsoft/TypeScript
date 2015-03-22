define(["require", "exports", "../decl"], function (require, exports, decl) {
    function call() {
        var str = decl.call();
        if (str !== "success") {
            fail();
        }
    }
    exports.call = call;
});
