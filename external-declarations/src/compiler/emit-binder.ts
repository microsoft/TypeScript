import { __String, ArrayBindingElement, BindingPattern, ClassDeclaration, ClassElement, CompilerOptions, EnumDeclaration, ExportDeclaration, ExportSpecifier, Extension, findAncestor, forEachChild, FunctionDeclaration, Identifier, InterfaceDeclaration, isBlock, isClassDeclaration, isComputedPropertyName, isConditionalTypeNode, isConstructorDeclaration, isConstructSignatureDeclaration, isEnumDeclaration, isExportAssignment, isExportDeclaration, isExternalModuleReference, isFunctionDeclaration, isIdentifier, isImportDeclaration, isImportEqualsDeclaration, isInferTypeNode, isInterfaceDeclaration, isJsxFragment, isJsxOpeningLikeElement, isLiteralExpression, isMappedTypeNode, isMetaProperty, isModuleBlock, isModuleDeclaration, isNamedExports, isPrivateIdentifier, isPropertyAccessExpression, isSourceFile, isTypeAliasDeclaration, isVariableDeclaration,isVariableStatement, JsxEmit, ModifierFlags, ModuleDeclaration, ModuleDetectionKind, ModuleKind, ModuleResolutionKind, Node, NodeArray, ParameterDeclaration, ResolutionMode, SourceFile, Symbol, SymbolFlags, SyntaxKind, TypeElement, TypeParameterDeclaration, VariableDeclaration } from "typescript";

import { Debug } from "./debug";
import { forEach } from "./lang-utils";
import { getEmitModuleKind, getEmitModuleResolutionKind, getNodeId, hasSyntacticModifier, isBindingPattern, isEnumConst, nodeHasName } from "./utils";


interface NodeLinks {
    isVisible?: boolean;
    symbol?: BasicSymbol;
    localSymbol?: BasicSymbol;
    locals?: SymbolTable;
}

type SymbolTable = Map<__String, BasicSymbol>;
export interface BasicSymbol {
    name?: __String
    exportSymbol?: BasicSymbol;
    declarations: Node[];
    signatureDeclarations?: Node[];
    flags: SymbolFlags;
    isVisible?: boolean;
    members?: SymbolTable;
    exports?: SymbolTable;
}

function assertNever(o: never): never {
    throw new Error("Should never happen");
}

type InternalNode = Node;
type InternalNodeArray<T extends Node>  = NodeArray<T>;
type InternalSourceFile = SourceFile;
declare module "typescript" {
    interface SourceFile {
        externalModuleIndicator?: InternalNode | true;
    }
    export function forEachChildRecursively<T>(rootNode: InternalNode, cbNode: (node: InternalNode, parent: InternalNode) => T | "skip" | undefined, cbNodes?: (nodes: InternalNodeArray<InternalNode>, parent: InternalNode) => T | "skip" | undefined): T | undefined;
    export function getTokenPosOfNode(node: InternalNode, sourceFile?: InternalSourceFile, includeJsDoc?: boolean): number;
}
function getEmitModuleDetectionKind(options: CompilerOptions) {
    return options.moduleDetection ||
        (getEmitModuleKind(options) === ModuleKind.Node16 || getEmitModuleKind(options) === ModuleKind.NodeNext ? ModuleDetectionKind.Force : ModuleDetectionKind.Auto);
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

export function bindSourceFile(file: SourceFile, options: CompilerOptions, packageModuleType: ResolutionMode) {
    const nodeLinks: NodeLinks[] = [];
    function tryGetNodeLinks(node: Node): NodeLinks | undefined {
        const id = (node as any).id;
        if(!id) return undefined;
        return nodeLinks[id];
    }
    function getNodeLinks(node: Node): NodeLinks {
        const nodeId = getNodeId(node);
        return nodeLinks[nodeId] || (nodeLinks[nodeId] = {});
    }

    const [isFileAModule, isNodeAModuleIndicator] = getSetExternalModuleIndicator(options);
    file.externalModuleIndicator =
        isFileAModule(file) || isExternalModuleWorker(file, isNodeAModuleIndicator);
    file.impliedNodeFormat = getImpliedNodeFormat(file.fileName, options, packageModuleType);

    bind();

    return {
        tryGetNodeLinks,
        getNodeLinks,
        resolveName,
    };


    function resolveName(enclosingDeclaration: Node, escapedText: __String, meaning: SymbolFlags) {
        function getSymbolFromScope(table: SymbolTable | undefined) {
            const symbol = table?.get(escapedText);
            if(symbol && ((symbol.flags & meaning) || (symbol.flags & SymbolFlags.Alias))) {
                return symbol;
            }
        }

        let currentScope = enclosingDeclaration;
        while(currentScope) {
            const links = tryGetNodeLinks(currentScope);
            let symbol = getSymbolFromScope(links?.locals);
            if(!symbol && (isModuleDeclaration(currentScope) || isSourceFile(currentScope))) {
                symbol = getSymbolFromScope(links?.symbol?.exports);
            }
            if(symbol) return symbol;
            currentScope = currentScope.parent;
        }
        return undefined;
    }

    function getSymbolFlagsForNode(node: Node & { kind: keyof typeof syntaxKindToSymbolMap }) {
        if(node.kind === SyntaxKind.EnumDeclaration) {
            return isEnumConst(node as EnumDeclaration) ?
                syntaxKindToSymbolMap[node.kind].const:
                syntaxKindToSymbolMap[node.kind].regular;
        }
        if(node.kind === SyntaxKind.ModuleDeclaration) {
            return getModuleInstanceState(node as ModuleDeclaration) === ModuleInstanceState.Instantiated ?
                syntaxKindToSymbolMap[node.kind].value:
                syntaxKindToSymbolMap[node.kind].namespace;
        }
        return syntaxKindToSymbolMap[node.kind];
    }
    function getElementFlagsOrThrow(node: Node) {
        const result = getSymbolFlagsForNode(node as Node & { kind: keyof typeof syntaxKindToSymbolMap });
        if(!result) {
            throw new Error("Unknown binding element type");
        }
        return result;
    }

    function bind() {
        let currentScope: Node = undefined!;
        let currentSymbol: BasicSymbol = undefined!;
        let currentLocalSymbolTable: SymbolTable = undefined!;
        let currentExportsSymbolTable: SymbolTable | undefined;
        const postBindingAction: (() => void)[] = [];

        const fileLinks = getNodeLinks(file).symbol = newSymbol();
        fileLinks.exports = new Map();
        withScope(file, fileLinks.exports, ()=> bindEachFunctionsFirst(file.statements));
        postBindingAction.forEach(fn => fn());

        function newSymbol(): BasicSymbol {
            return {
                declarations: [],
                flags: 0,
            };
        }
        function getSymbol(table: SymbolTable, name: __String) {
            let symbol = table.get(name);
            if(!symbol) {
                symbol = newSymbol();
                symbol.name = name;
                table.set(name, symbol);
            }
            return symbol;
        }
        function addLocalAndExportDeclaration(name: __String | undefined, node: Node, [flags, forbiddenFlags]: SymbolRegistrationFlags, isExport: boolean) {
            if(isExport) {
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
        function addExportOnlyDeclaration(name: __String | undefined, node: Node, flagsAndForbiddenFlags: SymbolRegistrationFlags) {
            if(!currentExportsSymbolTable) {
                throw new Error("Exporting symbol from a context that does not support it");
            }
            return addDeclaration(currentExportsSymbolTable, name, node, flagsAndForbiddenFlags);
        }
        function addLocalOnlyDeclaration(name: __String | undefined, node: Node, flagsAndForbiddenFlags: SymbolRegistrationFlags) {
            return addDeclaration(currentLocalSymbolTable, name, node, flagsAndForbiddenFlags);
        }

        function addDeclaration(table: SymbolTable, name: __String | undefined, node: Node, [flags, forbiddenFlags]: SymbolRegistrationFlags) {
            let symbol = name !== undefined ? getSymbol(table, name) : newSymbol();
            // Symbols don't merge, create new one
            if(forbiddenFlags & symbol.flags) {
                symbol = newSymbol();
            }
            symbol.declarations.push(node);
            symbol.flags |= flags;
            getNodeLinks(node).symbol = symbol;
            node.symbol = symbol as unknown as Symbol;
            return symbol;
        }
        function withScope(scope: Node, exports: SymbolTable | undefined, fn: () => void) {
            const old = [currentScope, currentLocalSymbolTable, currentExportsSymbolTable] as const;
            currentScope = scope;
            const links = getNodeLinks(scope);
            currentLocalSymbolTable = (links.locals ??= new Map());
            currentExportsSymbolTable = exports;
            fn();
            [currentScope, currentLocalSymbolTable, currentExportsSymbolTable] = old;
        }
        function withMembers(symbol: BasicSymbol, fn: () => void, table: "members" | "exports" = "members") {
            const old = [currentLocalSymbolTable, currentSymbol] as const;
            currentSymbol = symbol;
            currentLocalSymbolTable = (symbol[table] ??= new Map());
            fn();
            [currentLocalSymbolTable, currentSymbol] = old;
        }

        /**
         * Gets the symbolic name for a member from its type.
         */
        function getMemberName(element: TypeElement | ClassElement): __String | undefined{
            if (isConstructorDeclaration(element) || isConstructSignatureDeclaration(element)) {
                return "@constructor" as __String;
            }
            const name = element.name;
            if(!name) return undefined;
            if(isIdentifier(name)) {
                return name.escapedText;
            }
            else if(isLiteralExpression(name)) {
                return `${name.text}` as __String;
            }
            else if(isComputedPropertyName(name)) {
                let expr = name.expression;

                if(isLiteralExpression(expr)) {
                    return `${expr.text}` as __String;
                }

                let fullName = "";
                while(isPropertyAccessExpression(expr)) {
                    fullName = "." + expr.name.escapedText + name;
                    expr = expr.expression;
                }
                if(!isIdentifier(expr)) {
                    return undefined;
                }
                return `[${expr.escapedText}${fullName}]` as __String;
            }
            else if(isPrivateIdentifier(name)) {
                return name.escapedText;
            }
            else {
                assertNever(name);
            }
        }

        function getStatementName(s: InterfaceDeclaration | ClassDeclaration | FunctionDeclaration) {
            if(hasSyntacticModifier(s, ModifierFlags.Export) && hasSyntacticModifier(s, ModifierFlags.Default)) {
                return "@default" as __String;
            }
            if(s.name) {
                return s.name.escapedText;
            }
        }
        // We need to bind locals for types (conditional and mapped typed define parameters in their definitions)
        function bindTypeExpressions(node?: Node) {
            function bindChildren(node: Node) {
                forEachChild(node, bindWorker, arr => arr.forEach(bindWorker));
            }
            function bindWorker(node?: Node) {
                if(!node) return;
                if(isMappedTypeNode(node)) {
                    const mappedType = node;
                    withScope(node, /*exports*/ undefined, () => {
                        bindTypeParameters([mappedType.typeParameter]);
                        bindWorker(mappedType.nameType);
                        bindWorker(mappedType.type);
                    });
                }
                else if(isConditionalTypeNode(node)) {
                    withScope(node.checkType, /*exports*/ undefined, () => {
                        bindWorker(node.extendsType);
                    });
                    getNodeLinks(node.trueType).locals = getNodeLinks(node.checkType).locals;
                }
                else if(isInferTypeNode(node)) {
                    const conditionalTypeOwner = findAncestor(node, isConditionalTypeNode);
                    // Probably an error, infer not in a conditional type context
                    // Try to bind the rest of it
                    if(conditionalTypeOwner) {
                        withScope(conditionalTypeOwner, /*exports*/ undefined, () => {
                            bindTypeParameters([node.typeParameter]);
                        });
                    }
                    bindChildren(node);
                }
                else if(isBlock(node)) {
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
            typeParameters?.forEach(t => addLocalOnlyDeclaration(t.name.escapedText, t, getSymbolFlagsForNode(t)));
        }
        function bindVariable(d: VariableDeclaration | ParameterDeclaration) {
            bindTypeExpressions(d.type);
            const isExported = isVariableDeclaration(d) && hasSyntacticModifier(d.parent.parent, ModifierFlags.Export);
            if(isIdentifier(d.name)) {
                addLocalAndExportDeclaration(d.name.escapedText, d, getSymbolFlagsForNode(d), isExported);
            }
            else if(isBindingPattern(d.name)) {
                function bindBindingPattern(pattern: BindingPattern) {
                    // type BindingPattern = ObjectBindingPattern | ArrayBindingPattern;
                    (pattern.elements as NodeArray<ArrayBindingElement>).forEach(b => {
                        if(b.kind === SyntaxKind.OmittedExpression) return;
                        if(!b.name) return;

                        if(isIdentifier(b.name)) {
                            addLocalAndExportDeclaration(b.name.escapedText, b, getSymbolFlagsForNode(b), isExported);
                        }
                        else {
                            bindBindingPattern(b.name);
                        }
                    });
                }
                bindBindingPattern(d.name);
            }
            else {
                assertNever(d.name);
            }
        }
        function bindEachFunctionsFirst(nodes: NodeArray<Node> | undefined): void {
            if(!nodes) return;
            bindContainer(nodes.filter(n => n.kind === SyntaxKind.FunctionDeclaration));
            bindContainer(nodes.filter(n => n.kind !== SyntaxKind.FunctionDeclaration));
        }

        function bindContainer(statements: NodeArray<Node> | Node[]) {
            statements.forEach(statement => {
                const isExported = hasSyntacticModifier(statement, ModifierFlags.Export);
                if(isImportEqualsDeclaration(statement)) {
                    addLocalOnlyDeclaration(statement.name.escapedText, statement, getSymbolFlagsForNode(statement));
                }
                if(isImportDeclaration(statement)) {
                    if(!statement.importClause) {
                        return;
                    }
                    if(statement.importClause.name) {
                        addLocalOnlyDeclaration(statement.importClause.name.escapedText, statement.importClause, getSymbolFlagsForNode(statement.importClause));
                    }
                    if(statement.importClause.namedBindings) {
                        const namedBindings = statement.importClause.namedBindings;
                        if(namedBindings.kind === SyntaxKind.NamedImports) {
                            namedBindings.elements.forEach(v => {
                                addLocalOnlyDeclaration(v.name.escapedText, v, getSymbolFlagsForNode(v));
                            });
                        }
                        else if(namedBindings.kind === SyntaxKind.NamespaceImport) {
                            addLocalOnlyDeclaration(namedBindings.name.escapedText, namedBindings, getSymbolFlagsForNode(namedBindings));
                        }
                        else {
                            debugger;
                            throw new Error("Not supported");
                        }
                    }
                }
                if(isVariableStatement(statement)) {
                    statement.declarationList.declarations.forEach(bindVariable);
                }
                if(isFunctionDeclaration(statement)) {
                    bindTypeParameters(statement.typeParameters);
                    bindTypeExpressions(statement.type);
                    withScope(statement, /*exports*/ undefined, () => {
                        bindTypeExpressions(statement);
                        statement.parameters.forEach(bindVariable);
                    });

                    addLocalAndExportDeclaration(getStatementName(statement), statement, getSymbolFlagsForNode(statement), isExported);
                }
                if(isTypeAliasDeclaration(statement)) {
                    addLocalAndExportDeclaration(statement.name.escapedText, statement, getSymbolFlagsForNode(statement), isExported);
                    withScope(statement, /*exports*/ undefined, () => {
                        bindTypeParameters(statement.typeParameters);
                    });
                    bindTypeExpressions(statement.type);
                }
                // Default export declarations set isVisible on true on associated symbols in the type checker.
                if(isExportAssignment(statement)) {
                    if(statement.expression && isIdentifier(statement.expression)) {
                        const name = statement.expression.escapedText;
                        postBindingAction.push(() => {
                            const resolvedSymbol = resolveName(statement.expression, name, SymbolFlags.Value | SymbolFlags.Type | SymbolFlags.Namespace | SymbolFlags.Alias);
                            if(resolvedSymbol) {
                                resolvedSymbol.isVisible = true;
                                resolvedSymbol.declarations.forEach(d => getNodeLinks(d).isVisible = true);
                            }
                        });
                    }
                }
                if(isExportDeclaration(statement)) {
                    if(statement.exportClause && isNamedExports(statement.exportClause)) {
                        const elements = statement.exportClause.elements;
                        if (statement.moduleSpecifier) {
                            // TODO is currentExportsSymbolTable ok here?
                            withScope(statement, /*exports*/ undefined, () => {
                                elements.forEach(e => {
                                    const [flags, forbiddenFlags] = getSymbolFlagsForNode(e);
                                    addLocalOnlyDeclaration((e.propertyName ?? e.name).escapedText, e, [flags | SymbolFlags.ExportValue , forbiddenFlags]);
                                });
                            });
                        }
                        elements.forEach(e => {
                            postBindingAction.push(() => {
                                const resolvedSymbol = resolveName(e,(e.propertyName ?? e.name).escapedText, ~0);
                                if(resolvedSymbol) {
                                    resolvedSymbol.isVisible = true;
                                    resolvedSymbol.declarations.forEach(d => getNodeLinks(d).isVisible = true);
                                }
                            });
                        });
                    }
                }
                // if(isEnumMember(statement)) {
                //     addDeclaration(getNameOfDeclaration(statement.name), statement, getElementFlags(statement.kind));
                // }
                if(isEnumDeclaration(statement)) {
                    addLocalAndExportDeclaration(statement.name.escapedText, statement, getSymbolFlagsForNode(statement), isExported);
                    // withScope(statement, () => bindContainer(statement.members))
                }
                if(isModuleDeclaration(statement)) {
                    function bindModuleDeclaration(moduleDeclaration: ModuleDeclaration) {
                        const name = isIdentifier(moduleDeclaration.name) ? moduleDeclaration.name.escapedText: undefined;
                        const moduleSymbol = addLocalAndExportDeclaration(name, moduleDeclaration, getSymbolFlagsForNode(moduleDeclaration), isExported);
                        moduleSymbol.exports ??= new Map();
                        withScope(moduleDeclaration, moduleSymbol.exports, () => {
                            if(moduleDeclaration.body) {
                                if(isModuleBlock(moduleDeclaration.body)) {
                                    const moduleBlock = moduleDeclaration.body;
                                    bindEachFunctionsFirst(moduleBlock.statements);
                                }
                                else if(isModuleDeclaration(moduleDeclaration.body)) {
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
                if(isInterfaceDeclaration(statement)) {
                    const interfaceDeclaration = statement;
                    const interfaceSymbol = addLocalAndExportDeclaration(interfaceDeclaration.name.escapedText, interfaceDeclaration, getSymbolFlagsForNode(interfaceDeclaration), isExported);
                    withScope(interfaceDeclaration, /*exports*/ undefined, () =>{
                        bindTypeParameters(interfaceDeclaration.typeParameters);
                    });
                    withMembers(interfaceSymbol, () => {
                        interfaceDeclaration.members.forEach(m => {
                            addLocalOnlyDeclaration(getMemberName(m), m, getElementFlagsOrThrow(m));
                            bindTypeExpressions(m);
                        });
                    });
                }

                if(isClassDeclaration(statement)) {
                    const classDeclaration = statement;
                    const classSymbol = addLocalAndExportDeclaration(classDeclaration.name?.escapedText, classDeclaration, getSymbolFlagsForNode(classDeclaration), isExported);
                    withScope(classDeclaration, /*exports*/ undefined, () =>{
                        bindTypeParameters(classDeclaration.typeParameters);
                    });
                    withMembers(classSymbol, () => {
                        classDeclaration.members.forEach(m => {
                            if(hasSyntacticModifier(m, ModifierFlags.Static)) return;
                            if(m.kind === SyntaxKind.SemicolonClassElement || m.kind === SyntaxKind.ClassStaticBlockDeclaration) return;

                            addLocalOnlyDeclaration(getMemberName(m), m, getElementFlagsOrThrow(m));
                            bindTypeExpressions(m);
                        });
                    });
                    withMembers(classSymbol, () => {
                        classDeclaration.members.forEach(m => {
                            if(!hasSyntacticModifier(m, ModifierFlags.Static)) return;
                            if(m.kind === SyntaxKind.SemicolonClassElement
                                || m.kind === SyntaxKind.ClassStaticBlockDeclaration) return;

                            addLocalOnlyDeclaration(getMemberName(m), m, getElementFlagsOrThrow(m));
                            bindTypeExpressions(m);
                        });
                    }, "exports");
                }
            });
        }
    }
}

function isExternalModuleWorker(file: SourceFile, isModuleIndicatorNode: (node: Node) => boolean): Node | undefined {
    return (
        forEach(file.statements, isAnExternalModuleIndicatorNode) || walkTreeForModuleIndicator(file, isModuleIndicatorNode)
        // TODO: isolatedDeclarations: find a away to detect commonJS modules
    );
}

function isAnExternalModuleIndicatorNode(node: Node) {
    return hasSyntacticModifier(node, ModifierFlags.Export)
        || isImportEqualsDeclaration(node) && isExternalModuleReference(node.moduleReference)
        || isImportDeclaration(node)
        || isExportAssignment(node)
        || isExportDeclaration(node) ? node : undefined;
}

function walkTreeForModuleIndicator(node: Node, isModuleIndicatorNode: (node: Node) => boolean) {
    function walkTreeForModuleIndicatorWorker(node: Node): Node | undefined {
        return isModuleIndicatorNode(node) ? node : forEachChild(node, walkTreeForModuleIndicatorWorker);
    }
    return walkTreeForModuleIndicatorWorker(node);
}
function isImportMeta(node: Node): boolean {
    return isMetaProperty(node) && node.keywordToken === SyntaxKind.ImportKeyword && node.name.escapedText === "meta";
}



/** @internal */
function getSetExternalModuleIndicator(options: CompilerOptions): [(node: SourceFile) => true | undefined, (node: Node) => boolean] {

    function isFileForcedToBeModuleByFormat(file: SourceFile): true | undefined {
        // Excludes declaration files - they still require an explicit `export {}` or the like
        // for back compat purposes. The only non-declaration files _not_ forced to be a module are `.js` files
        // that aren't esm-mode (meaning not in a `type: module` scope).
        return ([Extension.Cjs, Extension.Cts, Extension.Mjs, Extension.Mts].some(e => file.fileName.endsWith(e)) ? true : undefined);
    }

    // TODO: Should this callback be cached?
    switch (getEmitModuleDetectionKind(options)) {
        case ModuleDetectionKind.Force:
            // All non-declaration files are modules, declaration files still do the usual isFileProbablyExternalModule
            return [(file) => !file.isDeclarationFile || undefined, () => true];

        case ModuleDetectionKind.Legacy:
            // Files are modules if they have imports, exports, or import.meta
            return [isFileForcedToBeModuleByFormat, isImportMeta];

        case ModuleDetectionKind.Auto:

            return [
                isFileForcedToBeModuleByFormat,
                options.jsx === JsxEmit.ReactJSX || options.jsx === JsxEmit.ReactJSXDev?
                    n => isImportMeta(n) || isJsxOpeningLikeElement(n) || isJsxFragment(n):
                    isImportMeta
            ];
    }
}

function getImpliedNodeFormat(fileName: string, options: CompilerOptions, packageJsonFormat: ResolutionMode) {
    switch (getEmitModuleResolutionKind(options)) {
        case ModuleResolutionKind.Node16:
        case ModuleResolutionKind.NodeNext:
            return [Extension.Dmts, Extension.Mts, Extension.Mjs].some(e => fileName.endsWith(e)) ? ModuleKind.ESNext :
                [Extension.Dcts, Extension.Cts, Extension.Cjs].some(e => fileName.endsWith(e)) ? ModuleKind.CommonJS :
                [Extension.Dts, Extension.Ts, Extension.Tsx, Extension.Js, Extension.Jsx].some(e => fileName.endsWith(e)) ? packageJsonFormat :
                undefined; // other extensions, like `json` or `tsbuildinfo`, are set as `undefined` here but they should never be fed through the transformer pipeline
        default:
            return undefined;
    }
}

const enum ModuleInstanceState {
    NonInstantiated = 0,
    Instantiated = 1,
    ConstEnumOnly = 2
}

function getModuleInstanceState(node: ModuleDeclaration, visited?: Map<number, ModuleInstanceState | undefined>): ModuleInstanceState {
    return node.body ? getModuleInstanceStateCached(node.body, visited) : ModuleInstanceState.Instantiated;
}

function getModuleInstanceStateCached(node: Node, visited = new Map<number, ModuleInstanceState | undefined>()) {
    const nodeId = getNodeId(node);
    if (visited.has(nodeId)) {
        return visited.get(nodeId) || ModuleInstanceState.NonInstantiated;
    }
    visited.set(nodeId, undefined);
    const result = getModuleInstanceStateWorker(node, visited);
    visited.set(nodeId, result);
    return result;
}

function getModuleInstanceStateWorker(node: Node, visited: Map<number, ModuleInstanceState | undefined>): ModuleInstanceState {
    // A module is uninstantiated if it contains only
    switch (node.kind) {
        // 1. interface declarations, type alias declarations
        case SyntaxKind.InterfaceDeclaration:
        case SyntaxKind.TypeAliasDeclaration:
            return ModuleInstanceState.NonInstantiated;
        // 2. const enum declarations
        case SyntaxKind.EnumDeclaration:
            if (isEnumConst(node as EnumDeclaration)) {
                return ModuleInstanceState.ConstEnumOnly;
            }
            break;
        // 3. non-exported import declarations
        case SyntaxKind.ImportDeclaration:
        case SyntaxKind.ImportEqualsDeclaration:
            if (!(hasSyntacticModifier(node, ModifierFlags.Export))) {
                return ModuleInstanceState.NonInstantiated;
            }
            break;
        // 4. Export alias declarations pointing at only uninstantiated modules or things uninstantiated modules contain
        case SyntaxKind.ExportDeclaration:
            const exportDeclaration = node as ExportDeclaration;
            if (!exportDeclaration.moduleSpecifier && exportDeclaration.exportClause && exportDeclaration.exportClause.kind === SyntaxKind.NamedExports) {
                let state = ModuleInstanceState.NonInstantiated;
                for (const specifier of exportDeclaration.exportClause.elements) {
                    const specifierState = getModuleInstanceStateForAliasTarget(specifier, visited);
                    if (specifierState > state) {
                        state = specifierState;
                    }
                    if (state === ModuleInstanceState.Instantiated) {
                        return state;
                    }
                }
                return state;
            }
            break;
        // 5. other uninstantiated module declarations.
        case SyntaxKind.ModuleBlock: {
            let state = ModuleInstanceState.NonInstantiated;
            forEachChild(node, n => {
                const childState = getModuleInstanceStateCached(n, visited);
                switch (childState) {
                    case ModuleInstanceState.NonInstantiated:
                        // child is non-instantiated - continue searching
                        return;
                    case ModuleInstanceState.ConstEnumOnly:
                        // child is const enum only - record state and continue searching
                        state = ModuleInstanceState.ConstEnumOnly;
                        return;
                    case ModuleInstanceState.Instantiated:
                        // child is instantiated - record state and stop
                        state = ModuleInstanceState.Instantiated;
                        return true;
                    default:
                        Debug.assertNever(childState);
                }
            });
            return state;
        }
        case SyntaxKind.ModuleDeclaration:
            return getModuleInstanceState(node as ModuleDeclaration, visited);
        case SyntaxKind.Identifier:
            // Only jsdoc typedef definition can exist in jsdoc namespace, and it should
            // be considered the same as type alias
            if ((node as Identifier).isInJSDocNamespace) {
                return ModuleInstanceState.NonInstantiated;
            }
    }
    return ModuleInstanceState.Instantiated;
}

function getModuleInstanceStateForAliasTarget(specifier: ExportSpecifier, visited: Map<number, ModuleInstanceState | undefined>) {
    const name = specifier.propertyName || specifier.name;
    let p: Node | undefined = specifier.parent;
    while (p) {
        if (isBlock(p) || isModuleBlock(p) || isSourceFile(p)) {
            const statements = p.statements;
            let found: ModuleInstanceState | undefined;
            for (const statement of statements) {
                if (nodeHasName(statement, name)) {
                    const state = getModuleInstanceStateCached(statement, visited);
                    if (found === undefined || state > found) {
                        found = state;
                    }
                    if (found === ModuleInstanceState.Instantiated) {
                        return found;
                    }
                }
            }
            if (found !== undefined) {
                return found;
            }
        }
        p = p.parent;
    }
    return ModuleInstanceState.Instantiated; // Couldn't locate, assume could refer to a value
}

