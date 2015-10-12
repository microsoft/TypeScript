// @target: es5

var t1 = 10;
var t2 = 10;
var s;

// Error: early syntax error using ES7 SimpleUnaryExpression on left-hand side without ()
// TempateHead & TemplateTail are empty
`${1 + typeof t1 ** t2 ** t1}`;
`${-t1 ** t2 - t1}`;
`${-++t1 ** t2 - t1}`;
`${-t1++ ** t2 - t1}`;
`${!t1 ** t2 ** --t1 }`;
`${typeof t1 ** t2 ** t1}`;

`${-t1 ** t2 - t1}${-t1 ** t2 - t1}`;
`${-++t1 ** t2 - t1}${-++t1 ** t2 - t1}`;
`${-t1++ ** t2 - t1}${-t1++ ** t2 - t1}`;
`${!t1 ** t2 ** --t1 }${!t1 ** t2 ** --t1 }`;
`${typeof t1 ** t2 ** t1}${typeof t1 ** t2 ** t1}`;
`${1 + typeof t1 ** t2 ** t1}${1 + typeof t1 ** t2 ** t1}`;

`${-t1 ** t2 - t1} hello world ${-t1 ** t2 - t1}`;
`${-++t1 ** t2 - t1} hello world ${-++t1 ** t2 - t1}`;
`${-t1++ ** t2 - t1} hello world ${-t1++ ** t2 - t1}`;
`${!t1 ** t2 ** --t1 } hello world ${!t1 ** t2 ** --t1 }`;
`${typeof t1 ** t2 ** t1} hello world ${typeof t1 ** t2 ** t1}`;
`${1 + typeof t1 ** t2 ** t1} hello world ${1 + typeof t1 ** t2 ** t1}`;