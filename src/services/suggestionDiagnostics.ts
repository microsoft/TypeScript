/* @internal */
namespace ts {
    export function computeSuggestionDiagnostics(sourceFile: SourceFile, program: Program, cancellationToken: CancellationToken): DiagnosticWithLocation[] {
        program.getSemanticDiagnostics(sourceFile, cancellationToken);
        const diags: DiagnosticWithLocation[] = [];
        const checker = program.getTypeChecker();

        if (sourceFile.commonJsModuleIndicator &&
            (programContainsEs6Modules(program) || compilerOptionsIndicateEs6Modules(program.getCompilerOptions())) &&
            containsTopLevelCommonjs(sourceFile)) {
            diags.push(createDiagnosticForNode(getErrorNodeFromCommonJsIndicator(sourceFile.commonJsModuleIndicator), Diagnostics.File_is_a_CommonJS_module_it_may_be_converted_to_an_ES6_module));
        }

        const isJsFile = isSourceFileJS(sourceFile);

        check(sourceFile);

        if (getAllowSyntheticDefaultImports(program.getCompilerOptions())) {
            for (const moduleSpecifier of sourceFile.imports) {
                const importNode = importFromModuleSpecifier(moduleSpecifier);
                const name = importNameForConvertToDefaultImport(importNode);
                if (!name) continue;
                const module = getResolvedModule(sourceFile, moduleSpecifier.text);
                const resolvedFile = module && program.getSourceFile(module.resolvedFileName);
                if (resolvedFile && resolvedFile.externalModuleIndicator && isExportAssignment(resolvedFile.externalModuleIndicator) && resolvedFile.externalModuleIndicator.isExportEquals) {
                    diags.push(createDiagnosticForNode(name, Diagnostics.Import_may_be_converted_to_a_default_import));
                }
            }
        }

        addRange(diags, sourceFile.bindSuggestionDiagnostics);
        addRange(diags, program.getSuggestionDiagnostics(sourceFile, cancellationToken));
        return diags.sort((d1, d2) => d1.start - d2.start);

        function check(node: Node) {
            if (isJsFile) {
                switch (node.kind) {
                    case SyntaxKind.FunctionExpression:
                        const decl = getDeclarationOfExpando(node);
                        if (decl) {
                            const symbol = decl.symbol;
                            if (symbol && (symbol.exports && symbol.exports.size || symbol.members && symbol.members.size)) {
                                diags.push(createDiagnosticForNode(isVariableDeclaration(node.parent) ? node.parent.name : node, Diagnostics.This_constructor_function_may_be_converted_to_a_class_declaration));
                                break;
                            }
                        }
                    // falls through if no diagnostic was created
                    case SyntaxKind.FunctionDeclaration:
                        const symbol = node.symbol;
                        if (symbol.members && (symbol.members.size > 0)) {
                            diags.push(createDiagnosticForNode(isVariableDeclaration(node.parent) ? node.parent.name : node, Diagnostics.This_constructor_function_may_be_converted_to_a_class_declaration));
                        }
                        break;
                }
            }
            else {
                if (isVariableStatement(node) &&
                    node.parent === sourceFile &&
                    node.declarationList.flags & NodeFlags.Const &&
                    node.declarationList.declarations.length === 1) {
                    const init = node.declarationList.declarations[0].initializer;
                    if (init && isRequireCall(init, /*checkArgumentIsStringLiteralLike*/ true)) {
                        diags.push(createDiagnosticForNode(init, Diagnostics.require_call_may_be_converted_to_an_import));
                    }
                }

                if (codefix.parameterShouldGetTypeFromJSDoc(node)) {
                    diags.push(createDiagnosticForNode(node.name || node, Diagnostics.JSDoc_types_may_be_moved_to_TypeScript_types));
                }
            }

            if (isFunctionLikeDeclaration(node)) {
                addConvertToAsyncFunctionDiagnostics(node, checker, diags);
            }
            node.forEachChild(check);
        }
    }

    // convertToEs6Module only works on top-level, so don't trigger it if commonjs code only appears in nested scopes.
    function containsTopLevelCommonjs(sourceFile: SourceFile): boolean {
        return sourceFile.statements.some(statement => {
            switch (statement.kind) {
                case SyntaxKind.VariableStatement:
                    return (statement as VariableStatement).declarationList.declarations.some(decl =>
                        isRequireCall(propertyAccessLeftHandSide(decl.initializer!), /*checkArgumentIsStringLiteralLike*/ true)); // TODO: GH#18217
                case SyntaxKind.ExpressionStatement: {
                    const { expression } = statement as ExpressionStatement;
                    if (!isBinaryExpression(expression)) return isRequireCall(expression, /*checkArgumentIsStringLiteralLike*/ true);
                    const kind = getAssignmentDeclarationKind(expression);
                    return kind === AssignmentDeclarationKind.ExportsProperty || kind === AssignmentDeclarationKind.ModuleExports;
                }
                default:
                    return false;
            }
        });
    }

    function propertyAccessLeftHandSide(node: Expression): Expression {
        return isPropertyAccessExpression(node) ? propertyAccessLeftHandSide(node.expression) : node;
    }

    function importNameForConvertToDefaultImport(node: AnyValidImportOrReExport): Identifier | undefined {
        switch (node.kind) {
            case SyntaxKind.ImportDeclaration:
                const { importClause, moduleSpecifier } = node;
                return importClause && !importClause.name && importClause.namedBindings && importClause.namedBindings.kind === SyntaxKind.NamespaceImport && isStringLiteral(moduleSpecifier)
                    ? importClause.namedBindings.name
                    : undefined;
            case SyntaxKind.ImportEqualsDeclaration:
                return node.name;
            default:
                return undefined;
        }
    }

    function addConvertToAsyncFunctionDiagnostics(node: FunctionLikeDeclaration, checker: TypeChecker, diags: DiagnosticWithLocation[]): void {

        if (isAsyncFunction(node) || !node.body) {
            return;
        }

        const functionType = checker.getTypeAtLocation(node);

        const callSignatures = checker.getSignaturesOfType(functionType, SignatureKind.Call);
        const returnType = callSignatures.length ? checker.getReturnTypeOfSignature(callSignatures[0]) : undefined;

        if (!returnType || !checker.getPromisedTypeOfPromise(returnType)) {
            return;
        }

        // collect all the return statements
        // check that a property access expression exists in there and that it is a handler
        const returnStatements = getReturnStatementsWithPromiseHandlers(node);
        if (returnStatements.length > 0) {
            diags.push(createDiagnosticForNode(!node.name && isVariableDeclaration(node.parent) && isIdentifier(node.parent.name) ? node.parent.name : node, Diagnostics.This_may_be_converted_to_an_async_function));
        }
    }

    function getErrorNodeFromCommonJsIndicator(commonJsModuleIndicator: Node): Node {
        return isBinaryExpression(commonJsModuleIndicator) ? commonJsModuleIndicator.left : commonJsModuleIndicator;
    }

    /** @internal */
    export function getReturnStatementsWithPromiseHandlers(node: Node): ReturnStatement[] {
        const returnStatements: ReturnStatement[] = [];
        if (isFunctionLike(node)) {
            forEachChild(node, visit);
        }
        else {
            visit(node);
        }

        function visit(child: Node) {
            if (isFunctionLike(child)) {
                return;
            }

            if (isReturnStatement(child) && child.expression && isFixablePromiseHandler(child.expression)) {
                returnStatements.push(child);
            }

            forEachChild(child, visit);
        }
        return returnStatements;
    }

    // Should be kept up to date with transformExpression in convertToAsyncFunction.ts
    function isFixablePromiseHandler(node: Node): boolean {
        // ensure outermost call exists and is a promise handler
        if (!isPromiseHandler(node) || !node.arguments.every(isFixablePromiseArgument)) {
            return false;
        }

        // ensure all chained calls are valid
        let currentNode = node.expression;
        while (isPromiseHandler(currentNode) || isPropertyAccessExpression(currentNode)) {
            if (isCallExpression(currentNode) && !currentNode.arguments.every(isFixablePromiseArgument)) {
                return false;
            }
            currentNode = currentNode.expression;
        }
        return true;
    }

    function isPromiseHandler(node: Node): node is CallExpression {
        return isCallExpression(node) && (hasPropertyAccessExpressionWithName(node, "then") || hasPropertyAccessExpressionWithName(node, "catch"));
    }

    // should be kept up to date with getTransformationBody in convertToAsyncFunction.ts
    function isFixablePromiseArgument(arg: Expression): boolean {
        switch (arg.kind) {
            case SyntaxKind.NullKeyword:
            case SyntaxKind.Identifier: // identifier includes undefined
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction:
                return true;
            default:
                return false;
        }
    }
}
