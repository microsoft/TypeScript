//// [tests/cases/compiler/assignmentCompatability34.ts] ////

//// [assignmentCompatability34.ts]
namespace __test1__ {
    export interface interfaceWithPublicAndOptional<T,U> { one: T; two?: U; };  var obj4: interfaceWithPublicAndOptional<number,string> = { one: 1 };;
    export var __val__obj4 = obj4;
}
namespace __test2__ {
    export var obj: { <Tnumber>(a:Tnumber):Tnumber;};
    export var __val__obj = obj;
}
__test2__.__val__obj = __test1__.__val__obj4

//// [assignmentCompatability34.js]
var __test1__;
(function (__test1__) {
    ;
    var obj4 = { one: 1 };
    ;
    __test1__.__val__obj4 = obj4;
})(__test1__ || (__test1__ = {}));
var __test2__;
(function (__test2__) {
    __test2__.__val__obj = __test2__.obj;
})(__test2__ || (__test2__ = {}));
__test2__.__val__obj = __test1__.__val__obj4;
