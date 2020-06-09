/* @internal */
namespace ts.refactor.extractSymbol {
    const refactorName = "Extract Symbol";
    registerRefactor(refactorName, { getAvailableActions, getEditsForAction });

    /**
     * Compute the associated code actions
     * Exported for tests.
     */
    export function getAvailableActions(context: RefactorContext): readonly ApplicableRefactorInfo[] {
        const rangeToExtract = getRangeToExtract(context.file, getRefactorContextSpan(context), context.triggerReason === "invoked");

        const targetRange = rangeToExtract.targetRange;
        if (targetRange === undefined) {
            return emptyArray;
        }

        const extractions = getPossibleExtractions(targetRange, context);
        if (extractions === undefined) {
            // No extractions possible
            return emptyArray;
        }

        const functionActions: RefactorActionInfo[] = [];
        const usedFunctionNames: Map<boolean> = createMap();

        const constantActions: RefactorActionInfo[] = [];
        const usedConstantNames: Map<boolean> = createMap();

        let i = 0;
        for (const { functionExtraction, constantExtraction } of extractions) {
            // Skip these since we don't have a way to report errors yet
            if (functionExtraction.errors.length === 0) {
                // Don't issue refactorings with duplicated names.
                // Scopes come back in "innermost first" order, so extractions will
                // preferentially go into nearer scopes
                const description = functionExtraction.description;
                if (!usedFunctionNames.has(description)) {
                    usedFunctionNames.set(description, true);
                    functionActions.push({
                        description,
                        name: `function_scope_${i}`
                    });
                }
            }

            // Skip these since we don't have a way to report errors yet
            if (constantExtraction.errors.length === 0) {
                // Don't issue refactorings with duplicated names.
                // Scopes come back in "innermost first" order, so extractions will
                // preferentially go into nearer scopes
                const description = constantExtraction.description;
                if (!usedConstantNames.has(description)) {
                    usedConstantNames.set(description, true);
                    constantActions.push({
                        description,
                        name: `constant_scope_${i}`
                    });
                }
            }

            // *do* increment i anyway because we'll look for the i-th scope
            // later when actually doing the refactoring if the user requests it
            i++;
        }

        const infos: ApplicableRefactorInfo[] = [];

        if (constantActions.length) {
            infos.push({
                name: refactorName,
                description: getLocaleSpecificMessage(Diagnostics.Extract_constant),
                actions: constantActions
            });
        }

        if (functionActions.length) {
            infos.push({
                name: refactorName,
                description: getLocaleSpecificMessage(Diagnostics.Extract_function),
                actions: functionActions
            });
        }

        return infos.length ? infos : emptyArray;
    }

    /* Exported for tests */
    export function getEditsForAction(context: RefactorContext, actionName: string): RefactorEditInfo | undefined {
        const rangeToExtract = getRangeToExtract(context.file, getRefactorContextSpan(context));
        const targetRange = rangeToExtract.targetRange!; // TODO:GH#18217

        const parsedFunctionIndexMatch = /^function_scope_(\d+)$/.exec(actionName);
        if (parsedFunctionIndexMatch) {
            const index = +parsedFunctionIndexMatch[1];
            Debug.assert(isFinite(index), "Expected to parse a finite number from the function scope index");
            return getFunctionExtractionAtIndex(targetRange, context, index);
        }

        const parsedConstantIndexMatch = /^constant_scope_(\d+)$/.exec(actionName);
        if (parsedConstantIndexMatch) {
            const index = +parsedConstantIndexMatch[1];
            Debug.assert(isFinite(index), "Expected to parse a finite number from the constant scope index");
            return getConstantExtractionAtIndex(targetRange, context, index);
        }

        Debug.fail("Unrecognized action name");
    }

    // Move these into diagnostic messages if they become user-facing
    export namespace Messages {
        function createMessage(message: string): DiagnosticMessage {
            return { message, code: 0, category: DiagnosticCategory.Message, key: message };
        }

        export const cannotExtractRange: DiagnosticMessage = createMessage("Cannot extract range.");
        export const cannotExtractImport: DiagnosticMessage = createMessage("Cannot extract import statement.");
        export const cannotExtractSuper: DiagnosticMessage = createMessage("Cannot extract super call.");
        export const cannotExtractJSDoc: DiagnosticMessage = createMessage("Cannot extract JSDoc.");
        export const cannotExtractEmpty: DiagnosticMessage = createMessage("Cannot extract empty range.");
        export const expressionExpected: DiagnosticMessage = createMessage("expression expected.");
        export const uselessConstantType: DiagnosticMessage = createMessage("No reason to extract constant of type.");
        export const statementOrExpressionExpected: DiagnosticMessage = createMessage("Statement or expression expected.");
        export const cannotExtractRangeContainingConditionalBreakOrContinueStatements: DiagnosticMessage = createMessage("Cannot extract range containing conditional break or continue statements.");
        export const cannotExtractRangeContainingConditionalReturnStatement: DiagnosticMessage = createMessage("Cannot extract range containing conditional return statement.");
        export const cannotExtractRangeContainingLabeledBreakOrContinueStatementWithTargetOutsideOfTheRange: DiagnosticMessage = createMessage("Cannot extract range containing labeled break or continue with target outside of the range.");
        export const cannotExtractRangeThatContainsWritesToReferencesLocatedOutsideOfTheTargetRangeInGenerators: DiagnosticMessage = createMessage("Cannot extract range containing writes to references located outside of the target range in generators.");
        export const typeWillNotBeVisibleInTheNewScope = createMessage("Type will not visible in the new scope.");
        export const functionWillNotBeVisibleInTheNewScope = createMessage("Function will not visible in the new scope.");
        export const cannotExtractIdentifier = createMessage("Select more than a single identifier.");
        export const cannotExtractExportedEntity = createMessage("Cannot extract exported declaration");
        export const cannotWriteInExpression = createMessage("Cannot write back side-effects when extracting an expression");
        export const cannotExtractReadonlyPropertyInitializerOutsideConstructor = createMessage("Cannot move initialization of read-only class property outside of the constructor");
        export const cannotExtractAmbientBlock = createMessage("Cannot extract code from ambient contexts");
        export const cannotAccessVariablesFromNestedScopes = createMessage("Cannot access variables from nested scopes");
        export const cannotExtractToOtherFunctionLike = createMessage("Cannot extract method to a function-like scope that is not a function");
        export const cannotExtractToJSClass = createMessage("Cannot extract constant to a class scope in JS");
        export const cannotExtractToExpressionArrowFunction = createMessage("Cannot extract constant to an arrow function without a block");
    }

    enum RangeFacts {
        None = 0,
        HasReturn = 1 << 0,
        IsGenerator = 1 << 1,
        IsAsyncFunction = 1 << 2,
        UsesThis = 1 << 3,
        /**
         * The range is in a function which needs the 'static' modifier in a class
         */
        InStaticRegion = 1 << 4
    }

    /**
     * Represents an expression or a list of statements that should be extracted with some extra information
     */
    interface TargetRange {
        readonly range: Expression | Statement[];
        readonly facts: RangeFacts;
        /**
         * A list of symbols that are declared in the selected range which are visible in the containing lexical scope
         * Used to ensure we don't turn something used outside the range free (or worse, resolve to a different entity).
         */
        readonly declarations: Symbol[];
    }

    /**
     * Result of 'getRangeToExtract' operation: contains either a range or a list of errors
     */
    type RangeToExtract = {
        readonly targetRange?: never;
        readonly errors: readonly Diagnostic[];
    } | {
        readonly targetRange: TargetRange;
        readonly errors?: never;
    };

    /*
     * Scopes that can store newly extracted method
     */
    type Scope = FunctionLikeDeclaration | SourceFile | ModuleBlock | ClassLikeDeclaration;

    /**
     * getRangeToExtract takes a span inside a text file and returns either an expression or an array
     * of statements representing the minimum set of nodes needed to extract the entire span. This
     * process may fail, in which case a set of errors is returned instead (these are currently
     * not shown to the user, but can be used by us diagnostically)
     */
    // exported only for tests
    export function getRangeToExtract(sourceFile: SourceFile, span: TextSpan, considerEmptySpans = true): RangeToExtract {
        const { length } = span;
        if (length === 0 && !considerEmptySpans) {
            return { errors: [createFileDiagnostic(sourceFile, span.start, length, Messages.cannotExtractEmpty)] };
        }
        const cursorRequest = length === 0 && considerEmptySpans;

        // Walk up starting from the the start position until we find a non-SourceFile node that subsumes the selected span.
        // This may fail (e.g. you select two statements in the root of a source file)
        const startToken = getTokenAtPosition(sourceFile, span.start);
        const start = cursorRequest ? getExtractableParent(startToken): getParentNodeInSpan(startToken, sourceFile, span);
        // Do the same for the ending position
        const endToken = findTokenOnLeftOfPosition(sourceFile, textSpanEnd(span));
        const end = cursorRequest ? start : getParentNodeInSpan(endToken, sourceFile, span);

        const declarations: Symbol[] = [];

        // We'll modify these flags as we walk the tree to collect data
        // about what things need to be done as part of the extraction.
        let rangeFacts = RangeFacts.None;

        if (!start || !end) {
            // cannot find either start or end node
            return { errors: [createFileDiagnostic(sourceFile, span.start, length, Messages.cannotExtractRange)] };
        }

        if (start.parent !== end.parent) {
            // start and end nodes belong to different subtrees
            return { errors: [createFileDiagnostic(sourceFile, span.start, length, Messages.cannotExtractRange)] };
        }

        if (start !== end) {
            // start and end should be statements and parent should be either block or a source file
            if (!isBlockLike(start.parent)) {
                return { errors: [createFileDiagnostic(sourceFile, span.start, length, Messages.cannotExtractRange)] };
            }
            const statements: Statement[] = [];
            const start2 = start; // TODO: GH#18217 Need to alias `start` to get this to compile. See https://github.com/Microsoft/TypeScript/issues/19955#issuecomment-344118248
            for (const statement of (start2.parent as BlockLike).statements) {
                if (statement === start || statements.length) {
                    const errors = checkNode(statement);
                    if (errors) {
                        return { errors };
                    }
                    statements.push(statement);
                }
                if (statement === end) {
                    break;
                }
            }

            if (!statements.length) {
                // https://github.com/Microsoft/TypeScript/issues/20559
                // Ranges like [|case 1: break;|] will fail to populate `statements` because
                // they will never find `start` in `start.parent.statements`.
                // Consider: We could support ranges like [|case 1:|] by refining them to just
                // the expression.
                return { errors: [createFileDiagnostic(sourceFile, span.start, length, Messages.cannotExtractRange)] };
            }

            return { targetRange: { range: statements, facts: rangeFacts, declarations } };
        }

        if (isJSDoc(start)) {
            return { errors: [createFileDiagnostic(sourceFile, span.start, length, Messages.cannotExtractJSDoc)] };
        }

        if (isReturnStatement(start) && !start.expression) {
            // Makes no sense to extract an expression-less return statement.
            return { errors: [createFileDiagnostic(sourceFile, span.start, length, Messages.cannotExtractRange)] };
        }

        // We have a single node (start)
        const node = refineNode(start);

        const errors = checkRootNode(node) || checkNode(node);
        if (errors) {
            return { errors };
        }
        return { targetRange: { range: getStatementOrExpressionRange(node)!, facts: rangeFacts, declarations } }; // TODO: GH#18217

        /**
         * Attempt to refine the extraction node (generally, by shrinking it) to produce better results.
         * @param node The unrefined extraction node.
         */
        function refineNode(node: Node): Node {
            if (isReturnStatement(node)) {
                if (node.expression) {
                    return node.expression;
                }
            }
            else if (isVariableStatement(node)) {
                let numInitializers = 0;
                let lastInitializer: Expression | undefined;
                for (const declaration of node.declarationList.declarations) {
                    if (declaration.initializer) {
                        numInitializers++;
                        lastInitializer = declaration.initializer;
                    }
                }
                if (numInitializers === 1) {
                    return lastInitializer!;
                }
                // No special handling if there are multiple initializers.
            }
            else if (isVariableDeclaration(node)) {
                if (node.initializer) {
                    return node.initializer;
                }
            }

            return node;
        }

        function checkRootNode(node: Node): Diagnostic[] | undefined {
            if (isIdentifier(isExpressionStatement(node) ? node.expression : node)) {
                return [createDiagnosticForNode(node, Messages.cannotExtractIdentifier)];
            }
            return undefined;
        }

        function checkForStaticContext(nodeToCheck: Node, containingClass: Node) {
            let current: Node = nodeToCheck;
            while (current !== containingClass) {
                if (current.kind === SyntaxKind.PropertyDeclaration) {
                    if (hasSyntacticModifier(current, ModifierFlags.Static)) {
                        rangeFacts |= RangeFacts.InStaticRegion;
                    }
                    break;
                }
                else if (current.kind === SyntaxKind.Parameter) {
                    const ctorOrMethod = getContainingFunction(current)!;
                    if (ctorOrMethod.kind === SyntaxKind.Constructor) {
                        rangeFacts |= RangeFacts.InStaticRegion;
                    }
                    break;
                }
                else if (current.kind === SyntaxKind.MethodDeclaration) {
                    if (hasSyntacticModifier(current, ModifierFlags.Static)) {
                        rangeFacts |= RangeFacts.InStaticRegion;
                    }
                }
                current = current.parent;
            }
        }

        // Verifies whether we can actually extract this node or not.
        function checkNode(nodeToCheck: Node): Diagnostic[] | undefined {
            const enum PermittedJumps {
                None = 0,
                Break = 1 << 0,
                Continue = 1 << 1,
                Return = 1 << 2
            }

            // We believe it's true because the node is from the (unmodified) tree.
            Debug.assert(nodeToCheck.pos <= nodeToCheck.end, "This failure could trigger https://github.com/Microsoft/TypeScript/issues/20809 (1)");

            // For understanding how skipTrivia functioned:
            Debug.assert(!positionIsSynthesized(nodeToCheck.pos), "This failure could trigger https://github.com/Microsoft/TypeScript/issues/20809 (2)");

            if (!isStatement(nodeToCheck) && !(isExpressionNode(nodeToCheck) && isExtractableExpression(nodeToCheck))) {
                return [createDiagnosticForNode(nodeToCheck, Messages.statementOrExpressionExpected)];
            }

            if (nodeToCheck.flags & NodeFlags.Ambient) {
                return [createDiagnosticForNode(nodeToCheck, Messages.cannotExtractAmbientBlock)];
            }

            // If we're in a class, see whether we're in a static region (static property initializer, static method, class constructor parameter default)
            const containingClass = getContainingClass(nodeToCheck);
            if (containingClass) {
                checkForStaticContext(nodeToCheck, containingClass);
            }

            let errors: Diagnostic[] | undefined;
            let permittedJumps = PermittedJumps.Return;
            let seenLabels: __String[];

            visit(nodeToCheck);

            return errors;

            function visit(node: Node) {
                if (errors) {
                    // already found an error - can stop now
                    return true;
                }

                if (isDeclaration(node)) {
                    const declaringNode = (node.kind === SyntaxKind.VariableDeclaration) ? node.parent.parent : node;
                    if (hasSyntacticModifier(declaringNode, ModifierFlags.Export)) {
                        // TODO: GH#18217 Silly to use `errors ||` since it's definitely not defined (see top of `visit`)
                        // Also, if we're only pushing one error, just use `let error: Diagnostic | undefined`!
                        // Also TODO: GH#19956
                        (errors || (errors = [] as Diagnostic[])).push(createDiagnosticForNode(node, Messages.cannotExtractExportedEntity));
                        return true;
                    }
                    declarations.push(node.symbol);
                }

                // Some things can't be extracted in certain situations
                switch (node.kind) {
                    case SyntaxKind.ImportDeclaration:
                        (errors || (errors = [] as Diagnostic[])).push(createDiagnosticForNode(node, Messages.cannotExtractImport));
                        return true;
                    case SyntaxKind.SuperKeyword:
                        // For a super *constructor call*, we have to be extracting the entire class,
                        // but a super *method call* simply implies a 'this' reference
                        if (node.parent.kind === SyntaxKind.CallExpression) {
                            // Super constructor call
                            const containingClass = getContainingClass(node)!; // TODO:GH#18217
                            if (containingClass.pos < span.start || containingClass.end >= (span.start + span.length)) {
                                (errors || (errors = [] as Diagnostic[])).push(createDiagnosticForNode(node, Messages.cannotExtractSuper));
                                return true;
                            }
                        }
                        else {
                            rangeFacts |= RangeFacts.UsesThis;
                        }
                        break;
                    case SyntaxKind.ArrowFunction:
                        // check if arrow function uses this
                        forEachChild(node, function check(n) {
                            if (isThis(n)) {
                                rangeFacts |= RangeFacts.UsesThis;
                            }
                            else if (isClassLike(n) || (isFunctionLike(n) && !isArrowFunction(n))) {
                                return false;
                            }
                            else {
                                forEachChild(n, check);
                            }
                        });
                        // falls through
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.FunctionDeclaration:
                        if (isSourceFile(node.parent) && node.parent.externalModuleIndicator === undefined) {
                            // You cannot extract global declarations
                            (errors || (errors = [] as Diagnostic[])).push(createDiagnosticForNode(node, Messages.functionWillNotBeVisibleInTheNewScope));
                        }
                        // falls through
                    case SyntaxKind.ClassExpression:
                    case SyntaxKind.FunctionExpression:
                    case SyntaxKind.MethodDeclaration:
                    case SyntaxKind.Constructor:
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                        // do not dive into functions or classes
                        return false;
                }

                const savedPermittedJumps = permittedJumps;
                switch (node.kind) {
                    case SyntaxKind.IfStatement:
                        permittedJumps = PermittedJumps.None;
                        break;
                    case SyntaxKind.TryStatement:
                        // forbid all jumps inside try blocks
                        permittedJumps = PermittedJumps.None;
                        break;
                    case SyntaxKind.Block:
                        if (node.parent && node.parent.kind === SyntaxKind.TryStatement && (<TryStatement>node.parent).finallyBlock === node) {
                            // allow unconditional returns from finally blocks
                            permittedJumps = PermittedJumps.Return;
                        }
                        break;
                    case SyntaxKind.DefaultClause:
                    case SyntaxKind.CaseClause:
                        // allow unlabeled break inside case clauses
                        permittedJumps |= PermittedJumps.Break;
                        break;
                    default:
                        if (isIterationStatement(node, /*lookInLabeledStatements*/ false)) {
                            // allow unlabeled break/continue inside loops
                            permittedJumps |= PermittedJumps.Break | PermittedJumps.Continue;
                        }
                        break;
                }

                switch (node.kind) {
                    case SyntaxKind.ThisType:
                    case SyntaxKind.ThisKeyword:
                        rangeFacts |= RangeFacts.UsesThis;
                        break;
                    case SyntaxKind.LabeledStatement: {
                        const label = (<LabeledStatement>node).label;
                        (seenLabels || (seenLabels = [])).push(label.escapedText);
                        forEachChild(node, visit);
                        seenLabels.pop();
                        break;
                    }
                    case SyntaxKind.BreakStatement:
                    case SyntaxKind.ContinueStatement: {
                        const label = (<BreakStatement | ContinueStatement>node).label;
                        if (label) {
                            if (!contains(seenLabels, label.escapedText)) {
                                // attempts to jump to label that is not in range to be extracted
                                (errors || (errors = [] as Diagnostic[])).push(createDiagnosticForNode(node, Messages.cannotExtractRangeContainingLabeledBreakOrContinueStatementWithTargetOutsideOfTheRange));
                            }
                        }
                        else {
                            if (!(permittedJumps & (node.kind === SyntaxKind.BreakStatement ? PermittedJumps.Break : PermittedJumps.Continue))) {
                                // attempt to break or continue in a forbidden context
                                (errors || (errors = [] as Diagnostic[])).push(createDiagnosticForNode(node, Messages.cannotExtractRangeContainingConditionalBreakOrContinueStatements));
                            }
                        }
                        break;
                    }
                    case SyntaxKind.AwaitExpression:
                        rangeFacts |= RangeFacts.IsAsyncFunction;
                        break;
                    case SyntaxKind.YieldExpression:
                        rangeFacts |= RangeFacts.IsGenerator;
                        break;
                    case SyntaxKind.ReturnStatement:
                        if (permittedJumps & PermittedJumps.Return) {
                            rangeFacts |= RangeFacts.HasReturn;
                        }
                        else {
                            (errors || (errors = [] as Diagnostic[])).push(createDiagnosticForNode(node, Messages.cannotExtractRangeContainingConditionalReturnStatement));
                        }
                        break;
                    default:
                        forEachChild(node, visit);
                        break;
                }

                permittedJumps = savedPermittedJumps;
            }
        }
    }

    function getStatementOrExpressionRange(node: Node): Statement[] | Expression | undefined {
        if (isStatement(node)) {
            return [node];
        }
        else if (isExpressionNode(node)) {
            // If our selection is the expression in an ExpressionStatement, expand
            // the selection to include the enclosing Statement (this stops us
            // from trying to care about the return value of the extracted function
            // and eliminates double semicolon insertion in certain scenarios)
            return isExpressionStatement(node.parent) ? [node.parent] : node as Expression;
        }
        return undefined;
    }

    function isScope(node: Node): node is Scope {
        return isFunctionLikeDeclaration(node) || isSourceFile(node) || isModuleBlock(node) || isClassLike(node);
    }

    /**
     * Computes possible places we could extract the function into. For example,
     * you may be able to extract into a class method *or* local closure *or* namespace function,
     * depending on what's in the extracted body.
     */
    function collectEnclosingScopes(range: TargetRange): Scope[] {
        let current: Node = isReadonlyArray(range.range) ? first(range.range) : range.range;
        if (range.facts & RangeFacts.UsesThis) {
            // if range uses this as keyword or as type inside the class then it can only be extracted to a method of the containing class
            const containingClass = getContainingClass(current);
            if (containingClass) {
                const containingFunction = findAncestor(current, isFunctionLikeDeclaration);
                return containingFunction
                    ? [containingFunction, containingClass]
                    : [containingClass];
            }
        }

        const scopes: Scope[] = [];
        while (true) {
            current = current.parent;
            // A function parameter's initializer is actually in the outer scope, not the function declaration
            if (current.kind === SyntaxKind.Parameter) {
                // Skip all the way to the outer scope of the function that declared this parameter
                current = findAncestor(current, parent => isFunctionLikeDeclaration(parent))!.parent;
            }

            // We want to find the nearest parent where we can place an "equivalent" sibling to the node we're extracting out of.
            // Walk up to the closest parent of a place where we can logically put a sibling:
            //  * Function declaration
            //  * Class declaration or expression
            //  * Module/namespace or source file
            if (isScope(current)) {
                scopes.push(current);
                if (current.kind === SyntaxKind.SourceFile) {
                    return scopes;
                }
            }
        }
    }

    function getFunctionExtractionAtIndex(targetRange: TargetRange, context: RefactorContext, requestedChangesIndex: number): RefactorEditInfo {
        const { scopes, readsAndWrites: { target, usagesPerScope, functionErrorsPerScope, exposedVariableDeclarations } } = getPossibleExtractionsWorker(targetRange, context);
        Debug.assert(!functionErrorsPerScope[requestedChangesIndex].length, "The extraction went missing? How?");
        context.cancellationToken!.throwIfCancellationRequested(); // TODO: GH#18217
        return extractFunctionInScope(target, scopes[requestedChangesIndex], usagesPerScope[requestedChangesIndex], exposedVariableDeclarations, targetRange, context);
    }

    function getConstantExtractionAtIndex(targetRange: TargetRange, context: RefactorContext, requestedChangesIndex: number): RefactorEditInfo {
        const { scopes, readsAndWrites: { target, usagesPerScope, constantErrorsPerScope, exposedVariableDeclarations } } = getPossibleExtractionsWorker(targetRange, context);
        Debug.assert(!constantErrorsPerScope[requestedChangesIndex].length, "The extraction went missing? How?");
        Debug.assert(exposedVariableDeclarations.length === 0, "Extract constant accepted a range containing a variable declaration?");
        context.cancellationToken!.throwIfCancellationRequested();
        const expression = isExpression(target)
            ? target
            : (target.statements[0] as ExpressionStatement).expression;
        return extractConstantInScope(expression, scopes[requestedChangesIndex], usagesPerScope[requestedChangesIndex], targetRange.facts, context);
    }

    interface Extraction {
        readonly description: string;
        readonly errors: readonly Diagnostic[];
    }

    interface ScopeExtractions {
        readonly functionExtraction: Extraction;
        readonly constantExtraction: Extraction;
    }

    /**
     * Given a piece of text to extract ('targetRange'), computes a list of possible extractions.
     * Each returned ExtractResultForScope corresponds to a possible target scope and is either a set of changes
     * or an error explaining why we can't extract into that scope.
     */
    function getPossibleExtractions(targetRange: TargetRange, context: RefactorContext): readonly ScopeExtractions[] | undefined {
        const { scopes, readsAndWrites: { functionErrorsPerScope, constantErrorsPerScope } } = getPossibleExtractionsWorker(targetRange, context);
        // Need the inner type annotation to avoid https://github.com/Microsoft/TypeScript/issues/7547
        const extractions = scopes.map((scope, i): ScopeExtractions => {
            const functionDescriptionPart = getDescriptionForFunctionInScope(scope);
            const constantDescriptionPart = getDescriptionForConstantInScope(scope);

            const scopeDescription = isFunctionLikeDeclaration(scope)
                ? getDescriptionForFunctionLikeDeclaration(scope)
                : isClassLike(scope)
                    ? getDescriptionForClassLikeDeclaration(scope)
                    : getDescriptionForModuleLikeDeclaration(scope);

            let functionDescription: string;
            let constantDescription: string;
            if (scopeDescription === SpecialScope.Global) {
                functionDescription = formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Extract_to_0_in_1_scope), [functionDescriptionPart, "global"]);
                constantDescription = formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Extract_to_0_in_1_scope), [constantDescriptionPart, "global"]);
            }
            else if (scopeDescription === SpecialScope.Module) {
                functionDescription = formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Extract_to_0_in_1_scope), [functionDescriptionPart, "module"]);
                constantDescription = formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Extract_to_0_in_1_scope), [constantDescriptionPart, "module"]);
            }
            else {
                functionDescription = formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Extract_to_0_in_1), [functionDescriptionPart, scopeDescription]);
                constantDescription = formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Extract_to_0_in_1), [constantDescriptionPart, scopeDescription]);
            }

            // Customize the phrasing for the innermost scope to increase clarity.
            if (i === 0 && !isClassLike(scope)) {
                constantDescription = formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Extract_to_0_in_enclosing_scope), [constantDescriptionPart]);
            }

            return {
                functionExtraction: {
                    description: functionDescription,
                    errors: functionErrorsPerScope[i],
                },
                constantExtraction: {
                    description: constantDescription,
                    errors: constantErrorsPerScope[i],
                },
            };
        });
        return extractions;
    }

    function getPossibleExtractionsWorker(targetRange: TargetRange, context: RefactorContext): { readonly scopes: Scope[], readonly readsAndWrites: ReadsAndWrites } {
        const { file: sourceFile } = context;

        const scopes = collectEnclosingScopes(targetRange);
        const enclosingTextRange = getEnclosingTextRange(targetRange, sourceFile);
        const readsAndWrites = collectReadsAndWrites(
            targetRange,
            scopes,
            enclosingTextRange,
            sourceFile,
            context.program.getTypeChecker(),
            context.cancellationToken!);
        return { scopes, readsAndWrites };
    }

    function getDescriptionForFunctionInScope(scope: Scope): string {
        return isFunctionLikeDeclaration(scope)
            ? "inner function"
            : isClassLike(scope)
                ? "method"
                : "function";
    }
    function getDescriptionForConstantInScope(scope: Scope): string {
        return isClassLike(scope)
            ? "readonly field"
            : "constant";
    }
    function getDescriptionForFunctionLikeDeclaration(scope: FunctionLikeDeclaration): string {
        switch (scope.kind) {
            case SyntaxKind.Constructor:
                return "constructor";
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.FunctionDeclaration:
                return scope.name
                    ? `function '${scope.name.text}'`
                    : ANONYMOUS;
            case SyntaxKind.ArrowFunction:
                return "arrow function";
            case SyntaxKind.MethodDeclaration:
                return `method '${scope.name.getText()}'`;
            case SyntaxKind.GetAccessor:
                return `'get ${scope.name.getText()}'`;
            case SyntaxKind.SetAccessor:
                return `'set ${scope.name.getText()}'`;
            default:
                throw Debug.assertNever(scope, `Unexpected scope kind ${(scope as FunctionLikeDeclaration).kind}`);
        }
    }
    function getDescriptionForClassLikeDeclaration(scope: ClassLikeDeclaration): string {
        return scope.kind === SyntaxKind.ClassDeclaration
            ? scope.name ? `class '${scope.name.text}'` : "anonymous class declaration"
            : scope.name ? `class expression '${scope.name.text}'` : "anonymous class expression";
    }
    function getDescriptionForModuleLikeDeclaration(scope: SourceFile | ModuleBlock): string | SpecialScope {
        return scope.kind === SyntaxKind.ModuleBlock
            ? `namespace '${scope.parent.name.getText()}'`
            : scope.externalModuleIndicator ? SpecialScope.Module : SpecialScope.Global;
    }

    const enum SpecialScope {
        Module,
        Global,
    }

    /**
     * Result of 'extractRange' operation for a specific scope.
     * Stores either a list of changes that should be applied to extract a range or a list of errors
     */
    function extractFunctionInScope(
        node: Statement | Expression | Block,
        scope: Scope,
        { usages: usagesInScope, typeParameterUsages, substitutions }: ScopeUsages,
        exposedVariableDeclarations: readonly VariableDeclaration[],
        range: TargetRange,
        context: RefactorContext): RefactorEditInfo {

        const checker = context.program.getTypeChecker();
        const scriptTarget = getEmitScriptTarget(context.program.getCompilerOptions());
        const importAdder = codefix.createImportAdder(context.file, context.program, context.preferences, context.host);

        // Make a unique name for the extracted function
        const file = scope.getSourceFile();
        const functionNameText = getUniqueName(isClassLike(scope) ? "newMethod" : "newFunction", file);
        const isJS = isInJSFile(scope);

        const functionName = createIdentifier(functionNameText);

        let returnType: TypeNode | undefined;
        const parameters: ParameterDeclaration[] = [];
        const callArguments: Identifier[] = [];
        let writes: UsageEntry[] | undefined;
        usagesInScope.forEach((usage, name) => {
            let typeNode: TypeNode | undefined;
            if (!isJS) {
                let type = checker.getTypeOfSymbolAtLocation(usage.symbol, usage.node);
                // Widen the type so we don't emit nonsense annotations like "function fn(x: 3) {"
                type = checker.getBaseTypeOfLiteralType(type);
                typeNode = codefix.typeToAutoImportableTypeNode(checker, importAdder, type, scope, scriptTarget, NodeBuilderFlags.NoTruncation);
            }

            const paramDecl = createParameter(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                /*dotDotDotToken*/ undefined,
                /*name*/ name,
                /*questionToken*/ undefined,
                typeNode
            );
            parameters.push(paramDecl);
            if (usage.usage === Usage.Write) {
                (writes || (writes = [])).push(usage);
            }
            callArguments.push(createIdentifier(name));
        });

        const typeParametersAndDeclarations = arrayFrom(typeParameterUsages.values()).map(type => ({ type, declaration: getFirstDeclaration(type) }));
        const sortedTypeParametersAndDeclarations = typeParametersAndDeclarations.sort(compareTypesByDeclarationOrder);

        const typeParameters: readonly TypeParameterDeclaration[] | undefined = sortedTypeParametersAndDeclarations.length === 0
            ? undefined
            : sortedTypeParametersAndDeclarations.map(t => t.declaration as TypeParameterDeclaration);

        // Strictly speaking, we should check whether each name actually binds to the appropriate type
        // parameter.  In cases of shadowing, they may not.
        const callTypeArguments: readonly TypeNode[] | undefined = typeParameters !== undefined
            ? typeParameters.map(decl => createTypeReferenceNode(decl.name, /*typeArguments*/ undefined))
            : undefined;

        // Provide explicit return types for contextually-typed functions
        // to avoid problems when there are literal types present
        if (isExpression(node) && !isJS) {
            const contextualType = checker.getContextualType(node);
            returnType = checker.typeToTypeNode(contextualType!, scope, NodeBuilderFlags.NoTruncation); // TODO: GH#18217
        }

        const { body, returnValueProperty } = transformFunctionBody(node, exposedVariableDeclarations, writes, substitutions, !!(range.facts & RangeFacts.HasReturn));
        suppressLeadingAndTrailingTrivia(body);

        let newFunction: MethodDeclaration | FunctionDeclaration;

        if (isClassLike(scope)) {
            // always create private method in TypeScript files
            const modifiers: Modifier[] = isJS ? [] : [createToken(SyntaxKind.PrivateKeyword)];
            if (range.facts & RangeFacts.InStaticRegion) {
                modifiers.push(createToken(SyntaxKind.StaticKeyword));
            }
            if (range.facts & RangeFacts.IsAsyncFunction) {
                modifiers.push(createToken(SyntaxKind.AsyncKeyword));
            }
            newFunction = createMethod(
                /*decorators*/ undefined,
                modifiers.length ? modifiers : undefined,
                range.facts & RangeFacts.IsGenerator ? createToken(SyntaxKind.AsteriskToken) : undefined,
                functionName,
                /*questionToken*/ undefined,
                typeParameters,
                parameters,
                returnType,
                body
            );
        }
        else {
            newFunction = createFunctionDeclaration(
                /*decorators*/ undefined,
                range.facts & RangeFacts.IsAsyncFunction ? [createToken(SyntaxKind.AsyncKeyword)] : undefined,
                range.facts & RangeFacts.IsGenerator ? createToken(SyntaxKind.AsteriskToken) : undefined,
                functionName,
                typeParameters,
                parameters,
                returnType,
                body
            );
        }

        const changeTracker = textChanges.ChangeTracker.fromContext(context);
        const minInsertionPos = (isReadonlyArray(range.range) ? last(range.range) : range.range).end;
        const nodeToInsertBefore = getNodeToInsertFunctionBefore(minInsertionPos, scope);
        if (nodeToInsertBefore) {
            changeTracker.insertNodeBefore(context.file, nodeToInsertBefore, newFunction, /*blankLineBetween*/ true);
        }
        else {
            changeTracker.insertNodeAtEndOfScope(context.file, scope, newFunction);
        }
        importAdder.writeFixes(changeTracker);

        const newNodes: Node[] = [];
        // replace range with function call
        const called = getCalledExpression(scope, range, functionNameText);

        let call: Expression = createCall(
            called,
            callTypeArguments, // Note that no attempt is made to take advantage of type argument inference
            callArguments);
        if (range.facts & RangeFacts.IsGenerator) {
            call = createYield(createToken(SyntaxKind.AsteriskToken), call);
        }
        if (range.facts & RangeFacts.IsAsyncFunction) {
            call = createAwait(call);
        }

        if (exposedVariableDeclarations.length && !writes) {
            // No need to mix declarations and writes.

            // How could any variables be exposed if there's a return statement?
            Debug.assert(!returnValueProperty, "Expected no returnValueProperty");
            Debug.assert(!(range.facts & RangeFacts.HasReturn), "Expected RangeFacts.HasReturn flag to be unset");

            if (exposedVariableDeclarations.length === 1) {
                // Declaring exactly one variable: let x = newFunction();
                const variableDeclaration = exposedVariableDeclarations[0];
                newNodes.push(createVariableStatement(
                    /*modifiers*/ undefined,
                    createVariableDeclarationList(
                        [createVariableDeclaration(getSynthesizedDeepClone(variableDeclaration.name), /*type*/ getSynthesizedDeepClone(variableDeclaration.type), /*initializer*/ call)], // TODO (acasey): test binding patterns
                        variableDeclaration.parent.flags)));
            }
            else {
                // Declaring multiple variables / return properties:
                //   let {x, y} = newFunction();
                const bindingElements: BindingElement[] = [];
                const typeElements: TypeElement[] = [];
                let commonNodeFlags = exposedVariableDeclarations[0].parent.flags;
                let sawExplicitType = false;
                for (const variableDeclaration of exposedVariableDeclarations) {
                    bindingElements.push(createBindingElement(
                        /*dotDotDotToken*/ undefined,
                        /*propertyName*/ undefined,
                        /*name*/ getSynthesizedDeepClone(variableDeclaration.name)));

                    // Being returned through an object literal will have widened the type.
                    const variableType: TypeNode | undefined = checker.typeToTypeNode(
                        checker.getBaseTypeOfLiteralType(checker.getTypeAtLocation(variableDeclaration)),
                        scope,
                        NodeBuilderFlags.NoTruncation);

                    typeElements.push(createPropertySignature(
                        /*modifiers*/ undefined,
                        /*name*/ variableDeclaration.symbol.name,
                        /*questionToken*/ undefined,
                        /*type*/ variableType,
                        /*initializer*/ undefined));
                    sawExplicitType = sawExplicitType || variableDeclaration.type !== undefined;
                    commonNodeFlags = commonNodeFlags & variableDeclaration.parent.flags;
                }

                const typeLiteral: TypeLiteralNode | undefined = sawExplicitType ? createTypeLiteralNode(typeElements) : undefined;
                if (typeLiteral) {
                    setEmitFlags(typeLiteral, EmitFlags.SingleLine);
                }

                newNodes.push(createVariableStatement(
                    /*modifiers*/ undefined,
                    createVariableDeclarationList(
                        [createVariableDeclaration(
                            createObjectBindingPattern(bindingElements),
                            /*type*/ typeLiteral,
                            /*initializer*/call)],
                        commonNodeFlags)));
            }
        }
        else if (exposedVariableDeclarations.length || writes) {
            if (exposedVariableDeclarations.length) {
                // CONSIDER: we're going to create one statement per variable, but we could actually preserve their original grouping.
                for (const variableDeclaration of exposedVariableDeclarations) {
                    let flags: NodeFlags = variableDeclaration.parent.flags;
                    if (flags & NodeFlags.Const) {
                        flags = (flags & ~NodeFlags.Const) | NodeFlags.Let;
                    }

                    newNodes.push(createVariableStatement(
                        /*modifiers*/ undefined,
                        createVariableDeclarationList(
                            [createVariableDeclaration(variableDeclaration.symbol.name, getTypeDeepCloneUnionUndefined(variableDeclaration.type))],
                            flags)));
                }
            }

            if (returnValueProperty) {
                // has both writes and return, need to create variable declaration to hold return value;
                newNodes.push(createVariableStatement(
                    /*modifiers*/ undefined,
                    createVariableDeclarationList(
                        [createVariableDeclaration(returnValueProperty, getTypeDeepCloneUnionUndefined(returnType))],
                        NodeFlags.Let)));
            }

            const assignments = getPropertyAssignmentsForWritesAndVariableDeclarations(exposedVariableDeclarations, writes);
            if (returnValueProperty) {
                assignments.unshift(createShorthandPropertyAssignment(returnValueProperty));
            }

            // propagate writes back
            if (assignments.length === 1) {
                // We would only have introduced a return value property if there had been
                // other assignments to make.
                Debug.assert(!returnValueProperty, "Shouldn't have returnValueProperty here");

                newNodes.push(createStatement(createAssignment(assignments[0].name, call)));

                if (range.facts & RangeFacts.HasReturn) {
                    newNodes.push(createReturn());
                }
            }
            else {
                // emit e.g.
                //   { a, b, __return } = newFunction(a, b);
                //   return __return;
                newNodes.push(createStatement(createAssignment(createObjectLiteral(assignments), call)));
                if (returnValueProperty) {
                    newNodes.push(createReturn(createIdentifier(returnValueProperty)));
                }
            }
        }
        else {
            if (range.facts & RangeFacts.HasReturn) {
                newNodes.push(createReturn(call));
            }
            else if (isReadonlyArray(range.range)) {
                newNodes.push(createStatement(call));
            }
            else {
                newNodes.push(call);
            }
        }

        if (isReadonlyArray(range.range)) {
            changeTracker.replaceNodeRangeWithNodes(context.file, first(range.range), last(range.range), newNodes);
        }
        else {
            changeTracker.replaceNodeWithNodes(context.file, range.range, newNodes);
        }

        const edits = changeTracker.getChanges();
        const renameRange = isReadonlyArray(range.range) ? first(range.range) : range.range;

        const renameFilename = renameRange.getSourceFile().fileName;
        const renameLocation = getRenameLocation(edits, renameFilename, functionNameText, /*isDeclaredBeforeUse*/ false);
        return { renameFilename, renameLocation, edits };

        function getTypeDeepCloneUnionUndefined(typeNode: TypeNode | undefined): TypeNode | undefined {
            if (typeNode === undefined) {
                return undefined;
            }

            const clone = getSynthesizedDeepClone(typeNode);
            let withoutParens = clone;
            while (isParenthesizedTypeNode(withoutParens)) {
                withoutParens = withoutParens.type;
            }
            return isUnionTypeNode(withoutParens) && find(withoutParens.types, t => t.kind === SyntaxKind.UndefinedKeyword)
                ? clone
                : createUnionTypeNode([clone, createKeywordTypeNode(SyntaxKind.UndefinedKeyword)]);
        }
    }

    /**
     * Result of 'extractRange' operation for a specific scope.
     * Stores either a list of changes that should be applied to extract a range or a list of errors
     */
    function extractConstantInScope(
        node: Expression,
        scope: Scope,
        { substitutions }: ScopeUsages,
        rangeFacts: RangeFacts,
        context: RefactorContext): RefactorEditInfo {

        const checker = context.program.getTypeChecker();

        // Make a unique name for the extracted variable
        const file = scope.getSourceFile();
        const localNameText = getUniqueName(isClassLike(scope) ? "newProperty" : "newLocal", file);
        const isJS = isInJSFile(scope);

        let variableType = isJS || !checker.isContextSensitive(node)
            ? undefined
            : checker.typeToTypeNode(checker.getContextualType(node)!, scope, NodeBuilderFlags.NoTruncation); // TODO: GH#18217

        let initializer = transformConstantInitializer(node, substitutions);

        ({ variableType, initializer } = transformFunctionInitializerAndType(variableType, initializer));

        suppressLeadingAndTrailingTrivia(initializer);

        const changeTracker = textChanges.ChangeTracker.fromContext(context);

        if (isClassLike(scope)) {
            Debug.assert(!isJS, "Cannot extract to a JS class"); // See CannotExtractToJSClass
            const modifiers: Modifier[] = [];
            modifiers.push(createToken(SyntaxKind.PrivateKeyword));
            if (rangeFacts & RangeFacts.InStaticRegion) {
                modifiers.push(createToken(SyntaxKind.StaticKeyword));
            }
            modifiers.push(createToken(SyntaxKind.ReadonlyKeyword));

            const newVariable = createProperty(
                /*decorators*/ undefined,
                modifiers,
                localNameText,
                /*questionToken*/ undefined,
                variableType,
                initializer);

            const localReference = createPropertyAccess(
                rangeFacts & RangeFacts.InStaticRegion
                    ? createIdentifier(scope.name!.getText()) // TODO: GH#18217
                    : createThis(),
                createIdentifier(localNameText));

            // Declare
            const maxInsertionPos = node.pos;
            const nodeToInsertBefore = getNodeToInsertPropertyBefore(maxInsertionPos, scope);
            changeTracker.insertNodeBefore(context.file, nodeToInsertBefore, newVariable, /*blankLineBetween*/ true);

            // Consume
            changeTracker.replaceNode(context.file, node, localReference);
        }
        else {
            const newVariableDeclaration = createVariableDeclaration(localNameText, variableType, initializer);

            // If the node is part of an initializer in a list of variable declarations, insert a new
            // variable declaration into the list (in case it depends on earlier ones).
            // CONSIDER: If the declaration list isn't const, we might want to split it into multiple
            // lists so that the newly extracted one can be const.
            const oldVariableDeclaration = getContainingVariableDeclarationIfInList(node, scope);
            if (oldVariableDeclaration) {
                // Declare
                // CONSIDER: could detect that each is on a separate line (See `extractConstant_VariableList_MultipleLines` in `extractConstants.ts`)
                changeTracker.insertNodeBefore(context.file, oldVariableDeclaration, newVariableDeclaration);

                // Consume
                const localReference = createIdentifier(localNameText);
                changeTracker.replaceNode(context.file, node, localReference);
            }
            else if (node.parent.kind === SyntaxKind.ExpressionStatement && scope === findAncestor(node, isScope)) {
                // If the parent is an expression statement and the target scope is the immediately enclosing one,
                // replace the statement with the declaration.
                const newVariableStatement = createVariableStatement(
                    /*modifiers*/ undefined,
                    createVariableDeclarationList([newVariableDeclaration], NodeFlags.Const));
                changeTracker.replaceNode(context.file, node.parent, newVariableStatement);
            }
            else {
                const newVariableStatement = createVariableStatement(
                    /*modifiers*/ undefined,
                    createVariableDeclarationList([newVariableDeclaration], NodeFlags.Const));

                // Declare
                const nodeToInsertBefore = getNodeToInsertConstantBefore(node, scope);
                if (nodeToInsertBefore.pos === 0) {
                    changeTracker.insertNodeAtTopOfFile(context.file, newVariableStatement, /*blankLineBetween*/ false);
                }
                else {
                    changeTracker.insertNodeBefore(context.file, nodeToInsertBefore, newVariableStatement, /*blankLineBetween*/ false);
                }

                // Consume
                if (node.parent.kind === SyntaxKind.ExpressionStatement) {
                    // If the parent is an expression statement, delete it.
                    changeTracker.delete(context.file, node.parent);
                }
                else {
                    let localReference: Expression = createIdentifier(localNameText);
                    // When extract to a new variable in JSX content, need to wrap a {} out of the new variable
                    // or it will become a plain text
                    if (isInJSXContent(node)) {
                        localReference = createJsxExpression(/*dotDotDotToken*/ undefined, localReference);
                    }
                    changeTracker.replaceNode(context.file, node, localReference);
                }
            }
        }

        const edits = changeTracker.getChanges();

        const renameFilename = node.getSourceFile().fileName;
        const renameLocation = getRenameLocation(edits, renameFilename, localNameText, /*isDeclaredBeforeUse*/ true);
        return { renameFilename, renameLocation, edits };

        function isInJSXContent(node: Node) {
            if (!isJsxElement(node)) return false;
            if (isJsxElement(node.parent)) return true;
            return false;
        }

        function transformFunctionInitializerAndType(variableType: TypeNode | undefined, initializer: Expression): { variableType: TypeNode | undefined, initializer: Expression } {
            // If no contextual type exists there is nothing to transfer to the function signature
            if (variableType === undefined) return { variableType, initializer };
            // Only do this for function expressions and arrow functions that are not generic
            if (!isFunctionExpression(initializer) && !isArrowFunction(initializer) || !!initializer.typeParameters) return { variableType, initializer };
            const functionType = checker.getTypeAtLocation(node);
            const functionSignature = singleOrUndefined(checker.getSignaturesOfType(functionType, SignatureKind.Call));

            // If no function signature, maybe there was an error, do nothing
            if (!functionSignature) return { variableType, initializer };
            // If the function signature has generic type parameters we don't attempt to move the parameters
            if (!!functionSignature.getTypeParameters()) return { variableType, initializer };

            // We add parameter types if needed
            const parameters: ParameterDeclaration[] = [];
            let hasAny = false;
            for (const p of initializer.parameters) {
                if (p.type) {
                    parameters.push(p);
                }
                else {
                    const paramType = checker.getTypeAtLocation(p);
                    if (paramType === checker.getAnyType()) hasAny = true;

                    parameters.push(updateParameter(p,
                        p.decorators, p.modifiers, p.dotDotDotToken,
                        p.name, p.questionToken, p.type || checker.typeToTypeNode(paramType, scope, NodeBuilderFlags.NoTruncation), p.initializer));
                }
            }
            // If a parameter was inferred as any we skip adding function parameters at all.
            // Turning an implicit any (which under common settings is a error) to an explicit
            // is probably actually a worse refactor outcome.
            if (hasAny) return { variableType, initializer };
            variableType = undefined;
            if (isArrowFunction(initializer)) {
                initializer = updateArrowFunction(initializer, node.modifiers, initializer.typeParameters,
                    parameters,
                    initializer.type || checker.typeToTypeNode(functionSignature.getReturnType(), scope, NodeBuilderFlags.NoTruncation),
                    initializer.equalsGreaterThanToken,
                    initializer.body);
            }
            else {
                if (functionSignature && !!functionSignature.thisParameter) {
                    const firstParameter = firstOrUndefined(parameters);
                    // If the function signature has a this parameter and if the first defined parameter is not the this parameter, we must add it
                    // Note: If this parameter was already there, it would have been previously updated with the type if not type was present
                    if ((!firstParameter || (isIdentifier(firstParameter.name) && firstParameter.name.escapedText !== "this"))) {
                        const thisType = checker.getTypeOfSymbolAtLocation(functionSignature.thisParameter, node);
                        parameters.splice(0, 0, createParameter(
                            /* decorators */ undefined,
                            /* modifiers */ undefined,
                            /* dotDotDotToken */ undefined,
                            "this",
                            /* questionToken */ undefined,
                            checker.typeToTypeNode(thisType, scope, NodeBuilderFlags.NoTruncation)
                        ));
                    }
                }
                initializer = updateFunctionExpression(initializer, node.modifiers, initializer.asteriskToken,
                    initializer.name, initializer.typeParameters,
                    parameters,
                    initializer.type || checker.typeToTypeNode(functionSignature.getReturnType(), scope, NodeBuilderFlags.NoTruncation),
                    initializer.body);
            }
            return { variableType, initializer };
        }
    }

    function getContainingVariableDeclarationIfInList(node: Node, scope: Scope) {
        let prevNode;
        while (node !== undefined && node !== scope) {
            if (isVariableDeclaration(node) &&
                node.initializer === prevNode &&
                isVariableDeclarationList(node.parent) &&
                node.parent.declarations.length > 1) {

                return node;
            }

            prevNode = node;
            node = node.parent;
        }
    }

    function getFirstDeclaration(type: Type): Declaration | undefined {
        let firstDeclaration;

        const symbol = type.symbol;
        if (symbol && symbol.declarations) {
            for (const declaration of symbol.declarations) {
                if (firstDeclaration === undefined || declaration.pos < firstDeclaration.pos) {
                    firstDeclaration = declaration;
                }
            }
        }

        return firstDeclaration;
    }

    function compareTypesByDeclarationOrder(
        { type: type1, declaration: declaration1 }: { type: Type, declaration?: Declaration },
        { type: type2, declaration: declaration2 }: { type: Type, declaration?: Declaration }) {

        return compareProperties(declaration1, declaration2, "pos", compareValues)
            || compareStringsCaseSensitive(
                type1.symbol ? type1.symbol.getName() : "",
                type2.symbol ? type2.symbol.getName() : "")
            || compareValues(type1.id, type2.id);
    }

    function getCalledExpression(scope: Node, range: TargetRange, functionNameText: string): Expression {
        const functionReference = createIdentifier(functionNameText);
        if (isClassLike(scope)) {
            const lhs = range.facts & RangeFacts.InStaticRegion ? createIdentifier(scope.name!.text) : createThis(); // TODO: GH#18217
            return createPropertyAccess(lhs, functionReference);
        }
        else {
            return functionReference;
        }
    }

    function transformFunctionBody(body: Node, exposedVariableDeclarations: readonly VariableDeclaration[], writes: readonly UsageEntry[] | undefined, substitutions: ReadonlyMap<Node>, hasReturn: boolean): { body: Block, returnValueProperty: string | undefined } {
        const hasWritesOrVariableDeclarations = writes !== undefined || exposedVariableDeclarations.length > 0;
        if (isBlock(body) && !hasWritesOrVariableDeclarations && substitutions.size === 0) {
            // already block, no declarations or writes to propagate back, no substitutions - can use node as is
            return { body: createBlock(body.statements, /*multLine*/ true), returnValueProperty: undefined };
        }
        let returnValueProperty: string | undefined;
        let ignoreReturns = false;
        const statements = createNodeArray(isBlock(body) ? body.statements.slice(0) : [isStatement(body) ? body : createReturn(<Expression>body)]);
        // rewrite body if either there are writes that should be propagated back via return statements or there are substitutions
        if (hasWritesOrVariableDeclarations || substitutions.size) {
            const rewrittenStatements = visitNodes(statements, visitor).slice();
            if (hasWritesOrVariableDeclarations && !hasReturn && isStatement(body)) {
                // add return at the end to propagate writes back in case if control flow falls out of the function body
                // it is ok to know that range has at least one return since it we only allow unconditional returns
                const assignments = getPropertyAssignmentsForWritesAndVariableDeclarations(exposedVariableDeclarations, writes);
                if (assignments.length === 1) {
                    rewrittenStatements.push(createReturn(assignments[0].name));
                }
                else {
                    rewrittenStatements.push(createReturn(createObjectLiteral(assignments)));
                }
            }
            return { body: createBlock(rewrittenStatements, /*multiLine*/ true), returnValueProperty };
        }
        else {
            return { body: createBlock(statements, /*multiLine*/ true), returnValueProperty: undefined };
        }

        function visitor(node: Node): VisitResult<Node> {
            if (!ignoreReturns && node.kind === SyntaxKind.ReturnStatement && hasWritesOrVariableDeclarations) {
                const assignments: ObjectLiteralElementLike[] = getPropertyAssignmentsForWritesAndVariableDeclarations(exposedVariableDeclarations, writes);
                if ((<ReturnStatement>node).expression) {
                    if (!returnValueProperty) {
                        returnValueProperty = "__return";
                    }
                    assignments.unshift(createPropertyAssignment(returnValueProperty, visitNode((<ReturnStatement>node).expression, visitor)));
                }
                if (assignments.length === 1) {
                    return createReturn(assignments[0].name as Expression);
                }
                else {
                    return createReturn(createObjectLiteral(assignments));
                }
            }
            else {
                const oldIgnoreReturns = ignoreReturns;
                ignoreReturns = ignoreReturns || isFunctionLikeDeclaration(node) || isClassLike(node);
                const substitution = substitutions.get(getNodeId(node).toString());
                const result = substitution ? getSynthesizedDeepClone(substitution) : visitEachChild(node, visitor, nullTransformationContext);
                ignoreReturns = oldIgnoreReturns;
                return result;
            }
        }
    }

    function transformConstantInitializer(initializer: Expression, substitutions: ReadonlyMap<Node>): Expression {
        return substitutions.size
            ? visitor(initializer) as Expression
            : initializer;

        function visitor(node: Node): VisitResult<Node> {
            const substitution = substitutions.get(getNodeId(node).toString());
            return substitution ? getSynthesizedDeepClone(substitution) : visitEachChild(node, visitor, nullTransformationContext);
        }
    }

    function getStatementsOrClassElements(scope: Scope): readonly Statement[] | readonly ClassElement[] {
        if (isFunctionLikeDeclaration(scope)) {
            const body = scope.body!; // TODO: GH#18217
            if (isBlock(body)) {
                return body.statements;
            }
        }
        else if (isModuleBlock(scope) || isSourceFile(scope)) {
            return scope.statements;
        }
        else if (isClassLike(scope)) {
            return scope.members;
        }
        else {
            assertType<never>(scope);
        }

        return emptyArray;
    }

    /**
     * If `scope` contains a function after `minPos`, then return the first such function.
     * Otherwise, return `undefined`.
     */
    function getNodeToInsertFunctionBefore(minPos: number, scope: Scope): Statement | ClassElement | undefined {
        return find<Statement | ClassElement>(getStatementsOrClassElements(scope), child =>
            child.pos >= minPos && isFunctionLikeDeclaration(child) && !isConstructorDeclaration(child));
    }

    function getNodeToInsertPropertyBefore(maxPos: number, scope: ClassLikeDeclaration): ClassElement {
        const members = scope.members;
        Debug.assert(members.length > 0, "Found no members"); // There must be at least one child, since we extracted from one.

        let prevMember: ClassElement | undefined;
        let allProperties = true;
        for (const member of members) {
            if (member.pos > maxPos) {
                return prevMember || members[0];
            }
            if (allProperties && !isPropertyDeclaration(member)) {
                // If it is non-vacuously true that all preceding members are properties,
                // insert before the current member (i.e. at the end of the list of properties).
                if (prevMember !== undefined) {
                    return member;
                }

                allProperties = false;
            }
            prevMember = member;
        }

        if (prevMember === undefined) return Debug.fail(); // If the loop didn't return, then it did set prevMember.
        return prevMember;
    }

    function getNodeToInsertConstantBefore(node: Node, scope: Scope): Statement {
        Debug.assert(!isClassLike(scope));

        let prevScope: Scope | undefined;
        for (let curr = node; curr !== scope; curr = curr.parent) {
            if (isScope(curr)) {
                prevScope = curr;
            }
        }

        for (let curr = (prevScope || node).parent; ; curr = curr.parent) {
            if (isBlockLike(curr)) {
                let prevStatement: Statement | undefined;
                for (const statement of curr.statements) {
                    if (statement.pos > node.pos) {
                        break;
                    }
                    prevStatement = statement;
                }

                if (!prevStatement && isCaseClause(curr)) {
                    // We must have been in the expression of the case clause.
                    Debug.assert(isSwitchStatement(curr.parent.parent), "Grandparent isn't a switch statement");
                    return curr.parent.parent;
                }

                // There must be at least one statement since we started in one.
                return Debug.checkDefined(prevStatement, "prevStatement failed to get set");
            }

            Debug.assert(curr !== scope, "Didn't encounter a block-like before encountering scope");
        }
    }

    function getPropertyAssignmentsForWritesAndVariableDeclarations(
        exposedVariableDeclarations: readonly VariableDeclaration[],
        writes: readonly UsageEntry[] | undefined
    ): ShorthandPropertyAssignment[] {
        const variableAssignments = map(exposedVariableDeclarations, v => createShorthandPropertyAssignment(v.symbol.name));
        const writeAssignments = map(writes, w => createShorthandPropertyAssignment(w.symbol.name));

        // TODO: GH#18217 `variableAssignments` not possibly undefined!
        return variableAssignments === undefined
            ? writeAssignments!
            : writeAssignments === undefined
                ? variableAssignments
                : variableAssignments.concat(writeAssignments);
    }

    function isReadonlyArray(v: any): v is readonly any[] {
        return isArray(v);
    }

    /**
     * Produces a range that spans the entirety of nodes, given a selection
     * that might start/end in the middle of nodes.
     *
     * For example, when the user makes a selection like this
     *                     v---v
     *   var someThing = foo + bar;
     *  this returns     ^-------^
     */
    function getEnclosingTextRange(targetRange: TargetRange, sourceFile: SourceFile): TextRange {
        return isReadonlyArray(targetRange.range)
            ? { pos: first(targetRange.range).getStart(sourceFile), end: last(targetRange.range).getEnd() }
            : targetRange.range;
    }

    const enum Usage {
        // value should be passed to extracted method
        Read = 1,
        // value should be passed to extracted method and propagated back
        Write = 2
    }

    interface UsageEntry {
        readonly usage: Usage;
        readonly symbol: Symbol;
        readonly node: Node;
    }

    interface ScopeUsages {
        readonly usages: Map<UsageEntry>;
        readonly typeParameterUsages: Map<TypeParameter>; // Key is type ID
        readonly substitutions: Map<Node>;
    }

    interface ReadsAndWrites {
        readonly target: Expression | Block;
        readonly usagesPerScope: readonly ScopeUsages[];
        readonly functionErrorsPerScope: readonly (readonly Diagnostic[])[];
        readonly constantErrorsPerScope: readonly (readonly Diagnostic[])[];
        readonly exposedVariableDeclarations: readonly VariableDeclaration[];
    }
    function collectReadsAndWrites(
        targetRange: TargetRange,
        scopes: Scope[],
        enclosingTextRange: TextRange,
        sourceFile: SourceFile,
        checker: TypeChecker,
        cancellationToken: CancellationToken): ReadsAndWrites {

        const allTypeParameterUsages = createMap<TypeParameter>(); // Key is type ID
        const usagesPerScope: ScopeUsages[] = [];
        const substitutionsPerScope: Map<Node>[] = [];
        const functionErrorsPerScope: Diagnostic[][] = [];
        const constantErrorsPerScope: Diagnostic[][] = [];
        const visibleDeclarationsInExtractedRange: NamedDeclaration[] = [];
        const exposedVariableSymbolSet = createMap<true>(); // Key is symbol ID
        const exposedVariableDeclarations: VariableDeclaration[] = [];
        let firstExposedNonVariableDeclaration: NamedDeclaration | undefined;

        const expression = !isReadonlyArray(targetRange.range)
            ? targetRange.range
            : targetRange.range.length === 1 && isExpressionStatement(targetRange.range[0])
                ? (targetRange.range[0] as ExpressionStatement).expression
                : undefined;

        let expressionDiagnostic: Diagnostic | undefined;
        if (expression === undefined) {
            const statements = targetRange.range as readonly Statement[];
            const start = first(statements).getStart();
            const end = last(statements).end;
            expressionDiagnostic = createFileDiagnostic(sourceFile, start, end - start, Messages.expressionExpected);
        }
        else if (checker.getTypeAtLocation(expression).flags & (TypeFlags.Void | TypeFlags.Never)) {
            expressionDiagnostic = createDiagnosticForNode(expression, Messages.uselessConstantType);
        }

        // initialize results
        for (const scope of scopes) {
            usagesPerScope.push({ usages: createMap<UsageEntry>(), typeParameterUsages: createMap<TypeParameter>(), substitutions: createMap<Expression>() });
            substitutionsPerScope.push(createMap<Expression>());

            functionErrorsPerScope.push(
                isFunctionLikeDeclaration(scope) && scope.kind !== SyntaxKind.FunctionDeclaration
                    ? [createDiagnosticForNode(scope, Messages.cannotExtractToOtherFunctionLike)]
                    : []);

            const constantErrors = [];
            if (expressionDiagnostic) {
                constantErrors.push(expressionDiagnostic);
            }
            if (isClassLike(scope) && isInJSFile(scope)) {
                constantErrors.push(createDiagnosticForNode(scope, Messages.cannotExtractToJSClass));
            }
            if (isArrowFunction(scope) && !isBlock(scope.body)) {
                // TODO (https://github.com/Microsoft/TypeScript/issues/18924): allow this
                constantErrors.push(createDiagnosticForNode(scope, Messages.cannotExtractToExpressionArrowFunction));
            }
            constantErrorsPerScope.push(constantErrors);
        }

        const seenUsages = createMap<Usage>();
        const target = isReadonlyArray(targetRange.range) ? createBlock(targetRange.range) : targetRange.range;

        const unmodifiedNode = isReadonlyArray(targetRange.range) ? first(targetRange.range) : targetRange.range;
        const inGenericContext = isInGenericContext(unmodifiedNode);

        collectUsages(target);

        // Unfortunately, this code takes advantage of the knowledge that the generated method
        // will use the contextual type of an expression as the return type of the extracted
        // method (and will therefore "use" all the types involved).
        if (inGenericContext && !isReadonlyArray(targetRange.range)) {
            const contextualType = checker.getContextualType(targetRange.range)!; // TODO: GH#18217
            recordTypeParameterUsages(contextualType);
        }

        if (allTypeParameterUsages.size > 0) {
            const seenTypeParameterUsages = createMap<TypeParameter>(); // Key is type ID

            let i = 0;
            for (let curr: Node = unmodifiedNode; curr !== undefined && i < scopes.length; curr = curr.parent) {
                if (curr === scopes[i]) {
                    // Copy current contents of seenTypeParameterUsages into scope.
                    seenTypeParameterUsages.forEach((typeParameter, id) => {
                        usagesPerScope[i].typeParameterUsages.set(id, typeParameter);
                    });

                    i++;
                }

                // Note that we add the current node's type parameters *after* updating the corresponding scope.
                if (isDeclarationWithTypeParameters(curr)) {
                    for (const typeParameterDecl of getEffectiveTypeParameterDeclarations(curr)) {
                        const typeParameter = checker.getTypeAtLocation(typeParameterDecl) as TypeParameter;
                        if (allTypeParameterUsages.has(typeParameter.id.toString())) {
                            seenTypeParameterUsages.set(typeParameter.id.toString(), typeParameter);
                        }
                    }
                }
            }

            // If we didn't get through all the scopes, then there were some that weren't in our
            // parent chain (impossible at time of writing).  A conservative solution would be to
            // copy allTypeParameterUsages into all remaining scopes.
            Debug.assert(i === scopes.length, "Should have iterated all scopes");
        }

        // If there are any declarations in the extracted block that are used in the same enclosing
        // lexical scope, we can't move the extraction "up" as those declarations will become unreachable
        if (visibleDeclarationsInExtractedRange.length) {
            const containingLexicalScopeOfExtraction = isBlockScope(scopes[0], scopes[0].parent)
                ? scopes[0]
                : getEnclosingBlockScopeContainer(scopes[0]);
            forEachChild(containingLexicalScopeOfExtraction, checkForUsedDeclarations);
        }

        for (let i = 0; i < scopes.length; i++) {
            const scopeUsages = usagesPerScope[i];
            // Special case: in the innermost scope, all usages are available.
            // (The computed value reflects the value at the top-level of the scope, but the
            // local will actually be declared at the same level as the extracted expression).
            if (i > 0 && (scopeUsages.usages.size > 0 || scopeUsages.typeParameterUsages.size > 0)) {
                const errorNode = isReadonlyArray(targetRange.range) ? targetRange.range[0] : targetRange.range;
                constantErrorsPerScope[i].push(createDiagnosticForNode(errorNode, Messages.cannotAccessVariablesFromNestedScopes));
            }

            let hasWrite = false;
            let readonlyClassPropertyWrite: Declaration | undefined;
            usagesPerScope[i].usages.forEach(value => {
                if (value.usage === Usage.Write) {
                    hasWrite = true;
                    if (value.symbol.flags & SymbolFlags.ClassMember &&
                        value.symbol.valueDeclaration &&
                        hasEffectiveModifier(value.symbol.valueDeclaration, ModifierFlags.Readonly)) {
                        readonlyClassPropertyWrite = value.symbol.valueDeclaration;
                    }
                }
            });

            // If an expression was extracted, then there shouldn't have been any variable declarations.
            Debug.assert(isReadonlyArray(targetRange.range) || exposedVariableDeclarations.length === 0, "No variable declarations expected if something was extracted");

            if (hasWrite && !isReadonlyArray(targetRange.range)) {
                const diag = createDiagnosticForNode(targetRange.range, Messages.cannotWriteInExpression);
                functionErrorsPerScope[i].push(diag);
                constantErrorsPerScope[i].push(diag);
            }
            else if (readonlyClassPropertyWrite && i > 0) {
                const diag = createDiagnosticForNode(readonlyClassPropertyWrite, Messages.cannotExtractReadonlyPropertyInitializerOutsideConstructor);
                functionErrorsPerScope[i].push(diag);
                constantErrorsPerScope[i].push(diag);
            }
            else if (firstExposedNonVariableDeclaration) {
                const diag = createDiagnosticForNode(firstExposedNonVariableDeclaration, Messages.cannotExtractExportedEntity);
                functionErrorsPerScope[i].push(diag);
                constantErrorsPerScope[i].push(diag);
            }
        }

        return { target, usagesPerScope, functionErrorsPerScope, constantErrorsPerScope, exposedVariableDeclarations };

        function isInGenericContext(node: Node) {
            return !!findAncestor(node, n => isDeclarationWithTypeParameters(n) && getEffectiveTypeParameterDeclarations(n).length !== 0);
        }

        function recordTypeParameterUsages(type: Type) {
            // PERF: This is potentially very expensive.  `type` could be a library type with
            // a lot of properties, each of which the walker will visit.  Unfortunately, the
            // solution isn't as trivial as filtering to user types because of (e.g.) Array.
            const symbolWalker = checker.getSymbolWalker(() => (cancellationToken.throwIfCancellationRequested(), true));
            const { visitedTypes } = symbolWalker.walkType(type);

            for (const visitedType of visitedTypes) {
                if (visitedType.isTypeParameter()) {
                    allTypeParameterUsages.set(visitedType.id.toString(), visitedType);
                }
            }
        }

        function collectUsages(node: Node, valueUsage = Usage.Read) {
            if (inGenericContext) {
                const type = checker.getTypeAtLocation(node);
                recordTypeParameterUsages(type);
            }

            if (isDeclaration(node) && node.symbol) {
                visibleDeclarationsInExtractedRange.push(node);
            }

            if (isAssignmentExpression(node)) {
                // use 'write' as default usage for values
                collectUsages(node.left, Usage.Write);
                collectUsages(node.right);
            }
            else if (isUnaryExpressionWithWrite(node)) {
                collectUsages(node.operand, Usage.Write);
            }
            else if (isPropertyAccessExpression(node) || isElementAccessExpression(node)) {
                // use 'write' as default usage for values
                forEachChild(node, collectUsages);
            }
            else if (isIdentifier(node)) {
                if (!node.parent) {
                    return;
                }
                if (isQualifiedName(node.parent) && node !== node.parent.left) {
                    return;
                }
                if (isPropertyAccessExpression(node.parent) && node !== node.parent.expression) {
                    return;
                }
                recordUsage(node, valueUsage, /*isTypeNode*/ isPartOfTypeNode(node));
            }
            else {
                forEachChild(node, collectUsages);
            }
        }

        function recordUsage(n: Identifier, usage: Usage, isTypeNode: boolean) {
            const symbolId = recordUsagebySymbol(n, usage, isTypeNode);
            if (symbolId) {
                for (let i = 0; i < scopes.length; i++) {
                    // push substitution from map<symbolId, subst> to map<nodeId, subst> to simplify rewriting
                    const substitution = substitutionsPerScope[i].get(symbolId);
                    if (substitution) {
                        usagesPerScope[i].substitutions.set(getNodeId(n).toString(), substitution);
                    }
                }
            }
        }

        function recordUsagebySymbol(identifier: Identifier, usage: Usage, isTypeName: boolean) {
            const symbol = getSymbolReferencedByIdentifier(identifier);
            if (!symbol) {
                // cannot find symbol - do nothing
                return undefined;
            }
            const symbolId = getSymbolId(symbol).toString();
            const lastUsage = seenUsages.get(symbolId);
            // there are two kinds of value usages
            // - reads - if range contains a read from the value located outside of the range then value should be passed as a parameter
            // - writes - if range contains a write to a value located outside the range the value should be passed as a parameter and
            //   returned as a return value
            // 'write' case is a superset of 'read' so if we already have processed 'write' of some symbol there is not need to handle 'read'
            // since all information is already recorded
            if (lastUsage && lastUsage >= usage) {
                return symbolId;
            }

            seenUsages.set(symbolId, usage);
            if (lastUsage) {
                // if we get here this means that we are trying to handle 'write' and 'read' was already processed
                // walk scopes and update existing records.
                for (const perScope of usagesPerScope) {
                    const prevEntry = perScope.usages.get(identifier.text);
                    if (prevEntry) {
                        perScope.usages.set(identifier.text, { usage, symbol, node: identifier });
                    }
                }
                return symbolId;
            }
            // find first declaration in this file
            const decls = symbol.getDeclarations();
            const declInFile = decls && find(decls, d => d.getSourceFile() === sourceFile);
            if (!declInFile) {
                return undefined;
            }
            if (rangeContainsStartEnd(enclosingTextRange, declInFile.getStart(), declInFile.end)) {
                // declaration is located in range to be extracted - do nothing
                return undefined;
            }
            if (targetRange.facts & RangeFacts.IsGenerator && usage === Usage.Write) {
                // this is write to a reference located outside of the target scope and range is extracted into generator
                // currently this is unsupported scenario
                const diag = createDiagnosticForNode(identifier, Messages.cannotExtractRangeThatContainsWritesToReferencesLocatedOutsideOfTheTargetRangeInGenerators);
                for (const errors of functionErrorsPerScope) {
                    errors.push(diag);
                }
                for (const errors of constantErrorsPerScope) {
                    errors.push(diag);
                }
            }
            for (let i = 0; i < scopes.length; i++) {
                const scope = scopes[i];
                const resolvedSymbol = checker.resolveName(symbol.name, scope, symbol.flags, /*excludeGlobals*/ false);
                if (resolvedSymbol === symbol) {
                    continue;
                }
                if (!substitutionsPerScope[i].has(symbolId)) {
                    const substitution = tryReplaceWithQualifiedNameOrPropertyAccess(symbol.exportSymbol || symbol, scope, isTypeName);
                    if (substitution) {
                        substitutionsPerScope[i].set(symbolId, substitution);
                    }
                    else if (isTypeName) {
                        // If the symbol is a type parameter that won't be in scope, we'll pass it as a type argument
                        // so there's no problem.
                        if (!(symbol.flags & SymbolFlags.TypeParameter)) {
                            const diag = createDiagnosticForNode(identifier, Messages.typeWillNotBeVisibleInTheNewScope);
                            functionErrorsPerScope[i].push(diag);
                            constantErrorsPerScope[i].push(diag);
                        }
                    }
                    else {
                        usagesPerScope[i].usages.set(identifier.text, { usage, symbol, node: identifier });
                    }
                }
            }
            return symbolId;
        }

        function checkForUsedDeclarations(node: Node) {
            // If this node is entirely within the original extraction range, we don't need to do anything.
            if (node === targetRange.range || (isReadonlyArray(targetRange.range) && targetRange.range.indexOf(node as Statement) >= 0)) {
                return;
            }

            // Otherwise check and recurse.
            const sym = isIdentifier(node)
                ? getSymbolReferencedByIdentifier(node)
                : checker.getSymbolAtLocation(node);
            if (sym) {
                const decl = find(visibleDeclarationsInExtractedRange, d => d.symbol === sym);
                if (decl) {
                    if (isVariableDeclaration(decl)) {
                        const idString = decl.symbol.id!.toString();
                        if (!exposedVariableSymbolSet.has(idString)) {
                            exposedVariableDeclarations.push(decl);
                            exposedVariableSymbolSet.set(idString, true);
                        }
                    }
                    else {
                        // CONSIDER: this includes binding elements, which we could
                        // expose in the same way as variables.
                        firstExposedNonVariableDeclaration = firstExposedNonVariableDeclaration || decl;
                    }
                }
            }

            forEachChild(node, checkForUsedDeclarations);
        }

        /**
         * Return the symbol referenced by an identifier (even if it declares a different symbol).
         */
        function getSymbolReferencedByIdentifier(identifier: Identifier) {
            // If the identifier is both a property name and its value, we're only interested in its value
            // (since the name is a declaration and will be included in the extracted range).
            return identifier.parent && isShorthandPropertyAssignment(identifier.parent) && identifier.parent.name === identifier
                ? checker.getShorthandAssignmentValueSymbol(identifier.parent)
                : checker.getSymbolAtLocation(identifier);
        }

        function tryReplaceWithQualifiedNameOrPropertyAccess(symbol: Symbol | undefined, scopeDecl: Node, isTypeNode: boolean): PropertyAccessExpression | EntityName | undefined {
            if (!symbol) {
                return undefined;
            }
            const decls = symbol.getDeclarations();
            if (decls && decls.some(d => d.parent === scopeDecl)) {
                return createIdentifier(symbol.name);
            }
            const prefix = tryReplaceWithQualifiedNameOrPropertyAccess(symbol.parent, scopeDecl, isTypeNode);
            if (prefix === undefined) {
                return undefined;
            }
            return isTypeNode
                ? createQualifiedName(<EntityName>prefix, createIdentifier(symbol.name))
                : createPropertyAccess(<Expression>prefix, symbol.name);
        }
    }

    function getExtractableParent(node: Node | undefined): Node | undefined {
        return findAncestor(node, node => node.parent && isExtractableExpression(node) && !isBinaryExpression(node.parent));
    }

    /**
     * Computes whether or not a node represents an expression in a position where it could
     * be extracted.
     * The isExpression() in utilities.ts returns some false positives we need to handle,
     * such as `import x from 'y'` -- the 'y' is a StringLiteral but is *not* an expression
     * in the sense of something that you could extract on
     */
    function isExtractableExpression(node: Node): boolean {
        const { parent } = node;
        switch (parent.kind) {
            case SyntaxKind.EnumMember:
                return false;
        }

        switch (node.kind) {
            case SyntaxKind.StringLiteral:
                return parent.kind !== SyntaxKind.ImportDeclaration &&
                    parent.kind !== SyntaxKind.ImportSpecifier;

            case SyntaxKind.SpreadElement:
            case SyntaxKind.ObjectBindingPattern:
            case SyntaxKind.BindingElement:
                return false;

            case SyntaxKind.Identifier:
                return parent.kind !== SyntaxKind.BindingElement &&
                    parent.kind !== SyntaxKind.ImportSpecifier &&
                    parent.kind !== SyntaxKind.ExportSpecifier;
        }
        return true;
    }

    function isBlockLike(node: Node): node is BlockLike {
        switch (node.kind) {
            case SyntaxKind.Block:
            case SyntaxKind.SourceFile:
            case SyntaxKind.ModuleBlock:
            case SyntaxKind.CaseClause:
                return true;
            default:
                return false;
        }
    }
}
