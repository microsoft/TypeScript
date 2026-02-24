import type { NodeFlags } from "#enums/nodeFlags";
import { SyntaxKind } from "#enums/syntaxKind";
import { TokenFlags } from "#enums/tokenFlags";

// branded string type used to store absolute, normalized and canonicalized paths
// arbitrary file name can be converted to Path via toPath function
export type Path = string & { __pathBrand: any; };

export interface TextRange {
    pos: number;
    end: number;
}

export interface Node extends ReadonlyTextRange {
    readonly kind: SyntaxKind;
    readonly flags: NodeFlags;
    readonly parent: Node;
    forEachChild<T>(visitor: (node: Node) => T, visitArray?: (nodes: NodeArray<Node>) => T): T | undefined;
    getSourceFile(): SourceFile;
}

export interface SourceFile extends Node {
    readonly kind: SyntaxKind.SourceFile;
    readonly statements: NodeArray<Statement>;
    readonly endOfFileToken: EndOfFile;
    readonly text: string;
    readonly fileName: string;
    readonly path: Path;
}

export type TriviaSyntaxKind =
    | SyntaxKind.SingleLineCommentTrivia
    | SyntaxKind.MultiLineCommentTrivia
    | SyntaxKind.NewLineTrivia
    | SyntaxKind.WhitespaceTrivia
    | SyntaxKind.ConflictMarkerTrivia;

export type LiteralSyntaxKind =
    | SyntaxKind.NumericLiteral
    | SyntaxKind.BigIntLiteral
    | SyntaxKind.StringLiteral
    | SyntaxKind.JsxText
    | SyntaxKind.JsxTextAllWhiteSpaces
    | SyntaxKind.RegularExpressionLiteral
    | SyntaxKind.NoSubstitutionTemplateLiteral;

export type PseudoLiteralSyntaxKind =
    | SyntaxKind.TemplateHead
    | SyntaxKind.TemplateMiddle
    | SyntaxKind.TemplateTail;

export type PunctuationSyntaxKind =
    | SyntaxKind.OpenBraceToken
    | SyntaxKind.CloseBraceToken
    | SyntaxKind.OpenParenToken
    | SyntaxKind.CloseParenToken
    | SyntaxKind.OpenBracketToken
    | SyntaxKind.CloseBracketToken
    | SyntaxKind.DotToken
    | SyntaxKind.DotDotDotToken
    | SyntaxKind.SemicolonToken
    | SyntaxKind.CommaToken
    | SyntaxKind.QuestionDotToken
    | SyntaxKind.LessThanToken
    | SyntaxKind.LessThanSlashToken
    | SyntaxKind.GreaterThanToken
    | SyntaxKind.LessThanEqualsToken
    | SyntaxKind.GreaterThanEqualsToken
    | SyntaxKind.EqualsEqualsToken
    | SyntaxKind.ExclamationEqualsToken
    | SyntaxKind.EqualsEqualsEqualsToken
    | SyntaxKind.ExclamationEqualsEqualsToken
    | SyntaxKind.EqualsGreaterThanToken
    | SyntaxKind.PlusToken
    | SyntaxKind.MinusToken
    | SyntaxKind.AsteriskToken
    | SyntaxKind.AsteriskAsteriskToken
    | SyntaxKind.SlashToken
    | SyntaxKind.PercentToken
    | SyntaxKind.PlusPlusToken
    | SyntaxKind.MinusMinusToken
    | SyntaxKind.LessThanLessThanToken
    | SyntaxKind.GreaterThanGreaterThanToken
    | SyntaxKind.GreaterThanGreaterThanGreaterThanToken
    | SyntaxKind.AmpersandToken
    | SyntaxKind.BarToken
    | SyntaxKind.CaretToken
    | SyntaxKind.ExclamationToken
    | SyntaxKind.TildeToken
    | SyntaxKind.AmpersandAmpersandToken
    | SyntaxKind.AmpersandAmpersandEqualsToken
    | SyntaxKind.BarBarToken
    | SyntaxKind.BarBarEqualsToken
    | SyntaxKind.QuestionQuestionToken
    | SyntaxKind.QuestionQuestionEqualsToken
    | SyntaxKind.QuestionToken
    | SyntaxKind.ColonToken
    | SyntaxKind.AtToken
    | SyntaxKind.BacktickToken
    | SyntaxKind.HashToken
    | SyntaxKind.EqualsToken
    | SyntaxKind.PlusEqualsToken
    | SyntaxKind.MinusEqualsToken
    | SyntaxKind.AsteriskEqualsToken
    | SyntaxKind.AsteriskAsteriskEqualsToken
    | SyntaxKind.SlashEqualsToken
    | SyntaxKind.PercentEqualsToken
    | SyntaxKind.LessThanLessThanEqualsToken
    | SyntaxKind.GreaterThanGreaterThanEqualsToken
    | SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken
    | SyntaxKind.AmpersandEqualsToken
    | SyntaxKind.BarEqualsToken
    | SyntaxKind.CaretEqualsToken;

export type KeywordSyntaxKind =
    | SyntaxKind.AbstractKeyword
    | SyntaxKind.AccessorKeyword
    | SyntaxKind.AnyKeyword
    | SyntaxKind.AsKeyword
    | SyntaxKind.AssertsKeyword
    | SyntaxKind.AssertKeyword
    | SyntaxKind.AsyncKeyword
    | SyntaxKind.AwaitKeyword
    | SyntaxKind.BigIntKeyword
    | SyntaxKind.BooleanKeyword
    | SyntaxKind.BreakKeyword
    | SyntaxKind.CaseKeyword
    | SyntaxKind.CatchKeyword
    | SyntaxKind.ClassKeyword
    | SyntaxKind.ConstKeyword
    | SyntaxKind.ConstructorKeyword
    | SyntaxKind.ContinueKeyword
    | SyntaxKind.DebuggerKeyword
    | SyntaxKind.DeclareKeyword
    | SyntaxKind.DefaultKeyword
    | SyntaxKind.DeleteKeyword
    | SyntaxKind.DoKeyword
    | SyntaxKind.ElseKeyword
    | SyntaxKind.EnumKeyword
    | SyntaxKind.ExportKeyword
    | SyntaxKind.ExtendsKeyword
    | SyntaxKind.FalseKeyword
    | SyntaxKind.FinallyKeyword
    | SyntaxKind.ForKeyword
    | SyntaxKind.FromKeyword
    | SyntaxKind.FunctionKeyword
    | SyntaxKind.GetKeyword
    | SyntaxKind.GlobalKeyword
    | SyntaxKind.IfKeyword
    | SyntaxKind.ImplementsKeyword
    | SyntaxKind.ImportKeyword
    | SyntaxKind.InferKeyword
    | SyntaxKind.InKeyword
    | SyntaxKind.InstanceOfKeyword
    | SyntaxKind.InterfaceKeyword
    | SyntaxKind.IntrinsicKeyword
    | SyntaxKind.IsKeyword
    | SyntaxKind.KeyOfKeyword
    | SyntaxKind.LetKeyword
    | SyntaxKind.ModuleKeyword
    | SyntaxKind.NamespaceKeyword
    | SyntaxKind.NeverKeyword
    | SyntaxKind.NewKeyword
    | SyntaxKind.NullKeyword
    | SyntaxKind.NumberKeyword
    | SyntaxKind.ObjectKeyword
    | SyntaxKind.OfKeyword
    | SyntaxKind.PackageKeyword
    | SyntaxKind.PrivateKeyword
    | SyntaxKind.ProtectedKeyword
    | SyntaxKind.PublicKeyword
    | SyntaxKind.ReadonlyKeyword
    | SyntaxKind.OutKeyword
    | SyntaxKind.OverrideKeyword
    | SyntaxKind.RequireKeyword
    | SyntaxKind.ReturnKeyword
    | SyntaxKind.SatisfiesKeyword
    | SyntaxKind.SetKeyword
    | SyntaxKind.StaticKeyword
    | SyntaxKind.StringKeyword
    | SyntaxKind.SuperKeyword
    | SyntaxKind.SwitchKeyword
    | SyntaxKind.SymbolKeyword
    | SyntaxKind.ThisKeyword
    | SyntaxKind.ThrowKeyword
    | SyntaxKind.TrueKeyword
    | SyntaxKind.TryKeyword
    | SyntaxKind.TypeKeyword
    | SyntaxKind.TypeOfKeyword
    | SyntaxKind.UndefinedKeyword
    | SyntaxKind.UniqueKeyword
    | SyntaxKind.UnknownKeyword
    | SyntaxKind.UsingKeyword
    | SyntaxKind.VarKeyword
    | SyntaxKind.VoidKeyword
    | SyntaxKind.WhileKeyword
    | SyntaxKind.WithKeyword
    | SyntaxKind.YieldKeyword;

export type ModifierSyntaxKind =
    | SyntaxKind.AbstractKeyword
    | SyntaxKind.AccessorKeyword
    | SyntaxKind.AsyncKeyword
    | SyntaxKind.ConstKeyword
    | SyntaxKind.DeclareKeyword
    | SyntaxKind.DefaultKeyword
    | SyntaxKind.ExportKeyword
    | SyntaxKind.InKeyword
    | SyntaxKind.PrivateKeyword
    | SyntaxKind.ProtectedKeyword
    | SyntaxKind.PublicKeyword
    | SyntaxKind.ReadonlyKeyword
    | SyntaxKind.OutKeyword
    | SyntaxKind.OverrideKeyword
    | SyntaxKind.StaticKeyword;

export type KeywordTypeSyntaxKind =
    | SyntaxKind.AnyKeyword
    | SyntaxKind.BigIntKeyword
    | SyntaxKind.BooleanKeyword
    | SyntaxKind.IntrinsicKeyword
    | SyntaxKind.NeverKeyword
    | SyntaxKind.NumberKeyword
    | SyntaxKind.ObjectKeyword
    | SyntaxKind.StringKeyword
    | SyntaxKind.SymbolKeyword
    | SyntaxKind.UndefinedKeyword
    | SyntaxKind.UnknownKeyword
    | SyntaxKind.VoidKeyword;

export type TokenSyntaxKind =
    | SyntaxKind.Unknown
    | SyntaxKind.EndOfFile
    | TriviaSyntaxKind
    | LiteralSyntaxKind
    | PseudoLiteralSyntaxKind
    | PunctuationSyntaxKind
    | SyntaxKind.Identifier
    | KeywordSyntaxKind;

export type JsxTokenSyntaxKind =
    | SyntaxKind.LessThanSlashToken
    | SyntaxKind.EndOfFile
    | SyntaxKind.ConflictMarkerTrivia
    | SyntaxKind.JsxText
    | SyntaxKind.JsxTextAllWhiteSpaces
    | SyntaxKind.OpenBraceToken
    | SyntaxKind.LessThanToken;

export type JSDocSyntaxKind =
    | SyntaxKind.EndOfFile
    | SyntaxKind.WhitespaceTrivia
    | SyntaxKind.AtToken
    | SyntaxKind.NewLineTrivia
    | SyntaxKind.AsteriskToken
    | SyntaxKind.OpenBraceToken
    | SyntaxKind.CloseBraceToken
    | SyntaxKind.LessThanToken
    | SyntaxKind.GreaterThanToken
    | SyntaxKind.OpenBracketToken
    | SyntaxKind.CloseBracketToken
    | SyntaxKind.OpenParenToken
    | SyntaxKind.CloseParenToken
    | SyntaxKind.EqualsToken
    | SyntaxKind.CommaToken
    | SyntaxKind.DotToken
    | SyntaxKind.Identifier
    | SyntaxKind.BacktickToken
    | SyntaxKind.HashToken
    | SyntaxKind.Unknown
    | KeywordSyntaxKind;

export interface ReadonlyTextRange {
    readonly pos: number;
    readonly end: number;
}

export interface NodeArray<T> extends ReadonlyTextRange, ReadonlyArray<T> {
    readonly length: number;
    readonly pos: number;
    readonly end: number;
    at(index: number): T | undefined;
}

// TODO(rbuckton): Constraint 'TKind' to 'TokenSyntaxKind'
export interface Token<TKind extends SyntaxKind> extends Node {
    readonly kind: TKind;
}

export type EndOfFile = Token<SyntaxKind.EndOfFile>;

// Punctuation
export interface PunctuationToken<TKind extends PunctuationSyntaxKind> extends Token<TKind> {
}

export type DotToken = PunctuationToken<SyntaxKind.DotToken>;
export type DotDotDotToken = PunctuationToken<SyntaxKind.DotDotDotToken>;
export type QuestionToken = PunctuationToken<SyntaxKind.QuestionToken>;
export type ExclamationToken = PunctuationToken<SyntaxKind.ExclamationToken>;
export type ColonToken = PunctuationToken<SyntaxKind.ColonToken>;
export type EqualsToken = PunctuationToken<SyntaxKind.EqualsToken>;
export type AmpersandAmpersandEqualsToken = PunctuationToken<SyntaxKind.AmpersandAmpersandEqualsToken>;
export type BarBarEqualsToken = PunctuationToken<SyntaxKind.BarBarEqualsToken>;
export type QuestionQuestionEqualsToken = PunctuationToken<SyntaxKind.QuestionQuestionEqualsToken>;
export type AsteriskToken = PunctuationToken<SyntaxKind.AsteriskToken>;
export type EqualsGreaterThanToken = PunctuationToken<SyntaxKind.EqualsGreaterThanToken>;
export type PlusToken = PunctuationToken<SyntaxKind.PlusToken>;
export type MinusToken = PunctuationToken<SyntaxKind.MinusToken>;
export type QuestionDotToken = PunctuationToken<SyntaxKind.QuestionDotToken>;

// Keywords
export interface KeywordToken<TKind extends KeywordSyntaxKind> extends Token<TKind> {
}

export type AssertsKeyword = KeywordToken<SyntaxKind.AssertsKeyword>;
export type AssertKeyword = KeywordToken<SyntaxKind.AssertKeyword>;
export type AwaitKeyword = KeywordToken<SyntaxKind.AwaitKeyword>;
export type CaseKeyword = KeywordToken<SyntaxKind.CaseKeyword>;

export interface ModifierToken<TKind extends ModifierSyntaxKind> extends KeywordToken<TKind> {
}

export type AbstractKeyword = ModifierToken<SyntaxKind.AbstractKeyword>;
export type AccessorKeyword = ModifierToken<SyntaxKind.AccessorKeyword>;
export type AsyncKeyword = ModifierToken<SyntaxKind.AsyncKeyword>;
export type ConstKeyword = ModifierToken<SyntaxKind.ConstKeyword>;
export type DeclareKeyword = ModifierToken<SyntaxKind.DeclareKeyword>;
export type DefaultKeyword = ModifierToken<SyntaxKind.DefaultKeyword>;
export type ExportKeyword = ModifierToken<SyntaxKind.ExportKeyword>;
export type InKeyword = ModifierToken<SyntaxKind.InKeyword>;
export type PrivateKeyword = ModifierToken<SyntaxKind.PrivateKeyword>;
export type ProtectedKeyword = ModifierToken<SyntaxKind.ProtectedKeyword>;
export type PublicKeyword = ModifierToken<SyntaxKind.PublicKeyword>;
export type ReadonlyKeyword = ModifierToken<SyntaxKind.ReadonlyKeyword>;
export type OutKeyword = ModifierToken<SyntaxKind.OutKeyword>;
export type OverrideKeyword = ModifierToken<SyntaxKind.OverrideKeyword>;
export type StaticKeyword = ModifierToken<SyntaxKind.StaticKeyword>;

export type Modifier =
    | AbstractKeyword
    | AccessorKeyword
    | AsyncKeyword
    | ConstKeyword
    | DeclareKeyword
    | DefaultKeyword
    | ExportKeyword
    | InKeyword
    | PrivateKeyword
    | ProtectedKeyword
    | PublicKeyword
    | OutKeyword
    | OverrideKeyword
    | ReadonlyKeyword
    | StaticKeyword;

export type ModifierLike = Modifier | Decorator;

export type AccessibilityModifier =
    | PublicKeyword
    | PrivateKeyword
    | ProtectedKeyword;

export type ParameterPropertyModifier =
    | AccessibilityModifier
    | ReadonlyKeyword;

export type ClassMemberModifier =
    | AccessibilityModifier
    | ReadonlyKeyword
    | StaticKeyword
    | AccessorKeyword;

export type ModifiersArray = NodeArray<Modifier>;

export interface Identifier extends PrimaryExpression, Declaration {
    readonly kind: SyntaxKind.Identifier;
    /**
     * Prefer to use `id.unescapedText`. (Note: This is available only in services, not internally to the TypeScript compiler.)
     * Text of identifier, but if the identifier begins with two underscores, this will begin with three.
     */
    readonly text: string;
}

export interface QualifiedName extends Node {
    readonly kind: SyntaxKind.QualifiedName;
    readonly left: EntityName;
    readonly right: Identifier;
}

export type EntityName = Identifier | QualifiedName;

export type PropertyName =
    | Identifier
    | StringLiteral
    | NoSubstitutionTemplateLiteral
    | NumericLiteral
    | ComputedPropertyName
    | PrivateIdentifier
    | BigIntLiteral;

export type MemberName = Identifier | PrivateIdentifier;

export type DeclarationName =
    | PropertyName
    | JsxAttributeName
    | StringLiteralLike
    | ElementAccessExpression
    | BindingPattern
    | EntityNameExpression;

export interface Declaration extends Node {
}

export interface NamedDeclaration extends Declaration {
    readonly name?: DeclarationName;
}

export interface DeclarationStatement extends NamedDeclaration, Statement {
    readonly name?: Identifier | StringLiteral | NumericLiteral;
}

export interface ComputedPropertyName extends Node {
    readonly kind: SyntaxKind.ComputedPropertyName;
    readonly parent: Declaration;
    readonly expression: Expression;
}

// Typed as a PrimaryExpression due to its presence in BinaryExpressions (#field in expr)
export interface PrivateIdentifier extends PrimaryExpression {
    readonly kind: SyntaxKind.PrivateIdentifier;
    // escaping not strictly necessary
    // avoids gotchas in transforms and utils
    readonly escapedText: string;
}

export interface Decorator extends Node {
    readonly kind: SyntaxKind.Decorator;
    readonly parent: NamedDeclaration;
    readonly expression: LeftHandSideExpression;
}

export interface TypeParameterDeclaration extends NamedDeclaration {
    readonly kind: SyntaxKind.TypeParameter;
    readonly parent: DeclarationWithTypeParameterChildren | InferTypeNode;
    readonly modifiers?: NodeArray<Modifier>;
    readonly name: Identifier;
    /** Note: Consider calling `getEffectiveConstraintOfTypeParameter` */
    readonly constraint?: TypeNode;
    readonly default?: TypeNode;

    // For error recovery purposes (see `isGrammarError` in utilities.ts).
    expression?: Expression;
}

export interface SignatureDeclarationBase extends NamedDeclaration {
    readonly kind: SignatureDeclaration["kind"];
    readonly name?: PropertyName;
    readonly typeParameters?: NodeArray<TypeParameterDeclaration> | undefined;
    readonly parameters: NodeArray<ParameterDeclaration>;
    readonly type?: TypeNode | undefined;
}

export type SignatureDeclaration =
    | CallSignatureDeclaration
    | ConstructSignatureDeclaration
    | MethodSignature
    | IndexSignatureDeclaration
    | FunctionTypeNode
    | ConstructorTypeNode
    | FunctionDeclaration
    | MethodDeclaration
    | ConstructorDeclaration
    | AccessorDeclaration
    | FunctionExpression
    | ArrowFunction;

export interface CallSignatureDeclaration extends SignatureDeclarationBase, TypeElement {
    readonly kind: SyntaxKind.CallSignature;
}

export interface ConstructSignatureDeclaration extends SignatureDeclarationBase, TypeElement {
    readonly kind: SyntaxKind.ConstructSignature;
}

export type BindingName = Identifier | BindingPattern;

// dprint-ignore
export interface VariableDeclaration extends NamedDeclaration {
    readonly kind: SyntaxKind.VariableDeclaration;
    readonly parent: VariableDeclarationList | CatchClause;
    readonly name: BindingName;                    // Declared variable name
    readonly exclamationToken?: ExclamationToken;  // Optional definite assignment assertion
    readonly type?: TypeNode;                      // Optional type annotation
    readonly initializer?: Expression;             // Optional initializer
}

export interface VariableDeclarationList extends Node {
    readonly kind: SyntaxKind.VariableDeclarationList;
    readonly parent: VariableStatement | ForStatement | ForOfStatement | ForInStatement;
    readonly declarations: NodeArray<VariableDeclaration>;
}

// dprint-ignore
export interface ParameterDeclaration extends NamedDeclaration {
    readonly kind: SyntaxKind.Parameter;
    readonly parent: SignatureDeclaration;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly dotDotDotToken?: DotDotDotToken;    // Present on rest parameter
    readonly name: BindingName;                  // Declared parameter name.
    readonly questionToken?: QuestionToken;      // Present on optional parameter
    readonly type?: TypeNode;                    // Optional type annotation
    readonly initializer?: Expression;           // Optional initializer
}

// dprint-ignore
export interface BindingElement extends NamedDeclaration {
    readonly kind: SyntaxKind.BindingElement;
    readonly parent: BindingPattern;
    readonly propertyName?: PropertyName;        // Binding property name (in object binding pattern)
    readonly dotDotDotToken?: DotDotDotToken;    // Present on rest element (in object binding pattern)
    readonly name: BindingName;                  // Declared binding element name
    readonly initializer?: Expression;           // Optional initializer
}

// dprint-ignore
export interface PropertySignature extends TypeElement {
    readonly kind: SyntaxKind.PropertySignature;
    readonly parent: TypeLiteralNode | InterfaceDeclaration;
    readonly modifiers?: NodeArray<Modifier>;
    readonly name: PropertyName;                 // Declared property name
    readonly postfixToken?: QuestionToken;       // Present on optional property
    readonly type?: TypeNode;                    // Optional type annotation
}

// dprint-ignore
export interface PropertyDeclaration extends ClassElement {
    readonly kind: SyntaxKind.PropertyDeclaration;
    readonly parent: ClassLikeDeclaration;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly name: PropertyName;
    readonly postfixToken?: QuestionToken | ExclamationToken;
    readonly type?: TypeNode;
    readonly initializer?: Expression;           // Optional initializer
}

export interface AutoAccessorPropertyDeclaration extends PropertyDeclaration {
    _autoAccessorBrand: any;
}

export interface ObjectLiteralElement extends NamedDeclaration {
    _objectLiteralBrand: any;
    readonly name?: PropertyName;
}

/** Unlike ObjectLiteralElement, excludes JSXAttribute and JSXSpreadAttribute. */
export type ObjectLiteralElementLike =
    | PropertyAssignment
    | ShorthandPropertyAssignment
    | SpreadAssignment
    | MethodDeclaration
    | AccessorDeclaration;

export interface PropertyAssignment extends ObjectLiteralElement {
    readonly kind: SyntaxKind.PropertyAssignment;
    readonly parent: ObjectLiteralExpression;
    readonly name: PropertyName;
    readonly postfixToken?: QuestionToken;
    readonly initializer: Expression;
}

export interface ShorthandPropertyAssignment extends ObjectLiteralElement {
    readonly kind: SyntaxKind.ShorthandPropertyAssignment;
    readonly parent: ObjectLiteralExpression;
    readonly name: Identifier;
    readonly postfixToken?: QuestionToken;
    // used when ObjectLiteralExpression is used in ObjectAssignmentPattern
    // it is a grammar error to appear in actual object initializer (see `isGrammarError` in utilities.ts):
    readonly equalsToken?: EqualsToken;
    readonly objectAssignmentInitializer?: Expression;
}

export interface SpreadAssignment extends ObjectLiteralElement {
    readonly kind: SyntaxKind.SpreadAssignment;
    readonly parent: ObjectLiteralExpression;
    readonly expression: Expression;
}

export type VariableLikeDeclaration =
    | VariableDeclaration
    | ParameterDeclaration
    | BindingElement
    | PropertyDeclaration
    | PropertyAssignment
    | PropertySignature
    | JsxAttribute
    | ShorthandPropertyAssignment
    | EnumMember
    | JSDocPropertyTag
    | JSDocParameterTag;

export interface ObjectBindingPattern extends Node {
    readonly kind: SyntaxKind.ObjectBindingPattern;
    readonly parent: VariableDeclaration | ParameterDeclaration | BindingElement;
    readonly elements: NodeArray<BindingElement>;
}

export interface ArrayBindingPattern extends Node {
    readonly kind: SyntaxKind.ArrayBindingPattern;
    readonly parent: VariableDeclaration | ParameterDeclaration | BindingElement;
    readonly elements: NodeArray<ArrayBindingElement>;
}

export type BindingPattern = ObjectBindingPattern | ArrayBindingPattern;

export type ArrayBindingElement = BindingElement | OmittedExpression;

/**
 * Several node kinds share function-like features such as a signature,
 * a name, and a body. These nodes should extend FunctionLikeDeclarationBase.
 * Examples:
 * - FunctionDeclaration
 * - MethodDeclaration
 * - AccessorDeclaration
 */
export interface FunctionLikeDeclarationBase extends SignatureDeclarationBase {
    _functionLikeDeclarationBrand: any;

    readonly asteriskToken?: AsteriskToken | undefined;
    readonly questionToken?: QuestionToken | undefined;
    readonly exclamationToken?: ExclamationToken | undefined;
    readonly body?: Block | Expression | undefined;
}

export type FunctionLikeDeclaration =
    | FunctionDeclaration
    | MethodDeclaration
    | GetAccessorDeclaration
    | SetAccessorDeclaration
    | ConstructorDeclaration
    | FunctionExpression
    | ArrowFunction;
/** @deprecated Use SignatureDeclaration */
export type FunctionLike = SignatureDeclaration;

export interface FunctionDeclaration extends FunctionLikeDeclarationBase, DeclarationStatement {
    readonly kind: SyntaxKind.FunctionDeclaration;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly name?: Identifier;
    readonly body?: FunctionBody;
}

export interface MethodSignature extends SignatureDeclarationBase, TypeElement {
    readonly kind: SyntaxKind.MethodSignature;
    readonly parent: TypeLiteralNode | InterfaceDeclaration;
    readonly modifiers?: NodeArray<Modifier>;
    readonly name: PropertyName;
    readonly postfixToken?: QuestionToken;
}

// Note that a MethodDeclaration is considered both a ClassElement and an ObjectLiteralElement.
// Both the grammars for ClassDeclaration and ObjectLiteralExpression allow for MethodDeclarations
// as child elements, and so a MethodDeclaration satisfies both interfaces.  This avoids the
// alternative where we would need separate kinds/types for ClassMethodDeclaration and
// ObjectLiteralMethodDeclaration, which would look identical.
//
// Because of this, it may be necessary to determine what sort of MethodDeclaration you have
// at later stages of the compiler pipeline.  In that case, you can either check the parent kind
// of the method, or use helpers like isObjectLiteralMethodDeclaration
export interface MethodDeclaration extends FunctionLikeDeclarationBase, ClassElement, ObjectLiteralElement {
    readonly kind: SyntaxKind.MethodDeclaration;
    readonly parent: ClassLikeDeclaration | ObjectLiteralExpression;
    readonly modifiers?: NodeArray<ModifierLike> | undefined;
    readonly name: PropertyName;
    readonly postfixToken?: QuestionToken;
    readonly body?: FunctionBody | undefined;
}

export interface ConstructorDeclaration extends FunctionLikeDeclarationBase, ClassElement {
    readonly kind: SyntaxKind.Constructor;
    readonly parent: ClassLikeDeclaration;
    readonly modifiers?: NodeArray<ModifierLike> | undefined;
    readonly body?: FunctionBody | undefined;
}

/** For when we encounter a semicolon in a class declaration. ES6 allows these as class elements. */
export interface SemicolonClassElement extends ClassElement {
    readonly kind: SyntaxKind.SemicolonClassElement;
    readonly parent: ClassLikeDeclaration;
}

// See the comment on MethodDeclaration for the intuition behind GetAccessorDeclaration being a
// ClassElement and an ObjectLiteralElement.
export interface GetAccessorDeclaration extends FunctionLikeDeclarationBase, ClassElement, TypeElement, ObjectLiteralElement {
    readonly kind: SyntaxKind.GetAccessor;
    readonly parent: ClassLikeDeclaration | ObjectLiteralExpression | TypeLiteralNode | InterfaceDeclaration;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly name: PropertyName;
    readonly body?: FunctionBody;
}

// See the comment on MethodDeclaration for the intuition behind SetAccessorDeclaration being a
// ClassElement and an ObjectLiteralElement.
export interface SetAccessorDeclaration extends FunctionLikeDeclarationBase, ClassElement, TypeElement, ObjectLiteralElement {
    readonly kind: SyntaxKind.SetAccessor;
    readonly parent: ClassLikeDeclaration | ObjectLiteralExpression | TypeLiteralNode | InterfaceDeclaration;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly name: PropertyName;
    readonly body?: FunctionBody;
}

export type AccessorDeclaration = GetAccessorDeclaration | SetAccessorDeclaration;

export interface IndexSignatureDeclaration extends SignatureDeclarationBase, ClassElement, TypeElement {
    readonly kind: SyntaxKind.IndexSignature;
    readonly parent: ObjectTypeDeclaration;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly type: TypeNode;
}

export interface ClassStaticBlockDeclaration extends ClassElement {
    readonly kind: SyntaxKind.ClassStaticBlockDeclaration;
    readonly parent: ClassDeclaration | ClassExpression;
    readonly body: Block;
}

export interface TypeNode extends Node {
    _typeNodeBrand: any;
}

export interface KeywordTypeNode<TKind extends KeywordTypeSyntaxKind = KeywordTypeSyntaxKind> extends KeywordToken<TKind>, TypeNode {
    readonly kind: TKind;
}

export interface ImportTypeNode extends NodeWithTypeArguments {
    readonly kind: SyntaxKind.ImportType;
    readonly isTypeOf: boolean;
    readonly argument: TypeNode;
    readonly attributes?: ImportAttributes;
    readonly qualifier?: EntityName;
}

export interface ThisTypeNode extends TypeNode {
    readonly kind: SyntaxKind.ThisType;
}

export type FunctionOrConstructorTypeNode = FunctionTypeNode | ConstructorTypeNode;

export interface FunctionOrConstructorTypeNodeBase extends TypeNode, SignatureDeclarationBase {
    readonly kind: SyntaxKind.FunctionType | SyntaxKind.ConstructorType;
    readonly type: TypeNode;
}

export interface FunctionTypeNode extends FunctionOrConstructorTypeNodeBase {
    readonly kind: SyntaxKind.FunctionType;
}

export interface ConstructorTypeNode extends FunctionOrConstructorTypeNodeBase {
    readonly kind: SyntaxKind.ConstructorType;
    readonly modifiers?: NodeArray<Modifier>;
}

export interface NodeWithTypeArguments extends TypeNode {
    readonly typeArguments?: NodeArray<TypeNode>;
}

export type TypeReferenceType = TypeReferenceNode | ExpressionWithTypeArguments;

export interface TypeReferenceNode extends NodeWithTypeArguments {
    readonly kind: SyntaxKind.TypeReference;
    readonly typeName: EntityName;
}

export interface TypePredicateNode extends TypeNode {
    readonly kind: SyntaxKind.TypePredicate;
    readonly parent: SignatureDeclaration | JSDocTypeExpression;
    readonly assertsModifier?: AssertsKeyword;
    readonly parameterName: Identifier | ThisTypeNode;
    readonly type?: TypeNode;
}

export interface TypeQueryNode extends NodeWithTypeArguments {
    readonly kind: SyntaxKind.TypeQuery;
    readonly exprName: EntityName;
}

// A TypeLiteral is the declaration node for an anonymous symbol.
export interface TypeLiteralNode extends TypeNode, Declaration {
    readonly kind: SyntaxKind.TypeLiteral;
    readonly members: NodeArray<TypeElement>;
}

export interface ArrayTypeNode extends TypeNode {
    readonly kind: SyntaxKind.ArrayType;
    readonly elementType: TypeNode;
}

export interface TupleTypeNode extends TypeNode {
    readonly kind: SyntaxKind.TupleType;
    readonly elements: NodeArray<TypeNode | NamedTupleMember>;
}

export interface NamedTupleMember extends TypeNode, Declaration {
    readonly kind: SyntaxKind.NamedTupleMember;
    readonly dotDotDotToken?: Token<SyntaxKind.DotDotDotToken>;
    readonly name: Identifier;
    readonly questionToken?: Token<SyntaxKind.QuestionToken>;
    readonly type: TypeNode;
}

export interface OptionalTypeNode extends TypeNode {
    readonly kind: SyntaxKind.OptionalType;
    readonly type: TypeNode;
}

export interface RestTypeNode extends TypeNode {
    readonly kind: SyntaxKind.RestType;
    readonly type: TypeNode;
}

export type UnionOrIntersectionTypeNode = UnionTypeNode | IntersectionTypeNode;

export interface UnionTypeNode extends TypeNode {
    readonly kind: SyntaxKind.UnionType;
    readonly types: NodeArray<TypeNode>;
}

export interface IntersectionTypeNode extends TypeNode {
    readonly kind: SyntaxKind.IntersectionType;
    readonly types: NodeArray<TypeNode>;
}

export interface ConditionalTypeNode extends TypeNode {
    readonly kind: SyntaxKind.ConditionalType;
    readonly checkType: TypeNode;
    readonly extendsType: TypeNode;
    readonly trueType: TypeNode;
    readonly falseType: TypeNode;
}

export interface InferTypeNode extends TypeNode {
    readonly kind: SyntaxKind.InferType;
    readonly typeParameter: TypeParameterDeclaration;
}

export interface ParenthesizedTypeNode extends TypeNode {
    readonly kind: SyntaxKind.ParenthesizedType;
    readonly type: TypeNode;
}

export interface TypeOperatorNode extends TypeNode {
    readonly kind: SyntaxKind.TypeOperator;
    readonly operator: SyntaxKind.KeyOfKeyword | SyntaxKind.UniqueKeyword | SyntaxKind.ReadonlyKeyword;
    readonly type: TypeNode;
}

export interface IndexedAccessTypeNode extends TypeNode {
    readonly kind: SyntaxKind.IndexedAccessType;
    readonly objectType: TypeNode;
    readonly indexType: TypeNode;
}

export interface MappedTypeNode extends TypeNode, Declaration {
    readonly kind: SyntaxKind.MappedType;
    readonly readonlyToken?: ReadonlyKeyword | PlusToken | MinusToken;
    readonly typeParameter: TypeParameterDeclaration;
    readonly nameType?: TypeNode;
    readonly questionToken?: QuestionToken | PlusToken | MinusToken;
    readonly type?: TypeNode;
    /** Used only to produce grammar errors */
    readonly members?: NodeArray<TypeElement>;
}

export interface LiteralTypeNode extends TypeNode {
    readonly kind: SyntaxKind.LiteralType;
    readonly literal: NullLiteral | BooleanLiteral | LiteralExpression | PrefixUnaryExpression;
}

export interface StringLiteral extends LiteralExpression, Declaration {
    readonly kind: SyntaxKind.StringLiteral;
}

export type StringLiteralLike = StringLiteral | NoSubstitutionTemplateLiteral;
export type PropertyNameLiteral = Identifier | StringLiteralLike | NumericLiteral | JsxNamespacedName | BigIntLiteral;

export interface TemplateLiteralTypeNode extends TypeNode {
    kind: SyntaxKind.TemplateLiteralType;
    readonly head: TemplateHead;
    readonly templateSpans: NodeArray<TemplateLiteralTypeSpan>;
}

export interface TemplateLiteralTypeSpan extends TypeNode {
    readonly kind: SyntaxKind.TemplateLiteralTypeSpan;
    readonly parent: TemplateLiteralTypeNode;
    readonly type: TypeNode;
    readonly literal: TemplateMiddle | TemplateTail;
}

// Note: 'brands' in our syntax nodes serve to give us a small amount of nominal typing.
// Consider 'Expression'.  Without the brand, 'Expression' is actually no different
// (structurally) than 'Node'.  Because of this you can pass any Node to a function that
// takes an Expression without any error.  By using the 'brands' we ensure that the type
// checker actually thinks you have something of the right type.  Note: the brands are
// never actually given values.  At runtime they have zero cost.

export interface Expression extends Node {
    _expressionBrand: any;
}

export interface OmittedExpression extends Expression {
    readonly kind: SyntaxKind.OmittedExpression;
}

// Represents an expression that is elided as part of a transformation to emit comments on a
// not-emitted node. The 'expression' property of a PartiallyEmittedExpression should be emitted.
export interface PartiallyEmittedExpression extends LeftHandSideExpression {
    readonly kind: SyntaxKind.PartiallyEmittedExpression;
    readonly expression: Expression;
}

export interface UnaryExpression extends Expression {
    _unaryExpressionBrand: any;
}

/** Deprecated, please use UpdateExpression */
export type IncrementExpression = UpdateExpression;
export interface UpdateExpression extends UnaryExpression {
    _updateExpressionBrand: any;
}

// see: https://tc39.github.io/ecma262/#prod-UpdateExpression
// see: https://tc39.github.io/ecma262/#prod-UnaryExpression
export type PrefixUnaryOperator =
    | SyntaxKind.PlusPlusToken
    | SyntaxKind.MinusMinusToken
    | SyntaxKind.PlusToken
    | SyntaxKind.MinusToken
    | SyntaxKind.TildeToken
    | SyntaxKind.ExclamationToken;

export interface PrefixUnaryExpression extends UpdateExpression {
    readonly kind: SyntaxKind.PrefixUnaryExpression;
    readonly operator: PrefixUnaryOperator;
    readonly operand: UnaryExpression;
}

// see: https://tc39.github.io/ecma262/#prod-UpdateExpression
export type PostfixUnaryOperator =
    | SyntaxKind.PlusPlusToken
    | SyntaxKind.MinusMinusToken;

export interface PostfixUnaryExpression extends UpdateExpression {
    readonly kind: SyntaxKind.PostfixUnaryExpression;
    readonly operand: LeftHandSideExpression;
    readonly operator: PostfixUnaryOperator;
}

export interface LeftHandSideExpression extends UpdateExpression {
    _leftHandSideExpressionBrand: any;
}

export interface MemberExpression extends LeftHandSideExpression {
    _memberExpressionBrand: any;
}

export interface PrimaryExpression extends MemberExpression {
    _primaryExpressionBrand: any;
}

export interface NullLiteral extends PrimaryExpression {
    readonly kind: SyntaxKind.NullKeyword;
}

export interface TrueLiteral extends PrimaryExpression {
    readonly kind: SyntaxKind.TrueKeyword;
}

export interface FalseLiteral extends PrimaryExpression {
    readonly kind: SyntaxKind.FalseKeyword;
}

export type BooleanLiteral = TrueLiteral | FalseLiteral;

export interface ThisExpression extends PrimaryExpression {
    readonly kind: SyntaxKind.ThisKeyword;
}

export interface SuperExpression extends PrimaryExpression {
    readonly kind: SyntaxKind.SuperKeyword;
}

export interface ImportExpression extends PrimaryExpression {
    readonly kind: SyntaxKind.ImportKeyword;
}

export interface DeleteExpression extends UnaryExpression {
    readonly kind: SyntaxKind.DeleteExpression;
    readonly expression: UnaryExpression;
}

export interface TypeOfExpression extends UnaryExpression {
    readonly kind: SyntaxKind.TypeOfExpression;
    readonly expression: UnaryExpression;
}

export interface VoidExpression extends UnaryExpression {
    readonly kind: SyntaxKind.VoidExpression;
    readonly expression: UnaryExpression;
}

export interface AwaitExpression extends UnaryExpression {
    readonly kind: SyntaxKind.AwaitExpression;
    readonly expression: UnaryExpression;
}

export interface YieldExpression extends Expression {
    readonly kind: SyntaxKind.YieldExpression;
    readonly asteriskToken?: AsteriskToken;
    readonly expression?: Expression;
}

// see: https://tc39.github.io/ecma262/#prod-ExponentiationExpression
export type ExponentiationOperator = SyntaxKind.AsteriskAsteriskToken;

// see: https://tc39.github.io/ecma262/#prod-MultiplicativeOperator
export type MultiplicativeOperator =
    | SyntaxKind.AsteriskToken
    | SyntaxKind.SlashToken
    | SyntaxKind.PercentToken;

// see: https://tc39.github.io/ecma262/#prod-MultiplicativeExpression
export type MultiplicativeOperatorOrHigher =
    | ExponentiationOperator
    | MultiplicativeOperator;

// see: https://tc39.github.io/ecma262/#prod-AdditiveExpression
export type AdditiveOperator =
    | SyntaxKind.PlusToken
    | SyntaxKind.MinusToken;

// see: https://tc39.github.io/ecma262/#prod-AdditiveExpression
export type AdditiveOperatorOrHigher =
    | MultiplicativeOperatorOrHigher
    | AdditiveOperator;

// see: https://tc39.github.io/ecma262/#prod-ShiftExpression
export type ShiftOperator =
    | SyntaxKind.LessThanLessThanToken
    | SyntaxKind.GreaterThanGreaterThanToken
    | SyntaxKind.GreaterThanGreaterThanGreaterThanToken;

// see: https://tc39.github.io/ecma262/#prod-ShiftExpression
export type ShiftOperatorOrHigher =
    | AdditiveOperatorOrHigher
    | ShiftOperator;

// see: https://tc39.github.io/ecma262/#prod-RelationalExpression
export type RelationalOperator =
    | SyntaxKind.LessThanToken
    | SyntaxKind.LessThanEqualsToken
    | SyntaxKind.GreaterThanToken
    | SyntaxKind.GreaterThanEqualsToken
    | SyntaxKind.InstanceOfKeyword
    | SyntaxKind.InKeyword;

// see: https://tc39.github.io/ecma262/#prod-RelationalExpression
export type RelationalOperatorOrHigher =
    | ShiftOperatorOrHigher
    | RelationalOperator;

// see: https://tc39.github.io/ecma262/#prod-EqualityExpression
export type EqualityOperator =
    | SyntaxKind.EqualsEqualsToken
    | SyntaxKind.EqualsEqualsEqualsToken
    | SyntaxKind.ExclamationEqualsEqualsToken
    | SyntaxKind.ExclamationEqualsToken;

// see: https://tc39.github.io/ecma262/#prod-EqualityExpression
export type EqualityOperatorOrHigher =
    | RelationalOperatorOrHigher
    | EqualityOperator;

// see: https://tc39.github.io/ecma262/#prod-BitwiseANDExpression
// see: https://tc39.github.io/ecma262/#prod-BitwiseXORExpression
// see: https://tc39.github.io/ecma262/#prod-BitwiseORExpression
export type BitwiseOperator =
    | SyntaxKind.AmpersandToken
    | SyntaxKind.BarToken
    | SyntaxKind.CaretToken;

// see: https://tc39.github.io/ecma262/#prod-BitwiseANDExpression
// see: https://tc39.github.io/ecma262/#prod-BitwiseXORExpression
// see: https://tc39.github.io/ecma262/#prod-BitwiseORExpression
export type BitwiseOperatorOrHigher =
    | EqualityOperatorOrHigher
    | BitwiseOperator;

// see: https://tc39.github.io/ecma262/#prod-LogicalANDExpression
// see: https://tc39.github.io/ecma262/#prod-LogicalORExpression
export type LogicalOperator =
    | SyntaxKind.AmpersandAmpersandToken
    | SyntaxKind.BarBarToken;

// see: https://tc39.github.io/ecma262/#prod-LogicalANDExpression
// see: https://tc39.github.io/ecma262/#prod-LogicalORExpression
export type LogicalOperatorOrHigher =
    | BitwiseOperatorOrHigher
    | LogicalOperator;

// see: https://tc39.github.io/ecma262/#prod-AssignmentOperator
export type CompoundAssignmentOperator =
    | SyntaxKind.PlusEqualsToken
    | SyntaxKind.MinusEqualsToken
    | SyntaxKind.AsteriskAsteriskEqualsToken
    | SyntaxKind.AsteriskEqualsToken
    | SyntaxKind.SlashEqualsToken
    | SyntaxKind.PercentEqualsToken
    | SyntaxKind.AmpersandEqualsToken
    | SyntaxKind.BarEqualsToken
    | SyntaxKind.CaretEqualsToken
    | SyntaxKind.LessThanLessThanEqualsToken
    | SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken
    | SyntaxKind.GreaterThanGreaterThanEqualsToken
    | SyntaxKind.BarBarEqualsToken
    | SyntaxKind.AmpersandAmpersandEqualsToken
    | SyntaxKind.QuestionQuestionEqualsToken;

// see: https://tc39.github.io/ecma262/#prod-AssignmentExpression
export type AssignmentOperator =
    | SyntaxKind.EqualsToken
    | CompoundAssignmentOperator;

// see: https://tc39.github.io/ecma262/#prod-AssignmentExpression
export type AssignmentOperatorOrHigher =
    | SyntaxKind.QuestionQuestionToken
    | LogicalOperatorOrHigher
    | AssignmentOperator;

// see: https://tc39.github.io/ecma262/#prod-Expression
export type BinaryOperator =
    | AssignmentOperatorOrHigher
    | SyntaxKind.CommaToken;

export type LogicalOrCoalescingAssignmentOperator =
    | SyntaxKind.AmpersandAmpersandEqualsToken
    | SyntaxKind.BarBarEqualsToken
    | SyntaxKind.QuestionQuestionEqualsToken;

export type BinaryOperatorToken = Token<BinaryOperator>;

export interface BinaryExpression extends Expression, Declaration {
    readonly kind: SyntaxKind.BinaryExpression;
    readonly left: Expression;
    readonly operatorToken: BinaryOperatorToken;
    readonly right: Expression;
}

export type AssignmentOperatorToken = Token<AssignmentOperator>;

export interface AssignmentExpression<TOperator extends AssignmentOperatorToken> extends BinaryExpression {
    readonly left: LeftHandSideExpression;
    readonly operatorToken: TOperator;
}

export interface ObjectDestructuringAssignment extends AssignmentExpression<EqualsToken> {
    readonly left: ObjectLiteralExpression;
}

export interface ArrayDestructuringAssignment extends AssignmentExpression<EqualsToken> {
    readonly left: ArrayLiteralExpression;
}

export type DestructuringAssignment =
    | ObjectDestructuringAssignment
    | ArrayDestructuringAssignment;

export type BindingOrAssignmentElement =
    | VariableDeclaration
    | ParameterDeclaration
    | ObjectBindingOrAssignmentElement
    | ArrayBindingOrAssignmentElement;

export type ObjectBindingOrAssignmentElement =
    | BindingElement
    | PropertyAssignment // AssignmentProperty
    | ShorthandPropertyAssignment // AssignmentProperty
    | SpreadAssignment // AssignmentRestProperty
;

export type ArrayBindingOrAssignmentElement =
    | BindingElement
    | OmittedExpression // Elision
    | SpreadElement // AssignmentRestElement
    | ArrayLiteralExpression // ArrayAssignmentPattern
    | ObjectLiteralExpression // ObjectAssignmentPattern
    | AssignmentExpression<EqualsToken> // AssignmentElement
    | Identifier // DestructuringAssignmentTarget
    | PropertyAccessExpression // DestructuringAssignmentTarget
    | ElementAccessExpression // DestructuringAssignmentTarget
;

export type BindingOrAssignmentElementRestIndicator =
    | DotDotDotToken // from BindingElement
    | SpreadElement // AssignmentRestElement
    | SpreadAssignment // AssignmentRestProperty
;

export type BindingOrAssignmentElementTarget =
    | BindingOrAssignmentPattern
    | Identifier
    | PropertyAccessExpression
    | ElementAccessExpression
    | OmittedExpression;

export type ObjectBindingOrAssignmentPattern =
    | ObjectBindingPattern
    | ObjectLiteralExpression // ObjectAssignmentPattern
;

export type ArrayBindingOrAssignmentPattern =
    | ArrayBindingPattern
    | ArrayLiteralExpression // ArrayAssignmentPattern
;

export type AssignmentPattern = ObjectLiteralExpression | ArrayLiteralExpression;

export type BindingOrAssignmentPattern = ObjectBindingOrAssignmentPattern | ArrayBindingOrAssignmentPattern;

export interface ConditionalExpression extends Expression {
    readonly kind: SyntaxKind.ConditionalExpression;
    readonly condition: Expression;
    readonly questionToken: QuestionToken;
    readonly whenTrue: Expression;
    readonly colonToken: ColonToken;
    readonly whenFalse: Expression;
}

export type FunctionBody = Block;
export type ConciseBody = FunctionBody | Expression;

export interface FunctionExpression extends PrimaryExpression, FunctionLikeDeclarationBase {
    readonly kind: SyntaxKind.FunctionExpression;
    readonly modifiers?: NodeArray<Modifier>;
    readonly name?: Identifier;
    readonly body: FunctionBody; // Required, whereas the member inherited from FunctionDeclaration is optional
}

export interface ArrowFunction extends Expression, FunctionLikeDeclarationBase {
    readonly kind: SyntaxKind.ArrowFunction;
    readonly modifiers?: NodeArray<Modifier>;
    readonly equalsGreaterThanToken: EqualsGreaterThanToken;
    readonly body: ConciseBody;
    readonly name: never;
}

// The text property of a LiteralExpression stores the interpreted value of the literal in text form. For a StringLiteral,
// or any literal of a template, this means quotes have been removed and escapes have been converted to actual characters.
// For a NumericLiteral, the stored value is the toString() representation of the number. For example 1, 1.00, and 1e0 are all stored as just "1".
export interface LiteralLikeNode extends Node {
    text: string;
}

export interface TemplateLiteralLikeNode extends LiteralLikeNode {
    rawText?: string;
    templateFlags?: TokenFlags;
}

// The text property of a LiteralExpression stores the interpreted value of the literal in text form. For a StringLiteral,
// or any literal of a template, this means quotes have been removed and escapes have been converted to actual characters.
// For a NumericLiteral, the stored value is the toString() representation of the number. For example 1, 1.00, and 1e0 are all stored as just "1".
export interface LiteralExpression extends LiteralLikeNode, PrimaryExpression {
    _literalExpressionBrand: any;
}

export interface RegularExpressionLiteral extends LiteralExpression {
    readonly kind: SyntaxKind.RegularExpressionLiteral;
}

// dprint-ignore
export interface NoSubstitutionTemplateLiteral extends LiteralExpression, TemplateLiteralLikeNode, Declaration {
    readonly kind: SyntaxKind.NoSubstitutionTemplateLiteral;
}

export interface NumericLiteral extends LiteralExpression, Declaration {
    readonly kind: SyntaxKind.NumericLiteral;
    readonly numericLiteralFlags: TokenFlags;
}

export interface BigIntLiteral extends LiteralExpression {
    readonly kind: SyntaxKind.BigIntLiteral;
}

export type LiteralToken =
    | NumericLiteral
    | BigIntLiteral
    | StringLiteral
    | JsxText
    | RegularExpressionLiteral
    | NoSubstitutionTemplateLiteral;

export interface TemplateHead extends TemplateLiteralLikeNode {
    readonly kind: SyntaxKind.TemplateHead;
    readonly parent: TemplateExpression | TemplateLiteralTypeNode;
    templateFlags: TokenFlags;
}

export interface TemplateMiddle extends TemplateLiteralLikeNode {
    readonly kind: SyntaxKind.TemplateMiddle;
    readonly parent: TemplateSpan | TemplateLiteralTypeSpan;
    templateFlags: TokenFlags;
}

export interface TemplateTail extends TemplateLiteralLikeNode {
    readonly kind: SyntaxKind.TemplateTail;
    readonly parent: TemplateSpan | TemplateLiteralTypeSpan;
    templateFlags: TokenFlags;
}

export type PseudoLiteralToken =
    | TemplateHead
    | TemplateMiddle
    | TemplateTail;

export type TemplateLiteralToken =
    | NoSubstitutionTemplateLiteral
    | PseudoLiteralToken;

export interface TemplateExpression extends PrimaryExpression {
    readonly kind: SyntaxKind.TemplateExpression;
    readonly head: TemplateHead;
    readonly templateSpans: NodeArray<TemplateSpan>;
}

export type TemplateLiteral =
    | TemplateExpression
    | NoSubstitutionTemplateLiteral;

// Each of these corresponds to a substitution expression and a template literal, in that order.
// The template literal must have kind TemplateMiddleLiteral or TemplateTailLiteral.
export interface TemplateSpan extends Node {
    readonly kind: SyntaxKind.TemplateSpan;
    readonly parent: TemplateExpression;
    readonly expression: Expression;
    readonly literal: TemplateMiddle | TemplateTail;
}

export interface ParenthesizedExpression extends PrimaryExpression {
    readonly kind: SyntaxKind.ParenthesizedExpression;
    readonly expression: Expression;
}

export interface ArrayLiteralExpression extends PrimaryExpression {
    readonly kind: SyntaxKind.ArrayLiteralExpression;
    readonly elements: NodeArray<Expression>;
    multiLine?: boolean;
}

export interface SpreadElement extends Expression {
    readonly kind: SyntaxKind.SpreadElement;
    readonly parent: ArrayLiteralExpression | CallExpression | NewExpression;
    readonly expression: Expression;
}

/**
 * This interface is a base interface for ObjectLiteralExpression and JSXAttributes to extend from. JSXAttributes is similar to
 * ObjectLiteralExpression in that it contains array of properties; however, JSXAttributes' properties can only be
 * JSXAttribute or JSXSpreadAttribute. ObjectLiteralExpression, on the other hand, can only have properties of type
 * ObjectLiteralElement (e.g. PropertyAssignment, ShorthandPropertyAssignment etc.)
 */
export interface ObjectLiteralExpressionBase<T extends ObjectLiteralElement> extends PrimaryExpression, Declaration {
    readonly properties: NodeArray<T>;
}

// An ObjectLiteralExpression is the declaration node for an anonymous symbol.
export interface ObjectLiteralExpression extends ObjectLiteralExpressionBase<ObjectLiteralElementLike> {
    readonly kind: SyntaxKind.ObjectLiteralExpression;
    multiLine?: boolean;
}

export type EntityNameExpression = Identifier | PropertyAccessEntityNameExpression;
export type EntityNameOrEntityNameExpression = EntityName | EntityNameExpression;
export type AccessExpression = PropertyAccessExpression | ElementAccessExpression;

export interface PropertyAccessExpression extends MemberExpression, NamedDeclaration {
    readonly kind: SyntaxKind.PropertyAccessExpression;
    readonly expression: LeftHandSideExpression;
    readonly questionDotToken?: QuestionDotToken;
    readonly name: MemberName;
}

export interface PropertyAccessChain extends PropertyAccessExpression {
    _optionalChainBrand: any;
    readonly name: MemberName;
}

export interface SuperPropertyAccessExpression extends PropertyAccessExpression {
    readonly expression: SuperExpression;
}

/** Brand for a PropertyAccessExpression which, like a QualifiedName, consists of a sequence of identifiers separated by dots. */
export interface PropertyAccessEntityNameExpression extends PropertyAccessExpression {
    _propertyAccessExpressionLikeQualifiedNameBrand?: any;
    readonly expression: EntityNameExpression;
    readonly name: Identifier;
}

export interface ElementAccessExpression extends MemberExpression, Declaration {
    readonly kind: SyntaxKind.ElementAccessExpression;
    readonly expression: LeftHandSideExpression;
    readonly questionDotToken?: QuestionDotToken;
    readonly argumentExpression: Expression;
}

export interface ElementAccessChain extends ElementAccessExpression {
    _optionalChainBrand: any;
}

export interface SuperElementAccessExpression extends ElementAccessExpression {
    readonly expression: SuperExpression;
}

// see: https://tc39.github.io/ecma262/#prod-SuperProperty
export type SuperProperty = SuperPropertyAccessExpression | SuperElementAccessExpression;

export interface CallExpression extends LeftHandSideExpression, Declaration {
    readonly kind: SyntaxKind.CallExpression;
    readonly expression: LeftHandSideExpression;
    readonly questionDotToken?: QuestionDotToken;
    readonly typeArguments?: NodeArray<TypeNode>;
    readonly arguments: NodeArray<Expression>;
}

export interface CallChain extends CallExpression {
    _optionalChainBrand: any;
}

export type OptionalChain =
    | PropertyAccessChain
    | ElementAccessChain
    | CallChain
    | NonNullChain;

// see: https://tc39.github.io/ecma262/#prod-SuperCall
export interface SuperCall extends CallExpression {
    readonly expression: SuperExpression;
}

export interface ImportCall extends CallExpression {
    readonly expression: ImportExpression;
}

export interface ExpressionWithTypeArguments extends MemberExpression, NodeWithTypeArguments {
    readonly kind: SyntaxKind.ExpressionWithTypeArguments;
    readonly expression: LeftHandSideExpression;
}

export interface NewExpression extends PrimaryExpression, Declaration {
    readonly kind: SyntaxKind.NewExpression;
    readonly expression: LeftHandSideExpression;
    readonly typeArguments?: NodeArray<TypeNode>;
    readonly arguments?: NodeArray<Expression>;
}

export interface TaggedTemplateExpression extends MemberExpression {
    readonly kind: SyntaxKind.TaggedTemplateExpression;
    readonly tag: LeftHandSideExpression;
    readonly typeArguments?: NodeArray<TypeNode>;
    readonly template: TemplateLiteral;
}

export interface InstanceofExpression extends BinaryExpression {
    readonly operatorToken: Token<SyntaxKind.InstanceOfKeyword>;
}

export type CallLikeExpression =
    | CallExpression
    | NewExpression
    | TaggedTemplateExpression
    | Decorator
    | JsxOpeningLikeElement
    | InstanceofExpression;

export interface AsExpression extends Expression {
    readonly kind: SyntaxKind.AsExpression;
    readonly expression: Expression;
    readonly type: TypeNode;
}

export interface TypeAssertion extends UnaryExpression {
    readonly kind: SyntaxKind.TypeAssertionExpression;
    readonly type: TypeNode;
    readonly expression: UnaryExpression;
}

export interface SatisfiesExpression extends Expression {
    readonly kind: SyntaxKind.SatisfiesExpression;
    readonly expression: Expression;
    readonly type: TypeNode;
}

export type AssertionExpression =
    | TypeAssertion
    | AsExpression;

export interface NonNullExpression extends LeftHandSideExpression {
    readonly kind: SyntaxKind.NonNullExpression;
    readonly expression: Expression;
}

export interface NonNullChain extends NonNullExpression {
    _optionalChainBrand: any;
}

// NOTE: MetaProperty is really a MemberExpression, but we consider it a PrimaryExpression
//       for the same reasons we treat NewExpression as a PrimaryExpression.
export interface MetaProperty extends PrimaryExpression {
    readonly kind: SyntaxKind.MetaProperty;
    readonly keywordToken: SyntaxKind.NewKeyword | SyntaxKind.ImportKeyword;
    readonly name: Identifier;
}

/// A JSX expression of the form <TagName attrs>...</TagName>
export interface JsxElement extends PrimaryExpression {
    readonly kind: SyntaxKind.JsxElement;
    readonly openingElement: JsxOpeningElement;
    readonly children: NodeArray<JsxChild>;
    readonly closingElement: JsxClosingElement;
}

/// Either the opening tag in a <Tag>...</Tag> pair or the lone <Tag /> in a self-closing form
export type JsxOpeningLikeElement =
    | JsxSelfClosingElement
    | JsxOpeningElement;

export type JsxAttributeLike =
    | JsxAttribute
    | JsxSpreadAttribute;

export type JsxAttributeName =
    | Identifier
    | JsxNamespacedName;

export type JsxTagNameExpression =
    | Identifier
    | ThisExpression
    | JsxTagNamePropertyAccess
    | JsxNamespacedName;

export interface JsxTagNamePropertyAccess extends PropertyAccessExpression {
    readonly expression: Identifier | ThisExpression | JsxTagNamePropertyAccess;
}

export interface JsxAttributes extends PrimaryExpression, Declaration {
    readonly properties: NodeArray<JsxAttributeLike>;
    readonly kind: SyntaxKind.JsxAttributes;
    readonly parent: JsxOpeningLikeElement;
}

export interface JsxNamespacedName extends Node {
    readonly kind: SyntaxKind.JsxNamespacedName;
    readonly name: Identifier;
    readonly namespace: Identifier;
}

/// The opening element of a <Tag>...</Tag> JsxElement
export interface JsxOpeningElement extends Node {
    readonly kind: SyntaxKind.JsxOpeningElement;
    readonly parent: JsxElement;
    readonly tagName: JsxTagNameExpression;
    readonly typeArguments?: NodeArray<TypeNode>;
    readonly attributes: JsxAttributes;
}

/// A JSX expression of the form <TagName attrs />
export interface JsxSelfClosingElement extends PrimaryExpression {
    readonly kind: SyntaxKind.JsxSelfClosingElement;
    readonly tagName: JsxTagNameExpression;
    readonly typeArguments?: NodeArray<TypeNode>;
    readonly attributes: JsxAttributes;
}

/// A JSX expression of the form <>...</>
export interface JsxFragment extends PrimaryExpression {
    readonly kind: SyntaxKind.JsxFragment;
    readonly openingFragment: JsxOpeningFragment;
    readonly children: NodeArray<JsxChild>;
    readonly closingFragment: JsxClosingFragment;
}

/// The opening element of a <>...</> JsxFragment
export interface JsxOpeningFragment extends Expression {
    readonly kind: SyntaxKind.JsxOpeningFragment;
    readonly parent: JsxFragment;
}

/// The closing element of a <>...</> JsxFragment
export interface JsxClosingFragment extends Expression {
    readonly kind: SyntaxKind.JsxClosingFragment;
    readonly parent: JsxFragment;
}

export interface JsxAttribute extends Declaration {
    readonly kind: SyntaxKind.JsxAttribute;
    readonly parent: JsxAttributes;
    readonly name: JsxAttributeName;
    /// JSX attribute initializers are optional; <X y /> is sugar for <X y={true} />
    readonly initializer?: JsxAttributeValue;
}

export type JsxAttributeValue =
    | StringLiteral
    | JsxExpression
    | JsxElement
    | JsxSelfClosingElement
    | JsxFragment;

export interface JsxSpreadAttribute extends ObjectLiteralElement {
    readonly kind: SyntaxKind.JsxSpreadAttribute;
    readonly parent: JsxAttributes;
    readonly expression: Expression;
}

export interface JsxClosingElement extends Node {
    readonly kind: SyntaxKind.JsxClosingElement;
    readonly parent: JsxElement;
    readonly tagName: JsxTagNameExpression;
}

export interface JsxExpression extends Expression {
    readonly kind: SyntaxKind.JsxExpression;
    readonly parent: JsxElement | JsxFragment | JsxAttributeLike;
    readonly dotDotDotToken?: Token<SyntaxKind.DotDotDotToken>;
    readonly expression?: Expression;
}

export interface JsxText extends LiteralLikeNode {
    readonly kind: SyntaxKind.JsxText;
    readonly parent: JsxElement | JsxFragment;
    readonly containsOnlyTriviaWhiteSpaces: boolean;
}

export type JsxChild =
    | JsxText
    | JsxExpression
    | JsxElement
    | JsxSelfClosingElement
    | JsxFragment;

export interface Statement extends Node {
    _statementBrand: any;
}

/**
 * A list of comma-separated expressions. This node is only created by transformations.
 */
export interface CommaListExpression extends Expression {
    readonly kind: SyntaxKind.CommaListExpression;
    readonly elements: NodeArray<Expression>;
}

export interface EmptyStatement extends Statement {
    readonly kind: SyntaxKind.EmptyStatement;
}

export interface DebuggerStatement extends Statement {
    readonly kind: SyntaxKind.DebuggerStatement;
}

export interface Block extends Statement {
    readonly kind: SyntaxKind.Block;
    readonly statements: NodeArray<Statement>;
    multiLine?: boolean;
}

export interface VariableStatement extends Statement {
    readonly kind: SyntaxKind.VariableStatement;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly declarationList: VariableDeclarationList;
}

export interface ExpressionStatement extends Statement {
    readonly kind: SyntaxKind.ExpressionStatement;
    readonly expression: Expression;
}

export interface IfStatement extends Statement {
    readonly kind: SyntaxKind.IfStatement;
    readonly expression: Expression;
    readonly thenStatement: Statement;
    readonly elseStatement?: Statement;
}

export interface IterationStatement extends Statement {
    readonly statement: Statement;
}

export interface DoStatement extends IterationStatement {
    readonly kind: SyntaxKind.DoStatement;
    readonly expression: Expression;
}

export interface WhileStatement extends IterationStatement {
    readonly kind: SyntaxKind.WhileStatement;
    readonly expression: Expression;
}

export type ForInitializer =
    | VariableDeclarationList
    | Expression;

export interface ForStatement extends IterationStatement {
    readonly kind: SyntaxKind.ForStatement;
    readonly initializer?: ForInitializer;
    readonly condition?: Expression;
    readonly incrementor?: Expression;
}

export type ForInOrOfStatement =
    | ForInStatement
    | ForOfStatement;

export interface ForInStatement extends IterationStatement {
    readonly kind: SyntaxKind.ForInStatement;
    readonly initializer: ForInitializer;
    readonly expression: Expression;
}

export interface ForOfStatement extends IterationStatement {
    readonly kind: SyntaxKind.ForOfStatement;
    readonly awaitModifier?: AwaitKeyword;
    readonly initializer: ForInitializer;
    readonly expression: Expression;
}

export interface BreakStatement extends Statement {
    readonly kind: SyntaxKind.BreakStatement;
    readonly label?: Identifier;
}

export interface ContinueStatement extends Statement {
    readonly kind: SyntaxKind.ContinueStatement;
    readonly label?: Identifier;
}

export type BreakOrContinueStatement =
    | BreakStatement
    | ContinueStatement;

export interface ReturnStatement extends Statement {
    readonly kind: SyntaxKind.ReturnStatement;
    readonly expression?: Expression;
}

export interface WithStatement extends Statement {
    readonly kind: SyntaxKind.WithStatement;
    readonly expression: Expression;
    readonly statement: Statement;
}

export interface SwitchStatement extends Statement {
    readonly kind: SyntaxKind.SwitchStatement;
    readonly expression: Expression;
    readonly caseBlock: CaseBlock;
    possiblyExhaustive?: boolean; // initialized by binding
}

export interface CaseBlock extends Node {
    readonly kind: SyntaxKind.CaseBlock;
    readonly parent: SwitchStatement;
    readonly clauses: NodeArray<CaseOrDefaultClause>;
}

export interface CaseClause extends Node {
    readonly kind: SyntaxKind.CaseClause;
    readonly parent: CaseBlock;
    readonly expression: Expression;
    readonly statements: NodeArray<Statement>;
}

export interface DefaultClause extends Node {
    readonly kind: SyntaxKind.DefaultClause;
    readonly parent: CaseBlock;
    readonly statements: NodeArray<Statement>;
}

export type CaseOrDefaultClause =
    | CaseClause
    | DefaultClause;

export interface LabeledStatement extends Statement {
    readonly kind: SyntaxKind.LabeledStatement;
    readonly label: Identifier;
    readonly statement: Statement;
}

export interface ThrowStatement extends Statement {
    readonly kind: SyntaxKind.ThrowStatement;
    readonly expression: Expression;
}

export interface TryStatement extends Statement {
    readonly kind: SyntaxKind.TryStatement;
    readonly tryBlock: Block;
    readonly catchClause?: CatchClause;
    readonly finallyBlock?: Block;
}

export interface CatchClause extends Node {
    readonly kind: SyntaxKind.CatchClause;
    readonly parent: TryStatement;
    readonly variableDeclaration?: VariableDeclaration;
    readonly block: Block;
}

export type ObjectTypeDeclaration =
    | ClassLikeDeclaration
    | InterfaceDeclaration
    | TypeLiteralNode;

export type DeclarationWithTypeParameters =
    | DeclarationWithTypeParameterChildren
    | JSDocTypedefTag
    | JSDocCallbackTag
    | JSDocSignature;

export type DeclarationWithTypeParameterChildren =
    | SignatureDeclaration
    | ClassLikeDeclaration
    | InterfaceDeclaration
    | TypeAliasDeclaration
    | JSDocTemplateTag;

export interface ClassLikeDeclarationBase extends NamedDeclaration {
    readonly kind: SyntaxKind.ClassDeclaration | SyntaxKind.ClassExpression;
    readonly name?: Identifier;
    readonly typeParameters?: NodeArray<TypeParameterDeclaration>;
    readonly heritageClauses?: NodeArray<HeritageClause>;
    readonly members: NodeArray<ClassElement>;
}

export interface ClassDeclaration extends ClassLikeDeclarationBase, DeclarationStatement {
    readonly kind: SyntaxKind.ClassDeclaration;
    readonly modifiers?: NodeArray<ModifierLike>;
    /** May be undefined in `export default class { ... }`. */
    readonly name?: Identifier;
}

export interface ClassExpression extends ClassLikeDeclarationBase, PrimaryExpression {
    readonly kind: SyntaxKind.ClassExpression;
    readonly modifiers?: NodeArray<ModifierLike>;
}

export type ClassLikeDeclaration =
    | ClassDeclaration
    | ClassExpression;

export interface ClassElement extends NamedDeclaration {
    _classElementBrand: any;
    readonly name?: PropertyName;
}

export interface TypeElement extends NamedDeclaration {
    _typeElementBrand: any;
    readonly name?: PropertyName;
    readonly questionToken?: QuestionToken | undefined;
}

export interface InterfaceDeclaration extends DeclarationStatement {
    readonly kind: SyntaxKind.InterfaceDeclaration;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly name: Identifier;
    readonly typeParameters?: NodeArray<TypeParameterDeclaration>;
    readonly heritageClauses?: NodeArray<HeritageClause>;
    readonly members: NodeArray<TypeElement>;
}

export interface HeritageClause extends Node {
    readonly kind: SyntaxKind.HeritageClause;
    readonly parent: InterfaceDeclaration | ClassLikeDeclaration;
    readonly token: SyntaxKind.ExtendsKeyword | SyntaxKind.ImplementsKeyword;
    readonly types: NodeArray<ExpressionWithTypeArguments>;
}

export interface TypeAliasDeclaration extends DeclarationStatement {
    readonly kind: SyntaxKind.TypeAliasDeclaration;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly name: Identifier;
    readonly typeParameters?: NodeArray<TypeParameterDeclaration>;
    readonly type: TypeNode;
}

export interface EnumMember extends NamedDeclaration {
    readonly kind: SyntaxKind.EnumMember;
    readonly parent: EnumDeclaration;
    // This does include ComputedPropertyName, but the parser will give an error
    // if it parses a ComputedPropertyName in an EnumMember
    readonly name: PropertyName;
    readonly initializer?: Expression;
}

export interface EnumDeclaration extends DeclarationStatement {
    readonly kind: SyntaxKind.EnumDeclaration;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly name: Identifier;
    readonly members: NodeArray<EnumMember>;
}

export type ModuleName =
    | Identifier
    | StringLiteral;

export type ModuleBody =
    | NamespaceBody
    | JSDocNamespaceBody;

export interface ModuleDeclaration extends DeclarationStatement {
    readonly kind: SyntaxKind.ModuleDeclaration;
    readonly parent: ModuleBody | SourceFile;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly name: ModuleName;
    readonly body?: ModuleBody | JSDocNamespaceDeclaration;
}

export type NamespaceBody =
    | ModuleBlock
    | NamespaceDeclaration;

export interface NamespaceDeclaration extends ModuleDeclaration {
    readonly name: Identifier;
    readonly body: NamespaceBody;
}

export type JSDocNamespaceBody =
    | Identifier
    | JSDocNamespaceDeclaration;

export interface JSDocNamespaceDeclaration extends ModuleDeclaration {
    readonly name: Identifier;
    readonly body?: JSDocNamespaceBody;
}

export interface ModuleBlock extends Node, Statement {
    readonly kind: SyntaxKind.ModuleBlock;
    readonly parent: ModuleDeclaration;
    readonly statements: NodeArray<Statement>;
}

export type ModuleReference =
    | EntityName
    | ExternalModuleReference;

/**
 * One of:
 * - import x = require("mod");
 * - import x = M.x;
 */
export interface ImportEqualsDeclaration extends DeclarationStatement {
    readonly kind: SyntaxKind.ImportEqualsDeclaration;
    readonly parent: SourceFile | ModuleBlock;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly name: Identifier;
    readonly isTypeOnly: boolean;

    // 'EntityName' for an internal module reference, 'ExternalModuleReference' for an external
    // module reference.
    readonly moduleReference: ModuleReference;
}

export interface ExternalModuleReference extends Node {
    readonly kind: SyntaxKind.ExternalModuleReference;
    readonly parent: ImportEqualsDeclaration;
    readonly expression: Expression;
}

// In case of:
// import "mod"  => importClause = undefined, moduleSpecifier = "mod"
// In rest of the cases, module specifier is string literal corresponding to module
// ImportClause information is shown at its declaration below.
export interface ImportDeclaration extends Statement {
    readonly kind: SyntaxKind.ImportDeclaration;
    readonly parent: SourceFile | ModuleBlock;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly importClause?: ImportClause;
    /** If this is not a StringLiteral it will be a grammar error. */
    readonly moduleSpecifier: Expression;
    /** @deprecated */ readonly assertClause?: AssertClause;
    readonly attributes?: ImportAttributes;
}

export type NamedImportBindings =
    | NamespaceImport
    | NamedImports;

export type NamedExportBindings =
    | NamespaceExport
    | NamedExports;

// In case of:
// import d from "mod" => name = d, namedBinding = undefined
// import * as ns from "mod" => name = undefined, namedBinding: NamespaceImport = { name: ns }
// import d, * as ns from "mod" => name = d, namedBinding: NamespaceImport = { name: ns }
// import { a, b as x } from "mod" => name = undefined, namedBinding: NamedImports = { elements: [{ name: a }, { name: x, propertyName: b}]}
// import d, { a, b as x } from "mod" => name = d, namedBinding: NamedImports = { elements: [{ name: a }, { name: x, propertyName: b}]}
export interface ImportClause extends NamedDeclaration {
    readonly kind: SyntaxKind.ImportClause;
    readonly parent: ImportDeclaration | JSDocImportTag;
    readonly phaseModifier: ImportPhaseModifierSyntaxKind;
    readonly name?: Identifier; // Default binding
    readonly namedBindings?: NamedImportBindings;
}

export type ImportPhaseModifierSyntaxKind =
    | SyntaxKind.Unknown
    | SyntaxKind.TypeKeyword
    | SyntaxKind.DeferKeyword;

/** @deprecated */
export type AssertionKey = ImportAttributeName;

/** @deprecated */
export interface AssertEntry extends ImportAttribute {}

/** @deprecated */
export interface AssertClause extends ImportAttributes {}

export type ImportAttributeName = Identifier | StringLiteral;

export interface ImportAttribute extends Node {
    readonly kind: SyntaxKind.ImportAttribute;
    readonly parent: ImportAttributes;
    readonly name: ImportAttributeName;
    readonly value: Expression;
}

export interface ImportAttributes extends Node {
    readonly token: SyntaxKind.WithKeyword | SyntaxKind.AssertKeyword;
    readonly kind: SyntaxKind.ImportAttributes;
    readonly parent: ImportDeclaration | ExportDeclaration;
    readonly elements: NodeArray<ImportAttribute>;
    readonly multiLine?: boolean;
}

export interface NamespaceImport extends NamedDeclaration {
    readonly kind: SyntaxKind.NamespaceImport;
    readonly parent: ImportClause;
    readonly name: Identifier;
}

export interface NamespaceExport extends NamedDeclaration {
    readonly kind: SyntaxKind.NamespaceExport;
    readonly parent: ExportDeclaration;
    readonly name: ModuleExportName;
}

export interface NamespaceExportDeclaration extends DeclarationStatement {
    readonly kind: SyntaxKind.NamespaceExportDeclaration;
    readonly name: Identifier;
}

export interface ExportDeclaration extends DeclarationStatement {
    readonly kind: SyntaxKind.ExportDeclaration;
    readonly parent: SourceFile | ModuleBlock;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly isTypeOnly: boolean;
    /** Will not be assigned in the case of `export * from "foo";` */
    readonly exportClause?: NamedExportBindings;
    /** If this is not a StringLiteral it will be a grammar error. */
    readonly moduleSpecifier?: Expression;
    /** @deprecated */ readonly assertClause?: AssertClause;
    readonly attributes?: ImportAttributes;
}

export interface NamedImports extends Node {
    readonly kind: SyntaxKind.NamedImports;
    readonly parent: ImportClause;
    readonly elements: NodeArray<ImportSpecifier>;
}

export interface NamedExports extends Node {
    readonly kind: SyntaxKind.NamedExports;
    readonly parent: ExportDeclaration;
    readonly elements: NodeArray<ExportSpecifier>;
}

export type NamedImportsOrExports = NamedImports | NamedExports;

export interface ImportSpecifier extends NamedDeclaration {
    readonly kind: SyntaxKind.ImportSpecifier;
    readonly parent: NamedImports;
    readonly propertyName?: ModuleExportName; // Name preceding "as" keyword (or undefined when "as" is absent)
    readonly name: Identifier; // Declared name
    readonly isTypeOnly: boolean;
}

export interface ExportSpecifier extends NamedDeclaration {
    readonly kind: SyntaxKind.ExportSpecifier;
    readonly parent: NamedExports;
    readonly isTypeOnly: boolean;
    readonly propertyName?: ModuleExportName; // Name preceding "as" keyword (or undefined when "as" is absent)
    readonly name: ModuleExportName; // Declared name
}

export type ModuleExportName = Identifier | StringLiteral;

export type ImportOrExportSpecifier =
    | ImportSpecifier
    | ExportSpecifier;

export type TypeOnlyCompatibleAliasDeclaration =
    | ImportClause
    | ImportEqualsDeclaration
    | NamespaceImport
    | ImportOrExportSpecifier
    | ExportDeclaration
    | NamespaceExport;

export type TypeOnlyImportDeclaration =
    | ImportClause & { readonly isTypeOnly: true; readonly name: Identifier; }
    | ImportEqualsDeclaration & { readonly isTypeOnly: true; }
    | NamespaceImport & { readonly parent: ImportClause & { readonly isTypeOnly: true; }; }
    | ImportSpecifier & ({ readonly isTypeOnly: true; } | { readonly parent: NamedImports & { readonly parent: ImportClause & { readonly isTypeOnly: true; }; }; });

export type TypeOnlyExportDeclaration =
    | ExportSpecifier & ({ readonly isTypeOnly: true; } | { readonly parent: NamedExports & { readonly parent: ExportDeclaration & { readonly isTypeOnly: true; }; }; })
    | ExportDeclaration & { readonly isTypeOnly: true; readonly moduleSpecifier: Expression; } // export * from "mod"
    | NamespaceExport & { readonly parent: ExportDeclaration & { readonly isTypeOnly: true; readonly moduleSpecifier: Expression; }; } // export * as ns from "mod"
;

export type TypeOnlyAliasDeclaration = TypeOnlyImportDeclaration | TypeOnlyExportDeclaration;

/**
 * This is either an `export =` or an `export default` declaration.
 * Unless `isExportEquals` is set, this node was parsed as an `export default`.
 */
export interface ExportAssignment extends DeclarationStatement {
    readonly kind: SyntaxKind.ExportAssignment;
    readonly parent: SourceFile;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly isExportEquals?: boolean;
    readonly expression: Expression;
}

// represents a top level: { type } expression in a JSDoc comment.
export interface JSDocTypeExpression extends TypeNode {
    readonly kind: SyntaxKind.JSDocTypeExpression;
    readonly type: TypeNode;
}

export interface JSDocNameReference extends Node {
    readonly kind: SyntaxKind.JSDocNameReference;
    readonly name: EntityName | JSDocMemberName;
}

/** Class#method reference in JSDoc */
export interface JSDocMemberName extends Node {
    readonly kind: SyntaxKind.JSDocMemberName;
    readonly left: EntityName | JSDocMemberName;
    readonly right: Identifier;
}

export interface JSDocType extends TypeNode {
    _jsDocTypeBrand: any;
}

export interface JSDocAllType extends JSDocType {
    readonly kind: SyntaxKind.JSDocAllType;
}

export interface JSDocNonNullableType extends JSDocType {
    readonly kind: SyntaxKind.JSDocNonNullableType;
    readonly type: TypeNode;
    readonly postfix: boolean;
}

export interface JSDocNullableType extends JSDocType {
    readonly kind: SyntaxKind.JSDocNullableType;
    readonly type: TypeNode;
    readonly postfix: boolean;
}

export interface JSDocOptionalType extends JSDocType {
    readonly kind: SyntaxKind.JSDocOptionalType;
    readonly type: TypeNode;
}

export interface JSDocVariadicType extends JSDocType {
    readonly kind: SyntaxKind.JSDocVariadicType;
    readonly type: TypeNode;
}

export type JSDocTypeReferencingNode =
    | JSDocVariadicType
    | JSDocOptionalType
    | JSDocNullableType
    | JSDocNonNullableType;

export interface JSDoc extends Node {
    readonly kind: SyntaxKind.JSDoc;
    readonly parent: HasJSDoc;
    readonly tags?: NodeArray<JSDocTag>;
    readonly comment?: string | NodeArray<JSDocComment>;
}

export interface JSDocTag extends Node {
    readonly parent: JSDoc | JSDocTypeLiteral;
    readonly tagName: Identifier;
    readonly comment?: string | NodeArray<JSDocComment>;
}

export interface JSDocLink extends Node {
    readonly kind: SyntaxKind.JSDocLink;
    readonly name?: EntityName | JSDocMemberName;
    text: string;
}

export interface JSDocLinkCode extends Node {
    readonly kind: SyntaxKind.JSDocLinkCode;
    readonly name?: EntityName | JSDocMemberName;
    text: string;
}

export interface JSDocLinkPlain extends Node {
    readonly kind: SyntaxKind.JSDocLinkPlain;
    readonly name?: EntityName | JSDocMemberName;
    text: string;
}

export type JSDocComment = JSDocText | JSDocLink | JSDocLinkCode | JSDocLinkPlain;

export interface JSDocText extends Node {
    readonly kind: SyntaxKind.JSDocText;
    text: string;
}

export interface JSDocUnknownTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocTag;
}

/**
 * Note that `@extends` is a synonym of `@augments`.
 * Both tags are represented by this interface.
 */
export interface JSDocAugmentsTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocAugmentsTag;
    readonly class: ExpressionWithTypeArguments & { readonly expression: Identifier | PropertyAccessEntityNameExpression; };
}

export interface JSDocImplementsTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocImplementsTag;
    readonly class: ExpressionWithTypeArguments & { readonly expression: Identifier | PropertyAccessEntityNameExpression; };
}

export interface JSDocDeprecatedTag extends JSDocTag {
    kind: SyntaxKind.JSDocDeprecatedTag;
}

export interface JSDocPublicTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocPublicTag;
}

export interface JSDocPrivateTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocPrivateTag;
}

export interface JSDocProtectedTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocProtectedTag;
}

export interface JSDocReadonlyTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocReadonlyTag;
}

export interface JSDocOverrideTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocOverrideTag;
}

export interface JSDocThisTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocThisTag;
    readonly typeExpression: JSDocTypeExpression;
}

export interface JSDocTemplateTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocTemplateTag;
    readonly constraint: JSDocTypeExpression | undefined;
    readonly typeParameters: NodeArray<TypeParameterDeclaration>;
}

export interface JSDocSeeTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocSeeTag;
    readonly name?: JSDocNameReference;
}

export interface JSDocReturnTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocReturnTag;
    readonly typeExpression?: JSDocTypeExpression;
}

export interface JSDocTypeTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocTypeTag;
    readonly typeExpression: JSDocTypeExpression;
}

export interface JSDocTypedefTag extends JSDocTag, NamedDeclaration {
    readonly kind: SyntaxKind.JSDocTypedefTag;
    readonly parent: JSDoc;
    readonly fullName?: JSDocNamespaceDeclaration | Identifier;
    readonly name?: Identifier;
    readonly typeExpression?: JSDocTypeExpression | JSDocTypeLiteral;
}

export interface JSDocCallbackTag extends JSDocTag, NamedDeclaration {
    readonly kind: SyntaxKind.JSDocCallbackTag;
    readonly parent: JSDoc;
    readonly fullName?: JSDocNamespaceDeclaration | Identifier;
    readonly name?: Identifier;
    readonly typeExpression: JSDocSignature;
}

export interface JSDocOverloadTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocOverloadTag;
    readonly parent: JSDoc;
    readonly typeExpression: JSDocSignature;
}

export interface JSDocSignature extends JSDocType, Declaration {
    readonly kind: SyntaxKind.JSDocSignature;
    readonly typeParameters?: readonly JSDocTemplateTag[];
    readonly parameters: readonly JSDocParameterTag[];
    readonly type: JSDocReturnTag | undefined;
}

export interface JSDocPropertyLikeTag extends JSDocTag, Declaration {
    readonly parent: JSDoc;
    readonly name: EntityName;
    readonly typeExpression?: JSDocTypeExpression;
    /** Whether the property name came before the type -- non-standard for JSDoc, but Typescript-like */
    readonly isNameFirst: boolean;
    readonly isBracketed: boolean;
}

export interface JSDocPropertyTag extends JSDocPropertyLikeTag {
    readonly kind: SyntaxKind.JSDocPropertyTag;
}

export interface JSDocParameterTag extends JSDocPropertyLikeTag {
    readonly kind: SyntaxKind.JSDocParameterTag;
}

export interface JSDocTypeLiteral extends JSDocType, Declaration {
    readonly kind: SyntaxKind.JSDocTypeLiteral;
    readonly jsDocPropertyTags?: readonly JSDocPropertyLikeTag[];
    /** If true, then this type literal represents an *array* of its type. */
    readonly isArrayType: boolean;
}

export interface JSDocSatisfiesTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocSatisfiesTag;
    readonly typeExpression: JSDocTypeExpression;
}

export interface JSDocImportTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocImportTag;
    readonly parent: JSDoc;
    readonly importClause?: ImportClause;
    readonly moduleSpecifier: Expression;
    readonly attributes?: ImportAttributes;
}

export type HasJSDoc =
    | AccessorDeclaration
    | ArrowFunction
    | BinaryExpression
    | Block
    | BreakStatement
    | CallSignatureDeclaration
    | CaseClause
    | ClassLikeDeclaration
    | ClassStaticBlockDeclaration
    | ConstructorDeclaration
    | ConstructorTypeNode
    | ConstructSignatureDeclaration
    | ContinueStatement
    | DebuggerStatement
    | DoStatement
    | ElementAccessExpression
    | EmptyStatement
    | EndOfFile
    | EnumDeclaration
    | EnumMember
    | ExportAssignment
    | ExportDeclaration
    | ExportSpecifier
    | ExpressionStatement
    | ForInStatement
    | ForOfStatement
    | ForStatement
    | FunctionDeclaration
    | FunctionExpression
    | FunctionTypeNode
    | Identifier
    | IfStatement
    | ImportDeclaration
    | ImportEqualsDeclaration
    | IndexSignatureDeclaration
    | InterfaceDeclaration
    | JSDocSignature
    | LabeledStatement
    | MethodDeclaration
    | MethodSignature
    | ModuleDeclaration
    | NamedTupleMember
    | NamespaceExportDeclaration
    | ObjectLiteralExpression
    | ParameterDeclaration
    | ParenthesizedExpression
    | PropertyAccessExpression
    | PropertyAssignment
    | PropertyDeclaration
    | PropertySignature
    | ReturnStatement
    | SemicolonClassElement
    | ShorthandPropertyAssignment
    | SpreadAssignment
    | SwitchStatement
    | ThrowStatement
    | TryStatement
    | TypeAliasDeclaration
    | TypeParameterDeclaration
    | VariableDeclaration
    | VariableStatement
    | WhileStatement
    | WithStatement;
