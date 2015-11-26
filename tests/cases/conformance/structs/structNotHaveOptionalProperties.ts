/**
 * inspired by conformance/types/objectTypeLiteral/methodSignatures/objectTypesWithOptionalProperties
 */

interface I {
	x?: number; // ok
}

class C {
	x?: number; // error, cannot be declared optional
}

struct S {
	x?: number; // error, cannot be declared optional
}
