//// [commentOnBinaryOperator2.ts]
var a = 'some'
    // comment
    + 'text';

var b = 'some'
    /* comment */
    + 'text';

var c = 'some'
    /* comment */
    + /*comment1*/
    'text';

//// [commentOnBinaryOperator2.js]
var a = 'some'
    + 'text';
var b = 'some'
    + 'text';
var c = 'some'
    +
        'text';
