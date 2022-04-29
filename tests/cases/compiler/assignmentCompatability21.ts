module __test1__ {
    export interface interfaceWithPublicAndOptional<T,U> { one: T; two?: U; };  var obj4: interfaceWithPublicAndOptional<number,string> = { one: 1 };;
    export var __val__obj4 = obj4;
}
module __test2__ {
    export var obj = {two: ["1"]};
    export var __val__obj = obj;
}
__test2__.__val__obj = __test1__.__val__obj4