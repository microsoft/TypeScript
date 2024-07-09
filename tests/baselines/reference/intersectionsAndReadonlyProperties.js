//// [tests/cases/compiler/intersectionsAndReadonlyProperties.ts] ////

//// [intersectionsAndReadonlyProperties.ts]
// readonly and non-readonly
type Intersection1 = { readonly a: number } & { a: number };
declare let i1: Intersection1;

i1.a = 2;

// getter and setter
type Intersection2 = { get a(): number } & { set a(v: number) };
declare let i2: Intersection2;

i2.a = 2;

// assignment to an all read-only property should still be disallowed
type IntersectionAllReadonly = { readonly a: number } & { get a(): number };
declare let ia: IntersectionAllReadonly;

ia.a = 2; // Error


//// [intersectionsAndReadonlyProperties.js]
i1.a = 2;
i2.a = 2;
ia.a = 2; // Error
