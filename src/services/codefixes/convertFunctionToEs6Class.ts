/* @internal */
namespace ts.codefix {
    const fixId = "convertFunctionToEs6Class";
    const errorCodes = [Diagnostics.This_constructor_function_may_be_converted_to_a_class_declaration.code];
    registerCodeFix({
        errorCodes,
        getCodeActions(context: CodeFixContext) {
            const changes = textChanges.ChangeTracker.with(context, t => doChange(t, context.sourceFile, context.span.start, context.program.getTypeChecker()));
            return [{ description: getLocaleSpecificMessage(Diagnostics.Convert_function_to_an_ES2015_class), changes, fixId }];
        },
        fixIds: [fixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, err) => doChange(changes, err.file!, err.start, context.program.getTypeChecker())),
    });

    function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, position: number, checker: TypeChecker): void {
        const deletedNodes: Node[] = [];
        const deletes: (() => void)[] = [];
        const ctorSymbol = checker.getSymbolAtLocation(getTokenAtPosition(sourceFile, position, /*includeJsDocComment*/ false));

        if (!ctorSymbol || !(ctorSymbol.flags & (SymbolFlags.Function | SymbolFlags.Variable))) {
            // Bad input
            return undefined;
        }

        const ctorDeclaration = ctorSymbol.valueDeclaration;

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
        changes.insertNodeAfter(sourceFile, precedingNode, newClassDeclaration);
        for (const deleteCallback of deletes) {
            deleteCallback();
        }

        function deleteNode(node: Node, inList = false) {
            if (deletedNodes.some(n => isNodeDescendantOf(node, n))) {
                // Parent node has already been deleted; do nothing
                return;
            }
            deletedNodes.push(node);
            if (inList) {
                deletes.push(() => changes.deleteNodeInList(sourceFile, node));
            }
            else {
                deletes.push(() => changes.deleteNode(sourceFile, node));
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
                    return createProperty([], modifiers, symbol.name, /*questionToken*/ undefined,
                        /*type*/ undefined, /*initializer*/ undefined);
                }

                switch (assignmentBinaryExpression.right.kind) {
                    case SyntaxKind.FunctionExpression: {
                        const functionExpression = assignmentBinaryExpression.right as FunctionExpression;
                        const fullModifiers = concatenate(modifiers, getModifierKindFromSource(functionExpression, SyntaxKind.AsyncKeyword));
                        const method = createMethod(/*decorators*/ undefined, fullModifiers, /*asteriskToken*/ undefined, memberDeclaration.name, /*questionToken*/ undefined,
                            /*typeParameters*/ undefined, functionExpression.parameters, /*type*/ undefined, functionExpression.body);
                        copyComments(assignmentBinaryExpression, method, sourceFile);
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
                            bodyBlock = createBlock([createReturn(arrowFunctionBody)]);
                        }
                        const fullModifiers = concatenate(modifiers, getModifierKindFromSource(arrowFunction, SyntaxKind.AsyncKeyword));
                        const method = createMethod(/*decorators*/ undefined, fullModifiers, /*asteriskToken*/ undefined, memberDeclaration.name, /*questionToken*/ undefined,
                            /*typeParameters*/ undefined, arrowFunction.parameters, /*type*/ undefined, bodyBlock);
                        copyComments(assignmentBinaryExpression, method, sourceFile);
                        return method;
                    }

                    default: {
                        // Don't try to declare members in JavaScript files
                        if (isSourceFileJavaScript(sourceFile)) {
                            return;
                        }
                        const prop = createProperty(/*decorators*/ undefined, modifiers, memberDeclaration.name, /*questionToken*/ undefined,
                            /*type*/ undefined, assignmentBinaryExpression.right);
                        copyComments(assignmentBinaryExpression.parent, prop, sourceFile);
                        return prop;
                    }
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

            const modifiers = getModifierKindFromSource(precedingNode, SyntaxKind.ExportKeyword);
            const cls = createClassDeclaration(/*decorators*/ undefined, modifiers, node.name,
                /*typeParameters*/ undefined, /*heritageClauses*/ undefined, memberElements);
            // Don't call copyComments here because we'll already leave them in place
            return cls;
        }

        function createClassFromFunctionDeclaration(node: FunctionDeclaration): ClassDeclaration {
            const memberElements = createClassElementsFromSymbol(ctorSymbol);
            if (node.body) {
                memberElements.unshift(createConstructor(/*decorators*/ undefined, /*modifiers*/ undefined, node.parameters, node.body));
            }

            const modifiers = getModifierKindFromSource(node, SyntaxKind.ExportKeyword);
            const cls = createClassDeclaration(/*decorators*/ undefined, modifiers, node.name,
                /*typeParameters*/ undefined, /*heritageClauses*/ undefined, memberElements);
            // Don't call copyComments here because we'll already leave them in place
            return cls;
        }
    }

    function copyComments(sourceNode: Node, targetNode: Node, sourceFile: SourceFile) {
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

    function getModifierKindFromSource(source: Node, kind: SyntaxKind): ReadonlyArray<Modifier> {
        return filter(source.modifiers, modifier => modifier.kind === kind);
    }
}
