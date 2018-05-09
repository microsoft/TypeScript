/* @internal */
namespace ts {
    export const enum ModuleInstanceState {
        NonInstantiated = 0,
        Instantiated = 1,
        ConstEnumOnly = 2
    }

    interface ActiveLabel {
        name: __String;
        breakTarget: FlowLabel;
        continueTarget: FlowLabel;
        referenced: boolean;
    }

    export function getModuleInstanceState(node: ModuleDeclaration): ModuleInstanceState {
        return node.body ? getModuleInstanceStateWorker(node.body) : ModuleInstanceState.Instantiated;
    }

    function getModuleInstanceStateWorker(node: Node): ModuleInstanceState {
        // A module is uninstantiated if it contains only
        switch (node.kind) {
            // 1. interface declarations, type alias declarations
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.TypeAliasDeclaration:
                return ModuleInstanceState.NonInstantiated;
            // 2. const enum declarations
            case SyntaxKind.EnumDeclaration:
                if (isConst(node)) {
                    return ModuleInstanceState.ConstEnumOnly;
                }
                break;
            // 3. non-exported import declarations
            case SyntaxKind.ImportDeclaration:
            case SyntaxKind.ImportEqualsDeclaration:
                if (!(hasModifier(node, ModifierFlags.Export))) {
                    return ModuleInstanceState.NonInstantiated;
                }
                break;
            // 4. other uninstantiated module declarations.
            case SyntaxKind.ModuleBlock: {
                let state = ModuleInstanceState.NonInstantiated;
                forEachChild(node, n => {
                    const childState = getModuleInstanceStateWorker(n);
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
                return getModuleInstanceState(node as ModuleDeclaration);
            case SyntaxKind.Identifier:
                // Only jsdoc typedef definition can exist in jsdoc namespace, and it should
                // be considered the same as type alias
                if ((<Identifier>node).isInJSDocNamespace) {
                    return ModuleInstanceState.NonInstantiated;
                }
        }
        return ModuleInstanceState.Instantiated;
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
        IsObjectLiteralOrClassExpressionMethod = 1 << 7,
    }

    const binder = createBinder();

    export function bindSourceFile(file: SourceFile, options: CompilerOptions) {
        performance.mark("beforeBind");
        binder(file, options);
        performance.mark("afterBind");
        performance.measure("Bind", "beforeBind", "afterBind");
    }

    function createBinder(): (file: SourceFile, options: CompilerOptions) => void {
        let file: SourceFile;
        let options: CompilerOptions;
        let languageVersion: ScriptTarget;
        let parent: Node;
        let container: Node;
        let thisParentContainer: Node; // Container one level up
        let blockScopeContainer: Node;
        let lastContainer: Node;
        let delayedTypedefs: { typedef: JSDocTypedefTag, container: Node, lastContainer: Node, blockScopeContainer: Node, parent: Node }[];
        let seenThisKeyword: boolean;

        // state used by control flow analysis
        let currentFlow: FlowNode;
        let currentBreakTarget: FlowLabel;
        let currentContinueTarget: FlowLabel;
        let currentReturnTarget: FlowLabel;
        let currentTrueTarget: FlowLabel;
        let currentFalseTarget: FlowLabel;
        let preSwitchCaseFlow: FlowNode;
        let activeLabels: ActiveLabel[];
        let hasExplicitReturn: boolean;

        // state used for emit helpers
        let emitFlags: NodeFlags;

        // If this file is an external module, then it is automatically in strict-mode according to
        // ES6.  If it is not an external module, then we'll determine if it is in strict mode or
        // not depending on if we see "use strict" in certain places or if we hit a class/namespace
        // or if compiler options contain alwaysStrict.
        let inStrictMode: boolean;

        let symbolCount = 0;

        let Symbol: { new (flags: SymbolFlags, name: __String): Symbol }; // tslint:disable-line variable-name
        let classifiableNames: UnderscoreEscapedMap<true>;

        const unreachableFlow: FlowNode = { flags: FlowFlags.Unreachable };
        const reportedUnreachableFlow: FlowNode = { flags: FlowFlags.Unreachable };

        // state used to aggregate transform flags during bind.
        let subtreeTransformFlags: TransformFlags = TransformFlags.None;
        let skipTransformFlagAggregation: boolean;

        /**
         * Inside the binder, we may create a diagnostic for an as-yet unbound node (with potentially no parent pointers, implying no accessible source file)
         * If so, the node _must_ be in the current file (as that's the only way anything could have traversed to it to yield it as the error node)
         * This version of `createDiagnosticForNode` uses the binder's context to account for this, and always yields correct diagnostics even in these situations.
         */
        function createDiagnosticForNode(node: Node, message: DiagnosticMessage, arg0?: string | number, arg1?: string | number, arg2?: string | number): Diagnostic {
            return createDiagnosticForNodeInSourceFile(getSourceFileOfNode(node) || file, node, message, arg0, arg1, arg2);
        }

        function bindSourceFile(f: SourceFile, opts: CompilerOptions) {
            file = f;
            options = opts;
            languageVersion = getEmitScriptTarget(options);
            inStrictMode = bindInStrictMode(file, opts);
            classifiableNames = createUnderscoreEscapedMap<true>();
            symbolCount = 0;
            skipTransformFlagAggregation = file.isDeclarationFile;

            Symbol = objectAllocator.getSymbolConstructor();

            if (!file.locals) {
                bind(file);
                file.symbolCount = symbolCount;
                file.classifiableNames = classifiableNames;
                delayedBindJSDocTypedefTag();
            }

            file = undefined;
            options = undefined;
            languageVersion = undefined;
            parent = undefined;
            container = undefined;
            thisParentContainer = undefined;
            blockScopeContainer = undefined;
            lastContainer = undefined;
            delayedTypedefs = undefined;
            seenThisKeyword = false;
            currentFlow = undefined;
            currentBreakTarget = undefined;
            currentContinueTarget = undefined;
            currentReturnTarget = undefined;
            currentTrueTarget = undefined;
            currentFalseTarget = undefined;
            activeLabels = undefined;
            hasExplicitReturn = false;
            emitFlags = NodeFlags.None;
            subtreeTransformFlags = TransformFlags.None;
        }

        return bindSourceFile;

        function bindInStrictMode(file: SourceFile, opts: CompilerOptions): boolean {
            if (getStrictOptionValue(opts, "alwaysStrict") && !file.isDeclarationFile) {
                // bind in strict mode source files with alwaysStrict option
                return true;
            }
            else {
                return !!file.externalModuleIndicator;
            }
        }

        function createSymbol(flags: SymbolFlags, name: __String): Symbol {
            symbolCount++;
            return new Symbol(flags, name);
        }

        function addDeclarationToSymbol(symbol: Symbol, node: Declaration, symbolFlags: SymbolFlags) {
            symbol.flags |= symbolFlags;

            node.symbol = symbol;
            symbol.declarations = append(symbol.declarations, node);

            if (symbolFlags & SymbolFlags.HasExports && !symbol.exports) {
                symbol.exports = createSymbolTable();
            }

            if (symbolFlags & SymbolFlags.HasMembers && !symbol.members) {
                symbol.members = createSymbolTable();
            }

            if (symbolFlags & SymbolFlags.Value) {
                const valueDeclaration = symbol.valueDeclaration;
                if (!valueDeclaration ||
                    (valueDeclaration.kind !== node.kind && valueDeclaration.kind === SyntaxKind.ModuleDeclaration)) {
                    // other kinds of value declarations take precedence over modules
                    symbol.valueDeclaration = node;
                }
            }
        }

        // Should not be called on a declaration with a computed property name,
        // unless it is a well known Symbol.
        function getDeclarationName(node: Declaration): __String {
            if (node.kind === SyntaxKind.ExportAssignment) {
                return (<ExportAssignment>node).isExportEquals ? InternalSymbolName.ExportEquals : InternalSymbolName.Default;
            }

            const name = getNameOfDeclaration(node);
            if (name) {
                if (isAmbientModule(node)) {
                    const moduleName = getTextOfIdentifierOrLiteral(name as Identifier | StringLiteral);
                    return (isGlobalScopeAugmentation(<ModuleDeclaration>node) ? "__global" : `"${moduleName}"`) as __String;
                }
                if (name.kind === SyntaxKind.ComputedPropertyName) {
                    const nameExpression = name.expression;
                    // treat computed property names where expression is string/numeric literal as just string/numeric literal
                    if (isStringOrNumericLiteral(nameExpression)) {
                        return escapeLeadingUnderscores(nameExpression.text);
                    }

                    Debug.assert(isWellKnownSymbolSyntactically(nameExpression));
                    return getPropertyNameForKnownSymbolName(idText((<PropertyAccessExpression>nameExpression).name));
                }
                return isPropertyNameLiteral(name) ? getEscapedTextOfIdentifierOrLiteral(name) : undefined;
            }
            switch (node.kind) {
                case SyntaxKind.Constructor:
                    return InternalSymbolName.Constructor;
                case SyntaxKind.FunctionType:
                case SyntaxKind.CallSignature:
                    return InternalSymbolName.Call;
                case SyntaxKind.ConstructorType:
                case SyntaxKind.ConstructSignature:
                    return InternalSymbolName.New;
                case SyntaxKind.IndexSignature:
                    return InternalSymbolName.Index;
                case SyntaxKind.ExportDeclaration:
                    return InternalSymbolName.ExportStar;
                case SyntaxKind.SourceFile:
                    // json file should behave as
                    // module.exports = ...
                    return InternalSymbolName.ExportEquals;
                case SyntaxKind.BinaryExpression:
                    if (getSpecialPropertyAssignmentKind(node as BinaryExpression) === SpecialPropertyAssignmentKind.ModuleExports) {
                        // module.exports = ...
                        return InternalSymbolName.ExportEquals;
                    }
                    Debug.fail("Unknown binary declaration kind");
                    break;
                case SyntaxKind.JSDocFunctionType:
                    return (isJSDocConstructSignature(node) ? InternalSymbolName.New : InternalSymbolName.Call);
                case SyntaxKind.Parameter:
                    // Parameters with names are handled at the top of this function.  Parameters
                    // without names can only come from JSDocFunctionTypes.
                    Debug.assert(node.parent.kind === SyntaxKind.JSDocFunctionType, "Impossible parameter parent kind", () => `parent is: ${(ts as any).SyntaxKind ? (ts as any).SyntaxKind[node.parent.kind] : node.parent.kind}, expected JSDocFunctionType`);
                    const functionType = <JSDocFunctionType>node.parent;
                    const index = functionType.parameters.indexOf(node as ParameterDeclaration);
                    return "arg" + index as __String;
                case SyntaxKind.JSDocTypedefTag:
                    const name = getNameOfJSDocTypedef(node as JSDocTypedefTag);
                    return typeof name !== "undefined" ? name.escapedText : undefined;
            }
        }

        function getDisplayName(node: Declaration): string {
            return isNamedDeclaration(node) ? declarationNameToString(node.name) : unescapeLeadingUnderscores(getDeclarationName(node));
        }

        /**
         * Declares a Symbol for the node and adds it to symbols. Reports errors for conflicting identifier names.
         * @param symbolTable - The symbol table which node will be added to.
         * @param parent - node's parent declaration.
         * @param node - The declaration to be added to the symbol table
         * @param includes - The SymbolFlags that node has in addition to its declaration type (eg: export, ambient, etc.)
         * @param excludes - The flags which node cannot be declared alongside in a symbol table. Used to report forbidden declarations.
         */
        function declareSymbol(symbolTable: SymbolTable, parent: Symbol, node: Declaration, includes: SymbolFlags, excludes: SymbolFlags, isReplaceableByMethod?: boolean): Symbol {
            Debug.assert(!hasDynamicName(node));

            const isDefaultExport = hasModifier(node, ModifierFlags.Default);

            // The exported symbol for an export default function/class node is always named "default"
            const name = isDefaultExport && parent ? InternalSymbolName.Default : getDeclarationName(node);

            let symbol: Symbol;
            if (name === undefined) {
                symbol = createSymbol(SymbolFlags.None, InternalSymbolName.Missing);
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

                if (includes & SymbolFlags.Classifiable) {
                    classifiableNames.set(name, true);
                }

                if (!symbol) {
                    symbolTable.set(name, symbol = createSymbol(SymbolFlags.None, name));
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
                        symbolTable.set(name, symbol = createSymbol(SymbolFlags.None, name));
                    }
                    else {
                        if (isNamedDeclaration(node)) {
                            node.name.parent = node;
                        }

                        // Report errors every position with duplicate declaration
                        // Report errors on previous encountered declarations
                        let message = symbol.flags & SymbolFlags.BlockScopedVariable
                            ? Diagnostics.Cannot_redeclare_block_scoped_variable_0
                            : Diagnostics.Duplicate_identifier_0;

                        if (symbol.flags & SymbolFlags.Enum || includes & SymbolFlags.Enum) {
                            message = Diagnostics.Enum_declarations_can_only_merge_with_namespace_or_other_enum_declarations;
                        }

                        if (symbol.declarations && symbol.declarations.length) {
                            // If the current node is a default export of some sort, then check if
                            // there are any other default exports that we need to error on.
                            // We'll know whether we have other default exports depending on if `symbol` already has a declaration list set.
                            if (isDefaultExport) {
                                message = Diagnostics.A_module_cannot_have_multiple_default_exports;
                            }
                            else {
                                // This is to properly report an error in the case "export default { }" is after export default of class declaration or function declaration.
                                // Error on multiple export default in the following case:
                                // 1. multiple export default of class declaration or function declaration by checking NodeFlags.Default
                                // 2. multiple export default of export assignment. This one doesn't have NodeFlags.Default on (as export default doesn't considered as modifiers)
                                if (symbol.declarations && symbol.declarations.length &&
                                    (node.kind === SyntaxKind.ExportAssignment && !(<ExportAssignment>node).isExportEquals)) {
                                    message = Diagnostics.A_module_cannot_have_multiple_default_exports;
                                }
                            }
                        }

                        forEach(symbol.declarations, declaration => {
                            file.bindDiagnostics.push(createDiagnosticForNode(getNameOfDeclaration(declaration) || declaration, message, getDisplayName(declaration)));
                        });
                        file.bindDiagnostics.push(createDiagnosticForNode(getNameOfDeclaration(node) || node, message, getDisplayName(node)));

                        symbol = createSymbol(SymbolFlags.None, name);
                    }
                }
            }

            addDeclarationToSymbol(symbol, node, includes);
            if (symbol.parent) {
                Debug.assert(symbol.parent === parent, "Existing symbol parent should match new one");
            }
            else {
                symbol.parent = parent;
            }

            return symbol;
        }

        function declareModuleMember(node: Declaration, symbolFlags: SymbolFlags, symbolExcludes: SymbolFlags): Symbol {
            const hasExportModifier = getCombinedModifierFlags(node) & ModifierFlags.Export;
            if (symbolFlags & SymbolFlags.Alias) {
                if (node.kind === SyntaxKind.ExportSpecifier || (node.kind === SyntaxKind.ImportEqualsDeclaration && hasExportModifier)) {
                    return declareSymbol(container.symbol.exports, container.symbol, node, symbolFlags, symbolExcludes);
                }
                else {
                    return declareSymbol(container.locals, /*parent*/ undefined, node, symbolFlags, symbolExcludes);
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
                if (node.kind === SyntaxKind.JSDocTypedefTag) Debug.assert(isInJavaScriptFile(node)); // We shouldn't add symbols for JSDoc nodes if not in a JS file.
                if ((!isAmbientModule(node) && (hasExportModifier || container.flags & NodeFlags.ExportContext)) || isJSDocTypedefTag(node)) {
                    if (hasModifier(node, ModifierFlags.Default) && !getDeclarationName(node)) {
                        return declareSymbol(container.symbol.exports, container.symbol, node, symbolFlags, symbolExcludes); // No local symbol for an unnamed default!
                    }
                    const exportKind = symbolFlags & SymbolFlags.Value ? SymbolFlags.ExportValue : 0;
                    const local = declareSymbol(container.locals, /*parent*/ undefined, node, exportKind, symbolExcludes);
                    local.exportSymbol = declareSymbol(container.symbol.exports, container.symbol, node, symbolFlags, symbolExcludes);
                    node.localSymbol = local;
                    return local;
                }
                else {
                    return declareSymbol(container.locals, /*parent*/ undefined, node, symbolFlags, symbolExcludes);
                }
            }
        }

        // All container nodes are kept on a linked list in declaration order. This list is used by
        // the getLocalNameOfContainer function in the type checker to validate that the local name
        // used for a container is unique.
        function bindContainer(node: Node, containerFlags: ContainerFlags) {
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
                if (node.kind !== SyntaxKind.ArrowFunction) {
                    thisParentContainer = container;
                }
                container = blockScopeContainer = node;
                if (containerFlags & ContainerFlags.HasLocals) {
                    container.locals = createSymbolTable();
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
                const saveActiveLabels = activeLabels;
                const saveHasExplicitReturn = hasExplicitReturn;
                const isIIFE = containerFlags & ContainerFlags.IsFunctionExpression && !hasModifier(node, ModifierFlags.Async) &&
                    !(<FunctionLikeDeclaration>node).asteriskToken && !!getImmediatelyInvokedFunctionExpression(node);
                // A non-async, non-generator IIFE is considered part of the containing control flow. Return statements behave
                // similarly to break statements that exit to a label just past the statement body.
                if (!isIIFE) {
                    currentFlow = { flags: FlowFlags.Start };
                    if (containerFlags & (ContainerFlags.IsFunctionExpression | ContainerFlags.IsObjectLiteralOrClassExpressionMethod)) {
                        currentFlow.container = <FunctionExpression | ArrowFunction | MethodDeclaration>node;
                    }
                }
                // We create a return control flow graph for IIFEs and constructors. For constructors
                // we use the return control flow graph in strict property intialization checks.
                currentReturnTarget = isIIFE || node.kind === SyntaxKind.Constructor ? createBranchLabel() : undefined;
                currentBreakTarget = undefined;
                currentContinueTarget = undefined;
                activeLabels = undefined;
                hasExplicitReturn = false;
                bindChildren(node);
                // Reset all reachability check related flags on node (for incremental scenarios)
                node.flags &= ~NodeFlags.ReachabilityAndEmitFlags;
                if (!(currentFlow.flags & FlowFlags.Unreachable) && containerFlags & ContainerFlags.IsFunctionLike && nodeIsPresent((<FunctionLikeDeclaration>node).body)) {
                    node.flags |= NodeFlags.HasImplicitReturn;
                    if (hasExplicitReturn) node.flags |= NodeFlags.HasExplicitReturn;
                }
                if (node.kind === SyntaxKind.SourceFile) {
                    node.flags |= emitFlags;
                }
                if (currentReturnTarget) {
                    addAntecedent(currentReturnTarget, currentFlow);
                    currentFlow = finishFlowLabel(currentReturnTarget);
                    if (node.kind === SyntaxKind.Constructor) {
                        (<ConstructorDeclaration>node).returnFlowNode = currentFlow;
                    }
                }
                if (!isIIFE) {
                    currentFlow = saveCurrentFlow;
                }
                currentBreakTarget = saveBreakTarget;
                currentContinueTarget = saveContinueTarget;
                currentReturnTarget = saveReturnTarget;
                activeLabels = saveActiveLabels;
                hasExplicitReturn = saveHasExplicitReturn;
            }
            else if (containerFlags & ContainerFlags.IsInterface) {
                seenThisKeyword = false;
                bindChildren(node);
                node.flags = seenThisKeyword ? node.flags | NodeFlags.ContainsThis : node.flags & ~NodeFlags.ContainsThis;
            }
            else {
                bindChildren(node);
            }

            container = saveContainer;
            thisParentContainer = saveThisParentContainer;
            blockScopeContainer = savedBlockScopeContainer;
        }

        function bindChildren(node: Node): void {
            if (skipTransformFlagAggregation) {
                bindChildrenWorker(node);
            }
            else if (node.transformFlags & TransformFlags.HasComputedFlags) {
                skipTransformFlagAggregation = true;
                bindChildrenWorker(node);
                skipTransformFlagAggregation = false;
                subtreeTransformFlags |= node.transformFlags & ~getTransformFlagsSubtreeExclusions(node.kind);
            }
            else {
                const savedSubtreeTransformFlags = subtreeTransformFlags;
                subtreeTransformFlags = 0;
                bindChildrenWorker(node);
                subtreeTransformFlags = savedSubtreeTransformFlags | computeTransformFlagsForNode(node, subtreeTransformFlags);
            }
        }

        function bindEachFunctionsFirst(nodes: NodeArray<Node>) {
            bindEach(nodes, n => n.kind === SyntaxKind.FunctionDeclaration ? bind(n) : undefined);
            bindEach(nodes, n => n.kind !== SyntaxKind.FunctionDeclaration ? bind(n) : undefined);
        }

        function bindEach(nodes: NodeArray<Node>, bindFunction = bind) {
            if (nodes === undefined) {
                return;
            }

            if (skipTransformFlagAggregation) {
                forEach(nodes, bindFunction);
            }
            else {
                const savedSubtreeTransformFlags = subtreeTransformFlags;
                subtreeTransformFlags = TransformFlags.None;
                let nodeArrayFlags = TransformFlags.None;
                for (const node of nodes) {
                    bindFunction(node);
                    nodeArrayFlags |= node.transformFlags & ~TransformFlags.HasComputedFlags;
                }
                nodes.transformFlags = nodeArrayFlags | TransformFlags.HasComputedFlags;
                subtreeTransformFlags |= savedSubtreeTransformFlags;
            }
        }

        function bindEachChild(node: Node) {
            forEachChild(node, bind, bindEach);
        }

        function bindChildrenWorker(node: Node): void {
            // Binding of JsDocComment should be done before the current block scope container changes.
            // because the scope of JsDocComment should not be affected by whether the current node is a
            // container or not.
            if (hasJSDocNodes(node)) {
                if (isInJavaScriptFile(node)) {
                    for (const j of node.jsDoc) {
                        bind(j);
                    }
                }
                else {
                    for (const j of node.jsDoc) {
                        setParentPointers(node, j);
                    }
                }
            }

            if (checkUnreachable(node)) {
                bindEachChild(node);
                return;
            }
            switch (node.kind) {
                case SyntaxKind.WhileStatement:
                    bindWhileStatement(<WhileStatement>node);
                    break;
                case SyntaxKind.DoStatement:
                    bindDoStatement(<DoStatement>node);
                    break;
                case SyntaxKind.ForStatement:
                    bindForStatement(<ForStatement>node);
                    break;
                case SyntaxKind.ForInStatement:
                case SyntaxKind.ForOfStatement:
                    bindForInOrForOfStatement(<ForInOrOfStatement>node);
                    break;
                case SyntaxKind.IfStatement:
                    bindIfStatement(<IfStatement>node);
                    break;
                case SyntaxKind.ReturnStatement:
                case SyntaxKind.ThrowStatement:
                    bindReturnOrThrow(<ReturnStatement | ThrowStatement>node);
                    break;
                case SyntaxKind.BreakStatement:
                case SyntaxKind.ContinueStatement:
                    bindBreakOrContinueStatement(<BreakOrContinueStatement>node);
                    break;
                case SyntaxKind.TryStatement:
                    bindTryStatement(<TryStatement>node);
                    break;
                case SyntaxKind.SwitchStatement:
                    bindSwitchStatement(<SwitchStatement>node);
                    break;
                case SyntaxKind.CaseBlock:
                    bindCaseBlock(<CaseBlock>node);
                    break;
                case SyntaxKind.CaseClause:
                    bindCaseClause(<CaseClause>node);
                    break;
                case SyntaxKind.LabeledStatement:
                    bindLabeledStatement(<LabeledStatement>node);
                    break;
                case SyntaxKind.PrefixUnaryExpression:
                    bindPrefixUnaryExpressionFlow(<PrefixUnaryExpression>node);
                    break;
                case SyntaxKind.PostfixUnaryExpression:
                    bindPostfixUnaryExpressionFlow(<PostfixUnaryExpression>node);
                    break;
                case SyntaxKind.BinaryExpression:
                    bindBinaryExpressionFlow(<BinaryExpression>node);
                    break;
                case SyntaxKind.DeleteExpression:
                    bindDeleteExpressionFlow(<DeleteExpression>node);
                    break;
                case SyntaxKind.ConditionalExpression:
                    bindConditionalExpressionFlow(<ConditionalExpression>node);
                    break;
                case SyntaxKind.VariableDeclaration:
                    bindVariableDeclarationFlow(<VariableDeclaration>node);
                    break;
                case SyntaxKind.CallExpression:
                    bindCallExpressionFlow(<CallExpression>node);
                    break;
                case SyntaxKind.JSDocComment:
                    bindJSDocComment(<JSDoc>node);
                    break;
                case SyntaxKind.JSDocTypedefTag:
                    bindJSDocTypedefTag(<JSDocTypedefTag>node);
                    break;
                // In source files and blocks, bind functions first to match hoisting that occurs at runtime
                case SyntaxKind.SourceFile:
                    bindEachFunctionsFirst((node as SourceFile).statements);
                    bind((node as SourceFile).endOfFileToken);
                    break;
                case SyntaxKind.Block:
                case SyntaxKind.ModuleBlock:
                    bindEachFunctionsFirst((node as Block).statements);
                    break;
                default:
                    bindEachChild(node);
                    break;
            }
        }

        function isNarrowingExpression(expr: Expression): boolean {
            switch (expr.kind) {
                case SyntaxKind.Identifier:
                case SyntaxKind.ThisKeyword:
                case SyntaxKind.PropertyAccessExpression:
                    return isNarrowableReference(expr);
                case SyntaxKind.CallExpression:
                    return hasNarrowableArgument(<CallExpression>expr);
                case SyntaxKind.ParenthesizedExpression:
                    return isNarrowingExpression((<ParenthesizedExpression>expr).expression);
                case SyntaxKind.BinaryExpression:
                    return isNarrowingBinaryExpression(<BinaryExpression>expr);
                case SyntaxKind.PrefixUnaryExpression:
                    return (<PrefixUnaryExpression>expr).operator === SyntaxKind.ExclamationToken && isNarrowingExpression((<PrefixUnaryExpression>expr).operand);
            }
            return false;
        }

        function isNarrowableReference(expr: Expression): boolean {
            return expr.kind === SyntaxKind.Identifier ||
                expr.kind === SyntaxKind.ThisKeyword ||
                expr.kind === SyntaxKind.SuperKeyword ||
                expr.kind === SyntaxKind.PropertyAccessExpression && isNarrowableReference((<PropertyAccessExpression>expr).expression);
        }

        function hasNarrowableArgument(expr: CallExpression) {
            if (expr.arguments) {
                for (const argument of expr.arguments) {
                    if (isNarrowableReference(argument)) {
                        return true;
                    }
                }
            }
            if (expr.expression.kind === SyntaxKind.PropertyAccessExpression &&
                isNarrowableReference((<PropertyAccessExpression>expr.expression).expression)) {
                return true;
            }
            return false;
        }

        function isNarrowingTypeofOperands(expr1: Expression, expr2: Expression) {
            return isTypeOfExpression(expr1) && isNarrowableOperand(expr1.expression) && isStringLiteralLike(expr2);
        }

        function isNarrowableInOperands(left: Expression, right: Expression) {
            return isStringLiteralLike(left) && isNarrowingExpression(right);
        }

        function isNarrowingBinaryExpression(expr: BinaryExpression) {
            switch (expr.operatorToken.kind) {
                case SyntaxKind.EqualsToken:
                    return isNarrowableReference(expr.left);
                case SyntaxKind.EqualsEqualsToken:
                case SyntaxKind.ExclamationEqualsToken:
                case SyntaxKind.EqualsEqualsEqualsToken:
                case SyntaxKind.ExclamationEqualsEqualsToken:
                    return isNarrowableOperand(expr.left) || isNarrowableOperand(expr.right) ||
                        isNarrowingTypeofOperands(expr.right, expr.left) || isNarrowingTypeofOperands(expr.left, expr.right);
                case SyntaxKind.InstanceOfKeyword:
                    return isNarrowableOperand(expr.left);
                case SyntaxKind.InKeyword:
                    return isNarrowableInOperands(expr.left, expr.right);
                case SyntaxKind.CommaToken:
                    return isNarrowingExpression(expr.right);
            }
            return false;
        }

        function isNarrowableOperand(expr: Expression): boolean {
            switch (expr.kind) {
                case SyntaxKind.ParenthesizedExpression:
                    return isNarrowableOperand((<ParenthesizedExpression>expr).expression);
                case SyntaxKind.BinaryExpression:
                    switch ((<BinaryExpression>expr).operatorToken.kind) {
                        case SyntaxKind.EqualsToken:
                            return isNarrowableOperand((<BinaryExpression>expr).left);
                        case SyntaxKind.CommaToken:
                            return isNarrowableOperand((<BinaryExpression>expr).right);
                    }
            }
            return isNarrowableReference(expr);
        }

        function createBranchLabel(): FlowLabel {
            return {
                flags: FlowFlags.BranchLabel,
                antecedents: undefined
            };
        }

        function createLoopLabel(): FlowLabel {
            return {
                flags: FlowFlags.LoopLabel,
                antecedents: undefined
            };
        }

        function setFlowNodeReferenced(flow: FlowNode) {
            // On first reference we set the Referenced flag, thereafter we set the Shared flag
            flow.flags |= flow.flags & FlowFlags.Referenced ? FlowFlags.Shared : FlowFlags.Referenced;
        }

        function addAntecedent(label: FlowLabel, antecedent: FlowNode): void {
            if (!(antecedent.flags & FlowFlags.Unreachable) && !contains(label.antecedents, antecedent)) {
                (label.antecedents || (label.antecedents = [])).push(antecedent);
                setFlowNodeReferenced(antecedent);
            }
        }

        function createFlowCondition(flags: FlowFlags, antecedent: FlowNode, expression: Expression): FlowNode {
            if (antecedent.flags & FlowFlags.Unreachable) {
                return antecedent;
            }
            if (!expression) {
                return flags & FlowFlags.TrueCondition ? antecedent : unreachableFlow;
            }
            if (expression.kind === SyntaxKind.TrueKeyword && flags & FlowFlags.FalseCondition ||
                expression.kind === SyntaxKind.FalseKeyword && flags & FlowFlags.TrueCondition) {
                return unreachableFlow;
            }
            if (!isNarrowingExpression(expression)) {
                return antecedent;
            }
            setFlowNodeReferenced(antecedent);
            return { flags, expression, antecedent };
        }

        function createFlowSwitchClause(antecedent: FlowNode, switchStatement: SwitchStatement, clauseStart: number, clauseEnd: number): FlowNode {
            if (!isNarrowingExpression(switchStatement.expression)) {
                return antecedent;
            }
            setFlowNodeReferenced(antecedent);
            return { flags: FlowFlags.SwitchClause, switchStatement, clauseStart, clauseEnd, antecedent };
        }

        function createFlowAssignment(antecedent: FlowNode, node: Expression | VariableDeclaration | BindingElement): FlowNode {
            setFlowNodeReferenced(antecedent);
            return { flags: FlowFlags.Assignment, antecedent, node };
        }

        function createFlowArrayMutation(antecedent: FlowNode, node: CallExpression | BinaryExpression): FlowNode {
            setFlowNodeReferenced(antecedent);
            const res: FlowArrayMutation = { flags: FlowFlags.ArrayMutation, antecedent, node };
            return res;
        }

        function finishFlowLabel(flow: FlowLabel): FlowNode {
            const antecedents = flow.antecedents;
            if (!antecedents) {
                return unreachableFlow;
            }
            if (antecedents.length === 1) {
                return antecedents[0];
            }
            return flow;
        }

        function isStatementCondition(node: Node) {
            const parent = node.parent;
            switch (parent.kind) {
                case SyntaxKind.IfStatement:
                case SyntaxKind.WhileStatement:
                case SyntaxKind.DoStatement:
                    return (<IfStatement | WhileStatement | DoStatement>parent).expression === node;
                case SyntaxKind.ForStatement:
                case SyntaxKind.ConditionalExpression:
                    return (<ForStatement | ConditionalExpression>parent).condition === node;
            }
            return false;
        }

        function isLogicalExpression(node: Node) {
            while (true) {
                if (node.kind === SyntaxKind.ParenthesizedExpression) {
                    node = (<ParenthesizedExpression>node).expression;
                }
                else if (node.kind === SyntaxKind.PrefixUnaryExpression && (<PrefixUnaryExpression>node).operator === SyntaxKind.ExclamationToken) {
                    node = (<PrefixUnaryExpression>node).operand;
                }
                else {
                    return node.kind === SyntaxKind.BinaryExpression && (
                        (<BinaryExpression>node).operatorToken.kind === SyntaxKind.AmpersandAmpersandToken ||
                        (<BinaryExpression>node).operatorToken.kind === SyntaxKind.BarBarToken);
                }
            }
        }

        function isTopLevelLogicalExpression(node: Node): boolean {
            while (node.parent.kind === SyntaxKind.ParenthesizedExpression ||
                node.parent.kind === SyntaxKind.PrefixUnaryExpression &&
                (<PrefixUnaryExpression>node.parent).operator === SyntaxKind.ExclamationToken) {
                node = node.parent;
            }
            return !isStatementCondition(node) && !isLogicalExpression(node.parent);
        }

        function bindCondition(node: Expression, trueTarget: FlowLabel, falseTarget: FlowLabel) {
            const saveTrueTarget = currentTrueTarget;
            const saveFalseTarget = currentFalseTarget;
            currentTrueTarget = trueTarget;
            currentFalseTarget = falseTarget;
            bind(node);
            currentTrueTarget = saveTrueTarget;
            currentFalseTarget = saveFalseTarget;
            if (!node || !isLogicalExpression(node)) {
                addAntecedent(trueTarget, createFlowCondition(FlowFlags.TrueCondition, currentFlow, node));
                addAntecedent(falseTarget, createFlowCondition(FlowFlags.FalseCondition, currentFlow, node));
            }
        }

        function bindIterativeStatement(node: Statement, breakTarget: FlowLabel, continueTarget: FlowLabel): void {
            const saveBreakTarget = currentBreakTarget;
            const saveContinueTarget = currentContinueTarget;
            currentBreakTarget = breakTarget;
            currentContinueTarget = continueTarget;
            bind(node);
            currentBreakTarget = saveBreakTarget;
            currentContinueTarget = saveContinueTarget;
        }

        function bindWhileStatement(node: WhileStatement): void {
            const preWhileLabel = createLoopLabel();
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

        function bindDoStatement(node: DoStatement): void {
            const preDoLabel = createLoopLabel();
            const enclosingLabeledStatement = node.parent.kind === SyntaxKind.LabeledStatement
                ? lastOrUndefined(activeLabels)
                : undefined;
            // if do statement is wrapped in labeled statement then target labels for break/continue with or without
            // label should be the same
            const preConditionLabel = enclosingLabeledStatement ? enclosingLabeledStatement.continueTarget : createBranchLabel();
            const postDoLabel = enclosingLabeledStatement ? enclosingLabeledStatement.breakTarget : createBranchLabel();
            addAntecedent(preDoLabel, currentFlow);
            currentFlow = preDoLabel;
            bindIterativeStatement(node.statement, postDoLabel, preConditionLabel);
            addAntecedent(preConditionLabel, currentFlow);
            currentFlow = finishFlowLabel(preConditionLabel);
            bindCondition(node.expression, preDoLabel, postDoLabel);
            currentFlow = finishFlowLabel(postDoLabel);
        }

        function bindForStatement(node: ForStatement): void {
            const preLoopLabel = createLoopLabel();
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

        function bindForInOrForOfStatement(node: ForInOrOfStatement): void {
            const preLoopLabel = createLoopLabel();
            const postLoopLabel = createBranchLabel();
            addAntecedent(preLoopLabel, currentFlow);
            currentFlow = preLoopLabel;
            if (node.kind === SyntaxKind.ForOfStatement) {
                bind(node.awaitModifier);
            }
            bind(node.expression);
            addAntecedent(postLoopLabel, currentFlow);
            bind(node.initializer);
            if (node.initializer.kind !== SyntaxKind.VariableDeclarationList) {
                bindAssignmentTargetFlow(node.initializer);
            }
            bindIterativeStatement(node.statement, postLoopLabel, preLoopLabel);
            addAntecedent(preLoopLabel, currentFlow);
            currentFlow = finishFlowLabel(postLoopLabel);
        }

        function bindIfStatement(node: IfStatement): void {
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

        function bindReturnOrThrow(node: ReturnStatement | ThrowStatement): void {
            bind(node.expression);
            if (node.kind === SyntaxKind.ReturnStatement) {
                hasExplicitReturn = true;
                if (currentReturnTarget) {
                    addAntecedent(currentReturnTarget, currentFlow);
                }
            }
            currentFlow = unreachableFlow;
        }

        function findActiveLabel(name: __String) {
            if (activeLabels) {
                for (const label of activeLabels) {
                    if (label.name === name) {
                        return label;
                    }
                }
            }
            return undefined;
        }

        function bindBreakOrContinueFlow(node: BreakOrContinueStatement, breakTarget: FlowLabel, continueTarget: FlowLabel) {
            const flowLabel = node.kind === SyntaxKind.BreakStatement ? breakTarget : continueTarget;
            if (flowLabel) {
                addAntecedent(flowLabel, currentFlow);
                currentFlow = unreachableFlow;
            }
        }

        function bindBreakOrContinueStatement(node: BreakOrContinueStatement): void {
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

        function bindTryStatement(node: TryStatement): void {
            const preFinallyLabel = createBranchLabel();
            const preTryFlow = currentFlow;
            // TODO: Every statement in try block is potentially an exit point!
            bind(node.tryBlock);
            addAntecedent(preFinallyLabel, currentFlow);

            const flowAfterTry = currentFlow;
            let flowAfterCatch = unreachableFlow;

            if (node.catchClause) {
                currentFlow = preTryFlow;
                bind(node.catchClause);
                addAntecedent(preFinallyLabel, currentFlow);

                flowAfterCatch = currentFlow;
            }
            if (node.finallyBlock) {
                // in finally flow is combined from pre-try/flow from try/flow from catch
                // pre-flow is necessary to make sure that finally is reachable even if finally flows in both try and finally blocks are unreachable

                // also for finally blocks we inject two extra edges into the flow graph.
                // first -> edge that connects pre-try flow with the label at the beginning of the finally block, it has lock associated with it
                // second -> edge that represents post-finally flow.
                // these edges are used in following scenario:
                // let a; (1)
                // try { a = someOperation(); (2)}
                // finally { (3) console.log(a) } (4)
                // (5) a

                // flow graph for this case looks roughly like this (arrows show ):
                // (1-pre-try-flow) <--.. <-- (2-post-try-flow)
                //  ^                                ^
                //  |*****(3-pre-finally-label) -----|
                //                ^
                //                |-- ... <-- (4-post-finally-label) <--- (5)
                // In case when we walk the flow starting from inside the finally block we want to take edge '*****' into account
                // since it ensures that finally is always reachable. However when we start outside the finally block and go through label (5)
                // then edge '*****' should be discarded because label 4 is only reachable if post-finally label-4 is reachable
                // Simply speaking code inside finally block is treated as reachable as pre-try-flow
                // since we conservatively assume that any line in try block can throw or return in which case we'll enter finally.
                // However code after finally is reachable only if control flow was not abrupted in try/catch or finally blocks - it should be composed from
                // final flows of these blocks without taking pre-try flow into account.
                //
                // extra edges that we inject allows to control this behavior
                // if when walking the flow we step on post-finally edge - we can mark matching pre-finally edge as locked so it will be skipped.
                const preFinallyFlow: PreFinallyFlow = { flags: FlowFlags.PreFinally, antecedent: preTryFlow, lock: {} };
                addAntecedent(preFinallyLabel, preFinallyFlow);

                currentFlow = finishFlowLabel(preFinallyLabel);
                bind(node.finallyBlock);
                // if flow after finally is unreachable - keep it
                // otherwise check if flows after try and after catch are unreachable
                // if yes - convert current flow to unreachable
                // i.e.
                // try { return "1" } finally { console.log(1); }
                // console.log(2); // this line should be unreachable even if flow falls out of finally block
                if (!(currentFlow.flags & FlowFlags.Unreachable)) {
                    if ((flowAfterTry.flags & FlowFlags.Unreachable) && (flowAfterCatch.flags & FlowFlags.Unreachable)) {
                        currentFlow = flowAfterTry === reportedUnreachableFlow || flowAfterCatch === reportedUnreachableFlow
                            ? reportedUnreachableFlow
                            : unreachableFlow;
                    }
                }
                if (!(currentFlow.flags & FlowFlags.Unreachable)) {
                    const afterFinallyFlow: AfterFinallyFlow = { flags: FlowFlags.AfterFinally, antecedent: currentFlow };
                    preFinallyFlow.lock = afterFinallyFlow;
                    currentFlow = afterFinallyFlow;
                }
            }
            else {
                currentFlow = finishFlowLabel(preFinallyLabel);
            }
        }

        function bindSwitchStatement(node: SwitchStatement): void {
            const postSwitchLabel = createBranchLabel();
            bind(node.expression);
            const saveBreakTarget = currentBreakTarget;
            const savePreSwitchCaseFlow = preSwitchCaseFlow;
            currentBreakTarget = postSwitchLabel;
            preSwitchCaseFlow = currentFlow;
            bind(node.caseBlock);
            addAntecedent(postSwitchLabel, currentFlow);
            const hasDefault = forEach(node.caseBlock.clauses, c => c.kind === SyntaxKind.DefaultClause);
            // We mark a switch statement as possibly exhaustive if it has no default clause and if all
            // case clauses have unreachable end points (e.g. they all return).
            node.possiblyExhaustive = !hasDefault && !postSwitchLabel.antecedents;
            if (!hasDefault) {
                addAntecedent(postSwitchLabel, createFlowSwitchClause(preSwitchCaseFlow, node, 0, 0));
            }
            currentBreakTarget = saveBreakTarget;
            preSwitchCaseFlow = savePreSwitchCaseFlow;
            currentFlow = finishFlowLabel(postSwitchLabel);
        }

        function bindCaseBlock(node: CaseBlock): void {
            const savedSubtreeTransformFlags = subtreeTransformFlags;
            subtreeTransformFlags = 0;
            const clauses = node.clauses;
            let fallthroughFlow = unreachableFlow;
            for (let i = 0; i < clauses.length; i++) {
                const clauseStart = i;
                while (!clauses[i].statements.length && i + 1 < clauses.length) {
                    bind(clauses[i]);
                    i++;
                }
                const preCaseLabel = createBranchLabel();
                addAntecedent(preCaseLabel, createFlowSwitchClause(preSwitchCaseFlow, node.parent, clauseStart, i + 1));
                addAntecedent(preCaseLabel, fallthroughFlow);
                currentFlow = finishFlowLabel(preCaseLabel);
                const clause = clauses[i];
                bind(clause);
                fallthroughFlow = currentFlow;
                if (!(currentFlow.flags & FlowFlags.Unreachable) && i !== clauses.length - 1 && options.noFallthroughCasesInSwitch) {
                    errorOnFirstToken(clause, Diagnostics.Fallthrough_case_in_switch);
                }
            }
            clauses.transformFlags = subtreeTransformFlags | TransformFlags.HasComputedFlags;
            subtreeTransformFlags |= savedSubtreeTransformFlags;
        }

        function bindCaseClause(node: CaseClause): void {
            const saveCurrentFlow = currentFlow;
            currentFlow = preSwitchCaseFlow;
            bind(node.expression);
            currentFlow = saveCurrentFlow;
            bindEach(node.statements);
        }

        function pushActiveLabel(name: __String, breakTarget: FlowLabel, continueTarget: FlowLabel): ActiveLabel {
            const activeLabel: ActiveLabel = {
                name,
                breakTarget,
                continueTarget,
                referenced: false
            };
            (activeLabels || (activeLabels = [])).push(activeLabel);
            return activeLabel;
        }

        function popActiveLabel() {
            activeLabels.pop();
        }

        function bindLabeledStatement(node: LabeledStatement): void {
            const preStatementLabel = createLoopLabel();
            const postStatementLabel = createBranchLabel();
            bind(node.label);
            addAntecedent(preStatementLabel, currentFlow);
            const activeLabel = pushActiveLabel(node.label.escapedText, postStatementLabel, preStatementLabel);
            bind(node.statement);
            popActiveLabel();
            if (!activeLabel.referenced && !options.allowUnusedLabels) {
                file.bindDiagnostics.push(createDiagnosticForNode(node.label, Diagnostics.Unused_label));
            }
            if (!node.statement || node.statement.kind !== SyntaxKind.DoStatement) {
                // do statement sets current flow inside bindDoStatement
                addAntecedent(postStatementLabel, currentFlow);
                currentFlow = finishFlowLabel(postStatementLabel);
            }
        }

        function bindDestructuringTargetFlow(node: Expression) {
            if (node.kind === SyntaxKind.BinaryExpression && (<BinaryExpression>node).operatorToken.kind === SyntaxKind.EqualsToken) {
                bindAssignmentTargetFlow((<BinaryExpression>node).left);
            }
            else {
                bindAssignmentTargetFlow(node);
            }
        }

        function bindAssignmentTargetFlow(node: Expression) {
            if (isNarrowableReference(node)) {
                currentFlow = createFlowAssignment(currentFlow, node);
            }
            else if (node.kind === SyntaxKind.ArrayLiteralExpression) {
                for (const e of (<ArrayLiteralExpression>node).elements) {
                    if (e.kind === SyntaxKind.SpreadElement) {
                        bindAssignmentTargetFlow((<SpreadElement>e).expression);
                    }
                    else {
                        bindDestructuringTargetFlow(e);
                    }
                }
            }
            else if (node.kind === SyntaxKind.ObjectLiteralExpression) {
                for (const p of (<ObjectLiteralExpression>node).properties) {
                    if (p.kind === SyntaxKind.PropertyAssignment) {
                        bindDestructuringTargetFlow(p.initializer);
                    }
                    else if (p.kind === SyntaxKind.ShorthandPropertyAssignment) {
                        bindAssignmentTargetFlow(p.name);
                    }
                    else if (p.kind === SyntaxKind.SpreadAssignment) {
                        bindAssignmentTargetFlow(p.expression);
                    }
                }
            }
        }

        function bindLogicalExpression(node: BinaryExpression, trueTarget: FlowLabel, falseTarget: FlowLabel) {
            const preRightLabel = createBranchLabel();
            if (node.operatorToken.kind === SyntaxKind.AmpersandAmpersandToken) {
                bindCondition(node.left, preRightLabel, falseTarget);
            }
            else {
                bindCondition(node.left, trueTarget, preRightLabel);
            }
            currentFlow = finishFlowLabel(preRightLabel);
            bind(node.operatorToken);
            bindCondition(node.right, trueTarget, falseTarget);
        }

        function bindPrefixUnaryExpressionFlow(node: PrefixUnaryExpression) {
            if (node.operator === SyntaxKind.ExclamationToken) {
                const saveTrueTarget = currentTrueTarget;
                currentTrueTarget = currentFalseTarget;
                currentFalseTarget = saveTrueTarget;
                bindEachChild(node);
                currentFalseTarget = currentTrueTarget;
                currentTrueTarget = saveTrueTarget;
            }
            else {
                bindEachChild(node);
                if (node.operator === SyntaxKind.PlusPlusToken || node.operator === SyntaxKind.MinusMinusToken) {
                    bindAssignmentTargetFlow(node.operand);
                }
            }
        }

        function bindPostfixUnaryExpressionFlow(node: PostfixUnaryExpression) {
            bindEachChild(node);
            if (node.operator === SyntaxKind.PlusPlusToken || node.operator === SyntaxKind.MinusMinusToken) {
                bindAssignmentTargetFlow(node.operand);
            }
        }

        function bindBinaryExpressionFlow(node: BinaryExpression) {
            const operator = node.operatorToken.kind;
            if (operator === SyntaxKind.AmpersandAmpersandToken || operator === SyntaxKind.BarBarToken) {
                if (isTopLevelLogicalExpression(node)) {
                    const postExpressionLabel = createBranchLabel();
                    bindLogicalExpression(node, postExpressionLabel, postExpressionLabel);
                    currentFlow = finishFlowLabel(postExpressionLabel);
                }
                else {
                    bindLogicalExpression(node, currentTrueTarget, currentFalseTarget);
                }
            }
            else {
                bindEachChild(node);
                if (isAssignmentOperator(operator) && !isAssignmentTarget(node)) {
                    bindAssignmentTargetFlow(node.left);
                    if (operator === SyntaxKind.EqualsToken && node.left.kind === SyntaxKind.ElementAccessExpression) {
                        const elementAccess = <ElementAccessExpression>node.left;
                        if (isNarrowableOperand(elementAccess.expression)) {
                            currentFlow = createFlowArrayMutation(currentFlow, node);
                        }
                    }
                }
            }
        }

        function bindDeleteExpressionFlow(node: DeleteExpression) {
            bindEachChild(node);
            if (node.expression.kind === SyntaxKind.PropertyAccessExpression) {
                bindAssignmentTargetFlow(node.expression);
            }
        }

        function bindConditionalExpressionFlow(node: ConditionalExpression) {
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

        function bindInitializedVariableFlow(node: VariableDeclaration | ArrayBindingElement) {
            const name = !isOmittedExpression(node) ? node.name : undefined;
            if (isBindingPattern(name)) {
                for (const child of name.elements) {
                    bindInitializedVariableFlow(child);
                }
            }
            else {
                currentFlow = createFlowAssignment(currentFlow, node);
            }
        }

        function bindVariableDeclarationFlow(node: VariableDeclaration) {
            bindEachChild(node);
            if (node.initializer || isForInOrOfStatement(node.parent.parent)) {
                bindInitializedVariableFlow(node);
            }
        }

        function bindJSDocComment(node: JSDoc) {
            forEachChild(node, n => {
                if (n.kind !== SyntaxKind.JSDocTypedefTag) {
                    bind(n);
                }
            });
        }

        function bindJSDocTypedefTag(node: JSDocTypedefTag) {
            forEachChild(node, n => {
                // if the node has a fullName "A.B.C", that means symbol "C" was already bound
                // when we visit "fullName"; so when we visit the name "C" as the next child of
                // the jsDocTypedefTag, we should skip binding it.
                if (node.fullName && n === node.name && node.fullName.kind !== SyntaxKind.Identifier) {
                    return;
                }
                bind(n);
            });
        }

        function bindCallExpressionFlow(node: CallExpression) {
            // If the target of the call expression is a function expression or arrow function we have
            // an immediately invoked function expression (IIFE). Initialize the flowNode property to
            // the current control flow (which includes evaluation of the IIFE arguments).
            let expr: Expression = node.expression;
            while (expr.kind === SyntaxKind.ParenthesizedExpression) {
                expr = (<ParenthesizedExpression>expr).expression;
            }
            if (expr.kind === SyntaxKind.FunctionExpression || expr.kind === SyntaxKind.ArrowFunction) {
                bindEach(node.typeArguments);
                bindEach(node.arguments);
                bind(node.expression);
            }
            else {
                bindEachChild(node);
            }
            if (node.expression.kind === SyntaxKind.PropertyAccessExpression) {
                const propertyAccess = <PropertyAccessExpression>node.expression;
                if (isNarrowableOperand(propertyAccess.expression) && isPushOrUnshiftIdentifier(propertyAccess.name)) {
                    currentFlow = createFlowArrayMutation(currentFlow, node);
                }
            }
        }

        function getContainerFlags(node: Node): ContainerFlags {
            switch (node.kind) {
                case SyntaxKind.ClassExpression:
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.ObjectLiteralExpression:
                case SyntaxKind.TypeLiteral:
                case SyntaxKind.JSDocTypeLiteral:
                case SyntaxKind.JsxAttributes:
                    return ContainerFlags.IsContainer;

                case SyntaxKind.InterfaceDeclaration:
                    return ContainerFlags.IsContainer | ContainerFlags.IsInterface;

                case SyntaxKind.ModuleDeclaration:
                case SyntaxKind.TypeAliasDeclaration:
                case SyntaxKind.MappedType:
                    return ContainerFlags.IsContainer | ContainerFlags.HasLocals;

                case SyntaxKind.SourceFile:
                    return ContainerFlags.IsContainer | ContainerFlags.IsControlFlowContainer | ContainerFlags.HasLocals;

                case SyntaxKind.MethodDeclaration:
                    if (isObjectLiteralOrClassExpressionMethod(node)) {
                        return ContainerFlags.IsContainer | ContainerFlags.IsControlFlowContainer | ContainerFlags.HasLocals | ContainerFlags.IsFunctionLike | ContainerFlags.IsObjectLiteralOrClassExpressionMethod;
                    }
                // falls through
                case SyntaxKind.Constructor:
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.MethodSignature:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                case SyntaxKind.CallSignature:
                case SyntaxKind.JSDocFunctionType:
                case SyntaxKind.FunctionType:
                case SyntaxKind.ConstructSignature:
                case SyntaxKind.IndexSignature:
                case SyntaxKind.ConstructorType:
                    return ContainerFlags.IsContainer | ContainerFlags.IsControlFlowContainer | ContainerFlags.HasLocals | ContainerFlags.IsFunctionLike;

                case SyntaxKind.FunctionExpression:
                case SyntaxKind.ArrowFunction:
                    return ContainerFlags.IsContainer | ContainerFlags.IsControlFlowContainer | ContainerFlags.HasLocals | ContainerFlags.IsFunctionLike | ContainerFlags.IsFunctionExpression;

                case SyntaxKind.ModuleBlock:
                    return ContainerFlags.IsControlFlowContainer;
                case SyntaxKind.PropertyDeclaration:
                    return (<PropertyDeclaration>node).initializer ? ContainerFlags.IsControlFlowContainer : 0;

                case SyntaxKind.CatchClause:
                case SyntaxKind.ForStatement:
                case SyntaxKind.ForInStatement:
                case SyntaxKind.ForOfStatement:
                case SyntaxKind.CaseBlock:
                    return ContainerFlags.IsBlockScopedContainer;

                case SyntaxKind.Block:
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
                    return isFunctionLike(node.parent) ? ContainerFlags.None : ContainerFlags.IsBlockScopedContainer;
            }

            return ContainerFlags.None;
        }

        function addToContainerChain(next: Node) {
            if (lastContainer) {
                lastContainer.nextContainer = next;
            }

            lastContainer = next;
        }

        function declareSymbolAndAddToSymbolTable(node: Declaration, symbolFlags: SymbolFlags, symbolExcludes: SymbolFlags): Symbol {
            switch (container.kind) {
                // Modules, source files, and classes need specialized handling for how their
                // members are declared (for example, a member of a class will go into a specific
                // symbol table depending on if it is static or not). We defer to specialized
                // handlers to take care of declaring these child members.
                case SyntaxKind.ModuleDeclaration:
                    return declareModuleMember(node, symbolFlags, symbolExcludes);

                case SyntaxKind.SourceFile:
                    return declareSourceFileMember(node, symbolFlags, symbolExcludes);

                case SyntaxKind.ClassExpression:
                case SyntaxKind.ClassDeclaration:
                    return declareClassMember(node, symbolFlags, symbolExcludes);

                case SyntaxKind.EnumDeclaration:
                    return declareSymbol(container.symbol.exports, container.symbol, node, symbolFlags, symbolExcludes);

                case SyntaxKind.TypeLiteral:
                case SyntaxKind.JSDocTypeLiteral:
                case SyntaxKind.ObjectLiteralExpression:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.JsxAttributes:
                    // Interface/Object-types always have their children added to the 'members' of
                    // their container. They are only accessible through an instance of their
                    // container, and are never in scope otherwise (even inside the body of the
                    // object / type / interface declaring them). An exception is type parameters,
                    // which are in scope without qualification (similar to 'locals').
                    return declareSymbol(container.symbol.members, container.symbol, node, symbolFlags, symbolExcludes);

                case SyntaxKind.FunctionType:
                case SyntaxKind.ConstructorType:
                case SyntaxKind.CallSignature:
                case SyntaxKind.ConstructSignature:
                case SyntaxKind.IndexSignature:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                case SyntaxKind.Constructor:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.ArrowFunction:
                case SyntaxKind.JSDocFunctionType:
                case SyntaxKind.TypeAliasDeclaration:
                case SyntaxKind.MappedType:
                    // All the children of these container types are never visible through another
                    // symbol (i.e. through another symbol's 'exports' or 'members').  Instead,
                    // they're only accessed 'lexically' (i.e. from code that exists underneath
                    // their container in the tree). To accomplish this, we simply add their declared
                    // symbol to the 'locals' of the container.  These symbols can then be found as
                    // the type checker walks up the containers, checking them for matching names.
                    return declareSymbol(container.locals, /*parent*/ undefined, node, symbolFlags, symbolExcludes);
            }
        }

        function declareClassMember(node: Declaration, symbolFlags: SymbolFlags, symbolExcludes: SymbolFlags) {
            return hasModifier(node, ModifierFlags.Static)
                ? declareSymbol(container.symbol.exports, container.symbol, node, symbolFlags, symbolExcludes)
                : declareSymbol(container.symbol.members, container.symbol, node, symbolFlags, symbolExcludes);
        }

        function declareSourceFileMember(node: Declaration, symbolFlags: SymbolFlags, symbolExcludes: SymbolFlags) {
            return isExternalModule(file)
                ? declareModuleMember(node, symbolFlags, symbolExcludes)
                : declareSymbol(file.locals, /*parent*/ undefined, node, symbolFlags, symbolExcludes);
        }

        function hasExportDeclarations(node: ModuleDeclaration | SourceFile): boolean {
            const body = node.kind === SyntaxKind.SourceFile ? node : node.body;
            if (body && (body.kind === SyntaxKind.SourceFile || body.kind === SyntaxKind.ModuleBlock)) {
                for (const stat of (<BlockLike>body).statements) {
                    if (stat.kind === SyntaxKind.ExportDeclaration || stat.kind === SyntaxKind.ExportAssignment) {
                        return true;
                    }
                }
            }
            return false;
        }

        function setExportContextFlag(node: ModuleDeclaration | SourceFile) {
            // A declaration source file or ambient module declaration that contains no export declarations (but possibly regular
            // declarations with export modifiers) is an export context in which declarations are implicitly exported.
            if (node.flags & NodeFlags.Ambient && !hasExportDeclarations(node)) {
                node.flags |= NodeFlags.ExportContext;
            }
            else {
                node.flags &= ~NodeFlags.ExportContext;
            }
        }

        function bindModuleDeclaration(node: ModuleDeclaration) {
            setExportContextFlag(node);
            if (isAmbientModule(node)) {
                if (hasModifier(node, ModifierFlags.Export)) {
                    errorOnFirstToken(node, Diagnostics.export_modifier_cannot_be_applied_to_ambient_modules_and_module_augmentations_since_they_are_always_visible);
                }
                if (isModuleAugmentationExternal(node)) {
                    declareModuleSymbol(node);
                }
                else {
                    let pattern: Pattern | undefined;
                    if (node.name.kind === SyntaxKind.StringLiteral) {
                        const { text } = node.name;
                        if (hasZeroOrOneAsteriskCharacter(text)) {
                            pattern = tryParsePattern(text);
                        }
                        else {
                            errorOnFirstToken(node.name, Diagnostics.Pattern_0_can_have_at_most_one_Asterisk_character, text);
                        }
                    }

                    const symbol = declareSymbolAndAddToSymbolTable(node, SymbolFlags.ValueModule, SymbolFlags.ValueModuleExcludes);
                    file.patternAmbientModules = append(file.patternAmbientModules, pattern && { pattern, symbol });
                }
            }
            else {
                const state = declareModuleSymbol(node);
                if (state !== ModuleInstanceState.NonInstantiated) {
                    const { symbol } = node;
                    // if module was already merged with some function, class or non-const enum, treat it as non-const-enum-only
                    symbol.constEnumOnlyModule = (!(symbol.flags & (SymbolFlags.Function | SymbolFlags.Class | SymbolFlags.RegularEnum)))
                        // Current must be `const enum` only
                        && state === ModuleInstanceState.ConstEnumOnly
                        // Can't have been set to 'false' in a previous merged symbol. ('undefined' OK)
                        && symbol.constEnumOnlyModule !== false;
                }
            }
        }

        function declareModuleSymbol(node: ModuleDeclaration): ModuleInstanceState {
            const state = getModuleInstanceState(node);
            const instantiated = state !== ModuleInstanceState.NonInstantiated;
            declareSymbolAndAddToSymbolTable(node,
                instantiated ? SymbolFlags.ValueModule : SymbolFlags.NamespaceModule,
                instantiated ? SymbolFlags.ValueModuleExcludes : SymbolFlags.NamespaceModuleExcludes);
            return state;
        }

        function bindFunctionOrConstructorType(node: SignatureDeclaration): void {
            // For a given function symbol "<...>(...) => T" we want to generate a symbol identical
            // to the one we would get for: { <...>(...): T }
            //
            // We do that by making an anonymous type literal symbol, and then setting the function
            // symbol as its sole member. To the rest of the system, this symbol will be indistinguishable
            // from an actual type literal symbol you would have gotten had you used the long form.
            const symbol = createSymbol(SymbolFlags.Signature, getDeclarationName(node));
            addDeclarationToSymbol(symbol, node, SymbolFlags.Signature);

            const typeLiteralSymbol = createSymbol(SymbolFlags.TypeLiteral, InternalSymbolName.Type);
            addDeclarationToSymbol(typeLiteralSymbol, node, SymbolFlags.TypeLiteral);
            typeLiteralSymbol.members = createSymbolTable();
            typeLiteralSymbol.members.set(symbol.escapedName, symbol);
        }

        function bindObjectLiteralExpression(node: ObjectLiteralExpression) {
            const enum ElementKind {
                Property = 1,
                Accessor = 2
            }

            if (inStrictMode) {
                const seen = createUnderscoreEscapedMap<ElementKind>();

                for (const prop of node.properties) {
                    if (prop.kind === SyntaxKind.SpreadAssignment || prop.name.kind !== SyntaxKind.Identifier) {
                        continue;
                    }

                    const identifier = prop.name;

                    // ECMA-262 11.1.5 Object Initializer
                    // If previous is not undefined then throw a SyntaxError exception if any of the following conditions are true
                    // a.This production is contained in strict code and IsDataDescriptor(previous) is true and
                    // IsDataDescriptor(propId.descriptor) is true.
                    //    b.IsDataDescriptor(previous) is true and IsAccessorDescriptor(propId.descriptor) is true.
                    //    c.IsAccessorDescriptor(previous) is true and IsDataDescriptor(propId.descriptor) is true.
                    //    d.IsAccessorDescriptor(previous) is true and IsAccessorDescriptor(propId.descriptor) is true
                    // and either both previous and propId.descriptor have[[Get]] fields or both previous and propId.descriptor have[[Set]] fields
                    const currentKind = prop.kind === SyntaxKind.PropertyAssignment || prop.kind === SyntaxKind.ShorthandPropertyAssignment || prop.kind === SyntaxKind.MethodDeclaration
                        ? ElementKind.Property
                        : ElementKind.Accessor;

                    const existingKind = seen.get(identifier.escapedText);
                    if (!existingKind) {
                        seen.set(identifier.escapedText, currentKind);
                        continue;
                    }

                    if (currentKind === ElementKind.Property && existingKind === ElementKind.Property) {
                        const span = getErrorSpanForNode(file, identifier);
                        file.bindDiagnostics.push(createFileDiagnostic(file, span.start, span.length,
                            Diagnostics.An_object_literal_cannot_have_multiple_properties_with_the_same_name_in_strict_mode));
                    }
                }
            }

            return bindAnonymousDeclaration(node, SymbolFlags.ObjectLiteral, InternalSymbolName.Object);
        }

        function bindJsxAttributes(node: JsxAttributes) {
            return bindAnonymousDeclaration(node, SymbolFlags.ObjectLiteral, InternalSymbolName.JSXAttributes);
        }

        function bindJsxAttribute(node: JsxAttribute, symbolFlags: SymbolFlags, symbolExcludes: SymbolFlags) {
            return declareSymbolAndAddToSymbolTable(node, symbolFlags, symbolExcludes);
        }

        function bindAnonymousDeclaration(node: Declaration, symbolFlags: SymbolFlags, name: __String) {
            const symbol = createSymbol(symbolFlags, name);
            if (symbolFlags & (SymbolFlags.EnumMember | SymbolFlags.ClassMember)) {
                symbol.parent = container.symbol;
            }
            addDeclarationToSymbol(symbol, node, symbolFlags);
        }

        function bindBlockScopedDeclaration(node: Declaration, symbolFlags: SymbolFlags, symbolExcludes: SymbolFlags) {
            switch (blockScopeContainer.kind) {
                case SyntaxKind.ModuleDeclaration:
                    declareModuleMember(node, symbolFlags, symbolExcludes);
                    break;
                case SyntaxKind.SourceFile:
                    if (isExternalOrCommonJsModule(<SourceFile>container)) {
                        declareModuleMember(node, symbolFlags, symbolExcludes);
                        break;
                    }
                // falls through
                default:
                    if (!blockScopeContainer.locals) {
                        blockScopeContainer.locals = createSymbolTable();
                        addToContainerChain(blockScopeContainer);
                    }
                    declareSymbol(blockScopeContainer.locals, /*parent*/ undefined, node, symbolFlags, symbolExcludes);
            }
        }

        function bindBlockScopedVariableDeclaration(node: Declaration) {
            bindBlockScopedDeclaration(node, SymbolFlags.BlockScopedVariable, SymbolFlags.BlockScopedVariableExcludes);
        }

        function delayedBindJSDocTypedefTag() {
            if (!delayedTypedefs) {
                return;
            }
            const saveContainer = container;
            const saveLastContainer = lastContainer;
            const saveBlockScopeContainer = blockScopeContainer;
            const saveParent = parent;
            for (const delay of delayedTypedefs) {
                ({ container, lastContainer, blockScopeContainer, parent } = delay);
                bindBlockScopedDeclaration(delay.typedef, SymbolFlags.TypeAlias, SymbolFlags.TypeAliasExcludes);
            }
            container = saveContainer;
            lastContainer = saveLastContainer;
            blockScopeContainer = saveBlockScopeContainer;
            parent = saveParent;
        }

        // The binder visits every node in the syntax tree so it is a convenient place to perform a single localized
        // check for reserved words used as identifiers in strict mode code.
        function checkStrictModeIdentifier(node: Identifier) {
            if (inStrictMode &&
                node.originalKeywordKind >= SyntaxKind.FirstFutureReservedWord &&
                node.originalKeywordKind <= SyntaxKind.LastFutureReservedWord &&
                !isIdentifierName(node) &&
                !(node.flags & NodeFlags.Ambient)) {

                // Report error only if there are no parse errors in file
                if (!file.parseDiagnostics.length) {
                    file.bindDiagnostics.push(createDiagnosticForNode(node,
                        getStrictModeIdentifierMessage(node), declarationNameToString(node)));
                }
            }
        }

        function getStrictModeIdentifierMessage(node: Node) {
            // Provide specialized messages to help the user understand why we think they're in
            // strict mode.
            if (getContainingClass(node)) {
                return Diagnostics.Identifier_expected_0_is_a_reserved_word_in_strict_mode_Class_definitions_are_automatically_in_strict_mode;
            }

            if (file.externalModuleIndicator) {
                return Diagnostics.Identifier_expected_0_is_a_reserved_word_in_strict_mode_Modules_are_automatically_in_strict_mode;
            }

            return Diagnostics.Identifier_expected_0_is_a_reserved_word_in_strict_mode;
        }

        function checkStrictModeBinaryExpression(node: BinaryExpression) {
            if (inStrictMode && isLeftHandSideExpression(node.left) && isAssignmentOperator(node.operatorToken.kind)) {
                // ECMA 262 (Annex C) The identifier eval or arguments may not appear as the LeftHandSideExpression of an
                // Assignment operator(11.13) or of a PostfixExpression(11.3)
                checkStrictModeEvalOrArguments(node, <Identifier>node.left);
            }
        }

        function checkStrictModeCatchClause(node: CatchClause) {
            // It is a SyntaxError if a TryStatement with a Catch occurs within strict code and the Identifier of the
            // Catch production is eval or arguments
            if (inStrictMode && node.variableDeclaration) {
                checkStrictModeEvalOrArguments(node, node.variableDeclaration.name);
            }
        }

        function checkStrictModeDeleteExpression(node: DeleteExpression) {
            // Grammar checking
            if (inStrictMode && node.expression.kind === SyntaxKind.Identifier) {
                // When a delete operator occurs within strict mode code, a SyntaxError is thrown if its
                // UnaryExpression is a direct reference to a variable, function argument, or function name
                const span = getErrorSpanForNode(file, node.expression);
                file.bindDiagnostics.push(createFileDiagnostic(file, span.start, span.length, Diagnostics.delete_cannot_be_called_on_an_identifier_in_strict_mode));
            }
        }

        function isEvalOrArgumentsIdentifier(node: Node): boolean {
            return isIdentifier(node) && (node.escapedText === "eval" || node.escapedText === "arguments");
        }

        function checkStrictModeEvalOrArguments(contextNode: Node, name: Node) {
            if (name && name.kind === SyntaxKind.Identifier) {
                const identifier = <Identifier>name;
                if (isEvalOrArgumentsIdentifier(identifier)) {
                    // We check first if the name is inside class declaration or class expression; if so give explicit message
                    // otherwise report generic error message.
                    const span = getErrorSpanForNode(file, name);
                    file.bindDiagnostics.push(createFileDiagnostic(file, span.start, span.length,
                        getStrictModeEvalOrArgumentsMessage(contextNode), idText(identifier)));
                }
            }
        }

        function getStrictModeEvalOrArgumentsMessage(node: Node) {
            // Provide specialized messages to help the user understand why we think they're in
            // strict mode.
            if (getContainingClass(node)) {
                return Diagnostics.Invalid_use_of_0_Class_definitions_are_automatically_in_strict_mode;
            }

            if (file.externalModuleIndicator) {
                return Diagnostics.Invalid_use_of_0_Modules_are_automatically_in_strict_mode;
            }

            return Diagnostics.Invalid_use_of_0_in_strict_mode;
        }

        function checkStrictModeFunctionName(node: FunctionLikeDeclaration) {
            if (inStrictMode) {
                // It is a SyntaxError if the identifier eval or arguments appears within a FormalParameterList of a strict mode FunctionDeclaration or FunctionExpression (13.1))
                checkStrictModeEvalOrArguments(node, node.name);
            }
        }

        function getStrictModeBlockScopeFunctionDeclarationMessage(node: Node) {
            // Provide specialized messages to help the user understand why we think they're in
            // strict mode.
            if (getContainingClass(node)) {
                return Diagnostics.Function_declarations_are_not_allowed_inside_blocks_in_strict_mode_when_targeting_ES3_or_ES5_Class_definitions_are_automatically_in_strict_mode;
            }

            if (file.externalModuleIndicator) {
                return Diagnostics.Function_declarations_are_not_allowed_inside_blocks_in_strict_mode_when_targeting_ES3_or_ES5_Modules_are_automatically_in_strict_mode;
            }

            return Diagnostics.Function_declarations_are_not_allowed_inside_blocks_in_strict_mode_when_targeting_ES3_or_ES5;
        }

        function checkStrictModeFunctionDeclaration(node: FunctionDeclaration) {
            if (languageVersion < ScriptTarget.ES2015) {
                // Report error if function is not top level function declaration
                if (blockScopeContainer.kind !== SyntaxKind.SourceFile &&
                    blockScopeContainer.kind !== SyntaxKind.ModuleDeclaration &&
                    !isFunctionLike(blockScopeContainer)) {
                    // We check first if the name is inside class declaration or class expression; if so give explicit message
                    // otherwise report generic error message.
                    const errorSpan = getErrorSpanForNode(file, node);
                    file.bindDiagnostics.push(createFileDiagnostic(file, errorSpan.start, errorSpan.length,
                        getStrictModeBlockScopeFunctionDeclarationMessage(node)));
                }
            }
        }

        function checkStrictModeNumericLiteral(node: NumericLiteral) {
            if (inStrictMode && node.numericLiteralFlags & TokenFlags.Octal) {
                file.bindDiagnostics.push(createDiagnosticForNode(node, Diagnostics.Octal_literals_are_not_allowed_in_strict_mode));
            }
        }

        function checkStrictModePostfixUnaryExpression(node: PostfixUnaryExpression) {
            // Grammar checking
            // The identifier eval or arguments may not appear as the LeftHandSideExpression of an
            // Assignment operator(11.13) or of a PostfixExpression(11.3) or as the UnaryExpression
            // operated upon by a Prefix Increment(11.4.4) or a Prefix Decrement(11.4.5) operator.
            if (inStrictMode) {
                checkStrictModeEvalOrArguments(node, <Identifier>node.operand);
            }
        }

        function checkStrictModePrefixUnaryExpression(node: PrefixUnaryExpression) {
            // Grammar checking
            if (inStrictMode) {
                if (node.operator === SyntaxKind.PlusPlusToken || node.operator === SyntaxKind.MinusMinusToken) {
                    checkStrictModeEvalOrArguments(node, <Identifier>node.operand);
                }
            }
        }

        function checkStrictModeWithStatement(node: WithStatement) {
            // Grammar checking for withStatement
            if (inStrictMode) {
                errorOnFirstToken(node, Diagnostics.with_statements_are_not_allowed_in_strict_mode);
            }
        }

        function errorOnFirstToken(node: Node, message: DiagnosticMessage, arg0?: any, arg1?: any, arg2?: any) {
            const span = getSpanOfTokenAtPosition(file, node.pos);
            file.bindDiagnostics.push(createFileDiagnostic(file, span.start, span.length, message, arg0, arg1, arg2));
        }

        function bind(node: Node): void {
            if (!node) {
                return;
            }
            node.parent = parent;
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
            if (isInJavaScriptFile(node)) bindJSDocTypedefTagIfAny(node);

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
            if (node.kind > SyntaxKind.LastToken) {
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
            else if (!skipTransformFlagAggregation && (node.transformFlags & TransformFlags.HasComputedFlags) === 0) {
                subtreeTransformFlags |= computeTransformFlagsForNode(node, 0);
            }
            inStrictMode = saveInStrictMode;
        }

        function bindJSDocTypedefTagIfAny(node: Node) {
            if (!hasJSDocNodes(node)) {
                return;
            }

            for (const jsDoc of node.jsDoc) {
                if (!jsDoc.tags) {
                    continue;
                }

                for (const tag of jsDoc.tags) {
                    if (tag.kind === SyntaxKind.JSDocTypedefTag) {
                        const savedParent = parent;
                        parent = jsDoc;
                        bind(tag);
                        parent = savedParent;
                    }
                }
            }
        }

        function updateStrictModeStatementList(statements: NodeArray<Statement>) {
            if (!inStrictMode) {
                for (const statement of statements) {
                    if (!isPrologueDirective(statement)) {
                        return;
                    }

                    if (isUseStrictPrologueDirective(<ExpressionStatement>statement)) {
                        inStrictMode = true;
                        return;
                    }
                }
            }
        }

        /// Should be called only on prologue directives (isPrologueDirective(node) should be true)
        function isUseStrictPrologueDirective(node: ExpressionStatement): boolean {
            const nodeText = getSourceTextOfNodeFromSourceFile(file, node.expression);

            // Note: the node text must be exactly "use strict" or 'use strict'.  It is not ok for the
            // string to contain unicode escapes (as per ES5).
            return nodeText === '"use strict"' || nodeText === "'use strict'";
        }

        function bindWorker(node: Node) {
            switch (node.kind) {
                /* Strict mode checks */
                case SyntaxKind.Identifier:
                    // for typedef type names with namespaces, bind the new jsdoc type symbol here
                    // because it requires all containing namespaces to be in effect, namely the
                    // current "blockScopeContainer" needs to be set to its immediate namespace parent.
                    if ((<Identifier>node).isInJSDocNamespace) {
                        let parentNode = node.parent;
                        while (parentNode && parentNode.kind !== SyntaxKind.JSDocTypedefTag) {
                            parentNode = parentNode.parent;
                        }
                        bindBlockScopedDeclaration(<Declaration>parentNode, SymbolFlags.TypeAlias, SymbolFlags.TypeAliasExcludes);
                        break;
                    }
                // falls through
                case SyntaxKind.ThisKeyword:
                    if (currentFlow && (isExpression(node) || parent.kind === SyntaxKind.ShorthandPropertyAssignment)) {
                        node.flowNode = currentFlow;
                    }
                    return checkStrictModeIdentifier(<Identifier>node);
                case SyntaxKind.PropertyAccessExpression:
                    if (currentFlow && isNarrowableReference(<Expression>node)) {
                        node.flowNode = currentFlow;
                    }
                    if (isSpecialPropertyDeclaration(node as PropertyAccessExpression)) {
                        bindSpecialPropertyDeclaration(node as PropertyAccessExpression);
                    }
                    break;
                case SyntaxKind.BinaryExpression:
                    const specialKind = getSpecialPropertyAssignmentKind(node as BinaryExpression);
                    switch (specialKind) {
                        case SpecialPropertyAssignmentKind.ExportsProperty:
                            bindExportsPropertyAssignment(node as BinaryExpression);
                            break;
                        case SpecialPropertyAssignmentKind.ModuleExports:
                            bindModuleExportsAssignment(node as BinaryExpression);
                            break;
                        case SpecialPropertyAssignmentKind.PrototypeProperty:
                            bindPrototypePropertyAssignment((node as BinaryExpression).left as PropertyAccessEntityNameExpression, node);
                            break;
                        case SpecialPropertyAssignmentKind.Prototype:
                            bindPrototypeAssignment(node as BinaryExpression);
                            break;
                        case SpecialPropertyAssignmentKind.ThisProperty:
                            bindThisPropertyAssignment(node as BinaryExpression);
                            break;
                        case SpecialPropertyAssignmentKind.Property:
                            bindSpecialPropertyAssignment(node as BinaryExpression);
                            break;
                        case SpecialPropertyAssignmentKind.None:
                            // Nothing to do
                            break;
                        default:
                            Debug.fail("Unknown special property assignment kind");
                    }
                    return checkStrictModeBinaryExpression(<BinaryExpression>node);
                case SyntaxKind.CatchClause:
                    return checkStrictModeCatchClause(<CatchClause>node);
                case SyntaxKind.DeleteExpression:
                    return checkStrictModeDeleteExpression(<DeleteExpression>node);
                case SyntaxKind.NumericLiteral:
                    return checkStrictModeNumericLiteral(<NumericLiteral>node);
                case SyntaxKind.PostfixUnaryExpression:
                    return checkStrictModePostfixUnaryExpression(<PostfixUnaryExpression>node);
                case SyntaxKind.PrefixUnaryExpression:
                    return checkStrictModePrefixUnaryExpression(<PrefixUnaryExpression>node);
                case SyntaxKind.WithStatement:
                    return checkStrictModeWithStatement(<WithStatement>node);
                case SyntaxKind.ThisType:
                    seenThisKeyword = true;
                    return;
                case SyntaxKind.TypePredicate:
                    break; // Binding the children will handle everything
                case SyntaxKind.TypeParameter:
                    return bindTypeParameter(node as TypeParameterDeclaration);
                case SyntaxKind.Parameter:
                    return bindParameter(<ParameterDeclaration>node);
                case SyntaxKind.VariableDeclaration:
                    return bindVariableDeclarationOrBindingElement(<VariableDeclaration>node);
                case SyntaxKind.BindingElement:
                    node.flowNode = currentFlow;
                    return bindVariableDeclarationOrBindingElement(<BindingElement>node);
                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.PropertySignature:
                    return bindPropertyWorker(node as PropertyDeclaration | PropertySignature);
                case SyntaxKind.PropertyAssignment:
                case SyntaxKind.ShorthandPropertyAssignment:
                    return bindPropertyOrMethodOrAccessor(<Declaration>node, SymbolFlags.Property, SymbolFlags.PropertyExcludes);
                case SyntaxKind.EnumMember:
                    return bindPropertyOrMethodOrAccessor(<Declaration>node, SymbolFlags.EnumMember, SymbolFlags.EnumMemberExcludes);

                case SyntaxKind.CallSignature:
                case SyntaxKind.ConstructSignature:
                case SyntaxKind.IndexSignature:
                    return declareSymbolAndAddToSymbolTable(<Declaration>node, SymbolFlags.Signature, SymbolFlags.None);
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                    // If this is an ObjectLiteralExpression method, then it sits in the same space
                    // as other properties in the object literal.  So we use SymbolFlags.PropertyExcludes
                    // so that it will conflict with any other object literal members with the same
                    // name.
                    return bindPropertyOrMethodOrAccessor(<Declaration>node, SymbolFlags.Method | ((<MethodDeclaration>node).questionToken ? SymbolFlags.Optional : SymbolFlags.None),
                        isObjectLiteralMethod(node) ? SymbolFlags.PropertyExcludes : SymbolFlags.MethodExcludes);
                case SyntaxKind.FunctionDeclaration:
                    return bindFunctionDeclaration(<FunctionDeclaration>node);
                case SyntaxKind.Constructor:
                    return declareSymbolAndAddToSymbolTable(<Declaration>node, SymbolFlags.Constructor, /*symbolExcludes:*/ SymbolFlags.None);
                case SyntaxKind.GetAccessor:
                    return bindPropertyOrMethodOrAccessor(<Declaration>node, SymbolFlags.GetAccessor, SymbolFlags.GetAccessorExcludes);
                case SyntaxKind.SetAccessor:
                    return bindPropertyOrMethodOrAccessor(<Declaration>node, SymbolFlags.SetAccessor, SymbolFlags.SetAccessorExcludes);
                case SyntaxKind.FunctionType:
                case SyntaxKind.JSDocFunctionType:
                case SyntaxKind.ConstructorType:
                    return bindFunctionOrConstructorType(<SignatureDeclaration>node);
                case SyntaxKind.TypeLiteral:
                case SyntaxKind.JSDocTypeLiteral:
                case SyntaxKind.MappedType:
                    return bindAnonymousTypeWorker(node as TypeLiteralNode | MappedTypeNode | JSDocTypeLiteral);
                case SyntaxKind.ObjectLiteralExpression:
                    return bindObjectLiteralExpression(<ObjectLiteralExpression>node);
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.ArrowFunction:
                    return bindFunctionExpression(<FunctionExpression>node);

                case SyntaxKind.CallExpression:
                    if (isInJavaScriptFile(node)) {
                        bindCallExpression(<CallExpression>node);
                    }
                    break;

                // Members of classes, interfaces, and modules
                case SyntaxKind.ClassExpression:
                case SyntaxKind.ClassDeclaration:
                    // All classes are automatically in strict mode in ES6.
                    inStrictMode = true;
                    return bindClassLikeDeclaration(<ClassLikeDeclaration>node);
                case SyntaxKind.InterfaceDeclaration:
                    return bindBlockScopedDeclaration(<Declaration>node, SymbolFlags.Interface, SymbolFlags.InterfaceExcludes);
                case SyntaxKind.TypeAliasDeclaration:
                    return bindBlockScopedDeclaration(<Declaration>node, SymbolFlags.TypeAlias, SymbolFlags.TypeAliasExcludes);
                case SyntaxKind.EnumDeclaration:
                    return bindEnumDeclaration(<EnumDeclaration>node);
                case SyntaxKind.ModuleDeclaration:
                    return bindModuleDeclaration(<ModuleDeclaration>node);
                // Jsx-attributes
                case SyntaxKind.JsxAttributes:
                    return bindJsxAttributes(<JsxAttributes>node);
                case SyntaxKind.JsxAttribute:
                    return bindJsxAttribute(<JsxAttribute>node, SymbolFlags.Property, SymbolFlags.PropertyExcludes);

                // Imports and exports
                case SyntaxKind.ImportEqualsDeclaration:
                case SyntaxKind.NamespaceImport:
                case SyntaxKind.ImportSpecifier:
                case SyntaxKind.ExportSpecifier:
                    return declareSymbolAndAddToSymbolTable(<Declaration>node, SymbolFlags.Alias, SymbolFlags.AliasExcludes);
                case SyntaxKind.NamespaceExportDeclaration:
                    return bindNamespaceExportDeclaration(<NamespaceExportDeclaration>node);
                case SyntaxKind.ImportClause:
                    return bindImportClause(<ImportClause>node);
                case SyntaxKind.ExportDeclaration:
                    return bindExportDeclaration(<ExportDeclaration>node);
                case SyntaxKind.ExportAssignment:
                    return bindExportAssignment(<ExportAssignment>node);
                case SyntaxKind.SourceFile:
                    updateStrictModeStatementList((<SourceFile>node).statements);
                    return bindSourceFileIfExternalModule();
                case SyntaxKind.Block:
                    if (!isFunctionLike(node.parent)) {
                        return;
                    }
                // falls through
                case SyntaxKind.ModuleBlock:
                    return updateStrictModeStatementList((<Block | ModuleBlock>node).statements);

                case SyntaxKind.JSDocParameterTag:
                    if (node.parent.kind !== SyntaxKind.JSDocTypeLiteral) {
                        break;
                    }
                    // falls through
                case SyntaxKind.JSDocPropertyTag:
                    const propTag = node as JSDocPropertyLikeTag;
                    const flags = propTag.isBracketed || propTag.typeExpression && propTag.typeExpression.type.kind === SyntaxKind.JSDocOptionalType ?
                        SymbolFlags.Property | SymbolFlags.Optional :
                        SymbolFlags.Property;
                    return declareSymbolAndAddToSymbolTable(propTag, flags, SymbolFlags.PropertyExcludes);
                case SyntaxKind.JSDocTypedefTag: {
                    const { fullName } = node as JSDocTypedefTag;
                    if (!fullName || fullName.kind === SyntaxKind.Identifier) {
                        (delayedTypedefs || (delayedTypedefs = [])).push({ typedef: node as JSDocTypedefTag, container, lastContainer, blockScopeContainer, parent });
                    }
                    break;
                }
            }
        }

        function bindPropertyWorker(node: PropertyDeclaration | PropertySignature) {
            return bindPropertyOrMethodOrAccessor(node, SymbolFlags.Property | (node.questionToken ? SymbolFlags.Optional : SymbolFlags.None), SymbolFlags.PropertyExcludes);
        }

        function bindAnonymousTypeWorker(node: TypeLiteralNode | MappedTypeNode | JSDocTypeLiteral) {
            return bindAnonymousDeclaration(<Declaration>node, SymbolFlags.TypeLiteral, InternalSymbolName.Type);
        }

        function bindSourceFileIfExternalModule() {
            setExportContextFlag(file);
            if (isExternalModule(file)) {
                bindSourceFileAsExternalModule();
            }
            else if (isJsonSourceFile(file)) {
                bindSourceFileAsExternalModule();
                // Create symbol equivalent for the module.exports = {}
                const originalSymbol = file.symbol;
                declareSymbol(file.symbol.exports, file.symbol, file, SymbolFlags.Property, SymbolFlags.All);
                file.symbol = originalSymbol;
            }
        }

        function bindSourceFileAsExternalModule() {
            bindAnonymousDeclaration(file, SymbolFlags.ValueModule, `"${removeFileExtension(file.fileName)}"` as __String);
        }

        function bindExportAssignment(node: ExportAssignment) {
            if (!container.symbol || !container.symbol.exports) {
                // Export assignment in some sort of block construct
                bindAnonymousDeclaration(node, SymbolFlags.Alias, getDeclarationName(node));
            }
            else {
                const flags = node.kind === SyntaxKind.ExportAssignment && exportAssignmentIsAlias(node)
                    // An export default clause with an EntityNameExpression or a class expression exports all meanings of that identifier or expression;
                    ? SymbolFlags.Alias
                    // An export default clause with any other expression exports a value
                    : SymbolFlags.Property;
                // If there is an `export default x;` alias declaration, can't `export default` anything else.
                // (In contrast, you can still have `export default function f() {}` and `export default interface I {}`.)
                declareSymbol(container.symbol.exports, container.symbol, node, flags, SymbolFlags.All);
            }
        }

        function bindNamespaceExportDeclaration(node: NamespaceExportDeclaration) {
            if (node.modifiers && node.modifiers.length) {
                file.bindDiagnostics.push(createDiagnosticForNode(node, Diagnostics.Modifiers_cannot_appear_here));
            }

            if (node.parent.kind !== SyntaxKind.SourceFile) {
                file.bindDiagnostics.push(createDiagnosticForNode(node, Diagnostics.Global_module_exports_may_only_appear_at_top_level));
                return;
            }
            else {
                const parent = node.parent as SourceFile;

                if (!isExternalModule(parent)) {
                    file.bindDiagnostics.push(createDiagnosticForNode(node, Diagnostics.Global_module_exports_may_only_appear_in_module_files));
                    return;
                }

                if (!parent.isDeclarationFile) {
                    file.bindDiagnostics.push(createDiagnosticForNode(node, Diagnostics.Global_module_exports_may_only_appear_in_declaration_files));
                    return;
                }
            }

            file.symbol.globalExports = file.symbol.globalExports || createSymbolTable();
            declareSymbol(file.symbol.globalExports, file.symbol, node, SymbolFlags.Alias, SymbolFlags.AliasExcludes);
        }

        function bindExportDeclaration(node: ExportDeclaration) {
            if (!container.symbol || !container.symbol.exports) {
                // Export * in some sort of block construct
                bindAnonymousDeclaration(node, SymbolFlags.ExportStar, getDeclarationName(node));
            }
            else if (!node.exportClause) {
                // All export * declarations are collected in an __export symbol
                declareSymbol(container.symbol.exports, container.symbol, node, SymbolFlags.ExportStar, SymbolFlags.None);
            }
        }

        function bindImportClause(node: ImportClause) {
            if (node.name) {
                declareSymbolAndAddToSymbolTable(node, SymbolFlags.Alias, SymbolFlags.AliasExcludes);
            }
        }

        function setCommonJsModuleIndicator(node: Node) {
            if (!file.commonJsModuleIndicator) {
                file.commonJsModuleIndicator = node;
                if (!file.externalModuleIndicator) {
                    bindSourceFileAsExternalModule();
                }
            }
        }

        function bindExportsPropertyAssignment(node: BinaryExpression) {
            // When we create a property via 'exports.foo = bar', the 'exports.foo' property access
            // expression is the declaration
            setCommonJsModuleIndicator(node);
            const lhs = node.left as PropertyAccessEntityNameExpression;
            const symbol = forEachIdentifierInEntityName(lhs.expression, (id, original) => {
                if (!original) {
                    return undefined;
                }
                const s = getJSInitializerSymbol(original);
                addDeclarationToSymbol(s, id, SymbolFlags.Module | SymbolFlags.JSContainer);
                return s;
            });
            if (symbol) {
                const flags = isClassExpression(node.right) ?
                    SymbolFlags.Property | SymbolFlags.ExportValue | SymbolFlags.Class :
                    SymbolFlags.Property | SymbolFlags.ExportValue;
                declareSymbol(symbol.exports, symbol, lhs, flags, SymbolFlags.None);
            }
        }

        function bindModuleExportsAssignment(node: BinaryExpression) {
            // A common practice in node modules is to set 'export = module.exports = {}', this ensures that 'exports'
            // is still pointing to 'module.exports'.
            // We do not want to consider this as 'export=' since a module can have only one of these.
            // Similarly we do not want to treat 'module.exports = exports' as an 'export='.
            const assignedExpression = getRightMostAssignedExpression(node.right);
            if (isEmptyObjectLiteral(assignedExpression) || container === file && isExportsOrModuleExportsOrAlias(file, assignedExpression)) {
                // Mark it as a module in case there are no other exports in the file
                setCommonJsModuleIndicator(node);
                return;
            }

            // 'module.exports = expr' assignment
            setCommonJsModuleIndicator(node);
            const flags = exportAssignmentIsAlias(node)
                ? SymbolFlags.Alias // An export= with an EntityNameExpression or a ClassExpression exports all meanings of that identifier or class
                : SymbolFlags.Property | SymbolFlags.ExportValue | SymbolFlags.ValueModule;
            declareSymbol(file.symbol.exports, file.symbol, node, flags, SymbolFlags.None);
        }

        function bindThisPropertyAssignment(node: BinaryExpression | PropertyAccessExpression) {
            Debug.assert(isInJavaScriptFile(node));
            const thisContainer = getThisContainer(node, /*includeArrowFunctions*/ false);
            switch (thisContainer.kind) {
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.FunctionExpression:
                    let constructorSymbol = thisContainer.symbol;
                    // For `f.prototype.m = function() { this.x = 0; }`, `this.x = 0` should modify `f`'s members, not the function expression.
                    if (isBinaryExpression(thisContainer.parent) && thisContainer.parent.operatorToken.kind === SyntaxKind.EqualsToken) {
                        const l = thisContainer.parent.left;
                        if (isPropertyAccessEntityNameExpression(l) && isPrototypeAccess(l.expression)) {
                            constructorSymbol = getJSInitializerSymbolFromName(l.expression.expression, thisParentContainer);
                        }
                    }

                    if (constructorSymbol) {
                        // Declare a 'member' if the container is an ES5 class or ES6 constructor
                        constructorSymbol.members = constructorSymbol.members || createSymbolTable();
                        // It's acceptable for multiple 'this' assignments of the same identifier to occur
                        declareSymbol(constructorSymbol.members, constructorSymbol, node, SymbolFlags.Property, SymbolFlags.PropertyExcludes & ~SymbolFlags.Property);
                    }
                    break;

                case SyntaxKind.Constructor:
                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                    // this.foo assignment in a JavaScript class
                    // Bind this property to the containing class
                    const containingClass = thisContainer.parent;
                    const symbolTable = hasModifier(thisContainer, ModifierFlags.Static) ? containingClass.symbol.exports : containingClass.symbol.members;
                    declareSymbol(symbolTable, containingClass.symbol, node, SymbolFlags.Property, SymbolFlags.None, /*isReplaceableByMethod*/ true);
                    break;
                case SyntaxKind.SourceFile:
                    // this.foo assignment in a source file
                    // Do not bind. It would be nice to support this someday though.
                    break;

                default:
                    Debug.fail(Debug.showSyntaxKind(thisContainer));
            }
        }

        function bindSpecialPropertyDeclaration(node: PropertyAccessExpression) {
            if (node.expression.kind === SyntaxKind.ThisKeyword) {
                bindThisPropertyAssignment(node);
            }
            else if (isPropertyAccessEntityNameExpression(node) && node.parent.parent.kind === SyntaxKind.SourceFile) {
                if (isPrototypeAccess(node.expression)) {
                    bindPrototypePropertyAssignment(node, node.parent);
                }
                else {
                    bindStaticPropertyAssignment(node);
                }
            }
        }

        /** For `x.prototype = { p, ... }`, declare members p,... if `x` is function/class/{}, or not declared. */
        function bindPrototypeAssignment(node: BinaryExpression) {
            node.left.parent = node;
            node.right.parent = node;
            const lhs = node.left as PropertyAccessEntityNameExpression;
            bindPropertyAssignment(lhs, lhs, /*isPrototypeProperty*/ false);
        }

        /**
         * For `x.prototype.y = z`, declare a member `y` on `x` if `x` is a function or class, or not declared.
         * Note that jsdoc preceding an ExpressionStatement like `x.prototype.y;` is also treated as a declaration.
         */
        function bindPrototypePropertyAssignment(lhs: PropertyAccessEntityNameExpression, parent: Node) {
            // Look up the function in the local scope, since prototype assignments should
            // follow the function declaration
            const classPrototype = lhs.expression as PropertyAccessEntityNameExpression;
            const constructorFunction = classPrototype.expression;

            // Fix up parent pointers since we're going to use these nodes before we bind into them
            lhs.parent = parent;
            constructorFunction.parent = classPrototype;
            classPrototype.parent = lhs;

            bindPropertyAssignment(constructorFunction, lhs, /*isPrototypeProperty*/ true);
        }


        function bindSpecialPropertyAssignment(node: BinaryExpression) {
            const lhs = node.left as PropertyAccessEntityNameExpression;
            // Fix up parent pointers since we're going to use these nodes before we bind into them
            node.left.parent = node;
            node.right.parent = node;
            if (isIdentifier(lhs.expression) && container === file && isNameOfExportsOrModuleExportsAliasDeclaration(file, lhs.expression)) {
                // This can be an alias for the 'exports' or 'module.exports' names, e.g.
                //    var util = module.exports;
                //    util.property = function ...
                bindExportsPropertyAssignment(node);
            }
            else {
                bindStaticPropertyAssignment(lhs);
            }
        }

        /**
         * For nodes like `x.y = z`, declare a member 'y' on 'x' if x is a function (or IIFE) or class or {}, or not declared.
         * Also works for expression statements preceded by JSDoc, like / ** @type number * / x.y;
         */
        function bindStaticPropertyAssignment(node: PropertyAccessEntityNameExpression) {
            node.expression.parent = node;
            bindPropertyAssignment(node.expression, node, /*isPrototypeProperty*/ false);
        }

        function getJSInitializerSymbolFromName(name: EntityNameExpression, lookupContainer?: Node): Symbol {
            return getJSInitializerSymbol(lookupSymbolForPropertyAccess(name, lookupContainer));
        }

        function bindPropertyAssignment(name: EntityNameExpression, propertyAccess: PropertyAccessEntityNameExpression, isPrototypeProperty: boolean) {
            let symbol = getJSInitializerSymbolFromName(name);
            const isToplevelNamespaceableInitializer = isBinaryExpression(propertyAccess.parent)
                ? getParentOfBinaryExpression(propertyAccess.parent).parent.kind === SyntaxKind.SourceFile &&
                    !!getJavascriptInitializer(getInitializerOfBinaryExpression(propertyAccess.parent), isPrototypeAccess(propertyAccess.parent.left))
                : propertyAccess.parent.parent.kind === SyntaxKind.SourceFile;
            if (!isPrototypeProperty && (!symbol || !(symbol.flags & SymbolFlags.Namespace)) && isToplevelNamespaceableInitializer) {
                // make symbols or add declarations for intermediate containers
                const flags = SymbolFlags.Module | SymbolFlags.JSContainer;
                const excludeFlags = SymbolFlags.ValueModuleExcludes & ~SymbolFlags.JSContainer;
                forEachIdentifierInEntityName(propertyAccess.expression, (id, original) => {
                    if (original) {
                        // Note: add declaration to original symbol, not the special-syntax's symbol, so that namespaces work for type lookup
                        addDeclarationToSymbol(original, id, flags);
                        return original;
                    }
                    else {
                        return symbol = declareSymbol(symbol ? symbol.exports : container.locals, symbol, id, flags, excludeFlags);
                    }
                });
            }
            if (!symbol || !(symbol.flags & (SymbolFlags.Function | SymbolFlags.Class | SymbolFlags.NamespaceModule | SymbolFlags.ObjectLiteral))) {
                return;
            }

            // Set up the members collection if it doesn't exist already
            const symbolTable = isPrototypeProperty ?
                (symbol.members || (symbol.members = createSymbolTable())) :
                (symbol.exports || (symbol.exports = createSymbolTable()));

            // Declare the method/property
            const jsContainerFlag = isToplevelNamespaceableInitializer ? SymbolFlags.JSContainer : 0;
            const isMethod = isFunctionLikeDeclaration(getAssignedJavascriptInitializer(propertyAccess));
            const symbolFlags = (isMethod ? SymbolFlags.Method : SymbolFlags.Property) | jsContainerFlag;
            const symbolExcludes = (isMethod ? SymbolFlags.MethodExcludes : SymbolFlags.PropertyExcludes) & ~jsContainerFlag;
            declareSymbol(symbolTable, symbol, propertyAccess, symbolFlags, symbolExcludes);
        }

        function getParentOfBinaryExpression(expr: BinaryExpression) {
            while (isBinaryExpression(expr.parent)) {
                expr = expr.parent;
            }
            return expr.parent;
        }

        function lookupSymbolForPropertyAccess(node: EntityNameExpression, lookupContainer: Node = container): Symbol | undefined {
            if (isIdentifier(node)) {
                return lookupSymbolForNameWorker(lookupContainer, node.escapedText);
            }
            else {
                const symbol = getJSInitializerSymbol(lookupSymbolForPropertyAccess(node.expression));
                return symbol && symbol.exports && symbol.exports.get(node.name.escapedText);
            }
        }

        function forEachIdentifierInEntityName(e: EntityNameExpression, action: (e: Identifier, symbol: Symbol) => Symbol): Symbol {
            if (isExportsOrModuleExportsOrAlias(file, e)) {
                return file.symbol;
            }
            else if (isIdentifier(e)) {
                return action(e, lookupSymbolForPropertyAccess(e));
            }
            else {
                const s = getJSInitializerSymbol(forEachIdentifierInEntityName(e.expression, action));
                Debug.assert(!!s && !!s.exports);
                return action(e.name, s.exports.get(e.name.escapedText));
            }
        }

        function bindCallExpression(node: CallExpression) {
            // We're only inspecting call expressions to detect CommonJS modules, so we can skip
            // this check if we've already seen the module indicator
            if (!file.commonJsModuleIndicator && isRequireCall(node, /*checkArgumentIsStringLiteralLike*/ false)) {
                setCommonJsModuleIndicator(node);
            }
        }

        function bindClassLikeDeclaration(node: ClassLikeDeclaration) {
            if (node.kind === SyntaxKind.ClassDeclaration) {
                bindBlockScopedDeclaration(node, SymbolFlags.Class, SymbolFlags.ClassExcludes);
            }
            else {
                const bindingName = node.name ? node.name.escapedText : InternalSymbolName.Class;
                bindAnonymousDeclaration(node, SymbolFlags.Class, bindingName);
                // Add name of class expression into the map for semantic classifier
                if (node.name) {
                    classifiableNames.set(node.name.escapedText, true);
                }
            }

            const symbol = node.symbol;

            // TypeScript 1.0 spec (April 2014): 8.4
            // Every class automatically contains a static property member named 'prototype', the
            // type of which is an instantiation of the class type with type Any supplied as a type
            // argument for each type parameter. It is an error to explicitly declare a static
            // property member with the name 'prototype'.
            //
            // Note: we check for this here because this class may be merging into a module.  The
            // module might have an exported variable called 'prototype'.  We can't allow that as
            // that would clash with the built-in 'prototype' for the class.
            const prototypeSymbol = createSymbol(SymbolFlags.Property | SymbolFlags.Prototype, "prototype" as __String);
            const symbolExport = symbol.exports.get(prototypeSymbol.escapedName);
            if (symbolExport) {
                if (node.name) {
                    node.name.parent = node;
                }
                file.bindDiagnostics.push(createDiagnosticForNode(symbolExport.declarations[0], Diagnostics.Duplicate_identifier_0, symbolName(prototypeSymbol)));
            }
            symbol.exports.set(prototypeSymbol.escapedName, prototypeSymbol);
            prototypeSymbol.parent = symbol;
        }

        function bindEnumDeclaration(node: EnumDeclaration) {
            return isConst(node)
                ? bindBlockScopedDeclaration(node, SymbolFlags.ConstEnum, SymbolFlags.ConstEnumExcludes)
                : bindBlockScopedDeclaration(node, SymbolFlags.RegularEnum, SymbolFlags.RegularEnumExcludes);
        }

        function bindVariableDeclarationOrBindingElement(node: VariableDeclaration | BindingElement) {
            if (inStrictMode) {
                checkStrictModeEvalOrArguments(node, node.name);
            }

            if (!isBindingPattern(node.name)) {
                if (isBlockOrCatchScoped(node)) {
                    bindBlockScopedVariableDeclaration(node);
                }
                else if (isParameterDeclaration(node)) {
                    // It is safe to walk up parent chain to find whether the node is a destructing parameter declaration
                    // because its parent chain has already been set up, since parents are set before descending into children.
                    //
                    // If node is a binding element in parameter declaration, we need to use ParameterExcludes.
                    // Using ParameterExcludes flag allows the compiler to report an error on duplicate identifiers in Parameter Declaration
                    // For example:
                    //      function foo([a,a]) {} // Duplicate Identifier error
                    //      function bar(a,a) {}   // Duplicate Identifier error, parameter declaration in this case is handled in bindParameter
                    //                             // which correctly set excluded symbols
                    declareSymbolAndAddToSymbolTable(node, SymbolFlags.FunctionScopedVariable, SymbolFlags.ParameterExcludes);
                }
                else {
                    declareSymbolAndAddToSymbolTable(node, SymbolFlags.FunctionScopedVariable, SymbolFlags.FunctionScopedVariableExcludes);
                }
            }
        }

        function bindParameter(node: ParameterDeclaration) {
            if (inStrictMode && !(node.flags & NodeFlags.Ambient)) {
                // It is a SyntaxError if the identifier eval or arguments appears within a FormalParameterList of a
                // strict mode FunctionLikeDeclaration or FunctionExpression(13.1)
                checkStrictModeEvalOrArguments(node, node.name);
            }

            if (isBindingPattern(node.name)) {
                bindAnonymousDeclaration(node, SymbolFlags.FunctionScopedVariable, "__" + node.parent.parameters.indexOf(node) as __String);
            }
            else {
                declareSymbolAndAddToSymbolTable(node, SymbolFlags.FunctionScopedVariable, SymbolFlags.ParameterExcludes);
            }

            // If this is a property-parameter, then also declare the property symbol into the
            // containing class.
            if (isParameterPropertyDeclaration(node)) {
                const classDeclaration = <ClassLikeDeclaration>node.parent.parent;
                declareSymbol(classDeclaration.symbol.members, classDeclaration.symbol, node, SymbolFlags.Property | (node.questionToken ? SymbolFlags.Optional : SymbolFlags.None), SymbolFlags.PropertyExcludes);
            }
        }

        function bindFunctionDeclaration(node: FunctionDeclaration) {
            if (!file.isDeclarationFile && !(node.flags & NodeFlags.Ambient)) {
                if (isAsyncFunction(node)) {
                    emitFlags |= NodeFlags.HasAsyncFunctions;
                }
            }

            checkStrictModeFunctionName(node);
            if (inStrictMode) {
                checkStrictModeFunctionDeclaration(node);
                bindBlockScopedDeclaration(node, SymbolFlags.Function, SymbolFlags.FunctionExcludes);
            }
            else {
                declareSymbolAndAddToSymbolTable(node, SymbolFlags.Function, SymbolFlags.FunctionExcludes);
            }
        }

        function bindFunctionExpression(node: FunctionExpression) {
            if (!file.isDeclarationFile && !(node.flags & NodeFlags.Ambient)) {
                if (isAsyncFunction(node)) {
                    emitFlags |= NodeFlags.HasAsyncFunctions;
                }
            }
            if (currentFlow) {
                node.flowNode = currentFlow;
            }
            checkStrictModeFunctionName(node);
            const bindingName = node.name ? node.name.escapedText : InternalSymbolName.Function;
            return bindAnonymousDeclaration(node, SymbolFlags.Function, bindingName);
        }

        function bindPropertyOrMethodOrAccessor(node: Declaration, symbolFlags: SymbolFlags, symbolExcludes: SymbolFlags) {
            if (!file.isDeclarationFile && !(node.flags & NodeFlags.Ambient) && isAsyncFunction(node)) {
                emitFlags |= NodeFlags.HasAsyncFunctions;
            }

            if (currentFlow && isObjectLiteralOrClassExpressionMethod(node)) {
                node.flowNode = currentFlow;
            }

            return hasDynamicName(node)
                ? bindAnonymousDeclaration(node, symbolFlags, InternalSymbolName.Computed)
                : declareSymbolAndAddToSymbolTable(node, symbolFlags, symbolExcludes);
        }

        function getInferTypeContainer(node: Node): ConditionalTypeNode {
            while (node) {
                const parent = node.parent;
                if (parent && parent.kind === SyntaxKind.ConditionalType && (<ConditionalTypeNode>parent).extendsType === node) {
                    return <ConditionalTypeNode>parent;
                }
                node = parent;
            }
            return undefined;
        }

        function bindTypeParameter(node: TypeParameterDeclaration) {
            if (node.parent.kind === SyntaxKind.InferType) {
                const container = getInferTypeContainer(node.parent);
                if (container) {
                    if (!container.locals) {
                        container.locals = createSymbolTable();
                    }
                    declareSymbol(container.locals, /*parent*/ undefined, node, SymbolFlags.TypeParameter, SymbolFlags.TypeParameterExcludes);
                }
                else {
                    bindAnonymousDeclaration(node, SymbolFlags.TypeParameter, getDeclarationName(node));
                }
            }
            else {
                declareSymbolAndAddToSymbolTable(node, SymbolFlags.TypeParameter, SymbolFlags.TypeParameterExcludes);
            }
        }

        // reachability checks

        function shouldReportErrorOnModuleDeclaration(node: ModuleDeclaration): boolean {
            const instanceState = getModuleInstanceState(node);
            return instanceState === ModuleInstanceState.Instantiated || (instanceState === ModuleInstanceState.ConstEnumOnly && options.preserveConstEnums);
        }

        function checkUnreachable(node: Node): boolean {
            if (!(currentFlow.flags & FlowFlags.Unreachable)) {
                return false;
            }
            if (currentFlow === unreachableFlow) {
                const reportError =
                    // report error on all statements except empty ones
                    (isStatementButNotDeclaration(node) && node.kind !== SyntaxKind.EmptyStatement) ||
                    // report error on class declarations
                    node.kind === SyntaxKind.ClassDeclaration ||
                    // report error on instantiated modules or const-enums only modules if preserveConstEnums is set
                    (node.kind === SyntaxKind.ModuleDeclaration && shouldReportErrorOnModuleDeclaration(<ModuleDeclaration>node)) ||
                    // report error on regular enums and const enums if preserveConstEnums is set
                    (node.kind === SyntaxKind.EnumDeclaration && (!isConstEnumDeclaration(node) || options.preserveConstEnums));

                if (reportError) {
                    currentFlow = reportedUnreachableFlow;

                    // unreachable code is reported if
                    // - user has explicitly asked about it AND
                    // - statement is in not ambient context (statements in ambient context is already an error
                    //   so we should not report extras) AND
                    //   - node is not variable statement OR
                    //   - node is block scoped variable statement OR
                    //   - node is not block scoped variable statement and at least one variable declaration has initializer
                    //   Rationale: we don't want to report errors on non-initialized var's since they are hoisted
                    //   On the other side we do want to report errors on non-initialized 'lets' because of TDZ
                    const reportUnreachableCode =
                        !options.allowUnreachableCode &&
                        !(node.flags & NodeFlags.Ambient) &&
                        (
                            node.kind !== SyntaxKind.VariableStatement ||
                            getCombinedNodeFlags((<VariableStatement>node).declarationList) & NodeFlags.BlockScoped ||
                            forEach((<VariableStatement>node).declarationList.declarations, d => d.initializer)
                        );

                    if (reportUnreachableCode) {
                        errorOnFirstToken(node, Diagnostics.Unreachable_code_detected);
                    }
                }
            }
            return true;
        }
    }

    /* @internal */
    export function isExportsOrModuleExportsOrAlias(sourceFile: SourceFile, node: Expression): boolean {
        return isExportsIdentifier(node) ||
            isModuleExportsPropertyAccessExpression(node) ||
            isIdentifier(node) && isNameOfExportsOrModuleExportsAliasDeclaration(sourceFile, node);
    }

    function isNameOfExportsOrModuleExportsAliasDeclaration(sourceFile: SourceFile, node: Identifier): boolean {
        const symbol = lookupSymbolForNameWorker(sourceFile, node.escapedText);
        return symbol && symbol.valueDeclaration && isVariableDeclaration(symbol.valueDeclaration) &&
            symbol.valueDeclaration.initializer && isExportsOrModuleExportsOrAliasOrAssignment(sourceFile, symbol.valueDeclaration.initializer);
    }

    function isExportsOrModuleExportsOrAliasOrAssignment(sourceFile: SourceFile, node: Expression): boolean {
        return isExportsOrModuleExportsOrAlias(sourceFile, node) ||
            (isAssignmentExpression(node, /*excludeCompoundAssignment*/ true) && (
                isExportsOrModuleExportsOrAliasOrAssignment(sourceFile, node.left) || isExportsOrModuleExportsOrAliasOrAssignment(sourceFile, node.right)));
    }

    function lookupSymbolForNameWorker(container: Node, name: __String): Symbol | undefined {
        const local = container.locals && container.locals.get(name);
        if (local) {
            return local.exportSymbol || local;
        }
        return container.symbol && container.symbol.exports && container.symbol.exports.get(name);
    }

    /**
     * Computes the transform flags for a node, given the transform flags of its subtree
     *
     * @param node The node to analyze
     * @param subtreeFlags Transform flags computed for this node's subtree
     */
    export function computeTransformFlagsForNode(node: Node, subtreeFlags: TransformFlags): TransformFlags {
        const kind = node.kind;
        switch (kind) {
            case SyntaxKind.CallExpression:
                return computeCallExpression(<CallExpression>node, subtreeFlags);

            case SyntaxKind.NewExpression:
                return computeNewExpression(<NewExpression>node, subtreeFlags);

            case SyntaxKind.ModuleDeclaration:
                return computeModuleDeclaration(<ModuleDeclaration>node, subtreeFlags);

            case SyntaxKind.ParenthesizedExpression:
                return computeParenthesizedExpression(<ParenthesizedExpression>node, subtreeFlags);

            case SyntaxKind.BinaryExpression:
                return computeBinaryExpression(<BinaryExpression>node, subtreeFlags);

            case SyntaxKind.ExpressionStatement:
                return computeExpressionStatement(<ExpressionStatement>node, subtreeFlags);

            case SyntaxKind.Parameter:
                return computeParameter(<ParameterDeclaration>node, subtreeFlags);

            case SyntaxKind.ArrowFunction:
                return computeArrowFunction(<ArrowFunction>node, subtreeFlags);

            case SyntaxKind.FunctionExpression:
                return computeFunctionExpression(<FunctionExpression>node, subtreeFlags);

            case SyntaxKind.FunctionDeclaration:
                return computeFunctionDeclaration(<FunctionDeclaration>node, subtreeFlags);

            case SyntaxKind.VariableDeclaration:
                return computeVariableDeclaration(<VariableDeclaration>node, subtreeFlags);

            case SyntaxKind.VariableDeclarationList:
                return computeVariableDeclarationList(<VariableDeclarationList>node, subtreeFlags);

            case SyntaxKind.VariableStatement:
                return computeVariableStatement(<VariableStatement>node, subtreeFlags);

            case SyntaxKind.LabeledStatement:
                return computeLabeledStatement(<LabeledStatement>node, subtreeFlags);

            case SyntaxKind.ClassDeclaration:
                return computeClassDeclaration(<ClassDeclaration>node, subtreeFlags);

            case SyntaxKind.ClassExpression:
                return computeClassExpression(<ClassExpression>node, subtreeFlags);

            case SyntaxKind.HeritageClause:
                return computeHeritageClause(<HeritageClause>node, subtreeFlags);

            case SyntaxKind.CatchClause:
                return computeCatchClause(<CatchClause>node, subtreeFlags);

            case SyntaxKind.ExpressionWithTypeArguments:
                return computeExpressionWithTypeArguments(<ExpressionWithTypeArguments>node, subtreeFlags);

            case SyntaxKind.Constructor:
                return computeConstructor(<ConstructorDeclaration>node, subtreeFlags);

            case SyntaxKind.PropertyDeclaration:
                return computePropertyDeclaration(<PropertyDeclaration>node, subtreeFlags);

            case SyntaxKind.MethodDeclaration:
                return computeMethod(<MethodDeclaration>node, subtreeFlags);

            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
                return computeAccessor(<AccessorDeclaration>node, subtreeFlags);

            case SyntaxKind.ImportEqualsDeclaration:
                return computeImportEquals(<ImportEqualsDeclaration>node, subtreeFlags);

            case SyntaxKind.PropertyAccessExpression:
                return computePropertyAccess(<PropertyAccessExpression>node, subtreeFlags);

            case SyntaxKind.ElementAccessExpression:
                return computeElementAccess(<ElementAccessExpression>node, subtreeFlags);

            default:
                return computeOther(node, kind, subtreeFlags);
        }
    }

    function computeCallExpression(node: CallExpression, subtreeFlags: TransformFlags) {
        let transformFlags = subtreeFlags;
        const expression = node.expression;

        if (node.typeArguments) {
            transformFlags |= TransformFlags.AssertTypeScript;
        }

        if (subtreeFlags & TransformFlags.ContainsSpread
            || (expression.transformFlags & (TransformFlags.Super | TransformFlags.ContainsSuper))) {
            // If the this node contains a SpreadExpression, or is a super call, then it is an ES6
            // node.
            transformFlags |= TransformFlags.AssertES2015;
            // super property or element accesses could be inside lambdas, etc, and need a captured `this`,
            // while super keyword for super calls (indicated by TransformFlags.Super) does not (since it can only be top-level in a constructor)
            if (expression.transformFlags & TransformFlags.ContainsSuper) {
                transformFlags |= TransformFlags.ContainsLexicalThis;
            }
        }

        if (expression.kind === SyntaxKind.ImportKeyword) {
            transformFlags |= TransformFlags.ContainsDynamicImport;

            // A dynamic 'import()' call that contains a lexical 'this' will
            // require a captured 'this' when emitting down-level.
            if (subtreeFlags & TransformFlags.ContainsLexicalThis) {
                transformFlags |= TransformFlags.ContainsCapturedLexicalThis;
            }
        }

        node.transformFlags = transformFlags | TransformFlags.HasComputedFlags;
        return transformFlags & ~TransformFlags.ArrayLiteralOrCallOrNewExcludes;
    }

    function computeNewExpression(node: NewExpression, subtreeFlags: TransformFlags) {
        let transformFlags = subtreeFlags;
        if (node.typeArguments) {
            transformFlags |= TransformFlags.AssertTypeScript;
        }
        if (subtreeFlags & TransformFlags.ContainsSpread) {
            // If the this node contains a SpreadElementExpression then it is an ES6
            // node.
            transformFlags |= TransformFlags.AssertES2015;
        }
        node.transformFlags = transformFlags | TransformFlags.HasComputedFlags;
        return transformFlags & ~TransformFlags.ArrayLiteralOrCallOrNewExcludes;
    }

    function computeBinaryExpression(node: BinaryExpression, subtreeFlags: TransformFlags) {
        let transformFlags = subtreeFlags;
        const operatorTokenKind = node.operatorToken.kind;
        const leftKind = node.left.kind;

        if (operatorTokenKind === SyntaxKind.EqualsToken && leftKind === SyntaxKind.ObjectLiteralExpression) {
            // Destructuring object assignments with are ES2015 syntax
            // and possibly ESNext if they contain rest
            transformFlags |= TransformFlags.AssertESNext | TransformFlags.AssertES2015 | TransformFlags.AssertDestructuringAssignment;
        }
        else if (operatorTokenKind === SyntaxKind.EqualsToken && leftKind === SyntaxKind.ArrayLiteralExpression) {
            // Destructuring assignments are ES2015 syntax.
            transformFlags |= TransformFlags.AssertES2015 | TransformFlags.AssertDestructuringAssignment;
        }
        else if (operatorTokenKind === SyntaxKind.AsteriskAsteriskToken
            || operatorTokenKind === SyntaxKind.AsteriskAsteriskEqualsToken) {
            // Exponentiation is ES2016 syntax.
            transformFlags |= TransformFlags.AssertES2016;
        }

        node.transformFlags = transformFlags | TransformFlags.HasComputedFlags;
        return transformFlags & ~TransformFlags.NodeExcludes;
    }

    function computeParameter(node: ParameterDeclaration, subtreeFlags: TransformFlags) {
        let transformFlags = subtreeFlags;
        const name = node.name;
        const initializer = node.initializer;
        const dotDotDotToken = node.dotDotDotToken;

        // The '?' token, type annotations, decorators, and 'this' parameters are TypeSCript
        // syntax.
        if (node.questionToken
            || node.type
            || subtreeFlags & TransformFlags.ContainsDecorators
            || isThisIdentifier(name)) {
            transformFlags |= TransformFlags.AssertTypeScript;
        }

        // If a parameter has an accessibility modifier, then it is TypeScript syntax.
        if (hasModifier(node, ModifierFlags.ParameterPropertyModifier)) {
            transformFlags |= TransformFlags.AssertTypeScript | TransformFlags.ContainsParameterPropertyAssignments;
        }

        // parameters with object rest destructuring are ES Next syntax
        if (subtreeFlags & TransformFlags.ContainsObjectRest) {
            transformFlags |= TransformFlags.AssertESNext;
        }

        // If a parameter has an initializer, a binding pattern or a dotDotDot token, then
        // it is ES6 syntax and its container must emit default value assignments or parameter destructuring downlevel.
        if (subtreeFlags & TransformFlags.ContainsBindingPattern || initializer || dotDotDotToken) {
            transformFlags |= TransformFlags.AssertES2015 | TransformFlags.ContainsDefaultValueAssignments;
        }

        node.transformFlags = transformFlags | TransformFlags.HasComputedFlags;
        return transformFlags & ~TransformFlags.ParameterExcludes;
    }

    function computeParenthesizedExpression(node: ParenthesizedExpression, subtreeFlags: TransformFlags) {
        let transformFlags = subtreeFlags;
        const expression = node.expression;
        const expressionKind = expression.kind;
        const expressionTransformFlags = expression.transformFlags;

        // If the node is synthesized, it means the emitter put the parentheses there,
        // not the user. If we didn't want them, the emitter would not have put them
        // there.
        if (expressionKind === SyntaxKind.AsExpression
            || expressionKind === SyntaxKind.TypeAssertionExpression) {
            transformFlags |= TransformFlags.AssertTypeScript;
        }

        // If the expression of a ParenthesizedExpression is a destructuring assignment,
        // then the ParenthesizedExpression is a destructuring assignment.
        if (expressionTransformFlags & TransformFlags.DestructuringAssignment) {
            transformFlags |= TransformFlags.DestructuringAssignment;
        }

        node.transformFlags = transformFlags | TransformFlags.HasComputedFlags;
        return transformFlags & ~TransformFlags.OuterExpressionExcludes;
    }

    function computeClassDeclaration(node: ClassDeclaration, subtreeFlags: TransformFlags) {
        let transformFlags: TransformFlags;

        if (hasModifier(node, ModifierFlags.Ambient)) {
            // An ambient declaration is TypeScript syntax.
            transformFlags = TransformFlags.AssertTypeScript;
        }
        else {
            // A ClassDeclaration is ES6 syntax.
            transformFlags = subtreeFlags | TransformFlags.AssertES2015;

            // A class with a parameter property assignment, property initializer, computed property name, or decorator is
            // TypeScript syntax.
            // An exported declaration may be TypeScript syntax, but is handled by the visitor
            // for a namespace declaration.
            if ((subtreeFlags & TransformFlags.TypeScriptClassSyntaxMask)
                || node.typeParameters) {
                transformFlags |= TransformFlags.AssertTypeScript;
            }

            if (subtreeFlags & TransformFlags.ContainsLexicalThisInComputedPropertyName) {
                // A computed property name containing `this` might need to be rewritten,
                // so propagate the ContainsLexicalThis flag upward.
                transformFlags |= TransformFlags.ContainsLexicalThis;
            }
        }

        node.transformFlags = transformFlags | TransformFlags.HasComputedFlags;
        return transformFlags & ~TransformFlags.ClassExcludes;
    }

    function computeClassExpression(node: ClassExpression, subtreeFlags: TransformFlags) {
        // A ClassExpression is ES6 syntax.
        let transformFlags = subtreeFlags | TransformFlags.AssertES2015;

        // A class with a parameter property assignment, property initializer, or decorator is
        // TypeScript syntax.
        if (subtreeFlags & TransformFlags.TypeScriptClassSyntaxMask
            || node.typeParameters) {
            transformFlags |= TransformFlags.AssertTypeScript;
        }

        if (subtreeFlags & TransformFlags.ContainsLexicalThisInComputedPropertyName) {
            // A computed property name containing `this` might need to be rewritten,
            // so propagate the ContainsLexicalThis flag upward.
            transformFlags |= TransformFlags.ContainsLexicalThis;
        }

        node.transformFlags = transformFlags | TransformFlags.HasComputedFlags;
        return transformFlags & ~TransformFlags.ClassExcludes;
    }

    function computeHeritageClause(node: HeritageClause, subtreeFlags: TransformFlags) {
        let transformFlags = subtreeFlags;

        switch (node.token) {
            case SyntaxKind.ExtendsKeyword:
                // An `extends` HeritageClause is ES6 syntax.
                transformFlags |= TransformFlags.AssertES2015;
                break;

            case SyntaxKind.ImplementsKeyword:
                // An `implements` HeritageClause is TypeScript syntax.
                transformFlags |= TransformFlags.AssertTypeScript;
                break;

            default:
                Debug.fail("Unexpected token for heritage clause");
                break;
        }

        node.transformFlags = transformFlags | TransformFlags.HasComputedFlags;
        return transformFlags & ~TransformFlags.NodeExcludes;
    }

    function computeCatchClause(node: CatchClause, subtreeFlags: TransformFlags) {
        let transformFlags = subtreeFlags;

        if (!node.variableDeclaration) {
            transformFlags |= TransformFlags.AssertESNext;
        }
        else if (isBindingPattern(node.variableDeclaration.name)) {
            transformFlags |= TransformFlags.AssertES2015;
        }

        node.transformFlags = transformFlags | TransformFlags.HasComputedFlags;
        return transformFlags & ~TransformFlags.CatchClauseExcludes;
    }

    function computeExpressionWithTypeArguments(node: ExpressionWithTypeArguments, subtreeFlags: TransformFlags) {
        // An ExpressionWithTypeArguments is ES6 syntax, as it is used in the
        // extends clause of a class.
        let transformFlags = subtreeFlags | TransformFlags.AssertES2015;

        // If an ExpressionWithTypeArguments contains type arguments, then it
        // is TypeScript syntax.
        if (node.typeArguments) {
            transformFlags |= TransformFlags.AssertTypeScript;
        }

        node.transformFlags = transformFlags | TransformFlags.HasComputedFlags;
        return transformFlags & ~TransformFlags.NodeExcludes;
    }

    function computeConstructor(node: ConstructorDeclaration, subtreeFlags: TransformFlags) {
        let transformFlags = subtreeFlags;

        // TypeScript-specific modifiers and overloads are TypeScript syntax
        if (hasModifier(node, ModifierFlags.TypeScriptModifier)
            || !node.body) {
            transformFlags |= TransformFlags.AssertTypeScript;
        }

        // function declarations with object rest destructuring are ES Next syntax
        if (subtreeFlags & TransformFlags.ContainsObjectRest) {
            transformFlags |= TransformFlags.AssertESNext;
        }

        node.transformFlags = transformFlags | TransformFlags.HasComputedFlags;
        return transformFlags & ~TransformFlags.ConstructorExcludes;
    }

    function computeMethod(node: MethodDeclaration, subtreeFlags: TransformFlags) {
        // A MethodDeclaration is ES6 syntax.
        let transformFlags = subtreeFlags | TransformFlags.AssertES2015;

        // Decorators, TypeScript-specific modifiers, type parameters, type annotations, and
        // overloads are TypeScript syntax.
        if (node.decorators
            || hasModifier(node, ModifierFlags.TypeScriptModifier)
            || node.typeParameters
            || node.type
            || (node.name && isComputedPropertyName(node.name)) // While computed method names aren't typescript, the TS transform must visit them to emit property declarations correctly
            || !node.body) {
            transformFlags |= TransformFlags.AssertTypeScript;
        }

        // function declarations with object rest destructuring are ES Next syntax
        if (subtreeFlags & TransformFlags.ContainsObjectRest) {
            transformFlags |= TransformFlags.AssertESNext;
        }

        // An async method declaration is ES2017 syntax.
        if (hasModifier(node, ModifierFlags.Async)) {
            transformFlags |= node.asteriskToken ? TransformFlags.AssertESNext : TransformFlags.AssertES2017;
        }

        if (node.asteriskToken) {
            transformFlags |= TransformFlags.AssertGenerator;
        }

        node.transformFlags = transformFlags | TransformFlags.HasComputedFlags;
        return transformFlags & ~TransformFlags.MethodOrAccessorExcludes;
    }

    function computeAccessor(node: AccessorDeclaration, subtreeFlags: TransformFlags) {
        let transformFlags = subtreeFlags;

        // Decorators, TypeScript-specific modifiers, type annotations, and overloads are
        // TypeScript syntax.
        if (node.decorators
            || hasModifier(node, ModifierFlags.TypeScriptModifier)
            || node.type
            || (node.name && isComputedPropertyName(node.name)) // While computed accessor names aren't typescript, the TS transform must visit them to emit property declarations correctly
            || !node.body) {
            transformFlags |= TransformFlags.AssertTypeScript;
        }

        // function declarations with object rest destructuring are ES Next syntax
        if (subtreeFlags & TransformFlags.ContainsObjectRest) {
            transformFlags |= TransformFlags.AssertESNext;
        }

        node.transformFlags = transformFlags | TransformFlags.HasComputedFlags;
        return transformFlags & ~TransformFlags.MethodOrAccessorExcludes;
    }

    function computePropertyDeclaration(node: PropertyDeclaration, subtreeFlags: TransformFlags) {
        // A PropertyDeclaration is TypeScript syntax.
        let transformFlags = subtreeFlags | TransformFlags.AssertTypeScript;

        // If the PropertyDeclaration has an initializer or a computed name, we need to inform its ancestor
        // so that it handle the transformation.
        if (node.initializer || isComputedPropertyName(node.name)) {
            transformFlags |= TransformFlags.ContainsPropertyInitializer;
        }

        node.transformFlags = transformFlags | TransformFlags.HasComputedFlags;
        return transformFlags & ~TransformFlags.NodeExcludes;
    }

    function computeFunctionDeclaration(node: FunctionDeclaration, subtreeFlags: TransformFlags) {
        let transformFlags: TransformFlags;
        const modifierFlags = getModifierFlags(node);
        const body = node.body;

        if (!body || (modifierFlags & ModifierFlags.Ambient)) {
            // An ambient declaration is TypeScript syntax.
            // A FunctionDeclaration without a body is an overload and is TypeScript syntax.
            transformFlags = TransformFlags.AssertTypeScript;
        }
        else {
            transformFlags = subtreeFlags | TransformFlags.ContainsHoistedDeclarationOrCompletion;

            // TypeScript-specific modifiers, type parameters, and type annotations are TypeScript
            // syntax.
            if (modifierFlags & ModifierFlags.TypeScriptModifier
                || node.typeParameters
                || node.type) {
                transformFlags |= TransformFlags.AssertTypeScript;
            }

            // An async function declaration is ES2017 syntax.
            if (modifierFlags & ModifierFlags.Async) {
                transformFlags |= node.asteriskToken ? TransformFlags.AssertESNext : TransformFlags.AssertES2017;
            }

            // function declarations with object rest destructuring are ES Next syntax
            if (subtreeFlags & TransformFlags.ContainsObjectRest) {
                transformFlags |= TransformFlags.AssertESNext;
            }

            // If a FunctionDeclaration's subtree has marked the container as needing to capture the
            // lexical this, or the function contains parameters with initializers, then this node is
            // ES6 syntax.
            if (subtreeFlags & TransformFlags.ES2015FunctionSyntaxMask) {
                transformFlags |= TransformFlags.AssertES2015;
            }

            // If a FunctionDeclaration is generator function and is the body of a
            // transformed async function, then this node can be transformed to a
            // down-level generator.
            // Currently we do not support transforming any other generator fucntions
            // down level.
            if (node.asteriskToken) {
                transformFlags |= TransformFlags.AssertGenerator;
            }
        }

        node.transformFlags = transformFlags | TransformFlags.HasComputedFlags;
        return transformFlags & ~TransformFlags.FunctionExcludes;
    }

    function computeFunctionExpression(node: FunctionExpression, subtreeFlags: TransformFlags) {
        let transformFlags = subtreeFlags;

        // TypeScript-specific modifiers, type parameters, and type annotations are TypeScript
        // syntax.
        if (hasModifier(node, ModifierFlags.TypeScriptModifier)
            || node.typeParameters
            || node.type) {
            transformFlags |= TransformFlags.AssertTypeScript;
        }

        // An async function expression is ES2017 syntax.
        if (hasModifier(node, ModifierFlags.Async)) {
            transformFlags |= node.asteriskToken ? TransformFlags.AssertESNext : TransformFlags.AssertES2017;
        }

        // function expressions with object rest destructuring are ES Next syntax
        if (subtreeFlags & TransformFlags.ContainsObjectRest) {
            transformFlags |= TransformFlags.AssertESNext;
        }


        // If a FunctionExpression's subtree has marked the container as needing to capture the
        // lexical this, or the function contains parameters with initializers, then this node is
        // ES6 syntax.
        if (subtreeFlags & TransformFlags.ES2015FunctionSyntaxMask) {
            transformFlags |= TransformFlags.AssertES2015;
        }

        // If a FunctionExpression is generator function and is the body of a
        // transformed async function, then this node can be transformed to a
        // down-level generator.
        if (node.asteriskToken) {
            transformFlags |= TransformFlags.AssertGenerator;
        }

        node.transformFlags = transformFlags | TransformFlags.HasComputedFlags;
        return transformFlags & ~TransformFlags.FunctionExcludes;
    }

    function computeArrowFunction(node: ArrowFunction, subtreeFlags: TransformFlags) {
        // An ArrowFunction is ES6 syntax, and excludes markers that should not escape the scope of an ArrowFunction.
        let transformFlags = subtreeFlags | TransformFlags.AssertES2015;

        // TypeScript-specific modifiers, type parameters, and type annotations are TypeScript
        // syntax.
        if (hasModifier(node, ModifierFlags.TypeScriptModifier)
            || node.typeParameters
            || node.type) {
            transformFlags |= TransformFlags.AssertTypeScript;
        }

        // An async arrow function is ES2017 syntax.
        if (hasModifier(node, ModifierFlags.Async)) {
            transformFlags |= TransformFlags.AssertES2017;
        }

        // arrow functions with object rest destructuring are ES Next syntax
        if (subtreeFlags & TransformFlags.ContainsObjectRest) {
            transformFlags |= TransformFlags.AssertESNext;
        }

        // If an ArrowFunction contains a lexical this, its container must capture the lexical this.
        if (subtreeFlags & TransformFlags.ContainsLexicalThis) {
            transformFlags |= TransformFlags.ContainsCapturedLexicalThis;
        }

        node.transformFlags = transformFlags | TransformFlags.HasComputedFlags;
        return transformFlags & ~TransformFlags.ArrowFunctionExcludes;
    }

    function computePropertyAccess(node: PropertyAccessExpression, subtreeFlags: TransformFlags) {
        let transformFlags = subtreeFlags;

        // If a PropertyAccessExpression starts with a super keyword, then it is
        // ES6 syntax, and requires a lexical `this` binding.
        if (transformFlags & TransformFlags.Super) {
            transformFlags ^= TransformFlags.Super;
            transformFlags |= TransformFlags.ContainsSuper;
        }

        node.transformFlags = transformFlags | TransformFlags.HasComputedFlags;
        return transformFlags & ~TransformFlags.PropertyAccessExcludes;
    }

    function computeElementAccess(node: ElementAccessExpression, subtreeFlags: TransformFlags) {
        let transformFlags = subtreeFlags;
        const expression = node.expression;
        const expressionFlags = expression.transformFlags; // We do not want to aggregate flags from the argument expression for super/this capturing

        // If an ElementAccessExpression starts with a super keyword, then it is
        // ES6 syntax, and requires a lexical `this` binding.
        if (expressionFlags & TransformFlags.Super) {
            transformFlags &= ~TransformFlags.Super;
            transformFlags |= TransformFlags.ContainsSuper;
        }

        node.transformFlags = transformFlags | TransformFlags.HasComputedFlags;
        return transformFlags & ~TransformFlags.PropertyAccessExcludes;
    }

    function computeVariableDeclaration(node: VariableDeclaration, subtreeFlags: TransformFlags) {
        let transformFlags = subtreeFlags;
        transformFlags |= TransformFlags.AssertES2015 | TransformFlags.ContainsBindingPattern;

        // A VariableDeclaration containing ObjectRest is ESNext syntax
        if (subtreeFlags & TransformFlags.ContainsObjectRest) {
            transformFlags |= TransformFlags.AssertESNext;
        }

        // Type annotations are TypeScript syntax.
        if (node.type) {
            transformFlags |= TransformFlags.AssertTypeScript;
        }

        node.transformFlags = transformFlags | TransformFlags.HasComputedFlags;
        return transformFlags & ~TransformFlags.NodeExcludes;
    }

    function computeVariableStatement(node: VariableStatement, subtreeFlags: TransformFlags) {
        let transformFlags: TransformFlags;
        const declarationListTransformFlags = node.declarationList.transformFlags;

        // An ambient declaration is TypeScript syntax.
        if (hasModifier(node, ModifierFlags.Ambient)) {
            transformFlags = TransformFlags.AssertTypeScript;
        }
        else {
            transformFlags = subtreeFlags;

            if (declarationListTransformFlags & TransformFlags.ContainsBindingPattern) {
                transformFlags |= TransformFlags.AssertES2015;
            }
        }

        node.transformFlags = transformFlags | TransformFlags.HasComputedFlags;
        return transformFlags & ~TransformFlags.NodeExcludes;
    }

    function computeLabeledStatement(node: LabeledStatement, subtreeFlags: TransformFlags) {
        let transformFlags = subtreeFlags;

        // A labeled statement containing a block scoped binding *may* need to be transformed from ES6.
        if (subtreeFlags & TransformFlags.ContainsBlockScopedBinding
            && isIterationStatement(node, /*lookInLabeledStatements*/ true)) {
            transformFlags |= TransformFlags.AssertES2015;
        }

        node.transformFlags = transformFlags | TransformFlags.HasComputedFlags;
        return transformFlags & ~TransformFlags.NodeExcludes;
    }

    function computeImportEquals(node: ImportEqualsDeclaration, subtreeFlags: TransformFlags) {
        let transformFlags = subtreeFlags;

        // An ImportEqualsDeclaration with a namespace reference is TypeScript.
        if (!isExternalModuleImportEqualsDeclaration(node)) {
            transformFlags |= TransformFlags.AssertTypeScript;
        }

        node.transformFlags = transformFlags | TransformFlags.HasComputedFlags;
        return transformFlags & ~TransformFlags.NodeExcludes;
    }

    function computeExpressionStatement(node: ExpressionStatement, subtreeFlags: TransformFlags) {
        let transformFlags = subtreeFlags;

        // If the expression of an expression statement is a destructuring assignment,
        // then we treat the statement as ES6 so that we can indicate that we do not
        // need to hold on to the right-hand side.
        if (node.expression.transformFlags & TransformFlags.DestructuringAssignment) {
            transformFlags |= TransformFlags.AssertES2015;
        }

        node.transformFlags = transformFlags | TransformFlags.HasComputedFlags;
        return transformFlags & ~TransformFlags.NodeExcludes;
    }

    function computeModuleDeclaration(node: ModuleDeclaration, subtreeFlags: TransformFlags) {
        let transformFlags = TransformFlags.AssertTypeScript;
        const modifierFlags = getModifierFlags(node);

        if ((modifierFlags & ModifierFlags.Ambient) === 0) {
            transformFlags |= subtreeFlags;
        }

        node.transformFlags = transformFlags | TransformFlags.HasComputedFlags;
        return transformFlags & ~TransformFlags.ModuleExcludes;
    }

    function computeVariableDeclarationList(node: VariableDeclarationList, subtreeFlags: TransformFlags) {
        let transformFlags = subtreeFlags | TransformFlags.ContainsHoistedDeclarationOrCompletion;

        if (subtreeFlags & TransformFlags.ContainsBindingPattern) {
            transformFlags |= TransformFlags.AssertES2015;
        }

        // If a VariableDeclarationList is `let` or `const`, then it is ES6 syntax.
        if (node.flags & NodeFlags.BlockScoped) {
            transformFlags |= TransformFlags.AssertES2015 | TransformFlags.ContainsBlockScopedBinding;
        }

        node.transformFlags = transformFlags | TransformFlags.HasComputedFlags;
        return transformFlags & ~TransformFlags.VariableDeclarationListExcludes;
    }

    function computeOther(node: Node, kind: SyntaxKind, subtreeFlags: TransformFlags) {
        // Mark transformations needed for each node
        let transformFlags = subtreeFlags;
        let excludeFlags = TransformFlags.NodeExcludes;

        switch (kind) {
            case SyntaxKind.AsyncKeyword:
            case SyntaxKind.AwaitExpression:
                // async/await is ES2017 syntax, but may be ESNext syntax (for async generators)
                transformFlags |= TransformFlags.AssertESNext | TransformFlags.AssertES2017;
                break;

            case SyntaxKind.TypeAssertionExpression:
            case SyntaxKind.AsExpression:
            case SyntaxKind.PartiallyEmittedExpression:
                // These nodes are TypeScript syntax.
                transformFlags |= TransformFlags.AssertTypeScript;
                excludeFlags = TransformFlags.OuterExpressionExcludes;
                break;
            case SyntaxKind.PublicKeyword:
            case SyntaxKind.PrivateKeyword:
            case SyntaxKind.ProtectedKeyword:
            case SyntaxKind.AbstractKeyword:
            case SyntaxKind.DeclareKeyword:
            case SyntaxKind.ConstKeyword:
            case SyntaxKind.EnumDeclaration:
            case SyntaxKind.EnumMember:
            case SyntaxKind.NonNullExpression:
            case SyntaxKind.ReadonlyKeyword:
                // These nodes are TypeScript syntax.
                transformFlags |= TransformFlags.AssertTypeScript;
                break;

            case SyntaxKind.JsxElement:
            case SyntaxKind.JsxSelfClosingElement:
            case SyntaxKind.JsxOpeningElement:
            case SyntaxKind.JsxText:
            case SyntaxKind.JsxClosingElement:
            case SyntaxKind.JsxFragment:
            case SyntaxKind.JsxOpeningFragment:
            case SyntaxKind.JsxClosingFragment:
            case SyntaxKind.JsxAttribute:
            case SyntaxKind.JsxAttributes:
            case SyntaxKind.JsxSpreadAttribute:
            case SyntaxKind.JsxExpression:
                // These nodes are Jsx syntax.
                transformFlags |= TransformFlags.AssertJsx;
                break;

            case SyntaxKind.NoSubstitutionTemplateLiteral:
            case SyntaxKind.TemplateHead:
            case SyntaxKind.TemplateMiddle:
            case SyntaxKind.TemplateTail:
            case SyntaxKind.TemplateExpression:
            case SyntaxKind.TaggedTemplateExpression:
            case SyntaxKind.ShorthandPropertyAssignment:
            case SyntaxKind.StaticKeyword:
            case SyntaxKind.MetaProperty:
                // These nodes are ES6 syntax.
                transformFlags |= TransformFlags.AssertES2015;
                break;

            case SyntaxKind.StringLiteral:
                if ((<StringLiteral>node).hasExtendedUnicodeEscape) {
                    transformFlags |= TransformFlags.AssertES2015;
                }
                break;

            case SyntaxKind.NumericLiteral:
                if ((<NumericLiteral>node).numericLiteralFlags & TokenFlags.BinaryOrOctalSpecifier) {
                    transformFlags |= TransformFlags.AssertES2015;
                }
                break;

            case SyntaxKind.ForOfStatement:
                // This node is either ES2015 syntax or ES2017 syntax (if it is a for-await-of).
                if ((<ForOfStatement>node).awaitModifier) {
                    transformFlags |= TransformFlags.AssertESNext;
                }
                transformFlags |= TransformFlags.AssertES2015;
                break;

            case SyntaxKind.YieldExpression:
                // This node is either ES2015 syntax (in a generator) or ES2017 syntax (in an async
                // generator).
                transformFlags |= TransformFlags.AssertESNext | TransformFlags.AssertES2015 | TransformFlags.ContainsYield;
                break;

            case SyntaxKind.AnyKeyword:
            case SyntaxKind.NumberKeyword:
            case SyntaxKind.NeverKeyword:
            case SyntaxKind.ObjectKeyword:
            case SyntaxKind.StringKeyword:
            case SyntaxKind.BooleanKeyword:
            case SyntaxKind.SymbolKeyword:
            case SyntaxKind.VoidKeyword:
            case SyntaxKind.TypeParameter:
            case SyntaxKind.PropertySignature:
            case SyntaxKind.MethodSignature:
            case SyntaxKind.CallSignature:
            case SyntaxKind.ConstructSignature:
            case SyntaxKind.IndexSignature:
            case SyntaxKind.TypePredicate:
            case SyntaxKind.TypeReference:
            case SyntaxKind.FunctionType:
            case SyntaxKind.ConstructorType:
            case SyntaxKind.TypeQuery:
            case SyntaxKind.TypeLiteral:
            case SyntaxKind.ArrayType:
            case SyntaxKind.TupleType:
            case SyntaxKind.UnionType:
            case SyntaxKind.IntersectionType:
            case SyntaxKind.ConditionalType:
            case SyntaxKind.InferType:
            case SyntaxKind.ParenthesizedType:
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.TypeAliasDeclaration:
            case SyntaxKind.ThisType:
            case SyntaxKind.TypeOperator:
            case SyntaxKind.IndexedAccessType:
            case SyntaxKind.MappedType:
            case SyntaxKind.LiteralType:
            case SyntaxKind.NamespaceExportDeclaration:
                // Types and signatures are TypeScript syntax, and exclude all other facts.
                transformFlags = TransformFlags.AssertTypeScript;
                excludeFlags = TransformFlags.TypeExcludes;
                break;

            case SyntaxKind.ComputedPropertyName:
                // Even though computed property names are ES6, we don't treat them as such.
                // This is so that they can flow through PropertyName transforms unaffected.
                // Instead, we mark the container as ES6, so that it can properly handle the transform.
                transformFlags |= TransformFlags.ContainsComputedPropertyName;
                if (subtreeFlags & TransformFlags.ContainsLexicalThis) {
                    // A computed method name like `[this.getName()](x: string) { ... }` needs to
                    // distinguish itself from the normal case of a method body containing `this`:
                    // `this` inside a method doesn't need to be rewritten (the method provides `this`),
                    // whereas `this` inside a computed name *might* need to be rewritten if the class/object
                    // is inside an arrow function:
                    // `_this = this; () => class K { [_this.getName()]() { ... } }`
                    // To make this distinction, use ContainsLexicalThisInComputedPropertyName
                    // instead of ContainsLexicalThis for computed property names
                    transformFlags |= TransformFlags.ContainsLexicalThisInComputedPropertyName;
                }
                break;

            case SyntaxKind.SpreadElement:
                transformFlags |= TransformFlags.AssertES2015 | TransformFlags.ContainsSpread;
                break;

            case SyntaxKind.SpreadAssignment:
                transformFlags |= TransformFlags.AssertESNext | TransformFlags.ContainsObjectSpread;
                break;

            case SyntaxKind.SuperKeyword:
                // This node is ES6 syntax.
                transformFlags |= TransformFlags.AssertES2015 | TransformFlags.Super;
                excludeFlags = TransformFlags.OuterExpressionExcludes; // must be set to persist `Super`
                break;

            case SyntaxKind.ThisKeyword:
                // Mark this node and its ancestors as containing a lexical `this` keyword.
                transformFlags |= TransformFlags.ContainsLexicalThis;
                break;

            case SyntaxKind.ObjectBindingPattern:
                transformFlags |= TransformFlags.AssertES2015 | TransformFlags.ContainsBindingPattern;
                if (subtreeFlags & TransformFlags.ContainsRest) {
                    transformFlags |= TransformFlags.AssertESNext | TransformFlags.ContainsObjectRest;
                }
                excludeFlags = TransformFlags.BindingPatternExcludes;
                break;

            case SyntaxKind.ArrayBindingPattern:
                transformFlags |= TransformFlags.AssertES2015 | TransformFlags.ContainsBindingPattern;
                excludeFlags = TransformFlags.BindingPatternExcludes;
                break;

            case SyntaxKind.BindingElement:
                transformFlags |= TransformFlags.AssertES2015;
                if ((<BindingElement>node).dotDotDotToken) {
                    transformFlags |= TransformFlags.ContainsRest;
                }
                break;

            case SyntaxKind.Decorator:
                // This node is TypeScript syntax, and marks its container as also being TypeScript syntax.
                transformFlags |= TransformFlags.AssertTypeScript | TransformFlags.ContainsDecorators;
                break;

            case SyntaxKind.ObjectLiteralExpression:
                excludeFlags = TransformFlags.ObjectLiteralExcludes;
                if (subtreeFlags & TransformFlags.ContainsComputedPropertyName) {
                    // If an ObjectLiteralExpression contains a ComputedPropertyName, then it
                    // is an ES6 node.
                    transformFlags |= TransformFlags.AssertES2015;
                }

                if (subtreeFlags & TransformFlags.ContainsLexicalThisInComputedPropertyName) {
                    // A computed property name containing `this` might need to be rewritten,
                    // so propagate the ContainsLexicalThis flag upward.
                    transformFlags |= TransformFlags.ContainsLexicalThis;
                }

                if (subtreeFlags & TransformFlags.ContainsObjectSpread) {
                    // If an ObjectLiteralExpression contains a spread element, then it
                    // is an ES next node.
                    transformFlags |= TransformFlags.AssertESNext;
                }

                break;

            case SyntaxKind.ArrayLiteralExpression:
            case SyntaxKind.NewExpression:
                excludeFlags = TransformFlags.ArrayLiteralOrCallOrNewExcludes;
                if (subtreeFlags & TransformFlags.ContainsSpread) {
                    // If the this node contains a SpreadExpression, then it is an ES6
                    // node.
                    transformFlags |= TransformFlags.AssertES2015;
                }

                break;

            case SyntaxKind.DoStatement:
            case SyntaxKind.WhileStatement:
            case SyntaxKind.ForStatement:
            case SyntaxKind.ForInStatement:
                // A loop containing a block scoped binding *may* need to be transformed from ES6.
                if (subtreeFlags & TransformFlags.ContainsBlockScopedBinding) {
                    transformFlags |= TransformFlags.AssertES2015;
                }

                break;

            case SyntaxKind.SourceFile:
                if (subtreeFlags & TransformFlags.ContainsCapturedLexicalThis) {
                    transformFlags |= TransformFlags.AssertES2015;
                }

                break;

            case SyntaxKind.ReturnStatement:
            case SyntaxKind.ContinueStatement:
            case SyntaxKind.BreakStatement:
                transformFlags |= TransformFlags.ContainsHoistedDeclarationOrCompletion;
                break;
        }

        node.transformFlags = transformFlags | TransformFlags.HasComputedFlags;
        return transformFlags & ~excludeFlags;
    }

    /**
     * Gets the transform flags to exclude when unioning the transform flags of a subtree.
     *
     * NOTE: This needs to be kept up-to-date with the exclusions used in `computeTransformFlagsForNode`.
     *       For performance reasons, `computeTransformFlagsForNode` uses local constant values rather
     *       than calling this function.
     */
    /* @internal */
    export function getTransformFlagsSubtreeExclusions(kind: SyntaxKind) {
        if (kind >= SyntaxKind.FirstTypeNode && kind <= SyntaxKind.LastTypeNode) {
            return TransformFlags.TypeExcludes;
        }

        switch (kind) {
            case SyntaxKind.CallExpression:
            case SyntaxKind.NewExpression:
            case SyntaxKind.ArrayLiteralExpression:
                return TransformFlags.ArrayLiteralOrCallOrNewExcludes;
            case SyntaxKind.ModuleDeclaration:
                return TransformFlags.ModuleExcludes;
            case SyntaxKind.Parameter:
                return TransformFlags.ParameterExcludes;
            case SyntaxKind.ArrowFunction:
                return TransformFlags.ArrowFunctionExcludes;
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.FunctionDeclaration:
                return TransformFlags.FunctionExcludes;
            case SyntaxKind.VariableDeclarationList:
                return TransformFlags.VariableDeclarationListExcludes;
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.ClassExpression:
                return TransformFlags.ClassExcludes;
            case SyntaxKind.Constructor:
                return TransformFlags.ConstructorExcludes;
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
                return TransformFlags.MethodOrAccessorExcludes;
            case SyntaxKind.AnyKeyword:
            case SyntaxKind.NumberKeyword:
            case SyntaxKind.NeverKeyword:
            case SyntaxKind.StringKeyword:
            case SyntaxKind.ObjectKeyword:
            case SyntaxKind.BooleanKeyword:
            case SyntaxKind.SymbolKeyword:
            case SyntaxKind.VoidKeyword:
            case SyntaxKind.TypeParameter:
            case SyntaxKind.PropertySignature:
            case SyntaxKind.MethodSignature:
            case SyntaxKind.CallSignature:
            case SyntaxKind.ConstructSignature:
            case SyntaxKind.IndexSignature:
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.TypeAliasDeclaration:
                return TransformFlags.TypeExcludes;
            case SyntaxKind.ObjectLiteralExpression:
                return TransformFlags.ObjectLiteralExcludes;
            case SyntaxKind.CatchClause:
                return TransformFlags.CatchClauseExcludes;
            case SyntaxKind.ObjectBindingPattern:
            case SyntaxKind.ArrayBindingPattern:
                return TransformFlags.BindingPatternExcludes;
            case SyntaxKind.TypeAssertionExpression:
            case SyntaxKind.AsExpression:
            case SyntaxKind.PartiallyEmittedExpression:
            case SyntaxKind.ParenthesizedExpression:
            case SyntaxKind.SuperKeyword:
                return TransformFlags.OuterExpressionExcludes;
            case SyntaxKind.PropertyAccessExpression:
            case SyntaxKind.ElementAccessExpression:
                return TransformFlags.PropertyAccessExcludes;
            default:
                return TransformFlags.NodeExcludes;
        }
    }

    /**
     * "Binds" JSDoc nodes in TypeScript code.
     * Since we will never create symbols for JSDoc, we just set parent pointers instead.
     */
    function setParentPointers(parent: Node, child: Node): void {
        child.parent = parent;
        forEachChild(child, (childsChild) => setParentPointers(child, childsChild));
    }
}
