//// [tests/cases/conformance/test262/language/literals/numeric/legacy-octal-integer-strict.ts] ////

//// [legacy-octal-integer-strict.ts]
// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-literals-numeric-literals
description: LegacyOctalIntegerLiteral is not enabled in strict mode code
info: |
    NumericLiteral ::
      DecimalLiteral
      BinaryIntegerLiteral
      OctalIntegerLiteral
      HexIntegerLiteral
      LegacyOctalIntegerLiteral

    LegacyOctalIntegerLiteral ::
      0 OctalDigit
      LegacyOctalIntegerLiteral OctalDigit

    ## 12.8.3.1 Static Semantics: Early Errors

    NumericLiteral :: LegacyOctalIntegerLiteral
    DecimalIntegerLiteral :: NonOctalDecimalIntegerLiteral

    - It is a Syntax Error if the source code matching this production is
      strict mode code.
flags: [onlyStrict]
negative:
  phase: parse
  type: SyntaxError
---*/


00;


//// [legacy-octal-integer-strict.js]
// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-literals-numeric-literals
description: LegacyOctalIntegerLiteral is not enabled in strict mode code
info: |
    NumericLiteral ::
      DecimalLiteral
      BinaryIntegerLiteral
      OctalIntegerLiteral
      HexIntegerLiteral
      LegacyOctalIntegerLiteral

    LegacyOctalIntegerLiteral ::
      0 OctalDigit
      LegacyOctalIntegerLiteral OctalDigit

    ## 12.8.3.1 Static Semantics: Early Errors

    NumericLiteral :: LegacyOctalIntegerLiteral
    DecimalIntegerLiteral :: NonOctalDecimalIntegerLiteral

    - It is a Syntax Error if the source code matching this production is
      strict mode code.
flags: [onlyStrict]
negative:
  phase: parse
  type: SyntaxError
---*/
0;
