//// [tests/cases/compiler/enumKeysAsComputedPropertiesWithBracketNotation.ts] ////

//// [enumKeysAsComputedPropertiesWithBracketNotation.ts]
// Test that enum keys accessed with bracket notation can be used as computed properties
// Regression test for https://github.com/microsoft/TypeScript/issues/25083

enum Type {
    Foo = 'foo',
    '3x14' = '3x14'
}

// All of these should work
type TypeMap = {
    [Type.Foo]: string;        // Property access
    [Type['3x14']]: number;    // Element access with non-identifier key
}

// Bracket notation with identifier key should also work (equivalent to property access)
type TypeMap2 = {
    [Type['Foo']]: boolean;
}

// Nested element access should work
const nested = {
    inner: {
        key: 'hello' as const
    }
};

type TypeMap3 = {
    [nested.inner.key]: string;
}

// Element access on deeply nested path
type TypeMap4 = {
    [nested['inner']['key']]: string;
}


//// [enumKeysAsComputedPropertiesWithBracketNotation.js]
"use strict";
// Test that enum keys accessed with bracket notation can be used as computed properties
// Regression test for https://github.com/microsoft/TypeScript/issues/25083
var Type;
(function (Type) {
    Type["Foo"] = "foo";
    Type["3x14"] = "3x14";
})(Type || (Type = {}));
// Nested element access should work
var nested = {
    inner: {
        key: 'hello'
    }
};
