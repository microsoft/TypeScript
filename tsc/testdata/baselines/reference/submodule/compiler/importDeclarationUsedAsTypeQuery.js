//// [tests/cases/compiler/importDeclarationUsedAsTypeQuery.ts] ////

//// [importDeclarationUsedAsTypeQuery_require.ts]
export class B {
    id: number;
}

//// [importDeclarationUsedAsTypeQuery_1.ts]
///<reference path='importDeclarationUsedAsTypeQuery_require.ts'/>
import a = require('./importDeclarationUsedAsTypeQuery_require');
export var x: typeof a;


//// [importDeclarationUsedAsTypeQuery_require.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.B = void 0;
class B {
    id;
}
exports.B = B;
//// [importDeclarationUsedAsTypeQuery_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
