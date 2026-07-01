// ast.ts — Hand-written AST type definitions
// Generated types are in ast.generated.ts

import type { InternalSymbolName } from "#enums/internalSymbolName";
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

/**
 * The escaped form of a symbol/identifier name. Internal compiler names are
 * prefixed with `__` (e.g. `__type`, `__call`), and user names that already
 * begin with `__` carry an extra leading underscore. Use
 * {@link unescapeLeadingUnderscores} to recover the display name and
 * {@link escapeLeadingUnderscores} to produce a key from a display name.
 */
export type __String = (string & { __escapedIdentifier: void; }) | InternalSymbolName;

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
    readonly jsDoc?: readonly Node[] | undefined;
    forEachChild<T>(visitor: (node: Node) => T, visitArray?: (nodes: NodeArray<Node>) => T): T | undefined;
    getSourceFile(): SourceFile;
    getStart(sourceFile?: SourceFile, includeJsDocComment?: boolean): number;
    getFullStart(): number;
    getEnd(): number;
    getWidth(sourceFile?: SourceFile): number;
    getFullWidth(): number;
    getLeadingTriviaWidth(sourceFile?: SourceFile): number;
    getFullText(sourceFile?: SourceFile): string;
    getText(sourceFile?: SourceFile): string;
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
