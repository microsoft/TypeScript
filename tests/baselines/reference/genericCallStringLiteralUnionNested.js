//// [genericCallStringLiteralUnionNested.ts]
declare function nestedUnion<A extends string>(a: { fields: A | A[] }): Record<A, string>;
const result: {z: string} = nestedUnion({ fields: "z" });


//// [genericCallStringLiteralUnionNested.js]
var result = nestedUnion({ fields: "z" });
