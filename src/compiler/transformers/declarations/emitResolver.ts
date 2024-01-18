import {
    __String,
    bindSourceFile,
    canHaveLocals,
    CompilerOptions,
    ComputedPropertyName,
    CoreEmitResolver,
    createEntityVisibilityChecker,
    createEvaluator,
    Debug,
    DeclarationName,
    determineIfDeclarationIsVisible,
    ElementAccessExpression,
    emptyArray,
    EnumDeclaration,
    EnumMember,
    ExportSpecifier,
    Expression,
    factory,
    forEachChild,
    forEachEntry,
    FunctionDeclaration,
    FunctionLikeDeclaration,
    getNameOfDeclaration,
    getNodeId,
    getParseTreeNode,
    getPropertyNameForPropertyNameNode,
    hasDynamicName,
    hasProperty,
    hasSyntacticModifier,
    Identifier,
    isAccessor,
    isBigIntLiteral,
    isComputedPropertyName,
    isDeclarationReadonly,
    isElementAccessExpression,
    isEntityNameExpression,
    isEnumDeclaration,
    isEnumMember,
    isExpandoPropertyDeclaration,
    isExportAssignment,
    isExportSpecifier,
    isFunctionDeclaration,
    isFunctionExpressionOrArrowFunction,
    isFunctionLike,
    isGetAccessor,
    isGetAccessorDeclaration,
    isIdentifier,
    isInfinityOrNaNString,
    isModuleDeclaration,
    isNumericLiteral,
    isPrefixUnaryExpression,
    isPrimitiveLiteralValue,
    isPropertyAccessExpression,
    isPropertyName,
    isSetAccessor,
    isSetAccessorDeclaration,
    isSourceFile,
    isStringLiteralLike,
    isTemplateExpression,
    isVarConst,
    isVariableDeclaration,
    LateBoundDeclaration,
    ModifierFlags,
    Node,
    NodeFlags,
    nodeIsPresent,
    NoSubstitutionTemplateLiteral,
    ParameterDeclaration,
    parsePseudoBigInt,
    PropertyAccessExpression,
    PropertyDeclaration,
    PropertyName,
    PropertySignature,
    skipParentheses,
    SourceFile,
    Symbol,
    SymbolAccessibility,
    SymbolFlags,
    SymbolTable,
    SyntaxKind,
    VariableDeclaration,
} from "../../_namespaces/ts";



// /**
//  * Assigning values to a property of a function will usually cause those members to be implicitly declared on the function
//  * even if they were were not declared (expando functions)
//  * DTE needs to detect these members and error on them since this behavior is not supported in isolated declarations
//  * There are however members that can be assigned on a function that are not expando members, namely members that come from Function
//  * In DTE we do not load the full d.ts so we keep a list of known members of function that can be assigned without considering them expando members.
//  */
// // const knownFunctionMembers = new Set([
// //     "I:apply",
// //     "I:call",
// //     "I:bind",
// //     "I:toString",
// //     "I:prototype",
// //     "I:length",
// // ]);


/** @internal */
export interface EmitDeclarationNodeLinks {
    signatureDeclarations?: Node[];
    isVisible?: boolean;
    enumValue?: string | number | undefined;
    isVisibilityComputed?: boolean
}


/** @internal */
export function createEmitDeclarationResolver(file: SourceFile, options: CompilerOptions): CoreEmitResolver {
    const nodeLinks: EmitDeclarationNodeLinks[] = [];
    
    const { isEntityNameVisible, collectLinkedAliases } = createEntityVisibilityChecker({
        defaultSymbolAccessibility: SymbolAccessibility.Accessible,
        isDeclarationVisible,
        markDeclarationAsVisible(declaration) {
            getNodeLinks(declaration).isVisible = true;
        },
        isThisAccessible() {
            return { accessibility: SymbolAccessibility.Accessible };
        },
        resolveName,
        getTargetOfExportSpecifier
    });
    bindSourceFile(file, options);
    collectAllLinkedAliases(file);

    function getTargetOfExportSpecifier(node: ExportSpecifier, meaning: SymbolFlags): Symbol | undefined {
        // throw new Error("getTargetOfExportSpecifier");
        // if (idText(node.propertyName || node.name) === InternalSymbolName.Default) {
        //     const specifier = getModuleSpecifierForImportOrExport(node);
        //     const moduleSymbol = specifier && resolveEntityName(node, specifier, SymbolFlags.Module);
        //     if (moduleSymbol) {
        //         return resolveEntityName(moduleSymbol, node);
        //     }
        // }
        const resolved = resolveEntityName(node, node.propertyName || node.name, meaning);
        return resolved;
    }

    function collectAllLinkedAliases(node: Node) {
        if (isExportAssignment(node)) {
            if (node.expression.kind === SyntaxKind.Identifier) {
                collectLinkedAliases(node.expression as Identifier, /*setVisibility*/ true);
            }
            return;
        }
        else if (isExportSpecifier(node)) {
            collectLinkedAliases(node.propertyName || node.name, /*setVisibility*/ true);
            return;
        }
        forEachChild(node, collectAllLinkedAliases);
    }

    function getNodeLinks(node: Node): EmitDeclarationNodeLinks {
        const nodeId = getNodeId(node);
        return nodeLinks[nodeId] || (nodeLinks[nodeId] = {});
    }

    function resolveEntityName(location: Node, node: Expression, meaning: SymbolFlags): Symbol | undefined {
        if (isIdentifier(node)) {
            return resolveName(location, node.escapedText, meaning);
        }
        else if (isPropertyAccessExpression(node) || isElementAccessExpression(node)) {
            const symbol = resolveEntityName(location, node.expression, meaning);
            if (symbol === undefined) return undefined;

            const name = isElementAccessExpression(node) ? node.argumentExpression : node.name;
            if (!isPropertyName(name)) return;

            const memberSymbol = symbol.exports?.get(getSymbolName(name));
            if (!memberSymbol || !(memberSymbol.flags & meaning)) {
                if (symbol.valueDeclaration && isModuleDeclaration(symbol.valueDeclaration)) {
                    return symbol.valueDeclaration.locals?.get(getSymbolName(name));
                }
                return undefined;
            }
            return memberSymbol;
        }
        else {
            return undefined;
        }
    }

    function resolveName(enclosingDeclaration: Node, key: __String, meaning: SymbolFlags) {
        function getSymbolFromScope(table: SymbolTable | undefined) {
            const symbol = table?.get(key);
            if (symbol && ((symbol.flags & meaning) || (symbol.flags & SymbolFlags.Alias))) {
                return symbol;
            }
        }
        let currentScope = enclosingDeclaration;
        while (currentScope) {
            if(canHaveLocals(currentScope)) {
                let symbol = getSymbolFromScope(currentScope.locals);
                if (!symbol && (isModuleDeclaration(currentScope) || isSourceFile(currentScope)) && currentScope.symbol) {
                    symbol = getSymbolFromScope(currentScope.symbol.exports);
                }
                if (symbol) return symbol;
            }
            currentScope = currentScope.parent;
        }
        return undefined;
    }


    function getEnumValueFromName(name: PropertyName | NoSubstitutionTemplateLiteral, location: EnumDeclaration) {
        const enumKey = getSymbolName(name);
        if (!enumKey) return undefined;
        const enumMemberSymbol = resolveName(location, enumKey, SymbolFlags.Value);
        const enumMemberDeclaration = enumMemberSymbol?.declarations?.[0];
        if (enumMemberDeclaration && isEnumMember(enumMemberDeclaration)) {
            return getNodeLinks(enumMemberDeclaration).enumValue;
        }
        return undefined;
    }

    function isExpressionMemberOfEnum(target: Expression, location: EnumDeclaration) {
        const symbol = resolveEntityName(location, target, SymbolFlags.Namespace);

        return !!symbol?.declarations?.some(d => d === location);
    }
    const evaluate = createEvaluator({
        evaluateElementAccessExpression(expr, location) {
            // We only resolve names in the current enum declaration
            if (!location || !isEnumDeclaration(location)) return undefined;
            if (
                isExpressionMemberOfEnum(expr.expression, location)
                && isStringLiteralLike(expr.argumentExpression)
            ) {
                return getEnumValueFromName(expr.argumentExpression, location);
            }
            return undefined;
        },
        evaluateEntityNameExpression(expr, location) {
            if (
                isIdentifier(expr) && isInfinityOrNaNString(expr.escapedText) &&
                (resolveName(location ?? expr.parent, expr.escapedText, SymbolFlags.Value) === undefined)
            ) {
                return +(expr.escapedText);
            }
            // We only resolve names in the current enum declaration
            if (!location || !isEnumDeclaration(location)) return undefined;
            if (isIdentifier(expr)) {
                return getEnumValueFromName(expr, location);
            }
            if (
                isEntityNameExpression(expr.expression)
                && isExpressionMemberOfEnum(expr.expression, location)
            ) {
                return getEnumValueFromName(expr.name, location);
            }
            return undefined;
        },
        onNumericLiteral() {},
    });
    function clonePrimitiveLiteralValue(node: Expression): Expression {
        if (isNumericLiteral(node)) {
            return factory.createNumericLiteral(node.text);
        }
        if (isBigIntLiteral(node)) {
            return factory.createBigIntLiteral({ negative: false, base10Value: parsePseudoBigInt(node.text) });
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
            const evaluatedValue = evaluate(node);
            if (evaluatedValue !== undefined) {
                return factory.createStringLiteral(evaluatedValue);
            }
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
        }
        return false;
    }

    function isLiteralComputedName(node: ComputedPropertyName) {
        // Best effort implementation. We can't know for sure  if node is valid as a computed name
        // - it might be a narrowed symbol
        // - the type might not be appropriate as a computed property name.
        const expression = node.expression;
        if (isPrimitiveLiteralValue(expression, /*includeBigInt*/ false)) {
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

    // Do a best effort to find expando functions
    function isExpandoFunction(node: FunctionDeclaration | VariableDeclaration) {
        const declaration = getParseTreeNode(node, (n): n is FunctionDeclaration | VariableDeclaration => isFunctionDeclaration(n) || isVariableDeclaration(n));
        if (!declaration) {
            return false;
        }
        const symbol = declaration.symbol;
        if (isVariableDeclaration(declaration)) {
            if (declaration.type || !isVarConst(declaration)) {
                return false;
            }
            if (!(declaration.initializer && isFunctionExpressionOrArrowFunction(declaration.initializer))) {
                return false;
            }
        }
        return !!symbol.exports && !!forEachEntry(symbol.exports, p => p.flags & SymbolFlags.Value && isExpandoPropertyDeclaration(p.valueDeclaration));
    }

    return {
        isDeclarationVisible,
        isLiteralConstDeclaration,
        isLiteralComputedName,
        tryFindAmbientModule() {
            return undefined;
        },
        getPropertiesOfContainerFunction(node: FunctionDeclaration | VariableDeclaration) {
            return [...node.symbol.exports?.values() ?? []];
        },
        getAllAccessorDeclarations(declaration) {
            const symbol = declaration.symbol;
            const declaredAccessors = symbol?.declarations?.filter(isAccessor);
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
            function getSignaturesOfSymbol(symbol: Symbol | undefined): Node[] {
                if (!symbol || !symbol.valueDeclaration) return emptyArray;
                const links = getNodeLinks(symbol.valueDeclaration);
                if (links.signatureDeclarations) return links.signatureDeclarations;

                if (!symbol || !symbol.declarations) return (links.signatureDeclarations = emptyArray);

                const result: Node[] = links.signatureDeclarations = [];
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
                const symbol = node.symbol;
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

    function isDeclarationVisible(node: Node): boolean {
        if (node) {
            
            const links = getNodeLinks(node);
            links.isVisible ??= !!determineIfDeclarationIsVisible(node, isDeclarationVisible);
            return links.isVisible;
        }

        return false;
    }
}

/**
 * Gets the symbolic name for a member from its type.
 * @internal
 */
export function getSymbolName(name: Exclude<PropertyName, ComputedPropertyName>): __String;
/**
 * Gets the symbolic name for a member from its type.
 * @internal
 */
export function getSymbolName(name: ElementAccessExpression | PropertyName): __String | undefined;
export function getSymbolName(name: ElementAccessExpression | PropertyName): __String | undefined {

    const staticName = isPropertyName(name) ? getPropertyNameForPropertyNameNode(name) :
        isElementAccessExpression(name) && isPropertyName(name.argumentExpression) ? getPropertyNameForPropertyNameNode(name.argumentExpression):
        undefined;

    if(staticName) return staticName;

    let computedName = isComputedPropertyName(name) ? name.expression:
        isElementAccessExpression(name) ? name.argumentExpression:
        undefined;

    if (computedName) {
        let fullId = "__!";
        // We only support dotted identifiers as property keys
        while (true) {
            if (isIdentifier(computedName)) {
                fullId += computedName.escapedText;
                break;
            }
            else if (isPropertyAccessExpression(computedName)) {
                fullId += computedName.name.escapedText;
                computedName = computedName.expression;
            }
            else {
                // Can't compute a property key, bail
                return undefined;
            }
        }
        return fullId as __String;
    }
    return undefined;
}
