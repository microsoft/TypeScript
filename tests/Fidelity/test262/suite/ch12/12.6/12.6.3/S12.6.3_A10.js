// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Nested "var-loops" nine blocks depth is evaluated properly
 *
 * @path ch12/12.6/12.6.3/S12.6.3_A10.js
 * @description Checking if executing nested "var-loops" nine blocks depth is evaluated properly
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#
try {
	__in__deepest__loop=__in__deepest__loop;
} catch (e) {
	$ERROR('#1: "__in__deepest__loop=__in__deepest__loop" does not lead to throwing exception');
}
//
//////////////////////////////////////////////////////////////////////////////

__str="";

for( index0=0; index0<=1; index0++) {
	for( index1=0; index1<=index0; index1++) {
		for( index2=0; index2<=index1; index2++) {
			for( index3=0; index3<=index2; index3++) {
				for( index4=0; index4<=index3; index4++) {
					for( index5=0; index5<=index4; index5++) {
						for( index6=0; index6<=index5; index6++) {
							for( index7=0; index7<=index6; index7++) {
								for( index8=0; index8<=index1; index8++) {
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

