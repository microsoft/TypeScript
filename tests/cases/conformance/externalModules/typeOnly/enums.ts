// @Filename: /a.ts
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

// @Filename: /b.ts
import type { SyntaxKind, SymbolFlags } from './a';

SyntaxKind.ImportClause;
SymbolFlags.Type;
let kind: SyntaxKind.ImportClause;
let flags: SymbolFlags;

type TypeFlag = SymbolFlags.Type;
export type { TypeFlag };

// @Filename: /c.ts
import { SymbolFlags } from './a';
import type { TypeFlag } from './b';
const flags: TypeFlag = SymbolFlags.Type;
