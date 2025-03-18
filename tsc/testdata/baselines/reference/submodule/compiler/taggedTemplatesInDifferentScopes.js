//// [tests/cases/compiler/taggedTemplatesInDifferentScopes.ts] ////

//// [taggedTemplatesInDifferentScopes.ts]
export function tag(parts: TemplateStringsArray, ...values: any[]) {
    return parts[0];
}
function foo() {
    tag `foo`;
    tag `foo2`;
}

function bar() {
    tag `bar`;
    tag `bar2`;
}

foo();
bar();


//// [taggedTemplatesInDifferentScopes.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tag = tag;
function tag(parts, ...values) {
    return parts[0];
}
function foo() {
    tag `foo`;
    tag `foo2`;
}
function bar() {
    tag `bar`;
    tag `bar2`;
}
foo();
bar();
