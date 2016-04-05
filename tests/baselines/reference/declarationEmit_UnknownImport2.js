//// [declarationEmit_UnknownImport2.ts]

import Foo From './Foo'; // Syntax error
export default Foo

//// [declarationEmit_UnknownImport2.js]
"use strict";
'./Foo'; // Syntax error
