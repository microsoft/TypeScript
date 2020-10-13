/* @internal */
namespace ts.codefix {
    const fixId = "convertFunctionToEs6Class";
    const errorCodes = [Diagnostics.This_constructor_function_may_be_converted_to_a_class_declaration.code];
    registerCodeFix({
        errorCodes,
        getCodeActions(context: CodeFixContext) {
            const changes = textChanges.ChangeTracker.with(context, t =>
                doChange(t, context.sourceFile, context.span.start, context.program.getTypeChecker(), context.preferences, context.program.getCompilerOptions()));
            return [createCodeFixAction(fixId, changes, Diagnostics.Convert_function_to_an_ES2015_class, fixId, Diagnostics.Convert_all_constructor_functions_to_classes)];
        },
        fixIds: [fixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, err) =>
            doChange(changes, err.file, err.start, context.program.getTypeChecker(), context.preferences, context.program.getCompilerOptions())),
    });

    function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, position: number, checker: TypeChecker, preferences: UserPreferences, compilerOptions: CompilerOptions): void {
        const ctorSymbol = checker.getSymbolAtLocation(getTokenAtPosition(sourceFile, position))!;
        if (!ctorSymbol || !(ctorSymbol.flags & (SymbolFlags.Function | SymbolFlags.Variable))) {
            // Bad input
            return undefined;
        }

        const ctorDeclaration = ctorSymbol.valueDeclaration;
        if (isFunctionDeclaration(ctorDeclaration)) {
            changes.replaceNode(sourceFile, ctorDeclaration, createClassFromFunctionDeclaration(ctorDeclaration));
        }
        else if (isVariableDeclaration(ctorDeclaration)) {
            const classDeclaration = createClassFromVariableDeclaration(ctorDeclaration);
            if (!classDeclaration) {
                return undefined;
            }

            const ancestor = ctorDeclaration.parent.parent;
            if (isVariableDeclarationList(ctorDeclaration.parent) && ctorDeclaration.parent.declarations.length > 1) {
                changes.delete(sourceFile, ctorDeclaration);
                changes.insertNodeAfter(sourceFile, ancestor, classDeclaration);
            }
            else {
                changes.replaceNode(sourceFile, ancestor, classDeclaration);
            }
        }

        function createClassElementsFromSymbol(symbol: Symbol) {
            const memberElements: ClassElement[] = [];
            // all instance members are stored in the "member" array of symbol
            if (symbol.members) {
                symbol.members.forEach((member, key) => {
                    if (key === "constructor") {
                        // fn.prototype.constructor = fn
                        changes.delete(sourceFile, member.valueDeclaration.parent);
                        return;
                    }
                    const memberElement = createClassElement(member, /*modifiers*/ undefined);
                    if (memberElement) {
                        memberElements.push(...memberElement);
                    }
                });
            }

            // all static members are stored in the "exports" array of symbol
            if (symbol.exports) {
                symbol.exports.forEach(member => {
                    if (member.name === "prototype") {
                        const firstDeclaration = member.declarations[0];
                        // only one "x.prototype = { ... }" will pass
                        if (member.declarations.length === 1 &&
                            isPropertyAccessExpression(firstDeclaration) &&
                            isBinaryExpression(firstDeclaration.parent) &&
                            firstDeclaration.parent.operatorToken.kind === SyntaxKind.EqualsToken &&
                            isObjectLiteralExpression(firstDeclaration.parent.right)
                        ) {
                            const prototypes = firstDeclaration.parent.right;
                            const memberElement = createClassElement(prototypes.symbol, /** modifiers */ undefined);
                            if (memberElement) {
                                memberElements.push(...memberElement);
                            }
                        }
                    }
                    else {
                        const memberElement = createClassElement(member, [factory.createToken(SyntaxKind.StaticKeyword)]);
                        if (memberElement) {
                            memberElements.push(...memberElement);
                        }
                    }
                });
            }

            return memberElements;

            function shouldConvertDeclaration(_target: AccessExpression | ObjectLiteralExpression, source: Expression) {
                // Right now the only thing we can convert are function expressions, get/set accessors and methods
                // other values like normal value fields ({a: 1}) shouldn't get transformed.
                // We can update this once ES public class properties are available.
                if (isAccessExpression(_target)) {
                    if (isPropertyAccessExpression(_target) && isConstructorAssignment(_target)) return true;
                    return isFunctionLike(source);
                }
                else {
                    return every(_target.properties, property => {
                        // a() {}
                        if (isMethodDeclaration(property) || isGetOrSetAccessorDeclaration(property)) return true;
                        // a: function() {}
                        if (isPropertyAssignment(property) && isFunctionExpression(property.initializer) && !!property.name) return true;
                        // x.prototype.constructor = fn
                        if (isConstructorAssignment(property)) return true;
                        return false;
                    });
                }
            }

            function createClassElement(symbol: Symbol, modifiers: Modifier[] | undefined): readonly ClassElement[] {
                // Right now the only thing we can convert are function expressions, which are marked as methods
                // or { x: y } type prototype assignments, which are marked as ObjectLiteral
                const members: ClassElement[] = [];
                if (!(symbol.flags & SymbolFlags.Method) && !(symbol.flags & SymbolFlags.ObjectLiteral)) {
                    return members;
                }

                const memberDeclaration = symbol.valueDeclaration as AccessExpression | ObjectLiteralExpression;
                const assignmentBinaryExpression = memberDeclaration.parent as BinaryExpression;
                const assignmentExpr = assignmentBinaryExpression.right;
                if (!shouldConvertDeclaration(memberDeclaration, assignmentExpr)) {
                    return members;
                }

                // delete the entire statement if this expression is the sole expression to take care of the semicolon at the end
                const nodeToDelete = assignmentBinaryExpression.parent && assignmentBinaryExpression.parent.kind === SyntaxKind.ExpressionStatement
                    ? assignmentBinaryExpression.parent : assignmentBinaryExpression;
                changes.delete(sourceFile, nodeToDelete);

                if (!assignmentExpr) {
                    members.push(factory.createPropertyDeclaration([], modifiers, symbol.name, /*questionToken*/ undefined,
                        /*type*/ undefined, /*initializer*/ undefined));
                    return members;
                }

                // f.x = expr
                if (isAccessExpression(memberDeclaration) && (isFunctionExpression(assignmentExpr) || isArrowFunction(assignmentExpr))) {
                    const quotePreference = getQuotePreference(sourceFile, preferences);
                    const name = tryGetPropertyName(memberDeclaration, compilerOptions, quotePreference);
                    if (name) {
                        return createFunctionLikeExpressionMember(members, assignmentExpr, name);
                    }
                    return members;
                }
                // f.prototype = { ... }
                else if (isObjectLiteralExpression(assignmentExpr)) {
                    return flatMap(
                        assignmentExpr.properties,
                        property => {
                            if (isMethodDeclaration(property) || isGetOrSetAccessorDeclaration(property)) {
                                // MethodDeclaration and AccessorDeclaration can appear in a class directly
                                return members.concat(property);
                            }
                            if (isPropertyAssignment(property) && isFunctionExpression(property.initializer)) {
                                return createFunctionLikeExpressionMember(members, property.initializer, property.name);
                            }
                            // Drop constructor assignments
                            if (isConstructorAssignment(property)) return members;
                            return [];
                        }
                    );
                }
                else {
                    // Don't try to declare members in JavaScript files
                    if (isSourceFileJS(sourceFile)) return members;
                    if (!isPropertyAccessExpression(memberDeclaration)) return members;
                    const prop = factory.createPropertyDeclaration(/*decorators*/ undefined, modifiers, memberDeclaration.name, /*questionToken*/ undefined, /*type*/ undefined, assignmentExpr);
                    copyLeadingComments(assignmentBinaryExpression.parent, prop, sourceFile);
                    members.push(prop);
                    return members;
                }

                function createFunctionLikeExpressionMember(members: readonly ClassElement[], expression: FunctionExpression | ArrowFunction, name: PropertyName) {
                    if (isFunctionExpression(expression)) return createFunctionExpressionMember(members, expression, name);
                    else return createArrowFunctionExpressionMember(members, expression, name);
                }

                function createFunctionExpressionMember(members: readonly ClassElement[], functionExpression: FunctionExpression, name: PropertyName) {
                    const fullModifiers = concatenate(modifiers, getModifierKindFromSource(functionExpression, SyntaxKind.AsyncKeyword));
                    const method = factory.createMethodDeclaration(/*decorators*/ undefined, fullModifiers, /*asteriskToken*/ undefined, name, /*questionToken*/ undefined,
                        /*typeParameters*/ undefined, functionExpression.parameters, /*type*/ undefined, functionExpression.body);
                    copyLeadingComments(assignmentBinaryExpression, method, sourceFile);
                    return members.concat(method);
                }

                function createArrowFunctionExpressionMember(members: readonly ClassElement[], arrowFunction: ArrowFunction, name: PropertyName) {
                    const arrowFunctionBody = arrowFunction.body;
                    let bodyBlock: Block;

                    // case 1: () => { return [1,2,3] }
                    if (arrowFunctionBody.kind === SyntaxKind.Block) {
                        bodyBlock = arrowFunctionBody as Block;
                    }
                    // case 2: () => [1,2,3]
                    else {
                        bodyBlock = factory.createBlock([factory.createReturnStatement(arrowFunctionBody)]);
                    }
                    const fullModifiers = concatenate(modifiers, getModifierKindFromSource(arrowFunction, SyntaxKind.AsyncKeyword));
                    const method = factory.createMethodDeclaration(/*decorators*/ undefined, fullModifiers, /*asteriskToken*/ undefined, name, /*questionToken*/ undefined,
                        /*typeParameters*/ undefined, arrowFunction.parameters, /*type*/ undefined, bodyBlock);
                    copyLeadingComments(assignmentBinaryExpression, method, sourceFile);
                    return members.concat(method);
                }
            }
        }

        function createClassFromVariableDeclaration(node: VariableDeclaration): ClassDeclaration | undefined {
            const initializer = node.initializer;
            if (!initializer || !isFunctionExpression(initializer) || !isIdentifier(node.name)) {
                return undefined;
            }

            const memberElements = createClassElementsFromSymbol(node.symbol);
            if (initializer.body) {
                memberElements.unshift(factory.createConstructorDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined, initializer.parameters, initializer.body));
            }

            const modifiers = getModifierKindFromSource(node.parent.parent, SyntaxKind.ExportKeyword);
            const cls = factory.createClassDeclaration(/*decorators*/ undefined, modifiers, node.name,
                /*typeParameters*/ undefined, /*heritageClauses*/ undefined, memberElements);
            // Don't call copyComments here because we'll already leave them in place
            return cls;
        }

        function createClassFromFunctionDeclaration(node: FunctionDeclaration): ClassDeclaration {
            const memberElements = createClassElementsFromSymbol(ctorSymbol);
            if (node.body) {
                memberElements.unshift(factory.createConstructorDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined, node.parameters, node.body));
            }

            const modifiers = getModifierKindFromSource(node, SyntaxKind.ExportKeyword);
            const cls = factory.createClassDeclaration(/*decorators*/ undefined, modifiers, node.name,
                /*typeParameters*/ undefined, /*heritageClauses*/ undefined, memberElements);
            // Don't call copyComments here because we'll already leave them in place
            return cls;
        }
    }

    function getModifierKindFromSource(source: Node, kind: SyntaxKind): readonly Modifier[] | undefined {
        return filter(source.modifiers, modifier => modifier.kind === kind);
    }

    function isConstructorAssignment(x: ObjectLiteralElementLike | PropertyAccessExpression) {
        if (!x.name) return false;
        if (isIdentifier(x.name) && x.name.text === "constructor") return true;
        return false;
    }

    function tryGetPropertyName(node: AccessExpression, compilerOptions: CompilerOptions, quotePreference: QuotePreference): PropertyName | undefined {
        if (isPropertyAccessExpression(node)) {
            return node.name;
        }

        const propName = node.argumentExpression;
        if (isNumericLiteral(propName)) {
            return propName;
        }

        if (isStringLiteralLike(propName)) {
            return isIdentifierText(propName.text, compilerOptions.target) ? factory.createIdentifier(propName.text)
                : isNoSubstitutionTemplateLiteral(propName) ? factory.createStringLiteral(propName.text, quotePreference === QuotePreference.Single)
                : propName;
        }

        return undefined;
    }
}
