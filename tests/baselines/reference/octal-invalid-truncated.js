//// [tests/cases/conformance/test262/language/literals/numeric/octal-invalid-truncated.ts] ////

//// [octal-invalid-truncated.ts]
// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
es6id: 11.8.3
description: Octal-integer-literal-like sequence without any digits
info: |
    OctalIntegerLiteral ::
      0o OctalDigits
      0O OctalDigits
    OctalDigits ::
      OctalDigit
      OctalDigits OctalDigit
    OctalDigit :: one of
      0 1 2 3 4 5 6 7
negative:
  phase: parse
  type: SyntaxError
---*/


0o;


//// [octal-invalid-truncated.js]
// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 11.8.3
description: Octal-integer-literal-like sequence without any digits
info: |
    OctalIntegerLiteral ::
      0o OctalDigits
      0O OctalDigits
    OctalDigits ::
      OctalDigit
      OctalDigits OctalDigit
    OctalDigit :: one of
      0 1 2 3 4 5 6 7
negative:
  phase: parse
  type: SyntaxError
---*/
0;
