//// [assignmentCompatability10.js]
var __test1__;
(function (__test1__) {
    ;
    var obj4 = { one: 1 };
    ;
    __test1__.__val__obj4 = obj4;
})(__test1__ || (__test1__ = {}));
var __test2__;
(function (__test2__) {
    var classWithPublicAndOptional = (function () {
        function classWithPublicAndOptional(one, two) {
            this.one = one;
            this.two = two;
        }
        return classWithPublicAndOptional;
    })();
    __test2__.classWithPublicAndOptional = classWithPublicAndOptional;
    var x4 = new classWithPublicAndOptional(1);
    ;
    __test2__.__val__x4 = x4;
})(__test2__ || (__test2__ = {}));
__test2__.__val__x4 = __test1__.__val__obj4;
