define(["require", "exports"], function(require, exports) {
    (function (me) {
        var class1 = (function () {
            function class1() {
                this.prop1 = 0;
            }
            return class1;
        })();
        me.class1 = class1;        
        me.x = class1;
        function foo() {
            return new class1();
        }
        me.foo = foo;
    })(exports.me || (exports.me = {}));
    var me = exports.me;
})
