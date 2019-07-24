type Foo<T> = { items: T };
type Other<U> = {};

const Something = [];

// Type argument, should show new error
type SomeFoo = Foo<Something>;

// Type alias
type SomeBar = Something;

// Nested type arguments, should show new error
type SomeOther = Other<Foo<Something>>;

// Misuse of value
const x: Something = [];

// Numeric literal type
type LiteralNumberFoo = Foo<1>;

// String literal type
type LiteralStringFoo = Foo<'test'>;