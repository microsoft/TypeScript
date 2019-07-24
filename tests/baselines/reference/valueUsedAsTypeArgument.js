//// [valueUsedAsTypeArgument.ts]
type Foo<T> = { items: T };

const Something = [];

type SomeFoo = Foo<Something>;

const x: Something = [];

//// [valueUsedAsTypeArgument.js]
var Something = [];
var x = [];
