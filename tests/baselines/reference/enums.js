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
var SyntaxKind;
(function (SyntaxKind) {
    SyntaxKind[SyntaxKind["ImportClause"] = 0] = "ImportClause";
    SyntaxKind[SyntaxKind["ExportDeclaration"] = 1] = "ExportDeclaration";
})(SyntaxKind || (SyntaxKind = {}));
export {};
//// [b.js]
SyntaxKind.ImportClause;
"Type" /* SymbolFlags.Type */;
let kind;
let flags;
export {};
//// [c.js]
const flags = "Type" /* SymbolFlags.Type */;
export {};
