import {
    AccessorDeclaration,
    ArrayLiteralExpression,
    BigIntLiteral,
    BinaryExpression,
    Block,
    CaseBlock,
    ClassLikeDeclaration,
    ConditionalExpression,
    ConditionalTypeNode,
    Debug,
    EntityName,
    Expression,
    findAncestor,
    FunctionLikeDeclaration,
    getAllAccessorDeclarations,
    getEffectiveReturnTypeNode,
    getEmitScriptTarget,
    getFirstConstructorWithBody,
    getParseTreeNode,
    getRestParameterElementType,
    getSetAccessorTypeAnnotationNode,
    getStrictOptionValue,
    Identifier,
    isAsyncFunction,
    isBinaryExpression,
    isClassLike,
    isConditionalExpression,
    isConditionalTypeNode,
    isFunctionLike,
    isGeneratedIdentifier,
    isIdentifier,
    isLiteralTypeNode,
    isNumericLiteral,
    isParenthesizedExpression,
    isPropertyAccessExpression,
    isStringLiteral,
    isTypeOfExpression,
    isVoidExpression,
    JSDocNonNullableType,
    JSDocNullableType,
    JSDocOptionalType,
    LiteralTypeNode,
    MethodDeclaration,
    ModuleBlock,
    Node,
    nodeIsPresent,
    NumericLiteral,
    ParameterDeclaration,
    parseNodeFactory,
    PrefixUnaryExpression,
    PropertyAccessEntityNameExpression,
    PropertyDeclaration,
    QualifiedName,
    ScriptTarget,
    setParent,
    setTextRange,
    SignatureDeclaration,
    skipTypeParentheses,
    SourceFile,
    SyntaxKind,
    TransformationContext,
    TypeNode,
    TypeOperatorNode,
    TypePredicateNode,
    TypeReferenceNode,
    TypeReferenceSerializationKind,
    UnionOrIntersectionTypeNode,
    VoidExpression,
} from "../_namespaces/ts.js";

/** @internal */
export type SerializedEntityName =
    | Identifier // Globals (i.e., `String`, `Number`, etc.)
    | PropertyAccessEntityNameExpression // `A.B`
;

/** @internal */
export type SerializedTypeNode =
    | SerializedEntityName
    | ConditionalExpression // Type Reference or Global fallback
    | VoidExpression // `void 0` used for null/undefined/never
;

/** @internal */
export interface RuntimeTypeSerializerContext {
    /** Specifies the current lexical block scope */
    currentLexicalScope: SourceFile | Block | ModuleBlock | CaseBlock;
    /** Specifies the containing `class`, but only when there is no other block scope between the current location and the `class`. */
    currentNameScope: ClassLikeDeclaration | undefined;
}

/** @internal */
export interface RuntimeTypeSerializer {
    /**
     * Serializes a type node for use with decorator type metadata.
     *
     * Types are serialized in the following fashion:
     * - Void types point to "undefined" (e.g. "void 0")
     * - Function and Constructor types point to the global "Function" constructor.
     * - Interface types with a call or construct signature types point to the global
     *   "Function" constructor.
     * - Array and Tuple types point to the global "Array" constructor.
     * - Type predicates and booleans point to the global "Boolean" constructor.
     * - String literal types and strings point to the global "String" constructor.
     * - Enum and number types point to the global "Number" constructor.
     * - Symbol types point to the global "Symbol" constructor.
     * - Type references to classes (or class-like variables) point to the constructor for the class.
     * - Anything else points to the global "Object" constructor.
     *
     * @param node The type node to serialize.
     */
    serializeTypeNode(serializerContext: RuntimeTypeSerializerContext, node: TypeNode): Expression;
    /**
     * Serializes the type of a node for use with decorator type metadata.
     * @param node The node that should have its type serialized.
     */
    serializeTypeOfNode(serializerContext: RuntimeTypeSerializerContext, node: PropertyDeclaration | ParameterDeclaration | AccessorDeclaration | ClassLikeDeclaration | MethodDeclaration, container: ClassLikeDeclaration): Expression;
    /**
     * Serializes the types of the parameters of a node for use with decorator type metadata.
     * @param node The node that should have its parameter types serialized.
     */
    serializeParameterTypesOfNode(serializerContext: RuntimeTypeSerializerContext, node: Node, container: ClassLikeDeclaration): ArrayLiteralExpression;
    /**
     * Serializes the return type of a node for use with decorator type metadata.
     * @param node The node that should have its return type serialized.
     */
    serializeReturnTypeOfNode(serializerContext: RuntimeTypeSerializerContext, node: Node): SerializedTypeNode;
}

/** @internal */
export function createRuntimeTypeSerializer(context: TransformationContext): RuntimeTypeSerializer {
    const {
        factory,
        hoistVariableDeclaration,
    } = context;

    const resolver = context.getEmitResolver();
    const compilerOptions = context.getCompilerOptions();
    const languageVersion = getEmitScriptTarget(compilerOptions);
    const strictNullChecks = getStrictOptionValue(compilerOptions, "strictNullChecks");

    let currentLexicalScope: SourceFile | CaseBlock | ModuleBlock | Block;
    let currentNameScope: ClassLikeDeclaration | undefined;

    return {
        serializeTypeNode: (serializerContext, node) => setSerializerContextAnd(serializerContext, serializeTypeNode, node),
        serializeTypeOfNode: (serializerContext, node, container) => setSerializerContextAnd(serializerContext, serializeTypeOfNode, node, container),
        serializeParameterTypesOfNode: (serializerContext, node, container) => setSerializerContextAnd(serializerContext, serializeParameterTypesOfNode, node, container),
        serializeReturnTypeOfNode: (serializerContext, node) => setSerializerContextAnd(serializerContext, serializeReturnTypeOfNode, node),
    };

    function setSerializerContextAnd<TNode extends Node | undefined, R>(serializerContext: RuntimeTypeSerializerContext, cb: (node: TNode) => R, node: TNode): R;
    function setSerializerContextAnd<TNode extends Node | undefined, T, R>(serializerContext: RuntimeTypeSerializerContext, cb: (node: TNode, arg: T) => R, node: TNode, arg: T): R;
    function setSerializerContextAnd<TNode extends Node | undefined, T, R>(serializerContext: RuntimeTypeSerializerContext, cb: (node: TNode, arg?: T) => R, node: TNode, arg?: T) {
        const savedCurrentLexicalScope = currentLexicalScope;
        const savedCurrentNameScope = currentNameScope;

        currentLexicalScope = serializerContext.currentLexicalScope;
        currentNameScope = serializerContext.currentNameScope;

        const result = arg === undefined ? cb(node) : cb(node, arg);

        currentLexicalScope = savedCurrentLexicalScope;
        currentNameScope = savedCurrentNameScope;
        return result;
    }

    function getAccessorTypeNode(node: AccessorDeclaration, container: ClassLikeDeclaration) {
        const accessors = getAllAccessorDeclarations(container.members, node);
        return accessors.setAccessor && getSetAccessorTypeAnnotationNode(accessors.setAccessor)
            || accessors.getAccessor && getEffectiveReturnTypeNode(accessors.getAccessor);
    }

    /**
     * Serializes the type of a node for use with decorator type metadata.
     * @param node The node that should have its type serialized.
     */
    function serializeTypeOfNode(node: PropertyDeclaration | ParameterDeclaration | AccessorDeclaration | ClassLikeDeclaration | MethodDeclaration, container: ClassLikeDeclaration): SerializedTypeNode {
        switch (node.kind) {
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.Parameter:
                return serializeTypeNode(node.type);
            case SyntaxKind.SetAccessor:
            case SyntaxKind.GetAccessor:
                return serializeTypeNode(getAccessorTypeNode(node, container));
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.ClassExpression:
            case SyntaxKind.MethodDeclaration:
                return factory.createIdentifier("Function");
            default:
                return factory.createVoidZero();
        }
    }

    /**
     * Serializes the type of a node for use with decorator type metadata.
     * @param node The node that should have its type serialized.
     */
    function serializeParameterTypesOfNode(node: Node, container: ClassLikeDeclaration): ArrayLiteralExpression {
        const valueDeclaration = isClassLike(node)
            ? getFirstConstructorWithBody(node)
            : isFunctionLike(node) && nodeIsPresent((node as FunctionLikeDeclaration).body)
            ? node
            : undefined;

        const expressions: SerializedTypeNode[] = [];
        if (valueDeclaration) {
            const parameters = getParametersOfDecoratedDeclaration(valueDeclaration, container);
            const numParameters = parameters.length;
            for (let i = 0; i < numParameters; i++) {
                const parameter = parameters[i];
                if (i === 0 && isIdentifier(parameter.name) && parameter.name.escapedText === "this") {
                    continue;
                }
                if (parameter.dotDotDotToken) {
                    expressions.push(serializeTypeNode(getRestParameterElementType(parameter.type)));
                }
                else {
                    expressions.push(serializeTypeOfNode(parameter, container));
                }
            }
        }

        return factory.createArrayLiteralExpression(expressions);
    }

    function getParametersOfDecoratedDeclaration(node: SignatureDeclaration, container: ClassLikeDeclaration) {
        if (container && node.kind === SyntaxKind.GetAccessor) {
            const { setAccessor } = getAllAccessorDeclarations(container.members, node as AccessorDeclaration);
            if (setAccessor) {
                return setAccessor.parameters;
            }
        }
        return node.parameters;
    }

    /**
     * Serializes the return type of a node for use with decorator type metadata.
     * @param node The node that should have its return type serialized.
     */
    function serializeReturnTypeOfNode(node: Node): SerializedTypeNode {
        if (isFunctionLike(node) && node.type) {
            return serializeTypeNode(node.type);
        }
        else if (isAsyncFunction(node)) {
            return factory.createIdentifier("Promise");
        }

        return factory.createVoidZero();
    }

    /**
     * Serializes a type node for use with decorator type metadata.
     *
     * Types are serialized in the following fashion:
     * - Void types point to "undefined" (e.g. "void 0")
     * - Function and Constructor types point to the global "Function" constructor.
     * - Interface types with a call or construct signature types point to the global
     *   "Function" constructor.
     * - Array and Tuple types point to the global "Array" constructor.
     * - Type predicates and booleans point to the global "Boolean" constructor.
     * - String literal types and strings point to the global "String" constructor.
     * - Enum and number types point to the global "Number" constructor.
     * - Symbol types point to the global "Symbol" constructor.
     * - Type references to classes (or class-like variables) point to the constructor for the class.
     * - Anything else points to the global "Object" constructor.
     *
     * @param node The type node to serialize.
     */
    function serializeTypeNode(node: TypeNode | undefined): SerializedTypeNode {
        if (node === undefined) {
            return factory.createIdentifier("Object");
        }

        node = skipTypeParentheses(node);

        switch (node.kind) {
            case SyntaxKind.VoidKeyword:
            case SyntaxKind.UndefinedKeyword:
            case SyntaxKind.NeverKeyword:
                return factory.createVoidZero();

            case SyntaxKind.FunctionType:
            case SyntaxKind.ConstructorType:
                return factory.createIdentifier("Function");

            case SyntaxKind.ArrayType:
            case SyntaxKind.TupleType:
                return factory.createIdentifier("Array");

            case SyntaxKind.TypePredicate:
                return (node as TypePredicateNode).assertsModifier ?
                    factory.createVoidZero() :
                    factory.createIdentifier("Boolean");

            case SyntaxKind.BooleanKeyword:
                return factory.createIdentifier("Boolean");

            case SyntaxKind.TemplateLiteralType:
            case SyntaxKind.StringKeyword:
                return factory.createIdentifier("String");

            case SyntaxKind.ObjectKeyword:
                return factory.createIdentifier("Object");

            case SyntaxKind.LiteralType:
                return serializeLiteralOfLiteralTypeNode((node as LiteralTypeNode).literal);

            case SyntaxKind.NumberKeyword:
                return factory.createIdentifier("Number");

            case SyntaxKind.BigIntKeyword:
                return getGlobalConstructor("BigInt", ScriptTarget.ES2020);

            case SyntaxKind.SymbolKeyword:
                return getGlobalConstructor("Symbol", ScriptTarget.ES2015);

            case SyntaxKind.TypeReference:
                return serializeTypeReferenceNode(node as TypeReferenceNode);

            case SyntaxKind.IntersectionType:
                return serializeUnionOrIntersectionConstituents((node as UnionOrIntersectionTypeNode).types, /*isIntersection*/ true);

            case SyntaxKind.UnionType:
                return serializeUnionOrIntersectionConstituents((node as UnionOrIntersectionTypeNode).types, /*isIntersection*/ false);

            case SyntaxKind.ConditionalType:
                return serializeUnionOrIntersectionConstituents([(node as ConditionalTypeNode).trueType, (node as ConditionalTypeNode).falseType], /*isIntersection*/ false);

            case SyntaxKind.TypeOperator:
                if ((node as TypeOperatorNode).operator === SyntaxKind.ReadonlyKeyword) {
                    return serializeTypeNode((node as TypeOperatorNode).type);
                }
                break;

            case SyntaxKind.TypeQuery:
            case SyntaxKind.IndexedAccessType:
            case SyntaxKind.MappedType:
            case SyntaxKind.TypeLiteral:
            case SyntaxKind.AnyKeyword:
            case SyntaxKind.UnknownKeyword:
            case SyntaxKind.ThisType:
            case SyntaxKind.ImportType:
                break;

            // handle JSDoc types from an invalid parse
            case SyntaxKind.JSDocAllType:
            case SyntaxKind.JSDocUnknownType:
            case SyntaxKind.JSDocFunctionType:
            case SyntaxKind.JSDocVariadicType:
            case SyntaxKind.JSDocNamepathType:
                break;

            case SyntaxKind.JSDocNullableType:
            case SyntaxKind.JSDocNonNullableType:
            case SyntaxKind.JSDocOptionalType:
                return serializeTypeNode((node as JSDocNullableType | JSDocNonNullableType | JSDocOptionalType).type);

            default:
                return Debug.failBadSyntaxKind(node);
        }

        return factory.createIdentifier("Object");
    }

    function serializeLiteralOfLiteralTypeNode(node: LiteralTypeNode["literal"]): SerializedTypeNode {
        switch (node.kind) {
            case SyntaxKind.StringLiteral:
            case SyntaxKind.NoSubstitutionTemplateLiteral:
                return factory.createIdentifier("String");

            case SyntaxKind.PrefixUnaryExpression: {
                const operand = (node as PrefixUnaryExpression).operand;
                switch (operand.kind) {
                    case SyntaxKind.NumericLiteral:
                    case SyntaxKind.BigIntLiteral:
                        return serializeLiteralOfLiteralTypeNode(operand as NumericLiteral | BigIntLiteral);
                    default:
                        return Debug.failBadSyntaxKind(operand);
                }
            }

            case SyntaxKind.NumericLiteral:
                return factory.createIdentifier("Number");

            case SyntaxKind.BigIntLiteral:
                return getGlobalConstructor("BigInt", ScriptTarget.ES2020);

            case SyntaxKind.TrueKeyword:
            case SyntaxKind.FalseKeyword:
                return factory.createIdentifier("Boolean");

            case SyntaxKind.NullKeyword:
                return factory.createVoidZero();

            default:
                return Debug.failBadSyntaxKind(node);
        }
    }

    function serializeUnionOrIntersectionConstituents(types: readonly TypeNode[], isIntersection: boolean): SerializedTypeNode {
        // Note when updating logic here also update `getEntityNameForDecoratorMetadata` in checker.ts so that aliases can be marked as referenced
        let serializedType: SerializedTypeNode | undefined;
        for (let typeNode of types) {
            typeNode = skipTypeParentheses(typeNode);
            if (typeNode.kind === SyntaxKind.NeverKeyword) {
                if (isIntersection) return factory.createVoidZero(); // Reduce to `never` in an intersection
                continue; // Elide `never` in a union
            }

            if (typeNode.kind === SyntaxKind.UnknownKeyword) {
                if (!isIntersection) return factory.createIdentifier("Object"); // Reduce to `unknown` in a union
                continue; // Elide `unknown` in an intersection
            }

            if (typeNode.kind === SyntaxKind.AnyKeyword) {
                return factory.createIdentifier("Object"); // Reduce to `any` in a union or intersection
            }

            if (!strictNullChecks && ((isLiteralTypeNode(typeNode) && typeNode.literal.kind === SyntaxKind.NullKeyword) || typeNode.kind === SyntaxKind.UndefinedKeyword)) {
                continue; // Elide null and undefined from unions for metadata, just like what we did prior to the implementation of strict null checks
            }

            const serializedConstituent = serializeTypeNode(typeNode);
            if (isIdentifier(serializedConstituent) && serializedConstituent.escapedText === "Object") {
                // One of the individual is global object, return immediately
                return serializedConstituent;
            }

            // If there exists union that is not `void 0` expression, check if the the common type is identifier.
            // anything more complex and we will just default to Object
            if (serializedType) {
                // Different types
                if (!equateSerializedTypeNodes(serializedType, serializedConstituent)) {
                    return factory.createIdentifier("Object");
                }
            }
            else {
                // Initialize the union type
                serializedType = serializedConstituent;
            }
        }

        // If we were able to find common type, use it
        return serializedType ?? (factory.createVoidZero()); // Fallback is only hit if all union constituents are null/undefined/never
    }

    function equateSerializedTypeNodes(left: Expression, right: Expression): boolean {
        return (
            // temp vars used in fallback
            isGeneratedIdentifier(left) ? isGeneratedIdentifier(right) :
                // entity names
                isIdentifier(left) ? isIdentifier(right)
                    && left.escapedText === right.escapedText :
                isPropertyAccessExpression(left) ? isPropertyAccessExpression(right)
                    && equateSerializedTypeNodes(left.expression, right.expression)
                    && equateSerializedTypeNodes(left.name, right.name) :
                // `void 0`
                isVoidExpression(left) ? isVoidExpression(right)
                    && isNumericLiteral(left.expression) && left.expression.text === "0"
                    && isNumericLiteral(right.expression) && right.expression.text === "0" :
                // `"undefined"` or `"function"` in `typeof` checks
                isStringLiteral(left) ? isStringLiteral(right)
                    && left.text === right.text :
                // used in `typeof` checks for fallback
                isTypeOfExpression(left) ? isTypeOfExpression(right)
                    && equateSerializedTypeNodes(left.expression, right.expression) :
                // parens in `typeof` checks with temps
                isParenthesizedExpression(left) ? isParenthesizedExpression(right)
                    && equateSerializedTypeNodes(left.expression, right.expression) :
                // conditionals used in fallback
                isConditionalExpression(left) ? isConditionalExpression(right)
                    && equateSerializedTypeNodes(left.condition, right.condition)
                    && equateSerializedTypeNodes(left.whenTrue, right.whenTrue)
                    && equateSerializedTypeNodes(left.whenFalse, right.whenFalse) :
                // logical binary and assignments used in fallback
                isBinaryExpression(left) ? isBinaryExpression(right)
                    && left.operatorToken.kind === right.operatorToken.kind
                    && equateSerializedTypeNodes(left.left, right.left)
                    && equateSerializedTypeNodes(left.right, right.right) :
                false
        );
    }

    /**
     * Serializes a TypeReferenceNode to an appropriate JS constructor value for use with decorator type metadata.
     * @param node The type reference node.
     */
    function serializeTypeReferenceNode(node: TypeReferenceNode): SerializedTypeNode {
        const kind = resolver.getTypeReferenceSerializationKind(node.typeName, currentNameScope ?? currentLexicalScope);
        switch (kind) {
            case TypeReferenceSerializationKind.Unknown:
                // From conditional type type reference that cannot be resolved is Similar to any or unknown
                if (findAncestor(node, n => n.parent && isConditionalTypeNode(n.parent) && (n.parent.trueType === n || n.parent.falseType === n))) {
                    return factory.createIdentifier("Object");
                }

                const serialized = serializeEntityNameAsExpressionFallback(node.typeName);
                const temp = factory.createTempVariable(hoistVariableDeclaration);
                return factory.createConditionalExpression(
                    factory.createTypeCheck(factory.createAssignment(temp, serialized), "function"),
                    /*questionToken*/ undefined,
                    temp,
                    /*colonToken*/ undefined,
                    factory.createIdentifier("Object"),
                );

            case TypeReferenceSerializationKind.TypeWithConstructSignatureAndValue:
                return serializeEntityNameAsExpression(node.typeName);

            case TypeReferenceSerializationKind.VoidNullableOrNeverType:
                return factory.createVoidZero();

            case TypeReferenceSerializationKind.BigIntLikeType:
                return getGlobalConstructor("BigInt", ScriptTarget.ES2020);

            case TypeReferenceSerializationKind.BooleanType:
                return factory.createIdentifier("Boolean");

            case TypeReferenceSerializationKind.NumberLikeType:
                return factory.createIdentifier("Number");

            case TypeReferenceSerializationKind.StringLikeType:
                return factory.createIdentifier("String");

            case TypeReferenceSerializationKind.ArrayLikeType:
                return factory.createIdentifier("Array");

            case TypeReferenceSerializationKind.ESSymbolType:
                return getGlobalConstructor("Symbol", ScriptTarget.ES2015);

            case TypeReferenceSerializationKind.TypeWithCallSignature:
                return factory.createIdentifier("Function");

            case TypeReferenceSerializationKind.Promise:
                return factory.createIdentifier("Promise");

            case TypeReferenceSerializationKind.ObjectType:
                return factory.createIdentifier("Object");

            default:
                return Debug.assertNever(kind);
        }
    }

    /**
     * Produces an expression that results in `right` if `left` is not undefined at runtime:
     *
     * ```
     * typeof left !== "undefined" && right
     * ```
     *
     * We use `typeof L !== "undefined"` (rather than `L !== undefined`) since `L` may not be declared.
     * It's acceptable for this expression to result in `false` at runtime, as the result is intended to be
     * further checked by any containing expression.
     */
    function createCheckedValue(left: Expression, right: Expression) {
        return factory.createLogicalAnd(
            factory.createStrictInequality(factory.createTypeOfExpression(left), factory.createStringLiteral("undefined")),
            right,
        );
    }

    /**
     * Serializes an entity name which may not exist at runtime, but whose access shouldn't throw
     * @param node The entity name to serialize.
     */
    function serializeEntityNameAsExpressionFallback(node: EntityName): BinaryExpression {
        if (node.kind === SyntaxKind.Identifier) {
            // A -> typeof A !== "undefined" && A
            const copied = serializeEntityNameAsExpression(node);
            return createCheckedValue(copied, copied);
        }
        if (node.left.kind === SyntaxKind.Identifier) {
            // A.B -> typeof A !== "undefined" && A.B
            return createCheckedValue(serializeEntityNameAsExpression(node.left), serializeEntityNameAsExpression(node));
        }
        // A.B.C -> typeof A !== "undefined" && (_a = A.B) !== void 0 && _a.C
        const left = serializeEntityNameAsExpressionFallback(node.left);
        const temp = factory.createTempVariable(hoistVariableDeclaration);
        return factory.createLogicalAnd(
            factory.createLogicalAnd(
                left.left,
                factory.createStrictInequality(factory.createAssignment(temp, left.right), factory.createVoidZero()),
            ),
            factory.createPropertyAccessExpression(temp, node.right),
        );
    }

    /**
     * Serializes an entity name as an expression for decorator type metadata.
     * @param node The entity name to serialize.
     */
    function serializeEntityNameAsExpression(node: EntityName): SerializedEntityName {
        switch (node.kind) {
            case SyntaxKind.Identifier:
                // Create a clone of the name with a new parent, and treat it as if it were
                // a source tree node for the purposes of the checker.
                const name = setParent(setTextRange(parseNodeFactory.cloneNode(node), node), node.parent);
                name.original = undefined;
                setParent(name, getParseTreeNode(currentLexicalScope)); // ensure the parent is set to a parse tree node.
                return name;

            case SyntaxKind.QualifiedName:
                return serializeQualifiedNameAsExpression(node);
        }
    }

    /**
     * Serializes an qualified name as an expression for decorator type metadata.
     * @param node The qualified name to serialize.
     */
    function serializeQualifiedNameAsExpression(node: QualifiedName): SerializedEntityName {
        return factory.createPropertyAccessExpression(serializeEntityNameAsExpression(node.left), node.right) as PropertyAccessEntityNameExpression;
    }

    function getGlobalConstructorWithFallback(name: string) {
        return factory.createConditionalExpression(
            factory.createTypeCheck(factory.createIdentifier(name), "function"),
            /*questionToken*/ undefined,
            factory.createIdentifier(name),
            /*colonToken*/ undefined,
            factory.createIdentifier("Object"),
        );
    }

    function getGlobalConstructor(name: string, minLanguageVersion: ScriptTarget): SerializedTypeNode {
        return languageVersion < minLanguageVersion ?
            getGlobalConstructorWithFallback(name) :
            factory.createIdentifier(name);
    }
}
