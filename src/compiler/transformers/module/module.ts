/// <reference path="../../factory.ts" />
/// <reference path="../../visitor.ts" />

/*@internal*/
namespace ts {
    export function transformModule(context: TransformationContext) {
        const transformModuleDelegates = createMap<(node: SourceFile) => SourceFile>({
            [ModuleKind.None]: transformCommonJSModule,
            [ModuleKind.CommonJS]: transformCommonJSModule,
            [ModuleKind.AMD]: transformAMDModule,
            [ModuleKind.UMD]: transformUMDModule,
        });

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
        context.enableSubstitution(SyntaxKind.Identifier); // Substitutes expression identifiers with imported/exported symbols.
        context.enableSubstitution(SyntaxKind.BinaryExpression); // Substitutes assignments to exported symbols.
        context.enableSubstitution(SyntaxKind.PrefixUnaryExpression); // Substitutes updates to exported symbols.
        context.enableSubstitution(SyntaxKind.PostfixUnaryExpression); // Substitutes updates to exported symbols.
        context.enableSubstitution(SyntaxKind.ShorthandPropertyAssignment); // Substitutes shorthand property assignments for imported/exported symbols.
        context.enableEmitNotification(SyntaxKind.SourceFile); // Restore state when substituting nodes in a file.

        const moduleInfoMap = createMap<ExternalModuleInfo>(); // The ExternalModuleInfo for each file.
        const deferredExports = createMap<Statement[]>(); // Exports to defer until an EndOfDeclarationMarker is found.

        let currentSourceFile: SourceFile; // The current file.
        let currentModuleInfo: ExternalModuleInfo; // The ExternalModuleInfo for the current file.
        let noSubstitution: Map<boolean>; // Set of nodes for which substitution rules should be ignored.

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
                currentModuleInfo = moduleInfoMap[getOriginalNodeId(node)] = collectExternalModuleInfo(node, resolver);

                // Perform the transformation.
                const transformModule = transformModuleDelegates[moduleKind] || transformModuleDelegates[ModuleKind.None];
                const updated = transformModule(node);
                aggregateTransformFlags(updated);

                currentSourceFile = undefined;
                currentModuleInfo = undefined;
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

            const updated = updateSourceFileNode(node, createNodeArray(statements, node.statements));
            if (currentModuleInfo.hasExportStarsToExportValues) {
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
            return updateSourceFileNode(node, createNodeArray(
                [
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
                                    /*modifiers*/ undefined,
                                    /*asteriskToken*/ undefined,
                                    /*name*/ undefined,
                                    /*typeParameters*/ undefined,
                                    [
                                        createParameter(/*decorators*/ undefined, /*modifiers*/ undefined, /*dotDotDotToken*/ undefined, "require"),
                                        createParameter(/*decorators*/ undefined, /*modifiers*/ undefined, /*dotDotDotToken*/ undefined, "exports"),
                                        ...importAliasNames
                                    ],
                                    /*type*/ undefined,
                                    transformAsynchronousModuleBody(node)
                                )
                            ]
                        )
                    )
                ],
                /*location*/ node.statements)
            );
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
            if (currentModuleInfo.hasExportStarsToExportValues) {
                // If we have any `export * from ...` declarations
                // we need to inform the emitter to add the __export helper.
                setEmitFlags(body, EmitFlags.EmitExportStar);
            }

            return body;
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

                case SyntaxKind.NotEmittedStatement:
                    return visitNotEmittedStatement(<NotEmittedStatement>node);

                case SyntaxKind.EndOfDeclarationMarker:
                    return visitEndOfDeclarationMarker(<EndOfDeclarationMarker>node);

                default:
                    // This visitor does not descend into the tree, as export/import statements
                    // are only transformed at the top level of a file.
                    return node;
            }
        }

        /**
         * Visits a modifier.
         *
         * @param node The modifier.
         */
        function modifierVisitor(node: Node): VisitResult<Node> {
            // Elide module-specific modifiers.
            switch (node.kind) {
                case SyntaxKind.ExportKeyword:
                case SyntaxKind.DefaultKeyword:
                    return undefined;
            }

            return node;
        }

        /**
         * Visits an ImportDeclaration node.
         *
         * @param node The ImportDeclaration node
         */
        function visitImportDeclaration(node: ImportDeclaration): VisitResult<Statement> {
            let statements: Statement[];
            const namespaceDeclaration = getNamespaceDeclarationNode(node);
            if (moduleKind !== ModuleKind.AMD) {
                if (!node.importClause) {
                    // import "mod";
                    return createStatement(createRequireCall(node), /*location*/ node);
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

                    statements = append(statements,
                        createVariableStatement(
                            /*modifiers*/ undefined,
                            createVariableDeclarationList(
                                variables,
                                /*location*/ undefined,
                                languageVersion >= ScriptTarget.ES2015 ? NodeFlags.Const : NodeFlags.None
                            ),
                            /*location*/ node
                        )
                    );
                }
            }
            else if (namespaceDeclaration && isDefaultImport(node)) {
                // import d, * as n from "mod";
                statements = append(statements,
                    createVariableStatement(
                        /*modifiers*/ undefined,
                        createVariableDeclarationList(
                            [
                                createVariableDeclaration(
                                    getSynthesizedClone(namespaceDeclaration.name),
                                    /*type*/ undefined,
                                    getGeneratedNameForNode(node),
                                    /*location*/ node
                                )
                            ],
                            /*location*/ undefined,
                            languageVersion >= ScriptTarget.ES2015 ? NodeFlags.Const : NodeFlags.None
                        )
                    )
                );
            }

            statements = appendExportsOfImportDeclaration(statements, node);
            return singleOrMany(statements);
        }

        /**
         * Visits an ImportEqualsDeclaration node.
         *
         * @param node The ImportEqualsDeclaration node
         */
        function visitImportEqualsDeclaration(node: ImportEqualsDeclaration): VisitResult<Statement> {
            Debug.assert(isExternalModuleImportEqualsDeclaration(node), "import= for internal module references should be handled in an earlier transformer.");

            let statements: Statement[];
            if (moduleKind !== ModuleKind.AMD) {
                if (hasModifier(node, ModifierFlags.Export)) {
                    statements = append(statements,
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
                    statements = append(statements,
                        createVariableStatement(
                            /*modifiers*/ undefined,
                            createVariableDeclarationList(
                                [
                                    createVariableDeclaration(
                                        getSynthesizedClone(node.name),
                                        /*type*/ undefined,
                                        createRequireCall(node)
                                    )
                                ],
                                /*location*/ undefined,
                                /*flags*/ languageVersion >= ScriptTarget.ES2015 ? NodeFlags.Const : NodeFlags.None
                            ),
                            /*location*/ node
                        )
                    );
                }
            }
            else {
                if (hasModifier(node, ModifierFlags.Export)) {
                    statements = append(statements,
                        createStatement(
                            createExportAssignment(getExportName(node), getLocalName(node)),
                            /*location*/ node
                        )
                    );
                }
            }

            if (hasAssociatedEndOfDeclarationMarker(node)) {
                const id = getOriginalNodeId(node);
                deferredExports[id] = appendExportsOfImportEqualsDeclaration(deferredExports[id], node);
            }
            else {
                statements = appendExportsOfImportEqualsDeclaration(statements, node);
            }

            return singleOrMany(statements);
        }

        /**
         * Visits an ExportDeclaration node.
         *
         * @param The ExportDeclaration node
         */
        function visitExportDeclaration(node: ExportDeclaration): VisitResult<Statement> {
            if (!node.moduleSpecifier) {
                // Elide export declarations with no module specifier as they are handled
                // elsewhere.
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
                    const exportedValue = createPropertyAccess(
                        generatedName,
                        specifier.propertyName || specifier.name
                    );
                    statements.push(
                        createStatement(
                            createExportAssignment(getExportName(specifier), exportedValue),
                            /*location*/ specifier
                        )
                    );
                }

                return singleOrMany(statements);
            }
            else {
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

        /**
         * Visits an ExportAssignment node.
         *
         * @param node The ExportAssignment node
         */
        function visitExportAssignment(node: ExportAssignment): VisitResult<Statement> {
            if (node.isExportEquals) {
                return undefined;
            }

            let statements: Statement[];
            const original = node.original;
            if (original && hasAssociatedEndOfDeclarationMarker(original)) {
                // Defer exports until we encounter an EndOfDeclarationMarker node
                const id = getOriginalNodeId(node);
                deferredExports[id] = appendExportStatement(deferredExports[id], createIdentifier("default"), node.expression, /*location*/ node, /*allowComments*/ true);
            }
            else {
                statements = appendExportStatement(statements, createIdentifier("default"), node.expression, /*location*/ node, /*allowComments*/ true);
            }

            return singleOrMany(statements);
        }

        /**
         * Visits a VariableStatement.
         *
         * @param node A VariableStatement node.
         */
        function visitVariableStatement(node: VariableStatement): VisitResult<Statement> {
            let statements: Statement[];
            let variables: VariableDeclaration[];
            let expressions: Expression[];
            if (hasModifier(node, ModifierFlags.Export)) {
                let modifiers: NodeArray<Modifier>;

                // If we're exporting these variables, then these just become assignments to 'exports.x'.
                // We only want to emit assignments for variables with initializers.
                for (const variable of node.declarationList.declarations) {
                    if (isIdentifier(variable.name) && isLocalName(variable.name)) {
                        if (!modifiers) {
                            modifiers = visitNodes(node.modifiers, modifierVisitor, isModifier);
                        }

                        variables = append(variables, variable);
                    }
                    else if (variable.initializer) {
                        expressions = append(expressions, transformInitializedVariable(variable));
                    }
                }

                if (variables) {
                    statements = append(statements, updateVariableStatement(node, modifiers, updateVariableDeclarationList(node.declarationList, variables)));
                }

                if (expressions) {
                    statements = append(statements, createStatement(inlineExpressions(expressions), /*location*/ node));
                }
            }
            else {
                statements = append(statements, node);
            }

            if (hasAssociatedEndOfDeclarationMarker(node)) {
                // Defer exports until we encounter an EndOfDeclarationMarker node
                const id = getOriginalNodeId(node);
                deferredExports[id] = appendExportsOfVariableStatement(deferredExports[id], node);
            }
            else {
                statements = appendExportsOfVariableStatement(statements, node);
            }

            // statements = addExportsOfVariableStatement(statements, node);
            return singleOrMany(statements);
        }

        /**
         * Transforms an exported variable with an initializer into an expression.
         *
         * @param node The variable to transform.
         */
        function transformInitializedVariable(node: VariableDeclaration): Expression {
            const name = node.name;
            if (isBindingPattern(name)) {
                return flattenVariableDestructuringToExpression(
                    context,
                    node,
                    hoistVariableDeclaration,
                    getModuleMemberName
                );
            }
            else {
                return createAssignment(
                    getModuleMemberName(name),
                    node.initializer
                );
            }
        }

        /**
         * Visits a FunctionDeclaration.
         *
         * @param node A FunctionDeclaration node.
         */
        function visitFunctionDeclaration(node: FunctionDeclaration): VisitResult<Statement> {
            let statements: Statement[];
            if (hasModifier(node, ModifierFlags.Export)) {
                statements = append(statements,
                    setOriginalNode(
                        createFunctionDeclaration(
                            /*decorators*/ undefined,
                            visitNodes(node.modifiers, modifierVisitor, isModifier),
                            node.asteriskToken,
                            getDeclarationName(node, /*allowComments*/ true, /*allowSourceMaps*/ true),
                            /*typeParameters*/ undefined,
                            node.parameters,
                            /*type*/ undefined,
                            node.body,
                            /*location*/ node
                        ),
                        /*original*/ node
                    )
                );
            }
            else {
                statements = append(statements, node);
            }

            if (hasAssociatedEndOfDeclarationMarker(node)) {
                // Defer exports until we encounter an EndOfDeclarationMarker node
                const id = getOriginalNodeId(node);
                deferredExports[id] = appendExportsOfHoistedDeclaration(deferredExports[id], node);
            }
            else {
                statements = appendExportsOfHoistedDeclaration(statements, node);
            }

            return singleOrMany(statements);
        }

        /**
         * Visits a ClassDeclaration.
         *
         * @param node A ClassDeclaration node.
         */
        function visitClassDeclaration(node: ClassDeclaration): VisitResult<Statement> {
            let statements: Statement[];
            if (hasModifier(node, ModifierFlags.Export)) {
                statements = append(statements,
                    setOriginalNode(
                        createClassDeclaration(
                            /*decorators*/ undefined,
                            visitNodes(node.modifiers, modifierVisitor, isModifier),
                            getDeclarationName(node, /*allowComments*/ true, /*allowSourceMaps*/ true),
                            /*typeParameters*/ undefined,
                            node.heritageClauses,
                            node.members,
                            /*location*/ node
                        ),
                        /*original*/ node
                    )
                );
            }
            else {
                statements = append(statements, node);
            }

            if (hasAssociatedEndOfDeclarationMarker(node)) {
                // Defer exports until we encounter an EndOfDeclarationMarker node
                const id = getOriginalNodeId(node);
                deferredExports[id] = appendExportsOfHoistedDeclaration(deferredExports[id], node);
            }
            else {
                statements = appendExportsOfHoistedDeclaration(statements, node);
            }

            return singleOrMany(statements);
        }

        /**
         * Visits a NotEmittedStatement.
         *
         * @param node A NotEmittedStatement node.
         */
        function visitNotEmittedStatement(node: NotEmittedStatement): VisitResult<Statement> {
            // For an EnumDeclaration or ModuleDeclaration that merges with a preceeding
            // declaration we do not emit a leading variable declaration. To preserve the
            // begin/end semantics of the declararation and to properly handle exports
            // we wrap the leading variable declaration in a `NotEmittedStatement`.
            //
            // To balance the declaration, add the exports of the elided variable
            // statement.
            if (hasAssociatedEndOfDeclarationMarker(node.original) && node.original.kind === SyntaxKind.VariableStatement) {
                const id = getOriginalNodeId(node);
                deferredExports[id] = appendExportsOfVariableStatement(deferredExports[id], <VariableStatement>node.original);
            }

            return node;
        }

        /**
         * Visits a DeclarationMarker used as a placeholder for the end of a transformed declaration.
         *
         * @param node A DeclarationMarker node.
         */
        function visitEndOfDeclarationMarker(node: EndOfDeclarationMarker): VisitResult<Statement> {
            // For some transformations we emit an `EndOfDeclarationMarker` to mark the actual
            // end of the transformed declaration. We use this marker to emit any deferred exports
            // of the declaration.
            const id = getOriginalNodeId(node);
            const statements = deferredExports[id];
            if (statements) {
                delete deferredExports[id];
                return append(statements, node);
            }

            return node;
        }

        /**
         * Appends the exports of an ImportDeclaration to a statement list, returning the
         * statement list.
         *
         * If `statements` is `undefined`, a new array is allocated if statements are appended.
         *
         * @param statements A statement list to which the down-level export statements are to be
         *  appended.
         * @param decl The declaration whose exports are to be recorded.
         */
        function appendExportsOfImportDeclaration(statements: Statement[] | undefined, decl: ImportDeclaration): Statement[] | undefined {
            if (currentModuleInfo.exportEquals) {
                return statements;
            }

            const importClause = decl.importClause;
            if (importClause) {
                if (importClause.name) {
                    statements = appendExportsOfDeclaration(statements, importClause);
                }

                const namedBindings = importClause.namedBindings;
                if (namedBindings) {
                    switch (namedBindings.kind) {
                        case SyntaxKind.NamespaceImport:
                            statements = appendExportsOfDeclaration(statements, namedBindings);
                            break;

                        case SyntaxKind.NamedImports:
                            for (const importBinding of namedBindings.elements) {
                                statements = appendExportsOfDeclaration(statements, importBinding);
                            }

                            break;
                    }
                }
            }

            return statements;
        }

        /**
         * Appends the exports of an ImportEqualsDeclaration to a statement list, returning the
         * statement list.
         *
         * If `statements` is `undefined`, a new array is allocated if statements are appended.
         *
         * @param statements A statement list to which the down-level export statements are to be
         *  appended.
         * @param decl The declaration whose exports are to be recorded.
         */
        function appendExportsOfImportEqualsDeclaration(statements: Statement[] | undefined, decl: ImportEqualsDeclaration): Statement[] | undefined {
            if (currentModuleInfo.exportEquals) {
                return statements;
            }

            return appendExportsOfDeclaration(statements, decl);
        }

        /**
         * Appends the exports of a VariableStatement to a statement list, returning the statement
         * list.
         *
         * If `statements` is `undefined`, a new array is allocated if statements are appended.
         *
         * @param statements A statement list to which the down-level export statements are to be
         *  appended.
         * @param node The VariableStatement whose exports are to be recorded.
         */
        function appendExportsOfVariableStatement(statements: Statement[] | undefined, node: VariableStatement): Statement[] | undefined {
            if (currentModuleInfo.exportEquals) {
                return statements;
            }

            for (const decl of node.declarationList.declarations) {
                statements = appendExportsOfBindingElement(statements, decl);
            }

            return statements;
        }

        /**
         * Appends the exports of a VariableDeclaration or BindingElement to a statement list,
         * returning the statement list.
         *
         * If `statements` is `undefined`, a new array is allocated if statements are appended.
         *
         * @param statements A statement list to which the down-level export statements are to be
         *  appended.
         * @param decl The declaration whose exports are to be recorded.
         */
        function appendExportsOfBindingElement(statements: Statement[] | undefined, decl: VariableDeclaration | BindingElement): Statement[] | undefined {
            if (currentModuleInfo.exportEquals) {
                return statements;
            }

            if (isBindingPattern(decl.name)) {
                for (const element of decl.name.elements) {
                    if (!isOmittedExpression(element)) {
                        statements = appendExportsOfBindingElement(statements, element);
                    }
                }
            }
            else if (!isGeneratedIdentifier(decl.name)) {
                statements = appendExportsOfDeclaration(statements, decl);
            }

            return statements;
        }

        /**
         * Appends the exports of a ClassDeclaration or FunctionDeclaration to a statement list,
         * returning the statement list.
         *
         * If `statements` is `undefined`, a new array is allocated if statements are appended.
         *
         * @param statements A statement list to which the down-level export statements are to be
         * appended.
         * @param decl The declaration whose exports are to be recorded.
         */
        function appendExportsOfHoistedDeclaration(statements: Statement[] | undefined, decl: ClassDeclaration | FunctionDeclaration): Statement[] | undefined {
            if (currentModuleInfo.exportEquals) {
                return statements;
            }

            if (hasModifier(decl, ModifierFlags.Export)) {
                const exportName = hasModifier(decl, ModifierFlags.Default) ? createIdentifier("default") : decl.name;
                statements = appendExportStatement(statements, exportName, getLocalName(decl), /*location*/ decl);
            }

            if (decl.name) {
                statements = appendExportsOfDeclaration(statements, decl);
            }

            return statements;
        }

        /**
         * Appends the exports of a declaration to a statement list, returning the statement list.
         *
         * If `statements` is `undefined`, a new array is allocated if statements are appended.
         *
         * @param statements A statement list to which the down-level export statements are to be
         *  appended.
         * @param decl The declaration to export.
         */
        function appendExportsOfDeclaration(statements: Statement[] | undefined, decl: Declaration): Statement[] | undefined {
            const name = getDeclarationName(decl);
            const exportSpecifiers = currentModuleInfo.exportSpecifiers[name.text];
            if (exportSpecifiers) {
                for (const exportSpecifier of exportSpecifiers) {
                    statements = appendExportStatement(statements, exportSpecifier.name, name, /*location*/ exportSpecifier.name);
                }
            }
            return statements;
        }

        /**
         * Appends the down-level representation of an export to a statement list, returning the
         * statement list.
         *
         * If `statements` is `undefined`, a new array is allocated if statements are appended.
         *
         * @param statements The statement list to modify.
         * @param exportName The name of the export.
         * @param expression The expression to export.
         * @param location The location to use for source maps and comments for the export.
         * @param allowComments Whether to allow comments on the export.
         */
        function appendExportStatement(statements: Statement[] | undefined, exportName: Identifier, expression: Expression, location?: TextRange, allowComments?: boolean): Statement[] | undefined {
            if (exportName.text === "default") {
                const sourceFile = getOriginalNode(currentSourceFile, isSourceFile);
                if (sourceFile && !sourceFile.symbol.exports["___esModule"]) {
                    if (languageVersion === ScriptTarget.ES3) {
                        statements = append(statements,
                            createStatement(
                                createExportAssignment(
                                    createIdentifier("__esModule"),
                                    createLiteral(true)
                                )
                            )
                        );
                    }
                    else {
                        statements = append(statements,
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

            statements = append(statements, createExportStatement(exportName, expression, location, allowComments));
            return statements;
        }

        /**
         * Adds the down-level representation of `export=` to the statement list if one exists
         * in the source file.
         *
         * @param statements The Statement list to modify.
         * @param emitAsReturn A value indicating whether to emit the `export=` statement as a
         *  return statement.
         */
        function addExportEqualsIfNeeded(statements: Statement[], emitAsReturn: boolean) {
            if (currentModuleInfo.exportEquals) {
                if (emitAsReturn) {
                    const statement = createReturn(
                        currentModuleInfo.exportEquals.expression,
                        /*location*/ currentModuleInfo.exportEquals
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
                            currentModuleInfo.exportEquals.expression
                        ),
                        /*location*/ currentModuleInfo.exportEquals
                    );

                    setEmitFlags(statement, EmitFlags.NoComments);
                    statements.push(statement);
                }
            }
        }

        /**
         * Determines whether a node has an associated EndDeclarationMarker.
         *
         * @param node The node to test.
         */
        function hasAssociatedEndOfDeclarationMarker(node: Node) {
            return (getEmitFlags(node) & EmitFlags.HasEndOfDeclarationMarker) !== 0;
        }

        /**
         * Hook for node emit.
         *
         * @param node The node to emit.
         * @param emitCallback A callback used to emit the node in the printer.
         */
        function onEmitNode(emitContext: EmitContext, node: Node, emitCallback: (emitContext: EmitContext, node: Node) => void): void {
            if (node.kind === SyntaxKind.SourceFile) {
                currentSourceFile = <SourceFile>node;
                currentModuleInfo = moduleInfoMap[getOriginalNodeId(currentSourceFile)];
                noSubstitution = createMap<boolean>();

                previousOnEmitNode(emitContext, node, emitCallback);

                currentSourceFile = undefined;
                currentModuleInfo = undefined;
                noSubstitution = undefined;
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
            if (node.id && noSubstitution[node.id]) {
                return node;
            }

            if (emitContext === EmitContext.Expression) {
                return substituteExpression(<Expression>node);
            }
            else if (isShorthandPropertyAssignment(node)) {
                return substituteShorthandPropertyAssignment(node);
            }

            return node;
        }

        /**
         * Substitution for a ShorthandPropertyAssignment whose declaration name is an imported
         * or exported symbol.
         *
         * @param node A ShorthandPropertyAssignment
         */
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

        /**
         * Substitution for an Expression that may contain an imported or exported symbol.
         *
         * @param node An Expression
         */
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

        /**
         * Substitution for an Identifier expression that may contain an imported or exported symbol.
         *
         * @param node An Identifier expression
         */
        function substituteExpressionIdentifier(node: Identifier): Expression {
            const emitFlags = getEmitFlags(node);
            if ((emitFlags & EmitFlags.LocalName) === 0) {
                const exportContainer = resolver.getReferencedExportContainer(node, (emitFlags & EmitFlags.ExportName) !== 0);
                if (exportContainer && exportContainer.kind === SyntaxKind.SourceFile) {
                    return createPropertyAccess(
                        createIdentifier("exports"),
                        getSynthesizedClone(node),
                        /*location*/ node
                    );
                }

                const importDeclaration = resolver.getReferencedImportDeclaration(node);
                if (importDeclaration) {
                    if (isImportClause(importDeclaration)) {
                        return createPropertyAccess(
                            getGeneratedNameForNode(importDeclaration.parent),
                            createIdentifier("default"),
                            /*location*/ node
                        );
                    }
                    else if (isImportSpecifier(importDeclaration)) {
                        const name = importDeclaration.propertyName || importDeclaration.name;
                        return createPropertyAccess(
                            getGeneratedNameForNode(importDeclaration.parent.parent.parent),
                            getSynthesizedClone(name),
                            /*location*/ node
                        );
                    }
                }
            }
            return node;
        }

        /**
         * Substitution for a BinaryExpression that may contain an imported or exported symbol.
         *
         * @param node A BinaryExpression
         */
        function substituteBinaryExpression(node: BinaryExpression): Expression {
            // When we see an assignment expression whose left-hand side is an exported symbol,
            // we should ensure all exports of that symbol are updated with the correct value.
            //
            // - We do not substitute generated identifiers for any reason.
            // - We do not substitute identifiers tagged with the LocalName flag.
            // - We do not substitute identifiers that were originally the name of an enum or
            //   namespace due to how they are transformed in TypeScript.
            // - We only substitute identifiers that are exported at the top level.
            if (isAssignmentOperator(node.operatorToken.kind)
                && isIdentifier(node.left)
                && !isGeneratedIdentifier(node.left)
                && !isLocalName(node.left)
                && !isDeclarationNameOfEnumOrNamespace(node.left)) {
                const exportedNames = getExportsOfName(node.left);
                if (exportedNames) {
                    // Since we will be reusing this node as part of the substitution, we
                    // mark it to prevent triggering this rule again.
                    noSubstitution[getNodeId(node)] = true;

                    let expression: Expression = node;
                    for (const exportName of exportedNames) {
                        expression = createExportAssignment(exportName, expression);

                        // Mark the transformed node to prevent possibly triggering this rule
                        // again.
                        noSubstitution[getNodeId(expression)] = true;
                    }

                    return expression;
                }
            }

            return node;
        }

        /**
         * Substitution for a UnaryExpression that may contain an imported or exported symbol.
         *
         * @param node A UnaryExpression.
         */
        function substituteUnaryExpression(node: PrefixUnaryExpression | PostfixUnaryExpression): Expression {
            // When we see a prefix or postfix increment expression whose operand is an exported
            // symbol, we should ensure all exports of that symbol are updated with the correct
            // value.
            //
            // - We do not substitute generated identifiers for any reason.
            // - We do not substitute identifiers tagged with the LocalName flag.
            // - We do not substitute identifiers that were originally the name of an enum or
            //   namespace due to how they are transformed in TypeScript.
            // - We only substitute identifiers that are exported at the top level.
            if (isIdentifier(node.operand)
                && !isGeneratedIdentifier(node.operand)
                && !isLocalName(node.operand)
                && !isDeclarationNameOfEnumOrNamespace(node.operand)) {
                const exportedNames = getExportsOfName(node.operand);
                if (exportedNames) {
                    let expression = node.kind === SyntaxKind.PostfixUnaryExpression
                        ? createBinary(
                            node.operand,
                            createToken(node.operator === SyntaxKind.PlusPlusToken ? SyntaxKind.PlusEqualsToken : SyntaxKind.MinusEqualsToken),
                            createLiteral(1),
                            /*location*/ node)
                        : node;

                    // Since we will be reusing this node as part of the substitution, we
                    // mark it to prevent triggering this rule again.
                    noSubstitution[getNodeId(expression)] = true;

                    for (const exportName of exportedNames) {
                        expression = createExportAssignment(exportName, expression);
                        // Mark the transformed node to prevent triggering the assignment
                        // expression substitution in `substituteBinaryExpression`.
                        noSubstitution[getNodeId(expression)] = true;
                    }

                    return expression;
                }
            }

            return node;
        }

        /**
         * Gets the exports of a name.
         *
         * @param name The name.
         */
        function getExportsOfName(name: Identifier): Identifier[] | undefined {
            if (!isGeneratedIdentifier(name)) {
                const valueDeclaration = resolver.getReferencedImportDeclaration(name)
                    || resolver.getReferencedValueDeclaration(name);
                if (valueDeclaration) {
                    return currentModuleInfo
                        && currentModuleInfo.exportedBindings[getOriginalNodeId(valueDeclaration)];
                }
            }
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
            if (moduleName) {
                args.push(moduleName);
            }

            return createCall(createIdentifier("require"), /*typeArguments*/ undefined, args);
        }

        function createExportStatement(name: Identifier, value: Expression, location?: TextRange, allowComments?: boolean) {
            const statement = createStatement(createExportAssignment(name, value), location);
            startOnNewLine(statement);
            if (!allowComments) {
                setEmitFlags(statement, EmitFlags.NoComments);
            }

            return statement;
        }

        function createExportAssignment(name: Identifier, value: Expression) {
            return createAssignment(
                createPropertyAccess(
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
                    importAliasNames.push(createParameter(/*decorators*/ undefined, /*modifiers*/ undefined, /*dotDotDotToken*/ undefined, amdDependency.name));
                }
                else {
                    unaliasedModuleNames.push(createLiteral(amdDependency.path));
                }
            }

            for (const importNode of currentModuleInfo.externalImports) {
                // Find the name of the external module
                const externalModuleName = getExternalModuleNameLiteral(importNode, currentSourceFile, host, resolver, compilerOptions);

                // Find the name of the module alias, if there is one
                const importAliasName = getLocalNameForExternalImport(importNode, currentSourceFile);
                if (includeNonAmdDependencies && importAliasName) {
                    // Set emitFlags on the name of the classDeclaration
                    // This is so that when printer will not substitute the identifier
                    setEmitFlags(importAliasName, EmitFlags.NoSubstitution);
                    aliasedModuleNames.push(externalModuleName);
                    importAliasNames.push(createParameter(/*decorators*/ undefined, /*modifiers*/ undefined, /*dotDotDotToken*/ undefined, importAliasName));
                }
                else {
                    unaliasedModuleNames.push(externalModuleName);
                }
            }

            return { aliasedModuleNames, unaliasedModuleNames, importAliasNames };
        }
    }
}
