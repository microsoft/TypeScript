// ast.ts — Hand-written AST type definitions
// Generated types are in ast.generated.ts

import type { InternalSymbolName } from "#enums/internalSymbolName";
import type { LanguageVariant } from "#enums/languageVariant";
import type { NodeFlags } from "#enums/nodeFlags";
import type { ScriptKind } from "#enums/scriptKind";
import { SyntaxKind } from "#enums/syntaxKind";
import type {
    AssertionExpression,
    BindingElement,
    CaseClause,
    ComputedPropertyName,
    Decorator,
    DefaultClause,
    DoStatement,
    EndOfFile,
    EntityName,
    EnumMember,
    Expression,
    ExpressionStatement,
    ForInStatement,
    ForOfStatement,
    ForStatement,
    Identifier,
    IfStatement,
    JsxAttribute,
    JsxExpression,
    JsxSpreadAttribute,
    KeywordSyntaxKind,
    ModifierSyntaxKind,
    ParameterDeclaration,
    PropertyAccessExpression,
    PropertyAssignment,
    PropertyDeclaration,
    PropertySignatureDeclaration,
    PunctuationSyntaxKind,
    ReturnStatement,
    SatisfiesExpression,
    ShorthandPropertyAssignment,
    SpreadAssignment,
    Statement,
    SwitchStatement,
    TemplateSpan,
    ThisExpression,
    ThrowStatement,
    Token,
    VariableDeclaration,
    WhileStatement,
    WithStatement,
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

export interface LineAndCharacter {
    /** 0-based line number. */
    readonly line: number;
    /** 0-based character offset, in UTF-16 code units, from the start of the line. */
    readonly character: number;
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
    /** Returns the UTF-16 code unit offset of the start of each line. */
    getLineStarts(): readonly number[];
    /** Converts a UTF-16 code unit position into a 0-based line and character. */
    getLineAndCharacterOfPosition(position: number): LineAndCharacter;
    /** Converts a 0-based line and character into a UTF-16 code unit position. */
    getPositionOfLineAndCharacter(line: number, character: number): number;
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

export interface JsxTagNamePropertyAccess extends PropertyAccessExpression {
    readonly expression: Identifier | ThisExpression | JsxTagNamePropertyAccess;
}

export type HasExpressionInitializer =
    | VariableDeclaration
    | ParameterDeclaration
    | BindingElement
    | PropertyDeclaration
    | PropertyAssignment
    | EnumMember;

export type HasInitializer =
    | HasExpressionInitializer
    | ForStatement
    | ForInStatement
    | ForOfStatement
    | JsxAttribute;

export type HasIllegalExpressionInitializer = PropertySignatureDeclaration;

export type HasExpression =
    | ExpressionStatement
    | IfStatement
    | DoStatement
    | WhileStatement
    | ReturnStatement
    | WithStatement
    | SwitchStatement
    | CaseClause
    | DefaultClause
    | ThrowStatement
    | AssertionExpression
    | TemplateSpan
    | ComputedPropertyName
    | Decorator
    | JsxExpression
    | JsxSpreadAttribute
    | SpreadAssignment
    | SatisfiesExpression;

export interface ObjectAssignmentInitializer extends ShorthandPropertyAssignment {
    readonly objectAssignmentInitializer: Expression;
}
