//// [tests/cases/conformance/test262/language/literals/regexp/u-unicode-esc-bounds.ts] ////

//// [u-unicode-esc-bounds.ts]
// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: Out-of-range value of hexadecimal digits in UnicodeEscapeSequence
es6id: 21.2.1.1
info: |
    21.2.1.1 Static Semantics: Early Errors

    RegExpUnicodeEscapeSequence :: u{ HexDigits }

        - It is a Syntax Error if the MV of HexDigits > 1114111.
negative:
  phase: parse
  type: SyntaxError
---*/


/\u{110000}/u;


//// [u-unicode-esc-bounds.js]
// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
description: Out-of-range value of hexadecimal digits in UnicodeEscapeSequence
es6id: 21.2.1.1
info: |
    21.2.1.1 Static Semantics: Early Errors

    RegExpUnicodeEscapeSequence :: u{ HexDigits }

        - It is a Syntax Error if the MV of HexDigits > 1114111.
negative:
  phase: parse
  type: SyntaxError
---*/
/\u{110000}/u;
