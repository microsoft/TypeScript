// Copyright 2011 Google Inc.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @path bestPractice/Sbp_A10_T1.js
 * @description Built-in functions should not have a non-deletable,
 * non-poisoned "caller" property.
 * @bestPractice
 * http://wiki.ecmascript.org/doku.php?id=conventions:make_non-standard_properties_configurable
 */

(function() {
   var map = Array.prototype.map;
   if (!map) { return; }
   try {
     delete map.caller;
   } catch (err1) {
     // ignore
   }
   if ('caller' in map) {
     try {
       Object.defineProperty(map, 'caller', {
         writable: false,
         configurable: false
       });
     } catch (err2) {
       // ignore
     }
   }

   function foo(m) { return m.caller; }
   function testfn(a, f) { return a.map(f)[0]; }
   var a = [map];
   var caller;
   try {
     caller = testfn(a, foo);
   } catch (err3) {
     if (err3 instanceof TypeError) { return; }
     $ERROR('#1: Built-in "caller" failed with: ' + err3);
   }
   if (null === caller || void 0 === caller) { return; }
   if (testfn === caller) {
     $ERROR('#2: Built-in revealed caller');
   }
   $ERROR('#3: Unexpected "caller": ' + caller);
})();