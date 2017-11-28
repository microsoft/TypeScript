// https://github.com/Microsoft/TypeScript/issues/19632
declare function direct<A extends string>(a: A | A[]): Record<A, string>
declare function nested<A extends string>(a: { fields: A }): Record<A, string>
declare function nestedUnion<A extends string>(a: { fields: A | A[] }): Record<A, string>

const directUnionSingle = direct("z")
const directUnionArray = direct(["z", "y"])
const nestedSingle = nested({fields: "z"})
const nestedUnionSingle = nestedUnion({fields: "z"})
const nestedUnionArray = nestedUnion({fields: ["z", "y"]})

declare function hasZField(arg: { z: string }): void

hasZField(directUnionSingle) // ok
hasZField(directUnionArray) // ok
hasZField(nestedSingle) // ok
hasZField(nestedUnionSingle) // ok
hasZField(nestedUnionArray) // ok
