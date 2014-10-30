// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Global object properties have attributes { DontEnum }
 *
 * @path ch10/10.2/10.2.3/S10.2.3_A2.3_T2.js
 * @description Global execution context - Function Properties
 */

var evalStr = 
'//CHECK#1\n'+
'for (var x in this) {\n'+
'  if ( x === \'eval\' ) {\n'+
'    $ERROR("#1: \'eval\' have attribute DontEnum");\n'+
'  } else if ( x === \'parseInt\' ) {\n'+
'    $ERROR("#1: \'parseInt\' have attribute DontEnum");\n'+
'  } else if ( x === \'parseFloat\' ) {\n'+
'    $ERROR("#1: \'parseFloat\' have attribute DontEnum");\n'+
'  } else if ( x === \'isNaN\' ) {\n'+
'    $ERROR("#1: \'isNaN\' have attribute DontEnum");\n'+
'  } else if ( x === \'isFinite\' ) {\n'+
'    $ERROR("#1: \'isFinite\' have attribute DontEnum");\n'+
'  } else if ( x === \'decodeURI\' ) {\n'+
'    $ERROR("#1: \'decodeURI\' have attribute DontEnum");\n'+
'  } else if ( x === \'decodeURIComponent\' ) {\n'+
'    $ERROR("#1: \'decodeURIComponent\' have attribute DontEnum");\n'+
'  } else if ( x === \'encodeURI\' ) {\n'+
'    $ERROR("#1: \'encodeURI\' have attribute DontEnum");\n'+
'  } else if ( x === \'encodeURIComponent\' ) {\n'+
'    $ERROR("#1: \'encodeURIComponent\' have attribute DontEnum");\n'+
'  }\n'+
'}\n';

eval(evalStr);

