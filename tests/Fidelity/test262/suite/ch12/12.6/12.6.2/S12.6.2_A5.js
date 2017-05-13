// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * While using "while" within an eval statement, source "break" is allowed and (normal, V, empty) is returned
 *
 * @path ch12/12.6/12.6.2/S12.6.2_A5.js
 * @description Using eval
 */

__evaluated = eval("while(1) {__in__do__before__break=1; break; __in__do__after__break=2;}");

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__in__do__before__break !== 1) {
	$ERROR('#1: __in__do__before__break === 1. Actual:  __in__do__before__break ==='+ __in__do__before__break  );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (typeof __in__do__after__break !== "undefined") {
	$ERROR('#2: typeof __in__do__after__break === "undefined". Actual:  typeof __in__do__after__break ==='+ typeof __in__do__after__break  );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#3
if (__evaluated !== 1) {
	$ERROR('#3: __evaluated === 1. Actual:  __evaluated ==='+ __evaluated  );
}
//
//////////////////////////////////////////////////////////////////////////////

