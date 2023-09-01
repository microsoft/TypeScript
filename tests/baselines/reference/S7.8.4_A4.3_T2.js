//// [tests/cases/conformance/test262/language/literals/string/S7.8.4_A4.3_T2.ts] ////

//// [S7.8.4_A4.3_T2.ts]
// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
info: NonEscapeSequence is not EscapeCharacter
es5id: 7.8.4_A4.3_T2
description: "EscapeCharacter :: DecimalDigits :: 7"
negative:
  phase: parse
  type: SyntaxError
flags: [onlyStrict]
---*/


"\7"


//// [S7.8.4_A4.3_T2.js]
// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
info: NonEscapeSequence is not EscapeCharacter
es5id: 7.8.4_A4.3_T2
description: "EscapeCharacter :: DecimalDigits :: 7"
negative:
  phase: parse
  type: SyntaxError
flags: [onlyStrict]
---*/
"\7";
