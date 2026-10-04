//// [tests/cases/compiler/taggedTemplateNestedInvalidEscape.ts] ////

//// [taggedTemplateNestedInvalidEscape.ts]
declare function tag(template: TemplateStringsArray, ...substitutions: any[]): string;

// The outer tagged template should NOT be rewritten with __makeTemplateObject
// because only the inner tagged template contains an invalid escape.
tag`ok ${tag`\u`}`;

// The inner tagged template here has an invalid escape, but the outer one doesn't.
tag`fine ${tag`\x`} also fine`;

// This one should be rewritten because it has its own invalid escape.
tag`\u`;

// Nested with substitution, only inner is invalid.
tag`hello ${tag`\u{}`} world`;


//// [taggedTemplateNestedInvalidEscape.js]
"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
// The outer tagged template should NOT be rewritten with __makeTemplateObject
// because only the inner tagged template contains an invalid escape.
tag `ok ${tag(__makeTemplateObject([void 0], ["\\u"]))}`;
// The inner tagged template here has an invalid escape, but the outer one doesn't.
tag `fine ${tag(__makeTemplateObject([void 0], ["\\x"]))} also fine`;
// This one should be rewritten because it has its own invalid escape.
tag(__makeTemplateObject([void 0], ["\\u"]));
// Nested with substitution, only inner is invalid.
tag `hello ${tag(__makeTemplateObject([void 0], ["\\u{}"]))} world`;
