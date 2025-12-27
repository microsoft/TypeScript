// @strict: true
// @declaration: true

// Test that export scenario with enum bracket notation doesn't crash
// This tests the trackComputedName -> getFirstIdentifier path

enum Type {
    Foo = 'foo',
    '3x14' = '3x14'
}

// Export interface with bracket notation computed property
// This should trigger the tracker path
export interface TypeMap {
    [Type['3x14']]: number;
}

export type TypeMap2 = {
    [Type['3x14']]: string;
}
