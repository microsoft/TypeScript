// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * FORM FEED (U+000C) may occur within strings
 *
 * @path ch07/7.2/S7.2_A2.3_T1.js
 * @description Use FORM FEED(\u000C and \f)
 */

// CHECK#1
if (eval("'\u000Cstr\u000Cing\u000C'") !== "\u000Cstr\u000Cing\u000C") {
  $ERROR('#1: eval("\'\\u000Cstr\\u000Cing\\u000C\'") === "\\u000Cstr\\u000Cing\\u000C"');
}

//CHECK#2
if (eval("'\fstr\fing\f'") !== "\fstr\fing\f") {
  $ERROR('#2: eval("\'\\fstr\\fing\\f\'") === "\\fstr\\fing\\f"');
}

