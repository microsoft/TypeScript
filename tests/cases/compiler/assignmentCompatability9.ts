module __test1__ {
    export interface interfaceWithPublicAndOptional<T,U> { one: T; two?: U; };  var obj4: interfaceWithPublicAndOptional<number,string> = { one: 1 };;
    export var __val__obj4 = obj4;
}
module __test2__ {
    export          class classWithOptional<T> { constructor(public one?: T) {} }                       var x3 = new classWithOptional<number>();;
    export var __val__x3 = x3;
}
__test2__.__val__x3 = __test1__.__val__obj4