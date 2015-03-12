//// [tests/cases/compiler/es6ImportDefaultBinding.ts] ////

//// [es6ImportDefaultBinding_0.ts]

export var a = 10;

//// [es6ImportDefaultBinding_1.ts]
import defaultBinding from "es6ImportDefaultBinding_0";


//// [es6ImportDefaultBinding_0.js]
exports.a = 10;
//// [es6ImportDefaultBinding_1.js]


//// [es6ImportDefaultBinding_0.d.ts]
export declare var a: number;
//// [es6ImportDefaultBinding_1.d.ts]
