// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Appearing of "break" within "try/catch" Block yields SyntaxError
 *
 * @path ch12/12.8/S12.8_A8_T1.js
 * @description Checking if using "break Identifier" from within catch Block appears to be invalid
 * @negative
 */

var x=0,y=0;

try{
	LABEL1 : do {
		x++;
		throw "gonna leave it";
		y++;
	} while(0);
	$ERROR('#1: throw "gonna leave it" lead to throwing exception');
} catch(e){
	break LABEL2;
	LABEL2 : do {
		x++;
		y++;
	} while(0);
}


