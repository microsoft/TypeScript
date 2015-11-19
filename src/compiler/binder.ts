/// <reference path="utilities.ts"/>
/// <reference path="parser.ts"/>

/* @internal */
namespace ts {
    export let bindTime = 0;

    export const enum ModuleInstanceState {
        NonInstantiated = 0,
        Instantiated = 1,
        ConstEnumOnly = 2
    }

    const enum Reachability {
        Unintialized        = 1 << 0,
        Reachable           = 1 << 1,
        Unreachable         = 1 << 2,
        ReportedUnreachable = 1 << 3
    }

    function or(state1: Reachability, state2: Reachability): Reachability {
        return (state1 | state2) & Reachability.Reachable
            ? Reachability.Reachable
            : (state1 & state2) & Reachability.ReportedUnreachable
                ? Reachability.ReportedUnreachable
                : Reachability.Unreachable;
    }

    export function getModuleInstanceState(node: Node): ModuleInstanceState {
        // A module is uninstantiated if it contains only
        // 1. interface declarations, type alias declarations
        if (node.kind === SyntaxKind.InterfaceDeclaration || node.kind === SyntaxKind.TypeAliasDeclaration) {
            return ModuleInstanceState.NonInstantiated;
        }
        // 2. const enum declarations
        else if (isConstEnumDeclaration(node)) {
            return ModuleInstanceState.ConstEnumOnly;
        }
        // 3. non-exported import declarations
        else if ((node.kind === SyntaxKind.ImportDeclaration || node.kind === SyntaxKind.ImportEqualsDeclaration) && !(node.flags & NodeFlags.Export)) {
            return ModuleInstanceState.NonInstantiated;
        }
        // 4. other uninstantiated module declarations.
        else if (node.kind === SyntaxKind.ModuleBlock) {
            let state = ModuleInstanceState.NonInstantiated;
            forEachChild(node, n => {
                switch (getModuleInstanceState(n)) {
                    case ModuleInstanceState.NonInstantiated:
                        // child is non-instantiated - continue searching
                        return false;
                    case ModuleInstanceState.ConstEnumOnly:
                        // child is const enum only - record state and continue searching
                        state = ModuleInstanceState.ConstEnumOnly;
                        return false;
                    case ModuleInstanceState.Instantiated:
                        // child is instantiated - record state and stop
                        state = ModuleInstanceState.Instantiated;
                        return true;
                }
            });
            return state;
        }
        else if (node.kind === SyntaxKind.ModuleDeclaration) {
            return getModuleInstanceState((<ModuleDeclaration>node).body);
        }
        else {
            return ModuleInstanceState.Instantiated;
        }
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

        HasLocals = 1 << 2,

        // If the current node is a container that also container that also contains locals.  Examples:
        //
        //      Functions, Methods, Modules, Source-files.
        IsContainerWithLocals = IsContainer | HasLocals
    }

    const binder = createBinder();

    export function bindSourceFile(file: SourceFile, options: CompilerOptions) {
        const start = new Date().getTime();
        binder(file, options);
        bindTime += new Date().getTime() - start;
    }

    function createBinder(): (file: SourceFile, options: CompilerOptions) => void {
        let file: SourceFile;
        let options: CompilerOptions;
        let parent: Node;
        let container: Node;
        let blockScopeContainer: Node;
        let lastContainer: Node;
        let seenThisKeyword: boolean;

        // state used by reachability checks
        let hasExplicitReturn: boolean;
        let currentReachabilityState: Reachability;
        let labelStack: Reachability[];
        let labelIndexMap: Map<number>;
        let implicitLabels: number[];

        // If this file is an external module, then it is automatically in strict-mode according to
        // ES6.  If it is not an external module, then we'll determine if it is in strict mode or
        // not depending on if we see "use strict" in certain places (or if we hit a class/namespace).
        let inStrictMode: boolean;

        let symbolCount = 0;
        let Symbol: { new (flags: SymbolFlags, name: string): Symbol };
        let classifiableNames: Map<string>;

        function bindSourceFile(f: SourceFile, opts: CompilerOptions) {
            file = f;
            options = opts;
            inStrictMode = !!file.externalModuleIndicator;
            classifiableNames = {};
            Symbol = objectAllocator.getSymbolConstructor();

            if (!file.locals) {
                bind(file);
                file.symbolCount = symbolCount;
                file.classifiableNames = classifiableNames;
            }

            file = undefined;
            options = undefined;
            parent = undefined;
            container = undefined;
            blockScopeContainer = undefined;
            lastContainer = undefined;
            seenThisKeyword = false;
            hasExplicitReturn = false;
            labelStack = undefined;
            labelIndexMap = undefined;
            implicitLabels = undefined;
        }

        return bindSourceFile;

        function createSymbol(flags: SymbolFlags, name: string): Symbol {
            symbolCount++;
            return new Symbol(flags, name);
        }

        function addDeclarationToSymbol(symbol: Symbol, node: Declaration, symbolFlags: SymbolFlags) {
            symbol.flags |= symbolFlags;

            node.symbol = symbol;

            if (!symbol.declarations) {
                symbol.declarations = [];
            }
            symbol.declarations.push(node);

            if (symbolFlags & SymbolFlags.HasExports && !symbol.exports) {
                symbol.exports = {};
            }

            if (symbolFlags & SymbolFlags.HasMembers && !symbol.members) {
                symbol.members = {};
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
        function getDeclarationName(node: Declaration): string {
            if (node.name) {
                if (node.kind === SyntaxKind.ModuleDeclaration && node.name.kind === SyntaxKind.StringLiteral) {
                    return `"${(<LiteralExpression>node.name).text}"`;
                }
                if (node.name.kind === SyntaxKind.ComputedPropertyName) {
                    const nameExpression = (<ComputedPropertyName>node.name).expression;
                    // treat computed property names where expression is string/numeric literal as just string/numeric literal 
                    if (isStringOrNumericLiteral(nameExpression.kind)) {
                        return (<LiteralExpression>nameExpression).text;
                    }

                    Debug.assert(isWellKnownSymbolSyntactically(nameExpression));
                    return getPropertyNameForKnownSymbolName((<PropertyAccessExpression>nameExpression).name.text);
                }
                return (<Identifier | LiteralExpression>node.name).text;
            }
            switch (node.kind) {
                case SyntaxKind.Constructor:
                    return "__constructor";
                case SyntaxKind.FunctionType:
                case SyntaxKind.CallSignature:
                    return "__call";
                case SyntaxKind.ConstructorType:
                case SyntaxKind.ConstructSignature:
                    return "__new";
                case SyntaxKind.IndexSignature:
                    return "__index";
                case SyntaxKind.ExportDeclaration:
                    return "__export";
                case SyntaxKind.ExportAssignment:
                    return (<ExportAssignment>node).isExportEquals ? "export=" : "default";
                case SyntaxKind.BinaryExpression:
                    // Binary expression case is for JS module 'module.exports = expr'
                    return "export=";
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.ClassDeclaration:
                    return node.flags & NodeFlags.Default ? "default" : undefined;
            }
        }

        function getDisplayName(node: Declaration): string {
            return node.name ? declarationNameToString(node.name) : getDeclarationName(node);
        }

        /**
         * Declares a Symbol for the node and adds it to symbols. Reports errors for conflicting identifier names.
         * @param symbolTable - The symbol table which node will be added to.
         * @param parent - node's parent declaration.
         * @param node - The declaration to be added to the symbol table
         * @param includes - The SymbolFlags that node has in addition to its declaration type (eg: export, ambient, etc.)
         * @param excludes - The flags which node cannot be declared alongside in a symbol table. Used to report forbidden declarations.
         */
        function declareSymbol(symbolTable: SymbolTable, parent: Symbol, node: Declaration, includes: SymbolFlags, excludes: SymbolFlags): Symbol {
            Debug.assert(!hasDynamicName(node));

            const isDefaultExport = node.flags & NodeFlags.Default;
            // The exported symbol for an export default function/class node is always named "default"
            const name = isDefaultExport && parent ? "default" : getDeclarationName(node);

            let symbol: Symbol;
            if (name !== undefined) {

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
                // If we created a new symbol, either because we didn't have a symbol with this name
                // in the symbol table, or we conflicted with an existing symbol, then just add this
                // node as the sole declaration of the new symbol.
                //
                // Otherwise, we'll be merging into a compatible existing symbol (for example when
                // you have multiple 'vars' with the same name in the same container).  In this case
                // just add this node into the declarations list of the symbol.
                symbol = hasProperty(symbolTable, name)
                    ? symbolTable[name]
                    : (symbolTable[name] = createSymbol(SymbolFlags.None, name));

                if (name && (includes & SymbolFlags.Classifiable)) {
                    classifiableNames[name] = name;
                }

                if (symbol.flags & excludes) {
                    if (node.name) {
                        node.name.parent = node;
                    }

                    // Report errors every position with duplicate declaration
                    // Report errors on previous encountered declarations
                    let message = symbol.flags & SymbolFlags.BlockScopedVariable
                        ? Diagnostics.Cannot_redeclare_block_scoped_variable_0
                        : Diagnostics.Duplicate_identifier_0;

                    forEach(symbol.declarations, declaration => {
                        if (declaration.flags & NodeFlags.Default) {
                            message = Diagnostics.A_module_cannot_have_multiple_default_exports;
                        }
                    });

                    forEach(symbol.declarations, declaration => {
                        file.bindDiagnostics.push(createDiagnosticForNode(declaration.name || declaration, message, getDisplayName(declaration)));
                    });
                    file.bindDiagnostics.push(createDiagnosticForNode(node.name || node, message, getDisplayName(node)));

                    symbol = createSymbol(SymbolFlags.None, name);
                }
            }
            else {
                symbol = createSymbol(SymbolFlags.None, "__missing");
            }

            addDeclarationToSymbol(symbol, node, includes);
            symbol.parent = parent;

            return symbol;
        }

        function declareModuleMember(node: Declaration, symbolFlags: SymbolFlags, symbolExcludes: SymbolFlags): Symbol {
            const hasExportModifier = getCombinedNodeFlags(node) & NodeFlags.Export;
            if (symbolFlags & SymbolFlags.Alias) {
                if (node.kind === SyntaxKind.ExportSpecifier || (node.kind === SyntaxKind.ImportEqualsDeclaration && hasExportModifier)) {
                    return declareSymbol(container.symbol.exports, container.symbol, node, symbolFlags, symbolExcludes);
                }
                else {
                    return declareSymbol(container.locals, undefined, node, symbolFlags, symbolExcludes);
                }
            }
            else {
                // Exported module members are given 2 symbols: A local symbol that is classified with an ExportValue,
                // ExportType, or ExportContainer flag, and an associated export symbol with all the correct flags set
                // on it. There are 2 main reasons:
                //
                //   1. We treat locals and exports of the same name as mutually exclusive within a container.
                //      That means the binder will issue a Duplicate Identifier error if you mix locals and exports
                //      with the same name in the same container.
                //      TODO: Make this a more specific error and decouple it from the exclusion logic.
                //   2. When we checkIdentifier in the checker, we set its resolved symbol to the local symbol,
                //      but return the export symbol (by calling getExportSymbolOfValueSymbolIfExported). That way
                //      when the emitter comes back to it, it knows not to qualify the name if it was found in a containing scope.
                if (hasExportModifier || container.flags & NodeFlags.ExportContext) {
                    const exportKind =
                        (symbolFlags & SymbolFlags.Value ? SymbolFlags.ExportValue : 0) |
                        (symbolFlags & SymbolFlags.Type ? SymbolFlags.ExportType : 0) |
                        (symbolFlags & SymbolFlags.Namespace ? SymbolFlags.ExportNamespace : 0);
                    const local = declareSymbol(container.locals, undefined, node, exportKind, symbolExcludes);
                    local.exportSymbol = declareSymbol(container.symbol.exports, container.symbol, node, symbolFlags, symbolExcludes);
                    node.localSymbol = local;
                    return local;
                }
                else {
                    return declareSymbol(container.locals, undefined, node, symbolFlags, symbolExcludes);
                }
            }
        }

        // All container nodes are kept on a linked list in declaration order. This list is used by
        // the getLocalNameOfContainer function in the type checker to validate that the local name
        // used for a container is unique.
        function bindChildren(node: Node) {
            // Before we recurse into a node's chilren, we first save the existing parent, container
            // and block-container.  Then after we pop out of processing the children, we restore
            // these saved values.
            const saveParent = parent;
            const saveContainer = container;
            const savedBlockScopeContainer = blockScopeContainer;

            // This node will now be set as the parent of all of its children as we recurse into them.
            parent = node;

            // Depending on what kind of node this is, we may have to adjust the current container
            // and block-container.   If the current node is a container, then it is automatically
            // considered the current block-container as well.  Also, for containers that we know
            // may contain locals, we proactively initialize the .locals field. We do this because
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
            // for it.  We must clear this so we don't accidently move any stale data forward from
            // a previous compilation.
            const containerFlags = getContainerFlags(node);
            if (containerFlags & ContainerFlags.IsContainer) {
                container = blockScopeContainer = node;

                if (containerFlags & ContainerFlags.HasLocals) {
                    container.locals = {};
                }

                addToContainerChain(container);
            }

            else if (containerFlags & ContainerFlags.IsBlockScopedContainer) {
                blockScopeContainer = node;
                blockScopeContainer.locals = undefined;
            }

            let savedReachabilityState: Reachability;
            let savedLabelStack: Reachability[];
            let savedLabels: Map<number>;
            let savedImplicitLabels: number[];
            let savedHasExplicitReturn: boolean;

            const kind = node.kind;
            let flags = node.flags;

            // reset all reachability check related flags on node (for incremental scenarios)
            flags &= ~NodeFlags.ReachabilityCheckFlags;

            if (kind === SyntaxKind.InterfaceDeclaration) {
                seenThisKeyword = false;
            }

            const saveState = kind === SyntaxKind.SourceFile || kind === SyntaxKind.ModuleBlock || isFunctionLikeKind(kind);
            if (saveState) {
                savedReachabilityState = currentReachabilityState;
                savedLabelStack = labelStack;
                savedLabels = labelIndexMap;
                savedImplicitLabels = implicitLabels;
                savedHasExplicitReturn = hasExplicitReturn;

                currentReachabilityState = Reachability.Reachable;
                hasExplicitReturn = false;
                labelStack = labelIndexMap = implicitLabels = undefined;
            }

            bindReachableStatement(node);

            if (currentReachabilityState === Reachability.Reachable && isFunctionLikeKind(kind) && nodeIsPresent((<FunctionLikeDeclaration>node).body)) {
                flags |= NodeFlags.HasImplicitReturn;
                if (hasExplicitReturn) {
                    flags |= NodeFlags.HasExplicitReturn;
                }
            }

            if (kind === SyntaxKind.InterfaceDeclaration) {
                flags = seenThisKeyword ? flags | NodeFlags.ContainsThis : flags & ~NodeFlags.ContainsThis;
            }

            node.flags = flags;

            if (saveState) {
                hasExplicitReturn = savedHasExplicitReturn;
                currentReachabilityState = savedReachabilityState;
                labelStack = savedLabelStack;
                labelIndexMap = savedLabels;
                implicitLabels = savedImplicitLabels;
            }

            container = saveContainer;
            parent = saveParent;
            blockScopeContainer = savedBlockScopeContainer;
        }

        /**
         * Returns true if node and its subnodes were successfully traversed.
         * Returning false means that node was not examined and caller needs to dive into the node himself. 
         */
        function bindReachableStatement(node: Node): void {
            if (checkUnreachable(node)) {
                forEachChild(node, bind);
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
                    bindForInOrForOfStatement(<ForInStatement | ForOfStatement>node);
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
                case SyntaxKind.LabeledStatement:
                    bindLabeledStatement(<LabeledStatement>node);
                    break;
                default:
                    forEachChild(node, bind);
                    break;
            }
        }

        function bindWhileStatement(n: WhileStatement): void {
            const preWhileState =
                n.expression.kind === SyntaxKind.FalseKeyword ? Reachability.Unreachable : currentReachabilityState;
            const postWhileState =
                n.expression.kind === SyntaxKind.TrueKeyword ? Reachability.Unreachable : currentReachabilityState;

            // bind expressions (don't affect reachability)
            bind(n.expression);

            currentReachabilityState = preWhileState;
            const postWhileLabel = pushImplicitLabel();
            bind(n.statement);
            popImplicitLabel(postWhileLabel, postWhileState);
        }

        function bindDoStatement(n: DoStatement): void {
            const preDoState = currentReachabilityState;

            const postDoLabel = pushImplicitLabel();
            bind(n.statement);
            const postDoState = n.expression.kind === SyntaxKind.TrueKeyword ? Reachability.Unreachable : preDoState;
            popImplicitLabel(postDoLabel, postDoState);

            // bind expressions (don't affect reachability)
            bind(n.expression);
        }

        function bindForStatement(n: ForStatement): void {
            const preForState = currentReachabilityState;
            const postForLabel = pushImplicitLabel();

            // bind expressions (don't affect reachability)
            bind(n.initializer);
            bind(n.condition);
            bind(n.incrementor);

            bind(n.statement);

            // for statement is considered infinite when it condition is either omitted or is true keyword
            // - for(..;;..)
            // - for(..;true;..)
            const isInfiniteLoop = (!n.condition || n.condition.kind === SyntaxKind.TrueKeyword);
            const postForState = isInfiniteLoop ? Reachability.Unreachable : preForState;
            popImplicitLabel(postForLabel, postForState);
        }

        function bindForInOrForOfStatement(n: ForInStatement | ForOfStatement): void {
            const preStatementState = currentReachabilityState;
            const postStatementLabel = pushImplicitLabel();

            // bind expressions (don't affect reachability)
            bind(n.initializer);
            bind(n.expression);

            bind(n.statement);
            popImplicitLabel(postStatementLabel, preStatementState);
        }

        function bindIfStatement(n: IfStatement): void {
            // denotes reachability state when entering 'thenStatement' part of the if statement: 
            // i.e. if condition is false then thenStatement is unreachable
            const ifTrueState = n.expression.kind === SyntaxKind.FalseKeyword ? Reachability.Unreachable : currentReachabilityState;
            // denotes reachability state when entering 'elseStatement':
            // i.e. if condition is true then elseStatement is unreachable
            const ifFalseState = n.expression.kind === SyntaxKind.TrueKeyword ? Reachability.Unreachable : currentReachabilityState;

            currentReachabilityState = ifTrueState;

            // bind expression (don't affect reachability)
            bind(n.expression);

            bind(n.thenStatement);
            if (n.elseStatement) {
                const preElseState = currentReachabilityState;
                currentReachabilityState = ifFalseState;
                bind(n.elseStatement);
                currentReachabilityState = or(currentReachabilityState, preElseState);
            }
            else {
                currentReachabilityState = or(currentReachabilityState, ifFalseState);
            }
        }

        function bindReturnOrThrow(n: ReturnStatement | ThrowStatement): void {
            // bind expression (don't affect reachability)
            bind(n.expression);
            if (n.kind === SyntaxKind.ReturnStatement) {
                hasExplicitReturn = true;
            }
            currentReachabilityState = Reachability.Unreachable;
        }

        function bindBreakOrContinueStatement(n: BreakOrContinueStatement): void {
            // call bind on label (don't affect reachability)
            bind(n.label);
            // for continue case touch label so it will be marked a used
            const isValidJump = jumpToLabel(n.label, n.kind === SyntaxKind.BreakStatement ? currentReachabilityState : Reachability.Unreachable);
            if (isValidJump) {
                currentReachabilityState = Reachability.Unreachable;
            }
        }

        function bindTryStatement(n: TryStatement): void {
            // catch\finally blocks has the same reachability as try block
            const preTryState = currentReachabilityState;
            bind(n.tryBlock);
            const postTryState = currentReachabilityState;

            currentReachabilityState = preTryState;
            bind(n.catchClause);
            const postCatchState = currentReachabilityState;

            currentReachabilityState = preTryState;
            bind(n.finallyBlock);

            // post catch/finally state is reachable if
            // - post try state is reachable - control flow can fall out of try block
            // - post catch state is reachable - control flow can fall out of catch block
            currentReachabilityState = or(postTryState, postCatchState);
        }

        function bindSwitchStatement(n: SwitchStatement): void {
            const preSwitchState = currentReachabilityState;
            const postSwitchLabel = pushImplicitLabel();

            // bind expression (don't affect reachability)
            bind(n.expression);

            bind(n.caseBlock);

            const hasDefault = forEach(n.caseBlock.clauses, c => c.kind === SyntaxKind.DefaultClause);

            // post switch state is unreachable if switch is exaustive (has a default case ) and does not have fallthrough from the last case
            const postSwitchState = hasDefault && currentReachabilityState !== Reachability.Reachable ? Reachability.Unreachable : preSwitchState;

            popImplicitLabel(postSwitchLabel, postSwitchState);
        }

        function bindCaseBlock(n: CaseBlock): void {
            const startState = currentReachabilityState;

            for (const clause of n.clauses) {
                currentReachabilityState = startState;
                bind(clause);
                if (clause.statements.length && currentReachabilityState === Reachability.Reachable && options.noFallthroughCasesInSwitch) {
                    errorOnFirstToken(clause, Diagnostics.Fallthrough_case_in_switch);
                }
            }
        }

        function bindLabeledStatement(n: LabeledStatement): void {
            // call bind on label (don't affect reachability)
            bind(n.label);

            const ok = pushNamedLabel(n.label);
            bind(n.statement);
            if (ok) {
                popNamedLabel(n.label, currentReachabilityState);
            }
        }

        function getContainerFlags(node: Node): ContainerFlags {
            switch (node.kind) {
                case SyntaxKind.ClassExpression:
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.TypeLiteral:
                case SyntaxKind.ObjectLiteralExpression:
                    return ContainerFlags.IsContainer;

                case SyntaxKind.CallSignature:
                case SyntaxKind.ConstructSignature:
                case SyntaxKind.IndexSignature:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.Constructor:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                case SyntaxKind.FunctionType:
                case SyntaxKind.ConstructorType:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.ArrowFunction:
                case SyntaxKind.ModuleDeclaration:
                case SyntaxKind.SourceFile:
                case SyntaxKind.TypeAliasDeclaration:
                    return ContainerFlags.IsContainerWithLocals;

                case SyntaxKind.CatchClause:
                case SyntaxKind.ForStatement:
                case SyntaxKind.ForInStatement:
                case SyntaxKind.ForOfStatement:
                case SyntaxKind.CaseBlock:
                    return ContainerFlags.IsBlockScopedContainer;

                case SyntaxKind.Block:
                    // do not treat blocks directly inside a function as a block-scoped-container.
                    // Locals that reside in this block should go to the function locals. Othewise 'x'
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

        function declareSymbolAndAddToSymbolTable(node: Declaration, symbolFlags: SymbolFlags, symbolExcludes: SymbolFlags): void {
            // Just call this directly so that the return type of this function stays "void".
            declareSymbolAndAddToSymbolTableWorker(node, symbolFlags, symbolExcludes);
        }

        function declareSymbolAndAddToSymbolTableWorker(node: Declaration, symbolFlags: SymbolFlags, symbolExcludes: SymbolFlags): Symbol {
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
                case SyntaxKind.ObjectLiteralExpression:
                case SyntaxKind.InterfaceDeclaration:
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
                case SyntaxKind.TypeAliasDeclaration:
                    // All the children of these container types are never visible through another
                    // symbol (i.e. through another symbol's 'exports' or 'members').  Instead,
                    // they're only accessed 'lexically' (i.e. from code that exists underneath
                    // their container in the tree.  To accomplish this, we simply add their declared
                    // symbol to the 'locals' of the container.  These symbols can then be found as
                    // the type checker walks up the containers, checking them for matching names.
                    return declareSymbol(container.locals, undefined, node, symbolFlags, symbolExcludes);
            }
        }

        function declareClassMember(node: Declaration, symbolFlags: SymbolFlags, symbolExcludes: SymbolFlags) {
            return node.flags & NodeFlags.Static
                ? declareSymbol(container.symbol.exports, container.symbol, node, symbolFlags, symbolExcludes)
                : declareSymbol(container.symbol.members, container.symbol, node, symbolFlags, symbolExcludes);
        }

        function declareSourceFileMember(node: Declaration, symbolFlags: SymbolFlags, symbolExcludes: SymbolFlags) {
            return isExternalModule(file)
                ? declareModuleMember(node, symbolFlags, symbolExcludes)
                : declareSymbol(file.locals, undefined, node, symbolFlags, symbolExcludes);
        }

        function hasExportDeclarations(node: ModuleDeclaration | SourceFile): boolean {
            const body = node.kind === SyntaxKind.SourceFile ? node : (<ModuleDeclaration>node).body;
            if (body.kind === SyntaxKind.SourceFile || body.kind === SyntaxKind.ModuleBlock) {
                for (const stat of (<Block>body).statements) {
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
            if (isInAmbientContext(node) && !hasExportDeclarations(node)) {
                node.flags |= NodeFlags.ExportContext;
            }
            else {
                node.flags &= ~NodeFlags.ExportContext;
            }
        }

        function bindModuleDeclaration(node: ModuleDeclaration) {
            setExportContextFlag(node);
            if (node.name.kind === SyntaxKind.StringLiteral) {
                declareSymbolAndAddToSymbolTable(node, SymbolFlags.ValueModule, SymbolFlags.ValueModuleExcludes);
            }
            else {
                const state = getModuleInstanceState(node);
                if (state === ModuleInstanceState.NonInstantiated) {
                    declareSymbolAndAddToSymbolTable(node, SymbolFlags.NamespaceModule, SymbolFlags.NamespaceModuleExcludes);
                }
                else {
                    declareSymbolAndAddToSymbolTable(node, SymbolFlags.ValueModule, SymbolFlags.ValueModuleExcludes);
                    if (node.symbol.flags & (SymbolFlags.Function | SymbolFlags.Class | SymbolFlags.RegularEnum)) {
                        // if module was already merged with some function, class or non-const enum
                        // treat is a non-const-enum-only
                        node.symbol.constEnumOnlyModule = false;
                    }
                    else {
                        const currentModuleIsConstEnumOnly = state === ModuleInstanceState.ConstEnumOnly;
                        if (node.symbol.constEnumOnlyModule === undefined) {
                            // non-merged case - use the current state
                            node.symbol.constEnumOnlyModule = currentModuleIsConstEnumOnly;
                        }
                        else {
                            // merged case: module is const enum only if all its pieces are non-instantiated or const enum
                            node.symbol.constEnumOnlyModule = node.symbol.constEnumOnlyModule && currentModuleIsConstEnumOnly;
                        }
                    }
                }
            }
        }

        function bindFunctionOrConstructorType(node: SignatureDeclaration) {
            // For a given function symbol "<...>(...) => T" we want to generate a symbol identical
            // to the one we would get for: { <...>(...): T }
            //
            // We do that by making an anonymous type literal symbol, and then setting the function
            // symbol as its sole member. To the rest of the system, this symbol will be  indistinguishable
            // from an actual type literal symbol you would have gotten had you used the long form.
            const symbol = createSymbol(SymbolFlags.Signature, getDeclarationName(node));
            addDeclarationToSymbol(symbol, node, SymbolFlags.Signature);

            const typeLiteralSymbol = createSymbol(SymbolFlags.TypeLiteral, "__type");
            addDeclarationToSymbol(typeLiteralSymbol, node, SymbolFlags.TypeLiteral);
            typeLiteralSymbol.members = { [symbol.name]: symbol };
        }

        function bindObjectLiteralExpression(node: ObjectLiteralExpression) {
            const enum ElementKind {
                Property = 1,
                Accessor = 2
            }

            if (inStrictMode) {
                const seen: Map<ElementKind> = {};

                for (const prop of node.properties) {
                    if (prop.name.kind !== SyntaxKind.Identifier) {
                        continue;
                    }

                    const identifier = <Identifier>prop.name;

                    // ECMA-262 11.1.5 Object Initialiser
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

                    const existingKind = seen[identifier.text];
                    if (!existingKind) {
                        seen[identifier.text] = currentKind;
                        continue;
                    }

                    if (currentKind === ElementKind.Property && existingKind === ElementKind.Property) {
                        const span = getErrorSpanForNode(file, identifier);
                        file.bindDiagnostics.push(createFileDiagnostic(file, span.start, span.length,
                            Diagnostics.An_object_literal_cannot_have_multiple_properties_with_the_same_name_in_strict_mode));
                    }
                }
            }

            return bindAnonymousDeclaration(node, SymbolFlags.ObjectLiteral, "__object");
        }

        function bindAnonymousDeclaration(node: Declaration, symbolFlags: SymbolFlags, name: string) {
            const symbol = createSymbol(symbolFlags, name);
            addDeclarationToSymbol(symbol, node, symbolFlags);
        }

        function bindBlockScopedDeclaration(node: Declaration, symbolFlags: SymbolFlags, symbolExcludes: SymbolFlags) {
            switch (blockScopeContainer.kind) {
                case SyntaxKind.ModuleDeclaration:
                    declareModuleMember(node, symbolFlags, symbolExcludes);
                    break;
                case SyntaxKind.SourceFile:
                    if (isExternalModule(<SourceFile>container)) {
                        declareModuleMember(node, symbolFlags, symbolExcludes);
                        break;
                    }
                    // fall through.
                default:
                    if (!blockScopeContainer.locals) {
                        blockScopeContainer.locals = {};
                        addToContainerChain(blockScopeContainer);
                    }
                    declareSymbol(blockScopeContainer.locals, undefined, node, symbolFlags, symbolExcludes);
            }
        }

        function bindBlockScopedVariableDeclaration(node: Declaration) {
            bindBlockScopedDeclaration(node, SymbolFlags.BlockScopedVariable, SymbolFlags.BlockScopedVariableExcludes);
        }

        // The binder visits every node in the syntax tree so it is a convenient place to perform a single localized
        // check for reserved words used as identifiers in strict mode code.
        function checkStrictModeIdentifier(node: Identifier) {
            if (inStrictMode &&
                node.originalKeywordKind >= SyntaxKind.FirstFutureReservedWord &&
                node.originalKeywordKind <= SyntaxKind.LastFutureReservedWord &&
                !isIdentifierName(node)) {

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
            return node.kind === SyntaxKind.Identifier &&
                ((<Identifier>node).text === "eval" || (<Identifier>node).text === "arguments");
        }

        function checkStrictModeEvalOrArguments(contextNode: Node, name: Node) {
            if (name && name.kind === SyntaxKind.Identifier) {
                const identifier = <Identifier>name;
                if (isEvalOrArgumentsIdentifier(identifier)) {
                    // We check first if the name is inside class declaration or class expression; if so give explicit message
                    // otherwise report generic error message.
                    const span = getErrorSpanForNode(file, name);
                    file.bindDiagnostics.push(createFileDiagnostic(file, span.start, span.length,
                        getStrictModeEvalOrArgumentsMessage(contextNode), identifier.text));
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

        function checkStrictModeNumericLiteral(node: LiteralExpression) {
            if (inStrictMode && node.flags & NodeFlags.OctalLiteral) {
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

        function getDestructuringParameterName(node: Declaration) {
            return "__" + indexOf((<SignatureDeclaration>node.parent).parameters, node);
        }

        function bind(node: Node): void {
            if (!node) {
                return;
            }

            node.parent = parent;

            const savedInStrictMode = inStrictMode;
            if (!savedInStrictMode) {
                updateStrictMode(node);
            }

            // First we bind declaration nodes to a symbol if possible.  We'll both create a symbol
            // and then potentially add the symbol to an appropriate symbol table. Possible
            // destination symbol tables are:
            //
            //  1) The 'exports' table of the current container's symbol.
            //  2) The 'members' table of the current container's symbol.
            //  3) The 'locals' table of the current container.
            //
            // However, not all symbols will end up in any of these tables.  'Anonymous' symbols
            // (like TypeLiterals for example) will not be put in any table.
            bindWorker(node);

            // Then we recurse into the children of the node to bind them as well.  For certain
            // symbols we do specialized work when we recurse.  For example, we'll keep track of
            // the current 'container' node when it changes.  This helps us know which symbol table
            // a local should go into for example.
            bindChildren(node);

            inStrictMode = savedInStrictMode;
        }

        function updateStrictMode(node: Node) {
            switch (node.kind) {
                case SyntaxKind.SourceFile:
                case SyntaxKind.ModuleBlock:
                    updateStrictModeStatementList((<SourceFile | ModuleBlock>node).statements);
                    return;
                case SyntaxKind.Block:
                    if (isFunctionLike(node.parent)) {
                        updateStrictModeStatementList((<Block>node).statements);
                    }
                    return;
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.ClassExpression:
                    // All classes are automatically in strict mode in ES6.
                    inStrictMode = true;
                    return;
            }
        }

        function updateStrictModeStatementList(statements: NodeArray<Statement>) {
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

        /// Should be called only on prologue directives (isPrologueDirective(node) should be true)
        function isUseStrictPrologueDirective(node: ExpressionStatement): boolean {
            const nodeText = getTextOfNodeFromSourceText(file.text, node.expression);

            // Note: the node text must be exactly "use strict" or 'use strict'.  It is not ok for the
            // string to contain unicode escapes (as per ES5).
            return nodeText === "\"use strict\"" || nodeText === "'use strict'";
        }

        function bindWorker(node: Node) {
            switch (node.kind) {
                /* Strict mode checks */
                case SyntaxKind.Identifier:
                    return checkStrictModeIdentifier(<Identifier>node);
                case SyntaxKind.BinaryExpression:
                    if (isInJavaScriptFile(node)) {
                        if (isExportsPropertyAssignment(node)) {
                            bindExportsPropertyAssignment(<BinaryExpression>node);
                        }
                        else if (isModuleExportsAssignment(node)) {
                            bindModuleExportsAssignment(<BinaryExpression>node);
                        }
                    }
                    return checkStrictModeBinaryExpression(<BinaryExpression>node);
                case SyntaxKind.CatchClause:
                    return checkStrictModeCatchClause(<CatchClause>node);
                case SyntaxKind.DeleteExpression:
                    return checkStrictModeDeleteExpression(<DeleteExpression>node);
                case SyntaxKind.NumericLiteral:
                    return checkStrictModeNumericLiteral(<LiteralExpression>node);
                case SyntaxKind.PostfixUnaryExpression:
                    return checkStrictModePostfixUnaryExpression(<PostfixUnaryExpression>node);
                case SyntaxKind.PrefixUnaryExpression:
                    return checkStrictModePrefixUnaryExpression(<PrefixUnaryExpression>node);
                case SyntaxKind.WithStatement:
                    return checkStrictModeWithStatement(<WithStatement>node);
                case SyntaxKind.ThisKeyword:
                    seenThisKeyword = true;
                    return;

                case SyntaxKind.TypeParameter:
                    return declareSymbolAndAddToSymbolTable(<Declaration>node, SymbolFlags.TypeParameter, SymbolFlags.TypeParameterExcludes);
                case SyntaxKind.Parameter:
                    return bindParameter(<ParameterDeclaration>node);
                case SyntaxKind.VariableDeclaration:
                case SyntaxKind.BindingElement:
                    return bindVariableDeclarationOrBindingElement(<VariableDeclaration | BindingElement>node);
                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.PropertySignature:
                    return bindPropertyOrMethodOrAccessor(<Declaration>node, SymbolFlags.Property | ((<PropertyDeclaration>node).questionToken ? SymbolFlags.Optional : SymbolFlags.None), SymbolFlags.PropertyExcludes);
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
                    checkStrictModeFunctionName(<FunctionDeclaration>node);
                    return declareSymbolAndAddToSymbolTable(<Declaration>node, SymbolFlags.Function, SymbolFlags.FunctionExcludes);
                case SyntaxKind.Constructor:
                    return declareSymbolAndAddToSymbolTable(<Declaration>node, SymbolFlags.Constructor, /*symbolExcludes:*/ SymbolFlags.None);
                case SyntaxKind.GetAccessor:
                    return bindPropertyOrMethodOrAccessor(<Declaration>node, SymbolFlags.GetAccessor, SymbolFlags.GetAccessorExcludes);
                case SyntaxKind.SetAccessor:
                    return bindPropertyOrMethodOrAccessor(<Declaration>node, SymbolFlags.SetAccessor, SymbolFlags.SetAccessorExcludes);
                case SyntaxKind.FunctionType:
                case SyntaxKind.ConstructorType:
                    return bindFunctionOrConstructorType(<SignatureDeclaration>node);
                case SyntaxKind.TypeLiteral:
                    return bindAnonymousDeclaration(<TypeLiteralNode>node, SymbolFlags.TypeLiteral, "__type");
                case SyntaxKind.ObjectLiteralExpression:
                    return bindObjectLiteralExpression(<ObjectLiteralExpression>node);
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.ArrowFunction:
                    checkStrictModeFunctionName(<FunctionExpression>node);
                    const bindingName = (<FunctionExpression>node).name ? (<FunctionExpression>node).name.text : "__function";
                    return bindAnonymousDeclaration(<FunctionExpression>node, SymbolFlags.Function, bindingName);

                case SyntaxKind.CallExpression:
                    if (isInJavaScriptFile(node)) {
                        bindCallExpression(<CallExpression>node);
                    }
                    break;

                // Members of classes, interfaces, and modules
                case SyntaxKind.ClassExpression:
                case SyntaxKind.ClassDeclaration:
                    return bindClassLikeDeclaration(<ClassLikeDeclaration>node);
                case SyntaxKind.InterfaceDeclaration:
                    return bindBlockScopedDeclaration(<Declaration>node, SymbolFlags.Interface, SymbolFlags.InterfaceExcludes);
                case SyntaxKind.TypeAliasDeclaration:
                    return bindBlockScopedDeclaration(<Declaration>node, SymbolFlags.TypeAlias, SymbolFlags.TypeAliasExcludes);
                case SyntaxKind.EnumDeclaration:
                    return bindEnumDeclaration(<EnumDeclaration>node);
                case SyntaxKind.ModuleDeclaration:
                    return bindModuleDeclaration(<ModuleDeclaration>node);

                // Imports and exports
                case SyntaxKind.ImportEqualsDeclaration:
                case SyntaxKind.NamespaceImport:
                case SyntaxKind.ImportSpecifier:
                case SyntaxKind.ExportSpecifier:
                    return declareSymbolAndAddToSymbolTable(<Declaration>node, SymbolFlags.Alias, SymbolFlags.AliasExcludes);
                case SyntaxKind.ImportClause:
                    return bindImportClause(<ImportClause>node);
                case SyntaxKind.ExportDeclaration:
                    return bindExportDeclaration(<ExportDeclaration>node);
                case SyntaxKind.ExportAssignment:
                    return bindExportAssignment(<ExportAssignment>node);
                case SyntaxKind.SourceFile:
                    return bindSourceFileIfExternalModule();
            }
        }

        function bindSourceFileIfExternalModule() {
            setExportContextFlag(file);
            if (isExternalModule(file)) {
                bindSourceFileAsExternalModule();
            }
        }

        function bindSourceFileAsExternalModule() {
            bindAnonymousDeclaration(file, SymbolFlags.ValueModule, `"${removeFileExtension(file.fileName) }"`);
        }

        function bindExportAssignment(node: ExportAssignment | BinaryExpression) {
            const boundExpression = node.kind === SyntaxKind.ExportAssignment ? (<ExportAssignment>node).expression : (<BinaryExpression>node).right;
            if (!container.symbol || !container.symbol.exports) {
                // Export assignment in some sort of block construct
                bindAnonymousDeclaration(node, SymbolFlags.Alias, getDeclarationName(node));
            }
            else if (boundExpression.kind === SyntaxKind.Identifier) {
                // An export default clause with an identifier exports all meanings of that identifier
                declareSymbol(container.symbol.exports, container.symbol, node, SymbolFlags.Alias, SymbolFlags.PropertyExcludes | SymbolFlags.AliasExcludes);
            }
            else {
                // An export default clause with an expression exports a value
                declareSymbol(container.symbol.exports, container.symbol, node, SymbolFlags.Property, SymbolFlags.PropertyExcludes | SymbolFlags.AliasExcludes);
            }
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
                bindSourceFileAsExternalModule();
            }
        }

        function bindExportsPropertyAssignment(node: BinaryExpression) {
            // When we create a property via 'exports.foo = bar', the 'exports.foo' property access
            // expression is the declaration
            setCommonJsModuleIndicator(node);
            declareSymbol(file.symbol.exports, file.symbol, <PropertyAccessExpression>node.left, SymbolFlags.Property | SymbolFlags.Export, SymbolFlags.None);
        }

        function bindModuleExportsAssignment(node: BinaryExpression) {
            // 'module.exports = expr' assignment
            setCommonJsModuleIndicator(node);
            bindExportAssignment(node);
        }

        function bindCallExpression(node: CallExpression) {
            // We're only inspecting call expressions to detect CommonJS modules, so we can skip
            // this check if we've already seen the module indicator
            if (!file.commonJsModuleIndicator && isRequireCall(node)) {
                setCommonJsModuleIndicator(node);
            }
        }

        function bindClassLikeDeclaration(node: ClassLikeDeclaration) {
            if (node.kind === SyntaxKind.ClassDeclaration) {
                bindBlockScopedDeclaration(node, SymbolFlags.Class, SymbolFlags.ClassExcludes);
            }
            else {
                const bindingName = node.name ? node.name.text : "__class";
                bindAnonymousDeclaration(node, SymbolFlags.Class, bindingName);
                // Add name of class expression into the map for semantic classifier
                if (node.name) {
                    classifiableNames[node.name.text] = node.name.text;
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
            const prototypeSymbol = createSymbol(SymbolFlags.Property | SymbolFlags.Prototype, "prototype");
            if (hasProperty(symbol.exports, prototypeSymbol.name)) {
                if (node.name) {
                    node.name.parent = node;
                }
                file.bindDiagnostics.push(createDiagnosticForNode(symbol.exports[prototypeSymbol.name].declarations[0],
                    Diagnostics.Duplicate_identifier_0, prototypeSymbol.name));
            }
            symbol.exports[prototypeSymbol.name] = prototypeSymbol;
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
            if (inStrictMode) {
                // It is a SyntaxError if the identifier eval or arguments appears within a FormalParameterList of a
                // strict mode FunctionLikeDeclaration or FunctionExpression(13.1)
                checkStrictModeEvalOrArguments(node, node.name);
            }

            if (isBindingPattern(node.name)) {
                bindAnonymousDeclaration(node, SymbolFlags.FunctionScopedVariable, getDestructuringParameterName(node));
            }
            else {
                declareSymbolAndAddToSymbolTable(node, SymbolFlags.FunctionScopedVariable, SymbolFlags.ParameterExcludes);
            }

            // If this is a property-parameter, then also declare the property symbol into the
            // containing class.
            if (node.flags & NodeFlags.AccessibilityModifier &&
                node.parent.kind === SyntaxKind.Constructor &&
                isClassLike(node.parent.parent)) {

                const classDeclaration = <ClassLikeDeclaration>node.parent.parent;
                declareSymbol(classDeclaration.symbol.members, classDeclaration.symbol, node, SymbolFlags.Property, SymbolFlags.PropertyExcludes);
            }
        }

        function bindPropertyOrMethodOrAccessor(node: Declaration, symbolFlags: SymbolFlags, symbolExcludes: SymbolFlags) {
            return hasDynamicName(node)
                ? bindAnonymousDeclaration(node, symbolFlags, "__computed")
                : declareSymbolAndAddToSymbolTable(node, symbolFlags, symbolExcludes);
        }

        // reachability checks

        function pushNamedLabel(name: Identifier): boolean {
            initializeReachabilityStateIfNecessary();

            if (hasProperty(labelIndexMap, name.text)) {
                return false;
            }
            labelIndexMap[name.text] = labelStack.push(Reachability.Unintialized) - 1;
            return true;
        }

        function pushImplicitLabel(): number {
            initializeReachabilityStateIfNecessary();

            const index = labelStack.push(Reachability.Unintialized) - 1;
            implicitLabels.push(index);
            return index;
        }

        function popNamedLabel(label: Identifier, outerState: Reachability): void {
            const index = labelIndexMap[label.text];
            Debug.assert(index !== undefined);
            Debug.assert(labelStack.length == index + 1);

            labelIndexMap[label.text] = undefined;

            setCurrentStateAtLabel(labelStack.pop(), outerState, label);
        }

        function popImplicitLabel(implicitLabelIndex: number, outerState: Reachability): void {
            if (labelStack.length !== implicitLabelIndex + 1) {
                Debug.assert(false, `Label stack: ${labelStack.length}, index:${implicitLabelIndex}`);
            }

            const i = implicitLabels.pop();

            if (implicitLabelIndex !== i) {
                Debug.assert(false, `i: ${i}, index: ${implicitLabelIndex}`);
            }

            setCurrentStateAtLabel(labelStack.pop(), outerState, /*name*/ undefined);
        }

        function setCurrentStateAtLabel(innerMergedState: Reachability, outerState: Reachability, label: Identifier): void {
            if (innerMergedState === Reachability.Unintialized) {
                if (label && !options.allowUnusedLabels) {
                    file.bindDiagnostics.push(createDiagnosticForNode(label, Diagnostics.Unused_label));
                }
                currentReachabilityState = outerState;
            }
            else {
                currentReachabilityState = or(innerMergedState, outerState);
            }
        }

        function jumpToLabel(label: Identifier, outerState: Reachability): boolean {
            initializeReachabilityStateIfNecessary();

            const index = label ? labelIndexMap[label.text] : lastOrUndefined(implicitLabels);
            if (index === undefined) {
                // reference to unknown label or
                // break/continue used outside of loops
                return false;
            }
            const stateAtLabel = labelStack[index];
            labelStack[index] = stateAtLabel === Reachability.Unintialized ? outerState : or(stateAtLabel, outerState);
            return true;
        }

        function checkUnreachable(node: Node): boolean {
            switch (currentReachabilityState) {
                case Reachability.Unreachable:
                    const reportError =
                        // report error on all statements except empty ones
                        (isStatement(node) && node.kind !== SyntaxKind.EmptyStatement) ||
                        // report error on class declarations
                        node.kind === SyntaxKind.ClassDeclaration ||
                        // report error on instantiated modules or const-enums only modules if preserveConstEnums is set
                        (node.kind === SyntaxKind.ModuleDeclaration && shouldReportErrorOnModuleDeclaration(<ModuleDeclaration>node)) ||
                        // report error on regular enums and const enums if preserveConstEnums is set
                        (node.kind === SyntaxKind.EnumDeclaration && (!isConstEnumDeclaration(node) || options.preserveConstEnums));

                    if (reportError) {
                        currentReachabilityState = Reachability.ReportedUnreachable;

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
                            !isInAmbientContext(node) &&
                            (
                                node.kind !== SyntaxKind.VariableStatement ||
                                getCombinedNodeFlags((<VariableStatement>node).declarationList) & NodeFlags.BlockScoped ||
                                forEach((<VariableStatement>node).declarationList.declarations, d => d.initializer)
                            );

                        if (reportUnreachableCode) {
                            errorOnFirstToken(node, Diagnostics.Unreachable_code_detected);
                        }
                    }
                case Reachability.ReportedUnreachable:
                    return true;
                default:
                    return false;
            }

            function shouldReportErrorOnModuleDeclaration(node: ModuleDeclaration): boolean {
                const instanceState = getModuleInstanceState(node);
                return instanceState === ModuleInstanceState.Instantiated || (instanceState === ModuleInstanceState.ConstEnumOnly && options.preserveConstEnums);
            }
        }

        function initializeReachabilityStateIfNecessary(): void {
            if (labelIndexMap) {
                return;
            }
            currentReachabilityState = Reachability.Reachable;
            labelIndexMap = {};
            labelStack = [];
            implicitLabels = [];
        }
    }
}
