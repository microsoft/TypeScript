//// [tests/cases/conformance/test262/language/literals/bigint/mv-is-not-integer-dot-dds.ts] ////

//// [mv-is-not-integer-dot-dds.ts]
// Copyright (C) 2017 The V8 Project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-numeric-literal-static-semantics-early-errors
description: >
  It is a Syntax Error if the MV is not an integer. (dot decimalDigits)
info: |
  Static Semantics: BigInt Value

  NumericLiteral :: NumericLiteralBase NumericLiteralSuffix

  1. Assert: NumericLiteralSuffix is n.
  2. Let the value of NumericLiteral be the MV of NumericLiteralBase represented as BigInt.

  DecimalLiteral ::
    DecimalIntegerLiteral . DecimalDigits_opt
    . DecimalDigits
features: [BigInt]
negative:
  phase: parse
  type: SyntaxError
---*/


.0000000001n;


//// [mv-is-not-integer-dot-dds.js]
// Copyright (C) 2017 The V8 Project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-numeric-literal-static-semantics-early-errors
description: >
  It is a Syntax Error if the MV is not an integer. (dot decimalDigits)
info: |
  Static Semantics: BigInt Value

  NumericLiteral :: NumericLiteralBase NumericLiteralSuffix

  1. Assert: NumericLiteralSuffix is n.
  2. Let the value of NumericLiteral be the MV of NumericLiteralBase represented as BigInt.

  DecimalLiteral ::
    DecimalIntegerLiteral . DecimalDigits_opt
    . DecimalDigits
features: [BigInt]
negative:
  phase: parse
  type: SyntaxError
---*/
.0000000001n;
