//// [tests/cases/conformance/es7/exponentiationOperator/emitExponentiationOperatorInTemplateString2.ts] ////

//// [emitExponentiationOperatorInTemplateString2.ts]
var t1 = 10;
var t2 = 10;
var s;

// With templateHead
`hello ${t1 ** t2}`;
`hello ${t1 ** t2 ** t1}`;
`hello ${t1 + t2 ** t1}`;
`hello ${t1 ** t2 + t1}`;
`hello ${t1 + t2 ** t2 + t1 }`;
`hello ${typeof (t1 ** t2 ** t1) }`;
`hello ${1 + typeof (t1 ** t2 ** t1) }`;

`hello ${t1 ** t2}${t1 ** t2}`;
`hello ${t1 ** t2 ** t1}${t1 ** t2 ** t1}`;
`hello ${t1 + t2 ** t1}${t1 + t2 ** t1}`;
`hello ${t1 ** t2 + t1}${t1 ** t2 + t1}`;
`hello ${t1 + t2 ** t2 + t1}${t1 + t2 ** t2 + t1}`;
`hello ${typeof (t1 ** t2 ** t1) }${typeof (t1 ** t2 ** t1) }`;

`hello ${t1 ** t2} hello world ${t1 ** t2}`;
`hello ${t1 ** t2 ** t1} hello world ${t1 ** t2 ** t1}`;
`hello ${t1 + t2 ** t1} hello world ${t1 + t2 ** t1}`;
`hello ${t1 ** t2 + t1} hello world ${t1 ** t2 + t1}`;
`hello ${t1 + t2 ** t2 + t1} hello world ${t1 + t2 ** t2 + t1}`;
`hello ${typeof (t1 ** t2 ** t1) } hello world ${typeof (t1 ** t2 ** t1) }`;

//// [emitExponentiationOperatorInTemplateString2.js]
var t1 = 10;
var t2 = 10;
var s;
// With templateHead
`hello ${t1 ** t2}`;
`hello ${t1 ** t2 ** t1}`;
`hello ${t1 + t2 ** t1}`;
`hello ${t1 ** t2 + t1}`;
`hello ${t1 + t2 ** t2 + t1}`;
`hello ${typeof (t1 ** t2 ** t1)}`;
`hello ${1 + typeof (t1 ** t2 ** t1)}`;
`hello ${t1 ** t2}${t1 ** t2}`;
`hello ${t1 ** t2 ** t1}${t1 ** t2 ** t1}`;
`hello ${t1 + t2 ** t1}${t1 + t2 ** t1}`;
`hello ${t1 ** t2 + t1}${t1 ** t2 + t1}`;
`hello ${t1 + t2 ** t2 + t1}${t1 + t2 ** t2 + t1}`;
`hello ${typeof (t1 ** t2 ** t1)}${typeof (t1 ** t2 ** t1)}`;
`hello ${t1 ** t2} hello world ${t1 ** t2}`;
`hello ${t1 ** t2 ** t1} hello world ${t1 ** t2 ** t1}`;
`hello ${t1 + t2 ** t1} hello world ${t1 + t2 ** t1}`;
`hello ${t1 ** t2 + t1} hello world ${t1 ** t2 + t1}`;
`hello ${t1 + t2 ** t2 + t1} hello world ${t1 + t2 ** t2 + t1}`;
`hello ${typeof (t1 ** t2 ** t1)} hello world ${typeof (t1 ** t2 ** t1)}`;
