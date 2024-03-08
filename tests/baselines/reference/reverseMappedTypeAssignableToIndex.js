//// [tests/cases/compiler/reverseMappedTypeAssignableToIndex.ts] ////

//// [reverseMappedTypeAssignableToIndex.ts]
// Simple mapped type and inferrence
type Mapped<T> = { [K in keyof T]: { name: T[K] } };
type InferFromMapped<T> = T extends Mapped<infer R> ? R : never;

// Object literal type and associated mapped type
// Note that in the real code we don't have a direct reference to LiteralType
type LiteralType = {
	first: "first";
	second: "second";
}
type MappedLiteralType = {
	first: { name: "first" },
	second: { name: "second" },
};

type Inferred = InferFromMapped<MappedLiteralType>;

// UNEXPECTED resolves to false
type Test1 = Inferred extends Record<any, string> ? true : false;

//// [reverseMappedTypeAssignableToIndex.js]
