import { hasProperty } from "../core";
import { Debug } from "../debug";
import {
    __String,
    BinaryOperator,
    CommentDirectiveType,
    CommentKind,
    KeywordTypeSyntaxKind,
    LanguageVariant,
    NodeFlags,
    Path,
    PostfixUnaryOperator,
    PrefixUnaryOperator,
    ResolutionMode,
    ScriptKind,
    ScriptTarget,
    SyntaxKind,
    TokenFlags,
    TokenSyntaxKind,
    TransformFlags
} from "../types";
import { isTokenKind } from "../utilitiesPublic";
import { SharedMap } from "./collections/sharedMap";
import { SharedDiagnosticWithLocation } from "./sharedDiagnostics";
import { SharedNodeArray } from "./sharedNodeArray";
import { Identifiable } from "./structs/identifiableStruct";
import { isShareableNonPrimitive } from "./structs/shareable";
import { Shared, SharedStructBase } from "./structs/sharedStruct";
import { isTaggedStructObject, Tag, Tagged } from "./structs/taggedStruct";

/** @internal */
@Shared()
export class SharedTextRange extends Tagged(SharedStructBase, Tag.TextRange) {
    @Shared() pos: number;
    @Shared() end: number;
    constructor(pos = -1, end = -1) {
        super();
        this.pos = pos;
        this.end = end;
    }
}

/** @internal */
@Shared({ abstract: true })
export abstract class SharedNodeBase<Kind extends SyntaxKind = SyntaxKind> extends Identifiable(Tagged(SharedTextRange, Tag.Node)) {
    @Shared() kind!: Kind;
    @Shared() flags = NodeFlags.None;
    @Shared() transformFlags = TransformFlags.None;
    @Shared() parent: SharedNode | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return isShareableNonPrimitive(value) && isTaggedStructObject(value) && value.__tag__ === Tag.Node;
    }
}

/** @internal */
@Shared()
export class SharedToken<Kind extends TokenSyntaxKind> extends SharedNodeBase<Kind> {
    declare kind: Kind;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && isTokenKind(value.kind);
    }
}

/** @internal */
@Shared()
export class SharedEndOfFileToken extends HasJSDoc(SharedToken)<SyntaxKind.EndOfFileToken> {
    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedToken && value.kind === SyntaxKind.EndOfFileToken && hasProperty(value, "jsDoc");
    }
}

/** @internal */
@Shared()
export class SharedThisExpression extends HasFlowNode(SharedToken)<SyntaxKind.ThisKeyword> {
    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedToken && value.kind === SyntaxKind.ThisKeyword && hasProperty(value, "flowNode");
    }
}

/** @internal */
@Shared()
export class SharedSuperExpression extends HasFlowNode(SharedToken)<SyntaxKind.SuperKeyword> {
    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedToken && value.kind === SyntaxKind.SuperKeyword && hasProperty(value, "flowNode");
    }
}

/** @internal */
export type SharedModifier =
    | SharedToken<SyntaxKind.AbstractKeyword>
    | SharedToken<SyntaxKind.AccessorKeyword>
    | SharedToken<SyntaxKind.AsyncKeyword>
    | SharedToken<SyntaxKind.ConstKeyword>
    | SharedToken<SyntaxKind.DeclareKeyword>
    | SharedToken<SyntaxKind.DefaultKeyword>
    | SharedToken<SyntaxKind.ExportKeyword>
    | SharedToken<SyntaxKind.InKeyword>
    | SharedToken<SyntaxKind.PrivateKeyword>
    | SharedToken<SyntaxKind.ProtectedKeyword>
    | SharedToken<SyntaxKind.PublicKeyword>
    | SharedToken<SyntaxKind.OutKeyword>
    | SharedToken<SyntaxKind.OverrideKeyword>
    | SharedToken<SyntaxKind.ReadonlyKeyword>
    | SharedToken<SyntaxKind.StaticKeyword>
    ;

/** @internal */
export type SharedModifierLike =
    | SharedModifier
    | SharedDecorator
    ;

/** @internal */
@Shared()
export class SharedIdentifier extends HasFlowNode(HasSymbol(HasJSDoc(SharedNodeBase)))<SyntaxKind.Identifier> {
    @Shared() escapedText!: __String;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.Identifier;
    }
}

/** @internal */
@Shared()
export class SharedQualifiedName extends HasFlowNode(SharedNodeBase)<SyntaxKind.QualifiedName> {
    @Shared() left!: SharedEntityName;
    @Shared() right!: SharedIdentifier;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.QualifiedName;
    }
}

/** @internal */
export type SharedEntityName =
    | SharedIdentifier
    | SharedQualifiedName
    ;

/** @internal */
export type SharedBindingName =
    | SharedIdentifier
    | SharedBindingPattern
    ;

/** @internal */
export type SharedPropertyName =
    | SharedIdentifier
    | SharedStringLiteral
    | SharedNumericLiteral
    | SharedComputedPropertyName
    | SharedPrivateIdentifier
    ;

/** @internal */
export type SharedMemberName =
    | SharedIdentifier
    | SharedPrivateIdentifier
    ;

/** @internal */
@Shared()
export class SharedComputedPropertyName extends SharedNodeBase<SyntaxKind.ComputedPropertyName> {
    @Shared() expression!: SharedExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.ComputedPropertyName;
    }
}

/** @internal */
@Shared()
export class SharedPrivateIdentifier extends SharedNodeBase<SyntaxKind.PrivateIdentifier> {
    @Shared() escapedText!: __String;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.PrivateIdentifier;
    }
}

/** @internal */
@Shared()
export class SharedTypeParameterDeclaration extends HasSymbol(HasJSDoc(SharedNodeBase))<SyntaxKind.TypeParameter> {
    @Shared() modifiers: SharedNodeArray<SharedModifier> | undefined;
    @Shared() name!: SharedIdentifier;
    @Shared() constraint: SharedTypeNode | undefined;
    @Shared() default: SharedTypeNode | undefined;
    @Shared() expression: SharedExpression | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.TypeParameter;
    }
}

/** @internal */
@Shared()
export class SharedParameterDeclaration extends HasSymbol(HasJSDoc(SharedNodeBase))<SyntaxKind.Parameter> {
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;
    @Shared() dotDotDotToken!: SharedToken<SyntaxKind.DotDotDotToken> | undefined;
    @Shared() name!: SharedBindingName;
    @Shared() questionToken!: SharedToken<SyntaxKind.QuestionToken> | undefined;
    @Shared() type!: SharedTypeNode | undefined;
    @Shared() initializer!: SharedExpression | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.Parameter;
    }
}

/** @internal */
@Shared()
export class SharedDecorator extends SharedNodeBase<SyntaxKind.Decorator> {
    @Shared() expression!: SharedLeftHandSideExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.Decorator;
    }
}

/** @internal */
@Shared()
export class SharedPropertySignature extends HasSymbol(HasJSDoc(SharedNodeBase))<SyntaxKind.PropertySignature> {
    @Shared() modifiers!: SharedNodeArray<SharedModifier> | undefined;
    @Shared() name!: SharedPropertyName;
    @Shared() questionToken!: SharedToken<SyntaxKind.QuestionToken> | undefined;
    @Shared() type!: SharedTypeNode | undefined;
    @Shared() initializer!: SharedExpression | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.PropertySignature;
    }
}

/** @internal */
@Shared()
export class SharedCallSignatureDeclaration extends HasLocals(HasSymbol(HasJSDoc(SharedNodeBase)))<SyntaxKind.CallSignature> {
    @Shared() typeParameters!: SharedNodeArray<SharedTypeParameterDeclaration> | undefined;
    @Shared() parameters!: SharedNodeArray<SharedParameterDeclaration>;
    @Shared() type!: SharedTypeNode | undefined;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.CallSignature;
    }
}

/** @internal */
@Shared()
export class SharedConstructSignatureDeclaration extends HasLocals(HasSymbol(HasJSDoc(SharedNodeBase)))<SyntaxKind.ConstructSignature> {
    @Shared() typeParameters!: SharedNodeArray<SharedTypeParameterDeclaration> | undefined;
    @Shared() parameters!: SharedNodeArray<SharedParameterDeclaration>;
    @Shared() type!: SharedTypeNode | undefined;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.ConstructSignature;
    }
}

/** @internal */
@Shared()
export class SharedVariableDeclaration extends HasSymbol(HasJSDoc(SharedNodeBase))<SyntaxKind.VariableDeclaration> {
    @Shared() name!: SharedBindingName;
    @Shared() exclamationToken!: SharedToken<SyntaxKind.ExclamationToken> | undefined;
    @Shared() type!: SharedTypeNode | undefined;
    @Shared() initializer!: SharedExpression | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.VariableDeclaration;
    }
}

/** @internal */
@Shared()
export class SharedVariableDeclarationList extends SharedNodeBase<SyntaxKind.VariableDeclarationList> {
    @Shared() declarations!: SharedNodeArray<SharedVariableDeclaration>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.VariableDeclarationList;
    }
}

/** @internal */
@Shared()
export class SharedBindingElement extends HasFlowNode(HasSymbol(SharedNodeBase))<SyntaxKind.BindingElement> {
    @Shared() propertyName!: SharedPropertyName | undefined;
    @Shared() dotDotDotToken!: SharedToken<SyntaxKind.DotDotDotToken> | undefined;
    @Shared() name!: SharedBindingName;
    @Shared() initializer!: SharedExpression | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.BindingElement;
    }
}

/** @internal */
@Shared()
export class SharedPropertyDeclaration extends HasSymbol(HasJSDoc(SharedNodeBase))<SyntaxKind.PropertyDeclaration> {
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;
    @Shared() name!: SharedPropertyName;
    @Shared() questionToken!: SharedToken<SyntaxKind.QuestionToken> | undefined;
    @Shared() exclamationToken!: SharedToken<SyntaxKind.ExclamationToken> | undefined;
    @Shared() type!: SharedTypeNode | undefined;
    @Shared() initializer!: SharedExpression | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.PropertyDeclaration;
    }
}

/** @internal */
@Shared()
export class SharedPropertyAssignment extends HasSymbol(HasJSDoc(SharedNodeBase))<SyntaxKind.PropertyAssignment> {
    @Shared() name!: SharedPropertyName;
    @Shared() initializer!: SharedExpression;
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;
    @Shared() questionToken!: SharedToken<SyntaxKind.QuestionToken> | undefined;
    @Shared() exclamationToken!: SharedToken<SyntaxKind.ExclamationToken> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.PropertyAssignment;
    }
}

/** @internal */
@Shared()
export class SharedShorthandPropertyAssignment extends HasSymbol(HasJSDoc(SharedNodeBase))<SyntaxKind.ShorthandPropertyAssignment> {
    @Shared() name!: SharedIdentifier;
    @Shared() equalsToken!: SharedToken<SyntaxKind.EqualsToken> | undefined;
    @Shared() objectAssignmentInitializer!: SharedExpression | undefined;
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;
    @Shared() questionToken!: SharedToken<SyntaxKind.QuestionToken> | undefined;
    @Shared() exclamationToken!: SharedToken<SyntaxKind.ExclamationToken> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.ShorthandPropertyAssignment;
    }
}

/** @internal */
@Shared()
export class SharedSpreadAssignment extends HasSymbol(HasJSDoc(SharedNodeBase))<SyntaxKind.SpreadAssignment> {
    @Shared() expression!: SharedExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.SpreadAssignment;
    }
}

/** @internal */
export type SharedBindingPattern =
    | SharedObjectBindingPattern
    | SharedArrayBindingPattern
    ;

/** @internal */
export type SharedArrayBindingElement =
    | SharedBindingElement
    | SharedOmittedExpression
    ;

/** @internal */
@Shared()
export class SharedObjectBindingPattern extends SharedNodeBase<SyntaxKind.ObjectBindingPattern> {
    @Shared() elements!: SharedNodeArray<SharedBindingElement>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.ObjectBindingPattern;
    }
}

/** @internal */
@Shared()
export class SharedArrayBindingPattern extends SharedNodeBase<SyntaxKind.ArrayBindingPattern> {
    @Shared() elements!: SharedNodeArray<SharedArrayBindingElement>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.ArrayBindingPattern;
    }
}

/** @internal */
@Shared()
export class SharedFunctionDeclaration extends HasFunctionFlow(HasLocals(HasSymbol(HasJSDoc(SharedNodeBase))))<SyntaxKind.FunctionDeclaration> {
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;
    @Shared() asteriskToken!: SharedToken<SyntaxKind.AsteriskToken> | undefined;
    @Shared() name!: SharedIdentifier | undefined;
    @Shared() typeParameters!: SharedNodeArray<SharedTypeParameterDeclaration> | undefined;
    @Shared() parameters!: SharedNodeArray<SharedParameterDeclaration>;
    @Shared() type!: SharedTypeNode | undefined;
    @Shared() body!: SharedFunctionBody | undefined;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.FunctionDeclaration;
    }
}

/** @internal */
@Shared()
export class SharedMethodSignature extends HasLocals(HasSymbol(HasJSDoc(SharedNodeBase)))<SyntaxKind.MethodSignature> {
    @Shared() modifiers!: SharedNodeArray<SharedModifier> | undefined;
    @Shared() name!: SharedPropertyName;
    @Shared() questionToken!: SharedToken<SyntaxKind.QuestionToken> | undefined;
    @Shared() typeParameters!: SharedNodeArray<SharedTypeParameterDeclaration> | undefined;
    @Shared() parameters!: SharedNodeArray<SharedParameterDeclaration>;
    @Shared() type!: SharedTypeNode | undefined;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.MethodSignature;
    }
}

/** @internal */
@Shared()
export class SharedMethodDeclaration extends HasFunctionFlow(HasFlowNode(HasLocals(HasSymbol(HasJSDoc(SharedNodeBase)))))<SyntaxKind.MethodDeclaration> {
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;
    @Shared() asteriskToken!: SharedToken<SyntaxKind.AsteriskToken> | undefined;
    @Shared() name!: SharedPropertyName;
    @Shared() questionToken!: SharedToken<SyntaxKind.QuestionToken> | undefined;
    @Shared() exclamationToken!: SharedToken<SyntaxKind.ExclamationToken> | undefined;
    @Shared() typeParameters!: SharedNodeArray<SharedTypeParameterDeclaration> | undefined;
    @Shared() parameters!: SharedNodeArray<SharedParameterDeclaration>;
    @Shared() type!: SharedTypeNode | undefined;
    @Shared() body!: SharedFunctionBody | undefined;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.MethodDeclaration;
    }
}

/** @internal */
@Shared()
export class SharedConstructorDeclaration extends HasFunctionFlow(HasLocals(HasSymbol(HasJSDoc(SharedNodeBase))))<SyntaxKind.Constructor> {
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;
    @Shared() body!: SharedFunctionBody | undefined;
    @Shared() typeParameters!: SharedNodeArray<SharedTypeParameterDeclaration> | undefined;
    @Shared() parameters!: SharedNodeArray<SharedParameterDeclaration>;
    @Shared() type!: SharedTypeNode | undefined;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.Constructor;
    }
}

/** @internal */
@Shared()
export class SharedSemicolonClassElement extends HasJSDoc(SharedNodeBase)<SyntaxKind.SemicolonClassElement> {
    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.SemicolonClassElement;
    }
}

/** @internal */
@Shared()
export class SharedGetAccessorDeclaration extends HasFunctionFlow(HasFlowNode(HasLocals(HasSymbol(HasJSDoc(SharedNodeBase)))))<SyntaxKind.GetAccessor> {
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;
    @Shared() name!: SharedPropertyName;
    @Shared() body!: SharedFunctionBody | undefined;
    @Shared() typeParameters!: SharedNodeArray<SharedTypeParameterDeclaration> | undefined;
    @Shared() parameters!: SharedNodeArray<SharedParameterDeclaration>;
    @Shared() type!: SharedTypeNode | undefined;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.GetAccessor;
    }
}

/** @internal */
@Shared()
export class SharedSetAccessorDeclaration extends HasFunctionFlow(HasFlowNode(HasLocals(HasSymbol(HasJSDoc(SharedNodeBase)))))<SyntaxKind.SetAccessor> {
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;
    @Shared() name!: SharedPropertyName;
    @Shared() body!: SharedFunctionBody | undefined;
    @Shared() typeParameters!: SharedNodeArray<SharedTypeParameterDeclaration> | undefined;
    @Shared() parameters!: SharedNodeArray<SharedParameterDeclaration>;
    @Shared() type!: SharedTypeNode | undefined;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.SetAccessor;
    }
}

/** @internal */
export type SharedAccessorDeclaration =
    | SharedGetAccessorDeclaration
    | SharedSetAccessorDeclaration
    ;

/** @internal */
@Shared()
export class SharedIndexSignatureDeclaration extends HasLocals(HasSymbol(HasJSDoc(SharedNodeBase)))<SyntaxKind.IndexSignature> {
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;
    @Shared() typeParameters!: SharedNodeArray<SharedTypeParameterDeclaration> | undefined;
    @Shared() parameters!: SharedNodeArray<SharedParameterDeclaration>;
    @Shared() type!: SharedTypeNode;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.IndexSignature;
    }
}

/** @internal */
@Shared()
export class SharedClassStaticBlockDeclaration extends HasFunctionFlow(HasLocals(HasSymbol(HasJSDoc(SharedNodeBase))))<SyntaxKind.ClassStaticBlockDeclaration> {
    @Shared() body!: SharedBlock;
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.ClassStaticBlockDeclaration;
    }
}

/** @internal */
export type SharedTypeNode =
    | SharedToken<KeywordTypeSyntaxKind>
    | SharedImportTypeNode
    | SharedThisTypeNode
    | SharedFunctionTypeNode
    | SharedConstructorTypeNode
    | SharedTypeReferenceNode
    | SharedTypePredicateNode
    | SharedTypeQueryNode
    | SharedTypeLiteralNode
    | SharedArrayTypeNode
    | SharedTupleTypeNode
    | SharedNamedTupleMember
    | SharedOptionalTypeNode
    | SharedRestTypeNode
    | SharedUnionTypeNode
    | SharedIntersectionTypeNode
    | SharedConditionalTypeNode
    | SharedInferTypeNode
    | SharedParenthesizedTypeNode
    | SharedTypeOperatorNode
    | SharedIndexedAccessTypeNode
    | SharedMappedTypeNode
    | SharedLiteralTypeNode
    | SharedTemplateLiteralTypeNode
    | SharedTemplateLiteralTypeSpan
    | SharedJSDocTypeExpression
    | SharedJSDocType
    ;

/** @internal */
@Shared()
export class SharedImportTypeAssertionContainer extends SharedNodeBase<SyntaxKind.ImportTypeAssertionContainer> {
    @Shared() assertClause!: SharedAssertClause;
    @Shared() multiLine!: boolean | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.ImportTypeAssertionContainer;
    }
}

/** @internal */
@Shared()
export class SharedImportTypeNode extends SharedNodeBase<SyntaxKind.ImportType> {
    @Shared() isTypeOf!: boolean;
    @Shared() argument!: SharedTypeNode;
    @Shared() assertions!: SharedImportTypeAssertionContainer | undefined;
    @Shared() qualifier!: SharedEntityName | undefined;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.ImportType;
    }
}

/** @internal */
@Shared()
export class SharedThisTypeNode extends SharedNodeBase<SyntaxKind.ThisType> {

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.ThisType;
    }
}

/** @internal */
@Shared()
export class SharedFunctionTypeNode extends HasLocals(HasSymbol(HasJSDoc(SharedNodeBase)))<SyntaxKind.FunctionType> {
    @Shared() modifiers!: undefined | undefined;
    @Shared() typeParameters!: SharedNodeArray<SharedTypeParameterDeclaration> | undefined;
    @Shared() parameters!: SharedNodeArray<SharedParameterDeclaration>;
    @Shared() type!: SharedTypeNode;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.FunctionType;
    }
}

/** @internal */
@Shared()
export class SharedConstructorTypeNode extends HasLocals(HasSymbol(HasJSDoc(SharedNodeBase)))<SyntaxKind.ConstructorType> {
    @Shared() modifiers!: SharedNodeArray<SharedModifier> | undefined;
    @Shared() typeParameters!: SharedNodeArray<SharedTypeParameterDeclaration> | undefined;
    @Shared() parameters!: SharedNodeArray<SharedParameterDeclaration>;
    @Shared() type!: SharedTypeNode;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.ConstructorType;
    }
}

/** @internal */
@Shared()
export class SharedTypeReferenceNode extends SharedNodeBase<SyntaxKind.TypeReference> {
    @Shared() typeName!: SharedEntityName;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.TypeReference;
    }
}

/** @internal */
@Shared()
export class SharedTypePredicateNode extends SharedNodeBase<SyntaxKind.TypePredicate> {
    @Shared() assertsModifier!: SharedToken<SyntaxKind.AssertsKeyword> | undefined;
    @Shared() parameterName!: SharedIdentifier | SharedThisTypeNode;
    @Shared() type!: SharedTypeNode | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.TypePredicate;
    }
}

/** @internal */
@Shared()
export class SharedTypeQueryNode extends SharedNodeBase<SyntaxKind.TypeQuery> {
    @Shared() exprName!: SharedEntityName;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.TypeQuery;
    }
}

/** @internal */
@Shared()
export class SharedTypeLiteralNode extends HasSymbol(SharedNodeBase)<SyntaxKind.TypeLiteral> {
    @Shared() members!: SharedNodeArray<SharedTypeElement>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.TypeLiteral;
    }
}

/** @internal */
@Shared()
export class SharedArrayTypeNode extends SharedNodeBase<SyntaxKind.ArrayType> {
    @Shared() elementType!: SharedTypeNode;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.ArrayType;
    }
}

/** @internal */
@Shared()
export class SharedTupleTypeNode extends SharedNodeBase<SyntaxKind.TupleType> {
    @Shared() elements!: SharedNodeArray<SharedTypeNode | SharedNamedTupleMember>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.TupleType;
    }
}

/** @internal */
@Shared()
export class SharedNamedTupleMember extends HasSymbol(HasJSDoc(SharedNodeBase))<SyntaxKind.NamedTupleMember> {
    @Shared() dotDotDotToken!: SharedToken<SyntaxKind.DotDotDotToken> | undefined;
    @Shared() name!: SharedIdentifier;
    @Shared() questionToken!: SharedToken<SyntaxKind.QuestionToken> | undefined;
    @Shared() type!: SharedTypeNode;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.NamedTupleMember;
    }
}

/** @internal */
@Shared()
export class SharedOptionalTypeNode extends SharedNodeBase<SyntaxKind.OptionalType> {
    @Shared() type!: SharedTypeNode;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.OptionalType;
    }
}

/** @internal */
@Shared()
export class SharedRestTypeNode extends SharedNodeBase<SyntaxKind.RestType> {
    @Shared() type!: SharedTypeNode;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.RestType;
    }
}

/** @internal */
@Shared()
export class SharedUnionTypeNode extends SharedNodeBase<SyntaxKind.UnionType> {
    @Shared() types!: SharedNodeArray<SharedTypeNode>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.UnionType;
    }
}

/** @internal */
@Shared()
export class SharedIntersectionTypeNode extends SharedNodeBase<SyntaxKind.IntersectionType> {
    @Shared() types!: SharedNodeArray<SharedTypeNode>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.IntersectionType;
    }
}

/** @internal */
@Shared()
export class SharedConditionalTypeNode extends HasLocals(SharedNodeBase)<SyntaxKind.ConditionalType> {
    @Shared() checkType!: SharedTypeNode;
    @Shared() extendsType!: SharedTypeNode;
    @Shared() trueType!: SharedTypeNode;
    @Shared() falseType!: SharedTypeNode;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.ConditionalType;
    }
}

/** @internal */
@Shared()
export class SharedInferTypeNode extends SharedNodeBase<SyntaxKind.InferType> {
    @Shared() typeParameter!: SharedTypeParameterDeclaration;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.InferType;
    }
}

/** @internal */
@Shared()
export class SharedParenthesizedTypeNode extends SharedNodeBase<SyntaxKind.ParenthesizedType> {
    @Shared() type!: SharedTypeNode;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.ParenthesizedType;
    }
}

/** @internal */
@Shared()
export class SharedTypeOperatorNode extends SharedNodeBase<SyntaxKind.TypeOperator> {
    @Shared() operator!: SyntaxKind.KeyOfKeyword | SyntaxKind.UniqueKeyword | SyntaxKind.ReadonlyKeyword;
    @Shared() type!: SharedTypeNode;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.TypeOperator;
    }
}

/** @internal */
@Shared()
export class SharedIndexedAccessTypeNode extends SharedNodeBase<SyntaxKind.IndexedAccessType> {
    @Shared() objectType!: SharedTypeNode;
    @Shared() indexType!: SharedTypeNode;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.IndexedAccessType;
    }
}

/** @internal */
@Shared()
export class SharedMappedTypeNode extends HasLocals(HasSymbol(SharedNodeBase))<SyntaxKind.MappedType> {
    @Shared() readonlyToken!: SharedToken<SyntaxKind.ReadonlyKeyword> | SharedToken<SyntaxKind.PlusToken> | SharedToken<SyntaxKind.MinusToken> | undefined;
    @Shared() typeParameter!: SharedTypeParameterDeclaration;
    @Shared() nameType!: SharedTypeNode | undefined;
    @Shared() questionToken!: SharedToken<SyntaxKind.QuestionToken> | SharedToken<SyntaxKind.PlusToken> | SharedToken<SyntaxKind.MinusToken> | undefined;
    @Shared() type!: SharedTypeNode | undefined;
    @Shared() members!: SharedNodeArray<SharedTypeElement> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.MappedType;
    }
}

/** @internal */
@Shared()
export class SharedLiteralTypeNode extends SharedNodeBase<SyntaxKind.LiteralType> {
    @Shared() literal!: SharedToken<SyntaxKind.NullKeyword> | SharedToken<SyntaxKind.TrueKeyword> | SharedToken<SyntaxKind.FalseKeyword> | SharedStringLiteral | SharedNumericLiteral | SharedBigIntLiteral | SharedPrefixUnaryExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.LiteralType;
    }
}

/** @internal */
@Shared()
export class SharedStringLiteral extends HasSymbol(SharedNodeBase)<SyntaxKind.StringLiteral> {
    @Shared() text!: string;
    @Shared() singleQuote!: boolean | undefined;
    @Shared() isUnterminated!: boolean;
    @Shared() hasExtendedUnicodeEscape!: boolean;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.StringLiteral;
    }
}

/** @internal */
@Shared()
export class SharedTemplateLiteralTypeNode extends SharedNodeBase<SyntaxKind.TemplateLiteralType> {
    @Shared() head!: SharedTemplateHead;
    @Shared() templateSpans!: SharedNodeArray<SharedTemplateLiteralTypeSpan>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.TemplateLiteralType;
    }
}

/** @internal */
@Shared()
export class SharedTemplateLiteralTypeSpan extends SharedNodeBase<SyntaxKind.TemplateLiteralTypeSpan> {
    @Shared() type!: SharedTypeNode;
    @Shared() literal!: SharedTemplateMiddle | SharedTemplateTail;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.TemplateLiteralTypeSpan;
    }
}

/** @internal */
export type SharedLiteral =
    | SharedNumericLiteral
    | SharedBigIntLiteral
    | SharedStringLiteral
    | SharedJsxText
    | SharedRegularExpressionLiteral
    | SharedNoSubstitutionTemplateLiteral
    ;

/** @internal */
export type SharedExpression =
    | SharedOmittedExpression
    | SharedYieldExpression
    | SharedBinaryExpression
    | SharedUpdateExpression
    | SharedConditionalExpression
    | SharedArrowFunction
    | SharedSpreadElement
    | SharedAsExpression
    | SharedSatisfiesExpression
    | SharedJsxOpeningElement
    | SharedJsxOpeningFragment
    | SharedJsxClosingFragment
    | SharedJsxExpression
    ;

/** @internal */
export type SharedUpdateExpression =
    | SharedUnaryExpression
    | SharedPrefixUnaryExpression
    | SharedPostfixUnaryExpression
    ;

/** @internal */
export type SharedUnaryExpression =
    | SharedLeftHandSideExpression
    | SharedDeleteExpression
    | SharedTypeOfExpression
    | SharedVoidExpression
    | SharedAwaitExpression
    | SharedTypeAssertion
    ;

/** @internal */
export type SharedLeftHandSideExpression =
    | SharedMemberExpression
    | SharedCallExpression
    | SharedNewExpression
    | SharedNonNullExpression
    ;

/** @internal */
export type SharedMemberExpression =
    | SharedPrimaryExpression
    | SharedPropertyAccessExpression
    | SharedElementAccessExpression
    | SharedExpressionWithTypeArguments
    | SharedTaggedTemplateExpression
    ;

/** @internal */
export type SharedPrimaryExpression =
    | SharedToken<SyntaxKind.NullKeyword>
    | SharedToken<SyntaxKind.TrueKeyword>
    | SharedToken<SyntaxKind.FalseKeyword>
    | SharedToken<SyntaxKind.ThisKeyword>
    | SharedToken<SyntaxKind.SuperKeyword>
    | SharedToken<SyntaxKind.ImportKeyword>
    | SharedIdentifier
    | SharedPrivateIdentifier
    | SharedFunctionExpression
    | SharedClassExpression
    | SharedRegularExpressionLiteral
    | SharedNoSubstitutionTemplateLiteral
    | SharedStringLiteral
    | SharedNumericLiteral
    | SharedBigIntLiteral
    | SharedTemplateExpression
    | SharedParenthesizedExpression
    | SharedArrayLiteralExpression
    | SharedObjectLiteralExpression
    | SharedNewExpression
    | SharedMetaProperty
    | SharedJsxElement
    | SharedJsxAttributes
    | SharedJsxSelfClosingElement
    | SharedJsxFragment
    | SharedMissingDeclaration
    ;

/** @internal */
@Shared()
export class SharedOmittedExpression extends SharedNodeBase<SyntaxKind.OmittedExpression> {
    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.OmittedExpression;
    }
}

/** @internal */
@Shared()
export class SharedPrefixUnaryExpression extends SharedNodeBase<SyntaxKind.PrefixUnaryExpression> {
    @Shared() operator!: PrefixUnaryOperator;
    @Shared() operand!: SharedUnaryExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.PrefixUnaryExpression;
    }
}

/** @internal */
@Shared()
export class SharedPostfixUnaryExpression extends SharedNodeBase<SyntaxKind.PostfixUnaryExpression> {
    @Shared() operand!: SharedLeftHandSideExpression;
    @Shared() operator!: PostfixUnaryOperator;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.PostfixUnaryExpression;
    }
}

/** @internal */
@Shared()
export class SharedDeleteExpression extends SharedNodeBase<SyntaxKind.DeleteExpression> {
    @Shared() expression!: SharedUnaryExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.DeleteExpression;
    }
}

/** @internal */
@Shared()
export class SharedTypeOfExpression extends SharedNodeBase<SyntaxKind.TypeOfExpression> {
    @Shared() expression!: SharedUnaryExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.TypeOfExpression;
    }
}

/** @internal */
@Shared()
export class SharedVoidExpression extends SharedNodeBase<SyntaxKind.VoidExpression> {
    @Shared() expression!: SharedUnaryExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.VoidExpression;
    }
}

/** @internal */
@Shared()
export class SharedAwaitExpression extends SharedNodeBase<SyntaxKind.AwaitExpression> {
    @Shared() expression!: SharedUnaryExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.AwaitExpression;
    }
}

/** @internal */
@Shared()
export class SharedYieldExpression extends SharedNodeBase<SyntaxKind.YieldExpression> {
    @Shared() asteriskToken!: SharedToken<SyntaxKind.AsteriskToken> | undefined;
    @Shared() expression!: SharedExpression | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.YieldExpression;
    }
}

/** @internal */
@Shared()
export class SharedBinaryExpression extends HasSymbol(HasJSDoc(SharedNodeBase))<SyntaxKind.BinaryExpression> {
    @Shared() left!: SharedExpression;
    @Shared() operatorToken!: SharedToken<BinaryOperator>;
    @Shared() right!: SharedExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.BinaryExpression;
    }
}

/** @internal */
@Shared()
export class SharedConditionalExpression extends SharedNodeBase<SyntaxKind.ConditionalExpression> {
    @Shared() condition!: SharedExpression;
    @Shared() questionToken!: SharedToken<SyntaxKind.QuestionToken>;
    @Shared() whenTrue!: SharedExpression;
    @Shared() colonToken!: SharedToken<SyntaxKind.ColonToken>;
    @Shared() whenFalse!: SharedExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.ConditionalExpression;
    }
}

/** @internal */
export type SharedFunctionBody = SharedBlock;
/** @internal */
export type SharedConciseBody = SharedFunctionBody | SharedExpression;

/** @internal */
@Shared()
export class SharedFunctionExpression extends HasFunctionFlow(HasFlowNode(HasLocals(HasSymbol(HasJSDoc(SharedNodeBase)))))<SyntaxKind.FunctionExpression> {
    @Shared() modifiers!: SharedNodeArray<SharedModifier> | undefined;
    @Shared() asteriskToken!: SharedToken<SyntaxKind.AsteriskToken> | undefined;
    @Shared() name!: SharedIdentifier | undefined;
    @Shared() questionToken!: SharedToken<SyntaxKind.QuestionToken> | undefined;
    @Shared() exclamationToken!: SharedToken<SyntaxKind.ExclamationToken> | undefined;
    @Shared() typeParameters!: SharedNodeArray<SharedTypeParameterDeclaration> | undefined;
    @Shared() parameters!: SharedNodeArray<SharedParameterDeclaration>;
    @Shared() type!: SharedTypeNode | undefined;
    @Shared() body!: SharedFunctionBody;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.FunctionExpression;
    }
}

/** @internal */
@Shared()
export class SharedArrowFunction extends HasFunctionFlow(HasFlowNode(HasLocals(HasSymbol(HasJSDoc(SharedNodeBase)))))<SyntaxKind.ArrowFunction> {
    @Shared() modifiers!: SharedNodeArray<SharedModifier> | undefined;
    @Shared() equalsGreaterThanToken!: SharedToken<SyntaxKind.EqualsGreaterThanToken>;
    @Shared() typeParameters!: SharedNodeArray<SharedTypeParameterDeclaration> | undefined;
    @Shared() parameters!: SharedNodeArray<SharedParameterDeclaration>;
    @Shared() type!: SharedTypeNode | undefined;
    @Shared() body!: SharedConciseBody;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.ArrowFunction;
    }
}

/** @internal */
@Shared()
export class SharedRegularExpressionLiteral extends SharedNodeBase<SyntaxKind.RegularExpressionLiteral> {
    @Shared() text!: string;
    @Shared() isUnterminated!: boolean | undefined;
    @Shared() hasExtendedUnicodeEscape!: boolean | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.RegularExpressionLiteral;
    }
}

/** @internal */
@Shared()
export class SharedNoSubstitutionTemplateLiteral extends HasSymbol(SharedNodeBase)<SyntaxKind.NoSubstitutionTemplateLiteral> {
    @Shared() text!: string;
    @Shared() isUnterminated!: boolean | undefined;
    @Shared() hasExtendedUnicodeEscape!: boolean | undefined;
    @Shared() rawText!: string | undefined;
    @Shared() templateFlags!: TokenFlags | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.NoSubstitutionTemplateLiteral;
    }
}

/** @internal */
@Shared()
export class SharedNumericLiteral extends HasSymbol(SharedNodeBase)<SyntaxKind.NumericLiteral> {
    @Shared() text!: string;
    @Shared() isUnterminated!: boolean | undefined;
    @Shared() hasExtendedUnicodeEscape!: boolean | undefined;
    @Shared() numericLiteralFlags!: TokenFlags;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.NumericLiteral;
    }
}

/** @internal */
@Shared()
export class SharedBigIntLiteral extends SharedNodeBase<SyntaxKind.BigIntLiteral> {
    @Shared() text!: string;
    @Shared() isUnterminated!: boolean | undefined;
    @Shared() hasExtendedUnicodeEscape!: boolean | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.BigIntLiteral;
    }
}

/** @internal */
@Shared()
export class SharedTemplateHead extends SharedNodeBase<SyntaxKind.TemplateHead> {
    @Shared() text!: string;
    @Shared() isUnterminated!: boolean | undefined;
    @Shared() hasExtendedUnicodeEscape!: boolean | undefined;
    @Shared() rawText!: string | undefined;
    @Shared() templateFlags!: TokenFlags | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.TemplateHead;
    }
}

/** @internal */
@Shared()
export class SharedTemplateMiddle extends SharedNodeBase<SyntaxKind.TemplateMiddle> {
    @Shared() text!: string;
    @Shared() isUnterminated!: boolean | undefined;
    @Shared() hasExtendedUnicodeEscape!: boolean | undefined;
    @Shared() rawText!: string | undefined;
    @Shared() templateFlags!: TokenFlags | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.TemplateMiddle;
    }
}

/** @internal */
@Shared()
export class SharedTemplateTail extends SharedNodeBase<SyntaxKind.TemplateTail> {
    @Shared() text!: string;
    @Shared() isUnterminated!: boolean | undefined;
    @Shared() hasExtendedUnicodeEscape!: boolean | undefined;
    @Shared() rawText!: string | undefined;
    @Shared() templateFlags!: TokenFlags | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.TemplateTail;
    }
}

/** @internal */
@Shared()
export class SharedTemplateExpression extends SharedNodeBase<SyntaxKind.TemplateExpression> {
    @Shared() head!: SharedTemplateHead;
    @Shared() templateSpans!: SharedNodeArray<SharedTemplateSpan>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.TemplateExpression;
    }
}

/** @internal */
@Shared()
export class SharedTemplateSpan extends SharedNodeBase<SyntaxKind.TemplateSpan> {
    @Shared() expression!: SharedExpression;
    @Shared() literal!: SharedTemplateMiddle | SharedTemplateTail;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.TemplateSpan;
    }
}

/** @internal */
@Shared()
export class SharedParenthesizedExpression extends HasJSDoc(SharedNodeBase)<SyntaxKind.ParenthesizedExpression> {
    @Shared() expression!: SharedExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.ParenthesizedExpression;
    }
}

/** @internal */
@Shared()
export class SharedArrayLiteralExpression extends SharedNodeBase<SyntaxKind.ArrayLiteralExpression> {
    @Shared() elements!: SharedNodeArray<SharedExpression>;
    @Shared() multiLine!: boolean | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.ArrayLiteralExpression;
    }
}

/** @internal */
@Shared()
export class SharedSpreadElement extends SharedNodeBase<SyntaxKind.SpreadElement> {
    @Shared() expression!: SharedExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.SpreadElement;
    }
}

/** @internal */
export type SharedObjectLiteralElement =
    | SharedPropertyAssignment
    | SharedShorthandPropertyAssignment
    | SharedSpreadAssignment
    | SharedMethodDeclaration
    | SharedAccessorDeclaration
    ;

/** @internal */
@Shared()
export class SharedObjectLiteralExpression extends HasSymbol(HasJSDoc(SharedNodeBase))<SyntaxKind.ObjectLiteralExpression> {
    @Shared() properties!: SharedNodeArray<SharedObjectLiteralElement>;
    @Shared() multiLine!: boolean | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.ObjectLiteralExpression;
    }
}

/** @internal */
@Shared()
export class SharedPropertyAccessExpression extends HasFlowNode(HasSymbol(HasJSDoc(SharedNodeBase)))<SyntaxKind.PropertyAccessExpression> {
    @Shared() expression!: SharedLeftHandSideExpression;
    @Shared() questionDotToken!: SharedToken<SyntaxKind.QuestionDotToken> | undefined;
    @Shared() name!: SharedMemberName;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.PropertyAccessExpression;
    }
}

/** @internal */
@Shared()
export class SharedElementAccessExpression extends HasFlowNode(HasSymbol(HasJSDoc(SharedNodeBase)))<SyntaxKind.ElementAccessExpression> {
    @Shared() expression!: SharedLeftHandSideExpression;
    @Shared() questionDotToken!: SharedToken<SyntaxKind.QuestionDotToken> | undefined;
    @Shared() argumentExpression!: SharedExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.ElementAccessExpression;
    }
}

/** @internal */
@Shared()
export class SharedCallExpression extends HasSymbol(SharedNodeBase)<SyntaxKind.CallExpression> {
    @Shared() expression!: SharedLeftHandSideExpression;
    @Shared() questionDotToken!: SharedToken<SyntaxKind.QuestionDotToken> | undefined;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;
    @Shared() arguments!: SharedNodeArray<SharedExpression>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.CallExpression;
    }
}

/** @internal */
@Shared()
export class SharedExpressionWithTypeArguments extends SharedNodeBase<SyntaxKind.ExpressionWithTypeArguments> {
    @Shared() expression!: SharedLeftHandSideExpression;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.ExpressionWithTypeArguments;
    }
}

/** @internal */
@Shared()
export class SharedNewExpression extends HasSymbol(SharedNodeBase)<SyntaxKind.NewExpression> {
    @Shared() expression!: SharedLeftHandSideExpression;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;
    @Shared() arguments!: SharedNodeArray<SharedExpression> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.NewExpression;
    }
}

/** @internal */
export type SharedTemplateLiteral =
    | SharedTemplateExpression
    | SharedNoSubstitutionTemplateLiteral
    ;

/** @internal */
@Shared()
export class SharedTaggedTemplateExpression extends SharedNodeBase<SyntaxKind.TaggedTemplateExpression> {
    @Shared() tag!: SharedLeftHandSideExpression;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;
    @Shared() template!: SharedTemplateLiteral;
    @Shared() questionDotToken!: SharedToken<SyntaxKind.QuestionDotToken> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.TaggedTemplateExpression;
    }
}

/** @internal */
@Shared()
export class SharedAsExpression extends SharedNodeBase<SyntaxKind.AsExpression> {
    @Shared() expression!: SharedExpression;
    @Shared() type!: SharedTypeNode;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.AsExpression;
    }
}

/** @internal */
@Shared()
export class SharedTypeAssertion extends SharedNodeBase<SyntaxKind.TypeAssertionExpression> {
    @Shared() type!: SharedTypeNode;
    @Shared() expression!: SharedUnaryExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.TypeAssertionExpression;
    }
}

/** @internal */
@Shared()
export class SharedSatisfiesExpression extends SharedNodeBase<SyntaxKind.SatisfiesExpression> {
    @Shared() expression!: SharedExpression;
    @Shared() type!: SharedTypeNode;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.SatisfiesExpression;
    }
}

/** @internal */
@Shared()
export class SharedNonNullExpression extends SharedNodeBase<SyntaxKind.NonNullExpression> {
    @Shared() expression!: SharedExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.NonNullExpression;
    }
}

/** @internal */
@Shared()
export class SharedMetaProperty extends HasFlowNode(SharedNodeBase)<SyntaxKind.MetaProperty> {
    @Shared() keywordToken!: SyntaxKind.NewKeyword | SyntaxKind.ImportKeyword;
    @Shared() name!: SharedIdentifier;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.MetaProperty;
    }
}

/** @internal */
@Shared()
export class SharedJsxElement extends SharedNodeBase<SyntaxKind.JsxElement> {
    @Shared() openingElement!: SharedJsxOpeningElement;
    @Shared() children!: SharedNodeArray<SharedJsxChild>;
    @Shared() closingElement!: SharedJsxClosingElement;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JsxElement;
    }
}

/** @internal */
export type SharedJsxOpeningLikeElement =
    | SharedJsxSelfClosingElement
    | SharedJsxOpeningElement
    ;

/** @internal */
export type SharedJsxAttributeLike =
    | SharedJsxAttribute
    | SharedJsxSpreadAttribute
    ;

/** @internal */
export type SharedJsxAttributeName =
    | SharedIdentifier
    | SharedJsxNamespacedName
    ;

/** @internal */
export type SharedJsxTagNameExpression =
    | SharedIdentifier
    | SharedToken<SyntaxKind.ThisKeyword>
    | SharedPropertyAccessExpression
    | SharedJsxNamespacedName
    ;

/** @internal */
@Shared()
export class SharedJsxAttributes extends HasSymbol(SharedNodeBase)<SyntaxKind.JsxAttributes> {
    @Shared() properties!: SharedNodeArray<SharedJsxAttributeLike>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JsxAttributes;
    }
}

/** @internal */
@Shared()
export class SharedJsxNamespacedName extends SharedNodeBase<SyntaxKind.JsxNamespacedName> {
    @Shared() name!: SharedIdentifier;
    @Shared() namespace!: SharedIdentifier;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JsxNamespacedName;
    }
}

/** @internal */
@Shared()
export class SharedJsxOpeningElement extends SharedNodeBase<SyntaxKind.JsxOpeningElement> {
    @Shared() tagName!: SharedJsxTagNameExpression;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;
    @Shared() attributes!: SharedJsxAttributes;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JsxOpeningElement;
    }
}

/** @internal */
@Shared()
export class SharedJsxSelfClosingElement extends SharedNodeBase<SyntaxKind.JsxSelfClosingElement> {
    @Shared() tagName!: SharedJsxTagNameExpression;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;
    @Shared() attributes!: SharedJsxAttributes;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JsxSelfClosingElement;
    }
}

/** @internal */
@Shared()
export class SharedJsxFragment extends SharedNodeBase<SyntaxKind.JsxFragment> {
    @Shared() openingFragment!: SharedJsxOpeningFragment;
    @Shared() children!: SharedNodeArray<SharedJsxChild>;
    @Shared() closingFragment!: SharedJsxClosingFragment;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JsxFragment;
    }
}

/** @internal */
@Shared()
export class SharedJsxOpeningFragment extends SharedNodeBase<SyntaxKind.JsxOpeningFragment> {
    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JsxOpeningFragment;
    }
}

/** @internal */
@Shared()
export class SharedJsxClosingFragment extends SharedNodeBase<SyntaxKind.JsxClosingFragment> {
    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JsxClosingFragment;
    }
}

/** @internal */
@Shared()
export class SharedJsxAttribute extends HasSymbol(SharedNodeBase)<SyntaxKind.JsxAttribute> {
    @Shared() name!: SharedJsxAttributeName;
    @Shared() initializer!: SharedJsxAttributeValue | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JsxAttribute;
    }
}

/** @internal */
export type SharedJsxAttributeValue =
    | SharedStringLiteral
    | SharedJsxExpression
    | SharedJsxElement
    | SharedJsxSelfClosingElement
    | SharedJsxFragment;

/** @internal */
@Shared()
export class SharedJsxSpreadAttribute extends SharedNodeBase<SyntaxKind.JsxSpreadAttribute> {
    @Shared() expression!: SharedExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JsxSpreadAttribute;
    }
}

/** @internal */
@Shared()
export class SharedJsxClosingElement extends SharedNodeBase<SyntaxKind.JsxClosingElement> {
    @Shared() tagName!: SharedJsxTagNameExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JsxClosingElement;
    }
}

/** @internal */
@Shared()
export class SharedJsxExpression extends SharedNodeBase<SyntaxKind.JsxExpression> {
    @Shared() dotDotDotToken!: SharedToken<SyntaxKind.DotDotDotToken> | undefined;
    @Shared() expression!: SharedExpression | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JsxExpression;
    }
}

/** @internal */
@Shared()
export class SharedJsxText extends SharedNodeBase<SyntaxKind.JsxText> {
    @Shared() text!: string;
    @Shared() isUnterminated!: boolean | undefined;
    @Shared() hasExtendedUnicodeEscape!: boolean | undefined;
    @Shared() containsOnlyTriviaWhiteSpaces!: boolean;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JsxText;
    }
}

/** @internal */
export type SharedJsxChild =
    | SharedJsxText
    | SharedJsxExpression
    | SharedJsxElement
    | SharedJsxSelfClosingElement
    | SharedJsxFragment
    ;

/** @internal */
export type SharedDeclaration =
    | never
    ;

/** @internal */
export type SharedStatement =
    | SharedEmptyStatement
    | SharedDebuggerStatement
    | SharedMissingDeclaration
    | SharedBlock
    | SharedVariableStatement
    | SharedExpressionStatement
    | SharedIfStatement
    | SharedIterationStatement
    | SharedBreakStatement
    | SharedContinueStatement
    | SharedReturnStatement
    | SharedWithStatement
    | SharedSwitchStatement
    | SharedLabeledStatement
    | SharedThrowStatement
    | SharedTryStatement
    | SharedFunctionDeclaration
    | SharedClassDeclaration
    | SharedInterfaceDeclaration
    | SharedTypeAliasDeclaration
    | SharedEnumDeclaration
    | SharedModuleDeclaration
    | SharedModuleBlock
    | SharedImportEqualsDeclaration
    | SharedImportDeclaration
    | SharedNamespaceExportDeclaration
    | SharedExportDeclaration
    | SharedExportAssignment
    ;

/** @internal */
export type SharedIterationStatement =
    | SharedDoStatement
    | SharedWhileStatement
    | SharedForStatement
    | SharedForInOrOfStatement
    ;

/** @internal */
@Shared()
export class SharedEmptyStatement extends HasJSDoc(SharedNodeBase)<SyntaxKind.EmptyStatement> {
    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.EmptyStatement;
    }
}

/** @internal */
@Shared()
export class SharedDebuggerStatement extends HasFlowNode(HasJSDoc(SharedNodeBase))<SyntaxKind.DebuggerStatement> {
    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.DebuggerStatement;
    }
}

/** @internal */
@Shared()
export class SharedMissingDeclaration extends HasSymbol(HasJSDoc(SharedNodeBase))<SyntaxKind.MissingDeclaration> {
    @Shared() name!: SharedIdentifier | undefined;
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.MissingDeclaration;
    }
}

/** @internal */
@Shared()
export class SharedBlock extends HasLocals(HasJSDoc(SharedNodeBase))<SyntaxKind.Block> {
    @Shared() statements!: SharedNodeArray<SharedStatement>;
    @Shared() multiLine!: boolean | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.Block;
    }
}

/** @internal */
@Shared()
export class SharedVariableStatement extends HasFlowNode(HasJSDoc(SharedNodeBase))<SyntaxKind.VariableStatement> {
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;
    @Shared() declarationList!: SharedVariableDeclarationList;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.VariableStatement;
    }
}

/** @internal */
@Shared()
export class SharedExpressionStatement extends HasFlowNode(HasJSDoc(SharedNodeBase))<SyntaxKind.ExpressionStatement> {
    @Shared() expression!: SharedExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.ExpressionStatement;
    }
}

/** @internal */
@Shared()
export class SharedIfStatement extends HasFlowNode(HasJSDoc(SharedNodeBase))<SyntaxKind.IfStatement> {
    @Shared() expression!: SharedExpression;
    @Shared() thenStatement!: SharedStatement;
    @Shared() elseStatement!: SharedStatement | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.IfStatement;
    }
}

/** @internal */
@Shared()
export class SharedDoStatement extends HasFlowNode(HasJSDoc(SharedNodeBase))<SyntaxKind.DoStatement> {
    @Shared() statement!: SharedStatement;
    @Shared() expression!: SharedExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.DoStatement;
    }
}

/** @internal */
@Shared()
export class SharedWhileStatement extends HasFlowNode(HasJSDoc(SharedNodeBase))<SyntaxKind.WhileStatement> {
    @Shared() expression!: SharedExpression;
    @Shared() statement!: SharedStatement;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.WhileStatement;
    }
}

/** @internal */
export type SharedForInitializer =
    | SharedVariableDeclarationList
    | SharedExpression
    ;

/** @internal */
@Shared()
export class SharedForStatement extends HasFlowNode(HasLocals(HasJSDoc(SharedNodeBase)))<SyntaxKind.ForStatement> {
    @Shared() initializer!: SharedForInitializer | undefined;
    @Shared() condition!: SharedExpression | undefined;
    @Shared() incrementor!: SharedExpression | undefined;
    @Shared() statement!: SharedStatement;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.ForStatement;
    }
}

/** @internal */
export type SharedForInOrOfStatement =
    | SharedForInStatement
    | SharedForOfStatement
    ;

/** @internal */
@Shared()
export class SharedForInStatement extends HasFlowNode(HasLocals(HasJSDoc(SharedNodeBase)))<SyntaxKind.ForInStatement> {
    @Shared() initializer!: SharedForInitializer;
    @Shared() expression!: SharedExpression;
    @Shared() statement!: SharedStatement;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.ForInStatement;
    }
}

/** @internal */
@Shared()
export class SharedForOfStatement extends HasFlowNode(HasLocals(HasJSDoc(SharedNodeBase)))<SyntaxKind.ForOfStatement> {
    @Shared() awaitModifier!: SharedToken<SyntaxKind.AwaitKeyword> | undefined;
    @Shared() initializer!: SharedForInitializer;
    @Shared() expression!: SharedExpression;
    @Shared() statement!: SharedStatement;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.ForOfStatement;
    }
}

/** @internal */
@Shared()
export class SharedBreakStatement extends HasFlowNode(HasJSDoc(SharedNodeBase))<SyntaxKind.BreakStatement> {
    @Shared() label!: SharedIdentifier | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.BreakStatement;
    }
}

/** @internal */
@Shared()
export class SharedContinueStatement extends HasFlowNode(HasJSDoc(SharedNodeBase))<SyntaxKind.ContinueStatement> {
    @Shared() label!: SharedIdentifier | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.ContinueStatement;
    }
}

/** @internal */
@Shared()
export class SharedReturnStatement extends HasFlowNode(HasJSDoc(SharedNodeBase))<SyntaxKind.ReturnStatement> {
    @Shared() expression!: SharedExpression | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.ReturnStatement;
    }
}

/** @internal */
@Shared()
export class SharedWithStatement extends HasFlowNode(HasJSDoc(SharedNodeBase))<SyntaxKind.WithStatement> {
    @Shared() expression!: SharedExpression;
    @Shared() statement!: SharedStatement;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.WithStatement;
    }
}

/** @internal */
@Shared()
export class SharedSwitchStatement extends HasFlowNode(HasJSDoc(SharedNodeBase))<SyntaxKind.SwitchStatement> {
    @Shared() expression!: SharedExpression;
    @Shared() caseBlock!: SharedCaseBlock;
    @Shared() possiblyExhaustive!: boolean;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.SwitchStatement;
    }
}

/** @internal */
@Shared()
export class SharedCaseBlock extends HasLocals(SharedNodeBase)<SyntaxKind.CaseBlock> {
    @Shared() clauses!: SharedNodeArray<SharedCaseOrDefaultClause>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.CaseBlock;
    }
}

/** @internal */
@Shared()
export class SharedCaseClause extends HasJSDoc(SharedNodeBase)<SyntaxKind.CaseClause> {
    @Shared() expression!: SharedExpression;
    @Shared() statements!: SharedNodeArray<SharedStatement>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.CaseClause;
    }
}

/** @internal */
@Shared()
export class SharedDefaultClause extends SharedNodeBase<SyntaxKind.DefaultClause> {
    @Shared() statements!: SharedNodeArray<SharedStatement>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.DefaultClause;
    }
}

/** @internal */
export type SharedCaseOrDefaultClause =
    | SharedCaseClause
    | SharedDefaultClause
    ;

/** @internal */
@Shared()
export class SharedLabeledStatement extends HasFlowNode(HasJSDoc(SharedNodeBase))<SyntaxKind.LabeledStatement> {
    @Shared() label!: SharedIdentifier;
    @Shared() statement!: SharedStatement;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.LabeledStatement;
    }
}

/** @internal */
@Shared()
export class SharedThrowStatement extends HasFlowNode(HasJSDoc(SharedNodeBase))<SyntaxKind.ThrowStatement> {
    @Shared() expression!: SharedExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.ThrowStatement;
    }
}

/** @internal */
@Shared()
export class SharedTryStatement extends HasFlowNode(HasJSDoc(SharedNodeBase))<SyntaxKind.TryStatement> {
    @Shared() tryBlock!: SharedBlock;
    @Shared() catchClause!: SharedCatchClause | undefined;
    @Shared() finallyBlock!: SharedBlock | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.TryStatement;
    }
}

/** @internal */
@Shared()
export class SharedCatchClause extends HasLocals(SharedNodeBase)<SyntaxKind.CatchClause> {
    @Shared() variableDeclaration!: SharedVariableDeclaration | undefined;
    @Shared() block!: SharedBlock;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.CatchClause;
    }
}

/** @internal */
export type SharedClassElement =
    | SharedPropertyDeclaration
    | SharedMethodDeclaration
    | SharedConstructorDeclaration
    | SharedSemicolonClassElement
    | SharedAccessorDeclaration
    | SharedIndexSignatureDeclaration
    | SharedClassStaticBlockDeclaration
    ;

/** @internal */
@Shared()
export class SharedClassDeclaration extends HasSymbol(HasJSDoc(SharedNodeBase))<SyntaxKind.ClassDeclaration> {
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;
    @Shared() name!: SharedIdentifier | undefined;
    @Shared() typeParameters!: SharedNodeArray<SharedTypeParameterDeclaration> | undefined;
    @Shared() heritageClauses!: SharedNodeArray<SharedHeritageClause> | undefined;
    @Shared() members!: SharedNodeArray<SharedClassElement>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.ClassDeclaration;
    }
}

/** @internal */
@Shared()
export class SharedClassExpression extends HasSymbol(HasJSDoc(SharedNodeBase))<SyntaxKind.ClassExpression> {
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;
    @Shared() name!: SharedIdentifier | undefined;
    @Shared() typeParameters!: SharedNodeArray<SharedTypeParameterDeclaration> | undefined;
    @Shared() heritageClauses!: SharedNodeArray<SharedHeritageClause> | undefined;
    @Shared() members!: SharedNodeArray<SharedClassElement>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.ClassExpression;
    }
}

/** @internal */
export type SharedTypeElement =
    | SharedCallSignatureDeclaration
    | SharedConstructSignatureDeclaration
    | SharedMethodSignature
    | SharedIndexSignatureDeclaration
    | SharedPropertySignature
    | SharedAccessorDeclaration
    ;

/** @internal */
@Shared()
export class SharedInterfaceDeclaration extends HasSymbol(HasJSDoc(SharedNodeBase))<SyntaxKind.InterfaceDeclaration> {
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;
    @Shared() name!: SharedIdentifier;
    @Shared() typeParameters!: SharedNodeArray<SharedTypeParameterDeclaration> | undefined;
    @Shared() heritageClauses!: SharedNodeArray<SharedHeritageClause> | undefined;
    @Shared() members!: SharedNodeArray<SharedTypeElement>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.InterfaceDeclaration;
    }
}

/** @internal */
@Shared()
export class SharedHeritageClause extends SharedNodeBase<SyntaxKind.HeritageClause> {
    @Shared() token!: SyntaxKind.ExtendsKeyword | SyntaxKind.ImplementsKeyword;
    @Shared() types!: SharedNodeArray<SharedExpressionWithTypeArguments>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.HeritageClause;
    }
}

/** @internal */
@Shared()
export class SharedTypeAliasDeclaration extends HasLocals(HasSymbol(HasJSDoc(SharedNodeBase)))<SyntaxKind.TypeAliasDeclaration> {
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;
    @Shared() name!: SharedIdentifier;
    @Shared() typeParameters!: SharedNodeArray<SharedTypeParameterDeclaration> | undefined;
    @Shared() type!: SharedTypeNode;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.TypeAliasDeclaration;
    }
}

/** @internal */
@Shared()
export class SharedEnumMember extends HasSymbol(HasJSDoc(SharedNodeBase))<SyntaxKind.EnumMember> {
    @Shared() name!: SharedPropertyName;
    @Shared() initializer!: SharedExpression | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.EnumMember;
    }
}

/** @internal */
@Shared()
export class SharedEnumDeclaration extends HasSymbol(HasJSDoc(SharedNodeBase))<SyntaxKind.EnumDeclaration> {
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;
    @Shared() name!: SharedIdentifier;
    @Shared() members!: SharedNodeArray<SharedEnumMember>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.EnumDeclaration;
    }
}

/** @internal */
export type SharedModuleName =
    | SharedIdentifier
    | SharedStringLiteral
    ;

/** @internal */
export type SharedModuleBody =
    | SharedNamespaceBody
    | SharedJSDocNamespaceBody
    ;

/** @internal */
@Shared()
export class SharedModuleDeclaration extends HasLocals(HasSymbol(HasJSDoc(SharedNodeBase)))<SyntaxKind.ModuleDeclaration> {
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;
    @Shared() name!: SharedModuleName;
    @Shared() body!: SharedModuleBody | SharedJSDocNamespaceDeclaration | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.ModuleDeclaration;
    }
}

/** @internal */
export type SharedNamespaceBody =
    | SharedModuleBlock
    | SharedNamespaceDeclaration
    ;

/** @internal */
export interface SharedNamespaceDeclaration extends SharedModuleDeclaration {
    readonly name: SharedIdentifier;
    readonly body: SharedNamespaceBody;
}

/** @internal */
export type SharedJSDocNamespaceBody =
    | SharedIdentifier
    | SharedJSDocNamespaceDeclaration
    ;

/** @internal */
export interface SharedJSDocNamespaceDeclaration extends SharedModuleDeclaration {
    readonly name: SharedIdentifier;
    readonly body: SharedJSDocNamespaceBody | undefined;
}

/** @internal */
@Shared()
export class SharedModuleBlock extends HasJSDoc(SharedNodeBase)<SyntaxKind.ModuleBlock> {
    @Shared() statements!: SharedNodeArray<SharedStatement>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.ModuleBlock;
    }
}

/** @internal */
export type SharedModuleReference =
    | SharedEntityName
    | SharedExternalModuleReference
    ;

/** @internal */
@Shared()
export class SharedImportEqualsDeclaration extends HasSymbol(HasJSDoc(SharedNodeBase))<SyntaxKind.ImportEqualsDeclaration> {
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;
    @Shared() name!: SharedIdentifier;
    @Shared() isTypeOnly!: boolean;
    @Shared() moduleReference!: SharedModuleReference;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.ImportEqualsDeclaration;
    }
}

/** @internal */
@Shared()
export class SharedExternalModuleReference extends SharedNodeBase<SyntaxKind.ExternalModuleReference> {
    @Shared() expression!: SharedExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.ExternalModuleReference;
    }
}

/** @internal */
@Shared()
export class SharedImportDeclaration extends HasSymbol(HasJSDoc(SharedNodeBase))<SyntaxKind.ImportDeclaration> {
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;
    @Shared() importClause!: SharedImportClause | undefined;
    @Shared() moduleSpecifier!: SharedExpression;
    @Shared() assertClause!: SharedAssertClause | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.ImportDeclaration;
    }
}

/** @internal */
export type SharedNamedImportBindings =
    | SharedNamespaceImport
    | SharedNamedImports
    ;

/** @internal */
export type SharedNamedExportBindings =
    | SharedNamespaceExport
    | SharedNamedExports
    ;

/** @internal */
@Shared()
export class SharedImportClause extends HasSymbol(SharedNodeBase)<SyntaxKind.ImportClause> {
    @Shared() isTypeOnly!: boolean;
    @Shared() name!: SharedIdentifier | undefined;
    @Shared() namedBindings!: SharedNamedImportBindings | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.ImportClause;
    }
}

/** @internal */
export type SharedAssertionKey =
    | SharedIdentifier
    | SharedStringLiteral
    ;

/** @internal */
@Shared()
export class SharedAssertEntry extends SharedNodeBase<SyntaxKind.AssertEntry> {
    @Shared() name!: SharedAssertionKey;
    @Shared() value!: SharedExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.AssertEntry;
    }
}

/** @internal */
@Shared()
export class SharedAssertClause extends SharedNodeBase<SyntaxKind.AssertClause> {
    @Shared() elements!: SharedNodeArray<SharedAssertEntry>;
    @Shared() multiLine!: boolean | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.AssertClause;
    }
}

/** @internal */
@Shared()
export class SharedNamespaceImport extends HasSymbol(SharedNodeBase)<SyntaxKind.NamespaceImport> {
    @Shared() name!: SharedIdentifier;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.NamespaceImport;
    }
}

/** @internal */
@Shared()
export class SharedNamespaceExport extends HasSymbol(SharedNodeBase)<SyntaxKind.NamespaceExport> {
    @Shared() name!: SharedIdentifier;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.NamespaceExport;
    }
}

/** @internal */
@Shared()
export class SharedNamespaceExportDeclaration extends HasSymbol(HasJSDoc(SharedNodeBase))<SyntaxKind.NamespaceExportDeclaration> {
    @Shared() name!: SharedIdentifier;
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.NamespaceExportDeclaration;
    }
}

/** @internal */
@Shared()
export class SharedExportDeclaration extends HasSymbol(HasJSDoc(SharedNodeBase))<SyntaxKind.ExportDeclaration> {
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;
    @Shared() isTypeOnly!: boolean;
    @Shared() exportClause!: SharedNamedExportBindings | undefined;
    @Shared() moduleSpecifier!: SharedExpression | undefined;
    @Shared() assertClause!: SharedAssertClause | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.ExportDeclaration;
    }
}

/** @internal */
@Shared()
export class SharedNamedImports extends SharedNodeBase<SyntaxKind.NamedImports> {
    @Shared() elements!: SharedNodeArray<SharedImportSpecifier>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.NamedImports;
    }
}

/** @internal */
@Shared()
export class SharedNamedExports extends SharedNodeBase<SyntaxKind.NamedExports> {
    @Shared() elements!: SharedNodeArray<SharedExportSpecifier>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.NamedExports;
    }
}

/** @internal */
@Shared()
export class SharedImportSpecifier extends HasSymbol(SharedNodeBase)<SyntaxKind.ImportSpecifier> {
    @Shared() propertyName!: SharedIdentifier | undefined;
    @Shared() name!: SharedIdentifier;
    @Shared() isTypeOnly!: boolean;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.ImportSpecifier;
    }
}

/** @internal */
@Shared()
export class SharedExportSpecifier extends HasJSDoc(SharedNodeBase)<SyntaxKind.ExportSpecifier> {
    @Shared() isTypeOnly!: boolean;
    @Shared() propertyName!: SharedIdentifier | undefined;
    @Shared() name!: SharedIdentifier;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.ExportSpecifier;
    }
}

/** @internal */
@Shared()
export class SharedExportAssignment extends HasSymbol(HasJSDoc(SharedNodeBase))<SyntaxKind.ExportAssignment> {
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;
    @Shared() isExportEquals!: boolean | undefined;
    @Shared() expression!: SharedExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.ExportAssignment;
    }
}

/** @internal */
@Shared()
export class SharedJSDocTypeExpression extends SharedNodeBase<SyntaxKind.JSDocTypeExpression> {
    @Shared() type!: SharedTypeNode;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDocTypeExpression;
    }
}

/** @internal */
@Shared()
export class SharedJSDocNameReference extends SharedNodeBase<SyntaxKind.JSDocNameReference> {
    @Shared() name!: SharedEntityName | SharedJSDocMemberName;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDocNameReference;
    }
}

/** @internal */
@Shared()
export class SharedJSDocMemberName extends SharedNodeBase<SyntaxKind.JSDocMemberName> {
    @Shared() left!: SharedEntityName | SharedJSDocMemberName;
    @Shared() right!: SharedIdentifier;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDocMemberName;
    }
}

/** @internal */
export type SharedJSDocType =
    | SharedJSDocAllType
    | SharedJSDocUnknownType
    | SharedJSDocNonNullableType
    | SharedJSDocNullableType
    | SharedJSDocOptionalType
    | SharedJSDocFunctionType
    | SharedJSDocVariadicType
    | SharedJSDocNamepathType
    ;

/** @internal */
@Shared()
export class SharedJSDocAllType extends SharedNodeBase<SyntaxKind.JSDocAllType> {

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDocAllType;
    }
}

/** @internal */
@Shared()
export class SharedJSDocUnknownType extends SharedNodeBase<SyntaxKind.JSDocUnknownType> {

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDocUnknownType;
    }
}

/** @internal */
@Shared()
export class SharedJSDocNonNullableType extends SharedNodeBase<SyntaxKind.JSDocNonNullableType> {
    @Shared() type!: SharedTypeNode;
    @Shared() postfix!: boolean;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDocNonNullableType;
    }
}

/** @internal */
@Shared()
export class SharedJSDocNullableType extends SharedNodeBase<SyntaxKind.JSDocNullableType> {
    @Shared() type!: SharedTypeNode;
    @Shared() postfix!: boolean;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDocNullableType;
    }
}

/** @internal */
@Shared()
export class SharedJSDocOptionalType extends SharedNodeBase<SyntaxKind.JSDocOptionalType> {
    @Shared() type!: SharedTypeNode;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDocOptionalType;
    }
}

/** @internal */
@Shared()
export class SharedJSDocFunctionType extends HasLocals(HasSymbol(SharedNodeBase))<SyntaxKind.JSDocFunctionType> {
    @Shared() typeParameters!: SharedNodeArray<SharedTypeParameterDeclaration> | undefined;
    @Shared() parameters!: SharedNodeArray<SharedParameterDeclaration>;
    @Shared() type!: SharedTypeNode | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDocFunctionType;
    }
}

/** @internal */
@Shared()
export class SharedJSDocVariadicType extends SharedNodeBase<SyntaxKind.JSDocVariadicType> {
    @Shared() type!: SharedTypeNode;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDocVariadicType;
    }
}

/** @internal */
@Shared()
export class SharedJSDocNamepathType extends SharedNodeBase<SyntaxKind.JSDocNamepathType> {
    @Shared() type!: SharedTypeNode;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDocNamepathType;
    }
}

/** @internal */
@Shared()
export class SharedJSDocNode extends SharedNodeBase<SyntaxKind.JSDoc> {
    @Shared() tags!: SharedNodeArray<SharedJSDocTag> | undefined;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDoc;
    }
}

/** @internal */
export type SharedJSDocTag =
    | SharedJSDocUnknownTag
    | SharedJSDocAugmentsTag
    | SharedJSDocImplementsTag
    | SharedJSDocAuthorTag
    | SharedJSDocDeprecatedTag
    | SharedJSDocClassTag
    | SharedJSDocPublicTag
    | SharedJSDocPrivateTag
    | SharedJSDocProtectedTag
    | SharedJSDocReadonlyTag
    | SharedJSDocOverrideTag
    | SharedJSDocEnumTag
    | SharedJSDocThisTag
    | SharedJSDocTemplateTag
    | SharedJSDocSeeTag
    | SharedJSDocReturnTag
    | SharedJSDocTypeTag
    | SharedJSDocTypedefTag
    | SharedJSDocCallbackTag
    | SharedJSDocOverloadTag
    | SharedJSDocThrowsTag
    | SharedJSDocPropertyTag
    | SharedJSDocParameterTag
    | SharedJSDocSatisfiesTag
    ;

/** @internal */
@Shared()
export class SharedJSDocLink extends SharedNodeBase<SyntaxKind.JSDocLink> {
    @Shared() name!: SharedEntityName | SharedJSDocMemberName | undefined;
    @Shared() text!: string;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDocLink;
    }
}

/** @internal */
@Shared()
export class SharedJSDocLinkCode extends SharedNodeBase<SyntaxKind.JSDocLinkCode> {
    @Shared() name!: SharedEntityName | SharedJSDocMemberName | undefined;
    @Shared() text!: string;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDocLinkCode;
    }
}

/** @internal */
@Shared()
export class SharedJSDocLinkPlain extends SharedNodeBase<SyntaxKind.JSDocLinkPlain> {
    @Shared() name!: SharedEntityName | SharedJSDocMemberName | undefined;
    @Shared() text!: string;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDocLinkPlain;
    }
}

/** @internal */
export type SharedJSDocComment =
    | SharedJSDocText
    | SharedJSDocLink
    | SharedJSDocLinkCode
    | SharedJSDocLinkPlain
    ;

/** @internal */
@Shared()
export class SharedJSDocText extends SharedNodeBase<SyntaxKind.JSDocText> {
    @Shared() text!: string;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDocText;
    }
}

/** @internal */
@Shared()
export class SharedJSDocUnknownTag extends SharedNodeBase<SyntaxKind.JSDocTag> {
    @Shared() tagName!: SharedIdentifier;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDocTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocAugmentsTag extends SharedNodeBase<SyntaxKind.JSDocAugmentsTag> {
    @Shared() class!: SharedExpressionWithTypeArguments & { readonly expression: SharedIdentifier | SharedPropertyAccessExpression };
    @Shared() tagName!: SharedIdentifier;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDocAugmentsTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocImplementsTag extends SharedNodeBase<SyntaxKind.JSDocImplementsTag> {
    @Shared() class!: SharedExpressionWithTypeArguments & { readonly expression: SharedIdentifier | SharedPropertyAccessExpression };
    @Shared() tagName!: SharedIdentifier;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDocImplementsTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocAuthorTag extends SharedNodeBase<SyntaxKind.JSDocAuthorTag> {
    @Shared() tagName!: SharedIdentifier;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDocAuthorTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocDeprecatedTag extends SharedNodeBase<SyntaxKind.JSDocDeprecatedTag> {
    @Shared() tagName!: SharedIdentifier;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDocDeprecatedTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocClassTag extends SharedNodeBase<SyntaxKind.JSDocClassTag> {
    @Shared() tagName!: SharedIdentifier;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDocClassTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocPublicTag extends SharedNodeBase<SyntaxKind.JSDocPublicTag> {
    @Shared() tagName!: SharedIdentifier;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDocPublicTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocPrivateTag extends SharedNodeBase<SyntaxKind.JSDocPrivateTag> {
    @Shared() tagName!: SharedIdentifier;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDocPrivateTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocProtectedTag extends SharedNodeBase<SyntaxKind.JSDocProtectedTag> {
    @Shared() tagName!: SharedIdentifier;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDocProtectedTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocReadonlyTag extends SharedNodeBase<SyntaxKind.JSDocReadonlyTag> {
    @Shared() tagName!: SharedIdentifier;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDocReadonlyTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocOverrideTag extends SharedNodeBase<SyntaxKind.JSDocOverrideTag> {
    @Shared() tagName!: SharedIdentifier;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDocOverrideTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocEnumTag extends HasLocals(HasSymbol(SharedNodeBase))<SyntaxKind.JSDocEnumTag> {
    @Shared() tagName!: SharedIdentifier;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;
    @Shared() typeExpression!: SharedJSDocTypeExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDocEnumTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocThisTag extends SharedNodeBase<SyntaxKind.JSDocThisTag> {
    @Shared() typeExpression!: SharedJSDocTypeExpression;
    @Shared() tagName!: SharedIdentifier;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDocThisTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocTemplateTag extends SharedNodeBase<SyntaxKind.JSDocTemplateTag> {
    @Shared() tagName!: SharedIdentifier;
    @Shared() constraint!: SharedJSDocTypeExpression | undefined;
    @Shared() typeParameters!: SharedNodeArray<SharedTypeParameterDeclaration>;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDocTemplateTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocSeeTag extends SharedNodeBase<SyntaxKind.JSDocSeeTag> {
    @Shared() tagName!: SharedIdentifier;
    @Shared() name!: SharedJSDocNameReference | undefined;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDocSeeTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocReturnTag extends SharedNodeBase<SyntaxKind.JSDocReturnTag> {
    @Shared() tagName!: SharedIdentifier;
    @Shared() typeExpression!: SharedJSDocTypeExpression | undefined;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDocReturnTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocTypeTag extends SharedNodeBase<SyntaxKind.JSDocTypeTag> {
    @Shared() tagName!: SharedIdentifier;
    @Shared() typeExpression!: SharedJSDocTypeExpression;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDocTypeTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocTypedefTag extends HasLocals(HasSymbol(SharedNodeBase))<SyntaxKind.JSDocTypedefTag> {
    @Shared() tagName!: SharedIdentifier;
    @Shared() fullName!: SharedJSDocNamespaceDeclaration | SharedIdentifier | undefined;
    @Shared() name!: SharedIdentifier | undefined;
    @Shared() typeExpression!: SharedJSDocTypeExpression | SharedJSDocTypeLiteral | undefined;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDocTypedefTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocCallbackTag extends HasLocals(HasSymbol(SharedNodeBase))<SyntaxKind.JSDocCallbackTag> {
    @Shared() tagName!: SharedIdentifier;
    @Shared() fullName!: SharedJSDocNamespaceDeclaration | SharedIdentifier | undefined;
    @Shared() name!: SharedIdentifier | undefined;
    @Shared() typeExpression!: SharedJSDocSignature;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDocCallbackTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocOverloadTag extends SharedNodeBase<SyntaxKind.JSDocOverloadTag> {
    @Shared() tagName!: SharedIdentifier;
    @Shared() typeExpression!: SharedJSDocSignature;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDocOverloadTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocThrowsTag extends SharedNodeBase<SyntaxKind.JSDocThrowsTag> {
    @Shared() tagName!: SharedIdentifier;
    @Shared() typeExpression!: SharedJSDocTypeExpression | undefined;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDocThrowsTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocSignature extends HasLocals(HasSymbol(SharedNodeBase))<SyntaxKind.JSDocSignature> {
    @Shared() typeParameters!: ReadonlySharedArray<SharedJSDocTemplateTag> | undefined;
    @Shared() parameters!: ReadonlySharedArray<SharedJSDocParameterTag>;
    @Shared() type!: SharedJSDocReturnTag | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDocSignature;
    }
}

/** @internal */
@Shared()
export class SharedJSDocPropertyTag extends HasSymbol(SharedNodeBase)<SyntaxKind.JSDocPropertyTag> {
    @Shared() tagName!: SharedIdentifier;
    @Shared() name!: SharedEntityName;
    @Shared() typeExpression!: SharedJSDocTypeExpression | undefined;
    @Shared() isNameFirst!: boolean;
    @Shared() isBracketed!: boolean;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDocPropertyTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocParameterTag extends HasSymbol(SharedNodeBase)<SyntaxKind.JSDocParameterTag> {
    @Shared() tagName!: SharedIdentifier;
    @Shared() name!: SharedEntityName;
    @Shared() typeExpression!: SharedJSDocTypeExpression | undefined;
    @Shared() isNameFirst!: boolean;
    @Shared() isBracketed!: boolean;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDocParameterTag;
    }
}

/** @internal */
export type SharedJSDocPropertyLikeTag =
    | SharedJSDocPropertyTag
    | SharedJSDocParameterTag
    ;

/** @internal */
@Shared()
export class SharedJSDocTypeLiteral extends HasSymbol(SharedNodeBase)<SyntaxKind.JSDocTypeLiteral> {
    @Shared() jsDocPropertyTags!: ReadonlySharedArray<SharedJSDocPropertyLikeTag> | undefined;
    @Shared() isArrayType!: boolean;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDocTypeLiteral;
    }
}

/** @internal */
@Shared()
export class SharedJSDocSatisfiesTag extends SharedNodeBase<SyntaxKind.JSDocSatisfiesTag> {
    @Shared() typeExpression!: SharedJSDocTypeExpression;
    @Shared() tagName!: SharedIdentifier;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.JSDocSatisfiesTag;
    }
}

/** @internal */
@Shared()
export class SharedFileReference extends Tagged(SharedStructBase, Tag.FileReference) {
    @Shared() pos: number;
    @Shared() end: number;
    @Shared() fileName: string;
    @Shared() resolutionMode: ResolutionMode | undefined;
    constructor(pos: number, end: number, fileName: string, resolutionMode?: ResolutionMode) {
        super();
        this.pos = pos;
        this.end = end;
        this.fileName = fileName;
        this.resolutionMode = resolutionMode;
    }
}

/** @internal */
@Shared()
export class SharedAmdDependency extends Tagged(SharedStructBase, Tag.AmdDependency) {
    @Shared() path: string;
    @Shared() name: string | undefined;
    constructor(path: string, name?: string) {
        super();
        this.path = path;
        this.name = name;
    }
}

/** @internal */
@Shared()
export class SharedCheckJsDirective extends Tagged(SharedStructBase, Tag.CheckJsDirective) {
    @Shared() pos: number;
    @Shared() end: number;
    @Shared() enabled: boolean;
    constructor(pos: number, end: number, enabled: boolean) {
        super();
        this.pos = pos;
        this.end = end;
        this.enabled = enabled;
    }
}

/** @internal */
@Shared()
export class SharedCommentRange extends SharedNodeBase<CommentKind> {
    @Shared() hasTrailingNewLine: boolean | undefined;
}

/** @internal */
@Shared()
export class SharedCommentDirective extends Tagged(SharedStructBase, Tag.CommentDirective) {
    @Shared() range: SharedTextRange;
    @Shared() type: CommentDirectiveType;
    constructor(range: SharedTextRange, type: CommentDirectiveType) {
        super();
        this.range = range;
        this.type = type;
    }
}

/** @internal */
@Shared()
export class SharedPragma extends Tagged(SharedStructBase, Tag.Pragma) {
    @Shared() arguments: SharedPragmaArguments;
    @Shared() range: SharedCommentRange;
    constructor(args: SharedPragmaArguments, range: SharedCommentRange) {
        super();
        this.arguments = args;
        this.range = range;
    }
}

/** @internal */
@Shared()
export class SharedPragmaArguments extends Tagged(SharedStructBase, Tag.PragmaArguments) {
    @Shared() types: SharedPragmaSpan | undefined;
    @Shared() lib: SharedPragmaSpan | undefined;
    @Shared() path: SharedPragmaSpan | string | undefined;
    @Shared() "no-default-lib": string | undefined;
    @Shared() "resolution-mode": string | undefined;
    @Shared() name: string | undefined;
    @Shared() factory: string | undefined;
}

/** @internal */
@Shared()
export class SharedPragmaSpan extends Tagged(SharedStructBase, Tag.PragmaSpan) {
    @Shared() pos: number;
    @Shared() end: number;
    @Shared() value: string;
    constructor(pos: number, end: number, value: string) {
        super();
        this.pos = pos;
        this.end = end;
        this.value = value;
    }
}

/** @internal */
@Shared()
export class SharedSourceFile extends HasEndFlow(HasLocals(HasSymbol(SharedNodeBase)))<SyntaxKind.SourceFile> {
    @Shared() statements!: SharedNodeArray<SharedStatement>;
    @Shared() endOfFileToken!: SharedEndOfFileToken;
    @Shared() fileName!: string;
    @Shared() path!: Path;
    @Shared() text!: string;
    @Shared() resolvedPath!: Path;
    @Shared() originalFileName!: string;
    @Shared() amdDependencies!: SharedArray<SharedAmdDependency>;
    @Shared() moduleName!: string | undefined;
    @Shared() referencedFiles!: SharedArray<SharedFileReference>;
    @Shared() typeReferenceDirectives!: SharedArray<SharedFileReference>;
    @Shared() libReferenceDirectives!: SharedArray<SharedFileReference>;
    @Shared() languageVariant!: LanguageVariant;
    @Shared() isDeclarationFile!: boolean;
    @Shared() renamedDependencies!: SharedMap<string, string>;
    @Shared() hasNoDefaultLib!: boolean;
    @Shared() languageVersion!: ScriptTarget;
    @Shared() impliedNodeFormat!: ResolutionMode | undefined;
    @Shared() scriptKind!: ScriptKind;
    @Shared() pragmas!: SharedMap<string, SharedArray<SharedPragma> | SharedPragma>;
    @Shared() externalModuleIndicator!: SharedNode | true | undefined;
    @Shared() commonJsModuleIndicator!: SharedNode | undefined;
    @Shared() identifiers!: SharedMap<string, string>;
    @Shared() nodeCount = 0;
    @Shared() identifierCount = 0;
    @Shared() symbolCount = 0;
    @Shared() parseDiagnostics!: SharedArray<SharedDiagnosticWithLocation>;
    @Shared() bindDiagnostics: undefined;
    @Shared() bindSuggestionDiagnostics: undefined;
    @Shared() lineMap: undefined;
    @Shared() jsDocDiagnostics!: SharedArray<SharedDiagnosticWithLocation> | undefined;
    @Shared() commentDirectives!: SharedArray<SharedCommentDirective> | undefined;
    @Shared() checkJsDirective!: SharedCheckJsDirective | undefined;
    @Shared() version: string | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNodeBase && value.kind === SyntaxKind.SourceFile;
    }
}

/** @internal */
export type SharedNode =
    | SharedToken<TokenSyntaxKind>
    | SharedIdentifier
    | SharedQualifiedName
    | SharedComputedPropertyName
    | SharedPrivateIdentifier
    | SharedDecorator
    | SharedTypeParameterDeclaration
    | SharedCallSignatureDeclaration
    | SharedConstructSignatureDeclaration
    | SharedVariableDeclaration
    | SharedVariableDeclarationList
    | SharedParameterDeclaration
    | SharedBindingElement
    | SharedPropertySignature
    | SharedPropertyDeclaration
    | SharedPropertyAssignment
    | SharedShorthandPropertyAssignment
    | SharedSpreadAssignment
    | SharedObjectBindingPattern
    | SharedArrayBindingPattern
    | SharedFunctionDeclaration
    | SharedMethodSignature
    | SharedMethodDeclaration
    | SharedConstructorDeclaration
    | SharedSemicolonClassElement
    | SharedGetAccessorDeclaration
    | SharedSetAccessorDeclaration
    | SharedIndexSignatureDeclaration
    | SharedClassStaticBlockDeclaration
    | SharedImportTypeAssertionContainer
    | SharedImportTypeNode
    | SharedThisTypeNode
    | SharedFunctionTypeNode
    | SharedConstructorTypeNode
    | SharedTypeReferenceNode
    | SharedTypePredicateNode
    | SharedTypeQueryNode
    | SharedTypeLiteralNode
    | SharedArrayTypeNode
    | SharedTupleTypeNode
    | SharedNamedTupleMember
    | SharedOptionalTypeNode
    | SharedRestTypeNode
    | SharedUnionTypeNode
    | SharedIntersectionTypeNode
    | SharedConditionalTypeNode
    | SharedInferTypeNode
    | SharedParenthesizedTypeNode
    | SharedTypeOperatorNode
    | SharedIndexedAccessTypeNode
    | SharedMappedTypeNode
    | SharedLiteralTypeNode
    | SharedStringLiteral
    | SharedTemplateLiteralTypeNode
    | SharedTemplateLiteralTypeSpan
    | SharedOmittedExpression
    | SharedPrefixUnaryExpression
    | SharedPostfixUnaryExpression
    | SharedDeleteExpression
    | SharedTypeOfExpression
    | SharedVoidExpression
    | SharedAwaitExpression
    | SharedYieldExpression
    | SharedBinaryExpression
    | SharedConditionalExpression
    | SharedFunctionExpression
    | SharedArrowFunction
    | SharedRegularExpressionLiteral
    | SharedNoSubstitutionTemplateLiteral
    | SharedNumericLiteral
    | SharedBigIntLiteral
    | SharedTemplateHead
    | SharedTemplateMiddle
    | SharedTemplateTail
    | SharedTemplateExpression
    | SharedTemplateSpan
    | SharedParenthesizedExpression
    | SharedArrayLiteralExpression
    | SharedSpreadElement
    | SharedObjectLiteralExpression
    | SharedPropertyAccessExpression
    | SharedElementAccessExpression
    | SharedCallExpression
    | SharedExpressionWithTypeArguments
    | SharedNewExpression
    | SharedTaggedTemplateExpression
    | SharedAsExpression
    | SharedTypeAssertion
    | SharedSatisfiesExpression
    | SharedNonNullExpression
    | SharedMetaProperty
    | SharedJsxElement
    | SharedJsxAttributes
    | SharedJsxNamespacedName
    | SharedJsxOpeningElement
    | SharedJsxSelfClosingElement
    | SharedJsxFragment
    | SharedJsxOpeningFragment
    | SharedJsxClosingFragment
    | SharedJsxAttribute
    | SharedJsxSpreadAttribute
    | SharedJsxClosingElement
    | SharedJsxExpression
    | SharedJsxText
    | SharedEmptyStatement
    | SharedDebuggerStatement
    | SharedMissingDeclaration
    | SharedBlock
    | SharedVariableStatement
    | SharedExpressionStatement
    | SharedIfStatement
    | SharedDoStatement
    | SharedWhileStatement
    | SharedForStatement
    | SharedForInStatement
    | SharedForOfStatement
    | SharedBreakStatement
    | SharedContinueStatement
    | SharedReturnStatement
    | SharedWithStatement
    | SharedSwitchStatement
    | SharedCaseBlock
    | SharedCaseClause
    | SharedDefaultClause
    | SharedLabeledStatement
    | SharedThrowStatement
    | SharedTryStatement
    | SharedCatchClause
    | SharedClassDeclaration
    | SharedClassExpression
    | SharedInterfaceDeclaration
    | SharedHeritageClause
    | SharedTypeAliasDeclaration
    | SharedEnumMember
    | SharedEnumDeclaration
    | SharedModuleDeclaration
    | SharedNamespaceDeclaration
    | SharedJSDocNamespaceDeclaration
    | SharedModuleBlock
    | SharedImportEqualsDeclaration
    | SharedExternalModuleReference
    | SharedImportDeclaration
    | SharedImportClause
    | SharedAssertEntry
    | SharedAssertClause
    | SharedNamespaceImport
    | SharedNamespaceExport
    | SharedNamespaceExportDeclaration
    | SharedExportDeclaration
    | SharedNamedImports
    | SharedNamedExports
    | SharedImportSpecifier
    | SharedExportSpecifier
    | SharedExportAssignment
    | SharedJSDocTypeExpression
    | SharedJSDocNameReference
    | SharedJSDocMemberName
    | SharedJSDocAllType
    | SharedJSDocUnknownType
    | SharedJSDocNonNullableType
    | SharedJSDocNullableType
    | SharedJSDocOptionalType
    | SharedJSDocFunctionType
    | SharedJSDocVariadicType
    | SharedJSDocNamepathType
    | SharedJSDocNode
    | SharedJSDocLink
    | SharedJSDocLinkCode
    | SharedJSDocLinkPlain
    | SharedJSDocText
    | SharedJSDocUnknownTag
    | SharedJSDocAugmentsTag
    | SharedJSDocImplementsTag
    | SharedJSDocAuthorTag
    | SharedJSDocDeprecatedTag
    | SharedJSDocClassTag
    | SharedJSDocPublicTag
    | SharedJSDocPrivateTag
    | SharedJSDocProtectedTag
    | SharedJSDocReadonlyTag
    | SharedJSDocOverrideTag
    | SharedJSDocEnumTag
    | SharedJSDocThisTag
    | SharedJSDocTemplateTag
    | SharedJSDocSeeTag
    | SharedJSDocReturnTag
    | SharedJSDocTypeTag
    | SharedJSDocTypedefTag
    | SharedJSDocCallbackTag
    | SharedJSDocOverloadTag
    | SharedJSDocThrowsTag
    | SharedJSDocSignature
    | SharedJSDocPropertyTag
    | SharedJSDocParameterTag
    | SharedJSDocTypeLiteral
    | SharedJSDocSatisfiesTag
    | SharedSourceFile
    ;

const sharedNodeTypes = {
    // [TokenSyntaxKind]: SharedToken,
    [SyntaxKind.EndOfFileToken]: SharedEndOfFileToken,
    [SyntaxKind.ThisKeyword]: SharedThisExpression,
    [SyntaxKind.SuperKeyword]: SharedSuperExpression,
    [SyntaxKind.NumericLiteral]: SharedNumericLiteral,
    [SyntaxKind.BigIntLiteral]: SharedBigIntLiteral,
    [SyntaxKind.StringLiteral]: SharedStringLiteral,
    [SyntaxKind.JsxText]: SharedJsxText,
    [SyntaxKind.JsxTextAllWhiteSpaces]: SharedJsxText,
    [SyntaxKind.RegularExpressionLiteral]: SharedRegularExpressionLiteral,
    [SyntaxKind.NoSubstitutionTemplateLiteral]: SharedNoSubstitutionTemplateLiteral,
    [SyntaxKind.TemplateHead]: SharedTemplateHead,
    [SyntaxKind.TemplateMiddle]: SharedTemplateMiddle,
    [SyntaxKind.TemplateTail]: SharedTemplateTail,
    [SyntaxKind.Identifier]: SharedIdentifier,

    [SyntaxKind.QualifiedName]: SharedQualifiedName,
    [SyntaxKind.ComputedPropertyName]: SharedComputedPropertyName,
    [SyntaxKind.PrivateIdentifier]: SharedPrivateIdentifier,
    [SyntaxKind.Decorator]: SharedDecorator,
    [SyntaxKind.TypeParameter]: SharedTypeParameterDeclaration,
    [SyntaxKind.CallSignature]: SharedCallSignatureDeclaration,
    [SyntaxKind.ConstructSignature]: SharedConstructSignatureDeclaration,
    [SyntaxKind.VariableDeclaration]: SharedVariableDeclaration,
    [SyntaxKind.VariableDeclarationList]: SharedVariableDeclarationList,
    [SyntaxKind.Parameter]: SharedParameterDeclaration,
    [SyntaxKind.BindingElement]: SharedBindingElement,
    [SyntaxKind.PropertySignature]: SharedPropertySignature,
    [SyntaxKind.PropertyDeclaration]: SharedPropertyDeclaration,
    [SyntaxKind.PropertyAssignment]: SharedPropertyAssignment,
    [SyntaxKind.ShorthandPropertyAssignment]: SharedShorthandPropertyAssignment,
    [SyntaxKind.SpreadAssignment]: SharedSpreadAssignment,
    [SyntaxKind.ObjectBindingPattern]: SharedObjectBindingPattern,
    [SyntaxKind.ArrayBindingPattern]: SharedArrayBindingPattern,
    [SyntaxKind.FunctionDeclaration]: SharedFunctionDeclaration,
    [SyntaxKind.MethodSignature]: SharedMethodSignature,
    [SyntaxKind.MethodDeclaration]: SharedMethodDeclaration,
    [SyntaxKind.Constructor]: SharedConstructorDeclaration,
    [SyntaxKind.SemicolonClassElement]: SharedSemicolonClassElement,
    [SyntaxKind.GetAccessor]: SharedGetAccessorDeclaration,
    [SyntaxKind.SetAccessor]: SharedSetAccessorDeclaration,
    [SyntaxKind.IndexSignature]: SharedIndexSignatureDeclaration,
    [SyntaxKind.ClassStaticBlockDeclaration]: SharedClassStaticBlockDeclaration,
    [SyntaxKind.ImportTypeAssertionContainer]: SharedImportTypeAssertionContainer,
    [SyntaxKind.ImportType]: SharedImportTypeNode,
    [SyntaxKind.ThisType]: SharedThisTypeNode,
    [SyntaxKind.FunctionType]: SharedFunctionTypeNode,
    [SyntaxKind.ConstructorType]: SharedConstructorTypeNode,
    [SyntaxKind.TypeReference]: SharedTypeReferenceNode,
    [SyntaxKind.TypePredicate]: SharedTypePredicateNode,
    [SyntaxKind.TypeQuery]: SharedTypeQueryNode,
    [SyntaxKind.TypeLiteral]: SharedTypeLiteralNode,
    [SyntaxKind.ArrayType]: SharedArrayTypeNode,
    [SyntaxKind.TupleType]: SharedTupleTypeNode,
    [SyntaxKind.NamedTupleMember]: SharedNamedTupleMember,
    [SyntaxKind.OptionalType]: SharedOptionalTypeNode,
    [SyntaxKind.RestType]: SharedRestTypeNode,
    [SyntaxKind.UnionType]: SharedUnionTypeNode,
    [SyntaxKind.IntersectionType]: SharedIntersectionTypeNode,
    [SyntaxKind.ConditionalType]: SharedConditionalTypeNode,
    [SyntaxKind.InferType]: SharedInferTypeNode,
    [SyntaxKind.ParenthesizedType]: SharedParenthesizedTypeNode,
    [SyntaxKind.TypeOperator]: SharedTypeOperatorNode,
    [SyntaxKind.IndexedAccessType]: SharedIndexedAccessTypeNode,
    [SyntaxKind.MappedType]: SharedMappedTypeNode,
    [SyntaxKind.LiteralType]: SharedLiteralTypeNode,
    [SyntaxKind.TemplateLiteralType]: SharedTemplateLiteralTypeNode,
    [SyntaxKind.TemplateLiteralTypeSpan]: SharedTemplateLiteralTypeSpan,
    [SyntaxKind.OmittedExpression]: SharedOmittedExpression,
    [SyntaxKind.PrefixUnaryExpression]: SharedPrefixUnaryExpression,
    [SyntaxKind.PostfixUnaryExpression]: SharedPostfixUnaryExpression,
    [SyntaxKind.DeleteExpression]: SharedDeleteExpression,
    [SyntaxKind.TypeOfExpression]: SharedTypeOfExpression,
    [SyntaxKind.VoidExpression]: SharedVoidExpression,
    [SyntaxKind.AwaitExpression]: SharedAwaitExpression,
    [SyntaxKind.YieldExpression]: SharedYieldExpression,
    [SyntaxKind.BinaryExpression]: SharedBinaryExpression,
    [SyntaxKind.ConditionalExpression]: SharedConditionalExpression,
    [SyntaxKind.FunctionExpression]: SharedFunctionExpression,
    [SyntaxKind.ArrowFunction]: SharedArrowFunction,
    [SyntaxKind.TemplateExpression]: SharedTemplateExpression,
    [SyntaxKind.TemplateSpan]: SharedTemplateSpan,
    [SyntaxKind.ParenthesizedExpression]: SharedParenthesizedExpression,
    [SyntaxKind.ArrayLiteralExpression]: SharedArrayLiteralExpression,
    [SyntaxKind.SpreadElement]: SharedSpreadElement,
    [SyntaxKind.ObjectLiteralExpression]: SharedObjectLiteralExpression,
    [SyntaxKind.PropertyAccessExpression]: SharedPropertyAccessExpression,
    [SyntaxKind.ElementAccessExpression]: SharedElementAccessExpression,
    [SyntaxKind.CallExpression]: SharedCallExpression,
    [SyntaxKind.ExpressionWithTypeArguments]: SharedExpressionWithTypeArguments,
    [SyntaxKind.NewExpression]: SharedNewExpression,
    [SyntaxKind.TaggedTemplateExpression]: SharedTaggedTemplateExpression,
    [SyntaxKind.AsExpression]: SharedAsExpression,
    [SyntaxKind.TypeAssertionExpression]: SharedTypeAssertion,
    [SyntaxKind.SatisfiesExpression]: SharedSatisfiesExpression,
    [SyntaxKind.NonNullExpression]: SharedNonNullExpression,
    [SyntaxKind.MetaProperty]: SharedMetaProperty,
    [SyntaxKind.JsxElement]: SharedJsxElement,
    [SyntaxKind.JsxAttributes]: SharedJsxAttributes,
    [SyntaxKind.JsxNamespacedName]: SharedJsxNamespacedName,
    [SyntaxKind.JsxOpeningElement]: SharedJsxOpeningElement,
    [SyntaxKind.JsxSelfClosingElement]: SharedJsxSelfClosingElement,
    [SyntaxKind.JsxFragment]: SharedJsxFragment,
    [SyntaxKind.JsxOpeningFragment]: SharedJsxOpeningFragment,
    [SyntaxKind.JsxClosingFragment]: SharedJsxClosingFragment,
    [SyntaxKind.JsxAttribute]: SharedJsxAttribute,
    [SyntaxKind.JsxSpreadAttribute]: SharedJsxSpreadAttribute,
    [SyntaxKind.JsxClosingElement]: SharedJsxClosingElement,
    [SyntaxKind.JsxExpression]: SharedJsxExpression,
    [SyntaxKind.EmptyStatement]: SharedEmptyStatement,
    [SyntaxKind.DebuggerStatement]: SharedDebuggerStatement,
    [SyntaxKind.MissingDeclaration]: SharedMissingDeclaration,
    [SyntaxKind.Block]: SharedBlock,
    [SyntaxKind.VariableStatement]: SharedVariableStatement,
    [SyntaxKind.ExpressionStatement]: SharedExpressionStatement,
    [SyntaxKind.IfStatement]: SharedIfStatement,
    [SyntaxKind.DoStatement]: SharedDoStatement,
    [SyntaxKind.WhileStatement]: SharedWhileStatement,
    [SyntaxKind.ForStatement]: SharedForStatement,
    [SyntaxKind.ForInStatement]: SharedForInStatement,
    [SyntaxKind.ForOfStatement]: SharedForOfStatement,
    [SyntaxKind.BreakStatement]: SharedBreakStatement,
    [SyntaxKind.ContinueStatement]: SharedContinueStatement,
    [SyntaxKind.ReturnStatement]: SharedReturnStatement,
    [SyntaxKind.WithStatement]: SharedWithStatement,
    [SyntaxKind.SwitchStatement]: SharedSwitchStatement,
    [SyntaxKind.CaseBlock]: SharedCaseBlock,
    [SyntaxKind.CaseClause]: SharedCaseClause,
    [SyntaxKind.DefaultClause]: SharedDefaultClause,
    [SyntaxKind.LabeledStatement]: SharedLabeledStatement,
    [SyntaxKind.ThrowStatement]: SharedThrowStatement,
    [SyntaxKind.TryStatement]: SharedTryStatement,
    [SyntaxKind.CatchClause]: SharedCatchClause,
    [SyntaxKind.ClassDeclaration]: SharedClassDeclaration,
    [SyntaxKind.ClassExpression]: SharedClassExpression,
    [SyntaxKind.InterfaceDeclaration]: SharedInterfaceDeclaration,
    [SyntaxKind.HeritageClause]: SharedHeritageClause,
    [SyntaxKind.TypeAliasDeclaration]: SharedTypeAliasDeclaration,
    [SyntaxKind.EnumMember]: SharedEnumMember,
    [SyntaxKind.EnumDeclaration]: SharedEnumDeclaration,
    [SyntaxKind.ModuleDeclaration]: SharedModuleDeclaration,
    [SyntaxKind.ModuleBlock]: SharedModuleBlock,
    [SyntaxKind.ImportEqualsDeclaration]: SharedImportEqualsDeclaration,
    [SyntaxKind.ExternalModuleReference]: SharedExternalModuleReference,
    [SyntaxKind.ImportDeclaration]: SharedImportDeclaration,
    [SyntaxKind.ImportClause]: SharedImportClause,
    [SyntaxKind.AssertEntry]: SharedAssertEntry,
    [SyntaxKind.AssertClause]: SharedAssertClause,
    [SyntaxKind.NamespaceImport]: SharedNamespaceImport,
    [SyntaxKind.NamespaceExport]: SharedNamespaceExport,
    [SyntaxKind.NamespaceExportDeclaration]: SharedNamespaceExportDeclaration,
    [SyntaxKind.ExportDeclaration]: SharedExportDeclaration,
    [SyntaxKind.NamedImports]: SharedNamedImports,
    [SyntaxKind.NamedExports]: SharedNamedExports,
    [SyntaxKind.ImportSpecifier]: SharedImportSpecifier,
    [SyntaxKind.ExportSpecifier]: SharedExportSpecifier,
    [SyntaxKind.ExportAssignment]: SharedExportAssignment,
    [SyntaxKind.JSDocTypeExpression]: SharedJSDocTypeExpression,
    [SyntaxKind.JSDocNameReference]: SharedJSDocNameReference,
    [SyntaxKind.JSDocMemberName]: SharedJSDocMemberName,
    [SyntaxKind.JSDocAllType]: SharedJSDocAllType,
    [SyntaxKind.JSDocUnknownType]: SharedJSDocUnknownType,
    [SyntaxKind.JSDocNonNullableType]: SharedJSDocNonNullableType,
    [SyntaxKind.JSDocNullableType]: SharedJSDocNullableType,
    [SyntaxKind.JSDocOptionalType]: SharedJSDocOptionalType,
    [SyntaxKind.JSDocFunctionType]: SharedJSDocFunctionType,
    [SyntaxKind.JSDocVariadicType]: SharedJSDocVariadicType,
    [SyntaxKind.JSDocNamepathType]: SharedJSDocNamepathType,
    [SyntaxKind.JSDoc]: SharedJSDocNode,
    [SyntaxKind.JSDocLink]: SharedJSDocLink,
    [SyntaxKind.JSDocLinkCode]: SharedJSDocLinkCode,
    [SyntaxKind.JSDocLinkPlain]: SharedJSDocLinkPlain,
    [SyntaxKind.JSDocText]: SharedJSDocText,
    [SyntaxKind.JSDocTag]: SharedJSDocUnknownTag,
    [SyntaxKind.JSDocAugmentsTag]: SharedJSDocAugmentsTag,
    [SyntaxKind.JSDocImplementsTag]: SharedJSDocImplementsTag,
    [SyntaxKind.JSDocAuthorTag]: SharedJSDocAuthorTag,
    [SyntaxKind.JSDocDeprecatedTag]: SharedJSDocDeprecatedTag,
    [SyntaxKind.JSDocClassTag]: SharedJSDocClassTag,
    [SyntaxKind.JSDocPublicTag]: SharedJSDocPublicTag,
    [SyntaxKind.JSDocPrivateTag]: SharedJSDocPrivateTag,
    [SyntaxKind.JSDocProtectedTag]: SharedJSDocProtectedTag,
    [SyntaxKind.JSDocReadonlyTag]: SharedJSDocReadonlyTag,
    [SyntaxKind.JSDocOverrideTag]: SharedJSDocOverrideTag,
    [SyntaxKind.JSDocEnumTag]: SharedJSDocEnumTag,
    [SyntaxKind.JSDocThisTag]: SharedJSDocThisTag,
    [SyntaxKind.JSDocTemplateTag]: SharedJSDocTemplateTag,
    [SyntaxKind.JSDocSeeTag]: SharedJSDocSeeTag,
    [SyntaxKind.JSDocReturnTag]: SharedJSDocReturnTag,
    [SyntaxKind.JSDocTypeTag]: SharedJSDocTypeTag,
    [SyntaxKind.JSDocTypedefTag]: SharedJSDocTypedefTag,
    [SyntaxKind.JSDocCallbackTag]: SharedJSDocCallbackTag,
    [SyntaxKind.JSDocOverloadTag]: SharedJSDocOverloadTag,
    [SyntaxKind.JSDocThrowsTag]: SharedJSDocThrowsTag,
    [SyntaxKind.JSDocSignature]: SharedJSDocSignature,
    [SyntaxKind.JSDocPropertyTag]: SharedJSDocPropertyTag,
    [SyntaxKind.JSDocParameterTag]: SharedJSDocParameterTag,
    [SyntaxKind.JSDocTypeLiteral]: SharedJSDocTypeLiteral,
    [SyntaxKind.JSDocSatisfiesTag]: SharedJSDocSatisfiesTag,
    [SyntaxKind.SourceFile]: SharedSourceFile,
};

/** @internal */
export function getSharedConstructorForKind(kind: SyntaxKind): new () => SharedNode {
    const type = (sharedNodeTypes as any)[kind] ?? (isTokenKind(kind) ? SharedToken : undefined);
    Debug.assertIsDefined(type);
    return type;
}

// Mixins

/** @internal */
export interface SharedJSDocContainer extends SharedNodeBase {
    jsDoc: SharedArray<SharedJSDocNode> | undefined;
}

function HasJSDoc<F extends abstract new (...args: any) => SharedNodeBase>(base: F): F & (abstract new (...args: any) => SharedJSDocContainer) {
    @Shared({ abstract: true })
    abstract class HasJSDoc extends base {
        @Shared() jsDoc: SharedArray<SharedJSDocNode> | undefined;
    }
    return HasJSDoc;
}

/** @internal */
export interface SharedLocalsContainer extends SharedNodeBase {
    locals: undefined;
    nextContainer: undefined;
}

function HasLocals<F extends abstract new (...args: any) => SharedNodeBase>(base: F): F & (abstract new (...args: any) => SharedLocalsContainer) {
    @Shared({ abstract: true })
    abstract class HasLocals extends base {
        @Shared() locals: undefined;
        @Shared() nextContainer: undefined;
    }
    return HasLocals;
}

/** @internal */
export interface SharedFlowNodeContainer extends SharedNodeBase {
    flowNode: undefined;
}

function HasFlowNode<F extends abstract new (...args: any) => SharedNodeBase>(base: F): F & (abstract new (...args: any) => SharedFlowNodeContainer) {
    @Shared({ abstract: true })
    abstract class HasFlowNode extends base {
        @Shared() flowNode: undefined;
    }
    return HasFlowNode;
}

/** @internal */
export interface SharedSymbolContainer extends SharedNodeBase {
    symbol: undefined;
    localSymbol: undefined;
}

function HasSymbol<F extends abstract new (...args: any) => SharedNodeBase>(base: F): F & (abstract new (...args: any) => SharedSymbolContainer) {
    @Shared({ abstract: true })
    abstract class HasSymbol extends base {
        @Shared() symbol: undefined;
        @Shared() localSymbol: undefined;
    }
    return HasSymbol;
}

/** @internal */
export interface SharedEndFlowContainer extends SharedNodeBase {
    endFlowNode: undefined;
}

function HasEndFlow<F extends abstract new (...args: any) => SharedNodeBase>(base: F): F & (abstract new (...args: any) => SharedEndFlowContainer) {
    @Shared({ abstract: true })
    abstract class HasEndFlow extends base {
        @Shared() endFlowNode: undefined;
    }
    return HasEndFlow;
}

/** @internal */
export interface SharedFunctionFlowContainer extends SharedEndFlowContainer {
    returnFlowNode: undefined;
}

function HasFunctionFlow<F extends abstract new (...args: any) => SharedNodeBase>(base: F): F & (abstract new (...args: any) => SharedFunctionFlowContainer) {
    @Shared({ abstract: true })
    abstract class HasFunctionFlow extends HasEndFlow(base) {
        @Shared() returnFlowNode: undefined;
    }
    return HasFunctionFlow;
}
