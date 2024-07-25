//// [tests/cases/compiler/regularExpressionGroupNameSuggestions.ts] ////

//// [regularExpressionGroupNameSuggestions.ts]
const regex = /(?<foo>)\k<Foo>/;


//// [regularExpressionGroupNameSuggestions.js]
var regex = /(?<foo>)\k<Foo>/;
