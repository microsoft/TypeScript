import {
    forEachChild,
    getImpliedNodeFormatForFile,
    getModuleInstanceState,
    isBlock,
    isClassDeclaration,
    isConditionalTypeNode,
    isConstructorDeclaration,
    isConstructSignatureDeclaration,
    isEnumDeclaration,
    isExportAssignment,
    isExportDeclaration,
    isFunctionDeclaration,
    isIdentifier,
    isImportDeclaration,
    isImportEqualsDeclaration,
    isInferTypeNode,
    isInterfaceDeclaration,
    isMappedTypeNode,
    isModuleBlock,
    isModuleDeclaration,
    isNamedExports,
    isSourceFile,
    isTypeAliasDeclaration,
    isVariableDeclaration,
    isVariableStatement,
    ModuleInstanceState,
    Symbol,
    toPath,
} from "../../_namespaces/ts";
import {
    getNodeId,
} from "../../checker";
import {
    Debug,
} from "../../debug";
import {
    __String,
    ArrayBindingElement,
    BindingPattern,
    ClassDeclaration,
    ClassElement,
    CompilerOptions,
    Declaration,
    EnumDeclaration,
    EnumMember,
    FunctionDeclaration,
    InterfaceDeclaration,
    ModifierFlags,
    ModuleDeclaration,
    Node,
    NodeArray,
    ParameterDeclaration,
    SourceFile,
    SymbolFlags,
    SyntaxKind,
    TypeElement,
    TypeParameterDeclaration,
    VariableDeclaration,
} from "../../types";
import {
    getSetExternalModuleIndicator,
    hasSyntacticModifier,
    hostGetCanonicalFileName,
    isEnumConst,
} from "../../utilities";
import {
    findAncestor,
    isBindingPattern,
} from "../../utilitiesPublic";
import {
    IsolatedEmitHost,
    MemberKey,
} from "./types";
import {
    getMemberKey,
} from "./utils";

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
    isVisible?: boolean;
    members?: EmitDeclarationSymbolTable;
    exports?: EmitDeclarationSymbolTable;
}

type SymbolRegistrationFlags = readonly [flags: SymbolFlags, forbiddenFlags: SymbolFlags];
const syntaxKindToSymbolMap = {
    [SyntaxKind.TypeParameter]: [SymbolFlags.TypeParameter, SymbolFlags.TypeParameterExcludes],
    [SyntaxKind.Parameter]: [SymbolFlags.FunctionScopedVariable, SymbolFlags.ParameterExcludes],
    [SyntaxKind.VariableDeclaration]: [SymbolFlags.BlockScopedVariable, SymbolFlags.BlockScopedVariableExcludes],
    [SyntaxKind.BindingElement]: [SymbolFlags.BlockScopedVariable, SymbolFlags.BlockScopedVariableExcludes],
    [SyntaxKind.PropertyDeclaration]: [SymbolFlags.Property, SymbolFlags.PropertyExcludes],
    [SyntaxKind.PropertySignature]: [SymbolFlags.Property, SymbolFlags.PropertyExcludes],
    [SyntaxKind.PropertyAssignment]: [SymbolFlags.Property, SymbolFlags.PropertyExcludes],
    [SyntaxKind.ShorthandPropertyAssignment]: [SymbolFlags.Property, SymbolFlags.PropertyExcludes],
    [SyntaxKind.EnumMember]: [SymbolFlags.EnumMember, SymbolFlags.EnumMemberExcludes],
    [SyntaxKind.CallSignature]: [SymbolFlags.Signature, SymbolFlags.None],
    [SyntaxKind.ConstructSignature]: [SymbolFlags.Signature, SymbolFlags.None],
    [SyntaxKind.IndexSignature]: [SymbolFlags.Signature, SymbolFlags.None],
    [SyntaxKind.MethodDeclaration]: [SymbolFlags.Method, SymbolFlags.MethodExcludes],
    [SyntaxKind.MethodSignature]: [SymbolFlags.Method, SymbolFlags.MethodExcludes],
    [SyntaxKind.FunctionDeclaration]: [SymbolFlags.Function, SymbolFlags.FunctionExcludes],
    [SyntaxKind.Constructor]: [SymbolFlags.Constructor, SymbolFlags.None],
    [SyntaxKind.GetAccessor]: [SymbolFlags.GetAccessor, SymbolFlags.GetAccessorExcludes],
    [SyntaxKind.SetAccessor]: [SymbolFlags.SetAccessor, SymbolFlags.SetAccessorExcludes],
    [SyntaxKind.ClassExpression]: [SymbolFlags.Class, SymbolFlags.ClassExcludes],
    [SyntaxKind.ClassDeclaration]: [SymbolFlags.Class, SymbolFlags.ClassExcludes],
    [SyntaxKind.InterfaceDeclaration]: [SymbolFlags.Interface, SymbolFlags.InterfaceExcludes],
    [SyntaxKind.TypeAliasDeclaration]: [SymbolFlags.TypeAlias, SymbolFlags.TypeAliasExcludes],
    [SyntaxKind.EnumDeclaration]: {
        const: [SymbolFlags.ConstEnum, SymbolFlags.ConstEnumExcludes],
        regular: [SymbolFlags.RegularEnum, SymbolFlags.RegularEnumExcludes],
    },
    [SyntaxKind.ModuleDeclaration]: {
        value: [SymbolFlags.ValueModule, SymbolFlags.ValueModuleExcludes],
        namespace: [SymbolFlags.NamespaceModule, SymbolFlags.NamespaceModuleExcludes],
    },
    [SyntaxKind.ImportEqualsDeclaration]: [SymbolFlags.Alias, SymbolFlags.AliasExcludes],
    [SyntaxKind.NamespaceImport]: [SymbolFlags.Alias, SymbolFlags.AliasExcludes],
    [SyntaxKind.ImportSpecifier]: [SymbolFlags.Alias, SymbolFlags.AliasExcludes],
    [SyntaxKind.ExportSpecifier]: [SymbolFlags.Alias | SymbolFlags.ExportValue, SymbolFlags.AliasExcludes],
    [SyntaxKind.NamespaceExportDeclaration]: [SymbolFlags.Alias, SymbolFlags.AliasExcludes],
    [SyntaxKind.ImportClause]: [SymbolFlags.Alias, SymbolFlags.AliasExcludes],
} as const satisfies Partial<Record<SyntaxKind, SymbolRegistrationFlags | Record<string, SymbolRegistrationFlags>>>;

/** @internal */
export function bindSourceFileForDeclarationEmit(file: SourceFile, host: IsolatedEmitHost) {
    const options: CompilerOptions = host.getCompilerOptions();
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
    const setExternalModuleIndicator = getSetExternalModuleIndicator(options);
    setExternalModuleIndicator(file);
    file.impliedNodeFormat = getImpliedNodeFormatForFile(
        toPath(file.fileName, host.getCurrentDirectory(), hostGetCanonicalFileName(host)),
        // toPath(file.resolvedPath, /*basePath*/ undefined, hostGetCanonicalFileName(host)),
        /*packageJsonInfoCache*/ undefined,
        host,
        options,
    );

    bind();

    return {
        tryGetNodeLinks,
        getNodeLinks,
        resolveName,
        resolveMemberKey,
        getMemberNameFromElement,
    };

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
        let currentScope: Node = undefined!;
        let currentSymbol: EmitDeclarationSymbol = undefined!;
        let currentLocalSymbolTable: EmitDeclarationSymbolTable = undefined!;
        let currentExportsSymbolTable: EmitDeclarationSymbolTable | undefined;
        const postBindingAction: (() => void)[] = [];

        const fileLinks = getNodeLinks(file).symbol = newSymbol();
        fileLinks.exports = new Map();
        withScope(file, fileLinks.exports, () => bindEachFunctionsFirst(file.statements));
        postBindingAction.forEach(fn => fn());

        function newSymbol(): EmitDeclarationSymbol {
            return {
                declarations: [],
                flags: 0,
            };
        }
        function getSymbol(table: EmitDeclarationSymbolTable, name: MemberKey) {
            let symbol = table.get(name);
            if (!symbol) {
                symbol = newSymbol();
                symbol.name = name;
                table.set(name, symbol);
            }
            return symbol;
        }
        function addLocalAndExportDeclaration(name: MemberKey | undefined, node: Declaration, [flags, forbiddenFlags]: SymbolRegistrationFlags, isExport: boolean) {
            if (isExport) {
                const exportKind = flags & SymbolFlags.Value ? SymbolFlags.ExportValue : 0;
                const localSymbol = addLocalOnlyDeclaration(name, node, [exportKind, forbiddenFlags]);
                const exportSymbol = addExportOnlyDeclaration(name, node, [flags, forbiddenFlags]);
                localSymbol.exportSymbol = exportSymbol;
                return exportSymbol;
            }
            else {
                return addLocalOnlyDeclaration(name, node, [flags, forbiddenFlags]);
            }
        }
        function addExportOnlyDeclaration(name: MemberKey | undefined, node: Declaration, flagsAndForbiddenFlags: SymbolRegistrationFlags) {
            if (!currentExportsSymbolTable) {
                throw new Error("Exporting symbol from a context that does not support it");
            }
            return addDeclaration(currentExportsSymbolTable, name, node, flagsAndForbiddenFlags);
        }
        function addLocalOnlyDeclaration(name: MemberKey | undefined, node: Declaration, flagsAndForbiddenFlags: SymbolRegistrationFlags) {
            return addDeclaration(currentLocalSymbolTable, name, node, flagsAndForbiddenFlags);
        }

        function addDeclaration(table: EmitDeclarationSymbolTable, name: MemberKey | undefined, node: Declaration, [flags, forbiddenFlags]: SymbolRegistrationFlags) {
            let symbol = name !== undefined ? getSymbol(table, name) : newSymbol();
            // Symbols don't merge, create new one
            if (forbiddenFlags & symbol.flags) {
                symbol = newSymbol();
            }
            symbol.declarations.push(node);
            symbol.flags |= flags;
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
        function withMembers(symbol: EmitDeclarationSymbol, fn: () => void, table: "members" | "exports" = "members") {
            const old = [currentLocalSymbolTable, currentSymbol] as const;
            currentSymbol = symbol;
            currentLocalSymbolTable = symbol[table] ??= new Map();
            fn();
            [currentLocalSymbolTable, currentSymbol] = old;
        }

        function getStatementName(s: InterfaceDeclaration | ClassDeclaration | FunctionDeclaration) {
            if (hasSyntacticModifier(s, ModifierFlags.Export) && hasSyntacticModifier(s, ModifierFlags.Default)) {
                return "@default" as MemberKey;
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
            const isExported = isVariableDeclaration(d) && hasSyntacticModifier(d.parent.parent, ModifierFlags.Export);
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
        }
        function bindEachFunctionsFirst(nodes: NodeArray<Node> | undefined): void {
            if (!nodes) return;
            bindContainer(nodes.filter(n => n.kind === SyntaxKind.FunctionDeclaration));
            bindContainer(nodes.filter(n => n.kind !== SyntaxKind.FunctionDeclaration));
        }

        function bindContainer(statements: NodeArray<Node> | Node[]) {
            statements.forEach(statement => {
                const isExported = hasSyntacticModifier(statement, ModifierFlags.Export);
                if (isImportEqualsDeclaration(statement)) {
                    addLocalOnlyDeclaration(getMemberKey(statement.name), statement, getSymbolFlagsForNode(statement));
                }
                if (isImportDeclaration(statement)) {
                    if (!statement.importClause) {
                        return;
                    }
                    if (statement.importClause.name) {
                        addLocalOnlyDeclaration(getMemberKey(statement.importClause.name), statement.importClause, getSymbolFlagsForNode(statement.importClause));
                    }
                    if (statement.importClause.namedBindings) {
                        const namedBindings = statement.importClause.namedBindings;
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
                if (isVariableStatement(statement)) {
                    statement.declarationList.declarations.forEach(bindVariable);
                }
                if (isFunctionDeclaration(statement)) {
                    bindTypeParameters(statement.typeParameters);
                    bindTypeExpressions(statement.type);
                    withScope(statement, /*exports*/ undefined, () => {
                        bindTypeExpressions(statement);
                        statement.parameters.forEach(bindVariable);
                    });

                    addLocalAndExportDeclaration(getStatementName(statement), statement, getSymbolFlagsForNode(statement), isExported);
                }
                if (isTypeAliasDeclaration(statement)) {
                    addLocalAndExportDeclaration(getMemberKey(statement.name), statement, getSymbolFlagsForNode(statement), isExported);
                    withScope(statement, /*exports*/ undefined, () => {
                        bindTypeParameters(statement.typeParameters);
                    });
                    bindTypeExpressions(statement.type);
                }
                // Default export declarations set isVisible on true on associated symbols in the type checker.
                if (isExportAssignment(statement)) {
                    if (statement.expression && isIdentifier(statement.expression)) {
                        const name = statement.expression.escapedText;
                        postBindingAction.push(() => {
                            const resolvedSymbol = resolveName(statement.expression, name, SymbolFlags.Value | SymbolFlags.Type | SymbolFlags.Namespace | SymbolFlags.Alias);
                            if (resolvedSymbol) {
                                resolvedSymbol.isVisible = true;
                                resolvedSymbol.declarations.forEach(d => getNodeLinks(d).isVisible = true);
                            }
                        });
                    }
                }
                if (isExportDeclaration(statement)) {
                    if (statement.exportClause && isNamedExports(statement.exportClause)) {
                        const elements = statement.exportClause.elements;
                        if (statement.moduleSpecifier) {
                            // TODO is currentExportsSymbolTable ok here?
                            withScope(statement, /*exports*/ undefined, () => {
                                elements.forEach(e => {
                                    const [flags, forbiddenFlags] = getSymbolFlagsForNode(e);
                                    addLocalOnlyDeclaration(getMemberKey(e.propertyName ?? e.name), e, [flags | SymbolFlags.ExportValue, forbiddenFlags]);
                                });
                            });
                        }
                        elements.forEach(e => {
                            postBindingAction.push(() => {
                                const resolvedSymbol = resolveName(e, (e.propertyName ?? e.name).escapedText, ~0);
                                if (resolvedSymbol) {
                                    resolvedSymbol.isVisible = true;
                                    resolvedSymbol.declarations.forEach(d => getNodeLinks(d).isVisible = true);
                                }
                            });
                        });
                    }
                }
                if (isEnumDeclaration(statement)) {
                    addLocalAndExportDeclaration(getMemberKey(statement.name), statement, getSymbolFlagsForNode(statement), isExported);
                    withScope(statement, /*exports*/ undefined, () => {
                        statement.members.forEach(m => {
                            addLocalOnlyDeclaration(getMemberNameFromElement(m), m, getSymbolFlagsForNode(m));
                        });
                    });
                }
                if (isModuleDeclaration(statement)) {
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
                    bindModuleDeclaration(statement);
                }
                if (isInterfaceDeclaration(statement)) {
                    const interfaceDeclaration = statement;
                    const interfaceSymbol = addLocalAndExportDeclaration(getMemberKey(interfaceDeclaration.name), interfaceDeclaration, getSymbolFlagsForNode(interfaceDeclaration), isExported);
                    withScope(interfaceDeclaration, /*exports*/ undefined, () => {
                        bindTypeParameters(interfaceDeclaration.typeParameters);
                    });
                    withMembers(interfaceSymbol, () => {
                        interfaceDeclaration.members.forEach(m => {
                            addLocalOnlyDeclaration(getMemberNameFromElement(m), m, getElementFlagsOrThrow(m));
                            bindTypeExpressions(m);
                        });
                    });
                }

                if (isClassDeclaration(statement)) {
                    const classDeclaration = statement;
                    const classSymbol = addLocalAndExportDeclaration(getMemberKey(classDeclaration.name), classDeclaration, getSymbolFlagsForNode(classDeclaration), isExported);
                    withScope(classDeclaration, /*exports*/ undefined, () => {
                        bindTypeParameters(classDeclaration.typeParameters);
                    });
                    withMembers(classSymbol, () => {
                        classDeclaration.members.forEach(m => {
                            if (hasSyntacticModifier(m, ModifierFlags.Static)) return;
                            if (m.kind === SyntaxKind.SemicolonClassElement || m.kind === SyntaxKind.ClassStaticBlockDeclaration) return;

                            addLocalOnlyDeclaration(getMemberNameFromElement(m), m, getElementFlagsOrThrow(m));
                            bindTypeExpressions(m);
                        });
                    });
                    withMembers(classSymbol, () => {
                        classDeclaration.members.forEach(m => {
                            if (!hasSyntacticModifier(m, ModifierFlags.Static)) return;
                            if (
                                m.kind === SyntaxKind.SemicolonClassElement
                                || m.kind === SyntaxKind.ClassStaticBlockDeclaration
                            ) return;

                            addLocalOnlyDeclaration(getMemberNameFromElement(m), m, getElementFlagsOrThrow(m));
                            bindTypeExpressions(m);
                        });
                    }, "exports");
                }
            });
        }
    }
}

/**
 * Gets the symbolic name for a member from its type.
 * @internal
 */
export function getMemberNameFromElement(element: TypeElement | ClassElement | EnumMember): MemberKey | undefined {
    if (isConstructorDeclaration(element) || isConstructSignatureDeclaration(element)) {
        return "@constructor" as MemberKey;
    }
    const name = element.name;
    if (!name) return undefined;
    return getMemberKey(name) as MemberKey;
}
