import * as ts from "./_namespaces/ts";

const visitedNestedConvertibleFunctions = new ts.Map<string, true>();

/** @internal */
export function computeSuggestionDiagnostics(sourceFile: ts.SourceFile, program: ts.Program, cancellationToken: ts.CancellationToken): ts.DiagnosticWithLocation[] {
    program.getSemanticDiagnostics(sourceFile, cancellationToken);
    const diags: ts.DiagnosticWithLocation[] = [];
    const checker = program.getTypeChecker();
    const isCommonJSFile = sourceFile.impliedNodeFormat === ts.ModuleKind.CommonJS || ts.fileExtensionIsOneOf(sourceFile.fileName, [ts.Extension.Cts, ts.Extension.Cjs]) ;

    if (!isCommonJSFile &&
        sourceFile.commonJsModuleIndicator &&
        (ts.programContainsEsModules(program) || ts.compilerOptionsIndicateEsModules(program.getCompilerOptions())) &&
        containsTopLevelCommonjs(sourceFile)) {
        diags.push(ts.createDiagnosticForNode(getErrorNodeFromCommonJsIndicator(sourceFile.commonJsModuleIndicator), ts.Diagnostics.File_is_a_CommonJS_module_it_may_be_converted_to_an_ES_module));
    }

    const isJsFile = ts.isSourceFileJS(sourceFile);

    visitedNestedConvertibleFunctions.clear();
    check(sourceFile);

    if (ts.getAllowSyntheticDefaultImports(program.getCompilerOptions())) {
        for (const moduleSpecifier of sourceFile.imports) {
            const importNode = ts.importFromModuleSpecifier(moduleSpecifier);
            const name = importNameForConvertToDefaultImport(importNode);
            if (!name) continue;
            const module = ts.getResolvedModule(sourceFile, moduleSpecifier.text, ts.getModeForUsageLocation(sourceFile, moduleSpecifier));
            const resolvedFile = module && program.getSourceFile(module.resolvedFileName);
            if (resolvedFile && resolvedFile.externalModuleIndicator && resolvedFile.externalModuleIndicator !== true && ts.isExportAssignment(resolvedFile.externalModuleIndicator) && resolvedFile.externalModuleIndicator.isExportEquals) {
                diags.push(ts.createDiagnosticForNode(name, ts.Diagnostics.Import_may_be_converted_to_a_default_import));
            }
        }
    }

    ts.addRange(diags, sourceFile.bindSuggestionDiagnostics);
    ts.addRange(diags, program.getSuggestionDiagnostics(sourceFile, cancellationToken));
    return diags.sort((d1, d2) => d1.start - d2.start);

    function check(node: ts.Node) {
        if (isJsFile) {
            if (canBeConvertedToClass(node, checker)) {
                diags.push(ts.createDiagnosticForNode(ts.isVariableDeclaration(node.parent) ? node.parent.name : node, ts.Diagnostics.This_constructor_function_may_be_converted_to_a_class_declaration));
            }
        }
        else {
            if (ts.isVariableStatement(node) &&
                node.parent === sourceFile &&
                node.declarationList.flags & ts.NodeFlags.Const &&
                node.declarationList.declarations.length === 1) {
                const init = node.declarationList.declarations[0].initializer;
                if (init && ts.isRequireCall(init, /*checkArgumentIsStringLiteralLike*/ true)) {
                    diags.push(ts.createDiagnosticForNode(init, ts.Diagnostics.require_call_may_be_converted_to_an_import));
                }
            }

            if (ts.codefix.parameterShouldGetTypeFromJSDoc(node)) {
                diags.push(ts.createDiagnosticForNode(node.name || node, ts.Diagnostics.JSDoc_types_may_be_moved_to_TypeScript_types));
            }
        }

        if (canBeConvertedToAsync(node)) {
            addConvertToAsyncFunctionDiagnostics(node, checker, diags);
        }
        node.forEachChild(check);
    }
}

// convertToEsModule only works on top-level, so don't trigger it if commonjs code only appears in nested scopes.
function containsTopLevelCommonjs(sourceFile: ts.SourceFile): boolean {
    return sourceFile.statements.some(statement => {
        switch (statement.kind) {
            case ts.SyntaxKind.VariableStatement:
                return (statement as ts.VariableStatement).declarationList.declarations.some(decl =>
                    !!decl.initializer && ts.isRequireCall(propertyAccessLeftHandSide(decl.initializer), /*checkArgumentIsStringLiteralLike*/ true));
            case ts.SyntaxKind.ExpressionStatement: {
                const { expression } = statement as ts.ExpressionStatement;
                if (!ts.isBinaryExpression(expression)) return ts.isRequireCall(expression, /*checkArgumentIsStringLiteralLike*/ true);
                const kind = ts.getAssignmentDeclarationKind(expression);
                return kind === ts.AssignmentDeclarationKind.ExportsProperty || kind === ts.AssignmentDeclarationKind.ModuleExports;
            }
            default:
                return false;
        }
    });
}

function propertyAccessLeftHandSide(node: ts.Expression): ts.Expression {
    return ts.isPropertyAccessExpression(node) ? propertyAccessLeftHandSide(node.expression) : node;
}

function importNameForConvertToDefaultImport(node: ts.AnyValidImportOrReExport): ts.Identifier | undefined {
    switch (node.kind) {
        case ts.SyntaxKind.ImportDeclaration:
            const { importClause, moduleSpecifier } = node;
            return importClause && !importClause.name && importClause.namedBindings && importClause.namedBindings.kind === ts.SyntaxKind.NamespaceImport && ts.isStringLiteral(moduleSpecifier)
                ? importClause.namedBindings.name
                : undefined;
        case ts.SyntaxKind.ImportEqualsDeclaration:
            return node.name;
        default:
            return undefined;
    }
}

function addConvertToAsyncFunctionDiagnostics(node: ts.FunctionLikeDeclaration, checker: ts.TypeChecker, diags: ts.Push<ts.DiagnosticWithLocation>): void {
    // need to check function before checking map so that deeper levels of nested callbacks are checked
    if (isConvertibleFunction(node, checker) && !visitedNestedConvertibleFunctions.has(getKeyFromNode(node))) {
        diags.push(ts.createDiagnosticForNode(
            !node.name && ts.isVariableDeclaration(node.parent) && ts.isIdentifier(node.parent.name) ? node.parent.name : node,
            ts.Diagnostics.This_may_be_converted_to_an_async_function));
    }
}

function isConvertibleFunction(node: ts.FunctionLikeDeclaration, checker: ts.TypeChecker) {
    return !ts.isAsyncFunction(node) &&
        node.body &&
        ts.isBlock(node.body) &&
        hasReturnStatementWithPromiseHandler(node.body, checker) &&
        returnsPromise(node, checker);
}

/** @internal */
export function returnsPromise(node: ts.FunctionLikeDeclaration, checker: ts.TypeChecker): boolean {
    const signature = checker.getSignatureFromDeclaration(node);
    const returnType = signature ? checker.getReturnTypeOfSignature(signature) : undefined;
    return !!returnType && !!checker.getPromisedTypeOfPromise(returnType);
}

function getErrorNodeFromCommonJsIndicator(commonJsModuleIndicator: ts.Node): ts.Node {
    return ts.isBinaryExpression(commonJsModuleIndicator) ? commonJsModuleIndicator.left : commonJsModuleIndicator;
}

function hasReturnStatementWithPromiseHandler(body: ts.Block, checker: ts.TypeChecker): boolean {
    return !!ts.forEachReturnStatement(body, statement => isReturnStatementWithFixablePromiseHandler(statement, checker));
}

/** @internal */
export function isReturnStatementWithFixablePromiseHandler(node: ts.Node, checker: ts.TypeChecker): node is ts.ReturnStatement & { expression: ts.CallExpression } {
    return ts.isReturnStatement(node) && !!node.expression && isFixablePromiseHandler(node.expression, checker);
}

// Should be kept up to date with transformExpression in convertToAsyncFunction.ts
/** @internal */
export function isFixablePromiseHandler(node: ts.Node, checker: ts.TypeChecker): boolean {
    // ensure outermost call exists and is a promise handler
    if (!isPromiseHandler(node) || !hasSupportedNumberOfArguments(node) || !node.arguments.every(arg => isFixablePromiseArgument(arg, checker))) {
        return false;
    }

    // ensure all chained calls are valid
    let currentNode = node.expression.expression;
    while (isPromiseHandler(currentNode) || ts.isPropertyAccessExpression(currentNode)) {
        if (ts.isCallExpression(currentNode)) {
            if (!hasSupportedNumberOfArguments(currentNode) || !currentNode.arguments.every(arg => isFixablePromiseArgument(arg, checker))) {
                return false;
            }
            currentNode = currentNode.expression.expression;
        }
        else {
            currentNode = currentNode.expression;
        }
    }
    return true;
}

function isPromiseHandler(node: ts.Node): node is ts.CallExpression & { readonly expression: ts.PropertyAccessExpression } {
    return ts.isCallExpression(node) && (
        ts.hasPropertyAccessExpressionWithName(node, "then") ||
        ts.hasPropertyAccessExpressionWithName(node, "catch") ||
        ts.hasPropertyAccessExpressionWithName(node, "finally"));
}

function hasSupportedNumberOfArguments(node: ts.CallExpression & { readonly expression: ts.PropertyAccessExpression }) {
    const name = node.expression.name.text;
    const maxArguments = name === "then" ? 2 : name === "catch" ? 1 : name === "finally" ? 1 : 0;
    if (node.arguments.length > maxArguments) return false;
    if (node.arguments.length < maxArguments) return true;
    return maxArguments === 1 || ts.some(node.arguments, arg => {
        return arg.kind === ts.SyntaxKind.NullKeyword || ts.isIdentifier(arg) && arg.text === "undefined";
    });
}

// should be kept up to date with getTransformationBody in convertToAsyncFunction.ts
function isFixablePromiseArgument(arg: ts.Expression, checker: ts.TypeChecker): boolean {
    switch (arg.kind) {
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.FunctionExpression:
            const functionFlags = ts.getFunctionFlags(arg as ts.FunctionDeclaration | ts.FunctionExpression);
            if (functionFlags & ts.FunctionFlags.Generator) {
                return false;
            }
            // falls through
        case ts.SyntaxKind.ArrowFunction:
            visitedNestedConvertibleFunctions.set(getKeyFromNode(arg as ts.FunctionLikeDeclaration), true);
            // falls through
        case ts.SyntaxKind.NullKeyword:
            return true;
        case ts.SyntaxKind.Identifier:
        case ts.SyntaxKind.PropertyAccessExpression: {
            const symbol = checker.getSymbolAtLocation(arg);
            if (!symbol) {
                return false;
            }
            return checker.isUndefinedSymbol(symbol) ||
                ts.some(ts.skipAlias(symbol, checker).declarations, d => ts.isFunctionLike(d) || ts.hasInitializer(d) && !!d.initializer && ts.isFunctionLike(d.initializer));
        }
        default:
            return false;
    }
}

function getKeyFromNode(exp: ts.FunctionLikeDeclaration) {
    return `${exp.pos.toString()}:${exp.end.toString()}`;
}

function canBeConvertedToClass(node: ts.Node, checker: ts.TypeChecker): boolean {
    if (node.kind === ts.SyntaxKind.FunctionExpression) {
        if (ts.isVariableDeclaration(node.parent) && node.symbol.members?.size) {
            return true;
        }

        const symbol = checker.getSymbolOfExpando(node, /*allowDeclaration*/ false);
        return !!(symbol && (symbol.exports?.size || symbol.members?.size));
    }

    if (node.kind === ts.SyntaxKind.FunctionDeclaration) {
        return !!node.symbol.members?.size;
    }

    return false;
}

/** @internal */
export function canBeConvertedToAsync(node: ts.Node): node is ts.FunctionDeclaration | ts.MethodDeclaration | ts.FunctionExpression | ts.ArrowFunction {
    switch (node.kind) {
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.MethodDeclaration:
        case ts.SyntaxKind.FunctionExpression:
        case ts.SyntaxKind.ArrowFunction:
            return true;
        default:
            return false;
    }
}
