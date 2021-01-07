//// [spreadBooleanRespectsFreshness.ts]
type Foo = FooBase | FooArray;
type FooBase = string | false;
type FooArray = FooBase[];

declare let foo1: Foo;
declare let foo2: Foo;
foo1 = [...Array.isArray(foo2) ? foo2 : [foo2]];

//// [spreadBooleanRespectsFreshness.js]
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
foo1 = __spreadArray([], Array.isArray(foo2) ? foo2 : [foo2]);
