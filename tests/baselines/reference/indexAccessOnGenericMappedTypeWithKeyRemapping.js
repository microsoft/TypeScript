//// [indexAccessOnGenericMappedTypeWithKeyRemapping.ts]
type Foo<T extends string> = {
    [RemappedT in T as `get${RemappedT}`]: RemappedT;
};
const get = <T extends string>(t: T, foo: Foo<T>): T => foo[`get${t}`];


//// [indexAccessOnGenericMappedTypeWithKeyRemapping.js]
var get = function (t, foo) { return foo["get".concat(t)]; };
