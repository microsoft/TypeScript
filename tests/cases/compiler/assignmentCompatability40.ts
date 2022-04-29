module __test1__ {
    export interface interfaceWithPublicAndOptional<T,U> { one: T; two?: U; };  var obj4: interfaceWithPublicAndOptional<number,string> = { one: 1 };;
    export var __val__obj4 = obj4;
}
module __test2__ {
    export           class classWithPrivate<T> { constructor(private one: T) {} }                       var x5 = new classWithPrivate(1);;
    export var __val__x5 = x5;
}
__test2__.__val__x5 = __test1__.__val__obj4