/// <reference path="../../checker.ts" />
/*@internal*/
namespace ts {
    export function createModuleTransformation(transformer: Transformer): Transformation {
        const emitModuleDelegates: Map<(node: SourceFile, write: (node: Statement) => void) => void> = {
            [ModuleKind.None]: emitCommonJSModule,
            [ModuleKind.AMD]: emitAMDModule,
            [ModuleKind.UMD]: emitUMDModule,
            [ModuleKind.CommonJS]: emitCommonJSModule,
        };

        let {
            getGeneratedNameForNode,
            hoistVariableDeclaration,
            hoistFunctionDeclaration,
            startLexicalEnvironment,
            endLexicalEnvironment,
            pipeNode,
            pipeNodes,
            mapNode,
            mapNodes,
            flattenNode,
            visitNode,
            visitNodes,
            accept
        } = transformer;

        let compilerOptions = transformer.getCompilerOptions();
        let resolver = transformer.getEmitResolver();
        let languageVersion = getLanguageVersion(compilerOptions);
        let moduleKind = getModuleKind(compilerOptions);
        let currentSourceFile: SourceFile;
        let externalImports: (ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration)[];
        let exportSpecifiers: Map<ExportSpecifier[]>;
        let exportEquals: ExportAssignment;
        let hasExportStars: boolean;
        let exportAssignmentWriter: (node: Statement) => void;
        let savedExpressionSubstution = transformer.getExpressionSubstitution();
        transformer.setExpressionSubstitution(substituteExpressionWithFallback);
        return transformModule;

        /**
         * Transforms a source file via the provided module emit callback.
         */
        function transformModule(node: SourceFile): SourceFile {
            if (isExternalModule(node) || compilerOptions.isolatedModules) {
                currentSourceFile = node;

                // collect information about the external module
                ({ externalImports, exportSpecifiers, exportEquals, hasExportStars } = collectExternalModuleInfo(node, resolver));

                let emitModule = emitModuleDelegates[moduleKind];
                node = updateSourceFileNode(node, flattenNode(node, emitModule), node.endOfFileToken);

                if (hasExportStars && emitModule === emitCommonJSModule) {
                    transformer.setGeneratedNodeFlags(node, GeneratedNodeFlags.EmitExportStar);
                }

                currentSourceFile = undefined;
            }

            return node;
        }

        /**
         * Emits file prologue directives prior to a module body.
         */
        function emitPrologueDirectives(statements: NodeArray<Statement>, write: (node: Statement) => void): number {
            for (let i = 0; i < statements.length; ++i) {
                if (isPrologueDirective(statements[i])) {
                    write(statements[i]);
                }
                else {
                    return i;
                }
            }

            return statements.length;
        }

        /**
         * Emits a CommonJS module.
         */
        function emitCommonJSModule(node: SourceFile, write: (node: Statement) => void) {
            startLexicalEnvironment();

            let statementOffset = emitPrologueDirectives(node.statements, write);

            pipeNodes(node.statements, visitModuleElement, write, statementOffset);
            endLexicalEnvironment(write);

            let exportEquals = tryCreateExportEquals(/*emitAsReturn*/ false);
            if (exportEquals) {
                write(exportEquals);
            }
        }

        /**
         * Emits an AMD module.
         */
        function emitAMDModule(node: SourceFile, write: (node: Statement) => void) {
            let define = createIdentifier("define");
            let moduleName = node.moduleName ? createStringLiteral(node.moduleName) : undefined;
            emitAsynchronousModule(node, write, define, moduleName, /*includeNonAmdDependencies*/ true);
        }

        /**
         * Emits an UMD module.
         */
        function emitUMDModule(node: SourceFile, write: (node: Statement) => void) {
            let define = createIdentifier("define");
            transformer.setGeneratedNodeFlags(define, GeneratedNodeFlags.UMDDefine);
            emitAsynchronousModule(node, write, define, /*moduleName*/ undefined, /*includeNonAmdDependencies*/ false);
        }

        /**
         * Emits an asynchronous module (AMD/UMD).
         * @param node The source file to transform.
         * @param write The callback used to emit the module body.
         * @param define The expression called to define the asynchronous module body.
         * @param moduleName The expression
         */
        function emitAsynchronousModule(node: SourceFile, write: (node: Statement) => void, define: Expression, moduleName: Expression, includeNonAmdDependencies: boolean) {
            // Start the lexical environment for the source file.
            startLexicalEnvironment();

            let statementOffset = emitPrologueDirectives(node.statements, write);

            // An AMD define function has the following shape:
            //     define(id?, dependencies?, factory);
            //
            // This has the shape of
            //     define(name, ["module1", "module2"], function (module1Alias) {
            // The location of the alias in the parameter list in the factory function needs to
            // match the position of the module name in the dependency list.
            //
            // To ensure this is true in cases of modules with no aliases, e.g.:
            // `import "module"` or `<amd-dependency path= "a.css" />`
            // we need to add modules without alias names to the end of the dependencies list

            let defineArguments: Expression[] = [];
            if (moduleName) {
                defineArguments.push(moduleName);
            }

            let aliasedModuleNames: Expression[] = [
                createStringLiteral("require"),
                createStringLiteral("exports")
            ];

            let unaliasedModuleNames: Expression[] = [];

            let importAliasNames: ParameterDeclaration[] = [
                createParameter3("require"),
                createParameter3("exports")
            ];

            for (let amdDependency of node.amdDependencies) {
                if (amdDependency.name) {
                    aliasedModuleNames.push(createStringLiteral(amdDependency.name));
                    importAliasNames.push(createParameter3(amdDependency.name));
                }
                else {
                    unaliasedModuleNames.push(createStringLiteral(amdDependency.path));
                }
            }

            for (let importNode of externalImports) {
                // Find the name of the external module
                let externalModuleName = getExternalModuleNameLiteral(importNode);
                // Find the name of the module alias, if there is one
                let importAliasName = getLocalNameForExternalImport(importNode);
                if (includeNonAmdDependencies && importAliasName) {
                    aliasedModuleNames.push(externalModuleName);
                    importAliasNames.push(createParameter2(importAliasName));
                }
                else {
                    unaliasedModuleNames.push(externalModuleName);
                }
            }

            // Create the import names array.
            let imports = createArrayLiteralExpression(concatenate(aliasedModuleNames, unaliasedModuleNames));
            defineArguments.push(imports);

            // Create the body of the module.
            let statements: Statement[] = [];

            // Start the lexical environment for the module body.
            startLexicalEnvironment();

            // Pipe each statement of the source file through a visitor and out to the module body
            pipeNodes(node.statements, visitModuleElement, statements, statementOffset);

            // End the lexical environment for the module body.
            endLexicalEnvironment(statements);

            // Append the 'export =' statement if provided.
            let exportEquals = tryCreateExportEquals(/*emitAsReturn*/ true);
            if (exportEquals) {
                statements.push(exportEquals);
            }

            // Create the function for the module body.
            let moduleBody = createBlock(statements);

            if (hasExportStars) {
                transformer.setGeneratedNodeFlags(moduleBody, GeneratedNodeFlags.EmitExportStar);
            }

            let moduleFunc = createFunctionExpression3(importAliasNames, moduleBody);
            defineArguments.push(moduleFunc);

            // create the definition
            let defineCall = createCallExpression2(define, defineArguments);
            write(createExpressionStatement(defineCall));

            // End the lexical environment for the source file.
            endLexicalEnvironment(write);
        }

        function visitModuleElement(node: Statement, write: (node: Statement) => void) {
            switch (node.kind) {
                case SyntaxKind.ImportDeclaration:
                    return visitImportDeclaration(<ImportDeclaration>node, write);
                case SyntaxKind.ImportEqualsDeclaration:
                    return visitImportEqualsDeclaration(<ImportEqualsDeclaration>node, write);
                case SyntaxKind.ExportDeclaration:
                    return visitExportDeclaration(<ExportDeclaration>node, write);
                case SyntaxKind.ExportAssignment:
                    return visitExportAssignment(<ExportAssignment>node, write);
                case SyntaxKind.VariableStatement:
                    return visitVariableStatement(<VariableStatement>node, write);
                case SyntaxKind.FunctionDeclaration:
                    return visitFunctionDeclaration(<FunctionDeclaration>node, write);
                case SyntaxKind.ClassDeclaration:
                    return visitClassDeclaration(<ClassDeclaration>node, write);
                default:
                    return write(node);
            }
        }

        function visitImportDeclaration(node: ImportDeclaration, write: (node: Statement) => void): void {
            if (contains(externalImports, node)) {
                let namespaceDeclaration = getNamespaceDeclarationNode(node);
                if (moduleKind !== ModuleKind.AMD) {
                    let require = createRequireCall(node);
                    if (!node.importClause) {
                        // import "mod";
                        write(createExpressionStatement(require, /*location*/ node));
                    }
                    else {
                        let variables: VariableDeclaration[] = [];
                        if (namespaceDeclaration && !isDefaultImport(node)) {
                            // import * as n from "mod";
                            variables.push(createVariableDeclaration2(makeSynthesized(namespaceDeclaration.name), require));
                        }
                        else {
                            // import d from "mod";
                            // import { x, y } from "mod";
                            // import d, { x, y } from "mod";
                            // import d, * as n from "mod";
                            variables.push(createVariableDeclaration2(getGeneratedNameForNode(node), require));
                            if (namespaceDeclaration && isDefaultImport(node)) {
                                variables.push(createVariableDeclaration2(makeSynthesized(namespaceDeclaration.name), getGeneratedNameForNode(node)));
                            }
                        }

                        write(createVariableStatement2(createVariableDeclarationList(variables), /*location*/ node));
                    }
                }
                else if (namespaceDeclaration && isDefaultImport(node)) {
                    // import d, * as n from "mod";
                    write(createVariableStatement3(makeSynthesized(namespaceDeclaration.name), getGeneratedNameForNode(node), /*location*/ node));
                }

                emitExportImportAssignments(node, write);
            }
        }

        function visitImportEqualsDeclaration(node: ImportEqualsDeclaration, write: (node: Statement) => void): void {
            if (contains(externalImports, node)) {
                if (moduleKind !== ModuleKind.AMD) {
                    let require = createRequireCall(node);
                    if (node.flags & NodeFlags.Export) {
                        write(createExpressionStatement(createExportAssignment(node.name, require), /*location*/ node));
                    }
                    else {
                        write(createVariableStatement3(makeSynthesized(node.name), require, /*location*/ node));
                    }
                }
                else {
                    if (node.flags & NodeFlags.Export) {
                        write(createExpressionStatement(createExportAssignment(node.name, node.name), /*location*/ node));
                    }
                }

                emitExportImportAssignments(node, write);
            }
        }

        function visitExportDeclaration(node: ExportDeclaration, write: (node: Statement) => void): void {
            if (contains(externalImports, node)) {
                let generatedName = getGeneratedNameForNode(node);
                if (node.exportClause) {
                    // export { x, y } from "mod";
                    if (moduleKind !== ModuleKind.AMD) {
                        write(createVariableStatement3(generatedName, createRequireCall(node)));
                    }
                    for (let specifier of node.exportClause.elements) {
                        if (resolver.isValueAliasDeclaration(specifier)) {
                            let exportedValue = createPropertyAccessExpression2(generatedName, specifier.propertyName || specifier.name);
                            write(createExpressionStatement(createExportAssignment(specifier.name, exportedValue), /*location*/ specifier));
                        }
                    }
                }
                else {
                    // export * from "mod";
                    if (moduleKind !== ModuleKind.AMD) {
                        write(createExpressionStatement(createExportStarHelperCall(createRequireCall(node)), /*location*/ node));
                    }
                    else {
                        write(createExpressionStatement(createExportStarHelperCall(generatedName), /*location*/ node));
                    }
                }
            }
        }

        function visitExportAssignment(node: ExportAssignment, write: (node: Statement) => void): void {
            if (!node.isExportEquals && resolver.isValueAliasDeclaration(node)) {
                emitExportDefault(node.expression, /*location*/ node, write);
            }
        }

        function emitExportDefault(expression: Expression, location: TextRange, write: (node: Statement) => void): void {
            emitExportDefaultCompat(write);
            let defaultName = createIdentifier("default", SyntaxKind.DefaultKeyword);
            write(createExpressionStatement(createExportAssignment(defaultName, expression), location));
        }

        function emitExportDefaultCompat(write: (node: Statement) => void): void {
            let originalSourceFile = getOriginalNodeIf(currentSourceFile, isSourceFile);
            if (!originalSourceFile.symbol.exports["___esModule"]) {
                if (languageVersion === ScriptTarget.ES3) {
                    let esModule = createIdentifier("__esModule");
                    write(createExpressionStatement(createExportAssignment(esModule, createTrueKeyword())));
                }
                else {
                    let exports = createIdentifier("exports");
                    let esModule = createStringLiteral("__esModule");
                    let descriptor = createDataPropertyDescriptor(createTrueKeyword(), PropertyDescriptorFlags.Empty);
                    write(createExpressionStatement(createDefinePropertyCall(exports, esModule, descriptor)));
                }
            }
        }

        function emitExportImportAssignments(node: Node, write: (node: Statement) => void) {
            let savedExportImportAssignmentWriter = exportAssignmentWriter;
            exportAssignmentWriter = write;
            emitExportImportAssignmentsUsingCapturedWriter(node);
            exportAssignmentWriter = savedExportImportAssignmentWriter;
        }

        function emitExportImportAssignmentsUsingCapturedWriter(node: Node) {
            if (isAliasSymbolDeclaration(node) && resolver.isValueAliasDeclaration(node)) {
                emitExportMemberAssignmentsUsingCapturedWriter(<Identifier>(<Declaration>node).name);
            }

            forEachChild(node, emitExportImportAssignmentsUsingCapturedWriter);
        }

        function emitExportMemberAssignmentsUsingCapturedWriter(name: Identifier) {
            emitExportMemberAssignments(name, exportAssignmentWriter);
        }

        function emitExportMemberAssignments(name: Identifier, write: (node: Statement) => void): void {
            if (!exportEquals && exportSpecifiers && hasProperty(exportSpecifiers, name.text)) {
                for (let specifier of exportSpecifiers[name.text]) {
                    write(createExpressionStatement(createExportAssignment(specifier.name, name), /*location*/ specifier.name));
                }
            }
        }

        function visitVariableStatement(node: VariableStatement, write: (node: Statement) => void): void {
            if (node.flags & NodeFlags.Export) {
                pipeNode(node.declarationList, transformVariableDeclarationListToExpressionStatement, write);
            }
            else {
                write(node);
            }
        }

        function transformVariableDeclarationListToExpressionStatement(node: VariableDeclarationList, write: (node: Statement) => void): void {
            let expressions = mapNodes(node.declarations, transformVariableDeclarationToExpression);
            if (expressions.length) {
                write(createExpressionStatement(inlineExpressions(expressions)));
            }

            pipeNodes(node.declarations, emitVariableExportAssignments, write);
        }

        function transformVariableDeclarationToExpression(node: VariableDeclaration, write: (node: Expression) => void): void {
            if (!node.initializer) {
                return;
            }

            transformBindingElementToExpressionWithParenthesisIfNeeded(node, write, /*parenthesizeObjectLiteralAssignment*/ true);
        }

        /**
         * @remarks
         * This function is intended to be called from either `transformVariableDeclarationToExpression` or
         * `transformBindingElementToExpression` and should not be called otherwise.
         */
        function transformBindingElementToExpressionWithParenthesisIfNeeded(node: BindingElement, write: (node: Expression) => void, parenthesizeObjectLiteralAssignment?: boolean) {
            let name = node.name;
            let expr = isBindingPattern(name)
                ? mapNode(name, transformBindingPatternToExpression)
                : createPropertyAccessExpression2(createIdentifier("exports"), makeSynthesized(name));

            let initializer = node.initializer;
            if (initializer) {
                expr = createAssignmentExpression(expr, initializer, /*location*/ node);
            }

            if (parenthesizeObjectLiteralAssignment && isObjectBindingPattern(name)) {
                expr = createParenthesizedExpression(expr);
            }
            else if (node.dotDotDotToken) {
                expr = createSpreadElementExpression(expr);
            }

            write(expr);
        }

        /**
         * @remarks
         * This function is intended to be called from `transformVariableDeclarationToExpression` and should not be called otherwise.
         */
        function transformBindingPatternToExpression(node: BindingPattern, write: (node: Expression) => void) {
            switch (node.kind) {
                case SyntaxKind.ObjectBindingPattern:
                    return transformObjectBindingPatternToExpression(<ObjectBindingPattern>node, write);

                case SyntaxKind.ArrayBindingPattern:
                    return transformArrayBindingPatternToExpression(<ObjectBindingPattern>node, write);
            }
        }

        /**
         * @remarks
         * This function is intended to be called from `transformBindingPatternToExpression` and should not be called otherwise.
         */
        function transformObjectBindingPatternToExpression(node: ObjectBindingPattern, write: (node: Expression) => void) {
            let properties = mapNodes(node.elements, transformBindingElementToObjectLiteralElement);
            write(createObjectLiteralExpression(properties, /*location*/ node));
        }

        /**
         * @remarks
         * This function is intended to be called from `transformBindingPatternToExpression` and should not be called otherwise.
         */
        function transformArrayBindingPatternToExpression(node: ArrayBindingPattern, write: (node: Expression) => void) {
            let elements = mapNodes(node.elements, transformBindingElementToExpression);
            write(createArrayLiteralExpression(elements, /*location*/ node));
        }

        /**
         * @remarks
         * This function is intended to be called from `transformObjectBindingPatternToExpression` and should not be called otherwise.
         */
        function transformBindingElementToObjectLiteralElement(node: BindingElement, write: (node: ObjectLiteralElement) => void) {
            let propertyName = node.propertyName || <Identifier>node.name;
            let expr = mapNode(node, transformBindingElementToExpression);
            write(createPropertyAssignment(propertyName, expr, /*location*/ node));
        }

        /**
         * @remarks
         * This function is intended to be called from `transformArrayBindingPatternToExpression` or
         * `transformBindingElementToObjectLiteralElement` and should not be called otherwise.
         */
        function transformBindingElementToExpression(node: BindingElement, write: (node: Expression) => void) {
            transformBindingElementToExpressionWithParenthesisIfNeeded(node, write, /*parenthesizeObjectLiteralAssignment*/ false);
        }

        function emitVariableExportAssignments(node: VariableDeclaration | BindingElement, write: (node: Statement) => void): void {
            let name = node.name;
            if (isIdentifier(name)) {
                emitExportMemberAssignments(name, write);
            }
            else if (isBindingPattern(name)) {
                pipeNodes(name.elements, emitVariableExportAssignments, write);
            }
        }

        function visitFunctionDeclaration(node: FunctionDeclaration, write: (node: Statement) => void): void {
            const location: TextRange = node;
            if (node.name) {
                if (node.flags & NodeFlags.Export) {
                    write(createFunctionDeclaration2(node.name, node.parameters, node.body, location));
                    if (node.flags & NodeFlags.Default) {
                        emitExportDefault(makeSynthesized(node.name), location, write);
                    }
                }
                else {
                    write(node);
                }

                emitExportMemberAssignments(node.name, write);
            }
            else if (node.flags & NodeFlags.Default) {
                emitExportDefault(createFunctionExpression3(node.parameters, node.body), location, write);
            }
        }

        function visitClassDeclaration(node: ClassDeclaration, write: (node: Statement) => void): void {
            const location: TextRange = node;
            if (node.name) {
                if (node.flags & NodeFlags.Export) {
                    write(createClassDeclaration2(node.name, getClassExtendsHeritageClauseElement(node), node.members, location));
                    if (node.flags & NodeFlags.Default) {
                        emitExportDefault(makeSynthesized(node.name), location, write);
                    }
                }
                else {
                    write(node);
                }

                emitExportMemberAssignments(node.name, write);
            }
            else if (node.flags & NodeFlags.Default) {
                emitExportDefault(createClassExpression3(getClassExtendsHeritageClauseElement(node), node.members), location, write);
            }
        }

        /**
         * Substitution for identifiers exported at the top level of a module.
         */
        function substituteExpressionWithFallback(node: Expression): Expression {
            let substitute = substituteExpression(node);
            return savedExpressionSubstution ? savedExpressionSubstution(substitute) : substitute;
        }

        function substituteExpression(node: Expression): Expression {
            if (isIdentifier(node)) {
                return substituteExpressionIdentifier(node);
            }
            return node;
        }

        function substituteExpressionIdentifier(node: Identifier): Expression {
            let container = resolver.getReferencedExportContainer(node);
            if (isSourceFile(container)) {
                return createPropertyAccessExpression2(createIdentifier("exports"), makeSynthesized(node), /*location*/ node);
            }

            return node;
        }

        function tryCreateExportEquals(emitAsReturn: boolean) {
            if (exportEquals && resolver.isValueAliasDeclaration(exportEquals)) {
                if (emitAsReturn) {
                    return createReturnStatement(exportEquals.expression);
                }
                else {
                    let moduleExports = createPropertyAccessExpression3(createIdentifier("module"), "exports");
                    let exportExpression = createAssignmentExpression(moduleExports, exportEquals.expression);
                    return createExpressionStatement(exportExpression);
                }
            }
            return undefined;
        }

        function getExternalModuleNameLiteral(importNode: ImportDeclaration | ExportDeclaration | ImportEqualsDeclaration) {
            let moduleName = getExternalModuleName(importNode);
            if (isStringLiteral(moduleName)) {
                return tryRenameExternalModule(moduleName) || makeSynthesized(moduleName);
            }

            return undefined;
        }

        /**
         * Some bundlers (SystemJS builder) sometimes want to rename dependencies.
         * Here we check if alternative name was provided for a given moduleName and return it if possible.
         */
        function tryRenameExternalModule(moduleName: LiteralExpression) {
            if (currentSourceFile.renamedDependencies && hasProperty(currentSourceFile.renamedDependencies, moduleName.text)) {
                return createStringLiteral(currentSourceFile.renamedDependencies[moduleName.text]);
            }
            return undefined;
        }

        function getLocalNameForExternalImport(node: ImportDeclaration | ExportDeclaration | ImportEqualsDeclaration): Identifier {
            let namespaceDeclaration = getNamespaceDeclarationNode(node);
            if (namespaceDeclaration && !isDefaultImport(node)) {
                return createIdentifier(getSourceTextOfNodeFromSourceFile(currentSourceFile, namespaceDeclaration.name));
            }
            if (node.kind === SyntaxKind.ImportDeclaration && (<ImportDeclaration>node).importClause) {
                return getGeneratedNameForNode(node);
            }
            if (node.kind === SyntaxKind.ExportDeclaration && (<ExportDeclaration>node).moduleSpecifier) {
                return getGeneratedNameForNode(node);
            }
        }

        function getNamespaceDeclarationNode(node: ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration) {
            if (node.kind === SyntaxKind.ImportEqualsDeclaration) {
                return <ImportEqualsDeclaration>node;
            }

            let importClause = (<ImportDeclaration>node).importClause;
            if (importClause && importClause.namedBindings && importClause.namedBindings.kind === SyntaxKind.NamespaceImport) {
                return <NamespaceImport>importClause.namedBindings;
            }
        }

        function isDefaultImport(node: ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration) {
            return isImportDeclaration(node) && node.importClause && !!node.importClause.name;
        }

        function createRequireCall(importNode: ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration) {
            let moduleName = getExternalModuleNameLiteral(importNode);
            return createCallExpression2(createIdentifier("require"), moduleName ? [moduleName] : []);
        }

        function emitExportAssignment(name: Identifier, value: Expression, location: TextRange, write: (node: Statement) => void) {
            write(createExpressionStatement(createExportAssignment(name, value), location));
        }

        function createExportAssignment(name: Identifier, value: Expression) {
            let exports = createIdentifier("exports");
            let exportMember: LeftHandSideExpression;
            if (name.originalKeywordKind && languageVersion === ScriptTarget.ES3) {
                let exportName = createStringLiteral(name.text);
                exportMember = createElementAccessExpression2(exports, exportName);
            }
            else {
                let exportName = makeSynthesized(name);
                exportMember = createPropertyAccessExpression2(exports, exportName);
            }

            return createAssignmentExpression(exportMember, value);
        }
    }

    export function collectExternalModuleInfo(sourceFile: SourceFile, resolver: EmitResolver) {
        let externalImports: (ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration)[] = [];
        let exportSpecifiers: Map<ExportSpecifier[]> = {};
        let exportEquals: ExportAssignment = undefined;
        let hasExportStars = false;
        for (let node of sourceFile.statements) {
            switch (node.kind) {
                case SyntaxKind.ImportDeclaration:
                    if (!(<ImportDeclaration>node).importClause ||
                        resolver.isReferencedAliasDeclaration((<ImportDeclaration>node).importClause, /*checkChildren*/ true)) {
                        // import "mod"
                        // import x from "mod" where x is referenced
                        // import * as x from "mod" where x is referenced
                        // import { x, y } from "mod" where at least one import is referenced
                        externalImports.push(<ImportDeclaration>node);
                    }
                    break;

                case SyntaxKind.ImportEqualsDeclaration:
                    if ((<ImportEqualsDeclaration>node).moduleReference.kind === SyntaxKind.ExternalModuleReference && resolver.isReferencedAliasDeclaration(node)) {
                        // import x = require("mod") where x is referenced
                        externalImports.push(<ImportEqualsDeclaration>node);
                    }
                    break;

                case SyntaxKind.ExportDeclaration:
                    if ((<ExportDeclaration>node).moduleSpecifier) {
                        if (!(<ExportDeclaration>node).exportClause) {
                            // export * from "mod"
                            externalImports.push(<ExportDeclaration>node);
                            hasExportStars = true;
                        }
                        else if (resolver.isValueAliasDeclaration(node)) {
                            // export { x, y } from "mod" where at least one export is a value symbol
                            externalImports.push(<ExportDeclaration>node);
                        }
                    }
                    else {
                        // export { x, y }
                        for (let specifier of (<ExportDeclaration>node).exportClause.elements) {
                            let name = (specifier.propertyName || specifier.name).text;
                            (exportSpecifiers[name] || (exportSpecifiers[name] = [])).push(specifier);
                        }
                    }
                    break;

                case SyntaxKind.ExportAssignment:
                    if ((<ExportAssignment>node).isExportEquals && !exportEquals) {
                        // export = x
                        exportEquals = <ExportAssignment>node;
                    }
                    break;
            }
        }

        return { externalImports, exportSpecifiers, exportEquals, hasExportStars };
    }
}