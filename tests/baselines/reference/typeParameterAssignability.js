//// [tests/cases/conformance/types/typeRelationships/assignmentCompatibility/typeParameterAssignability.ts] ////

//// [typeParameterAssignability.ts]
// type parameters are not assignable to one another unless directly or indirectly constrained to one another

function foo<T, U>(t: T, u: U) {
    t = u; // error
    u = t; // error
}

//// [typeParameterAssignability.js]
// type parameters are not assignable to one another unless directly or indirectly constrained to one another
function foo(t, u) {
    t = u; // error
    u = t; // error
}
