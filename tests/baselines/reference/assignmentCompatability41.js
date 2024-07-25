//// [tests/cases/compiler/assignmentCompatability41.ts] ////

//// [assignmentCompatability41.ts]
module __test1__ {
    export interface interfaceWithPublicAndOptional<T,U> { one: T; two?: U; };  var obj4: interfaceWithPublicAndOptional<number,string> = { one: 1 };;
    export var __val__obj4 = obj4;
}
module __test2__ {
    export        class classWithTwoPrivate<T,U> { constructor(private one: T, private two: U) {} }  var x6 = new classWithTwoPrivate(1, "a");;
    export var __val__x6 = x6;
}
__test2__.__val__x6 = __test1__.__val__obj4

//// [assignmentCompatability41.js]
var __test1__;
(function (__test1__) {
    ;
    var obj4 = { one: 1 };
    ;
    __test1__.__val__obj4 = obj4;
})(__test1__ || (__test1__ = {}));
var __test2__;
(function (__test2__) {
    var classWithTwoPrivate = /** @class */ (function () {
        function classWithTwoPrivate(one, two) {
            this.one = one;
            this.two = two;
        }
        return classWithTwoPrivate;
    }());
    __test2__.classWithTwoPrivate = classWithTwoPrivate;
    var x6 = new classWithTwoPrivate(1, "a");
    ;
    __test2__.__val__x6 = x6;
})(__test2__ || (__test2__ = {}));
__test2__.__val__x6 = __test1__.__val__obj4;
