/* @internal */
namespace ts.DocumentHighlights {
    export function getDocumentHighlights(program: Program, cancellationToken: CancellationToken, sourceFile: SourceFile, position: number, sourceFilesToSearch: ReadonlyArray<SourceFile>): DocumentHighlights[] | undefined {
        const node = getTouchingPropertyName(sourceFile, position, /*includeJsDocComment*/ true);

        if (node.parent && (isJsxOpeningElement(node.parent) && node.parent.tagName === node || isJsxClosingElement(node.parent))) {
            // For a JSX element, just highlight the matching tag, not all references.
            const { openingElement, closingElement } = node.parent.parent;
            const highlightSpans = [openingElement, closingElement].map(({ tagName }) => getHighlightSpanForNode(tagName, sourceFile));
            return [{ fileName: sourceFile.fileName, highlightSpans }];
        }

        return getSemanticDocumentHighlights(position, node, program, cancellationToken, sourceFilesToSearch) || getSyntacticDocumentHighlights(node, sourceFile);
    }

    function getHighlightSpanForNode(node: Node, sourceFile: SourceFile): HighlightSpan {
        return {
            fileName: sourceFile.fileName,
            textSpan: createTextSpanFromNode(node, sourceFile),
            kind: HighlightSpanKind.none
        };
    }

    function getSemanticDocumentHighlights(position: number, node: Node, program: Program, cancellationToken: CancellationToken, sourceFilesToSearch: ReadonlyArray<SourceFile>): DocumentHighlights[] | undefined {
        const sourceFilesSet = arrayToSet(sourceFilesToSearch, f => f.fileName);
        const referenceEntries = FindAllReferences.getReferenceEntriesForNode(position, node, program, sourceFilesToSearch, cancellationToken, /*options*/ undefined, sourceFilesSet);
        if (!referenceEntries) return undefined;
        const map = arrayToMultiMap(referenceEntries.map(FindAllReferences.toHighlightSpan), e => e.fileName, e => e.span);
        return arrayFrom(map.entries(), ([fileName, highlightSpans]) => {
            if (!sourceFilesSet.has(fileName)) {
                Debug.assert(program.redirectTargetsSet.has(fileName));
                const redirectTarget = program.getSourceFile(fileName);
                const redirect = find(sourceFilesToSearch, f => f.redirectInfo && f.redirectInfo.redirectTarget === redirectTarget)!;
                fileName = redirect.fileName;
                Debug.assert(sourceFilesSet.has(fileName));
            }
            return { fileName, highlightSpans };
        });
    }

    function getSyntacticDocumentHighlights(node: Node, sourceFile: SourceFile): DocumentHighlights[] {
        const highlightSpans = getHighlightSpans(node, sourceFile);
        return highlightSpans && [{ fileName: sourceFile.fileName, highlightSpans }];
    }

    function getHighlightSpans(node: Node, sourceFile: SourceFile): HighlightSpan[] | undefined {
        switch (node.kind) {
            case SyntaxKind.IfKeyword:
            case SyntaxKind.ElseKeyword:
                return isIfStatement(node.parent) ? getIfElseOccurrences(node.parent, sourceFile) : undefined;
            case SyntaxKind.ReturnKeyword:
                return useParent(node.parent, isReturnStatement, getReturnOccurrences);
            case SyntaxKind.ThrowKeyword:
                return useParent(node.parent, isThrowStatement, getThrowOccurrences);
            case SyntaxKind.TryKeyword:
            case SyntaxKind.CatchKeyword:
            case SyntaxKind.FinallyKeyword:
                const tryStatement = node.kind === SyntaxKind.CatchKeyword ? node.parent.parent : node.parent;
                return useParent(tryStatement, isTryStatement, getTryCatchFinallyOccurrences);
            case SyntaxKind.SwitchKeyword:
                return useParent(node.parent, isSwitchStatement, getSwitchCaseDefaultOccurrences);
            case SyntaxKind.CaseKeyword:
            case SyntaxKind.DefaultKeyword:
                return useParent(node.parent.parent.parent, isSwitchStatement, getSwitchCaseDefaultOccurrences);
            case SyntaxKind.BreakKeyword:
            case SyntaxKind.ContinueKeyword:
                return useParent(node.parent, isBreakOrContinueStatement, getBreakOrContinueStatementOccurrences);
            case SyntaxKind.ForKeyword:
            case SyntaxKind.WhileKeyword:
            case SyntaxKind.DoKeyword:
                return useParent(node.parent, (n): n is IterationStatement => isIterationStatement(n, /*lookInLabeledStatements*/ true), getLoopBreakContinueOccurrences);
            case SyntaxKind.ConstructorKeyword:
                return getFromAllDeclarations(isConstructorDeclaration, [SyntaxKind.ConstructorKeyword]);
            case SyntaxKind.GetKeyword:
            case SyntaxKind.SetKeyword:
                return getFromAllDeclarations(isAccessor, [SyntaxKind.GetKeyword, SyntaxKind.SetKeyword]);
            case SyntaxKind.AwaitKeyword:
                return useParent(node.parent, isAwaitExpression, getAsyncAndAwaitOccurrences);
            case SyntaxKind.AsyncKeyword:
                return highlightSpans(getAsyncAndAwaitOccurrences(node));
            default:
                return isModifierKind(node.kind) && (isDeclaration(node.parent) || isVariableStatement(node.parent))
                    ? highlightSpans(getModifierOccurrences(node.kind, node.parent))
                    : undefined;
        }

        function getFromAllDeclarations<T extends Node>(nodeTest: (node: Node) => node is T, keywords: ReadonlyArray<SyntaxKind>): HighlightSpan[] | undefined {
            return useParent(node.parent, nodeTest, decl => mapDefined(decl.symbol.declarations, d =>
                nodeTest(d) ? find(d.getChildren(sourceFile), c => contains(keywords, c.kind)) : undefined));
        }

        function useParent<T extends Node>(node: Node, nodeTest: (node: Node) => node is T, getNodes: (node: T, sourceFile: SourceFile) => ReadonlyArray<Node> | undefined): HighlightSpan[] | undefined {
            return nodeTest(node) ? highlightSpans(getNodes(node, sourceFile)) : undefined;
        }

        function highlightSpans(nodes: ReadonlyArray<Node> | undefined): HighlightSpan[] | undefined {
            return nodes && nodes.map(node => getHighlightSpanForNode(node, sourceFile));
        }
    }

    /**
     * Aggregates all throw-statements within this node *without* crossing
     * into function boundaries and try-blocks with catch-clauses.
     */
    function aggregateOwnedThrowStatements(node: Node): ReadonlyArray<ThrowStatement> | undefined {
        if (isThrowStatement(node)) {
            return [node];
        }
        else if (isTryStatement(node)) {
            // Exceptions thrown within a try block lacking a catch clause are "owned" in the current context.
            return concatenate(
                node.catchClause ? aggregateOwnedThrowStatements(node.catchClause) : node.tryBlock && aggregateOwnedThrowStatements(node.tryBlock),
                aggregateOwnedThrowStatements(node.finallyBlock));
        }
        // Do not cross function boundaries.
        return isFunctionLike(node) ? undefined : flatMapChildren(node, aggregateOwnedThrowStatements);
    }

    /**
     * For lack of a better name, this function takes a throw statement and returns the
     * nearest ancestor that is a try-block (whose try statement has a catch clause),
     * function-block, or source file.
     */
    function getThrowStatementOwner(throwStatement: ThrowStatement): Node {
        let child: Node = throwStatement;

        while (child.parent) {
            const parent = child.parent;

            if (isFunctionBlock(parent) || parent.kind === SyntaxKind.SourceFile) {
                return parent;
            }

            // A throw-statement is only owned by a try-statement if the try-statement has
            // a catch clause, and if the throw-statement occurs within the try block.
            if (isTryStatement(parent) && parent.tryBlock === child && parent.catchClause) {
                return child;
            }

            child = parent;
        }

        return undefined;
    }

    function aggregateAllBreakAndContinueStatements(node: Node): ReadonlyArray<BreakOrContinueStatement> | undefined {
        return isBreakOrContinueStatement(node) ? [node] : isFunctionLike(node) ? undefined : flatMapChildren(node, aggregateAllBreakAndContinueStatements);
    }

    function flatMapChildren<T>(node: Node, cb: (child: Node) => ReadonlyArray<T> | T | undefined): ReadonlyArray<T> {
        const result: T[] = [];
        node.forEachChild(child => {
            const value = cb(child);
            if (value !== undefined) {
                result.push(...toArray(value));
            }
        });
        return result;
    }

    function ownsBreakOrContinueStatement(owner: Node, statement: BreakOrContinueStatement): boolean {
        const actualOwner = getBreakOrContinueOwner(statement);

        return actualOwner && actualOwner === owner;
    }

    function getBreakOrContinueOwner(statement: BreakOrContinueStatement): Node {
        return findAncestor(statement, node => {
            switch (node.kind) {
                case SyntaxKind.SwitchStatement:
                    if (statement.kind === SyntaxKind.ContinueStatement) {
                        return false;
                    }
                    // falls through
                case SyntaxKind.ForStatement:
                case SyntaxKind.ForInStatement:
                case SyntaxKind.ForOfStatement:
                case SyntaxKind.WhileStatement:
                case SyntaxKind.DoStatement:
                    return !statement.label || isLabeledBy(node, statement.label.escapedText);
                default:
                    // Don't cross function boundaries.
                    // TODO: GH#20090
                    return (isFunctionLike(node) && "quit") as false | "quit";
            }
        });
    }

    function getModifierOccurrences(modifier: SyntaxKind, declaration: Node): Node[] {
        const modifierFlag = modifierToFlag(modifier);
        return mapDefined(getNodesToSearchForModifier(declaration, modifierFlag), node => {
            if (getModifierFlags(node) & modifierFlag) {
                const mod = find(node.modifiers, m => m.kind === modifier);
                Debug.assert(!!mod);
                return mod;
            }
        });
    }

    function getNodesToSearchForModifier(declaration: Node, modifierFlag: ModifierFlags): ReadonlyArray<Node> {
        // Types of node whose children might have modifiers.
        const container = declaration.parent as ModuleBlock | SourceFile | Block | CaseClause | DefaultClause | ConstructorDeclaration | MethodDeclaration | FunctionDeclaration | ClassLikeDeclaration;
        switch (container.kind) {
            case SyntaxKind.ModuleBlock:
            case SyntaxKind.SourceFile:
            case SyntaxKind.Block:
            case SyntaxKind.CaseClause:
            case SyntaxKind.DefaultClause:
                // Container is either a class declaration or the declaration is a classDeclaration
                if (modifierFlag & ModifierFlags.Abstract && isClassDeclaration(declaration)) {
                    return [...declaration.members, declaration];
                }
                else {
                    return container.statements;
                }
            case SyntaxKind.Constructor:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.FunctionDeclaration: {
                return [...container.parameters, ...(isClassLike(container.parent) ? container.parent.members : [])];
            }
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.ClassExpression:
                const nodes = container.members;

                // If we're an accessibility modifier, we're in an instance member and should search
                // the constructor's parameter list for instance members as well.
                if (modifierFlag & ModifierFlags.AccessibilityModifier) {
                    const constructor = find(container.members, isConstructorDeclaration);
                    if (constructor) {
                        return [...nodes, ...constructor.parameters];
                    }
                }
                else if (modifierFlag & ModifierFlags.Abstract) {
                    return [...nodes, container];
                }
                return nodes;
            default:
                Debug.assertNever(container, "Invalid container kind.");
        }
    }

    function pushKeywordIf(keywordList: Push<Node>, token: Node, ...expected: SyntaxKind[]): boolean {
        if (token && contains(expected, token.kind)) {
            keywordList.push(token);
            return true;
        }

        return false;
    }

    function getLoopBreakContinueOccurrences(loopNode: IterationStatement): Node[] {
        const keywords: Node[] = [];

        if (pushKeywordIf(keywords, loopNode.getFirstToken(), SyntaxKind.ForKeyword, SyntaxKind.WhileKeyword, SyntaxKind.DoKeyword)) {
            // If we succeeded and got a do-while loop, then start looking for a 'while' keyword.
            if (loopNode.kind === SyntaxKind.DoStatement) {
                const loopTokens = loopNode.getChildren();

                for (let i = loopTokens.length - 1; i >= 0; i--) {
                    if (pushKeywordIf(keywords, loopTokens[i], SyntaxKind.WhileKeyword)) {
                        break;
                    }
                }
            }
        }

        forEach(aggregateAllBreakAndContinueStatements(loopNode.statement), statement => {
            if (ownsBreakOrContinueStatement(loopNode, statement)) {
                pushKeywordIf(keywords, statement.getFirstToken(), SyntaxKind.BreakKeyword, SyntaxKind.ContinueKeyword);
            }
        });

        return keywords;
    }

    function getBreakOrContinueStatementOccurrences(breakOrContinueStatement: BreakOrContinueStatement): Node[] {
        const owner = getBreakOrContinueOwner(breakOrContinueStatement);

        if (owner) {
            switch (owner.kind) {
                case SyntaxKind.ForStatement:
                case SyntaxKind.ForInStatement:
                case SyntaxKind.ForOfStatement:
                case SyntaxKind.DoStatement:
                case SyntaxKind.WhileStatement:
                    return getLoopBreakContinueOccurrences(<IterationStatement>owner);
                case SyntaxKind.SwitchStatement:
                    return getSwitchCaseDefaultOccurrences(<SwitchStatement>owner);

            }
        }

        return undefined;
    }

    function getSwitchCaseDefaultOccurrences(switchStatement: SwitchStatement): Node[] {
        const keywords: Node[] = [];

        pushKeywordIf(keywords, switchStatement.getFirstToken(), SyntaxKind.SwitchKeyword);

        // Go through each clause in the switch statement, collecting the 'case'/'default' keywords.
        forEach(switchStatement.caseBlock.clauses, clause => {
            pushKeywordIf(keywords, clause.getFirstToken(), SyntaxKind.CaseKeyword, SyntaxKind.DefaultKeyword);

            forEach(aggregateAllBreakAndContinueStatements(clause), statement => {
                if (ownsBreakOrContinueStatement(switchStatement, statement)) {
                    pushKeywordIf(keywords, statement.getFirstToken(), SyntaxKind.BreakKeyword);
                }
            });
        });

        return keywords;
    }

    function getTryCatchFinallyOccurrences(tryStatement: TryStatement, sourceFile: SourceFile): Node[] {
        const keywords: Node[] = [];

        pushKeywordIf(keywords, tryStatement.getFirstToken(), SyntaxKind.TryKeyword);

        if (tryStatement.catchClause) {
            pushKeywordIf(keywords, tryStatement.catchClause.getFirstToken(), SyntaxKind.CatchKeyword);
        }

        if (tryStatement.finallyBlock) {
            const finallyKeyword = findChildOfKind(tryStatement, SyntaxKind.FinallyKeyword, sourceFile);
            pushKeywordIf(keywords, finallyKeyword, SyntaxKind.FinallyKeyword);
        }

        return keywords;
    }

    function getThrowOccurrences(throwStatement: ThrowStatement, sourceFile: SourceFile): Node[] {
        const owner = getThrowStatementOwner(throwStatement);

        if (!owner) {
            return undefined;
        }

        const keywords: Node[] = [];

        forEach(aggregateOwnedThrowStatements(owner), throwStatement => {
            keywords.push(findChildOfKind(throwStatement, SyntaxKind.ThrowKeyword, sourceFile)!);
        });

        // If the "owner" is a function, then we equate 'return' and 'throw' statements in their
        // ability to "jump out" of the function, and include occurrences for both.
        if (isFunctionBlock(owner)) {
            forEachReturnStatement(<Block>owner, returnStatement => {
                keywords.push(findChildOfKind(returnStatement, SyntaxKind.ReturnKeyword, sourceFile)!);
            });
        }

        return keywords;
    }

    function getReturnOccurrences(returnStatement: ReturnStatement, sourceFile: SourceFile): Node[] | undefined {
        const func = <FunctionLikeDeclaration>getContainingFunction(returnStatement);
        if (!func) {
            return undefined;
        }

        const keywords: Node[] = [];
        forEachReturnStatement(cast(func.body, isBlock), returnStatement => {
            keywords.push(findChildOfKind(returnStatement, SyntaxKind.ReturnKeyword, sourceFile)!);
        });

        // Include 'throw' statements that do not occur within a try block.
        forEach(aggregateOwnedThrowStatements(func.body), throwStatement => {
            keywords.push(findChildOfKind(throwStatement, SyntaxKind.ThrowKeyword, sourceFile)!);
        });

        return keywords;
    }

    function getAsyncAndAwaitOccurrences(node: Node): Node[] | undefined {
        const func = <FunctionLikeDeclaration>getContainingFunction(node);
        if (!func) {
            return undefined;
        }

        const keywords: Node[] = [];

        if (func.modifiers) {
            func.modifiers.forEach(modifier => {
                pushKeywordIf(keywords, modifier, SyntaxKind.AsyncKeyword);
            });
        }

        forEachChild(func, aggregate);

        return keywords;

        function aggregate(node: Node): void {
            if (isAwaitExpression(node)) {
                pushKeywordIf(keywords, node.getFirstToken(), SyntaxKind.AwaitKeyword);
            }
            // Do not cross function boundaries.
            if (!isFunctionLike(node) && !isClassLike(node) && !isInterfaceDeclaration(node) && !isModuleDeclaration(node) && !isTypeAliasDeclaration(node) && !isTypeNode(node)) {
                forEachChild(node, aggregate);
            }
        }
    }

    function getIfElseOccurrences(ifStatement: IfStatement, sourceFile: SourceFile): HighlightSpan[] {
        const keywords = getIfElseKeywords(ifStatement, sourceFile);
        const result: HighlightSpan[] = [];

        // We'd like to highlight else/ifs together if they are only separated by whitespace
        // (i.e. the keywords are separated by no comments, no newlines).
        for (let i = 0; i < keywords.length; i++) {
            if (keywords[i].kind === SyntaxKind.ElseKeyword && i < keywords.length - 1) {
                const elseKeyword = keywords[i];
                const ifKeyword = keywords[i + 1]; // this *should* always be an 'if' keyword.

                let shouldCombineElseAndIf = true;

                // Avoid recalculating getStart() by iterating backwards.
                for (let j = ifKeyword.getStart(sourceFile) - 1; j >= elseKeyword.end; j--) {
                    if (!isWhiteSpaceSingleLine(sourceFile.text.charCodeAt(j))) {
                        shouldCombineElseAndIf = false;
                        break;
                    }
                }

                if (shouldCombineElseAndIf) {
                    result.push({
                        fileName: sourceFile.fileName,
                        textSpan: createTextSpanFromBounds(elseKeyword.getStart(), ifKeyword.end),
                        kind: HighlightSpanKind.reference
                    });
                    i++; // skip the next keyword
                    continue;
                }
            }

            // Ordinary case: just highlight the keyword.
            result.push(getHighlightSpanForNode(keywords[i], sourceFile));
        }

        return result;
    }

    function getIfElseKeywords(ifStatement: IfStatement, sourceFile: SourceFile): Node[] {
        const keywords: Node[] = [];

        // Traverse upwards through all parent if-statements linked by their else-branches.
        while (isIfStatement(ifStatement.parent) && ifStatement.parent.elseStatement === ifStatement) {
            ifStatement = ifStatement.parent;
        }

        // Now traverse back down through the else branches, aggregating if/else keywords of if-statements.
        while (true) {
            const children = ifStatement.getChildren(sourceFile);
            pushKeywordIf(keywords, children[0], SyntaxKind.IfKeyword);

            // Generally the 'else' keyword is second-to-last, so we traverse backwards.
            for (let i = children.length - 1; i >= 0; i--) {
                if (pushKeywordIf(keywords, children[i], SyntaxKind.ElseKeyword)) {
                    break;
                }
            }

            if (!ifStatement.elseStatement || !isIfStatement(ifStatement.elseStatement)) {
                break;
            }

            ifStatement = ifStatement.elseStatement;
        }

        return keywords;
    }

    /**
     * Whether or not a 'node' is preceded by a label of the given string.
     * Note: 'node' cannot be a SourceFile.
     */
    function isLabeledBy(node: Node, labelName: __String): boolean {
        return !!findAncestor(node.parent, owner => !isLabeledStatement(owner) ? "quit" : owner.label.escapedText === labelName);
    }
}
