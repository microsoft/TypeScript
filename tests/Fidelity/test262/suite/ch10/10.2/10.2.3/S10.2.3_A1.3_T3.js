// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Global object has properties such as built-in objects such as
 * Math, String, Date, parseInt, etc
 *
 * @path ch10/10.2/10.2.3/S10.2.3_A1.3_T3.js
 * @description Eval execution context - Constructor Properties
 */

var evalStr = 
'//CHECK#13\n'+
'if ( Object === null ) {\n'+
'  $ERROR("#13: Object === null");\n'+
'}\n'+

'//CHECK#14\n'+
'if ( Function === null ) {\n'+
'  $ERROR("#14: Function === null");\n'+
'}\n'+

'//CHECK#15\n'+
'if ( String === null ) {\n'+
'  $ERROR("#15: String === null");\n'+
'}\n'+

'//CHECK#16\n'+
'if ( Number === null ) {\n'+
'  $ERROR("#16: Function === null");\n'+
'}\n'+

'//CHECK#17\n'+
'if ( Array === null ) {\n'+
'  $ERROR("#17: Array === null");\n'+
'}\n'+

'//CHECK#18\n'+
'if ( Boolean === null ) {\n'+
'  $ERROR("#20: Boolean === null");\n'+
'}\n'+

'//CHECK#18\n'+
'if ( Date === null ) {\n'+
'  $ERROR("#18: Date === null");\n'+
'}\n'+

'//CHECK#19\n'+
'if ( RegExp === null ) {\n'+
'  $ERROR("#19: RegExp === null");\n'+
'}\n'+

'//CHECK#20\n'+
'if ( Error === null ) {\n'+
'  $ERROR("#20: Error === null");\n'+
'}\n'+

'//CHECK#21\n'+
'if ( EvalError === null ) {\n'+
'  $ERROR("#21: EvalError === null");\n'+
'}\n'+

'//CHECK#22\n'+
'if ( RangeError === null ) {\n'+
'  $ERROR("#22: RangeError === null");\n'+
'}\n'+

'//CHECK#23\n'+
'if ( ReferenceError === null ) {\n'+
'  $ERROR("#23: ReferenceError === null");\n'+
'}\n'+

'//CHECK#24\n'+
'if ( SyntaxError === null ) {\n'+
'  $ERROR("#24: SyntaxError === null");\n'+
'}\n'+

'//CHECK#25\n'+
'if ( TypeError === null ) {\n'+
'  $ERROR("#25: TypeError === null");\n'+
'}\n'+

'//CHECK#26\n'+
'if ( URIError === null ) {\n'+
'  $ERROR("#26: URIError === null");\n'+
'}\n'+
';\n';

eval(evalStr);

