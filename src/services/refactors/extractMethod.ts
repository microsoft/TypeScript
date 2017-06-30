/// <reference path="../refactorProvider.ts" />
/// <reference path="../../compiler/checker.ts" />

/* @internal */
namespace ts.refactor.extractMethod {
    export const name = 'extract_method';
    const extractMethod: Refactor = {
        name: "Extract method",
        description: Diagnostics.Convert_function_to_an_ES2015_class.message,
        getAvailableActions,
        getEditsForAction,
    };

    registerRefactor(extractMethod);

        /** Compute the associated code actions */
    function getAvailableActions(context: RefactorContext): ApplicableRefactorInfo[] | undefined {
        const rangeToExtract = getRangeToExtract(context.file, { start: context.startPosition, length: context.endPosition - context.startPosition });
        const targetRange: TargetRange = rangeToExtract.targetRange;
        const extractions = extractRange(targetRange, context.file, context);

        if (extractions.length === 0) {
            // No extractions possible
            return undefined;
        }
        
        
        const actions: RefactorActionInfo[] = [];
        let i = 0;
        for (const extr of extractions) {
            actions.push({
                description: extr.scopeDescription,
                name: `scope_${i}`
            });
            i++;
        }

        return [{
            name,
            description: "Extract method/function",
            inlineable: true,
            actions
        }];
    }

    function getEditsForAction(context: RefactorContext, actionName: string): RefactorEditInfo | undefined {
        const rangeToExtract = getRangeToExtract(context.file, { start: context.startPosition, length: context.endPosition - context.startPosition });
        const targetRange: TargetRange = rangeToExtract.targetRange;
        const extractions = extractRange(targetRange, context.file, context);

        let i = 0;
        for (const extr of extractions) {
            const name = `scope_${i}`;
            if (name === actionName) {
                return ({
                    edits: extr.changes
                });
            }
            i++;
        }
        // ?
        return undefined;
    }

/*
    function isApplicable(context: RefactorContext): boolean {
        // Must have something selected
        if (context.endPosition === undefined || context.endPosition <= context.startPosition) {
            return false;
        }
        return true;
    }
*/

    // TODO: put into diagnostic messages
    namespace Messages {
        function m(message: string): DiagnosticMessage {
            return { message, code: 0, category: DiagnosticCategory.Message, key: message };
        }

        // TODO provide more information in errors
        export const CannotExtractFunction: DiagnosticMessage = m("Cannot extract function.");
        export const StatementOrExpressionExpected: DiagnosticMessage = m("Statement or expression expected.");
        export const CannotExtractRangeContainingConditionalBreakOrContinueStatements: DiagnosticMessage = m("Cannot extract range containing conditional break or continue statements.");
        export const CannotExtractRangeContainingConditionalReturnStatement: DiagnosticMessage = m("Cannot extract range containing conditional return statement.");
        export const CannotExtractRangeContainingLabeledBreakOrContinueStatementWithTargetOutsideOfTheRange: DiagnosticMessage = m("Cannot extract range containing labeled break or continue with target outside of the range.");
        export const CannotExtractRangeThatContainsWritesToReferencesLocatedOutsideOfTheTargetRangeInGenerators: DiagnosticMessage = m("Cannot extract range containing writes to references located outside of the target range in generators.");
        export const TypeWillNotBeVisibleInTheNewScope = m("Type will not visible in the new scope.");
        export const FunctionWillNotBeVisibleInTheNewScope = m("Function will not visible in the new scope.");
    }

    export enum RangeFacts {
        None = 0,
        HasReturn = 1 << 0,
        IsGenerator = 1 << 1,
        IsAsyncFunction = 1 << 2,
        UsesThis = 1 << 3
    }

    /**
     * Represents an expression or a list of statements that should be extracted with some extra information
     */
    export interface TargetRange {
        readonly range: Expression | Statement[];
        readonly facts: RangeFacts;
    }

    /**
     * Result of 'getRangeToExtract' operation: contains either a range or a list of errors
     */
    export interface RangeToExtract {
        readonly targetRange?: TargetRange;
        readonly errors?: Diagnostic[];
    }

    /*
     * Scopes that can store newly extracted method
     */
    export type Scope = FunctionLikeDeclaration | SourceFile | ModuleBlock | ClassLikeDeclaration;


    /**
     * Result of 'extractRange' operation for a specific scope.
     * Stores either a list of changes that should be applied to extract a range or a list of errors
     */
    export interface ExtractResultForScope {
        readonly scope: Scope;
        readonly scopeDescription: string;
        readonly changes?: FileTextChanges[];
        readonly errors?: Diagnostic[];
    }

    export function getRangeToExtract(sourceFile: SourceFile, span: TextSpan): RangeToExtract {
        let start = getParentNodeInSpan(getTokenAtPosition(sourceFile, span.start, /*includeJsDocComment*/ false), sourceFile, span);
        let end = getParentNodeInSpan(findTokenOnLeftOfPosition(sourceFile, textSpanEnd(span)), sourceFile, span);

        let facts = RangeFacts.None;

        if (!start || !end) {
            // cannot find either start or end node
            return { errors: [createFileDiagnostic(sourceFile, span.start, span.length, Messages.CannotExtractFunction)] };
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
            // and start node is parented by the parent of the end node (because binary operators are left associative)
            // if this is the case - expand the selection to the entire parent of end node (in this case it will be [1 + 2 + 3] + 4)
            const startParent = skipParentheses(start.parent);
            const endParent = skipParentheses(end.parent);
            if (isBinaryExpression(startParent) && isBinaryExpression(endParent) && isNodeDescendantOf(startParent, endParent)) {
                start = end = endParent;
            }
            else {
                // start and end nodes belong to different subtrees
                return { errors: [createFileDiagnostic(sourceFile, span.start, span.length, Messages.CannotExtractFunction)] };
            }
        }
        if (start !== end) {
            // start and end should be statements and parent should be either block or a source file
            if (!isBlockLike(start.parent)) {
                return { errors: [createFileDiagnostic(sourceFile, span.start, span.length, Messages.CannotExtractFunction)] };
            }
            const statements: Statement[] = [];
            for (const n of (<BlockLike>start.parent).statements) {
                if (n === start || statements.length) {
                    const errors = checkNode(n);
                    if (errors) {
                        return { errors };
                    }
                    statements.push(n);
                }
                if (n === end) {
                    break;
                }
            }
            return { targetRange: { range: statements, facts } };
        }
        else {
            const errors = checkNode(start);
            if (errors) {
                return { errors };
            }
            const range = isStatement(start)
                ? [start]
                : <Expression>start;
            return { targetRange: { range, facts } };
        }

        function checkNode(n: Node): Diagnostic[] {
            const enum PermittedJumps {
                None = 0,
                Break = 1 << 0,
                Continue = 1 << 1,
                Return = 1 << 2
            }
            if (!isStatement(n) && !isExpression(n)) {
                return [createDiagnosticForNode(n, Messages.StatementOrExpressionExpected)];
            }

            let errors: Diagnostic[];
            let permittedJumps = PermittedJumps.Return;
            let seenLabels: string[];

            visit(n);

            return errors;

            function visit(n: Node) {
                if (errors) {
                    // already found an error - can stop now
                    return true;
                }
                if (!n || isFunctionLike(n) || isClassLike(n)) {
                    // do not dive into functions or classes
                    return false;
                }
                const savedPermittedJumps = permittedJumps;
                if (n.parent) {
                    switch (n.parent.kind) {
                        case SyntaxKind.IfStatement:
                            if ((<IfStatement>n.parent).thenStatement === n || (<IfStatement>n.parent).elseStatement === n) {
                                // forbid all jumps inside thenStatement or elseStatement
                                permittedJumps = PermittedJumps.None;
                            }
                            break;
                        case SyntaxKind.TryStatement:
                            if ((<TryStatement>n.parent).tryBlock === n) {
                                // forbid all jumps inside try blocks
                                permittedJumps = PermittedJumps.None;
                            }
                            else if ((<TryStatement>n.parent).finallyBlock === n) {
                                // allow unconditional returns from finally blocks
                                permittedJumps = PermittedJumps.Return;
                            }
                            break;
                        case SyntaxKind.CatchClause:
                            if ((<CatchClause>n.parent).block === n) {
                                // forbid all jumps inside the block of catch clause
                                permittedJumps = PermittedJumps.None;
                            }
                            break;
                        case SyntaxKind.CaseClause:
                            if ((<CaseClause>n).expression !== n) {
                                // allow unlabeled break inside case clauses
                                permittedJumps |= PermittedJumps.Break;
                            }
                            break;
                        default:
                            if (isIterationStatement(n.parent, /*lookInLabeledStatements*/ false)) {
                                if ((<IterationStatement>n.parent).statement === n) {
                                    // allow unlabeled break/continue inside loops
                                    permittedJumps |= PermittedJumps.Break | PermittedJumps.Continue;
                                }
                            }
                            break;
                    }
                }
                switch (n.kind) {
                    case SyntaxKind.ThisType:
                    case SyntaxKind.ThisKeyword:
                        facts |= RangeFacts.UsesThis;
                        break;
                    case SyntaxKind.LabeledStatement:
                        {
                            const label = (<LabeledStatement>n).label;
                            (seenLabels || (seenLabels = [])).push(label.text);
                            forEachChild(n, visit);
                            seenLabels.pop();
                            break;
                        }
                    case SyntaxKind.BreakStatement:
                    case SyntaxKind.ContinueStatement:
                        {
                            const label = (<BreakStatement | ContinueStatement>n).label;
                            if (label) {
                                if (!contains(seenLabels, label.text)) {
                                    // attempts to jump to label that is not in range to be extracted
                                    (errors || (errors = [])).push(createDiagnosticForNode(n, Messages.CannotExtractRangeContainingLabeledBreakOrContinueStatementWithTargetOutsideOfTheRange));
                                }
                            }
                            else {
                                if (!(permittedJumps & (SyntaxKind.BreakStatement ? PermittedJumps.Break : PermittedJumps.Continue))) {
                                    // attempt to break or continue in a forbidden context
                                    (errors || (errors = [])).push(createDiagnosticForNode(n, Messages.CannotExtractRangeContainingConditionalBreakOrContinueStatements));
                                }
                            }
                            break;
                        }
                    case SyntaxKind.AwaitExpression:
                        facts |= RangeFacts.IsAsyncFunction;
                        break;
                    case SyntaxKind.YieldExpression:
                        facts |= RangeFacts.IsGenerator;
                        break;
                    case SyntaxKind.ReturnStatement:
                        if (permittedJumps & PermittedJumps.Return) {
                            facts |= RangeFacts.HasReturn;
                        }
                        else {
                            (errors || (errors = [])).push(createDiagnosticForNode(n, Messages.CannotExtractRangeContainingConditionalReturnStatement));
                        }
                        break;
                    default:
                        forEachChild(n, visit);
                        break;
                }

                permittedJumps = savedPermittedJumps;
            }
        }
    }

    export function collectEnclosingScopes(range: TargetRange) {
        let current: Node = isArray(range.range) ? firstOrUndefined(range.range) : range.range;
        // 2. collect enclosing scopes
        if (range.facts & RangeFacts.UsesThis) {
            // if range uses this as keyword or as type inside the class then it can only be extracted to a method of the containing class
            const containingClass = getContainingClass(current);
            if (containingClass) {
                return [containingClass];
            }
        }

        const scopes: Scope[] = [];
        while (current) {
            // We want to find the nearest parent where we can place an "equivalent" sibling to the node we're extracting out of.
            // Walk up to the closest parent of a place where we can logically put a sibling:
            //  * Function declaration
            //  * Class declaration or expression
            //  * Module or source file
            // Note that we don't use isFunctionLike because we don't want to put the extracted closure *inside* a method
            if ((current.kind === SyntaxKind.FunctionDeclaration) || isSourceFile(current) || isModuleBlock(current) || isClassLike(current)) {
                scopes.push(current as FunctionLikeDeclaration);
            }
            current = current.parent;
        }
        return scopes;
    }

    export function extractRange(targetRange: TargetRange, sourceFile: SourceFile, context: RefactorContext): ReadonlyArray<ExtractResultForScope> {
        const scopes = collectEnclosingScopes(targetRange);
        if (scopes.length === 0) {
            return [];
        }
        const enclosingTextRange = getEnclosingTextRange(targetRange, sourceFile);
        const { target, usagesPerScope, errorsPerScope } = collectReadsAndWrites(
            targetRange,
            scopes,
            enclosingTextRange,
            sourceFile,
            context.program.getTypeChecker());

        context.cancellationToken.throwIfCancellationRequested();
        return scopes.map((scope, i) => {
            const errors = errorsPerScope[i];
            if (errors.length) {
                return {
                    scope,
                    scopeDescription: getDescriptionForScope(scope),
                    errors
                };
            }
            return extractFunctionInScope(target, scope, usagesPerScope[i], targetRange, context);
        });
    }

    function getDescriptionForScope(s: Scope) {
        if (isFunctionLike(s)) {
            switch (s.kind) {
                case SyntaxKind.Constructor:
                    return "constructor";
                case SyntaxKind.FunctionExpression:
                    return s.name
                        ? `function expression ${s.name.getText()}`
                        : "anonymous function expression";
                case SyntaxKind.FunctionDeclaration:
                    return `function ${s.name.getText()}`;
                case SyntaxKind.ArrowFunction:
                    return "arrow function";
                case SyntaxKind.MethodDeclaration:
                    return `method ${s.name.getText()}`;
                case SyntaxKind.GetAccessor:
                    return `get ${s.name.getText()}`;
                case SyntaxKind.SetAccessor:
                    return `set ${s.name.getText()}`;
            }
        }
        else if (isModuleBlock(s)) {
            return `namespace ${s.parent.name.getText()}`;
        }
        else if (isClassLike(s)) {
            return s.kind === SyntaxKind.ClassDeclaration
                ? `class ${s.name.text}`
                : s.name.text
                    ? `class expression ${s.name.text}`
                    : "anonymous class expression";
        }
        else if (isSourceFile(s)) {
            return `file '${s.fileName}'`;
        }
        else {
            return "unknown";
        }
    }

    export function extractFunctionInScope(
        node: Node,
        scope: Scope,
        { usages: usagesInScope, substitutions }: ScopeUsages,
        range: TargetRange,
        context: RefactorContext): ExtractResultForScope {

        const checker = context.program.getTypeChecker();

        const changeTracker = textChanges.ChangeTracker.fromRefactorContext(context);
        // TODO: analyze types of usages and introduce type parameters
        // TODO: generate unique function name

        const functionName = createIdentifier("newFunction");
        // TODO: derive type parameters from parameter types
        const typeParameters: TypeParameterDeclaration[] = undefined;
        // TODO: use real type?
        const returnType: TypeNode = undefined;
        const parameters: ParameterDeclaration[] = [];
        const callArguments: Identifier[] = [];
        let writes: UsageEntry[];
        usagesInScope.forEach((value, key) => {
            const paramDecl = createParameter(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                /*dotDotDotToken*/ undefined,
                /*name*/ key,
                /*questionToken*/ undefined,
                createTypeReferenceNode(checker.typeToString(checker.getTypeOfSymbolAtLocation(value.symbol, value.node)), [])
            );
            parameters.push(paramDecl);
            if (value.usage === Usage.Write) {
                (writes || (writes = [])).push(value);
            }
            callArguments.push(createIdentifier(key));
        });

        const { body, returnValueProperty } = transformFunctionBody(node);
        let newFunction: MethodDeclaration | FunctionDeclaration;
        
        if (isClassLike(scope)) {
            // always create private method
            const modifiers: Modifier[] = [createToken(SyntaxKind.PrivateKeyword)];
            if (range.facts & RangeFacts.IsAsyncFunction) {
                modifiers.push(createToken(SyntaxKind.AsyncKeyword));
            }
            newFunction = createMethod(
                /*decorators*/ undefined,
                modifiers,
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
        // insert function at the end of the scope
        changeTracker.insertNodeBefore(context.file, scope.getLastToken(), newFunction, { prefix: context.newLineCharacter, suffix: context.newLineCharacter });

        const newNodes: Node[] = [];
        // replace range with function call
        let call: Expression = createCall(
            isClassLike(scope) ? createPropertyAccess(createThis(), functionName) : functionName,
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
                assignments.push(createShorthandPropertyAssignment(returnValueProperty));
            }
            // propagate writes back
            newNodes.push(createStatement(createBinary(createObjectLiteral(assignments), SyntaxKind.EqualsToken, call)));
            if (returnValueProperty) {
                newNodes.push(createReturn(createIdentifier(returnValueProperty)));
            }
        }
        else {
            if (range.facts & RangeFacts.HasReturn) {
                newNodes.push(createReturn(call));
            }
            else if (isArray(range.range)) {
                newNodes.push(createStatement(call));
            }
            else {
                newNodes.push(call);
            }
        }
        changeTracker.replaceNodes(
            context.file,
            range.range,
            newNodes,
            {
                nodesSeparator: context.newLineCharacter,
                suffix: isArray(range.range) ? context.newLineCharacter : undefined // insert newline only when replacing statements
            });

        return {
            scope,
            scopeDescription: getDescriptionForScope(scope),
            changes: changeTracker.getChanges()
        };

        function getPropertyAssignmentsForWrites(writes: UsageEntry[]) {
            return writes.map(w => createShorthandPropertyAssignment(w.symbol.name));
        }

        function generateReturnValueProperty() {
            // TODO: generate unique property name
            return "__return";
        }

        function transformFunctionBody(n: Node) {
            if (isBlock(n) && !writes && substitutions.size === 0) {
                // already block, no writes to propagate back, no substitutions - can use node as is
                return { body: n, returnValueProperty: undefined };
            }
            let returnValueProperty: string;
            const statements = createNodeArray(isBlock(n) ? n.statements.slice(0) : [isStatement(n) ? n : createStatement(<Expression>n)]);
            // rewrite body if either there are writes that should be propagated back via return statements or there are substitutions
            if (writes || substitutions.size) {
                const rewrittenStatements = visitNodes(statements, visitor);
                if (writes && !(range.facts & RangeFacts.HasReturn)) {
                    // add return at the end to propagate writes back in case if control flow falls out of the function body
                    // it is ok to know that range has at least one return since it we only allow unconditional returns
                    rewrittenStatements.push(createReturn(createObjectLiteral(getPropertyAssignmentsForWrites(writes))));
                }
                return { body: createBlock(rewrittenStatements), returnValueProperty: returnValueProperty };
            }
            else {
                return { body: createBlock(statements), returnValueProperty: undefined };
            }

            function visitor(node: Node): VisitResult<Node> {
                if (node.kind === SyntaxKind.ReturnStatement && writes) {
                    const assignments: ObjectLiteralElementLike[] = getPropertyAssignmentsForWrites(writes);
                    if ((<ReturnStatement>node).expression) {
                        if (!returnValueProperty) {
                            returnValueProperty = generateReturnValueProperty();
                        }
                        assignments.push(createPropertyAssignment(returnValueProperty, visitNode((<ReturnStatement>node).expression, visitor)));
                    }
                    return createReturn(createObjectLiteral(assignments));
                }
                else {
                    const substitution = substitutions.get(getNodeId(node).toString());
                    return substitution || visitEachChild(node, visitor, nullTransformationContext);
                }
            }
        }
    }

    const nullTransformationContext: TransformationContext = {
        enableEmitNotification: noop,
        enableSubstitution: noop,
        endLexicalEnvironment: () => undefined,
        getCompilerOptions: notImplemented,
        getEmitHost: notImplemented,
        getEmitResolver: notImplemented,
        hoistFunctionDeclaration: noop,
        hoistVariableDeclaration: noop,
        isEmitNotificationEnabled: notImplemented,
        isSubstitutionEnabled: notImplemented,
        onEmitNode: noop,
        onSubstituteNode: notImplemented,
        readEmitHelpers: notImplemented,
        requestEmitHelper: noop,
        resumeLexicalEnvironment: noop,
        startLexicalEnvironment: noop,
        suspendLexicalEnvironment: noop
    };


    function isModuleBlock(n: Node): n is ModuleBlock {
        return n.kind === SyntaxKind.ModuleBlock;
    }

    function isReadonlyArray(v: any): v is ReadonlyArray<any> {
        return isArray(v);
    }

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
        usages: Map<UsageEntry>;
        substitutions: Map<Node>;
    }

    function collectReadsAndWrites(
        targetRange: TargetRange,
        scopes: Scope[],
        enclosingTextRange: TextRange,
        sourceFile: SourceFile,
        checker: TypeChecker) {

        const usagesPerScope: ScopeUsages[] = [];
        const substitutionsPerScope: Map<Node>[] = [];
        const errorsPerScope: Diagnostic[][] = [];

        // initialize results
        for (const _ of scopes) {
            usagesPerScope.push({ usages: createMap<UsageEntry>(), substitutions: createMap<Expression>() });
            substitutionsPerScope.push(createMap<Expression>());
            errorsPerScope.push([]);
        }
        const seenUsages = createMap<Usage>();

        let valueUsage = Usage.Read;

        const target = isReadonlyArray(targetRange.range) ? createBlock(<Statement[]>targetRange.range) : targetRange.range;

        forEachChild(target, collectUsages);

        return { target, usagesPerScope, errorsPerScope };

        function collectUsages(n: Node) {
            if (isAssignmentExpression(n)) {
                const savedValueUsage = valueUsage;
                // use 'write' as default usage for values
                valueUsage = Usage.Write;
                collectUsages(n.left);
                valueUsage = savedValueUsage;

                collectUsages(n.right);
            }
            else if (isUnaryExpressionWithWrite(n)) {
                const savedValueUsage = valueUsage;
                valueUsage = Usage.Write;
                collectUsages(n.operand);
                valueUsage = savedValueUsage;
            }
            else if (isIdentifier(n)) {
                if (!n.parent) {
                    return;
                }
                if (isQualifiedName(n.parent) && n !== n.parent.left) {
                    return;
                }
                if ((isPropertyAccessExpression(n.parent) || isElementAccessExpression(n.parent)) && n !== n.parent.expression) {
                    return;
                }
                recordUsage(n, valueUsage, /*isTypeNode*/ isPartOfTypeNode(n));
            }
            else {
                forEachChild(n, collectUsages);
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

        function recordUsagebySymbol(n: Identifier, usage: Usage, isTypeName: boolean) {
            const symbol = checker.getSymbolAtLocation(n);
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
                    const prevEntry = perScope.usages.get(n.text);
                    if (prevEntry) {
                        perScope.usages.set(n.text, { usage, symbol, node: n });
                    }
                }
                return symbolId;
            }
            // find first declaration in this file
            const declInFile = find(symbol.getDeclarations(), d => d.getSourceFile() === sourceFile);
            if (!declInFile) {
                return undefined;
            }
            if (rangeContainsRange(enclosingTextRange, declInFile)) {
                // declaration is located in range to be extracted - do nothing
                return undefined;
            }
            if (targetRange.facts & RangeFacts.IsGenerator && usage === Usage.Write) {
                // this is write to a reference located outside of the target scope and range is extracted into generator
                // currently this is unsupported scenario
                for (const errors of errorsPerScope) {
                    errors.push(createDiagnosticForNode(n, Messages.CannotExtractRangeThatContainsWritesToReferencesLocatedOutsideOfTheTargetRangeInGenerators));
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
                        errorsPerScope[i].push(createDiagnosticForNode(n, Messages.TypeWillNotBeVisibleInTheNewScope));
                    }
                    else {
                        usagesPerScope[i].usages.set(n.text, { usage, symbol, node: n });
                    }
                }
            }
            return symbolId;
        }

        function tryReplaceWithQualifiedNameOrPropertyAccess(s: Symbol, scopeDecl: Node, isTypeNode: boolean): PropertyAccessExpression | EntityName {
            if (!s) {
                return undefined;
            }
            if (s.getDeclarations().some(d => d.parent === scopeDecl)) {
                return createIdentifier(s.name);
            }
            const prefix = tryReplaceWithQualifiedNameOrPropertyAccess(s.parent, scopeDecl, isTypeNode);
            if (prefix === undefined) {
                return undefined;
            }
            return isTypeNode ? createQualifiedName(<EntityName>prefix, createIdentifier(s.name)) : createPropertyAccess(<Expression>prefix, s.name);
        }

        function isUnaryExpressionWithWrite(n: Node): n is PrefixUnaryExpression | PostfixUnaryExpression {
            switch (n.kind) {
                case SyntaxKind.PostfixUnaryExpression:
                    return true;
                case SyntaxKind.PrefixUnaryExpression:
                    return (<PrefixUnaryExpression>n).operator === SyntaxKind.PlusPlusToken ||
                        (<PrefixUnaryExpression>n).operator === SyntaxKind.MinusMinusToken;
                default:
                    return false;
            }
        }
    }

    function getParentNodeInSpan(n: Node, file: SourceFile, span: TextSpan): Node {
        while (n) {
            if (!n.parent) {
                return undefined;
            }
            if (isSourceFile(n.parent) || !spanContainsNode(span, n.parent, file)) {
                return n;
            }

            n = n.parent;
        }
    }

    function spanContainsNode(span: TextSpan, node: Node, file: SourceFile): boolean {
        return textSpanContainsPosition(span, node.getStart(file)) &&
            node.getEnd() <= textSpanEnd(span);
    }

    function isBlockLike(n: Node): n is BlockLike {
        switch (n.kind) {
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
