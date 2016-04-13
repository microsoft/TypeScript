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
        const host = context.getEmitHost();
        const languageVersion = getEmitScriptTarget(compilerOptions);
        const moduleKind = getEmitModuleKind(compilerOptions);
        const previousExpressionSubstitution = context.expressionSubstitution;
        context.enableExpressionSubstitution(SyntaxKind.Identifier);
        context.expressionSubstitution = substituteExpression;

        let currentSourceFile: SourceFile;
        let externalImports: (ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration)[];
        let exportSpecifiers: Map<ExportSpecifier[]>;
        let exportEquals: ExportAssignment;
        let hasExportStarsToExportValues: boolean;

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
                ({ externalImports, exportSpecifiers, exportEquals, hasExportStarsToExportValues } = collectExternalModuleInfo(node, resolver));

                // Perform the transformation.
                const updated = transformModuleDelegates[moduleKind](node);
                aggregateTransformFlags(updated);

                currentSourceFile = undefined;
                externalImports = undefined;
                exportSpecifiers = undefined;
                exportEquals = undefined;
                hasExportStarsToExportValues = false;
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
            if (hasExportStarsToExportValues) {
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
            const moduleName = tryGetModuleNameFromFile(node, host, compilerOptions);
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

            const { aliasedModuleNames, unaliasedModuleNames, importAliasNames } = collectAsynchronousDependencies(node, includeNonAmdDependencies);

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
                            //     ["require", "exports", module1", "module2", ...]
                            createArrayLiteral([
                                createLiteral("require"),
                                createLiteral("exports"),
                                ...aliasedModuleNames,
                                ...unaliasedModuleNames
                            ]),

                            // Add the module body function argument:
                            //
                            //     function (require, exports, module1, module2) ...
                            createFunctionExpression(
                                /*asteriskToken*/ undefined,
                                /*name*/ undefined,
                                [
                                    createParameter("require"),
                                    createParameter("exports"),
                                    ...importAliasNames
                                ],
                                transformAsynchronousModuleBody(node)
                            )
                        ]
                    )
                )
            ]);
        }

        /**
         * Transforms a SourceFile into an AMD or UMD module body.
         *
         * @param node The SourceFile node.
         */
        function transformAsynchronousModuleBody(node: SourceFile) {
            startLexicalEnvironment();

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
            if (hasExportStarsToExportValues) {
                // If we have any `export * from ...` declarations
                // we need to inform the emitter to add the __export helper.
                setNodeEmitFlags(body, NodeEmitFlags.EmitExportStar);
            }

            return body;
        }

        function addExportEqualsIfNeeded(statements: Statement[], emitAsReturn: boolean) {
            if (exportEquals && resolver.isValueAliasDeclaration(exportEquals)) {
                if (emitAsReturn) {
                    statements.push(createReturn(exportEquals.expression));
                }
                else {
                    statements.push(
                        createStatement(
                            createAssignment(
                                createPropertyAccess(
                                    createIdentifier("module"),
                                    "exports"
                                ),
                                exportEquals.expression
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

                case SyntaxKind.ExpressionStatement:
                    return visitExpressionStatement(<ExpressionStatement>node);

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
                    statements.push(
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
                        variables.push(
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
                        variables.push(
                            createVariableDeclaration(
                                getGeneratedNameForNode(node),
                                createRequireCall(node)
                            )
                        );

                        if (namespaceDeclaration && isDefaultImport(node)) {
                            variables.push(
                                createVariableDeclaration(
                                    getSynthesizedClone(namespaceDeclaration.name),
                                    getGeneratedNameForNode(node)
                                )
                            );
                        }
                    }

                    statements.push(
                        createVariableStatement(
                            /*modifiers*/ undefined,
                            createConstDeclarationList(variables),
                            /*location*/ node
                        )
                    );
                }
            }
            else if (namespaceDeclaration && isDefaultImport(node)) {
                // import d, * as n from "mod";
                statements.push(
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
            return singleOrMany(statements);
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
                    statements.push(
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
                        statements.push(
                            createStatement(
                                createExportAssignment(specifier.name, exportedValue),
                                /*location*/ specifier
                            )
                        );
                    }
                }

                return singleOrMany(statements);
            }
            else if (resolver.moduleExportsSomeValue(node.moduleSpecifier)) {
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
            if (!node.isExportEquals) {
                if (nodeIsSynthesized(node) || resolver.isValueAliasDeclaration(node)) {
                    const statements: Statement[] = [];
                    addExportDefault(statements, node.expression, /*location*/ node);
                    return statements;
                }
            }

            return undefined;
        }

        function addExportDefault(statements: Statement[], expression: Expression, location: TextRange): void {
            tryAddExportDefaultCompat(statements);

            statements.push(
                createStatement(
                    createExportAssignment(
                        createIdentifier("default"),
                        expression
                    ),
                    location
                )
            );
        }

        function tryAddExportDefaultCompat(statements: Statement[]) {
            const original = getOriginalNode(currentSourceFile);
            Debug.assert(original.kind === SyntaxKind.SourceFile);

            if (!original.symbol.exports["___esModule"]) {
                if (languageVersion === ScriptTarget.ES3) {
                    statements.push(
                        createStatement(
                            createExportAssignment(
                                createIdentifier("__esModule"),
                                createLiteral(true)
                            )
                        )
                    );
                }
                else {
                    statements.push(
                        createStatement(
                            createObjectDefineProperty(
                                createIdentifier("exports"),
                                createLiteral("__esModule"),
                                { value: createLiteral(true) }
                            )
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

        function addExportMemberAssignment(statements: Statement[], node: DeclarationStatement) {
            if (hasModifier(node, ModifierFlags.Default)) {
                addExportDefault(statements, getDeclarationName(node), /*location*/ node);
            }
            else {
                statements.push(
                    createExportStatement(node.name, setNodeEmitFlags(getSynthesizedClone(node.name), NodeEmitFlags.LocalName), /*location*/ node)
                );
            }
        }

        function visitVariableStatement(node: VariableStatement): VisitResult<Statement> {
            if (hasModifier(node, ModifierFlags.Export)) {
                // If the variable is for a declaration that has a local name,
                // do not elide the declaration.
                const original = getOriginalNode(node);
                if (original.kind === SyntaxKind.EnumDeclaration
                    || original.kind === SyntaxKind.ModuleDeclaration) {
                    return setOriginalNode(
                        createVariableStatement(
                            /*modifiers*/ undefined,
                            node.declarationList
                        ),
                        node
                    );
                }

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
            const name = node.name || getGeneratedNameForNode(node);
            if (hasModifier(node, ModifierFlags.Export)) {
                statements.push(
                    createFunctionDeclaration(
                        /*modifiers*/ undefined,
                        /*asteriskToken*/ undefined,
                        name,
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

            if (node.name) {
                addExportMemberAssignments(statements, node.name);
            }

            return singleOrMany(statements);
        }

        function visitClassDeclaration(node: ClassDeclaration): VisitResult<Statement> {
            const statements: Statement[] = [];
            const name = node.name || getGeneratedNameForNode(node);
            if (hasModifier(node, ModifierFlags.Export)) {
                statements.push(
                    createClassDeclaration(
                        /*modifiers*/ undefined,
                        name,
                        node.heritageClauses,
                        node.members,
                        /*location*/ node
                    )
                );

                addExportMemberAssignment(statements, node);
            }
            else {
                statements.push(node);
            }

            if (node.name) {
                addExportMemberAssignments(statements, node.name);
            }

            return singleOrMany(statements);
        }

        function visitExpressionStatement(node: ExpressionStatement): VisitResult<Statement> {
            const original = getOriginalNode(node);
            if (original.kind === SyntaxKind.EnumDeclaration
                && hasModifier(original, ModifierFlags.Export)) {
                return visitExpressionStatementForEnumDeclaration(node, <EnumDeclaration>original);
            }

            return node;
        }

        function visitExpressionStatementForEnumDeclaration(node: ExpressionStatement, original: EnumDeclaration): VisitResult<Statement> {
            if (isFirstDeclarationOfKind(original, SyntaxKind.EnumDeclaration)) {
                const statements: Statement[] = [node];
                addVarForExportedEnumDeclaration(statements, original);
                return statements;
            }

            return node;
        }

        /**
         * Adds a trailing VariableStatement for an enum or module declaration.
         */
        function addVarForExportedEnumDeclaration(statements: Statement[], node: EnumDeclaration | ModuleDeclaration) {
            statements.push(
                createVariableStatement(
                    /*modifiers*/ undefined,
                    [createVariableDeclaration(
                        getDeclarationName(node),
                        createPropertyAccess(createIdentifier("exports"), getDeclarationName(node))
                    )],
                    /*location*/ node
                )
            );
        }

        function getDeclarationName(node: DeclarationStatement) {
            return node.name ? getSynthesizedClone(node.name) : getGeneratedNameForNode(node);
        }

        function substituteExpression(node: Expression) {
            node = previousExpressionSubstitution(node);
            if (isIdentifier(node)) {
                return substituteExpressionIdentifier(node);
            }

            return node;
        }

        function substituteExpressionIdentifier(node: Identifier): Expression {
            if (getNodeEmitFlags(node) & NodeEmitFlags.LocalName) {
                return node;
            }

            const container = resolver.getReferencedExportContainer(node, (getNodeEmitFlags(node) & NodeEmitFlags.ExportName) !== 0);
            if (container) {
                if (container.kind === SyntaxKind.SourceFile) {
                    return createPropertyAccess(
                        createIdentifier("exports"),
                        getSynthesizedClone(node),
                        /*location*/ node
                    );
                }
            }
            else {
                const declaration = resolver.getReferencedImportDeclaration(node);
                if (declaration) {
                    if (declaration.kind === SyntaxKind.ImportClause) {
                        if (languageVersion >= ScriptTarget.ES5) {
                            return createPropertyAccess(
                                getGeneratedNameForNode(declaration.parent),
                                createIdentifier("default"),
                                /*location*/ node
                            );
                        }
                        else {
                            return createElementAccess(
                                getGeneratedNameForNode(declaration.parent),
                                createLiteral("default"),
                                /*location*/ node
                            );
                        }
                    }
                    else if (declaration.kind === SyntaxKind.ImportSpecifier) {
                        const name = (<ImportSpecifier>declaration).propertyName
                            || (<ImportSpecifier>declaration).name;
                        return createPropertyAccess(
                            getGeneratedNameForNode(declaration.parent.parent.parent),
                            getSynthesizedClone(name),
                            /*location*/ node
                        );
                    }
                }
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

        function createRequireCall(importNode: ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration) {
            const moduleName = getExternalModuleNameLiteral(importNode, currentSourceFile, host, resolver, compilerOptions);
            const args: Expression[] = [];
            if (isDefined(moduleName)) {
                args.push(moduleName);
            }

            return createCall(createIdentifier("require"), args);
        }

        function createExportStatement(name: Identifier, value: Expression, location?: TextRange) {
            return startOnNewLine(createStatement(createExportAssignment(name, value), location));
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

        interface AsynchronousDependencies {
            aliasedModuleNames: Expression[];
            unaliasedModuleNames: Expression[];
            importAliasNames: ParameterDeclaration[];
        }

        function collectAsynchronousDependencies(node: SourceFile, includeNonAmdDependencies: boolean): AsynchronousDependencies {
            // names of modules with corresponding parameter in the factory function
            const aliasedModuleNames: Expression[] = [];

            // names of modules with no corresponding parameters in factory function
            const unaliasedModuleNames: Expression[] = [];

            // names of the parameters in the factory function; these
            // parameters need to match the indexes of the corresponding
            // module names in aliasedModuleNames.
            const importAliasNames: ParameterDeclaration[] = [];

            // Fill in amd-dependency tags
            for (const amdDependency of node.amdDependencies) {
                if (amdDependency.name) {
                    aliasedModuleNames.push(createLiteral(amdDependency.path));
                    importAliasNames.push(createParameter(amdDependency.name));
                }
                else {
                    unaliasedModuleNames.push(createLiteral(amdDependency.path));
                }
            }

            for (const importNode of externalImports) {
                // Find the name of the external module
                const externalModuleName = getExternalModuleNameLiteral(importNode, currentSourceFile, host, resolver, compilerOptions);

                // Find the name of the module alias, if there is one
                const importAliasName = getLocalNameForExternalImport(importNode, currentSourceFile);
                if (includeNonAmdDependencies && importAliasName) {
                    aliasedModuleNames.push(externalModuleName);
                    importAliasNames.push(createParameter(importAliasName));
                }
                else {
                    unaliasedModuleNames.push(externalModuleName);
                }
            }

            return { aliasedModuleNames, unaliasedModuleNames, importAliasNames };
        }

        function updateSourceFile(node: SourceFile, statements: Statement[]) {
            const updated = getMutableClone(node);
            updated.statements = createNodeArray(statements, node.statements);
            return updated;
        }
    }
}
