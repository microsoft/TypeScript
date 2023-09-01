// Copyright (C) 2018 Mozilla. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-literals-numeric-literals
description: >
  NumericLiteral followed by IdentifierStart
info: |
  The source character immediately following a NumericLiteral must not be an IdentifierStart or DecimalDigit.

negative:
  phase: parse
  type: SyntaxError
---*/


3in []
