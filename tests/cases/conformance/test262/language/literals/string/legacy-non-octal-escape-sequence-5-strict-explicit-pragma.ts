// Copyright (C) 2020 Rick Waldron Inc. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-literals-string-literals
description: >
  String Literals extensions disallowed in strict mode; FourToSeven 5
info: |
  It is possible for string literals to precede a Use Strict Directive that places the enclosing
  code in strict mode, and implementations must take care to not use this extended definition of
  EscapeSequence with such literals. For example, attempting to parse the following source text
  must fail.

  Strict mode is entered via the explicit Use Strict Directive.

  FourToSeven::one of
    4 5 6 7

flags: [noStrict]
negative:
  phase: parse
  type: SyntaxError
---*/


function invalid() { "\5"; "use strict"; }
