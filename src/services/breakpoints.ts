/* @internal */
namespace ts.BreakpointResolver {
/**
 * Get the breakpoint span in given sourceFile
 */
export function spanInSourceFileAtLocation(sourceFile: ts.SourceFile, position: number) {
    // Cannot set breakpoint in dts file
    if (sourceFile.isDeclarationFile) {
        return undefined;
    }

    let tokenAtLocation = ts.getTokenAtPosition(sourceFile, position);
    const lineOfPosition = sourceFile.getLineAndCharacterOfPosition(position).line;
    if (sourceFile.getLineAndCharacterOfPosition(tokenAtLocation.getStart(sourceFile)).line > lineOfPosition) {
        // Get previous token if the token is returned starts on new line
        // eg: let x =10; |--- cursor is here
        //     let y = 10;
        // token at position will return let keyword on second line as the token but we would like to use
        // token on same line if trailing trivia (comments or white spaces on same line) part of the last token on that line
        const preceding = ts.findPrecedingToken(tokenAtLocation.pos, sourceFile);

        // It's a blank line
        if (!preceding || sourceFile.getLineAndCharacterOfPosition(preceding.getEnd()).line !== lineOfPosition) {
            return undefined;
        }
        tokenAtLocation = preceding;
    }

    // Cannot set breakpoint in ambient declarations
    if (tokenAtLocation.flags & ts.NodeFlags.Ambient) {
        return undefined;
    }

    // Get the span in the node based on its syntax
    return spanInNode(tokenAtLocation);

    function textSpan(startNode: ts.Node, endNode?: ts.Node) {
        const lastDecorator = ts.canHaveDecorators(startNode) ? ts.findLast(startNode.modifiers, ts.isDecorator) : undefined;
        const start = lastDecorator ?
            ts.skipTrivia(sourceFile.text, lastDecorator.end) :
            startNode.getStart(sourceFile);
        return ts.createTextSpanFromBounds(start, (endNode || startNode).getEnd());
    }

    function textSpanEndingAtNextToken(startNode: ts.Node, previousTokenToFindNextEndToken: ts.Node): ts.TextSpan {
        return textSpan(startNode, ts.findNextToken(previousTokenToFindNextEndToken, previousTokenToFindNextEndToken.parent, sourceFile));
    }

    function spanInNodeIfStartsOnSameLine(node: ts.Node | undefined, otherwiseOnNode?: ts.Node): ts.TextSpan | undefined {
        if (node && lineOfPosition === sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line) {
            return spanInNode(node);
        }
        return spanInNode(otherwiseOnNode);
    }

    function spanInNodeArray<T extends ts.Node>(nodeArray: ts.NodeArray<T> | undefined, node: T, match: (value: ts.Node) => boolean) {
        if (nodeArray) {
            const index = nodeArray.indexOf(node);
            if (index >= 0) {
                let start = index;
                let end = index + 1;
                while (start > 0 && match(nodeArray[start - 1])) start--;
                while (end < nodeArray.length && match(nodeArray[end])) end++;
                return ts.createTextSpanFromBounds(ts.skipTrivia(sourceFile.text, nodeArray[start].pos), nodeArray[end - 1].end);
            }
        }
        return textSpan(node);
    }

    function spanInPreviousNode(node: ts.Node): ts.TextSpan | undefined {
        return spanInNode(ts.findPrecedingToken(node.pos, sourceFile));
    }

    function spanInNextNode(node: ts.Node): ts.TextSpan | undefined {
        return spanInNode(ts.findNextToken(node, node.parent, sourceFile));
    }

    function spanInNode(node: ts.Node | undefined): ts.TextSpan | undefined {
        if (node) {
            const { parent } = node;
            switch (node.kind) {
                case ts.SyntaxKind.VariableStatement:
                    // Span on first variable declaration
                    return spanInVariableDeclaration((node as ts.VariableStatement).declarationList.declarations[0]);

                case ts.SyntaxKind.VariableDeclaration:
                case ts.SyntaxKind.PropertyDeclaration:
                case ts.SyntaxKind.PropertySignature:
                    return spanInVariableDeclaration(node as ts.VariableDeclaration | ts.PropertyDeclaration | ts.PropertySignature);

                case ts.SyntaxKind.Parameter:
                    return spanInParameterDeclaration(node as ts.ParameterDeclaration);

                case ts.SyntaxKind.FunctionDeclaration:
                case ts.SyntaxKind.MethodDeclaration:
                case ts.SyntaxKind.MethodSignature:
                case ts.SyntaxKind.GetAccessor:
                case ts.SyntaxKind.SetAccessor:
                case ts.SyntaxKind.Constructor:
                case ts.SyntaxKind.FunctionExpression:
                case ts.SyntaxKind.ArrowFunction:
                    return spanInFunctionDeclaration(node as ts.FunctionLikeDeclaration);

                case ts.SyntaxKind.Block:
                    if (ts.isFunctionBlock(node)) {
                        return spanInFunctionBlock(node as ts.Block);
                    }
                    // falls through
                case ts.SyntaxKind.ModuleBlock:
                    return spanInBlock(node as ts.Block);

                case ts.SyntaxKind.CatchClause:
                    return spanInBlock((node as ts.CatchClause).block);

                case ts.SyntaxKind.ExpressionStatement:
                    // span on the expression
                    return textSpan((node as ts.ExpressionStatement).expression);

                case ts.SyntaxKind.ReturnStatement:
                    // span on return keyword and expression if present
                    return textSpan(node.getChildAt(0), (node as ts.ReturnStatement).expression);

                case ts.SyntaxKind.WhileStatement:
                    // Span on while(...)
                    return textSpanEndingAtNextToken(node, (node as ts.WhileStatement).expression);

                case ts.SyntaxKind.DoStatement:
                    // span in statement of the do statement
                    return spanInNode((node as ts.DoStatement).statement);

                case ts.SyntaxKind.DebuggerStatement:
                    // span on debugger keyword
                    return textSpan(node.getChildAt(0));

                case ts.SyntaxKind.IfStatement:
                    // set on if(..) span
                    return textSpanEndingAtNextToken(node, (node as ts.IfStatement).expression);

                case ts.SyntaxKind.LabeledStatement:
                    // span in statement
                    return spanInNode((node as ts.LabeledStatement).statement);

                case ts.SyntaxKind.BreakStatement:
                case ts.SyntaxKind.ContinueStatement:
                    // On break or continue keyword and label if present
                    return textSpan(node.getChildAt(0), (node as ts.BreakOrContinueStatement).label);

                case ts.SyntaxKind.ForStatement:
                    return spanInForStatement(node as ts.ForStatement);

                case ts.SyntaxKind.ForInStatement:
                    // span of for (a in ...)
                    return textSpanEndingAtNextToken(node, (node as ts.ForInStatement).expression);

                case ts.SyntaxKind.ForOfStatement:
                    // span in initializer
                    return spanInInitializerOfForLike(node as ts.ForOfStatement);

                case ts.SyntaxKind.SwitchStatement:
                    // span on switch(...)
                    return textSpanEndingAtNextToken(node, (node as ts.SwitchStatement).expression);

                case ts.SyntaxKind.CaseClause:
                case ts.SyntaxKind.DefaultClause:
                    // span in first statement of the clause
                    return spanInNode((node as ts.CaseOrDefaultClause).statements[0]);

                case ts.SyntaxKind.TryStatement:
                    // span in try block
                    return spanInBlock((node as ts.TryStatement).tryBlock);

                case ts.SyntaxKind.ThrowStatement:
                    // span in throw ...
                    return textSpan(node, (node as ts.ThrowStatement).expression);

                case ts.SyntaxKind.ExportAssignment:
                    // span on export = id
                    return textSpan(node, (node as ts.ExportAssignment).expression);

                case ts.SyntaxKind.ImportEqualsDeclaration:
                    // import statement without including semicolon
                    return textSpan(node, (node as ts.ImportEqualsDeclaration).moduleReference);

                case ts.SyntaxKind.ImportDeclaration:
                    // import statement without including semicolon
                    return textSpan(node, (node as ts.ImportDeclaration).moduleSpecifier);

                case ts.SyntaxKind.ExportDeclaration:
                    // import statement without including semicolon
                    return textSpan(node, (node as ts.ExportDeclaration).moduleSpecifier);

                case ts.SyntaxKind.ModuleDeclaration:
                    // span on complete module if it is instantiated
                    if (ts.getModuleInstanceState(node as ts.ModuleDeclaration) !== ts.ModuleInstanceState.Instantiated) {
                        return undefined;
                    }
                    // falls through

                case ts.SyntaxKind.ClassDeclaration:
                case ts.SyntaxKind.EnumDeclaration:
                case ts.SyntaxKind.EnumMember:
                case ts.SyntaxKind.BindingElement:
                    // span on complete node
                    return textSpan(node);

                case ts.SyntaxKind.WithStatement:
                    // span in statement
                    return spanInNode((node as ts.WithStatement).statement);

                case ts.SyntaxKind.Decorator:
                    return spanInNodeArray((parent as ts.HasDecorators).modifiers, node, ts.isDecorator);

                case ts.SyntaxKind.ObjectBindingPattern:
                case ts.SyntaxKind.ArrayBindingPattern:
                    return spanInBindingPattern(node as ts.BindingPattern);

                // No breakpoint in interface, type alias
                case ts.SyntaxKind.InterfaceDeclaration:
                case ts.SyntaxKind.TypeAliasDeclaration:
                    return undefined;

                // Tokens:
                case ts.SyntaxKind.SemicolonToken:
                case ts.SyntaxKind.EndOfFileToken:
                    return spanInNodeIfStartsOnSameLine(ts.findPrecedingToken(node.pos, sourceFile));

                case ts.SyntaxKind.CommaToken:
                    return spanInPreviousNode(node);

                case ts.SyntaxKind.OpenBraceToken:
                    return spanInOpenBraceToken(node);

                case ts.SyntaxKind.CloseBraceToken:
                    return spanInCloseBraceToken(node);

                case ts.SyntaxKind.CloseBracketToken:
                    return spanInCloseBracketToken(node);

                case ts.SyntaxKind.OpenParenToken:
                    return spanInOpenParenToken(node);

                case ts.SyntaxKind.CloseParenToken:
                    return spanInCloseParenToken(node);

                case ts.SyntaxKind.ColonToken:
                    return spanInColonToken(node);

                case ts.SyntaxKind.GreaterThanToken:
                case ts.SyntaxKind.LessThanToken:
                    return spanInGreaterThanOrLessThanToken(node);

                // Keywords:
                case ts.SyntaxKind.WhileKeyword:
                    return spanInWhileKeyword(node);

                case ts.SyntaxKind.ElseKeyword:
                case ts.SyntaxKind.CatchKeyword:
                case ts.SyntaxKind.FinallyKeyword:
                    return spanInNextNode(node);

                case ts.SyntaxKind.OfKeyword:
                    return spanInOfKeyword(node);

                default:
                    // Destructuring pattern in destructuring assignment
                    // [a, b, c] of
                    // [a, b, c] = expression
                    if (ts.isArrayLiteralOrObjectLiteralDestructuringPattern(node)) {
                        return spanInArrayLiteralOrObjectLiteralDestructuringPattern(node as ts.DestructuringPattern);
                    }

                    // Set breakpoint on identifier element of destructuring pattern
                    // `a` or `...c` or `d: x` from
                    // `[a, b, ...c]` or `{ a, b }` or `{ d: x }` from destructuring pattern
                    if ((node.kind === ts.SyntaxKind.Identifier ||
                        node.kind === ts.SyntaxKind.SpreadElement ||
                        node.kind === ts.SyntaxKind.PropertyAssignment ||
                        node.kind === ts.SyntaxKind.ShorthandPropertyAssignment) &&
                        ts.isArrayLiteralOrObjectLiteralDestructuringPattern(parent)) {
                        return textSpan(node);
                    }

                    if (node.kind === ts.SyntaxKind.BinaryExpression) {
                        const { left, operatorToken } = node as ts.BinaryExpression;
                        // Set breakpoint in destructuring pattern if its destructuring assignment
                        // [a, b, c] or {a, b, c} of
                        // [a, b, c] = expression or
                        // {a, b, c} = expression
                        if (ts.isArrayLiteralOrObjectLiteralDestructuringPattern(left)) {
                            return spanInArrayLiteralOrObjectLiteralDestructuringPattern(
                                left as ts.ArrayLiteralExpression | ts.ObjectLiteralExpression);
                        }

                        if (operatorToken.kind === ts.SyntaxKind.EqualsToken && ts.isArrayLiteralOrObjectLiteralDestructuringPattern(node.parent)) {
                            // Set breakpoint on assignment expression element of destructuring pattern
                            // a = expression of
                            // [a = expression, b, c] = someExpression or
                            // { a = expression, b, c } = someExpression
                            return textSpan(node);
                        }

                        if (operatorToken.kind === ts.SyntaxKind.CommaToken) {
                            return spanInNode(left);
                        }
                    }

                    if (ts.isExpressionNode(node)) {
                        switch (parent.kind) {
                            case ts.SyntaxKind.DoStatement:
                                // Set span as if on while keyword
                                return spanInPreviousNode(node);

                            case ts.SyntaxKind.Decorator:
                                // Set breakpoint on the decorator emit
                                return spanInNode(node.parent);

                            case ts.SyntaxKind.ForStatement:
                            case ts.SyntaxKind.ForOfStatement:
                                return textSpan(node);

                            case ts.SyntaxKind.BinaryExpression:
                                if ((node.parent as ts.BinaryExpression).operatorToken.kind === ts.SyntaxKind.CommaToken) {
                                    // If this is a comma expression, the breakpoint is possible in this expression
                                    return textSpan(node);
                                }
                                break;

                            case ts.SyntaxKind.ArrowFunction:
                                if ((node.parent as ts.FunctionLikeDeclaration).body === node) {
                                    // If this is body of arrow function, it is allowed to have the breakpoint
                                    return textSpan(node);
                                }
                                break;
                        }
                    }

                    switch (node.parent.kind) {
                        case ts.SyntaxKind.PropertyAssignment:
                            // If this is name of property assignment, set breakpoint in the initializer
                            if ((node.parent as ts.PropertyAssignment).name === node &&
                                !ts.isArrayLiteralOrObjectLiteralDestructuringPattern(node.parent.parent)) {
                                return spanInNode((node.parent as ts.PropertyAssignment).initializer);
                            }
                            break;
                        case ts.SyntaxKind.TypeAssertionExpression:
                            // Breakpoint in type assertion goes to its operand
                            if ((node.parent as ts.TypeAssertion).type === node) {
                                return spanInNextNode((node.parent as ts.TypeAssertion).type);
                            }
                            break;
                        case ts.SyntaxKind.VariableDeclaration:
                        case ts.SyntaxKind.Parameter: {
                            // initializer of variable/parameter declaration go to previous node
                            const { initializer, type } = node.parent as ts.VariableDeclaration | ts.ParameterDeclaration;
                            if (initializer === node || type === node || ts.isAssignmentOperator(node.kind)) {
                                return spanInPreviousNode(node);
                            }
                            break;
                        }
                        case ts.SyntaxKind.BinaryExpression: {
                            const { left } = node.parent as ts.BinaryExpression;
                            if (ts.isArrayLiteralOrObjectLiteralDestructuringPattern(left) && node !== left) {
                                // If initializer of destructuring assignment move to previous token
                                return spanInPreviousNode(node);
                            }
                            break;
                        }
                        default:
                            // return type of function go to previous token
                            if (ts.isFunctionLike(node.parent) && node.parent.type === node) {
                                return spanInPreviousNode(node);
                            }
                    }

                    // Default go to parent to set the breakpoint
                    return spanInNode(node.parent);
            }
        }

        function textSpanFromVariableDeclaration(variableDeclaration: ts.VariableDeclaration | ts.PropertyDeclaration | ts.PropertySignature): ts.TextSpan {
            if (ts.isVariableDeclarationList(variableDeclaration.parent) && variableDeclaration.parent.declarations[0] === variableDeclaration) {
                // First declaration - include let keyword
                return textSpan(ts.findPrecedingToken(variableDeclaration.pos, sourceFile, variableDeclaration.parent)!, variableDeclaration);
            }
            else {
                // Span only on this declaration
                return textSpan(variableDeclaration);
            }
        }

        function spanInVariableDeclaration(variableDeclaration: ts.VariableDeclaration | ts.PropertyDeclaration | ts.PropertySignature): ts.TextSpan | undefined {
            // If declaration of for in statement, just set the span in parent
            if (variableDeclaration.parent.parent.kind === ts.SyntaxKind.ForInStatement) {
                return spanInNode(variableDeclaration.parent.parent);
            }

            const parent = variableDeclaration.parent;
            // If this is a destructuring pattern, set breakpoint in binding pattern
            if (ts.isBindingPattern(variableDeclaration.name)) {
                return spanInBindingPattern(variableDeclaration.name);
            }

            // Breakpoint is possible in variableDeclaration only if there is initialization
            // or its declaration from 'for of'
            if ((ts.hasOnlyExpressionInitializer(variableDeclaration) && variableDeclaration.initializer) ||
                ts.hasSyntacticModifier(variableDeclaration, ts.ModifierFlags.Export) ||
                parent.parent.kind === ts.SyntaxKind.ForOfStatement) {
                return textSpanFromVariableDeclaration(variableDeclaration);
            }

            if (ts.isVariableDeclarationList(variableDeclaration.parent) &&
                variableDeclaration.parent.declarations[0] !== variableDeclaration) {
                // If we cannot set breakpoint on this declaration, set it on previous one
                // Because the variable declaration may be binding pattern and
                // we would like to set breakpoint in last binding element if that's the case,
                // use preceding token instead
                return spanInNode(ts.findPrecedingToken(variableDeclaration.pos, sourceFile, variableDeclaration.parent));
            }
        }

        function canHaveSpanInParameterDeclaration(parameter: ts.ParameterDeclaration): boolean {
            // Breakpoint is possible on parameter only if it has initializer, is a rest parameter, or has public or private modifier
            return !!parameter.initializer || parameter.dotDotDotToken !== undefined ||
                ts.hasSyntacticModifier(parameter, ts.ModifierFlags.Public | ts.ModifierFlags.Private);
        }

        function spanInParameterDeclaration(parameter: ts.ParameterDeclaration): ts.TextSpan | undefined {
            if (ts.isBindingPattern(parameter.name)) {
                // Set breakpoint in binding pattern
                return spanInBindingPattern(parameter.name);
            }
            else if (canHaveSpanInParameterDeclaration(parameter)) {
                return textSpan(parameter);
            }
            else {
                const functionDeclaration = parameter.parent as ts.FunctionLikeDeclaration;
                const indexOfParameter = functionDeclaration.parameters.indexOf(parameter);
                ts.Debug.assert(indexOfParameter !== -1);
                if (indexOfParameter !== 0) {
                    // Not a first parameter, go to previous parameter
                    return spanInParameterDeclaration(functionDeclaration.parameters[indexOfParameter - 1]);
                }
                else {
                    // Set breakpoint in the function declaration body
                    return spanInNode(functionDeclaration.body);
                }
            }
        }

        function canFunctionHaveSpanInWholeDeclaration(functionDeclaration: ts.FunctionLikeDeclaration) {
            return ts.hasSyntacticModifier(functionDeclaration, ts.ModifierFlags.Export) ||
                (functionDeclaration.parent.kind === ts.SyntaxKind.ClassDeclaration && functionDeclaration.kind !== ts.SyntaxKind.Constructor);
        }

        function spanInFunctionDeclaration(functionDeclaration: ts.FunctionLikeDeclaration): ts.TextSpan | undefined {
            // No breakpoints in the function signature
            if (!functionDeclaration.body) {
                return undefined;
            }

            if (canFunctionHaveSpanInWholeDeclaration(functionDeclaration)) {
                // Set the span on whole function declaration
                return textSpan(functionDeclaration);
            }

            // Set span in function body
            return spanInNode(functionDeclaration.body);
        }

        function spanInFunctionBlock(block: ts.Block): ts.TextSpan | undefined {
            const nodeForSpanInBlock = block.statements.length ? block.statements[0] : block.getLastToken();
            if (canFunctionHaveSpanInWholeDeclaration(block.parent as ts.FunctionLikeDeclaration)) {
                return spanInNodeIfStartsOnSameLine(block.parent, nodeForSpanInBlock);
            }

            return spanInNode(nodeForSpanInBlock);
        }

        function spanInBlock(block: ts.Block): ts.TextSpan | undefined {
            switch (block.parent.kind) {
                case ts.SyntaxKind.ModuleDeclaration:
                    if (ts.getModuleInstanceState(block.parent as ts.ModuleDeclaration) !== ts.ModuleInstanceState.Instantiated) {
                        return undefined;
                    }

                // Set on parent if on same line otherwise on first statement
                // falls through
                case ts.SyntaxKind.WhileStatement:
                case ts.SyntaxKind.IfStatement:
                case ts.SyntaxKind.ForInStatement:
                    return spanInNodeIfStartsOnSameLine(block.parent, block.statements[0]);

                // Set span on previous token if it starts on same line otherwise on the first statement of the block
                case ts.SyntaxKind.ForStatement:
                case ts.SyntaxKind.ForOfStatement:
                    return spanInNodeIfStartsOnSameLine(ts.findPrecedingToken(block.pos, sourceFile, block.parent), block.statements[0]);
            }

            // Default action is to set on first statement
            return spanInNode(block.statements[0]);
        }

        function spanInInitializerOfForLike(forLikeStatement: ts.ForStatement | ts.ForOfStatement | ts.ForInStatement): ts.TextSpan | undefined {
            if (forLikeStatement.initializer!.kind === ts.SyntaxKind.VariableDeclarationList) {
                // Declaration list - set breakpoint in first declaration
                const variableDeclarationList = forLikeStatement.initializer as ts.VariableDeclarationList;
                if (variableDeclarationList.declarations.length > 0) {
                    return spanInNode(variableDeclarationList.declarations[0]);
                }
            }
            else {
                // Expression - set breakpoint in it
                return spanInNode(forLikeStatement.initializer);
            }
        }

        function spanInForStatement(forStatement: ts.ForStatement): ts.TextSpan | undefined {
            if (forStatement.initializer) {
                return spanInInitializerOfForLike(forStatement);
            }

            if (forStatement.condition) {
                return textSpan(forStatement.condition);
            }
            if (forStatement.incrementor) {
                return textSpan(forStatement.incrementor);
            }
        }

        function spanInBindingPattern(bindingPattern: ts.BindingPattern): ts.TextSpan | undefined {
            // Set breakpoint in first binding element
            const firstBindingElement = ts.forEach(bindingPattern.elements,
                element => element.kind !== ts.SyntaxKind.OmittedExpression ? element : undefined);

            if (firstBindingElement) {
                return spanInNode(firstBindingElement);
            }

            // Empty binding pattern of binding element, set breakpoint on binding element
            if (bindingPattern.parent.kind === ts.SyntaxKind.BindingElement) {
                return textSpan(bindingPattern.parent);
            }

            // Variable declaration is used as the span
            return textSpanFromVariableDeclaration(bindingPattern.parent as ts.VariableDeclaration);
        }

        function spanInArrayLiteralOrObjectLiteralDestructuringPattern(node: ts.DestructuringPattern): ts.TextSpan | undefined {
            ts.Debug.assert(node.kind !== ts.SyntaxKind.ArrayBindingPattern && node.kind !== ts.SyntaxKind.ObjectBindingPattern);
            const elements: ts.NodeArray<ts.Expression | ts.ObjectLiteralElement> = node.kind === ts.SyntaxKind.ArrayLiteralExpression ? node.elements : node.properties;

            const firstBindingElement = ts.forEach(elements,
                element => element.kind !== ts.SyntaxKind.OmittedExpression ? element : undefined);

            if (firstBindingElement) {
                return spanInNode(firstBindingElement);
            }

            // Could be ArrayLiteral from destructuring assignment or
            // just nested element in another destructuring assignment
            // set breakpoint on assignment when parent is destructuring assignment
            // Otherwise set breakpoint for this element
            return textSpan(node.parent.kind === ts.SyntaxKind.BinaryExpression ? node.parent : node);
        }

        // Tokens:
        function spanInOpenBraceToken(node: ts.Node): ts.TextSpan | undefined {
            switch (node.parent.kind) {
                case ts.SyntaxKind.EnumDeclaration:
                    const enumDeclaration = node.parent as ts.EnumDeclaration;
                    return spanInNodeIfStartsOnSameLine(ts.findPrecedingToken(node.pos, sourceFile, node.parent), enumDeclaration.members.length ? enumDeclaration.members[0] : enumDeclaration.getLastToken(sourceFile));

                case ts.SyntaxKind.ClassDeclaration:
                    const classDeclaration = node.parent as ts.ClassDeclaration;
                    return spanInNodeIfStartsOnSameLine(ts.findPrecedingToken(node.pos, sourceFile, node.parent), classDeclaration.members.length ? classDeclaration.members[0] : classDeclaration.getLastToken(sourceFile));

                case ts.SyntaxKind.CaseBlock:
                    return spanInNodeIfStartsOnSameLine(node.parent.parent, (node.parent as ts.CaseBlock).clauses[0]);
            }

            // Default to parent node
            return spanInNode(node.parent);
        }

        function spanInCloseBraceToken(node: ts.Node): ts.TextSpan | undefined {
            switch (node.parent.kind) {
                case ts.SyntaxKind.ModuleBlock:
                    // If this is not an instantiated module block, no bp span
                    if (ts.getModuleInstanceState(node.parent.parent as ts.ModuleDeclaration) !== ts.ModuleInstanceState.Instantiated) {
                        return undefined;
                    }
                    // falls through

                case ts.SyntaxKind.EnumDeclaration:
                case ts.SyntaxKind.ClassDeclaration:
                    // Span on close brace token
                    return textSpan(node);

                case ts.SyntaxKind.Block:
                    if (ts.isFunctionBlock(node.parent)) {
                        // Span on close brace token
                        return textSpan(node);
                    }
                    // falls through

                case ts.SyntaxKind.CatchClause:
                    return spanInNode(ts.lastOrUndefined((node.parent as ts.Block).statements));

                case ts.SyntaxKind.CaseBlock:
                    // breakpoint in last statement of the last clause
                    const caseBlock = node.parent as ts.CaseBlock;
                    const lastClause = ts.lastOrUndefined(caseBlock.clauses);
                    if (lastClause) {
                        return spanInNode(ts.lastOrUndefined(lastClause.statements));
                    }
                    return undefined;

                case ts.SyntaxKind.ObjectBindingPattern:
                    // Breakpoint in last binding element or binding pattern if it contains no elements
                    const bindingPattern = node.parent as ts.BindingPattern;
                    return spanInNode(ts.lastOrUndefined(bindingPattern.elements) || bindingPattern);

                // Default to parent node
                default:
                    if (ts.isArrayLiteralOrObjectLiteralDestructuringPattern(node.parent)) {
                        // Breakpoint in last binding element or binding pattern if it contains no elements
                        const objectLiteral = node.parent as ts.ObjectLiteralExpression;
                        return textSpan(ts.lastOrUndefined(objectLiteral.properties) || objectLiteral);
                    }
                    return spanInNode(node.parent);
            }
        }

        function spanInCloseBracketToken(node: ts.Node): ts.TextSpan | undefined {
            switch (node.parent.kind) {
                case ts.SyntaxKind.ArrayBindingPattern:
                    // Breakpoint in last binding element or binding pattern if it contains no elements
                    const bindingPattern = node.parent as ts.BindingPattern;
                    return textSpan(ts.lastOrUndefined(bindingPattern.elements) || bindingPattern);

                default:
                    if (ts.isArrayLiteralOrObjectLiteralDestructuringPattern(node.parent)) {
                        // Breakpoint in last binding element or binding pattern if it contains no elements
                        const arrayLiteral = node.parent as ts.ArrayLiteralExpression;
                        return textSpan(ts.lastOrUndefined(arrayLiteral.elements) || arrayLiteral);
                    }

                    // Default to parent node
                    return spanInNode(node.parent);
            }
        }

        function spanInOpenParenToken(node: ts.Node): ts.TextSpan | undefined {
            if (node.parent.kind === ts.SyntaxKind.DoStatement || // Go to while keyword and do action instead
                node.parent.kind === ts.SyntaxKind.CallExpression ||
                node.parent.kind === ts.SyntaxKind.NewExpression) {
                return spanInPreviousNode(node);
            }

            if (node.parent.kind === ts.SyntaxKind.ParenthesizedExpression) {
                return spanInNextNode(node);
            }

            // Default to parent node
            return spanInNode(node.parent);
        }

        function spanInCloseParenToken(node: ts.Node): ts.TextSpan | undefined {
            // Is this close paren token of parameter list, set span in previous token
            switch (node.parent.kind) {
                case ts.SyntaxKind.FunctionExpression:
                case ts.SyntaxKind.FunctionDeclaration:
                case ts.SyntaxKind.ArrowFunction:
                case ts.SyntaxKind.MethodDeclaration:
                case ts.SyntaxKind.MethodSignature:
                case ts.SyntaxKind.GetAccessor:
                case ts.SyntaxKind.SetAccessor:
                case ts.SyntaxKind.Constructor:
                case ts.SyntaxKind.WhileStatement:
                case ts.SyntaxKind.DoStatement:
                case ts.SyntaxKind.ForStatement:
                case ts.SyntaxKind.ForOfStatement:
                case ts.SyntaxKind.CallExpression:
                case ts.SyntaxKind.NewExpression:
                case ts.SyntaxKind.ParenthesizedExpression:
                    return spanInPreviousNode(node);

                // Default to parent node
                default:
                    return spanInNode(node.parent);
            }
        }

        function spanInColonToken(node: ts.Node): ts.TextSpan | undefined {
            // Is this : specifying return annotation of the function declaration
            if (ts.isFunctionLike(node.parent) ||
                node.parent.kind === ts.SyntaxKind.PropertyAssignment ||
                node.parent.kind === ts.SyntaxKind.Parameter) {
                return spanInPreviousNode(node);
            }

            return spanInNode(node.parent);
        }

        function spanInGreaterThanOrLessThanToken(node: ts.Node): ts.TextSpan | undefined {
            if (node.parent.kind === ts.SyntaxKind.TypeAssertionExpression) {
                return spanInNextNode(node);
            }

            return spanInNode(node.parent);
        }

        function spanInWhileKeyword(node: ts.Node): ts.TextSpan | undefined {
            if (node.parent.kind === ts.SyntaxKind.DoStatement) {
                // Set span on while expression
                return textSpanEndingAtNextToken(node, (node.parent as ts.DoStatement).expression);
            }

            // Default to parent node
            return spanInNode(node.parent);
        }

        function spanInOfKeyword(node: ts.Node): ts.TextSpan | undefined {
            if (node.parent.kind === ts.SyntaxKind.ForOfStatement) {
                // Set using next token
                return spanInNextNode(node);
            }

            // Default to parent node
            return spanInNode(node.parent);
        }
    }
}
}
