//// [tests/cases/conformance/test262/language/literals/string/S7.8.4_A7.2_T1.ts] ////

//// [S7.8.4_A7.2_T1.ts]
// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
info: "UnicodeEscapeSequence :: u HexDigit (one, two or three time) is incorrect"
es5id: 7.8.4_A7.2_T1
description: ":: HexDigit :: 1"
negative:
  phase: parse
  type: SyntaxError
---*/


//CHECK#1
"\u1"


//// [S7.8.4_A7.2_T1.js]
// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
info: "UnicodeEscapeSequence :: u HexDigit (one, two or three time) is incorrect"
es5id: 7.8.4_A7.2_T1
description: ":: HexDigit :: 1"
negative:
  phase: parse
  type: SyntaxError
---*/
//CHECK#1
"\u1";
