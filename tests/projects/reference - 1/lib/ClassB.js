var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var test;
(function (test) {
    var ClassB = (function (_super) {
        __extends(ClassB, _super);
        function ClassB() {
            _super.apply(this, arguments);

        }
        return ClassB;
    })(test.ClassA);
    test.ClassB = ClassB;    
})(test || (test = {}));
