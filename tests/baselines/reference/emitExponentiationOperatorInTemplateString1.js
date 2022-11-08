//// [emitExponentiationOperatorInTemplateString1.ts]
var t1 = 10;
var t2 = 10;
var s;

// TempateHead & TemplateTail are empty
`${t1 ** t2}`;
`${t1 ** t2 ** t1}`;
`${t1 + t2 ** t1}`;
`${t1 ** t2 + t1}`;
`${t1 + t2 ** t2 + t1 }`;
`${typeof (t1 ** t2 ** t1) }`;
`${1 + typeof (t1 ** t2 ** t1) }`;

`${t1 ** t2}${t1 ** t2}`;
`${t1 ** t2 ** t1}${t1 ** t2 ** t1}`;
`${t1 + t2 ** t1}${t1 + t2 ** t1}`;
`${t1 ** t2 + t1}${t1 ** t2 + t1}`;
`${t1 + t2 ** t2 + t1}${t1 + t2 ** t2 + t1}`;
`${typeof (t1 ** t2 ** t1)}${typeof (t1 ** t2 ** t1)}`;

`${t1 ** t2} hello world ${t1 ** t2}`;
`${t1 ** t2 ** t1} hello world ${t1 ** t2 ** t1}`;
`${t1 + t2 ** t1} hello world ${t1 + t2 ** t1}`;
`${t1 ** t2 + t1} hello world ${t1 ** t2 + t1}`;
`${t1 + t2 ** t2 + t1} hello world ${t1 + t2 ** t2 + t1}`;
`${typeof (t1 ** t2 ** t1) } hello world ${typeof (t1 ** t2 ** t1) }`;

//// [emitExponentiationOperatorInTemplateString1.js]
var t1 = 10;
var t2 = 10;
var s;
// TempateHead & TemplateTail are empty
"".concat(Math.pow(t1, t2));
"".concat(Math.pow(t1, Math.pow(t2, t1)));
"".concat(t1 + Math.pow(t2, t1));
"".concat(Math.pow(t1, t2) + t1);
"".concat(t1 + Math.pow(t2, t2) + t1);
"".concat(typeof (Math.pow(t1, Math.pow(t2, t1))));
"".concat(1 + typeof (Math.pow(t1, Math.pow(t2, t1))));
"".concat(Math.pow(t1, t2)).concat(Math.pow(t1, t2));
"".concat(Math.pow(t1, Math.pow(t2, t1))).concat(Math.pow(t1, Math.pow(t2, t1)));
"".concat(t1 + Math.pow(t2, t1)).concat(t1 + Math.pow(t2, t1));
"".concat(Math.pow(t1, t2) + t1).concat(Math.pow(t1, t2) + t1);
"".concat(t1 + Math.pow(t2, t2) + t1).concat(t1 + Math.pow(t2, t2) + t1);
"".concat(typeof (Math.pow(t1, Math.pow(t2, t1)))).concat(typeof (Math.pow(t1, Math.pow(t2, t1))));
"".concat(Math.pow(t1, t2), " hello world ").concat(Math.pow(t1, t2));
"".concat(Math.pow(t1, Math.pow(t2, t1)), " hello world ").concat(Math.pow(t1, Math.pow(t2, t1)));
"".concat(t1 + Math.pow(t2, t1), " hello world ").concat(t1 + Math.pow(t2, t1));
"".concat(Math.pow(t1, t2) + t1, " hello world ").concat(Math.pow(t1, t2) + t1);
"".concat(t1 + Math.pow(t2, t2) + t1, " hello world ").concat(t1 + Math.pow(t2, t2) + t1);
"".concat(typeof (Math.pow(t1, Math.pow(t2, t1))), " hello world ").concat(typeof (Math.pow(t1, Math.pow(t2, t1))));
