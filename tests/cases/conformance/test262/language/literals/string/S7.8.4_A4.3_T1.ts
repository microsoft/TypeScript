// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
info: NonEscapeSequence is not EscapeCharacter
es5id: 7.8.4_A4.3_T1
description: "EscapeCharacter :: DecimalDigits :: 1"
negative:
  phase: parse
  type: SyntaxError
flags: [onlyStrict]
---*/


"\1"
