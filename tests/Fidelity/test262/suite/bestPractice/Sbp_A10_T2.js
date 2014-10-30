// Copyright 2011 Google Inc.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @path bestPractice/Sbp_A10_T2.js
 * @description Built-in functions should not have a non-deletable,
 * non-poisoned "arguments" property.
 * @bestPractice
 * http://wiki.ecmascript.org/doku.php?id=conventions:make_non-standard_properties_configurable
 */

(function() {
   var map = Array.prototype.map;
   if (!map) { return; }
   try {
     delete map.arguments;
   } catch (err1) {
     // ignore
   }
   if ('arguments' in map) {
     try {
       Object.defineProperty(map, 'arguments', {
         writable: false,
         configurable: false
       });
     } catch (err2) {
       // ignore
     }
   }

   function foo(m) { return m.arguments; }
   function testfn(a, f) { return a.map(f)[0]; }
   var a = [map];
   var args;
   try {
     args = testfn(a, foo);
   } catch (err3) {
     if (err3 instanceof TypeError) { return; }
     $ERROR('#1: Built-in "arguments" failed with: ' + err3);
   }
   if (null === args || void 0 === args) { return; }
   if (testfn === args) {
     $ERROR('#2: Built-in revealed arguments');
   }
   $ERROR('#3: Unexpected "arguments": ' + args);
})();
