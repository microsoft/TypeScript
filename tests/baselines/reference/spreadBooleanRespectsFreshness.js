//// [tests/cases/compiler/spreadBooleanRespectsFreshness.ts] ////

//// [spreadBooleanRespectsFreshness.ts]
type Foo = FooBase | FooArray;
type FooBase = string | false;
type FooArray = FooBase[];

declare let foo1: Foo;
declare let foo2: Foo;
foo1 = [...Array.isArray(foo2) ? foo2 : [foo2]];

//// [spreadBooleanRespectsFreshness.js]
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
foo1 = __spreadArray([], Array.isArray(foo2) ? foo2 : [foo2], true);
