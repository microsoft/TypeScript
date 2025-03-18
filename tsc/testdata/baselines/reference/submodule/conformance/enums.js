//// [tests/cases/conformance/externalModules/typeOnly/enums.ts] ////

//// [a.ts]
enum SyntaxKind {
  ImportClause,
  ExportDeclaration
}

const enum SymbolFlags {
  Type = "Type",
  Value = "Value"
}

export type { SyntaxKind };
export { SymbolFlags };

//// [b.ts]
import type { SyntaxKind, SymbolFlags } from './a';

SyntaxKind.ImportClause;
SymbolFlags.Type;
let kind: SyntaxKind.ImportClause;
let flags: SymbolFlags;

type TypeFlag = SymbolFlags.Type;
export type { TypeFlag };

//// [c.ts]
import { SymbolFlags } from './a';
import type { TypeFlag } from './b';
const flags: TypeFlag = SymbolFlags.Type;


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SyntaxKind;
(function (SyntaxKind) {
    SyntaxKind[SyntaxKind["ImportClause"] = 0] = "ImportClause";
    SyntaxKind[SyntaxKind["ExportDeclaration"] = 1] = "ExportDeclaration";
})(SyntaxKind || (SyntaxKind = {}));
var SymbolFlags;
(function (SymbolFlags) {
    SymbolFlags["Type"] = "Type";
    SymbolFlags["Value"] = "Value";
})(SymbolFlags || (SymbolFlags = {}));
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
SyntaxKind.ImportClause;
SymbolFlags.Type;
let kind;
let flags;
//// [c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flags = a_1.SymbolFlags.Type;
