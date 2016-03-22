/// <reference path="../../factory.ts" />
/// <reference path="../../visitor.ts" />

/*@internal*/
namespace ts {
    export function transformModule(context: TransformationContext) {
        const transformModuleDelegates: Map<(node: SourceFile) => SourceFile> = {
            [ModuleKind.None]: transformCommonJSModule,
            [ModuleKind.CommonJS]: transformCommonJSModule,
            [ModuleKind.AMD]: transformAMDModule,
            [ModuleKind.UMD]: transformUMDModule,
        };

        const {
            startLexicalEnvironment,
            endLexicalEnvironment,
            hoistVariableDeclaration,
            setNodeEmitFlags,
            getNodeEmitFlags,
        } = context;

        const compilerOptions = context.getCompilerOptions();
        const resolver = context.getEmitResolver();
        const languageVersion = getEmitScriptTarget(compilerOptions);
        const moduleKind = getEmitModuleKind(compilerOptions);
        const previousExpressionSubstitution = context.expressionSubstitution;
        context.enableExpressionSubstitution(SyntaxKind.Identifier);
        context.expressionSubstitution = substituteExpression;

        let currentSourceFile: SourceFile;
        let externalImports: (ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration)[];
        let exportSpecifiers: Map<ExportSpecifier[]>;
        let exportEquals: ExportAssignment;
        let hasExportStars: boolean;

        return transformSourceFile;

        /**
         * Transforms the module aspects of a SourceFile.
         *
         * @param node The SourceFile node.
         */
        function transformSourceFile(node: SourceFile) {
            if (isExternalModule(node) || compilerOptions.isolatedModules) {
                currentSourceFile = node;

                // Collect information about the external module.
                ({ externalImports, exportSpecifiers, exportEquals, hasExportStars } = collectExternalModuleInfo(node, resolver));

                // Perform the transformation.
                const updated = transformModuleDelegates[moduleKind](node);
                aggregateTransformFlags(updated);

                currentSourceFile = undefined;
                externalImports = undefined;
                exportSpecifiers = undefined;
                exportEquals = undefined;
                hasExportStars = false;
                return updated;
            }

            return node;
        }

        /**
         * Transforms a SourceFile into a CommonJS module.
         *
         * @param node The SourceFile node.
         */
        function transformCommonJSModule(node: SourceFile) {
            startLexicalEnvironment();

            const statements: Statement[] = [];
            const statementOffset = addPrologueDirectives(statements, node.statements, /*ensureUseStrict*/ !compilerOptions.noImplicitUseStrict);
            addRange(statements, visitNodes(node.statements, visitor, isStatement, statementOffset));
            addRange(statements, endLexicalEnvironment());
            addExportEqualsIfNeeded(statements, /*emitAsReturn*/ false);

            const updated = updateSourceFile(node, statements);
            if (hasExportStars) {
                setNodeEmitFlags(updated, NodeEmitFlags.EmitExportStar | getNodeEmitFlags(node));
            }

            return updated;
        }

        /**
         * Transforms a SourceFile into an AMD module.
         *
         * @param node The SourceFile node.
         */
        function transformAMDModule(node: SourceFile) {
            const define = createIdentifier("define");
            const moduleName = node.moduleName ? createLiteral(node.moduleName) : undefined;
            return transformAsynchronousModule(node, define, moduleName, /*includeNonAmdDependencies*/ true);
        }

        /**
         * Transforms a SourceFile into a UMD module.
         *
         * @param node The SourceFile node.
         */
        function transformUMDModule(node: SourceFile) {
            const define = createIdentifier("define");
            setNodeEmitFlags(define, NodeEmitFlags.UMDDefine);
            return transformAsynchronousModule(node, define, /*moduleName*/ undefined, /*includeNonAmdDependencies*/ false);
        }

        /**
         * Transforms a SourceFile into an AMD or UMD module.
         *
         * @param node The SourceFile node.
         * @param define The expression used to define the module.
         * @param moduleName An expression for the module name, if available.
         * @param includeNonAmdDependencies A value indicating whether to incldue any non-AMD dependencies.
         */
        function transformAsynchronousModule(node: SourceFile, define: Expression, moduleName: Expression, includeNonAmdDependencies: boolean) {
            // Start the lexical environment for the module body.
            startLexicalEnvironment();

            const { importModuleNames, importAliasNames } = collectAsynchronousDependencies(node, includeNonAmdDependencies);

            // Create an updated SourceFile:
            //
            //     define(moduleName?, ["module1", "module2"], function ...
            return updateSourceFile(node, [
                createStatement(
                    createCall(
                        define,
                        [
                            // Add the module name (if provided).
                            ...(moduleName ? [moduleName] : []),

                            // Add the dependency array argument:
                            //
                            //     ["module1", "module2", ...]
                            createArrayLiteral(importModuleNames),

                            // Add the module body function argument:
                            //
                            //     function (module1, module2) ...
                            createFunctionExpression(
                                /*asteriskToken*/ undefined,
                                /*name*/ undefined,
                                importAliasNames,
                                transformAsynchronousModuleBody(node)
                            )
                        ]
                    )
                )
            ]);
        }

        function transformAsynchronousModuleBody(node: SourceFile) {
            const statements: Statement[] = [];
            const statementOffset = addPrologueDirectives(statements, node.statements, /*ensureUseStrict*/ !compilerOptions.noImplicitUseStrict);

            // Visit each statement of the module body.
            addRange(statements, visitNodes(node.statements, visitor, isStatement, statementOffset));

            // End the lexical environment for the module body
            // and merge any new lexical declarations.
            addRange(statements, endLexicalEnvironment());

            // Append the 'export =' statement if provided.
            addExportEqualsIfNeeded(statements, /*emitAsReturn*/ true);

            const body = createBlock(statements, /*location*/ undefined, /*multiLine*/ true);

            if (hasExportStars) {
                // If we have any `export * from ...` declarations
                // we need to inform the emitter to add the __export helper.
                setNodeEmitFlags(body, NodeEmitFlags.EmitExportStar);
            }

            return body;
        }

        function addExportEqualsIfNeeded(statements: Statement[], emitAsReturn: boolean) {
            if (exportEquals && resolver.isValueAliasDeclaration(exportEquals)) {
                if (emitAsReturn) {
                    statements.push(
                        startOnNewLine(
                            createReturn(exportEquals.expression)
                        )
                    );
                }
                else {
                    statements.push(
                        startOnNewLine(
                            createStatement(
                                createAssignment(
                                    createPropertyAccess(
                                        createIdentifier("module"),
                                        "exports"
                                    ),
                                    exportEquals.expression
                                )
                            )
                        )
                    );
                }
            }
        }

        /**
         * Visits a node at the top level of the source file.
         *
         * @param node The node.
         */
        function visitor(node: Node): VisitResult<Node> {
            switch (node.kind) {
                case SyntaxKind.ImportDeclaration:
                    return visitImportDeclaration(<ImportDeclaration>node);

                case SyntaxKind.ImportEqualsDeclaration:
                    return visitImportEqualsDeclaration(<ImportEqualsDeclaration>node);

                case SyntaxKind.ExportDeclaration:
                    return visitExportDeclaration(<ExportDeclaration>node);

                case SyntaxKind.ExportAssignment:
                    return visitExportAssignment(<ExportAssignment>node);

                case SyntaxKind.VariableStatement:
                    return visitVariableStatement(<VariableStatement>node);

                case SyntaxKind.FunctionDeclaration:
                    return visitFunctionDeclaration(<FunctionDeclaration>node);

                case SyntaxKind.ClassDeclaration:
                    return visitClassDeclaration(<ClassDeclaration>node);

                default:
                    // This visitor does not descend into the tree, as export/import statements
                    // are only transformed at the top level of a file.
                    return node;
            }
        }

        /**
         * Visits an ImportDeclaration node.
         *
         * @param node The ImportDeclaration node.
         */
        function visitImportDeclaration(node: ImportDeclaration): VisitResult<Statement> {
            if (!contains(externalImports, node)) {
                return undefined;
            }

            const statements: Statement[] = [];
            const namespaceDeclaration = getNamespaceDeclarationNode(node);
            if (moduleKind !== ModuleKind.AMD) {
                if (!node.importClause) {
                    // import "mod";
                    addNode(statements,
                        createStatement(
                            createRequireCall(node),
                            /*location*/ node
                        )
                    );
                }
                else {
                    const variables: VariableDeclaration[] = [];
                    if (namespaceDeclaration && !isDefaultImport(node)) {
                        // import * as n from "mod";
                        addNode(variables,
                            createVariableDeclaration(
                                getSynthesizedClone(namespaceDeclaration.name),
                                createRequireCall(node)
                            )
                        );
                    }
                    else {
                        // import d from "mod";
                        // import { x, y } from "mod";
                        // import d, { x, y } from "mod";
                        // import d, * as n from "mod";
                        addNode(variables,
                            createVariableDeclaration(
                                getGeneratedNameForNode(node),
                                createRequireCall(node)
                            )
                        );

                        if (namespaceDeclaration && isDefaultImport(node)) {
                            addNode(variables,
                                createVariableDeclaration(
                                    getSynthesizedClone(namespaceDeclaration.name),
                                    getGeneratedNameForNode(node)
                                )
                            );
                        }
                    }

                    addNode(statements,
                        createVariableStatement(
                            /*modifiers*/ undefined,
                            createVariableDeclarationList(variables),
                            /*location*/ node
                        )
                    );
                }
            }
            else if (namespaceDeclaration && isDefaultImport(node)) {
                // import d, * as n from "mod";
                addNode(statements,
                    createVariableStatement(
                        /*modifiers*/ undefined,
                        createVariableDeclarationList([
                            createVariableDeclaration(
                                getSynthesizedClone(namespaceDeclaration.name),
                                getGeneratedNameForNode(node),
                                /*location*/ node
                            )
                        ])
                    )
                );
            }

            addExportImportAssignments(statements, node);
            return statements;
        }

        function visitImportEqualsDeclaration(node: ImportEqualsDeclaration): VisitResult<Statement> {
            if (!contains(externalImports, node)) {
                return undefined;
            }

            const statements: Statement[] = [];
            if (moduleKind !== ModuleKind.AMD) {
                if (hasModifier(node, ModifierFlags.Export)) {
                    statements.push(
                        createStatement(
                            createExportAssignment(
                                node.name,
                                createRequireCall(node)
                            ),
                            /*location*/ node
                        )
                    );
                }
                else {
                    statements.push(
                        createVariableStatement(
                            /*modifiers*/ undefined,
                            createVariableDeclarationList([
                                createVariableDeclaration(
                                    getSynthesizedClone(node.name),
                                    createRequireCall(node)
                                )
                            ],
                            /*location*/ undefined,
                            /*flags*/ languageVersion >= ScriptTarget.ES6 ? NodeFlags.Const : NodeFlags.None),
                            /*location*/ node
                        )
                    );
                }
            }
            else {
                if (hasModifier(node, ModifierFlags.Export)) {
                    statements.push(
                        createStatement(
                            createExportAssignment(node.name, node.name),
                            /*location*/ node
                        )
                    );
                }
            }

            addExportImportAssignments(statements, node);
            return statements;
        }

        function visitExportDeclaration(node: ExportDeclaration): VisitResult<Statement> {
            if (!contains(externalImports, node)) {
                return undefined;
            }

            const generatedName = getGeneratedNameForNode(node);
            if (node.exportClause) {
                const statements: Statement[] = [];
                // export { x, y } from "mod";
                if (moduleKind !== ModuleKind.AMD) {
                    addNode(statements,
                        createVariableStatement(
                            /*modifiers*/ undefined,
                            createVariableDeclarationList([
                                createVariableDeclaration(
                                    generatedName,
                                    createRequireCall(node),
                                    /*location*/ node
                                )
                            ])
                        )
                    );
                }
                for (const specifier of node.exportClause.elements) {
                    if (resolver.isValueAliasDeclaration(specifier)) {
                        const exportedValue = createPropertyAccess(
                            generatedName,
                            specifier.propertyName || specifier.name
                        );
                        addNode(statements,
                            createStatement(
                                createExportAssignment(specifier.name, exportedValue),
                                /*location*/ specifier
                            )
                        );
                    }
                }

                return statements;
            }
            else {
                // export * from "mod";
                return createStatement(
                    createCall(
                        createIdentifier("__export"),
                        [
                            moduleKind !== ModuleKind.AMD
                                ? createRequireCall(node)
                                : generatedName
                        ]
                    ),
                    /*location*/ node
                );
            }
        }

        function visitExportAssignment(node: ExportAssignment): VisitResult<Statement> {
            if (!node.isExportEquals && resolver.isValueAliasDeclaration(node)) {
                const statements: Statement[] = [];
                addExportDefault(statements, node.expression, /*location*/ node);
                return statements;
            }

            return undefined;
        }

        function addExportDefault(statements: Statement[], expression: Expression, location: TextRange): void {
            addNode(statements, tryCreateExportDefaultCompat());
            addNode(statements,
                createStatement(
                    createExportAssignment(
                        createIdentifier("default"),
                        expression
                    ),
                    location
                )
            );
        }

        function tryCreateExportDefaultCompat(): Statement {
            const original = getOriginalNode(currentSourceFile);
            Debug.assert(original.kind === SyntaxKind.SourceFile);

            if (!(<SourceFile>original).symbol.exports["___esModule"]) {
                if (languageVersion === ScriptTarget.ES3) {
                    return createStatement(
                        createExportAssignment(
                            createIdentifier("__esModule"),
                            createLiteral(true)
                        )
                    );
                }
                else {
                    return createStatement(
                        createObjectDefineProperty(
                            createIdentifier("exports"),
                            createLiteral("_esModule"),
                            { value: createLiteral(true) }
                        )
                    );
                }
            }
        }

        function addExportImportAssignments(statements: Statement[], node: Node) {
            const names = reduceEachChild(node, collectExportMembers, []);
            for (const name of names) {
                addExportMemberAssignments(statements, name);
            }
        }

        function collectExportMembers(names: Identifier[], node: Node): Identifier[] {
            if (isAliasSymbolDeclaration(node) && resolver.isValueAliasDeclaration(node) && isDeclaration(node)) {
                const name = node.name;
                if (isIdentifier(name)) {
                    names.push(name);
                }
            }

            return reduceEachChild(node, collectExportMembers, names);
        }

        function addExportMemberAssignments(statements: Statement[], name: Identifier): void {
            if (!exportEquals && exportSpecifiers && hasProperty(exportSpecifiers, name.text)) {
                for (const specifier of exportSpecifiers[name.text]) {
                    statements.push(
                        startOnNewLine(
                            createStatement(
                                createExportAssignment(specifier.name, name),
                                /*location*/ specifier.name
                            )
                        )
                    );
                }
            }
        }

        function addExportMemberAssignment(statements: Statement[], node: FunctionDeclaration | ClassDeclaration) {
            if (hasModifier(node, ModifierFlags.Default)) {
                addExportDefault(statements, getSynthesizedClone(node.name), /*location*/ node);
            }
            else {
                statements.push(
                    startOnNewLine(
                        createStatement(
                            createExportAssignment(node.name, node.name),
                            /*location*/ node
                        )
                    )
                );
            }
        }

        function visitVariableStatement(node: VariableStatement): VisitResult<Statement> {
            if (hasModifier(node, ModifierFlags.Export)) {
                const variables = getInitializedVariables(node.declarationList);
                if (variables.length === 0) {
                    // elide statement if there are no initialized variables
                    return undefined;
                }

                return createStatement(
                    inlineExpressions(
                        map(variables, transformInitializedVariable)
                    )
                );
            }
            return node;
        }

        function transformInitializedVariable(node: VariableDeclaration): Expression {
            const name = node.name;
            if (isBindingPattern(name)) {
                return flattenVariableDestructuringToExpression(
                    context,
                    node,
                    hoistVariableDeclaration,
                    getModuleMemberName,
                    visitor
                );
            }
            else {
                return createAssignment(
                    getModuleMemberName(name),
                    visitNode(node.initializer, visitor, isExpression)
                );
            }
        }

        function visitFunctionDeclaration(node: FunctionDeclaration): VisitResult<Statement> {
            const statements: Statement[] = [];
            if (node.name) {
                if (hasModifier(node, ModifierFlags.Export)) {
                    statements.push(
                        createFunctionDeclaration(
                            /*modifiers*/ undefined,
                            /*asteriskToken*/ undefined,
                            node.name,
                            node.parameters,
                            node.body,
                            /*location*/ node
                        )
                    );

                    addExportMemberAssignment(statements, node);
                }
                else {
                    statements.push(node);
                }

                addExportMemberAssignments(statements, node.name);
            }
            else {
                Debug.assert(hasModifier(node, ModifierFlags.Default));
                addExportDefault(statements,
                    createFunctionExpression(
                        /*asteriskToken*/ undefined,
                        /*name*/ undefined,
                        node.parameters,
                        node.body,
                        /*location*/ node
                    ),
                    /*location*/ node
                );
            }
            return statements;
        }

        function visitClassDeclaration(node: ClassDeclaration): VisitResult<Statement> {
            const statements: Statement[] = [];
            if (node.name) {
                if (hasModifier(node, ModifierFlags.Export)) {
                    statements.push(
                        createClassDeclaration(
                            /*modifiers*/ undefined,
                            node.name,
                            node.heritageClauses,
                            node.members,
                            /*location*/ node
                        )
                    );

                    addExportMemberAssignment(statements, node);
                }
                else {
                    addNode(statements, node);
                }

                addExportMemberAssignments(statements, node.name);
            }
            else {
                Debug.assert(hasModifier(node, ModifierFlags.Default));
                addExportDefault(statements,
                    createClassExpression(
                        /*name*/ undefined,
                        node.heritageClauses,
                        node.members,
                        /*location*/ node
                    ),
                    /*location*/ node
                );
            }

            return statements;
        }

        function substituteExpression(node: Expression) {
            node = previousExpressionSubstitution(node);
            if (isIdentifier(node)) {
                return substituteExpressionIdentifier(node);
            }

            return node;
        }

        function substituteExpressionIdentifier(node: Identifier): Expression {
            const container = resolver.getReferencedExportContainer(node);
            if (container && container.kind === SyntaxKind.SourceFile) {
                return createPropertyAccess(
                    createIdentifier("exports"),
                    getSynthesizedClone(node),
                    /*location*/ node
                );
            }

            return node;
        }

        function getModuleMemberName(name: Identifier) {
            return createPropertyAccess(
                createIdentifier("exports"),
                name,
                /*location*/ name
            );
        }

        function getExternalModuleNameLiteral(importNode: ImportDeclaration | ExportDeclaration | ImportEqualsDeclaration) {
            const moduleName = getExternalModuleName(importNode);
            if (moduleName.kind === SyntaxKind.StringLiteral) {
                return tryRenameExternalModule(<StringLiteral>moduleName)
                    || getSynthesizedClone(<StringLiteral>moduleName);
            }

            return undefined;
        }

        /**
         * Some bundlers (SystemJS builder) sometimes want to rename dependencies.
         * Here we check if alternative name was provided for a given moduleName and return it if possible.
         */
        function tryRenameExternalModule(moduleName: LiteralExpression) {
            if (currentSourceFile.renamedDependencies && hasProperty(currentSourceFile.renamedDependencies, moduleName.text)) {
                return createLiteral(currentSourceFile.renamedDependencies[moduleName.text]);
            }
            return undefined;
        }

        function getLocalNameForExternalImport(node: ImportDeclaration | ExportDeclaration | ImportEqualsDeclaration): Identifier {
            const namespaceDeclaration = getNamespaceDeclarationNode(node);
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

        function createRequireCall(importNode: ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration) {
            const moduleName = getExternalModuleNameLiteral(importNode);
            Debug.assert(isDefined(moduleName));
            return createCall(
                createIdentifier("require"),
                [moduleName]
            );
        }

        function createExportAssignment(name: Identifier, value: Expression) {
            return createAssignment(
                name.originalKeywordKind && languageVersion === ScriptTarget.ES3
                    ? createElementAccess(
                        createIdentifier("exports"),
                        createLiteral(name.text)
                    )
                    : createPropertyAccess(
                        createIdentifier("exports"),
                        getSynthesizedClone(name)
                    ),
                value
            );
        }

        function collectAsynchronousDependencies(node: SourceFile, includeNonAmdDependencies: boolean) {
            // An AMD define function has the following shape:
            //
            //     define(id?, dependencies?, factory);
            //
            // This has the shape of the following:
            //
            //     define(name, ["module1", "module2"], function (module1Alias) { ... }
            //
            // The location of the alias in the parameter list in the factory function needs to
            // match the position of the module name in the dependency list.
            //
            // To ensure this is true in cases of modules with no aliases, e.g.:
            //
            //     import "module"
            //
            // or
            //
            //     /// <amd-dependency path= "a.css" />
            //
            // we need to add modules without alias names to the end of the dependencies list

            const unaliasedModuleNames: Expression[] = [];
            const aliasedModuleNames: Expression[] = [createLiteral("require"), createLiteral("exports") ];
            const importAliasNames = [createParameter("require"), createParameter("exports")];

            for (const amdDependency of node.amdDependencies) {
                if (amdDependency.name) {
                    aliasedModuleNames.push(createLiteral(amdDependency.name));
                    importAliasNames.push(createParameter(createIdentifier(amdDependency.name)));
                }
                else {
                    unaliasedModuleNames.push(createLiteral(amdDependency.path));
                }
            }

            for (const importNode of externalImports) {
                // Find the name of the external module
                const externalModuleName = getExternalModuleNameLiteral(importNode);
                // Find the name of the module alias, if there is one
                const importAliasName = getLocalNameForExternalImport(importNode);
                if (includeNonAmdDependencies && importAliasName) {
                    aliasedModuleNames.push(externalModuleName);
                    importAliasNames.push(createParameter(importAliasName));
                }
                else {
                    unaliasedModuleNames.push(externalModuleName);
                }
            }

            return {
                importModuleNames: [
                    ...aliasedModuleNames,
                    ...unaliasedModuleNames
                ],
                importAliasNames
            };
        }

        function updateSourceFile(node: SourceFile, statements: Statement[]) {
            const updated = getMutableClone(node);
            updated.statements = createNodeArray(statements, node.statements);
            return updated;
        }
    }
}
