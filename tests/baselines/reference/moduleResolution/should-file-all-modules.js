//// [/a/b/c/first/shared.ts]

class A {}
export = A

//// [/a/b/c/first/second/class_a.ts]

import Shared = require('../shared');
import C = require('../../third/class_c');
class B {}
export = B;

//// [/a/b/c/third/class_c.ts]

import Shared = require('../first/shared');
class C {}
export = C;
                

Program files::
/a/b/c/first/shared.ts
/a/b/c/third/class_c.ts
class_a.ts

Syntactic Diagnostics::


Semantic Diagnostics::


getSourceFile by ../../../c/third/class_c.ts: /a/b/c/third/class_c.ts