// @exactOptionalPropertyTypes: true
// @noEmit: true

// When strict is not specified, it defaults to true in TS 6.0.
// strictNullChecks is effectively true, so exactOptionalPropertyTypes
// should work without producing TS5052.

interface Foo {
    bar?: string;
}

const foo: Foo = {};
