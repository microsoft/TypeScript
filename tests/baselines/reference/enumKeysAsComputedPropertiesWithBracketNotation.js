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

// Mixed chain: element access followed by property access
type TypeMap5 = {
    [nested['inner'].key]: string;
}

// Mixed chain: property access followed by element access
type TypeMap6 = {
    [nested.inner['key']]: string;
}

// Complex mixed chain
const deep = {
    a: {
        b: {
            c: {
                d: 'value' as const
            }
        }
    }
};

type TypeMap7 = {
    [deep.a['b'].c['d']]: string;
}

type TypeMap8 = {
    [deep['a'].b['c'].d]: string;
}

// Parenthesized expressions
type TypeMap9 = {
    [(nested.inner).key]: string;
}

type TypeMap10 = {
    [(nested['inner']).key]: string;
}

type TypeMap11 = {
    [(nested).inner.key]: string;
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
// Complex mixed chain
var deep = {
    a: {
        b: {
            c: {
                d: 'value'
            }
        }
    }
};
