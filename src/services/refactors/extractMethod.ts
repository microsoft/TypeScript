/// <reference path="../refactorProvider.ts" />
/// <reference path="../../compiler/checker.ts" />

/* @internal */
namespace ts.refactor.extractMethod {
    const extractMethod: Refactor = {
        name: "Extract Method",
        description: Diagnostics.Extract_function.message,
        getAvailableActions,
        getEditsForAction,
    };

    registerRefactor(extractMethod);

    /** Compute the associated code actions */
    function getAvailableActions(context: RefactorContext): ApplicableRefactorInfo[] | undefined {
        const rangeToExtract = getRangeToExtract(context.file, { start: context.startPosition, length: context.endPosition - context.startPosition });

        const targetRange: TargetRange = rangeToExtract.targetRange;
        if (targetRange === undefined) {
            return undefined;
        }

        const extractions = getPossibleExtractions(targetRange, context);
        if (extractions === undefined) {
            // No extractions possible
            return undefined;
        }

        const actions: RefactorActionInfo[] = [];
        const usedNames: Map<boolean> = createMap();

        let i = 0;
        for (const { scopeDescription, errors } of extractions) {
            // Skip these since we don't have a way to report errors yet
            if (errors.length) {
                continue;
            }

            // Don't issue refactorings with duplicated names.
            // Scopes come back in "innermost first" order, so extractions will
            // preferentially go into nearer scopes
            const description = formatStringFromArgs(Diagnostics.Extract_function_into_0.message, [scopeDescription]);
            if (!usedNames.has(description)) {
                usedNames.set(description, true);
                actions.push({
                    description,
                    name: `scope_${i}`
                });
            }
            // *do* increment i anyway because we'll look for the i-th scope
            // later when actually doing the refactoring if the user requests it
            i++;
        }

        if (actions.length === 0) {
            return undefined;
        }

        return [{
            name: extractMethod.name,
            description: extractMethod.description,
            inlineable: true,
            actions
        }];
    }

    function getEditsForAction(context: RefactorContext, actionName: string): RefactorEditInfo | undefined {
        const length = context.endPosition === undefined ? 0 : context.endPosition - context.startPosition;
        const rangeToExtract = getRangeToExtract(context.file, { start: context.startPosition, length });
        const targetRange: TargetRange = rangeToExtract.targetRange;

        const parsedIndexMatch = /^scope_(\d+)$/.exec(actionName);
        Debug.assert(!!parsedIndexMatch, "Scope name should have matched the regexp");
        const index = +parsedIndexMatch[1];
        Debug.assert(isFinite(index), "Expected to parse a finite number from the scope index");

        return getExtractionAtIndex(targetRange, context, index);
    }

    // Move these into diagnostic messages if they become user-facing
    namespace Messages {
        function createMessage(message: string): DiagnosticMessage {
            return { message, code: 0, category: DiagnosticCategory.Message, key: message };
        }

        export const CannotExtractFunction: DiagnosticMessage = createMessage("Cannot extract function.");
        export const StatementOrExpressionExpected: DiagnosticMessage = createMessage("Statement or expression expected.");
        export const CannotExtractRangeContainingConditionalBreakOrContinueStatements: DiagnosticMessage = createMessage("Cannot extract range containing conditional break or continue statements.");
        export const CannotExtractRangeContainingConditionalReturnStatement: DiagnosticMessage = createMessage("Cannot extract range containing conditional return statement.");
        export const CannotExtractRangeContainingLabeledBreakOrContinueStatementWithTargetOutsideOfTheRange: DiagnosticMessage = createMessage("Cannot extract range containing labeled break or continue with target outside of the range.");
        export const CannotExtractRangeThatContainsWritesToReferencesLocatedOutsideOfTheTargetRangeInGenerators: DiagnosticMessage = createMessage("Cannot extract range containing writes to references located outside of the target range in generators.");
        export const TypeWillNotBeVisibleInTheNewScope = createMessage("Type will not visible in the new scope.");
        export const FunctionWillNotBeVisibleInTheNewScope = createMessage("Function will not visible in the new scope.");
        export const InsufficientSelection = createMessage("Select more than a single identifier.");
        export const CannotExtractExportedEntity = createMessage("Cannot extract exported declaration");
        export const CannotCombineWritesAndReturns = createMessage("Cannot combine writes and returns");
        export const CannotExtractReadonlyPropertyInitializerOutsideConstructor = createMessage("Cannot move initialization of read-only class property outside of the constructor");
        export const CannotExtractAmbientBlock = createMessage("Cannot extract code from ambient contexts");
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
        readonly errors: ReadonlyArray<Diagnostic>;
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
    export function getRangeToExtract(sourceFile: SourceFile, span: TextSpan): RangeToExtract {
        const length = span.length || 0;

        if (length === 0) {
            return { errors: [createFileDiagnostic(sourceFile, span.start, length, Messages.StatementOrExpressionExpected)] };
        }

        // Walk up starting from the the start position until we find a non-SourceFile node that subsumes the selected span.
        // This may fail (e.g. you select two statements in the root of a source file)
        let start = getParentNodeInSpan(getTokenAtPosition(sourceFile, span.start, /*includeJsDocComment*/ false), sourceFile, span);
        // Do the same for the ending position
        let end = getParentNodeInSpan(findTokenOnLeftOfPosition(sourceFile, textSpanEnd(span)), sourceFile, span);

        const declarations: Symbol[] = [];

        // We'll modify these flags as we walk the tree to collect data
        // about what things need to be done as part of the extraction.
        let rangeFacts = RangeFacts.None;

        if (!start || !end) {
            // cannot find either start or end node
            return { errors: [createFileDiagnostic(sourceFile, span.start, length, Messages.CannotExtractFunction)] };
        }

        if (start.parent !== end.parent) {
            // handle cases like 1 + [2 + 3] + 4
            // user selection is marked with [].
            // in this case 2 + 3 does not belong to the same tree node
            // instead the shape of the tree looks like this:
            //          +
            //         / \
            //        +   4
            //       / \
            //      +   3
            //     / \
            //    1   2
            // in this case there is no such one node that covers ends of selection and is located inside the selection
            // to handle this we check if both start and end of the selection belong to some binary operation
            // and start node is parented by the parent of the end node
            // if this is the case - expand the selection to the entire parent of end node (in this case it will be [1 + 2 + 3] + 4)
            const startParent = skipParentheses(start.parent);
            const endParent = skipParentheses(end.parent);
            if (isBinaryExpression(startParent) && isBinaryExpression(endParent) && isNodeDescendantOf(startParent, endParent)) {
                start = end = endParent;
            }
            else {
                // start and end nodes belong to different subtrees
                return createErrorResult(sourceFile, span.start, length, Messages.CannotExtractFunction);
            }
        }
        if (start !== end) {
            // start and end should be statements and parent should be either block or a source file
            if (!isBlockLike(start.parent)) {
                return createErrorResult(sourceFile, span.start, length, Messages.CannotExtractFunction);
            }
            const statements: Statement[] = [];
            for (const statement of (<BlockLike>start.parent).statements) {
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
            return { targetRange: { range: statements, facts: rangeFacts, declarations } };
        }
        else {
            // We have a single node (start)
            const errors = checkRootNode(start) || checkNode(start);
            if (errors) {
                return { errors };
            }

            return { targetRange: { range: getStatementOrExpressionRange(start), facts: rangeFacts, declarations } };
        }

        function createErrorResult(sourceFile: SourceFile, start: number, length: number, message: DiagnosticMessage): RangeToExtract {
            return { errors: [createFileDiagnostic(sourceFile, start, length, message)] };
        }

        function checkRootNode(node: Node): Diagnostic[] | undefined {
            if (isIdentifier(isExpressionStatement(node) ? node.expression : node)) {
                return [createDiagnosticForNode(node, Messages.InsufficientSelection)];
            }
            return undefined;
        }

        function checkForStaticContext(nodeToCheck: Node, containingClass: Node) {
            let current: Node = nodeToCheck;
            while (current !== containingClass) {
                if (current.kind === SyntaxKind.PropertyDeclaration) {
                    if (hasModifier(current, ModifierFlags.Static)) {
                        rangeFacts |= RangeFacts.InStaticRegion;
                    }
                    break;
                }
                else if (current.kind === SyntaxKind.Parameter) {
                    const ctorOrMethod = getContainingFunction(current);
                    if (ctorOrMethod.kind === SyntaxKind.Constructor) {
                        rangeFacts |= RangeFacts.InStaticRegion;
                    }
                    break;
                }
                else if (current.kind === SyntaxKind.MethodDeclaration) {
                    if (hasModifier(current, ModifierFlags.Static)) {
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
            if (!isStatement(nodeToCheck) && !(isExpression(nodeToCheck) && isExtractableExpression(nodeToCheck))) {
                return [createDiagnosticForNode(nodeToCheck, Messages.StatementOrExpressionExpected)];
            }

            if (isInAmbientContext(nodeToCheck)) {
                return [createDiagnosticForNode(nodeToCheck, Messages.CannotExtractAmbientBlock)];
            }

            // If we're in a class, see whether we're in a static region (static property initializer, static method, class constructor parameter default)
            const containingClass: Node = getContainingClass(nodeToCheck);
            if (containingClass) {
                checkForStaticContext(nodeToCheck, containingClass);
            }

            let errors: Diagnostic[];
            let permittedJumps = PermittedJumps.Return;
            let seenLabels: Array<__String>;

            visit(nodeToCheck);

            return errors;

            function visit(node: Node) {
                if (errors) {
                    // already found an error - can stop now
                    return true;
                }

                if (isDeclaration(node)) {
                    const declaringNode = (node.kind === SyntaxKind.VariableDeclaration) ? node.parent.parent : node;
                    if (hasModifier(declaringNode, ModifierFlags.Export)) {
                        (errors || (errors = [])).push(createDiagnosticForNode(node, Messages.CannotExtractExportedEntity));
                        return true;
                    }
                    declarations.push(node.symbol);
                }

                // Some things can't be extracted in certain situations
                switch (node.kind) {
                    case SyntaxKind.ImportDeclaration:
                        (errors || (errors = [])).push(createDiagnosticForNode(node, Messages.CannotExtractFunction));
                        return true;
                    case SyntaxKind.SuperKeyword:
                        // For a super *constructor call*, we have to be extracting the entire class,
                        // but a super *method call* simply implies a 'this' reference
                        if (node.parent.kind === SyntaxKind.CallExpression) {
                            // Super constructor call
                            const containingClass = getContainingClass(node);
                            if (containingClass.pos < span.start || containingClass.end >= (span.start + span.length)) {
                                (errors || (errors = [])).push(createDiagnosticForNode(node, Messages.CannotExtractFunction));
                                return true;
                            }
                        }
                        else {
                            rangeFacts |= RangeFacts.UsesThis;
                        }
                        break;
                }

                if (!node || isFunctionLike(node) || isClassLike(node)) {
                    switch (node.kind) {
                        case SyntaxKind.FunctionDeclaration:
                        case SyntaxKind.ClassDeclaration:
                            if (node.parent.kind === SyntaxKind.SourceFile && (node.parent as ts.SourceFile).externalModuleIndicator === undefined) {
                                // You cannot extract global declarations
                                (errors || (errors = [])).push(createDiagnosticForNode(node, Messages.FunctionWillNotBeVisibleInTheNewScope));
                            }
                            break;
                    }

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
                        if (node.parent && node.parent.kind === SyntaxKind.TryStatement && (<TryStatement>node).finallyBlock === node) {
                            // allow unconditional returns from finally blocks
                            permittedJumps = PermittedJumps.Return;
                        }
                        break;
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
                    case SyntaxKind.LabeledStatement:
                        {
                            const label = (<LabeledStatement>node).label;
                            (seenLabels || (seenLabels = [])).push(label.escapedText);
                            forEachChild(node, visit);
                            seenLabels.pop();
                            break;
                        }
                    case SyntaxKind.BreakStatement:
                    case SyntaxKind.ContinueStatement:
                        {
                            const label = (<BreakStatement | ContinueStatement>node).label;
                            if (label) {
                                if (!contains(seenLabels, label.escapedText)) {
                                    // attempts to jump to label that is not in range to be extracted
                                    (errors || (errors = [])).push(createDiagnosticForNode(node, Messages.CannotExtractRangeContainingLabeledBreakOrContinueStatementWithTargetOutsideOfTheRange));
                                }
                            }
                            else {
                                if (!(permittedJumps & (node.kind === SyntaxKind.BreakStatement ? PermittedJumps.Break : PermittedJumps.Continue))) {
                                    // attempt to break or continue in a forbidden context
                                    (errors || (errors = [])).push(createDiagnosticForNode(node, Messages.CannotExtractRangeContainingConditionalBreakOrContinueStatements));
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
                            (errors || (errors = [])).push(createDiagnosticForNode(node, Messages.CannotExtractRangeContainingConditionalReturnStatement));
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

    function getStatementOrExpressionRange(node: Node): Statement[] | Expression {
        if (isStatement(node)) {
            return [node];
        }
        else if (isPartOfExpression(node)) {
            // If our selection is the expression in an ExpressionStatement, expand
            // the selection to include the enclosing Statement (this stops us
            // from trying to care about the return value of the extracted function
            // and eliminates double semicolon insertion in certain scenarios)
            return isExpressionStatement(node.parent) ? [node.parent] : node as Expression;
        }
        return undefined;
    }

    function isValidExtractionTarget(node: Node): node is Scope {
        // Note that we don't use isFunctionLike because we don't want to put the extracted closure *inside* a method
        return (node.kind === SyntaxKind.FunctionDeclaration) || isSourceFile(node) || isModuleBlock(node) || isClassLike(node);
    }

    /**
     * Computes possible places we could extract the function into. For example,
     * you may be able to extract into a class method *or* local closure *or* namespace function,
     * depending on what's in the extracted body.
     */
    function collectEnclosingScopes(range: TargetRange): Scope[] | undefined {
        let current: Node = isReadonlyArray(range.range) ? firstOrUndefined(range.range) : range.range;
        if (range.facts & RangeFacts.UsesThis) {
            // if range uses this as keyword or as type inside the class then it can only be extracted to a method of the containing class
            const containingClass = getContainingClass(current);
            if (containingClass) {
                return [containingClass];
            }
        }

        const start = current;

        let scopes: Scope[] | undefined = undefined;
        while (current) {
            // We want to find the nearest parent where we can place an "equivalent" sibling to the node we're extracting out of.
            // Walk up to the closest parent of a place where we can logically put a sibling:
            //  * Function declaration
            //  * Class declaration or expression
            //  * Module/namespace or source file
            if (current !== start && isValidExtractionTarget(current)) {
                (scopes = scopes || []).push(current);
            }

            // A function parameter's initializer is actually in the outer scope, not the function declaration
            if (current && current.parent && current.parent.kind === SyntaxKind.Parameter) {
                // Skip all the way to the outer scope of the function that declared this parameter
                current = findAncestor(current, parent => isFunctionLike(parent)).parent;
            }
            else {
                current = current.parent;
            }

        }
        return scopes;
    }

    // exported only for tests
    export function getExtractionAtIndex(targetRange: TargetRange, context: RefactorContext, requestedChangesIndex: number): RefactorEditInfo {
        const { scopes, readsAndWrites: { target, usagesPerScope, errorsPerScope } } = getPossibleExtractionsWorker(targetRange, context);
        Debug.assert(!errorsPerScope[requestedChangesIndex].length, "The extraction went missing? How?");
        context.cancellationToken.throwIfCancellationRequested();
        return extractFunctionInScope(target, scopes[requestedChangesIndex], usagesPerScope[requestedChangesIndex], targetRange, context);
    }

    interface PossibleExtraction {
        readonly scopeDescription: string;
        readonly errors: ReadonlyArray<Diagnostic>;
    }
    /**
     * Given a piece of text to extract ('targetRange'), computes a list of possible extractions.
     * Each returned ExtractResultForScope corresponds to a possible target scope and is either a set of changes
     * or an error explaining why we can't extract into that scope.
     */
    // exported only for tests
    export function getPossibleExtractions(targetRange: TargetRange, context: RefactorContext): ReadonlyArray<PossibleExtraction> | undefined {
        const extractions = getPossibleExtractionsWorker(targetRange, context);
        // Need the inner type annotation to avoid https://github.com/Microsoft/TypeScript/issues/7547
        return extractions && extractions.scopes.map((scope, i): PossibleExtraction =>
            ({ scopeDescription: getDescriptionForScope(scope), errors: extractions.readsAndWrites.errorsPerScope[i] }));
    }

    function getPossibleExtractionsWorker(targetRange: TargetRange, context: RefactorContext): { readonly scopes: Scope[], readonly readsAndWrites: ReadsAndWrites } {
        const { file: sourceFile } = context;

        if (targetRange === undefined) {
            return undefined;
        }

        const scopes = collectEnclosingScopes(targetRange);
        if (scopes === undefined) {
            return undefined;
        }

        const enclosingTextRange = getEnclosingTextRange(targetRange, sourceFile);
        const readsAndWrites = collectReadsAndWrites(
            targetRange,
            scopes,
            enclosingTextRange,
            sourceFile,
            context.program.getTypeChecker());
        return { scopes, readsAndWrites };
    }

    function getDescriptionForScope(scope: Scope) {
        if (isFunctionLike(scope)) {
            switch (scope.kind) {
                case SyntaxKind.Constructor:
                    return "constructor";
                case SyntaxKind.FunctionExpression:
                    return scope.name
                        ? `function expression ${scope.name.text}`
                        : "anonymous function expression";
                case SyntaxKind.FunctionDeclaration:
                    return `function '${scope.name.text}'`;
                case SyntaxKind.ArrowFunction:
                    return "arrow function";
                case SyntaxKind.MethodDeclaration:
                    return `method '${scope.name.getText()}`;
                case SyntaxKind.GetAccessor:
                    return `'get ${scope.name.getText()}'`;
                case SyntaxKind.SetAccessor:
                    return `'set ${scope.name.getText()}'`;
            }
        }
        else if (isModuleBlock(scope)) {
            return `namespace '${scope.parent.name.getText()}'`;
        }
        else if (isClassLike(scope)) {
            return scope.kind === SyntaxKind.ClassDeclaration
                ? `class '${scope.name.text}'`
                : scope.name && scope.name.text
                    ? `class expression '${scope.name.text}'`
                    : "anonymous class expression";
        }
        else if (isSourceFile(scope)) {
            return scope.externalModuleIndicator ? "module scope" : "global scope";
        }
        else {
            return "unknown";
        }
    }

    function getUniqueName(fileText: string): string {
        let functionNameText = "newFunction";
        for (let i = 1; fileText.indexOf(functionNameText) !== -1; i++) {
            functionNameText = `newFunction_${i}`;
        }
        return functionNameText;
    }

    /**
     * Result of 'extractRange' operation for a specific scope.
     * Stores either a list of changes that should be applied to extract a range or a list of errors
     */
    function extractFunctionInScope(
        node: Statement | Expression | Block,
        scope: Scope,
        { usages: usagesInScope, substitutions }: ScopeUsages,
        range: TargetRange,
        context: RefactorContext): RefactorEditInfo {

        const checker = context.program.getTypeChecker();

        // Make a unique name for the extracted function
        const file = scope.getSourceFile();
        const functionNameText = getUniqueName(file.text);
        const isJS = isInJavaScriptFile(scope);

        const functionName = createIdentifier(functionNameText);

        let returnType: TypeNode = undefined;
        const parameters: ParameterDeclaration[] = [];
        const callArguments: Identifier[] = [];
        let writes: UsageEntry[];
        usagesInScope.forEach((usage, name) => {
            let typeNode: TypeNode = undefined;
            if (!isJS) {
                let type = checker.getTypeOfSymbolAtLocation(usage.symbol, usage.node);
                // Widen the type so we don't emit nonsense annotations like "function fn(x: 3) {"
                type = checker.getBaseTypeOfLiteralType(type);
                typeNode = checker.typeToTypeNode(type, node, NodeBuilderFlags.NoTruncation);
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

        // Provide explicit return types for contexutally-typed functions
        // to avoid problems when there are literal types present
        if (isExpression(node) && !isJS) {
            const contextualType = checker.getContextualType(node);
            returnType = checker.typeToTypeNode(contextualType);
        }

        const { body, returnValueProperty } = transformFunctionBody(node, writes, substitutions, !!(range.facts & RangeFacts.HasReturn));
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
                /*typeParameters*/ undefined,
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
                /*typeParameters*/ undefined,
                parameters,
                returnType,
                body
            );
        }

        const changeTracker = textChanges.ChangeTracker.fromCodeFixContext(context);
        const minInsertionPos = (isReadonlyArray(range.range) ? lastOrUndefined(range.range) : range.range).end;
        const nodeToInsertBefore = getNodeToInsertBefore(minInsertionPos, scope);
        if (nodeToInsertBefore) {
            changeTracker.insertNodeBefore(context.file, nodeToInsertBefore, newFunction, { suffix: context.newLineCharacter + context.newLineCharacter });
        }
        else {
            changeTracker.insertNodeBefore(context.file, scope.getLastToken(), newFunction, { prefix: context.newLineCharacter, suffix: context.newLineCharacter });
        }

        const newNodes: Node[] = [];
        // replace range with function call
        const called = getCalledExpression(scope, range, functionNameText);

        let call: Expression = createCall(
            called,
            /*typeArguments*/ undefined,
            callArguments);
        if (range.facts & RangeFacts.IsGenerator) {
            call = createYield(createToken(SyntaxKind.AsteriskToken), call);
        }
        if (range.facts & RangeFacts.IsAsyncFunction) {
            call = createAwait(call);
        }

        if (writes) {
            if (returnValueProperty) {
                // has both writes and return, need to create variable declaration to hold return value;
                newNodes.push(createVariableStatement(
                    /*modifiers*/ undefined,
                    [createVariableDeclaration(returnValueProperty, createKeywordTypeNode(SyntaxKind.AnyKeyword))]
                ));
            }

            const assignments = getPropertyAssignmentsForWrites(writes);
            if (returnValueProperty) {
                assignments.unshift(createShorthandPropertyAssignment(returnValueProperty));
            }

            // propagate writes back
            if (assignments.length === 1) {
                if (returnValueProperty) {
                    newNodes.push(createReturn(createIdentifier(returnValueProperty)));
                }
                else {
                    newNodes.push(createStatement(createBinary(assignments[0].name, SyntaxKind.EqualsToken, call)));

                    if (range.facts & RangeFacts.HasReturn) {
                        newNodes.push(createReturn());
                    }
                }
            }
            else {
                // emit e.g.
                //   { a, b, __return } = newFunction(a, b);
                //   return __return;
                newNodes.push(createStatement(createBinary(createObjectLiteral(assignments), SyntaxKind.EqualsToken, call)));
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
            changeTracker.replaceNodesWithNodes(context.file, range.range, newNodes, {
                nodeSeparator: context.newLineCharacter,
                suffix: context.newLineCharacter // insert newline only when replacing statements
            });
        }
        else {
            changeTracker.replaceNodeWithNodes(context.file, range.range, newNodes, { nodeSeparator: context.newLineCharacter });
        }

        const edits = changeTracker.getChanges();
        const renameRange = isReadonlyArray(range.range) ? range.range[0] : range.range;

        const renameFilename = renameRange.getSourceFile().fileName;
        const renameLocation = getRenameLocation(edits, renameFilename, functionNameText);
        return { renameFilename, renameLocation, edits };

        function getStatementsOrClassElements(scope: Scope): ReadonlyArray<Statement> | ReadonlyArray<ClassElement> {
            if (isFunctionLike(scope)) {
                const body = scope.body;
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
                assertTypeIsNever(scope);
            }

            return emptyArray;
        }

        /**
         * If `scope` contains a function after `minPos`, then return the first such function.
         * Otherwise, return `undefined`.
         */
        function getNodeToInsertBefore(minPos: number, scope: Scope): Node | undefined {
            const children = getStatementsOrClassElements(scope);
            for (const child of children) {
                if (child.pos >= minPos && isFunctionLike(child) && !isConstructorDeclaration(child)) {
                    return child;
                }
            }
        }
    }

    function getRenameLocation(edits: ReadonlyArray<FileTextChanges>, renameFilename: string, functionNameText: string): number {
        let delta = 0;
        for (const { fileName, textChanges } of edits) {
            Debug.assert(fileName === renameFilename);
            for (const change of textChanges) {
                const { span, newText } = change;
                // TODO(acasey): We are assuming that the call expression comes before the function declaration,
                // because we want the new cursor to be on the call expression,
                // which is closer to where the user was before extracting the function.
                const index = newText.indexOf(functionNameText);
                if (index !== -1) {
                    return span.start + delta + index;
                }
                delta += newText.length - span.length;
            }
        }
        throw new Error(); // Didn't find the text we inserted?
    }

    function getCalledExpression(scope: Node, range: TargetRange, functionNameText: string): Expression {
        const functionReference = createIdentifier(functionNameText);
        if (isClassLike(scope)) {
            const lhs = range.facts & RangeFacts.InStaticRegion ? createIdentifier(scope.name.text) : createThis();
            return createPropertyAccess(lhs, functionReference);
        }
        else {
            return functionReference;
        }
    }


    function transformFunctionBody(body: Node, writes: ReadonlyArray<UsageEntry>, substitutions: ReadonlyMap<Node>, hasReturn: boolean): { body: Block, returnValueProperty: string } {
        if (isBlock(body) && !writes && substitutions.size === 0) {
            // already block, no writes to propagate back, no substitutions - can use node as is
            return { body: createBlock(body.statements, /*multLine*/ true), returnValueProperty: undefined };
        }
        let returnValueProperty: string;
        let ignoreReturns = false;
        const statements = createNodeArray(isBlock(body) ? body.statements.slice(0) : [isStatement(body) ? body : createReturn(<Expression>body)]);
        // rewrite body if either there are writes that should be propagated back via return statements or there are substitutions
        if (writes || substitutions.size) {
            const rewrittenStatements = visitNodes(statements, visitor).slice();
            if (writes && !hasReturn && isStatement(body)) {
                // add return at the end to propagate writes back in case if control flow falls out of the function body
                // it is ok to know that range has at least one return since it we only allow unconditional returns
                const assignments = getPropertyAssignmentsForWrites(writes);
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
            if (!ignoreReturns && node.kind === SyntaxKind.ReturnStatement && writes) {
                const assignments: ObjectLiteralElementLike[] = getPropertyAssignmentsForWrites(writes);
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
                ignoreReturns = ignoreReturns || isFunctionLike(node) || isClassLike(node);
                const substitution = substitutions.get(getNodeId(node).toString());
                const result = substitution || visitEachChild(node, visitor, nullTransformationContext);
                ignoreReturns = oldIgnoreReturns;
                return result;
            }
        }
    }

    function getPropertyAssignmentsForWrites(writes: ReadonlyArray<UsageEntry>): ShorthandPropertyAssignment[] {
        return writes.map(w => createShorthandPropertyAssignment(w.symbol.name));
    }

    function isReadonlyArray(v: any): v is ReadonlyArray<any> {
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
            ? { pos: targetRange.range[0].getStart(sourceFile), end: targetRange.range[targetRange.range.length - 1].getEnd() }
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
        readonly substitutions: Map<Node>;
    }

    interface ReadsAndWrites {
        readonly target: Expression | Block;
        readonly usagesPerScope: ReadonlyArray<ScopeUsages>;
        readonly errorsPerScope: ReadonlyArray<ReadonlyArray<Diagnostic>>;
    }
    function collectReadsAndWrites(
        targetRange: TargetRange,
        scopes: Scope[],
        enclosingTextRange: TextRange,
        sourceFile: SourceFile,
        checker: TypeChecker): ReadsAndWrites {

        const usagesPerScope: ScopeUsages[] = [];
        const substitutionsPerScope: Map<Node>[] = [];
        const errorsPerScope: Diagnostic[][] = [];
        const visibleDeclarationsInExtractedRange: Symbol[] = [];

        // initialize results
        for (const _ of scopes) {
            usagesPerScope.push({ usages: createMap<UsageEntry>(), substitutions: createMap<Expression>() });
            substitutionsPerScope.push(createMap<Expression>());
            errorsPerScope.push([]);
        }
        const seenUsages = createMap<Usage>();
        const target = isReadonlyArray(targetRange.range) ? createBlock(<Statement[]>targetRange.range) : targetRange.range;
        const containingLexicalScopeOfExtraction = isBlockScope(scopes[0], scopes[0].parent) ? scopes[0] : getEnclosingBlockScopeContainer(scopes[0]);

        collectUsages(target);

        for (let i = 0; i < scopes.length; i++) {
            let hasWrite = false;
            let readonlyClassPropertyWrite: Declaration | undefined = undefined;
            usagesPerScope[i].usages.forEach(value => {
                if (value.usage === Usage.Write) {
                    hasWrite = true;
                    if (value.symbol.flags & SymbolFlags.ClassMember &&
                        value.symbol.valueDeclaration &&
                        hasModifier(value.symbol.valueDeclaration, ModifierFlags.Readonly)) {
                        readonlyClassPropertyWrite = value.symbol.valueDeclaration;
                    }
                }
            });

            if (hasWrite && !isReadonlyArray(targetRange.range) && isExpression(targetRange.range)) {
                errorsPerScope[i].push(createDiagnosticForNode(targetRange.range, Messages.CannotCombineWritesAndReturns));
            }
            else if (readonlyClassPropertyWrite && i > 0) {
                errorsPerScope[i].push(createDiagnosticForNode(readonlyClassPropertyWrite, Messages.CannotCombineWritesAndReturns));
            }
        }

        // If there are any declarations in the extracted block that are used in the same enclosing
        // lexical scope, we can't move the extraction "up" as those declarations will become unreachable
        if (visibleDeclarationsInExtractedRange.length) {
            forEachChild(containingLexicalScopeOfExtraction, checkForUsedDeclarations);
        }

        return { target, usagesPerScope, errorsPerScope };

        function collectUsages(node: Node, valueUsage = Usage.Read) {
            if (isDeclaration(node) && node.symbol) {
                visibleDeclarationsInExtractedRange.push(node.symbol);
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
                    const substitition = substitutionsPerScope[i].get(symbolId);
                    if (substitition) {
                        usagesPerScope[i].substitutions.set(getNodeId(n).toString(), substitition);
                    }
                }
            }
        }

        function recordUsagebySymbol(identifier: Identifier, usage: Usage, isTypeName: boolean) {
            // If the identifier is both a property name and its value, we're only interested in its value
            // (since the name is a declaration and will be included in the extracted range).
            const symbol = identifier.parent && isShorthandPropertyAssignment(identifier.parent) && identifier.parent.name === identifier
                ? checker.getShorthandAssignmentValueSymbol(identifier.parent)
                : checker.getSymbolAtLocation(identifier);
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
                    const prevEntry = perScope.usages.get(identifier.text as string);
                    if (prevEntry) {
                        perScope.usages.set(identifier.text as string, { usage, symbol, node: identifier });
                    }
                }
                return symbolId;
            }
            // find first declaration in this file
            const declInFile = find(symbol.getDeclarations(), d => d.getSourceFile() === sourceFile);
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
                for (const errors of errorsPerScope) {
                    errors.push(createDiagnosticForNode(identifier, Messages.CannotExtractRangeThatContainsWritesToReferencesLocatedOutsideOfTheTargetRangeInGenerators));
                }
            }
            for (let i = 0; i < scopes.length; i++) {
                const scope = scopes[i];
                const resolvedSymbol = checker.resolveName(symbol.name, scope, symbol.flags);
                if (resolvedSymbol === symbol) {
                    continue;
                }
                if (!substitutionsPerScope[i].has(symbolId)) {
                    const substitution = tryReplaceWithQualifiedNameOrPropertyAccess(symbol.exportSymbol || symbol, scope, isTypeName);
                    if (substitution) {
                        substitutionsPerScope[i].set(symbolId, substitution);
                    }
                    else if (isTypeName) {
                        errorsPerScope[i].push(createDiagnosticForNode(identifier, Messages.TypeWillNotBeVisibleInTheNewScope));
                    }
                    else {
                        usagesPerScope[i].usages.set(identifier.text as string, { usage, symbol, node: identifier });
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
            const sym = checker.getSymbolAtLocation(node);
            if (sym && visibleDeclarationsInExtractedRange.some(d => d === sym)) {
                for (const scope of errorsPerScope) {
                    scope.push(createDiagnosticForNode(node, Messages.CannotExtractExportedEntity));
                }
                return true;
            }
            else {
                forEachChild(node, checkForUsedDeclarations);
            }
        }

        function tryReplaceWithQualifiedNameOrPropertyAccess(symbol: Symbol, scopeDecl: Node, isTypeNode: boolean): PropertyAccessExpression | EntityName {
            if (!symbol) {
                return undefined;
            }
            if (symbol.getDeclarations().some(d => d.parent === scopeDecl)) {
                return createIdentifier(symbol.name);
            }
            const prefix = tryReplaceWithQualifiedNameOrPropertyAccess(symbol.parent, scopeDecl, isTypeNode);
            if (prefix === undefined) {
                return undefined;
            }
            return isTypeNode ? createQualifiedName(<EntityName>prefix, createIdentifier(symbol.name)) : createPropertyAccess(<Expression>prefix, symbol.name);
        }
    }

    function getParentNodeInSpan(node: Node, file: SourceFile, span: TextSpan): Node {
        if (!node) return undefined;

        while (node.parent) {
            if (isSourceFile(node.parent) || !spanContainsNode(span, node.parent, file)) {
                return node;
            }

            node = node.parent;
        }
    }

    function spanContainsNode(span: TextSpan, node: Node, file: SourceFile): boolean {
        return textSpanContainsPosition(span, node.getStart(file)) &&
            node.getEnd() <= textSpanEnd(span);
    }

    /**
     * Computes whether or not a node represents an expression in a position where it could
     * be extracted.
     * The isExpression() in utilities.ts returns some false positives we need to handle,
     * such as `import x from 'y'` -- the 'y' is a StringLiteral but is *not* an expression
     * in the sense of something that you could extract on
     */
    function isExtractableExpression(node: Node): boolean {
        switch (node.parent.kind) {
            case SyntaxKind.EnumMember:
                return false;
        }

        switch (node.kind) {
            case SyntaxKind.StringLiteral:
                return node.parent.kind !== SyntaxKind.ImportDeclaration &&
                    node.parent.kind !== SyntaxKind.ImportSpecifier;

            case SyntaxKind.SpreadElement:
            case SyntaxKind.ObjectBindingPattern:
            case SyntaxKind.BindingElement:
                return false;

            case SyntaxKind.Identifier:
                return node.parent.kind !== SyntaxKind.BindingElement &&
                    node.parent.kind !== SyntaxKind.ImportSpecifier &&
                    node.parent.kind !== SyntaxKind.ExportSpecifier;
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
