// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Global object has properties such as built-in objects such as
 * Math, String, Date, parseInt, etc
 *
 * @path ch10/10.2/10.2.3/S10.2.3_A1.3_T1.js
 * @description Eval execution context - Value Properties
 */

var evalStr = 
'//CHECK#1\n'+
'if ( NaN === null ) {\n'+
'  $ERROR("#1: NaN === null");\n'+
'}\n'+

'//CHECK#2\n'+
'if ( Infinity === null ) {\n'+
'  $ERROR("#2: Infinity === null");\n'+
'}\n'+

'//CHECK#3\n'+
'if ( undefined === null ) {\n'+
'  $ERROR("#3: undefined === null");\n'+
'}\n'+
';\n';

eval(evalStr);

