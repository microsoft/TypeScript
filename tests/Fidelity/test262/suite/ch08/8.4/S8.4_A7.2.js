// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * <CR> between chunks of one string not allowed
 *
 * @path ch08/8.4/S8.4_A7.2.js
 * @description Insert <CR> between chunks of one string
 * @negative
 */

eval("var x = asdf\u000Dghjk");

