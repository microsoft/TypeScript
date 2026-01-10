namespace __test1__ {
    export interface interfaceWithPublicAndOptional<T,U> { one: T; two?: U; };  var obj4: interfaceWithPublicAndOptional<number,string> = { one: 1 };;
    export var __val__obj4 = obj4;
}
namespace __test2__ {
    export declare var aa:{ new <Tnumber>(param: Tnumber); };;
    export var __val__aa = aa;
}
__test2__.__val__aa = __test1__.__val__obj4