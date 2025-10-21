// @strict: true
// @declaration: true

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
