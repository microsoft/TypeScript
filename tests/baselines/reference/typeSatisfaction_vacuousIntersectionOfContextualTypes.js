//// [tests/cases/conformance/expressions/typeSatisfaction/typeSatisfaction_vacuousIntersectionOfContextualTypes.ts] ////

//// [typeSatisfaction_vacuousIntersectionOfContextualTypes.ts]
const a: "baz" = "foo" satisfies "foo" | "bar";
const b: { xyz: "baz" } = { xyz: "foo" } satisfies { xyz: "foo" | "bar" };


//// [typeSatisfaction_vacuousIntersectionOfContextualTypes.js]
const a = "foo";
const b = { xyz: "foo" };
