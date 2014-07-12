var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "mExported", "mNonExported"], function(require, exports, __mExported__, __mNonExported__) {
        var m2;
    (function (m2) {
        var mExported = __mExported__;

        m2.c1 = new mExported.me.class1();
        function f1() {
            return new mExported.me.class1();
        }
        m2.f1 = f1;
        m2.x1 = mExported.me.x;
        var class1 = (function (_super) {
            __extends(class1, _super);
            function class1() {
                _super.apply(this, arguments);

            }
            return class1;
        })(mExported.me.class1);
        m2.class1 = class1;        
        var c2 = new mExported.me.class1();
        function f2() {
            return new mExported.me.class1();
        }
        var x2 = mExported.me.x;
        var class2 = (function (_super) {
            __extends(class2, _super);
            function class2() {
                _super.apply(this, arguments);

            }
            return class2;
        })(mExported.me.class1);        
        var mNonExported = __mNonExported__;

        m2.c3 = new mNonExported.mne.class1();
        function f3() {
            return new mNonExported.mne.class1();
        }
        m2.f3 = f3;
        m2.x3 = mNonExported.mne.x;
        var class3 = (function (_super) {
            __extends(class3, _super);
            function class3() {
                _super.apply(this, arguments);

            }
            return class3;
        })(mNonExported.mne.class1);
        m2.class3 = class3;        
        var c4 = new mNonExported.mne.class1();
        function f4() {
            return new mNonExported.mne.class1();
        }
        var x4 = mNonExported.mne.x;
        var class4 = (function (_super) {
            __extends(class4, _super);
            function class4() {
                _super.apply(this, arguments);

            }
            return class4;
        })(mNonExported.mne.class1);        
    })(m2 || (m2 = {}));
})
