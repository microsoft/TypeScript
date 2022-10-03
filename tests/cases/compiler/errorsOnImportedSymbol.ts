// @module: commonjs
// @target: ES5

// @Filename: errorsOnImportedSymbol_0.ts
interface Sammy {
    new (): any;
    (): number;
}
export = Sammy;

// @Filename: errorsOnImportedSymbol_1.ts
import Sammy = require("./errorsOnImportedSymbol_0");
var x = new Sammy.Sammy();
var y = Sammy.Sammy(); 

