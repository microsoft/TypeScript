//// [inferentialTypingWithFunctionTypeSyntacticScenarios.ts]
declare function map<T, U>(array: T, func: (x: T) => U): U;
declare function identity<V>(y: V): V;
var s: string;

// dotted name
var dottedIdentity = { x: identity };
s = map("", dottedIdentity.x);

// index expression
s = map("", dottedIdentity['x']);

// function call
s = map("", (() => identity)());

// construct
interface IdentityConstructor {
    new (): typeof identity;
}
var ic: IdentityConstructor;
s = map("", new ic());

// assignment
var t;
s = map("", t = identity);

// type assertion
s = map("", <typeof identity>identity);

// parenthesized expression
s = map("", (identity));

// comma
s = map("", ("", identity));

//// [inferentialTypingWithFunctionTypeSyntacticScenarios.js]
var s;
// dotted name
var dottedIdentity = { x: identity };
s = map("", dottedIdentity.x);
// index expression
s = map("", dottedIdentity['x']);
// function call
s = map("", (function () { return identity; })());
var ic;
s = map("", new ic());
// assignment
var t;
s = map("", t = identity);
// type assertion
s = map("", identity);
// parenthesized expression
s = map("", (identity));
// comma
s = map("", ("", identity));
