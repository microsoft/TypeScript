// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Global object properties have attributes { DontEnum }
 *
 * @path ch10/10.2/10.2.3/S10.2.3_A2.3_T3.js
 * @description Global execution context - Constructor Properties
 */

var evalStr = 
'//CHECK#1\n'+
'for (var x in this) {\n'+
'  if ( x === \'Object\' ) {\n'+
'    $ERROR("#1: \'Object\' have attribute DontEnum");\n'+
'  } else if ( x === \'Function\') {\n'+
'    $ERROR("#1: \'Function\' have attribute DontEnum");\n'+
'  } else if ( x === \'String\' ) {\n'+
'    $ERROR("#1: \'String\' have attribute DontEnum");\n'+
'  } else if ( x === \'Number\' ) {\n'+
'    $ERROR("#1: \'Number\' have attribute DontEnum");\n'+
'  } else if ( x === \'Array\' ) {\n'+
'    $ERROR("#1: \'Array\' have attribute DontEnum");\n'+
'  } else if ( x === \'Boolean\' ) {\n'+
'    $ERROR("#1: \'Boolean\' have attribute DontEnum");\n'+
'  } else if ( x === \'Date\' ) {\n'+
'    $ERROR("#1: \'Date\' have attribute DontEnum");\n'+
'  } else if ( x === \'RegExp\' ) {\n'+
'    $ERROR("#1: \'RegExp\' have attribute DontEnum");\n'+
'  } else if ( x === \'Error\' ) {\n'+
'    $ERROR("#1: \'Error\' have attribute DontEnum");\n'+
'  } else if ( x === \'EvalError\' ) {\n'+
'    $ERROR("#1: \'EvalError\' have attribute DontEnum");\n'+
'  } else if ( x === \'RangeError\' ) {\n'+
'    $ERROR("#1: \'RangeError\' have attribute DontEnum");\n'+
'  } else if ( x === \'ReferenceError\' ) {\n'+
'    $ERROR("#1: \'ReferenceError\' have attribute DontEnum");\n'+
'  } else if ( x === \'SyntaxError\' ) {\n'+
'    $ERROR("#1: \'SyntaxError\' have attribute DontEnum");\n'+
'  } else if ( x === \'TypeError\' ) {\n'+
'    $ERROR("#1: \'TypeError\' have attribute DontEnum");\n'+
'  } else if ( x === \'URIError\' ) {\n'+
'    $ERROR("#1: \'URIError\' have attribute DontEnum");\n'+
'  }\n'+
'}\n';

eval(evalStr);

