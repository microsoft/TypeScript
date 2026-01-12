// @declaration: true
// @strict: true

// Test for issue #25083: Enum keys should be accepted as computed properties
// when using bracket notation

enum Type {
    Foo = 'foo',
    Bar = 'bar',
    '3x14' = '3x14', // Non-identifier name
    '0digit' = '0digit' // Starts with digit
}

// These should all work - dot notation (already works)
type TypeMapDot = {
    [Type.Foo]: string;
    [Type.Bar]: number;
}

// These should also work - bracket notation with identifier names
type TypeMapBracketIdentifier = {
    [Type['Foo']]: string;
    [Type['Bar']]: number;
}

// These should work - bracket notation with non-identifier names
// This is the main fix for #25083
type TypeMapBracketNonIdentifier = {
    [Type['3x14']]: boolean;
    [Type['0digit']]: object;
}

// Mixed usage should also work
type TypeMapMixed = {
    [Type.Foo]: string;
    [Type['Bar']]: number;
    [Type['3x14']]: boolean;
}

// Should work with const enums too
const enum ConstType {
    Alpha = 'alpha',
    '2beta' = '2beta'
}

type ConstTypeMap = {
    [ConstType.Alpha]: string;
    [ConstType['Alpha']]: string;
    [ConstType['2beta']]: number;
}

// Verify that the types work correctly at runtime level
const dotNotation: TypeMapDot = {
    [Type.Foo]: 'test',
    [Type.Bar]: 123
};

const bracketNotation: TypeMapBracketIdentifier = {
    [Type['Foo']]: 'test',
    [Type['Bar']]: 456
};

const nonIdentifierBracket: TypeMapBracketNonIdentifier = {
    [Type['3x14']]: true,
    [Type['0digit']]: {}
};

const mixed: TypeMapMixed = {
    [Type.Foo]: 'test',
    [Type['Bar']]: 789,
    [Type['3x14']]: false
};
