//// [tests/cases/conformance/types/stringLiteral/stringLiteralTypesOverloads04.ts] ////

//// [stringLiteralTypesOverloads04.ts]
declare function f(x: (p: "foo" | "bar") => "foo");

f(y => {
    const z = y = "foo";
    return z;
})

//// [stringLiteralTypesOverloads04.js]
f(y => {
    const z = y = "foo";
    return z;
});
