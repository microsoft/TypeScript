//// [tests/cases/compiler/assignmentCompatability5.ts] ////

//// [assignmentCompatability5.ts]
namespace __test1__ {
    export interface interfaceWithPublicAndOptional<T,U> { one: T; two?: U; };  var obj4: interfaceWithPublicAndOptional<number,string> = { one: 1 };;
    export var __val__obj4 = obj4;
}
namespace __test2__ {
    export                   interface interfaceOne<T> { one: T; };                var obj1: interfaceOne<number> = { one: 1 };;
    export var __val__obj1 = obj1;
}
__test2__.__val__obj1 = __test1__.__val__obj4

//// [assignmentCompatability5.js]
var __test1__;
(function (__test1__) {
    ;
    var obj4 = { one: 1 };
    ;
    __test1__.__val__obj4 = obj4;
})(__test1__ || (__test1__ = {}));
var __test2__;
(function (__test2__) {
    ;
    var obj1 = { one: 1 };
    ;
    __test2__.__val__obj1 = obj1;
})(__test2__ || (__test2__ = {}));
__test2__.__val__obj1 = __test1__.__val__obj4;
