/* @internal */
namespace ts.codefix {
const fixId = "convertFunctionToEs6Class";
const errorCodes = [ts.Diagnostics.This_constructor_function_may_be_converted_to_a_class_declaration.code];
ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions(context: ts.CodeFixContext) {
        const changes = ts.textChanges.ChangeTracker.with(context, t =>
            doChange(t, context.sourceFile, context.span.start, context.program.getTypeChecker(), context.preferences, context.program.getCompilerOptions()));
        return [ts.codefix.createCodeFixAction(fixId, changes, ts.Diagnostics.Convert_function_to_an_ES2015_class, fixId, ts.Diagnostics.Convert_all_constructor_functions_to_classes)];
    },
    fixIds: [fixId],
    getAllCodeActions: context => ts.codefix.codeFixAll(context, errorCodes, (changes, err) =>
        doChange(changes, err.file, err.start, context.program.getTypeChecker(), context.preferences, context.program.getCompilerOptions())),
});

function doChange(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, position: number, checker: ts.TypeChecker, preferences: ts.UserPreferences, compilerOptions: ts.CompilerOptions): void {
    const ctorSymbol = checker.getSymbolAtLocation(ts.getTokenAtPosition(sourceFile, position))!;
    if (!ctorSymbol || !ctorSymbol.valueDeclaration || !(ctorSymbol.flags & (ts.SymbolFlags.Function | ts.SymbolFlags.Variable))) {
        // Bad input
        return undefined;
    }

    const ctorDeclaration = ctorSymbol.valueDeclaration;
    if (ts.isFunctionDeclaration(ctorDeclaration) || ts.isFunctionExpression(ctorDeclaration)) {
        changes.replaceNode(sourceFile, ctorDeclaration, createClassFromFunction(ctorDeclaration));
    }
    else if (ts.isVariableDeclaration(ctorDeclaration)) {
        const classDeclaration = createClassFromVariableDeclaration(ctorDeclaration);
        if (!classDeclaration) {
            return undefined;
        }

        const ancestor = ctorDeclaration.parent.parent;
        if (ts.isVariableDeclarationList(ctorDeclaration.parent) && ctorDeclaration.parent.declarations.length > 1) {
            changes.delete(sourceFile, ctorDeclaration);
            changes.insertNodeAfter(sourceFile, ancestor, classDeclaration);
        }
        else {
            changes.replaceNode(sourceFile, ancestor, classDeclaration);
        }
    }

    function createClassElementsFromSymbol(symbol: ts.Symbol) {
        const memberElements: ts.ClassElement[] = [];
        // all static members are stored in the "exports" array of symbol
        if (symbol.exports) {
            symbol.exports.forEach(member => {
                if (member.name === "prototype" && member.declarations) {
                    const firstDeclaration = member.declarations[0];
                    // only one "x.prototype = { ... }" will pass
                    if (member.declarations.length === 1 &&
                        ts.isPropertyAccessExpression(firstDeclaration) &&
                        ts.isBinaryExpression(firstDeclaration.parent) &&
                        firstDeclaration.parent.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
                        ts.isObjectLiteralExpression(firstDeclaration.parent.right)
                    ) {
                        const prototypes = firstDeclaration.parent.right;
                        createClassElement(prototypes.symbol, /** modifiers */ undefined, memberElements);
                    }
                }
                else {
                    createClassElement(member, [ts.factory.createToken(ts.SyntaxKind.StaticKeyword)], memberElements);
                }
            });
        }

        // all instance members are stored in the "member" array of symbol (done last so instance members pulled from prototype assignments have priority)
        if (symbol.members) {
            symbol.members.forEach((member, key) => {
                if (key === "constructor" && member.valueDeclaration) {
                    const prototypeAssignment = symbol.exports?.get("prototype" as ts.__String)?.declarations?.[0]?.parent;
                    if (prototypeAssignment && ts.isBinaryExpression(prototypeAssignment) && ts.isObjectLiteralExpression(prototypeAssignment.right) && ts.some(prototypeAssignment.right.properties, isConstructorAssignment)) {
                        // fn.prototype = { constructor: fn }
                        // Already deleted in `createClassElement` in first pass
                    }
                    else {
                        // fn.prototype.constructor = fn
                        changes.delete(sourceFile, member.valueDeclaration.parent);
                    }
                    return;
                }
                createClassElement(member, /*modifiers*/ undefined, memberElements);
            });
        }

        return memberElements;

        function shouldConvertDeclaration(_target: ts.AccessExpression | ts.ObjectLiteralExpression, source: ts.Expression) {
            // Right now the only thing we can convert are function expressions, get/set accessors and methods
            // other values like normal value fields ({a: 1}) shouldn't get transformed.
            // We can update this once ES public class properties are available.
            if (ts.isAccessExpression(_target)) {
                if (ts.isPropertyAccessExpression(_target) && isConstructorAssignment(_target)) return true;
                return ts.isFunctionLike(source);
            }
            else {
                return ts.every(_target.properties, property => {
                    // a() {}
                    if (ts.isMethodDeclaration(property) || ts.isGetOrSetAccessorDeclaration(property)) return true;
                    // a: function() {}
                    if (ts.isPropertyAssignment(property) && ts.isFunctionExpression(property.initializer) && !!property.name) return true;
                    // x.prototype.constructor = fn
                    if (isConstructorAssignment(property)) return true;
                    return false;
                });
            }
        }

        function createClassElement(symbol: ts.Symbol, modifiers: ts.Modifier[] | undefined, members: ts.ClassElement[]): void {
            // Right now the only thing we can convert are function expressions, which are marked as methods
            // or { x: y } type prototype assignments, which are marked as ObjectLiteral
            if (!(symbol.flags & ts.SymbolFlags.Method) && !(symbol.flags & ts.SymbolFlags.ObjectLiteral)) {
                return;
            }

            const memberDeclaration = symbol.valueDeclaration as ts.AccessExpression | ts.ObjectLiteralExpression;
            const assignmentBinaryExpression = memberDeclaration.parent as ts.BinaryExpression;
            const assignmentExpr = assignmentBinaryExpression.right;
            if (!shouldConvertDeclaration(memberDeclaration, assignmentExpr)) {
                return;
            }

            if (ts.some(members, m => {
                const name = ts.getNameOfDeclaration(m);
                if (name && ts.isIdentifier(name) && ts.idText(name) === ts.symbolName(symbol)) {
                    return true; // class member already made for this name
                }
                return false;
            })) {
                return;
            }

            // delete the entire statement if this expression is the sole expression to take care of the semicolon at the end
            const nodeToDelete = assignmentBinaryExpression.parent && assignmentBinaryExpression.parent.kind === ts.SyntaxKind.ExpressionStatement
                ? assignmentBinaryExpression.parent : assignmentBinaryExpression;
            changes.delete(sourceFile, nodeToDelete);

            if (!assignmentExpr) {
                members.push(ts.factory.createPropertyDeclaration(modifiers, symbol.name, /*questionToken*/ undefined,
                    /*type*/ undefined, /*initializer*/ undefined));
                return;
            }

            // f.x = expr
            if (ts.isAccessExpression(memberDeclaration) && (ts.isFunctionExpression(assignmentExpr) || ts.isArrowFunction(assignmentExpr))) {
                const quotePreference = ts.getQuotePreference(sourceFile, preferences);
                const name = tryGetPropertyName(memberDeclaration, compilerOptions, quotePreference);
                if (name) {
                    createFunctionLikeExpressionMember(members, assignmentExpr, name);
                }
                return;
            }
            // f.prototype = { ... }
            else if (ts.isObjectLiteralExpression(assignmentExpr)) {
                ts.forEach(
                    assignmentExpr.properties,
                    property => {
                        if (ts.isMethodDeclaration(property) || ts.isGetOrSetAccessorDeclaration(property)) {
                            // MethodDeclaration and AccessorDeclaration can appear in a class directly
                            members.push(property);
                        }
                        if (ts.isPropertyAssignment(property) && ts.isFunctionExpression(property.initializer)) {
                            createFunctionLikeExpressionMember(members, property.initializer, property.name);
                        }
                        // Drop constructor assignments
                        if (isConstructorAssignment(property)) return;
                        return;
                    }
                );
                return;
            }
            else {
                // Don't try to declare members in JavaScript files
                if (ts.isSourceFileJS(sourceFile)) return;
                if (!ts.isPropertyAccessExpression(memberDeclaration)) return;
                const prop = ts.factory.createPropertyDeclaration(modifiers, memberDeclaration.name, /*questionToken*/ undefined, /*type*/ undefined, assignmentExpr);
                ts.copyLeadingComments(assignmentBinaryExpression.parent, prop, sourceFile);
                members.push(prop);
                return;
            }

            function createFunctionLikeExpressionMember(members: ts.ClassElement[], expression: ts.FunctionExpression | ts.ArrowFunction, name: ts.PropertyName) {
                if (ts.isFunctionExpression(expression)) return createFunctionExpressionMember(members, expression, name);
                else return createArrowFunctionExpressionMember(members, expression, name);
            }

            function createFunctionExpressionMember(members: ts.ClassElement[], functionExpression: ts.FunctionExpression, name: ts.PropertyName) {
                const fullModifiers = ts.concatenate(modifiers, getModifierKindFromSource(functionExpression, ts.SyntaxKind.AsyncKeyword));
                const method = ts.factory.createMethodDeclaration(fullModifiers, /*asteriskToken*/ undefined, name, /*questionToken*/ undefined,
                    /*typeParameters*/ undefined, functionExpression.parameters, /*type*/ undefined, functionExpression.body);
                ts.copyLeadingComments(assignmentBinaryExpression, method, sourceFile);
                members.push(method);
                return;
            }

            function createArrowFunctionExpressionMember(members: ts.ClassElement[], arrowFunction: ts.ArrowFunction, name: ts.PropertyName) {
                const arrowFunctionBody = arrowFunction.body;
                let bodyBlock: ts.Block;

                // case 1: () => { return [1,2,3] }
                if (arrowFunctionBody.kind === ts.SyntaxKind.Block) {
                    bodyBlock = arrowFunctionBody as ts.Block;
                }
                // case 2: () => [1,2,3]
                else {
                    bodyBlock = ts.factory.createBlock([ts.factory.createReturnStatement(arrowFunctionBody)]);
                }
                const fullModifiers = ts.concatenate(modifiers, getModifierKindFromSource(arrowFunction, ts.SyntaxKind.AsyncKeyword));
                const method = ts.factory.createMethodDeclaration(fullModifiers, /*asteriskToken*/ undefined, name, /*questionToken*/ undefined,
                    /*typeParameters*/ undefined, arrowFunction.parameters, /*type*/ undefined, bodyBlock);
                ts.copyLeadingComments(assignmentBinaryExpression, method, sourceFile);
                members.push(method);
            }
        }
    }

    function createClassFromVariableDeclaration(node: ts.VariableDeclaration): ts.ClassDeclaration | undefined {
        const initializer = node.initializer;
        if (!initializer || !ts.isFunctionExpression(initializer) || !ts.isIdentifier(node.name)) {
            return undefined;
        }

        const memberElements = createClassElementsFromSymbol(node.symbol);
        if (initializer.body) {
            memberElements.unshift(ts.factory.createConstructorDeclaration(/*modifiers*/ undefined, initializer.parameters, initializer.body));
        }

        const modifiers = getModifierKindFromSource(node.parent.parent, ts.SyntaxKind.ExportKeyword);
        const cls = ts.factory.createClassDeclaration(modifiers, node.name,
            /*typeParameters*/ undefined, /*heritageClauses*/ undefined, memberElements);
        // Don't call copyComments here because we'll already leave them in place
        return cls;
    }

    function createClassFromFunction(node: ts.FunctionDeclaration | ts.FunctionExpression): ts.ClassDeclaration {
        const memberElements = createClassElementsFromSymbol(ctorSymbol);
        if (node.body) {
            memberElements.unshift(ts.factory.createConstructorDeclaration(/*modifiers*/ undefined, node.parameters, node.body));
        }

        const modifiers = getModifierKindFromSource(node, ts.SyntaxKind.ExportKeyword);
        const cls = ts.factory.createClassDeclaration(modifiers, node.name,
            /*typeParameters*/ undefined, /*heritageClauses*/ undefined, memberElements);
        // Don't call copyComments here because we'll already leave them in place
        return cls;
    }
}

function getModifierKindFromSource(source: ts.Node, kind: ts.Modifier["kind"]): readonly ts.Modifier[] | undefined {
    return ts.canHaveModifiers(source) ? ts.filter(source.modifiers, (modifier): modifier is ts.Modifier => modifier.kind === kind) : undefined;
}

function isConstructorAssignment(x: ts.ObjectLiteralElementLike | ts.PropertyAccessExpression) {
    if (!x.name) return false;
    if (ts.isIdentifier(x.name) && x.name.text === "constructor") return true;
    return false;
}

function tryGetPropertyName(node: ts.AccessExpression, compilerOptions: ts.CompilerOptions, quotePreference: ts.QuotePreference): ts.PropertyName | undefined {
    if (ts.isPropertyAccessExpression(node)) {
        return node.name;
    }

    const propName = node.argumentExpression;
    if (ts.isNumericLiteral(propName)) {
        return propName;
    }

    if (ts.isStringLiteralLike(propName)) {
        return ts.isIdentifierText(propName.text, ts.getEmitScriptTarget(compilerOptions)) ? ts.factory.createIdentifier(propName.text)
            : ts.isNoSubstitutionTemplateLiteral(propName) ? ts.factory.createStringLiteral(propName.text, quotePreference === ts.QuotePreference.Single)
            : propName;
    }

    return undefined;
}
}
