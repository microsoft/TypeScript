//// [valueUsedAsTypeArgument.ts]
type Foo<T> = { items: T };

const Something = [];

type SomeFoo = Foo<Something>;
type SomeBar = Something;

const x: Something = [];

type LiteralNumberFoo = Foo<1>;
type LiteralStringFoo = Foo<'test'>;

//// [valueUsedAsTypeArgument.js]
var Something = [];
var x = [];
