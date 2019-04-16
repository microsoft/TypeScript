//// [inlineTypeAliasNoSpuriousCircularityError.ts]
type Something<T> = type Q = T extends number ? {x: Q} : never;

type Foo = Something<number>;


//// [inlineTypeAliasNoSpuriousCircularityError.js]
