// Copyright 2011 Google Inc.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @path ch13/13.2/S13.2_A7_T2.js
 * @description check if "arguments" poisoning poisons
 * hasOwnProperty too
 * @onlyStrict
 */

"use strict";
(function(){}).hasOwnProperty('arguments');


