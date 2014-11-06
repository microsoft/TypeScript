// Copyright 2011 Google Inc.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Detects whether the value of a function's "prototype" property
 * as seen by normal object operations might deviate from the value
 * as seem by Object.getOwnPropertyDescriptor
 *
 * @path ch15/15.3/15.3.3/15.3.3.1/S15.3.3.1_A4.js
 * @description Checks if reading a function's .prototype directly
 * agrees with reading it via Object.getOwnPropertyDescriptor, after
 * having set it by Object.defineProperty.
 */

function foo() {}

Object.defineProperty(foo, 'prototype', { value: {} });
if (foo.prototype !==
    Object.getOwnPropertyDescriptor(foo, 'prototype').value) {
  $ERROR("A function.prototype's descriptor lies");
}

