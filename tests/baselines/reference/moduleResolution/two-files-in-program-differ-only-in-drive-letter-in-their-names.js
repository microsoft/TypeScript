//// [d:/somefolder/modulea.ts]
import a = require("D:/someFolder/moduleC")

//// [d:/somefolder/moduleb.ts]
import a = require("./moduleC")

//// [d:/somefolder/modulec.ts]
export const x = 10

Diagnostics::

