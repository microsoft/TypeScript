//// [tests/cases/compiler/regexNamedGroupDuplicateNestedInGroup.ts] ////

//// [regexNamedGroupDuplicateNestedInGroup.ts]
// Duplicate at the top level (already reported prior to this fix).
/(?<a>x)(?<a>y)/;

// Earlier definition nested inside a non-capturing group.
/(?:(?<a>x))(?<a>z)/;

// Earlier definition nested inside a non-capturing group with alternation.
/(?:(?<a>x)|y)(?<a>z)/;

// Earlier definition nested inside a lookahead assertion.
/(?=(?<a>x))(?<a>z)/;

// Earlier definition nested inside a capturing group.
/((?<a>x))(?<a>z)/;

// Legal: duplicate names in different alternatives of the same disjunction.
/(?<a>x)|(?<a>y)/;

// Legal: duplicate names in different alternatives of a nested disjunction.
/(?:(?<a>x)|(?<a>y))/;


//// [regexNamedGroupDuplicateNestedInGroup.js]
"use strict";
// Duplicate at the top level (already reported prior to this fix).
/(?<a>x)(?<a>y)/;
// Earlier definition nested inside a non-capturing group.
/(?:(?<a>x))(?<a>z)/;
// Earlier definition nested inside a non-capturing group with alternation.
/(?:(?<a>x)|y)(?<a>z)/;
// Earlier definition nested inside a lookahead assertion.
/(?=(?<a>x))(?<a>z)/;
// Earlier definition nested inside a capturing group.
/((?<a>x))(?<a>z)/;
// Legal: duplicate names in different alternatives of the same disjunction.
/(?<a>x)|(?<a>y)/;
// Legal: duplicate names in different alternatives of a nested disjunction.
/(?:(?<a>x)|(?<a>y))/;
