/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [Diagnostics.Convert_function_0_to_ES6_class.code],
        getCodeActions,
        createCodeFixDiagnosticIfApplicable
    });

    function createCodeFixDiagnosticIfApplicable(node: Node, context: CodeFixDiagnoseContext): Diagnostic | undefined {
        if (!isSourceFileJavaScript(context.boundSourceFile)) {
            return undefined;
        }

        const checker = context.program.getTypeChecker();
        const symbol = checker.getSymbolAtLocation(node);
        if (isClassLikeSymbol(symbol)) {
            return createDiagnosticForNode(node, Diagnostics.Convert_function_0_to_ES6_class, symbol.name);
        }

        function isClassLikeSymbol(symbol: Symbol) {
            if (!symbol || !symbol.valueDeclaration) {
                return false;
            }

            let targetSymbol: Symbol;
            if (symbol.valueDeclaration.kind === SyntaxKind.FunctionDeclaration) {
                targetSymbol = symbol;
            }
            else if (isDeclarationOfFunctionOrClassExpression(symbol)) {
                targetSymbol = (symbol.valueDeclaration as VariableDeclaration).initializer.symbol;
            }

            // if there is a prototype property assignment like:
            //     foo.prototype.method = function () { }
            // then the symbol for "foo" will have a member
            return targetSymbol && targetSymbol.members && targetSymbol.members.size > 0;
        }
    }

    function getCodeActions(context: CodeFixContext): CodeAction[] {
        const sourceFile = context.sourceFile;
        const checker = context.program.getTypeChecker();
        const token = getTokenAtPosition(sourceFile, context.span.start);
        const ctorSymbol = checker.getSymbolAtLocation(token);

        const deletes: (() => any)[] = [];

        if (!(ctorSymbol.flags & (SymbolFlags.Function | SymbolFlags.Variable))) {
            return [];
        }

        const ctorDeclaration = ctorSymbol.valueDeclaration;
        const changeTracker = textChanges.ChangeTracker.fromCodeFixContext(context);

        let precedingNode: Node;
        let newClassDeclaration: ClassDeclaration;
        switch (ctorDeclaration.kind) {
            case SyntaxKind.FunctionDeclaration:
                precedingNode = ctorDeclaration;
                deletes.push(() => changeTracker.deleteNode(sourceFile, ctorDeclaration));
                newClassDeclaration = createClassFromFunctionDeclaration(ctorDeclaration as FunctionDeclaration);
                break;

            case SyntaxKind.VariableDeclaration:
                precedingNode = ctorDeclaration.parent.parent;
                if ((<VariableDeclarationList>ctorDeclaration.parent).declarations.length === 1) {
                    deletes.push(() => changeTracker.deleteNode(sourceFile, precedingNode));
                }
                else {
                    deletes.push(() => changeTracker.deleteNodeInList(sourceFile, ctorDeclaration));
                }
                newClassDeclaration = createClassFromVariableDeclaration(ctorDeclaration as VariableDeclaration);
                break;
        }

        if (!newClassDeclaration) {
            return [];
        }

        // Because the preceding node could be touched, we need to insert nodes before delete nodes.
        changeTracker.insertNodeAfter(sourceFile, precedingNode, newClassDeclaration, { suffix: "\n" });
        for (const deleteCallback of deletes) {
            deleteCallback();
        }

        return [{
            description: `Convert function ${ctorSymbol.name} to ES6 class`,
            changes: changeTracker.getChanges()
        }];

        function createClassElementsFromSymbol(symbol: Symbol) {
            const memberElements: ClassElement[] = [];
            // all instance members are stored in the "member" array of symbol
            if (symbol.members) {
                symbol.members.forEach(member => {
                    const memberElement = createClassElement(member, /*modifiers*/ undefined);
                    if (memberElement) {
                        memberElements.push(memberElement);
                    }
                });
            }

            // all static members are stored in the "exports" array of symbol
            if (symbol.exports) {
                symbol.exports.forEach(member => {
                    const memberElement = createClassElement(member, [createToken(SyntaxKind.StaticKeyword)]);
                    if (memberElement) {
                        memberElements.push(memberElement);
                    }
                });
            }

            return memberElements;

            function createClassElement(symbol: Symbol, modifiers: Modifier[]): ClassElement {
                // both properties and methods are bound as property symbols
                if (!(symbol.flags & SymbolFlags.Property)) {
                    return;
                }

                const memberDeclaration = symbol.valueDeclaration as PropertyAccessExpression;
                const assignmentBinaryExpression = memberDeclaration.parent as BinaryExpression;

                // delete the entire statement if this expression is the sole expression to take care of the semicolon at the end
                const nodeToDelete = assignmentBinaryExpression.parent && assignmentBinaryExpression.parent.kind === SyntaxKind.ExpressionStatement
                    ? assignmentBinaryExpression.parent : assignmentBinaryExpression;
                deletes.push(() => changeTracker.deleteNode(sourceFile, nodeToDelete));

                if (!assignmentBinaryExpression.right) {
                    return createProperty([], modifiers, symbol.name, /*questionToken*/ undefined,
                        /*type*/ undefined, /*initializer*/ undefined);
                }

                switch (assignmentBinaryExpression.right.kind) {
                    case SyntaxKind.FunctionExpression:
                        const functionExpression = assignmentBinaryExpression.right as FunctionExpression;
                        return createMethodDeclaration(/*decorators*/ undefined, modifiers, /*asteriskToken*/ undefined, memberDeclaration.name, /*questionToken*/ undefined,
                            /*typeParameters*/ undefined, functionExpression.parameters, /*type*/ undefined, functionExpression.body);

                    case SyntaxKind.ArrowFunction:
                        const arrowFunction = assignmentBinaryExpression.right as ArrowFunction;
                        const arrowFunctionBody = arrowFunction.body;
                        let bodyBlock: Block;

                        // case 1: () => { return [1,2,3] }
                        if (arrowFunctionBody.kind === SyntaxKind.Block) {
                            bodyBlock = arrowFunctionBody as Block;
                        }
                        // case 2: () => [1,2,3]
                        else {
                            const expression = arrowFunctionBody as Expression;
                            bodyBlock = createBlock([createReturn(expression)]);
                        }
                        return createMethodDeclaration(/*decorators*/ undefined, modifiers, /*asteriskToken*/ undefined, memberDeclaration.name, /*questionToken*/ undefined,
                            /*typeParameters*/ undefined, arrowFunction.parameters, /*type*/ undefined, bodyBlock);
                    default:
                        return createProperty(/*decorators*/ undefined, modifiers, memberDeclaration.name, /*questionToken*/ undefined,
                            /*type*/ undefined, assignmentBinaryExpression.right);
                }
            }
        }

        function createClassFromVariableDeclaration(node: VariableDeclaration): ClassDeclaration {
            const initializer = node.initializer as FunctionExpression;
            if (!initializer || initializer.kind !== SyntaxKind.FunctionExpression) {
                return undefined;
            }

            if (node.name.kind !== SyntaxKind.Identifier) {
                return undefined;
            }

            const memberElements = createClassElementsFromSymbol(initializer.symbol);
            if (initializer.body) {
                memberElements.unshift(createConstructor(/*decorators*/ undefined, /*modifiers*/ undefined, initializer.parameters, initializer.body));
            }

            return createClassDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined, node.name,
                /*typeParameters*/ undefined, /*heritageClauses*/ undefined, memberElements);
        }

        function createClassFromFunctionDeclaration(node: FunctionDeclaration): ClassDeclaration {
            const memberElements = createClassElementsFromSymbol(ctorSymbol);
            if (node.body) {
                memberElements.unshift(createConstructor(/*decorators*/ undefined, /*modifiers*/ undefined, node.parameters, node.body));
            }
            return createClassDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined, node.name,
                /*typeParameters*/ undefined, /*heritageClauses*/ undefined, memberElements);
        }
    }
}