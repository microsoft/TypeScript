//// [tests/cases/conformance/es7/exponentiationOperator/emitExponentiationOperatorInTemplateString3.ts] ////

//// [emitExponentiationOperatorInTemplateString3.ts]
var t1 = 10;
var t2 = 10;
var s;

// With TemplateTail
`${t1 ** t2} world`;
`${t1 ** t2 ** t1} world`;
`${t1 + t2 ** t1} world`;
`${t1 ** t2 + t1} world`;
`${t1 + t2 ** t2 + t1 } world`;
`${typeof (t1 ** t2 ** t1) } world`;
`${1 + typeof (t1 ** t2 ** t1) } world`;

`${t1 ** t2}${t1 ** t2} world`;
`${t1 ** t2 ** t1}${t1 ** t2 ** t1} world`;
`${t1 + t2 ** t1}${t1 + t2 ** t1} world`;
`${t1 ** t2 + t1}${t1 ** t2 + t1} world`;
`${t1 + t2 ** t2 + t1}${t1 + t2 ** t2 + t1} world`;
`${typeof (t1 ** t2 ** t1) }${typeof (t1 ** t2 ** t1) } world`;

`${t1 ** t2} hello world ${t1 ** t2} !!`;
`${t1 ** t2 ** t1} hello world ${t1 ** t2 ** t1} !!`;
`${t1 + t2 ** t1} hello world ${t1 + t2 ** t1} !!`;
`${t1 ** t2 + t1} hello world ${t1 ** t2 + t1} !!`;
`${t1 + t2 ** t2 + t1} hello world ${t1 + t2 ** t2 + t1} !!`;
`${typeof (t1 ** t2 ** t1) } hello world ${typeof (t1 ** t2 ** t1)} !!`;


//// [emitExponentiationOperatorInTemplateString3.js]
var t1 = 10;
var t2 = 10;
var s;
// With TemplateTail
"".concat(Math.pow(t1, t2), " world");
"".concat(Math.pow(t1, Math.pow(t2, t1)), " world");
"".concat(t1 + Math.pow(t2, t1), " world");
"".concat(Math.pow(t1, t2) + t1, " world");
"".concat(t1 + Math.pow(t2, t2) + t1, " world");
"".concat(typeof (Math.pow(t1, Math.pow(t2, t1))), " world");
"".concat(1 + typeof (Math.pow(t1, Math.pow(t2, t1))), " world");
"".concat(Math.pow(t1, t2)).concat(Math.pow(t1, t2), " world");
"".concat(Math.pow(t1, Math.pow(t2, t1))).concat(Math.pow(t1, Math.pow(t2, t1)), " world");
"".concat(t1 + Math.pow(t2, t1)).concat(t1 + Math.pow(t2, t1), " world");
"".concat(Math.pow(t1, t2) + t1).concat(Math.pow(t1, t2) + t1, " world");
"".concat(t1 + Math.pow(t2, t2) + t1).concat(t1 + Math.pow(t2, t2) + t1, " world");
"".concat(typeof (Math.pow(t1, Math.pow(t2, t1)))).concat(typeof (Math.pow(t1, Math.pow(t2, t1))), " world");
"".concat(Math.pow(t1, t2), " hello world ").concat(Math.pow(t1, t2), " !!");
"".concat(Math.pow(t1, Math.pow(t2, t1)), " hello world ").concat(Math.pow(t1, Math.pow(t2, t1)), " !!");
"".concat(t1 + Math.pow(t2, t1), " hello world ").concat(t1 + Math.pow(t2, t1), " !!");
"".concat(Math.pow(t1, t2) + t1, " hello world ").concat(Math.pow(t1, t2) + t1, " !!");
"".concat(t1 + Math.pow(t2, t2) + t1, " hello world ").concat(t1 + Math.pow(t2, t2) + t1, " !!");
"".concat(typeof (Math.pow(t1, Math.pow(t2, t1))), " hello world ").concat(typeof (Math.pow(t1, Math.pow(t2, t1))), " !!");
