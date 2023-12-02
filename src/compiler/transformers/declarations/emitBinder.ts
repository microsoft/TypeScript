import {
    __String,
    ArrayBindingElement,
    ArrowFunction,
    BindingPattern,
    CallSignatureDeclaration,
    ClassDeclaration,
    ClassExpression,
    ComputedPropertyName,
    ConditionalTypeNode,
    ConstructorDeclaration,
    ConstructSignatureDeclaration,
    Declaration,
    EnumDeclaration,
    ExportAssignment,
    ExportDeclaration,
    Expression,
    factory,
    findAncestor,
    forEachChild,
    FunctionDeclaration,
    FunctionExpression,
    FunctionTypeNode,
    GetAccessorDeclaration,
    getCombinedNodeFlags,
    getModuleInstanceState,
    getNodeId,
    hasAmbientModifier,
    hasSyntacticModifier,
    ImportDeclaration,
    ImportEqualsDeclaration,
    InferTypeNode,
    InterfaceDeclaration,
    isArrayBindingPattern,
    isBinaryExpression,
    isBindingPattern,
    isBlockOrCatchScoped,
    isBlockScopedContainerTopLevel,
    isComputedPropertyName,
    isConditionalTypeNode,
    isConstructorDeclaration,
    isConstructSignatureDeclaration,
    isDeclaration,
    isElementAccessExpression,
    isEnumConst,
    isExpression,
    isFunctionDeclaration,
    isFunctionExpressionOrArrowFunction,
    isIdentifier,
    isJsxNamespacedName,
    isModuleBlock,
    isModuleDeclaration,
    isNamedExports,
    isNumericLiteral,
    isObjectBindingPattern,
    isPrefixUnaryExpression,
    isPrivateIdentifier,
    isPropertyAccessExpression,
    isPropertyName,
    isSourceFile,
    isStringLiteralLike,
    isVarConst,
    isVariableDeclaration,
    MappedTypeNode,
    MemberKey,
    MethodDeclaration,
    MethodSignature,
    ModifierFlags,
    ModuleDeclaration,
    ModuleInstanceState,
    NamedDeclaration,
    Node,
    NodeArray,
    NodeFlags,
    NoSubstitutionTemplateLiteral,
    ObjectLiteralExpression,
    ParameterDeclaration,
    PropertyDeclaration,
    PropertyName,
    SetAccessorDeclaration,
    setValueDeclaration,
    SourceFile,
    Symbol,
    SymbolFlags,
    SyntaxKind,
    TypeAliasDeclaration,
    TypeLiteralNode,
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
    parent?: EmitDeclarationSymbol;
    exportSymbol?: EmitDeclarationSymbol;
    declarations: Declaration[];
    valueDeclaration?: Declaration;
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
    [SyntaxKind.VariableDeclaration]: {
        fnScope: { includes: SymbolFlags.FunctionScopedVariable, excludes: SymbolFlags.FunctionScopedVariableExcludes },
        blockScope: { includes: SymbolFlags.BlockScopedVariable, excludes: SymbolFlags.BlockScopedVariableExcludes },
    },
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

    function tryGetSymbolFlagsForNode(node: Node): SymbolRegistrationFlags | undefined {
        return getSymbolFlagsForNode(node as Node & { kind: keyof typeof syntaxKindToSymbolMap; });
    }
    function getSymbolFlagsForNode(node: Node & { kind: keyof typeof syntaxKindToSymbolMap; }): SymbolRegistrationFlags {
        if (node.kind === SyntaxKind.VariableDeclaration) {
            return getCombinedNodeFlags(node) & NodeFlags.BlockScoped ?
                syntaxKindToSymbolMap[node.kind].blockScope :
                syntaxKindToSymbolMap[node.kind].fnScope;
        }
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
    function bind() {
        /* eslint-disable no-var */
        var currentScope: Node = undefined!;
        var currentFunctionLocalSymbolTable: EmitDeclarationSymbolTable = undefined!;
        var currentSymbol: EmitDeclarationSymbol = undefined!;
        var currentLocalSymbolTable: EmitDeclarationSymbolTable = undefined!;
        var currentExportsSymbolTable: EmitDeclarationSymbolTable | undefined;
        var postBindingAction: (() => void)[] = [];

        var fileLinks = getNodeLinks(file).symbol = createEmitSymbol();
        fileLinks.declarations.push(file);
        setValueDeclaration(fileLinks as Symbol, file);
        /* eslint-enable no-var */
        fileLinks.exports = new Map();
        withScope(file, fileLinks.exports, () => bindEachFunctionsFirst(file.statements));
        postBindingAction.forEach(fn => fn());

        function createAnonymousEmitSymbol(node: Declaration): EmitDeclarationSymbol {
            const symbol = createEmitSymbol();
            symbol.declarations.push(node);
            setValueDeclaration(symbol as Symbol, node);
            node.symbol = symbol as Symbol;
            return symbol;
        }
        function createEmitSymbol(): EmitDeclarationSymbol {
            return {
                parent: currentSymbol,
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
        function addLocalAndExportDeclaration(name: LocalAndExportName | MemberKey | undefined, node: Declaration, flags: SymbolRegistrationFlags, isExport: boolean, isBlockScoped = true) {
            const { exportName, localName } = typeof name === "object" ? name : { exportName: name, localName: name };
            if (isExport) {
                const exportKind = flags.includes & SymbolFlags.Value ? SymbolFlags.ExportValue : 0;
                const localSymbol = addLocalOnlyDeclaration(localName, node, { includes: exportKind, excludes: flags.excludes }, isBlockScoped);
                const exportSymbol = addExportOnlyDeclaration(exportName, node, flags);
                localSymbol.exportSymbol = exportSymbol;
                // Export symbol can be undefined if the export modifier was placed in an unexpected position.
                // We just assume the local symbol should be used. There are already bigger issues in the file anyway.
                return exportSymbol ?? localSymbol;
            }
            else {
                return addLocalOnlyDeclaration(localName, node, flags, isBlockScoped);
            }
        }
        function addExportOnlyDeclaration(name: MemberKey | undefined, node: Declaration, flagsAndForbiddenFlags: SymbolRegistrationFlags) {
            if (!currentExportsSymbolTable) {
                return undefined;
            }
            return addDeclaration(currentExportsSymbolTable, name, node, flagsAndForbiddenFlags);
        }
        function addLocalOnlyDeclaration(name: MemberKey | undefined, node: Declaration, flagsAndForbiddenFlags: SymbolRegistrationFlags, isBlockScoped = true) {
            return addDeclaration(isBlockScoped ? currentLocalSymbolTable : currentFunctionLocalSymbolTable, name, node, flagsAndForbiddenFlags);
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
            setValueDeclaration(symbol as Symbol, node);
            symbol.flags |= includes;
            getNodeLinks(node).symbol = symbol;
            // Some parts of declarations.ts use the symbol directly. We provide enough of it for everything to work.
            node.symbol = symbol as Symbol;
            return symbol;
        }
        function withScope(scope: Node, exports: EmitDeclarationSymbolTable | undefined, fn: () => void) {
            const old = [currentScope, currentSymbol, currentFunctionLocalSymbolTable, currentLocalSymbolTable, currentExportsSymbolTable] as const;
            currentScope = scope;
            const links = getNodeLinks(scope);
            currentLocalSymbolTable = links.locals ??= new Map();
            currentSymbol = links.symbol ?? currentSymbol;
            currentExportsSymbolTable = exports;
            if (isBlockScopedContainerTopLevel(scope)) {
                currentFunctionLocalSymbolTable = currentLocalSymbolTable;
            }
            fn();
            [currentScope, currentSymbol, currentFunctionLocalSymbolTable, currentLocalSymbolTable, currentExportsSymbolTable] = old;
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
        function getStatementName(s: NamedDeclaration): undefined | MemberKey | LocalAndExportName {
            if (hasSyntacticModifier(s, ModifierFlags.Export) && hasSyntacticModifier(s, ModifierFlags.Default)) {
                return {
                    exportName: "default" as MemberKey,
                    localName: getMemberKeyFromElement(s),
                };
            }
            if (s) {
                return getMemberKeyFromElement(s);
            }
        }

        function bindTypeParameters(typeParameters: TypeParameterDeclaration[] | NodeArray<TypeParameterDeclaration> | undefined) {
            typeParameters?.forEach(t => addLocalOnlyDeclaration(getMemberKey(t.name), t, getSymbolFlagsForNode(t)));
        }
        function bindVariable(d: VariableDeclaration | ParameterDeclaration | PropertyDeclaration) {
            bindNode(d.type);
            const isExported = isExportedVariable(d);
            const isBlockScoped = isBlockOrCatchScoped(d);
            if (d.initializer) {
                bindNode(d.initializer);
            }
            if (isBindingPattern(d.name)) {
                function bindBindingPattern(pattern: BindingPattern) {
                    // type BindingPattern = ObjectBindingPattern | ArrayBindingPattern;
                    (pattern.elements as NodeArray<ArrayBindingElement>).forEach(b => {
                        if (b.kind === SyntaxKind.OmittedExpression) return;
                        if (!b.name) return;

                        if (isIdentifier(b.name)) {
                            addLocalAndExportDeclaration(getMemberKey(b.name), b, getSymbolFlagsForNode(b), isExported, isBlockScoped);
                        }
                        else {
                            bindBindingPattern(b.name);
                        }
                    });
                }
                bindBindingPattern(d.name);
            }
            else {
                addLocalAndExportDeclaration(getMemberKeyFromElement(d), d, getSymbolFlagsForNode(d), isExported, isBlockScoped);
            }
            function isExportedVariable(d: VariableDeclaration | ParameterDeclaration | PropertyDeclaration) {
                if (!isVariableDeclaration(d)) return false;
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

                    const parentLocals = target.parent?.valueDeclaration && getNodeLinks(target.parent.valueDeclaration).locals;
                    if (currentFunctionLocalSymbolTable !== parentLocals) return;

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
        function bindObjectLiteral(object: ObjectLiteralExpression) {
            const objectSymbol = createAnonymousEmitSymbol(object);

            withMembers(objectSymbol, "members", () => {
                object.properties.forEach(m => {
                    bindNode(m);
                });
            });
        }
        function bindContainer(statements: NodeArray<Node> | Node[], filter: (node: Node) => boolean) {
            statements.forEach(statement => {
                if (!filter(statement)) return;
                bindNode(statement);
            });
        }
        function bindChildren(node: Node) {
            forEachChild(node, bindNode, arr => arr.forEach(bindNode));
        }
        function bindNode(node: Node | undefined) {
            if (!node) return;

            switch (node.kind) {
                case SyntaxKind.ObjectLiteralExpression:
                    bindObjectLiteralExpression(node as ObjectLiteralExpression);
                    break;
                case SyntaxKind.TypeLiteral:
                    bindTypeLiteralNode(node as TypeLiteralNode);
                    break;
                case SyntaxKind.TypeAliasDeclaration:
                    bindTypeAliasDeclaration(node as TypeAliasDeclaration);
                    break;
                case SyntaxKind.MappedType:
                    bindMappedTypeNode(node as MappedTypeNode);
                    break;
                case SyntaxKind.ConditionalType:
                    bindConditionalTypeNode(node as ConditionalTypeNode);
                    break;
                case SyntaxKind.InferType:
                    bindInferTypeNode(node as InferTypeNode);
                    break;
                case SyntaxKind.ImportEqualsDeclaration:
                    bindImportEqualsDeclaration(node as ImportEqualsDeclaration);
                    break;
                case SyntaxKind.ImportDeclaration:
                    bindImportDeclaration(node as ImportDeclaration);
                    break;
                case SyntaxKind.ExportAssignment:
                    bindExportAssignment(node as ExportAssignment);
                    break;
                case SyntaxKind.ExportDeclaration:
                    bindExportDeclaration(node as ExportDeclaration);
                    break;
                case SyntaxKind.VariableDeclaration:
                    bindVariable(node as VariableDeclaration);
                    break;
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.ArrowFunction:
                    bindFunctionExpressionOrArrowFunction(node as FunctionExpression | ArrowFunction);
                    break;
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.Constructor:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                case SyntaxKind.MethodSignature:
                case SyntaxKind.CallSignature:
                case SyntaxKind.ConstructSignature:
                case SyntaxKind.FunctionType:
                    bindFunctionLikeContainer(node as FunctionLikeContainer);
                    break;
                case SyntaxKind.ClassExpression:
                    // Class Expressions are not supported
                    break;
                case SyntaxKind.EnumDeclaration:
                    bindEnumDeclaration(node as EnumDeclaration);
                    break;
                case SyntaxKind.ModuleDeclaration:
                    bindModuleDeclaration(node as ModuleDeclaration);
                    break;
                case SyntaxKind.InterfaceDeclaration:
                    bindInterfaceDeclaration(node as InterfaceDeclaration);
                    break;
                case SyntaxKind.ClassDeclaration:
                    bindClassDeclaration(node as ClassDeclaration);
                    break;
                case SyntaxKind.ForOfStatement:
                case SyntaxKind.ForInStatement:
                case SyntaxKind.ForStatement:
                case SyntaxKind.Block:
                    withScope(node, /*exports*/ undefined, () => {
                        bindChildren(node);
                    });
                    break;
                default:
                    if (isDeclaration(node)) {
                        bindDeclaration(node);
                    }
                    if (isExpression(node)) {
                        bindExpandoMembers(node);
                    }
                    bindChildren(node);
                    break;
            }
        }
        function bindObjectLiteralExpression(node: ObjectLiteralExpression) {
            bindObjectLiteral(node);
        }
        function bindMappedTypeNode(node: MappedTypeNode) {
            const mappedType = node;
            withScope(node, /*exports*/ undefined, () => {
                bindTypeParameters([mappedType.typeParameter]);
            });
            bindNode(mappedType.nameType);
            bindNode(mappedType.type);
        }
        function bindConditionalTypeNode(node: ConditionalTypeNode) {
            withScope(node.extendsType, /*exports*/ undefined, () => {
                bindNode(node.extendsType);
            });
            bindNode(node.checkType);
            bindNode(node.falseType);
            getNodeLinks(node.trueType).locals = getNodeLinks(node.extendsType).locals;
            bindNode(node.trueType);
        }
        function bindInferTypeNode(node: InferTypeNode) {
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
        function bindFunctionExpressionOrArrowFunction(node: FunctionExpression | ArrowFunction) {
            createAnonymousEmitSymbol(node);
            withScope(node, /*exports*/ undefined, () => {
                bindTypeParameters(node.typeParameters);
                bindNode(node.type);
                node.parameters.forEach(bindVariable);
            });
        }
        function bindImportEqualsDeclaration(node: ImportEqualsDeclaration) {
            addLocalOnlyDeclaration(getMemberKey(node.name), node, getSymbolFlagsForNode(node));
        }
        function bindImportDeclaration(node: ImportDeclaration) {
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
        type FunctionLikeContainer =
            | FunctionDeclaration
            | MethodDeclaration
            | ConstructorDeclaration
            | GetAccessorDeclaration
            | SetAccessorDeclaration
            | MethodSignature
            | FunctionDeclaration
            | CallSignatureDeclaration
            | ConstructSignatureDeclaration
            | FunctionTypeNode;
        function bindFunctionLikeContainer(node: FunctionLikeContainer) {
            const isExported = hasSyntacticModifier(node, ModifierFlags.Export);
            const declarationFlags = tryGetSymbolFlagsForNode(node);
            if (declarationFlags) {
                addLocalAndExportDeclaration(getStatementName(node), node, declarationFlags, isExported);
            }
            withScope(node, /*exports*/ undefined, () => {
                bindTypeParameters(node.typeParameters);
                bindNode(node.type);
                node.parameters.forEach(bindVariable);
            });
        }
        function bindTypeLiteralNode(node: TypeLiteralNode) {
            const objectSymbol = createAnonymousEmitSymbol(node);
            withMembers(objectSymbol, "members", () => {
                node.members.forEach(bindNode);
            });
        }
        function bindTypeAliasDeclaration(node: TypeAliasDeclaration) {
            const isExported = hasSyntacticModifier(node, ModifierFlags.Export);
            addLocalAndExportDeclaration(getStatementName(node), node, getSymbolFlagsForNode(node), isExported);
            withScope(node, /*exports*/ undefined, () => {
                bindTypeParameters(node.typeParameters);
                bindNode(node.type);
            });
        }
        // Default export declarations set isVisible on true on associated symbols in the type checker.
        function bindExportAssignment(node: ExportAssignment) {
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
        function bindExportDeclaration(node: ExportDeclaration) {
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
        function bindEnumDeclaration(node: EnumDeclaration) {
            const isExported = hasSyntacticModifier(node, ModifierFlags.Export);
            addLocalAndExportDeclaration(getStatementName(node), node, getSymbolFlagsForNode(node), isExported);
            withScope(node, /*exports*/ undefined, () => {
                node.members.forEach(m => {
                    addLocalOnlyDeclaration(getMemberKeyFromElement(m), m, getSymbolFlagsForNode(m));
                });
            });
        }
        function bindModuleDeclaration(node: ModuleDeclaration) {
            const isExported = hasSyntacticModifier(node, ModifierFlags.Export);
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
        function bindInterfaceDeclaration(node: InterfaceDeclaration) {
            const isExported = hasSyntacticModifier(node, ModifierFlags.Export);
            const interfaceDeclaration = node;
            const interfaceSymbol = addLocalAndExportDeclaration(getStatementName(interfaceDeclaration), interfaceDeclaration, getSymbolFlagsForNode(interfaceDeclaration), isExported);
            withScope(interfaceDeclaration, /*exports*/ undefined, () => {
                bindTypeParameters(interfaceDeclaration.typeParameters);
            });
            withMembers(interfaceSymbol, "members", () => {
                interfaceDeclaration.members.forEach(m => {
                    bindNode(m);
                });
            });
        }
        function bindClassDeclaration(node: ClassExpression | ClassDeclaration) {
            const isExported = hasSyntacticModifier(node, ModifierFlags.Export);
            const classDeclaration = node;
            const classSymbol = addLocalAndExportDeclaration(getStatementName(classDeclaration), classDeclaration, getSymbolFlagsForNode(classDeclaration), isExported);
            withScope(classDeclaration, /*exports*/ undefined, () => {
                bindTypeParameters(classDeclaration.typeParameters);
            });
            withMembers(classSymbol, "members", () => {
                classDeclaration.members.forEach(m => {
                    if (hasSyntacticModifier(m, ModifierFlags.Static)) return;
                    if (m.kind === SyntaxKind.SemicolonClassElement || m.kind === SyntaxKind.ClassStaticBlockDeclaration) return;

                    bindNode(m);
                });
            });
            withMembers(classSymbol, "exports", () => {
                classDeclaration.members.forEach(m => {
                    if (!hasSyntacticModifier(m, ModifierFlags.Static)) return;
                    if (
                        m.kind === SyntaxKind.SemicolonClassElement
                        || m.kind === SyntaxKind.ClassStaticBlockDeclaration
                    ) return;

                    bindNode(m);
                });
            });
        }
        function bindDeclaration(node: Declaration) {
            const flags = tryGetSymbolFlagsForNode(node);
            // Unsupported declaration
            if (!flags) {
                return;
            }
            addLocalOnlyDeclaration(getMemberKeyFromElement(node), node, flags);
            bindChildren(node);
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
                return ("I:" + (+computedName.operand.text));
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
export function getMemberKeyFromElement(element: NamedDeclaration): MemberKey | undefined {
    if (isConstructorDeclaration(element) || isConstructSignatureDeclaration(element)) {
        return "@constructor" as MemberKey;
    }
    const name = element.name;
    if (!name || isElementAccessExpression(name) || isObjectBindingPattern(name) || isArrayBindingPattern(name) || isJsxNamespacedName(name) || isPropertyAccessExpression(name)) return undefined;
    return getMemberKey(name) as MemberKey;
}
