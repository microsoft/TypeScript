module __test1__ {
    export interface interfaceWithPublicAndOptional<T,U> { one: T; two?: U; };  var obj4: interfaceWithPublicAndOptional<number,string> = { one: 1 };;
    export var __val__obj4 = obj4;
}
module __test2__ {
    export            class classWithPublic<T> { constructor(public one: T) {} }                        var x1 = new classWithPublic(1);;
    export var __val__x1 = x1;
}
__test2__.__val__x1 = __test1__.__val__obj4