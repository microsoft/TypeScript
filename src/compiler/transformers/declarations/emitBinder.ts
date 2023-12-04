import {
    __String,
    ArrayBindingElement,
    BinaryExpression,
    BindingPattern,
    ClassDeclaration,
    ClassElement,
    ComputedPropertyName,
    Debug,
    Declaration,
    EnumDeclaration,
    EnumMember,
    Expression,
    factory,
    findAncestor,
    forEachChild,
    FunctionDeclaration,
    getModuleInstanceState,
    getNodeId,
    hasAmbientModifier,
    hasSyntacticModifier,
    InterfaceDeclaration,
    isBinaryExpression,
    isBindingPattern,
    isBlock,
    isBlockScopedContainerTopLevel,
    isClassDeclaration,
    isComputedPropertyName,
    isConditionalTypeNode,
    isConstructorDeclaration,
    isConstructSignatureDeclaration,
    isDoStatement,
    isElementAccessExpression,
    isEnumConst,
    isEnumDeclaration,
    isExportAssignment,
    isExportDeclaration,
    isExpression,
    isExpressionStatement,
    isForInOrOfStatement,
    isForStatement,
    isFunctionDeclaration,
    isFunctionExpressionOrArrowFunction,
    isIdentifier,
    isIfStatement,
    isImportDeclaration,
    isImportEqualsDeclaration,
    isInferTypeNode,
    isInterfaceDeclaration,
    isLabeledStatement,
    isMappedTypeNode,
    isModuleBlock,
    isModuleDeclaration,
    isNamedExports,
    isNumericLiteral,
    isParameterDeclaration,
    isPrefixUnaryExpression,
    isPrivateIdentifier,
    isPropertyAccessExpression,
    isPropertyName,
    isSourceFile,
    isStringLiteralLike,
    isTypeAliasDeclaration,
    isVarConst,
    isVariableDeclaration,
    isVariableDeclarationList,
    isVariableStatement,
    isWhileStatement,
    MemberKey,
    ModifierFlags,
    ModuleDeclaration,
    ModuleInstanceState,
    Node,
    NodeArray,
    NoSubstitutionTemplateLiteral,
    ObjectLiteralElement,
    ParameterDeclaration,
    PropertyName,
    setValueDeclaration,
    SourceFile,
    Symbol,
    SymbolFlags,
    SyntaxKind,
    TypeAliasDeclaration,
    TypeElement,
    TypeParameterDeclaration,
    VariableDeclaration,
} from "../../_namespaces/ts";

/** @internal */
export interface EmitDeclarationNodeLinks {
    isVisible?: boolean;
    symbol?: EmitDeclarationSymbol;
    localSymbol?: EmitDeclarationSymbol;
    locals?: EmitDeclarationSymbolTable;
    enumValue?: string | number | undefined;
}

/** @internal */
export type EmitDeclarationSymbolTable = Map<MemberKey, EmitDeclarationSymbol>;

/** @internal */
export interface EmitDeclarationSymbol {
    name?: MemberKey;
    exportSymbol?: EmitDeclarationSymbol;
    declarations: Declaration[];
    signatureDeclarations?: Node[];
    flags: SymbolFlags;
    members?: EmitDeclarationSymbolTable;
    exports?: EmitDeclarationSymbolTable;
}

interface SymbolRegistrationFlags {
    includes: SymbolFlags;
    excludes: SymbolFlags;
}
const syntaxKindToSymbolMap = {
    [SyntaxKind.TypeParameter]: { includes: SymbolFlags.TypeParameter, excludes: SymbolFlags.TypeParameterExcludes },
    [SyntaxKind.Parameter]: { includes: SymbolFlags.FunctionScopedVariable, excludes: SymbolFlags.ParameterExcludes },
    [SyntaxKind.VariableDeclaration]: { includes: SymbolFlags.BlockScopedVariable, excludes: SymbolFlags.BlockScopedVariableExcludes },
    [SyntaxKind.BindingElement]: { includes: SymbolFlags.BlockScopedVariable, excludes: SymbolFlags.BlockScopedVariableExcludes },
    [SyntaxKind.PropertyDeclaration]: { includes: SymbolFlags.Property, excludes: SymbolFlags.PropertyExcludes },
    [SyntaxKind.PropertySignature]: { includes: SymbolFlags.Property, excludes: SymbolFlags.PropertyExcludes },
    [SyntaxKind.PropertyAssignment]: { includes: SymbolFlags.Property, excludes: SymbolFlags.PropertyExcludes },
    [SyntaxKind.ShorthandPropertyAssignment]: { includes: SymbolFlags.Property, excludes: SymbolFlags.PropertyExcludes },
    [SyntaxKind.EnumMember]: { includes: SymbolFlags.EnumMember, excludes: SymbolFlags.EnumMemberExcludes },
    [SyntaxKind.CallSignature]: { includes: SymbolFlags.Signature, excludes: SymbolFlags.None },
    [SyntaxKind.ConstructSignature]: { includes: SymbolFlags.Signature, excludes: SymbolFlags.None },
    [SyntaxKind.IndexSignature]: { includes: SymbolFlags.Signature, excludes: SymbolFlags.None },
    [SyntaxKind.MethodDeclaration]: { includes: SymbolFlags.Method, excludes: SymbolFlags.MethodExcludes },
    [SyntaxKind.MethodSignature]: { includes: SymbolFlags.Method, excludes: SymbolFlags.MethodExcludes },
    [SyntaxKind.FunctionDeclaration]: { includes: SymbolFlags.Function, excludes: SymbolFlags.FunctionExcludes },
    [SyntaxKind.Constructor]: { includes: SymbolFlags.Constructor, excludes: SymbolFlags.None },
    [SyntaxKind.GetAccessor]: { includes: SymbolFlags.GetAccessor, excludes: SymbolFlags.GetAccessorExcludes },
    [SyntaxKind.SetAccessor]: { includes: SymbolFlags.SetAccessor, excludes: SymbolFlags.SetAccessorExcludes },
    [SyntaxKind.ClassExpression]: { includes: SymbolFlags.Class, excludes: SymbolFlags.ClassExcludes },
    [SyntaxKind.ClassDeclaration]: { includes: SymbolFlags.Class, excludes: SymbolFlags.ClassExcludes },
    [SyntaxKind.InterfaceDeclaration]: { includes: SymbolFlags.Interface, excludes: SymbolFlags.InterfaceExcludes },
    [SyntaxKind.TypeAliasDeclaration]: { includes: SymbolFlags.TypeAlias, excludes: SymbolFlags.TypeAliasExcludes },
    [SyntaxKind.EnumDeclaration]: {
        const: { includes: SymbolFlags.ConstEnum, excludes: SymbolFlags.ConstEnumExcludes },
        regular: { includes: SymbolFlags.RegularEnum, excludes: SymbolFlags.RegularEnumExcludes },
    },
    [SyntaxKind.ModuleDeclaration]: {
        value: { includes: SymbolFlags.ValueModule, excludes: SymbolFlags.ValueModuleExcludes },
        namespace: { includes: SymbolFlags.NamespaceModule, excludes: SymbolFlags.NamespaceModuleExcludes },
    },
    [SyntaxKind.ImportEqualsDeclaration]: { includes: SymbolFlags.Alias, excludes: SymbolFlags.AliasExcludes },
    [SyntaxKind.NamespaceImport]: { includes: SymbolFlags.Alias, excludes: SymbolFlags.AliasExcludes },
    [SyntaxKind.ImportSpecifier]: { includes: SymbolFlags.Alias, excludes: SymbolFlags.AliasExcludes },
    [SyntaxKind.ExportSpecifier]: { includes: SymbolFlags.Alias | SymbolFlags.ExportValue, excludes: SymbolFlags.AliasExcludes },
    [SyntaxKind.NamespaceExportDeclaration]: { includes: SymbolFlags.Alias, excludes: SymbolFlags.AliasExcludes },
    [SyntaxKind.ImportClause]: { includes: SymbolFlags.Alias, excludes: SymbolFlags.AliasExcludes },
} as const satisfies Partial<Record<SyntaxKind, SymbolRegistrationFlags | Record<string, SymbolRegistrationFlags>>>;

/**
 * Assigning values to a property of a function will usually cause those members to be implicitly declared on the function
 * even if they were were not declared (expando functions)
 * DTE needs to detect these members and error on them since this behavior is not supported in isolated declarations
 * There are however members that can be assigned on a function that are not expando members, namely members that come from Function
 * In DTE we do not load the full d.ts so we keep a list of known members of function that can be assigned without considering them expando members.
 */
const knownFunctionMembers = new Set([
    "I:apply",
    "I:call",
    "I:bind",
    "I:toString",
    "I:prototype",
    "I:length",
]);

/** @internal */
export function bindSourceFileForDeclarationEmit(file: SourceFile) {
    const nodeLinks: EmitDeclarationNodeLinks[] = [];
    function tryGetNodeLinks(node: Node): EmitDeclarationNodeLinks | undefined {
        const id = (node as any).id;
        if (!id) return undefined;
        return nodeLinks[id];
    }
    function getNodeLinks(node: Node): EmitDeclarationNodeLinks {
        const nodeId = getNodeId(node);
        return nodeLinks[nodeId] || (nodeLinks[nodeId] = {});
    }

    bind();

    return {
        tryGetNodeLinks,
        getNodeLinks,
        resolveName,
        resolveMemberKey,
        resolveEntityName,
        getMemberKey,
    };

    function resolveEntityName(location: Node, node: Expression, meaning: SymbolFlags): EmitDeclarationSymbol | undefined {
        if (isIdentifier(node)) {
            return resolveName(location, node.escapedText, meaning);
        }
        else if (isPropertyAccessExpression(node) || isElementAccessExpression(node)) {
            const symbol = resolveEntityName(location, node.expression, meaning);
            if (symbol === undefined) return undefined;

            const name = isElementAccessExpression(node) ? node.argumentExpression : node.name;
            if (!isPropertyName(name)) return;

            const memberSymbol = symbol.exports?.get(getMemberKey(name));
            if (!memberSymbol || !(memberSymbol.flags & meaning)) {
                return undefined;
            }
            return memberSymbol;
        }
        else {
            return undefined;
        }
    }

    function resolveName(enclosingDeclaration: Node, escapedText: __String, meaning: SymbolFlags) {
        return resolveMemberKey(enclosingDeclaration, getMemberKey(escapedText as string), meaning);
    }
    function resolveMemberKey(enclosingDeclaration: Node, key: MemberKey, meaning: SymbolFlags) {
        function getSymbolFromScope(table: EmitDeclarationSymbolTable | undefined) {
            const symbol = table?.get(key);
            if (symbol && ((symbol.flags & meaning) || (symbol.flags & SymbolFlags.Alias))) {
                return symbol;
            }
        }

        let currentScope = enclosingDeclaration;
        while (currentScope) {
            const links = tryGetNodeLinks(currentScope);
            let symbol = getSymbolFromScope(links?.locals);
            if (!symbol && (isModuleDeclaration(currentScope) || isSourceFile(currentScope))) {
                symbol = getSymbolFromScope(links?.symbol?.exports);
            }
            if (symbol) return symbol;
            currentScope = currentScope.parent;
        }
        return undefined;
    }

    function getSymbolFlagsForNode(node: Node & { kind: keyof typeof syntaxKindToSymbolMap; }) {
        if (node.kind === SyntaxKind.EnumDeclaration) {
            return isEnumConst(node as EnumDeclaration) ?
                syntaxKindToSymbolMap[node.kind].const :
                syntaxKindToSymbolMap[node.kind].regular;
        }
        if (node.kind === SyntaxKind.ModuleDeclaration) {
            return getModuleInstanceState(node as ModuleDeclaration) === ModuleInstanceState.Instantiated ?
                syntaxKindToSymbolMap[node.kind].value :
                syntaxKindToSymbolMap[node.kind].namespace;
        }
        return syntaxKindToSymbolMap[node.kind];
    }
    function getElementFlagsOrThrow(node: Node) {
        const result = getSymbolFlagsForNode(node as Node & { kind: keyof typeof syntaxKindToSymbolMap; });
        if (!result) {
            throw new Error("Unknown binding element type");
        }
        return result;
    }

    function bind() {
        /* eslint-disable no-var */
        var currentScope: Node = undefined!;
        var currentSymbol: EmitDeclarationSymbol = undefined!;
        var currentLocalSymbolTable: EmitDeclarationSymbolTable = undefined!;
        var currentExportsSymbolTable: EmitDeclarationSymbolTable | undefined;
        var postBindingAction: (() => void)[] = [];

        var fileLinks = getNodeLinks(file).symbol = createEmitSymbol();
        /* eslint-enable no-var */
        fileLinks.exports = new Map();
        withScope(file, fileLinks.exports, () => bindEachFunctionsFirst(file.statements));
        postBindingAction.forEach(fn => fn());

        function createEmitSymbol(): EmitDeclarationSymbol {
            return {
                declarations: [],
                flags: 0,
            };
        }
        function getSymbol(table: EmitDeclarationSymbolTable, name: MemberKey) {
            let symbol = table.get(name);
            if (!symbol) {
                symbol = createEmitSymbol();
                symbol.name = name;
                table.set(name, symbol);
            }
            return symbol;
        }
        function addLocalAndExportDeclaration(name: LocalAndExportName | MemberKey | undefined, node: Declaration, flags: SymbolRegistrationFlags, isExport: boolean) {
            const { exportName, localName } = typeof name === "object" ? name : { exportName: name, localName: name };
            if (isExport) {
                const exportKind = flags.includes & SymbolFlags.Value ? SymbolFlags.ExportValue : 0;
                const localSymbol = addLocalOnlyDeclaration(localName, node, { includes: exportKind, excludes: flags.excludes });
                const exportSymbol = addExportOnlyDeclaration(exportName, node, flags);
                localSymbol.exportSymbol = exportSymbol;
                // Export symbol can be undefined if the export modifier was placed in an unexpected position.
                // We just assume the local symbol should be used. There are already bigger issues in the file anyway.
                return exportSymbol ?? localSymbol;
            }
            else {
                return addLocalOnlyDeclaration(localName, node, flags);
            }
        }
        function addExportOnlyDeclaration(name: MemberKey | undefined, node: Declaration, flagsAndForbiddenFlags: SymbolRegistrationFlags) {
            if (!currentExportsSymbolTable) {
                return undefined;
            }
            return addDeclaration(currentExportsSymbolTable, name, node, flagsAndForbiddenFlags);
        }
        function addLocalOnlyDeclaration(name: MemberKey | undefined, node: Declaration, flagsAndForbiddenFlags: SymbolRegistrationFlags) {
            return addDeclaration(currentLocalSymbolTable, name, node, flagsAndForbiddenFlags);
        }

        function addDeclaration(table: EmitDeclarationSymbolTable, name: MemberKey | undefined, node: Declaration, { includes, excludes }: SymbolRegistrationFlags) {
            let symbol = name !== undefined ? getSymbol(table, name) : createEmitSymbol();
            // Symbols don't merge, create new one
            if (excludes & symbol.flags) {
                // Variables and expando members from assignments are always allowed to merge
                if (!(includes & SymbolFlags.Variable && symbol.flags & SymbolFlags.Assignment)) {
                    symbol = createEmitSymbol();
                }
            }
            symbol.declarations.push(node);
            symbol.flags |= includes;
            setValueDeclaration(symbol as Symbol, node);
            getNodeLinks(node).symbol = symbol;
            // Some parts of declarations.ts use the symbol directly. We provide enough of it for everything to work.
            node.symbol = symbol as Symbol;
            return symbol;
        }
        function withScope(scope: Node, exports: EmitDeclarationSymbolTable | undefined, fn: () => void) {
            const old = [currentScope, currentLocalSymbolTable, currentExportsSymbolTable] as const;
            currentScope = scope;
            const links = getNodeLinks(scope);
            currentLocalSymbolTable = links.locals ??= new Map();
            currentExportsSymbolTable = exports;
            fn();
            [currentScope, currentLocalSymbolTable, currentExportsSymbolTable] = old;
        }
        function withMembers(symbol: EmitDeclarationSymbol, table: "members" | "exports" = "members", fn: () => void) {
            const old = [currentLocalSymbolTable, currentSymbol] as const;
            currentSymbol = symbol;
            currentLocalSymbolTable = symbol[table] ??= new Map();
            fn();
            [currentLocalSymbolTable, currentSymbol] = old;
        }

        interface LocalAndExportName {
            exportName?: MemberKey;
            localName?: MemberKey;
        }
        function getStatementName(s: TypeAliasDeclaration | EnumDeclaration | InterfaceDeclaration | ClassDeclaration | FunctionDeclaration): undefined | MemberKey | LocalAndExportName {
            if (hasSyntacticModifier(s, ModifierFlags.Export) && hasSyntacticModifier(s, ModifierFlags.Default)) {
                return {
                    exportName: "default" as MemberKey,
                    localName: getMemberKey(s.name),
                };
            }
            if (s.name) {
                return getMemberKey(s.name);
            }
        }
        // We need to bind locals for types (conditional and mapped typed define parameters in their definitions)
        function bindTypeExpressions(node?: Node) {
            function bindChildren(node: Node) {
                forEachChild(node, bindWorker, arr => arr.forEach(bindWorker));
            }
            function bindWorker(node?: Node) {
                if (!node) return;
                if (isMappedTypeNode(node)) {
                    const mappedType = node;
                    withScope(node, /*exports*/ undefined, () => {
                        bindTypeParameters([mappedType.typeParameter]);
                    });
                    bindWorker(mappedType.nameType);
                    bindWorker(mappedType.type);
                }
                else if (isConditionalTypeNode(node)) {
                    withScope(node.extendsType, /*exports*/ undefined, () => {
                        bindWorker(node.extendsType);
                    });
                    bindWorker(node.checkType);
                    bindWorker(node.falseType);
                    getNodeLinks(node.trueType).locals = getNodeLinks(node.extendsType).locals;
                    bindWorker(node.trueType);
                }
                else if (isInferTypeNode(node)) {
                    const conditionalTypeOwner = findAncestor(node, isConditionalTypeNode);
                    // Probably an error, infer not in a conditional type context
                    // Try to bind the rest of it
                    if (conditionalTypeOwner) {
                        withScope(conditionalTypeOwner, /*exports*/ undefined, () => {
                            bindTypeParameters([node.typeParameter]);
                        });
                    }
                    bindChildren(node);
                }
                else if (isBlock(node)) {
                    // Do not go into bodies
                    return;
                }
                else {
                    bindChildren(node);
                }
            }
            bindWorker(node);
        }
        function bindTypeParameters(typeParameters: TypeParameterDeclaration[] | NodeArray<TypeParameterDeclaration> | undefined) {
            typeParameters?.forEach(t => addLocalOnlyDeclaration(getMemberKey(t.name), t, getSymbolFlagsForNode(t)));
        }
        function bindVariable(d: VariableDeclaration | ParameterDeclaration) {
            bindTypeExpressions(d.type);
            const isExported = isExportedVariable(d);
            if (isIdentifier(d.name)) {
                addLocalAndExportDeclaration(getMemberKey(d.name), d, getSymbolFlagsForNode(d), isExported);
            }
            else if (isBindingPattern(d.name)) {
                function bindBindingPattern(pattern: BindingPattern) {
                    // type BindingPattern = ObjectBindingPattern | ArrayBindingPattern;
                    (pattern.elements as NodeArray<ArrayBindingElement>).forEach(b => {
                        if (b.kind === SyntaxKind.OmittedExpression) return;
                        if (!b.name) return;

                        if (isIdentifier(b.name)) {
                            addLocalAndExportDeclaration(getMemberKey(b.name), b, getSymbolFlagsForNode(b), isExported);
                        }
                        else {
                            bindBindingPattern(b.name);
                        }
                    });
                }
                bindBindingPattern(d.name);
            }
            else {
                Debug.assertNever(d.name);
            }
            function isExportedVariable(d: VariableDeclaration | ParameterDeclaration) {
                if (isParameterDeclaration(d)) return false;
                // exported directly
                if (hasSyntacticModifier(d.parent.parent, ModifierFlags.Export)) {
                    return true;
                }
                // or part of an ambient module declaration
                const module = findAncestor(d, isBlockScopedContainerTopLevel);
                return !!module && hasAmbientModifier(module);
            }
        }
        function bindEachFunctionsFirst(nodes: NodeArray<Node> | undefined): void {
            if (!nodes) return;
            bindContainer(nodes, n => n.kind === SyntaxKind.FunctionDeclaration);
            bindContainer(nodes, n => n.kind !== SyntaxKind.FunctionDeclaration);
        }
        function bindExpandoMembers(expression: Node) {
            if (isBinaryExpression(expression) && expression.operatorToken.kind === SyntaxKind.EqualsToken) {
                bindExpandoMemberAssignment(expression);
            }
            forEachChild(expression, node => {
                bindExpandoMembers(node);
            });

            function bindExpandoMemberAssignment(expression: BinaryExpression) {
                const assignmentTarget = expression.left;
                const isPropertyAccess = isPropertyAccessExpression(assignmentTarget);
                if (
                    (isPropertyAccess || isElementAccessExpression(assignmentTarget))
                ) {
                    let name;
                    if (isPropertyAccess) {
                        name = assignmentTarget.name;
                    }
                    else {
                        const argumentExpression = assignmentTarget.argumentExpression;
                        name = factory.createComputedPropertyName(argumentExpression);
                    }
                    const key = getMemberKey(name);
                    if (!key || knownFunctionMembers.has(key)) return;
                    const target = resolveEntityName(expression, assignmentTarget.expression, SymbolFlags.Value | SymbolFlags.ExportValue);
                    if (!target) return;
                    const fn = target.declarations.find(canHaveExpandoMembers);
                    if (!fn) return;

                    target.exports ??= new Map();
                    if (target.exportSymbol) {
                        target.exportSymbol.exports = target.exports;
                    }
                    withScope(fn, target.exports, () => {
                        const { includes, excludes } = syntaxKindToSymbolMap[SyntaxKind.PropertyDeclaration];
                        addExportOnlyDeclaration(key, assignmentTarget, {
                            includes: includes | SymbolFlags.Assignment,
                            excludes: excludes & ~SymbolFlags.Assignment,
                        });
                    });
                }
            }
            function canHaveExpandoMembers(declaration: Node) {
                if (isFunctionDeclaration(declaration)) {
                    return true;
                }
                else if (isVariableDeclaration(declaration)) {
                    if (declaration.type || !isVarConst(declaration)) {
                        return false;
                    }
                    if (!(declaration.initializer && isFunctionExpressionOrArrowFunction(declaration.initializer))) {
                        return false;
                    }
                    return true;
                }
            }
        }

        function bindContainer(statements: NodeArray<Node> | Node[], filter: (node: Node) => boolean) {
            statements.forEach(statement => {
                if (!filter(statement)) return;
                bindNode(statement);
            });
        }
        function bindNode(node: Node | undefined) {
            if (!node) return;
            const isExported = hasSyntacticModifier(node, ModifierFlags.Export);
            if (isExpressionStatement(node)) {
                bindExpandoMembers(node.expression);
            }
            else if (isExpression(node)) {
                bindExpandoMembers(node);
            }
            else if (isImportEqualsDeclaration(node)) {
                addLocalOnlyDeclaration(getMemberKey(node.name), node, getSymbolFlagsForNode(node));
            }
            else if (isImportDeclaration(node)) {
                if (!node.importClause) {
                    return;
                }
                if (node.importClause.name) {
                    addLocalOnlyDeclaration(getMemberKey(node.importClause.name), node.importClause, getSymbolFlagsForNode(node.importClause));
                }
                if (node.importClause.namedBindings) {
                    const namedBindings = node.importClause.namedBindings;
                    if (namedBindings.kind === SyntaxKind.NamedImports) {
                        namedBindings.elements.forEach(v => {
                            addLocalOnlyDeclaration(getMemberKey(v.name), v, getSymbolFlagsForNode(v));
                        });
                    }
                    else if (namedBindings.kind === SyntaxKind.NamespaceImport) {
                        addLocalOnlyDeclaration(getMemberKey(namedBindings.name), namedBindings, getSymbolFlagsForNode(namedBindings));
                    }
                    else {
                        throw new Error("Not supported");
                    }
                }
            }
            else if (isVariableStatement(node)) {
                node.declarationList.declarations.forEach(bindVariable);
            }
            else if (isVariableDeclarationList(node)) {
                node.declarations.forEach(bindVariable);
            }
            else if (isFunctionDeclaration(node)) {
                bindTypeParameters(node.typeParameters);
                bindTypeExpressions(node.type);
                withScope(node, /*exports*/ undefined, () => {
                    bindTypeExpressions(node);
                    node.parameters.forEach(bindVariable);
                });

                addLocalAndExportDeclaration(getStatementName(node), node, getSymbolFlagsForNode(node), isExported);
            }
            else if (isTypeAliasDeclaration(node)) {
                addLocalAndExportDeclaration(getStatementName(node), node, getSymbolFlagsForNode(node), isExported);
                withScope(node, /*exports*/ undefined, () => {
                    bindTypeParameters(node.typeParameters);
                });
                bindTypeExpressions(node.type);
            }
            // Default export declarations set isVisible on true on associated symbols in the type checker.
            else if (isExportAssignment(node)) {
                if (node.expression && isIdentifier(node.expression)) {
                    const name = node.expression.escapedText;
                    postBindingAction.push(() => {
                        const resolvedSymbol = resolveName(node.expression, name, SymbolFlags.Value | SymbolFlags.Type | SymbolFlags.Namespace | SymbolFlags.Alias);
                        if (resolvedSymbol) {
                            resolvedSymbol.declarations.forEach(d => getNodeLinks(d).isVisible = true);
                        }
                    });
                }
            }
            else if (isExportDeclaration(node)) {
                if (node.exportClause && isNamedExports(node.exportClause)) {
                    const elements = node.exportClause.elements;
                    if (node.moduleSpecifier) {
                        // TODO is currentExportsSymbolTable ok here?
                        withScope(node, /*exports*/ undefined, () => {
                            elements.forEach(e => {
                                const { includes, excludes } = getSymbolFlagsForNode(e);
                                addLocalOnlyDeclaration(getMemberKey(e.propertyName ?? e.name), e, {
                                    includes: includes | SymbolFlags.ExportValue,
                                    excludes,
                                });
                            });
                        });
                    }
                    elements.forEach(e => {
                        postBindingAction.push(() => {
                            const resolvedSymbol = resolveName(e, (e.propertyName ?? e.name).escapedText, ~0);
                            if (resolvedSymbol) {
                                resolvedSymbol.declarations.forEach(d => getNodeLinks(d).isVisible = true);
                            }
                        });
                    });
                }
            }
            else if (isEnumDeclaration(node)) {
                addLocalAndExportDeclaration(getStatementName(node), node, getSymbolFlagsForNode(node), isExported);
                withScope(node, /*exports*/ undefined, () => {
                    node.members.forEach(m => {
                        addLocalOnlyDeclaration(getMemberKeyFromElement(m), m, getSymbolFlagsForNode(m));
                    });
                });
            }
            else if (isModuleDeclaration(node)) {
                function bindModuleDeclaration(moduleDeclaration: ModuleDeclaration) {
                    const name = isIdentifier(moduleDeclaration.name) ? moduleDeclaration.name : undefined;
                    const moduleSymbol = addLocalAndExportDeclaration(getMemberKey(name), moduleDeclaration, getSymbolFlagsForNode(moduleDeclaration), isExported);
                    moduleSymbol.exports ??= new Map();
                    withScope(moduleDeclaration, moduleSymbol.exports, () => {
                        if (moduleDeclaration.body) {
                            if (isModuleBlock(moduleDeclaration.body)) {
                                const moduleBlock = moduleDeclaration.body;
                                bindEachFunctionsFirst(moduleBlock.statements);
                            }
                            else if (isModuleDeclaration(moduleDeclaration.body)) {
                                const subModule = moduleDeclaration.body;
                                bindModuleDeclaration(subModule);
                            }
                            else {
                                throw new Error("Unsupported body type");
                            }
                        }
                    });
                }
                bindModuleDeclaration(node);
            }
            else if (isInterfaceDeclaration(node)) {
                const interfaceDeclaration = node;
                const interfaceSymbol = addLocalAndExportDeclaration(getStatementName(interfaceDeclaration), interfaceDeclaration, getSymbolFlagsForNode(interfaceDeclaration), isExported);
                withScope(interfaceDeclaration, /*exports*/ undefined, () => {
                    bindTypeParameters(interfaceDeclaration.typeParameters);
                });
                withMembers(interfaceSymbol, "members", () => {
                    interfaceDeclaration.members.forEach(m => {
                        addLocalOnlyDeclaration(getMemberKeyFromElement(m), m, getElementFlagsOrThrow(m));
                        bindTypeExpressions(m);
                    });
                });
            }
            else if (isClassDeclaration(node)) {
                const classDeclaration = node;
                const classSymbol = addLocalAndExportDeclaration(getStatementName(classDeclaration), classDeclaration, getSymbolFlagsForNode(classDeclaration), isExported);
                withScope(classDeclaration, /*exports*/ undefined, () => {
                    bindTypeParameters(classDeclaration.typeParameters);
                });
                withMembers(classSymbol, "members", () => {
                    classDeclaration.members.forEach(m => {
                        if (hasSyntacticModifier(m, ModifierFlags.Static)) return;
                        if (m.kind === SyntaxKind.SemicolonClassElement || m.kind === SyntaxKind.ClassStaticBlockDeclaration) return;

                        addLocalOnlyDeclaration(getMemberKeyFromElement(m), m, getElementFlagsOrThrow(m));
                        bindTypeExpressions(m);
                    });
                });
                withMembers(classSymbol, "exports", () => {
                    classDeclaration.members.forEach(m => {
                        if (!hasSyntacticModifier(m, ModifierFlags.Static)) return;
                        if (
                            m.kind === SyntaxKind.SemicolonClassElement
                            || m.kind === SyntaxKind.ClassStaticBlockDeclaration
                        ) return;

                        addLocalOnlyDeclaration(getMemberKeyFromElement(m), m, getElementFlagsOrThrow(m));
                        bindTypeExpressions(m);
                    });
                });
            }
            else if (isLabeledStatement(node)) {
                bindNode(node.statement);
            }
            else if (isForStatement(node)) {
                withScope(node, /*exports*/ undefined, () => {
                    bindNode(node.initializer);
                    bindNode(node.condition);
                    bindNode(node.incrementor);
                    bindNode(node.statement);
                });
            }
            else if (isForInOrOfStatement(node)) {
                withScope(node, /*exports*/ undefined, () => {
                    bindNode(node.initializer);
                    bindNode(node.expression);
                    bindNode(node.statement);
                });
            }
            else if (isWhileStatement(node) || isDoStatement(node)) {
                bindNode(node.expression);
                bindNode(node.statement);
            }
            else if (isBlock(node)) {
                withScope(node, /*exports*/ undefined, () => {
                    bindEachFunctionsFirst(node.statements);
                });
            }
            else if (isIfStatement(node)) {
                bindNode(node.expression);
                bindNode(node.thenStatement);
                bindNode(node.elseStatement);
            }
        }
    }
}

/**
 * Gets the symbolic name for a member from its type.
 * @internal
 */
export function getMemberKey(name: string | Exclude<PropertyName, ComputedPropertyName> | NoSubstitutionTemplateLiteral): MemberKey;
/**
 * Gets the symbolic name for a member from its type.
 * @internal
 */
export function getMemberKey(name: string | PropertyName | NoSubstitutionTemplateLiteral | undefined): MemberKey | undefined;
export function getMemberKey(name: string | PropertyName | NoSubstitutionTemplateLiteral | undefined): string | undefined {
    if (name === undefined) {
        return undefined;
    }
    if (typeof name === "string") {
        return ("I:" + name);
    }
    if (isPrivateIdentifier(name)) {
        return ("P:" + name.escapedText);
    }
    if (isIdentifier(name)) {
        return ("I:" + name.escapedText);
    }
    if (isStringLiteralLike(name)) {
        return ("I:" + name.text);
    }
    if (isNumericLiteral(name)) {
        return ("I:" + (+name.text));
    }
    if (isComputedPropertyName(name)) {
        let computedName = name.expression;

        if (isStringLiteralLike(computedName)) {
            return ("I:" + computedName.text);
        }
        if (isNumericLiteral(computedName)) {
            return ("I:" + (+computedName.text));
        }
        if (
            isPrefixUnaryExpression(computedName)
            && isNumericLiteral(computedName.operand)
        ) {
            if (computedName.operator === SyntaxKind.MinusToken) {
                return ("I:" + (-computedName.operand.text));
            }
            else if (computedName.operator === SyntaxKind.PlusToken) {
                return ("I:" + (-computedName.operand.text));
            }
            else {
                return undefined;
            }
        }
        let fullId = "C:";
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
        return fullId;
    }
    return undefined;
}

/**
 * Gets the symbolic name for a member from its type.
 * @internal
 */
export function getMemberKeyFromElement(element: ObjectLiteralElement | TypeElement | ClassElement | EnumMember): MemberKey | undefined {
    if (isConstructorDeclaration(element) || isConstructSignatureDeclaration(element)) {
        return "@constructor" as MemberKey;
    }
    const name = element.name;
    if (!name) return undefined;
    return getMemberKey(name) as MemberKey;
}
