//// [tests/cases/compiler/assignmentCompatability10.ts] ////

//// [assignmentCompatability10.ts]
module __test1__ {
    export interface interfaceWithPublicAndOptional<T,U> { one: T; two?: U; };  var obj4: interfaceWithPublicAndOptional<number,string> = { one: 1 };;
    export var __val__obj4 = obj4;
}
module __test2__ {
    export class classWithPublicAndOptional<T,U> { constructor(public one: T, public two?: U) {} }   var x4 = new classWithPublicAndOptional<number, string>(1);;
    export var __val__x4 = x4;
}
__test2__.__val__x4 = __test1__.__val__obj4

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
    var classWithPublicAndOptional = /** @class */ (function () {
        function classWithPublicAndOptional(one, two) {
            this.one = one;
            this.two = two;
        }
        return classWithPublicAndOptional;
    }());
    __test2__.classWithPublicAndOptional = classWithPublicAndOptional;
    var x4 = new classWithPublicAndOptional(1);
    ;
    __test2__.__val__x4 = x4;
})(__test2__ || (__test2__ = {}));
__test2__.__val__x4 = __test1__.__val__obj4;
