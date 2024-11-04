//// [tests/cases/compiler/regularExpressionDuplicateCapturingGroupName.ts] ////

//// [regularExpressionDuplicateCapturingGroupName.ts]
// Adjacent homonymous capturing groups
/(?<foo>)(?<foo>)/;
/(?<foo>)((?<foo>))/;
/((?<foo>))(?<foo>)/;
/((?<foo>))((?<foo>))/;
/(?<foo>)(?=(?<foo>))/;
/(?<=(?<foo>))(?<foo>)/;
/(?<foo>)(?!(?<foo>))/;
/(?<!(?<foo>))(?<foo>)/;

/((?<foo>))((?=(?<foo>)))/;
/((?<!(?<foo>)))((?<foo>))/;

/(?=(?<foo>))(?=(?<foo>))/;
/(?!(?<foo>))(?!(?<foo>))/;
/(?=(?<foo>))(?!(?<foo>))/;

// Nested homonymous capturing groups
/(?<foo>(?<foo>))/;
/(?<foo>((?<foo>)))/;

// Complicated cases
/(?<a>)((?<b>)((?<c>)|(?<d>))|(?<b>)|((?<c>)))(?<c>)((?<b>)|(?<d>))/;
/(?<a>)(((?<b>)|(?<c>))((?<d>)|(?<a>)|(?<b>))|(?<c>)|((?<d>)))(?<a>)(((?<b>)|(?<c>))|(?<d>))/;

// Should not error
/(?<foo>)|(?<foo>)/;
/(?<foo>)|((?<foo>))/;
/((?<foo>))|(?<foo>)/;
/((?<foo>))|((?<foo>))/;


//// [regularExpressionDuplicateCapturingGroupName.js]
"use strict";
// Adjacent homonymous capturing groups
/(?<foo>)(?<foo>)/;
/(?<foo>)((?<foo>))/;
/((?<foo>))(?<foo>)/;
/((?<foo>))((?<foo>))/;
/(?<foo>)(?=(?<foo>))/;
/(?<=(?<foo>))(?<foo>)/;
/(?<foo>)(?!(?<foo>))/;
/(?<!(?<foo>))(?<foo>)/;
/((?<foo>))((?=(?<foo>)))/;
/((?<!(?<foo>)))((?<foo>))/;
/(?=(?<foo>))(?=(?<foo>))/;
/(?!(?<foo>))(?!(?<foo>))/;
/(?=(?<foo>))(?!(?<foo>))/;
// Nested homonymous capturing groups
/(?<foo>(?<foo>))/;
/(?<foo>((?<foo>)))/;
// Complicated cases
/(?<a>)((?<b>)((?<c>)|(?<d>))|(?<b>)|((?<c>)))(?<c>)((?<b>)|(?<d>))/;
/(?<a>)(((?<b>)|(?<c>))((?<d>)|(?<a>)|(?<b>))|(?<c>)|((?<d>)))(?<a>)(((?<b>)|(?<c>))|(?<d>))/;
// Should not error
/(?<foo>)|(?<foo>)/;
/(?<foo>)|((?<foo>))/;
/((?<foo>))|(?<foo>)/;
/((?<foo>))|((?<foo>))/;
