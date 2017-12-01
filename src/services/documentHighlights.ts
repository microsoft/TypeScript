/* @internal */
namespace ts.DocumentHighlights {
    export function getDocumentHighlights(program: Program, cancellationToken: CancellationToken, sourceFile: SourceFile, position: number, sourceFilesToSearch: SourceFile[]): DocumentHighlights[] | undefined {
        const node = getTouchingWord(sourceFile, position, /*includeJsDocComment*/ true);
        // Note that getTouchingWord indicates failure by returning the sourceFile node.
        if (node === sourceFile) return undefined;

        Debug.assert(node.parent !== undefined);

        if (isJsxOpeningElement(node.parent) && node.parent.tagName === node || isJsxClosingElement(node.parent)) {
            // For a JSX element, just highlight the matching tag, not all references.
            const { openingElement, closingElement } = node.parent.parent;
            const highlightSpans = [openingElement, closingElement].map(({ tagName }) => getHighlightSpanForNode(tagName, sourceFile));
            return [{ fileName: sourceFile.fileName, highlightSpans }];
        }

        return getSemanticDocumentHighlights(node, program, cancellationToken, sourceFilesToSearch) || getSyntacticDocumentHighlights(node, sourceFile);
    }

    function getHighlightSpanForNode(node: Node, sourceFile: SourceFile): HighlightSpan {
        return {
            fileName: sourceFile.fileName,
            textSpan: createTextSpanFromNode(node, sourceFile),
            kind: HighlightSpanKind.none
        };
    }

    function getSemanticDocumentHighlights(node: Node, program: Program, cancellationToken: CancellationToken, sourceFilesToSearch: SourceFile[]): DocumentHighlights[] {
        const referenceEntries = FindAllReferences.getReferenceEntriesForNode(node, program, sourceFilesToSearch, cancellationToken);
        return referenceEntries && convertReferencedSymbols(referenceEntries);
    }

    function convertReferencedSymbols(referenceEntries: FindAllReferences.Entry[]): DocumentHighlights[] {
        const fileNameToDocumentHighlights = createMap<HighlightSpan[]>();
        for (const entry of referenceEntries) {
            const { fileName, span } = FindAllReferences.toHighlightSpan(entry);
            let highlightSpans = fileNameToDocumentHighlights.get(fileName);
            if (!highlightSpans) {
                fileNameToDocumentHighlights.set(fileName, highlightSpans = []);
            }
            highlightSpans.push(span);
        }

        return arrayFrom(fileNameToDocumentHighlights.entries(), ([fileName, highlightSpans ]) => ({ fileName, highlightSpans }));
    }

    function getSyntacticDocumentHighlights(node: Node, sourceFile: SourceFile): DocumentHighlights[] {
        const highlightSpans = getHighlightSpans(node, sourceFile);
        if (!highlightSpans || highlightSpans.length === 0) {
            return undefined;
        }

        return [{ fileName: sourceFile.fileName, highlightSpans }];
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
                return useParent(node.parent, isConstructorDeclaration, getConstructorOccurrences);
            case SyntaxKind.GetKeyword:
            case SyntaxKind.SetKeyword:
                return useParent(node.parent, isAccessor, getGetAndSetOccurrences);
            default:
                return isModifierKind(node.kind) && (isDeclaration(node.parent) || isVariableStatement(node.parent))
                    ? highlightSpans(getModifierOccurrences(node.kind, node.parent))
                    : undefined;
        }

        function useParent<T extends Node>(node: Node, nodeTest: (node: Node) => node is T, getNodes: (node: T, sourceFile: SourceFile) => Node[] | undefined): HighlightSpan[] | undefined {
            return nodeTest(node) ? highlightSpans(getNodes(node, sourceFile)) : undefined;
        }

        function highlightSpans(nodes: Node[] | undefined): HighlightSpan[] | undefined {
            return nodes && nodes.map(node => getHighlightSpanForNode(node, sourceFile));
        }
    }

    /**
     * Aggregates all throw-statements within this node *without* crossing
     * into function boundaries and try-blocks with catch-clauses.
     */
    function aggregateOwnedThrowStatements(node: Node): ThrowStatement[] {
        const statementAccumulator: ThrowStatement[] = [];
        aggregate(node);
        return statementAccumulator;

        function aggregate(node: Node): void {
            if (isThrowStatement(node)) {
                statementAccumulator.push(node);
            }
            else if (isTryStatement(node)) {
                if (node.catchClause) {
                    aggregate(node.catchClause);
                }
                else {
                    // Exceptions thrown within a try block lacking a catch clause
                    // are "owned" in the current context.
                    aggregate(node.tryBlock);
                }

                if (node.finallyBlock) {
                    aggregate(node.finallyBlock);
                }
            }
            // Do not cross function boundaries.
            else if (!isFunctionLike(node)) {
                forEachChild(node, aggregate);
            }
        }
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
            if (parent.kind === SyntaxKind.TryStatement) {
                const tryStatement = <TryStatement>parent;

                if (tryStatement.tryBlock === child && tryStatement.catchClause) {
                    return child;
                }
            }

            child = parent;
        }

        return undefined;
    }

    function aggregateAllBreakAndContinueStatements(node: Node): BreakOrContinueStatement[] {
        const statementAccumulator: BreakOrContinueStatement[] = [];
        aggregate(node);
        return statementAccumulator;

        function aggregate(node: Node): void {
            if (node.kind === SyntaxKind.BreakStatement || node.kind === SyntaxKind.ContinueStatement) {
                statementAccumulator.push(<BreakOrContinueStatement>node);
            }
            // Do not cross function boundaries.
            else if (!isFunctionLike(node)) {
                forEachChild(node, aggregate);
            }
        }
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
                    return !statement.label || isLabeledBy(node, statement.label.text);
                default:
                    // Don't cross function boundaries.
                    // TODO: GH#20090
                    return (isFunctionLike(node) && "quit") as false | "quit";
            }
        });
    }

    function getModifierOccurrences(modifier: SyntaxKind, declaration: Node): Node[] {
        // Make sure we only highlight the keyword when it makes sense to do so.
        if (!isLegalModifier(modifier, declaration)) {
            return undefined;
        }

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
        const container = declaration.parent;
        switch (container.kind) {
            case SyntaxKind.ModuleBlock:
            case SyntaxKind.SourceFile:
            case SyntaxKind.Block:
            case SyntaxKind.CaseClause:
            case SyntaxKind.DefaultClause:
                // Container is either a class declaration or the declaration is a classDeclaration
                if (modifierFlag & ModifierFlags.Abstract) {
                    return [...(<ClassDeclaration>declaration).members, declaration];
                }
                else {
                    return (<ModuleBlock | SourceFile | Block | CaseClause | DefaultClause>container).statements;
                }
            case SyntaxKind.Constructor:
                return [...(<ConstructorDeclaration>container).parameters, ...(<ClassDeclaration>container.parent).members];
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.ClassExpression:
                const nodes = (<ClassLikeDeclaration>container).members;

                // If we're an accessibility modifier, we're in an instance member and should search
                // the constructor's parameter list for instance members as well.
                if (modifierFlag & ModifierFlags.AccessibilityModifier) {
                    const constructor = find((<ClassLikeDeclaration>container).members, isConstructorDeclaration);
                    if (constructor) {
                        return [...nodes, ...constructor.parameters];
                    }
                }
                else if (modifierFlag & ModifierFlags.Abstract) {
                    return [...nodes, container];
                }
                return nodes;
            default:
                Debug.fail("Invalid container kind.");
        }
    }

    function isLegalModifier(modifier: SyntaxKind, declaration: Node): boolean {
        const container = declaration.parent;
        switch (modifier) {
            case SyntaxKind.PrivateKeyword:
            case SyntaxKind.ProtectedKeyword:
            case SyntaxKind.PublicKeyword:
                switch (container.kind) {
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.ClassExpression:
                        return true;
                    case SyntaxKind.Constructor:
                        return declaration.kind === SyntaxKind.Parameter;
                    default:
                        return false;
                }
            case SyntaxKind.StaticKeyword:
                return container.kind === SyntaxKind.ClassDeclaration || container.kind === SyntaxKind.ClassExpression;
            case SyntaxKind.ExportKeyword:
            case SyntaxKind.DeclareKeyword:
                return container.kind === SyntaxKind.ModuleBlock || container.kind === SyntaxKind.SourceFile;
            case SyntaxKind.AbstractKeyword:
                return container.kind === SyntaxKind.ClassDeclaration || declaration.kind === SyntaxKind.ClassDeclaration;
            default:
                return false;
        }
    }

    function pushKeywordIf(keywordList: Node[], token: Node, ...expected: SyntaxKind[]): boolean {
        if (token && contains(expected, token.kind)) {
            keywordList.push(token);
            return true;
        }

        return false;
    }

    function getGetAndSetOccurrences(accessorDeclaration: AccessorDeclaration): Node[] {
        const keywords: Node[] = [];

        tryPushAccessorKeyword(accessorDeclaration.symbol, SyntaxKind.GetAccessor);
        tryPushAccessorKeyword(accessorDeclaration.symbol, SyntaxKind.SetAccessor);

        return keywords;

        function tryPushAccessorKeyword(accessorSymbol: Symbol, accessorKind: SyntaxKind): void {
            const accessor = getDeclarationOfKind(accessorSymbol, accessorKind);

            if (accessor) {
                forEach(accessor.getChildren(), child => pushKeywordIf(keywords, child, SyntaxKind.GetKeyword, SyntaxKind.SetKeyword));
            }
        }
    }

    function getConstructorOccurrences(constructorDeclaration: ConstructorDeclaration): Node[] {
        const declarations = constructorDeclaration.symbol.getDeclarations();

        const keywords: Node[] = [];

        forEach(declarations, declaration => {
            forEach(declaration.getChildren(), token => {
                return pushKeywordIf(keywords, token, SyntaxKind.ConstructorKeyword);
            });
        });

        return keywords;
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

        const breaksAndContinues = aggregateAllBreakAndContinueStatements(loopNode.statement);

        forEach(breaksAndContinues, statement => {
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

            const breaksAndContinues = aggregateAllBreakAndContinueStatements(clause);

            forEach(breaksAndContinues, statement => {
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

    function getThrowOccurrences(throwStatement: ThrowStatement): Node[] {
        const owner = getThrowStatementOwner(throwStatement);

        if (!owner) {
            return undefined;
        }

        const keywords: Node[] = [];

        forEach(aggregateOwnedThrowStatements(owner), throwStatement => {
            pushKeywordIf(keywords, throwStatement.getFirstToken(), SyntaxKind.ThrowKeyword);
        });

        // If the "owner" is a function, then we equate 'return' and 'throw' statements in their
        // ability to "jump out" of the function, and include occurrences for both.
        if (isFunctionBlock(owner)) {
            forEachReturnStatement(<Block>owner, returnStatement => {
                pushKeywordIf(keywords, returnStatement.getFirstToken(), SyntaxKind.ReturnKeyword);
            });
        }

        return keywords;
    }

    function getReturnOccurrences(returnStatement: ReturnStatement): Node[] | undefined {
        const func = <FunctionLikeDeclaration>getContainingFunction(returnStatement);
        if (!func) {
            return undefined;
        }

        const keywords: Node[] = [];
        forEachReturnStatement(cast(func.body, isBlock), returnStatement => {
            pushKeywordIf(keywords, returnStatement.getFirstToken(), SyntaxKind.ReturnKeyword);
        });

        // Include 'throw' statements that do not occur within a try block.
        forEach(aggregateOwnedThrowStatements(func.body), throwStatement => {
            pushKeywordIf(keywords, throwStatement.getFirstToken(), SyntaxKind.ThrowKeyword);
        });

        return keywords;
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
    function isLabeledBy(node: Node, labelName: string) {
        for (let owner = node.parent; owner.kind === SyntaxKind.LabeledStatement; owner = owner.parent) {
            if ((<LabeledStatement>owner).label.escapedText === labelName) {
                return true;
            }
        }

        return false;
    }
}
