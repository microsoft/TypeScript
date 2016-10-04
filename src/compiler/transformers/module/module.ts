/// <reference path="../../factory.ts" />
/// <reference path="../../visitor.ts" />

/*@internal*/
namespace ts {
    export function transformModule(context: TransformationContext) {
        const transformModuleDelegates = new NumberMap<ModuleKind, (node: SourceFile) => SourceFile>([
            [ModuleKind.None, transformCommonJSModule],
            [ModuleKind.CommonJS, transformCommonJSModule],
            [ModuleKind.AMD, transformAMDModule],
            [ModuleKind.UMD, transformUMDModule],
        ]);

        const {
            startLexicalEnvironment,
            endLexicalEnvironment,
            hoistVariableDeclaration,
        } = context;

        const compilerOptions = context.getCompilerOptions();
        const resolver = context.getEmitResolver();
        const host = context.getEmitHost();
        const languageVersion = getEmitScriptTarget(compilerOptions);
        const moduleKind = getEmitModuleKind(compilerOptions);
        const previousOnSubstituteNode = context.onSubstituteNode;
        const previousOnEmitNode = context.onEmitNode;
        context.onSubstituteNode = onSubstituteNode;
        context.onEmitNode = onEmitNode;
        context.enableSubstitution(SyntaxKind.Identifier);
        context.enableSubstitution(SyntaxKind.BinaryExpression);
        context.enableSubstitution(SyntaxKind.PrefixUnaryExpression);
        context.enableSubstitution(SyntaxKind.PostfixUnaryExpression);
        context.enableSubstitution(SyntaxKind.ShorthandPropertyAssignment);
        context.enableEmitNotification(SyntaxKind.SourceFile);

        let currentSourceFile: SourceFile;
        let externalImports: (ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration)[];
        let exportSpecifiers: Map<string, ExportSpecifier[]>;
        let exportEquals: ExportAssignment;
        let bindingNameExportSpecifiersMap: Map<string, ExportSpecifier[]>;
        // Subset of exportSpecifiers that is a binding-name.
        // This is to reduce amount of memory we have to keep around even after we done with module-transformer
        const bindingNameExportSpecifiersForFileMap = new NumberMap<number, Map<string, ExportSpecifier[]>>();
        let hasExportStarsToExportValues: boolean;

        return transformSourceFile;

        /**
         * Transforms the module aspects of a SourceFile.
         *
         * @param node The SourceFile node.
         */
        function transformSourceFile(node: SourceFile) {
            if (isDeclarationFile(node)) {
                return node;
            }

            if (isExternalModule(node) || compilerOptions.isolatedModules) {
                currentSourceFile = node;

                // Collect information about the external module.
                ({ externalImports, exportSpecifiers, exportEquals, hasExportStarsToExportValues } = collectExternalModuleInfo(node, resolver));

                // Perform the transformation.
                const transformModule = transformModuleDelegates.get(moduleKind) || transformModuleDelegates.get(ModuleKind.None);
                const updated = transformModule(node);
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
            const statementOffset = addPrologueDirectives(statements, node.statements, /*ensureUseStrict*/ !compilerOptions.noImplicitUseStrict, visitor);
            addRange(statements, visitNodes(node.statements, visitor, isStatement, statementOffset));
            addRange(statements, endLexicalEnvironment());
            addExportEqualsIfNeeded(statements, /*emitAsReturn*/ false);

            const updated = updateSourceFile(node, statements);
            if (hasExportStarsToExportValues) {
                setEmitFlags(updated, EmitFlags.EmitExportStar | getEmitFlags(node));
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
            setEmitFlags(define, EmitFlags.UMDDefine);
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
                        /*typeArguments*/ undefined,
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
                                /*typeParameters*/ undefined,
                                [
                                    createParameter("require"),
                                    createParameter("exports"),
                                    ...importAliasNames
                                ],
                                /*type*/ undefined,
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
            const statementOffset = addPrologueDirectives(statements, node.statements, /*ensureUseStrict*/ !compilerOptions.noImplicitUseStrict, visitor);

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
                setEmitFlags(body, EmitFlags.EmitExportStar);
            }

            return body;
        }

        function addExportEqualsIfNeeded(statements: Statement[], emitAsReturn: boolean) {
            if (exportEquals && resolver.isValueAliasDeclaration(exportEquals)) {
                if (emitAsReturn) {
                    const statement = createReturn(
                        exportEquals.expression,
                        /*location*/ exportEquals
                    );

                    setEmitFlags(statement, EmitFlags.NoTokenSourceMaps | EmitFlags.NoComments);
                    statements.push(statement);
                }
                else {
                    const statement = createStatement(
                        createAssignment(
                            createPropertyAccess(
                                createIdentifier("module"),
                                "exports"
                            ),
                            exportEquals.expression
                        ),
                        /*location*/ exportEquals
                    );

                    setEmitFlags(statement, EmitFlags.NoComments);
                    statements.push(statement);
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
                                /*type*/ undefined,
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
                                /*type*/ undefined,
                                createRequireCall(node)
                            )
                        );

                        if (namespaceDeclaration && isDefaultImport(node)) {
                            variables.push(
                                createVariableDeclaration(
                                    getSynthesizedClone(namespaceDeclaration.name),
                                    /*type*/ undefined,
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
                                /*type*/ undefined,
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

            // Set emitFlags on the name of the importEqualsDeclaration
            // This is so the printer will not substitute the identifier
            setEmitFlags(node.name, EmitFlags.NoSubstitution);
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
                                    /*type*/ undefined,
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
                                    /*type*/ undefined,
                                    createRequireCall(node)
                                )
                            ]),
                            /*location*/ node
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
                        /*typeArguments*/ undefined,
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

            if (!original.symbol.exports.get("___esModule")) {
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
                            createCall(
                                createPropertyAccess(createIdentifier("Object"), "defineProperty"),
                                /*typeArguments*/ undefined,
                                [
                                    createIdentifier("exports"),
                                    createLiteral("__esModule"),
                                    createObjectLiteral([
                                        createPropertyAssignment("value", createLiteral(true))
                                    ])
                                ]
                            )
                        )
                    );
                }
            }
        }

        function addExportImportAssignments(statements: Statement[], node: ImportEqualsDeclaration | ImportDeclaration) {
            if (isImportEqualsDeclaration(node)) {
                addExportMemberAssignments(statements, node.name);
            }
            else {
                const names = reduceEachChild(node, collectExportMembers, []);
                for (const name of names) {
                    addExportMemberAssignments(statements, name);
                }
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
            const specifiers = !exportEquals && exportSpecifiers && exportSpecifiers.get(name.text);
            if (specifiers) {
                for (const specifier of specifiers) {
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
                    createExportStatement(node.name, setEmitFlags(getSynthesizedClone(node.name), EmitFlags.LocalName), /*location*/ node)
                );
            }
        }

        function visitVariableStatement(node: VariableStatement): VisitResult<Statement> {
            // If the variable is for a generated declaration,
            // we should maintain it and just strip off the 'export' modifier if necessary.
            const originalKind = getOriginalNode(node).kind;
            if (originalKind === SyntaxKind.ModuleDeclaration ||
                originalKind === SyntaxKind.EnumDeclaration ||
                originalKind === SyntaxKind.ClassDeclaration) {

                if (!hasModifier(node, ModifierFlags.Export)) {
                    return node;
                }

                return setOriginalNode(
                    createVariableStatement(
                        /*modifiers*/ undefined,
                        node.declarationList
                    ),
                    node
                );
            }

            const resultStatements: Statement[] = [];

            // If we're exporting these variables, then these just become assignments to 'exports.blah'.
            // We only want to emit assignments for variables with initializers.
            if (hasModifier(node, ModifierFlags.Export)) {
                const variables = getInitializedVariables(node.declarationList);
                if (variables.length > 0) {
                    const inlineAssignments = createStatement(
                        inlineExpressions(
                            map(variables, transformInitializedVariable)
                        ),
                        node
                    );
                    resultStatements.push(inlineAssignments);
                }
            }
            else {
                resultStatements.push(node);
            }

            // While we might not have been exported here, each variable might have been exported
            // later on in an export specifier (e.g. `export {foo as blah, bar}`).
            for (const decl of node.declarationList.declarations) {
                addExportMemberAssignmentsForBindingName(resultStatements, decl.name);
            }

            return resultStatements;
        }

        /**
         * Creates appropriate assignments for each binding identifier that is exported in an export specifier,
         * and inserts it into 'resultStatements'.
         */
        function addExportMemberAssignmentsForBindingName(resultStatements: Statement[], name: BindingName): void {
            if (isBindingPattern(name)) {
                for (const element of name.elements) {
                    if (!isOmittedExpression(element)) {
                        addExportMemberAssignmentsForBindingName(resultStatements, element.name);
                    }
                }
            }
            else {
                const specifiers = !exportEquals && exportSpecifiers && exportSpecifiers.get(name.text);
                if (specifiers) {
                    const sourceFileId = getOriginalNodeId(currentSourceFile);
                    const bindingNameExportSpecifiers = getOrUpdate(bindingNameExportSpecifiersForFileMap, sourceFileId, () => new StringMap());
                    bindingNameExportSpecifiers.set(name.text, specifiers);
                    addExportMemberAssignments(resultStatements, name);
                }
            }
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
                    setOriginalNode(
                        createFunctionDeclaration(
                            /*decorators*/ undefined,
                            /*modifiers*/ undefined,
                            node.asteriskToken,
                            name,
                            /*typeParameters*/ undefined,
                            node.parameters,
                            /*type*/ undefined,
                            node.body,
                            /*location*/ node
                        ),
                        /*original*/ node
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
                    setOriginalNode(
                        createClassDeclaration(
                            /*decorators*/ undefined,
                            /*modifiers*/ undefined,
                            name,
                            /*typeParameters*/ undefined,
                            node.heritageClauses,
                            node.members,
                            /*location*/ node
                        ),
                        /*original*/ node
                    )
                );

                addExportMemberAssignment(statements, node);
            }
            else {
                statements.push(node);
            }

            // Decorators end up creating a series of assignment expressions which overwrite
            // the local binding that we export, so we need to defer from exporting decorated classes
            // until the decoration assignments take place. We do this when visiting expression-statements.
            if (node.name && !(node.decorators && node.decorators.length)) {
                addExportMemberAssignments(statements, node.name);
            }

            return singleOrMany(statements);
        }

        function visitExpressionStatement(node: ExpressionStatement): VisitResult<Statement> {
            const original = getOriginalNode(node);
            const origKind = original.kind;

            if (origKind === SyntaxKind.EnumDeclaration || origKind === SyntaxKind.ModuleDeclaration) {
                return visitExpressionStatementForEnumOrNamespaceDeclaration(node, <EnumDeclaration | ModuleDeclaration>original);
            }
            else if (origKind === SyntaxKind.ClassDeclaration) {
                // The decorated assignment for a class name may need to be transformed.
                const classDecl = original as ClassDeclaration;
                if (classDecl.name) {
                    const statements = [node];
                    addExportMemberAssignments(statements, classDecl.name);
                    return statements;
                }
            }

            return node;
        }

        function visitExpressionStatementForEnumOrNamespaceDeclaration(node: ExpressionStatement, original: EnumDeclaration | ModuleDeclaration): VisitResult<Statement> {
            const statements: Statement[] = [node];

            // Preserve old behavior for enums in which a variable statement is emitted after the body itself.
            if (hasModifier(original, ModifierFlags.Export) &&
                original.kind === SyntaxKind.EnumDeclaration &&
                isFirstDeclarationOfKind(original, SyntaxKind.EnumDeclaration)) {
                addVarForExportedEnumOrNamespaceDeclaration(statements, original);
            }

            addExportMemberAssignments(statements, original.name);

            return statements;
        }

        /**
         * Adds a trailing VariableStatement for an enum or module declaration.
         */
        function addVarForExportedEnumOrNamespaceDeclaration(statements: Statement[], node: EnumDeclaration | ModuleDeclaration) {
            const transformedStatement = createVariableStatement(
                /*modifiers*/ undefined,
                [createVariableDeclaration(
                    getDeclarationName(node),
                        /*type*/ undefined,
                    createPropertyAccess(createIdentifier("exports"), getDeclarationName(node))
                )],
                    /*location*/ node
            );
            setEmitFlags(transformedStatement, EmitFlags.NoComments);
            statements.push(transformedStatement);
        }

        function getDeclarationName(node: DeclarationStatement) {
            return node.name ? getSynthesizedClone(node.name) : getGeneratedNameForNode(node);
        }

        function onEmitNode(emitContext: EmitContext, node: Node, emitCallback: (emitContext: EmitContext, node: Node) => void): void {
            if (node.kind === SyntaxKind.SourceFile) {
                bindingNameExportSpecifiersMap = bindingNameExportSpecifiersForFileMap.get(getOriginalNodeId(node));
                previousOnEmitNode(emitContext, node, emitCallback);
                bindingNameExportSpecifiersMap = undefined;
            }
            else {
                previousOnEmitNode(emitContext, node, emitCallback);
            }
        }

        /**
         * Hooks node substitutions.
         *
         * @param node The node to substitute.
         * @param isExpression A value indicating whether the node is to be used in an expression
         *                     position.
         */
        function onSubstituteNode(emitContext: EmitContext, node: Node) {
            node = previousOnSubstituteNode(emitContext, node);
            if (emitContext === EmitContext.Expression) {
                return substituteExpression(<Expression>node);
            }
            else if (isShorthandPropertyAssignment(node)) {
                return substituteShorthandPropertyAssignment(node);
            }
            return node;
        }

        function substituteShorthandPropertyAssignment(node: ShorthandPropertyAssignment): ObjectLiteralElementLike {
            const name = node.name;
            const exportedOrImportedName = substituteExpressionIdentifier(name);
            if (exportedOrImportedName !== name) {
                // A shorthand property with an assignment initializer is probably part of a
                // destructuring assignment
                if (node.objectAssignmentInitializer) {
                    const initializer = createAssignment(exportedOrImportedName, node.objectAssignmentInitializer);
                    return createPropertyAssignment(name, initializer, /*location*/ node);
                }
                return createPropertyAssignment(name, exportedOrImportedName, /*location*/ node);
            }
            return node;
        }

        function substituteExpression(node: Expression) {
            switch (node.kind) {
                case SyntaxKind.Identifier:
                    return substituteExpressionIdentifier(<Identifier>node);
                case SyntaxKind.BinaryExpression:
                    return substituteBinaryExpression(<BinaryExpression>node);
                case SyntaxKind.PostfixUnaryExpression:
                case SyntaxKind.PrefixUnaryExpression:
                    return substituteUnaryExpression(<PrefixUnaryExpression | PostfixUnaryExpression>node);
            }

            return node;
        }

        function substituteExpressionIdentifier(node: Identifier): Expression {
            return trySubstituteExportedName(node)
                || trySubstituteImportedName(node)
                || node;
        }

        function substituteBinaryExpression(node: BinaryExpression): Expression {
            const left = node.left;
            // If the left-hand-side of the binaryExpression is an identifier and its is export through export Specifier
            if (isIdentifier(left) && isAssignmentOperator(node.operatorToken.kind)) {
                const bindingNameExportSpecifiers = bindingNameExportSpecifiersMap && bindingNameExportSpecifiersMap.get(left.text);
                if (bindingNameExportSpecifiers) {
                    setEmitFlags(node, EmitFlags.NoSubstitution);
                    let nestedExportAssignment: BinaryExpression;
                    for (const specifier of bindingNameExportSpecifiers) {
                        nestedExportAssignment = nestedExportAssignment ?
                            createExportAssignment(specifier.name, nestedExportAssignment) :
                            createExportAssignment(specifier.name, node);
                    }
                    return nestedExportAssignment;
                }
            }
            return node;
        }

        function substituteUnaryExpression(node: PrefixUnaryExpression | PostfixUnaryExpression): Expression {
            // Because how the compiler only parse plusplus and minusminus to be either prefixUnaryExpression or postFixUnaryExpression depended on where they are
            // We don't need to check that the operator has SyntaxKind.plusplus or SyntaxKind.minusminus
            const operator = node.operator;
            const operand = node.operand;
            if (isIdentifier(operand) && bindingNameExportSpecifiersForFileMap) {
                const bindingNameExportSpecifiers = bindingNameExportSpecifiersMap && bindingNameExportSpecifiersMap.get(operand.text);
                if (bindingNameExportSpecifiers) {
                    setEmitFlags(node, EmitFlags.NoSubstitution);
                    let transformedUnaryExpression: BinaryExpression;
                    if (node.kind === SyntaxKind.PostfixUnaryExpression) {
                        transformedUnaryExpression = createBinary(
                            operand,
                            createNode(operator === SyntaxKind.PlusPlusToken ? SyntaxKind.PlusEqualsToken : SyntaxKind.MinusEqualsToken),
                            createLiteral(1),
                            /*location*/ node
                        );
                        // We have to set no substitution flag here to prevent visit the binary expression and substitute it again as we will preform all necessary substitution in here
                        setEmitFlags(transformedUnaryExpression, EmitFlags.NoSubstitution);
                    }
                    let nestedExportAssignment: BinaryExpression;
                    for (const specifier of bindingNameExportSpecifiers) {
                        nestedExportAssignment = nestedExportAssignment ?
                            createExportAssignment(specifier.name, nestedExportAssignment) :
                            createExportAssignment(specifier.name, transformedUnaryExpression || node);
                    }
                    return nestedExportAssignment;
                }
            }
            return node;
        }

        function trySubstituteExportedName(node: Identifier) {
            const emitFlags = getEmitFlags(node);
            if ((emitFlags & EmitFlags.LocalName) === 0) {
                const container = resolver.getReferencedExportContainer(node, (emitFlags & EmitFlags.ExportName) !== 0);
                if (container) {
                    if (container.kind === SyntaxKind.SourceFile) {
                        return createPropertyAccess(
                            createIdentifier("exports"),
                            getSynthesizedClone(node),
                            /*location*/ node
                        );
                    }
                }
            }

            return undefined;
        }

        function trySubstituteImportedName(node: Identifier): Expression {
            if ((getEmitFlags(node) & EmitFlags.LocalName) === 0) {
                const declaration = resolver.getReferencedImportDeclaration(node);
                if (declaration) {
                    if (isImportClause(declaration)) {
                        if (languageVersion >= ScriptTarget.ES5) {
                            return createPropertyAccess(
                                getGeneratedNameForNode(declaration.parent),
                                createIdentifier("default"),
                                /*location*/ node
                            );
                        }
                        else {
                            // TODO: ES3 transform to handle x.default -> x["default"]
                            return createElementAccess(
                                getGeneratedNameForNode(declaration.parent),
                                createLiteral("default"),
                                /*location*/ node
                            );
                        }
                    }
                    else if (isImportSpecifier(declaration)) {
                        const name = declaration.propertyName || declaration.name;
                        if (name.originalKeywordKind === SyntaxKind.DefaultKeyword && languageVersion <= ScriptTarget.ES3) {
                            // TODO: ES3 transform to handle x.default -> x["default"]
                            return createElementAccess(
                                getGeneratedNameForNode(declaration.parent.parent.parent),
                                createLiteral(name.text),
                                /*location*/ node
                            );
                        }
                        else {
                            return createPropertyAccess(
                                getGeneratedNameForNode(declaration.parent.parent.parent),
                                getSynthesizedClone(name),
                                /*location*/ node
                            );
                        }
                    }
                }
            }
            return undefined;
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

            return createCall(createIdentifier("require"), /*typeArguments*/ undefined, args);
        }

        function createExportStatement(name: Identifier, value: Expression, location?: TextRange) {
            const statement = createStatement(createExportAssignment(name, value));
            statement.startsOnNewLine = true;
            if (location) {
                setSourceMapRange(statement, location);
            }

            return statement;
        }

        function createExportAssignment(name: Identifier, value: Expression) {
            return createAssignment(
                name.originalKeywordKind === SyntaxKind.DefaultKeyword && languageVersion === ScriptTarget.ES3
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
                    // Set emitFlags on the name of the classDeclaration
                    // This is so that when printer will not substitute the identifier
                    setEmitFlags(importAliasName, EmitFlags.NoSubstitution);
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
