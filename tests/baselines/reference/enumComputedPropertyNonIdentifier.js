//// [tests/cases/compiler/enumComputedPropertyNonIdentifier.ts] ////

//// [enumComputedPropertyNonIdentifier.ts]
// Issue #25083: Enum keys not accepted as computed properties if their name is not a valid identifier

enum Type {
    Foo = 'foo',
    '3x14' = '3x14',
    'hello-world' = 'hello-world'
}

// These should work - dot notation
type TypeMapDot = {
    [Type.Foo]: string;
}

// These should also work - bracket notation with valid identifier
type TypeMapBracketValid = {
    [Type['Foo']]: string;  // Now works!
}

// These should work - bracket notation with non-identifier names
type TypeMapBracketNonIdentifier = {
    [Type['3x14']]: number;  // Now works!
    [Type['hello-world']]: string;  // Now works!
}

// Test in object types as well
interface TestInterface {
    [Type.Foo]: string;  // OK
    [Type['3x14']]: number;  // Now works!
}

// Verify the enum values work in actual objects
const obj1: Record<Type, any> = {
    [Type.Foo]: 'test',
    [Type['3x14']]: 123,
    [Type['hello-world']]: 'hello'
};

// Verify direct access works
const val1 = Type.Foo;  // OK
const val2 = Type['Foo'];  // OK
const val3 = Type['3x14'];  // OK


//// [enumComputedPropertyNonIdentifier.js]
"use strict";
// Issue #25083: Enum keys not accepted as computed properties if their name is not a valid identifier
var _a;
var Type;
(function (Type) {
    Type["Foo"] = "foo";
    Type["3x14"] = "3x14";
    Type["hello-world"] = "hello-world";
})(Type || (Type = {}));
// Verify the enum values work in actual objects
var obj1 = (_a = {},
    _a[Type.Foo] = 'test',
    _a[Type['3x14']] = 123,
    _a[Type['hello-world']] = 'hello',
    _a);
// Verify direct access works
var val1 = Type.Foo; // OK
var val2 = Type['Foo']; // OK
var val3 = Type['3x14']; // OK


//// [enumComputedPropertyNonIdentifier.d.ts]
declare enum Type {
    Foo = "foo",
    '3x14' = "3x14",
    'hello-world' = "hello-world"
}
type TypeMapDot = {
    [Type.Foo]: string;
};
type TypeMapBracketValid = {};
type TypeMapBracketNonIdentifier = {};
interface TestInterface {
    [Type.Foo]: string;
}
declare const obj1: Record<Type, any>;
declare const val1 = Type.Foo;
declare const val2 = Type.Foo;
declare const val3 = Type['3x14'];
