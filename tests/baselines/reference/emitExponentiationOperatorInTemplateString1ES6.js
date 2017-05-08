//// [emitExponentiationOperatorInTemplateString1ES6.ts]
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

//// [emitExponentiationOperatorInTemplateString1ES6.js]
var t1 = 10;
var t2 = 10;
var s;
// TempateHead & TemplateTail are empty
`${Math.pow(t1, t2)}`;
`${Math.pow(t1, Math.pow(t2, t1))}`;
`${t1 + Math.pow(t2, t1)}`;
`${Math.pow(t1, t2) + t1}`;
`${t1 + Math.pow(t2, t2) + t1}`;
`${typeof (Math.pow(t1, Math.pow(t2, t1)))}`;
`${1 + typeof (Math.pow(t1, Math.pow(t2, t1)))}`;
`${Math.pow(t1, t2)}${Math.pow(t1, t2)}`;
`${Math.pow(t1, Math.pow(t2, t1))}${Math.pow(t1, Math.pow(t2, t1))}`;
`${t1 + Math.pow(t2, t1)}${t1 + Math.pow(t2, t1)}`;
`${Math.pow(t1, t2) + t1}${Math.pow(t1, t2) + t1}`;
`${t1 + Math.pow(t2, t2) + t1}${t1 + Math.pow(t2, t2) + t1}`;
`${typeof (Math.pow(t1, Math.pow(t2, t1)))}${typeof (Math.pow(t1, Math.pow(t2, t1)))}`;
`${Math.pow(t1, t2)} hello world ${Math.pow(t1, t2)}`;
`${Math.pow(t1, Math.pow(t2, t1))} hello world ${Math.pow(t1, Math.pow(t2, t1))}`;
`${t1 + Math.pow(t2, t1)} hello world ${t1 + Math.pow(t2, t1)}`;
`${Math.pow(t1, t2) + t1} hello world ${Math.pow(t1, t2) + t1}`;
`${t1 + Math.pow(t2, t2) + t1} hello world ${t1 + Math.pow(t2, t2) + t1}`;
`${typeof (Math.pow(t1, Math.pow(t2, t1)))} hello world ${typeof (Math.pow(t1, Math.pow(t2, t1)))}`;
