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
export abstract class SharedNode<Kind extends SyntaxKind = SyntaxKind> extends Identifiable(Tagged(SharedTextRange, Tag.Node)) {
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
export class SharedToken<Kind extends TokenSyntaxKind> extends SharedNode<Kind> {
    declare kind: Kind;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && isTokenKind(value.kind);
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
export class SharedIdentifier extends HasFlowNode(HasSymbol(HasJSDoc(SharedNode)))<SyntaxKind.Identifier> {
    @Shared() escapedText!: __String;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.Identifier;
    }
}

/** @internal */
@Shared()
export class SharedQualifiedName extends HasFlowNode(SharedNode)<SyntaxKind.QualifiedName> {
    @Shared() left!: SharedEntityName;
    @Shared() right!: SharedIdentifier;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.QualifiedName;
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
export class SharedComputedPropertyName extends SharedNode<SyntaxKind.ComputedPropertyName> {
    @Shared() expression!: SharedExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.ComputedPropertyName;
    }
}

/** @internal */
@Shared()
export class SharedPrivateIdentifier extends SharedNode<SyntaxKind.PrivateIdentifier> {
    @Shared() escapedText!: __String;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.PrivateIdentifier;
    }
}

/** @internal */
@Shared()
export class SharedTypeParameterDeclaration extends HasSymbol(HasJSDoc(SharedNode))<SyntaxKind.TypeParameter> {
    @Shared() modifiers: SharedNodeArray<SharedModifier> | undefined;
    @Shared() name!: SharedIdentifier;
    @Shared() constraint: SharedTypeNode | undefined;
    @Shared() default: SharedTypeNode | undefined;
    @Shared() expression: SharedExpression | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.TypeParameter;
    }
}

/** @internal */
@Shared()
export class SharedParameterDeclaration extends HasSymbol(HasJSDoc(SharedNode))<SyntaxKind.Parameter> {
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;
    @Shared() dotDotDotToken!: SharedToken<SyntaxKind.DotDotDotToken> | undefined;
    @Shared() name!: SharedBindingName;
    @Shared() questionToken!: SharedToken<SyntaxKind.QuestionToken> | undefined;
    @Shared() type!: SharedTypeNode | undefined;
    @Shared() initializer!: SharedExpression | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.Parameter;
    }
}

/** @internal */
@Shared()
export class SharedDecorator extends SharedNode<SyntaxKind.Decorator> {
    @Shared() expression!: SharedLeftHandSideExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.Decorator;
    }
}

/** @internal */
@Shared()
export class SharedPropertySignature extends HasSymbol(HasJSDoc(SharedNode))<SyntaxKind.PropertySignature> {
    @Shared() modifiers!: SharedNodeArray<SharedModifier> | undefined;
    @Shared() name!: SharedPropertyName;
    @Shared() questionToken!: SharedToken<SyntaxKind.QuestionToken> | undefined;
    @Shared() type!: SharedTypeNode | undefined;
    @Shared() initializer!: SharedExpression | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.PropertySignature;
    }
}

/** @internal */
@Shared()
export class SharedCallSignatureDeclaration extends HasLocals(HasSymbol(HasJSDoc(SharedNode)))<SyntaxKind.CallSignature> {
    @Shared() typeParameters!: SharedNodeArray<SharedTypeParameterDeclaration> | undefined;
    @Shared() parameters!: SharedNodeArray<SharedParameterDeclaration>;
    @Shared() type!: SharedTypeNode | undefined;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.CallSignature;
    }
}

/** @internal */
@Shared()
export class SharedConstructSignatureDeclaration extends HasLocals(HasSymbol(HasJSDoc(SharedNode)))<SyntaxKind.ConstructSignature> {
    @Shared() typeParameters!: SharedNodeArray<SharedTypeParameterDeclaration> | undefined;
    @Shared() parameters!: SharedNodeArray<SharedParameterDeclaration>;
    @Shared() type!: SharedTypeNode | undefined;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.ConstructSignature;
    }
}

/** @internal */
@Shared()
export class SharedVariableDeclaration extends HasSymbol(HasJSDoc(SharedNode))<SyntaxKind.VariableDeclaration> {
    @Shared() name!: SharedBindingName;
    @Shared() exclamationToken!: SharedToken<SyntaxKind.ExclamationToken> | undefined;
    @Shared() type!: SharedTypeNode | undefined;
    @Shared() initializer!: SharedExpression | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.VariableDeclaration;
    }
}

/** @internal */
@Shared()
export class SharedVariableDeclarationList extends SharedNode<SyntaxKind.VariableDeclarationList> {
    @Shared() declarations!: SharedNodeArray<SharedVariableDeclaration>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.VariableDeclarationList;
    }
}

/** @internal */
@Shared()
export class SharedBindingElement extends HasFlowNode(HasSymbol(SharedNode))<SyntaxKind.BindingElement> {
    @Shared() propertyName!: SharedPropertyName | undefined;
    @Shared() dotDotDotToken!: SharedToken<SyntaxKind.DotDotDotToken> | undefined;
    @Shared() name!: SharedBindingName;
    @Shared() initializer!: SharedExpression | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.BindingElement;
    }
}

/** @internal */
@Shared()
export class SharedPropertyDeclaration extends HasSymbol(HasJSDoc(SharedNode))<SyntaxKind.PropertyDeclaration> {
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;
    @Shared() name!: SharedPropertyName;
    @Shared() questionToken!: SharedToken<SyntaxKind.QuestionToken> | undefined;
    @Shared() exclamationToken!: SharedToken<SyntaxKind.ExclamationToken> | undefined;
    @Shared() type!: SharedTypeNode | undefined;
    @Shared() initializer!: SharedExpression | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.PropertyDeclaration;
    }
}

/** @internal */
@Shared()
export class SharedPropertyAssignment extends HasSymbol(HasJSDoc(SharedNode))<SyntaxKind.PropertyAssignment> {
    @Shared() name!: SharedPropertyName;
    @Shared() initializer!: SharedExpression;
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;
    @Shared() questionToken!: SharedToken<SyntaxKind.QuestionToken> | undefined;
    @Shared() exclamationToken!: SharedToken<SyntaxKind.ExclamationToken> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.PropertyAssignment;
    }
}

/** @internal */
@Shared()
export class SharedShorthandPropertyAssignment extends HasSymbol(HasJSDoc(SharedNode))<SyntaxKind.ShorthandPropertyAssignment> {
    @Shared() name!: SharedIdentifier;
    @Shared() equalsToken!: SharedToken<SyntaxKind.EqualsToken> | undefined;
    @Shared() objectAssignmentInitializer!: SharedExpression | undefined;
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;
    @Shared() questionToken!: SharedToken<SyntaxKind.QuestionToken> | undefined;
    @Shared() exclamationToken!: SharedToken<SyntaxKind.ExclamationToken> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.ShorthandPropertyAssignment;
    }
}

/** @internal */
@Shared()
export class SharedSpreadAssignment extends HasSymbol(HasJSDoc(SharedNode))<SyntaxKind.SpreadAssignment> {
    @Shared() expression!: SharedExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.SpreadAssignment;
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
export class SharedObjectBindingPattern extends SharedNode<SyntaxKind.ObjectBindingPattern> {
    @Shared() elements!: SharedNodeArray<SharedBindingElement>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.ObjectBindingPattern;
    }
}

/** @internal */
@Shared()
export class SharedArrayBindingPattern extends SharedNode<SyntaxKind.ArrayBindingPattern> {
    @Shared() elements!: SharedNodeArray<SharedArrayBindingElement>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.ArrayBindingPattern;
    }
}

/** @internal */
@Shared()
export class SharedFunctionDeclaration extends HasFunctionFlow(HasLocals(HasSymbol(HasJSDoc(SharedNode))))<SyntaxKind.FunctionDeclaration> {
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;
    @Shared() asteriskToken!: SharedToken<SyntaxKind.AsteriskToken> | undefined;
    @Shared() name!: SharedIdentifier | undefined;
    @Shared() typeParameters!: SharedNodeArray<SharedTypeParameterDeclaration> | undefined;
    @Shared() parameters!: SharedNodeArray<SharedParameterDeclaration>;
    @Shared() type!: SharedTypeNode | undefined;
    @Shared() body!: SharedFunctionBody | undefined;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.FunctionDeclaration;
    }
}

/** @internal */
@Shared()
export class SharedMethodSignature extends HasLocals(HasSymbol(HasJSDoc(SharedNode)))<SyntaxKind.MethodSignature> {
    @Shared() modifiers!: SharedNodeArray<SharedModifier> | undefined;
    @Shared() name!: SharedPropertyName;
    @Shared() questionToken!: SharedToken<SyntaxKind.QuestionToken> | undefined;
    @Shared() typeParameters!: SharedNodeArray<SharedTypeParameterDeclaration> | undefined;
    @Shared() parameters!: SharedNodeArray<SharedParameterDeclaration>;
    @Shared() type!: SharedTypeNode | undefined;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.MethodSignature;
    }
}

/** @internal */
@Shared()
export class SharedMethodDeclaration extends HasFunctionFlow(HasFlowNode(HasLocals(HasSymbol(HasJSDoc(SharedNode)))))<SyntaxKind.MethodDeclaration> {
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
        return value instanceof SharedNode && value.kind === SyntaxKind.MethodDeclaration;
    }
}

/** @internal */
@Shared()
export class SharedConstructorDeclaration extends HasFunctionFlow(HasLocals(HasSymbol(HasJSDoc(SharedNode))))<SyntaxKind.Constructor> {
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;
    @Shared() body!: SharedFunctionBody | undefined;
    @Shared() typeParameters!: SharedNodeArray<SharedTypeParameterDeclaration> | undefined;
    @Shared() parameters!: SharedNodeArray<SharedParameterDeclaration>;
    @Shared() type!: SharedTypeNode | undefined;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.Constructor;
    }
}

/** @internal */
@Shared()
export class SharedSemicolonClassElement extends HasJSDoc(SharedNode)<SyntaxKind.SemicolonClassElement> {
    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.SemicolonClassElement;
    }
}

/** @internal */
@Shared()
export class SharedGetAccessorDeclaration extends HasFunctionFlow(HasFlowNode(HasLocals(HasSymbol(HasJSDoc(SharedNode)))))<SyntaxKind.GetAccessor> {
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;
    @Shared() name!: SharedPropertyName;
    @Shared() body!: SharedFunctionBody | undefined;
    @Shared() typeParameters!: SharedNodeArray<SharedTypeParameterDeclaration> | undefined;
    @Shared() parameters!: SharedNodeArray<SharedParameterDeclaration>;
    @Shared() type!: SharedTypeNode | undefined;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.GetAccessor;
    }
}

/** @internal */
@Shared()
export class SharedSetAccessorDeclaration extends HasFunctionFlow(HasFlowNode(HasLocals(HasSymbol(HasJSDoc(SharedNode)))))<SyntaxKind.SetAccessor> {
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;
    @Shared() name!: SharedPropertyName;
    @Shared() body!: SharedFunctionBody | undefined;
    @Shared() typeParameters!: SharedNodeArray<SharedTypeParameterDeclaration> | undefined;
    @Shared() parameters!: SharedNodeArray<SharedParameterDeclaration>;
    @Shared() type!: SharedTypeNode | undefined;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.SetAccessor;
    }
}

/** @internal */
export type SharedAccessorDeclaration =
    | SharedGetAccessorDeclaration
    | SharedSetAccessorDeclaration
    ;

/** @internal */
@Shared()
export class SharedIndexSignatureDeclaration extends HasLocals(HasSymbol(HasJSDoc(SharedNode)))<SyntaxKind.IndexSignature> {
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;
    @Shared() typeParameters!: SharedNodeArray<SharedTypeParameterDeclaration> | undefined;
    @Shared() parameters!: SharedNodeArray<SharedParameterDeclaration>;
    @Shared() type!: SharedTypeNode;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.IndexSignature;
    }
}

/** @internal */
@Shared()
export class SharedClassStaticBlockDeclaration extends HasFunctionFlow(HasLocals(HasSymbol(HasJSDoc(SharedNode))))<SyntaxKind.ClassStaticBlockDeclaration> {
    @Shared() body!: SharedBlock;
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.ClassStaticBlockDeclaration;
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
export class SharedImportTypeAssertionContainer extends SharedNode<SyntaxKind.ImportTypeAssertionContainer> {
    @Shared() assertClause!: SharedAssertClause;
    @Shared() multiLine!: boolean | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.ImportTypeAssertionContainer;
    }
}

/** @internal */
@Shared()
export class SharedImportTypeNode extends SharedNode<SyntaxKind.ImportType> {
    @Shared() isTypeOf!: boolean;
    @Shared() argument!: SharedTypeNode;
    @Shared() assertions!: SharedImportTypeAssertionContainer | undefined;
    @Shared() qualifier!: SharedEntityName | undefined;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.ImportType;
    }
}

/** @internal */
@Shared()
export class SharedThisTypeNode extends SharedNode<SyntaxKind.ThisType> {

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.ThisType;
    }
}

/** @internal */
@Shared()
export class SharedFunctionTypeNode extends HasLocals(HasSymbol(HasJSDoc(SharedNode)))<SyntaxKind.FunctionType> {
    @Shared() modifiers!: undefined | undefined;
    @Shared() typeParameters!: SharedNodeArray<SharedTypeParameterDeclaration> | undefined;
    @Shared() parameters!: SharedNodeArray<SharedParameterDeclaration>;
    @Shared() type!: SharedTypeNode;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.FunctionType;
    }
}

/** @internal */
@Shared()
export class SharedConstructorTypeNode extends HasLocals(HasSymbol(HasJSDoc(SharedNode)))<SyntaxKind.ConstructorType> {
    @Shared() modifiers!: SharedNodeArray<SharedModifier> | undefined;
    @Shared() typeParameters!: SharedNodeArray<SharedTypeParameterDeclaration> | undefined;
    @Shared() parameters!: SharedNodeArray<SharedParameterDeclaration>;
    @Shared() type!: SharedTypeNode;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.ConstructorType;
    }
}

/** @internal */
@Shared()
export class SharedTypeReferenceNode extends SharedNode<SyntaxKind.TypeReference> {
    @Shared() typeName!: SharedEntityName;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.TypeReference;
    }
}

/** @internal */
@Shared()
export class SharedTypePredicateNode extends SharedNode<SyntaxKind.TypePredicate> {
    @Shared() assertsModifier!: SharedToken<SyntaxKind.AssertsKeyword> | undefined;
    @Shared() parameterName!: SharedIdentifier | SharedThisTypeNode;
    @Shared() type!: SharedTypeNode | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.TypePredicate;
    }
}

/** @internal */
@Shared()
export class SharedTypeQueryNode extends SharedNode<SyntaxKind.TypeQuery> {
    @Shared() exprName!: SharedEntityName;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.TypeQuery;
    }
}

/** @internal */
@Shared()
export class SharedTypeLiteralNode extends HasSymbol(SharedNode)<SyntaxKind.TypeLiteral> {
    @Shared() members!: SharedNodeArray<SharedTypeElement>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.TypeLiteral;
    }
}

/** @internal */
@Shared()
export class SharedArrayTypeNode extends SharedNode<SyntaxKind.ArrayType> {
    @Shared() elementType!: SharedTypeNode;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.ArrayType;
    }
}

/** @internal */
@Shared()
export class SharedTupleTypeNode extends SharedNode<SyntaxKind.TupleType> {
    @Shared() elements!: SharedNodeArray<SharedTypeNode | SharedNamedTupleMember>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.TupleType;
    }
}

/** @internal */
@Shared()
export class SharedNamedTupleMember extends HasSymbol(HasJSDoc(SharedNode))<SyntaxKind.NamedTupleMember> {
    @Shared() dotDotDotToken!: SharedToken<SyntaxKind.DotDotDotToken> | undefined;
    @Shared() name!: SharedIdentifier;
    @Shared() questionToken!: SharedToken<SyntaxKind.QuestionToken> | undefined;
    @Shared() type!: SharedTypeNode;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.NamedTupleMember;
    }
}

/** @internal */
@Shared()
export class SharedOptionalTypeNode extends SharedNode<SyntaxKind.OptionalType> {
    @Shared() type!: SharedTypeNode;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.OptionalType;
    }
}

/** @internal */
@Shared()
export class SharedRestTypeNode extends SharedNode<SyntaxKind.RestType> {
    @Shared() type!: SharedTypeNode;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.RestType;
    }
}

/** @internal */
@Shared()
export class SharedUnionTypeNode extends SharedNode<SyntaxKind.UnionType> {
    @Shared() types!: SharedNodeArray<SharedTypeNode>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.UnionType;
    }
}

/** @internal */
@Shared()
export class SharedIntersectionTypeNode extends SharedNode<SyntaxKind.IntersectionType> {
    @Shared() types!: SharedNodeArray<SharedTypeNode>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.IntersectionType;
    }
}

/** @internal */
@Shared()
export class SharedConditionalTypeNode extends HasLocals(SharedNode)<SyntaxKind.ConditionalType> {
    @Shared() checkType!: SharedTypeNode;
    @Shared() extendsType!: SharedTypeNode;
    @Shared() trueType!: SharedTypeNode;
    @Shared() falseType!: SharedTypeNode;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.ConditionalType;
    }
}

/** @internal */
@Shared()
export class SharedInferTypeNode extends SharedNode<SyntaxKind.InferType> {
    @Shared() typeParameter!: SharedTypeParameterDeclaration;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.InferType;
    }
}

/** @internal */
@Shared()
export class SharedParenthesizedTypeNode extends SharedNode<SyntaxKind.ParenthesizedType> {
    @Shared() type!: SharedTypeNode;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.ParenthesizedType;
    }
}

/** @internal */
@Shared()
export class SharedTypeOperatorNode extends SharedNode<SyntaxKind.TypeOperator> {
    @Shared() operator!: SyntaxKind.KeyOfKeyword | SyntaxKind.UniqueKeyword | SyntaxKind.ReadonlyKeyword;
    @Shared() type!: SharedTypeNode;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.TypeOperator;
    }
}

/** @internal */
@Shared()
export class SharedIndexedAccessTypeNode extends SharedNode<SyntaxKind.IndexedAccessType> {
    @Shared() objectType!: SharedTypeNode;
    @Shared() indexType!: SharedTypeNode;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.IndexedAccessType;
    }
}

/** @internal */
@Shared()
export class SharedMappedTypeNode extends HasLocals(HasSymbol(SharedNode))<SyntaxKind.MappedType> {
    @Shared() readonlyToken!: SharedToken<SyntaxKind.ReadonlyKeyword> | SharedToken<SyntaxKind.PlusToken> | SharedToken<SyntaxKind.MinusToken> | undefined;
    @Shared() typeParameter!: SharedTypeParameterDeclaration;
    @Shared() nameType!: SharedTypeNode | undefined;
    @Shared() questionToken!: SharedToken<SyntaxKind.QuestionToken> | SharedToken<SyntaxKind.PlusToken> | SharedToken<SyntaxKind.MinusToken> | undefined;
    @Shared() type!: SharedTypeNode | undefined;
    @Shared() members!: SharedNodeArray<SharedTypeElement> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.MappedType;
    }
}

/** @internal */
@Shared()
export class SharedLiteralTypeNode extends SharedNode<SyntaxKind.LiteralType> {
    @Shared() literal!: SharedToken<SyntaxKind.NullKeyword> | SharedToken<SyntaxKind.TrueKeyword> | SharedToken<SyntaxKind.FalseKeyword> | SharedStringLiteral | SharedNumericLiteral | SharedBigIntLiteral | SharedPrefixUnaryExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.LiteralType;
    }
}

/** @internal */
@Shared()
export class SharedStringLiteral extends HasSymbol(SharedNode)<SyntaxKind.StringLiteral> {
    @Shared() text!: string;
    @Shared() singleQuote!: boolean | undefined;
    @Shared() isUnterminated!: boolean;
    @Shared() hasExtendedUnicodeEscape!: boolean;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.StringLiteral;
    }
}

/** @internal */
@Shared()
export class SharedTemplateLiteralTypeNode extends SharedNode<SyntaxKind.TemplateLiteralType> {
    @Shared() head!: SharedTemplateHead;
    @Shared() templateSpans!: SharedNodeArray<SharedTemplateLiteralTypeSpan>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.TemplateLiteralType;
    }
}

/** @internal */
@Shared()
export class SharedTemplateLiteralTypeSpan extends SharedNode<SyntaxKind.TemplateLiteralTypeSpan> {
    @Shared() type!: SharedTypeNode;
    @Shared() literal!: SharedTemplateMiddle | SharedTemplateTail;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.TemplateLiteralTypeSpan;
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
export class SharedOmittedExpression extends SharedNode<SyntaxKind.OmittedExpression> {
    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.OmittedExpression;
    }
}

/** @internal */
@Shared()
export class SharedPrefixUnaryExpression extends SharedNode<SyntaxKind.PrefixUnaryExpression> {
    @Shared() operator!: PrefixUnaryOperator;
    @Shared() operand!: SharedUnaryExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.PrefixUnaryExpression;
    }
}

/** @internal */
@Shared()
export class SharedPostfixUnaryExpression extends SharedNode<SyntaxKind.PostfixUnaryExpression> {
    @Shared() operand!: SharedLeftHandSideExpression;
    @Shared() operator!: PostfixUnaryOperator;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.PostfixUnaryExpression;
    }
}

/** @internal */
@Shared()
export class SharedDeleteExpression extends SharedNode<SyntaxKind.DeleteExpression> {
    @Shared() expression!: SharedUnaryExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.DeleteExpression;
    }
}

/** @internal */
@Shared()
export class SharedTypeOfExpression extends SharedNode<SyntaxKind.TypeOfExpression> {
    @Shared() expression!: SharedUnaryExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.TypeOfExpression;
    }
}

/** @internal */
@Shared()
export class SharedVoidExpression extends SharedNode<SyntaxKind.VoidExpression> {
    @Shared() expression!: SharedUnaryExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.VoidExpression;
    }
}

/** @internal */
@Shared()
export class SharedAwaitExpression extends SharedNode<SyntaxKind.AwaitExpression> {
    @Shared() expression!: SharedUnaryExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.AwaitExpression;
    }
}

/** @internal */
@Shared()
export class SharedYieldExpression extends SharedNode<SyntaxKind.YieldExpression> {
    @Shared() asteriskToken!: SharedToken<SyntaxKind.AsteriskToken> | undefined;
    @Shared() expression!: SharedExpression | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.YieldExpression;
    }
}

/** @internal */
@Shared()
export class SharedBinaryExpression extends HasSymbol(HasJSDoc(SharedNode))<SyntaxKind.BinaryExpression> {
    @Shared() left!: SharedExpression;
    @Shared() operatorToken!: SharedToken<BinaryOperator>;
    @Shared() right!: SharedExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.BinaryExpression;
    }
}

/** @internal */
@Shared()
export class SharedConditionalExpression extends SharedNode<SyntaxKind.ConditionalExpression> {
    @Shared() condition!: SharedExpression;
    @Shared() questionToken!: SharedToken<SyntaxKind.QuestionToken>;
    @Shared() whenTrue!: SharedExpression;
    @Shared() colonToken!: SharedToken<SyntaxKind.ColonToken>;
    @Shared() whenFalse!: SharedExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.ConditionalExpression;
    }
}

/** @internal */
export type SharedFunctionBody = SharedBlock;
/** @internal */
export type SharedConciseBody = SharedFunctionBody | SharedExpression;

/** @internal */
@Shared()
export class SharedFunctionExpression extends HasFunctionFlow(HasFlowNode(HasLocals(HasSymbol(HasJSDoc(SharedNode)))))<SyntaxKind.FunctionExpression> {
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
        return value instanceof SharedNode && value.kind === SyntaxKind.FunctionExpression;
    }
}

/** @internal */
@Shared()
export class SharedArrowFunction extends HasFunctionFlow(HasFlowNode(HasLocals(HasSymbol(HasJSDoc(SharedNode)))))<SyntaxKind.ArrowFunction> {
    @Shared() modifiers!: SharedNodeArray<SharedModifier> | undefined;
    @Shared() equalsGreaterThanToken!: SharedToken<SyntaxKind.EqualsGreaterThanToken>;
    @Shared() typeParameters!: SharedNodeArray<SharedTypeParameterDeclaration> | undefined;
    @Shared() parameters!: SharedNodeArray<SharedParameterDeclaration>;
    @Shared() type!: SharedTypeNode | undefined;
    @Shared() body!: SharedConciseBody;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.ArrowFunction;
    }
}

/** @internal */
@Shared()
export class SharedRegularExpressionLiteral extends SharedNode<SyntaxKind.RegularExpressionLiteral> {
    @Shared() text!: string;
    @Shared() isUnterminated!: boolean | undefined;
    @Shared() hasExtendedUnicodeEscape!: boolean | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.RegularExpressionLiteral;
    }
}

/** @internal */
@Shared()
export class SharedNoSubstitutionTemplateLiteral extends HasSymbol(SharedNode)<SyntaxKind.NoSubstitutionTemplateLiteral> {
    @Shared() text!: string;
    @Shared() isUnterminated!: boolean | undefined;
    @Shared() hasExtendedUnicodeEscape!: boolean | undefined;
    @Shared() rawText!: string | undefined;
    @Shared() templateFlags!: TokenFlags | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.NoSubstitutionTemplateLiteral;
    }
}

/** @internal */
@Shared()
export class SharedNumericLiteral extends HasSymbol(SharedNode)<SyntaxKind.NumericLiteral> {
    @Shared() text!: string;
    @Shared() isUnterminated!: boolean | undefined;
    @Shared() hasExtendedUnicodeEscape!: boolean | undefined;
    @Shared() numericLiteralFlags!: TokenFlags;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.NumericLiteral;
    }
}

/** @internal */
@Shared()
export class SharedBigIntLiteral extends SharedNode<SyntaxKind.BigIntLiteral> {
    @Shared() text!: string;
    @Shared() isUnterminated!: boolean | undefined;
    @Shared() hasExtendedUnicodeEscape!: boolean | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.BigIntLiteral;
    }
}

/** @internal */
@Shared()
export class SharedTemplateHead extends SharedNode<SyntaxKind.TemplateHead> {
    @Shared() text!: string;
    @Shared() isUnterminated!: boolean | undefined;
    @Shared() hasExtendedUnicodeEscape!: boolean | undefined;
    @Shared() rawText!: string | undefined;
    @Shared() templateFlags!: TokenFlags | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.TemplateHead;
    }
}

/** @internal */
@Shared()
export class SharedTemplateMiddle extends SharedNode<SyntaxKind.TemplateMiddle> {
    @Shared() text!: string;
    @Shared() isUnterminated!: boolean | undefined;
    @Shared() hasExtendedUnicodeEscape!: boolean | undefined;
    @Shared() rawText!: string | undefined;
    @Shared() templateFlags!: TokenFlags | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.TemplateMiddle;
    }
}

/** @internal */
@Shared()
export class SharedTemplateTail extends SharedNode<SyntaxKind.TemplateTail> {
    @Shared() text!: string;
    @Shared() isUnterminated!: boolean | undefined;
    @Shared() hasExtendedUnicodeEscape!: boolean | undefined;
    @Shared() rawText!: string | undefined;
    @Shared() templateFlags!: TokenFlags | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.TemplateTail;
    }
}

/** @internal */
@Shared()
export class SharedTemplateExpression extends SharedNode<SyntaxKind.TemplateExpression> {
    @Shared() head!: SharedTemplateHead;
    @Shared() templateSpans!: SharedNodeArray<SharedTemplateSpan>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.TemplateExpression;
    }
}

/** @internal */
@Shared()
export class SharedTemplateSpan extends SharedNode<SyntaxKind.TemplateSpan> {
    @Shared() expression!: SharedExpression;
    @Shared() literal!: SharedTemplateMiddle | SharedTemplateTail;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.TemplateSpan;
    }
}

/** @internal */
@Shared()
export class SharedParenthesizedExpression extends HasJSDoc(SharedNode)<SyntaxKind.ParenthesizedExpression> {
    @Shared() expression!: SharedExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.ParenthesizedExpression;
    }
}

/** @internal */
@Shared()
export class SharedArrayLiteralExpression extends SharedNode<SyntaxKind.ArrayLiteralExpression> {
    @Shared() elements!: SharedNodeArray<SharedExpression>;
    @Shared() multiLine!: boolean | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.ArrayLiteralExpression;
    }
}

/** @internal */
@Shared()
export class SharedSpreadElement extends SharedNode<SyntaxKind.SpreadElement> {
    @Shared() expression!: SharedExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.SpreadElement;
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
export class SharedObjectLiteralExpression extends HasSymbol(HasJSDoc(SharedNode))<SyntaxKind.ObjectLiteralExpression> {
    @Shared() properties!: SharedNodeArray<SharedObjectLiteralElement>;
    @Shared() multiLine!: boolean | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.ObjectLiteralExpression;
    }
}

/** @internal */
@Shared()
export class SharedPropertyAccessExpression extends HasFlowNode(HasSymbol(HasJSDoc(SharedNode)))<SyntaxKind.PropertyAccessExpression> {
    @Shared() expression!: SharedLeftHandSideExpression;
    @Shared() questionDotToken!: SharedToken<SyntaxKind.QuestionDotToken> | undefined;
    @Shared() name!: SharedMemberName;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.PropertyAccessExpression;
    }
}

/** @internal */
@Shared()
export class SharedElementAccessExpression extends HasFlowNode(HasSymbol(HasJSDoc(SharedNode)))<SyntaxKind.ElementAccessExpression> {
    @Shared() expression!: SharedLeftHandSideExpression;
    @Shared() questionDotToken!: SharedToken<SyntaxKind.QuestionDotToken> | undefined;
    @Shared() argumentExpression!: SharedExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.ElementAccessExpression;
    }
}

/** @internal */
@Shared()
export class SharedCallExpression extends HasSymbol(SharedNode)<SyntaxKind.CallExpression> {
    @Shared() expression!: SharedLeftHandSideExpression;
    @Shared() questionDotToken!: SharedToken<SyntaxKind.QuestionDotToken> | undefined;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;
    @Shared() arguments!: SharedNodeArray<SharedExpression>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.CallExpression;
    }
}

/** @internal */
@Shared()
export class SharedExpressionWithTypeArguments extends SharedNode<SyntaxKind.ExpressionWithTypeArguments> {
    @Shared() expression!: SharedLeftHandSideExpression;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.ExpressionWithTypeArguments;
    }
}

/** @internal */
@Shared()
export class SharedNewExpression extends HasSymbol(SharedNode)<SyntaxKind.NewExpression> {
    @Shared() expression!: SharedLeftHandSideExpression;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;
    @Shared() arguments!: SharedNodeArray<SharedExpression> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.NewExpression;
    }
}

/** @internal */
export type SharedTemplateLiteral =
    | SharedTemplateExpression
    | SharedNoSubstitutionTemplateLiteral
    ;

/** @internal */
@Shared()
export class SharedTaggedTemplateExpression extends SharedNode<SyntaxKind.TaggedTemplateExpression> {
    @Shared() tag!: SharedLeftHandSideExpression;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;
    @Shared() template!: SharedTemplateLiteral;
    @Shared() questionDotToken!: SharedToken<SyntaxKind.QuestionDotToken> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.TaggedTemplateExpression;
    }
}

/** @internal */
@Shared()
export class SharedAsExpression extends SharedNode<SyntaxKind.AsExpression> {
    @Shared() expression!: SharedExpression;
    @Shared() type!: SharedTypeNode;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.AsExpression;
    }
}

/** @internal */
@Shared()
export class SharedTypeAssertion extends SharedNode<SyntaxKind.TypeAssertionExpression> {
    @Shared() type!: SharedTypeNode;
    @Shared() expression!: SharedUnaryExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.TypeAssertionExpression;
    }
}

/** @internal */
@Shared()
export class SharedSatisfiesExpression extends SharedNode<SyntaxKind.SatisfiesExpression> {
    @Shared() expression!: SharedExpression;
    @Shared() type!: SharedTypeNode;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.SatisfiesExpression;
    }
}

/** @internal */
@Shared()
export class SharedNonNullExpression extends SharedNode<SyntaxKind.NonNullExpression> {
    @Shared() expression!: SharedExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.NonNullExpression;
    }
}

/** @internal */
@Shared()
export class SharedMetaProperty extends HasFlowNode(SharedNode)<SyntaxKind.MetaProperty> {
    @Shared() keywordToken!: SyntaxKind.NewKeyword | SyntaxKind.ImportKeyword;
    @Shared() name!: SharedIdentifier;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.MetaProperty;
    }
}

/** @internal */
@Shared()
export class SharedJsxElement extends SharedNode<SyntaxKind.JsxElement> {
    @Shared() openingElement!: SharedJsxOpeningElement;
    @Shared() children!: SharedNodeArray<SharedJsxChild>;
    @Shared() closingElement!: SharedJsxClosingElement;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JsxElement;
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
export class SharedJsxAttributes extends HasSymbol(SharedNode)<SyntaxKind.JsxAttributes> {
    @Shared() properties!: SharedNodeArray<SharedJsxAttributeLike>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JsxAttributes;
    }
}

/** @internal */
@Shared()
export class SharedJsxNamespacedName extends SharedNode<SyntaxKind.JsxNamespacedName> {
    @Shared() name!: SharedIdentifier;
    @Shared() namespace!: SharedIdentifier;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JsxNamespacedName;
    }
}

/** @internal */
@Shared()
export class SharedJsxOpeningElement extends SharedNode<SyntaxKind.JsxOpeningElement> {
    @Shared() tagName!: SharedJsxTagNameExpression;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;
    @Shared() attributes!: SharedJsxAttributes;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JsxOpeningElement;
    }
}

/** @internal */
@Shared()
export class SharedJsxSelfClosingElement extends SharedNode<SyntaxKind.JsxSelfClosingElement> {
    @Shared() tagName!: SharedJsxTagNameExpression;
    @Shared() typeArguments!: SharedNodeArray<SharedTypeNode> | undefined;
    @Shared() attributes!: SharedJsxAttributes;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JsxSelfClosingElement;
    }
}

/** @internal */
@Shared()
export class SharedJsxFragment extends SharedNode<SyntaxKind.JsxFragment> {
    @Shared() openingFragment!: SharedJsxOpeningFragment;
    @Shared() children!: SharedNodeArray<SharedJsxChild>;
    @Shared() closingFragment!: SharedJsxClosingFragment;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JsxFragment;
    }
}

/** @internal */
@Shared()
export class SharedJsxOpeningFragment extends SharedNode<SyntaxKind.JsxOpeningFragment> {
    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JsxOpeningFragment;
    }
}

/** @internal */
@Shared()
export class SharedJsxClosingFragment extends SharedNode<SyntaxKind.JsxClosingFragment> {
    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JsxClosingFragment;
    }
}

/** @internal */
@Shared()
export class SharedJsxAttribute extends HasSymbol(SharedNode)<SyntaxKind.JsxAttribute> {
    @Shared() name!: SharedJsxAttributeName;
    @Shared() initializer!: SharedJsxAttributeValue | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JsxAttribute;
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
export class SharedJsxSpreadAttribute extends SharedNode<SyntaxKind.JsxSpreadAttribute> {
    @Shared() expression!: SharedExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JsxSpreadAttribute;
    }
}

/** @internal */
@Shared()
export class SharedJsxClosingElement extends SharedNode<SyntaxKind.JsxClosingElement> {
    @Shared() tagName!: SharedJsxTagNameExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JsxClosingElement;
    }
}

/** @internal */
@Shared()
export class SharedJsxExpression extends SharedNode<SyntaxKind.JsxExpression> {
    @Shared() dotDotDotToken!: SharedToken<SyntaxKind.DotDotDotToken> | undefined;
    @Shared() expression!: SharedExpression | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JsxExpression;
    }
}

/** @internal */
@Shared()
export class SharedJsxText extends SharedNode<SyntaxKind.JsxText> {
    @Shared() text!: string;
    @Shared() isUnterminated!: boolean | undefined;
    @Shared() hasExtendedUnicodeEscape!: boolean | undefined;
    @Shared() containsOnlyTriviaWhiteSpaces!: boolean;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JsxText;
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
export class SharedEmptyStatement extends HasJSDoc(SharedNode)<SyntaxKind.EmptyStatement> {
    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.EmptyStatement;
    }
}

/** @internal */
@Shared()
export class SharedDebuggerStatement extends HasFlowNode(HasJSDoc(SharedNode))<SyntaxKind.DebuggerStatement> {
    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.DebuggerStatement;
    }
}

/** @internal */
@Shared()
export class SharedMissingDeclaration extends HasSymbol(HasJSDoc(SharedNode))<SyntaxKind.MissingDeclaration> {
    @Shared() name!: SharedIdentifier | undefined;
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.MissingDeclaration;
    }
}

/** @internal */
@Shared()
export class SharedBlock extends HasLocals(HasJSDoc(SharedNode))<SyntaxKind.Block> {
    @Shared() statements!: SharedNodeArray<SharedStatement>;
    @Shared() multiLine!: boolean | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.Block;
    }
}

/** @internal */
@Shared()
export class SharedVariableStatement extends HasFlowNode(HasJSDoc(SharedNode))<SyntaxKind.VariableStatement> {
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;
    @Shared() declarationList!: SharedVariableDeclarationList;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.VariableStatement;
    }
}

/** @internal */
@Shared()
export class SharedExpressionStatement extends HasFlowNode(HasJSDoc(SharedNode))<SyntaxKind.ExpressionStatement> {
    @Shared() expression!: SharedExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.ExpressionStatement;
    }
}

/** @internal */
@Shared()
export class SharedIfStatement extends HasFlowNode(HasJSDoc(SharedNode))<SyntaxKind.IfStatement> {
    @Shared() expression!: SharedExpression;
    @Shared() thenStatement!: SharedStatement;
    @Shared() elseStatement!: SharedStatement | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.IfStatement;
    }
}

/** @internal */
@Shared()
export class SharedDoStatement extends HasFlowNode(HasJSDoc(SharedNode))<SyntaxKind.DoStatement> {
    @Shared() statement!: SharedStatement;
    @Shared() expression!: SharedExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.DoStatement;
    }
}

/** @internal */
@Shared()
export class SharedWhileStatement extends HasFlowNode(HasJSDoc(SharedNode))<SyntaxKind.WhileStatement> {
    @Shared() expression!: SharedExpression;
    @Shared() statement!: SharedStatement;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.WhileStatement;
    }
}

/** @internal */
export type SharedForInitializer =
    | SharedVariableDeclarationList
    | SharedExpression
    ;

/** @internal */
@Shared()
export class SharedForStatement extends HasFlowNode(HasLocals(HasJSDoc(SharedNode)))<SyntaxKind.ForStatement> {
    @Shared() initializer!: SharedForInitializer | undefined;
    @Shared() condition!: SharedExpression | undefined;
    @Shared() incrementor!: SharedExpression | undefined;
    @Shared() statement!: SharedStatement;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.ForStatement;
    }
}

/** @internal */
export type SharedForInOrOfStatement =
    | SharedForInStatement
    | SharedForOfStatement
    ;

/** @internal */
@Shared()
export class SharedForInStatement extends HasFlowNode(HasLocals(HasJSDoc(SharedNode)))<SyntaxKind.ForInStatement> {
    @Shared() initializer!: SharedForInitializer;
    @Shared() expression!: SharedExpression;
    @Shared() statement!: SharedStatement;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.ForInStatement;
    }
}

/** @internal */
@Shared()
export class SharedForOfStatement extends HasFlowNode(HasLocals(HasJSDoc(SharedNode)))<SyntaxKind.ForOfStatement> {
    @Shared() awaitModifier!: SharedToken<SyntaxKind.AwaitKeyword> | undefined;
    @Shared() initializer!: SharedForInitializer;
    @Shared() expression!: SharedExpression;
    @Shared() statement!: SharedStatement;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.ForOfStatement;
    }
}

/** @internal */
@Shared()
export class SharedBreakStatement extends HasFlowNode(HasJSDoc(SharedNode))<SyntaxKind.BreakStatement> {
    @Shared() label!: SharedIdentifier | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.BreakStatement;
    }
}

/** @internal */
@Shared()
export class SharedContinueStatement extends HasFlowNode(HasJSDoc(SharedNode))<SyntaxKind.ContinueStatement> {
    @Shared() label!: SharedIdentifier | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.ContinueStatement;
    }
}

/** @internal */
@Shared()
export class SharedReturnStatement extends HasFlowNode(HasJSDoc(SharedNode))<SyntaxKind.ReturnStatement> {
    @Shared() expression!: SharedExpression | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.ReturnStatement;
    }
}

/** @internal */
@Shared()
export class SharedWithStatement extends HasFlowNode(HasJSDoc(SharedNode))<SyntaxKind.WithStatement> {
    @Shared() expression!: SharedExpression;
    @Shared() statement!: SharedStatement;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.WithStatement;
    }
}

/** @internal */
@Shared()
export class SharedSwitchStatement extends HasFlowNode(HasJSDoc(SharedNode))<SyntaxKind.SwitchStatement> {
    @Shared() expression!: SharedExpression;
    @Shared() caseBlock!: SharedCaseBlock;
    @Shared() possiblyExhaustive!: boolean;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.SwitchStatement;
    }
}

/** @internal */
@Shared()
export class SharedCaseBlock extends HasLocals(SharedNode)<SyntaxKind.CaseBlock> {
    @Shared() clauses!: SharedNodeArray<SharedCaseOrDefaultClause>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.CaseBlock;
    }
}

/** @internal */
@Shared()
export class SharedCaseClause extends HasJSDoc(SharedNode)<SyntaxKind.CaseClause> {
    @Shared() expression!: SharedExpression;
    @Shared() statements!: SharedNodeArray<SharedStatement>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.CaseClause;
    }
}

/** @internal */
@Shared()
export class SharedDefaultClause extends SharedNode<SyntaxKind.DefaultClause> {
    @Shared() statements!: SharedNodeArray<SharedStatement>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.DefaultClause;
    }
}

/** @internal */
export type SharedCaseOrDefaultClause =
    | SharedCaseClause
    | SharedDefaultClause
    ;

/** @internal */
@Shared()
export class SharedLabeledStatement extends HasFlowNode(HasJSDoc(SharedNode))<SyntaxKind.LabeledStatement> {
    @Shared() label!: SharedIdentifier;
    @Shared() statement!: SharedStatement;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.LabeledStatement;
    }
}

/** @internal */
@Shared()
export class SharedThrowStatement extends HasFlowNode(HasJSDoc(SharedNode))<SyntaxKind.ThrowStatement> {
    @Shared() expression!: SharedExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.ThrowStatement;
    }
}

/** @internal */
@Shared()
export class SharedTryStatement extends HasFlowNode(HasJSDoc(SharedNode))<SyntaxKind.TryStatement> {
    @Shared() tryBlock!: SharedBlock;
    @Shared() catchClause!: SharedCatchClause | undefined;
    @Shared() finallyBlock!: SharedBlock | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.TryStatement;
    }
}

/** @internal */
@Shared()
export class SharedCatchClause extends HasLocals(SharedNode)<SyntaxKind.CatchClause> {
    @Shared() variableDeclaration!: SharedVariableDeclaration | undefined;
    @Shared() block!: SharedBlock;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.CatchClause;
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
export class SharedClassDeclaration extends HasSymbol(HasJSDoc(SharedNode))<SyntaxKind.ClassDeclaration> {
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;
    @Shared() name!: SharedIdentifier | undefined;
    @Shared() typeParameters!: SharedNodeArray<SharedTypeParameterDeclaration> | undefined;
    @Shared() heritageClauses!: SharedNodeArray<SharedHeritageClause> | undefined;
    @Shared() members!: SharedNodeArray<SharedClassElement>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.ClassDeclaration;
    }
}

/** @internal */
@Shared()
export class SharedClassExpression extends HasSymbol(HasJSDoc(SharedNode))<SyntaxKind.ClassExpression> {
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;
    @Shared() name!: SharedIdentifier | undefined;
    @Shared() typeParameters!: SharedNodeArray<SharedTypeParameterDeclaration> | undefined;
    @Shared() heritageClauses!: SharedNodeArray<SharedHeritageClause> | undefined;
    @Shared() members!: SharedNodeArray<SharedClassElement>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.ClassExpression;
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
export class SharedInterfaceDeclaration extends HasSymbol(HasJSDoc(SharedNode))<SyntaxKind.InterfaceDeclaration> {
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;
    @Shared() name!: SharedIdentifier;
    @Shared() typeParameters!: SharedNodeArray<SharedTypeParameterDeclaration> | undefined;
    @Shared() heritageClauses!: SharedNodeArray<SharedHeritageClause> | undefined;
    @Shared() members!: SharedNodeArray<SharedTypeElement>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.InterfaceDeclaration;
    }
}

/** @internal */
@Shared()
export class SharedHeritageClause extends SharedNode<SyntaxKind.HeritageClause> {
    @Shared() token!: SyntaxKind.ExtendsKeyword | SyntaxKind.ImplementsKeyword;
    @Shared() types!: SharedNodeArray<SharedExpressionWithTypeArguments>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.HeritageClause;
    }
}

/** @internal */
@Shared()
export class SharedTypeAliasDeclaration extends HasLocals(HasSymbol(HasJSDoc(SharedNode)))<SyntaxKind.TypeAliasDeclaration> {
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;
    @Shared() name!: SharedIdentifier;
    @Shared() typeParameters!: SharedNodeArray<SharedTypeParameterDeclaration> | undefined;
    @Shared() type!: SharedTypeNode;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.TypeAliasDeclaration;
    }
}

/** @internal */
@Shared()
export class SharedEnumMember extends HasSymbol(HasJSDoc(SharedNode))<SyntaxKind.EnumMember> {
    @Shared() name!: SharedPropertyName;
    @Shared() initializer!: SharedExpression | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.EnumMember;
    }
}

/** @internal */
@Shared()
export class SharedEnumDeclaration extends HasSymbol(HasJSDoc(SharedNode))<SyntaxKind.EnumDeclaration> {
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;
    @Shared() name!: SharedIdentifier;
    @Shared() members!: SharedNodeArray<SharedEnumMember>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.EnumDeclaration;
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
export class SharedModuleDeclaration extends HasLocals(HasSymbol(HasJSDoc(SharedNode)))<SyntaxKind.ModuleDeclaration> {
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;
    @Shared() name!: SharedModuleName;
    @Shared() body!: SharedModuleBody | SharedJSDocNamespaceDeclaration | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.ModuleDeclaration;
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
export class SharedModuleBlock extends HasJSDoc(SharedNode)<SyntaxKind.ModuleBlock> {
    @Shared() statements!: SharedNodeArray<SharedStatement>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.ModuleBlock;
    }
}

/** @internal */
export type SharedModuleReference =
    | SharedEntityName
    | SharedExternalModuleReference
    ;

/** @internal */
@Shared()
export class SharedImportEqualsDeclaration extends HasSymbol(HasJSDoc(SharedNode))<SyntaxKind.ImportEqualsDeclaration> {
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;
    @Shared() name!: SharedIdentifier;
    @Shared() isTypeOnly!: boolean;
    @Shared() moduleReference!: SharedModuleReference;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.ImportEqualsDeclaration;
    }
}

/** @internal */
@Shared()
export class SharedExternalModuleReference extends SharedNode<SyntaxKind.ExternalModuleReference> {
    @Shared() expression!: SharedExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.ExternalModuleReference;
    }
}

/** @internal */
@Shared()
export class SharedImportDeclaration extends HasSymbol(HasJSDoc(SharedNode))<SyntaxKind.ImportDeclaration> {
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;
    @Shared() importClause!: SharedImportClause | undefined;
    @Shared() moduleSpecifier!: SharedExpression;
    @Shared() assertClause!: SharedAssertClause | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.ImportDeclaration;
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
export class SharedImportClause extends HasSymbol(SharedNode)<SyntaxKind.ImportClause> {
    @Shared() isTypeOnly!: boolean;
    @Shared() name!: SharedIdentifier | undefined;
    @Shared() namedBindings!: SharedNamedImportBindings | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.ImportClause;
    }
}

/** @internal */
export type SharedAssertionKey =
    | SharedIdentifier
    | SharedStringLiteral
    ;

/** @internal */
@Shared()
export class SharedAssertEntry extends SharedNode<SyntaxKind.AssertEntry> {
    @Shared() name!: SharedAssertionKey;
    @Shared() value!: SharedExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.AssertEntry;
    }
}

/** @internal */
@Shared()
export class SharedAssertClause extends SharedNode<SyntaxKind.AssertClause> {
    @Shared() elements!: SharedNodeArray<SharedAssertEntry>;
    @Shared() multiLine!: boolean | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.AssertClause;
    }
}

/** @internal */
@Shared()
export class SharedNamespaceImport extends HasSymbol(SharedNode)<SyntaxKind.NamespaceImport> {
    @Shared() name!: SharedIdentifier;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.NamespaceImport;
    }
}

/** @internal */
@Shared()
export class SharedNamespaceExport extends HasSymbol(SharedNode)<SyntaxKind.NamespaceExport> {
    @Shared() name!: SharedIdentifier;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.NamespaceExport;
    }
}

/** @internal */
@Shared()
export class SharedNamespaceExportDeclaration extends HasSymbol(HasJSDoc(SharedNode))<SyntaxKind.NamespaceExportDeclaration> {
    @Shared() name!: SharedIdentifier;
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.NamespaceExportDeclaration;
    }
}

/** @internal */
@Shared()
export class SharedExportDeclaration extends HasSymbol(HasJSDoc(SharedNode))<SyntaxKind.ExportDeclaration> {
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;
    @Shared() isTypeOnly!: boolean;
    @Shared() exportClause!: SharedNamedExportBindings | undefined;
    @Shared() moduleSpecifier!: SharedExpression | undefined;
    @Shared() assertClause!: SharedAssertClause | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.ExportDeclaration;
    }
}

/** @internal */
@Shared()
export class SharedNamedImports extends SharedNode<SyntaxKind.NamedImports> {
    @Shared() elements!: SharedNodeArray<SharedImportSpecifier>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.NamedImports;
    }
}

/** @internal */
@Shared()
export class SharedNamedExports extends SharedNode<SyntaxKind.NamedExports> {
    @Shared() elements!: SharedNodeArray<SharedExportSpecifier>;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.NamedExports;
    }
}

/** @internal */
@Shared()
export class SharedImportSpecifier extends HasSymbol(SharedNode)<SyntaxKind.ImportSpecifier> {
    @Shared() propertyName!: SharedIdentifier | undefined;
    @Shared() name!: SharedIdentifier;
    @Shared() isTypeOnly!: boolean;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.ImportSpecifier;
    }
}

/** @internal */
@Shared()
export class SharedExportSpecifier extends HasJSDoc(SharedNode)<SyntaxKind.ExportSpecifier> {
    @Shared() isTypeOnly!: boolean;
    @Shared() propertyName!: SharedIdentifier | undefined;
    @Shared() name!: SharedIdentifier;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.ExportSpecifier;
    }
}

/** @internal */
@Shared()
export class SharedExportAssignment extends HasSymbol(HasJSDoc(SharedNode))<SyntaxKind.ExportAssignment> {
    @Shared() modifiers!: SharedNodeArray<SharedModifierLike> | undefined;
    @Shared() isExportEquals!: boolean | undefined;
    @Shared() expression!: SharedExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.ExportAssignment;
    }
}

/** @internal */
@Shared()
export class SharedJSDocTypeExpression extends SharedNode<SyntaxKind.JSDocTypeExpression> {
    @Shared() type!: SharedTypeNode;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDocTypeExpression;
    }
}

/** @internal */
@Shared()
export class SharedJSDocNameReference extends SharedNode<SyntaxKind.JSDocNameReference> {
    @Shared() name!: SharedEntityName | SharedJSDocMemberName;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDocNameReference;
    }
}

/** @internal */
@Shared()
export class SharedJSDocMemberName extends SharedNode<SyntaxKind.JSDocMemberName> {
    @Shared() left!: SharedEntityName | SharedJSDocMemberName;
    @Shared() right!: SharedIdentifier;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDocMemberName;
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
export class SharedJSDocAllType extends SharedNode<SyntaxKind.JSDocAllType> {

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDocAllType;
    }
}

/** @internal */
@Shared()
export class SharedJSDocUnknownType extends SharedNode<SyntaxKind.JSDocUnknownType> {

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDocUnknownType;
    }
}

/** @internal */
@Shared()
export class SharedJSDocNonNullableType extends SharedNode<SyntaxKind.JSDocNonNullableType> {
    @Shared() type!: SharedTypeNode;
    @Shared() postfix!: boolean;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDocNonNullableType;
    }
}

/** @internal */
@Shared()
export class SharedJSDocNullableType extends SharedNode<SyntaxKind.JSDocNullableType> {
    @Shared() type!: SharedTypeNode;
    @Shared() postfix!: boolean;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDocNullableType;
    }
}

/** @internal */
@Shared()
export class SharedJSDocOptionalType extends SharedNode<SyntaxKind.JSDocOptionalType> {
    @Shared() type!: SharedTypeNode;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDocOptionalType;
    }
}

/** @internal */
@Shared()
export class SharedJSDocFunctionType extends HasLocals(HasSymbol(SharedNode))<SyntaxKind.JSDocFunctionType> {
    @Shared() typeParameters!: SharedNodeArray<SharedTypeParameterDeclaration> | undefined;
    @Shared() parameters!: SharedNodeArray<SharedParameterDeclaration>;
    @Shared() type!: SharedTypeNode | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDocFunctionType;
    }
}

/** @internal */
@Shared()
export class SharedJSDocVariadicType extends SharedNode<SyntaxKind.JSDocVariadicType> {
    @Shared() type!: SharedTypeNode;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDocVariadicType;
    }
}

/** @internal */
@Shared()
export class SharedJSDocNamepathType extends SharedNode<SyntaxKind.JSDocNamepathType> {
    @Shared() type!: SharedTypeNode;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDocNamepathType;
    }
}

/** @internal */
@Shared()
export class SharedJSDocNode extends SharedNode<SyntaxKind.JSDoc> {
    @Shared() tags!: SharedNodeArray<SharedJSDocTag> | undefined;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDoc;
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
export class SharedJSDocLink extends SharedNode<SyntaxKind.JSDocLink> {
    @Shared() name!: SharedEntityName | SharedJSDocMemberName | undefined;
    @Shared() text!: string;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDocLink;
    }
}

/** @internal */
@Shared()
export class SharedJSDocLinkCode extends SharedNode<SyntaxKind.JSDocLinkCode> {
    @Shared() name!: SharedEntityName | SharedJSDocMemberName | undefined;
    @Shared() text!: string;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDocLinkCode;
    }
}

/** @internal */
@Shared()
export class SharedJSDocLinkPlain extends SharedNode<SyntaxKind.JSDocLinkPlain> {
    @Shared() name!: SharedEntityName | SharedJSDocMemberName | undefined;
    @Shared() text!: string;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDocLinkPlain;
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
export class SharedJSDocText extends SharedNode<SyntaxKind.JSDocText> {
    @Shared() text!: string;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDocText;
    }
}

/** @internal */
@Shared()
export class SharedJSDocUnknownTag extends SharedNode<SyntaxKind.JSDocTag> {
    @Shared() tagName!: SharedIdentifier;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDocTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocAugmentsTag extends SharedNode<SyntaxKind.JSDocAugmentsTag> {
    @Shared() class!: SharedExpressionWithTypeArguments & { readonly expression: SharedIdentifier | SharedPropertyAccessExpression };
    @Shared() tagName!: SharedIdentifier;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDocAugmentsTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocImplementsTag extends SharedNode<SyntaxKind.JSDocImplementsTag> {
    @Shared() class!: SharedExpressionWithTypeArguments & { readonly expression: SharedIdentifier | SharedPropertyAccessExpression };
    @Shared() tagName!: SharedIdentifier;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDocImplementsTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocAuthorTag extends SharedNode<SyntaxKind.JSDocAuthorTag> {
    @Shared() tagName!: SharedIdentifier;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDocAuthorTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocDeprecatedTag extends SharedNode<SyntaxKind.JSDocDeprecatedTag> {
    @Shared() tagName!: SharedIdentifier;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDocDeprecatedTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocClassTag extends SharedNode<SyntaxKind.JSDocClassTag> {
    @Shared() tagName!: SharedIdentifier;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDocClassTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocPublicTag extends SharedNode<SyntaxKind.JSDocPublicTag> {
    @Shared() tagName!: SharedIdentifier;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDocPublicTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocPrivateTag extends SharedNode<SyntaxKind.JSDocPrivateTag> {
    @Shared() tagName!: SharedIdentifier;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDocPrivateTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocProtectedTag extends SharedNode<SyntaxKind.JSDocProtectedTag> {
    @Shared() tagName!: SharedIdentifier;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDocProtectedTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocReadonlyTag extends SharedNode<SyntaxKind.JSDocReadonlyTag> {
    @Shared() tagName!: SharedIdentifier;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDocReadonlyTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocOverrideTag extends SharedNode<SyntaxKind.JSDocOverrideTag> {
    @Shared() tagName!: SharedIdentifier;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDocOverrideTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocEnumTag extends HasLocals(HasSymbol(SharedNode))<SyntaxKind.JSDocEnumTag> {
    @Shared() tagName!: SharedIdentifier;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;
    @Shared() typeExpression!: SharedJSDocTypeExpression;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDocEnumTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocThisTag extends SharedNode<SyntaxKind.JSDocThisTag> {
    @Shared() typeExpression!: SharedJSDocTypeExpression;
    @Shared() tagName!: SharedIdentifier;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDocThisTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocTemplateTag extends SharedNode<SyntaxKind.JSDocTemplateTag> {
    @Shared() tagName!: SharedIdentifier;
    @Shared() constraint!: SharedJSDocTypeExpression | undefined;
    @Shared() typeParameters!: SharedNodeArray<SharedTypeParameterDeclaration>;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDocTemplateTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocSeeTag extends SharedNode<SyntaxKind.JSDocSeeTag> {
    @Shared() tagName!: SharedIdentifier;
    @Shared() name!: SharedJSDocNameReference | undefined;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDocSeeTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocReturnTag extends SharedNode<SyntaxKind.JSDocReturnTag> {
    @Shared() tagName!: SharedIdentifier;
    @Shared() typeExpression!: SharedJSDocTypeExpression | undefined;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDocReturnTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocTypeTag extends SharedNode<SyntaxKind.JSDocTypeTag> {
    @Shared() tagName!: SharedIdentifier;
    @Shared() typeExpression!: SharedJSDocTypeExpression;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDocTypeTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocTypedefTag extends HasLocals(HasSymbol(SharedNode))<SyntaxKind.JSDocTypedefTag> {
    @Shared() tagName!: SharedIdentifier;
    @Shared() fullName!: SharedJSDocNamespaceDeclaration | SharedIdentifier | undefined;
    @Shared() name!: SharedIdentifier | undefined;
    @Shared() typeExpression!: SharedJSDocTypeExpression | SharedJSDocTypeLiteral | undefined;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDocTypedefTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocCallbackTag extends HasLocals(HasSymbol(SharedNode))<SyntaxKind.JSDocCallbackTag> {
    @Shared() tagName!: SharedIdentifier;
    @Shared() fullName!: SharedJSDocNamespaceDeclaration | SharedIdentifier | undefined;
    @Shared() name!: SharedIdentifier | undefined;
    @Shared() typeExpression!: SharedJSDocSignature;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDocCallbackTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocOverloadTag extends SharedNode<SyntaxKind.JSDocOverloadTag> {
    @Shared() tagName!: SharedIdentifier;
    @Shared() typeExpression!: SharedJSDocSignature;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDocOverloadTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocThrowsTag extends SharedNode<SyntaxKind.JSDocThrowsTag> {
    @Shared() tagName!: SharedIdentifier;
    @Shared() typeExpression!: SharedJSDocTypeExpression | undefined;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDocThrowsTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocSignature extends HasLocals(HasSymbol(SharedNode))<SyntaxKind.JSDocSignature> {
    @Shared() typeParameters!: ReadonlySharedArray<SharedJSDocTemplateTag> | undefined;
    @Shared() parameters!: ReadonlySharedArray<SharedJSDocParameterTag>;
    @Shared() type!: SharedJSDocReturnTag | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDocSignature;
    }
}

/** @internal */
@Shared()
export class SharedJSDocPropertyTag extends HasSymbol(SharedNode)<SyntaxKind.JSDocPropertyTag> {
    @Shared() tagName!: SharedIdentifier;
    @Shared() name!: SharedEntityName;
    @Shared() typeExpression!: SharedJSDocTypeExpression | undefined;
    @Shared() isNameFirst!: boolean;
    @Shared() isBracketed!: boolean;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDocPropertyTag;
    }
}

/** @internal */
@Shared()
export class SharedJSDocParameterTag extends HasSymbol(SharedNode)<SyntaxKind.JSDocParameterTag> {
    @Shared() tagName!: SharedIdentifier;
    @Shared() name!: SharedEntityName;
    @Shared() typeExpression!: SharedJSDocTypeExpression | undefined;
    @Shared() isNameFirst!: boolean;
    @Shared() isBracketed!: boolean;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDocParameterTag;
    }
}

/** @internal */
export type SharedJSDocPropertyLikeTag =
    | SharedJSDocPropertyTag
    | SharedJSDocParameterTag
    ;

/** @internal */
@Shared()
export class SharedJSDocTypeLiteral extends HasSymbol(SharedNode)<SyntaxKind.JSDocTypeLiteral> {
    @Shared() jsDocPropertyTags!: ReadonlySharedArray<SharedJSDocPropertyLikeTag> | undefined;
    @Shared() isArrayType!: boolean;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDocTypeLiteral;
    }
}

/** @internal */
@Shared()
export class SharedJSDocSatisfiesTag extends SharedNode<SyntaxKind.JSDocSatisfiesTag> {
    @Shared() typeExpression!: SharedJSDocTypeExpression;
    @Shared() tagName!: SharedIdentifier;
    @Shared() comment!: string | SharedNodeArray<SharedJSDocComment> | undefined;

    static [Symbol.hasInstance](value: unknown) {
        return value instanceof SharedNode && value.kind === SyntaxKind.JSDocSatisfiesTag;
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
export class SharedCommentRange extends SharedNode<CommentKind> {
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
export class SharedSourceFile extends HasEndFlow(HasLocals(HasSymbol(SharedNode)))<SyntaxKind.SourceFile> {
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
        return value instanceof SharedNode && value.kind === SyntaxKind.SourceFile;
    }
}

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
export interface SharedJSDocContainer extends SharedNode {
    jsDoc: SharedArray<SharedJSDocNode> | undefined;
}

function HasJSDoc<F extends abstract new (...args: any) => SharedNode>(base: F): F & (abstract new (...args: any) => SharedJSDocContainer) {
    @Shared({ abstract: true })
    abstract class HasJSDoc extends base {
        @Shared() jsDoc: SharedArray<SharedJSDocNode> | undefined;
    }
    return HasJSDoc;
}

/** @internal */
export interface SharedLocalsContainer extends SharedNode {
    locals: undefined;
    nextContainer: undefined;
}

function HasLocals<F extends abstract new (...args: any) => SharedNode>(base: F): F & (abstract new (...args: any) => SharedLocalsContainer) {
    @Shared({ abstract: true })
    abstract class HasLocals extends base {
        @Shared() locals: undefined;
        @Shared() nextContainer: undefined;
    }
    return HasLocals;
}

/** @internal */
export interface SharedFlowNodeContainer extends SharedNode {
    flowNode: undefined;
}

function HasFlowNode<F extends abstract new (...args: any) => SharedNode>(base: F): F & (abstract new (...args: any) => SharedFlowNodeContainer) {
    @Shared({ abstract: true })
    abstract class HasFlowNode extends base {
        @Shared() flowNode: undefined;
    }
    return HasFlowNode;
}

/** @internal */
export interface SharedSymbolContainer extends SharedNode {
    symbol: undefined;
    localSymbol: undefined;
}

function HasSymbol<F extends abstract new (...args: any) => SharedNode>(base: F): F & (abstract new (...args: any) => SharedSymbolContainer) {
    @Shared({ abstract: true })
    abstract class HasSymbol extends base {
        @Shared() symbol: undefined;
        @Shared() localSymbol: undefined;
    }
    return HasSymbol;
}

/** @internal */
export interface SharedEndFlowContainer extends SharedNode {
    endFlowNode: undefined;
}

function HasEndFlow<F extends abstract new (...args: any) => SharedNode>(base: F): F & (abstract new (...args: any) => SharedEndFlowContainer) {
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

function HasFunctionFlow<F extends abstract new (...args: any) => SharedNode>(base: F): F & (abstract new (...args: any) => SharedFunctionFlowContainer) {
    @Shared({ abstract: true })
    abstract class HasFunctionFlow extends HasEndFlow(base) {
        @Shared() returnFlowNode: undefined;
    }
    return HasFunctionFlow;
}
