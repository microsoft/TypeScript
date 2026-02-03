//// [tests/cases/conformance/es7/exponentiationOperator/emitExponentiationOperatorInTempalteString4.ts] ////

//// [emitExponentiationOperatorInTempalteString4.ts]
var t1 = 10;
var t2 = 10;
var s;

// With TemplateTail
`${t1 ** -t2} world`;
`${(-t1) ** t2 - t1} world`;
`${(-++t1) ** t2 - t1} world`;
`${(-t1++) ** t2 - t1} world`;
`${(~t1) ** t2 ** --t1 } world`;
`${typeof (t1 ** t2 ** t1) } world`;

// TempateHead & TemplateTail are empt
`${t1 ** -t2} hello world ${t1 ** -t2}`;
`${(-t1) ** t2 - t1} hello world ${(-t1) ** t2 - t1}`;
`${(-++t1) ** t2 - t1} hello world ${t1 ** (-++t1) **- t1}`;
`${(-t1++) ** t2 - t1} hello world ${t2 ** (-t1++) **  - t1}`;
`${(~t1) ** t2 ** --t1 } hello world ${(~t1) ** t2 ** --t1 }`;
`${typeof (t1 ** t2 ** t1)} hello world ${typeof (t1 ** t2 ** t1)}`;

// With templateHead
`hello ${(-t1) ** t2 - t1}`;
`hello ${(-++t1) ** t2 - t1}`;
`hello ${(-t1++) ** t2 - t1}`;
`hello ${(~t1) ** t2 ** --t1 }`;
`hello ${typeof (t1 ** t2 ** t1)}`;

//// [emitExponentiationOperatorInTempalteString4.js]
var t1 = 10;
var t2 = 10;
var s;
// With TemplateTail
"".concat(Math.pow(t1, -t2), " world");
"".concat(Math.pow((-t1), t2) - t1, " world");
"".concat(Math.pow((-++t1), t2) - t1, " world");
"".concat(Math.pow((-t1++), t2) - t1, " world");
"".concat(Math.pow((~t1), Math.pow(t2, --t1)), " world");
"".concat(typeof (Math.pow(t1, Math.pow(t2, t1))), " world");
// TempateHead & TemplateTail are empt
"".concat(Math.pow(t1, -t2), " hello world ").concat(Math.pow(t1, -t2));
"".concat(Math.pow((-t1), t2) - t1, " hello world ").concat(Math.pow((-t1), t2) - t1);
"".concat(Math.pow((-++t1), t2) - t1, " hello world ").concat(Math.pow(t1, Math.pow((-++t1), -t1)));
"".concat(Math.pow((-t1++), t2) - t1, " hello world ").concat(Math.pow(t2, Math.pow((-t1++), -t1)));
"".concat(Math.pow((~t1), Math.pow(t2, --t1)), " hello world ").concat(Math.pow((~t1), Math.pow(t2, --t1)));
"".concat(typeof (Math.pow(t1, Math.pow(t2, t1))), " hello world ").concat(typeof (Math.pow(t1, Math.pow(t2, t1))));
// With templateHead
"hello ".concat(Math.pow((-t1), t2) - t1);
"hello ".concat(Math.pow((-++t1), t2) - t1);
"hello ".concat(Math.pow((-t1++), t2) - t1);
"hello ".concat(Math.pow((~t1), Math.pow(t2, --t1)));
"hello ".concat(typeof (Math.pow(t1, Math.pow(t2, t1))));
