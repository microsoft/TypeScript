//// [tests/cases/compiler/assignmentCompatability9.ts] ////

//// [assignmentCompatability9.ts]
module __test1__ {
    export interface interfaceWithPublicAndOptional<T,U> { one: T; two?: U; };  var obj4: interfaceWithPublicAndOptional<number,string> = { one: 1 };;
    export var __val__obj4 = obj4;
}
module __test2__ {
    export          class classWithOptional<T> { constructor(public one?: T) {} }                       var x3 = new classWithOptional<number>();;
    export var __val__x3 = x3;
}
__test2__.__val__x3 = __test1__.__val__obj4

//// [assignmentCompatability9.js]
var __test1__;
(function (__test1__) {
    ;
    var obj4 = { one: 1 };
    ;
    __test1__.__val__obj4 = obj4;
})(__test1__ || (__test1__ = {}));
var __test2__;
(function (__test2__) {
    var classWithOptional = /** @class */ (function () {
        function classWithOptional(one) {
            this.one = one;
        }
        return classWithOptional;
    }());
    __test2__.classWithOptional = classWithOptional;
    var x3 = new classWithOptional();
    ;
    __test2__.__val__x3 = x3;
})(__test2__ || (__test2__ = {}));
__test2__.__val__x3 = __test1__.__val__obj4;
