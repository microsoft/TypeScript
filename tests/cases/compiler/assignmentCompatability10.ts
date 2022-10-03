module __test1__ {
    export interface interfaceWithPublicAndOptional<T,U> { one: T; two?: U; };  var obj4: interfaceWithPublicAndOptional<number,string> = { one: 1 };;
    export var __val__obj4 = obj4;
}
module __test2__ {
    export class classWithPublicAndOptional<T,U> { constructor(public one: T, public two?: U) {} }   var x4 = new classWithPublicAndOptional<number, string>(1);;
    export var __val__x4 = x4;
}
__test2__.__val__x4 = __test1__.__val__obj4