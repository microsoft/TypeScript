//// [tests/cases/compiler/namedImportFromCjsClassExportAccessibility.ts] ////

//// [module.ts]
class X {
    public static a = 1;
    protected static b = 2;
    private static c = 3;
}
export = X;

//// [main.ts]
import { a, b, c } from "./module";


//// [module.js]
"use strict";
class X {
}
X.a = 1;
X.b = 2;
X.c = 3;
module.exports = X;
//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
