//// [tests/cases/compiler/regularExpressionGroupNameSuggestions.ts] ////

//// [regularExpressionGroupNameSuggestions.ts]
const regex = /(?<foo>)\k<Foo>/;


//// [regularExpressionGroupNameSuggestions.js]
"use strict";
const regex = /(?<foo>)\k<Foo>/;
