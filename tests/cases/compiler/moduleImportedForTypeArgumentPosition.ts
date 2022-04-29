//@module: amd
// @Filename: moduleImportedForTypeArgumentPosition_0.ts
export interface M2C { }

// @Filename: moduleImportedForTypeArgumentPosition_1.ts
/**This is on import declaration*/
import M2 = require("moduleImportedForTypeArgumentPosition_0");
class C1<T>{ }
class Test1 extends C1<M2.M2C> {
}
