//// [tests/cases/compiler/assignmentCompatability4.ts] ////

//// [assignmentCompatability4.ts]
namespace __test1__ {
    export interface interfaceWithPublicAndOptional<T,U> { one: T; two?: U; };  var obj4: interfaceWithPublicAndOptional<number,string> = { one: 1 };;
    export var __val__obj4 = obj4;
}
namespace __test2__ {
    export var aa:{one:number;};;
    export var __val__aa = aa;
}
__test2__.__val__aa = __test1__.__val__obj4

//// [assignmentCompatability4.js]
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
    __test2__.__val__aa = __test2__.aa;
})(__test2__ || (__test2__ = {}));
__test2__.__val__aa = __test1__.__val__obj4;
