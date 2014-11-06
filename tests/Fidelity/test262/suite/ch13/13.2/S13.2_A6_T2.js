// Copyright 2011 Google Inc.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @path ch13/13.2/S13.2_A6_T2.js
 * @description check if "arguments" poisoning poisons
 * getOwnPropertyDescriptor too
 * @onlyStrict
 */

"use strict";
Object.getOwnPropertyDescriptor(function(){}, 'arguments');

