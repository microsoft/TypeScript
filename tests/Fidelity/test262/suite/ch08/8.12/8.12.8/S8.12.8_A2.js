// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * This should generate no TypeError,
 * Cause we overload toString method so it return non Primitive value
 * but we overloaded valueOf method too.
 * See ECMA reference at http://bugzilla.mozilla.org/show_bug.cgi?id=167325
 *
 * @path ch08/8.12/8.12.8/S8.12.8_A2.js
 * @description Try to overload toString, that returned new Object, and valueOf methods
 */

try
{
	var __obj = {toString: function() {return new Object();}, valueOf: function() {return 1;}}
	if (String(__obj) !== "1") {
	  $ERROR('#1.1: var __obj = {toString: function() {return new Object();}, valueOf: function() {return 1;}}; String(__obj) === "1". Actual: ' + (String(__obj)));
	}
}
catch(e)
{
  $ERROR('#1.2: var __obj = {toString: function() {return new Object();}, valueOf: function() {return 1;}}; String(__obj) === "1". Actual: ' + (e));
}  


