//// [tests/cases/compiler/assignmentCompatability39.ts] ////

//// [assignmentCompatability39.ts]
module __test1__ {
    export interface interfaceWithPublicAndOptional<T,U> { one: T; two?: U; };  var obj4: interfaceWithPublicAndOptional<number,string> = { one: 1 };;
    export var __val__obj4 = obj4;
}
module __test2__ {
    export         class classWithTwoPublic<T,U> { constructor(public one: T, public two: U) {} }    var x2 = new classWithTwoPublic(1, "a");;
    export var __val__x2 = x2;
}
__test2__.__val__x2 = __test1__.__val__obj4

//// [assignmentCompatability39.js]
var __test1__;
(function (__test1__) {
    ;
    var obj4 = { one: 1 };
    ;
    __test1__.__val__obj4 = obj4;
})(__test1__ || (__test1__ = {}));
var __test2__;
(function (__test2__) {
    var classWithTwoPublic = /** @class */ (function () {
        function classWithTwoPublic(one, two) {
            this.one = one;
            this.two = two;
        }
        return classWithTwoPublic;
    }());
    __test2__.classWithTwoPublic = classWithTwoPublic;
    var x2 = new classWithTwoPublic(1, "a");
    ;
    __test2__.__val__x2 = x2;
})(__test2__ || (__test2__ = {}));
__test2__.__val__x2 = __test1__.__val__obj4;
