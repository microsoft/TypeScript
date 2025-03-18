//// [tests/cases/conformance/expressions/optionalChaining/taggedTemplateChain/taggedTemplateChain.ts] ////

//// [taggedTemplateChain.ts]
declare let a: any;
a?.`b`;

a?.`b${1}c`;

//// [taggedTemplateChain.js]
a `b`;
a `b${1}c`;
