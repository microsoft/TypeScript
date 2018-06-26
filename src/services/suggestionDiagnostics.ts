/* @internal */
namespace ts {
    export function computeSuggestionDiagnostics(sourceFile: SourceFile, program: Program): Diagnostic[] {
        program.getSemanticDiagnostics(sourceFile);
        const checker = program.getDiagnosticsProducingTypeChecker();
        const diags: Diagnostic[] = [];

        if (sourceFile.commonJsModuleIndicator &&
            (programContainsEs6Modules(program) || compilerOptionsIndicateEs6Modules(program.getCompilerOptions())) &&
            containsTopLevelCommonjs(sourceFile)) {
            diags.push(createDiagnosticForNode(getErrorNodeFromCommonJsIndicator(sourceFile.commonJsModuleIndicator), Diagnostics.File_is_a_CommonJS_module_it_may_be_converted_to_an_ES6_module));
        }

        const isJsFile = isSourceFileJavaScript(sourceFile);

        function check(node: Node) {
            switch (node.kind) {
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.ArrowFunction:

                    if (isJsFile) {
                        const symbol = node.symbol;
                        if (symbol.members && (symbol.members.size > 0)) {
                            diags.push(createDiagnosticForNode(isVariableDeclaration(node.parent) ? node.parent.name : node, Diagnostics.This_constructor_function_may_be_converted_to_a_class_declaration));
                        }
                    }

                    if (isAsyncFunction(node)) {
                        break;
                    }

                    const returnType = checker.getReturnTypeOfSignature(checker.getSignatureFromDeclaration(<FunctionDeclaration | FunctionExpression>node));
                    if (!returnType || !returnType.symbol) {
                        break;
                    }

                    if(isFunctionLikeDeclaration(node) && !node.body){
                        break; //break on ambient functions
                    }

                    if (checker.isPromiseLikeType(returnType)) {
                        // collect all the return statements
                        // check that a property access expression exists in there and that it is a handler
                        const retStmts = getReturnStatementsWithPromiseCallbacks(node);
                        if (retStmts.length > 0) {
                            diags.push(createDiagnosticForNode(isVariableDeclaration(node.parent) ? node.parent.name : node, Diagnostics.This_may_be_converted_to_an_async_function));
                        }
                    }
                    break;
            }

            if (!isJsFile && codefix.parameterShouldGetTypeFromJSDoc(node)) {
                diags.push(createDiagnosticForNode(node.name || node, Diagnostics.JSDoc_types_may_be_moved_to_TypeScript_types));
            }

            node.forEachChild(check);
        }
        check(sourceFile);

        if (!isJsFile) {
            for (const statement of sourceFile.statements) {
                if (isVariableStatement(statement) &&
                    statement.declarationList.flags & NodeFlags.Const &&
                    statement.declarationList.declarations.length === 1) {
                    const init = statement.declarationList.declarations[0].initializer;
                    if (init && isRequireCall(init, /*checkArgumentIsStringLiteralLike*/ true)) {
                        diags.push(createDiagnosticForNode(init, Diagnostics.require_call_may_be_converted_to_an_import));
                    }
                }
            }
        }

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
        return diags.concat(checker.getSuggestionDiagnostics(sourceFile)).sort((d1, d2) => d1.start - d2.start);
    }

    // convertToEs6Module only works on top-level, so don't trigger it if commonjs code only appears in nested scopes.
    function containsTopLevelCommonjs(sourceFile: SourceFile): boolean {
        return sourceFile.statements.some(statement => {
            switch (statement.kind) {
                case SyntaxKind.VariableStatement:
                    return (statement as VariableStatement).declarationList.declarations.some(decl =>
                        isRequireCall(propertyAccessLeftHandSide(decl.initializer), /*checkArgumentIsStringLiteralLike*/ true));
                case SyntaxKind.ExpressionStatement: {
                    const { expression } = statement as ExpressionStatement;
                    if (!isBinaryExpression(expression)) return isRequireCall(expression, /*checkArgumentIsStringLiteralLike*/ true);
                    const kind = getSpecialPropertyAssignmentKind(expression);
                    return kind === SpecialPropertyAssignmentKind.ExportsProperty || kind === SpecialPropertyAssignmentKind.ModuleExports;
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
                return importClause && !importClause.name && importClause.namedBindings.kind === SyntaxKind.NamespaceImport && isStringLiteral(moduleSpecifier)
                    ? importClause.namedBindings.name
                    : undefined;
            case SyntaxKind.ImportEqualsDeclaration:
                return node.name;
            default:
                return undefined;
        }
    }

    function getErrorNodeFromCommonJsIndicator(commonJsModuleIndicator: Node): Node {
        return isBinaryExpression(commonJsModuleIndicator) ? commonJsModuleIndicator.left : commonJsModuleIndicator;
    }

    export function getReturnStatementsWithPromiseCallbacks(node: Node): ReturnStatement[] {

        const retStmts: ReturnStatement[] = [];
        forEachChild(node, visit);

        /*
        function visit(node: Node) {
            if (isFunctionLike(node)) {
                return;
            }

            if (isReturnStatement(node)) {
                if (isCallExpression(node) && isPropertyAccessExpression(node.expression) &&
                    (node.expression.name.text === "then" || node.expression.name.text === "catch")) {
                    retStmts.push(node as ReturnStatement);
                }
                else if (!isFunctionLike(node)) {
                    forEachChild(node, visit);
                }
            }
        }
        */

        function visit(node: Node) {
            if (isFunctionLike(node)) {
                return;
            }

            if (isReturnStatement(node)) {
                forEachChild(node, hasCallback);
            }

            function hasCallback(child: Node) {
                if (isCallExpression(child) && isPropertyAccessExpression(child.expression)  &&
                    (child.expression.name.text === "then" || child.expression.name.text === "catch")) {
                    retStmts.push(node as ReturnStatement);
                }
                else if (!isFunctionLike(child)) {
                    forEachChild(child, hasCallback);
                }
            }

            forEachChild(node, visit);
        }

        return retStmts;
    }
}
