//// [tests/cases/conformance/es6/templates/taggedTemplateWithConstructableTag01.ts] ////

//// [taggedTemplateWithConstructableTag01.ts]
class CtorTag { }

CtorTag `Hello world!`;

//// [taggedTemplateWithConstructableTag01.js]
class CtorTag {
}
CtorTag `Hello world!`;
