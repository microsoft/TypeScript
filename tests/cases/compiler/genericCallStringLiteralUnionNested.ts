declare function nestedUnionExtendsString<A extends string>(a: { fields: A | A[] }): Record<A, string>;
const t1: {z: string} = nestedUnionExtendsString({ fields: "z" });

declare function nestedUnionExtendsLiterals<A extends "z" | "y">(a: { fields: A | A[] }): A[];
const t2: "z"[] = nestedUnionExtendsLiterals({ fields: "z" });

declare function nestedGenericIntersection<A extends B & C, B extends string, C extends string>(a: { fields: A | A[] }, b: B[], c: C[]): A[];
const t3: "z"[] = nestedGenericIntersection({ fields: "z" }, ["z", "y"], ["z", "y"]);

declare function nestedUnionExtendsNumber<A extends number>(a: { fields: A | A[] }): A[];
const t4: 1[] = nestedUnionExtendsNumber({ fields: 1 });

declare function nestedUnionExtendsLiteralsNumber<A extends 1 | 2>(a: { fields: A | A[] }): A[];
const t5: 2[] = nestedUnionExtendsLiteralsNumber({ fields: 2 });

declare function nestedUnionIntersectionGenericNumber<A extends B & C, B extends number, C extends number>(a: { fields: A | A[] }, b: B[], c: C[]): A[];
const t6: 3[] = nestedUnionIntersectionGenericNumber({ fields: 3 }, [1, 3], [1, 3]);


// The following are expected to fail because they don't have an extend string or extend number generic constraint.

declare function nestedUnionPlain<A>(a: { fields: A | A[] }): A[];
const expectedFail1: "z"[] = nestedUnionPlain({ fields: "z" });
const expectedFail2: 1[] = nestedUnionPlain({ fields: 1 });

declare function nestedUnionIntersectionPlainGenerics<A extends B & C, B, C>(a: { fields: A | A[] }, b: B[], c: C[]): A[];
const expectedFail3: "z"[] = nestedUnionIntersectionPlainGenerics({ fields: "z" }, ["z", "y"], ["z", "y"]);
const expectedFail4: 3[] = nestedUnionIntersectionPlainGenerics({ fields: 3 }, [1, 3], [1, 3]);
