// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Properties of the object being enumerated may be deleted during enumeration
 *
 * @path ch12/12.6/12.6.4/S12.6.4_A7_T1.js
 * @description Checking "for (LeftHandSideExpression in Expression) Statement" case
 */

__obj={aa:1,ba:2,ca:3};

__accum="";

for (__key in __obj){
	
    erasator_T_1000(__obj,"b");
  
	__accum+=(__key+__obj[__key]);
	
}


//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (!((__accum.indexOf("aa1")!==-1)&&(__accum.indexOf("ca3")!==-1))) {
	$ERROR('#1: (__accum.indexOf("aa1")!==-1)&&(__accum.indexOf("ca3")!==-1)');
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__accum.indexOf("ba2")!==-1) {
	$ERROR('#2: __accum.indexOf("ba2") === -1. Actual:  __accum.indexOf("ba2") ==='+ __accum.indexOf("ba2")  );
}
//
//////////////////////////////////////////////////////////////////////////////


// erasator is the hash map terminator
function erasator_T_1000(hash_map, charactr){
	for (key in hash_map){
		if (key.indexOf(charactr)===0) {
			delete hash_map[key];
		};
	}
}

