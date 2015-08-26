define(["require", "exports"], function (require, exports) {
    var mne;
    (function (mne) {
        var class1 = (function () {
            function class1() {
                this.prop1 = 0;
            }
            return class1;
        })();
        mne.class1 = class1;
        mne.x = class1;
        function foo() {
            return new class1();
        }
        mne.foo = foo;
    })(mne = exports.mne || (exports.mne = {}));
});
