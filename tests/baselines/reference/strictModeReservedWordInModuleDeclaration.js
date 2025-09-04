//// [tests/cases/compiler/strictModeReservedWordInModuleDeclaration.ts] ////

//// [strictModeReservedWordInModuleDeclaration.ts]
"use strict"
namespace public { }
namespace private { }
module public.whatever {
}
module private.public.foo { }

//// [strictModeReservedWordInModuleDeclaration.js]
"use strict";
