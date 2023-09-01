// Copyright 2017 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: GroupName is `< RegExpIdentifierName >`.
esid: prod-GroupName
negative:
  phase: parse
  type: SyntaxError
features: [regexp-named-groups]
---*/


/\k<>/u;
