// Copyright (c) 2012 Ecma International.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
es5id: 7.8.4-1-s
description: >
    A directive preceding an 'use strict' directive may not contain
    an OctalEscapeSequence
negative:
  phase: parse
  type: SyntaxError
---*/


(function() {
  "asterisk: \052";
  "use strict";
});
