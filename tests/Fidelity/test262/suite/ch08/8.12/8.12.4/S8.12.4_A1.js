// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If the property has the ReadOnly attribute, [[CanPut]](P) return false
 *
 * @path ch08/8.12/8.12.4/S8.12.4_A1.js
 * @description Try put other value for Math.E property
 * @noStrict
 */

var __e = Math.E;
Math.E = 1;
if (Math.E !== __e){
  $ERROR('#1: __e = Math.E; Math.E = 1; Math.E === __e. Actual: ' + (Math.E));
}

