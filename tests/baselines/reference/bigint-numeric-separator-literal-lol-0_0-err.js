//// [tests/cases/conformance/test262/language/literals/bigint/numeric-separators/bigint-numeric-separator-literal-lol-0_0-err.ts] ////

//// [bigint-numeric-separator-literal-lol-0_0-err.ts]
// Copyright (C) 2019 Leo Balter. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: prod-NumericLiteralSeparator
description: >
  NumericLiteralSeparator must not be in a LegacyOctalLikeDecimalIntegerLiteral (0_0)
info: |
  NumericLiteral ::
    DecimalIntegerLiteral BigIntLiteralSuffix
    NumericLiteralBase BigIntLiteralSuffix

  NumericLiteralBase ::
    BinaryIntegerLiteral
    OctalIntegerLiteral
    HexIntegerLiteral

  BigIntLiteralSuffix :: n

  NumericLiteralSeparator ::
    _

  DecimalIntegerLiteral ::
    0
    NonZeroDigit DecimalDigitsopt
    NonZeroDigit
    NonZeroDigit NumericLiteralSeparator_opt DecimalDigits
    NonOctalDecimalIntegerLiteral

  NonOctalDecimalIntegerLiteral ::
    0 NonOctalDigit
    LegacyOctalLikeDecimalIntegerLiteral NonOctalDigit
    NonOctalDecimalIntegerLiteral DecimalDigit

  LegacyOctalLikeDecimalIntegerLiteral ::
    0 OctalDigit
    LegacyOctalLikeDecimalIntegerLiteral OctalDigit

  NonOctalDigit::one of
    8 9

  OctalDigit::one of
    0 1 2 3 4 5 6 7
negative:
  phase: parse
  type: SyntaxError
features: [BigInt, numeric-separator-literal]
---*/


0_0n;


//// [bigint-numeric-separator-literal-lol-0_0-err.js]
// Copyright (C) 2019 Leo Balter. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: prod-NumericLiteralSeparator
description: >
  NumericLiteralSeparator must not be in a LegacyOctalLikeDecimalIntegerLiteral (0_0)
info: |
  NumericLiteral ::
    DecimalIntegerLiteral BigIntLiteralSuffix
    NumericLiteralBase BigIntLiteralSuffix

  NumericLiteralBase ::
    BinaryIntegerLiteral
    OctalIntegerLiteral
    HexIntegerLiteral

  BigIntLiteralSuffix :: n

  NumericLiteralSeparator ::
    _

  DecimalIntegerLiteral ::
    0
    NonZeroDigit DecimalDigitsopt
    NonZeroDigit
    NonZeroDigit NumericLiteralSeparator_opt DecimalDigits
    NonOctalDecimalIntegerLiteral

  NonOctalDecimalIntegerLiteral ::
    0 NonOctalDigit
    LegacyOctalLikeDecimalIntegerLiteral NonOctalDigit
    NonOctalDecimalIntegerLiteral DecimalDigit

  LegacyOctalLikeDecimalIntegerLiteral ::
    0 OctalDigit
    LegacyOctalLikeDecimalIntegerLiteral OctalDigit

  NonOctalDigit::one of
    8 9

  OctalDigit::one of
    0 1 2 3 4 5 6 7
negative:
  phase: parse
  type: SyntaxError
features: [BigInt, numeric-separator-literal]
---*/
00n;
