/* @internal */
namespace ts {
    export function computeSuggestionDiagnostics(sourceFile: SourceFile, program: Program, cancellationToken: CancellationToken): DiagnosticWithLocation[] {
        program.getSemanticDiagnostics(sourceFile, cancellationToken);
        const diags: DiagnosticWithLocation[] = [];
        const checker = program.getDiagnosticsProducingTypeChecker();

        if (sourceFile.commonJsModuleIndicator &&
            (programContainsEs6Modules(program) || compilerOptionsIndicateEs6Modules(program.getCompilerOptions())) &&
            containsTopLevelCommonjs(sourceFile)) {
            diags.push(createDiagnosticForNode(getErrorNodeFromCommonJsIndicator(sourceFile.commonJsModuleIndicator), Diagnostics.File_is_a_CommonJS_module_it_may_be_converted_to_an_ES6_module));
        }

        const isJsFile = isSourceFileJavaScript(sourceFile);

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
                        const decl = getDeclarationOfJSInitializer(node);
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

            if (isFunctionLikeDeclaration(node) || isArrowFunction(node) || isMethodDeclaration(node)) {
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
                return importClause && !importClause.name && importClause.namedBindings && importClause.namedBindings.kind === SyntaxKind.NamespaceImport && isStringLiteral(moduleSpecifier)
                    ? importClause.namedBindings.name
                    : undefined;
            case SyntaxKind.ImportEqualsDeclaration:
                return node.name;
            default:
                return undefined;
        }
    }

    function addConvertToAsyncFunctionDiagnostics(node: Node, checker: TypeChecker, diags: DiagnosticWithLocation[]): void {
        if (isAsyncFunction(node)) {
            return;
        }

        if (isFunctionLikeDeclaration(node) && !node.body) {
            return; // break on ambient functions
        }

        const returnType = checker.getTypeAtLocation(node);
        if (!returnType) {
            return;
        }

        if (checker.isPromiseLikeType(returnType)) {
            // collect all the return statements
            // check that a property access expression exists in there and that it is a handler
            const retStmts = getReturnStatementsWithPromiseCallbacks(node, checker);
            if (retStmts.length > 0) {
                diags.push(createDiagnosticForNode(isVariableDeclaration(node.parent) ? node.parent.name : node, Diagnostics.This_may_be_converted_to_an_async_function));
            }
        }
    }

    function getErrorNodeFromCommonJsIndicator(commonJsModuleIndicator: Node): Node {
        return isBinaryExpression(commonJsModuleIndicator) ? commonJsModuleIndicator.left : commonJsModuleIndicator;
    }

    export function getReturnStatementsWithPromiseCallbacks(node: Node, checker: TypeChecker): [Node[], NodeFlags] {

        const retStmts: Node[] = [];
        let varDeclFlags = NodeFlags.Let;
        forEachChild(node, visit);

        function visit(child: Node) {

            if (isFunctionLike(child)) {
                return;
            }

            if (isReturnStatement(child)) {
                forEachChild(child, hasCallback);
            }

            function hasCallback(returnChild: Node) {
                const symbol = checker.getSymbolAtLocation(returnChild);

                if (isCallback(returnChild)) {
                    retStmts.push(child as ReturnStatement);
                }
                else if (isIdentifier(returnChild) && isReturnStatement(child)
                && child.expression && isIdentifier(child.expression)) {
                    retStmts.push(child);
                    forEachChild(node, findCallbackUses);
                }
                else if (!isFunctionLike(returnChild)) {
                    forEachChild(returnChild, hasCallback);
                }

                let parent: Node;

                function findCallbackUses(identUse: Node) {
                    if (isVariableDeclarationList(identUse)){ 
                        for (let varDecl of identUse.declarations) {
                            if (varDecl.initializer && isCallExpression(varDecl.initializer) && 
                                symbol === checker.getSymbolAtLocation(varDecl.name)){
                                retStmts.push(parent);
                            }
                        }
                        varDeclFlags = identUse.flags;
                    }
                    else if (isCallback(identUse)) {
                        if (symbol === checker.getSymbolAtLocation((<PropertyAccessExpression>(<CallExpression>identUse).expression).expression)) {
                            retStmts.push(parent as CallExpression);
                        }
                    }
                    else {
                        parent = identUse;
                        forEachChild(identUse, findCallbackUses);
                    }
                }
            }
            forEachChild(child, visit);
        }
        return [retStmts, varDeclFlags];
    }

    function isCallback(node: Node): boolean {
        return (isCallExpression(node) && isPropertyAccessExpression(node.expression) &&
            (node.expression.name.text === "then" || node.expression.name.text === "catch"));
    }
}
