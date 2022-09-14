import * as ts from "./_namespaces/ts";

export interface DocumentHighlights {
    fileName: string;
    highlightSpans: ts.HighlightSpan[];
}

/* @internal */
export namespace DocumentHighlights {
    export function getDocumentHighlights(program: ts.Program, cancellationToken: ts.CancellationToken, sourceFile: ts.SourceFile, position: number, sourceFilesToSearch: readonly ts.SourceFile[]): DocumentHighlights[] | undefined {
        const node = ts.getTouchingPropertyName(sourceFile, position);

        if (node.parent && (ts.isJsxOpeningElement(node.parent) && node.parent.tagName === node || ts.isJsxClosingElement(node.parent))) {
            // For a JSX element, just highlight the matching tag, not all references.
            const { openingElement, closingElement } = node.parent.parent;
            const highlightSpans = [openingElement, closingElement].map(({ tagName }) => getHighlightSpanForNode(tagName, sourceFile));
            return [{ fileName: sourceFile.fileName, highlightSpans }];
        }

        return getSemanticDocumentHighlights(position, node, program, cancellationToken, sourceFilesToSearch) || getSyntacticDocumentHighlights(node, sourceFile);
    }

    function getHighlightSpanForNode(node: ts.Node, sourceFile: ts.SourceFile): ts.HighlightSpan {
        return {
            fileName: sourceFile.fileName,
            textSpan: ts.createTextSpanFromNode(node, sourceFile),
            kind: ts.HighlightSpanKind.none
        };
    }

    function getSemanticDocumentHighlights(position: number, node: ts.Node, program: ts.Program, cancellationToken: ts.CancellationToken, sourceFilesToSearch: readonly ts.SourceFile[]): DocumentHighlights[] | undefined {
        const sourceFilesSet = new ts.Set(sourceFilesToSearch.map(f => f.fileName));
        const referenceEntries = ts.FindAllReferences.getReferenceEntriesForNode(position, node, program, sourceFilesToSearch, cancellationToken, /*options*/ undefined, sourceFilesSet);
        if (!referenceEntries) return undefined;
        const map = ts.arrayToMultiMap(referenceEntries.map(ts.FindAllReferences.toHighlightSpan), e => e.fileName, e => e.span);
        const getCanonicalFileName = ts.createGetCanonicalFileName(program.useCaseSensitiveFileNames());
        return ts.mapDefined(ts.arrayFrom(map.entries()), ([fileName, highlightSpans]) => {
            if (!sourceFilesSet.has(fileName)) {
                if (!program.redirectTargetsMap.has(ts.toPath(fileName, program.getCurrentDirectory(), getCanonicalFileName))) {
                    return undefined;
                }
                const redirectTarget = program.getSourceFile(fileName);
                const redirect = ts.find(sourceFilesToSearch, f => !!f.redirectInfo && f.redirectInfo.redirectTarget === redirectTarget)!;
                fileName = redirect.fileName;
                ts.Debug.assert(sourceFilesSet.has(fileName));
            }
            return { fileName, highlightSpans };
        });
    }

    function getSyntacticDocumentHighlights(node: ts.Node, sourceFile: ts.SourceFile): DocumentHighlights[] | undefined {
        const highlightSpans = getHighlightSpans(node, sourceFile);
        return highlightSpans && [{ fileName: sourceFile.fileName, highlightSpans }];
    }

    function getHighlightSpans(node: ts.Node, sourceFile: ts.SourceFile): ts.HighlightSpan[] | undefined {
        switch (node.kind) {
            case ts.SyntaxKind.IfKeyword:
            case ts.SyntaxKind.ElseKeyword:
                return ts.isIfStatement(node.parent) ? getIfElseOccurrences(node.parent, sourceFile) : undefined;
            case ts.SyntaxKind.ReturnKeyword:
                return useParent(node.parent, ts.isReturnStatement, getReturnOccurrences);
            case ts.SyntaxKind.ThrowKeyword:
                return useParent(node.parent, ts.isThrowStatement, getThrowOccurrences);
            case ts.SyntaxKind.TryKeyword:
            case ts.SyntaxKind.CatchKeyword:
            case ts.SyntaxKind.FinallyKeyword:
                const tryStatement = node.kind === ts.SyntaxKind.CatchKeyword ? node.parent.parent : node.parent;
                return useParent(tryStatement, ts.isTryStatement, getTryCatchFinallyOccurrences);
            case ts.SyntaxKind.SwitchKeyword:
                return useParent(node.parent, ts.isSwitchStatement, getSwitchCaseDefaultOccurrences);
            case ts.SyntaxKind.CaseKeyword:
            case ts.SyntaxKind.DefaultKeyword: {
                if (ts.isDefaultClause(node.parent) || ts.isCaseClause(node.parent)) {
                    return useParent(node.parent.parent.parent, ts.isSwitchStatement, getSwitchCaseDefaultOccurrences);
                }
                return undefined;
            }
            case ts.SyntaxKind.BreakKeyword:
            case ts.SyntaxKind.ContinueKeyword:
                return useParent(node.parent, ts.isBreakOrContinueStatement, getBreakOrContinueStatementOccurrences);
            case ts.SyntaxKind.ForKeyword:
            case ts.SyntaxKind.WhileKeyword:
            case ts.SyntaxKind.DoKeyword:
                return useParent(node.parent, (n): n is ts.IterationStatement => ts.isIterationStatement(n, /*lookInLabeledStatements*/ true), getLoopBreakContinueOccurrences);
            case ts.SyntaxKind.ConstructorKeyword:
                return getFromAllDeclarations(ts.isConstructorDeclaration, [ts.SyntaxKind.ConstructorKeyword]);
            case ts.SyntaxKind.GetKeyword:
            case ts.SyntaxKind.SetKeyword:
                return getFromAllDeclarations(ts.isAccessor, [ts.SyntaxKind.GetKeyword, ts.SyntaxKind.SetKeyword]);
            case ts.SyntaxKind.AwaitKeyword:
                return useParent(node.parent, ts.isAwaitExpression, getAsyncAndAwaitOccurrences);
            case ts.SyntaxKind.AsyncKeyword:
                return highlightSpans(getAsyncAndAwaitOccurrences(node));
            case ts.SyntaxKind.YieldKeyword:
                return highlightSpans(getYieldOccurrences(node));
            case ts.SyntaxKind.InKeyword:
                return undefined;
            default:
                return ts.isModifierKind(node.kind) && (ts.isDeclaration(node.parent) || ts.isVariableStatement(node.parent))
                    ? highlightSpans(getModifierOccurrences(node.kind, node.parent))
                    : undefined;
        }

        function getFromAllDeclarations<T extends ts.Node>(nodeTest: (node: ts.Node) => node is T, keywords: readonly ts.SyntaxKind[]): ts.HighlightSpan[] | undefined {
            return useParent(node.parent, nodeTest, decl => ts.mapDefined(decl.symbol.declarations, d =>
                nodeTest(d) ? ts.find(d.getChildren(sourceFile), c => ts.contains(keywords, c.kind)) : undefined));
        }

        function useParent<T extends ts.Node>(node: ts.Node, nodeTest: (node: ts.Node) => node is T, getNodes: (node: T, sourceFile: ts.SourceFile) => readonly ts.Node[] | undefined): ts.HighlightSpan[] | undefined {
            return nodeTest(node) ? highlightSpans(getNodes(node, sourceFile)) : undefined;
        }

        function highlightSpans(nodes: readonly ts.Node[] | undefined): ts.HighlightSpan[] | undefined {
            return nodes && nodes.map(node => getHighlightSpanForNode(node, sourceFile));
        }
    }

    /**
     * Aggregates all throw-statements within this node *without* crossing
     * into function boundaries and try-blocks with catch-clauses.
     */
    function aggregateOwnedThrowStatements(node: ts.Node): readonly ts.ThrowStatement[] | undefined {
        if (ts.isThrowStatement(node)) {
            return [node];
        }
        else if (ts.isTryStatement(node)) {
            // Exceptions thrown within a try block lacking a catch clause are "owned" in the current context.
            return ts.concatenate(
                node.catchClause ? aggregateOwnedThrowStatements(node.catchClause) : node.tryBlock && aggregateOwnedThrowStatements(node.tryBlock),
                node.finallyBlock && aggregateOwnedThrowStatements(node.finallyBlock));
        }
        // Do not cross function boundaries.
        return ts.isFunctionLike(node) ? undefined : flatMapChildren(node, aggregateOwnedThrowStatements);
    }

    /**
     * For lack of a better name, this function takes a throw statement and returns the
     * nearest ancestor that is a try-block (whose try statement has a catch clause),
     * function-block, or source file.
     */
    function getThrowStatementOwner(throwStatement: ts.ThrowStatement): ts.Node | undefined {
        let child: ts.Node = throwStatement;

        while (child.parent) {
            const parent = child.parent;

            if (ts.isFunctionBlock(parent) || parent.kind === ts.SyntaxKind.SourceFile) {
                return parent;
            }

            // A throw-statement is only owned by a try-statement if the try-statement has
            // a catch clause, and if the throw-statement occurs within the try block.
            if (ts.isTryStatement(parent) && parent.tryBlock === child && parent.catchClause) {
                return child;
            }

            child = parent;
        }

        return undefined;
    }

    function aggregateAllBreakAndContinueStatements(node: ts.Node): readonly ts.BreakOrContinueStatement[] | undefined {
        return ts.isBreakOrContinueStatement(node) ? [node] : ts.isFunctionLike(node) ? undefined : flatMapChildren(node, aggregateAllBreakAndContinueStatements);
    }

    function flatMapChildren<T>(node: ts.Node, cb: (child: ts.Node) => readonly T[] | T | undefined): readonly T[] {
        const result: T[] = [];
        node.forEachChild(child => {
            const value = cb(child);
            if (value !== undefined) {
                result.push(...ts.toArray(value));
            }
        });
        return result;
    }

    function ownsBreakOrContinueStatement(owner: ts.Node, statement: ts.BreakOrContinueStatement): boolean {
        const actualOwner = getBreakOrContinueOwner(statement);
        return !!actualOwner && actualOwner === owner;
    }

    function getBreakOrContinueOwner(statement: ts.BreakOrContinueStatement): ts.Node | undefined {
        return ts.findAncestor(statement, node => {
            switch (node.kind) {
                case ts.SyntaxKind.SwitchStatement:
                    if (statement.kind === ts.SyntaxKind.ContinueStatement) {
                        return false;
                    }
                    // falls through

                case ts.SyntaxKind.ForStatement:
                case ts.SyntaxKind.ForInStatement:
                case ts.SyntaxKind.ForOfStatement:
                case ts.SyntaxKind.WhileStatement:
                case ts.SyntaxKind.DoStatement:
                    return !statement.label || isLabeledBy(node, statement.label.escapedText);
                default:
                    // Don't cross function boundaries.
                    // TODO: GH#20090
                    return ts.isFunctionLike(node) && "quit";
            }
        });
    }

    function getModifierOccurrences(modifier: ts.Modifier["kind"], declaration: ts.Node): ts.Node[] {
        return ts.mapDefined(getNodesToSearchForModifier(declaration, ts.modifierToFlag(modifier)), node => ts.findModifier(node, modifier));
    }

    function getNodesToSearchForModifier(declaration: ts.Node, modifierFlag: ts.ModifierFlags): readonly ts.Node[] | undefined {
        // Types of node whose children might have modifiers.
        const container = declaration.parent as ts.ModuleBlock | ts.SourceFile | ts.Block | ts.CaseClause | ts.DefaultClause | ts.ConstructorDeclaration | ts.MethodDeclaration | ts.FunctionDeclaration | ts.ObjectTypeDeclaration | ts.ObjectLiteralExpression;
        switch (container.kind) {
            case ts.SyntaxKind.ModuleBlock:
            case ts.SyntaxKind.SourceFile:
            case ts.SyntaxKind.Block:
            case ts.SyntaxKind.CaseClause:
            case ts.SyntaxKind.DefaultClause:
                // Container is either a class declaration or the declaration is a classDeclaration
                if (modifierFlag & ts.ModifierFlags.Abstract && ts.isClassDeclaration(declaration)) {
                    return [...declaration.members, declaration];
                }
                else {
                    return container.statements;
                }
            case ts.SyntaxKind.Constructor:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.FunctionDeclaration:
                return [...container.parameters, ...(ts.isClassLike(container.parent) ? container.parent.members : [])];
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.ClassExpression:
            case ts.SyntaxKind.InterfaceDeclaration:
            case ts.SyntaxKind.TypeLiteral:
                const nodes = container.members;

                // If we're an accessibility modifier, we're in an instance member and should search
                // the constructor's parameter list for instance members as well.
                if (modifierFlag & (ts.ModifierFlags.AccessibilityModifier | ts.ModifierFlags.Readonly)) {
                    const constructor = ts.find(container.members, ts.isConstructorDeclaration);
                    if (constructor) {
                        return [...nodes, ...constructor.parameters];
                    }
                }
                else if (modifierFlag & ts.ModifierFlags.Abstract) {
                    return [...nodes, container];
                }
                return nodes;

            // Syntactically invalid positions that the parser might produce anyway
            case ts.SyntaxKind.ObjectLiteralExpression:
                return undefined;

            default:
                ts.Debug.assertNever(container, "Invalid container kind.");
        }
    }

    function pushKeywordIf(keywordList: ts.Push<ts.Node>, token: ts.Node | undefined, ...expected: ts.SyntaxKind[]): boolean {
        if (token && ts.contains(expected, token.kind)) {
            keywordList.push(token);
            return true;
        }

        return false;
    }

    function getLoopBreakContinueOccurrences(loopNode: ts.IterationStatement): ts.Node[] {
        const keywords: ts.Node[] = [];

        if (pushKeywordIf(keywords, loopNode.getFirstToken(), ts.SyntaxKind.ForKeyword, ts.SyntaxKind.WhileKeyword, ts.SyntaxKind.DoKeyword)) {
            // If we succeeded and got a do-while loop, then start looking for a 'while' keyword.
            if (loopNode.kind === ts.SyntaxKind.DoStatement) {
                const loopTokens = loopNode.getChildren();

                for (let i = loopTokens.length - 1; i >= 0; i--) {
                    if (pushKeywordIf(keywords, loopTokens[i], ts.SyntaxKind.WhileKeyword)) {
                        break;
                    }
                }
            }
        }

        ts.forEach(aggregateAllBreakAndContinueStatements(loopNode.statement), statement => {
            if (ownsBreakOrContinueStatement(loopNode, statement)) {
                pushKeywordIf(keywords, statement.getFirstToken(), ts.SyntaxKind.BreakKeyword, ts.SyntaxKind.ContinueKeyword);
            }
        });

        return keywords;
    }

    function getBreakOrContinueStatementOccurrences(breakOrContinueStatement: ts.BreakOrContinueStatement): ts.Node[] | undefined {
        const owner = getBreakOrContinueOwner(breakOrContinueStatement);

        if (owner) {
            switch (owner.kind) {
                case ts.SyntaxKind.ForStatement:
                case ts.SyntaxKind.ForInStatement:
                case ts.SyntaxKind.ForOfStatement:
                case ts.SyntaxKind.DoStatement:
                case ts.SyntaxKind.WhileStatement:
                    return getLoopBreakContinueOccurrences(owner as ts.IterationStatement);
                case ts.SyntaxKind.SwitchStatement:
                    return getSwitchCaseDefaultOccurrences(owner as ts.SwitchStatement);

            }
        }

        return undefined;
    }

    function getSwitchCaseDefaultOccurrences(switchStatement: ts.SwitchStatement): ts.Node[] {
        const keywords: ts.Node[] = [];

        pushKeywordIf(keywords, switchStatement.getFirstToken(), ts.SyntaxKind.SwitchKeyword);

        // Go through each clause in the switch statement, collecting the 'case'/'default' keywords.
        ts.forEach(switchStatement.caseBlock.clauses, clause => {
            pushKeywordIf(keywords, clause.getFirstToken(), ts.SyntaxKind.CaseKeyword, ts.SyntaxKind.DefaultKeyword);

            ts.forEach(aggregateAllBreakAndContinueStatements(clause), statement => {
                if (ownsBreakOrContinueStatement(switchStatement, statement)) {
                    pushKeywordIf(keywords, statement.getFirstToken(), ts.SyntaxKind.BreakKeyword);
                }
            });
        });

        return keywords;
    }

    function getTryCatchFinallyOccurrences(tryStatement: ts.TryStatement, sourceFile: ts.SourceFile): ts.Node[] {
        const keywords: ts.Node[] = [];

        pushKeywordIf(keywords, tryStatement.getFirstToken(), ts.SyntaxKind.TryKeyword);

        if (tryStatement.catchClause) {
            pushKeywordIf(keywords, tryStatement.catchClause.getFirstToken(), ts.SyntaxKind.CatchKeyword);
        }

        if (tryStatement.finallyBlock) {
            const finallyKeyword = ts.findChildOfKind(tryStatement, ts.SyntaxKind.FinallyKeyword, sourceFile)!;
            pushKeywordIf(keywords, finallyKeyword, ts.SyntaxKind.FinallyKeyword);
        }

        return keywords;
    }

    function getThrowOccurrences(throwStatement: ts.ThrowStatement, sourceFile: ts.SourceFile): ts.Node[] | undefined {
        const owner = getThrowStatementOwner(throwStatement);

        if (!owner) {
            return undefined;
        }

        const keywords: ts.Node[] = [];

        ts.forEach(aggregateOwnedThrowStatements(owner), throwStatement => {
            keywords.push(ts.findChildOfKind(throwStatement, ts.SyntaxKind.ThrowKeyword, sourceFile)!);
        });

        // If the "owner" is a function, then we equate 'return' and 'throw' statements in their
        // ability to "jump out" of the function, and include occurrences for both.
        if (ts.isFunctionBlock(owner)) {
            ts.forEachReturnStatement(owner as ts.Block, returnStatement => {
                keywords.push(ts.findChildOfKind(returnStatement, ts.SyntaxKind.ReturnKeyword, sourceFile)!);
            });
        }

        return keywords;
    }

    function getReturnOccurrences(returnStatement: ts.ReturnStatement, sourceFile: ts.SourceFile): ts.Node[] | undefined {
        const func = ts.getContainingFunction(returnStatement) as ts.FunctionLikeDeclaration;
        if (!func) {
            return undefined;
        }

        const keywords: ts.Node[] = [];
        ts.forEachReturnStatement(ts.cast(func.body, ts.isBlock), returnStatement => {
            keywords.push(ts.findChildOfKind(returnStatement, ts.SyntaxKind.ReturnKeyword, sourceFile)!);
        });

        // Include 'throw' statements that do not occur within a try block.
        ts.forEach(aggregateOwnedThrowStatements(func.body!), throwStatement => {
            keywords.push(ts.findChildOfKind(throwStatement, ts.SyntaxKind.ThrowKeyword, sourceFile)!);
        });

        return keywords;
    }

    function getAsyncAndAwaitOccurrences(node: ts.Node): ts.Node[] | undefined {
        const func = ts.getContainingFunction(node) as ts.FunctionLikeDeclaration;
        if (!func) {
            return undefined;
        }

        const keywords: ts.Node[] = [];

        if (func.modifiers) {
            func.modifiers.forEach(modifier => {
                pushKeywordIf(keywords, modifier, ts.SyntaxKind.AsyncKeyword);
            });
        }

        ts.forEachChild(func, child => {
            traverseWithoutCrossingFunction(child, node => {
                if (ts.isAwaitExpression(node)) {
                    pushKeywordIf(keywords, node.getFirstToken(), ts.SyntaxKind.AwaitKeyword);
                }
            });
        });


        return keywords;
    }

    function getYieldOccurrences(node: ts.Node): ts.Node[] | undefined {
        const func = ts.getContainingFunction(node) as ts.FunctionDeclaration;
        if (!func) {
            return undefined;
        }

        const keywords: ts.Node[] = [];

        ts.forEachChild(func, child => {
            traverseWithoutCrossingFunction(child, node => {
                if (ts.isYieldExpression(node)) {
                    pushKeywordIf(keywords, node.getFirstToken(), ts.SyntaxKind.YieldKeyword);
                }
            });
        });

        return keywords;
    }

    // Do not cross function/class/interface/module/type boundaries.
    function traverseWithoutCrossingFunction(node: ts.Node, cb: (node: ts.Node) => void) {
        cb(node);
        if (!ts.isFunctionLike(node) && !ts.isClassLike(node) && !ts.isInterfaceDeclaration(node) && !ts.isModuleDeclaration(node) && !ts.isTypeAliasDeclaration(node) && !ts.isTypeNode(node)) {
            ts.forEachChild(node, child => traverseWithoutCrossingFunction(child, cb));
        }
    }

    function getIfElseOccurrences(ifStatement: ts.IfStatement, sourceFile: ts.SourceFile): ts.HighlightSpan[] {
        const keywords = getIfElseKeywords(ifStatement, sourceFile);
        const result: ts.HighlightSpan[] = [];

        // We'd like to highlight else/ifs together if they are only separated by whitespace
        // (i.e. the keywords are separated by no comments, no newlines).
        for (let i = 0; i < keywords.length; i++) {
            if (keywords[i].kind === ts.SyntaxKind.ElseKeyword && i < keywords.length - 1) {
                const elseKeyword = keywords[i];
                const ifKeyword = keywords[i + 1]; // this *should* always be an 'if' keyword.

                let shouldCombineElseAndIf = true;

                // Avoid recalculating getStart() by iterating backwards.
                for (let j = ifKeyword.getStart(sourceFile) - 1; j >= elseKeyword.end; j--) {
                    if (!ts.isWhiteSpaceSingleLine(sourceFile.text.charCodeAt(j))) {
                        shouldCombineElseAndIf = false;
                        break;
                    }
                }

                if (shouldCombineElseAndIf) {
                    result.push({
                        fileName: sourceFile.fileName,
                        textSpan: ts.createTextSpanFromBounds(elseKeyword.getStart(), ifKeyword.end),
                        kind: ts.HighlightSpanKind.reference
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

    function getIfElseKeywords(ifStatement: ts.IfStatement, sourceFile: ts.SourceFile): ts.Node[] {
        const keywords: ts.Node[] = [];

        // Traverse upwards through all parent if-statements linked by their else-branches.
        while (ts.isIfStatement(ifStatement.parent) && ifStatement.parent.elseStatement === ifStatement) {
            ifStatement = ifStatement.parent;
        }

        // Now traverse back down through the else branches, aggregating if/else keywords of if-statements.
        while (true) {
            const children = ifStatement.getChildren(sourceFile);
            pushKeywordIf(keywords, children[0], ts.SyntaxKind.IfKeyword);

            // Generally the 'else' keyword is second-to-last, so we traverse backwards.
            for (let i = children.length - 1; i >= 0; i--) {
                if (pushKeywordIf(keywords, children[i], ts.SyntaxKind.ElseKeyword)) {
                    break;
                }
            }

            if (!ifStatement.elseStatement || !ts.isIfStatement(ifStatement.elseStatement)) {
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
    function isLabeledBy(node: ts.Node, labelName: ts.__String): boolean {
        return !!ts.findAncestor(node.parent, owner => !ts.isLabeledStatement(owner) ? "quit" : owner.label.escapedText === labelName);
    }
}
