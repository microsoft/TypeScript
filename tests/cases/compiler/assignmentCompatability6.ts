namespace __test1__ {
    export interface interfaceWithPublicAndOptional<T,U> { one: T; two?: U; };  var obj4: interfaceWithPublicAndOptional<number,string> = { one: 1 };;
    export var __val__obj4 = obj4;
}
namespace __test2__ {
    export          interface interfaceWithOptional<T> { one?: T; };               var obj3: interfaceWithOptional<number> = { };;
    export var __val__obj3 = obj3;
}
__test2__.__val__obj3 = __test1__.__val__obj4