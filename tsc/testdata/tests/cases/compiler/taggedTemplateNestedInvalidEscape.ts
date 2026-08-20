// @target: es2015
// @strict: true
// @module: esnext

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
