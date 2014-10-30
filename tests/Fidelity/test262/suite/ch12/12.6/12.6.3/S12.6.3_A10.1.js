// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Nested "var-loops" nine blocks depth is evaluated properly
 *
 * @path ch12/12.6/12.6.3/S12.6.3_A10.1.js
 * @description Checking if executing nested "var-loops" nine blocks depth is evaluated properly
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
try {
	__in__deepest__loop=__in__deepest__loop;
} catch (e) {
	$ERROR('#1: "__in__deepest__loop=__in__deepest__loop" does not lead to throwing exception');
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
try {
	index0=index0;
} catch (e) {
	$ERROR('#2: "index0=index0" does not lead to throwing exception');
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#3
try {
	index1=index1;
} catch (e) {
	$ERROR('#3: "index1=index1" does not lead to throwing exception');
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#4
try {
	index4=index4;
} catch (e) {
	$ERROR('#4: "index4=index4" does not lead to throwing exception');
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#5
try {
	index5=index5;
} catch (e) {
	$ERROR('#4: "index5=index5" does not lead to throwing exception');
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#6
try {
	index7=index7;
} catch (e) {
	$ERROR('#6: "index7=index7" does not lead to throwing exception');
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#7
try {
	index8=index8;
} catch (e) {
	$ERROR('#7: "index8=index8" does not lead to throwing exception');
}
//
//////////////////////////////////////////////////////////////////////////////

__str="";

for( var index0=0; index0<=1; index0++) {
	for(var index1=0; index1<=index0; index1++) {
		for( index2=0; index2<=index1; index2++) {
			for( index3=0; index3<=index2; index3++) {
				for(var index4=0; index4<=index3; index4++) {
					for(var index5=0; index5<=index4; index5++) {
						for( index6=0; index6<=index5; index6++) {
							for(var index7=0; index7<=index6; index7++) {
								for(var index8=0; index8<=index1; index8++) {
									var __in__deepest__loop;
									__str+=""+index0+index1+index2+index3+index4+index5+index6+index7+index8+'\n';
								}
							}
						}
					}
				}
			}
		}
	}
}

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__str!== "000000000\n100000000\n110000000\n110000001\n111000000\n111000001\n111100000\n111100001\n111110000\n111110001\n111111000\n111111001\n111111100\n111111101\n111111110\n111111111\n") {
	$ERROR('#2: __str === "000000000\\n100000000\\n110000000\\n110000001\\n111000000\\n111000001\\n111100000\\n111100001\\n111110000\\n111110001\\n111111000\\n111111001\\n111111100\\n111111101\\n111111110\\n111111111\\n". Actual:  __str ==='+ __str  );
}
//
//////////////////////////////////////////////////////////////////////////////

