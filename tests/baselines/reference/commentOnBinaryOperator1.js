//// [tests/cases/compiler/commentOnBinaryOperator1.ts] ////

//// [commentOnBinaryOperator1.ts]
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

//// [commentOnBinaryOperator1.js]
"use strict";
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
