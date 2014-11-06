// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The "implements" token can not be used as identifier in strict code
 *
 * @path ch07/7.6/7.6.1/7.6.1.2/S7.6.1.2_A1.15.js
 * @description Checking if execution of "implements=1" fails in strict code
 * @onlyStrict
 * @negative
 */

"use strict";

var implements = 1;
