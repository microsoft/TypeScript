define(["require", "exports", "test2"], function(require, exports, __foo__) {
    (function (myModule) {
        var foo = __foo__;

        console.log(foo.$);
    })(exports.myModule || (exports.myModule = {}));
    var myModule = exports.myModule;
})
