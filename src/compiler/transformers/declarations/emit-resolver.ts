import {
    AnyImportSyntax,
    appendIfUnique,
    ComputedPropertyName,
    Debug,
    Declaration,
    DeclarationName,
    determineIfDeclarationIsVisible,
    ElementAccessExpression,
    emptyArray,
    EntityNameOrEntityNameExpression,
    EnumDeclaration,
    EnumMember,
    every,
    Expression,
    factory,
    filter,
    findAncestor,
    FunctionDeclaration,
    FunctionLikeDeclaration,
    getCombinedModifierFlags,
    getCombinedNodeFlags,
    getFirstIdentifier,
    getNameOfDeclaration,
    getParseTreeNode,
    getTextOfNode,
    hasDynamicName,
    hasProperty,
    hasSyntacticModifier,
    Identifier,
    ImportClause,
    ImportEqualsDeclaration,
    ImportSpecifier,
    isAccessor,
    isArrowFunction,
    isBigIntLiteral,
    isBinaryExpression,
    isBindingElement,
    isElementAccessExpression,
    isEntityNameExpression,
    isEnumDeclaration,
    isEnumMember,
    isExpressionStatement,
    isFunctionDeclaration,
    isFunctionExpression,
    isFunctionLike,
    isGetAccessor,
    isGetAccessorDeclaration,
    isIdentifier,
    isInJSFile,
    isLateVisibilityPaintedStatement,
    isNumericLiteral,
    isParameterPropertyDeclaration,
    isPartOfTypeNode,
    isPrefixUnaryExpression,
    isPropertyAccessExpression,
    isSetAccessor,
    isSetAccessorDeclaration,
    isStringLiteralLike,
    isTemplateExpression,
    isThisIdentifier,
    isVariableDeclaration,
    isVariableStatement,
    LateBoundDeclaration,
    LateVisibilityPaintedStatement,
    ModifierFlags,
    NamespaceImport,
    Node,
    NodeArray,
    NodeFlags,
    nodeIsPresent,
    NoSubstitutionTemplateLiteral,
    ParameterDeclaration,
    PropertyAccessExpression,
    PropertyDeclaration,
    PropertyName,
    PropertySignature,
    skipParentheses,
    SourceFile,
    Statement,
    SymbolAccessibility,
    SymbolFlags,
    SymbolVisibilityResult,
    SyntaxKind,
    VariableDeclaration,
    VariableDeclarationList,
} from "../../_namespaces/ts";
import {
    bindSourceFileForDeclarationEmit,
    EmitDeclarationNodeLinks,
    EmitDeclarationSymbol,
} from "./emit-binder";
import {
    makeEvaluator,
} from "./evaluator";
import {
    IsolatedEmitHost,
    IsolatedEmitResolver,
    MemberKey,
} from "./types";
import {
    getMemberKey,
} from "./utils";

const knownFunctionMembers = new Set([
    "I:apply",
    "I:call",
    "I:bind",
    "I:toString",
    "I:prototype",
    "I:length",
]);

/** @internal */
export function createEmitDeclarationResolver(file: SourceFile, host: IsolatedEmitHost): IsolatedEmitResolver {
    const { getNodeLinks, resolveMemberKey, resolveName } = bindSourceFileForDeclarationEmit(file, host);

    function getEnumValueFromName(name: PropertyName | NoSubstitutionTemplateLiteral, location: EnumDeclaration) {
        const enumKey = getMemberKey(name);
        if (!enumKey) return undefined;
        const enumMemberSymbol = resolveMemberKey(location, enumKey, SymbolFlags.Value);
        const enumMemberDeclaration = enumMemberSymbol?.declarations[0];
        if (enumMemberDeclaration && isEnumMember(enumMemberDeclaration)) {
            return getNodeLinks(enumMemberDeclaration).enumValue;
        }
        return undefined;
    }
    const evaluate = makeEvaluator({
        evaluateElementAccessExpression(expr, location) {
            // We only resolve names in the current enum declaration
            if (!location || !isEnumDeclaration(location)) return undefined;
            if (
                isIdentifier(expr.expression)
                && expr.expression.escapedText === location.name.escapedText
                && isStringLiteralLike(expr.argumentExpression)
            ) {
                return getEnumValueFromName(expr.argumentExpression, location);
            }
            return undefined;
        },
        evaluateEntityNameExpression(expr, location) {
            // We only resolve names in the current enum declaration
            if (!location || !isEnumDeclaration(location)) return undefined;
            if (isIdentifier(expr)) {
                return getEnumValueFromName(expr, location);
            }
            if (
                isPropertyAccessExpression(expr)
                && isIdentifier(expr.expression)
                && expr.expression.escapedText === location.name.escapedText
            ) {
                return getEnumValueFromName(expr.name, location);
            }
            return undefined;
        },
        onNumericLiteral() {},
    });
    function isPrimitiveLiteralValue(node: Expression): boolean {
        if (isNumericLiteral(node) || isBigIntLiteral(node) || isStringLiteralLike(node)) return true;

        if (node.kind === SyntaxKind.TrueKeyword || node.kind === SyntaxKind.FalseKeyword) return true;

        if (isPrefixUnaryExpression(node)) {
            const operand = node.operand;
            if (node.operator === SyntaxKind.MinusToken) {
                return isNumericLiteral(operand) || isBigIntLiteral(operand);
            }
            if (node.operator === SyntaxKind.PlusToken) {
                return isNumericLiteral(operand);
            }
        }
        if (isTemplateExpression(node)) {
            return node.templateSpans.every(t => isPrimitiveLiteralValue(t.expression));
        }
        return false;
    }
    function clonePrimitiveLiteralValue(node: Expression): Expression {
        if (isNumericLiteral(node)) {
            return factory.createNumericLiteral(node.text, node.numericLiteralFlags);
        }
        if (isBigIntLiteral(node)) {
            return factory.createBigIntLiteral(node.text);
        }
        if (isStringLiteralLike(node)) {
            return factory.createStringLiteral(node.text);
        }

        if (node.kind === SyntaxKind.FalseKeyword) {
            return factory.createFalse();
        }

        if (node.kind === SyntaxKind.TrueKeyword) {
            return factory.createTrue();
        }

        if (isPrefixUnaryExpression(node)) {
            return factory.createPrefixUnaryExpression(
                node.operator,
                clonePrimitiveLiteralValue(node.operand),
            );
        }
        if (isTemplateExpression(node)) {
            return factory.createTemplateExpression(
                factory.createTemplateHead(node.head.text, node.head.rawText, node.head.templateFlags),
                node.templateSpans.map(t =>
                    factory.createTemplateSpan(
                        clonePrimitiveLiteralValue(t.expression),
                        t.literal.kind === SyntaxKind.TemplateMiddle ?
                            factory.createTemplateMiddle(t.literal.text, t.literal.rawText, t.literal.templateFlags) :
                            factory.createTemplateTail(t.literal.text, t.literal.rawText, t.literal.templateFlags),
                    )
                ),
            );
        }
        Debug.assert(false, `Unable to clone unknown literal type. Kind: ${node.kind}`);
    }

    function isLiteralConstDeclaration(node: VariableDeclaration | PropertyDeclaration | PropertySignature | ParameterDeclaration): boolean {
        if (isDeclarationReadonly(node) || (isVariableDeclaration(node) && isVarConst(node)) || isEnumMember(node)) {
            if (!(isEnumMember(node) || !node.type)) return false;
            if (!(hasProperty(node, "initializer") && !!node.initializer)) return false;

            const initializer = node.initializer;
            return isPrimitiveLiteralValue(initializer);
            // Original TS version
            // return isFreshLiteralType(getTypeOfSymbol(getSymbolOfNode(node)));
        }
        return false;
    }

    function isLiteralComputedName(node: ComputedPropertyName) {
        // Best effort implementation. We can't know for sure  if node is valid as a computed name
        // - it might be a narrowed symbol
        // - the type might not be appropriate as a computed property name.
        const expression = node.expression;
        if (isPrimitiveLiteralValue(expression)) {
            return true;
        }
        if (!isEntityNameExpression(expression)) {
            return false;
        }
        return true;
    }

    function isIdentifierComputedName(name: DeclarationName | undefined): boolean {
        if (!name) return false;
        if (!(name.kind === SyntaxKind.ComputedPropertyName || name.kind === SyntaxKind.ElementAccessExpression)) {
            return false;
        }
        let expr = isElementAccessExpression(name) ? skipParentheses(name.argumentExpression) : name.expression;
        while (isPropertyAccessExpression(expr)) {
            expr = expr.expression;
        }
        return isIdentifier(expr);
    }
    function getExpandoMembers(declaration: FunctionDeclaration | VariableDeclaration, functionName: Identifier) {
        const scope = getParentScope(declaration);
        if (!scope) return undefined;
        const members = new Set<MemberKey>();
        for (const statement of scope.statements) {
            // Looking for name functionName.member = init;
            if (!isExpressionStatement(statement)) continue;
            if (!isBinaryExpression(statement.expression)) continue;
            const assignment = statement.expression;
            if (assignment.operatorToken.kind !== SyntaxKind.EqualsToken) continue;

            const isPropertyAccess = isPropertyAccessExpression(assignment.left);
            if (
                (isPropertyAccess || isElementAccessExpression(assignment.left))
                && isIdentifier(assignment.left.expression)
                && assignment.left.expression.escapedText === functionName.escapedText
            ) {
                let name;
                if (isPropertyAccess) {
                    name = assignment.left.name;
                }
                else {
                    const argumentExpression = assignment.left.argumentExpression;
                    name = factory.createComputedPropertyName(argumentExpression);
                }
                const key = getMemberKey(name);
                if (!key || knownFunctionMembers.has(key)) {
                    continue;
                }
                members.add(key);
            }
        }
        return members;
    }

    function getDefinedMembers(declaration: FunctionDeclaration | VariableDeclaration, functionName: Identifier) {
        const scope = getParentScope(declaration);
        if (!scope) return undefined;
        const cls = resolveName(scope, functionName.escapedText, SymbolFlags.Class);

        const namespace = resolveName(scope, functionName.escapedText, SymbolFlags.Namespace);

        if (!cls?.exports) {
            return namespace?.exports;
        }
        if (!namespace?.exports) {
            return cls.exports;
        }
        return new Set([
            ...(namespace.exports.keys() ?? []),
            ...(cls.exports.keys() ?? []),
        ]);
    }

    // Do a best effort to find expando functions
    function isExpandoFunction(node: FunctionDeclaration | VariableDeclaration) {
        const declaration = getParseTreeNode(node, (n): n is FunctionDeclaration | VariableDeclaration => isFunctionDeclaration(n) || isVariableDeclaration(n));
        if (!declaration) {
            return false;
        }
        if (isVariableDeclaration(declaration)) {
            if (declaration.type) {
                return false;
            }
            if (!(declaration.initializer && isFunctionExpressionOrArrowFunction(declaration.initializer))) {
                return false;
            }
        }

        const functionName = node.name;
        if (!functionName || !isIdentifier(functionName)) return false;

        const expandoMembers = getExpandoMembers(declaration, functionName);
        if (!expandoMembers || expandoMembers.size === 0) return false;

        if (isVariableDeclaration(declaration) && expandoMembers.size) {
            return true;
        }
        const definedMembers = getDefinedMembers(declaration, functionName);
        // No namespace definitions, and it has assignments => is Expando function
        if (!definedMembers) {
            return true;
        }

        // Some assigned members are not in the defined the namespaces
        // computed members are ignored, since they don't name it to declarations anyway
        if ([...expandoMembers.keys()].some(n => !definedMembers.has(n))) {
            return true;
        }
        return false;
    }

    return {
        isDeclarationVisible,
        isLiteralConstDeclaration,
        isLiteralComputedName,
        tryFindAmbientModule() {
            return undefined;
        },
        getAllAccessorDeclarations(declaration) {
            const parentLinks = getNodeLinks(declaration.parent);
            const key = getMemberKey(declaration.name);
            const members = hasSyntacticModifier(declaration, ModifierFlags.Static) ?
                parentLinks.symbol?.exports :
                parentLinks.symbol?.members;
            const symbol = key && members?.get(key);
            const declaredAccessors = symbol?.declarations.filter(isAccessor);
            const declarations = declaredAccessors?.length ? declaredAccessors : [declaration];
            return {
                firstAccessor: declarations[0],
                secondAccessor: declarations[1],
                getAccessor: declarations.find(isGetAccessorDeclaration),
                setAccessor: declarations.find(isSetAccessorDeclaration),
            };
        },
        getConstantValue(node: EnumMember | PropertyAccessExpression | ElementAccessExpression): string | number | undefined {
            function updateEnumValues(node: EnumDeclaration) {
                let prevEnumValueLinks: EmitDeclarationNodeLinks | undefined;
                const isDeclaration = node.flags & NodeFlags.Ambient && !hasSyntacticModifier(node, ModifierFlags.Const);
                for (const enumValue of node.members) {
                    const links = getNodeLinks(enumValue);
                    if (enumValue.initializer) {
                        const value = enumValue.initializer && evaluate(enumValue.initializer, node);
                        if (value !== undefined) {
                            links.enumValue = value;
                        }
                        else {
                            links.enumValue = undefined;
                        }
                    }
                    else if (isDeclaration) {
                        links.enumValue = undefined;
                    }
                    else if (prevEnumValueLinks === undefined) {
                        links.enumValue = 0;
                    }
                    else if (typeof prevEnumValueLinks.enumValue === "number") {
                        links.enumValue = prevEnumValueLinks.enumValue + 1;
                    }
                    prevEnumValueLinks = links;
                }
            }

            if (isEnumMember(node)) {
                const links = getNodeLinks(node);
                if (!hasProperty(links, "enumValue")) {
                    updateEnumValues(node.parent);
                }
                return links.enumValue;
            }
        },
        createLiteralConstValue(node) {
            if (hasProperty(node, "initializer") && node.initializer) {
                return clonePrimitiveLiteralValue(node.initializer);
            }
            Debug.fail();
        },
        isLateBound(node): node is LateBoundDeclaration {
            const name = getNameOfDeclaration(node);
            return !hasDynamicName(node) || isIdentifierComputedName(name);
        },
        isImplementationOfOverload(node) {
            function getSignaturesOfSymbol(symbol: EmitDeclarationSymbol | undefined): Node[] {
                if (!symbol) return emptyArray;
                if (symbol.signatureDeclarations) return symbol.signatureDeclarations;

                if (!symbol || !symbol.declarations) return (symbol.signatureDeclarations = emptyArray);
                const result: Node[] = symbol.signatureDeclarations = [];
                for (let i = 0; i < symbol.declarations.length; i++) {
                    const decl = symbol.declarations[i];
                    if (!isFunctionLike(decl) || isGetAccessor(decl) || isSetAccessor(decl)) {
                        // If non methods got merged in a class member bail with an empty array
                        // This is TS error behavior and we want to preserve iot as much as possible
                        // if(isClassElement(decl)) {
                        //     return emptyArray;
                        // }
                        continue;
                    }
                    // Don't include signature if node is the implementation of an overloaded function. A node is considered
                    // an implementation node if it has a body and the previous node is of the same kind and immediately
                    // precedes the implementation node (i.e. has the same parent and ends where the implementation starts).
                    if (i > 0 && (decl as FunctionLikeDeclaration).body) {
                        const previous = symbol.declarations[i - 1];
                        if (decl.parent === previous.parent && decl.kind === previous.kind && decl.pos === previous.end) {
                            continue;
                        }
                    }
                    // If this is a function or method declaration, get the signature from the @type tag for the sake of optional parameters.
                    // Exclude contextually-typed kinds because we already apply the @type tag to the context, plus applying it here to the initializer would supress checks that the two are compatible.
                    result.push(decl);
                }
                return result;
            }

            if (nodeIsPresent((node as FunctionLikeDeclaration).body)) {
                if (isGetAccessor(node) || isSetAccessor(node)) return false; // Get or set accessors can never be overload implementations, but can have up to 2 signatures
                const symbol = getNodeLinks(node).symbol;
                const signaturesOfSymbol = getSignaturesOfSymbol(symbol);
                // If this function body corresponds to function with multiple signature, it is implementation of overload
                // e.g.: function foo(a: string): string;
                //       function foo(a: number): number;
                //       function foo(a: any) { // This is implementation of the overloads
                //           return a;
                //       }
                return signaturesOfSymbol.length > 1 ||
                    // If there is single signature for the symbol, it is overload if that signature isn't coming from the node
                    // e.g.: function foo(a: string): string;
                    //       function foo(a: any) { // This is implementation of the overloads
                    //           return a;
                    //       }
                    (signaturesOfSymbol.length === 1 && signaturesOfSymbol[0] !== node);
            }
            return false;
        },
        isOptionalParameter(parameter) {
            const signature = parameter.parent;
            const paramIndex = signature.parameters.indexOf(parameter);
            Debug.assert(paramIndex !== -1);
            if (parameter.questionToken) return true;
            if (parameter.dotDotDotToken) return !!parameter.initializer;

            for (let i = paramIndex; i < signature.parameters.length; i++) {
                const p = signature.parameters[i];
                if (!p.questionToken && !p.initializer && !p.dotDotDotToken) {
                    return false;
                }
            }
            return true;
        },
        isEntityNameVisible,
        getTypeReferenceDirectivesForEntityName() {
            return undefined;
        },
        isExpandoFunction,
        getSymbolOfExternalModuleSpecifier() {
            return undefined;
        },
        isImportRequiredByAugmentation() {
            return false;
        },
    };

    function isDeclarationReadonly(declaration: Declaration): boolean {
        return !!(getCombinedModifierFlags(declaration) & ModifierFlags.Readonly && !isParameterPropertyDeclaration(declaration, declaration.parent));
    }

    /** @internal */
    function isVarConst(node: VariableDeclaration | VariableDeclarationList): boolean {
        return !!(getCombinedNodeFlags(node) & NodeFlags.Const);
    }

    function isDeclarationVisible(node: Node): boolean {
        if (node) {
            const links = getNodeLinks(node);
            if (links.isVisible === undefined) {
                links.isVisible = links.symbol?.isVisible ?? !!determineIfDeclarationIsVisible(node, isDeclarationVisible);
            }
            return links.isVisible;
        }

        return false;
    }

    function hasVisibleDeclarations(symbol: EmitDeclarationSymbol, shouldComputeAliasToMakeVisible: boolean): SymbolVisibilityResult | undefined {
        let aliasesToMakeVisible: LateVisibilityPaintedStatement[] | undefined;
        if (!every(filter(symbol.declarations, d => d.kind !== SyntaxKind.Identifier), n => getIsDeclarationVisible(n))) {
            return undefined;
        }
        return { accessibility: SymbolAccessibility.Accessible, aliasesToMakeVisible };

        function getIsDeclarationVisible(declaration: Declaration) {
            if (!isDeclarationVisible(declaration)) {
                // Mark the unexported alias as visible if its parent is visible
                // because these kind of aliases can be used to name types in declaration file

                const anyImportSyntax = getAnyImportSyntax(declaration);
                if (
                    anyImportSyntax &&
                    !hasSyntacticModifier(anyImportSyntax, ModifierFlags.Export) && // import clause without export
                    isDeclarationVisible(anyImportSyntax.parent)
                ) {
                    return addVisibleAlias(declaration, anyImportSyntax);
                }
                else if (
                    isVariableDeclaration(declaration) && isVariableStatement(declaration.parent.parent) &&
                    !hasSyntacticModifier(declaration.parent.parent, ModifierFlags.Export) && // unexported variable statement
                    isDeclarationVisible(declaration.parent.parent.parent)
                ) {
                    return addVisibleAlias(declaration, declaration.parent.parent);
                }
                else if (
                    isLateVisibilityPaintedStatement(declaration) // unexported top-level statement
                    && !hasSyntacticModifier(declaration, ModifierFlags.Export)
                    && isDeclarationVisible(declaration.parent)
                ) {
                    return addVisibleAlias(declaration, declaration);
                }
                else if (isBindingElement(declaration)) {
                    if (
                        symbol.flags & SymbolFlags.Alias && isInJSFile(declaration) && declaration.parent?.parent // exported import-like top-level JS require statement
                        && isVariableDeclaration(declaration.parent.parent)
                        && declaration.parent.parent.parent?.parent && isVariableStatement(declaration.parent.parent.parent.parent)
                        && !hasSyntacticModifier(declaration.parent.parent.parent.parent, ModifierFlags.Export)
                        && declaration.parent.parent.parent.parent.parent // check if the thing containing the variable statement is visible (ie, the file)
                        && isDeclarationVisible(declaration.parent.parent.parent.parent.parent)
                    ) {
                        return addVisibleAlias(declaration, declaration.parent.parent.parent.parent);
                    }
                    else if (symbol.flags & SymbolFlags.BlockScopedVariable) {
                        const variableStatement = findAncestor(declaration, isVariableStatement)!;
                        if (hasSyntacticModifier(variableStatement, ModifierFlags.Export)) {
                            return true;
                        }
                        if (!isDeclarationVisible(variableStatement.parent)) {
                            return false;
                        }
                        return addVisibleAlias(declaration, variableStatement);
                    }
                }

                // Declaration is not visible
                return false;
            }

            return true;
        }

        function addVisibleAlias(declaration: Declaration, aliasingStatement: LateVisibilityPaintedStatement) {
            // In function "buildTypeDisplay" where we decide whether to write type-alias or serialize types,
            // we want to just check if type- alias is accessible or not but we don't care about emitting those alias at that time
            // since we will do the emitting later in trackSymbol.
            if (shouldComputeAliasToMakeVisible) {
                getNodeLinks(declaration).isVisible = true;
                aliasesToMakeVisible = appendIfUnique(aliasesToMakeVisible, aliasingStatement);
            }
            return true;
        }
    }

    function isEntityNameVisible(entityName: EntityNameOrEntityNameExpression, enclosingDeclaration: Node): SymbolVisibilityResult {
        // get symbol of the first identifier of the entityName
        let meaning: SymbolFlags;
        if (
            entityName.parent.kind === SyntaxKind.TypeQuery ||
            entityName.parent.kind === SyntaxKind.ExpressionWithTypeArguments && !isPartOfTypeNode(entityName.parent) ||
            entityName.parent.kind === SyntaxKind.ComputedPropertyName
        ) {
            // Typeof value
            meaning = SymbolFlags.Value | SymbolFlags.ExportValue;
        }
        else if (
            entityName.kind === SyntaxKind.QualifiedName || entityName.kind === SyntaxKind.PropertyAccessExpression ||
            entityName.parent.kind === SyntaxKind.ImportEqualsDeclaration
        ) {
            // Left identifier from type reference or TypeAlias
            // Entity name of the import declaration
            meaning = SymbolFlags.Namespace;
        }
        else {
            // Type Reference or TypeAlias entity = Identifier
            meaning = SymbolFlags.Type;
        }
        const firstIdentifier = getFirstIdentifier(entityName);
        const symbol = resolveName(enclosingDeclaration, firstIdentifier.escapedText, meaning);
        if (symbol && symbol.flags & SymbolFlags.TypeParameter && meaning & SymbolFlags.Type) {
            return { accessibility: SymbolAccessibility.Accessible };
        }
        if (
            !symbol && isThisIdentifier(firstIdentifier)
            // TODO: isolatedDeclarations: Just assume this is accessible
            // && isSymbolAccessible(getSymbolOfNode(getThisContainer(firstIdentifier, /*includeArrowFunctions*/ false)), firstIdentifier, meaning, /*computeAliases*/ false).accessibility === SymbolAccessibility.Accessible
        ) {
            // TODO: isolatedDeclarations: Is this ever hit for declarations ?
            // debugger;
            return { accessibility: SymbolAccessibility.Accessible };
        }

        // Verify if the symbol is accessible
        return (symbol && hasVisibleDeclarations(symbol, /*shouldComputeAliasToMakeVisible*/ true)) || {
            // TODO: isolatedDeclarations: In TS this would be an inaccessible symbol, but TS will give errors we just transform
            // We don't actually keep enough information for full accessibility,
            // We just do this to mark accessible imports
            accessibility: SymbolAccessibility.Accessible,
            errorSymbolName: getTextOfNode(firstIdentifier),
            errorNode: firstIdentifier,
        };
    }
}

function getAnyImportSyntax(node: Node): AnyImportSyntax | undefined {
    switch (node.kind) {
        case SyntaxKind.ImportEqualsDeclaration:
            return node as ImportEqualsDeclaration;
        case SyntaxKind.ImportClause:
            return (node as ImportClause).parent;
        case SyntaxKind.NamespaceImport:
            return (node as NamespaceImport).parent.parent;
        case SyntaxKind.ImportSpecifier:
            return (node as ImportSpecifier).parent.parent.parent;
        default:
            return undefined;
    }
}
function isFunctionExpressionOrArrowFunction(node: Expression) {
    return isFunctionExpression(node) || isArrowFunction(node);
}

function getParentScope(declaration: VariableDeclaration | FunctionDeclaration):
    | undefined
    | Node & {
        statements: NodeArray<Statement>;
    }
{
    let scope: Node = declaration;
    while (scope) {
        if (hasProperty(scope, "statements")) {
            return (scope as any);
        }
        scope = scope.parent;
    }
    return undefined;
}
