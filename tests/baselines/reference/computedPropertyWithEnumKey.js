//// [tests/cases/compiler/computedPropertyWithEnumKey.ts] ////

//// [computedPropertyWithEnumKey.ts]
enum Type { Foo = 'foo', '3x14' = '3.14' } type TypeMap = { [Type.Foo]: any; [Type['3x14']]: any; };


//// [computedPropertyWithEnumKey.js]
"use strict";
var Type;
(function (Type) {
    Type["Foo"] = "foo";
    Type["3x14"] = "3.14";
})(Type || (Type = {}));
