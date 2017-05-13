// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Since LineTerminator between "continue" and Identifier is not allowed, "continue" is evaluated without label
 *
 * @path ch12/12.7/S12.7_A2.js
 * @description Checking by using eval, inserting LineTerminator between continue and Identifier
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
try{
	eval("FOR1 : for(var i=1;i<2;i++){FOR1NESTED : for(var j=1;j<2;j++) { continue\u000AFOR1; } while(0);}");
	if (j!==2) {
		$ERROR('#1: Since LineTerminator(U-000A) between continue and Identifier not allowed continue evaluates without label');
	}
} catch(e){
	$ERROR('#1.1: eval("FOR1 : for(var i=1;i<2;i++){FOR1NESTED : for(var j=1;j<2;j++) { continue\\u000AFOR1; } while(0);}") does not lead to throwing exception');
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
try{
	eval("FOR2 : for(var i=1;i<2;i++){FOR2NESTED : for(var j=1;j<2;j++) { continue\u000DFOR2; } while(0);}");
	if (j!==2) {
		$ERROR('#2: Since LineTerminator(U-000D) between continue and Identifier not allowed continue evaluates without label');
	}
} catch(e){
	$ERROR('#2.1: eval("FOR2 : for(var i=1;i<2;i++){FOR2NESTED : for(var j=1;j<2;j++) { continue\\u000DFOR2; } while(0);}") does not lead to throwing exception');
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#3
try{
	eval("FOR3 : for(var i=1;i<2;i++){FOR3NESTED : for(var j=1;j<2;j++) { continue\u2028FOR3; } while(0);}");
	if (j!==2) {
		$ERROR('#3: Since LineTerminator(U-2028) between continue and Identifier not allowed continue evaluates without label');
	}
} catch(e){
	$ERROR('#3.1: eval("FOR3 : for(var i=1;i<2;i++){FOR3NESTED : for(var j=1;j<2;j++) { continue\\u2028FOR3; } while(0);}") does not lead to throwing exception');
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#4
try{
	eval("FOR4 : for(var i=1;i<2;i++){FOR4NESTED : for(var j=1;j<2;j++) { continue\u2029FOR4; } while(0);}");
	if (j!==2) {
		$ERROR('#4: Since LineTerminator(U-2029) between continue and Identifier not allowed continue evaluates without label');
	}
} catch(e){
	$ERROR('#4.1: eval("FOR4 : for(var i=1;i<2;i++){FOR4NESTED : for(var j=1;j<2;j++) { continue\\u2029FOR4; } while(0);}"); does not lead to throwing exception');
}
//
//////////////////////////////////////////////////////////////////////////////



