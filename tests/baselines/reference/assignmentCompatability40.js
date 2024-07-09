//// [tests/cases/compiler/assignmentCompatability40.ts] ////

//// [assignmentCompatability40.ts]
module __test1__ {
    export interface interfaceWithPublicAndOptional<T,U> { one: T; two?: U; };  var obj4: interfaceWithPublicAndOptional<number,string> = { one: 1 };;
    export var __val__obj4 = obj4;
}
module __test2__ {
    export           class classWithPrivate<T> { constructor(private one: T) {} }                       var x5 = new classWithPrivate(1);;
    export var __val__x5 = x5;
}
__test2__.__val__x5 = __test1__.__val__obj4

//// [assignmentCompatability40.js]
var __test1__;
(function (__test1__) {
    ;
    var obj4 = { one: 1 };
    ;
    __test1__.__val__obj4 = obj4;
})(__test1__ || (__test1__ = {}));
var __test2__;
(function (__test2__) {
    var classWithPrivate = /** @class */ (function () {
        function classWithPrivate(one) {
            this.one = one;
        }
        return classWithPrivate;
    }());
    __test2__.classWithPrivate = classWithPrivate;
    var x5 = new classWithPrivate(1);
    ;
    __test2__.__val__x5 = x5;
})(__test2__ || (__test2__ = {}));
__test2__.__val__x5 = __test1__.__val__obj4;
