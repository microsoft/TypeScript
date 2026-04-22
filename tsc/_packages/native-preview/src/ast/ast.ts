// ast.ts — Hand-written AST type definitions
// Generated types are in ast.generated.ts

import type { LanguageVariant } from "#enums/languageVariant";
import type { NodeFlags } from "#enums/nodeFlags";
import type { ScriptKind } from "#enums/scriptKind";
import { SyntaxKind } from "#enums/syntaxKind";
import type {
    EndOfFile,
    EntityName,
    Identifier,
    KeywordSyntaxKind,
    ModifierSyntaxKind,
    PropertyAccessExpression,
    PunctuationSyntaxKind,
    Statement,
    Token,
} from "./ast.generated.ts";

export { SyntaxKind } from "#enums/syntaxKind";
export { TokenFlags } from "#enums/tokenFlags";

export * from "./ast.generated.ts";

// ── Core types ──

export type Path = string & { __pathBrand: any; };

export interface TextRange {
    pos: number;
    end: number;
}

export interface ReadonlyTextRange {
    readonly pos: number;
    readonly end: number;
}

export interface NodeArray<T extends Node> extends ReadonlyArray<T>, ReadonlyTextRange {
    hasTrailingComma?: boolean;
    transformFlags: number;
}

export interface Node extends ReadonlyTextRange {
    readonly kind: SyntaxKind;
    readonly flags: NodeFlags;
    readonly parent: Node;
    readonly jsDoc?: readonly Node[];
    forEachChild<T>(visitor: (node: Node) => T, visitArray?: (nodes: NodeArray<Node>) => T): T | undefined;
    getSourceFile(): SourceFile;
}

export interface FileReference extends TextRange {
    readonly fileName: string;
    readonly resolutionMode: number;
    readonly preserve: boolean;
}

export interface SourceFile extends Node {
    readonly kind: SyntaxKind.SourceFile;
    readonly statements: NodeArray<Statement>;
    readonly endOfFileToken: EndOfFile;
    readonly text: string;
    readonly fileName: string;
    readonly path: Path;
    readonly languageVariant: LanguageVariant;
    readonly scriptKind: ScriptKind;
    readonly isDeclarationFile: boolean;
    readonly referencedFiles: readonly FileReference[];
    readonly typeReferenceDirectives: readonly FileReference[];
    readonly libReferenceDirectives: readonly FileReference[];
    readonly imports: readonly Node[];
    readonly moduleAugmentations: readonly Node[];
    readonly ambientModuleNames: readonly string[];
    readonly externalModuleIndicator: Node | true | undefined;
    /** @internal */
    tokenCache?: Map<string, Node>;
}

// ── Token hierarchy ──

export type PunctuationToken<TKind extends PunctuationSyntaxKind> = Token<TKind>;
export type KeywordToken<TKind extends KeywordSyntaxKind> = Token<TKind>;
export type ModifierToken<TKind extends ModifierSyntaxKind> = KeywordToken<TKind>;

// ── Narrowing interfaces ──

export interface PropertyAccessEntityNameExpression extends PropertyAccessExpression {
    readonly expression: EntityNameExpression;
    readonly name: Identifier;
}

export type EntityNameExpression = Identifier | PropertyAccessEntityNameExpression;
export type EntityNameOrEntityNameExpression = EntityName | EntityNameExpression;
