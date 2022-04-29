// @Filename: importAliasAnExternalModuleInsideAnInternalModule_file0.ts
export module m {
    export function foo() { }
}

// @Filename: importAliasAnExternalModuleInsideAnInternalModule_file1.ts 
import r = require('./importAliasAnExternalModuleInsideAnInternalModule_file0');
module m_private {
    //import r2 = require('m'); // would be error
    export import C = r; // no error
    C.m.foo();
}
