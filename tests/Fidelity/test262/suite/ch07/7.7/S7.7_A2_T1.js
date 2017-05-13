// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Punctuator cannot be expressed as a Unicode escape sequence consisting of six characters, namely \u plus four hexadecimal digits
 *
 * @path ch07/7.7/S7.7_A2_T1.js
 * @description Try to use {} as a Unicode \u007B\u007D
 * @negative
 */

\u007B\u007D;

