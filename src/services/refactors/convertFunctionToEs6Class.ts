/* @internal */

namespace ts.refactor {
    const actionName = "convert";

    const convertFunctionToES6Class: Refactor = {
        name: "Convert to ES2015 class",
        description: Diagnostics.Convert_function_to_an_ES2015_class.message,
        getEditsForAction,
        getAvailableActions
    };

    registerRefactor(convertFunctionToES6Class);

    function getAvailableActions(context: RefactorContext): ApplicableRefactorInfo[] {
        const start = context.startPosition;
        const node = getTokenAtPosition(context.file, start, /*includeJsDocComment*/ false);
        const checker = context.program.getTypeChecker();
        let symbol = checker.getSymbolAtLocation(node);

        if (symbol && isDeclarationOfFunctionOrClassExpression(symbol)) {
            symbol = (symbol.valueDeclaration as VariableDeclaration).initializer.symbol;
        }

        if (symbol && (symbol.flags & SymbolFlags.Function) && symbol.members && (symbol.members.size > 0)) {
            return [
                {
                    name: convertFunctionToES6Class.name,
                    description: convertFunctionToES6Class.description,
                    actions: [
                        {
                            description: convertFunctionToES6Class.description,
                            name: actionName
                        }
                    ]
                }
            ];
        }
    }

    function getEditsForAction(context: RefactorContext, action: string): RefactorEditInfo | undefined {
        // Somehow wrong action got invoked?
        if (actionName !== action) {
            return undefined;
        }

        const start = context.startPosition;
        const sourceFile = context.file;
        const checker = context.program.getTypeChecker();
        const token = getTokenAtPosition(sourceFile, start, /*includeJsDocComment*/ false);
        const ctorSymbol = checker.getSymbolAtLocation(token);
        const newLine = context.rulesProvider.getFormatOptions().newLineCharacter;

        const deletedNodes: Node[] = [];
        const deletes: (() => any)[] = [];

        if (!(ctorSymbol.flags & (SymbolFlags.Function | SymbolFlags.Variable))) {
            return undefined;
        }

        const ctorDeclaration = ctorSymbol.valueDeclaration;
        const changeTracker = textChanges.ChangeTracker.fromCodeFixContext(context as { newLineCharacter: string, rulesProvider: formatting.RulesProvider });

        let precedingNode: Node;
        let newClassDeclaration: ClassDeclaration;
        switch (ctorDeclaration.kind) {
            case SyntaxKind.FunctionDeclaration:
                precedingNode = ctorDeclaration;
                deleteNode(ctorDeclaration);
                newClassDeclaration = createClassFromFunctionDeclaration(ctorDeclaration as FunctionDeclaration);
                break;

            case SyntaxKind.VariableDeclaration:
                precedingNode = ctorDeclaration.parent.parent;
                if ((<VariableDeclarationList>ctorDeclaration.parent).declarations.length === 1) {
                    deleteNode(precedingNode);
                }
                else {
                    deleteNode(ctorDeclaration, /*inList*/ true);
                }
                newClassDeclaration = createClassFromVariableDeclaration(ctorDeclaration as VariableDeclaration);
                break;
        }

        if (!newClassDeclaration) {
            return undefined;
        }

        // Because the preceding node could be touched, we need to insert nodes before delete nodes.
        changeTracker.insertNodeAfter(sourceFile, precedingNode, newClassDeclaration, { suffix: newLine });
        for (const deleteCallback of deletes) {
            deleteCallback();
        }

        return {
            edits: changeTracker.getChanges()
        };

        function deleteNode(node: Node, inList = false) {
            if (deletedNodes.some(n => isNodeDescendantOf(node, n))) {
                // Parent node has already been deleted; do nothing
                return;
            }
            deletedNodes.push(node);
            if (inList) {
                deletes.push(() => changeTracker.deleteNodeInList(sourceFile, node));
            }
            else {
                deletes.push(() => changeTracker.deleteNode(sourceFile, node));
            }
        }

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

            function shouldConvertDeclaration(_target: PropertyAccessExpression, source: Expression) {
                // Right now the only thing we can convert are function expressions - other values shouldn't get
                // transformed. We can update this once ES public class properties are available.
                return isFunctionLike(source);
            }

            function createClassElement(symbol: Symbol, modifiers: Modifier[]): ClassElement {
                // both properties and methods are bound as property symbols
                if (!(symbol.flags & SymbolFlags.Property)) {
                    return;
                }

                const memberDeclaration = symbol.valueDeclaration as PropertyAccessExpression;
                const assignmentBinaryExpression = memberDeclaration.parent as BinaryExpression;

                if (!shouldConvertDeclaration(memberDeclaration, assignmentBinaryExpression.right)) {
                    return;
                }

                // delete the entire statement if this expression is the sole expression to take care of the semicolon at the end
                const nodeToDelete = assignmentBinaryExpression.parent && assignmentBinaryExpression.parent.kind === SyntaxKind.ExpressionStatement
                    ? assignmentBinaryExpression.parent : assignmentBinaryExpression;
                deleteNode(nodeToDelete);

                if (!assignmentBinaryExpression.right) {
                    return createProperty([], modifiers, symbol.getUnescapedName(), /*questionToken*/ undefined,
                        /*type*/ undefined, /*initializer*/ undefined);
                }

                switch (assignmentBinaryExpression.right.kind) {
                    case SyntaxKind.FunctionExpression: {
                        const functionExpression = assignmentBinaryExpression.right as FunctionExpression;
                        const method = createMethod(/*decorators*/ undefined, modifiers, /*asteriskToken*/ undefined, memberDeclaration.name, /*questionToken*/ undefined,
                            /*typeParameters*/ undefined, functionExpression.parameters, /*type*/ undefined, functionExpression.body);
                        copyComments(assignmentBinaryExpression, method);
                        return method;
                    }

                    case SyntaxKind.ArrowFunction: {
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
                        const method = createMethod(/*decorators*/ undefined, modifiers, /*asteriskToken*/ undefined, memberDeclaration.name, /*questionToken*/ undefined,
                            /*typeParameters*/ undefined, arrowFunction.parameters, /*type*/ undefined, bodyBlock);
                        copyComments(assignmentBinaryExpression, method);
                        return method;
                    }

                    default: {
                        // Don't try to declare members in JavaScript files
                        if (isSourceFileJavaScript(sourceFile)) {
                            return;
                        }
                        const prop = createProperty(/*decorators*/ undefined, modifiers, memberDeclaration.name, /*questionToken*/ undefined,
                            /*type*/ undefined, assignmentBinaryExpression.right);
                        copyComments(assignmentBinaryExpression.parent, prop);
                        return prop;
                    }
                }
            }
        }

        function copyComments(sourceNode: Node, targetNode: Node) {
            forEachLeadingCommentRange(sourceFile.text, sourceNode.pos, (pos, end, kind, htnl) => {
                if (kind === SyntaxKind.MultiLineCommentTrivia) {
                    // Remove leading /*
                    pos += 2;
                    // Remove trailing */
                    end -= 2;
                }
                else {
                    // Remove leading //
                    pos += 2;
                }
                addSyntheticLeadingComment(targetNode, kind, sourceFile.text.slice(pos, end), htnl);
            });
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

            const cls = createClassDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined, node.name,
                /*typeParameters*/ undefined, /*heritageClauses*/ undefined, memberElements);
            // Don't call copyComments here because we'll already leave them in place
            return cls;
        }

        function createClassFromFunctionDeclaration(node: FunctionDeclaration): ClassDeclaration {
            const memberElements = createClassElementsFromSymbol(ctorSymbol);
            if (node.body) {
                memberElements.unshift(createConstructor(/*decorators*/ undefined, /*modifiers*/ undefined, node.parameters, node.body));
            }

            const cls = createClassDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined, node.name,
                /*typeParameters*/ undefined, /*heritageClauses*/ undefined, memberElements);
            // Don't call copyComments here because we'll already leave them in place
            return cls;
        }
    }
}