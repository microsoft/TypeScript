//// [constraintSatisfactionWithAny2.js]
// errors expected for type parameter cannot be referenced in the constraints of the same list
// any is not a valid type argument unless there is no constraint, or the constraint is any
var a;

foo(a);
foo(a);
