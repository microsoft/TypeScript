//// [tests/cases/compiler/strictModeReservedWordInModuleDeclaration.ts] ////

//// [strictModeReservedWordInModuleDeclaration.ts]
"use strict"
namespace public { }
namespace private { }
namespace public.whatever {
}
namespace private.public.foo { }

//// [strictModeReservedWordInModuleDeclaration.js]
"use strict";
