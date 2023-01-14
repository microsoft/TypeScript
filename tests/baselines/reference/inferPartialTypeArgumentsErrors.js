//// [inferPartialTypeArgumentsErrors.ts]
declare function testConstraints1<A extends string, preferinfer B extends A>(arg?: {
  a?: A[];
  b?: B[];
}): { a: A[]; b: B[] };
const expectError1 = testConstraints1<"z">({ b: ["x", "y"] });

declare function testConstraints2<A extends B, preferinfer B extends string>(arg?: {
  a?: A[];
  b?: B[];
}): { a: A[]; b: B[] };
const expectAllowed1 = testConstraints2<"x">({ b: ["x", "y"] });
const expectError2 = testConstraints2<"z">({ b: ["x", "y"] });

declare function testConstraints3<A extends string, preferinfer B extends A>(arg?: {
  a?: A[];
  b?: B[];
}): { a: A[]; b: B[] };
const expectAllowed3 = testConstraints3<"x" | "y">({ b: ["x"] });
const expectError3 = testConstraints3<"x" | "y">({ b: ["x", "y", "z"] });

declare function complexConstraints1<
  A extends string,
  preferinfer B extends A,
  preferinfer C extends B
>(arg: { a?: A[]; b?: B[]; c?: C[] }): { a: A[]; b: B[]; c: C[] };
const expectAllowed4 = complexConstraints1<"x" | "y" | "z">({
  a: ["x"],
  c: ["x", "y"],
});
const expectError5 = complexConstraints1<"x">({ c: ["y"] });

declare function complexConstraints2<
  A extends string,
  preferinfer B extends C,
  preferinfer C extends A
>(arg: { a?: A[]; b?: B[]; c?: C[] }): { a: A[]; b: B[]; c: C[] };
const expectError4 = complexConstraints2<"x" | "y" | "z", "x" | "y">({
  c: ["x"],
});


//// [inferPartialTypeArgumentsErrors.js]
"use strict";
var expectError1 = testConstraints1({ b: ["x", "y"] });
var expectAllowed1 = testConstraints2({ b: ["x", "y"] });
var expectError2 = testConstraints2({ b: ["x", "y"] });
var expectAllowed3 = testConstraints3({ b: ["x"] });
var expectError3 = testConstraints3({ b: ["x", "y", "z"] });
var expectAllowed4 = complexConstraints1({
    a: ["x"],
    c: ["x", "y"],
});
var expectError5 = complexConstraints1({ c: ["y"] });
var expectError4 = complexConstraints2({
    c: ["x"],
});


//// [inferPartialTypeArgumentsErrors.d.ts]
declare function testConstraints1<A extends string, preferinfer B extends A>(arg?: {
    a?: A[];
    b?: B[];
}): {
    a: A[];
    b: B[];
};
declare const expectError1: {
    a: "z"[];
    b: A[];
};
declare function testConstraints2<A extends B, preferinfer B extends string>(arg?: {
    a?: A[];
    b?: B[];
}): {
    a: A[];
    b: B[];
};
declare const expectAllowed1: {
    a: "x"[];
    b: ("x" | "y")[];
};
declare const expectError2: {
    a: "z"[];
    b: ("x" | "y")[];
};
declare function testConstraints3<A extends string, preferinfer B extends A>(arg?: {
    a?: A[];
    b?: B[];
}): {
    a: A[];
    b: B[];
};
declare const expectAllowed3: {
    a: ("x" | "y")[];
    b: "x"[];
};
declare const expectError3: {
    a: ("x" | "y")[];
    b: A[];
};
declare function complexConstraints1<A extends string, preferinfer B extends A, preferinfer C extends B>(arg: {
    a?: A[];
    b?: B[];
    c?: C[];
}): {
    a: A[];
    b: B[];
    c: C[];
};
declare const expectAllowed4: {
    a: ("z" | "x" | "y")[];
    b: ("z" | "x" | "y")[];
    c: ("x" | "y")[];
};
declare const expectError5: {
    a: "x"[];
    b: A[];
    c: B[];
};
declare function complexConstraints2<A extends string, preferinfer B extends C, preferinfer C extends A>(arg: {
    a?: A[];
    b?: B[];
    c?: C[];
}): {
    a: A[];
    b: B[];
    c: C[];
};
declare const expectError4: {
    a: ("z" | "x" | "y")[];
    b: ("x" | "y")[];
    c: "x"[];
};
