import * as ts from "./_namespaces/ts";

/** @internal */
export const enum ModuleInstanceState {
    NonInstantiated = 0,
    Instantiated = 1,
    ConstEnumOnly = 2
}

interface ActiveLabel {
    next: ActiveLabel | undefined;
    name: ts.__String;
    breakTarget: ts.FlowLabel;
    continueTarget: ts.FlowLabel | undefined;
    referenced: boolean;
}

/** @internal */
export function getModuleInstanceState(node: ts.ModuleDeclaration, visited?: ts.ESMap<number, ModuleInstanceState | undefined>): ModuleInstanceState {
    if (node.body && !node.body.parent) {
        // getModuleInstanceStateForAliasTarget needs to walk up the parent chain, so parent pointers must be set on this tree already
        ts.setParent(node.body, node);
        ts.setParentRecursive(node.body, /*incremental*/ false);
    }
    return node.body ? getModuleInstanceStateCached(node.body, visited) : ModuleInstanceState.Instantiated;
}

function getModuleInstanceStateCached(node: ts.Node, visited = new ts.Map<number, ModuleInstanceState | undefined>()) {
    const nodeId = ts.getNodeId(node);
    if (visited.has(nodeId)) {
        return visited.get(nodeId) || ModuleInstanceState.NonInstantiated;
    }
    visited.set(nodeId, undefined);
    const result = getModuleInstanceStateWorker(node, visited);
    visited.set(nodeId, result);
    return result;
}

function getModuleInstanceStateWorker(node: ts.Node, visited: ts.ESMap<number, ModuleInstanceState | undefined>): ModuleInstanceState {
    // A module is uninstantiated if it contains only
    switch (node.kind) {
        // 1. interface declarations, type alias declarations
        case ts.SyntaxKind.InterfaceDeclaration:
        case ts.SyntaxKind.TypeAliasDeclaration:
            return ModuleInstanceState.NonInstantiated;
        // 2. const enum declarations
        case ts.SyntaxKind.EnumDeclaration:
            if (ts.isEnumConst(node as ts.EnumDeclaration)) {
                return ModuleInstanceState.ConstEnumOnly;
            }
            break;
        // 3. non-exported import declarations
        case ts.SyntaxKind.ImportDeclaration:
        case ts.SyntaxKind.ImportEqualsDeclaration:
            if (!(ts.hasSyntacticModifier(node, ts.ModifierFlags.Export))) {
                return ModuleInstanceState.NonInstantiated;
            }
            break;
        // 4. Export alias declarations pointing at only uninstantiated modules or things uninstantiated modules contain
        case ts.SyntaxKind.ExportDeclaration:
            const exportDeclaration = node as ts.ExportDeclaration;
            if (!exportDeclaration.moduleSpecifier && exportDeclaration.exportClause && exportDeclaration.exportClause.kind === ts.SyntaxKind.NamedExports) {
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
        case ts.SyntaxKind.ModuleBlock: {
            let state = ModuleInstanceState.NonInstantiated;
            ts.forEachChild(node, n => {
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
                        ts.Debug.assertNever(childState);
                }
            });
            return state;
        }
        case ts.SyntaxKind.ModuleDeclaration:
            return getModuleInstanceState(node as ts.ModuleDeclaration, visited);
        case ts.SyntaxKind.Identifier:
            // Only jsdoc typedef definition can exist in jsdoc namespace, and it should
            // be considered the same as type alias
            if ((node as ts.Identifier).isInJSDocNamespace) {
                return ModuleInstanceState.NonInstantiated;
            }
    }
    return ModuleInstanceState.Instantiated;
}

function getModuleInstanceStateForAliasTarget(specifier: ts.ExportSpecifier, visited: ts.ESMap<number, ModuleInstanceState | undefined>) {
    const name = specifier.propertyName || specifier.name;
    let p: ts.Node | undefined = specifier.parent;
    while (p) {
        if (ts.isBlock(p) || ts.isModuleBlock(p) || ts.isSourceFile(p)) {
            const statements = p.statements;
            let found: ModuleInstanceState | undefined;
            for (const statement of statements) {
                if (ts.nodeHasName(statement, name)) {
                    if (!statement.parent) {
                        ts.setParent(statement, p);
                        ts.setParentRecursive(statement, /*incremental*/ false);
                    }
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

const enum ContainerFlags {
    // The current node is not a container, and no container manipulation should happen before
    // recursing into it.
    None = 0,

    // The current node is a container.  It should be set as the current container (and block-
    // container) before recursing into it.  The current node does not have locals.  Examples:
    //
    //      Classes, ObjectLiterals, TypeLiterals, Interfaces...
    IsContainer = 1 << 0,

    // The current node is a block-scoped-container.  It should be set as the current block-
    // container before recursing into it.  Examples:
    //
    //      Blocks (when not parented by functions), Catch clauses, For/For-in/For-of statements...
    IsBlockScopedContainer = 1 << 1,

    // The current node is the container of a control flow path. The current control flow should
    // be saved and restored, and a new control flow initialized within the container.
    IsControlFlowContainer = 1 << 2,

    IsFunctionLike = 1 << 3,
    IsFunctionExpression = 1 << 4,
    HasLocals = 1 << 5,
    IsInterface = 1 << 6,
    IsObjectLiteralOrClassExpressionMethodOrAccessor = 1 << 7,
}

function initFlowNode<T extends ts.FlowNode>(node: T) {
    ts.Debug.attachFlowNodeDebugInfo(node);
    return node;
}

const binder = createBinder();

/** @internal */
export function bindSourceFile(file: ts.SourceFile, options: ts.CompilerOptions) {
    ts.performance.mark("beforeBind");
    ts.perfLogger.logStartBindFile("" + file.fileName);
    binder(file, options);
    ts.perfLogger.logStopBindFile();
    ts.performance.mark("afterBind");
    ts.performance.measure("Bind", "beforeBind", "afterBind");
}

function createBinder(): (file: ts.SourceFile, options: ts.CompilerOptions) => void {
    let file: ts.SourceFile;
    let options: ts.CompilerOptions;
    let languageVersion: ts.ScriptTarget;
    let parent: ts.Node;
    let container: ts.Node;
    let thisParentContainer: ts.Node; // Container one level up
    let blockScopeContainer: ts.Node;
    let lastContainer: ts.Node;
    let delayedTypeAliases: (ts.JSDocTypedefTag | ts.JSDocCallbackTag | ts.JSDocEnumTag)[];
    let seenThisKeyword: boolean;

    // state used by control flow analysis
    let currentFlow: ts.FlowNode;
    let currentBreakTarget: ts.FlowLabel | undefined;
    let currentContinueTarget: ts.FlowLabel | undefined;
    let currentReturnTarget: ts.FlowLabel | undefined;
    let currentTrueTarget: ts.FlowLabel | undefined;
    let currentFalseTarget: ts.FlowLabel | undefined;
    let currentExceptionTarget: ts.FlowLabel | undefined;
    let preSwitchCaseFlow: ts.FlowNode | undefined;
    let activeLabelList: ActiveLabel | undefined;
    let hasExplicitReturn: boolean;

    // state used for emit helpers
    let emitFlags: ts.NodeFlags;

    // If this file is an external module, then it is automatically in strict-mode according to
    // ES6.  If it is not an external module, then we'll determine if it is in strict mode or
    // not depending on if we see "use strict" in certain places or if we hit a class/namespace
    // or if compiler options contain alwaysStrict.
    let inStrictMode: boolean;

    // If we are binding an assignment pattern, we will bind certain expressions differently.
    let inAssignmentPattern = false;

    let symbolCount = 0;

    let Symbol: new (flags: ts.SymbolFlags, name: ts.__String) => ts.Symbol;
    let classifiableNames: ts.Set<ts.__String>;

    const unreachableFlow: ts.FlowNode = { flags: ts.FlowFlags.Unreachable };
    const reportedUnreachableFlow: ts.FlowNode = { flags: ts.FlowFlags.Unreachable };
    const bindBinaryExpressionFlow = createBindBinaryExpressionFlow();

    /**
     * Inside the binder, we may create a diagnostic for an as-yet unbound node (with potentially no parent pointers, implying no accessible source file)
     * If so, the node _must_ be in the current file (as that's the only way anything could have traversed to it to yield it as the error node)
     * This version of `createDiagnosticForNode` uses the binder's context to account for this, and always yields correct diagnostics even in these situations.
     */
    function createDiagnosticForNode(node: ts.Node, message: ts.DiagnosticMessage, arg0?: string | number, arg1?: string | number, arg2?: string | number): ts.DiagnosticWithLocation {
        return ts.createDiagnosticForNodeInSourceFile(ts.getSourceFileOfNode(node) || file, node, message, arg0, arg1, arg2);
    }

    function bindSourceFile(f: ts.SourceFile, opts: ts.CompilerOptions) {
        file = f;
        options = opts;
        languageVersion = ts.getEmitScriptTarget(options);
        inStrictMode = bindInStrictMode(file, opts);
        classifiableNames = new ts.Set();
        symbolCount = 0;

        Symbol = ts.objectAllocator.getSymbolConstructor();

        // Attach debugging information if necessary
        ts.Debug.attachFlowNodeDebugInfo(unreachableFlow);
        ts.Debug.attachFlowNodeDebugInfo(reportedUnreachableFlow);

        if (!file.locals) {
            ts.tracing?.push(ts.tracing.Phase.Bind, "bindSourceFile", { path: file.path }, /*separateBeginAndEnd*/ true);
            bind(file);
            ts.tracing?.pop();
            file.symbolCount = symbolCount;
            file.classifiableNames = classifiableNames;
            delayedBindJSDocTypedefTag();
        }

        file = undefined!;
        options = undefined!;
        languageVersion = undefined!;
        parent = undefined!;
        container = undefined!;
        thisParentContainer = undefined!;
        blockScopeContainer = undefined!;
        lastContainer = undefined!;
        delayedTypeAliases = undefined!;
        seenThisKeyword = false;
        currentFlow = undefined!;
        currentBreakTarget = undefined;
        currentContinueTarget = undefined;
        currentReturnTarget = undefined;
        currentTrueTarget = undefined;
        currentFalseTarget = undefined;
        currentExceptionTarget = undefined;
        activeLabelList = undefined;
        hasExplicitReturn = false;
        inAssignmentPattern = false;
        emitFlags = ts.NodeFlags.None;
    }

    return bindSourceFile;

    function bindInStrictMode(file: ts.SourceFile, opts: ts.CompilerOptions): boolean {
        if (ts.getStrictOptionValue(opts, "alwaysStrict") && !file.isDeclarationFile) {
            // bind in strict mode source files with alwaysStrict option
            return true;
        }
        else {
            return !!file.externalModuleIndicator;
        }
    }

    function createSymbol(flags: ts.SymbolFlags, name: ts.__String): ts.Symbol {
        symbolCount++;
        return new Symbol(flags, name);
    }

    function addDeclarationToSymbol(symbol: ts.Symbol, node: ts.Declaration, symbolFlags: ts.SymbolFlags) {
        symbol.flags |= symbolFlags;

        node.symbol = symbol;
        symbol.declarations = ts.appendIfUnique(symbol.declarations, node);

        if (symbolFlags & (ts.SymbolFlags.Class | ts.SymbolFlags.Enum | ts.SymbolFlags.Module | ts.SymbolFlags.Variable) && !symbol.exports) {
            symbol.exports = ts.createSymbolTable();
        }

        if (symbolFlags & (ts.SymbolFlags.Class | ts.SymbolFlags.Interface | ts.SymbolFlags.TypeLiteral | ts.SymbolFlags.ObjectLiteral) && !symbol.members) {
            symbol.members = ts.createSymbolTable();
        }

        // On merge of const enum module with class or function, reset const enum only flag (namespaces will already recalculate)
        if (symbol.constEnumOnlyModule && (symbol.flags & (ts.SymbolFlags.Function | ts.SymbolFlags.Class | ts.SymbolFlags.RegularEnum))) {
            symbol.constEnumOnlyModule = false;
        }

        if (symbolFlags & ts.SymbolFlags.Value) {
            ts.setValueDeclaration(symbol, node);
        }
    }

    // Should not be called on a declaration with a computed property name,
    // unless it is a well known Symbol.
    function getDeclarationName(node: ts.Declaration): ts.__String | undefined {
        if (node.kind === ts.SyntaxKind.ExportAssignment) {
            return (node as ts.ExportAssignment).isExportEquals ? ts.InternalSymbolName.ExportEquals : ts.InternalSymbolName.Default;
        }

        const name = ts.getNameOfDeclaration(node);
        if (name) {
            if (ts.isAmbientModule(node)) {
                const moduleName = ts.getTextOfIdentifierOrLiteral(name as ts.Identifier | ts.StringLiteral);
                return (ts.isGlobalScopeAugmentation(node as ts.ModuleDeclaration) ? "__global" : `"${moduleName}"`) as ts.__String;
            }
            if (name.kind === ts.SyntaxKind.ComputedPropertyName) {
                const nameExpression = name.expression;
                // treat computed property names where expression is string/numeric literal as just string/numeric literal
                if (ts.isStringOrNumericLiteralLike(nameExpression)) {
                    return ts.escapeLeadingUnderscores(nameExpression.text);
                }
                if (ts.isSignedNumericLiteral(nameExpression)) {
                    return ts.tokenToString(nameExpression.operator) + nameExpression.operand.text as ts.__String;
                }
                else {
                    ts.Debug.fail("Only computed properties with literal names have declaration names");
                }
            }
            if (ts.isPrivateIdentifier(name)) {
                // containingClass exists because private names only allowed inside classes
                const containingClass = ts.getContainingClass(node);
                if (!containingClass) {
                    // we can get here in cases where there is already a parse error.
                    return undefined;
                }
                const containingClassSymbol = containingClass.symbol;
                return ts.getSymbolNameForPrivateIdentifier(containingClassSymbol, name.escapedText);
            }
            return ts.isPropertyNameLiteral(name) ? ts.getEscapedTextOfIdentifierOrLiteral(name) : undefined;
        }
        switch (node.kind) {
            case ts.SyntaxKind.Constructor:
                return ts.InternalSymbolName.Constructor;
            case ts.SyntaxKind.FunctionType:
            case ts.SyntaxKind.CallSignature:
            case ts.SyntaxKind.JSDocSignature:
                return ts.InternalSymbolName.Call;
            case ts.SyntaxKind.ConstructorType:
            case ts.SyntaxKind.ConstructSignature:
                return ts.InternalSymbolName.New;
            case ts.SyntaxKind.IndexSignature:
                return ts.InternalSymbolName.Index;
            case ts.SyntaxKind.ExportDeclaration:
                return ts.InternalSymbolName.ExportStar;
            case ts.SyntaxKind.SourceFile:
                // json file should behave as
                // module.exports = ...
                return ts.InternalSymbolName.ExportEquals;
            case ts.SyntaxKind.BinaryExpression:
                if (ts.getAssignmentDeclarationKind(node as ts.BinaryExpression) === ts.AssignmentDeclarationKind.ModuleExports) {
                    // module.exports = ...
                    return ts.InternalSymbolName.ExportEquals;
                }
                ts.Debug.fail("Unknown binary declaration kind");
                break;
            case ts.SyntaxKind.JSDocFunctionType:
                return (ts.isJSDocConstructSignature(node) ? ts.InternalSymbolName.New : ts.InternalSymbolName.Call);
            case ts.SyntaxKind.Parameter:
                // Parameters with names are handled at the top of this function.  Parameters
                // without names can only come from JSDocFunctionTypes.
                ts.Debug.assert(node.parent.kind === ts.SyntaxKind.JSDocFunctionType, "Impossible parameter parent kind", () => `parent is: ${ts.Debug.formatSyntaxKind(node.parent.kind)}, expected JSDocFunctionType`);
                const functionType = node.parent as ts.JSDocFunctionType;
                const index = functionType.parameters.indexOf(node as ts.ParameterDeclaration);
                return "arg" + index as ts.__String;
        }
    }

    function getDisplayName(node: ts.Declaration): string {
        return ts.isNamedDeclaration(node) ? ts.declarationNameToString(node.name) : ts.unescapeLeadingUnderscores(ts.Debug.checkDefined(getDeclarationName(node)));
    }

    /**
     * Declares a Symbol for the node and adds it to symbols. Reports errors for conflicting identifier names.
     * @param symbolTable - The symbol table which node will be added to.
     * @param parent - node's parent declaration.
     * @param node - The declaration to be added to the symbol table
     * @param includes - The SymbolFlags that node has in addition to its declaration type (eg: export, ambient, etc.)
     * @param excludes - The flags which node cannot be declared alongside in a symbol table. Used to report forbidden declarations.
     */
    function declareSymbol(symbolTable: ts.SymbolTable, parent: ts.Symbol | undefined, node: ts.Declaration, includes: ts.SymbolFlags, excludes: ts.SymbolFlags, isReplaceableByMethod?: boolean, isComputedName?: boolean): ts.Symbol {
        ts.Debug.assert(isComputedName || !ts.hasDynamicName(node));

        const isDefaultExport = ts.hasSyntacticModifier(node, ts.ModifierFlags.Default) || ts.isExportSpecifier(node) && node.name.escapedText === "default";

        // The exported symbol for an export default function/class node is always named "default"
        const name = isComputedName ? ts.InternalSymbolName.Computed
            : isDefaultExport && parent ? ts.InternalSymbolName.Default
            : getDeclarationName(node);

        let symbol: ts.Symbol | undefined;
        if (name === undefined) {
            symbol = createSymbol(ts.SymbolFlags.None, ts.InternalSymbolName.Missing);
        }
        else {
            // Check and see if the symbol table already has a symbol with this name.  If not,
            // create a new symbol with this name and add it to the table.  Note that we don't
            // give the new symbol any flags *yet*.  This ensures that it will not conflict
            // with the 'excludes' flags we pass in.
            //
            // If we do get an existing symbol, see if it conflicts with the new symbol we're
            // creating.  For example, a 'var' symbol and a 'class' symbol will conflict within
            // the same symbol table.  If we have a conflict, report the issue on each
            // declaration we have for this symbol, and then create a new symbol for this
            // declaration.
            //
            // Note that when properties declared in Javascript constructors
            // (marked by isReplaceableByMethod) conflict with another symbol, the property loses.
            // Always. This allows the common Javascript pattern of overwriting a prototype method
            // with an bound instance method of the same type: `this.method = this.method.bind(this)`
            //
            // If we created a new symbol, either because we didn't have a symbol with this name
            // in the symbol table, or we conflicted with an existing symbol, then just add this
            // node as the sole declaration of the new symbol.
            //
            // Otherwise, we'll be merging into a compatible existing symbol (for example when
            // you have multiple 'vars' with the same name in the same container).  In this case
            // just add this node into the declarations list of the symbol.
            symbol = symbolTable.get(name);

            if (includes & ts.SymbolFlags.Classifiable) {
                classifiableNames.add(name);
            }

            if (!symbol) {
                symbolTable.set(name, symbol = createSymbol(ts.SymbolFlags.None, name));
                if (isReplaceableByMethod) symbol.isReplaceableByMethod = true;
            }
            else if (isReplaceableByMethod && !symbol.isReplaceableByMethod) {
                // A symbol already exists, so don't add this as a declaration.
                return symbol;
            }
            else if (symbol.flags & excludes) {
                if (symbol.isReplaceableByMethod) {
                    // Javascript constructor-declared symbols can be discarded in favor of
                    // prototype symbols like methods.
                    symbolTable.set(name, symbol = createSymbol(ts.SymbolFlags.None, name));
                }
                else if (!(includes & ts.SymbolFlags.Variable && symbol.flags & ts.SymbolFlags.Assignment)) {
                    // Assignment declarations are allowed to merge with variables, no matter what other flags they have.
                    if (ts.isNamedDeclaration(node)) {
                        ts.setParent(node.name, node);
                    }
                    // Report errors every position with duplicate declaration
                    // Report errors on previous encountered declarations
                    let message = symbol.flags & ts.SymbolFlags.BlockScopedVariable
                        ? ts.Diagnostics.Cannot_redeclare_block_scoped_variable_0
                        : ts.Diagnostics.Duplicate_identifier_0;
                    let messageNeedsName = true;

                    if (symbol.flags & ts.SymbolFlags.Enum || includes & ts.SymbolFlags.Enum) {
                        message = ts.Diagnostics.Enum_declarations_can_only_merge_with_namespace_or_other_enum_declarations;
                        messageNeedsName = false;
                    }

                    let multipleDefaultExports = false;
                    if (ts.length(symbol.declarations)) {
                        // If the current node is a default export of some sort, then check if
                        // there are any other default exports that we need to error on.
                        // We'll know whether we have other default exports depending on if `symbol` already has a declaration list set.
                        if (isDefaultExport) {
                            message = ts.Diagnostics.A_module_cannot_have_multiple_default_exports;
                            messageNeedsName = false;
                            multipleDefaultExports = true;
                        }
                        else {
                            // This is to properly report an error in the case "export default { }" is after export default of class declaration or function declaration.
                            // Error on multiple export default in the following case:
                            // 1. multiple export default of class declaration or function declaration by checking NodeFlags.Default
                            // 2. multiple export default of export assignment. This one doesn't have NodeFlags.Default on (as export default doesn't considered as modifiers)
                            if (symbol.declarations && symbol.declarations.length &&
                                (node.kind === ts.SyntaxKind.ExportAssignment && !(node as ts.ExportAssignment).isExportEquals)) {
                                message = ts.Diagnostics.A_module_cannot_have_multiple_default_exports;
                                messageNeedsName = false;
                                multipleDefaultExports = true;
                            }
                        }
                    }

                    const relatedInformation: ts.DiagnosticRelatedInformation[] = [];
                    if (ts.isTypeAliasDeclaration(node) && ts.nodeIsMissing(node.type) && ts.hasSyntacticModifier(node, ts.ModifierFlags.Export) && symbol.flags & (ts.SymbolFlags.Alias | ts.SymbolFlags.Type | ts.SymbolFlags.Namespace)) {
                        // export type T; - may have meant export type { T }?
                        relatedInformation.push(createDiagnosticForNode(node, ts.Diagnostics.Did_you_mean_0, `export type { ${ts.unescapeLeadingUnderscores(node.name.escapedText)} }`));
                    }

                    const declarationName = ts.getNameOfDeclaration(node) || node;
                    ts.forEach(symbol.declarations, (declaration, index) => {
                        const decl = ts.getNameOfDeclaration(declaration) || declaration;
                        const diag = createDiagnosticForNode(decl, message, messageNeedsName ? getDisplayName(declaration) : undefined);
                        file.bindDiagnostics.push(
                            multipleDefaultExports ? ts.addRelatedInfo(diag, createDiagnosticForNode(declarationName, index === 0 ? ts.Diagnostics.Another_export_default_is_here : ts.Diagnostics.and_here)) : diag
                        );
                        if (multipleDefaultExports) {
                            relatedInformation.push(createDiagnosticForNode(decl, ts.Diagnostics.The_first_export_default_is_here));
                        }
                    });

                    const diag = createDiagnosticForNode(declarationName, message, messageNeedsName ? getDisplayName(node) : undefined);
                    file.bindDiagnostics.push(ts.addRelatedInfo(diag, ...relatedInformation));

                    symbol = createSymbol(ts.SymbolFlags.None, name);
                }
            }
        }

        addDeclarationToSymbol(symbol, node, includes);
        if (symbol.parent) {
            ts.Debug.assert(symbol.parent === parent, "Existing symbol parent should match new one");
        }
        else {
            symbol.parent = parent;
        }

        return symbol;
    }

    function declareModuleMember(node: ts.Declaration, symbolFlags: ts.SymbolFlags, symbolExcludes: ts.SymbolFlags): ts.Symbol {
        const hasExportModifier = !!(ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export) || jsdocTreatAsExported(node);
        if (symbolFlags & ts.SymbolFlags.Alias) {
            if (node.kind === ts.SyntaxKind.ExportSpecifier || (node.kind === ts.SyntaxKind.ImportEqualsDeclaration && hasExportModifier)) {
                return declareSymbol(container.symbol.exports!, container.symbol, node, symbolFlags, symbolExcludes);
            }
            else {
                return declareSymbol(container.locals!, /*parent*/ undefined, node, symbolFlags, symbolExcludes);
            }
        }
        else {
            // Exported module members are given 2 symbols: A local symbol that is classified with an ExportValue flag,
            // and an associated export symbol with all the correct flags set on it. There are 2 main reasons:
            //
            //   1. We treat locals and exports of the same name as mutually exclusive within a container.
            //      That means the binder will issue a Duplicate Identifier error if you mix locals and exports
            //      with the same name in the same container.
            //      TODO: Make this a more specific error and decouple it from the exclusion logic.
            //   2. When we checkIdentifier in the checker, we set its resolved symbol to the local symbol,
            //      but return the export symbol (by calling getExportSymbolOfValueSymbolIfExported). That way
            //      when the emitter comes back to it, it knows not to qualify the name if it was found in a containing scope.

            // NOTE: Nested ambient modules always should go to to 'locals' table to prevent their automatic merge
            //       during global merging in the checker. Why? The only case when ambient module is permitted inside another module is module augmentation
            //       and this case is specially handled. Module augmentations should only be merged with original module definition
            //       and should never be merged directly with other augmentation, and the latter case would be possible if automatic merge is allowed.
            if (ts.isJSDocTypeAlias(node)) ts.Debug.assert(ts.isInJSFile(node)); // We shouldn't add symbols for JSDoc nodes if not in a JS file.
            if (!ts.isAmbientModule(node) && (hasExportModifier || container.flags & ts.NodeFlags.ExportContext)) {
                if (!container.locals || (ts.hasSyntacticModifier(node, ts.ModifierFlags.Default) && !getDeclarationName(node))) {
                    return declareSymbol(container.symbol.exports!, container.symbol, node, symbolFlags, symbolExcludes); // No local symbol for an unnamed default!
                }
                const exportKind = symbolFlags & ts.SymbolFlags.Value ? ts.SymbolFlags.ExportValue : 0;
                const local = declareSymbol(container.locals, /*parent*/ undefined, node, exportKind, symbolExcludes);
                local.exportSymbol = declareSymbol(container.symbol.exports!, container.symbol, node, symbolFlags, symbolExcludes);
                node.localSymbol = local;
                return local;
            }
            else {
                return declareSymbol(container.locals!, /*parent*/ undefined, node, symbolFlags, symbolExcludes);
            }
        }
    }

    function jsdocTreatAsExported(node: ts.Node) {
        if (node.parent && ts.isModuleDeclaration(node)) {
            node = node.parent;
        }
        if (!ts.isJSDocTypeAlias(node)) return false;
        // jsdoc typedef handling is a bit of a doozy, but to summarize, treat the typedef as exported if:
        // 1. It has an explicit name (since by default typedefs are always directly exported, either at the top level or in a container), or
        if (!ts.isJSDocEnumTag(node) && !!node.fullName) return true;
        // 2. The thing a nameless typedef pulls its name from is implicitly a direct export (either by assignment or actual export flag).
        const declName = ts.getNameOfDeclaration(node);
        if (!declName) return false;
        if (ts.isPropertyAccessEntityNameExpression(declName.parent) && isTopLevelNamespaceAssignment(declName.parent)) return true;
        if (ts.isDeclaration(declName.parent) && ts.getCombinedModifierFlags(declName.parent) & ts.ModifierFlags.Export) return true;
        // This could potentially be simplified by having `delayedBindJSDocTypedefTag` pass in an override for `hasExportModifier`, since it should
        // already have calculated and branched on most of this.
        return false;
    }

    // All container nodes are kept on a linked list in declaration order. This list is used by
    // the getLocalNameOfContainer function in the type checker to validate that the local name
    // used for a container is unique.
    function bindContainer(node: ts.Mutable<ts.Node>, containerFlags: ContainerFlags) {
        // Before we recurse into a node's children, we first save the existing parent, container
        // and block-container.  Then after we pop out of processing the children, we restore
        // these saved values.
        const saveContainer = container;
        const saveThisParentContainer = thisParentContainer;
        const savedBlockScopeContainer = blockScopeContainer;

        // Depending on what kind of node this is, we may have to adjust the current container
        // and block-container.   If the current node is a container, then it is automatically
        // considered the current block-container as well.  Also, for containers that we know
        // may contain locals, we eagerly initialize the .locals field. We do this because
        // it's highly likely that the .locals will be needed to place some child in (for example,
        // a parameter, or variable declaration).
        //
        // However, we do not proactively create the .locals for block-containers because it's
        // totally normal and common for block-containers to never actually have a block-scoped
        // variable in them.  We don't want to end up allocating an object for every 'block' we
        // run into when most of them won't be necessary.
        //
        // Finally, if this is a block-container, then we clear out any existing .locals object
        // it may contain within it.  This happens in incremental scenarios.  Because we can be
        // reusing a node from a previous compilation, that node may have had 'locals' created
        // for it.  We must clear this so we don't accidentally move any stale data forward from
        // a previous compilation.
        if (containerFlags & ContainerFlags.IsContainer) {
            if (node.kind !== ts.SyntaxKind.ArrowFunction) {
                thisParentContainer = container;
            }
            container = blockScopeContainer = node;
            if (containerFlags & ContainerFlags.HasLocals) {
                container.locals = ts.createSymbolTable();
            }
            addToContainerChain(container);
        }
        else if (containerFlags & ContainerFlags.IsBlockScopedContainer) {
            blockScopeContainer = node;
            blockScopeContainer.locals = undefined;
        }
        if (containerFlags & ContainerFlags.IsControlFlowContainer) {
            const saveCurrentFlow = currentFlow;
            const saveBreakTarget = currentBreakTarget;
            const saveContinueTarget = currentContinueTarget;
            const saveReturnTarget = currentReturnTarget;
            const saveExceptionTarget = currentExceptionTarget;
            const saveActiveLabelList = activeLabelList;
            const saveHasExplicitReturn = hasExplicitReturn;
            const isImmediatelyInvoked =
                (containerFlags & ContainerFlags.IsFunctionExpression &&
                    !ts.hasSyntacticModifier(node, ts.ModifierFlags.Async) &&
                    !(node as ts.FunctionLikeDeclaration).asteriskToken &&
                    !!ts.getImmediatelyInvokedFunctionExpression(node)) ||
                node.kind === ts.SyntaxKind.ClassStaticBlockDeclaration;
            // A non-async, non-generator IIFE is considered part of the containing control flow. Return statements behave
            // similarly to break statements that exit to a label just past the statement body.
            if (!isImmediatelyInvoked) {
                currentFlow = initFlowNode({ flags: ts.FlowFlags.Start });
                if (containerFlags & (ContainerFlags.IsFunctionExpression | ContainerFlags.IsObjectLiteralOrClassExpressionMethodOrAccessor)) {
                    currentFlow.node = node as ts.FunctionExpression | ts.ArrowFunction | ts.MethodDeclaration | ts.GetAccessorDeclaration | ts.SetAccessorDeclaration;
                }
            }
            // We create a return control flow graph for IIFEs and constructors. For constructors
            // we use the return control flow graph in strict property initialization checks.
            currentReturnTarget = isImmediatelyInvoked || node.kind === ts.SyntaxKind.Constructor || (ts.isInJSFile(node) && (node.kind === ts.SyntaxKind.FunctionDeclaration || node.kind === ts.SyntaxKind.FunctionExpression)) ? createBranchLabel() : undefined;
            currentExceptionTarget = undefined;
            currentBreakTarget = undefined;
            currentContinueTarget = undefined;
            activeLabelList = undefined;
            hasExplicitReturn = false;
            bindChildren(node);
            // Reset all reachability check related flags on node (for incremental scenarios)
            node.flags &= ~ts.NodeFlags.ReachabilityAndEmitFlags;
            if (!(currentFlow.flags & ts.FlowFlags.Unreachable) && containerFlags & ContainerFlags.IsFunctionLike && ts.nodeIsPresent((node as ts.FunctionLikeDeclaration | ts.ClassStaticBlockDeclaration).body)) {
                node.flags |= ts.NodeFlags.HasImplicitReturn;
                if (hasExplicitReturn) node.flags |= ts.NodeFlags.HasExplicitReturn;
                (node as ts.FunctionLikeDeclaration | ts.ClassStaticBlockDeclaration).endFlowNode = currentFlow;
            }
            if (node.kind === ts.SyntaxKind.SourceFile) {
                node.flags |= emitFlags;
                (node as ts.SourceFile).endFlowNode = currentFlow;
            }

            if (currentReturnTarget) {
                addAntecedent(currentReturnTarget, currentFlow);
                currentFlow = finishFlowLabel(currentReturnTarget);
                if (node.kind === ts.SyntaxKind.Constructor || node.kind === ts.SyntaxKind.ClassStaticBlockDeclaration || (ts.isInJSFile(node) && (node.kind === ts.SyntaxKind.FunctionDeclaration || node.kind === ts.SyntaxKind.FunctionExpression))) {
                    (node as ts.FunctionLikeDeclaration | ts.ClassStaticBlockDeclaration).returnFlowNode = currentFlow;
                }
            }
            if (!isImmediatelyInvoked) {
                currentFlow = saveCurrentFlow;
            }
            currentBreakTarget = saveBreakTarget;
            currentContinueTarget = saveContinueTarget;
            currentReturnTarget = saveReturnTarget;
            currentExceptionTarget = saveExceptionTarget;
            activeLabelList = saveActiveLabelList;
            hasExplicitReturn = saveHasExplicitReturn;
        }
        else if (containerFlags & ContainerFlags.IsInterface) {
            seenThisKeyword = false;
            bindChildren(node);
            node.flags = seenThisKeyword ? node.flags | ts.NodeFlags.ContainsThis : node.flags & ~ts.NodeFlags.ContainsThis;
        }
        else {
            bindChildren(node);
        }

        container = saveContainer;
        thisParentContainer = saveThisParentContainer;
        blockScopeContainer = savedBlockScopeContainer;
    }

    function bindEachFunctionsFirst(nodes: ts.NodeArray<ts.Node> | undefined): void {
        bindEach(nodes, n => n.kind === ts.SyntaxKind.FunctionDeclaration ? bind(n) : undefined);
        bindEach(nodes, n => n.kind !== ts.SyntaxKind.FunctionDeclaration ? bind(n) : undefined);
    }

    function bindEach(nodes: ts.NodeArray<ts.Node> | undefined, bindFunction: (node: ts.Node) => void = bind): void {
        if (nodes === undefined) {
            return;
        }

        ts.forEach(nodes, bindFunction);
    }

    function bindEachChild(node: ts.Node) {
        ts.forEachChild(node, bind, bindEach);
    }

    function bindChildren(node: ts.Node): void {
        const saveInAssignmentPattern = inAssignmentPattern;
        // Most nodes aren't valid in an assignment pattern, so we clear the value here
        // and set it before we descend into nodes that could actually be part of an assignment pattern.
        inAssignmentPattern = false;
        if (checkUnreachable(node)) {
            bindEachChild(node);
            bindJSDoc(node);
            inAssignmentPattern = saveInAssignmentPattern;
            return;
        }
        if (node.kind >= ts.SyntaxKind.FirstStatement && node.kind <= ts.SyntaxKind.LastStatement && !options.allowUnreachableCode) {
            node.flowNode = currentFlow;
        }
        switch (node.kind) {
            case ts.SyntaxKind.WhileStatement:
                bindWhileStatement(node as ts.WhileStatement);
                break;
            case ts.SyntaxKind.DoStatement:
                bindDoStatement(node as ts.DoStatement);
                break;
            case ts.SyntaxKind.ForStatement:
                bindForStatement(node as ts.ForStatement);
                break;
            case ts.SyntaxKind.ForInStatement:
            case ts.SyntaxKind.ForOfStatement:
                bindForInOrForOfStatement(node as ts.ForInOrOfStatement);
                break;
            case ts.SyntaxKind.IfStatement:
                bindIfStatement(node as ts.IfStatement);
                break;
            case ts.SyntaxKind.ReturnStatement:
            case ts.SyntaxKind.ThrowStatement:
                bindReturnOrThrow(node as ts.ReturnStatement | ts.ThrowStatement);
                break;
            case ts.SyntaxKind.BreakStatement:
            case ts.SyntaxKind.ContinueStatement:
                bindBreakOrContinueStatement(node as ts.BreakOrContinueStatement);
                break;
            case ts.SyntaxKind.TryStatement:
                bindTryStatement(node as ts.TryStatement);
                break;
            case ts.SyntaxKind.SwitchStatement:
                bindSwitchStatement(node as ts.SwitchStatement);
                break;
            case ts.SyntaxKind.CaseBlock:
                bindCaseBlock(node as ts.CaseBlock);
                break;
            case ts.SyntaxKind.CaseClause:
                bindCaseClause(node as ts.CaseClause);
                break;
            case ts.SyntaxKind.ExpressionStatement:
                bindExpressionStatement(node as ts.ExpressionStatement);
                break;
            case ts.SyntaxKind.LabeledStatement:
                bindLabeledStatement(node as ts.LabeledStatement);
                break;
            case ts.SyntaxKind.PrefixUnaryExpression:
                bindPrefixUnaryExpressionFlow(node as ts.PrefixUnaryExpression);
                break;
            case ts.SyntaxKind.PostfixUnaryExpression:
                bindPostfixUnaryExpressionFlow(node as ts.PostfixUnaryExpression);
                break;
            case ts.SyntaxKind.BinaryExpression:
                if (ts.isDestructuringAssignment(node)) {
                    // Carry over whether we are in an assignment pattern to
                    // binary expressions that could actually be an initializer
                    inAssignmentPattern = saveInAssignmentPattern;
                    bindDestructuringAssignmentFlow(node);
                    return;
                }
                bindBinaryExpressionFlow(node as ts.BinaryExpression);
                break;
            case ts.SyntaxKind.DeleteExpression:
                bindDeleteExpressionFlow(node as ts.DeleteExpression);
                break;
            case ts.SyntaxKind.ConditionalExpression:
                bindConditionalExpressionFlow(node as ts.ConditionalExpression);
                break;
            case ts.SyntaxKind.VariableDeclaration:
                bindVariableDeclarationFlow(node as ts.VariableDeclaration);
                break;
            case ts.SyntaxKind.PropertyAccessExpression:
            case ts.SyntaxKind.ElementAccessExpression:
                bindAccessExpressionFlow(node as ts.AccessExpression);
                break;
            case ts.SyntaxKind.CallExpression:
                bindCallExpressionFlow(node as ts.CallExpression);
                break;
            case ts.SyntaxKind.NonNullExpression:
                bindNonNullExpressionFlow(node as ts.NonNullExpression);
                break;
            case ts.SyntaxKind.JSDocTypedefTag:
            case ts.SyntaxKind.JSDocCallbackTag:
            case ts.SyntaxKind.JSDocEnumTag:
                bindJSDocTypeAlias(node as ts.JSDocTypedefTag | ts.JSDocCallbackTag | ts.JSDocEnumTag);
                break;
            // In source files and blocks, bind functions first to match hoisting that occurs at runtime
            case ts.SyntaxKind.SourceFile: {
                bindEachFunctionsFirst((node as ts.SourceFile).statements);
                bind((node as ts.SourceFile).endOfFileToken);
                break;
            }
            case ts.SyntaxKind.Block:
            case ts.SyntaxKind.ModuleBlock:
                bindEachFunctionsFirst((node as ts.Block).statements);
                break;
            case ts.SyntaxKind.BindingElement:
                bindBindingElementFlow(node as ts.BindingElement);
                break;
            case ts.SyntaxKind.Parameter:
                bindParameterFlow(node as ts.ParameterDeclaration);
                break;
            case ts.SyntaxKind.ObjectLiteralExpression:
            case ts.SyntaxKind.ArrayLiteralExpression:
            case ts.SyntaxKind.PropertyAssignment:
            case ts.SyntaxKind.SpreadElement:
                // Carry over whether we are in an assignment pattern of Object and Array literals
                // as well as their children that are valid assignment targets.
                inAssignmentPattern = saveInAssignmentPattern;
                // falls through
            default:
                bindEachChild(node);
                break;
        }
        bindJSDoc(node);
        inAssignmentPattern = saveInAssignmentPattern;
    }

    function isNarrowingExpression(expr: ts.Expression): boolean {
        switch (expr.kind) {
            case ts.SyntaxKind.Identifier:
            case ts.SyntaxKind.PrivateIdentifier:
            case ts.SyntaxKind.ThisKeyword:
            case ts.SyntaxKind.PropertyAccessExpression:
            case ts.SyntaxKind.ElementAccessExpression:
                return containsNarrowableReference(expr);
            case ts.SyntaxKind.CallExpression:
                return hasNarrowableArgument(expr as ts.CallExpression);
            case ts.SyntaxKind.ParenthesizedExpression:
            case ts.SyntaxKind.NonNullExpression:
                return isNarrowingExpression((expr as ts.ParenthesizedExpression | ts.NonNullExpression).expression);
            case ts.SyntaxKind.BinaryExpression:
                return isNarrowingBinaryExpression(expr as ts.BinaryExpression);
            case ts.SyntaxKind.PrefixUnaryExpression:
                return (expr as ts.PrefixUnaryExpression).operator === ts.SyntaxKind.ExclamationToken && isNarrowingExpression((expr as ts.PrefixUnaryExpression).operand);
            case ts.SyntaxKind.TypeOfExpression:
                return isNarrowingExpression((expr as ts.TypeOfExpression).expression);
        }
        return false;
    }

    function isNarrowableReference(expr: ts.Expression): boolean {
        return ts.isDottedName(expr)
            || (ts.isPropertyAccessExpression(expr) || ts.isNonNullExpression(expr) || ts.isParenthesizedExpression(expr)) && isNarrowableReference(expr.expression)
            || ts.isBinaryExpression(expr) && expr.operatorToken.kind === ts.SyntaxKind.CommaToken && isNarrowableReference(expr.right)
            || ts.isElementAccessExpression(expr) && (ts.isStringOrNumericLiteralLike(expr.argumentExpression) || ts.isEntityNameExpression(expr.argumentExpression)) && isNarrowableReference(expr.expression)
            || ts.isAssignmentExpression(expr) && isNarrowableReference(expr.left);
    }

    function containsNarrowableReference(expr: ts.Expression): boolean {
        return isNarrowableReference(expr) || ts.isOptionalChain(expr) && containsNarrowableReference(expr.expression);
    }

    function hasNarrowableArgument(expr: ts.CallExpression) {
        if (expr.arguments) {
            for (const argument of expr.arguments) {
                if (containsNarrowableReference(argument)) {
                    return true;
                }
            }
        }
        if (expr.expression.kind === ts.SyntaxKind.PropertyAccessExpression &&
            containsNarrowableReference((expr.expression as ts.PropertyAccessExpression).expression)) {
            return true;
        }
        return false;
    }

    function isNarrowingTypeofOperands(expr1: ts.Expression, expr2: ts.Expression) {
        return ts.isTypeOfExpression(expr1) && isNarrowableOperand(expr1.expression) && ts.isStringLiteralLike(expr2);
    }

    function isNarrowingBinaryExpression(expr: ts.BinaryExpression) {
        switch (expr.operatorToken.kind) {
            case ts.SyntaxKind.EqualsToken:
            case ts.SyntaxKind.BarBarEqualsToken:
            case ts.SyntaxKind.AmpersandAmpersandEqualsToken:
            case ts.SyntaxKind.QuestionQuestionEqualsToken:
                return containsNarrowableReference(expr.left);
            case ts.SyntaxKind.EqualsEqualsToken:
            case ts.SyntaxKind.ExclamationEqualsToken:
            case ts.SyntaxKind.EqualsEqualsEqualsToken:
            case ts.SyntaxKind.ExclamationEqualsEqualsToken:
                return isNarrowableOperand(expr.left) || isNarrowableOperand(expr.right) ||
                    isNarrowingTypeofOperands(expr.right, expr.left) || isNarrowingTypeofOperands(expr.left, expr.right);
            case ts.SyntaxKind.InstanceOfKeyword:
                return isNarrowableOperand(expr.left);
            case ts.SyntaxKind.InKeyword:
                return isNarrowingExpression(expr.right);
            case ts.SyntaxKind.CommaToken:
                return isNarrowingExpression(expr.right);
        }
        return false;
    }

    function isNarrowableOperand(expr: ts.Expression): boolean {
        switch (expr.kind) {
            case ts.SyntaxKind.ParenthesizedExpression:
                return isNarrowableOperand((expr as ts.ParenthesizedExpression).expression);
            case ts.SyntaxKind.BinaryExpression:
                switch ((expr as ts.BinaryExpression).operatorToken.kind) {
                    case ts.SyntaxKind.EqualsToken:
                        return isNarrowableOperand((expr as ts.BinaryExpression).left);
                    case ts.SyntaxKind.CommaToken:
                        return isNarrowableOperand((expr as ts.BinaryExpression).right);
                }
        }
        return containsNarrowableReference(expr);
    }

    function createBranchLabel(): ts.FlowLabel {
        return initFlowNode({ flags: ts.FlowFlags.BranchLabel, antecedents: undefined });
    }

    function createLoopLabel(): ts.FlowLabel {
        return initFlowNode({ flags: ts.FlowFlags.LoopLabel, antecedents: undefined });
    }

    function createReduceLabel(target: ts.FlowLabel, antecedents: ts.FlowNode[], antecedent: ts.FlowNode): ts.FlowReduceLabel {
        return initFlowNode({ flags: ts.FlowFlags.ReduceLabel, target, antecedents, antecedent });
    }

    function setFlowNodeReferenced(flow: ts.FlowNode) {
        // On first reference we set the Referenced flag, thereafter we set the Shared flag
        flow.flags |= flow.flags & ts.FlowFlags.Referenced ? ts.FlowFlags.Shared : ts.FlowFlags.Referenced;
    }

    function addAntecedent(label: ts.FlowLabel, antecedent: ts.FlowNode): void {
        if (!(antecedent.flags & ts.FlowFlags.Unreachable) && !ts.contains(label.antecedents, antecedent)) {
            (label.antecedents || (label.antecedents = [])).push(antecedent);
            setFlowNodeReferenced(antecedent);
        }
    }

    function createFlowCondition(flags: ts.FlowFlags, antecedent: ts.FlowNode, expression: ts.Expression | undefined): ts.FlowNode {
        if (antecedent.flags & ts.FlowFlags.Unreachable) {
            return antecedent;
        }
        if (!expression) {
            return flags & ts.FlowFlags.TrueCondition ? antecedent : unreachableFlow;
        }
        if ((expression.kind === ts.SyntaxKind.TrueKeyword && flags & ts.FlowFlags.FalseCondition ||
            expression.kind === ts.SyntaxKind.FalseKeyword && flags & ts.FlowFlags.TrueCondition) &&
            !ts.isExpressionOfOptionalChainRoot(expression) && !ts.isNullishCoalesce(expression.parent)) {
            return unreachableFlow;
        }
        if (!isNarrowingExpression(expression)) {
            return antecedent;
        }
        setFlowNodeReferenced(antecedent);
        return initFlowNode({ flags, antecedent, node: expression });
    }

    function createFlowSwitchClause(antecedent: ts.FlowNode, switchStatement: ts.SwitchStatement, clauseStart: number, clauseEnd: number): ts.FlowNode {
        setFlowNodeReferenced(antecedent);
        return initFlowNode({ flags: ts.FlowFlags.SwitchClause, antecedent, switchStatement, clauseStart, clauseEnd });
    }

    function createFlowMutation(flags: ts.FlowFlags, antecedent: ts.FlowNode, node: ts.Expression | ts.VariableDeclaration | ts.ArrayBindingElement): ts.FlowNode {
        setFlowNodeReferenced(antecedent);
        const result = initFlowNode({ flags, antecedent, node });
        if (currentExceptionTarget) {
            addAntecedent(currentExceptionTarget, result);
        }
        return result;
    }

    function createFlowCall(antecedent: ts.FlowNode, node: ts.CallExpression): ts.FlowNode {
        setFlowNodeReferenced(antecedent);
        return initFlowNode({ flags: ts.FlowFlags.Call, antecedent, node });
    }

    function finishFlowLabel(flow: ts.FlowLabel): ts.FlowNode {
        const antecedents = flow.antecedents;
        if (!antecedents) {
            return unreachableFlow;
        }
        if (antecedents.length === 1) {
            return antecedents[0];
        }
        return flow;
    }

    function isStatementCondition(node: ts.Node) {
        const parent = node.parent;
        switch (parent.kind) {
            case ts.SyntaxKind.IfStatement:
            case ts.SyntaxKind.WhileStatement:
            case ts.SyntaxKind.DoStatement:
                return (parent as ts.IfStatement | ts.WhileStatement | ts.DoStatement).expression === node;
            case ts.SyntaxKind.ForStatement:
            case ts.SyntaxKind.ConditionalExpression:
                return (parent as ts.ForStatement | ts.ConditionalExpression).condition === node;
        }
        return false;
    }

    function isLogicalExpression(node: ts.Node) {
        while (true) {
            if (node.kind === ts.SyntaxKind.ParenthesizedExpression) {
                node = (node as ts.ParenthesizedExpression).expression;
            }
            else if (node.kind === ts.SyntaxKind.PrefixUnaryExpression && (node as ts.PrefixUnaryExpression).operator === ts.SyntaxKind.ExclamationToken) {
                node = (node as ts.PrefixUnaryExpression).operand;
            }
            else {
                return node.kind === ts.SyntaxKind.BinaryExpression && (
                    (node as ts.BinaryExpression).operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken ||
                    (node as ts.BinaryExpression).operatorToken.kind === ts.SyntaxKind.BarBarToken ||
                    (node as ts.BinaryExpression).operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken);
            }
        }
    }

    function isLogicalAssignmentExpression(node: ts.Node) {
        node = ts.skipParentheses(node);
        return ts.isBinaryExpression(node) && ts.isLogicalOrCoalescingAssignmentOperator(node.operatorToken.kind);
    }

    function isTopLevelLogicalExpression(node: ts.Node): boolean {
        while (ts.isParenthesizedExpression(node.parent) ||
            ts.isPrefixUnaryExpression(node.parent) && node.parent.operator === ts.SyntaxKind.ExclamationToken) {
            node = node.parent;
        }
        return !isStatementCondition(node) &&
            !isLogicalExpression(node.parent) &&
            !(ts.isOptionalChain(node.parent) && node.parent.expression === node);
    }

    function doWithConditionalBranches<T>(action: (value: T) => void, value: T, trueTarget: ts.FlowLabel, falseTarget: ts.FlowLabel) {
        const savedTrueTarget = currentTrueTarget;
        const savedFalseTarget = currentFalseTarget;
        currentTrueTarget = trueTarget;
        currentFalseTarget = falseTarget;
        action(value);
        currentTrueTarget = savedTrueTarget;
        currentFalseTarget = savedFalseTarget;
    }

    function bindCondition(node: ts.Expression | undefined, trueTarget: ts.FlowLabel, falseTarget: ts.FlowLabel) {
        doWithConditionalBranches(bind, node, trueTarget, falseTarget);
        if (!node || !isLogicalAssignmentExpression(node) && !isLogicalExpression(node) && !(ts.isOptionalChain(node) && ts.isOutermostOptionalChain(node))) {
            addAntecedent(trueTarget, createFlowCondition(ts.FlowFlags.TrueCondition, currentFlow, node));
            addAntecedent(falseTarget, createFlowCondition(ts.FlowFlags.FalseCondition, currentFlow, node));
        }
    }

    function bindIterativeStatement(node: ts.Statement, breakTarget: ts.FlowLabel, continueTarget: ts.FlowLabel): void {
        const saveBreakTarget = currentBreakTarget;
        const saveContinueTarget = currentContinueTarget;
        currentBreakTarget = breakTarget;
        currentContinueTarget = continueTarget;
        bind(node);
        currentBreakTarget = saveBreakTarget;
        currentContinueTarget = saveContinueTarget;
    }

    function setContinueTarget(node: ts.Node, target: ts.FlowLabel) {
        let label = activeLabelList;
        while (label && node.parent.kind === ts.SyntaxKind.LabeledStatement) {
            label.continueTarget = target;
            label = label.next;
            node = node.parent;
        }
        return target;
    }

    function bindWhileStatement(node: ts.WhileStatement): void {
        const preWhileLabel = setContinueTarget(node, createLoopLabel());
        const preBodyLabel = createBranchLabel();
        const postWhileLabel = createBranchLabel();
        addAntecedent(preWhileLabel, currentFlow);
        currentFlow = preWhileLabel;
        bindCondition(node.expression, preBodyLabel, postWhileLabel);
        currentFlow = finishFlowLabel(preBodyLabel);
        bindIterativeStatement(node.statement, postWhileLabel, preWhileLabel);
        addAntecedent(preWhileLabel, currentFlow);
        currentFlow = finishFlowLabel(postWhileLabel);
    }

    function bindDoStatement(node: ts.DoStatement): void {
        const preDoLabel = createLoopLabel();
        const preConditionLabel = setContinueTarget(node, createBranchLabel());
        const postDoLabel = createBranchLabel();
        addAntecedent(preDoLabel, currentFlow);
        currentFlow = preDoLabel;
        bindIterativeStatement(node.statement, postDoLabel, preConditionLabel);
        addAntecedent(preConditionLabel, currentFlow);
        currentFlow = finishFlowLabel(preConditionLabel);
        bindCondition(node.expression, preDoLabel, postDoLabel);
        currentFlow = finishFlowLabel(postDoLabel);
    }

    function bindForStatement(node: ts.ForStatement): void {
        const preLoopLabel = setContinueTarget(node, createLoopLabel());
        const preBodyLabel = createBranchLabel();
        const postLoopLabel = createBranchLabel();
        bind(node.initializer);
        addAntecedent(preLoopLabel, currentFlow);
        currentFlow = preLoopLabel;
        bindCondition(node.condition, preBodyLabel, postLoopLabel);
        currentFlow = finishFlowLabel(preBodyLabel);
        bindIterativeStatement(node.statement, postLoopLabel, preLoopLabel);
        bind(node.incrementor);
        addAntecedent(preLoopLabel, currentFlow);
        currentFlow = finishFlowLabel(postLoopLabel);
    }

    function bindForInOrForOfStatement(node: ts.ForInOrOfStatement): void {
        const preLoopLabel = setContinueTarget(node, createLoopLabel());
        const postLoopLabel = createBranchLabel();
        bind(node.expression);
        addAntecedent(preLoopLabel, currentFlow);
        currentFlow = preLoopLabel;
        if (node.kind === ts.SyntaxKind.ForOfStatement) {
            bind(node.awaitModifier);
        }
        addAntecedent(postLoopLabel, currentFlow);
        bind(node.initializer);
        if (node.initializer.kind !== ts.SyntaxKind.VariableDeclarationList) {
            bindAssignmentTargetFlow(node.initializer);
        }
        bindIterativeStatement(node.statement, postLoopLabel, preLoopLabel);
        addAntecedent(preLoopLabel, currentFlow);
        currentFlow = finishFlowLabel(postLoopLabel);
    }

    function bindIfStatement(node: ts.IfStatement): void {
        const thenLabel = createBranchLabel();
        const elseLabel = createBranchLabel();
        const postIfLabel = createBranchLabel();
        bindCondition(node.expression, thenLabel, elseLabel);
        currentFlow = finishFlowLabel(thenLabel);
        bind(node.thenStatement);
        addAntecedent(postIfLabel, currentFlow);
        currentFlow = finishFlowLabel(elseLabel);
        bind(node.elseStatement);
        addAntecedent(postIfLabel, currentFlow);
        currentFlow = finishFlowLabel(postIfLabel);
    }

    function bindReturnOrThrow(node: ts.ReturnStatement | ts.ThrowStatement): void {
        bind(node.expression);
        if (node.kind === ts.SyntaxKind.ReturnStatement) {
            hasExplicitReturn = true;
            if (currentReturnTarget) {
                addAntecedent(currentReturnTarget, currentFlow);
            }
        }
        currentFlow = unreachableFlow;
    }

    function findActiveLabel(name: ts.__String) {
        for (let label = activeLabelList; label; label = label.next) {
            if (label.name === name) {
                return label;
            }
        }
        return undefined;
    }

    function bindBreakOrContinueFlow(node: ts.BreakOrContinueStatement, breakTarget: ts.FlowLabel | undefined, continueTarget: ts.FlowLabel | undefined) {
        const flowLabel = node.kind === ts.SyntaxKind.BreakStatement ? breakTarget : continueTarget;
        if (flowLabel) {
            addAntecedent(flowLabel, currentFlow);
            currentFlow = unreachableFlow;
        }
    }

    function bindBreakOrContinueStatement(node: ts.BreakOrContinueStatement): void {
        bind(node.label);
        if (node.label) {
            const activeLabel = findActiveLabel(node.label.escapedText);
            if (activeLabel) {
                activeLabel.referenced = true;
                bindBreakOrContinueFlow(node, activeLabel.breakTarget, activeLabel.continueTarget);
            }
        }
        else {
            bindBreakOrContinueFlow(node, currentBreakTarget, currentContinueTarget);
        }
    }

    function bindTryStatement(node: ts.TryStatement): void {
        // We conservatively assume that *any* code in the try block can cause an exception, but we only need
        // to track code that causes mutations (because only mutations widen the possible control flow type of
        // a variable). The exceptionLabel is the target label for control flows that result from exceptions.
        // We add all mutation flow nodes as antecedents of this label such that we can analyze them as possible
        // antecedents of the start of catch or finally blocks. Furthermore, we add the current control flow to
        // represent exceptions that occur before any mutations.
        const saveReturnTarget = currentReturnTarget;
        const saveExceptionTarget = currentExceptionTarget;
        const normalExitLabel = createBranchLabel();
        const returnLabel = createBranchLabel();
        let exceptionLabel = createBranchLabel();
        if (node.finallyBlock) {
            currentReturnTarget = returnLabel;
        }
        addAntecedent(exceptionLabel, currentFlow);
        currentExceptionTarget = exceptionLabel;
        bind(node.tryBlock);
        addAntecedent(normalExitLabel, currentFlow);
        if (node.catchClause) {
            // Start of catch clause is the target of exceptions from try block.
            currentFlow = finishFlowLabel(exceptionLabel);
            // The currentExceptionTarget now represents control flows from exceptions in the catch clause.
            // Effectively, in a try-catch-finally, if an exception occurs in the try block, the catch block
            // acts like a second try block.
            exceptionLabel = createBranchLabel();
            addAntecedent(exceptionLabel, currentFlow);
            currentExceptionTarget = exceptionLabel;
            bind(node.catchClause);
            addAntecedent(normalExitLabel, currentFlow);
        }
        currentReturnTarget = saveReturnTarget;
        currentExceptionTarget = saveExceptionTarget;
        if (node.finallyBlock) {
            // Possible ways control can reach the finally block:
            // 1) Normal completion of try block of a try-finally or try-catch-finally
            // 2) Normal completion of catch block (following exception in try block) of a try-catch-finally
            // 3) Return in try or catch block of a try-finally or try-catch-finally
            // 4) Exception in try block of a try-finally
            // 5) Exception in catch block of a try-catch-finally
            // When analyzing a control flow graph that starts inside a finally block we want to consider all
            // five possibilities above. However, when analyzing a control flow graph that starts outside (past)
            // the finally block, we only want to consider the first two (if we're past a finally block then it
            // must have completed normally). Likewise, when analyzing a control flow graph from return statements
            // in try or catch blocks in an IIFE, we only want to consider the third. To make this possible, we
            // inject a ReduceLabel node into the control flow graph. This node contains an alternate reduced
            // set of antecedents for the pre-finally label. As control flow analysis passes by a ReduceLabel
            // node, the pre-finally label is temporarily switched to the reduced antecedent set.
            const finallyLabel = createBranchLabel();
            finallyLabel.antecedents = ts.concatenate(ts.concatenate(normalExitLabel.antecedents, exceptionLabel.antecedents), returnLabel.antecedents);
            currentFlow = finallyLabel;
            bind(node.finallyBlock);
            if (currentFlow.flags & ts.FlowFlags.Unreachable) {
                // If the end of the finally block is unreachable, the end of the entire try statement is unreachable.
                currentFlow = unreachableFlow;
            }
            else {
                // If we have an IIFE return target and return statements in the try or catch blocks, add a control
                // flow that goes back through the finally block and back through only the return statements.
                if (currentReturnTarget && returnLabel.antecedents) {
                    addAntecedent(currentReturnTarget, createReduceLabel(finallyLabel, returnLabel.antecedents, currentFlow));
                }
                // If we have an outer exception target (i.e. a containing try-finally or try-catch-finally), add a
                // control flow that goes back through the finally blok and back through each possible exception source.
                if (currentExceptionTarget && exceptionLabel.antecedents) {
                    addAntecedent(currentExceptionTarget, createReduceLabel(finallyLabel, exceptionLabel.antecedents, currentFlow));
                }
                // If the end of the finally block is reachable, but the end of the try and catch blocks are not,
                // convert the current flow to unreachable. For example, 'try { return 1; } finally { ... }' should
                // result in an unreachable current control flow.
                currentFlow = normalExitLabel.antecedents ? createReduceLabel(finallyLabel, normalExitLabel.antecedents, currentFlow) : unreachableFlow;
            }
        }
        else {
            currentFlow = finishFlowLabel(normalExitLabel);
        }
    }

    function bindSwitchStatement(node: ts.SwitchStatement): void {
        const postSwitchLabel = createBranchLabel();
        bind(node.expression);
        const saveBreakTarget = currentBreakTarget;
        const savePreSwitchCaseFlow = preSwitchCaseFlow;
        currentBreakTarget = postSwitchLabel;
        preSwitchCaseFlow = currentFlow;
        bind(node.caseBlock);
        addAntecedent(postSwitchLabel, currentFlow);
        const hasDefault = ts.forEach(node.caseBlock.clauses, c => c.kind === ts.SyntaxKind.DefaultClause);
        // We mark a switch statement as possibly exhaustive if it has no default clause and if all
        // case clauses have unreachable end points (e.g. they all return). Note, we no longer need
        // this property in control flow analysis, it's there only for backwards compatibility.
        node.possiblyExhaustive = !hasDefault && !postSwitchLabel.antecedents;
        if (!hasDefault) {
            addAntecedent(postSwitchLabel, createFlowSwitchClause(preSwitchCaseFlow, node, 0, 0));
        }
        currentBreakTarget = saveBreakTarget;
        preSwitchCaseFlow = savePreSwitchCaseFlow;
        currentFlow = finishFlowLabel(postSwitchLabel);
    }

    function bindCaseBlock(node: ts.CaseBlock): void {
        const clauses = node.clauses;
        const isNarrowingSwitch = isNarrowingExpression(node.parent.expression);
        let fallthroughFlow = unreachableFlow;
        for (let i = 0; i < clauses.length; i++) {
            const clauseStart = i;
            while (!clauses[i].statements.length && i + 1 < clauses.length) {
                bind(clauses[i]);
                i++;
            }
            const preCaseLabel = createBranchLabel();
            addAntecedent(preCaseLabel, isNarrowingSwitch ? createFlowSwitchClause(preSwitchCaseFlow!, node.parent, clauseStart, i + 1) : preSwitchCaseFlow!);
            addAntecedent(preCaseLabel, fallthroughFlow);
            currentFlow = finishFlowLabel(preCaseLabel);
            const clause = clauses[i];
            bind(clause);
            fallthroughFlow = currentFlow;
            if (!(currentFlow.flags & ts.FlowFlags.Unreachable) && i !== clauses.length - 1 && options.noFallthroughCasesInSwitch) {
                clause.fallthroughFlowNode = currentFlow;
            }
        }
    }

    function bindCaseClause(node: ts.CaseClause): void {
        const saveCurrentFlow = currentFlow;
        currentFlow = preSwitchCaseFlow!;
        bind(node.expression);
        currentFlow = saveCurrentFlow;
        bindEach(node.statements);
    }

    function bindExpressionStatement(node: ts.ExpressionStatement): void {
        bind(node.expression);
        maybeBindExpressionFlowIfCall(node.expression);
    }

    function maybeBindExpressionFlowIfCall(node: ts.Expression) {
        // A top level or comma expression call expression with a dotted function name and at least one argument
        // is potentially an assertion and is therefore included in the control flow.
        if (node.kind === ts.SyntaxKind.CallExpression) {
            const call = node as ts.CallExpression;
            if (call.expression.kind !== ts.SyntaxKind.SuperKeyword && ts.isDottedName(call.expression)) {
                currentFlow = createFlowCall(currentFlow, call);
            }
        }
    }

    function bindLabeledStatement(node: ts.LabeledStatement): void {
        const postStatementLabel = createBranchLabel();
        activeLabelList = {
            next: activeLabelList,
            name: node.label.escapedText,
            breakTarget: postStatementLabel,
            continueTarget: undefined,
            referenced: false
        };
        bind(node.label);
        bind(node.statement);
        if (!activeLabelList.referenced && !options.allowUnusedLabels) {
            errorOrSuggestionOnNode(ts.unusedLabelIsError(options), node.label, ts.Diagnostics.Unused_label);
        }
        activeLabelList = activeLabelList.next;
        addAntecedent(postStatementLabel, currentFlow);
        currentFlow = finishFlowLabel(postStatementLabel);
    }

    function bindDestructuringTargetFlow(node: ts.Expression) {
        if (node.kind === ts.SyntaxKind.BinaryExpression && (node as ts.BinaryExpression).operatorToken.kind === ts.SyntaxKind.EqualsToken) {
            bindAssignmentTargetFlow((node as ts.BinaryExpression).left);
        }
        else {
            bindAssignmentTargetFlow(node);
        }
    }

    function bindAssignmentTargetFlow(node: ts.Expression) {
        if (isNarrowableReference(node)) {
            currentFlow = createFlowMutation(ts.FlowFlags.Assignment, currentFlow, node);
        }
        else if (node.kind === ts.SyntaxKind.ArrayLiteralExpression) {
            for (const e of (node as ts.ArrayLiteralExpression).elements) {
                if (e.kind === ts.SyntaxKind.SpreadElement) {
                    bindAssignmentTargetFlow((e as ts.SpreadElement).expression);
                }
                else {
                    bindDestructuringTargetFlow(e);
                }
            }
        }
        else if (node.kind === ts.SyntaxKind.ObjectLiteralExpression) {
            for (const p of (node as ts.ObjectLiteralExpression).properties) {
                if (p.kind === ts.SyntaxKind.PropertyAssignment) {
                    bindDestructuringTargetFlow(p.initializer);
                }
                else if (p.kind === ts.SyntaxKind.ShorthandPropertyAssignment) {
                    bindAssignmentTargetFlow(p.name);
                }
                else if (p.kind === ts.SyntaxKind.SpreadAssignment) {
                    bindAssignmentTargetFlow(p.expression);
                }
            }
        }
    }

    function bindLogicalLikeExpression(node: ts.BinaryExpression, trueTarget: ts.FlowLabel, falseTarget: ts.FlowLabel) {
        const preRightLabel = createBranchLabel();
        if (node.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken || node.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandEqualsToken) {
            bindCondition(node.left, preRightLabel, falseTarget);
        }
        else {
            bindCondition(node.left, trueTarget, preRightLabel);
        }
        currentFlow = finishFlowLabel(preRightLabel);
        bind(node.operatorToken);

        if (ts.isLogicalOrCoalescingAssignmentOperator(node.operatorToken.kind)) {
            doWithConditionalBranches(bind, node.right, trueTarget, falseTarget);
            bindAssignmentTargetFlow(node.left);

            addAntecedent(trueTarget, createFlowCondition(ts.FlowFlags.TrueCondition, currentFlow, node));
            addAntecedent(falseTarget, createFlowCondition(ts.FlowFlags.FalseCondition, currentFlow, node));
        }
        else {
            bindCondition(node.right, trueTarget, falseTarget);
        }
    }

    function bindPrefixUnaryExpressionFlow(node: ts.PrefixUnaryExpression) {
        if (node.operator === ts.SyntaxKind.ExclamationToken) {
            const saveTrueTarget = currentTrueTarget;
            currentTrueTarget = currentFalseTarget;
            currentFalseTarget = saveTrueTarget;
            bindEachChild(node);
            currentFalseTarget = currentTrueTarget;
            currentTrueTarget = saveTrueTarget;
        }
        else {
            bindEachChild(node);
            if (node.operator === ts.SyntaxKind.PlusPlusToken || node.operator === ts.SyntaxKind.MinusMinusToken) {
                bindAssignmentTargetFlow(node.operand);
            }
        }
    }

    function bindPostfixUnaryExpressionFlow(node: ts.PostfixUnaryExpression) {
        bindEachChild(node);
        if (node.operator === ts.SyntaxKind.PlusPlusToken || node.operator === ts.SyntaxKind.MinusMinusToken) {
            bindAssignmentTargetFlow(node.operand);
        }
    }

    function bindDestructuringAssignmentFlow(node: ts.DestructuringAssignment) {
        if (inAssignmentPattern) {
            inAssignmentPattern = false;
            bind(node.operatorToken);
            bind(node.right);
            inAssignmentPattern = true;
            bind(node.left);
        }
        else {
            inAssignmentPattern = true;
            bind(node.left);
            inAssignmentPattern = false;
            bind(node.operatorToken);
            bind(node.right);
        }
        bindAssignmentTargetFlow(node.left);
    }

    function createBindBinaryExpressionFlow() {
        interface WorkArea {
            stackIndex: number;
            skip: boolean;
            inStrictModeStack: (boolean | undefined)[];
            parentStack: (ts.Node | undefined)[];
        }

        return ts.createBinaryExpressionTrampoline(onEnter, onLeft, onOperator, onRight, onExit, /*foldState*/ undefined);

        function onEnter(node: ts.BinaryExpression, state: WorkArea | undefined) {
            if (state) {
                state.stackIndex++;
                // Emulate the work that `bind` does before reaching `bindChildren`. A normal call to
                // `bindBinaryExpressionFlow` will already have done this work.
                ts.setParent(node, parent);
                const saveInStrictMode = inStrictMode;
                bindWorker(node);
                const saveParent = parent;
                parent = node;
                state.skip = false;
                state.inStrictModeStack[state.stackIndex] = saveInStrictMode;
                state.parentStack[state.stackIndex] = saveParent;
            }
            else {
                state = {
                    stackIndex: 0,
                    skip: false,
                    inStrictModeStack: [undefined],
                    parentStack: [undefined]
                };
            }
            // TODO: bindLogicalExpression is recursive - if we want to handle deeply nested `&&` expressions
            // we'll need to handle the `bindLogicalExpression` scenarios in this state machine, too
            // For now, though, since the common cases are chained `+`, leaving it recursive is fine
            const operator = node.operatorToken.kind;
            if (operator === ts.SyntaxKind.AmpersandAmpersandToken ||
                operator === ts.SyntaxKind.BarBarToken ||
                operator === ts.SyntaxKind.QuestionQuestionToken ||
                ts.isLogicalOrCoalescingAssignmentOperator(operator)) {
                if (isTopLevelLogicalExpression(node)) {
                    const postExpressionLabel = createBranchLabel();
                    bindLogicalLikeExpression(node, postExpressionLabel, postExpressionLabel);
                    currentFlow = finishFlowLabel(postExpressionLabel);
                }
                else {
                    bindLogicalLikeExpression(node, currentTrueTarget!, currentFalseTarget!);
                }
                state.skip = true;
            }
            return state;
        }

        function onLeft(left: ts.Expression, state: WorkArea, node: ts.BinaryExpression) {
            if (!state.skip) {
                const maybeBound = maybeBind(left);
                if (node.operatorToken.kind === ts.SyntaxKind.CommaToken) {
                    maybeBindExpressionFlowIfCall(left);
                }
                return maybeBound;
            }
        }

        function onOperator(operatorToken: ts.BinaryOperatorToken, state: WorkArea, _node: ts.BinaryExpression) {
            if (!state.skip) {
                bind(operatorToken);
            }
        }

        function onRight(right: ts.Expression, state: WorkArea, node: ts.BinaryExpression) {
            if (!state.skip) {
                const maybeBound = maybeBind(right);
                if (node.operatorToken.kind === ts.SyntaxKind.CommaToken) {
                    maybeBindExpressionFlowIfCall(right);
                }
                return maybeBound;
            }
        }

        function onExit(node: ts.BinaryExpression, state: WorkArea) {
            if (!state.skip) {
                const operator = node.operatorToken.kind;
                if (ts.isAssignmentOperator(operator) && !ts.isAssignmentTarget(node)) {
                    bindAssignmentTargetFlow(node.left);
                    if (operator === ts.SyntaxKind.EqualsToken && node.left.kind === ts.SyntaxKind.ElementAccessExpression) {
                        const elementAccess = node.left as ts.ElementAccessExpression;
                        if (isNarrowableOperand(elementAccess.expression)) {
                            currentFlow = createFlowMutation(ts.FlowFlags.ArrayMutation, currentFlow, node);
                        }
                    }
                }
            }
            const savedInStrictMode = state.inStrictModeStack[state.stackIndex];
            const savedParent = state.parentStack[state.stackIndex];
            if (savedInStrictMode !== undefined) {
                inStrictMode = savedInStrictMode;
            }
            if (savedParent !== undefined) {
                parent = savedParent;
            }
            state.skip = false;
            state.stackIndex--;
        }

        function maybeBind(node: ts.Node) {
            if (node && ts.isBinaryExpression(node) && !ts.isDestructuringAssignment(node)) {
                return node;
            }
            bind(node);
        }
    }

    function bindDeleteExpressionFlow(node: ts.DeleteExpression) {
        bindEachChild(node);
        if (node.expression.kind === ts.SyntaxKind.PropertyAccessExpression) {
            bindAssignmentTargetFlow(node.expression);
        }
    }

    function bindConditionalExpressionFlow(node: ts.ConditionalExpression) {
        const trueLabel = createBranchLabel();
        const falseLabel = createBranchLabel();
        const postExpressionLabel = createBranchLabel();
        bindCondition(node.condition, trueLabel, falseLabel);
        currentFlow = finishFlowLabel(trueLabel);
        bind(node.questionToken);
        bind(node.whenTrue);
        addAntecedent(postExpressionLabel, currentFlow);
        currentFlow = finishFlowLabel(falseLabel);
        bind(node.colonToken);
        bind(node.whenFalse);
        addAntecedent(postExpressionLabel, currentFlow);
        currentFlow = finishFlowLabel(postExpressionLabel);
    }

    function bindInitializedVariableFlow(node: ts.VariableDeclaration | ts.ArrayBindingElement) {
        const name = !ts.isOmittedExpression(node) ? node.name : undefined;
        if (ts.isBindingPattern(name)) {
            for (const child of name.elements) {
                bindInitializedVariableFlow(child);
            }
        }
        else {
            currentFlow = createFlowMutation(ts.FlowFlags.Assignment, currentFlow, node);
        }
    }

    function bindVariableDeclarationFlow(node: ts.VariableDeclaration) {
        bindEachChild(node);
        if (node.initializer || ts.isForInOrOfStatement(node.parent.parent)) {
            bindInitializedVariableFlow(node);
        }
    }

    function bindBindingElementFlow(node: ts.BindingElement) {
        // When evaluating a binding pattern, the initializer is evaluated before the binding pattern, per:
        // - https://tc39.es/ecma262/#sec-destructuring-binding-patterns-runtime-semantics-iteratorbindinginitialization
        //   - `BindingElement: BindingPattern Initializer?`
        // - https://tc39.es/ecma262/#sec-runtime-semantics-keyedbindinginitialization
        //   - `BindingElement: BindingPattern Initializer?`
        bind(node.dotDotDotToken);
        bind(node.propertyName);
        bindInitializer(node.initializer);
        bind(node.name);
    }

    function bindParameterFlow(node: ts.ParameterDeclaration) {
        bindEach(node.modifiers);
        bind(node.dotDotDotToken);
        bind(node.questionToken);
        bind(node.type);
        bindInitializer(node.initializer);
        bind(node.name);
    }

    // a BindingElement/Parameter does not have side effects if initializers are not evaluated and used. (see GH#49759)
    function bindInitializer(node: ts.Expression | undefined) {
        if (!node) {
            return;
        }
        const entryFlow = currentFlow;
        bind(node);
        if (entryFlow === unreachableFlow || entryFlow === currentFlow) {
            return;
        }
        const exitFlow = createBranchLabel();
        addAntecedent(exitFlow, entryFlow);
        addAntecedent(exitFlow, currentFlow);
        currentFlow = finishFlowLabel(exitFlow);
    }

    function bindJSDocTypeAlias(node: ts.JSDocTypedefTag | ts.JSDocCallbackTag | ts.JSDocEnumTag) {
        bind(node.tagName);
        if (node.kind !== ts.SyntaxKind.JSDocEnumTag && node.fullName) {
            // don't bind the type name yet; that's delayed until delayedBindJSDocTypedefTag
            ts.setParent(node.fullName, node);
            ts.setParentRecursive(node.fullName, /*incremental*/ false);
        }
        if (typeof node.comment !== "string") {
            bindEach(node.comment);
        }
    }

    function bindJSDocClassTag(node: ts.JSDocClassTag) {
        bindEachChild(node);
        const host = ts.getHostSignatureFromJSDoc(node);
        if (host && host.kind !== ts.SyntaxKind.MethodDeclaration) {
            addDeclarationToSymbol(host.symbol, host, ts.SymbolFlags.Class);
        }
    }

    function bindOptionalExpression(node: ts.Expression, trueTarget: ts.FlowLabel, falseTarget: ts.FlowLabel) {
        doWithConditionalBranches(bind, node, trueTarget, falseTarget);
        if (!ts.isOptionalChain(node) || ts.isOutermostOptionalChain(node)) {
            addAntecedent(trueTarget, createFlowCondition(ts.FlowFlags.TrueCondition, currentFlow, node));
            addAntecedent(falseTarget, createFlowCondition(ts.FlowFlags.FalseCondition, currentFlow, node));
        }
    }

    function bindOptionalChainRest(node: ts.OptionalChain) {
        switch (node.kind) {
            case ts.SyntaxKind.PropertyAccessExpression:
                bind(node.questionDotToken);
                bind(node.name);
                break;
            case ts.SyntaxKind.ElementAccessExpression:
                bind(node.questionDotToken);
                bind(node.argumentExpression);
                break;
            case ts.SyntaxKind.CallExpression:
                bind(node.questionDotToken);
                bindEach(node.typeArguments);
                bindEach(node.arguments);
                break;
        }
    }

    function bindOptionalChain(node: ts.OptionalChain, trueTarget: ts.FlowLabel, falseTarget: ts.FlowLabel) {
        // For an optional chain, we emulate the behavior of a logical expression:
        //
        // a?.b         -> a && a.b
        // a?.b.c       -> a && a.b.c
        // a?.b?.c      -> a && a.b && a.b.c
        // a?.[x = 1]   -> a && a[x = 1]
        //
        // To do this we descend through the chain until we reach the root of a chain (the expression with a `?.`)
        // and build it's CFA graph as if it were the first condition (`a && ...`). Then we bind the rest
        // of the node as part of the "true" branch, and continue to do so as we ascend back up to the outermost
        // chain node. We then treat the entire node as the right side of the expression.
        const preChainLabel = ts.isOptionalChainRoot(node) ? createBranchLabel() : undefined;
        bindOptionalExpression(node.expression, preChainLabel || trueTarget, falseTarget);
        if (preChainLabel) {
            currentFlow = finishFlowLabel(preChainLabel);
        }
        doWithConditionalBranches(bindOptionalChainRest, node, trueTarget, falseTarget);
        if (ts.isOutermostOptionalChain(node)) {
            addAntecedent(trueTarget, createFlowCondition(ts.FlowFlags.TrueCondition, currentFlow, node));
            addAntecedent(falseTarget, createFlowCondition(ts.FlowFlags.FalseCondition, currentFlow, node));
        }
    }

    function bindOptionalChainFlow(node: ts.OptionalChain) {
        if (isTopLevelLogicalExpression(node)) {
            const postExpressionLabel = createBranchLabel();
            bindOptionalChain(node, postExpressionLabel, postExpressionLabel);
            currentFlow = finishFlowLabel(postExpressionLabel);
        }
        else {
            bindOptionalChain(node, currentTrueTarget!, currentFalseTarget!);
        }
    }

    function bindNonNullExpressionFlow(node: ts.NonNullExpression | ts.NonNullChain) {
        if (ts.isOptionalChain(node)) {
            bindOptionalChainFlow(node);
        }
        else {
            bindEachChild(node);
        }
    }

    function bindAccessExpressionFlow(node: ts.AccessExpression | ts.PropertyAccessChain | ts.ElementAccessChain) {
        if (ts.isOptionalChain(node)) {
            bindOptionalChainFlow(node);
        }
        else {
            bindEachChild(node);
        }
    }

    function bindCallExpressionFlow(node: ts.CallExpression | ts.CallChain) {
        if (ts.isOptionalChain(node)) {
            bindOptionalChainFlow(node);
        }
        else {
            // If the target of the call expression is a function expression or arrow function we have
            // an immediately invoked function expression (IIFE). Initialize the flowNode property to
            // the current control flow (which includes evaluation of the IIFE arguments).
            const expr = ts.skipParentheses(node.expression);
            if (expr.kind === ts.SyntaxKind.FunctionExpression || expr.kind === ts.SyntaxKind.ArrowFunction) {
                bindEach(node.typeArguments);
                bindEach(node.arguments);
                bind(node.expression);
            }
            else {
                bindEachChild(node);
                if (node.expression.kind === ts.SyntaxKind.SuperKeyword) {
                    currentFlow = createFlowCall(currentFlow, node);
                }
            }
        }
        if (node.expression.kind === ts.SyntaxKind.PropertyAccessExpression) {
            const propertyAccess = node.expression as ts.PropertyAccessExpression;
            if (ts.isIdentifier(propertyAccess.name) && isNarrowableOperand(propertyAccess.expression) && ts.isPushOrUnshiftIdentifier(propertyAccess.name)) {
                currentFlow = createFlowMutation(ts.FlowFlags.ArrayMutation, currentFlow, node);
            }
        }
    }

    function getContainerFlags(node: ts.Node): ContainerFlags {
        switch (node.kind) {
            case ts.SyntaxKind.ClassExpression:
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.EnumDeclaration:
            case ts.SyntaxKind.ObjectLiteralExpression:
            case ts.SyntaxKind.TypeLiteral:
            case ts.SyntaxKind.JSDocTypeLiteral:
            case ts.SyntaxKind.JsxAttributes:
                return ContainerFlags.IsContainer;

            case ts.SyntaxKind.InterfaceDeclaration:
                return ContainerFlags.IsContainer | ContainerFlags.IsInterface;

            case ts.SyntaxKind.ModuleDeclaration:
            case ts.SyntaxKind.TypeAliasDeclaration:
            case ts.SyntaxKind.MappedType:
            case ts.SyntaxKind.IndexSignature:
                return ContainerFlags.IsContainer | ContainerFlags.HasLocals;

            case ts.SyntaxKind.SourceFile:
                return ContainerFlags.IsContainer | ContainerFlags.IsControlFlowContainer | ContainerFlags.HasLocals;

            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.SetAccessor:
            case ts.SyntaxKind.MethodDeclaration:
                if (ts.isObjectLiteralOrClassExpressionMethodOrAccessor(node)) {
                    return ContainerFlags.IsContainer | ContainerFlags.IsControlFlowContainer | ContainerFlags.HasLocals | ContainerFlags.IsFunctionLike | ContainerFlags.IsObjectLiteralOrClassExpressionMethodOrAccessor;
                }
                // falls through
            case ts.SyntaxKind.Constructor:
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.MethodSignature:
            case ts.SyntaxKind.CallSignature:
            case ts.SyntaxKind.JSDocSignature:
            case ts.SyntaxKind.JSDocFunctionType:
            case ts.SyntaxKind.FunctionType:
            case ts.SyntaxKind.ConstructSignature:
            case ts.SyntaxKind.ConstructorType:
            case ts.SyntaxKind.ClassStaticBlockDeclaration:
                return ContainerFlags.IsContainer | ContainerFlags.IsControlFlowContainer | ContainerFlags.HasLocals | ContainerFlags.IsFunctionLike;

            case ts.SyntaxKind.FunctionExpression:
            case ts.SyntaxKind.ArrowFunction:
                return ContainerFlags.IsContainer | ContainerFlags.IsControlFlowContainer | ContainerFlags.HasLocals | ContainerFlags.IsFunctionLike | ContainerFlags.IsFunctionExpression;

            case ts.SyntaxKind.ModuleBlock:
                return ContainerFlags.IsControlFlowContainer;
            case ts.SyntaxKind.PropertyDeclaration:
                return (node as ts.PropertyDeclaration).initializer ? ContainerFlags.IsControlFlowContainer : 0;

            case ts.SyntaxKind.CatchClause:
            case ts.SyntaxKind.ForStatement:
            case ts.SyntaxKind.ForInStatement:
            case ts.SyntaxKind.ForOfStatement:
            case ts.SyntaxKind.CaseBlock:
                return ContainerFlags.IsBlockScopedContainer;

            case ts.SyntaxKind.Block:
                // do not treat blocks directly inside a function as a block-scoped-container.
                // Locals that reside in this block should go to the function locals. Otherwise 'x'
                // would not appear to be a redeclaration of a block scoped local in the following
                // example:
                //
                //      function foo() {
                //          var x;
                //          let x;
                //      }
                //
                // If we placed 'var x' into the function locals and 'let x' into the locals of
                // the block, then there would be no collision.
                //
                // By not creating a new block-scoped-container here, we ensure that both 'var x'
                // and 'let x' go into the Function-container's locals, and we do get a collision
                // conflict.
                return ts.isFunctionLike(node.parent) || ts.isClassStaticBlockDeclaration(node.parent) ? ContainerFlags.None : ContainerFlags.IsBlockScopedContainer;
        }

        return ContainerFlags.None;
    }

    function addToContainerChain(next: ts.Node) {
        if (lastContainer) {
            lastContainer.nextContainer = next;
        }

        lastContainer = next;
    }

    function declareSymbolAndAddToSymbolTable(node: ts.Declaration, symbolFlags: ts.SymbolFlags, symbolExcludes: ts.SymbolFlags): ts.Symbol | undefined {
        switch (container.kind) {
            // Modules, source files, and classes need specialized handling for how their
            // members are declared (for example, a member of a class will go into a specific
            // symbol table depending on if it is static or not). We defer to specialized
            // handlers to take care of declaring these child members.
            case ts.SyntaxKind.ModuleDeclaration:
                return declareModuleMember(node, symbolFlags, symbolExcludes);

            case ts.SyntaxKind.SourceFile:
                return declareSourceFileMember(node, symbolFlags, symbolExcludes);

            case ts.SyntaxKind.ClassExpression:
            case ts.SyntaxKind.ClassDeclaration:
                return declareClassMember(node, symbolFlags, symbolExcludes);

            case ts.SyntaxKind.EnumDeclaration:
                return declareSymbol(container.symbol.exports!, container.symbol, node, symbolFlags, symbolExcludes);

            case ts.SyntaxKind.TypeLiteral:
            case ts.SyntaxKind.JSDocTypeLiteral:
            case ts.SyntaxKind.ObjectLiteralExpression:
            case ts.SyntaxKind.InterfaceDeclaration:
            case ts.SyntaxKind.JsxAttributes:
                // Interface/Object-types always have their children added to the 'members' of
                // their container. They are only accessible through an instance of their
                // container, and are never in scope otherwise (even inside the body of the
                // object / type / interface declaring them). An exception is type parameters,
                // which are in scope without qualification (similar to 'locals').
                return declareSymbol(container.symbol.members!, container.symbol, node, symbolFlags, symbolExcludes);

            case ts.SyntaxKind.FunctionType:
            case ts.SyntaxKind.ConstructorType:
            case ts.SyntaxKind.CallSignature:
            case ts.SyntaxKind.ConstructSignature:
            case ts.SyntaxKind.JSDocSignature:
            case ts.SyntaxKind.IndexSignature:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.MethodSignature:
            case ts.SyntaxKind.Constructor:
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.SetAccessor:
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.FunctionExpression:
            case ts.SyntaxKind.ArrowFunction:
            case ts.SyntaxKind.JSDocFunctionType:
            case ts.SyntaxKind.JSDocTypedefTag:
            case ts.SyntaxKind.JSDocCallbackTag:
            case ts.SyntaxKind.ClassStaticBlockDeclaration:
            case ts.SyntaxKind.TypeAliasDeclaration:
            case ts.SyntaxKind.MappedType:
                // All the children of these container types are never visible through another
                // symbol (i.e. through another symbol's 'exports' or 'members').  Instead,
                // they're only accessed 'lexically' (i.e. from code that exists underneath
                // their container in the tree). To accomplish this, we simply add their declared
                // symbol to the 'locals' of the container.  These symbols can then be found as
                // the type checker walks up the containers, checking them for matching names.
                return declareSymbol(container.locals!, /*parent*/ undefined, node, symbolFlags, symbolExcludes);
        }
    }

    function declareClassMember(node: ts.Declaration, symbolFlags: ts.SymbolFlags, symbolExcludes: ts.SymbolFlags) {
        return ts.isStatic(node)
            ? declareSymbol(container.symbol.exports!, container.symbol, node, symbolFlags, symbolExcludes)
            : declareSymbol(container.symbol.members!, container.symbol, node, symbolFlags, symbolExcludes);
    }

    function declareSourceFileMember(node: ts.Declaration, symbolFlags: ts.SymbolFlags, symbolExcludes: ts.SymbolFlags) {
        return ts.isExternalModule(file)
            ? declareModuleMember(node, symbolFlags, symbolExcludes)
            : declareSymbol(file.locals!, /*parent*/ undefined, node, symbolFlags, symbolExcludes);
    }

    function hasExportDeclarations(node: ts.ModuleDeclaration | ts.SourceFile): boolean {
        const body = ts.isSourceFile(node) ? node : ts.tryCast(node.body, ts.isModuleBlock);
        return !!body && body.statements.some(s => ts.isExportDeclaration(s) || ts.isExportAssignment(s));
    }

    function setExportContextFlag(node: ts.Mutable<ts.ModuleDeclaration | ts.SourceFile>) {
        // A declaration source file or ambient module declaration that contains no export declarations (but possibly regular
        // declarations with export modifiers) is an export context in which declarations are implicitly exported.
        if (node.flags & ts.NodeFlags.Ambient && !hasExportDeclarations(node)) {
            node.flags |= ts.NodeFlags.ExportContext;
        }
        else {
            node.flags &= ~ts.NodeFlags.ExportContext;
        }
    }

    function bindModuleDeclaration(node: ts.ModuleDeclaration) {
        setExportContextFlag(node);
        if (ts.isAmbientModule(node)) {
            if (ts.hasSyntacticModifier(node, ts.ModifierFlags.Export)) {
                errorOnFirstToken(node, ts.Diagnostics.export_modifier_cannot_be_applied_to_ambient_modules_and_module_augmentations_since_they_are_always_visible);
            }
            if (ts.isModuleAugmentationExternal(node)) {
                declareModuleSymbol(node);
            }
            else {
                let pattern: string | ts.Pattern | undefined;
                if (node.name.kind === ts.SyntaxKind.StringLiteral) {
                    const { text } = node.name;
                    pattern = ts.tryParsePattern(text);
                    if (pattern === undefined) {
                        errorOnFirstToken(node.name, ts.Diagnostics.Pattern_0_can_have_at_most_one_Asterisk_character, text);
                    }
                }

                const symbol = declareSymbolAndAddToSymbolTable(node, ts.SymbolFlags.ValueModule, ts.SymbolFlags.ValueModuleExcludes)!;
                file.patternAmbientModules = ts.append<ts.PatternAmbientModule>(file.patternAmbientModules, pattern && !ts.isString(pattern) ? { pattern, symbol } : undefined);
            }
        }
        else {
            const state = declareModuleSymbol(node);
            if (state !== ModuleInstanceState.NonInstantiated) {
                const { symbol } = node;
                // if module was already merged with some function, class or non-const enum, treat it as non-const-enum-only
                symbol.constEnumOnlyModule = (!(symbol.flags & (ts.SymbolFlags.Function | ts.SymbolFlags.Class | ts.SymbolFlags.RegularEnum)))
                    // Current must be `const enum` only
                    && state === ModuleInstanceState.ConstEnumOnly
                    // Can't have been set to 'false' in a previous merged symbol. ('undefined' OK)
                    && symbol.constEnumOnlyModule !== false;
            }
        }
    }

    function declareModuleSymbol(node: ts.ModuleDeclaration): ModuleInstanceState {
        const state = getModuleInstanceState(node);
        const instantiated = state !== ModuleInstanceState.NonInstantiated;
        declareSymbolAndAddToSymbolTable(node,
            instantiated ? ts.SymbolFlags.ValueModule : ts.SymbolFlags.NamespaceModule,
            instantiated ? ts.SymbolFlags.ValueModuleExcludes : ts.SymbolFlags.NamespaceModuleExcludes);
        return state;
    }

    function bindFunctionOrConstructorType(node: ts.SignatureDeclaration | ts.JSDocSignature): void {
        // For a given function symbol "<...>(...) => T" we want to generate a symbol identical
        // to the one we would get for: { <...>(...): T }
        //
        // We do that by making an anonymous type literal symbol, and then setting the function
        // symbol as its sole member. To the rest of the system, this symbol will be indistinguishable
        // from an actual type literal symbol you would have gotten had you used the long form.
        const symbol = createSymbol(ts.SymbolFlags.Signature, getDeclarationName(node)!); // TODO: GH#18217
        addDeclarationToSymbol(symbol, node, ts.SymbolFlags.Signature);

        const typeLiteralSymbol = createSymbol(ts.SymbolFlags.TypeLiteral, ts.InternalSymbolName.Type);
        addDeclarationToSymbol(typeLiteralSymbol, node, ts.SymbolFlags.TypeLiteral);
        typeLiteralSymbol.members = ts.createSymbolTable();
        typeLiteralSymbol.members.set(symbol.escapedName, symbol);
    }

    function bindObjectLiteralExpression(node: ts.ObjectLiteralExpression) {
        return bindAnonymousDeclaration(node, ts.SymbolFlags.ObjectLiteral, ts.InternalSymbolName.Object);
    }

    function bindJsxAttributes(node: ts.JsxAttributes) {
        return bindAnonymousDeclaration(node, ts.SymbolFlags.ObjectLiteral, ts.InternalSymbolName.JSXAttributes);
    }

    function bindJsxAttribute(node: ts.JsxAttribute, symbolFlags: ts.SymbolFlags, symbolExcludes: ts.SymbolFlags) {
        return declareSymbolAndAddToSymbolTable(node, symbolFlags, symbolExcludes);
    }

    function bindAnonymousDeclaration(node: ts.Declaration, symbolFlags: ts.SymbolFlags, name: ts.__String) {
        const symbol = createSymbol(symbolFlags, name);
        if (symbolFlags & (ts.SymbolFlags.EnumMember | ts.SymbolFlags.ClassMember)) {
            symbol.parent = container.symbol;
        }
        addDeclarationToSymbol(symbol, node, symbolFlags);
        return symbol;
    }

    function bindBlockScopedDeclaration(node: ts.Declaration, symbolFlags: ts.SymbolFlags, symbolExcludes: ts.SymbolFlags) {
        switch (blockScopeContainer.kind) {
            case ts.SyntaxKind.ModuleDeclaration:
                declareModuleMember(node, symbolFlags, symbolExcludes);
                break;
            case ts.SyntaxKind.SourceFile:
                if (ts.isExternalOrCommonJsModule(container as ts.SourceFile)) {
                    declareModuleMember(node, symbolFlags, symbolExcludes);
                    break;
                }
                // falls through
            default:
                if (!blockScopeContainer.locals) {
                    blockScopeContainer.locals = ts.createSymbolTable();
                    addToContainerChain(blockScopeContainer);
                }
                declareSymbol(blockScopeContainer.locals, /*parent*/ undefined, node, symbolFlags, symbolExcludes);
        }
    }

    function delayedBindJSDocTypedefTag() {
        if (!delayedTypeAliases) {
            return;
        }
        const saveContainer = container;
        const saveLastContainer = lastContainer;
        const saveBlockScopeContainer = blockScopeContainer;
        const saveParent = parent;
        const saveCurrentFlow = currentFlow;
        for (const typeAlias of delayedTypeAliases) {
            const host = typeAlias.parent.parent;
            container = ts.findAncestor(host.parent, n => !!(getContainerFlags(n) & ContainerFlags.IsContainer)) || file;
            blockScopeContainer = ts.getEnclosingBlockScopeContainer(host) || file;
            currentFlow = initFlowNode({ flags: ts.FlowFlags.Start });
            parent = typeAlias;
            bind(typeAlias.typeExpression);
            const declName = ts.getNameOfDeclaration(typeAlias);
            if ((ts.isJSDocEnumTag(typeAlias) || !typeAlias.fullName) && declName && ts.isPropertyAccessEntityNameExpression(declName.parent)) {
                // typedef anchored to an A.B.C assignment - we need to bind into B's namespace under name C
                const isTopLevel = isTopLevelNamespaceAssignment(declName.parent);
                if (isTopLevel) {
                    bindPotentiallyMissingNamespaces(file.symbol, declName.parent, isTopLevel,
                        !!ts.findAncestor(declName, d => ts.isPropertyAccessExpression(d) && d.name.escapedText === "prototype"), /*containerIsClass*/ false);
                    const oldContainer = container;
                    switch (ts.getAssignmentDeclarationPropertyAccessKind(declName.parent)) {
                        case ts.AssignmentDeclarationKind.ExportsProperty:
                        case ts.AssignmentDeclarationKind.ModuleExports:
                            if (!ts.isExternalOrCommonJsModule(file)) {
                                container = undefined!;
                            }
                            else {
                                container = file;
                            }
                            break;
                        case ts.AssignmentDeclarationKind.ThisProperty:
                            container = declName.parent.expression;
                            break;
                        case ts.AssignmentDeclarationKind.PrototypeProperty:
                            container = (declName.parent.expression as ts.PropertyAccessExpression).name;
                            break;
                        case ts.AssignmentDeclarationKind.Property:
                            container = isExportsOrModuleExportsOrAlias(file, declName.parent.expression) ? file
                                : ts.isPropertyAccessExpression(declName.parent.expression) ? declName.parent.expression.name
                                : declName.parent.expression;
                            break;
                        case ts.AssignmentDeclarationKind.None:
                            return ts.Debug.fail("Shouldn't have detected typedef or enum on non-assignment declaration");
                    }
                    if (container) {
                        declareModuleMember(typeAlias, ts.SymbolFlags.TypeAlias, ts.SymbolFlags.TypeAliasExcludes);
                    }
                    container = oldContainer;
                }
            }
            else if (ts.isJSDocEnumTag(typeAlias) || !typeAlias.fullName || typeAlias.fullName.kind === ts.SyntaxKind.Identifier) {
                parent = typeAlias.parent;
                bindBlockScopedDeclaration(typeAlias, ts.SymbolFlags.TypeAlias, ts.SymbolFlags.TypeAliasExcludes);
            }
            else {
                bind(typeAlias.fullName);
            }
        }
        container = saveContainer;
        lastContainer = saveLastContainer;
        blockScopeContainer = saveBlockScopeContainer;
        parent = saveParent;
        currentFlow = saveCurrentFlow;
    }

    // The binder visits every node in the syntax tree so it is a convenient place to perform a single localized
    // check for reserved words used as identifiers in strict mode code, as well as `yield` or `await` in
    // [Yield] or [Await] contexts, respectively.
    function checkContextualIdentifier(node: ts.Identifier) {
        // Report error only if there are no parse errors in file
        if (!file.parseDiagnostics.length &&
            !(node.flags & ts.NodeFlags.Ambient) &&
            !(node.flags & ts.NodeFlags.JSDoc) &&
            !ts.isIdentifierName(node)) {

            // strict mode identifiers
            if (inStrictMode &&
                node.originalKeywordKind! >= ts.SyntaxKind.FirstFutureReservedWord &&
                node.originalKeywordKind! <= ts.SyntaxKind.LastFutureReservedWord) {
                file.bindDiagnostics.push(createDiagnosticForNode(node,
                    getStrictModeIdentifierMessage(node), ts.declarationNameToString(node)));
            }
            else if (node.originalKeywordKind === ts.SyntaxKind.AwaitKeyword) {
                if (ts.isExternalModule(file) && ts.isInTopLevelContext(node)) {
                    file.bindDiagnostics.push(createDiagnosticForNode(node,
                        ts.Diagnostics.Identifier_expected_0_is_a_reserved_word_at_the_top_level_of_a_module,
                        ts.declarationNameToString(node)));
                }
                else if (node.flags & ts.NodeFlags.AwaitContext) {
                    file.bindDiagnostics.push(createDiagnosticForNode(node,
                        ts.Diagnostics.Identifier_expected_0_is_a_reserved_word_that_cannot_be_used_here,
                        ts.declarationNameToString(node)));
                }
            }
            else if (node.originalKeywordKind === ts.SyntaxKind.YieldKeyword && node.flags & ts.NodeFlags.YieldContext) {
                file.bindDiagnostics.push(createDiagnosticForNode(node,
                    ts.Diagnostics.Identifier_expected_0_is_a_reserved_word_that_cannot_be_used_here,
                    ts.declarationNameToString(node)));
            }
        }
    }

    function getStrictModeIdentifierMessage(node: ts.Node) {
        // Provide specialized messages to help the user understand why we think they're in
        // strict mode.
        if (ts.getContainingClass(node)) {
            return ts.Diagnostics.Identifier_expected_0_is_a_reserved_word_in_strict_mode_Class_definitions_are_automatically_in_strict_mode;
        }

        if (file.externalModuleIndicator) {
            return ts.Diagnostics.Identifier_expected_0_is_a_reserved_word_in_strict_mode_Modules_are_automatically_in_strict_mode;
        }

        return ts.Diagnostics.Identifier_expected_0_is_a_reserved_word_in_strict_mode;
    }

    // The binder visits every node, so this is a good place to check for
    // the reserved private name (there is only one)
    function checkPrivateIdentifier(node: ts.PrivateIdentifier) {
        if (node.escapedText === "#constructor") {
            // Report error only if there are no parse errors in file
            if (!file.parseDiagnostics.length) {
                file.bindDiagnostics.push(createDiagnosticForNode(node,
                    ts.Diagnostics.constructor_is_a_reserved_word, ts.declarationNameToString(node)));
            }
        }
    }

    function checkStrictModeBinaryExpression(node: ts.BinaryExpression) {
        if (inStrictMode && ts.isLeftHandSideExpression(node.left) && ts.isAssignmentOperator(node.operatorToken.kind)) {
            // ECMA 262 (Annex C) The identifier eval or arguments may not appear as the LeftHandSideExpression of an
            // Assignment operator(11.13) or of a PostfixExpression(11.3)
            checkStrictModeEvalOrArguments(node, node.left as ts.Identifier);
        }
    }

    function checkStrictModeCatchClause(node: ts.CatchClause) {
        // It is a SyntaxError if a TryStatement with a Catch occurs within strict code and the Identifier of the
        // Catch production is eval or arguments
        if (inStrictMode && node.variableDeclaration) {
            checkStrictModeEvalOrArguments(node, node.variableDeclaration.name);
        }
    }

    function checkStrictModeDeleteExpression(node: ts.DeleteExpression) {
        // Grammar checking
        if (inStrictMode && node.expression.kind === ts.SyntaxKind.Identifier) {
            // When a delete operator occurs within strict mode code, a SyntaxError is thrown if its
            // UnaryExpression is a direct reference to a variable, function argument, or function name
            const span = ts.getErrorSpanForNode(file, node.expression);
            file.bindDiagnostics.push(ts.createFileDiagnostic(file, span.start, span.length, ts.Diagnostics.delete_cannot_be_called_on_an_identifier_in_strict_mode));
        }
    }

    function isEvalOrArgumentsIdentifier(node: ts.Node): boolean {
        return ts.isIdentifier(node) && (node.escapedText === "eval" || node.escapedText === "arguments");
    }

    function checkStrictModeEvalOrArguments(contextNode: ts.Node, name: ts.Node | undefined) {
        if (name && name.kind === ts.SyntaxKind.Identifier) {
            const identifier = name as ts.Identifier;
            if (isEvalOrArgumentsIdentifier(identifier)) {
                // We check first if the name is inside class declaration or class expression; if so give explicit message
                // otherwise report generic error message.
                const span = ts.getErrorSpanForNode(file, name);
                file.bindDiagnostics.push(ts.createFileDiagnostic(file, span.start, span.length,
                    getStrictModeEvalOrArgumentsMessage(contextNode), ts.idText(identifier)));
            }
        }
    }

    function getStrictModeEvalOrArgumentsMessage(node: ts.Node) {
        // Provide specialized messages to help the user understand why we think they're in
        // strict mode.
        if (ts.getContainingClass(node)) {
            return ts.Diagnostics.Code_contained_in_a_class_is_evaluated_in_JavaScript_s_strict_mode_which_does_not_allow_this_use_of_0_For_more_information_see_https_Colon_Slash_Slashdeveloper_mozilla_org_Slashen_US_Slashdocs_SlashWeb_SlashJavaScript_SlashReference_SlashStrict_mode;
        }

        if (file.externalModuleIndicator) {
            return ts.Diagnostics.Invalid_use_of_0_Modules_are_automatically_in_strict_mode;
        }

        return ts.Diagnostics.Invalid_use_of_0_in_strict_mode;
    }

    function checkStrictModeFunctionName(node: ts.FunctionLikeDeclaration) {
        if (inStrictMode) {
            // It is a SyntaxError if the identifier eval or arguments appears within a FormalParameterList of a strict mode FunctionDeclaration or FunctionExpression (13.1))
            checkStrictModeEvalOrArguments(node, node.name);
        }
    }

    function getStrictModeBlockScopeFunctionDeclarationMessage(node: ts.Node) {
        // Provide specialized messages to help the user understand why we think they're in
        // strict mode.
        if (ts.getContainingClass(node)) {
            return ts.Diagnostics.Function_declarations_are_not_allowed_inside_blocks_in_strict_mode_when_targeting_ES3_or_ES5_Class_definitions_are_automatically_in_strict_mode;
        }

        if (file.externalModuleIndicator) {
            return ts.Diagnostics.Function_declarations_are_not_allowed_inside_blocks_in_strict_mode_when_targeting_ES3_or_ES5_Modules_are_automatically_in_strict_mode;
        }

        return ts.Diagnostics.Function_declarations_are_not_allowed_inside_blocks_in_strict_mode_when_targeting_ES3_or_ES5;
    }

    function checkStrictModeFunctionDeclaration(node: ts.FunctionDeclaration) {
        if (languageVersion < ts.ScriptTarget.ES2015) {
            // Report error if function is not top level function declaration
            if (blockScopeContainer.kind !== ts.SyntaxKind.SourceFile &&
                blockScopeContainer.kind !== ts.SyntaxKind.ModuleDeclaration &&
                !ts.isFunctionLikeOrClassStaticBlockDeclaration(blockScopeContainer)) {
                // We check first if the name is inside class declaration or class expression; if so give explicit message
                // otherwise report generic error message.
                const errorSpan = ts.getErrorSpanForNode(file, node);
                file.bindDiagnostics.push(ts.createFileDiagnostic(file, errorSpan.start, errorSpan.length,
                    getStrictModeBlockScopeFunctionDeclarationMessage(node)));
            }
        }
    }

    function checkStrictModeNumericLiteral(node: ts.NumericLiteral) {
        if (languageVersion < ts.ScriptTarget.ES5 && inStrictMode && node.numericLiteralFlags & ts.TokenFlags.Octal) {
            file.bindDiagnostics.push(createDiagnosticForNode(node, ts.Diagnostics.Octal_literals_are_not_allowed_in_strict_mode));
        }
    }

    function checkStrictModePostfixUnaryExpression(node: ts.PostfixUnaryExpression) {
        // Grammar checking
        // The identifier eval or arguments may not appear as the LeftHandSideExpression of an
        // Assignment operator(11.13) or of a PostfixExpression(11.3) or as the UnaryExpression
        // operated upon by a Prefix Increment(11.4.4) or a Prefix Decrement(11.4.5) operator.
        if (inStrictMode) {
            checkStrictModeEvalOrArguments(node, node.operand as ts.Identifier);
        }
    }

    function checkStrictModePrefixUnaryExpression(node: ts.PrefixUnaryExpression) {
        // Grammar checking
        if (inStrictMode) {
            if (node.operator === ts.SyntaxKind.PlusPlusToken || node.operator === ts.SyntaxKind.MinusMinusToken) {
                checkStrictModeEvalOrArguments(node, node.operand as ts.Identifier);
            }
        }
    }

    function checkStrictModeWithStatement(node: ts.WithStatement) {
        // Grammar checking for withStatement
        if (inStrictMode) {
            errorOnFirstToken(node, ts.Diagnostics.with_statements_are_not_allowed_in_strict_mode);
        }
    }

    function checkStrictModeLabeledStatement(node: ts.LabeledStatement) {
        // Grammar checking for labeledStatement
        if (inStrictMode && ts.getEmitScriptTarget(options) >= ts.ScriptTarget.ES2015) {
            if (ts.isDeclarationStatement(node.statement) || ts.isVariableStatement(node.statement)) {
                errorOnFirstToken(node.label, ts.Diagnostics.A_label_is_not_allowed_here);
            }
        }
    }

    function errorOnFirstToken(node: ts.Node, message: ts.DiagnosticMessage, arg0?: any, arg1?: any, arg2?: any) {
        const span = ts.getSpanOfTokenAtPosition(file, node.pos);
        file.bindDiagnostics.push(ts.createFileDiagnostic(file, span.start, span.length, message, arg0, arg1, arg2));
    }

    function errorOrSuggestionOnNode(isError: boolean, node: ts.Node, message: ts.DiagnosticMessage): void {
        errorOrSuggestionOnRange(isError, node, node, message);
    }

    function errorOrSuggestionOnRange(isError: boolean, startNode: ts.Node, endNode: ts.Node, message: ts.DiagnosticMessage): void {
        addErrorOrSuggestionDiagnostic(isError, { pos: ts.getTokenPosOfNode(startNode, file), end: endNode.end }, message);
    }

    function addErrorOrSuggestionDiagnostic(isError: boolean, range: ts.TextRange, message: ts.DiagnosticMessage): void {
        const diag = ts.createFileDiagnostic(file, range.pos, range.end - range.pos, message);
        if (isError) {
            file.bindDiagnostics.push(diag);
        }
        else {
            file.bindSuggestionDiagnostics = ts.append(file.bindSuggestionDiagnostics, { ...diag, category: ts.DiagnosticCategory.Suggestion });
        }
    }

    function bind(node: ts.Node | undefined): void {
        if (!node) {
            return;
        }
        ts.setParent(node, parent);
        if (ts.tracing) (node as ts.TracingNode).tracingPath = file.path;
        const saveInStrictMode = inStrictMode;

        // Even though in the AST the jsdoc @typedef node belongs to the current node,
        // its symbol might be in the same scope with the current node's symbol. Consider:
        //
        //     /** @typedef {string | number} MyType */
        //     function foo();
        //
        // Here the current node is "foo", which is a container, but the scope of "MyType" should
        // not be inside "foo". Therefore we always bind @typedef before bind the parent node,
        // and skip binding this tag later when binding all the other jsdoc tags.

        // First we bind declaration nodes to a symbol if possible. We'll both create a symbol
        // and then potentially add the symbol to an appropriate symbol table. Possible
        // destination symbol tables are:
        //
        //  1) The 'exports' table of the current container's symbol.
        //  2) The 'members' table of the current container's symbol.
        //  3) The 'locals' table of the current container.
        //
        // However, not all symbols will end up in any of these tables. 'Anonymous' symbols
        // (like TypeLiterals for example) will not be put in any table.
        bindWorker(node);
        // Then we recurse into the children of the node to bind them as well. For certain
        // symbols we do specialized work when we recurse. For example, we'll keep track of
        // the current 'container' node when it changes. This helps us know which symbol table
        // a local should go into for example. Since terminal nodes are known not to have
        // children, as an optimization we don't process those.
        if (node.kind > ts.SyntaxKind.LastToken) {
            const saveParent = parent;
            parent = node;
            const containerFlags = getContainerFlags(node);
            if (containerFlags === ContainerFlags.None) {
                bindChildren(node);
            }
            else {
                bindContainer(node, containerFlags);
            }
            parent = saveParent;
        }
        else {
            const saveParent = parent;
            if (node.kind === ts.SyntaxKind.EndOfFileToken) parent = node;
            bindJSDoc(node);
            parent = saveParent;
        }
        inStrictMode = saveInStrictMode;
    }

    function bindJSDoc(node: ts.Node) {
        if (ts.hasJSDocNodes(node)) {
            if (ts.isInJSFile(node)) {
                for (const j of node.jsDoc!) {
                    bind(j);
                }
            }
            else {
                for (const j of node.jsDoc!) {
                    ts.setParent(j, node);
                    ts.setParentRecursive(j, /*incremental*/ false);
                }
            }
        }
    }

    function updateStrictModeStatementList(statements: ts.NodeArray<ts.Statement>) {
        if (!inStrictMode) {
            for (const statement of statements) {
                if (!ts.isPrologueDirective(statement)) {
                    return;
                }

                if (isUseStrictPrologueDirective(statement as ts.ExpressionStatement)) {
                    inStrictMode = true;
                    return;
                }
            }
        }
    }

    /// Should be called only on prologue directives (isPrologueDirective(node) should be true)
    function isUseStrictPrologueDirective(node: ts.ExpressionStatement): boolean {
        const nodeText = ts.getSourceTextOfNodeFromSourceFile(file, node.expression);

        // Note: the node text must be exactly "use strict" or 'use strict'.  It is not ok for the
        // string to contain unicode escapes (as per ES5).
        return nodeText === '"use strict"' || nodeText === "'use strict'";
    }

    function bindWorker(node: ts.Node) {
        switch (node.kind) {
            /* Strict mode checks */
            case ts.SyntaxKind.Identifier:
                // for typedef type names with namespaces, bind the new jsdoc type symbol here
                // because it requires all containing namespaces to be in effect, namely the
                // current "blockScopeContainer" needs to be set to its immediate namespace parent.
                if ((node as ts.Identifier).isInJSDocNamespace) {
                    let parentNode = node.parent;
                    while (parentNode && !ts.isJSDocTypeAlias(parentNode)) {
                        parentNode = parentNode.parent;
                    }
                    bindBlockScopedDeclaration(parentNode as ts.Declaration, ts.SymbolFlags.TypeAlias, ts.SymbolFlags.TypeAliasExcludes);
                    break;
                }
                // falls through
            case ts.SyntaxKind.ThisKeyword:
                if (currentFlow && (ts.isExpression(node) || parent.kind === ts.SyntaxKind.ShorthandPropertyAssignment)) {
                    node.flowNode = currentFlow;
                }
                return checkContextualIdentifier(node as ts.Identifier);
            case ts.SyntaxKind.QualifiedName:
                if (currentFlow && ts.isPartOfTypeQuery(node)) {
                    node.flowNode = currentFlow;
                }
                break;
            case ts.SyntaxKind.MetaProperty:
            case ts.SyntaxKind.SuperKeyword:
                node.flowNode = currentFlow;
                break;
            case ts.SyntaxKind.PrivateIdentifier:
                return checkPrivateIdentifier(node as ts.PrivateIdentifier);
            case ts.SyntaxKind.PropertyAccessExpression:
            case ts.SyntaxKind.ElementAccessExpression:
                const expr = node as ts.PropertyAccessExpression | ts.ElementAccessExpression;
                if (currentFlow && isNarrowableReference(expr)) {
                    expr.flowNode = currentFlow;
                }
                if (ts.isSpecialPropertyDeclaration(expr)) {
                    bindSpecialPropertyDeclaration(expr);
                }
                if (ts.isInJSFile(expr) &&
                    file.commonJsModuleIndicator &&
                    ts.isModuleExportsAccessExpression(expr) &&
                    !lookupSymbolForName(blockScopeContainer, "module" as ts.__String)) {
                    declareSymbol(file.locals!, /*parent*/ undefined, expr.expression,
                        ts.SymbolFlags.FunctionScopedVariable | ts.SymbolFlags.ModuleExports, ts.SymbolFlags.FunctionScopedVariableExcludes);
                }
                break;
            case ts.SyntaxKind.BinaryExpression:
                const specialKind = ts.getAssignmentDeclarationKind(node as ts.BinaryExpression);
                switch (specialKind) {
                    case ts.AssignmentDeclarationKind.ExportsProperty:
                        bindExportsPropertyAssignment(node as ts.BindableStaticPropertyAssignmentExpression);
                        break;
                    case ts.AssignmentDeclarationKind.ModuleExports:
                        bindModuleExportsAssignment(node as ts.BindablePropertyAssignmentExpression);
                        break;
                    case ts.AssignmentDeclarationKind.PrototypeProperty:
                        bindPrototypePropertyAssignment((node as ts.BindableStaticPropertyAssignmentExpression).left, node);
                        break;
                    case ts.AssignmentDeclarationKind.Prototype:
                        bindPrototypeAssignment(node as ts.BindableStaticPropertyAssignmentExpression);
                        break;
                    case ts.AssignmentDeclarationKind.ThisProperty:
                        bindThisPropertyAssignment(node as ts.BindablePropertyAssignmentExpression);
                        break;
                    case ts.AssignmentDeclarationKind.Property:
                        const expression = ((node as ts.BinaryExpression).left as ts.AccessExpression).expression;
                        if (ts.isInJSFile(node) && ts.isIdentifier(expression)) {
                            const symbol = lookupSymbolForName(blockScopeContainer, expression.escapedText);
                            if (ts.isThisInitializedDeclaration(symbol?.valueDeclaration)) {
                                bindThisPropertyAssignment(node as ts.BindablePropertyAssignmentExpression);
                                break;
                            }
                        }
                        bindSpecialPropertyAssignment(node as ts.BindablePropertyAssignmentExpression);
                        break;
                    case ts.AssignmentDeclarationKind.None:
                        // Nothing to do
                        break;
                    default:
                        ts.Debug.fail("Unknown binary expression special property assignment kind");
                }
                return checkStrictModeBinaryExpression(node as ts.BinaryExpression);
            case ts.SyntaxKind.CatchClause:
                return checkStrictModeCatchClause(node as ts.CatchClause);
            case ts.SyntaxKind.DeleteExpression:
                return checkStrictModeDeleteExpression(node as ts.DeleteExpression);
            case ts.SyntaxKind.NumericLiteral:
                return checkStrictModeNumericLiteral(node as ts.NumericLiteral);
            case ts.SyntaxKind.PostfixUnaryExpression:
                return checkStrictModePostfixUnaryExpression(node as ts.PostfixUnaryExpression);
            case ts.SyntaxKind.PrefixUnaryExpression:
                return checkStrictModePrefixUnaryExpression(node as ts.PrefixUnaryExpression);
            case ts.SyntaxKind.WithStatement:
                return checkStrictModeWithStatement(node as ts.WithStatement);
            case ts.SyntaxKind.LabeledStatement:
                return checkStrictModeLabeledStatement(node as ts.LabeledStatement);
            case ts.SyntaxKind.ThisType:
                seenThisKeyword = true;
                return;
            case ts.SyntaxKind.TypePredicate:
                break; // Binding the children will handle everything
            case ts.SyntaxKind.TypeParameter:
                return bindTypeParameter(node as ts.TypeParameterDeclaration);
            case ts.SyntaxKind.Parameter:
                return bindParameter(node as ts.ParameterDeclaration);
            case ts.SyntaxKind.VariableDeclaration:
                return bindVariableDeclarationOrBindingElement(node as ts.VariableDeclaration);
            case ts.SyntaxKind.BindingElement:
                node.flowNode = currentFlow;
                return bindVariableDeclarationOrBindingElement(node as ts.BindingElement);
            case ts.SyntaxKind.PropertyDeclaration:
            case ts.SyntaxKind.PropertySignature:
                return bindPropertyWorker(node as ts.PropertyDeclaration | ts.PropertySignature);
            case ts.SyntaxKind.PropertyAssignment:
            case ts.SyntaxKind.ShorthandPropertyAssignment:
                return bindPropertyOrMethodOrAccessor(node as ts.Declaration, ts.SymbolFlags.Property, ts.SymbolFlags.PropertyExcludes);
            case ts.SyntaxKind.EnumMember:
                return bindPropertyOrMethodOrAccessor(node as ts.Declaration, ts.SymbolFlags.EnumMember, ts.SymbolFlags.EnumMemberExcludes);

            case ts.SyntaxKind.CallSignature:
            case ts.SyntaxKind.ConstructSignature:
            case ts.SyntaxKind.IndexSignature:
                return declareSymbolAndAddToSymbolTable(node as ts.Declaration, ts.SymbolFlags.Signature, ts.SymbolFlags.None);
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.MethodSignature:
                // If this is an ObjectLiteralExpression method, then it sits in the same space
                // as other properties in the object literal.  So we use SymbolFlags.PropertyExcludes
                // so that it will conflict with any other object literal members with the same
                // name.
                return bindPropertyOrMethodOrAccessor(node as ts.Declaration, ts.SymbolFlags.Method | ((node as ts.MethodDeclaration).questionToken ? ts.SymbolFlags.Optional : ts.SymbolFlags.None),
                    ts.isObjectLiteralMethod(node) ? ts.SymbolFlags.PropertyExcludes : ts.SymbolFlags.MethodExcludes);
            case ts.SyntaxKind.FunctionDeclaration:
                return bindFunctionDeclaration(node as ts.FunctionDeclaration);
            case ts.SyntaxKind.Constructor:
                return declareSymbolAndAddToSymbolTable(node as ts.Declaration, ts.SymbolFlags.Constructor, /*symbolExcludes:*/ ts.SymbolFlags.None);
            case ts.SyntaxKind.GetAccessor:
                return bindPropertyOrMethodOrAccessor(node as ts.Declaration, ts.SymbolFlags.GetAccessor, ts.SymbolFlags.GetAccessorExcludes);
            case ts.SyntaxKind.SetAccessor:
                return bindPropertyOrMethodOrAccessor(node as ts.Declaration, ts.SymbolFlags.SetAccessor, ts.SymbolFlags.SetAccessorExcludes);
            case ts.SyntaxKind.FunctionType:
            case ts.SyntaxKind.JSDocFunctionType:
            case ts.SyntaxKind.JSDocSignature:
            case ts.SyntaxKind.ConstructorType:
                return bindFunctionOrConstructorType(node as ts.SignatureDeclaration | ts.JSDocSignature);
            case ts.SyntaxKind.TypeLiteral:
            case ts.SyntaxKind.JSDocTypeLiteral:
            case ts.SyntaxKind.MappedType:
                return bindAnonymousTypeWorker(node as ts.TypeLiteralNode | ts.MappedTypeNode | ts.JSDocTypeLiteral);
            case ts.SyntaxKind.JSDocClassTag:
                return bindJSDocClassTag(node as ts.JSDocClassTag);
            case ts.SyntaxKind.ObjectLiteralExpression:
                return bindObjectLiteralExpression(node as ts.ObjectLiteralExpression);
            case ts.SyntaxKind.FunctionExpression:
            case ts.SyntaxKind.ArrowFunction:
                return bindFunctionExpression(node as ts.FunctionExpression);

            case ts.SyntaxKind.CallExpression:
                const assignmentKind = ts.getAssignmentDeclarationKind(node as ts.CallExpression);
                switch (assignmentKind) {
                    case ts.AssignmentDeclarationKind.ObjectDefinePropertyValue:
                        return bindObjectDefinePropertyAssignment(node as ts.BindableObjectDefinePropertyCall);
                    case ts.AssignmentDeclarationKind.ObjectDefinePropertyExports:
                        return bindObjectDefinePropertyExport(node as ts.BindableObjectDefinePropertyCall);
                    case ts.AssignmentDeclarationKind.ObjectDefinePrototypeProperty:
                        return bindObjectDefinePrototypeProperty(node as ts.BindableObjectDefinePropertyCall);
                    case ts.AssignmentDeclarationKind.None:
                        break; // Nothing to do
                    default:
                        return ts.Debug.fail("Unknown call expression assignment declaration kind");
                }
                if (ts.isInJSFile(node)) {
                    bindCallExpression(node as ts.CallExpression);
                }
                break;

            // Members of classes, interfaces, and modules
            case ts.SyntaxKind.ClassExpression:
            case ts.SyntaxKind.ClassDeclaration:
                // All classes are automatically in strict mode in ES6.
                inStrictMode = true;
                return bindClassLikeDeclaration(node as ts.ClassLikeDeclaration);
            case ts.SyntaxKind.InterfaceDeclaration:
                return bindBlockScopedDeclaration(node as ts.Declaration, ts.SymbolFlags.Interface, ts.SymbolFlags.InterfaceExcludes);
            case ts.SyntaxKind.TypeAliasDeclaration:
                return bindBlockScopedDeclaration(node as ts.Declaration, ts.SymbolFlags.TypeAlias, ts.SymbolFlags.TypeAliasExcludes);
            case ts.SyntaxKind.EnumDeclaration:
                return bindEnumDeclaration(node as ts.EnumDeclaration);
            case ts.SyntaxKind.ModuleDeclaration:
                return bindModuleDeclaration(node as ts.ModuleDeclaration);
            // Jsx-attributes
            case ts.SyntaxKind.JsxAttributes:
                return bindJsxAttributes(node as ts.JsxAttributes);
            case ts.SyntaxKind.JsxAttribute:
                return bindJsxAttribute(node as ts.JsxAttribute, ts.SymbolFlags.Property, ts.SymbolFlags.PropertyExcludes);

            // Imports and exports
            case ts.SyntaxKind.ImportEqualsDeclaration:
            case ts.SyntaxKind.NamespaceImport:
            case ts.SyntaxKind.ImportSpecifier:
            case ts.SyntaxKind.ExportSpecifier:
                return declareSymbolAndAddToSymbolTable(node as ts.Declaration, ts.SymbolFlags.Alias, ts.SymbolFlags.AliasExcludes);
            case ts.SyntaxKind.NamespaceExportDeclaration:
                return bindNamespaceExportDeclaration(node as ts.NamespaceExportDeclaration);
            case ts.SyntaxKind.ImportClause:
                return bindImportClause(node as ts.ImportClause);
            case ts.SyntaxKind.ExportDeclaration:
                return bindExportDeclaration(node as ts.ExportDeclaration);
            case ts.SyntaxKind.ExportAssignment:
                return bindExportAssignment(node as ts.ExportAssignment);
            case ts.SyntaxKind.SourceFile:
                updateStrictModeStatementList((node as ts.SourceFile).statements);
                return bindSourceFileIfExternalModule();
            case ts.SyntaxKind.Block:
                if (!ts.isFunctionLikeOrClassStaticBlockDeclaration(node.parent)) {
                    return;
                }
                // falls through
            case ts.SyntaxKind.ModuleBlock:
                return updateStrictModeStatementList((node as ts.Block | ts.ModuleBlock).statements);

            case ts.SyntaxKind.JSDocParameterTag:
                if (node.parent.kind === ts.SyntaxKind.JSDocSignature) {
                    return bindParameter(node as ts.JSDocParameterTag);
                }
                if (node.parent.kind !== ts.SyntaxKind.JSDocTypeLiteral) {
                    break;
                }
                // falls through
            case ts.SyntaxKind.JSDocPropertyTag:
                const propTag = node as ts.JSDocPropertyLikeTag;
                const flags = propTag.isBracketed || propTag.typeExpression && propTag.typeExpression.type.kind === ts.SyntaxKind.JSDocOptionalType ?
                    ts.SymbolFlags.Property | ts.SymbolFlags.Optional :
                    ts.SymbolFlags.Property;
                return declareSymbolAndAddToSymbolTable(propTag, flags, ts.SymbolFlags.PropertyExcludes);
            case ts.SyntaxKind.JSDocTypedefTag:
            case ts.SyntaxKind.JSDocCallbackTag:
            case ts.SyntaxKind.JSDocEnumTag:
                return (delayedTypeAliases || (delayedTypeAliases = [])).push(node as ts.JSDocTypedefTag | ts.JSDocCallbackTag | ts.JSDocEnumTag);
        }
    }

    function bindPropertyWorker(node: ts.PropertyDeclaration | ts.PropertySignature) {
        const isAutoAccessor = ts.isAutoAccessorPropertyDeclaration(node);
        const includes = isAutoAccessor ? ts.SymbolFlags.Accessor : ts.SymbolFlags.Property;
        const excludes = isAutoAccessor ? ts.SymbolFlags.AccessorExcludes : ts.SymbolFlags.PropertyExcludes;
        return bindPropertyOrMethodOrAccessor(node, includes | (node.questionToken ? ts.SymbolFlags.Optional : ts.SymbolFlags.None), excludes);
    }

    function bindAnonymousTypeWorker(node: ts.TypeLiteralNode | ts.MappedTypeNode | ts.JSDocTypeLiteral) {
        return bindAnonymousDeclaration(node as ts.Declaration, ts.SymbolFlags.TypeLiteral, ts.InternalSymbolName.Type);
    }

    function bindSourceFileIfExternalModule() {
        setExportContextFlag(file);
        if (ts.isExternalModule(file)) {
            bindSourceFileAsExternalModule();
        }
        else if (ts.isJsonSourceFile(file)) {
            bindSourceFileAsExternalModule();
            // Create symbol equivalent for the module.exports = {}
            const originalSymbol = file.symbol;
            declareSymbol(file.symbol.exports!, file.symbol, file, ts.SymbolFlags.Property, ts.SymbolFlags.All);
            file.symbol = originalSymbol;
        }
    }

    function bindSourceFileAsExternalModule() {
        bindAnonymousDeclaration(file, ts.SymbolFlags.ValueModule, `"${ts.removeFileExtension(file.fileName)}"` as ts.__String);
    }

    function bindExportAssignment(node: ts.ExportAssignment) {
        if (!container.symbol || !container.symbol.exports) {
            // Incorrect export assignment in some sort of block construct
            bindAnonymousDeclaration(node, ts.SymbolFlags.Value, getDeclarationName(node)!);
        }
        else {
            const flags = ts.exportAssignmentIsAlias(node)
                // An export default clause with an EntityNameExpression or a class expression exports all meanings of that identifier or expression;
                ? ts.SymbolFlags.Alias
                // An export default clause with any other expression exports a value
                : ts.SymbolFlags.Property;
            // If there is an `export default x;` alias declaration, can't `export default` anything else.
            // (In contrast, you can still have `export default function f() {}` and `export default interface I {}`.)
            const symbol = declareSymbol(container.symbol.exports, container.symbol, node, flags, ts.SymbolFlags.All);

            if (node.isExportEquals) {
                // Will be an error later, since the module already has other exports. Just make sure this has a valueDeclaration set.
                ts.setValueDeclaration(symbol, node);
            }
        }
    }

    function bindNamespaceExportDeclaration(node: ts.NamespaceExportDeclaration) {
        if (ts.some(node.modifiers)) {
            file.bindDiagnostics.push(createDiagnosticForNode(node, ts.Diagnostics.Modifiers_cannot_appear_here));
        }
        const diag = !ts.isSourceFile(node.parent) ? ts.Diagnostics.Global_module_exports_may_only_appear_at_top_level
            : !ts.isExternalModule(node.parent) ? ts.Diagnostics.Global_module_exports_may_only_appear_in_module_files
            : !node.parent.isDeclarationFile ? ts.Diagnostics.Global_module_exports_may_only_appear_in_declaration_files
            : undefined;
        if (diag) {
            file.bindDiagnostics.push(createDiagnosticForNode(node, diag));
        }
        else {
            file.symbol.globalExports = file.symbol.globalExports || ts.createSymbolTable();
            declareSymbol(file.symbol.globalExports, file.symbol, node, ts.SymbolFlags.Alias, ts.SymbolFlags.AliasExcludes);
        }
    }

    function bindExportDeclaration(node: ts.ExportDeclaration) {
        if (!container.symbol || !container.symbol.exports) {
            // Export * in some sort of block construct
            bindAnonymousDeclaration(node, ts.SymbolFlags.ExportStar, getDeclarationName(node)!);
        }
        else if (!node.exportClause) {
            // All export * declarations are collected in an __export symbol
            declareSymbol(container.symbol.exports, container.symbol, node, ts.SymbolFlags.ExportStar, ts.SymbolFlags.None);
        }
        else if (ts.isNamespaceExport(node.exportClause)) {
            // declareSymbol walks up parents to find name text, parent _must_ be set
            // but won't be set by the normal binder walk until `bindChildren` later on.
            ts.setParent(node.exportClause, node);
            declareSymbol(container.symbol.exports, container.symbol, node.exportClause, ts.SymbolFlags.Alias, ts.SymbolFlags.AliasExcludes);
        }
    }

    function bindImportClause(node: ts.ImportClause) {
        if (node.name) {
            declareSymbolAndAddToSymbolTable(node, ts.SymbolFlags.Alias, ts.SymbolFlags.AliasExcludes);
        }
    }

    function setCommonJsModuleIndicator(node: ts.Node) {
        if (file.externalModuleIndicator && file.externalModuleIndicator !== true) {
            return false;
        }
        if (!file.commonJsModuleIndicator) {
            file.commonJsModuleIndicator = node;
            if (!file.externalModuleIndicator) {
                bindSourceFileAsExternalModule();
            }
        }
        return true;
    }

    function bindObjectDefinePropertyExport(node: ts.BindableObjectDefinePropertyCall) {
        if (!setCommonJsModuleIndicator(node)) {
            return;
        }
        const symbol = forEachIdentifierInEntityName(node.arguments[0], /*parent*/ undefined, (id, symbol) => {
            if (symbol) {
                addDeclarationToSymbol(symbol, id, ts.SymbolFlags.Module | ts.SymbolFlags.Assignment);
            }
            return symbol;
        });
        if (symbol) {
            const flags = ts.SymbolFlags.Property | ts.SymbolFlags.ExportValue;
            declareSymbol(symbol.exports!, symbol, node, flags, ts.SymbolFlags.None);
        }
    }

    function bindExportsPropertyAssignment(node: ts.BindableStaticPropertyAssignmentExpression) {
        // When we create a property via 'exports.foo = bar', the 'exports.foo' property access
        // expression is the declaration
        if (!setCommonJsModuleIndicator(node)) {
            return;
        }
        const symbol = forEachIdentifierInEntityName(node.left.expression, /*parent*/ undefined, (id, symbol) => {
            if (symbol) {
                addDeclarationToSymbol(symbol, id, ts.SymbolFlags.Module | ts.SymbolFlags.Assignment);
            }
            return symbol;
        });
        if (symbol) {
            const isAlias = ts.isAliasableExpression(node.right) && (ts.isExportsIdentifier(node.left.expression) || ts.isModuleExportsAccessExpression(node.left.expression));
            const flags = isAlias ? ts.SymbolFlags.Alias : ts.SymbolFlags.Property | ts.SymbolFlags.ExportValue;
            ts.setParent(node.left, node);
            declareSymbol(symbol.exports!, symbol, node.left, flags, ts.SymbolFlags.None);
        }
    }

    function bindModuleExportsAssignment(node: ts.BindablePropertyAssignmentExpression) {
        // A common practice in node modules is to set 'export = module.exports = {}', this ensures that 'exports'
        // is still pointing to 'module.exports'.
        // We do not want to consider this as 'export=' since a module can have only one of these.
        // Similarly we do not want to treat 'module.exports = exports' as an 'export='.
        if (!setCommonJsModuleIndicator(node)) {
            return;
        }
        const assignedExpression = ts.getRightMostAssignedExpression(node.right);
        if (ts.isEmptyObjectLiteral(assignedExpression) || container === file && isExportsOrModuleExportsOrAlias(file, assignedExpression)) {
            return;
        }

        if (ts.isObjectLiteralExpression(assignedExpression) && ts.every(assignedExpression.properties, ts.isShorthandPropertyAssignment)) {
            ts.forEach(assignedExpression.properties, bindExportAssignedObjectMemberAlias);
            return;
        }

        // 'module.exports = expr' assignment
        const flags = ts.exportAssignmentIsAlias(node)
            ? ts.SymbolFlags.Alias // An export= with an EntityNameExpression or a ClassExpression exports all meanings of that identifier or class
            : ts.SymbolFlags.Property | ts.SymbolFlags.ExportValue | ts.SymbolFlags.ValueModule;
        const symbol = declareSymbol(file.symbol.exports!, file.symbol, node, flags | ts.SymbolFlags.Assignment, ts.SymbolFlags.None);
        ts.setValueDeclaration(symbol, node);
    }

    function bindExportAssignedObjectMemberAlias(node: ts.ShorthandPropertyAssignment) {
        declareSymbol(file.symbol.exports!, file.symbol, node, ts.SymbolFlags.Alias | ts.SymbolFlags.Assignment, ts.SymbolFlags.None);
    }

    function bindThisPropertyAssignment(node: ts.BindablePropertyAssignmentExpression | ts.PropertyAccessExpression | ts.LiteralLikeElementAccessExpression) {
        ts.Debug.assert(ts.isInJSFile(node));
        // private identifiers *must* be declared (even in JS files)
        const hasPrivateIdentifier = (ts.isBinaryExpression(node) && ts.isPropertyAccessExpression(node.left) && ts.isPrivateIdentifier(node.left.name))
            || (ts.isPropertyAccessExpression(node) && ts.isPrivateIdentifier(node.name));
        if (hasPrivateIdentifier) {
            return;
        }
        const thisContainer = ts.getThisContainer(node, /*includeArrowFunctions*/ false);
        switch (thisContainer.kind) {
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.FunctionExpression:
                let constructorSymbol: ts.Symbol | undefined = thisContainer.symbol;
                // For `f.prototype.m = function() { this.x = 0; }`, `this.x = 0` should modify `f`'s members, not the function expression.
                if (ts.isBinaryExpression(thisContainer.parent) && thisContainer.parent.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
                    const l = thisContainer.parent.left;
                    if (ts.isBindableStaticAccessExpression(l) && ts.isPrototypeAccess(l.expression)) {
                        constructorSymbol = lookupSymbolForPropertyAccess(l.expression.expression, thisParentContainer);
                    }
                }

                if (constructorSymbol && constructorSymbol.valueDeclaration) {
                    // Declare a 'member' if the container is an ES5 class or ES6 constructor
                    constructorSymbol.members = constructorSymbol.members || ts.createSymbolTable();
                    // It's acceptable for multiple 'this' assignments of the same identifier to occur
                    if (ts.hasDynamicName(node)) {
                        bindDynamicallyNamedThisPropertyAssignment(node, constructorSymbol, constructorSymbol.members);
                    }
                    else {
                        declareSymbol(constructorSymbol.members, constructorSymbol, node, ts.SymbolFlags.Property | ts.SymbolFlags.Assignment, ts.SymbolFlags.PropertyExcludes & ~ts.SymbolFlags.Property);
                    }
                    addDeclarationToSymbol(constructorSymbol, constructorSymbol.valueDeclaration, ts.SymbolFlags.Class);
                }
                break;

            case ts.SyntaxKind.Constructor:
            case ts.SyntaxKind.PropertyDeclaration:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.SetAccessor:
            case ts.SyntaxKind.ClassStaticBlockDeclaration:
                // this.foo assignment in a JavaScript class
                // Bind this property to the containing class
                const containingClass = thisContainer.parent;
                const symbolTable = ts.isStatic(thisContainer) ? containingClass.symbol.exports! : containingClass.symbol.members!;
                if (ts.hasDynamicName(node)) {
                    bindDynamicallyNamedThisPropertyAssignment(node, containingClass.symbol, symbolTable);
                }
                else {
                    declareSymbol(symbolTable, containingClass.symbol, node, ts.SymbolFlags.Property | ts.SymbolFlags.Assignment, ts.SymbolFlags.None, /*isReplaceableByMethod*/ true);
                }
                break;
            case ts.SyntaxKind.SourceFile:
                // this.property = assignment in a source file -- declare symbol in exports for a module, in locals for a script
                if (ts.hasDynamicName(node)) {
                    break;
                }
                else if ((thisContainer as ts.SourceFile).commonJsModuleIndicator) {
                    declareSymbol(thisContainer.symbol.exports!, thisContainer.symbol, node, ts.SymbolFlags.Property | ts.SymbolFlags.ExportValue, ts.SymbolFlags.None);
                }
                else {
                    declareSymbolAndAddToSymbolTable(node, ts.SymbolFlags.FunctionScopedVariable, ts.SymbolFlags.FunctionScopedVariableExcludes);
                }
                break;

            default:
                ts.Debug.failBadSyntaxKind(thisContainer);
        }
    }

    function bindDynamicallyNamedThisPropertyAssignment(node: ts.BinaryExpression | ts.DynamicNamedDeclaration, symbol: ts.Symbol, symbolTable: ts.SymbolTable) {
        declareSymbol(symbolTable, symbol, node, ts.SymbolFlags.Property, ts.SymbolFlags.None, /*isReplaceableByMethod*/ true, /*isComputedName*/ true);
        addLateBoundAssignmentDeclarationToSymbol(node, symbol);
    }

    function addLateBoundAssignmentDeclarationToSymbol(node: ts.BinaryExpression | ts.DynamicNamedDeclaration, symbol: ts.Symbol | undefined) {
        if (symbol) {
            (symbol.assignmentDeclarationMembers || (symbol.assignmentDeclarationMembers = new ts.Map())).set(ts.getNodeId(node), node);
        }
    }

    function bindSpecialPropertyDeclaration(node: ts.PropertyAccessExpression | ts.LiteralLikeElementAccessExpression) {
        if (node.expression.kind === ts.SyntaxKind.ThisKeyword) {
            bindThisPropertyAssignment(node);
        }
        else if (ts.isBindableStaticAccessExpression(node) && node.parent.parent.kind === ts.SyntaxKind.SourceFile) {
            if (ts.isPrototypeAccess(node.expression)) {
                bindPrototypePropertyAssignment(node, node.parent);
            }
            else {
                bindStaticPropertyAssignment(node);
            }
        }
    }

    /** For `x.prototype = { p, ... }`, declare members p,... if `x` is function/class/{}, or not declared. */
    function bindPrototypeAssignment(node: ts.BindableStaticPropertyAssignmentExpression) {
        ts.setParent(node.left, node);
        ts.setParent(node.right, node);
        bindPropertyAssignment(node.left.expression, node.left, /*isPrototypeProperty*/ false, /*containerIsClass*/ true);
    }

    function bindObjectDefinePrototypeProperty(node: ts.BindableObjectDefinePropertyCall) {
        const namespaceSymbol = lookupSymbolForPropertyAccess((node.arguments[0] as ts.PropertyAccessExpression).expression as ts.EntityNameExpression);
        if (namespaceSymbol && namespaceSymbol.valueDeclaration) {
            // Ensure the namespace symbol becomes class-like
            addDeclarationToSymbol(namespaceSymbol, namespaceSymbol.valueDeclaration, ts.SymbolFlags.Class);
        }
        bindPotentiallyNewExpandoMemberToNamespace(node, namespaceSymbol, /*isPrototypeProperty*/ true);
    }

    /**
     * For `x.prototype.y = z`, declare a member `y` on `x` if `x` is a function or class, or not declared.
     * Note that jsdoc preceding an ExpressionStatement like `x.prototype.y;` is also treated as a declaration.
     */
    function bindPrototypePropertyAssignment(lhs: ts.BindableStaticAccessExpression, parent: ts.Node) {
        // Look up the function in the local scope, since prototype assignments should
        // follow the function declaration
        const classPrototype = lhs.expression as ts.BindableStaticAccessExpression;
        const constructorFunction = classPrototype.expression;

        // Fix up parent pointers since we're going to use these nodes before we bind into them
        ts.setParent(constructorFunction, classPrototype);
        ts.setParent(classPrototype, lhs);
        ts.setParent(lhs, parent);

        bindPropertyAssignment(constructorFunction, lhs, /*isPrototypeProperty*/ true, /*containerIsClass*/ true);
    }

    function bindObjectDefinePropertyAssignment(node: ts.BindableObjectDefinePropertyCall) {
        let namespaceSymbol = lookupSymbolForPropertyAccess(node.arguments[0]);
        const isToplevel = node.parent.parent.kind === ts.SyntaxKind.SourceFile;
        namespaceSymbol = bindPotentiallyMissingNamespaces(namespaceSymbol, node.arguments[0], isToplevel, /*isPrototypeProperty*/ false, /*containerIsClass*/ false);
        bindPotentiallyNewExpandoMemberToNamespace(node, namespaceSymbol, /*isPrototypeProperty*/ false);
    }

    function bindSpecialPropertyAssignment(node: ts.BindablePropertyAssignmentExpression) {
        // Class declarations in Typescript do not allow property declarations
        const parentSymbol = lookupSymbolForPropertyAccess(node.left.expression, container) || lookupSymbolForPropertyAccess(node.left.expression, blockScopeContainer) ;
        if (!ts.isInJSFile(node) && !ts.isFunctionSymbol(parentSymbol)) {
            return;
        }
        const rootExpr = ts.getLeftmostAccessExpression(node.left);
        if (ts.isIdentifier(rootExpr) && lookupSymbolForName(container, rootExpr.escapedText)?.flags! & ts.SymbolFlags.Alias) {
            return;
        }
        // Fix up parent pointers since we're going to use these nodes before we bind into them
        ts.setParent(node.left, node);
        ts.setParent(node.right, node);
        if (ts.isIdentifier(node.left.expression) && container === file && isExportsOrModuleExportsOrAlias(file, node.left.expression)) {
            // This can be an alias for the 'exports' or 'module.exports' names, e.g.
            //    var util = module.exports;
            //    util.property = function ...
            bindExportsPropertyAssignment(node as ts.BindableStaticPropertyAssignmentExpression);
        }
        else if (ts.hasDynamicName(node)) {
            bindAnonymousDeclaration(node, ts.SymbolFlags.Property | ts.SymbolFlags.Assignment, ts.InternalSymbolName.Computed);
            const sym = bindPotentiallyMissingNamespaces(parentSymbol, node.left.expression, isTopLevelNamespaceAssignment(node.left), /*isPrototype*/ false, /*containerIsClass*/ false);
            addLateBoundAssignmentDeclarationToSymbol(node, sym);
        }
        else {
            bindStaticPropertyAssignment(ts.cast(node.left, ts.isBindableStaticNameExpression));
        }
    }

    /**
     * For nodes like `x.y = z`, declare a member 'y' on 'x' if x is a function (or IIFE) or class or {}, or not declared.
     * Also works for expression statements preceded by JSDoc, like / ** @type number * / x.y;
     */
    function bindStaticPropertyAssignment(node: ts.BindableStaticNameExpression) {
        ts.Debug.assert(!ts.isIdentifier(node));
        ts.setParent(node.expression, node);
        bindPropertyAssignment(node.expression, node, /*isPrototypeProperty*/ false, /*containerIsClass*/ false);
    }

    function bindPotentiallyMissingNamespaces(namespaceSymbol: ts.Symbol | undefined, entityName: ts.BindableStaticNameExpression, isToplevel: boolean, isPrototypeProperty: boolean, containerIsClass: boolean) {
        if (namespaceSymbol?.flags! & ts.SymbolFlags.Alias) {
            return namespaceSymbol;
        }
        if (isToplevel && !isPrototypeProperty) {
            // make symbols or add declarations for intermediate containers
            const flags = ts.SymbolFlags.Module | ts.SymbolFlags.Assignment;
            const excludeFlags = ts.SymbolFlags.ValueModuleExcludes & ~ts.SymbolFlags.Assignment;
            namespaceSymbol = forEachIdentifierInEntityName(entityName, namespaceSymbol, (id, symbol, parent) => {
                if (symbol) {
                    addDeclarationToSymbol(symbol, id, flags);
                    return symbol;
                }
                else {
                    const table = parent ? parent.exports! :
                        file.jsGlobalAugmentations || (file.jsGlobalAugmentations = ts.createSymbolTable());
                    return declareSymbol(table, parent, id, flags, excludeFlags);
                }
            });
        }
        if (containerIsClass && namespaceSymbol && namespaceSymbol.valueDeclaration) {
            addDeclarationToSymbol(namespaceSymbol, namespaceSymbol.valueDeclaration, ts.SymbolFlags.Class);
        }
        return namespaceSymbol;
    }

    function bindPotentiallyNewExpandoMemberToNamespace(declaration: ts.BindableStaticAccessExpression | ts.CallExpression, namespaceSymbol: ts.Symbol | undefined, isPrototypeProperty: boolean) {
        if (!namespaceSymbol || !isExpandoSymbol(namespaceSymbol)) {
            return;
        }

        // Set up the members collection if it doesn't exist already
        const symbolTable = isPrototypeProperty ?
            (namespaceSymbol.members || (namespaceSymbol.members = ts.createSymbolTable())) :
            (namespaceSymbol.exports || (namespaceSymbol.exports = ts.createSymbolTable()));

        let includes = ts.SymbolFlags.None;
        let excludes = ts.SymbolFlags.None;
        // Method-like
        if (ts.isFunctionLikeDeclaration(ts.getAssignedExpandoInitializer(declaration)!)) {
            includes = ts.SymbolFlags.Method;
            excludes = ts.SymbolFlags.MethodExcludes;
        }
        // Maybe accessor-like
        else if (ts.isCallExpression(declaration) && ts.isBindableObjectDefinePropertyCall(declaration)) {
            if (ts.some(declaration.arguments[2].properties, p => {
                const id = ts.getNameOfDeclaration(p);
                return !!id && ts.isIdentifier(id) && ts.idText(id) === "set";
            })) {
                // We mix in `SymbolFLags.Property` so in the checker `getTypeOfVariableParameterOrProperty` is used for this
                // symbol, instead of `getTypeOfAccessor` (which will assert as there is no real accessor declaration)
                includes |= ts.SymbolFlags.SetAccessor | ts.SymbolFlags.Property;
                excludes |= ts.SymbolFlags.SetAccessorExcludes;
            }
            if (ts.some(declaration.arguments[2].properties, p => {
                const id = ts.getNameOfDeclaration(p);
                return !!id && ts.isIdentifier(id) && ts.idText(id) === "get";
            })) {
                includes |= ts.SymbolFlags.GetAccessor | ts.SymbolFlags.Property;
                excludes |= ts.SymbolFlags.GetAccessorExcludes;
            }
        }

        if (includes === ts.SymbolFlags.None) {
            includes = ts.SymbolFlags.Property;
            excludes = ts.SymbolFlags.PropertyExcludes;
        }

        declareSymbol(symbolTable, namespaceSymbol, declaration, includes | ts.SymbolFlags.Assignment, excludes & ~ts.SymbolFlags.Assignment);
    }

    function isTopLevelNamespaceAssignment(propertyAccess: ts.BindableAccessExpression) {
        return ts.isBinaryExpression(propertyAccess.parent)
            ? getParentOfBinaryExpression(propertyAccess.parent).parent.kind === ts.SyntaxKind.SourceFile
            : propertyAccess.parent.parent.kind === ts.SyntaxKind.SourceFile;
    }

    function bindPropertyAssignment(name: ts.BindableStaticNameExpression, propertyAccess: ts.BindableStaticAccessExpression, isPrototypeProperty: boolean, containerIsClass: boolean) {
        let namespaceSymbol = lookupSymbolForPropertyAccess(name, container) || lookupSymbolForPropertyAccess(name, blockScopeContainer);
        const isToplevel = isTopLevelNamespaceAssignment(propertyAccess);
        namespaceSymbol = bindPotentiallyMissingNamespaces(namespaceSymbol, propertyAccess.expression, isToplevel, isPrototypeProperty, containerIsClass);
        bindPotentiallyNewExpandoMemberToNamespace(propertyAccess, namespaceSymbol, isPrototypeProperty);
    }

    /**
     * Javascript expando values are:
     * - Functions
     * - classes
     * - namespaces
     * - variables initialized with function expressions
     * -                       with class expressions
     * -                       with empty object literals
     * -                       with non-empty object literals if assigned to the prototype property
     */
    function isExpandoSymbol(symbol: ts.Symbol): boolean {
        if (symbol.flags & (ts.SymbolFlags.Function | ts.SymbolFlags.Class | ts.SymbolFlags.NamespaceModule)) {
            return true;
        }
        const node = symbol.valueDeclaration;
        if (node && ts.isCallExpression(node)) {
            return !!ts.getAssignedExpandoInitializer(node);
        }
        let init = !node ? undefined :
            ts.isVariableDeclaration(node) ? node.initializer :
            ts.isBinaryExpression(node) ? node.right :
            ts.isPropertyAccessExpression(node) && ts.isBinaryExpression(node.parent) ? node.parent.right :
            undefined;
        init = init && ts.getRightMostAssignedExpression(init);
        if (init) {
            const isPrototypeAssignment = ts.isPrototypeAccess(ts.isVariableDeclaration(node!) ? node.name : ts.isBinaryExpression(node!) ? node.left : node!);
            return !!ts.getExpandoInitializer(ts.isBinaryExpression(init) && (init.operatorToken.kind === ts.SyntaxKind.BarBarToken || init.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken) ? init.right : init, isPrototypeAssignment);
        }
        return false;
    }

    function getParentOfBinaryExpression(expr: ts.Node) {
        while (ts.isBinaryExpression(expr.parent)) {
            expr = expr.parent;
        }
        return expr.parent;
    }

    function lookupSymbolForPropertyAccess(node: ts.BindableStaticNameExpression, lookupContainer: ts.Node = container): ts.Symbol | undefined {
        if (ts.isIdentifier(node)) {
            return lookupSymbolForName(lookupContainer, node.escapedText);
        }
        else {
            const symbol = lookupSymbolForPropertyAccess(node.expression);
            return symbol && symbol.exports && symbol.exports.get(ts.getElementOrPropertyAccessName(node));
        }
    }

    function forEachIdentifierInEntityName(e: ts.BindableStaticNameExpression, parent: ts.Symbol | undefined, action: (e: ts.Declaration, symbol: ts.Symbol | undefined, parent: ts.Symbol | undefined) => ts.Symbol | undefined): ts.Symbol | undefined {
        if (isExportsOrModuleExportsOrAlias(file, e)) {
            return file.symbol;
        }
        else if (ts.isIdentifier(e)) {
            return action(e, lookupSymbolForPropertyAccess(e), parent);
        }
        else {
            const s = forEachIdentifierInEntityName(e.expression, parent, action);
            const name = ts.getNameOrArgument(e);
            // unreachable
            if (ts.isPrivateIdentifier(name)) {
                ts.Debug.fail("unexpected PrivateIdentifier");
            }
            return action(name, s && s.exports && s.exports.get(ts.getElementOrPropertyAccessName(e)), s);
        }
    }

    function bindCallExpression(node: ts.CallExpression) {
        // We're only inspecting call expressions to detect CommonJS modules, so we can skip
        // this check if we've already seen the module indicator
        if (!file.commonJsModuleIndicator && ts.isRequireCall(node, /*checkArgumentIsStringLiteralLike*/ false)) {
            setCommonJsModuleIndicator(node);
        }
    }

    function bindClassLikeDeclaration(node: ts.ClassLikeDeclaration) {
        if (node.kind === ts.SyntaxKind.ClassDeclaration) {
            bindBlockScopedDeclaration(node, ts.SymbolFlags.Class, ts.SymbolFlags.ClassExcludes);
        }
        else {
            const bindingName = node.name ? node.name.escapedText : ts.InternalSymbolName.Class;
            bindAnonymousDeclaration(node, ts.SymbolFlags.Class, bindingName);
            // Add name of class expression into the map for semantic classifier
            if (node.name) {
                classifiableNames.add(node.name.escapedText);
            }
        }

        const { symbol } = node;

        // TypeScript 1.0 spec (April 2014): 8.4
        // Every class automatically contains a static property member named 'prototype', the
        // type of which is an instantiation of the class type with type Any supplied as a type
        // argument for each type parameter. It is an error to explicitly declare a static
        // property member with the name 'prototype'.
        //
        // Note: we check for this here because this class may be merging into a module.  The
        // module might have an exported variable called 'prototype'.  We can't allow that as
        // that would clash with the built-in 'prototype' for the class.
        const prototypeSymbol = createSymbol(ts.SymbolFlags.Property | ts.SymbolFlags.Prototype, "prototype" as ts.__String);
        const symbolExport = symbol.exports!.get(prototypeSymbol.escapedName);
        if (symbolExport) {
            if (node.name) {
                ts.setParent(node.name, node);
            }
            file.bindDiagnostics.push(createDiagnosticForNode(symbolExport.declarations![0], ts.Diagnostics.Duplicate_identifier_0, ts.symbolName(prototypeSymbol)));
        }
        symbol.exports!.set(prototypeSymbol.escapedName, prototypeSymbol);
        prototypeSymbol.parent = symbol;
    }

    function bindEnumDeclaration(node: ts.EnumDeclaration) {
        return ts.isEnumConst(node)
            ? bindBlockScopedDeclaration(node, ts.SymbolFlags.ConstEnum, ts.SymbolFlags.ConstEnumExcludes)
            : bindBlockScopedDeclaration(node, ts.SymbolFlags.RegularEnum, ts.SymbolFlags.RegularEnumExcludes);
    }

    function bindVariableDeclarationOrBindingElement(node: ts.VariableDeclaration | ts.BindingElement) {
        if (inStrictMode) {
            checkStrictModeEvalOrArguments(node, node.name);
        }

        if (!ts.isBindingPattern(node.name)) {
            const possibleVariableDecl = node.kind === ts.SyntaxKind.VariableDeclaration ? node : node.parent.parent;
            if (ts.isInJSFile(node) &&
                ts.isVariableDeclarationInitializedToBareOrAccessedRequire(possibleVariableDecl) &&
                !ts.getJSDocTypeTag(node) &&
                !(ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export)
            ) {
                declareSymbolAndAddToSymbolTable(node as ts.Declaration, ts.SymbolFlags.Alias, ts.SymbolFlags.AliasExcludes);
            }
            else if (ts.isBlockOrCatchScoped(node)) {
                bindBlockScopedDeclaration(node, ts.SymbolFlags.BlockScopedVariable, ts.SymbolFlags.BlockScopedVariableExcludes);
            }
            else if (ts.isParameterDeclaration(node)) {
                // It is safe to walk up parent chain to find whether the node is a destructuring parameter declaration
                // because its parent chain has already been set up, since parents are set before descending into children.
                //
                // If node is a binding element in parameter declaration, we need to use ParameterExcludes.
                // Using ParameterExcludes flag allows the compiler to report an error on duplicate identifiers in Parameter Declaration
                // For example:
                //      function foo([a,a]) {} // Duplicate Identifier error
                //      function bar(a,a) {}   // Duplicate Identifier error, parameter declaration in this case is handled in bindParameter
                //                             // which correctly set excluded symbols
                declareSymbolAndAddToSymbolTable(node, ts.SymbolFlags.FunctionScopedVariable, ts.SymbolFlags.ParameterExcludes);
            }
            else {
                declareSymbolAndAddToSymbolTable(node, ts.SymbolFlags.FunctionScopedVariable, ts.SymbolFlags.FunctionScopedVariableExcludes);
            }
        }
    }

    function bindParameter(node: ts.ParameterDeclaration | ts.JSDocParameterTag) {
        if (node.kind === ts.SyntaxKind.JSDocParameterTag && container.kind !== ts.SyntaxKind.JSDocSignature) {
            return;
        }
        if (inStrictMode && !(node.flags & ts.NodeFlags.Ambient)) {
            // It is a SyntaxError if the identifier eval or arguments appears within a FormalParameterList of a
            // strict mode FunctionLikeDeclaration or FunctionExpression(13.1)
            checkStrictModeEvalOrArguments(node, node.name);
        }

        if (ts.isBindingPattern(node.name)) {
            bindAnonymousDeclaration(node, ts.SymbolFlags.FunctionScopedVariable, "__" + (node as ts.ParameterDeclaration).parent.parameters.indexOf(node as ts.ParameterDeclaration) as ts.__String);
        }
        else {
            declareSymbolAndAddToSymbolTable(node, ts.SymbolFlags.FunctionScopedVariable, ts.SymbolFlags.ParameterExcludes);
        }

        // If this is a property-parameter, then also declare the property symbol into the
        // containing class.
        if (ts.isParameterPropertyDeclaration(node, node.parent)) {
            const classDeclaration = node.parent.parent;
            declareSymbol(classDeclaration.symbol.members!, classDeclaration.symbol, node, ts.SymbolFlags.Property | (node.questionToken ? ts.SymbolFlags.Optional : ts.SymbolFlags.None), ts.SymbolFlags.PropertyExcludes);
        }
    }

    function bindFunctionDeclaration(node: ts.FunctionDeclaration) {
        if (!file.isDeclarationFile && !(node.flags & ts.NodeFlags.Ambient)) {
            if (ts.isAsyncFunction(node)) {
                emitFlags |= ts.NodeFlags.HasAsyncFunctions;
            }
        }

        checkStrictModeFunctionName(node);
        if (inStrictMode) {
            checkStrictModeFunctionDeclaration(node);
            bindBlockScopedDeclaration(node, ts.SymbolFlags.Function, ts.SymbolFlags.FunctionExcludes);
        }
        else {
            declareSymbolAndAddToSymbolTable(node, ts.SymbolFlags.Function, ts.SymbolFlags.FunctionExcludes);
        }
    }

    function bindFunctionExpression(node: ts.FunctionExpression) {
        if (!file.isDeclarationFile && !(node.flags & ts.NodeFlags.Ambient)) {
            if (ts.isAsyncFunction(node)) {
                emitFlags |= ts.NodeFlags.HasAsyncFunctions;
            }
        }
        if (currentFlow) {
            node.flowNode = currentFlow;
        }
        checkStrictModeFunctionName(node);
        const bindingName = node.name ? node.name.escapedText : ts.InternalSymbolName.Function;
        return bindAnonymousDeclaration(node, ts.SymbolFlags.Function, bindingName);
    }

    function bindPropertyOrMethodOrAccessor(node: ts.Declaration, symbolFlags: ts.SymbolFlags, symbolExcludes: ts.SymbolFlags) {
        if (!file.isDeclarationFile && !(node.flags & ts.NodeFlags.Ambient) && ts.isAsyncFunction(node)) {
            emitFlags |= ts.NodeFlags.HasAsyncFunctions;
        }

        if (currentFlow && ts.isObjectLiteralOrClassExpressionMethodOrAccessor(node)) {
            node.flowNode = currentFlow;
        }

        return ts.hasDynamicName(node)
            ? bindAnonymousDeclaration(node, symbolFlags, ts.InternalSymbolName.Computed)
            : declareSymbolAndAddToSymbolTable(node, symbolFlags, symbolExcludes);
    }

    function getInferTypeContainer(node: ts.Node): ts.ConditionalTypeNode | undefined {
        const extendsType = ts.findAncestor(node, n => n.parent && ts.isConditionalTypeNode(n.parent) && n.parent.extendsType === n);
        return extendsType && extendsType.parent as ts.ConditionalTypeNode;
    }

    function bindTypeParameter(node: ts.TypeParameterDeclaration) {
        if (ts.isJSDocTemplateTag(node.parent)) {
            const container = ts.getEffectiveContainerForJSDocTemplateTag(node.parent);
            if (container) {
                if (!container.locals) {
                    container.locals = ts.createSymbolTable();
                }
                declareSymbol(container.locals, /*parent*/ undefined, node, ts.SymbolFlags.TypeParameter, ts.SymbolFlags.TypeParameterExcludes);
            }
            else {
                declareSymbolAndAddToSymbolTable(node, ts.SymbolFlags.TypeParameter, ts.SymbolFlags.TypeParameterExcludes);
            }
        }
        else if (node.parent.kind === ts.SyntaxKind.InferType) {
            const container = getInferTypeContainer(node.parent);
            if (container) {
                if (!container.locals) {
                    container.locals = ts.createSymbolTable();
                }
                declareSymbol(container.locals, /*parent*/ undefined, node, ts.SymbolFlags.TypeParameter, ts.SymbolFlags.TypeParameterExcludes);
            }
            else {
                bindAnonymousDeclaration(node, ts.SymbolFlags.TypeParameter, getDeclarationName(node)!); // TODO: GH#18217
            }
        }
        else {
            declareSymbolAndAddToSymbolTable(node, ts.SymbolFlags.TypeParameter, ts.SymbolFlags.TypeParameterExcludes);
        }
    }

    // reachability checks

    function shouldReportErrorOnModuleDeclaration(node: ts.ModuleDeclaration): boolean {
        const instanceState = getModuleInstanceState(node);
        return instanceState === ModuleInstanceState.Instantiated || (instanceState === ModuleInstanceState.ConstEnumOnly && ts.shouldPreserveConstEnums(options));
    }

    function checkUnreachable(node: ts.Node): boolean {
        if (!(currentFlow.flags & ts.FlowFlags.Unreachable)) {
            return false;
        }
        if (currentFlow === unreachableFlow) {
            const reportError =
                // report error on all statements except empty ones
                (ts.isStatementButNotDeclaration(node) && node.kind !== ts.SyntaxKind.EmptyStatement) ||
                // report error on class declarations
                node.kind === ts.SyntaxKind.ClassDeclaration ||
                // report error on instantiated modules or const-enums only modules if preserveConstEnums is set
                (node.kind === ts.SyntaxKind.ModuleDeclaration && shouldReportErrorOnModuleDeclaration(node as ts.ModuleDeclaration));

            if (reportError) {
                currentFlow = reportedUnreachableFlow;

                if (!options.allowUnreachableCode) {
                    // unreachable code is reported if
                    // - user has explicitly asked about it AND
                    // - statement is in not ambient context (statements in ambient context is already an error
                    //   so we should not report extras) AND
                    //   - node is not variable statement OR
                    //   - node is block scoped variable statement OR
                    //   - node is not block scoped variable statement and at least one variable declaration has initializer
                    //   Rationale: we don't want to report errors on non-initialized var's since they are hoisted
                    //   On the other side we do want to report errors on non-initialized 'lets' because of TDZ
                    const isError =
                        ts.unreachableCodeIsError(options) &&
                        !(node.flags & ts.NodeFlags.Ambient) &&
                        (
                            !ts.isVariableStatement(node) ||
                            !!(ts.getCombinedNodeFlags(node.declarationList) & ts.NodeFlags.BlockScoped) ||
                            node.declarationList.declarations.some(d => !!d.initializer)
                        );

                    eachUnreachableRange(node, (start, end) => errorOrSuggestionOnRange(isError, start, end, ts.Diagnostics.Unreachable_code_detected));
                }
            }
        }
        return true;
    }
}

function eachUnreachableRange(node: ts.Node, cb: (start: ts.Node, last: ts.Node) => void): void {
    if (ts.isStatement(node) && isExecutableStatement(node) && ts.isBlock(node.parent)) {
        const { statements } = node.parent;
        const slice = ts.sliceAfter(statements, node);
        ts.getRangesWhere(slice, isExecutableStatement, (start, afterEnd) => cb(slice[start], slice[afterEnd - 1]));
    }
    else {
        cb(node, node);
    }
}
// As opposed to a pure declaration like an `interface`
function isExecutableStatement(s: ts.Statement): boolean {
    // Don't remove statements that can validly be used before they appear.
    return !ts.isFunctionDeclaration(s) && !isPurelyTypeDeclaration(s) && !ts.isEnumDeclaration(s) &&
        // `var x;` may declare a variable used above
        !(ts.isVariableStatement(s) && !(ts.getCombinedNodeFlags(s) & (ts.NodeFlags.Let | ts.NodeFlags.Const)) && s.declarationList.declarations.some(d => !d.initializer));
}

function isPurelyTypeDeclaration(s: ts.Statement): boolean {
    switch (s.kind) {
        case ts.SyntaxKind.InterfaceDeclaration:
        case ts.SyntaxKind.TypeAliasDeclaration:
            return true;
        case ts.SyntaxKind.ModuleDeclaration:
            return getModuleInstanceState(s as ts.ModuleDeclaration) !== ModuleInstanceState.Instantiated;
        case ts.SyntaxKind.EnumDeclaration:
            return ts.hasSyntacticModifier(s, ts.ModifierFlags.Const);
        default:
            return false;
    }
}

/** @internal */
export function isExportsOrModuleExportsOrAlias(sourceFile: ts.SourceFile, node: ts.Expression): boolean {
    let i = 0;
    const q = ts.createQueue<ts.Expression>();
    q.enqueue(node);
    while (!q.isEmpty() && i < 100) {
        i++;
        node = q.dequeue();
        if (ts.isExportsIdentifier(node) || ts.isModuleExportsAccessExpression(node)) {
            return true;
        }
        else if (ts.isIdentifier(node)) {
            const symbol = lookupSymbolForName(sourceFile, node.escapedText);
            if (!!symbol && !!symbol.valueDeclaration && ts.isVariableDeclaration(symbol.valueDeclaration) && !!symbol.valueDeclaration.initializer) {
                const init = symbol.valueDeclaration.initializer;
                q.enqueue(init);
                if (ts.isAssignmentExpression(init, /*excludeCompoundAssignment*/ true)) {
                    q.enqueue(init.left);
                    q.enqueue(init.right);
                }
            }
        }
    }
    return false;
}

function lookupSymbolForName(container: ts.Node, name: ts.__String): ts.Symbol | undefined {
    const local = container.locals && container.locals.get(name);
    if (local) {
        return local.exportSymbol || local;
    }
    if (ts.isSourceFile(container) && container.jsGlobalAugmentations && container.jsGlobalAugmentations.has(name)) {
        return container.jsGlobalAugmentations.get(name);
    }
    return container.symbol && container.symbol.exports && container.symbol.exports.get(name);
}
