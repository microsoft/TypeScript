namespace __test1__ {
    export interface interfaceWithPublicAndOptional<T,U> { one: T; two?: U; };  var obj4: interfaceWithPublicAndOptional<number,string> = { one: 1 };;
    export var __val__obj4 = obj4;
}
namespace __test2__ {
    export         class classWithTwoPublic<T,U> { constructor(public one: T, public two: U) {} }    var x2 = new classWithTwoPublic(1, "a");;
    export var __val__x2 = x2;
}
__test2__.__val__x2 = __test1__.__val__obj4