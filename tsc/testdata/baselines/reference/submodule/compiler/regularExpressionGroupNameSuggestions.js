//// [tests/cases/compiler/regularExpressionGroupNameSuggestions.ts] ////

//// [regularExpressionGroupNameSuggestions.ts]
const regex = /(?<foo>)\k<Foo>/;


//// [regularExpressionGroupNameSuggestions.js]
const regex = /(?<foo>)\k<Foo>/;
