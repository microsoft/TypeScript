// @target: es5

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
