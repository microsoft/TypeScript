import {
    __String,
    BigIntLiteral,
    bindSourceFile,
    CompilerOptions,
    ComputedPropertyName,
    CoreEmitResolver,
    createEntityVisibilityChecker,
    createEvaluator,
    createNameResolver,
    createSymbolTable,
    Debug,
    Declaration,
    DeclarationName,
    determineIfDeclarationIsVisible,
    ElementAccessExpression,
    emptyArray,
    entityNameToString,
    EnumDeclaration,
    EnumMember,
    ExportSpecifier,
    Expression,
    factory,
    forEachChild,
    forEachEntry,
    FunctionDeclaration,
    FunctionLikeDeclaration,
    getMembersOfDeclaration,
    getNameOfDeclaration,
    getNodeId,
    getParseTreeNode,
    getPropertyNameForPropertyNameNode,
    hasDynamicName,
    hasProperty,
    hasStaticModifier,
    hasSyntacticModifier,
    Identifier,
    InternalSymbolName,
    isAccessor,
    isBinaryExpression,
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
    isPrimitiveLiteralValue,
    isPropertyAccessExpression,
    isPropertyName,
    isSetAccessor,
    isSetAccessorDeclaration,
    isStringLiteralLike,
    isVarConst,
    isVariableDeclaration,
    LateBoundDeclaration,
    ModifierFlags,
    Node,
    NodeFlags,
    nodeIsPresent,
    NoSubstitutionTemplateLiteral,
    NumericLiteral,
    objectAllocator,
    ParameterDeclaration,
    parsePseudoBigInt,
    PrefixUnaryExpression,
    PropertyAccessExpression,
    PropertyDeclaration,
    PropertyName,
    PropertySignature,
    skipParentheses,
    some,
    SourceFile,
    StringLiteralLike,
    Symbol,
    SymbolAccessibility,
    SymbolFlags,
    SymbolTable,
    SyntaxKind,
    TemplateExpression,
    VariableDeclaration,
} from "../../_namespaces/ts";

interface EmitSymbolLinks {
    lateBoundSymbol?: Symbol;
    signatureDeclarations?: Node[];
    lateBoundMembers?: SymbolTable;
    lateBoundExports?: SymbolTable;
}
interface EmitDeclarationNodeLinks {
    signatureDeclarations?: Node[];
    isVisible?: boolean;
    enumValue?: string | number | undefined;
    isVisibilityComputed?: boolean;
    declarationRequiresScopeChange?: boolean;
    resolvedSymbol?: Symbol;
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
        getTargetOfExportSpecifier,
    });
    /* eslint-disable-next-line no-var */
    var Symbol = objectAllocator.getSymbolConstructor();
    const resolverWorker = createNameResolver(
        options,
        getSymbolOfDeclaration,
        () => {},
        createSymbolTable(),
        new Symbol(SymbolFlags.Property, "arguments" as __String),
        new Symbol(SymbolFlags.Property, "require" as __String),
        createSymbolTable(),
        r => r,
        lookupSymbolName,
        getNodeLinks,
    );

    bindSourceFile(file, options);
    collectAllLinkedAliases(file);

    function getTargetOfExportSpecifier(node: ExportSpecifier, meaning: SymbolFlags): Symbol | undefined {
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

    function resolveName(enclosingDeclaration: Node, name: __String, meaning: SymbolFlags) {
        return resolverWorker(enclosingDeclaration, name, meaning, /*nameNotFoundMessage*/ undefined, /*nameArg*/ undefined, /*isUse*/ false, /*excludeGlobals*/ true, /*getSpellingSuggestions*/ false);
    }

    const symbolLinks = new Map<Symbol, EmitSymbolLinks>();
    function getSymbolLinks(symbol: Symbol) {
        let links = symbolLinks.get(symbol);
        if (!links) symbolLinks.set(symbol, links = {});
        return links;
    }
    function getSymbolOfDeclaration(node: Declaration): Symbol {
        const symbol = node.symbol;
        if (symbol.escapedName !== InternalSymbolName.Computed) {
            return symbol;
        }

        const links = getSymbolLinks(symbol);
        if (!links.lateBoundSymbol) {
            const parentSymbol = symbol.parent;
            if (parentSymbol) {
                const isStatic = some(symbol.declarations, hasStaticModifier);
                resolveAllLateBoundSymbols(parentSymbol, isStatic);
            }
        }
        return links.lateBoundSymbol ?? symbol;
    }

    function resolveAllLateBoundSymbols(symbol: Symbol, isStatic: boolean) {
        const links = getSymbolLinks(symbol);
        let lateSymbols: SymbolTable;
        if (isStatic) {
            if (links.lateBoundExports) {
                return links.lateBoundExports;
            }
            lateSymbols = links.lateBoundExports = createSymbolTable();
        }
        else {
            if (links.lateBoundMembers) {
                return links.lateBoundMembers;
            }
            lateSymbols = links.lateBoundMembers = createSymbolTable();
        }
        if (symbol.declarations) {
            for (const decl of symbol.declarations) {
                const members = getMembersOfDeclaration(decl);
                if (members) {
                    for (const member of members) {
                        if (isStatic === hasStaticModifier(member)) {
                            const memberName = member.name && getDynamicSymbolName(member.name);
                            if (memberName) {
                                lateBindMember(symbol, lateSymbols, memberName, member);
                            }
                        }
                    }
                }
            }
            const expandoFunction = symbol.valueDeclaration?.kind === SyntaxKind.ArrowFunction || symbol.valueDeclaration?.kind === SyntaxKind.FunctionExpression
                ? getSymbolOfDeclaration(symbol.valueDeclaration.parent as VariableDeclaration) || symbol
                : symbol;
            const assignments = expandoFunction.assignmentDeclarationMembers;
            if (assignments) {
                for (const member of assignments.values()) {
                    if (!isBinaryExpression(member)) continue;
                    const memberNameNode = isPropertyAccessExpression(member.left) ? member.left.name :
                        isElementAccessExpression(member.left) ? member.left :
                        undefined;

                    const memberName = memberNameNode && getDynamicSymbolName(memberNameNode);
                    if (memberName) {
                        lateBindMember(symbol, lateSymbols, memberName, member);
                    }
                }
            }
        }
        return lateSymbols;
    }

    function lateBindMember(parent: Symbol, lateSymbols: SymbolTable, memberName: __String, member: Declaration) {
        const links = getNodeLinks(member);
        if (links.resolvedSymbol) return links.resolvedSymbol;
        let lateSymbol = lateSymbols.get(memberName);
        if (!lateSymbol) {
            lateSymbols.set(memberName, lateSymbol = new Symbol(SymbolFlags.None, memberName));
            lateSymbol.parent = parent;
        }
        Debug.assert(lateSymbol.parent === parent, "Existing symbol parent should match new one");
        const symbolFlags = member.symbol.flags;

        lateSymbol.flags |= symbolFlags;
        if (!lateSymbol.declarations) {
            lateSymbol.declarations = [member];
        }
        else if (!member.symbol.isReplaceableByMethod) {
            lateSymbol.declarations.push(member);
        }
        if (symbolFlags & SymbolFlags.Value) {
            if (!lateSymbol.valueDeclaration || lateSymbol.valueDeclaration.kind !== member.kind) {
                lateSymbol.valueDeclaration = member;
            }
        }
        getSymbolLinks(member.symbol).lateBoundSymbol = links.resolvedSymbol = lateSymbol;
    }

    function lookupSymbolName(symbols: SymbolTable, name: __String, meaning: SymbolFlags): Symbol | undefined {
        if (meaning) {
            const symbol = symbols.get(name);
            if (symbol) {
                if (symbol.flags & meaning) {
                    return symbol;
                }
                if (symbol.flags & SymbolFlags.Alias) {
                    return symbol;
                }
            }
        }
        // return undefined if we can't find a symbol.
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
        switch(node.kind) {
            case SyntaxKind.NumericLiteral: 
                return factory.createNumericLiteral((node as NumericLiteral).text);
            case SyntaxKind.BigIntLiteral: 
                return factory.createBigIntLiteral({ negative: false, base10Value: parsePseudoBigInt((node as BigIntLiteral).text) });
            case SyntaxKind.StringLiteral: 
            case SyntaxKind.NoSubstitutionTemplateLiteral: 
                return factory.createStringLiteral((node as StringLiteralLike).text);
            case SyntaxKind.FalseKeyword: 
                return factory.createFalse();
            case SyntaxKind.TrueKeyword: 
                return factory.createTrue();
            case SyntaxKind.PrefixUnaryExpression:
                return factory.createPrefixUnaryExpression(
                    (node as PrefixUnaryExpression).operator,
                    clonePrimitiveLiteralValue((node as PrefixUnaryExpression).operand),
                );
            case SyntaxKind.TemplateExpression: 
                const templateExpression = node as TemplateExpression
                const evaluatedValue = evaluate(templateExpression);
                if (evaluatedValue !== undefined) {
                    return factory.createStringLiteral(evaluatedValue);
                }
                const templateHead = templateExpression.head
                return factory.createTemplateExpression(
                    factory.createTemplateHead(templateHead.text, templateHead.rawText, templateHead.templateFlags),
                    templateExpression.templateSpans.map(t =>
                        factory.createTemplateSpan(
                            clonePrimitiveLiteralValue(t.expression),
                            t.literal.kind === SyntaxKind.TemplateMiddle ?
                                factory.createTemplateMiddle(t.literal.text, t.literal.rawText, t.literal.templateFlags) :
                                factory.createTemplateTail(t.literal.text, t.literal.rawText, t.literal.templateFlags),
                        )
                    ),
                );
            default:
                Debug.assert(false, `Unable to clone unknown literal type. Kind: ${node.kind}`);
        }
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
        if (isVariableDeclaration(declaration)) {
            if (declaration.type || !isVarConst(declaration)) {
                return false;
            }
            if (!(declaration.initializer && isFunctionExpressionOrArrowFunction(declaration.initializer))) {
                return false;
            }
        }

        const symbol = getSymbolOfDeclaration(declaration);
        if (!!symbol.exports && !!forEachEntry(symbol.exports, p => p.flags & SymbolFlags.Value && isExpandoPropertyDeclaration(p.valueDeclaration))) {
            return true;
        }
        const lateBoundSymbols = resolveAllLateBoundSymbols(symbol, /*isStatic*/ true);
        return !!forEachEntry(lateBoundSymbols, p => p.flags & SymbolFlags.Value && isExpandoPropertyDeclaration(p.valueDeclaration));
    }

    return {
        isDeclarationVisible,
        isLiteralConstDeclaration,
        isLiteralComputedName,
        tryFindAmbientModule() {
            return undefined;
        },
        getPropertiesOfContainerFunction(node: FunctionDeclaration | VariableDeclaration) {
            const symbol = getSymbolOfDeclaration(node);
            return [...symbol.exports?.values() ?? [], ...resolveAllLateBoundSymbols(symbol, /*isStatic*/ true).values()];
        },
        getAllAccessorDeclarations(declaration) {
            const symbol = getSymbolOfDeclaration(declaration);
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
            function getSignaturesOfSymbol(symbol: Symbol): Node[] {
                const links = getSymbolLinks(symbol);
                if (links.signatureDeclarations) return links.signatureDeclarations;

                if (!symbol || !symbol.declarations) return (links.signatureDeclarations = emptyArray);

                const result: Node[] = links.signatureDeclarations = [];
                for (let i = 0; i < symbol.declarations.length; i++) {
                    const decl = symbol.declarations[i];
                    if (!isFunctionLike(decl)) continue;
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
                const symbol = getSymbolOfDeclaration(node);
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

function getSymbolName(name: Exclude<PropertyName, ComputedPropertyName>): __String;
function getSymbolName(name: ElementAccessExpression | PropertyName): __String | undefined;
function getSymbolName(name: ElementAccessExpression | PropertyName): __String | undefined {
    const staticName = isPropertyName(name) ? getPropertyNameForPropertyNameNode(name) :
        isElementAccessExpression(name) && isPropertyName(name.argumentExpression) ? getPropertyNameForPropertyNameNode(name.argumentExpression) :
        undefined;

    if (staticName) return staticName;

    return getDynamicSymbolName(name);
}

function getDynamicSymbolName(name: ElementAccessExpression | PropertyName) {
    const computedName = isComputedPropertyName(name) ? name.expression :
        isElementAccessExpression(name) ? name.argumentExpression :
        undefined;
    if (computedName && isEntityNameExpression(computedName)) {
        return ("__!" + entityNameToString(computedName)) as __String;
    }
    return undefined;
}
