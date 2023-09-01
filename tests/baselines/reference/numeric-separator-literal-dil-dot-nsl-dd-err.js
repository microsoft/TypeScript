//// [tests/cases/conformance/test262/language/literals/numeric/numeric-separators/numeric-separator-literal-dil-dot-nsl-dd-err.ts] ////

//// [numeric-separator-literal-dil-dot-nsl-dd-err.ts]
// Copyright (C) 2017 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: prod-NumericLiteralSeparator
description: >
  NumericLiteralSeparator may not be adjacent to `.`
info: |
  NumericLiteralSeparator ::
    _

  DecimalLiteral ::
    DecimalIntegerLiteral . DecimalDigits_opt ExponentPart_opt

  DecimalDigits ::
    ...
    DecimalDigits NumericLiteralSeparator DecimalDigit

negative:
  phase: parse
  type: SyntaxError

features: [numeric-separator-literal]
---*/


10._1


//// [numeric-separator-literal-dil-dot-nsl-dd-err.js]
// Copyright (C) 2017 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: prod-NumericLiteralSeparator
description: >
  NumericLiteralSeparator may not be adjacent to `.`
info: |
  NumericLiteralSeparator ::
    _

  DecimalLiteral ::
    DecimalIntegerLiteral . DecimalDigits_opt ExponentPart_opt

  DecimalDigits ::
    ...
    DecimalDigits NumericLiteralSeparator DecimalDigit

negative:
  phase: parse
  type: SyntaxError

features: [numeric-separator-literal]
---*/
10.1;
