// @module: commonjs
// @declaration: true
// @Filename: importDeclarationUsedAsTypeQuery_require.ts
export class B {
    id: number;
}

// @Filename: importDeclarationUsedAsTypeQuery_1.ts
///<reference path='importDeclarationUsedAsTypeQuery_require.ts'/>
import a = require('./importDeclarationUsedAsTypeQuery_require');
export var x: typeof a;
