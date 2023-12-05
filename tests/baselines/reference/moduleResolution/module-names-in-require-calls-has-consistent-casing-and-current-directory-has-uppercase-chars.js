//// [/a/b/c/modulea.ts]
import a = require("./moduleC")

//// [/a/b/c/moduleb.ts]
import a = require("./moduleC")

//// [/a/b/c/modulec.ts]
export var x

//// [/a/b/c/moduled.ts]

import a = require("./moduleA");
import b = require("./moduleB");
                

Diagnostics::

