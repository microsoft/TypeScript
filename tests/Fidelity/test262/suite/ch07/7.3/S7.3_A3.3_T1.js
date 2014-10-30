// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Single line comments can not contain LINE SEPARATOR (U+2028) inside
 *
 * @path ch07/7.3/S7.3_A3.3_T1.js
 * @description Insert LINE SEPARATOR (\u2028) into single line comment
 * @negative
 */

// CHECK#1
eval("// single line \u2028 comment");

