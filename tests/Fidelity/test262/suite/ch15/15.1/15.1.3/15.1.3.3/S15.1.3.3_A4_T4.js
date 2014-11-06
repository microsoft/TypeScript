// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * URI tests
 *
 * @path ch15/15.1/15.1.3/15.1.3.3/S15.1.3.3_A4_T4.js
 * @description Test some url
 */

//CHECK#1
if (encodeURI("") !== "") {
  $ERROR('#1: ""');
}

//CHECK#2
if (encodeURI("http://unipro.ru") !== "http://unipro.ru") {
  $ERROR('#2: http://unipro.ru');
}

//CHECK#3
if (encodeURI("http://www.google.ru/support/jobs/bin/static.py?page=why-ru.html&sid=liveandwork") !== "http://www.google.ru/support/jobs/bin/static.py?page=why-ru.html&sid=liveandwork") {
  $ERROR('#3: http://www.google.ru/support/jobs/bin/static.py?page=why-ru.html&sid=liveandwork"');
}           

//CHECK#4
if (encodeURI("http://en.wikipedia.org/wiki/UTF-8#Description") !== "http://en.wikipedia.org/wiki/UTF-8#Description") {
  $ERROR('#4: http://en.wikipedia.org/wiki/UTF-8#Description');
}

