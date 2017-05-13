// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Since LineTerminator between "break" and Identifier is not allowed, "break" is evaluated without label
 *
 * @path ch12/12.8/S12.8_A2.js
 * @description Checking by using eval, inserting LineTerminator between break and Identifier
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
try{
	eval("FOR1 : for(var i=1;i<2;i++){ LABEL1 : do {var x =1;break\u000AFOR1;var y=2;} while(0);}");
	if (i!==2) {
		$ERROR('#1: Since LineTerminator(U-000A) between break and Identifier not allowed break evaluates without label');
	}
} catch(e){
	$ERROR('#1.1: eval("FOR1 : for(var i=1;i<2;i++){ LABEL1 : do {var x =1;break\\u000AFOR1;var y=2;} while(0);}") does not lead to throwing exception');
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
try{
	eval("FOR2 : for(var i=1;i<2;i++){ LABEL2 : do {var x =1;break\u000DFOR2;var y=2;} while(0);}");
	if (i!==2) {
		$ERROR('#2: Since LineTerminator(U-000D) between break and Identifier not allowed break evaluates without label');
	}
} catch(e){
	$ERROR('#2.1: eval("FOR2 : for(var i=1;i<2;i++){ LABEL2 : do {var x =1;break\\u000DFOR2;var y=2;} while(0);}") does not lead to throwing exception');
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#3
try{
	eval("FOR3 : for(var i=1;i<2;i++){ LABEL3 : do {var x =1;break\u2028FOR3;var y=2;} while(0);}");
	if (i!==2) {
		$ERROR('#3: Since LineTerminator(U-2028) between break and Identifier not allowed break evaluates without label');
	}
} catch(e){
	$ERROR('#3.1: eval("FOR3 : for(var i=1;i<2;i++){ LABEL3 : do {var x =1;break\\u2028FOR3;var y=2;} while(0);}") does not lead to throwing exception');
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#4
try{
	eval("FOR4 : for(var i=1;i<2;i++){ LABEL4 : do {var x =1;break\u2029FOR4;var y=2;} while(0);}");
	if (i!==2) {
		$ERROR('#4: Since LineTerminator(U-2029) between break and Identifier not allowed break evaluates without label');
	}
} catch(e){
	$ERROR('#4.1: eval("FOR4 : for(var i=1;i<2;i++){ LABEL4 : do {var x =1;break\\u2029FOR4;var y=2;} while(0);}") does not lead to throwing exception');
}
//
//////////////////////////////////////////////////////////////////////////////



