module __test1__ {
    export interface interfaceWithPublicAndOptional<T,U> { one: T; two?: U; };  var obj4: interfaceWithPublicAndOptional<number,string> = { one: 1 };;
    export var __val__obj4 = obj4;
}
module __test2__ {
    export                   interface interfaceTwo<T,U> { one: T; two: U; };   var obj2: interfaceTwo<number,string> = { one: 1, two: "a" };;
    export var __val__obj2 = obj2;
}
__test2__.__val__obj2 = __test1__.__val__obj4