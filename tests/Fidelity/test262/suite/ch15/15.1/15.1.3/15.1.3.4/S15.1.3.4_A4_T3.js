// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * URI tests
 *
 * @path ch15/15.1/15.1.3/15.1.3.4/S15.1.3.4_A4_T3.js
 * @description Checking URL with Line Terminator
 */

//CHECK#1
if ((encodeURIComponent("http://unipro.ru/\nabout") !== "http%3A%2F%2Funipro.ru%2F%0Aabout") && encodeURIComponent("http://unipro.ru/\nabout") !== "http%3A%2F%2Funipro.ru%2F%0aabout") {
  $ERROR('#1: http://unipro.ru/\\nabout');
}

//CHECK#2
if ((encodeURIComponent("http://unipro.ru/\vabout") !== "http%3A%2F%2Funipro.ru%2F%0Babout") && encodeURIComponent("http://unipro.ru/\vabout") !== "http%3A%2F%2Funipro.ru%2F%0babout") {
  $ERROR('#2: http://unipro.ru/\\vabout');
}

//CHECK#3
if ((encodeURIComponent("http://unipro.ru/\fabout") !== "http%3A%2F%2Funipro.ru%2F%0Cabout") && encodeURIComponent("http://unipro.ru/\fabout") !== "http%3A%2F%2Funipro.ru%2F%0cabout") {
  $ERROR('#3: http://unipro.ru/\\fabout');
}

//CHECK#4
if ((encodeURIComponent("http://unipro.ru/\rabout") !== "http%3A%2F%2Funipro.ru%2F%0Dabout") && encodeURIComponent("http://unipro.ru/\rabout") !== "http%3A%2F%2Funipro.ru%2F%0dabout") {
  $ERROR('#4: http://unipro.ru/\\rabout');
}

