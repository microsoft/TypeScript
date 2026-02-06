//// [tests/cases/compiler/regularExpressionUnicodePropertyValueExpressionSuggestions.ts] ////

//// [regularExpressionUnicodePropertyValueExpressionSuggestions.ts]
const regex = /\p{ascii}\p{Sc=Unknown}\p{sc=unknownX}\p{Script_Declensions=Inherited}\p{scx=inherit}/u;


//// [regularExpressionUnicodePropertyValueExpressionSuggestions.js]
"use strict";
var regex = /\p{ascii}\p{Sc=Unknown}\p{sc=unknownX}\p{Script_Declensions=Inherited}\p{scx=inherit}/u;
