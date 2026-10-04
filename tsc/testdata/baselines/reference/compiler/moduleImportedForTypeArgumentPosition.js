//// [tests/cases/compiler/moduleImportedForTypeArgumentPosition.ts] ////

//// [moduleImportedForTypeArgumentPosition_0.ts]
export interface M2C { }

//// [moduleImportedForTypeArgumentPosition_1.ts]
/**This is on import declaration*/
import M2 = require("moduleImportedForTypeArgumentPosition_0");
class C1<T>{ }
class Test1 extends C1<M2.M2C> {
}


//// [moduleImportedForTypeArgumentPosition_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class C1 {
}
class Test1 extends C1 {
}
