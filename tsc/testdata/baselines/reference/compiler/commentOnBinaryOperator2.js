//// [tests/cases/compiler/commentOnBinaryOperator2.ts] ////

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
"use strict";
var a = 'some'
    + 'text';
var b = 'some'
    + 'text';
var c = 'some'
    +
        'text';
