//// [tests/cases/compiler/importedModuleClassNameClash.ts] ////

//// [importedModuleClassNameClash.ts]
import foo = m1;
 
export module m1 { }
 
class foo { }


//// [importedModuleClassNameClash.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class foo {
}
