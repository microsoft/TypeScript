//// [strictModeReservedWordInModuleDeclaration.ts]
"use strict"
module public { }
module private { }
module public.whatever {
}
module private.public.foo { }

//// [strictModeReservedWordInModuleDeclaration.js]
"use strict";
