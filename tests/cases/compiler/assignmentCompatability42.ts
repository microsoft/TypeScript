module __test1__ {
    export interface interfaceWithPublicAndOptional<T,U> { one: T; two?: U; };  var obj4: interfaceWithPublicAndOptional<number,string> = { one: 1 };;
    export var __val__obj4 = obj4;
}
module __test2__ {
    export     class classWithPublicPrivate<T,U> { constructor(public one: T, private two: U) {} }   var x7 = new classWithPublicPrivate(1, "a");;
    export var __val__x7 = x7;
}
__test2__.__val__x7 = __test1__.__val__obj4