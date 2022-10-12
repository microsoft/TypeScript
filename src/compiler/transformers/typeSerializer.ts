import * as ts from "../_namespaces/ts";

type SerializedEntityName =
    | ts.Identifier // Globals (i.e., `String`, `Number`, etc.)
    | ts.PropertyAccessEntityNameExpression // `A.B`
    ;

type SerializedTypeNode =
    | SerializedEntityName
    | ts.ConditionalExpression // Type Reference or Global fallback
    | ts.VoidExpression // `void 0` used for null/undefined/never
    ;

/** @internal */
export interface RuntimeTypeSerializerContext {
    /** Specifies the current lexical block scope */
    currentLexicalScope: ts.SourceFile | ts.Block | ts.ModuleBlock | ts.CaseBlock;
    /** Specifies the containing `class`, but only when there is no other block scope between the current location and the `class`. */
    currentNameScope: ts.ClassLikeDeclaration | undefined;
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
    serializeTypeNode(serializerContext: RuntimeTypeSerializerContext, node: ts.TypeNode): ts.Expression;
    /**
     * Serializes the type of a node for use with decorator type metadata.
     * @param node The node that should have its type serialized.
     */
    serializeTypeOfNode(serializerContext: RuntimeTypeSerializerContext, node: ts.PropertyDeclaration | ts.ParameterDeclaration | ts.AccessorDeclaration | ts.ClassLikeDeclaration | ts.MethodDeclaration): ts.Expression;
    /**
     * Serializes the types of the parameters of a node for use with decorator type metadata.
     * @param node The node that should have its parameter types serialized.
     */
    serializeParameterTypesOfNode(serializerContext: RuntimeTypeSerializerContext, node: ts.Node, container: ts.ClassLikeDeclaration): ts.ArrayLiteralExpression;
    /**
     * Serializes the return type of a node for use with decorator type metadata.
     * @param node The node that should have its return type serialized.
     */
    serializeReturnTypeOfNode(serializerContext: RuntimeTypeSerializerContext, node: ts.Node): SerializedTypeNode;
}

/** @internal */
export function createRuntimeTypeSerializer(context: ts.TransformationContext): RuntimeTypeSerializer {
    const {
        hoistVariableDeclaration
    } = context;

    const resolver = context.getEmitResolver();
    const compilerOptions = context.getCompilerOptions();
    const languageVersion = ts.getEmitScriptTarget(compilerOptions);
    const strictNullChecks = ts.getStrictOptionValue(compilerOptions, "strictNullChecks");

    let currentLexicalScope: ts.SourceFile | ts.CaseBlock | ts.ModuleBlock | ts.Block;
    let currentNameScope: ts.ClassLikeDeclaration | undefined;

    return {
        serializeTypeNode: (serializerContext, node) => setSerializerContextAnd(serializerContext, serializeTypeNode, node),
        serializeTypeOfNode: (serializerContext, node) => setSerializerContextAnd(serializerContext, serializeTypeOfNode, node),
        serializeParameterTypesOfNode: (serializerContext, node, container) => setSerializerContextAnd(serializerContext, serializeParameterTypesOfNode, node, container),
        serializeReturnTypeOfNode: (serializerContext, node) => setSerializerContextAnd(serializerContext, serializeReturnTypeOfNode, node),
    };

    function setSerializerContextAnd<TNode extends ts.Node | undefined, R>(serializerContext: RuntimeTypeSerializerContext, cb: (node: TNode) => R, node: TNode): R;
    function setSerializerContextAnd<TNode extends ts.Node | undefined, T, R>(serializerContext: RuntimeTypeSerializerContext, cb: (node: TNode, arg: T) => R, node: TNode, arg: T): R;
    function setSerializerContextAnd<TNode extends ts.Node | undefined, T, R>(serializerContext: RuntimeTypeSerializerContext, cb: (node: TNode, arg?: T) => R, node: TNode, arg?: T) {
        const savedCurrentLexicalScope = currentLexicalScope;
        const savedCurrentNameScope = currentNameScope;

        currentLexicalScope = serializerContext.currentLexicalScope;
        currentNameScope = serializerContext.currentNameScope;

        const result = arg === undefined ? cb(node) : cb(node, arg);

        currentLexicalScope = savedCurrentLexicalScope;
        currentNameScope = savedCurrentNameScope;
        return result;
    }

    function getAccessorTypeNode(node: ts.AccessorDeclaration) {
        const accessors = resolver.getAllAccessorDeclarations(node);
        return accessors.setAccessor && ts.getSetAccessorTypeAnnotationNode(accessors.setAccessor)
            || accessors.getAccessor && ts.getEffectiveReturnTypeNode(accessors.getAccessor);
    }

    /**
     * Serializes the type of a node for use with decorator type metadata.
     * @param node The node that should have its type serialized.
     */
    function serializeTypeOfNode(node: ts.PropertyDeclaration | ts.ParameterDeclaration | ts.AccessorDeclaration | ts.ClassLikeDeclaration | ts.MethodDeclaration): SerializedTypeNode {
        switch (node.kind) {
            case ts.SyntaxKind.PropertyDeclaration:
            case ts.SyntaxKind.Parameter:
                return serializeTypeNode(node.type);
            case ts.SyntaxKind.SetAccessor:
            case ts.SyntaxKind.GetAccessor:
                return serializeTypeNode(getAccessorTypeNode(node));
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.ClassExpression:
            case ts.SyntaxKind.MethodDeclaration:
                return ts.factory.createIdentifier("Function");
            default:
                return ts.factory.createVoidZero();
        }
    }

    /**
     * Serializes the type of a node for use with decorator type metadata.
     * @param node The node that should have its type serialized.
     */
    function serializeParameterTypesOfNode(node: ts.Node, container: ts.ClassLikeDeclaration): ts.ArrayLiteralExpression {
        const valueDeclaration =
            ts.isClassLike(node)
                ? ts.getFirstConstructorWithBody(node)
                : ts.isFunctionLike(node) && ts.nodeIsPresent((node as ts.FunctionLikeDeclaration).body)
                    ? node
                    : undefined;

        const expressions: SerializedTypeNode[] = [];
        if (valueDeclaration) {
            const parameters = getParametersOfDecoratedDeclaration(valueDeclaration, container);
            const numParameters = parameters.length;
            for (let i = 0; i < numParameters; i++) {
                const parameter = parameters[i];
                if (i === 0 && ts.isIdentifier(parameter.name) && parameter.name.escapedText === "this") {
                    continue;
                }
                if (parameter.dotDotDotToken) {
                    expressions.push(serializeTypeNode(ts.getRestParameterElementType(parameter.type)));
                }
                else {
                    expressions.push(serializeTypeOfNode(parameter));
                }
            }
        }

        return ts.factory.createArrayLiteralExpression(expressions);
    }

    function getParametersOfDecoratedDeclaration(node: ts.SignatureDeclaration, container: ts.ClassLikeDeclaration) {
        if (container && node.kind === ts.SyntaxKind.GetAccessor) {
            const { setAccessor } = ts.getAllAccessorDeclarations(container.members, node as ts.AccessorDeclaration);
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
    function serializeReturnTypeOfNode(node: ts.Node): SerializedTypeNode {
        if (ts.isFunctionLike(node) && node.type) {
            return serializeTypeNode(node.type);
        }
        else if (ts.isAsyncFunction(node)) {
            return ts.factory.createIdentifier("Promise");
        }

        return ts.factory.createVoidZero();
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
    function serializeTypeNode(node: ts.TypeNode | undefined): SerializedTypeNode {
        if (node === undefined) {
            return ts.factory.createIdentifier("Object");
        }

        node = ts.skipTypeParentheses(node);

        switch (node.kind) {
            case ts.SyntaxKind.VoidKeyword:
            case ts.SyntaxKind.UndefinedKeyword:
            case ts.SyntaxKind.NeverKeyword:
                return ts.factory.createVoidZero();

            case ts.SyntaxKind.FunctionType:
            case ts.SyntaxKind.ConstructorType:
                return ts.factory.createIdentifier("Function");

            case ts.SyntaxKind.ArrayType:
            case ts.SyntaxKind.TupleType:
                return ts.factory.createIdentifier("Array");

            case ts.SyntaxKind.TypePredicate:
                return (node as ts.TypePredicateNode).assertsModifier ?
                    ts.factory.createVoidZero() :
                    ts.factory.createIdentifier("Boolean");

            case ts.SyntaxKind.BooleanKeyword:
                return ts.factory.createIdentifier("Boolean");

            case ts.SyntaxKind.TemplateLiteralType:
            case ts.SyntaxKind.StringKeyword:
                return ts.factory.createIdentifier("String");

            case ts.SyntaxKind.ObjectKeyword:
                return ts.factory.createIdentifier("Object");

            case ts.SyntaxKind.LiteralType:
                return serializeLiteralOfLiteralTypeNode((node as ts.LiteralTypeNode).literal);

            case ts.SyntaxKind.NumberKeyword:
                return ts.factory.createIdentifier("Number");

            case ts.SyntaxKind.BigIntKeyword:
                return getGlobalConstructor("BigInt", ts.ScriptTarget.ES2020);

            case ts.SyntaxKind.SymbolKeyword:
                return getGlobalConstructor("Symbol", ts.ScriptTarget.ES2015);

            case ts.SyntaxKind.TypeReference:
                return serializeTypeReferenceNode(node as ts.TypeReferenceNode);

            case ts.SyntaxKind.IntersectionType:
                return serializeUnionOrIntersectionConstituents((node as ts.UnionOrIntersectionTypeNode).types, /*isIntersection*/ true);

            case ts.SyntaxKind.UnionType:
                return serializeUnionOrIntersectionConstituents((node as ts.UnionOrIntersectionTypeNode).types, /*isIntersection*/ false);

            case ts.SyntaxKind.ConditionalType:
                return serializeUnionOrIntersectionConstituents([(node as ts.ConditionalTypeNode).trueType, (node as ts.ConditionalTypeNode).falseType], /*isIntersection*/ false);

            case ts.SyntaxKind.TypeOperator:
                if ((node as ts.TypeOperatorNode).operator === ts.SyntaxKind.ReadonlyKeyword) {
                    return serializeTypeNode((node as ts.TypeOperatorNode).type);
                }
                break;

            case ts.SyntaxKind.TypeQuery:
            case ts.SyntaxKind.IndexedAccessType:
            case ts.SyntaxKind.MappedType:
            case ts.SyntaxKind.TypeLiteral:
            case ts.SyntaxKind.AnyKeyword:
            case ts.SyntaxKind.UnknownKeyword:
            case ts.SyntaxKind.ThisType:
            case ts.SyntaxKind.ImportType:
                break;

            // handle JSDoc types from an invalid parse
            case ts.SyntaxKind.JSDocAllType:
            case ts.SyntaxKind.JSDocUnknownType:
            case ts.SyntaxKind.JSDocFunctionType:
            case ts.SyntaxKind.JSDocVariadicType:
            case ts.SyntaxKind.JSDocNamepathType:
                break;

            case ts.SyntaxKind.JSDocNullableType:
            case ts.SyntaxKind.JSDocNonNullableType:
            case ts.SyntaxKind.JSDocOptionalType:
                return serializeTypeNode((node as ts.JSDocNullableType | ts.JSDocNonNullableType | ts.JSDocOptionalType).type);

            default:
                return ts.Debug.failBadSyntaxKind(node);
        }

        return ts.factory.createIdentifier("Object");
    }

    function serializeLiteralOfLiteralTypeNode(node: ts.LiteralTypeNode["literal"]): SerializedTypeNode {
        switch (node.kind) {
            case ts.SyntaxKind.StringLiteral:
            case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
                return ts.factory.createIdentifier("String");

            case ts.SyntaxKind.PrefixUnaryExpression: {
                const operand = (node as ts.PrefixUnaryExpression).operand;
                switch (operand.kind) {
                    case ts.SyntaxKind.NumericLiteral:
                    case ts.SyntaxKind.BigIntLiteral:
                        return serializeLiteralOfLiteralTypeNode(operand as ts.NumericLiteral | ts.BigIntLiteral);
                    default:
                        return ts.Debug.failBadSyntaxKind(operand);
                }
            }

            case ts.SyntaxKind.NumericLiteral:
                return ts.factory.createIdentifier("Number");

            case ts.SyntaxKind.BigIntLiteral:
                return getGlobalConstructor("BigInt", ts.ScriptTarget.ES2020);

            case ts.SyntaxKind.TrueKeyword:
            case ts.SyntaxKind.FalseKeyword:
                return ts.factory.createIdentifier("Boolean");

            case ts.SyntaxKind.NullKeyword:
                return ts.factory.createVoidZero();

            default:
                return ts.Debug.failBadSyntaxKind(node);
        }
    }

    function serializeUnionOrIntersectionConstituents(types: readonly ts.TypeNode[], isIntersection: boolean): SerializedTypeNode {
        // Note when updating logic here also update `getEntityNameForDecoratorMetadata` in checker.ts so that aliases can be marked as referenced
        let serializedType: SerializedTypeNode | undefined;
        for (let typeNode of types) {
            typeNode = ts.skipTypeParentheses(typeNode);
            if (typeNode.kind === ts.SyntaxKind.NeverKeyword) {
                if (isIntersection) return ts.factory.createVoidZero(); // Reduce to `never` in an intersection
                continue; // Elide `never` in a union
            }

            if (typeNode.kind === ts.SyntaxKind.UnknownKeyword) {
                if (!isIntersection) return ts.factory.createIdentifier("Object"); // Reduce to `unknown` in a union
                continue; // Elide `unknown` in an intersection
            }

            if (typeNode.kind === ts.SyntaxKind.AnyKeyword) {
                return ts.factory.createIdentifier("Object"); // Reduce to `any` in a union or intersection
            }

            if (!strictNullChecks && ((ts.isLiteralTypeNode(typeNode) && typeNode.literal.kind === ts.SyntaxKind.NullKeyword) || typeNode.kind === ts.SyntaxKind.UndefinedKeyword)) {
                continue; // Elide null and undefined from unions for metadata, just like what we did prior to the implementation of strict null checks
            }

            const serializedConstituent = serializeTypeNode(typeNode);
            if (ts.isIdentifier(serializedConstituent) && serializedConstituent.escapedText === "Object") {
                // One of the individual is global object, return immediately
                return serializedConstituent;
            }

            // If there exists union that is not `void 0` expression, check if the the common type is identifier.
            // anything more complex and we will just default to Object
            if (serializedType) {
                // Different types
                if (!equateSerializedTypeNodes(serializedType, serializedConstituent)) {
                    return ts.factory.createIdentifier("Object");
                }
            }
            else {
                // Initialize the union type
                serializedType = serializedConstituent;
            }
        }

        // If we were able to find common type, use it
        return serializedType ?? (ts.factory.createVoidZero()); // Fallback is only hit if all union constituents are null/undefined/never
    }

    function equateSerializedTypeNodes(left: ts.Expression, right: ts.Expression): boolean {
        return (
            // temp vars used in fallback
            ts.isGeneratedIdentifier(left) ? ts.isGeneratedIdentifier(right) :

            // entity names
            ts.isIdentifier(left) ? ts.isIdentifier(right)
                && left.escapedText === right.escapedText :

            ts.isPropertyAccessExpression(left) ? ts.isPropertyAccessExpression(right)
                && equateSerializedTypeNodes(left.expression, right.expression)
                && equateSerializedTypeNodes(left.name, right.name) :

            // `void 0`
            ts.isVoidExpression(left) ? ts.isVoidExpression(right)
                && ts.isNumericLiteral(left.expression) && left.expression.text === "0"
                && ts.isNumericLiteral(right.expression) && right.expression.text === "0" :

            // `"undefined"` or `"function"` in `typeof` checks
            ts.isStringLiteral(left) ? ts.isStringLiteral(right)
                && left.text === right.text :

            // used in `typeof` checks for fallback
            ts.isTypeOfExpression(left) ? ts.isTypeOfExpression(right)
                && equateSerializedTypeNodes(left.expression, right.expression) :

            // parens in `typeof` checks with temps
            ts.isParenthesizedExpression(left) ? ts.isParenthesizedExpression(right)
                && equateSerializedTypeNodes(left.expression, right.expression) :

            // conditionals used in fallback
            ts.isConditionalExpression(left) ? ts.isConditionalExpression(right)
                && equateSerializedTypeNodes(left.condition, right.condition)
                && equateSerializedTypeNodes(left.whenTrue, right.whenTrue)
                && equateSerializedTypeNodes(left.whenFalse, right.whenFalse) :

            // logical binary and assignments used in fallback
            ts.isBinaryExpression(left) ? ts.isBinaryExpression(right)
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
    function serializeTypeReferenceNode(node: ts.TypeReferenceNode): SerializedTypeNode {
        const kind = resolver.getTypeReferenceSerializationKind(node.typeName, currentNameScope ?? currentLexicalScope);
        switch (kind) {
            case ts.TypeReferenceSerializationKind.Unknown:
                // From conditional type type reference that cannot be resolved is Similar to any or unknown
                if (ts.findAncestor(node, n => n.parent && ts.isConditionalTypeNode(n.parent) && (n.parent.trueType === n || n.parent.falseType === n))) {
                    return ts.factory.createIdentifier("Object");
                }

                const serialized = serializeEntityNameAsExpressionFallback(node.typeName);
                const temp = ts.factory.createTempVariable(hoistVariableDeclaration);
                return ts.factory.createConditionalExpression(
                    ts.factory.createTypeCheck(ts.factory.createAssignment(temp, serialized), "function"),
                    /*questionToken*/ undefined,
                    temp,
                    /*colonToken*/ undefined,
                    ts.factory.createIdentifier("Object")
                );

            case ts.TypeReferenceSerializationKind.TypeWithConstructSignatureAndValue:
                return serializeEntityNameAsExpression(node.typeName);

            case ts.TypeReferenceSerializationKind.VoidNullableOrNeverType:
                return ts.factory.createVoidZero();

            case ts.TypeReferenceSerializationKind.BigIntLikeType:
                return getGlobalConstructor("BigInt", ts.ScriptTarget.ES2020);

            case ts.TypeReferenceSerializationKind.BooleanType:
                return ts.factory.createIdentifier("Boolean");

            case ts.TypeReferenceSerializationKind.NumberLikeType:
                return ts.factory.createIdentifier("Number");

            case ts.TypeReferenceSerializationKind.StringLikeType:
                return ts.factory.createIdentifier("String");

            case ts.TypeReferenceSerializationKind.ArrayLikeType:
                return ts.factory.createIdentifier("Array");

            case ts.TypeReferenceSerializationKind.ESSymbolType:
                return getGlobalConstructor("Symbol", ts.ScriptTarget.ES2015);

            case ts.TypeReferenceSerializationKind.TypeWithCallSignature:
                return ts.factory.createIdentifier("Function");

            case ts.TypeReferenceSerializationKind.Promise:
                return ts.factory.createIdentifier("Promise");

            case ts.TypeReferenceSerializationKind.ObjectType:
                return ts.factory.createIdentifier("Object");

            default:
                return ts.Debug.assertNever(kind);
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
    function createCheckedValue(left: ts.Expression, right: ts.Expression) {
        return ts.factory.createLogicalAnd(
            ts.factory.createStrictInequality(ts.factory.createTypeOfExpression(left), ts.factory.createStringLiteral("undefined")),
            right
        );
    }

    /**
     * Serializes an entity name which may not exist at runtime, but whose access shouldn't throw
     * @param node The entity name to serialize.
     */
    function serializeEntityNameAsExpressionFallback(node: ts.EntityName): ts.BinaryExpression {
        if (node.kind === ts.SyntaxKind.Identifier) {
            // A -> typeof A !== "undefined" && A
            const copied = serializeEntityNameAsExpression(node);
            return createCheckedValue(copied, copied);
        }
        if (node.left.kind === ts.SyntaxKind.Identifier) {
            // A.B -> typeof A !== "undefined" && A.B
            return createCheckedValue(serializeEntityNameAsExpression(node.left), serializeEntityNameAsExpression(node));
        }
        // A.B.C -> typeof A !== "undefined" && (_a = A.B) !== void 0 && _a.C
        const left = serializeEntityNameAsExpressionFallback(node.left);
        const temp = ts.factory.createTempVariable(hoistVariableDeclaration);
        return ts.factory.createLogicalAnd(
            ts.factory.createLogicalAnd(
                left.left,
                ts.factory.createStrictInequality(ts.factory.createAssignment(temp, left.right), ts.factory.createVoidZero())
            ),
            ts.factory.createPropertyAccessExpression(temp, node.right)
        );
    }

    /**
     * Serializes an entity name as an expression for decorator type metadata.
     * @param node The entity name to serialize.
     */
    function serializeEntityNameAsExpression(node: ts.EntityName): SerializedEntityName {
        switch (node.kind) {
            case ts.SyntaxKind.Identifier:
                // Create a clone of the name with a new parent, and treat it as if it were
                // a source tree node for the purposes of the checker.
                const name = ts.setParent(ts.setTextRange(ts.parseNodeFactory.cloneNode(node), node), node.parent);
                name.original = undefined;
                ts.setParent(name, ts.getParseTreeNode(currentLexicalScope)); // ensure the parent is set to a parse tree node.
                return name;

            case ts.SyntaxKind.QualifiedName:
                return serializeQualifiedNameAsExpression(node);
        }
    }

    /**
     * Serializes an qualified name as an expression for decorator type metadata.
     * @param node The qualified name to serialize.
     */
    function serializeQualifiedNameAsExpression(node: ts.QualifiedName): SerializedEntityName {
        return ts.factory.createPropertyAccessExpression(serializeEntityNameAsExpression(node.left), node.right) as ts.PropertyAccessEntityNameExpression;
    }

    function getGlobalConstructorWithFallback(name: string) {
        return ts.factory.createConditionalExpression(
            ts.factory.createTypeCheck(ts.factory.createIdentifier(name), "function"),
            /*questionToken*/ undefined,
            ts.factory.createIdentifier(name),
            /*colonToken*/ undefined,
            ts.factory.createIdentifier("Object")
        );
    }

    function getGlobalConstructor(name: string, minLanguageVersion: ts.ScriptTarget): SerializedTypeNode {
        return languageVersion < minLanguageVersion ?
            getGlobalConstructorWithFallback(name) :
            ts.factory.createIdentifier(name);
    }
}