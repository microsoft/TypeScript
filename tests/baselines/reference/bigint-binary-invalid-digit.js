//// [tests/cases/conformance/test262/language/literals/bigint/bigint-binary-invalid-digit.ts] ////

//// [bigint-binary-invalid-digit.ts]
// Copyright (C) 2017 Robin Templeton. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: Binary BigInt literal containing an invalid digit
esid: prod-NumericLiteral
info: |
  NumericLiteral ::
    NumericLiteralBase NumericLiteralSuffix

  NumericLiteralBase ::
    DecimalLiteral
    BinaryIntegerLiteral
    OctalIntegerLiteral
    HexIntegerLiteral

  NumericLiteralSuffix :: n
negative:
  phase: parse
  type: SyntaxError
features: [BigInt]
---*/


0b2n;


//// [bigint-binary-invalid-digit.js]
// Copyright (C) 2017 Robin Templeton. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
description: Binary BigInt literal containing an invalid digit
esid: prod-NumericLiteral
info: |
  NumericLiteral ::
    NumericLiteralBase NumericLiteralSuffix

  NumericLiteralBase ::
    DecimalLiteral
    BinaryIntegerLiteral
    OctalIntegerLiteral
    HexIntegerLiteral

  NumericLiteralSuffix :: n
negative:
  phase: parse
  type: SyntaxError
features: [BigInt]
---*/
0;
2n;
