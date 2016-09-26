/* @internal */
namespace ts.DocumentHighlights {
    export function getDocumentHighlights(typeChecker: TypeChecker, cancellationToken: CancellationToken, sourceFile: SourceFile, position: number, sourceFilesToSearch: SourceFile[]): DocumentHighlights[] {
        const node = getTouchingWord(sourceFile, position);
        if (!node) {
            return undefined;
        }

        return getSemanticDocumentHighlights(node) || getSyntacticDocumentHighlights(node);

        function getHighlightSpanForNode(node: Node): HighlightSpan {
            const start = node.getStart();
            const end = node.getEnd();

            return {
                fileName: sourceFile.fileName,
                textSpan: createTextSpanFromBounds(start, end),
                kind: HighlightSpanKind.none
            };
        }

        function getSemanticDocumentHighlights(node: Node): DocumentHighlights[] {
            if (node.kind === SyntaxKind.Identifier ||
                node.kind === SyntaxKind.ThisKeyword ||
                node.kind === SyntaxKind.ThisType ||
                node.kind === SyntaxKind.SuperKeyword ||
                node.kind === SyntaxKind.StringLiteral ||
                isLiteralNameOfPropertyDeclarationOrIndexAccess(node)) {

                const referencedSymbols = FindAllReferences.getReferencedSymbolsForNode(typeChecker, cancellationToken, node, sourceFilesToSearch, /*findInStrings*/ false, /*findInComments*/ false, /*implementations*/false);
                return convertReferencedSymbols(referencedSymbols);

            }

            return undefined;

            function convertReferencedSymbols(referencedSymbols: ReferencedSymbol[]): DocumentHighlights[] {
                if (!referencedSymbols) {
                    return undefined;
                }

                const fileNameToDocumentHighlights = new StringMap<DocumentHighlights>();
                const result: DocumentHighlights[] = [];
                for (const referencedSymbol of referencedSymbols) {
                    for (const referenceEntry of referencedSymbol.references) {
                        const fileName = referenceEntry.fileName;
                        let documentHighlights = fileNameToDocumentHighlights.get(fileName);
                        if (!documentHighlights) {
                            documentHighlights = { fileName, highlightSpans: [] };

                            fileNameToDocumentHighlights.set(fileName, documentHighlights);
                            result.push(documentHighlights);
                        }

                        documentHighlights.highlightSpans.push({
                            textSpan: referenceEntry.textSpan,
                            kind: referenceEntry.isWriteAccess ? HighlightSpanKind.writtenReference : HighlightSpanKind.reference
                        });
                    }
                }

                return result;
            }
        }

        function getSyntacticDocumentHighlights(node: Node): DocumentHighlights[] {
            const fileName = sourceFile.fileName;

            const highlightSpans = getHighlightSpans(node);
            if (!highlightSpans || highlightSpans.length === 0) {
                return undefined;
            }

            return [{ fileName, highlightSpans }];

            // returns true if 'node' is defined and has a matching 'kind'.
            function hasKind(node: Node, kind: SyntaxKind) {
                return node !== undefined && node.kind === kind;
            }

            // Null-propagating 'parent' function.
            function parent(node: Node): Node {
                return node && node.parent;
            }

            function getHighlightSpans(node: Node): HighlightSpan[] {
                if (node) {
                    switch (node.kind) {
                        case SyntaxKind.IfKeyword:
                        case SyntaxKind.ElseKeyword:
                            if (hasKind(node.parent, SyntaxKind.IfStatement)) {
                                return getIfElseOccurrences(<IfStatement>node.parent);
                            }
                            break;
                        case SyntaxKind.ReturnKeyword:
                            if (hasKind(node.parent, SyntaxKind.ReturnStatement)) {
                                return getReturnOccurrences(<ReturnStatement>node.parent);
                            }
                            break;
                        case SyntaxKind.ThrowKeyword:
                            if (hasKind(node.parent, SyntaxKind.ThrowStatement)) {
                                return getThrowOccurrences(<ThrowStatement>node.parent);
                            }
                            break;
                        case SyntaxKind.CatchKeyword:
                            if (hasKind(parent(parent(node)), SyntaxKind.TryStatement)) {
                                return getTryCatchFinallyOccurrences(<TryStatement>node.parent.parent);
                            }
                            break;
                        case SyntaxKind.TryKeyword:
                        case SyntaxKind.FinallyKeyword:
                            if (hasKind(parent(node), SyntaxKind.TryStatement)) {
                                return getTryCatchFinallyOccurrences(<TryStatement>node.parent);
                            }
                            break;
                        case SyntaxKind.SwitchKeyword:
                            if (hasKind(node.parent, SyntaxKind.SwitchStatement)) {
                                return getSwitchCaseDefaultOccurrences(<SwitchStatement>node.parent);
                            }
                            break;
                        case SyntaxKind.CaseKeyword:
                        case SyntaxKind.DefaultKeyword:
                            if (hasKind(parent(parent(parent(node))), SyntaxKind.SwitchStatement)) {
                                return getSwitchCaseDefaultOccurrences(<SwitchStatement>node.parent.parent.parent);
                            }
                            break;
                        case SyntaxKind.BreakKeyword:
                        case SyntaxKind.ContinueKeyword:
                            if (hasKind(node.parent, SyntaxKind.BreakStatement) || hasKind(node.parent, SyntaxKind.ContinueStatement)) {
                                return getBreakOrContinueStatementOccurrences(<BreakOrContinueStatement>node.parent);
                            }
                            break;
                        case SyntaxKind.ForKeyword:
                            if (hasKind(node.parent, SyntaxKind.ForStatement) ||
                                hasKind(node.parent, SyntaxKind.ForInStatement) ||
                                hasKind(node.parent, SyntaxKind.ForOfStatement)) {
                                return getLoopBreakContinueOccurrences(<IterationStatement>node.parent);
                            }
                            break;
                        case SyntaxKind.WhileKeyword:
                        case SyntaxKind.DoKeyword:
                            if (hasKind(node.parent, SyntaxKind.WhileStatement) || hasKind(node.parent, SyntaxKind.DoStatement)) {
                                return getLoopBreakContinueOccurrences(<IterationStatement>node.parent);
                            }
                            break;
                        case SyntaxKind.ConstructorKeyword:
                            if (hasKind(node.parent, SyntaxKind.Constructor)) {
                                return getConstructorOccurrences(<ConstructorDeclaration>node.parent);
                            }
                            break;
                        case SyntaxKind.GetKeyword:
                        case SyntaxKind.SetKeyword:
                            if (hasKind(node.parent, SyntaxKind.GetAccessor) || hasKind(node.parent, SyntaxKind.SetAccessor)) {
                                return getGetAndSetOccurrences(<AccessorDeclaration>node.parent);
                            }
                            break;
                        default:
                            if (isModifierKind(node.kind) && node.parent &&
                                (isDeclaration(node.parent) || node.parent.kind === SyntaxKind.VariableStatement)) {
                                return getModifierOccurrences(node.kind, node.parent);
                            }
                    }
                }

                return undefined;
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
                    if (node.kind === SyntaxKind.ThrowStatement) {
                        statementAccumulator.push(<ThrowStatement>node);
                    }
                    else if (node.kind === SyntaxKind.TryStatement) {
                        const tryStatement = <TryStatement>node;

                        if (tryStatement.catchClause) {
                            aggregate(tryStatement.catchClause);
                        }
                        else {
                            // Exceptions thrown within a try block lacking a catch clause
                            // are "owned" in the current context.
                            aggregate(tryStatement.tryBlock);
                        }

                        if (tryStatement.finallyBlock) {
                            aggregate(tryStatement.finallyBlock);
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
                for (let node = statement.parent; node; node = node.parent) {
                    switch (node.kind) {
                        case SyntaxKind.SwitchStatement:
                            if (statement.kind === SyntaxKind.ContinueStatement) {
                                continue;
                            }
                        // Fall through.
                        case SyntaxKind.ForStatement:
                        case SyntaxKind.ForInStatement:
                        case SyntaxKind.ForOfStatement:
                        case SyntaxKind.WhileStatement:
                        case SyntaxKind.DoStatement:
                            if (!statement.label || isLabeledBy(node, statement.label.text)) {
                                return node;
                            }
                            break;
                        default:
                            // Don't cross function boundaries.
                            if (isFunctionLike(node)) {
                                return undefined;
                            }
                            break;
                    }
                }

                return undefined;
            }

            function getModifierOccurrences(modifier: SyntaxKind, declaration: Node): HighlightSpan[] {
                const container = declaration.parent;

                // Make sure we only highlight the keyword when it makes sense to do so.
                if (isAccessibilityModifier(modifier)) {
                    if (!(container.kind === SyntaxKind.ClassDeclaration ||
                        container.kind === SyntaxKind.ClassExpression ||
                        (declaration.kind === SyntaxKind.Parameter && hasKind(container, SyntaxKind.Constructor)))) {
                        return undefined;
                    }
                }
                else if (modifier === SyntaxKind.StaticKeyword) {
                    if (!(container.kind === SyntaxKind.ClassDeclaration || container.kind === SyntaxKind.ClassExpression)) {
                        return undefined;
                    }
                }
                else if (modifier === SyntaxKind.ExportKeyword || modifier === SyntaxKind.DeclareKeyword) {
                    if (!(container.kind === SyntaxKind.ModuleBlock || container.kind === SyntaxKind.SourceFile)) {
                        return undefined;
                    }
                }
                else if (modifier === SyntaxKind.AbstractKeyword) {
                    if (!(container.kind === SyntaxKind.ClassDeclaration || declaration.kind === SyntaxKind.ClassDeclaration)) {
                        return undefined;
                    }
                }
                else {
                    // unsupported modifier
                    return undefined;
                }

                const keywords: Node[] = [];
                const modifierFlag: ModifierFlags = getFlagFromModifier(modifier);

                let nodes: Node[];
                switch (container.kind) {
                    case SyntaxKind.ModuleBlock:
                    case SyntaxKind.SourceFile:
                        // Container is either a class declaration or the declaration is a classDeclaration
                        if (modifierFlag & ModifierFlags.Abstract) {
                            nodes = (<Node[]>(<ClassDeclaration>declaration).members).concat(declaration);
                        }
                        else {
                            nodes = (<Block>container).statements;
                        }
                        break;
                    case SyntaxKind.Constructor:
                        nodes = (<Node[]>(<ConstructorDeclaration>container).parameters).concat(
                            (<ClassDeclaration>container.parent).members);
                        break;
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.ClassExpression:
                        nodes = (<ClassLikeDeclaration>container).members;

                        // If we're an accessibility modifier, we're in an instance member and should search
                        // the constructor's parameter list for instance members as well.
                        if (modifierFlag & ModifierFlags.AccessibilityModifier) {
                            const constructor = forEach((<ClassLikeDeclaration>container).members, member => {
                                return member.kind === SyntaxKind.Constructor && <ConstructorDeclaration>member;
                            });

                            if (constructor) {
                                nodes = nodes.concat(constructor.parameters);
                            }
                        }
                        else if (modifierFlag & ModifierFlags.Abstract) {
                            nodes = nodes.concat(container);
                        }
                        break;
                    default:
                        Debug.fail("Invalid container kind.");
                }

                forEach(nodes, node => {
                    if (getModifierFlags(node) & modifierFlag) {
                        forEach(node.modifiers, child => pushKeywordIf(keywords, child, modifier));
                    }
                });

                return map(keywords, getHighlightSpanForNode);

                function getFlagFromModifier(modifier: SyntaxKind) {
                    switch (modifier) {
                        case SyntaxKind.PublicKeyword:
                            return ModifierFlags.Public;
                        case SyntaxKind.PrivateKeyword:
                            return ModifierFlags.Private;
                        case SyntaxKind.ProtectedKeyword:
                            return ModifierFlags.Protected;
                        case SyntaxKind.StaticKeyword:
                            return ModifierFlags.Static;
                        case SyntaxKind.ExportKeyword:
                            return ModifierFlags.Export;
                        case SyntaxKind.DeclareKeyword:
                            return ModifierFlags.Ambient;
                        case SyntaxKind.AbstractKeyword:
                            return ModifierFlags.Abstract;
                        default:
                            Debug.fail();
                    }
                }
            }

            function pushKeywordIf(keywordList: Node[], token: Node, ...expected: SyntaxKind[]): boolean {
                if (token && contains(expected, token.kind)) {
                    keywordList.push(token);
                    return true;
                }

                return false;
            }

            function getGetAndSetOccurrences(accessorDeclaration: AccessorDeclaration): HighlightSpan[] {
                const keywords: Node[] = [];

                tryPushAccessorKeyword(accessorDeclaration.symbol, SyntaxKind.GetAccessor);
                tryPushAccessorKeyword(accessorDeclaration.symbol, SyntaxKind.SetAccessor);

                return map(keywords, getHighlightSpanForNode);

                function tryPushAccessorKeyword(accessorSymbol: Symbol, accessorKind: SyntaxKind): void {
                    const accessor = getDeclarationOfKind(accessorSymbol, accessorKind);

                    if (accessor) {
                        forEach(accessor.getChildren(), child => pushKeywordIf(keywords, child, SyntaxKind.GetKeyword, SyntaxKind.SetKeyword));
                    }
                }
            }

            function getConstructorOccurrences(constructorDeclaration: ConstructorDeclaration): HighlightSpan[] {
                const declarations = constructorDeclaration.symbol.getDeclarations();

                const keywords: Node[] = [];

                forEach(declarations, declaration => {
                    forEach(declaration.getChildren(), token => {
                        return pushKeywordIf(keywords, token, SyntaxKind.ConstructorKeyword);
                    });
                });

                return map(keywords, getHighlightSpanForNode);
            }

            function getLoopBreakContinueOccurrences(loopNode: IterationStatement): HighlightSpan[] {
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

                return map(keywords, getHighlightSpanForNode);
            }

            function getBreakOrContinueStatementOccurrences(breakOrContinueStatement: BreakOrContinueStatement): HighlightSpan[] {
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

            function getSwitchCaseDefaultOccurrences(switchStatement: SwitchStatement): HighlightSpan[] {
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

                return map(keywords, getHighlightSpanForNode);
            }

            function getTryCatchFinallyOccurrences(tryStatement: TryStatement): HighlightSpan[] {
                const keywords: Node[] = [];

                pushKeywordIf(keywords, tryStatement.getFirstToken(), SyntaxKind.TryKeyword);

                if (tryStatement.catchClause) {
                    pushKeywordIf(keywords, tryStatement.catchClause.getFirstToken(), SyntaxKind.CatchKeyword);
                }

                if (tryStatement.finallyBlock) {
                    const finallyKeyword = findChildOfKind(tryStatement, SyntaxKind.FinallyKeyword, sourceFile);
                    pushKeywordIf(keywords, finallyKeyword, SyntaxKind.FinallyKeyword);
                }

                return map(keywords, getHighlightSpanForNode);
            }

            function getThrowOccurrences(throwStatement: ThrowStatement): HighlightSpan[] {
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

                return map(keywords, getHighlightSpanForNode);
            }

            function getReturnOccurrences(returnStatement: ReturnStatement): HighlightSpan[] {
                const func = <FunctionLikeDeclaration>getContainingFunction(returnStatement);

                // If we didn't find a containing function with a block body, bail out.
                if (!(func && hasKind(func.body, SyntaxKind.Block))) {
                    return undefined;
                }

                const keywords: Node[] = [];
                forEachReturnStatement(<Block>func.body, returnStatement => {
                    pushKeywordIf(keywords, returnStatement.getFirstToken(), SyntaxKind.ReturnKeyword);
                });

                // Include 'throw' statements that do not occur within a try block.
                forEach(aggregateOwnedThrowStatements(func.body), throwStatement => {
                    pushKeywordIf(keywords, throwStatement.getFirstToken(), SyntaxKind.ThrowKeyword);
                });

                return map(keywords, getHighlightSpanForNode);
            }

            function getIfElseOccurrences(ifStatement: IfStatement): HighlightSpan[] {
                const keywords: Node[] = [];

                // Traverse upwards through all parent if-statements linked by their else-branches.
                while (hasKind(ifStatement.parent, SyntaxKind.IfStatement) && (<IfStatement>ifStatement.parent).elseStatement === ifStatement) {
                    ifStatement = <IfStatement>ifStatement.parent;
                }

                // Now traverse back down through the else branches, aggregating if/else keywords of if-statements.
                while (ifStatement) {
                    const children = ifStatement.getChildren();
                    pushKeywordIf(keywords, children[0], SyntaxKind.IfKeyword);

                    // Generally the 'else' keyword is second-to-last, so we traverse backwards.
                    for (let i = children.length - 1; i >= 0; i--) {
                        if (pushKeywordIf(keywords, children[i], SyntaxKind.ElseKeyword)) {
                            break;
                        }
                    }

                    if (!hasKind(ifStatement.elseStatement, SyntaxKind.IfStatement)) {
                        break;
                    }

                    ifStatement = <IfStatement>ifStatement.elseStatement;
                }

                const result: HighlightSpan[] = [];

                // We'd like to highlight else/ifs together if they are only separated by whitespace
                // (i.e. the keywords are separated by no comments, no newlines).
                for (let i = 0; i < keywords.length; i++) {
                    if (keywords[i].kind === SyntaxKind.ElseKeyword && i < keywords.length - 1) {
                        const elseKeyword = keywords[i];
                        const ifKeyword = keywords[i + 1]; // this *should* always be an 'if' keyword.

                        let shouldCombindElseAndIf = true;

                        // Avoid recalculating getStart() by iterating backwards.
                        for (let j = ifKeyword.getStart() - 1; j >= elseKeyword.end; j--) {
                            if (!isWhiteSpaceSingleLine(sourceFile.text.charCodeAt(j))) {
                                shouldCombindElseAndIf = false;
                                break;
                            }
                        }

                        if (shouldCombindElseAndIf) {
                            result.push({
                                fileName: fileName,
                                textSpan: createTextSpanFromBounds(elseKeyword.getStart(), ifKeyword.end),
                                kind: HighlightSpanKind.reference
                            });
                            i++; // skip the next keyword
                            continue;
                        }
                    }

                    // Ordinary case: just highlight the keyword.
                    result.push(getHighlightSpanForNode(keywords[i]));
                }

                return result;
            }
        }
    }

    /**
     * Whether or not a 'node' is preceded by a label of the given string.
     * Note: 'node' cannot be a SourceFile.
     */
    function isLabeledBy(node: Node, labelName: string) {
        for (let owner = node.parent; owner.kind === SyntaxKind.LabeledStatement; owner = owner.parent) {
            if ((<LabeledStatement>owner).label.text === labelName) {
                return true;
            }
        }

        return false;
    }
}
