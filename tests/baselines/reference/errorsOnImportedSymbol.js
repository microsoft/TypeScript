//// [tests/cases/compiler/errorsOnImportedSymbol.ts] ////

//// [errorsOnImportedSymbol_0.ts]

interface Sammy {
    new (): any;
    (): number;
}
export = Sammy;

//// [errorsOnImportedSymbol_1.ts]
import Sammy = require("./errorsOnImportedSymbol_0");
var x = new Sammy.Sammy();
var y = Sammy.Sammy(); 



//// [errorsOnImportedSymbol_0.js]
"use strict";
//// [errorsOnImportedSymbol_1.js]
"use strict";
var x = new Sammy.Sammy();
var y = Sammy.Sammy();
