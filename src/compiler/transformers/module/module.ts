/// <reference path="../../factory.ts" />
/// <reference path="../../visitor.ts" />

/*@internal*/
namespace ts {
    // TODO(rbuckton): CommonJS/AMD/UMD transformer
    export function transformModule(context: TransformationContext) {
        const transformModuleDelegates: Map<(node: SourceFile) => Statement[]> = {
            [ModuleKind.None]: transformCommonJSModule,
            [ModuleKind.CommonJS]: transformCommonJSModule,
            [ModuleKind.AMD]: transformAMDModule,
            [ModuleKind.UMD]: transformUMDModule,
        };

        const {
            getGeneratedNameForNode,
            startLexicalEnvironment,
            endLexicalEnvironment,
            hoistVariableDeclaration,
            setNodeEmitFlags
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

        function transformSourceFile(node: SourceFile) {
            if (isExternalModule(node) || compilerOptions.isolatedModules) {
                currentSourceFile = node;

                // collect information about the external module
                ({ externalImports, exportSpecifiers, exportEquals, hasExportStars } = collectExternalModuleInfo(node, resolver));

                const moduleTransformer = transformModuleDelegates[moduleKind];
                const statements = moduleTransformer(node);
                const updated = cloneNode(node, node, node.flags, /*parent*/ undefined, node);
                updated.statements = createNodeArray(statements, node.statements);

                if (hasExportStars && moduleTransformer === transformCommonJSModule) {
                    setNodeEmitFlags(updated, NodeEmitFlags.EmitExportStar);
                }

                currentSourceFile = undefined;
                externalImports = undefined;
                exportSpecifiers = undefined;
                exportEquals = undefined;
                hasExportStars = false;
                return updated;
            }

            return node;
        }

        function transformCommonJSModule(node: SourceFile) {
            const statements: Statement[] = [];
            startLexicalEnvironment();

            const statementOffset = copyPrologueDirectives(node.statements, statements);
            addNodes(statements, visitNodes(node.statements, visitor, isStatement, statementOffset));
            addNodes(statements, endLexicalEnvironment());
            addNode(statements, tryCreateExportEquals(/*emitAsReturn*/ false));

            return statements;
        }

        function transformAMDModule(node: SourceFile) {
            const define = createIdentifier("define");
            const moduleName = node.moduleName ? createLiteral(node.moduleName) : undefined;
            return transformAsynchronousModule(node, define, moduleName, /*includeNonAmdDependencies*/ true);
        }

        function transformUMDModule(node: SourceFile) {
            const define = createIdentifier("define");
            setNodeEmitFlags(define, NodeEmitFlags.UMDDefine);
            return transformAsynchronousModule(node, define, /*moduleName*/ undefined, /*includeNonAmdDependencies*/ false);
        }

        function transformAsynchronousModule(node: SourceFile, define: Expression, moduleName: Expression, includeNonAmdDependencies: boolean) {
            const statements: Statement[] = [];
            startLexicalEnvironment();

            const statementOffset = copyPrologueDirectives(node.statements, statements);

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

            const defineArguments: Expression[] = [];
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

            // Add the module name.
            addNode(defineArguments, moduleName);

            // Create the import names array.
            addNode(defineArguments, createArrayLiteral(concatenate(aliasedModuleNames, unaliasedModuleNames)));

            // Create the body of the module.
            const moduleBodyStatements: Statement[] = [];

            // Start the lexical environment for the module body.
            startLexicalEnvironment();

            // Pipe each statement of the source file through a visitor and out to the module body
            addNodes(moduleBodyStatements, visitNodes(node.statements, visitor, isStatement, statementOffset));

            // End the lexical environment for the module body.
            addNodes(moduleBodyStatements, endLexicalEnvironment());

            // Append the 'export =' statement if provided.
            addNode(moduleBodyStatements, tryCreateExportEquals(/*emitAsReturn*/ true));

            // Create the function for the module body.
            const moduleBody = setMultiLine(createBlock(moduleBodyStatements), true);

            if (hasExportStars) {
                setNodeEmitFlags(moduleBody, NodeEmitFlags.EmitExportStar);
            }

            addNode(defineArguments,
                createFunctionExpression(
                    /*asteriskToken*/ undefined,
                    /*name*/ undefined,
                    importAliasNames,
                    moduleBody
                )
            );

            addNode(statements,
                createStatement(
                    createCall(
                        define,
                        defineArguments
                    )
                )
            );

            return statements;
        }

        function visitor(node: Node) {
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
                    return node;
            }
        }

        function visitImportDeclaration(node: ImportDeclaration): OneOrMany<Statement> {
            if (contains(externalImports, node)) {
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
                                    getSynthesizedNode(namespaceDeclaration.name),
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
                                        getSynthesizedNode(namespaceDeclaration.name),
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
                                    getSynthesizedNode(namespaceDeclaration.name),
                                    getGeneratedNameForNode(node),
                                    /*location*/ node
                                )
                            ])
                        )
                    );
                }

                addExportImportAssignments(statements, node);
                return createNodeArrayNode(statements);
            }

            return undefined;
        }

        function visitImportEqualsDeclaration(node: ImportEqualsDeclaration): OneOrMany<Statement> {
            if (contains(externalImports, node)) {
                const statements: Statement[] = [];
                if (moduleKind !== ModuleKind.AMD) {
                    if (node.flags & NodeFlags.Export) {
                        addNode(statements,
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
                        addNode(statements,
                            createVariableStatement(
                                /*modifiers*/ undefined,
                                createVariableDeclarationList([
                                    createVariableDeclaration(
                                        getSynthesizedNode(node.name),
                                        createRequireCall(node),
                                        /*location*/ node
                                    )
                                ])
                            )
                        );
                    }
                }
                else {
                    if (node.flags & NodeFlags.Export) {
                        addNode(statements,
                            createStatement(
                                createExportAssignment(node.name, node.name),
                                /*location*/ node
                            )
                        );
                    }
                }

                addExportImportAssignments(statements, node);
                return createNodeArrayNode(statements);
            }

            return undefined;
        }

        function visitExportDeclaration(node: ExportDeclaration): OneOrMany<Statement> {
            if (contains(externalImports, node)) {
                let generatedName = getGeneratedNameForNode(node);
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

                    return createNodeArrayNode(statements);
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

            return undefined;
        }

        function visitExportAssignment(node: ExportAssignment): OneOrMany<Statement> {
            if (!node.isExportEquals && resolver.isValueAliasDeclaration(node)) {
                const statements: Statement[] = [];
                addExportDefault(statements, node.expression, /*location*/ node);
                return createNodeArrayNode(statements);
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
                            {
                                value: createLiteral(true)
                            }
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
                    addNode(statements,
                        createStatement(
                            createExportAssignment(specifier.name, name),
                            /*location*/ specifier.name
                        )
                    );
                }
            }
        }

        function visitVariableStatement(node: VariableStatement): OneOrMany<Statement> {
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

        function transformInitializedVariable(node: VariableDeclaration): Expression {
            const name = node.name;
            if (isBindingPattern(name)) {
                return flattenVariableDestructuringToExpression(
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

        function getModuleMemberName(name: Identifier) {
            return createPropertyAccess(
                createIdentifier("exports"),
                name,
                /*location*/ name
            );
        }

        function visitFunctionDeclaration(node: FunctionDeclaration): OneOrMany<Statement> {
            const statements: Statement[] = [];
            if (node.name) {
                if (node.flags & NodeFlags.Export) {
                    addNode(statements,
                        createFunctionDeclaration(
                            /*modifiers*/ undefined,
                            /*asteriskToken*/ undefined,
                            node.name,
                            node.parameters,
                            node.body,
                            /*location*/ node
                        )
                    );

                    if (node.flags & NodeFlags.Default) {
                        addExportDefault(statements, getGeneratedNameForNode(node.name), /*location*/ node);
                    }
                }
                else {
                    addNode(statements, node);
                }

                addExportMemberAssignments(statements, node.name);
            }
            else {
                Debug.assert((node.flags & NodeFlags.Default) !== 0);
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
            return createNodeArrayNode(statements);
        }

        function visitClassDeclaration(node: ClassDeclaration): OneOrMany<Statement> {
            const statements: Statement[] = [];
            if (node.name) {
                if (node.flags & NodeFlags.Export) {
                    addNode(statements,
                        createClassDeclaration(
                            /*modifiers*/ undefined,
                            node.name,
                            node.heritageClauses,
                            node.members,
                            /*location*/ node
                        )
                    );

                    if (node.flags & NodeFlags.Default) {
                        addExportDefault(statements, getSynthesizedNode(node.name), /*location*/ node);
                    }
                }
                else {
                    addNode(statements, node);
                }

                addExportMemberAssignments(statements, node.name);
            }
            else {
                Debug.assert((node.flags & NodeFlags.Default) !== 0);
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

            return createNodeArrayNode(statements);
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
                    getSynthesizedNode(node),
                    /*location*/ node
                );
            }

            return node;
        }

        function tryCreateExportEquals(emitAsReturn: boolean) {
            if (exportEquals && resolver.isValueAliasDeclaration(exportEquals)) {
                if (emitAsReturn) {
                    return createReturn(exportEquals.expression);
                }
                else {
                    return createStatement(
                        createAssignment(
                            createPropertyAccess(
                                createIdentifier("module"),
                                "exports"
                            ),
                            exportEquals.expression
                        )
                    );
                }
            }
            return undefined;
        }

        function getExternalModuleNameLiteral(importNode: ImportDeclaration | ExportDeclaration | ImportEqualsDeclaration) {
            const moduleName = getExternalModuleName(importNode);
            if (moduleName.kind === SyntaxKind.StringLiteral) {
                return tryRenameExternalModule(<StringLiteral>moduleName)
                    || getSynthesizedNode(<StringLiteral>moduleName);
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
            return node.kind === SyntaxKind.ImportDeclaration
                && (<ImportDeclaration>node).importClause
                && !!(<ImportDeclaration>node).importClause.name;
        }

        function createRequireCall(importNode: ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration) {
            const moduleName = getExternalModuleNameLiteral(importNode);
            return createCall(
                createIdentifier("require"),
                moduleName ? [moduleName] : []
            );
        }

        function createExportAssignment(name: Identifier, value: Expression) {
            let exports = createIdentifier("exports");
            let exportMember: LeftHandSideExpression;
            if (name.originalKeywordKind && languageVersion === ScriptTarget.ES3) {
                let exportName = createLiteral(name.text);
                exportMember = createElementAccess(exports, exportName);
            }
            else {
                let exportName = getSynthesizedNode(name);
                exportMember = createPropertyAccess(exports, exportName);
            }

            return createAssignment(exportMember, value);
        }
    }
}
