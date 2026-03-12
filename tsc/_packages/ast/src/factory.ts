// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!! THIS FILE IS AUTO-GENERATED - DO NOT EDIT !!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
// Source: _packages/ast/src/nodes.ts
// Generator: _packages/ast/scripts/generateFactory.ts
//

import { NodeFlags } from "#enums/nodeFlags";
import { SyntaxKind } from "#enums/syntaxKind";
import { TokenFlags } from "#enums/tokenFlags";
import type {
    ArrayBindingElement,
    ArrayBindingPattern,
    ArrayLiteralExpression,
    ArrayTypeNode,
    ArrowFunction,
    AsExpression,
    AssertsKeyword,
    AsteriskToken,
    AwaitExpression,
    AwaitKeyword,
    BigIntLiteral,
    BinaryExpression,
    BinaryOperatorToken,
    BindingElement,
    BindingName,
    Block,
    BooleanLiteral,
    BreakStatement,
    CallExpression,
    CallSignatureDeclaration,
    CaseBlock,
    CaseClause,
    CaseOrDefaultClause,
    CatchClause,
    ClassDeclaration,
    ClassElement,
    ClassExpression,
    ClassStaticBlockDeclaration,
    ColonToken,
    CommaListExpression,
    ComputedPropertyName,
    ConciseBody,
    ConditionalExpression,
    ConditionalTypeNode,
    ConstructorDeclaration,
    ConstructorTypeNode,
    ConstructSignatureDeclaration,
    ContinueStatement,
    DebuggerStatement,
    Decorator,
    DefaultClause,
    DeleteExpression,
    DoStatement,
    DotDotDotToken,
    ElementAccessExpression,
    EmptyStatement,
    EndOfFile,
    EntityName,
    EnumDeclaration,
    EnumMember,
    EqualsGreaterThanToken,
    EqualsToken,
    ExclamationToken,
    ExportAssignment,
    ExportDeclaration,
    ExportSpecifier,
    Expression,
    ExpressionStatement,
    ExpressionWithTypeArguments,
    ExternalModuleReference,
    FalseLiteral,
    ForInitializer,
    ForInStatement,
    ForOfStatement,
    ForStatement,
    FunctionBody,
    FunctionDeclaration,
    FunctionExpression,
    FunctionTypeNode,
    GetAccessorDeclaration,
    HeritageClause,
    Identifier,
    IfStatement,
    ImportAttribute,
    ImportAttributeName,
    ImportAttributes,
    ImportClause,
    ImportDeclaration,
    ImportEqualsDeclaration,
    ImportExpression,
    ImportPhaseModifierSyntaxKind,
    ImportSpecifier,
    ImportTypeNode,
    IndexedAccessTypeNode,
    IndexSignatureDeclaration,
    InferTypeNode,
    InterfaceDeclaration,
    IntersectionTypeNode,
    JSDoc,
    JSDocAllType,
    JSDocAugmentsTag,
    JSDocCallbackTag,
    JSDocComment,
    JSDocDeprecatedTag,
    JSDocImplementsTag,
    JSDocImportTag,
    JSDocLink,
    JSDocLinkCode,
    JSDocLinkPlain,
    JSDocMemberName,
    JSDocNameReference,
    JSDocNamespaceDeclaration,
    JSDocNonNullableType,
    JSDocNullableType,
    JSDocOptionalType,
    JSDocOverloadTag,
    JSDocOverrideTag,
    JSDocParameterTag,
    JSDocPrivateTag,
    JSDocPropertyLikeTag,
    JSDocPropertyTag,
    JSDocProtectedTag,
    JSDocPublicTag,
    JSDocReadonlyTag,
    JSDocReturnTag,
    JSDocSatisfiesTag,
    JSDocSeeTag,
    JSDocSignature,
    JSDocTag,
    JSDocTemplateTag,
    JSDocText,
    JSDocThisTag,
    JSDocTypedefTag,
    JSDocTypeExpression,
    JSDocTypeLiteral,
    JSDocTypeTag,
    JSDocUnknownTag,
    JSDocVariadicType,
    JsxAttribute,
    JsxAttributeLike,
    JsxAttributeName,
    JsxAttributes,
    JsxAttributeValue,
    JsxChild,
    JsxClosingElement,
    JsxClosingFragment,
    JsxElement,
    JsxExpression,
    JsxFragment,
    JsxNamespacedName,
    JsxOpeningElement,
    JsxOpeningFragment,
    JsxSelfClosingElement,
    JsxSpreadAttribute,
    JsxTagNameExpression,
    JsxText,
    KeywordTypeNode,
    KeywordTypeSyntaxKind,
    LabeledStatement,
    LeftHandSideExpression,
    LiteralExpression,
    LiteralTypeNode,
    MappedTypeNode,
    MemberName,
    MetaProperty,
    MethodDeclaration,
    MethodSignature,
    MinusToken,
    Modifier,
    ModifierLike,
    ModuleBlock,
    ModuleBody,
    ModuleDeclaration,
    ModuleExportName,
    ModuleName,
    ModuleReference,
    NamedExportBindings,
    NamedExports,
    NamedImportBindings,
    NamedImports,
    NamedTupleMember,
    NamespaceExport,
    NamespaceExportDeclaration,
    NamespaceImport,
    NewExpression,
    Node,
    NodeArray,
    NonNullExpression,
    NoSubstitutionTemplateLiteral,
    NullLiteral,
    NumericLiteral,
    ObjectBindingPattern,
    ObjectLiteralElementLike,
    ObjectLiteralExpression,
    OmittedExpression,
    OptionalTypeNode,
    ParameterDeclaration,
    ParenthesizedExpression,
    ParenthesizedTypeNode,
    PartiallyEmittedExpression,
    Path,
    PlusToken,
    PostfixUnaryExpression,
    PostfixUnaryOperator,
    PrefixUnaryExpression,
    PrefixUnaryOperator,
    PrivateIdentifier,
    PropertyAccessEntityNameExpression,
    PropertyAccessExpression,
    PropertyAssignment,
    PropertyDeclaration,
    PropertyName,
    PropertySignature,
    QualifiedName,
    QuestionDotToken,
    QuestionToken,
    ReadonlyKeyword,
    RegularExpressionLiteral,
    RestTypeNode,
    ReturnStatement,
    SatisfiesExpression,
    SemicolonClassElement,
    SetAccessorDeclaration,
    ShorthandPropertyAssignment,
    SourceFile,
    SpreadAssignment,
    SpreadElement,
    Statement,
    StringLiteral,
    SuperExpression,
    SwitchStatement,
    TaggedTemplateExpression,
    TemplateExpression,
    TemplateHead,
    TemplateLiteral,
    TemplateLiteralTypeNode,
    TemplateLiteralTypeSpan,
    TemplateMiddle,
    TemplateSpan,
    TemplateTail,
    ThisExpression,
    ThisTypeNode,
    ThrowStatement,
    Token,
    TrueLiteral,
    TryStatement,
    TupleTypeNode,
    TypeAliasDeclaration,
    TypeAssertion,
    TypeElement,
    TypeLiteralNode,
    TypeNode,
    TypeOfExpression,
    TypeOperatorNode,
    TypeParameterDeclaration,
    TypePredicateNode,
    TypeQueryNode,
    TypeReferenceNode,
    UnaryExpression,
    UnionTypeNode,
    VariableDeclaration,
    VariableDeclarationList,
    VariableStatement,
    VoidExpression,
    WhileStatement,
    WithStatement,
    YieldExpression,
} from "./nodes.ts";

/**
 * Monomorphic AST node implementation.
 * All synthetic nodes share the same V8 hidden class for optimal property access.
 *
 * Common fields live directly on the object; kind-specific fields are stored
 * in the `_data` bag and accessed via generated property accessors.
 */
export class NodeObject {
    readonly kind!: SyntaxKind;
    readonly flags!: NodeFlags;
    readonly pos!: number;
    readonly end!: number;
    readonly parent!: Node;
    /** @internal */
    _data: any;

    constructor(kind: SyntaxKind, data: any) {
        this.kind = kind;
        this.flags = 0 as NodeFlags;
        this.pos = -1;
        this.end = -1;
        this.parent = undefined!;
        this._data = data;
    }

    get argument(): any {
        return this._data?.argument;
    }
    get argumentExpression(): any {
        return this._data?.argumentExpression;
    }
    get arguments(): any {
        return this._data?.arguments;
    }
    get assertsModifier(): any {
        return this._data?.assertsModifier;
    }
    get asteriskToken(): any {
        return this._data?.asteriskToken;
    }
    get attributes(): any {
        return this._data?.attributes;
    }
    get awaitModifier(): any {
        return this._data?.awaitModifier;
    }
    get block(): any {
        return this._data?.block;
    }
    get body(): any {
        return this._data?.body;
    }
    get caseBlock(): any {
        return this._data?.caseBlock;
    }
    get catchClause(): any {
        return this._data?.catchClause;
    }
    get checkType(): any {
        return this._data?.checkType;
    }
    get children(): any {
        return this._data?.children;
    }
    get class(): any {
        return this._data?.class;
    }
    get clauses(): any {
        return this._data?.clauses;
    }
    get closingElement(): any {
        return this._data?.closingElement;
    }
    get closingFragment(): any {
        return this._data?.closingFragment;
    }
    get colonToken(): any {
        return this._data?.colonToken;
    }
    get comment(): any {
        return this._data?.comment;
    }
    get condition(): any {
        return this._data?.condition;
    }
    get constraint(): any {
        return this._data?.constraint;
    }
    get containsOnlyTriviaWhiteSpaces(): any {
        return this._data?.containsOnlyTriviaWhiteSpaces;
    }
    get declarationList(): any {
        return this._data?.declarationList;
    }
    get declarations(): any {
        return this._data?.declarations;
    }
    get default(): any {
        return this._data?.default;
    }
    get dotDotDotToken(): any {
        return this._data?.dotDotDotToken;
    }
    get elementType(): any {
        return this._data?.elementType;
    }
    get elements(): any {
        return this._data?.elements;
    }
    get elseStatement(): any {
        return this._data?.elseStatement;
    }
    get endOfFileToken(): any {
        return this._data?.endOfFileToken;
    }
    get equalsGreaterThanToken(): any {
        return this._data?.equalsGreaterThanToken;
    }
    get equalsToken(): any {
        return this._data?.equalsToken;
    }
    get escapedText(): any {
        return this._data?.escapedText;
    }
    get exclamationToken(): any {
        return this._data?.exclamationToken;
    }
    get exportClause(): any {
        return this._data?.exportClause;
    }
    get exprName(): any {
        return this._data?.exprName;
    }
    get expression(): any {
        return this._data?.expression;
    }
    get extendsType(): any {
        return this._data?.extendsType;
    }
    get falseType(): any {
        return this._data?.falseType;
    }
    get fileName(): any {
        return this._data?.fileName;
    }
    get finallyBlock(): any {
        return this._data?.finallyBlock;
    }
    get fullName(): any {
        return this._data?.fullName;
    }
    get head(): any {
        return this._data?.head;
    }
    get heritageClauses(): any {
        return this._data?.heritageClauses;
    }
    get importClause(): any {
        return this._data?.importClause;
    }
    get incrementor(): any {
        return this._data?.incrementor;
    }
    get indexType(): any {
        return this._data?.indexType;
    }
    get initializer(): any {
        return this._data?.initializer;
    }
    get isArrayType(): any {
        return this._data?.isArrayType;
    }
    get isBracketed(): any {
        return this._data?.isBracketed;
    }
    get isExportEquals(): any {
        return this._data?.isExportEquals;
    }
    get isNameFirst(): any {
        return this._data?.isNameFirst;
    }
    get isTypeOf(): any {
        return this._data?.isTypeOf;
    }
    get isTypeOnly(): any {
        return this._data?.isTypeOnly;
    }
    get jsDocPropertyTags(): any {
        return this._data?.jsDocPropertyTags;
    }
    get keywordToken(): any {
        return this._data?.keywordToken;
    }
    get label(): any {
        return this._data?.label;
    }
    get left(): any {
        return this._data?.left;
    }
    get literal(): any {
        return this._data?.literal;
    }
    get members(): any {
        return this._data?.members;
    }
    get modifiers(): any {
        return this._data?.modifiers;
    }
    get moduleReference(): any {
        return this._data?.moduleReference;
    }
    get moduleSpecifier(): any {
        return this._data?.moduleSpecifier;
    }
    get multiLine(): any {
        return this._data?.multiLine;
    }
    get name(): any {
        return this._data?.name;
    }
    get nameType(): any {
        return this._data?.nameType;
    }
    get namedBindings(): any {
        return this._data?.namedBindings;
    }
    get namespace(): any {
        return this._data?.namespace;
    }
    get numericLiteralFlags(): any {
        return this._data?.numericLiteralFlags;
    }
    get objectAssignmentInitializer(): any {
        return this._data?.objectAssignmentInitializer;
    }
    get objectType(): any {
        return this._data?.objectType;
    }
    get openingElement(): any {
        return this._data?.openingElement;
    }
    get openingFragment(): any {
        return this._data?.openingFragment;
    }
    get operand(): any {
        return this._data?.operand;
    }
    get operator(): any {
        return this._data?.operator;
    }
    get operatorToken(): any {
        return this._data?.operatorToken;
    }
    get parameterName(): any {
        return this._data?.parameterName;
    }
    get parameters(): any {
        return this._data?.parameters;
    }
    get path(): any {
        return this._data?.path;
    }
    get phaseModifier(): any {
        return this._data?.phaseModifier;
    }
    get possiblyExhaustive(): any {
        return this._data?.possiblyExhaustive;
    }
    get postfix(): any {
        return this._data?.postfix;
    }
    get postfixToken(): any {
        return this._data?.postfixToken;
    }
    get properties(): any {
        return this._data?.properties;
    }
    get propertyName(): any {
        return this._data?.propertyName;
    }
    get qualifier(): any {
        return this._data?.qualifier;
    }
    get questionDotToken(): any {
        return this._data?.questionDotToken;
    }
    get questionToken(): any {
        return this._data?.questionToken;
    }
    get rawText(): any {
        return this._data?.rawText;
    }
    get readonlyToken(): any {
        return this._data?.readonlyToken;
    }
    get right(): any {
        return this._data?.right;
    }
    get statement(): any {
        return this._data?.statement;
    }
    get statements(): any {
        return this._data?.statements;
    }
    get tag(): any {
        return this._data?.tag;
    }
    get tagName(): any {
        return this._data?.tagName;
    }
    get tags(): any {
        return this._data?.tags;
    }
    get template(): any {
        return this._data?.template;
    }
    get templateFlags(): any {
        return this._data?.templateFlags;
    }
    get templateSpans(): any {
        return this._data?.templateSpans;
    }
    get text(): any {
        return this._data?.text;
    }
    get thenStatement(): any {
        return this._data?.thenStatement;
    }
    get token(): any {
        return this._data?.token;
    }
    get trueType(): any {
        return this._data?.trueType;
    }
    get tryBlock(): any {
        return this._data?.tryBlock;
    }
    get type(): any {
        return this._data?.type;
    }
    get typeArguments(): any {
        return this._data?.typeArguments;
    }
    get typeExpression(): any {
        return this._data?.typeExpression;
    }
    get typeName(): any {
        return this._data?.typeName;
    }
    get typeParameter(): any {
        return this._data?.typeParameter;
    }
    get typeParameters(): any {
        return this._data?.typeParameters;
    }
    get types(): any {
        return this._data?.types;
    }
    get value(): any {
        return this._data?.value;
    }
    get variableDeclaration(): any {
        return this._data?.variableDeclaration;
    }
    get whenFalse(): any {
        return this._data?.whenFalse;
    }
    get whenTrue(): any {
        return this._data?.whenTrue;
    }

    forEachChild<T>(visitor: (node: Node) => T, visitArray?: (nodes: NodeArray<Node>) => T): T | undefined {
        const fn = forEachChildTable[this.kind];
        return fn ? fn(this._data, visitor, visitArray) : undefined;
    }

    getSourceFile(): SourceFile {
        let node: Node = this as unknown as Node;
        while (node.parent) node = node.parent;
        return node as unknown as SourceFile;
    }
}

/**
 * Create a simple token node with only a `kind`.
 */
export function createToken<TKind extends SyntaxKind>(kind: TKind): Node & { readonly kind: TKind; } {
    return new NodeObject(kind, undefined) as any;
}

/**
 * Create a keyword type node (e.g. `string`, `number`, `boolean`, etc.).
 */
export function createKeywordTypeNode<TKind extends KeywordTypeSyntaxKind>(kind: TKind): KeywordTypeNode<TKind> {
    return new NodeObject(kind, undefined) as any;
}

export function createNodeArray<T extends Node>(elements: readonly T[], pos: number = -1, end: number = -1): NodeArray<T> {
    const arr = elements as unknown as NodeArray<T> & { pos: number; end: number; };
    arr.pos = pos;
    arr.end = end;
    return arr;
}

/**
 * Shallow-clone a node, producing a NodeObject copy.
 * Reads all properties via the getter interface so it works with any
 * Node implementation (NodeObject, RemoteNode, etc.).
 */
export function cloneNode<T extends Node>(node: T): T {
    const data = cloneNodeData(node);
    const clone = new NodeObject(node.kind, data);
    (clone as any).flags = node.flags;
    (clone as any).pos = node.pos;
    (clone as any).end = node.end;
    return clone as unknown as T;
}

function cloneNodeData(node: any): any {
    switch (node.kind) {
        case SyntaxKind.ArrayBindingPattern:
            return {
                elements: node.elements,
            };
        case SyntaxKind.ArrayLiteralExpression:
            return {
                elements: node.elements,
                multiLine: node.multiLine,
            };
        case SyntaxKind.ArrayType:
            return {
                elementType: node.elementType,
            };
        case SyntaxKind.ArrowFunction:
            return {
                modifiers: node.modifiers,
                typeParameters: node.typeParameters,
                parameters: node.parameters,
                type: node.type,
                equalsGreaterThanToken: node.equalsGreaterThanToken,
                body: node.body,
            };
        case SyntaxKind.AsExpression:
            return {
                expression: node.expression,
                type: node.type,
            };
        case SyntaxKind.AwaitExpression:
            return {
                expression: node.expression,
            };
        case SyntaxKind.BigIntLiteral:
            return {
                text: node.text,
            };
        case SyntaxKind.BinaryExpression:
            return {
                left: node.left,
                operatorToken: node.operatorToken,
                right: node.right,
            };
        case SyntaxKind.BindingElement:
            return {
                dotDotDotToken: node.dotDotDotToken,
                propertyName: node.propertyName,
                name: node.name,
                initializer: node.initializer,
            };
        case SyntaxKind.Block:
            return {
                statements: node.statements,
                multiLine: node.multiLine,
            };
        case SyntaxKind.BreakStatement:
            return {
                label: node.label,
            };
        case SyntaxKind.CallExpression:
            return {
                expression: node.expression,
                questionDotToken: node.questionDotToken,
                typeArguments: node.typeArguments,
                arguments: node.arguments,
            };
        case SyntaxKind.CallSignature:
            return {
                typeParameters: node.typeParameters,
                parameters: node.parameters,
                type: node.type,
            };
        case SyntaxKind.CaseBlock:
            return {
                clauses: node.clauses,
            };
        case SyntaxKind.CaseClause:
            return {
                expression: node.expression,
                statements: node.statements,
            };
        case SyntaxKind.CatchClause:
            return {
                variableDeclaration: node.variableDeclaration,
                block: node.block,
            };
        case SyntaxKind.ClassDeclaration:
            return {
                modifiers: node.modifiers,
                name: node.name,
                typeParameters: node.typeParameters,
                heritageClauses: node.heritageClauses,
                members: node.members,
            };
        case SyntaxKind.ClassExpression:
            return {
                modifiers: node.modifiers,
                name: node.name,
                typeParameters: node.typeParameters,
                heritageClauses: node.heritageClauses,
                members: node.members,
            };
        case SyntaxKind.ClassStaticBlockDeclaration:
            return {
                body: node.body,
            };
        case SyntaxKind.CommaListExpression:
            return {
                elements: node.elements,
            };
        case SyntaxKind.ComputedPropertyName:
            return {
                expression: node.expression,
            };
        case SyntaxKind.ConditionalExpression:
            return {
                condition: node.condition,
                questionToken: node.questionToken,
                whenTrue: node.whenTrue,
                colonToken: node.colonToken,
                whenFalse: node.whenFalse,
            };
        case SyntaxKind.ConditionalType:
            return {
                checkType: node.checkType,
                extendsType: node.extendsType,
                trueType: node.trueType,
                falseType: node.falseType,
            };
        case SyntaxKind.Constructor:
            return {
                modifiers: node.modifiers,
                parameters: node.parameters,
                body: node.body,
            };
        case SyntaxKind.ConstructorType:
            return {
                modifiers: node.modifiers,
                typeParameters: node.typeParameters,
                parameters: node.parameters,
                type: node.type,
            };
        case SyntaxKind.ConstructSignature:
            return {
                typeParameters: node.typeParameters,
                parameters: node.parameters,
                type: node.type,
            };
        case SyntaxKind.ContinueStatement:
            return {
                label: node.label,
            };
        case SyntaxKind.Decorator:
            return {
                expression: node.expression,
            };
        case SyntaxKind.DefaultClause:
            return {
                statements: node.statements,
            };
        case SyntaxKind.DeleteExpression:
            return {
                expression: node.expression,
            };
        case SyntaxKind.DoStatement:
            return {
                statement: node.statement,
                expression: node.expression,
            };
        case SyntaxKind.ElementAccessExpression:
            return {
                expression: node.expression,
                questionDotToken: node.questionDotToken,
                argumentExpression: node.argumentExpression,
            };
        case SyntaxKind.EnumDeclaration:
            return {
                modifiers: node.modifiers,
                name: node.name,
                members: node.members,
            };
        case SyntaxKind.EnumMember:
            return {
                name: node.name,
                initializer: node.initializer,
            };
        case SyntaxKind.ExportAssignment:
            return {
                modifiers: node.modifiers,
                expression: node.expression,
                isExportEquals: node.isExportEquals,
            };
        case SyntaxKind.ExportDeclaration:
            return {
                modifiers: node.modifiers,
                exportClause: node.exportClause,
                moduleSpecifier: node.moduleSpecifier,
                attributes: node.attributes,
                isTypeOnly: node.isTypeOnly,
            };
        case SyntaxKind.ExportSpecifier:
            return {
                propertyName: node.propertyName,
                name: node.name,
                isTypeOnly: node.isTypeOnly,
            };
        case SyntaxKind.ExpressionStatement:
            return {
                expression: node.expression,
            };
        case SyntaxKind.ExpressionWithTypeArguments:
            return {
                expression: node.expression,
                typeArguments: node.typeArguments,
            };
        case SyntaxKind.ExternalModuleReference:
            return {
                expression: node.expression,
            };
        case SyntaxKind.ForInStatement:
            return {
                initializer: node.initializer,
                expression: node.expression,
                statement: node.statement,
            };
        case SyntaxKind.ForOfStatement:
            return {
                awaitModifier: node.awaitModifier,
                initializer: node.initializer,
                expression: node.expression,
                statement: node.statement,
            };
        case SyntaxKind.ForStatement:
            return {
                initializer: node.initializer,
                condition: node.condition,
                incrementor: node.incrementor,
                statement: node.statement,
            };
        case SyntaxKind.FunctionDeclaration:
            return {
                modifiers: node.modifiers,
                asteriskToken: node.asteriskToken,
                name: node.name,
                typeParameters: node.typeParameters,
                parameters: node.parameters,
                type: node.type,
                body: node.body,
            };
        case SyntaxKind.FunctionExpression:
            return {
                modifiers: node.modifiers,
                asteriskToken: node.asteriskToken,
                name: node.name,
                typeParameters: node.typeParameters,
                parameters: node.parameters,
                type: node.type,
                body: node.body,
            };
        case SyntaxKind.FunctionType:
            return {
                typeParameters: node.typeParameters,
                parameters: node.parameters,
                type: node.type,
            };
        case SyntaxKind.GetAccessor:
            return {
                modifiers: node.modifiers,
                name: node.name,
                parameters: node.parameters,
                type: node.type,
                body: node.body,
            };
        case SyntaxKind.HeritageClause:
            return {
                token: node.token,
                types: node.types,
            };
        case SyntaxKind.Identifier:
            return {
                text: node.text,
            };
        case SyntaxKind.IfStatement:
            return {
                expression: node.expression,
                thenStatement: node.thenStatement,
                elseStatement: node.elseStatement,
            };
        case SyntaxKind.ImportAttribute:
            return {
                name: node.name,
                value: node.value,
            };
        case SyntaxKind.ImportAttributes:
            return {
                token: node.token,
                elements: node.elements,
                multiLine: node.multiLine,
            };
        case SyntaxKind.ImportClause:
            return {
                name: node.name,
                namedBindings: node.namedBindings,
                phaseModifier: node.phaseModifier,
            };
        case SyntaxKind.ImportDeclaration:
            return {
                modifiers: node.modifiers,
                importClause: node.importClause,
                moduleSpecifier: node.moduleSpecifier,
                attributes: node.attributes,
            };
        case SyntaxKind.ImportEqualsDeclaration:
            return {
                modifiers: node.modifiers,
                name: node.name,
                moduleReference: node.moduleReference,
                isTypeOnly: node.isTypeOnly,
            };
        case SyntaxKind.ImportSpecifier:
            return {
                propertyName: node.propertyName,
                name: node.name,
                isTypeOnly: node.isTypeOnly,
            };
        case SyntaxKind.ImportType:
            return {
                argument: node.argument,
                attributes: node.attributes,
                qualifier: node.qualifier,
                typeArguments: node.typeArguments,
                isTypeOf: node.isTypeOf,
            };
        case SyntaxKind.IndexedAccessType:
            return {
                objectType: node.objectType,
                indexType: node.indexType,
            };
        case SyntaxKind.IndexSignature:
            return {
                modifiers: node.modifiers,
                parameters: node.parameters,
                type: node.type,
            };
        case SyntaxKind.InferType:
            return {
                typeParameter: node.typeParameter,
            };
        case SyntaxKind.InterfaceDeclaration:
            return {
                modifiers: node.modifiers,
                name: node.name,
                typeParameters: node.typeParameters,
                heritageClauses: node.heritageClauses,
                members: node.members,
            };
        case SyntaxKind.IntersectionType:
            return {
                types: node.types,
            };
        case SyntaxKind.JSDoc:
            return {
                comment: node.comment,
                tags: node.tags,
            };
        case SyntaxKind.JSDocAugmentsTag:
            return {
                tagName: node.tagName,
                class: node.class,
                comment: node.comment,
            };
        case SyntaxKind.JSDocCallbackTag:
            return {
                tagName: node.tagName,
                typeExpression: node.typeExpression,
                fullName: node.fullName,
                comment: node.comment,
            };
        case SyntaxKind.JSDocDeprecatedTag:
            return {
                tagName: node.tagName,
                comment: node.comment,
            };
        case SyntaxKind.JSDocImplementsTag:
            return {
                tagName: node.tagName,
                class: node.class,
                comment: node.comment,
            };
        case SyntaxKind.JSDocImportTag:
            return {
                tagName: node.tagName,
                importClause: node.importClause,
                moduleSpecifier: node.moduleSpecifier,
                attributes: node.attributes,
                comment: node.comment,
            };
        case SyntaxKind.JSDocLink:
            return {
                name: node.name,
                text: node.text,
            };
        case SyntaxKind.JSDocLinkCode:
            return {
                name: node.name,
                text: node.text,
            };
        case SyntaxKind.JSDocLinkPlain:
            return {
                name: node.name,
                text: node.text,
            };
        case SyntaxKind.JSDocMemberName:
            return {
                left: node.left,
                right: node.right,
            };
        case SyntaxKind.JSDocNameReference:
            return {
                name: node.name,
            };
        case SyntaxKind.JSDocNonNullableType:
            return {
                type: node.type,
                postfix: node.postfix,
            };
        case SyntaxKind.JSDocNullableType:
            return {
                type: node.type,
                postfix: node.postfix,
            };
        case SyntaxKind.JSDocOptionalType:
            return {
                type: node.type,
            };
        case SyntaxKind.JSDocOverloadTag:
            return {
                tagName: node.tagName,
                typeExpression: node.typeExpression,
                comment: node.comment,
            };
        case SyntaxKind.JSDocOverrideTag:
            return {
                tagName: node.tagName,
                comment: node.comment,
            };
        case SyntaxKind.JSDocParameterTag:
            return {
                tagName: node.tagName,
                comment: node.comment,
                isNameFirst: node.isNameFirst,
                isBracketed: node.isBracketed,
            };
        case SyntaxKind.JSDocPrivateTag:
            return {
                tagName: node.tagName,
                comment: node.comment,
            };
        case SyntaxKind.JSDocPropertyTag:
            return {
                comment: node.comment,
                isNameFirst: node.isNameFirst,
                isBracketed: node.isBracketed,
            };
        case SyntaxKind.JSDocProtectedTag:
            return {
                tagName: node.tagName,
                comment: node.comment,
            };
        case SyntaxKind.JSDocPublicTag:
            return {
                tagName: node.tagName,
                comment: node.comment,
            };
        case SyntaxKind.JSDocReadonlyTag:
            return {
                tagName: node.tagName,
                comment: node.comment,
            };
        case SyntaxKind.JSDocReturnTag:
            return {
                tagName: node.tagName,
                typeExpression: node.typeExpression,
                comment: node.comment,
            };
        case SyntaxKind.JSDocSatisfiesTag:
            return {
                tagName: node.tagName,
                typeExpression: node.typeExpression,
                comment: node.comment,
            };
        case SyntaxKind.JSDocSeeTag:
            return {
                tagName: node.tagName,
                name: node.name,
                comment: node.comment,
            };
        case SyntaxKind.JSDocSignature:
            return {
                typeParameters: node.typeParameters,
                parameters: node.parameters,
                type: node.type,
            };
        case SyntaxKind.JSDocTemplateTag:
            return {
                tagName: node.tagName,
                constraint: node.constraint,
                typeParameters: node.typeParameters,
                comment: node.comment,
            };
        case SyntaxKind.JSDocText:
            return {
                text: node.text,
            };
        case SyntaxKind.JSDocThisTag:
            return {
                tagName: node.tagName,
                typeExpression: node.typeExpression,
                comment: node.comment,
            };
        case SyntaxKind.JSDocTypedefTag:
            return {
                tagName: node.tagName,
                typeExpression: node.typeExpression,
                fullName: node.fullName,
                comment: node.comment,
            };
        case SyntaxKind.JSDocTypeExpression:
            return {
                type: node.type,
            };
        case SyntaxKind.JSDocTypeLiteral:
            return {
                jsDocPropertyTags: node.jsDocPropertyTags,
                isArrayType: node.isArrayType,
            };
        case SyntaxKind.JSDocTypeTag:
            return {
                tagName: node.tagName,
                typeExpression: node.typeExpression,
                comment: node.comment,
            };
        case SyntaxKind.JSDocTag:
            return {
                tagName: node.tagName,
                comment: node.comment,
            };
        case SyntaxKind.JSDocVariadicType:
            return {
                type: node.type,
            };
        case SyntaxKind.JsxAttribute:
            return {
                name: node.name,
                initializer: node.initializer,
            };
        case SyntaxKind.JsxAttributes:
            return {
                properties: node.properties,
            };
        case SyntaxKind.JsxClosingElement:
            return {
                tagName: node.tagName,
            };
        case SyntaxKind.JsxElement:
            return {
                openingElement: node.openingElement,
                children: node.children,
                closingElement: node.closingElement,
            };
        case SyntaxKind.JsxExpression:
            return {
                dotDotDotToken: node.dotDotDotToken,
                expression: node.expression,
            };
        case SyntaxKind.JsxFragment:
            return {
                openingFragment: node.openingFragment,
                children: node.children,
                closingFragment: node.closingFragment,
            };
        case SyntaxKind.JsxNamespacedName:
            return {
                name: node.name,
                namespace: node.namespace,
            };
        case SyntaxKind.JsxOpeningElement:
            return {
                tagName: node.tagName,
                typeArguments: node.typeArguments,
                attributes: node.attributes,
            };
        case SyntaxKind.JsxSelfClosingElement:
            return {
                tagName: node.tagName,
                typeArguments: node.typeArguments,
                attributes: node.attributes,
            };
        case SyntaxKind.JsxSpreadAttribute:
            return {
                expression: node.expression,
            };
        case SyntaxKind.JsxText:
            return {
                text: node.text,
                containsOnlyTriviaWhiteSpaces: node.containsOnlyTriviaWhiteSpaces,
            };
        case SyntaxKind.LabeledStatement:
            return {
                label: node.label,
                statement: node.statement,
            };
        case SyntaxKind.LiteralType:
            return {
                literal: node.literal,
            };
        case SyntaxKind.MappedType:
            return {
                readonlyToken: node.readonlyToken,
                typeParameter: node.typeParameter,
                nameType: node.nameType,
                questionToken: node.questionToken,
                type: node.type,
                members: node.members,
            };
        case SyntaxKind.MetaProperty:
            return {
                keywordToken: node.keywordToken,
                name: node.name,
            };
        case SyntaxKind.MethodDeclaration:
            return {
                modifiers: node.modifiers,
                asteriskToken: node.asteriskToken,
                name: node.name,
                postfixToken: node.postfixToken,
                typeParameters: node.typeParameters,
                parameters: node.parameters,
                type: node.type,
                body: node.body,
            };
        case SyntaxKind.MethodSignature:
            return {
                modifiers: node.modifiers,
                name: node.name,
                postfixToken: node.postfixToken,
                typeParameters: node.typeParameters,
                parameters: node.parameters,
                type: node.type,
            };
        case SyntaxKind.ModuleBlock:
            return {
                statements: node.statements,
            };
        case SyntaxKind.ModuleDeclaration:
            return {
                modifiers: node.modifiers,
                name: node.name,
                body: node.body,
            };
        case SyntaxKind.NamedExports:
            return {
                elements: node.elements,
            };
        case SyntaxKind.NamedImports:
            return {
                elements: node.elements,
            };
        case SyntaxKind.NamedTupleMember:
            return {
                dotDotDotToken: node.dotDotDotToken,
                name: node.name,
                questionToken: node.questionToken,
                type: node.type,
            };
        case SyntaxKind.NamespaceExport:
            return {
                name: node.name,
            };
        case SyntaxKind.NamespaceExportDeclaration:
            return {
                name: node.name,
            };
        case SyntaxKind.NamespaceImport:
            return {
                name: node.name,
            };
        case SyntaxKind.NewExpression:
            return {
                expression: node.expression,
                typeArguments: node.typeArguments,
                arguments: node.arguments,
            };
        case SyntaxKind.NonNullExpression:
            return {
                expression: node.expression,
            };
        case SyntaxKind.NoSubstitutionTemplateLiteral:
            return {
                text: node.text,
                rawText: node.rawText,
                templateFlags: node.templateFlags,
            };
        case SyntaxKind.NumericLiteral:
            return {
                text: node.text,
                numericLiteralFlags: node.numericLiteralFlags,
            };
        case SyntaxKind.ObjectBindingPattern:
            return {
                elements: node.elements,
            };
        case SyntaxKind.ObjectLiteralExpression:
            return {
                properties: node.properties,
                multiLine: node.multiLine,
            };
        case SyntaxKind.OptionalType:
            return {
                type: node.type,
            };
        case SyntaxKind.Parameter:
            return {
                modifiers: node.modifiers,
                dotDotDotToken: node.dotDotDotToken,
                name: node.name,
                questionToken: node.questionToken,
                type: node.type,
                initializer: node.initializer,
            };
        case SyntaxKind.ParenthesizedExpression:
            return {
                expression: node.expression,
            };
        case SyntaxKind.ParenthesizedType:
            return {
                type: node.type,
            };
        case SyntaxKind.PartiallyEmittedExpression:
            return {
                expression: node.expression,
            };
        case SyntaxKind.PostfixUnaryExpression:
            return {
                operand: node.operand,
                operator: node.operator,
            };
        case SyntaxKind.PrefixUnaryExpression:
            return {
                operator: node.operator,
                operand: node.operand,
            };
        case SyntaxKind.PrivateIdentifier:
            return {
                escapedText: node.escapedText,
            };
        case SyntaxKind.PropertyAccessExpression:
            return {
                expression: node.expression,
                questionDotToken: node.questionDotToken,
                name: node.name,
            };
        case SyntaxKind.PropertyAssignment:
            return {
                name: node.name,
                postfixToken: node.postfixToken,
                initializer: node.initializer,
            };
        case SyntaxKind.PropertyDeclaration:
            return {
                modifiers: node.modifiers,
                name: node.name,
                postfixToken: node.postfixToken,
                type: node.type,
                initializer: node.initializer,
            };
        case SyntaxKind.PropertySignature:
            return {
                modifiers: node.modifiers,
                name: node.name,
                postfixToken: node.postfixToken,
                type: node.type,
            };
        case SyntaxKind.QualifiedName:
            return {
                left: node.left,
                right: node.right,
            };
        case SyntaxKind.RegularExpressionLiteral:
            return {
                text: node.text,
            };
        case SyntaxKind.RestType:
            return {
                type: node.type,
            };
        case SyntaxKind.ReturnStatement:
            return {
                expression: node.expression,
            };
        case SyntaxKind.SatisfiesExpression:
            return {
                expression: node.expression,
                type: node.type,
            };
        case SyntaxKind.SetAccessor:
            return {
                modifiers: node.modifiers,
                name: node.name,
                parameters: node.parameters,
                body: node.body,
            };
        case SyntaxKind.ShorthandPropertyAssignment:
            return {
                name: node.name,
                postfixToken: node.postfixToken,
                equalsToken: node.equalsToken,
                objectAssignmentInitializer: node.objectAssignmentInitializer,
            };
        case SyntaxKind.SourceFile:
            return {
                statements: node.statements,
                endOfFileToken: node.endOfFileToken,
                text: node.text,
                fileName: node.fileName,
                path: node.path,
            };
        case SyntaxKind.SpreadAssignment:
            return {
                expression: node.expression,
            };
        case SyntaxKind.SpreadElement:
            return {
                expression: node.expression,
            };
        case SyntaxKind.StringLiteral:
            return {
                text: node.text,
            };
        case SyntaxKind.SwitchStatement:
            return {
                expression: node.expression,
                caseBlock: node.caseBlock,
                possiblyExhaustive: node.possiblyExhaustive,
            };
        case SyntaxKind.TaggedTemplateExpression:
            return {
                tag: node.tag,
                typeArguments: node.typeArguments,
                template: node.template,
            };
        case SyntaxKind.TemplateExpression:
            return {
                head: node.head,
                templateSpans: node.templateSpans,
            };
        case SyntaxKind.TemplateHead:
            return {
                text: node.text,
                rawText: node.rawText,
                templateFlags: node.templateFlags,
            };
        case SyntaxKind.TemplateLiteralType:
            return {
                head: node.head,
                templateSpans: node.templateSpans,
            };
        case SyntaxKind.TemplateLiteralTypeSpan:
            return {
                type: node.type,
                literal: node.literal,
            };
        case SyntaxKind.TemplateMiddle:
            return {
                text: node.text,
                rawText: node.rawText,
                templateFlags: node.templateFlags,
            };
        case SyntaxKind.TemplateSpan:
            return {
                expression: node.expression,
                literal: node.literal,
            };
        case SyntaxKind.TemplateTail:
            return {
                text: node.text,
                rawText: node.rawText,
                templateFlags: node.templateFlags,
            };
        case SyntaxKind.ThrowStatement:
            return {
                expression: node.expression,
            };
        case SyntaxKind.TryStatement:
            return {
                tryBlock: node.tryBlock,
                catchClause: node.catchClause,
                finallyBlock: node.finallyBlock,
            };
        case SyntaxKind.TupleType:
            return {
                elements: node.elements,
            };
        case SyntaxKind.TypeAliasDeclaration:
            return {
                modifiers: node.modifiers,
                name: node.name,
                typeParameters: node.typeParameters,
                type: node.type,
            };
        case SyntaxKind.TypeAssertionExpression:
            return {
                type: node.type,
                expression: node.expression,
            };
        case SyntaxKind.TypeLiteral:
            return {
                members: node.members,
            };
        case SyntaxKind.TypeOfExpression:
            return {
                expression: node.expression,
            };
        case SyntaxKind.TypeOperator:
            return {
                operator: node.operator,
                type: node.type,
            };
        case SyntaxKind.TypeParameter:
            return {
                modifiers: node.modifiers,
                name: node.name,
                constraint: node.constraint,
                default: node.default,
            };
        case SyntaxKind.TypePredicate:
            return {
                assertsModifier: node.assertsModifier,
                parameterName: node.parameterName,
                type: node.type,
            };
        case SyntaxKind.TypeQuery:
            return {
                exprName: node.exprName,
                typeArguments: node.typeArguments,
            };
        case SyntaxKind.TypeReference:
            return {
                typeName: node.typeName,
                typeArguments: node.typeArguments,
            };
        case SyntaxKind.UnionType:
            return {
                types: node.types,
            };
        case SyntaxKind.VariableDeclaration:
            return {
                name: node.name,
                exclamationToken: node.exclamationToken,
                type: node.type,
                initializer: node.initializer,
            };
        case SyntaxKind.VariableDeclarationList:
            return {
                declarations: node.declarations,
            };
        case SyntaxKind.VariableStatement:
            return {
                modifiers: node.modifiers,
                declarationList: node.declarationList,
            };
        case SyntaxKind.VoidExpression:
            return {
                expression: node.expression,
            };
        case SyntaxKind.WhileStatement:
            return {
                expression: node.expression,
                statement: node.statement,
            };
        case SyntaxKind.WithStatement:
            return {
                expression: node.expression,
                statement: node.statement,
            };
        case SyntaxKind.YieldExpression:
            return {
                asteriskToken: node.asteriskToken,
                expression: node.expression,
            };
    }
    return undefined;
}

type ForEachChildFunction = (data: any, cbNode: (node: Node) => any, cbNodes?: (nodes: NodeArray<Node>) => any) => any;

const forEachChildTable: Record<number, ForEachChildFunction> = {
    [SyntaxKind.ArrayBindingPattern]: (data, cbNode, cbNodes) => visitNodes(cbNode, cbNodes, data.elements),
    [SyntaxKind.ArrayLiteralExpression]: (data, cbNode, cbNodes) => visitNodes(cbNode, cbNodes, data.elements),
    [SyntaxKind.ArrayType]: (data, cbNode, cbNodes) => visitNode(cbNode, data.elementType),
    [SyntaxKind.ArrowFunction]: (data, cbNode, cbNodes) =>
        visitNodes(cbNode, cbNodes, data.modifiers) ||
        visitNodes(cbNode, cbNodes, data.typeParameters) ||
        visitNodes(cbNode, cbNodes, data.parameters) ||
        visitNode(cbNode, data.type) ||
        visitNode(cbNode, data.equalsGreaterThanToken) ||
        visitNode(cbNode, data.body),
    [SyntaxKind.AsExpression]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.expression) ||
        visitNode(cbNode, data.type),
    [SyntaxKind.AwaitExpression]: (data, cbNode, cbNodes) => visitNode(cbNode, data.expression),
    [SyntaxKind.BinaryExpression]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.left) ||
        visitNode(cbNode, data.operatorToken) ||
        visitNode(cbNode, data.right),
    [SyntaxKind.BindingElement]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.dotDotDotToken) ||
        visitNode(cbNode, data.propertyName) ||
        visitNode(cbNode, data.name) ||
        visitNode(cbNode, data.initializer),
    [SyntaxKind.Block]: (data, cbNode, cbNodes) => visitNodes(cbNode, cbNodes, data.statements),
    [SyntaxKind.BreakStatement]: (data, cbNode, cbNodes) => visitNode(cbNode, data.label),
    [SyntaxKind.CallExpression]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.expression) ||
        visitNode(cbNode, data.questionDotToken) ||
        visitNodes(cbNode, cbNodes, data.typeArguments) ||
        visitNodes(cbNode, cbNodes, data.arguments),
    [SyntaxKind.CallSignature]: (data, cbNode, cbNodes) =>
        visitNodes(cbNode, cbNodes, data.typeParameters) ||
        visitNodes(cbNode, cbNodes, data.parameters) ||
        visitNode(cbNode, data.type),
    [SyntaxKind.CaseBlock]: (data, cbNode, cbNodes) => visitNodes(cbNode, cbNodes, data.clauses),
    [SyntaxKind.CaseClause]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.expression) ||
        visitNodes(cbNode, cbNodes, data.statements),
    [SyntaxKind.CatchClause]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.variableDeclaration) ||
        visitNode(cbNode, data.block),
    [SyntaxKind.ClassDeclaration]: (data, cbNode, cbNodes) =>
        visitNodes(cbNode, cbNodes, data.modifiers) ||
        visitNode(cbNode, data.name) ||
        visitNodes(cbNode, cbNodes, data.typeParameters) ||
        visitNodes(cbNode, cbNodes, data.heritageClauses) ||
        visitNodes(cbNode, cbNodes, data.members),
    [SyntaxKind.ClassExpression]: (data, cbNode, cbNodes) =>
        visitNodes(cbNode, cbNodes, data.modifiers) ||
        visitNode(cbNode, data.name) ||
        visitNodes(cbNode, cbNodes, data.typeParameters) ||
        visitNodes(cbNode, cbNodes, data.heritageClauses) ||
        visitNodes(cbNode, cbNodes, data.members),
    [SyntaxKind.ClassStaticBlockDeclaration]: (data, cbNode, cbNodes) => visitNode(cbNode, data.body),
    [SyntaxKind.CommaListExpression]: (data, cbNode, cbNodes) => visitNodes(cbNode, cbNodes, data.elements),
    [SyntaxKind.ComputedPropertyName]: (data, cbNode, cbNodes) => visitNode(cbNode, data.expression),
    [SyntaxKind.ConditionalExpression]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.condition) ||
        visitNode(cbNode, data.questionToken) ||
        visitNode(cbNode, data.whenTrue) ||
        visitNode(cbNode, data.colonToken) ||
        visitNode(cbNode, data.whenFalse),
    [SyntaxKind.ConditionalType]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.checkType) ||
        visitNode(cbNode, data.extendsType) ||
        visitNode(cbNode, data.trueType) ||
        visitNode(cbNode, data.falseType),
    [SyntaxKind.Constructor]: (data, cbNode, cbNodes) =>
        visitNodes(cbNode, cbNodes, data.modifiers) ||
        visitNodes(cbNode, cbNodes, data.parameters) ||
        visitNode(cbNode, data.body),
    [SyntaxKind.ConstructorType]: (data, cbNode, cbNodes) =>
        visitNodes(cbNode, cbNodes, data.modifiers) ||
        visitNodes(cbNode, cbNodes, data.typeParameters) ||
        visitNodes(cbNode, cbNodes, data.parameters) ||
        visitNode(cbNode, data.type),
    [SyntaxKind.ConstructSignature]: (data, cbNode, cbNodes) =>
        visitNodes(cbNode, cbNodes, data.typeParameters) ||
        visitNodes(cbNode, cbNodes, data.parameters) ||
        visitNode(cbNode, data.type),
    [SyntaxKind.ContinueStatement]: (data, cbNode, cbNodes) => visitNode(cbNode, data.label),
    [SyntaxKind.Decorator]: (data, cbNode, cbNodes) => visitNode(cbNode, data.expression),
    [SyntaxKind.DefaultClause]: (data, cbNode, cbNodes) => visitNodes(cbNode, cbNodes, data.statements),
    [SyntaxKind.DeleteExpression]: (data, cbNode, cbNodes) => visitNode(cbNode, data.expression),
    [SyntaxKind.DoStatement]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.statement) ||
        visitNode(cbNode, data.expression),
    [SyntaxKind.ElementAccessExpression]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.expression) ||
        visitNode(cbNode, data.questionDotToken) ||
        visitNode(cbNode, data.argumentExpression),
    [SyntaxKind.EnumDeclaration]: (data, cbNode, cbNodes) =>
        visitNodes(cbNode, cbNodes, data.modifiers) ||
        visitNode(cbNode, data.name) ||
        visitNodes(cbNode, cbNodes, data.members),
    [SyntaxKind.EnumMember]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.name) ||
        visitNode(cbNode, data.initializer),
    [SyntaxKind.ExportAssignment]: (data, cbNode, cbNodes) =>
        visitNodes(cbNode, cbNodes, data.modifiers) ||
        visitNode(cbNode, data.expression),
    [SyntaxKind.ExportDeclaration]: (data, cbNode, cbNodes) =>
        visitNodes(cbNode, cbNodes, data.modifiers) ||
        visitNode(cbNode, data.exportClause) ||
        visitNode(cbNode, data.moduleSpecifier) ||
        visitNode(cbNode, data.attributes),
    [SyntaxKind.ExportSpecifier]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.propertyName) ||
        visitNode(cbNode, data.name),
    [SyntaxKind.ExpressionStatement]: (data, cbNode, cbNodes) => visitNode(cbNode, data.expression),
    [SyntaxKind.ExpressionWithTypeArguments]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.expression) ||
        visitNodes(cbNode, cbNodes, data.typeArguments),
    [SyntaxKind.ExternalModuleReference]: (data, cbNode, cbNodes) => visitNode(cbNode, data.expression),
    [SyntaxKind.ForInStatement]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.initializer) ||
        visitNode(cbNode, data.expression) ||
        visitNode(cbNode, data.statement),
    [SyntaxKind.ForOfStatement]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.awaitModifier) ||
        visitNode(cbNode, data.initializer) ||
        visitNode(cbNode, data.expression) ||
        visitNode(cbNode, data.statement),
    [SyntaxKind.ForStatement]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.initializer) ||
        visitNode(cbNode, data.condition) ||
        visitNode(cbNode, data.incrementor) ||
        visitNode(cbNode, data.statement),
    [SyntaxKind.FunctionDeclaration]: (data, cbNode, cbNodes) =>
        visitNodes(cbNode, cbNodes, data.modifiers) ||
        visitNode(cbNode, data.asteriskToken) ||
        visitNode(cbNode, data.name) ||
        visitNodes(cbNode, cbNodes, data.typeParameters) ||
        visitNodes(cbNode, cbNodes, data.parameters) ||
        visitNode(cbNode, data.type) ||
        visitNode(cbNode, data.body),
    [SyntaxKind.FunctionExpression]: (data, cbNode, cbNodes) =>
        visitNodes(cbNode, cbNodes, data.modifiers) ||
        visitNode(cbNode, data.asteriskToken) ||
        visitNode(cbNode, data.name) ||
        visitNodes(cbNode, cbNodes, data.typeParameters) ||
        visitNodes(cbNode, cbNodes, data.parameters) ||
        visitNode(cbNode, data.type) ||
        visitNode(cbNode, data.body),
    [SyntaxKind.FunctionType]: (data, cbNode, cbNodes) =>
        visitNodes(cbNode, cbNodes, data.typeParameters) ||
        visitNodes(cbNode, cbNodes, data.parameters) ||
        visitNode(cbNode, data.type),
    [SyntaxKind.GetAccessor]: (data, cbNode, cbNodes) =>
        visitNodes(cbNode, cbNodes, data.modifiers) ||
        visitNode(cbNode, data.name) ||
        visitNodes(cbNode, cbNodes, data.parameters) ||
        visitNode(cbNode, data.type) ||
        visitNode(cbNode, data.body),
    [SyntaxKind.HeritageClause]: (data, cbNode, cbNodes) => visitNodes(cbNode, cbNodes, data.types),
    [SyntaxKind.IfStatement]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.expression) ||
        visitNode(cbNode, data.thenStatement) ||
        visitNode(cbNode, data.elseStatement),
    [SyntaxKind.ImportAttribute]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.name) ||
        visitNode(cbNode, data.value),
    [SyntaxKind.ImportAttributes]: (data, cbNode, cbNodes) => visitNodes(cbNode, cbNodes, data.elements),
    [SyntaxKind.ImportClause]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.name) ||
        visitNode(cbNode, data.namedBindings),
    [SyntaxKind.ImportDeclaration]: (data, cbNode, cbNodes) =>
        visitNodes(cbNode, cbNodes, data.modifiers) ||
        visitNode(cbNode, data.importClause) ||
        visitNode(cbNode, data.moduleSpecifier) ||
        visitNode(cbNode, data.attributes),
    [SyntaxKind.ImportEqualsDeclaration]: (data, cbNode, cbNodes) =>
        visitNodes(cbNode, cbNodes, data.modifiers) ||
        visitNode(cbNode, data.name) ||
        visitNode(cbNode, data.moduleReference),
    [SyntaxKind.ImportSpecifier]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.propertyName) ||
        visitNode(cbNode, data.name),
    [SyntaxKind.ImportType]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.argument) ||
        visitNode(cbNode, data.attributes) ||
        visitNode(cbNode, data.qualifier) ||
        visitNodes(cbNode, cbNodes, data.typeArguments),
    [SyntaxKind.IndexedAccessType]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.objectType) ||
        visitNode(cbNode, data.indexType),
    [SyntaxKind.IndexSignature]: (data, cbNode, cbNodes) =>
        visitNodes(cbNode, cbNodes, data.modifiers) ||
        visitNodes(cbNode, cbNodes, data.parameters) ||
        visitNode(cbNode, data.type),
    [SyntaxKind.InferType]: (data, cbNode, cbNodes) => visitNode(cbNode, data.typeParameter),
    [SyntaxKind.InterfaceDeclaration]: (data, cbNode, cbNodes) =>
        visitNodes(cbNode, cbNodes, data.modifiers) ||
        visitNode(cbNode, data.name) ||
        visitNodes(cbNode, cbNodes, data.typeParameters) ||
        visitNodes(cbNode, cbNodes, data.heritageClauses) ||
        visitNodes(cbNode, cbNodes, data.members),
    [SyntaxKind.IntersectionType]: (data, cbNode, cbNodes) => visitNodes(cbNode, cbNodes, data.types),
    [SyntaxKind.JSDoc]: (data, cbNode, cbNodes) => visitNodes(cbNode, cbNodes, data.tags),
    [SyntaxKind.JSDocAugmentsTag]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.tagName) ||
        visitNode(cbNode, data.class),
    [SyntaxKind.JSDocCallbackTag]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.tagName) ||
        visitNode(cbNode, data.typeExpression) ||
        visitNode(cbNode, data.fullName),
    [SyntaxKind.JSDocDeprecatedTag]: (data, cbNode, cbNodes) => visitNode(cbNode, data.tagName),
    [SyntaxKind.JSDocImplementsTag]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.tagName) ||
        visitNode(cbNode, data.class),
    [SyntaxKind.JSDocImportTag]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.tagName) ||
        visitNode(cbNode, data.importClause) ||
        visitNode(cbNode, data.moduleSpecifier) ||
        visitNode(cbNode, data.attributes),
    [SyntaxKind.JSDocLink]: (data, cbNode, cbNodes) => visitNode(cbNode, data.name),
    [SyntaxKind.JSDocLinkCode]: (data, cbNode, cbNodes) => visitNode(cbNode, data.name),
    [SyntaxKind.JSDocLinkPlain]: (data, cbNode, cbNodes) => visitNode(cbNode, data.name),
    [SyntaxKind.JSDocMemberName]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.left) ||
        visitNode(cbNode, data.right),
    [SyntaxKind.JSDocNameReference]: (data, cbNode, cbNodes) => visitNode(cbNode, data.name),
    [SyntaxKind.JSDocNonNullableType]: (data, cbNode, cbNodes) => visitNode(cbNode, data.type),
    [SyntaxKind.JSDocNullableType]: (data, cbNode, cbNodes) => visitNode(cbNode, data.type),
    [SyntaxKind.JSDocOptionalType]: (data, cbNode, cbNodes) => visitNode(cbNode, data.type),
    [SyntaxKind.JSDocOverloadTag]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.tagName) ||
        visitNode(cbNode, data.typeExpression),
    [SyntaxKind.JSDocOverrideTag]: (data, cbNode, cbNodes) => visitNode(cbNode, data.tagName),
    [SyntaxKind.JSDocParameterTag]: (data, cbNode, cbNodes) => visitNode(cbNode, data.tagName),
    [SyntaxKind.JSDocPrivateTag]: (data, cbNode, cbNodes) => visitNode(cbNode, data.tagName),
    [SyntaxKind.JSDocProtectedTag]: (data, cbNode, cbNodes) => visitNode(cbNode, data.tagName),
    [SyntaxKind.JSDocPublicTag]: (data, cbNode, cbNodes) => visitNode(cbNode, data.tagName),
    [SyntaxKind.JSDocReadonlyTag]: (data, cbNode, cbNodes) => visitNode(cbNode, data.tagName),
    [SyntaxKind.JSDocReturnTag]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.tagName) ||
        visitNode(cbNode, data.typeExpression),
    [SyntaxKind.JSDocSatisfiesTag]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.tagName) ||
        visitNode(cbNode, data.typeExpression),
    [SyntaxKind.JSDocSeeTag]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.tagName) ||
        visitNode(cbNode, data.name),
    [SyntaxKind.JSDocSignature]: (data, cbNode, cbNodes) => visitNode(cbNode, data.type),
    [SyntaxKind.JSDocTemplateTag]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.tagName) ||
        visitNode(cbNode, data.constraint) ||
        visitNodes(cbNode, cbNodes, data.typeParameters),
    [SyntaxKind.JSDocThisTag]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.tagName) ||
        visitNode(cbNode, data.typeExpression),
    [SyntaxKind.JSDocTypedefTag]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.tagName) ||
        visitNode(cbNode, data.typeExpression) ||
        visitNode(cbNode, data.fullName),
    [SyntaxKind.JSDocTypeExpression]: (data, cbNode, cbNodes) => visitNode(cbNode, data.type),
    [SyntaxKind.JSDocTypeTag]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.tagName) ||
        visitNode(cbNode, data.typeExpression),
    [SyntaxKind.JSDocTag]: (data, cbNode, cbNodes) => visitNode(cbNode, data.tagName),
    [SyntaxKind.JSDocVariadicType]: (data, cbNode, cbNodes) => visitNode(cbNode, data.type),
    [SyntaxKind.JsxAttribute]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.name) ||
        visitNode(cbNode, data.initializer),
    [SyntaxKind.JsxAttributes]: (data, cbNode, cbNodes) => visitNodes(cbNode, cbNodes, data.properties),
    [SyntaxKind.JsxClosingElement]: (data, cbNode, cbNodes) => visitNode(cbNode, data.tagName),
    [SyntaxKind.JsxElement]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.openingElement) ||
        visitNodes(cbNode, cbNodes, data.children) ||
        visitNode(cbNode, data.closingElement),
    [SyntaxKind.JsxExpression]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.dotDotDotToken) ||
        visitNode(cbNode, data.expression),
    [SyntaxKind.JsxFragment]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.openingFragment) ||
        visitNodes(cbNode, cbNodes, data.children) ||
        visitNode(cbNode, data.closingFragment),
    [SyntaxKind.JsxNamespacedName]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.name) ||
        visitNode(cbNode, data.namespace),
    [SyntaxKind.JsxOpeningElement]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.tagName) ||
        visitNodes(cbNode, cbNodes, data.typeArguments) ||
        visitNode(cbNode, data.attributes),
    [SyntaxKind.JsxSelfClosingElement]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.tagName) ||
        visitNodes(cbNode, cbNodes, data.typeArguments) ||
        visitNode(cbNode, data.attributes),
    [SyntaxKind.JsxSpreadAttribute]: (data, cbNode, cbNodes) => visitNode(cbNode, data.expression),
    [SyntaxKind.LabeledStatement]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.label) ||
        visitNode(cbNode, data.statement),
    [SyntaxKind.LiteralType]: (data, cbNode, cbNodes) => visitNode(cbNode, data.literal),
    [SyntaxKind.MappedType]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.readonlyToken) ||
        visitNode(cbNode, data.typeParameter) ||
        visitNode(cbNode, data.nameType) ||
        visitNode(cbNode, data.questionToken) ||
        visitNode(cbNode, data.type) ||
        visitNodes(cbNode, cbNodes, data.members),
    [SyntaxKind.MetaProperty]: (data, cbNode, cbNodes) => visitNode(cbNode, data.name),
    [SyntaxKind.MethodDeclaration]: (data, cbNode, cbNodes) =>
        visitNodes(cbNode, cbNodes, data.modifiers) ||
        visitNode(cbNode, data.asteriskToken) ||
        visitNode(cbNode, data.name) ||
        visitNode(cbNode, data.postfixToken) ||
        visitNodes(cbNode, cbNodes, data.typeParameters) ||
        visitNodes(cbNode, cbNodes, data.parameters) ||
        visitNode(cbNode, data.type) ||
        visitNode(cbNode, data.body),
    [SyntaxKind.MethodSignature]: (data, cbNode, cbNodes) =>
        visitNodes(cbNode, cbNodes, data.modifiers) ||
        visitNode(cbNode, data.name) ||
        visitNode(cbNode, data.postfixToken) ||
        visitNodes(cbNode, cbNodes, data.typeParameters) ||
        visitNodes(cbNode, cbNodes, data.parameters) ||
        visitNode(cbNode, data.type),
    [SyntaxKind.ModuleBlock]: (data, cbNode, cbNodes) => visitNodes(cbNode, cbNodes, data.statements),
    [SyntaxKind.ModuleDeclaration]: (data, cbNode, cbNodes) =>
        visitNodes(cbNode, cbNodes, data.modifiers) ||
        visitNode(cbNode, data.name) ||
        visitNode(cbNode, data.body),
    [SyntaxKind.NamedExports]: (data, cbNode, cbNodes) => visitNodes(cbNode, cbNodes, data.elements),
    [SyntaxKind.NamedImports]: (data, cbNode, cbNodes) => visitNodes(cbNode, cbNodes, data.elements),
    [SyntaxKind.NamedTupleMember]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.dotDotDotToken) ||
        visitNode(cbNode, data.name) ||
        visitNode(cbNode, data.questionToken) ||
        visitNode(cbNode, data.type),
    [SyntaxKind.NamespaceExport]: (data, cbNode, cbNodes) => visitNode(cbNode, data.name),
    [SyntaxKind.NamespaceExportDeclaration]: (data, cbNode, cbNodes) => visitNode(cbNode, data.name),
    [SyntaxKind.NamespaceImport]: (data, cbNode, cbNodes) => visitNode(cbNode, data.name),
    [SyntaxKind.NewExpression]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.expression) ||
        visitNodes(cbNode, cbNodes, data.typeArguments) ||
        visitNodes(cbNode, cbNodes, data.arguments),
    [SyntaxKind.NonNullExpression]: (data, cbNode, cbNodes) => visitNode(cbNode, data.expression),
    [SyntaxKind.ObjectBindingPattern]: (data, cbNode, cbNodes) => visitNodes(cbNode, cbNodes, data.elements),
    [SyntaxKind.ObjectLiteralExpression]: (data, cbNode, cbNodes) => visitNodes(cbNode, cbNodes, data.properties),
    [SyntaxKind.OptionalType]: (data, cbNode, cbNodes) => visitNode(cbNode, data.type),
    [SyntaxKind.Parameter]: (data, cbNode, cbNodes) =>
        visitNodes(cbNode, cbNodes, data.modifiers) ||
        visitNode(cbNode, data.dotDotDotToken) ||
        visitNode(cbNode, data.name) ||
        visitNode(cbNode, data.questionToken) ||
        visitNode(cbNode, data.type) ||
        visitNode(cbNode, data.initializer),
    [SyntaxKind.ParenthesizedExpression]: (data, cbNode, cbNodes) => visitNode(cbNode, data.expression),
    [SyntaxKind.ParenthesizedType]: (data, cbNode, cbNodes) => visitNode(cbNode, data.type),
    [SyntaxKind.PartiallyEmittedExpression]: (data, cbNode, cbNodes) => visitNode(cbNode, data.expression),
    [SyntaxKind.PostfixUnaryExpression]: (data, cbNode, cbNodes) => visitNode(cbNode, data.operand),
    [SyntaxKind.PrefixUnaryExpression]: (data, cbNode, cbNodes) => visitNode(cbNode, data.operand),
    [SyntaxKind.PropertyAccessExpression]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.expression) ||
        visitNode(cbNode, data.questionDotToken) ||
        visitNode(cbNode, data.name),
    [SyntaxKind.PropertyAssignment]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.name) ||
        visitNode(cbNode, data.postfixToken) ||
        visitNode(cbNode, data.initializer),
    [SyntaxKind.PropertyDeclaration]: (data, cbNode, cbNodes) =>
        visitNodes(cbNode, cbNodes, data.modifiers) ||
        visitNode(cbNode, data.name) ||
        visitNode(cbNode, data.postfixToken) ||
        visitNode(cbNode, data.type) ||
        visitNode(cbNode, data.initializer),
    [SyntaxKind.PropertySignature]: (data, cbNode, cbNodes) =>
        visitNodes(cbNode, cbNodes, data.modifiers) ||
        visitNode(cbNode, data.name) ||
        visitNode(cbNode, data.postfixToken) ||
        visitNode(cbNode, data.type),
    [SyntaxKind.QualifiedName]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.left) ||
        visitNode(cbNode, data.right),
    [SyntaxKind.RestType]: (data, cbNode, cbNodes) => visitNode(cbNode, data.type),
    [SyntaxKind.ReturnStatement]: (data, cbNode, cbNodes) => visitNode(cbNode, data.expression),
    [SyntaxKind.SatisfiesExpression]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.expression) ||
        visitNode(cbNode, data.type),
    [SyntaxKind.SetAccessor]: (data, cbNode, cbNodes) =>
        visitNodes(cbNode, cbNodes, data.modifiers) ||
        visitNode(cbNode, data.name) ||
        visitNodes(cbNode, cbNodes, data.parameters) ||
        visitNode(cbNode, data.body),
    [SyntaxKind.ShorthandPropertyAssignment]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.name) ||
        visitNode(cbNode, data.postfixToken) ||
        visitNode(cbNode, data.equalsToken) ||
        visitNode(cbNode, data.objectAssignmentInitializer),
    [SyntaxKind.SourceFile]: (data, cbNode, cbNodes) =>
        visitNodes(cbNode, cbNodes, data.statements) ||
        visitNode(cbNode, data.endOfFileToken),
    [SyntaxKind.SpreadAssignment]: (data, cbNode, cbNodes) => visitNode(cbNode, data.expression),
    [SyntaxKind.SpreadElement]: (data, cbNode, cbNodes) => visitNode(cbNode, data.expression),
    [SyntaxKind.SwitchStatement]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.expression) ||
        visitNode(cbNode, data.caseBlock),
    [SyntaxKind.TaggedTemplateExpression]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.tag) ||
        visitNodes(cbNode, cbNodes, data.typeArguments) ||
        visitNode(cbNode, data.template),
    [SyntaxKind.TemplateExpression]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.head) ||
        visitNodes(cbNode, cbNodes, data.templateSpans),
    [SyntaxKind.TemplateLiteralType]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.head) ||
        visitNodes(cbNode, cbNodes, data.templateSpans),
    [SyntaxKind.TemplateLiteralTypeSpan]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.type) ||
        visitNode(cbNode, data.literal),
    [SyntaxKind.TemplateSpan]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.expression) ||
        visitNode(cbNode, data.literal),
    [SyntaxKind.ThrowStatement]: (data, cbNode, cbNodes) => visitNode(cbNode, data.expression),
    [SyntaxKind.TryStatement]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.tryBlock) ||
        visitNode(cbNode, data.catchClause) ||
        visitNode(cbNode, data.finallyBlock),
    [SyntaxKind.TupleType]: (data, cbNode, cbNodes) => visitNodes(cbNode, cbNodes, data.elements),
    [SyntaxKind.TypeAliasDeclaration]: (data, cbNode, cbNodes) =>
        visitNodes(cbNode, cbNodes, data.modifiers) ||
        visitNode(cbNode, data.name) ||
        visitNodes(cbNode, cbNodes, data.typeParameters) ||
        visitNode(cbNode, data.type),
    [SyntaxKind.TypeAssertionExpression]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.type) ||
        visitNode(cbNode, data.expression),
    [SyntaxKind.TypeLiteral]: (data, cbNode, cbNodes) => visitNodes(cbNode, cbNodes, data.members),
    [SyntaxKind.TypeOfExpression]: (data, cbNode, cbNodes) => visitNode(cbNode, data.expression),
    [SyntaxKind.TypeOperator]: (data, cbNode, cbNodes) => visitNode(cbNode, data.type),
    [SyntaxKind.TypeParameter]: (data, cbNode, cbNodes) =>
        visitNodes(cbNode, cbNodes, data.modifiers) ||
        visitNode(cbNode, data.name) ||
        visitNode(cbNode, data.constraint) ||
        visitNode(cbNode, data.default),
    [SyntaxKind.TypePredicate]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.assertsModifier) ||
        visitNode(cbNode, data.parameterName) ||
        visitNode(cbNode, data.type),
    [SyntaxKind.TypeQuery]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.exprName) ||
        visitNodes(cbNode, cbNodes, data.typeArguments),
    [SyntaxKind.TypeReference]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.typeName) ||
        visitNodes(cbNode, cbNodes, data.typeArguments),
    [SyntaxKind.UnionType]: (data, cbNode, cbNodes) => visitNodes(cbNode, cbNodes, data.types),
    [SyntaxKind.VariableDeclaration]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.name) ||
        visitNode(cbNode, data.exclamationToken) ||
        visitNode(cbNode, data.type) ||
        visitNode(cbNode, data.initializer),
    [SyntaxKind.VariableDeclarationList]: (data, cbNode, cbNodes) => visitNodes(cbNode, cbNodes, data.declarations),
    [SyntaxKind.VariableStatement]: (data, cbNode, cbNodes) =>
        visitNodes(cbNode, cbNodes, data.modifiers) ||
        visitNode(cbNode, data.declarationList),
    [SyntaxKind.VoidExpression]: (data, cbNode, cbNodes) => visitNode(cbNode, data.expression),
    [SyntaxKind.WhileStatement]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.expression) ||
        visitNode(cbNode, data.statement),
    [SyntaxKind.WithStatement]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.expression) ||
        visitNode(cbNode, data.statement),
    [SyntaxKind.YieldExpression]: (data, cbNode, cbNodes) =>
        visitNode(cbNode, data.asteriskToken) ||
        visitNode(cbNode, data.expression),
};

function visitNode<T>(cbNode: (node: Node) => T, node: Node | undefined): T | undefined {
    return node ? cbNode(node) : undefined;
}

function visitNodes<T>(cbNode: (node: Node) => T, cbNodes: ((nodes: NodeArray<Node>) => T) | undefined, nodes: NodeArray<Node> | undefined): T | undefined {
    if (!nodes) return undefined;
    if (cbNodes) return cbNodes(nodes);
    for (const node of nodes) {
        const result = cbNode(node);
        if (result) return result;
    }
    return undefined;
}

export function createArrayBindingPattern(elements: readonly ArrayBindingElement[]): ArrayBindingPattern {
    return new NodeObject(SyntaxKind.ArrayBindingPattern, {
        elements: createNodeArray(elements),
    }) as unknown as ArrayBindingPattern;
}

export function createArrayLiteralExpression(elements: readonly Expression[], multiLine?: boolean): ArrayLiteralExpression {
    return new NodeObject(SyntaxKind.ArrayLiteralExpression, {
        elements: createNodeArray(elements),
        multiLine,
    }) as unknown as ArrayLiteralExpression;
}

export function createArrayTypeNode(elementType: TypeNode): ArrayTypeNode {
    return new NodeObject(SyntaxKind.ArrayType, {
        elementType,
    }) as unknown as ArrayTypeNode;
}

export function createArrowFunction(modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, equalsGreaterThanToken: EqualsGreaterThanToken, body: ConciseBody): ArrowFunction {
    return new NodeObject(SyntaxKind.ArrowFunction, {
        modifiers: modifiers ? createNodeArray(modifiers) : undefined,
        typeParameters: typeParameters ? createNodeArray(typeParameters) : undefined,
        parameters: createNodeArray(parameters),
        type,
        equalsGreaterThanToken,
        body,
    }) as unknown as ArrowFunction;
}

export function createAsExpression(expression: Expression, type: TypeNode): AsExpression {
    return new NodeObject(SyntaxKind.AsExpression, {
        expression,
        type,
    }) as unknown as AsExpression;
}

export function createAwaitExpression(expression: UnaryExpression): AwaitExpression {
    return new NodeObject(SyntaxKind.AwaitExpression, {
        expression,
    }) as unknown as AwaitExpression;
}

export function createBigIntLiteral(text: string): BigIntLiteral {
    return new NodeObject(SyntaxKind.BigIntLiteral, {
        text,
    }) as unknown as BigIntLiteral;
}

export function createBinaryExpression(left: Expression, operatorToken: BinaryOperatorToken, right: Expression): BinaryExpression {
    return new NodeObject(SyntaxKind.BinaryExpression, {
        left,
        operatorToken,
        right,
    }) as unknown as BinaryExpression;
}

export function createBindingElement(dotDotDotToken: DotDotDotToken | undefined, propertyName: PropertyName | undefined, name: BindingName, initializer: Expression | undefined): BindingElement {
    return new NodeObject(SyntaxKind.BindingElement, {
        dotDotDotToken,
        propertyName,
        name,
        initializer,
    }) as unknown as BindingElement;
}

export function createBlock(statements: readonly Statement[], multiLine?: boolean): Block {
    return new NodeObject(SyntaxKind.Block, {
        statements: createNodeArray(statements),
        multiLine,
    }) as unknown as Block;
}

export function createBreakStatement(label: Identifier | undefined): BreakStatement {
    return new NodeObject(SyntaxKind.BreakStatement, {
        label,
    }) as unknown as BreakStatement;
}

export function createCallExpression(expression: LeftHandSideExpression, questionDotToken: QuestionDotToken | undefined, typeArguments: readonly TypeNode[] | undefined, arguments_: readonly Expression[]): CallExpression {
    return new NodeObject(SyntaxKind.CallExpression, {
        expression,
        questionDotToken,
        typeArguments: typeArguments ? createNodeArray(typeArguments) : undefined,
        arguments: createNodeArray(arguments_),
    }) as unknown as CallExpression;
}

export function createCallSignatureDeclaration(typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined): CallSignatureDeclaration {
    return new NodeObject(SyntaxKind.CallSignature, {
        typeParameters: typeParameters ? createNodeArray(typeParameters) : undefined,
        parameters: createNodeArray(parameters),
        type,
    }) as unknown as CallSignatureDeclaration;
}

export function createCaseBlock(clauses: readonly CaseOrDefaultClause[]): CaseBlock {
    return new NodeObject(SyntaxKind.CaseBlock, {
        clauses: createNodeArray(clauses),
    }) as unknown as CaseBlock;
}

export function createCaseClause(expression: Expression, statements: readonly Statement[]): CaseClause {
    return new NodeObject(SyntaxKind.CaseClause, {
        expression,
        statements: createNodeArray(statements),
    }) as unknown as CaseClause;
}

export function createCatchClause(variableDeclaration: VariableDeclaration | undefined, block: Block): CatchClause {
    return new NodeObject(SyntaxKind.CatchClause, {
        variableDeclaration,
        block,
    }) as unknown as CatchClause;
}

export function createClassDeclaration(modifiers: readonly ModifierLike[] | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassDeclaration {
    return new NodeObject(SyntaxKind.ClassDeclaration, {
        modifiers: modifiers ? createNodeArray(modifiers) : undefined,
        name,
        typeParameters: typeParameters ? createNodeArray(typeParameters) : undefined,
        heritageClauses: heritageClauses ? createNodeArray(heritageClauses) : undefined,
        members: createNodeArray(members),
    }) as unknown as ClassDeclaration;
}

export function createClassExpression(modifiers: readonly ModifierLike[] | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassExpression {
    return new NodeObject(SyntaxKind.ClassExpression, {
        modifiers: modifiers ? createNodeArray(modifiers) : undefined,
        name,
        typeParameters: typeParameters ? createNodeArray(typeParameters) : undefined,
        heritageClauses: heritageClauses ? createNodeArray(heritageClauses) : undefined,
        members: createNodeArray(members),
    }) as unknown as ClassExpression;
}

export function createClassStaticBlockDeclaration(body: Block): ClassStaticBlockDeclaration {
    return new NodeObject(SyntaxKind.ClassStaticBlockDeclaration, {
        body,
    }) as unknown as ClassStaticBlockDeclaration;
}

export function createCommaListExpression(elements: readonly Expression[]): CommaListExpression {
    return new NodeObject(SyntaxKind.CommaListExpression, {
        elements: createNodeArray(elements),
    }) as unknown as CommaListExpression;
}

export function createComputedPropertyName(expression: Expression): ComputedPropertyName {
    return new NodeObject(SyntaxKind.ComputedPropertyName, {
        expression,
    }) as unknown as ComputedPropertyName;
}

export function createConditionalExpression(condition: Expression, questionToken: QuestionToken, whenTrue: Expression, colonToken: ColonToken, whenFalse: Expression): ConditionalExpression {
    return new NodeObject(SyntaxKind.ConditionalExpression, {
        condition,
        questionToken,
        whenTrue,
        colonToken,
        whenFalse,
    }) as unknown as ConditionalExpression;
}

export function createConditionalTypeNode(checkType: TypeNode, extendsType: TypeNode, trueType: TypeNode, falseType: TypeNode): ConditionalTypeNode {
    return new NodeObject(SyntaxKind.ConditionalType, {
        checkType,
        extendsType,
        trueType,
        falseType,
    }) as unknown as ConditionalTypeNode;
}

export function createConstructorDeclaration(modifiers: readonly ModifierLike[] | undefined, parameters: readonly ParameterDeclaration[], body: FunctionBody | undefined): ConstructorDeclaration {
    return new NodeObject(SyntaxKind.Constructor, {
        modifiers: modifiers ? createNodeArray(modifiers) : undefined,
        parameters: createNodeArray(parameters),
        body,
    }) as unknown as ConstructorDeclaration;
}

export function createConstructorTypeNode(modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): ConstructorTypeNode {
    return new NodeObject(SyntaxKind.ConstructorType, {
        modifiers: modifiers ? createNodeArray(modifiers) : undefined,
        typeParameters: typeParameters ? createNodeArray(typeParameters) : undefined,
        parameters: createNodeArray(parameters),
        type,
    }) as unknown as ConstructorTypeNode;
}

export function createConstructSignatureDeclaration(typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined): ConstructSignatureDeclaration {
    return new NodeObject(SyntaxKind.ConstructSignature, {
        typeParameters: typeParameters ? createNodeArray(typeParameters) : undefined,
        parameters: createNodeArray(parameters),
        type,
    }) as unknown as ConstructSignatureDeclaration;
}

export function createContinueStatement(label: Identifier | undefined): ContinueStatement {
    return new NodeObject(SyntaxKind.ContinueStatement, {
        label,
    }) as unknown as ContinueStatement;
}

export function createDebuggerStatement(): DebuggerStatement {
    return new NodeObject(SyntaxKind.DebuggerStatement, undefined) as unknown as DebuggerStatement;
}

export function createDecorator(expression: LeftHandSideExpression): Decorator {
    return new NodeObject(SyntaxKind.Decorator, {
        expression,
    }) as unknown as Decorator;
}

export function createDefaultClause(statements: readonly Statement[]): DefaultClause {
    return new NodeObject(SyntaxKind.DefaultClause, {
        statements: createNodeArray(statements),
    }) as unknown as DefaultClause;
}

export function createDeleteExpression(expression: UnaryExpression): DeleteExpression {
    return new NodeObject(SyntaxKind.DeleteExpression, {
        expression,
    }) as unknown as DeleteExpression;
}

export function createDoStatement(statement: Statement, expression: Expression): DoStatement {
    return new NodeObject(SyntaxKind.DoStatement, {
        statement,
        expression,
    }) as unknown as DoStatement;
}

export function createElementAccessExpression(expression: LeftHandSideExpression, questionDotToken: QuestionDotToken | undefined, argumentExpression: Expression): ElementAccessExpression {
    return new NodeObject(SyntaxKind.ElementAccessExpression, {
        expression,
        questionDotToken,
        argumentExpression,
    }) as unknown as ElementAccessExpression;
}

export function createEmptyStatement(): EmptyStatement {
    return new NodeObject(SyntaxKind.EmptyStatement, undefined) as unknown as EmptyStatement;
}

export function createEnumDeclaration(modifiers: readonly ModifierLike[] | undefined, name: Identifier, members: readonly EnumMember[]): EnumDeclaration {
    return new NodeObject(SyntaxKind.EnumDeclaration, {
        modifiers: modifiers ? createNodeArray(modifiers) : undefined,
        name,
        members: createNodeArray(members),
    }) as unknown as EnumDeclaration;
}

export function createEnumMember(name: PropertyName, initializer: Expression | undefined): EnumMember {
    return new NodeObject(SyntaxKind.EnumMember, {
        name,
        initializer,
    }) as unknown as EnumMember;
}

export function createExportAssignment(modifiers: readonly ModifierLike[] | undefined, expression: Expression, isExportEquals?: boolean): ExportAssignment {
    return new NodeObject(SyntaxKind.ExportAssignment, {
        modifiers: modifiers ? createNodeArray(modifiers) : undefined,
        expression,
        isExportEquals,
    }) as unknown as ExportAssignment;
}

export function createExportDeclaration(modifiers: readonly ModifierLike[] | undefined, exportClause: NamedExportBindings | undefined, moduleSpecifier: Expression | undefined, attributes: ImportAttributes | undefined, isTypeOnly: boolean): ExportDeclaration {
    return new NodeObject(SyntaxKind.ExportDeclaration, {
        modifiers: modifiers ? createNodeArray(modifiers) : undefined,
        exportClause,
        moduleSpecifier,
        attributes,
        isTypeOnly,
    }) as unknown as ExportDeclaration;
}

export function createExportSpecifier(propertyName: ModuleExportName | undefined, name: ModuleExportName, isTypeOnly: boolean): ExportSpecifier {
    return new NodeObject(SyntaxKind.ExportSpecifier, {
        propertyName,
        name,
        isTypeOnly,
    }) as unknown as ExportSpecifier;
}

export function createExpressionStatement(expression: Expression): ExpressionStatement {
    return new NodeObject(SyntaxKind.ExpressionStatement, {
        expression,
    }) as unknown as ExpressionStatement;
}

export function createExpressionWithTypeArguments(expression: LeftHandSideExpression, typeArguments: readonly TypeNode[] | undefined): ExpressionWithTypeArguments {
    return new NodeObject(SyntaxKind.ExpressionWithTypeArguments, {
        expression,
        typeArguments: typeArguments ? createNodeArray(typeArguments) : undefined,
    }) as unknown as ExpressionWithTypeArguments;
}

export function createExternalModuleReference(expression: Expression): ExternalModuleReference {
    return new NodeObject(SyntaxKind.ExternalModuleReference, {
        expression,
    }) as unknown as ExternalModuleReference;
}

export function createFalseLiteral(): FalseLiteral {
    return new NodeObject(SyntaxKind.FalseKeyword, undefined) as unknown as FalseLiteral;
}

export function createForInStatement(initializer: ForInitializer, expression: Expression, statement: Statement): ForInStatement {
    return new NodeObject(SyntaxKind.ForInStatement, {
        initializer,
        expression,
        statement,
    }) as unknown as ForInStatement;
}

export function createForOfStatement(awaitModifier: AwaitKeyword | undefined, initializer: ForInitializer, expression: Expression, statement: Statement): ForOfStatement {
    return new NodeObject(SyntaxKind.ForOfStatement, {
        awaitModifier,
        initializer,
        expression,
        statement,
    }) as unknown as ForOfStatement;
}

export function createForStatement(initializer: ForInitializer | undefined, condition: Expression | undefined, incrementor: Expression | undefined, statement: Statement): ForStatement {
    return new NodeObject(SyntaxKind.ForStatement, {
        initializer,
        condition,
        incrementor,
        statement,
    }) as unknown as ForStatement;
}

export function createFunctionDeclaration(modifiers: readonly ModifierLike[] | undefined, asteriskToken: AsteriskToken | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: FunctionBody | undefined): FunctionDeclaration {
    return new NodeObject(SyntaxKind.FunctionDeclaration, {
        modifiers: modifiers ? createNodeArray(modifiers) : undefined,
        asteriskToken,
        name,
        typeParameters: typeParameters ? createNodeArray(typeParameters) : undefined,
        parameters: createNodeArray(parameters),
        type,
        body,
    }) as unknown as FunctionDeclaration;
}

export function createFunctionExpression(modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: FunctionBody): FunctionExpression {
    return new NodeObject(SyntaxKind.FunctionExpression, {
        modifiers: modifiers ? createNodeArray(modifiers) : undefined,
        asteriskToken,
        name,
        typeParameters: typeParameters ? createNodeArray(typeParameters) : undefined,
        parameters: createNodeArray(parameters),
        type,
        body,
    }) as unknown as FunctionExpression;
}

export function createFunctionTypeNode(typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): FunctionTypeNode {
    return new NodeObject(SyntaxKind.FunctionType, {
        typeParameters: typeParameters ? createNodeArray(typeParameters) : undefined,
        parameters: createNodeArray(parameters),
        type,
    }) as unknown as FunctionTypeNode;
}

export function createGetAccessorDeclaration(modifiers: readonly ModifierLike[] | undefined, name: PropertyName, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: FunctionBody | undefined): GetAccessorDeclaration {
    return new NodeObject(SyntaxKind.GetAccessor, {
        modifiers: modifiers ? createNodeArray(modifiers) : undefined,
        name,
        parameters: createNodeArray(parameters),
        type,
        body,
    }) as unknown as GetAccessorDeclaration;
}

export function createHeritageClause(token: SyntaxKind.ExtendsKeyword | SyntaxKind.ImplementsKeyword, types: readonly ExpressionWithTypeArguments[]): HeritageClause {
    return new NodeObject(SyntaxKind.HeritageClause, {
        token,
        types: createNodeArray(types),
    }) as unknown as HeritageClause;
}

export function createIdentifier(text: string): Identifier {
    return new NodeObject(SyntaxKind.Identifier, {
        text,
    }) as unknown as Identifier;
}

export function createIfStatement(expression: Expression, thenStatement: Statement, elseStatement: Statement | undefined): IfStatement {
    return new NodeObject(SyntaxKind.IfStatement, {
        expression,
        thenStatement,
        elseStatement,
    }) as unknown as IfStatement;
}

export function createImportAttribute(name: ImportAttributeName, value: Expression): ImportAttribute {
    return new NodeObject(SyntaxKind.ImportAttribute, {
        name,
        value,
    }) as unknown as ImportAttribute;
}

export function createImportAttributes(token: SyntaxKind.WithKeyword | SyntaxKind.AssertKeyword, elements: readonly ImportAttribute[], multiLine?: boolean): ImportAttributes {
    return new NodeObject(SyntaxKind.ImportAttributes, {
        token,
        elements: createNodeArray(elements),
        multiLine,
    }) as unknown as ImportAttributes;
}

export function createImportClause(name: Identifier | undefined, namedBindings: NamedImportBindings | undefined, phaseModifier: ImportPhaseModifierSyntaxKind): ImportClause {
    return new NodeObject(SyntaxKind.ImportClause, {
        name,
        namedBindings,
        phaseModifier,
    }) as unknown as ImportClause;
}

export function createImportDeclaration(modifiers: readonly ModifierLike[] | undefined, importClause: ImportClause | undefined, moduleSpecifier: Expression, attributes: ImportAttributes | undefined): ImportDeclaration {
    return new NodeObject(SyntaxKind.ImportDeclaration, {
        modifiers: modifiers ? createNodeArray(modifiers) : undefined,
        importClause,
        moduleSpecifier,
        attributes,
    }) as unknown as ImportDeclaration;
}

export function createImportEqualsDeclaration(modifiers: readonly ModifierLike[] | undefined, name: Identifier, moduleReference: ModuleReference, isTypeOnly: boolean): ImportEqualsDeclaration {
    return new NodeObject(SyntaxKind.ImportEqualsDeclaration, {
        modifiers: modifiers ? createNodeArray(modifiers) : undefined,
        name,
        moduleReference,
        isTypeOnly,
    }) as unknown as ImportEqualsDeclaration;
}

export function createImportExpression(): ImportExpression {
    return new NodeObject(SyntaxKind.ImportKeyword, undefined) as unknown as ImportExpression;
}

export function createImportSpecifier(propertyName: ModuleExportName | undefined, name: Identifier, isTypeOnly: boolean): ImportSpecifier {
    return new NodeObject(SyntaxKind.ImportSpecifier, {
        propertyName,
        name,
        isTypeOnly,
    }) as unknown as ImportSpecifier;
}

export function createImportTypeNode(argument: TypeNode, attributes: ImportAttributes | undefined, qualifier: EntityName | undefined, typeArguments: readonly TypeNode[] | undefined, isTypeOf: boolean): ImportTypeNode {
    return new NodeObject(SyntaxKind.ImportType, {
        argument,
        attributes,
        qualifier,
        typeArguments: typeArguments ? createNodeArray(typeArguments) : undefined,
        isTypeOf,
    }) as unknown as ImportTypeNode;
}

export function createIndexedAccessTypeNode(objectType: TypeNode, indexType: TypeNode): IndexedAccessTypeNode {
    return new NodeObject(SyntaxKind.IndexedAccessType, {
        objectType,
        indexType,
    }) as unknown as IndexedAccessTypeNode;
}

export function createIndexSignatureDeclaration(modifiers: readonly ModifierLike[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): IndexSignatureDeclaration {
    return new NodeObject(SyntaxKind.IndexSignature, {
        modifiers: modifiers ? createNodeArray(modifiers) : undefined,
        parameters: createNodeArray(parameters),
        type,
    }) as unknown as IndexSignatureDeclaration;
}

export function createInferTypeNode(typeParameter: TypeParameterDeclaration): InferTypeNode {
    return new NodeObject(SyntaxKind.InferType, {
        typeParameter,
    }) as unknown as InferTypeNode;
}

export function createInterfaceDeclaration(modifiers: readonly ModifierLike[] | undefined, name: Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly TypeElement[]): InterfaceDeclaration {
    return new NodeObject(SyntaxKind.InterfaceDeclaration, {
        modifiers: modifiers ? createNodeArray(modifiers) : undefined,
        name,
        typeParameters: typeParameters ? createNodeArray(typeParameters) : undefined,
        heritageClauses: heritageClauses ? createNodeArray(heritageClauses) : undefined,
        members: createNodeArray(members),
    }) as unknown as InterfaceDeclaration;
}

export function createIntersectionTypeNode(types: readonly TypeNode[]): IntersectionTypeNode {
    return new NodeObject(SyntaxKind.IntersectionType, {
        types: createNodeArray(types),
    }) as unknown as IntersectionTypeNode;
}

export function createJSDoc(comment: string | NodeArray<JSDocComment> | undefined, tags: readonly JSDocTag[] | undefined): JSDoc {
    return new NodeObject(SyntaxKind.JSDoc, {
        comment,
        tags: tags ? createNodeArray(tags) : undefined,
    }) as unknown as JSDoc;
}

export function createJSDocAllType(): JSDocAllType {
    return new NodeObject(SyntaxKind.JSDocAllType, undefined) as unknown as JSDocAllType;
}

export function createJSDocAugmentsTag(tagName: Identifier, class_: ExpressionWithTypeArguments & { readonly expression: Identifier | PropertyAccessEntityNameExpression; }, comment?: string | NodeArray<JSDocComment>): JSDocAugmentsTag {
    return new NodeObject(SyntaxKind.JSDocAugmentsTag, {
        tagName,
        class: class_,
        comment,
    }) as unknown as JSDocAugmentsTag;
}

export function createJSDocCallbackTag(tagName: Identifier, typeExpression: JSDocSignature, fullName: JSDocNamespaceDeclaration | Identifier | undefined, comment?: string | NodeArray<JSDocComment>): JSDocCallbackTag {
    return new NodeObject(SyntaxKind.JSDocCallbackTag, {
        tagName,
        typeExpression,
        fullName,
        comment,
    }) as unknown as JSDocCallbackTag;
}

export function createJSDocDeprecatedTag(tagName: Identifier, comment?: string | NodeArray<JSDocComment>): JSDocDeprecatedTag {
    return new NodeObject(SyntaxKind.JSDocDeprecatedTag, {
        tagName,
        comment,
    }) as unknown as JSDocDeprecatedTag;
}

export function createJSDocImplementsTag(tagName: Identifier, class_: ExpressionWithTypeArguments & { readonly expression: Identifier | PropertyAccessEntityNameExpression; }, comment?: string | NodeArray<JSDocComment>): JSDocImplementsTag {
    return new NodeObject(SyntaxKind.JSDocImplementsTag, {
        tagName,
        class: class_,
        comment,
    }) as unknown as JSDocImplementsTag;
}

export function createJSDocImportTag(tagName: Identifier, importClause: ImportClause | undefined, moduleSpecifier: Expression, attributes: ImportAttributes | undefined, comment?: string | NodeArray<JSDocComment>): JSDocImportTag {
    return new NodeObject(SyntaxKind.JSDocImportTag, {
        tagName,
        importClause,
        moduleSpecifier,
        attributes,
        comment,
    }) as unknown as JSDocImportTag;
}

export function createJSDocLink(name: EntityName | JSDocMemberName | undefined, text: string): JSDocLink {
    return new NodeObject(SyntaxKind.JSDocLink, {
        name,
        text,
    }) as unknown as JSDocLink;
}

export function createJSDocLinkCode(name: EntityName | JSDocMemberName | undefined, text: string): JSDocLinkCode {
    return new NodeObject(SyntaxKind.JSDocLinkCode, {
        name,
        text,
    }) as unknown as JSDocLinkCode;
}

export function createJSDocLinkPlain(name: EntityName | JSDocMemberName | undefined, text: string): JSDocLinkPlain {
    return new NodeObject(SyntaxKind.JSDocLinkPlain, {
        name,
        text,
    }) as unknown as JSDocLinkPlain;
}

export function createJSDocMemberName(left: EntityName | JSDocMemberName, right: Identifier): JSDocMemberName {
    return new NodeObject(SyntaxKind.JSDocMemberName, {
        left,
        right,
    }) as unknown as JSDocMemberName;
}

export function createJSDocNameReference(name: EntityName | JSDocMemberName): JSDocNameReference {
    return new NodeObject(SyntaxKind.JSDocNameReference, {
        name,
    }) as unknown as JSDocNameReference;
}

export function createJSDocNonNullableType(type: TypeNode, postfix: boolean): JSDocNonNullableType {
    return new NodeObject(SyntaxKind.JSDocNonNullableType, {
        type,
        postfix,
    }) as unknown as JSDocNonNullableType;
}

export function createJSDocNullableType(type: TypeNode, postfix: boolean): JSDocNullableType {
    return new NodeObject(SyntaxKind.JSDocNullableType, {
        type,
        postfix,
    }) as unknown as JSDocNullableType;
}

export function createJSDocOptionalType(type: TypeNode): JSDocOptionalType {
    return new NodeObject(SyntaxKind.JSDocOptionalType, {
        type,
    }) as unknown as JSDocOptionalType;
}

export function createJSDocOverloadTag(tagName: Identifier, typeExpression: JSDocSignature, comment?: string | NodeArray<JSDocComment>): JSDocOverloadTag {
    return new NodeObject(SyntaxKind.JSDocOverloadTag, {
        tagName,
        typeExpression,
        comment,
    }) as unknown as JSDocOverloadTag;
}

export function createJSDocOverrideTag(tagName: Identifier, comment?: string | NodeArray<JSDocComment>): JSDocOverrideTag {
    return new NodeObject(SyntaxKind.JSDocOverrideTag, {
        tagName,
        comment,
    }) as unknown as JSDocOverrideTag;
}

export function createJSDocParameterTag(tagName: Identifier, comment: string | NodeArray<JSDocComment> | undefined, isNameFirst: boolean, isBracketed: boolean): JSDocParameterTag {
    return new NodeObject(SyntaxKind.JSDocParameterTag, {
        tagName,
        comment,
        isNameFirst,
        isBracketed,
    }) as unknown as JSDocParameterTag;
}

export function createJSDocPrivateTag(tagName: Identifier, comment?: string | NodeArray<JSDocComment>): JSDocPrivateTag {
    return new NodeObject(SyntaxKind.JSDocPrivateTag, {
        tagName,
        comment,
    }) as unknown as JSDocPrivateTag;
}

export function createJSDocPropertyTag(comment: string | NodeArray<JSDocComment> | undefined, isNameFirst: boolean, isBracketed: boolean): JSDocPropertyTag {
    return new NodeObject(SyntaxKind.JSDocPropertyTag, {
        comment,
        isNameFirst,
        isBracketed,
    }) as unknown as JSDocPropertyTag;
}

export function createJSDocProtectedTag(tagName: Identifier, comment?: string | NodeArray<JSDocComment>): JSDocProtectedTag {
    return new NodeObject(SyntaxKind.JSDocProtectedTag, {
        tagName,
        comment,
    }) as unknown as JSDocProtectedTag;
}

export function createJSDocPublicTag(tagName: Identifier, comment?: string | NodeArray<JSDocComment>): JSDocPublicTag {
    return new NodeObject(SyntaxKind.JSDocPublicTag, {
        tagName,
        comment,
    }) as unknown as JSDocPublicTag;
}

export function createJSDocReadonlyTag(tagName: Identifier, comment?: string | NodeArray<JSDocComment>): JSDocReadonlyTag {
    return new NodeObject(SyntaxKind.JSDocReadonlyTag, {
        tagName,
        comment,
    }) as unknown as JSDocReadonlyTag;
}

export function createJSDocReturnTag(tagName: Identifier, typeExpression: JSDocTypeExpression | undefined, comment?: string | NodeArray<JSDocComment>): JSDocReturnTag {
    return new NodeObject(SyntaxKind.JSDocReturnTag, {
        tagName,
        typeExpression,
        comment,
    }) as unknown as JSDocReturnTag;
}

export function createJSDocSatisfiesTag(tagName: Identifier, typeExpression: JSDocTypeExpression, comment?: string | NodeArray<JSDocComment>): JSDocSatisfiesTag {
    return new NodeObject(SyntaxKind.JSDocSatisfiesTag, {
        tagName,
        typeExpression,
        comment,
    }) as unknown as JSDocSatisfiesTag;
}

export function createJSDocSeeTag(tagName: Identifier, name: JSDocNameReference | undefined, comment?: string | NodeArray<JSDocComment>): JSDocSeeTag {
    return new NodeObject(SyntaxKind.JSDocSeeTag, {
        tagName,
        name,
        comment,
    }) as unknown as JSDocSeeTag;
}

export function createJSDocSignature(typeParameters: readonly JSDocTemplateTag[] | undefined, parameters: readonly JSDocParameterTag[], type: JSDocReturnTag | undefined): JSDocSignature {
    return new NodeObject(SyntaxKind.JSDocSignature, {
        typeParameters,
        parameters,
        type,
    }) as unknown as JSDocSignature;
}

export function createJSDocTemplateTag(tagName: Identifier, constraint: JSDocTypeExpression | undefined, typeParameters: readonly TypeParameterDeclaration[], comment?: string | NodeArray<JSDocComment>): JSDocTemplateTag {
    return new NodeObject(SyntaxKind.JSDocTemplateTag, {
        tagName,
        constraint,
        typeParameters: createNodeArray(typeParameters),
        comment,
    }) as unknown as JSDocTemplateTag;
}

export function createJSDocText(text: string): JSDocText {
    return new NodeObject(SyntaxKind.JSDocText, {
        text,
    }) as unknown as JSDocText;
}

export function createJSDocThisTag(tagName: Identifier, typeExpression: JSDocTypeExpression, comment?: string | NodeArray<JSDocComment>): JSDocThisTag {
    return new NodeObject(SyntaxKind.JSDocThisTag, {
        tagName,
        typeExpression,
        comment,
    }) as unknown as JSDocThisTag;
}

export function createJSDocTypedefTag(tagName: Identifier, typeExpression: JSDocTypeExpression | JSDocTypeLiteral | undefined, fullName: JSDocNamespaceDeclaration | Identifier | undefined, comment?: string | NodeArray<JSDocComment>): JSDocTypedefTag {
    return new NodeObject(SyntaxKind.JSDocTypedefTag, {
        tagName,
        typeExpression,
        fullName,
        comment,
    }) as unknown as JSDocTypedefTag;
}

export function createJSDocTypeExpression(type: TypeNode): JSDocTypeExpression {
    return new NodeObject(SyntaxKind.JSDocTypeExpression, {
        type,
    }) as unknown as JSDocTypeExpression;
}

export function createJSDocTypeLiteral(jsDocPropertyTags: readonly JSDocPropertyLikeTag[] | undefined, isArrayType: boolean): JSDocTypeLiteral {
    return new NodeObject(SyntaxKind.JSDocTypeLiteral, {
        jsDocPropertyTags,
        isArrayType,
    }) as unknown as JSDocTypeLiteral;
}

export function createJSDocTypeTag(tagName: Identifier, typeExpression: JSDocTypeExpression, comment?: string | NodeArray<JSDocComment>): JSDocTypeTag {
    return new NodeObject(SyntaxKind.JSDocTypeTag, {
        tagName,
        typeExpression,
        comment,
    }) as unknown as JSDocTypeTag;
}

export function createJSDocUnknownTag(tagName: Identifier, comment?: string | NodeArray<JSDocComment>): JSDocUnknownTag {
    return new NodeObject(SyntaxKind.JSDocTag, {
        tagName,
        comment,
    }) as unknown as JSDocUnknownTag;
}

export function createJSDocVariadicType(type: TypeNode): JSDocVariadicType {
    return new NodeObject(SyntaxKind.JSDocVariadicType, {
        type,
    }) as unknown as JSDocVariadicType;
}

export function createJsxAttribute(name: JsxAttributeName, initializer: JsxAttributeValue | undefined): JsxAttribute {
    return new NodeObject(SyntaxKind.JsxAttribute, {
        name,
        initializer,
    }) as unknown as JsxAttribute;
}

export function createJsxAttributes(properties: readonly JsxAttributeLike[]): JsxAttributes {
    return new NodeObject(SyntaxKind.JsxAttributes, {
        properties: createNodeArray(properties),
    }) as unknown as JsxAttributes;
}

export function createJsxClosingElement(tagName: JsxTagNameExpression): JsxClosingElement {
    return new NodeObject(SyntaxKind.JsxClosingElement, {
        tagName,
    }) as unknown as JsxClosingElement;
}

export function createJsxClosingFragment(): JsxClosingFragment {
    return new NodeObject(SyntaxKind.JsxClosingFragment, undefined) as unknown as JsxClosingFragment;
}

export function createJsxElement(openingElement: JsxOpeningElement, children: readonly JsxChild[], closingElement: JsxClosingElement): JsxElement {
    return new NodeObject(SyntaxKind.JsxElement, {
        openingElement,
        children: createNodeArray(children),
        closingElement,
    }) as unknown as JsxElement;
}

export function createJsxExpression(dotDotDotToken: Token<SyntaxKind.DotDotDotToken> | undefined, expression: Expression | undefined): JsxExpression {
    return new NodeObject(SyntaxKind.JsxExpression, {
        dotDotDotToken,
        expression,
    }) as unknown as JsxExpression;
}

export function createJsxFragment(openingFragment: JsxOpeningFragment, children: readonly JsxChild[], closingFragment: JsxClosingFragment): JsxFragment {
    return new NodeObject(SyntaxKind.JsxFragment, {
        openingFragment,
        children: createNodeArray(children),
        closingFragment,
    }) as unknown as JsxFragment;
}

export function createJsxNamespacedName(name: Identifier, namespace: Identifier): JsxNamespacedName {
    return new NodeObject(SyntaxKind.JsxNamespacedName, {
        name,
        namespace,
    }) as unknown as JsxNamespacedName;
}

export function createJsxOpeningElement(tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes): JsxOpeningElement {
    return new NodeObject(SyntaxKind.JsxOpeningElement, {
        tagName,
        typeArguments: typeArguments ? createNodeArray(typeArguments) : undefined,
        attributes,
    }) as unknown as JsxOpeningElement;
}

export function createJsxOpeningFragment(): JsxOpeningFragment {
    return new NodeObject(SyntaxKind.JsxOpeningFragment, undefined) as unknown as JsxOpeningFragment;
}

export function createJsxSelfClosingElement(tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes): JsxSelfClosingElement {
    return new NodeObject(SyntaxKind.JsxSelfClosingElement, {
        tagName,
        typeArguments: typeArguments ? createNodeArray(typeArguments) : undefined,
        attributes,
    }) as unknown as JsxSelfClosingElement;
}

export function createJsxSpreadAttribute(expression: Expression): JsxSpreadAttribute {
    return new NodeObject(SyntaxKind.JsxSpreadAttribute, {
        expression,
    }) as unknown as JsxSpreadAttribute;
}

export function createJsxText(text: string, containsOnlyTriviaWhiteSpaces: boolean): JsxText {
    return new NodeObject(SyntaxKind.JsxText, {
        text,
        containsOnlyTriviaWhiteSpaces,
    }) as unknown as JsxText;
}

export function createLabeledStatement(label: Identifier, statement: Statement): LabeledStatement {
    return new NodeObject(SyntaxKind.LabeledStatement, {
        label,
        statement,
    }) as unknown as LabeledStatement;
}

export function createLiteralTypeNode(literal: NullLiteral | BooleanLiteral | LiteralExpression | PrefixUnaryExpression): LiteralTypeNode {
    return new NodeObject(SyntaxKind.LiteralType, {
        literal,
    }) as unknown as LiteralTypeNode;
}

export function createMappedTypeNode(readonlyToken: ReadonlyKeyword | PlusToken | MinusToken | undefined, typeParameter: TypeParameterDeclaration, nameType: TypeNode | undefined, questionToken: QuestionToken | PlusToken | MinusToken | undefined, type: TypeNode | undefined, members: readonly TypeElement[] | undefined): MappedTypeNode {
    return new NodeObject(SyntaxKind.MappedType, {
        readonlyToken,
        typeParameter,
        nameType,
        questionToken,
        type,
        members: members ? createNodeArray(members) : undefined,
    }) as unknown as MappedTypeNode;
}

export function createMetaProperty(keywordToken: SyntaxKind.NewKeyword | SyntaxKind.ImportKeyword, name: Identifier): MetaProperty {
    return new NodeObject(SyntaxKind.MetaProperty, {
        keywordToken,
        name,
    }) as unknown as MetaProperty;
}

export function createMethodDeclaration(modifiers: readonly ModifierLike[] | undefined, asteriskToken: AsteriskToken | undefined, name: PropertyName, postfixToken: QuestionToken | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: FunctionBody | undefined): MethodDeclaration {
    return new NodeObject(SyntaxKind.MethodDeclaration, {
        modifiers: modifiers ? createNodeArray(modifiers) : undefined,
        asteriskToken,
        name,
        postfixToken,
        typeParameters: typeParameters ? createNodeArray(typeParameters) : undefined,
        parameters: createNodeArray(parameters),
        type,
        body,
    }) as unknown as MethodDeclaration;
}

export function createMethodSignature(modifiers: readonly Modifier[] | undefined, name: PropertyName, postfixToken: QuestionToken | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined): MethodSignature {
    return new NodeObject(SyntaxKind.MethodSignature, {
        modifiers: modifiers ? createNodeArray(modifiers) : undefined,
        name,
        postfixToken,
        typeParameters: typeParameters ? createNodeArray(typeParameters) : undefined,
        parameters: createNodeArray(parameters),
        type,
    }) as unknown as MethodSignature;
}

export function createModuleBlock(statements: readonly Statement[]): ModuleBlock {
    return new NodeObject(SyntaxKind.ModuleBlock, {
        statements: createNodeArray(statements),
    }) as unknown as ModuleBlock;
}

export function createModuleDeclaration(modifiers: readonly ModifierLike[] | undefined, name: ModuleName, body: ModuleBody | JSDocNamespaceDeclaration | undefined): ModuleDeclaration {
    return new NodeObject(SyntaxKind.ModuleDeclaration, {
        modifiers: modifiers ? createNodeArray(modifiers) : undefined,
        name,
        body,
    }) as unknown as ModuleDeclaration;
}

export function createNamedExports(elements: readonly ExportSpecifier[]): NamedExports {
    return new NodeObject(SyntaxKind.NamedExports, {
        elements: createNodeArray(elements),
    }) as unknown as NamedExports;
}

export function createNamedImports(elements: readonly ImportSpecifier[]): NamedImports {
    return new NodeObject(SyntaxKind.NamedImports, {
        elements: createNodeArray(elements),
    }) as unknown as NamedImports;
}

export function createNamedTupleMember(dotDotDotToken: Token<SyntaxKind.DotDotDotToken> | undefined, name: Identifier, questionToken: Token<SyntaxKind.QuestionToken> | undefined, type: TypeNode): NamedTupleMember {
    return new NodeObject(SyntaxKind.NamedTupleMember, {
        dotDotDotToken,
        name,
        questionToken,
        type,
    }) as unknown as NamedTupleMember;
}

export function createNamespaceExport(name: ModuleExportName): NamespaceExport {
    return new NodeObject(SyntaxKind.NamespaceExport, {
        name,
    }) as unknown as NamespaceExport;
}

export function createNamespaceExportDeclaration(name: Identifier): NamespaceExportDeclaration {
    return new NodeObject(SyntaxKind.NamespaceExportDeclaration, {
        name,
    }) as unknown as NamespaceExportDeclaration;
}

export function createNamespaceImport(name: Identifier): NamespaceImport {
    return new NodeObject(SyntaxKind.NamespaceImport, {
        name,
    }) as unknown as NamespaceImport;
}

export function createNewExpression(expression: LeftHandSideExpression, typeArguments: readonly TypeNode[] | undefined, arguments_: readonly Expression[] | undefined): NewExpression {
    return new NodeObject(SyntaxKind.NewExpression, {
        expression,
        typeArguments: typeArguments ? createNodeArray(typeArguments) : undefined,
        arguments: arguments_ ? createNodeArray(arguments_) : undefined,
    }) as unknown as NewExpression;
}

export function createNonNullExpression(expression: Expression): NonNullExpression {
    return new NodeObject(SyntaxKind.NonNullExpression, {
        expression,
    }) as unknown as NonNullExpression;
}

export function createNoSubstitutionTemplateLiteral(text: string, rawText?: string, templateFlags?: TokenFlags): NoSubstitutionTemplateLiteral {
    return new NodeObject(SyntaxKind.NoSubstitutionTemplateLiteral, {
        text,
        rawText,
        templateFlags,
    }) as unknown as NoSubstitutionTemplateLiteral;
}

export function createNullLiteral(): NullLiteral {
    return new NodeObject(SyntaxKind.NullKeyword, undefined) as unknown as NullLiteral;
}

export function createNumericLiteral(text: string, numericLiteralFlags: TokenFlags): NumericLiteral {
    return new NodeObject(SyntaxKind.NumericLiteral, {
        text,
        numericLiteralFlags,
    }) as unknown as NumericLiteral;
}

export function createObjectBindingPattern(elements: readonly BindingElement[]): ObjectBindingPattern {
    return new NodeObject(SyntaxKind.ObjectBindingPattern, {
        elements: createNodeArray(elements),
    }) as unknown as ObjectBindingPattern;
}

export function createObjectLiteralExpression(properties: readonly ObjectLiteralElementLike[], multiLine?: boolean): ObjectLiteralExpression {
    return new NodeObject(SyntaxKind.ObjectLiteralExpression, {
        properties: createNodeArray(properties),
        multiLine,
    }) as unknown as ObjectLiteralExpression;
}

export function createOmittedExpression(): OmittedExpression {
    return new NodeObject(SyntaxKind.OmittedExpression, undefined) as unknown as OmittedExpression;
}

export function createOptionalTypeNode(type: TypeNode): OptionalTypeNode {
    return new NodeObject(SyntaxKind.OptionalType, {
        type,
    }) as unknown as OptionalTypeNode;
}

export function createParameterDeclaration(modifiers: readonly ModifierLike[] | undefined, dotDotDotToken: DotDotDotToken | undefined, name: BindingName, questionToken: QuestionToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): ParameterDeclaration {
    return new NodeObject(SyntaxKind.Parameter, {
        modifiers: modifiers ? createNodeArray(modifiers) : undefined,
        dotDotDotToken,
        name,
        questionToken,
        type,
        initializer,
    }) as unknown as ParameterDeclaration;
}

export function createParenthesizedExpression(expression: Expression): ParenthesizedExpression {
    return new NodeObject(SyntaxKind.ParenthesizedExpression, {
        expression,
    }) as unknown as ParenthesizedExpression;
}

export function createParenthesizedTypeNode(type: TypeNode): ParenthesizedTypeNode {
    return new NodeObject(SyntaxKind.ParenthesizedType, {
        type,
    }) as unknown as ParenthesizedTypeNode;
}

export function createPartiallyEmittedExpression(expression: Expression): PartiallyEmittedExpression {
    return new NodeObject(SyntaxKind.PartiallyEmittedExpression, {
        expression,
    }) as unknown as PartiallyEmittedExpression;
}

export function createPostfixUnaryExpression(operand: LeftHandSideExpression, operator: PostfixUnaryOperator): PostfixUnaryExpression {
    return new NodeObject(SyntaxKind.PostfixUnaryExpression, {
        operand,
        operator,
    }) as unknown as PostfixUnaryExpression;
}

export function createPrefixUnaryExpression(operator: PrefixUnaryOperator, operand: UnaryExpression): PrefixUnaryExpression {
    return new NodeObject(SyntaxKind.PrefixUnaryExpression, {
        operator,
        operand,
    }) as unknown as PrefixUnaryExpression;
}

export function createPrivateIdentifier(escapedText: string): PrivateIdentifier {
    return new NodeObject(SyntaxKind.PrivateIdentifier, {
        escapedText,
    }) as unknown as PrivateIdentifier;
}

export function createPropertyAccessExpression(expression: LeftHandSideExpression, questionDotToken: QuestionDotToken | undefined, name: MemberName): PropertyAccessExpression {
    return new NodeObject(SyntaxKind.PropertyAccessExpression, {
        expression,
        questionDotToken,
        name,
    }) as unknown as PropertyAccessExpression;
}

export function createPropertyAssignment(name: PropertyName, postfixToken: QuestionToken | undefined, initializer: Expression): PropertyAssignment {
    return new NodeObject(SyntaxKind.PropertyAssignment, {
        name,
        postfixToken,
        initializer,
    }) as unknown as PropertyAssignment;
}

export function createPropertyDeclaration(modifiers: readonly ModifierLike[] | undefined, name: PropertyName, postfixToken: QuestionToken | ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): PropertyDeclaration {
    return new NodeObject(SyntaxKind.PropertyDeclaration, {
        modifiers: modifiers ? createNodeArray(modifiers) : undefined,
        name,
        postfixToken,
        type,
        initializer,
    }) as unknown as PropertyDeclaration;
}

export function createPropertySignature(modifiers: readonly Modifier[] | undefined, name: PropertyName, postfixToken: QuestionToken | undefined, type: TypeNode | undefined): PropertySignature {
    return new NodeObject(SyntaxKind.PropertySignature, {
        modifiers: modifiers ? createNodeArray(modifiers) : undefined,
        name,
        postfixToken,
        type,
    }) as unknown as PropertySignature;
}

export function createQualifiedName(left: EntityName, right: Identifier): QualifiedName {
    return new NodeObject(SyntaxKind.QualifiedName, {
        left,
        right,
    }) as unknown as QualifiedName;
}

export function createRegularExpressionLiteral(text: string): RegularExpressionLiteral {
    return new NodeObject(SyntaxKind.RegularExpressionLiteral, {
        text,
    }) as unknown as RegularExpressionLiteral;
}

export function createRestTypeNode(type: TypeNode): RestTypeNode {
    return new NodeObject(SyntaxKind.RestType, {
        type,
    }) as unknown as RestTypeNode;
}

export function createReturnStatement(expression: Expression | undefined): ReturnStatement {
    return new NodeObject(SyntaxKind.ReturnStatement, {
        expression,
    }) as unknown as ReturnStatement;
}

export function createSatisfiesExpression(expression: Expression, type: TypeNode): SatisfiesExpression {
    return new NodeObject(SyntaxKind.SatisfiesExpression, {
        expression,
        type,
    }) as unknown as SatisfiesExpression;
}

export function createSemicolonClassElement(): SemicolonClassElement {
    return new NodeObject(SyntaxKind.SemicolonClassElement, undefined) as unknown as SemicolonClassElement;
}

export function createSetAccessorDeclaration(modifiers: readonly ModifierLike[] | undefined, name: PropertyName, parameters: readonly ParameterDeclaration[], body: FunctionBody | undefined): SetAccessorDeclaration {
    return new NodeObject(SyntaxKind.SetAccessor, {
        modifiers: modifiers ? createNodeArray(modifiers) : undefined,
        name,
        parameters: createNodeArray(parameters),
        body,
    }) as unknown as SetAccessorDeclaration;
}

export function createShorthandPropertyAssignment(name: Identifier, postfixToken: QuestionToken | undefined, equalsToken: EqualsToken | undefined, objectAssignmentInitializer: Expression | undefined): ShorthandPropertyAssignment {
    return new NodeObject(SyntaxKind.ShorthandPropertyAssignment, {
        name,
        postfixToken,
        equalsToken,
        objectAssignmentInitializer,
    }) as unknown as ShorthandPropertyAssignment;
}

export function createSourceFile(statements: readonly Statement[], endOfFileToken: EndOfFile, text: string, fileName: string, path: Path): SourceFile {
    return new NodeObject(SyntaxKind.SourceFile, {
        statements: createNodeArray(statements),
        endOfFileToken,
        text,
        fileName,
        path,
    }) as unknown as SourceFile;
}

export function createSpreadAssignment(expression: Expression): SpreadAssignment {
    return new NodeObject(SyntaxKind.SpreadAssignment, {
        expression,
    }) as unknown as SpreadAssignment;
}

export function createSpreadElement(expression: Expression): SpreadElement {
    return new NodeObject(SyntaxKind.SpreadElement, {
        expression,
    }) as unknown as SpreadElement;
}

export function createStringLiteral(text: string): StringLiteral {
    return new NodeObject(SyntaxKind.StringLiteral, {
        text,
    }) as unknown as StringLiteral;
}

export function createSuperExpression(): SuperExpression {
    return new NodeObject(SyntaxKind.SuperKeyword, undefined) as unknown as SuperExpression;
}

export function createSwitchStatement(expression: Expression, caseBlock: CaseBlock, possiblyExhaustive?: boolean): SwitchStatement {
    return new NodeObject(SyntaxKind.SwitchStatement, {
        expression,
        caseBlock,
        possiblyExhaustive,
    }) as unknown as SwitchStatement;
}

export function createTaggedTemplateExpression(tag: LeftHandSideExpression, typeArguments: readonly TypeNode[] | undefined, template: TemplateLiteral): TaggedTemplateExpression {
    return new NodeObject(SyntaxKind.TaggedTemplateExpression, {
        tag,
        typeArguments: typeArguments ? createNodeArray(typeArguments) : undefined,
        template,
    }) as unknown as TaggedTemplateExpression;
}

export function createTemplateExpression(head: TemplateHead, templateSpans: readonly TemplateSpan[]): TemplateExpression {
    return new NodeObject(SyntaxKind.TemplateExpression, {
        head,
        templateSpans: createNodeArray(templateSpans),
    }) as unknown as TemplateExpression;
}

export function createTemplateHead(text: string, rawText: string | undefined, templateFlags: TokenFlags): TemplateHead {
    return new NodeObject(SyntaxKind.TemplateHead, {
        text,
        rawText,
        templateFlags,
    }) as unknown as TemplateHead;
}

export function createTemplateLiteralTypeNode(head: TemplateHead, templateSpans: readonly TemplateLiteralTypeSpan[]): TemplateLiteralTypeNode {
    return new NodeObject(SyntaxKind.TemplateLiteralType, {
        head,
        templateSpans: createNodeArray(templateSpans),
    }) as unknown as TemplateLiteralTypeNode;
}

export function createTemplateLiteralTypeSpan(type: TypeNode, literal: TemplateMiddle | TemplateTail): TemplateLiteralTypeSpan {
    return new NodeObject(SyntaxKind.TemplateLiteralTypeSpan, {
        type,
        literal,
    }) as unknown as TemplateLiteralTypeSpan;
}

export function createTemplateMiddle(text: string, rawText: string | undefined, templateFlags: TokenFlags): TemplateMiddle {
    return new NodeObject(SyntaxKind.TemplateMiddle, {
        text,
        rawText,
        templateFlags,
    }) as unknown as TemplateMiddle;
}

export function createTemplateSpan(expression: Expression, literal: TemplateMiddle | TemplateTail): TemplateSpan {
    return new NodeObject(SyntaxKind.TemplateSpan, {
        expression,
        literal,
    }) as unknown as TemplateSpan;
}

export function createTemplateTail(text: string, rawText: string | undefined, templateFlags: TokenFlags): TemplateTail {
    return new NodeObject(SyntaxKind.TemplateTail, {
        text,
        rawText,
        templateFlags,
    }) as unknown as TemplateTail;
}

export function createThisExpression(): ThisExpression {
    return new NodeObject(SyntaxKind.ThisKeyword, undefined) as unknown as ThisExpression;
}

export function createThisTypeNode(): ThisTypeNode {
    return new NodeObject(SyntaxKind.ThisType, undefined) as unknown as ThisTypeNode;
}

export function createThrowStatement(expression: Expression): ThrowStatement {
    return new NodeObject(SyntaxKind.ThrowStatement, {
        expression,
    }) as unknown as ThrowStatement;
}

export function createTrueLiteral(): TrueLiteral {
    return new NodeObject(SyntaxKind.TrueKeyword, undefined) as unknown as TrueLiteral;
}

export function createTryStatement(tryBlock: Block, catchClause: CatchClause | undefined, finallyBlock: Block | undefined): TryStatement {
    return new NodeObject(SyntaxKind.TryStatement, {
        tryBlock,
        catchClause,
        finallyBlock,
    }) as unknown as TryStatement;
}

export function createTupleTypeNode(elements: readonly (TypeNode | NamedTupleMember)[]): TupleTypeNode {
    return new NodeObject(SyntaxKind.TupleType, {
        elements: createNodeArray(elements),
    }) as unknown as TupleTypeNode;
}

export function createTypeAliasDeclaration(modifiers: readonly ModifierLike[] | undefined, name: Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, type: TypeNode): TypeAliasDeclaration {
    return new NodeObject(SyntaxKind.TypeAliasDeclaration, {
        modifiers: modifiers ? createNodeArray(modifiers) : undefined,
        name,
        typeParameters: typeParameters ? createNodeArray(typeParameters) : undefined,
        type,
    }) as unknown as TypeAliasDeclaration;
}

export function createTypeAssertion(type: TypeNode, expression: UnaryExpression): TypeAssertion {
    return new NodeObject(SyntaxKind.TypeAssertionExpression, {
        type,
        expression,
    }) as unknown as TypeAssertion;
}

export function createTypeLiteralNode(members: readonly TypeElement[]): TypeLiteralNode {
    return new NodeObject(SyntaxKind.TypeLiteral, {
        members: createNodeArray(members),
    }) as unknown as TypeLiteralNode;
}

export function createTypeOfExpression(expression: UnaryExpression): TypeOfExpression {
    return new NodeObject(SyntaxKind.TypeOfExpression, {
        expression,
    }) as unknown as TypeOfExpression;
}

export function createTypeOperatorNode(operator: SyntaxKind.KeyOfKeyword | SyntaxKind.UniqueKeyword | SyntaxKind.ReadonlyKeyword, type: TypeNode): TypeOperatorNode {
    return new NodeObject(SyntaxKind.TypeOperator, {
        operator,
        type,
    }) as unknown as TypeOperatorNode;
}

export function createTypeParameterDeclaration(modifiers: readonly Modifier[] | undefined, name: Identifier, constraint: TypeNode | undefined, default_: TypeNode | undefined): TypeParameterDeclaration {
    return new NodeObject(SyntaxKind.TypeParameter, {
        modifiers: modifiers ? createNodeArray(modifiers) : undefined,
        name,
        constraint,
        default: default_,
    }) as unknown as TypeParameterDeclaration;
}

export function createTypePredicateNode(assertsModifier: AssertsKeyword | undefined, parameterName: Identifier | ThisTypeNode, type: TypeNode | undefined): TypePredicateNode {
    return new NodeObject(SyntaxKind.TypePredicate, {
        assertsModifier,
        parameterName,
        type,
    }) as unknown as TypePredicateNode;
}

export function createTypeQueryNode(exprName: EntityName, typeArguments: readonly TypeNode[] | undefined): TypeQueryNode {
    return new NodeObject(SyntaxKind.TypeQuery, {
        exprName,
        typeArguments: typeArguments ? createNodeArray(typeArguments) : undefined,
    }) as unknown as TypeQueryNode;
}

export function createTypeReferenceNode(typeName: EntityName, typeArguments: readonly TypeNode[] | undefined): TypeReferenceNode {
    return new NodeObject(SyntaxKind.TypeReference, {
        typeName,
        typeArguments: typeArguments ? createNodeArray(typeArguments) : undefined,
    }) as unknown as TypeReferenceNode;
}

export function createUnionTypeNode(types: readonly TypeNode[]): UnionTypeNode {
    return new NodeObject(SyntaxKind.UnionType, {
        types: createNodeArray(types),
    }) as unknown as UnionTypeNode;
}

export function createVariableDeclaration(name: BindingName, exclamationToken: ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): VariableDeclaration {
    return new NodeObject(SyntaxKind.VariableDeclaration, {
        name,
        exclamationToken,
        type,
        initializer,
    }) as unknown as VariableDeclaration;
}

export function createVariableDeclarationList(declarations: readonly VariableDeclaration[]): VariableDeclarationList {
    return new NodeObject(SyntaxKind.VariableDeclarationList, {
        declarations: createNodeArray(declarations),
    }) as unknown as VariableDeclarationList;
}

export function createVariableStatement(modifiers: readonly ModifierLike[] | undefined, declarationList: VariableDeclarationList): VariableStatement {
    return new NodeObject(SyntaxKind.VariableStatement, {
        modifiers: modifiers ? createNodeArray(modifiers) : undefined,
        declarationList,
    }) as unknown as VariableStatement;
}

export function createVoidExpression(expression: UnaryExpression): VoidExpression {
    return new NodeObject(SyntaxKind.VoidExpression, {
        expression,
    }) as unknown as VoidExpression;
}

export function createWhileStatement(expression: Expression, statement: Statement): WhileStatement {
    return new NodeObject(SyntaxKind.WhileStatement, {
        expression,
        statement,
    }) as unknown as WhileStatement;
}

export function createWithStatement(expression: Expression, statement: Statement): WithStatement {
    return new NodeObject(SyntaxKind.WithStatement, {
        expression,
        statement,
    }) as unknown as WithStatement;
}

export function createYieldExpression(asteriskToken: AsteriskToken | undefined, expression: Expression | undefined): YieldExpression {
    return new NodeObject(SyntaxKind.YieldExpression, {
        asteriskToken,
        expression,
    }) as unknown as YieldExpression;
}

export function updateArrayBindingPattern(node: ArrayBindingPattern, elements: readonly ArrayBindingElement[]): ArrayBindingPattern {
    if (node.elements === elements) return node;
    return createArrayBindingPattern(elements);
}

export function updateArrayLiteralExpression(node: ArrayLiteralExpression, elements: readonly Expression[]): ArrayLiteralExpression {
    if (node.elements === elements) return node;
    return createArrayLiteralExpression(elements, node.multiLine);
}

export function updateArrayTypeNode(node: ArrayTypeNode, elementType: TypeNode): ArrayTypeNode {
    if (node.elementType === elementType) return node;
    return createArrayTypeNode(elementType);
}

export function updateArrowFunction(node: ArrowFunction, modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, equalsGreaterThanToken: EqualsGreaterThanToken, body: ConciseBody): ArrowFunction {
    if (node.modifiers === modifiers && node.typeParameters === typeParameters && node.parameters === parameters && node.type === type && node.equalsGreaterThanToken === equalsGreaterThanToken && node.body === body) return node;
    return createArrowFunction(modifiers, typeParameters, parameters, type, equalsGreaterThanToken, body);
}

export function updateAsExpression(node: AsExpression, expression: Expression, type: TypeNode): AsExpression {
    if (node.expression === expression && node.type === type) return node;
    return createAsExpression(expression, type);
}

export function updateAwaitExpression(node: AwaitExpression, expression: UnaryExpression): AwaitExpression {
    if (node.expression === expression) return node;
    return createAwaitExpression(expression);
}

export function updateBinaryExpression(node: BinaryExpression, left: Expression, operatorToken: BinaryOperatorToken, right: Expression): BinaryExpression {
    if (node.left === left && node.operatorToken === operatorToken && node.right === right) return node;
    return createBinaryExpression(left, operatorToken, right);
}

export function updateBindingElement(node: BindingElement, dotDotDotToken: DotDotDotToken | undefined, propertyName: PropertyName | undefined, name: BindingName, initializer: Expression | undefined): BindingElement {
    if (node.dotDotDotToken === dotDotDotToken && node.propertyName === propertyName && node.name === name && node.initializer === initializer) return node;
    return createBindingElement(dotDotDotToken, propertyName, name, initializer);
}

export function updateBlock(node: Block, statements: readonly Statement[]): Block {
    if (node.statements === statements) return node;
    return createBlock(statements, node.multiLine);
}

export function updateBreakStatement(node: BreakStatement, label: Identifier | undefined): BreakStatement {
    if (node.label === label) return node;
    return createBreakStatement(label);
}

export function updateCallExpression(node: CallExpression, expression: LeftHandSideExpression, questionDotToken: QuestionDotToken | undefined, typeArguments: readonly TypeNode[] | undefined, arguments_: readonly Expression[]): CallExpression {
    if (node.expression === expression && node.questionDotToken === questionDotToken && node.typeArguments === typeArguments && node.arguments === arguments_) return node;
    return createCallExpression(expression, questionDotToken, typeArguments, arguments_);
}

export function updateCallSignatureDeclaration(node: CallSignatureDeclaration, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined): CallSignatureDeclaration {
    if (node.typeParameters === typeParameters && node.parameters === parameters && node.type === type) return node;
    return createCallSignatureDeclaration(typeParameters, parameters, type);
}

export function updateCaseBlock(node: CaseBlock, clauses: readonly CaseOrDefaultClause[]): CaseBlock {
    if (node.clauses === clauses) return node;
    return createCaseBlock(clauses);
}

export function updateCaseClause(node: CaseClause, expression: Expression, statements: readonly Statement[]): CaseClause {
    if (node.expression === expression && node.statements === statements) return node;
    return createCaseClause(expression, statements);
}

export function updateCatchClause(node: CatchClause, variableDeclaration: VariableDeclaration | undefined, block: Block): CatchClause {
    if (node.variableDeclaration === variableDeclaration && node.block === block) return node;
    return createCatchClause(variableDeclaration, block);
}

export function updateClassDeclaration(node: ClassDeclaration, modifiers: readonly ModifierLike[] | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassDeclaration {
    if (node.modifiers === modifiers && node.name === name && node.typeParameters === typeParameters && node.heritageClauses === heritageClauses && node.members === members) return node;
    return createClassDeclaration(modifiers, name, typeParameters, heritageClauses, members);
}

export function updateClassExpression(node: ClassExpression, modifiers: readonly ModifierLike[] | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassExpression {
    if (node.modifiers === modifiers && node.name === name && node.typeParameters === typeParameters && node.heritageClauses === heritageClauses && node.members === members) return node;
    return createClassExpression(modifiers, name, typeParameters, heritageClauses, members);
}

export function updateClassStaticBlockDeclaration(node: ClassStaticBlockDeclaration, body: Block): ClassStaticBlockDeclaration {
    if (node.body === body) return node;
    return createClassStaticBlockDeclaration(body);
}

export function updateCommaListExpression(node: CommaListExpression, elements: readonly Expression[]): CommaListExpression {
    if (node.elements === elements) return node;
    return createCommaListExpression(elements);
}

export function updateComputedPropertyName(node: ComputedPropertyName, expression: Expression): ComputedPropertyName {
    if (node.expression === expression) return node;
    return createComputedPropertyName(expression);
}

export function updateConditionalExpression(node: ConditionalExpression, condition: Expression, questionToken: QuestionToken, whenTrue: Expression, colonToken: ColonToken, whenFalse: Expression): ConditionalExpression {
    if (node.condition === condition && node.questionToken === questionToken && node.whenTrue === whenTrue && node.colonToken === colonToken && node.whenFalse === whenFalse) return node;
    return createConditionalExpression(condition, questionToken, whenTrue, colonToken, whenFalse);
}

export function updateConditionalTypeNode(node: ConditionalTypeNode, checkType: TypeNode, extendsType: TypeNode, trueType: TypeNode, falseType: TypeNode): ConditionalTypeNode {
    if (node.checkType === checkType && node.extendsType === extendsType && node.trueType === trueType && node.falseType === falseType) return node;
    return createConditionalTypeNode(checkType, extendsType, trueType, falseType);
}

export function updateConstructorDeclaration(node: ConstructorDeclaration, modifiers: readonly ModifierLike[] | undefined, parameters: readonly ParameterDeclaration[], body: FunctionBody | undefined): ConstructorDeclaration {
    if (node.modifiers === modifiers && node.parameters === parameters && node.body === body) return node;
    return createConstructorDeclaration(modifiers, parameters, body);
}

export function updateConstructorTypeNode(node: ConstructorTypeNode, modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): ConstructorTypeNode {
    if (node.modifiers === modifiers && node.typeParameters === typeParameters && node.parameters === parameters && node.type === type) return node;
    return createConstructorTypeNode(modifiers, typeParameters, parameters, type);
}

export function updateConstructSignatureDeclaration(node: ConstructSignatureDeclaration, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined): ConstructSignatureDeclaration {
    if (node.typeParameters === typeParameters && node.parameters === parameters && node.type === type) return node;
    return createConstructSignatureDeclaration(typeParameters, parameters, type);
}

export function updateContinueStatement(node: ContinueStatement, label: Identifier | undefined): ContinueStatement {
    if (node.label === label) return node;
    return createContinueStatement(label);
}

export function updateDecorator(node: Decorator, expression: LeftHandSideExpression): Decorator {
    if (node.expression === expression) return node;
    return createDecorator(expression);
}

export function updateDefaultClause(node: DefaultClause, statements: readonly Statement[]): DefaultClause {
    if (node.statements === statements) return node;
    return createDefaultClause(statements);
}

export function updateDeleteExpression(node: DeleteExpression, expression: UnaryExpression): DeleteExpression {
    if (node.expression === expression) return node;
    return createDeleteExpression(expression);
}

export function updateDoStatement(node: DoStatement, statement: Statement, expression: Expression): DoStatement {
    if (node.statement === statement && node.expression === expression) return node;
    return createDoStatement(statement, expression);
}

export function updateElementAccessExpression(node: ElementAccessExpression, expression: LeftHandSideExpression, questionDotToken: QuestionDotToken | undefined, argumentExpression: Expression): ElementAccessExpression {
    if (node.expression === expression && node.questionDotToken === questionDotToken && node.argumentExpression === argumentExpression) return node;
    return createElementAccessExpression(expression, questionDotToken, argumentExpression);
}

export function updateEnumDeclaration(node: EnumDeclaration, modifiers: readonly ModifierLike[] | undefined, name: Identifier, members: readonly EnumMember[]): EnumDeclaration {
    if (node.modifiers === modifiers && node.name === name && node.members === members) return node;
    return createEnumDeclaration(modifiers, name, members);
}

export function updateEnumMember(node: EnumMember, name: PropertyName, initializer: Expression | undefined): EnumMember {
    if (node.name === name && node.initializer === initializer) return node;
    return createEnumMember(name, initializer);
}

export function updateExportAssignment(node: ExportAssignment, modifiers: readonly ModifierLike[] | undefined, expression: Expression): ExportAssignment {
    if (node.modifiers === modifiers && node.expression === expression) return node;
    return createExportAssignment(modifiers, expression, node.isExportEquals);
}

export function updateExportDeclaration(node: ExportDeclaration, modifiers: readonly ModifierLike[] | undefined, exportClause: NamedExportBindings | undefined, moduleSpecifier: Expression | undefined, attributes: ImportAttributes | undefined): ExportDeclaration {
    if (node.modifiers === modifiers && node.exportClause === exportClause && node.moduleSpecifier === moduleSpecifier && node.attributes === attributes) return node;
    return createExportDeclaration(modifiers, exportClause, moduleSpecifier, attributes, node.isTypeOnly);
}

export function updateExportSpecifier(node: ExportSpecifier, propertyName: ModuleExportName | undefined, name: ModuleExportName): ExportSpecifier {
    if (node.propertyName === propertyName && node.name === name) return node;
    return createExportSpecifier(propertyName, name, node.isTypeOnly);
}

export function updateExpressionStatement(node: ExpressionStatement, expression: Expression): ExpressionStatement {
    if (node.expression === expression) return node;
    return createExpressionStatement(expression);
}

export function updateExpressionWithTypeArguments(node: ExpressionWithTypeArguments, expression: LeftHandSideExpression, typeArguments: readonly TypeNode[] | undefined): ExpressionWithTypeArguments {
    if (node.expression === expression && node.typeArguments === typeArguments) return node;
    return createExpressionWithTypeArguments(expression, typeArguments);
}

export function updateExternalModuleReference(node: ExternalModuleReference, expression: Expression): ExternalModuleReference {
    if (node.expression === expression) return node;
    return createExternalModuleReference(expression);
}

export function updateForInStatement(node: ForInStatement, initializer: ForInitializer, expression: Expression, statement: Statement): ForInStatement {
    if (node.initializer === initializer && node.expression === expression && node.statement === statement) return node;
    return createForInStatement(initializer, expression, statement);
}

export function updateForOfStatement(node: ForOfStatement, awaitModifier: AwaitKeyword | undefined, initializer: ForInitializer, expression: Expression, statement: Statement): ForOfStatement {
    if (node.awaitModifier === awaitModifier && node.initializer === initializer && node.expression === expression && node.statement === statement) return node;
    return createForOfStatement(awaitModifier, initializer, expression, statement);
}

export function updateForStatement(node: ForStatement, initializer: ForInitializer | undefined, condition: Expression | undefined, incrementor: Expression | undefined, statement: Statement): ForStatement {
    if (node.initializer === initializer && node.condition === condition && node.incrementor === incrementor && node.statement === statement) return node;
    return createForStatement(initializer, condition, incrementor, statement);
}

export function updateFunctionDeclaration(node: FunctionDeclaration, modifiers: readonly ModifierLike[] | undefined, asteriskToken: AsteriskToken | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: FunctionBody | undefined): FunctionDeclaration {
    if (node.modifiers === modifiers && node.asteriskToken === asteriskToken && node.name === name && node.typeParameters === typeParameters && node.parameters === parameters && node.type === type && node.body === body) return node;
    return createFunctionDeclaration(modifiers, asteriskToken, name, typeParameters, parameters, type, body);
}

export function updateFunctionExpression(node: FunctionExpression, modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: FunctionBody): FunctionExpression {
    if (node.modifiers === modifiers && node.asteriskToken === asteriskToken && node.name === name && node.typeParameters === typeParameters && node.parameters === parameters && node.type === type && node.body === body) return node;
    return createFunctionExpression(modifiers, asteriskToken, name, typeParameters, parameters, type, body);
}

export function updateFunctionTypeNode(node: FunctionTypeNode, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): FunctionTypeNode {
    if (node.typeParameters === typeParameters && node.parameters === parameters && node.type === type) return node;
    return createFunctionTypeNode(typeParameters, parameters, type);
}

export function updateGetAccessorDeclaration(node: GetAccessorDeclaration, modifiers: readonly ModifierLike[] | undefined, name: PropertyName, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: FunctionBody | undefined): GetAccessorDeclaration {
    if (node.modifiers === modifiers && node.name === name && node.parameters === parameters && node.type === type && node.body === body) return node;
    return createGetAccessorDeclaration(modifiers, name, parameters, type, body);
}

export function updateHeritageClause(node: HeritageClause, types: readonly ExpressionWithTypeArguments[]): HeritageClause {
    if (node.types === types) return node;
    return createHeritageClause(node.token, types);
}

export function updateIfStatement(node: IfStatement, expression: Expression, thenStatement: Statement, elseStatement: Statement | undefined): IfStatement {
    if (node.expression === expression && node.thenStatement === thenStatement && node.elseStatement === elseStatement) return node;
    return createIfStatement(expression, thenStatement, elseStatement);
}

export function updateImportAttribute(node: ImportAttribute, name: ImportAttributeName, value: Expression): ImportAttribute {
    if (node.name === name && node.value === value) return node;
    return createImportAttribute(name, value);
}

export function updateImportAttributes(node: ImportAttributes, elements: readonly ImportAttribute[]): ImportAttributes {
    if (node.elements === elements) return node;
    return createImportAttributes(node.token, elements, node.multiLine);
}

export function updateImportClause(node: ImportClause, name: Identifier | undefined, namedBindings: NamedImportBindings | undefined): ImportClause {
    if (node.name === name && node.namedBindings === namedBindings) return node;
    return createImportClause(name, namedBindings, node.phaseModifier);
}

export function updateImportDeclaration(node: ImportDeclaration, modifiers: readonly ModifierLike[] | undefined, importClause: ImportClause | undefined, moduleSpecifier: Expression, attributes: ImportAttributes | undefined): ImportDeclaration {
    if (node.modifiers === modifiers && node.importClause === importClause && node.moduleSpecifier === moduleSpecifier && node.attributes === attributes) return node;
    return createImportDeclaration(modifiers, importClause, moduleSpecifier, attributes);
}

export function updateImportEqualsDeclaration(node: ImportEqualsDeclaration, modifiers: readonly ModifierLike[] | undefined, name: Identifier, moduleReference: ModuleReference): ImportEqualsDeclaration {
    if (node.modifiers === modifiers && node.name === name && node.moduleReference === moduleReference) return node;
    return createImportEqualsDeclaration(modifiers, name, moduleReference, node.isTypeOnly);
}

export function updateImportSpecifier(node: ImportSpecifier, propertyName: ModuleExportName | undefined, name: Identifier): ImportSpecifier {
    if (node.propertyName === propertyName && node.name === name) return node;
    return createImportSpecifier(propertyName, name, node.isTypeOnly);
}

export function updateImportTypeNode(node: ImportTypeNode, argument: TypeNode, attributes: ImportAttributes | undefined, qualifier: EntityName | undefined, typeArguments: readonly TypeNode[] | undefined): ImportTypeNode {
    if (node.argument === argument && node.attributes === attributes && node.qualifier === qualifier && node.typeArguments === typeArguments) return node;
    return createImportTypeNode(argument, attributes, qualifier, typeArguments, node.isTypeOf);
}

export function updateIndexedAccessTypeNode(node: IndexedAccessTypeNode, objectType: TypeNode, indexType: TypeNode): IndexedAccessTypeNode {
    if (node.objectType === objectType && node.indexType === indexType) return node;
    return createIndexedAccessTypeNode(objectType, indexType);
}

export function updateIndexSignatureDeclaration(node: IndexSignatureDeclaration, modifiers: readonly ModifierLike[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): IndexSignatureDeclaration {
    if (node.modifiers === modifiers && node.parameters === parameters && node.type === type) return node;
    return createIndexSignatureDeclaration(modifiers, parameters, type);
}

export function updateInferTypeNode(node: InferTypeNode, typeParameter: TypeParameterDeclaration): InferTypeNode {
    if (node.typeParameter === typeParameter) return node;
    return createInferTypeNode(typeParameter);
}

export function updateInterfaceDeclaration(node: InterfaceDeclaration, modifiers: readonly ModifierLike[] | undefined, name: Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly TypeElement[]): InterfaceDeclaration {
    if (node.modifiers === modifiers && node.name === name && node.typeParameters === typeParameters && node.heritageClauses === heritageClauses && node.members === members) return node;
    return createInterfaceDeclaration(modifiers, name, typeParameters, heritageClauses, members);
}

export function updateIntersectionTypeNode(node: IntersectionTypeNode, types: readonly TypeNode[]): IntersectionTypeNode {
    if (node.types === types) return node;
    return createIntersectionTypeNode(types);
}

export function updateJSDoc(node: JSDoc, tags: readonly JSDocTag[] | undefined): JSDoc {
    if (node.tags === tags) return node;
    return createJSDoc(node.comment, tags);
}

export function updateJSDocAugmentsTag(node: JSDocAugmentsTag, tagName: Identifier, class_: ExpressionWithTypeArguments & { readonly expression: Identifier | PropertyAccessEntityNameExpression; }): JSDocAugmentsTag {
    if (node.tagName === tagName && node.class === class_) return node;
    return createJSDocAugmentsTag(tagName, class_, node.comment);
}

export function updateJSDocCallbackTag(node: JSDocCallbackTag, tagName: Identifier, typeExpression: JSDocSignature, fullName: JSDocNamespaceDeclaration | Identifier | undefined): JSDocCallbackTag {
    if (node.tagName === tagName && node.typeExpression === typeExpression && node.fullName === fullName) return node;
    return createJSDocCallbackTag(tagName, typeExpression, fullName, node.comment);
}

export function updateJSDocDeprecatedTag(node: JSDocDeprecatedTag, tagName: Identifier): JSDocDeprecatedTag {
    if (node.tagName === tagName) return node;
    return createJSDocDeprecatedTag(tagName, node.comment);
}

export function updateJSDocImplementsTag(node: JSDocImplementsTag, tagName: Identifier, class_: ExpressionWithTypeArguments & { readonly expression: Identifier | PropertyAccessEntityNameExpression; }): JSDocImplementsTag {
    if (node.tagName === tagName && node.class === class_) return node;
    return createJSDocImplementsTag(tagName, class_, node.comment);
}

export function updateJSDocImportTag(node: JSDocImportTag, tagName: Identifier, importClause: ImportClause | undefined, moduleSpecifier: Expression, attributes: ImportAttributes | undefined): JSDocImportTag {
    if (node.tagName === tagName && node.importClause === importClause && node.moduleSpecifier === moduleSpecifier && node.attributes === attributes) return node;
    return createJSDocImportTag(tagName, importClause, moduleSpecifier, attributes, node.comment);
}

export function updateJSDocLink(node: JSDocLink, name: EntityName | JSDocMemberName | undefined): JSDocLink {
    if (node.name === name) return node;
    return createJSDocLink(name, node.text);
}

export function updateJSDocLinkCode(node: JSDocLinkCode, name: EntityName | JSDocMemberName | undefined): JSDocLinkCode {
    if (node.name === name) return node;
    return createJSDocLinkCode(name, node.text);
}

export function updateJSDocLinkPlain(node: JSDocLinkPlain, name: EntityName | JSDocMemberName | undefined): JSDocLinkPlain {
    if (node.name === name) return node;
    return createJSDocLinkPlain(name, node.text);
}

export function updateJSDocMemberName(node: JSDocMemberName, left: EntityName | JSDocMemberName, right: Identifier): JSDocMemberName {
    if (node.left === left && node.right === right) return node;
    return createJSDocMemberName(left, right);
}

export function updateJSDocNameReference(node: JSDocNameReference, name: EntityName | JSDocMemberName): JSDocNameReference {
    if (node.name === name) return node;
    return createJSDocNameReference(name);
}

export function updateJSDocNonNullableType(node: JSDocNonNullableType, type: TypeNode): JSDocNonNullableType {
    if (node.type === type) return node;
    return createJSDocNonNullableType(type, node.postfix);
}

export function updateJSDocNullableType(node: JSDocNullableType, type: TypeNode): JSDocNullableType {
    if (node.type === type) return node;
    return createJSDocNullableType(type, node.postfix);
}

export function updateJSDocOptionalType(node: JSDocOptionalType, type: TypeNode): JSDocOptionalType {
    if (node.type === type) return node;
    return createJSDocOptionalType(type);
}

export function updateJSDocOverloadTag(node: JSDocOverloadTag, tagName: Identifier, typeExpression: JSDocSignature): JSDocOverloadTag {
    if (node.tagName === tagName && node.typeExpression === typeExpression) return node;
    return createJSDocOverloadTag(tagName, typeExpression, node.comment);
}

export function updateJSDocOverrideTag(node: JSDocOverrideTag, tagName: Identifier): JSDocOverrideTag {
    if (node.tagName === tagName) return node;
    return createJSDocOverrideTag(tagName, node.comment);
}

export function updateJSDocParameterTag(node: JSDocParameterTag, tagName: Identifier): JSDocParameterTag {
    if (node.tagName === tagName) return node;
    return createJSDocParameterTag(tagName, node.comment, node.isNameFirst, node.isBracketed);
}

export function updateJSDocPrivateTag(node: JSDocPrivateTag, tagName: Identifier): JSDocPrivateTag {
    if (node.tagName === tagName) return node;
    return createJSDocPrivateTag(tagName, node.comment);
}

export function updateJSDocProtectedTag(node: JSDocProtectedTag, tagName: Identifier): JSDocProtectedTag {
    if (node.tagName === tagName) return node;
    return createJSDocProtectedTag(tagName, node.comment);
}

export function updateJSDocPublicTag(node: JSDocPublicTag, tagName: Identifier): JSDocPublicTag {
    if (node.tagName === tagName) return node;
    return createJSDocPublicTag(tagName, node.comment);
}

export function updateJSDocReadonlyTag(node: JSDocReadonlyTag, tagName: Identifier): JSDocReadonlyTag {
    if (node.tagName === tagName) return node;
    return createJSDocReadonlyTag(tagName, node.comment);
}

export function updateJSDocReturnTag(node: JSDocReturnTag, tagName: Identifier, typeExpression: JSDocTypeExpression | undefined): JSDocReturnTag {
    if (node.tagName === tagName && node.typeExpression === typeExpression) return node;
    return createJSDocReturnTag(tagName, typeExpression, node.comment);
}

export function updateJSDocSatisfiesTag(node: JSDocSatisfiesTag, tagName: Identifier, typeExpression: JSDocTypeExpression): JSDocSatisfiesTag {
    if (node.tagName === tagName && node.typeExpression === typeExpression) return node;
    return createJSDocSatisfiesTag(tagName, typeExpression, node.comment);
}

export function updateJSDocSeeTag(node: JSDocSeeTag, tagName: Identifier, name: JSDocNameReference | undefined): JSDocSeeTag {
    if (node.tagName === tagName && node.name === name) return node;
    return createJSDocSeeTag(tagName, name, node.comment);
}

export function updateJSDocSignature(node: JSDocSignature, type: JSDocReturnTag | undefined): JSDocSignature {
    if (node.type === type) return node;
    return createJSDocSignature(node.typeParameters, node.parameters, type);
}

export function updateJSDocTemplateTag(node: JSDocTemplateTag, tagName: Identifier, constraint: JSDocTypeExpression | undefined, typeParameters: readonly TypeParameterDeclaration[]): JSDocTemplateTag {
    if (node.tagName === tagName && node.constraint === constraint && node.typeParameters === typeParameters) return node;
    return createJSDocTemplateTag(tagName, constraint, typeParameters, node.comment);
}

export function updateJSDocThisTag(node: JSDocThisTag, tagName: Identifier, typeExpression: JSDocTypeExpression): JSDocThisTag {
    if (node.tagName === tagName && node.typeExpression === typeExpression) return node;
    return createJSDocThisTag(tagName, typeExpression, node.comment);
}

export function updateJSDocTypedefTag(node: JSDocTypedefTag, tagName: Identifier, typeExpression: JSDocTypeExpression | JSDocTypeLiteral | undefined, fullName: JSDocNamespaceDeclaration | Identifier | undefined): JSDocTypedefTag {
    if (node.tagName === tagName && node.typeExpression === typeExpression && node.fullName === fullName) return node;
    return createJSDocTypedefTag(tagName, typeExpression, fullName, node.comment);
}

export function updateJSDocTypeExpression(node: JSDocTypeExpression, type: TypeNode): JSDocTypeExpression {
    if (node.type === type) return node;
    return createJSDocTypeExpression(type);
}

export function updateJSDocTypeTag(node: JSDocTypeTag, tagName: Identifier, typeExpression: JSDocTypeExpression): JSDocTypeTag {
    if (node.tagName === tagName && node.typeExpression === typeExpression) return node;
    return createJSDocTypeTag(tagName, typeExpression, node.comment);
}

export function updateJSDocUnknownTag(node: JSDocUnknownTag, tagName: Identifier): JSDocUnknownTag {
    if (node.tagName === tagName) return node;
    return createJSDocUnknownTag(tagName, node.comment);
}

export function updateJSDocVariadicType(node: JSDocVariadicType, type: TypeNode): JSDocVariadicType {
    if (node.type === type) return node;
    return createJSDocVariadicType(type);
}

export function updateJsxAttribute(node: JsxAttribute, name: JsxAttributeName, initializer: JsxAttributeValue | undefined): JsxAttribute {
    if (node.name === name && node.initializer === initializer) return node;
    return createJsxAttribute(name, initializer);
}

export function updateJsxAttributes(node: JsxAttributes, properties: readonly JsxAttributeLike[]): JsxAttributes {
    if (node.properties === properties) return node;
    return createJsxAttributes(properties);
}

export function updateJsxClosingElement(node: JsxClosingElement, tagName: JsxTagNameExpression): JsxClosingElement {
    if (node.tagName === tagName) return node;
    return createJsxClosingElement(tagName);
}

export function updateJsxElement(node: JsxElement, openingElement: JsxOpeningElement, children: readonly JsxChild[], closingElement: JsxClosingElement): JsxElement {
    if (node.openingElement === openingElement && node.children === children && node.closingElement === closingElement) return node;
    return createJsxElement(openingElement, children, closingElement);
}

export function updateJsxExpression(node: JsxExpression, dotDotDotToken: Token<SyntaxKind.DotDotDotToken> | undefined, expression: Expression | undefined): JsxExpression {
    if (node.dotDotDotToken === dotDotDotToken && node.expression === expression) return node;
    return createJsxExpression(dotDotDotToken, expression);
}

export function updateJsxFragment(node: JsxFragment, openingFragment: JsxOpeningFragment, children: readonly JsxChild[], closingFragment: JsxClosingFragment): JsxFragment {
    if (node.openingFragment === openingFragment && node.children === children && node.closingFragment === closingFragment) return node;
    return createJsxFragment(openingFragment, children, closingFragment);
}

export function updateJsxNamespacedName(node: JsxNamespacedName, name: Identifier, namespace: Identifier): JsxNamespacedName {
    if (node.name === name && node.namespace === namespace) return node;
    return createJsxNamespacedName(name, namespace);
}

export function updateJsxOpeningElement(node: JsxOpeningElement, tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes): JsxOpeningElement {
    if (node.tagName === tagName && node.typeArguments === typeArguments && node.attributes === attributes) return node;
    return createJsxOpeningElement(tagName, typeArguments, attributes);
}

export function updateJsxSelfClosingElement(node: JsxSelfClosingElement, tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes): JsxSelfClosingElement {
    if (node.tagName === tagName && node.typeArguments === typeArguments && node.attributes === attributes) return node;
    return createJsxSelfClosingElement(tagName, typeArguments, attributes);
}

export function updateJsxSpreadAttribute(node: JsxSpreadAttribute, expression: Expression): JsxSpreadAttribute {
    if (node.expression === expression) return node;
    return createJsxSpreadAttribute(expression);
}

export function updateLabeledStatement(node: LabeledStatement, label: Identifier, statement: Statement): LabeledStatement {
    if (node.label === label && node.statement === statement) return node;
    return createLabeledStatement(label, statement);
}

export function updateLiteralTypeNode(node: LiteralTypeNode, literal: NullLiteral | BooleanLiteral | LiteralExpression | PrefixUnaryExpression): LiteralTypeNode {
    if (node.literal === literal) return node;
    return createLiteralTypeNode(literal);
}

export function updateMappedTypeNode(node: MappedTypeNode, readonlyToken: ReadonlyKeyword | PlusToken | MinusToken | undefined, typeParameter: TypeParameterDeclaration, nameType: TypeNode | undefined, questionToken: QuestionToken | PlusToken | MinusToken | undefined, type: TypeNode | undefined, members: readonly TypeElement[] | undefined): MappedTypeNode {
    if (node.readonlyToken === readonlyToken && node.typeParameter === typeParameter && node.nameType === nameType && node.questionToken === questionToken && node.type === type && node.members === members) return node;
    return createMappedTypeNode(readonlyToken, typeParameter, nameType, questionToken, type, members);
}

export function updateMetaProperty(node: MetaProperty, name: Identifier): MetaProperty {
    if (node.name === name) return node;
    return createMetaProperty(node.keywordToken, name);
}

export function updateMethodDeclaration(node: MethodDeclaration, modifiers: readonly ModifierLike[] | undefined, asteriskToken: AsteriskToken | undefined, name: PropertyName, postfixToken: QuestionToken | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: FunctionBody | undefined): MethodDeclaration {
    if (node.modifiers === modifiers && node.asteriskToken === asteriskToken && node.name === name && node.postfixToken === postfixToken && node.typeParameters === typeParameters && node.parameters === parameters && node.type === type && node.body === body) return node;
    return createMethodDeclaration(modifiers, asteriskToken, name, postfixToken, typeParameters, parameters, type, body);
}

export function updateMethodSignature(node: MethodSignature, modifiers: readonly Modifier[] | undefined, name: PropertyName, postfixToken: QuestionToken | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined): MethodSignature {
    if (node.modifiers === modifiers && node.name === name && node.postfixToken === postfixToken && node.typeParameters === typeParameters && node.parameters === parameters && node.type === type) return node;
    return createMethodSignature(modifiers, name, postfixToken, typeParameters, parameters, type);
}

export function updateModuleBlock(node: ModuleBlock, statements: readonly Statement[]): ModuleBlock {
    if (node.statements === statements) return node;
    return createModuleBlock(statements);
}

export function updateModuleDeclaration(node: ModuleDeclaration, modifiers: readonly ModifierLike[] | undefined, name: ModuleName, body: ModuleBody | JSDocNamespaceDeclaration | undefined): ModuleDeclaration {
    if (node.modifiers === modifiers && node.name === name && node.body === body) return node;
    return createModuleDeclaration(modifiers, name, body);
}

export function updateNamedExports(node: NamedExports, elements: readonly ExportSpecifier[]): NamedExports {
    if (node.elements === elements) return node;
    return createNamedExports(elements);
}

export function updateNamedImports(node: NamedImports, elements: readonly ImportSpecifier[]): NamedImports {
    if (node.elements === elements) return node;
    return createNamedImports(elements);
}

export function updateNamedTupleMember(node: NamedTupleMember, dotDotDotToken: Token<SyntaxKind.DotDotDotToken> | undefined, name: Identifier, questionToken: Token<SyntaxKind.QuestionToken> | undefined, type: TypeNode): NamedTupleMember {
    if (node.dotDotDotToken === dotDotDotToken && node.name === name && node.questionToken === questionToken && node.type === type) return node;
    return createNamedTupleMember(dotDotDotToken, name, questionToken, type);
}

export function updateNamespaceExport(node: NamespaceExport, name: ModuleExportName): NamespaceExport {
    if (node.name === name) return node;
    return createNamespaceExport(name);
}

export function updateNamespaceExportDeclaration(node: NamespaceExportDeclaration, name: Identifier): NamespaceExportDeclaration {
    if (node.name === name) return node;
    return createNamespaceExportDeclaration(name);
}

export function updateNamespaceImport(node: NamespaceImport, name: Identifier): NamespaceImport {
    if (node.name === name) return node;
    return createNamespaceImport(name);
}

export function updateNewExpression(node: NewExpression, expression: LeftHandSideExpression, typeArguments: readonly TypeNode[] | undefined, arguments_: readonly Expression[] | undefined): NewExpression {
    if (node.expression === expression && node.typeArguments === typeArguments && node.arguments === arguments_) return node;
    return createNewExpression(expression, typeArguments, arguments_);
}

export function updateNonNullExpression(node: NonNullExpression, expression: Expression): NonNullExpression {
    if (node.expression === expression) return node;
    return createNonNullExpression(expression);
}

export function updateObjectBindingPattern(node: ObjectBindingPattern, elements: readonly BindingElement[]): ObjectBindingPattern {
    if (node.elements === elements) return node;
    return createObjectBindingPattern(elements);
}

export function updateObjectLiteralExpression(node: ObjectLiteralExpression, properties: readonly ObjectLiteralElementLike[]): ObjectLiteralExpression {
    if (node.properties === properties) return node;
    return createObjectLiteralExpression(properties, node.multiLine);
}

export function updateOptionalTypeNode(node: OptionalTypeNode, type: TypeNode): OptionalTypeNode {
    if (node.type === type) return node;
    return createOptionalTypeNode(type);
}

export function updateParameterDeclaration(node: ParameterDeclaration, modifiers: readonly ModifierLike[] | undefined, dotDotDotToken: DotDotDotToken | undefined, name: BindingName, questionToken: QuestionToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): ParameterDeclaration {
    if (node.modifiers === modifiers && node.dotDotDotToken === dotDotDotToken && node.name === name && node.questionToken === questionToken && node.type === type && node.initializer === initializer) return node;
    return createParameterDeclaration(modifiers, dotDotDotToken, name, questionToken, type, initializer);
}

export function updateParenthesizedExpression(node: ParenthesizedExpression, expression: Expression): ParenthesizedExpression {
    if (node.expression === expression) return node;
    return createParenthesizedExpression(expression);
}

export function updateParenthesizedTypeNode(node: ParenthesizedTypeNode, type: TypeNode): ParenthesizedTypeNode {
    if (node.type === type) return node;
    return createParenthesizedTypeNode(type);
}

export function updatePartiallyEmittedExpression(node: PartiallyEmittedExpression, expression: Expression): PartiallyEmittedExpression {
    if (node.expression === expression) return node;
    return createPartiallyEmittedExpression(expression);
}

export function updatePostfixUnaryExpression(node: PostfixUnaryExpression, operand: LeftHandSideExpression): PostfixUnaryExpression {
    if (node.operand === operand) return node;
    return createPostfixUnaryExpression(operand, node.operator);
}

export function updatePrefixUnaryExpression(node: PrefixUnaryExpression, operand: UnaryExpression): PrefixUnaryExpression {
    if (node.operand === operand) return node;
    return createPrefixUnaryExpression(node.operator, operand);
}

export function updatePropertyAccessExpression(node: PropertyAccessExpression, expression: LeftHandSideExpression, questionDotToken: QuestionDotToken | undefined, name: MemberName): PropertyAccessExpression {
    if (node.expression === expression && node.questionDotToken === questionDotToken && node.name === name) return node;
    return createPropertyAccessExpression(expression, questionDotToken, name);
}

export function updatePropertyAssignment(node: PropertyAssignment, name: PropertyName, postfixToken: QuestionToken | undefined, initializer: Expression): PropertyAssignment {
    if (node.name === name && node.postfixToken === postfixToken && node.initializer === initializer) return node;
    return createPropertyAssignment(name, postfixToken, initializer);
}

export function updatePropertyDeclaration(node: PropertyDeclaration, modifiers: readonly ModifierLike[] | undefined, name: PropertyName, postfixToken: QuestionToken | ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): PropertyDeclaration {
    if (node.modifiers === modifiers && node.name === name && node.postfixToken === postfixToken && node.type === type && node.initializer === initializer) return node;
    return createPropertyDeclaration(modifiers, name, postfixToken, type, initializer);
}

export function updatePropertySignature(node: PropertySignature, modifiers: readonly Modifier[] | undefined, name: PropertyName, postfixToken: QuestionToken | undefined, type: TypeNode | undefined): PropertySignature {
    if (node.modifiers === modifiers && node.name === name && node.postfixToken === postfixToken && node.type === type) return node;
    return createPropertySignature(modifiers, name, postfixToken, type);
}

export function updateQualifiedName(node: QualifiedName, left: EntityName, right: Identifier): QualifiedName {
    if (node.left === left && node.right === right) return node;
    return createQualifiedName(left, right);
}

export function updateRestTypeNode(node: RestTypeNode, type: TypeNode): RestTypeNode {
    if (node.type === type) return node;
    return createRestTypeNode(type);
}

export function updateReturnStatement(node: ReturnStatement, expression: Expression | undefined): ReturnStatement {
    if (node.expression === expression) return node;
    return createReturnStatement(expression);
}

export function updateSatisfiesExpression(node: SatisfiesExpression, expression: Expression, type: TypeNode): SatisfiesExpression {
    if (node.expression === expression && node.type === type) return node;
    return createSatisfiesExpression(expression, type);
}

export function updateSetAccessorDeclaration(node: SetAccessorDeclaration, modifiers: readonly ModifierLike[] | undefined, name: PropertyName, parameters: readonly ParameterDeclaration[], body: FunctionBody | undefined): SetAccessorDeclaration {
    if (node.modifiers === modifiers && node.name === name && node.parameters === parameters && node.body === body) return node;
    return createSetAccessorDeclaration(modifiers, name, parameters, body);
}

export function updateShorthandPropertyAssignment(node: ShorthandPropertyAssignment, name: Identifier, postfixToken: QuestionToken | undefined, equalsToken: EqualsToken | undefined, objectAssignmentInitializer: Expression | undefined): ShorthandPropertyAssignment {
    if (node.name === name && node.postfixToken === postfixToken && node.equalsToken === equalsToken && node.objectAssignmentInitializer === objectAssignmentInitializer) return node;
    return createShorthandPropertyAssignment(name, postfixToken, equalsToken, objectAssignmentInitializer);
}

export function updateSourceFile(node: SourceFile, statements: readonly Statement[], endOfFileToken: EndOfFile): SourceFile {
    if (node.statements === statements && node.endOfFileToken === endOfFileToken) return node;
    return createSourceFile(statements, endOfFileToken, node.text, node.fileName, node.path);
}

export function updateSpreadAssignment(node: SpreadAssignment, expression: Expression): SpreadAssignment {
    if (node.expression === expression) return node;
    return createSpreadAssignment(expression);
}

export function updateSpreadElement(node: SpreadElement, expression: Expression): SpreadElement {
    if (node.expression === expression) return node;
    return createSpreadElement(expression);
}

export function updateSwitchStatement(node: SwitchStatement, expression: Expression, caseBlock: CaseBlock): SwitchStatement {
    if (node.expression === expression && node.caseBlock === caseBlock) return node;
    return createSwitchStatement(expression, caseBlock, node.possiblyExhaustive);
}

export function updateTaggedTemplateExpression(node: TaggedTemplateExpression, tag: LeftHandSideExpression, typeArguments: readonly TypeNode[] | undefined, template: TemplateLiteral): TaggedTemplateExpression {
    if (node.tag === tag && node.typeArguments === typeArguments && node.template === template) return node;
    return createTaggedTemplateExpression(tag, typeArguments, template);
}

export function updateTemplateExpression(node: TemplateExpression, head: TemplateHead, templateSpans: readonly TemplateSpan[]): TemplateExpression {
    if (node.head === head && node.templateSpans === templateSpans) return node;
    return createTemplateExpression(head, templateSpans);
}

export function updateTemplateLiteralTypeNode(node: TemplateLiteralTypeNode, head: TemplateHead, templateSpans: readonly TemplateLiteralTypeSpan[]): TemplateLiteralTypeNode {
    if (node.head === head && node.templateSpans === templateSpans) return node;
    return createTemplateLiteralTypeNode(head, templateSpans);
}

export function updateTemplateLiteralTypeSpan(node: TemplateLiteralTypeSpan, type: TypeNode, literal: TemplateMiddle | TemplateTail): TemplateLiteralTypeSpan {
    if (node.type === type && node.literal === literal) return node;
    return createTemplateLiteralTypeSpan(type, literal);
}

export function updateTemplateSpan(node: TemplateSpan, expression: Expression, literal: TemplateMiddle | TemplateTail): TemplateSpan {
    if (node.expression === expression && node.literal === literal) return node;
    return createTemplateSpan(expression, literal);
}

export function updateThrowStatement(node: ThrowStatement, expression: Expression): ThrowStatement {
    if (node.expression === expression) return node;
    return createThrowStatement(expression);
}

export function updateTryStatement(node: TryStatement, tryBlock: Block, catchClause: CatchClause | undefined, finallyBlock: Block | undefined): TryStatement {
    if (node.tryBlock === tryBlock && node.catchClause === catchClause && node.finallyBlock === finallyBlock) return node;
    return createTryStatement(tryBlock, catchClause, finallyBlock);
}

export function updateTupleTypeNode(node: TupleTypeNode, elements: readonly (TypeNode | NamedTupleMember)[]): TupleTypeNode {
    if (node.elements === elements) return node;
    return createTupleTypeNode(elements);
}

export function updateTypeAliasDeclaration(node: TypeAliasDeclaration, modifiers: readonly ModifierLike[] | undefined, name: Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, type: TypeNode): TypeAliasDeclaration {
    if (node.modifiers === modifiers && node.name === name && node.typeParameters === typeParameters && node.type === type) return node;
    return createTypeAliasDeclaration(modifiers, name, typeParameters, type);
}

export function updateTypeAssertion(node: TypeAssertion, type: TypeNode, expression: UnaryExpression): TypeAssertion {
    if (node.type === type && node.expression === expression) return node;
    return createTypeAssertion(type, expression);
}

export function updateTypeLiteralNode(node: TypeLiteralNode, members: readonly TypeElement[]): TypeLiteralNode {
    if (node.members === members) return node;
    return createTypeLiteralNode(members);
}

export function updateTypeOfExpression(node: TypeOfExpression, expression: UnaryExpression): TypeOfExpression {
    if (node.expression === expression) return node;
    return createTypeOfExpression(expression);
}

export function updateTypeOperatorNode(node: TypeOperatorNode, type: TypeNode): TypeOperatorNode {
    if (node.type === type) return node;
    return createTypeOperatorNode(node.operator, type);
}

export function updateTypeParameterDeclaration(node: TypeParameterDeclaration, modifiers: readonly Modifier[] | undefined, name: Identifier, constraint: TypeNode | undefined, default_: TypeNode | undefined): TypeParameterDeclaration {
    if (node.modifiers === modifiers && node.name === name && node.constraint === constraint && node.default === default_) return node;
    return createTypeParameterDeclaration(modifiers, name, constraint, default_);
}

export function updateTypePredicateNode(node: TypePredicateNode, assertsModifier: AssertsKeyword | undefined, parameterName: Identifier | ThisTypeNode, type: TypeNode | undefined): TypePredicateNode {
    if (node.assertsModifier === assertsModifier && node.parameterName === parameterName && node.type === type) return node;
    return createTypePredicateNode(assertsModifier, parameterName, type);
}

export function updateTypeQueryNode(node: TypeQueryNode, exprName: EntityName, typeArguments: readonly TypeNode[] | undefined): TypeQueryNode {
    if (node.exprName === exprName && node.typeArguments === typeArguments) return node;
    return createTypeQueryNode(exprName, typeArguments);
}

export function updateTypeReferenceNode(node: TypeReferenceNode, typeName: EntityName, typeArguments: readonly TypeNode[] | undefined): TypeReferenceNode {
    if (node.typeName === typeName && node.typeArguments === typeArguments) return node;
    return createTypeReferenceNode(typeName, typeArguments);
}

export function updateUnionTypeNode(node: UnionTypeNode, types: readonly TypeNode[]): UnionTypeNode {
    if (node.types === types) return node;
    return createUnionTypeNode(types);
}

export function updateVariableDeclaration(node: VariableDeclaration, name: BindingName, exclamationToken: ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): VariableDeclaration {
    if (node.name === name && node.exclamationToken === exclamationToken && node.type === type && node.initializer === initializer) return node;
    return createVariableDeclaration(name, exclamationToken, type, initializer);
}

export function updateVariableDeclarationList(node: VariableDeclarationList, declarations: readonly VariableDeclaration[]): VariableDeclarationList {
    if (node.declarations === declarations) return node;
    return createVariableDeclarationList(declarations);
}

export function updateVariableStatement(node: VariableStatement, modifiers: readonly ModifierLike[] | undefined, declarationList: VariableDeclarationList): VariableStatement {
    if (node.modifiers === modifiers && node.declarationList === declarationList) return node;
    return createVariableStatement(modifiers, declarationList);
}

export function updateVoidExpression(node: VoidExpression, expression: UnaryExpression): VoidExpression {
    if (node.expression === expression) return node;
    return createVoidExpression(expression);
}

export function updateWhileStatement(node: WhileStatement, expression: Expression, statement: Statement): WhileStatement {
    if (node.expression === expression && node.statement === statement) return node;
    return createWhileStatement(expression, statement);
}

export function updateWithStatement(node: WithStatement, expression: Expression, statement: Statement): WithStatement {
    if (node.expression === expression && node.statement === statement) return node;
    return createWithStatement(expression, statement);
}

export function updateYieldExpression(node: YieldExpression, asteriskToken: AsteriskToken | undefined, expression: Expression | undefined): YieldExpression {
    if (node.asteriskToken === asteriskToken && node.expression === expression) return node;
    return createYieldExpression(asteriskToken, expression);
}
