/*@internal*/
namespace ts {
    export function transformSystemModule(context: TransformationContext) {
        interface DependencyGroup {
            name: StringLiteral;
            externalImports: (ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration)[];
        }

        const {
            factory,
            startLexicalEnvironment,
            endLexicalEnvironment,
            hoistVariableDeclaration
        } = context;

        const compilerOptions = context.getCompilerOptions();
        const resolver = context.getEmitResolver();
        const host = context.getEmitHost();
        const previousOnSubstituteNode = context.onSubstituteNode;
        const previousOnEmitNode = context.onEmitNode;
        context.onSubstituteNode = onSubstituteNode;
        context.onEmitNode = onEmitNode;
        context.enableSubstitution(SyntaxKind.Identifier); // Substitutes expression identifiers for imported symbols.
        context.enableSubstitution(SyntaxKind.ShorthandPropertyAssignment); // Substitutes expression identifiers for imported symbols
        context.enableSubstitution(SyntaxKind.BinaryExpression); // Substitutes assignments to exported symbols.
        context.enableSubstitution(SyntaxKind.PrefixUnaryExpression); // Substitutes updates to exported symbols.
        context.enableSubstitution(SyntaxKind.PostfixUnaryExpression); // Substitutes updates to exported symbols.
        context.enableSubstitution(SyntaxKind.MetaProperty); // Substitutes 'import.meta'
        context.enableEmitNotification(SyntaxKind.SourceFile); // Restore state when substituting nodes in a file.

        const moduleInfoMap: ExternalModuleInfo[] = []; // The ExternalModuleInfo for each file.
        const deferredExports: (Statement[] | undefined)[] = []; // Exports to defer until an EndOfDeclarationMarker is found.
        const exportFunctionsMap: Identifier[] = []; // The export function associated with a source file.
        const noSubstitutionMap: boolean[][] = []; // Set of nodes for which substitution rules should be ignored for each file.
        const contextObjectMap: Identifier[] = []; // The context object associated with a source file.

        let currentSourceFile: SourceFile; // The current file.
        let moduleInfo: ExternalModuleInfo; // ExternalModuleInfo for the current file.
        let exportFunction: Identifier; // The export function for the current file.
        let contextObject: Identifier; // The context object for the current file.
        let hoistedStatements: Statement[] | undefined;
        let enclosingBlockScopedContainer: Node;
        let noSubstitution: boolean[] | undefined; // Set of nodes for which substitution rules should be ignored.

        return chainBundle(context, transformSourceFile);

        /**
         * Transforms the module aspects of a SourceFile.
         *
         * @param node The SourceFile node.
         */
        function transformSourceFile(node: SourceFile) {
            if (node.isDeclarationFile || !(isEffectiveExternalModule(node, compilerOptions) || node.transformFlags & TransformFlags.ContainsDynamicImport)) {
                return node;
            }

            const id = getOriginalNodeId(node);
            currentSourceFile = node;
            enclosingBlockScopedContainer = node;

            // System modules have the following shape:
            //
            //     System.register(['dep-1', ... 'dep-n'], function(exports) {/* module body function */})
            //
            // The parameter 'exports' here is a callback '<T>(name: string, value: T) => T' that
            // is used to publish exported values. 'exports' returns its 'value' argument so in
            // most cases expressions that mutate exported values can be rewritten as:
            //
            //     expr -> exports('name', expr)
            //
            // The only exception in this rule is postfix unary operators,
            // see comment to 'substitutePostfixUnaryExpression' for more details

            // Collect information about the external module and dependency groups.
            moduleInfo = moduleInfoMap[id] = collectExternalModuleInfo(context, node, resolver, compilerOptions);

            // Make sure that the name of the 'exports' function does not conflict with
            // existing identifiers.
            exportFunction = factory.createUniqueName("exports");
            exportFunctionsMap[id] = exportFunction;
            contextObject = contextObjectMap[id] = factory.createUniqueName("context");

            // Add the body of the module.
            const dependencyGroups = collectDependencyGroups(moduleInfo.externalImports);
            const moduleBodyBlock = createSystemModuleBody(node, dependencyGroups);
            const moduleBodyFunction = factory.createFunctionExpression(
                /*modifiers*/ undefined,
                /*asteriskToken*/ undefined,
                /*name*/ undefined,
                /*typeParameters*/ undefined,
                [
                    factory.createParameterDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined, /*dotDotDotToken*/ undefined, exportFunction),
                    factory.createParameterDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined, /*dotDotDotToken*/ undefined, contextObject)
                ],
                /*type*/ undefined,
                moduleBodyBlock
            );

            // Write the call to `System.register`
            // Clear the emit-helpers flag for later passes since we'll have already used it in the module body
            // So the helper will be emit at the correct position instead of at the top of the source-file
            const moduleName = tryGetModuleNameFromFile(factory, node, host, compilerOptions);
            const dependencies = factory.createArrayLiteralExpression(map(dependencyGroups, dependencyGroup => dependencyGroup.name));
            const updated = setEmitFlags(
                factory.updateSourceFile(
                    node,
                    setTextRange(
                        factory.createNodeArray([
                            factory.createExpressionStatement(
                                factory.createCallExpression(
                                    factory.createPropertyAccessExpression(factory.createIdentifier("System"), "register"),
                                    /*typeArguments*/ undefined,
                                    moduleName
                                        ? [moduleName, dependencies, moduleBodyFunction]
                                        : [dependencies, moduleBodyFunction]
                                )
                            )
                        ]),
                        node.statements
                    )
                ), EmitFlags.NoTrailingComments);

            if (!outFile(compilerOptions)) {
                moveEmitHelpers(updated, moduleBodyBlock, helper => !helper.scoped);
            }

            if (noSubstitution) {
                noSubstitutionMap[id] = noSubstitution;
                noSubstitution = undefined;
            }

            currentSourceFile = undefined!;
            moduleInfo = undefined!;
            exportFunction = undefined!;
            contextObject = undefined!;
            hoistedStatements = undefined!;
            enclosingBlockScopedContainer = undefined!;
            return updated;
        }

        /**
         * Collects the dependency groups for this files imports.
         *
         * @param externalImports The imports for the file.
         */
        function collectDependencyGroups(externalImports: (ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration)[]) {
            const groupIndices = new Map<string, number>();
            const dependencyGroups: DependencyGroup[] = [];
            for (const externalImport of externalImports) {
                const externalModuleName = getExternalModuleNameLiteral(factory, externalImport, currentSourceFile, host, resolver, compilerOptions);
                if (externalModuleName) {
                    const text = externalModuleName.text;
                    const groupIndex = groupIndices.get(text);
                    if (groupIndex !== undefined) {
                        // deduplicate/group entries in dependency list by the dependency name
                        dependencyGroups[groupIndex].externalImports.push(externalImport);
                    }
                    else {
                        groupIndices.set(text, dependencyGroups.length);
                        dependencyGroups.push({
                            name: externalModuleName,
                            externalImports: [externalImport]
                        });
                    }
                }
            }

            return dependencyGroups;
        }

        /**
         * Adds the statements for the module body function for the source file.
         *
         * @param node The source file for the module.
         * @param dependencyGroups The grouped dependencies of the module.
         */
        function createSystemModuleBody(node: SourceFile, dependencyGroups: DependencyGroup[]) {
            // Shape of the body in system modules:
            //
            //  function (exports) {
            //      <list of local aliases for imports>
            //      <hoisted variable declarations>
            //      <hoisted function declarations>
            //      return {
            //          setters: [
            //              <list of setter function for imports>
            //          ],
            //          execute: function() {
            //              <module statements>
            //          }
            //      }
            //      <temp declarations>
            //  }
            //
            // i.e:
            //
            //   import {x} from 'file1'
            //   var y = 1;
            //   export function foo() { return y + x(); }
            //   console.log(y);
            //
            // Will be transformed to:
            //
            //  function(exports) {
            //      function foo() { return y + file_1.x(); }
            //      exports("foo", foo);
            //      var file_1, y;
            //      return {
            //          setters: [
            //              function(v) { file_1 = v }
            //          ],
            //          execute(): function() {
            //              y = 1;
            //              console.log(y);
            //          }
            //      };
            //  }

            const statements: Statement[] = [];

            // We start a new lexical environment in this function body, but *not* in the
            // body of the execute function. This allows us to emit temporary declarations
            // only in the outer module body and not in the inner one.
            startLexicalEnvironment();

            // Add any prologue directives.
            const ensureUseStrict = getStrictOptionValue(compilerOptions, "alwaysStrict") || (!compilerOptions.noImplicitUseStrict && isExternalModule(currentSourceFile));
            const statementOffset = factory.copyPrologue(node.statements, statements, ensureUseStrict, sourceElementVisitor);

            // var __moduleName = context_1 && context_1.id;
            statements.push(
                factory.createVariableStatement(
                    /*modifiers*/ undefined,
                    factory.createVariableDeclarationList([
                        factory.createVariableDeclaration(
                            "__moduleName",
                            /*exclamationToken*/ undefined,
                            /*type*/ undefined,
                            factory.createLogicalAnd(
                                contextObject,
                                factory.createPropertyAccessExpression(contextObject, "id")
                            )
                        )
                    ])
                )
            );

            // Visit the synthetic external helpers import declaration if present
            visitNode(moduleInfo.externalHelpersImportDeclaration, sourceElementVisitor, isStatement);

            // Visit the statements of the source file, emitting any transformations into
            // the `executeStatements` array. We do this *before* we fill the `setters` array
            // as we both emit transformations as well as aggregate some data used when creating
            // setters. This allows us to reduce the number of times we need to loop through the
            // statements of the source file.
            const executeStatements = visitNodes(node.statements, sourceElementVisitor, isStatement, statementOffset);

            // Emit early exports for function declarations.
            addRange(statements, hoistedStatements);

            // We emit hoisted variables early to align roughly with our previous emit output.
            // Two key differences in this approach are:
            // - Temporary variables will appear at the top rather than at the bottom of the file
            insertStatementsAfterStandardPrologue(statements, endLexicalEnvironment());

            const exportStarFunction = addExportStarIfNeeded(statements)!; // TODO: GH#18217
            const modifiers = node.transformFlags & TransformFlags.ContainsAwait ?
                factory.createModifiersFromModifierFlags(ModifierFlags.Async) :
                undefined;
            const moduleObject = factory.createObjectLiteralExpression([
                factory.createPropertyAssignment("setters",
                    createSettersArray(exportStarFunction, dependencyGroups)
                ),
                factory.createPropertyAssignment("execute",
                    factory.createFunctionExpression(
                        modifiers,
                        /*asteriskToken*/ undefined,
                        /*name*/ undefined,
                        /*typeParameters*/ undefined,
                        /*parameters*/ [],
                        /*type*/ undefined,
                        factory.createBlock(executeStatements, /*multiLine*/ true)
                    )
                )
            ], /*multiLine*/ true);

            statements.push(factory.createReturnStatement(moduleObject));
            return factory.createBlock(statements, /*multiLine*/ true);
        }

        /**
         * Adds an exportStar function to a statement list if it is needed for the file.
         *
         * @param statements A statement list.
         */
        function addExportStarIfNeeded(statements: Statement[]) {
            if (!moduleInfo.hasExportStarsToExportValues) {
                return;
            }

            // when resolving exports local exported entries/indirect exported entries in the module
            // should always win over entries with similar names that were added via star exports
            // to support this we store names of local/indirect exported entries in a set.
            // this set is used to filter names brought by star expors.

            // local names set should only be added if we have anything exported
            if (!moduleInfo.exportedNames && moduleInfo.exportSpecifiers.size === 0) {
                // no exported declarations (export var ...) or export specifiers (export {x})
                // check if we have any non star export declarations.
                let hasExportDeclarationWithExportClause = false;
                for (const externalImport of moduleInfo.externalImports) {
                    if (externalImport.kind === SyntaxKind.ExportDeclaration && externalImport.exportClause) {
                        hasExportDeclarationWithExportClause = true;
                        break;
                    }
                }

                if (!hasExportDeclarationWithExportClause) {
                    // we still need to emit exportStar helper
                    const exportStarFunction = createExportStarFunction(/*localNames*/ undefined);
                    statements.push(exportStarFunction);
                    return exportStarFunction.name;
                }
            }

            const exportedNames: ObjectLiteralElementLike[] = [];
            if (moduleInfo.exportedNames) {
                for (const exportedLocalName of moduleInfo.exportedNames) {
                    if (exportedLocalName.escapedText === "default") {
                        continue;
                    }

                    // write name of exported declaration, i.e 'export var x...'
                    exportedNames.push(
                        factory.createPropertyAssignment(
                            factory.createStringLiteralFromNode(exportedLocalName),
                            factory.createTrue()
                        )
                    );
                }
            }

            const exportedNamesStorageRef = factory.createUniqueName("exportedNames");
            statements.push(
                factory.createVariableStatement(
                    /*modifiers*/ undefined,
                    factory.createVariableDeclarationList([
                        factory.createVariableDeclaration(
                            exportedNamesStorageRef,
                            /*exclamationToken*/ undefined,
                            /*type*/ undefined,
                            factory.createObjectLiteralExpression(exportedNames, /*multiline*/ true)
                        )
                    ])
                )
            );

            const exportStarFunction = createExportStarFunction(exportedNamesStorageRef);
            statements.push(exportStarFunction);
            return exportStarFunction.name;
        }

        /**
         * Creates an exportStar function for the file, with an optional set of excluded local
         * names.
         *
         * @param localNames An optional reference to an object containing a set of excluded local
         * names.
         */
        function createExportStarFunction(localNames: Identifier | undefined) {
            const exportStarFunction = factory.createUniqueName("exportStar");
            const m = factory.createIdentifier("m");
            const n = factory.createIdentifier("n");
            const exports = factory.createIdentifier("exports");
            let condition: Expression = factory.createStrictInequality(n, factory.createStringLiteral("default"));
            if (localNames) {
                condition = factory.createLogicalAnd(
                    condition,
                    factory.createLogicalNot(
                        factory.createCallExpression(
                            factory.createPropertyAccessExpression(localNames, "hasOwnProperty"),
                            /*typeArguments*/ undefined,
                            [n]
                        )
                    )
                );
            }

            return factory.createFunctionDeclaration(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                /*asteriskToken*/ undefined,
                exportStarFunction,
                /*typeParameters*/ undefined,
                [factory.createParameterDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined, /*dotDotDotToken*/ undefined, m)],
                /*type*/ undefined,
                factory.createBlock([
                    factory.createVariableStatement(
                        /*modifiers*/ undefined,
                        factory.createVariableDeclarationList([
                            factory.createVariableDeclaration(
                                exports,
                                /*exclamationToken*/ undefined,
                                /*type*/ undefined,
                                factory.createObjectLiteralExpression([])
                            )
                        ])
                    ),
                    factory.createForInStatement(
                        factory.createVariableDeclarationList([
                            factory.createVariableDeclaration(n)
                        ]),
                        m,
                        factory.createBlock([
                            setEmitFlags(
                                factory.createIfStatement(
                                    condition,
                                    factory.createExpressionStatement(
                                        factory.createAssignment(
                                            factory.createElementAccessExpression(exports, n),
                                            factory.createElementAccessExpression(m, n)
                                        )
                                    )
                                ),
                                EmitFlags.SingleLine
                            )
                        ])
                    ),
                    factory.createExpressionStatement(
                        factory.createCallExpression(
                            exportFunction,
                            /*typeArguments*/ undefined,
                            [exports]
                        )
                    )
                ], /*multiline*/ true)
            );
        }

        /**
         * Creates an array setter callbacks for each dependency group.
         *
         * @param exportStarFunction A reference to an exportStarFunction for the file.
         * @param dependencyGroups An array of grouped dependencies.
         */
        function createSettersArray(exportStarFunction: Identifier, dependencyGroups: DependencyGroup[]) {
            const setters: Expression[] = [];
            for (const group of dependencyGroups) {
                // derive a unique name for parameter from the first named entry in the group
                const localName = forEach(group.externalImports, i => getLocalNameForExternalImport(factory, i, currentSourceFile));
                const parameterName = localName ? factory.getGeneratedNameForNode(localName) : factory.createUniqueName("");
                const statements: Statement[] = [];
                for (const entry of group.externalImports) {
                    const importVariableName = getLocalNameForExternalImport(factory, entry, currentSourceFile)!; // TODO: GH#18217
                    switch (entry.kind) {
                        case SyntaxKind.ImportDeclaration:
                            if (!entry.importClause) {
                                // 'import "..."' case
                                // module is imported only for side-effects, no emit required
                                break;
                            }
                            // falls through

                        case SyntaxKind.ImportEqualsDeclaration:
                            Debug.assert(importVariableName !== undefined);
                            // save import into the local
                            statements.push(
                                factory.createExpressionStatement(
                                    factory.createAssignment(importVariableName, parameterName)
                                )
                            );
                            break;

                        case SyntaxKind.ExportDeclaration:
                            Debug.assert(importVariableName !== undefined);
                            if (entry.exportClause) {
                                if (isNamedExports(entry.exportClause)) {
                                    //  export {a, b as c} from 'foo'
                                    //
                                    // emit as:
                                    //
                                    //  exports_({
                                    //     "a": _["a"],
                                    //     "c": _["b"]
                                    //  });
                                    const properties: PropertyAssignment[] = [];
                                    for (const e of entry.exportClause.elements) {
                                        properties.push(
                                            factory.createPropertyAssignment(
                                                factory.createStringLiteral(idText(e.name)),
                                                factory.createElementAccessExpression(
                                                    parameterName,
                                                    factory.createStringLiteral(idText(e.propertyName || e.name))
                                                )
                                            )
                                        );
                                    }

                                    statements.push(
                                        factory.createExpressionStatement(
                                            factory.createCallExpression(
                                                exportFunction,
                                                /*typeArguments*/ undefined,
                                                [factory.createObjectLiteralExpression(properties, /*multiline*/ true)]
                                            )
                                        )
                                    );
                                }
                                else {
                                    statements.push(
                                        factory.createExpressionStatement(
                                            factory.createCallExpression(
                                                exportFunction,
                                                /*typeArguments*/ undefined,
                                                [
                                                    factory.createStringLiteral(idText(entry.exportClause.name)),
                                                    parameterName
                                                ]
                                            )
                                        )
                                    );
                                }
                            }
                            else {
                                //  export * from 'foo'
                                //
                                // emit as:
                                //
                                //  exportStar(foo_1_1);
                                statements.push(
                                    factory.createExpressionStatement(
                                        factory.createCallExpression(
                                            exportStarFunction,
                                            /*typeArguments*/ undefined,
                                            [parameterName]
                                        )
                                    )
                                );
                            }
                            break;
                    }
                }

                setters.push(
                    factory.createFunctionExpression(
                        /*modifiers*/ undefined,
                        /*asteriskToken*/ undefined,
                        /*name*/ undefined,
                        /*typeParameters*/ undefined,
                        [factory.createParameterDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined, /*dotDotDotToken*/ undefined, parameterName)],
                        /*type*/ undefined,
                        factory.createBlock(statements, /*multiLine*/ true)
                    )
                );
            }

            return factory.createArrayLiteralExpression(setters, /*multiLine*/ true);
        }

        //
        // Top-level Source Element Visitors
        //

        /**
         * Visit source elements at the top-level of a module.
         *
         * @param node The node to visit.
         */
        function sourceElementVisitor(node: Node): VisitResult<Node> {
            switch (node.kind) {
                case SyntaxKind.ImportDeclaration:
                    return visitImportDeclaration(<ImportDeclaration>node);

                case SyntaxKind.ImportEqualsDeclaration:
                    return visitImportEqualsDeclaration(<ImportEqualsDeclaration>node);

                case SyntaxKind.ExportDeclaration:
                    return visitExportDeclaration(<ExportDeclaration>node);

                case SyntaxKind.ExportAssignment:
                    return visitExportAssignment(<ExportAssignment>node);

                default:
                    return nestedElementVisitor(node);
            }
        }

        /**
         * Visits an ImportDeclaration node.
         *
         * @param node The node to visit.
         */
        function visitImportDeclaration(node: ImportDeclaration): VisitResult<Statement> {
            let statements: Statement[] | undefined;
            if (node.importClause) {
                hoistVariableDeclaration(getLocalNameForExternalImport(factory, node, currentSourceFile)!); // TODO: GH#18217
            }

            if (hasAssociatedEndOfDeclarationMarker(node)) {
                // Defer exports until we encounter an EndOfDeclarationMarker node
                const id = getOriginalNodeId(node);
                deferredExports[id] = appendExportsOfImportDeclaration(deferredExports[id], node);
            }
            else {
                statements = appendExportsOfImportDeclaration(statements, node);
            }

            return singleOrMany(statements);
        }

        function visitExportDeclaration(node: ExportDeclaration): VisitResult<Statement> {
            Debug.assertIsDefined(node);
            return undefined;
        }

        /**
         * Visits an ImportEqualsDeclaration node.
         *
         * @param node The node to visit.
         */
        function visitImportEqualsDeclaration(node: ImportEqualsDeclaration): VisitResult<Statement> {
            Debug.assert(isExternalModuleImportEqualsDeclaration(node), "import= for internal module references should be handled in an earlier transformer.");

            let statements: Statement[] | undefined;
            hoistVariableDeclaration(getLocalNameForExternalImport(factory, node, currentSourceFile)!); // TODO: GH#18217

            if (hasAssociatedEndOfDeclarationMarker(node)) {
                // Defer exports until we encounter an EndOfDeclarationMarker node
                const id = getOriginalNodeId(node);
                deferredExports[id] = appendExportsOfImportEqualsDeclaration(deferredExports[id], node);
            }
            else {
                statements = appendExportsOfImportEqualsDeclaration(statements, node);
            }

            return singleOrMany(statements);
        }

        /**
         * Visits an ExportAssignment node.
         *
         * @param node The node to visit.
         */
        function visitExportAssignment(node: ExportAssignment): VisitResult<Statement> {
            if (node.isExportEquals) {
                // Elide `export=` as it is illegal in a SystemJS module.
                return undefined;
            }

            const expression = visitNode(node.expression, destructuringAndImportCallVisitor, isExpression);
            const original = node.original;
            if (original && hasAssociatedEndOfDeclarationMarker(original)) {
                // Defer exports until we encounter an EndOfDeclarationMarker node
                const id = getOriginalNodeId(node);
                deferredExports[id] = appendExportStatement(deferredExports[id], factory.createIdentifier("default"), expression, /*allowComments*/ true);
            }
            else {
                return createExportStatement(factory.createIdentifier("default"), expression, /*allowComments*/ true);
            }
        }

        /**
         * Visits a FunctionDeclaration, hoisting it to the outer module body function.
         *
         * @param node The node to visit.
         */
        function visitFunctionDeclaration(node: FunctionDeclaration): VisitResult<Statement> {
            if (hasSyntacticModifier(node, ModifierFlags.Export)) {
                hoistedStatements = append(hoistedStatements,
                    factory.updateFunctionDeclaration(
                        node,
                        node.decorators,
                        visitNodes(node.modifiers, modifierVisitor, isModifier),
                        node.asteriskToken,
                        factory.getDeclarationName(node, /*allowComments*/ true, /*allowSourceMaps*/ true),
                        /*typeParameters*/ undefined,
                        visitNodes(node.parameters, destructuringAndImportCallVisitor, isParameterDeclaration),
                        /*type*/ undefined,
                        visitNode(node.body, destructuringAndImportCallVisitor, isBlock)));
            }
            else {
                hoistedStatements = append(hoistedStatements, visitEachChild(node, destructuringAndImportCallVisitor, context));
            }

            if (hasAssociatedEndOfDeclarationMarker(node)) {
                // Defer exports until we encounter an EndOfDeclarationMarker node
                const id = getOriginalNodeId(node);
                deferredExports[id] = appendExportsOfHoistedDeclaration(deferredExports[id], node);
            }
            else {
                hoistedStatements = appendExportsOfHoistedDeclaration(hoistedStatements, node);
            }

            return undefined;
        }

        /**
         * Visits a ClassDeclaration, hoisting its name to the outer module body function.
         *
         * @param node The node to visit.
         */
        function visitClassDeclaration(node: ClassDeclaration): VisitResult<Statement> {
            let statements: Statement[] | undefined;

            // Hoist the name of the class declaration to the outer module body function.
            const name = factory.getLocalName(node);
            hoistVariableDeclaration(name);

            // Rewrite the class declaration into an assignment of a class expression.
            statements = append(statements,
                setTextRange(
                    factory.createExpressionStatement(
                        factory.createAssignment(
                            name,
                            setTextRange(
                                factory.createClassExpression(
                                    visitNodes(node.decorators, destructuringAndImportCallVisitor, isDecorator),
                                    /*modifiers*/ undefined,
                                    node.name,
                                    /*typeParameters*/ undefined,
                                    visitNodes(node.heritageClauses, destructuringAndImportCallVisitor, isHeritageClause),
                                    visitNodes(node.members, destructuringAndImportCallVisitor, isClassElement)
                                ),
                                node
                            )
                        )
                    ),
                    node
                )
            );

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
         * Visits a variable statement, hoisting declared names to the top-level module body.
         * Each declaration is rewritten into an assignment expression.
         *
         * @param node The node to visit.
         */
        function visitVariableStatement(node: VariableStatement): VisitResult<Statement> {
            if (!shouldHoistVariableDeclarationList(node.declarationList)) {
                return visitNode(node, destructuringAndImportCallVisitor, isStatement);
            }

            let expressions: Expression[] | undefined;
            const isExportedDeclaration = hasSyntacticModifier(node, ModifierFlags.Export);
            const isMarkedDeclaration = hasAssociatedEndOfDeclarationMarker(node);
            for (const variable of node.declarationList.declarations) {
                if (variable.initializer) {
                    expressions = append(expressions, transformInitializedVariable(variable, isExportedDeclaration && !isMarkedDeclaration));
                }
                else {
                    hoistBindingElement(variable);
                }
            }

            let statements: Statement[] | undefined;
            if (expressions) {
                statements = append(statements, setTextRange(factory.createExpressionStatement(factory.inlineExpressions(expressions)), node));
            }

            if (isMarkedDeclaration) {
                // Defer exports until we encounter an EndOfDeclarationMarker node
                const id = getOriginalNodeId(node);
                deferredExports[id] = appendExportsOfVariableStatement(deferredExports[id], node, isExportedDeclaration);
            }
            else {
                statements = appendExportsOfVariableStatement(statements, node, /*exportSelf*/ false);
            }

            return singleOrMany(statements);
        }

        /**
         * Hoists the declared names of a VariableDeclaration or BindingElement.
         *
         * @param node The declaration to hoist.
         */
        function hoistBindingElement(node: VariableDeclaration | BindingElement): void {
            if (isBindingPattern(node.name)) {
                for (const element of node.name.elements) {
                    if (!isOmittedExpression(element)) {
                        hoistBindingElement(element);
                    }
                }
            }
            else {
                hoistVariableDeclaration(factory.cloneNode(node.name));
            }
        }

        /**
         * Determines whether a VariableDeclarationList should be hoisted.
         *
         * @param node The node to test.
         */
        function shouldHoistVariableDeclarationList(node: VariableDeclarationList) {
            // hoist only non-block scoped declarations or block scoped declarations parented by source file
            return (getEmitFlags(node) & EmitFlags.NoHoisting) === 0
                && (enclosingBlockScopedContainer.kind === SyntaxKind.SourceFile
                    || (getOriginalNode(node).flags & NodeFlags.BlockScoped) === 0);
        }

        /**
         * Transform an initialized variable declaration into an expression.
         *
         * @param node The node to transform.
         * @param isExportedDeclaration A value indicating whether the variable is exported.
         */
        function transformInitializedVariable(node: VariableDeclaration, isExportedDeclaration: boolean): Expression {
            const createAssignment = isExportedDeclaration ? createExportedVariableAssignment : createNonExportedVariableAssignment;
            return isBindingPattern(node.name)
                ? flattenDestructuringAssignment(
                    node,
                    destructuringAndImportCallVisitor,
                    context,
                    FlattenLevel.All,
                    /*needsValue*/ false,
                    createAssignment
                )
                : node.initializer ? createAssignment(node.name, visitNode(node.initializer, destructuringAndImportCallVisitor, isExpression)) : node.name;
        }

        /**
         * Creates an assignment expression for an exported variable declaration.
         *
         * @param name The name of the variable.
         * @param value The value of the variable's initializer.
         * @param location The source map location for the assignment.
         */
        function createExportedVariableAssignment(name: Identifier, value: Expression, location?: TextRange) {
            return createVariableAssignment(name, value, location, /*isExportedDeclaration*/ true);
        }

        /**
         * Creates an assignment expression for a non-exported variable declaration.
         *
         * @param name The name of the variable.
         * @param value The value of the variable's initializer.
         * @param location The source map location for the assignment.
         */
        function createNonExportedVariableAssignment(name: Identifier, value: Expression, location?: TextRange) {
            return createVariableAssignment(name, value, location, /*isExportedDeclaration*/ false);
        }

        /**
         * Creates an assignment expression for a variable declaration.
         *
         * @param name The name of the variable.
         * @param value The value of the variable's initializer.
         * @param location The source map location for the assignment.
         * @param isExportedDeclaration A value indicating whether the variable is exported.
         */
        function createVariableAssignment(name: Identifier, value: Expression, location: TextRange | undefined, isExportedDeclaration: boolean) {
            hoistVariableDeclaration(factory.cloneNode(name));
            return isExportedDeclaration
                ? createExportExpression(name, preventSubstitution(setTextRange(factory.createAssignment(name, value), location)))
                : preventSubstitution(setTextRange(factory.createAssignment(name, value), location));
        }

        /**
         * Visits a MergeDeclarationMarker used as a placeholder for the beginning of a merged
         * and transformed declaration.
         *
         * @param node The node to visit.
         */
        function visitMergeDeclarationMarker(node: MergeDeclarationMarker): VisitResult<Statement> {
            // For an EnumDeclaration or ModuleDeclaration that merges with a preceeding
            // declaration we do not emit a leading variable declaration. To preserve the
            // begin/end semantics of the declararation and to properly handle exports
            // we wrapped the leading variable declaration in a `MergeDeclarationMarker`.
            //
            // To balance the declaration, we defer the exports of the elided variable
            // statement until we visit this declaration's `EndOfDeclarationMarker`.
            if (hasAssociatedEndOfDeclarationMarker(node) && node.original!.kind === SyntaxKind.VariableStatement) {
                const id = getOriginalNodeId(node);
                const isExportedDeclaration = hasSyntacticModifier(node.original!, ModifierFlags.Export);
                deferredExports[id] = appendExportsOfVariableStatement(deferredExports[id], <VariableStatement>node.original, isExportedDeclaration);
            }

            return node;
        }

        /**
         * Determines whether a node has an associated EndOfDeclarationMarker.
         *
         * @param node The node to test.
         */
        function hasAssociatedEndOfDeclarationMarker(node: Node) {
            return (getEmitFlags(node) & EmitFlags.HasEndOfDeclarationMarker) !== 0;
        }

        /**
         * Visits a DeclarationMarker used as a placeholder for the end of a transformed
         * declaration.
         *
         * @param node The node to visit.
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
            else {
                const original = getOriginalNode(node);
                if (isModuleOrEnumDeclaration(original)) {
                    return append(appendExportsOfDeclaration(statements, original), node);
                }
            }

            return node;
        }

        /**
         * Appends the exports of an ImportDeclaration to a statement list, returning the
         * statement list.
         *
         * @param statements A statement list to which the down-level export statements are to be
         * appended. If `statements` is `undefined`, a new array is allocated if statements are
         * appended.
         * @param decl The declaration whose exports are to be recorded.
         */
        function appendExportsOfImportDeclaration(statements: Statement[] | undefined, decl: ImportDeclaration) {
            if (moduleInfo.exportEquals) {
                return statements;
            }

            const importClause = decl.importClause;
            if (!importClause) {
                return statements;
            }

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

            return statements;
        }

        /**
         * Appends the export of an ImportEqualsDeclaration to a statement list, returning the
         * statement list.
         *
         * @param statements A statement list to which the down-level export statements are to be
         * appended. If `statements` is `undefined`, a new array is allocated if statements are
         * appended.
         * @param decl The declaration whose exports are to be recorded.
         */
        function appendExportsOfImportEqualsDeclaration(statements: Statement[] | undefined, decl: ImportEqualsDeclaration): Statement[] | undefined {
            if (moduleInfo.exportEquals) {
                return statements;
            }

            return appendExportsOfDeclaration(statements, decl);
        }

        /**
         * Appends the exports of a VariableStatement to a statement list, returning the statement
         * list.
         *
         * @param statements A statement list to which the down-level export statements are to be
         * appended. If `statements` is `undefined`, a new array is allocated if statements are
         * appended.
         * @param node The VariableStatement whose exports are to be recorded.
         * @param exportSelf A value indicating whether to also export each VariableDeclaration of
         * `nodes` declaration list.
         */
        function appendExportsOfVariableStatement(statements: Statement[] | undefined, node: VariableStatement, exportSelf: boolean): Statement[] | undefined {
            if (moduleInfo.exportEquals) {
                return statements;
            }

            for (const decl of node.declarationList.declarations) {
                if (decl.initializer || exportSelf) {
                    statements = appendExportsOfBindingElement(statements, decl, exportSelf);
                }
            }

            return statements;
        }

        /**
         * Appends the exports of a VariableDeclaration or BindingElement to a statement list,
         * returning the statement list.
         *
         * @param statements A statement list to which the down-level export statements are to be
         * appended. If `statements` is `undefined`, a new array is allocated if statements are
         * appended.
         * @param decl The declaration whose exports are to be recorded.
         * @param exportSelf A value indicating whether to also export the declaration itself.
         */
        function appendExportsOfBindingElement(statements: Statement[] | undefined, decl: VariableDeclaration | BindingElement, exportSelf: boolean): Statement[] | undefined {
            if (moduleInfo.exportEquals) {
                return statements;
            }

            if (isBindingPattern(decl.name)) {
                for (const element of decl.name.elements) {
                    if (!isOmittedExpression(element)) {
                        statements = appendExportsOfBindingElement(statements, element, exportSelf);
                    }
                }
            }
            else if (!isGeneratedIdentifier(decl.name)) {
                let excludeName: string | undefined;
                if (exportSelf) {
                    statements = appendExportStatement(statements, decl.name, factory.getLocalName(decl));
                    excludeName = idText(decl.name);
                }

                statements = appendExportsOfDeclaration(statements, decl, excludeName);
            }

            return statements;
        }

        /**
         * Appends the exports of a ClassDeclaration or FunctionDeclaration to a statement list,
         * returning the statement list.
         *
         * @param statements A statement list to which the down-level export statements are to be
         * appended. If `statements` is `undefined`, a new array is allocated if statements are
         * appended.
         * @param decl The declaration whose exports are to be recorded.
         */
        function appendExportsOfHoistedDeclaration(statements: Statement[] | undefined, decl: ClassDeclaration | FunctionDeclaration): Statement[] | undefined {
            if (moduleInfo.exportEquals) {
                return statements;
            }

            let excludeName: string | undefined;
            if (hasSyntacticModifier(decl, ModifierFlags.Export)) {
                const exportName = hasSyntacticModifier(decl, ModifierFlags.Default) ? factory.createStringLiteral("default") : decl.name!;
                statements = appendExportStatement(statements, exportName, factory.getLocalName(decl));
                excludeName = getTextOfIdentifierOrLiteral(exportName);
            }

            if (decl.name) {
                statements = appendExportsOfDeclaration(statements, decl, excludeName);
            }

            return statements;
        }

        /**
         * Appends the exports of a declaration to a statement list, returning the statement list.
         *
         * @param statements A statement list to which the down-level export statements are to be
         * appended. If `statements` is `undefined`, a new array is allocated if statements are
         * appended.
         * @param decl The declaration to export.
         * @param excludeName An optional name to exclude from exports.
         */
        function appendExportsOfDeclaration(statements: Statement[] | undefined, decl: Declaration, excludeName?: string): Statement[] | undefined {
            if (moduleInfo.exportEquals) {
                return statements;
            }

            const name = factory.getDeclarationName(decl);
            const exportSpecifiers = moduleInfo.exportSpecifiers.get(idText(name));
            if (exportSpecifiers) {
                for (const exportSpecifier of exportSpecifiers) {
                    if (exportSpecifier.name.escapedText !== excludeName) {
                        statements = appendExportStatement(statements, exportSpecifier.name, name);
                    }
                }
            }
            return statements;
        }

        /**
         * Appends the down-level representation of an export to a statement list, returning the
         * statement list.
         *
         * @param statements A statement list to which the down-level export statements are to be
         * appended. If `statements` is `undefined`, a new array is allocated if statements are
         * appended.
         * @param exportName The name of the export.
         * @param expression The expression to export.
         * @param allowComments Whether to allow comments on the export.
         */
        function appendExportStatement(statements: Statement[] | undefined, exportName: Identifier | StringLiteral, expression: Expression, allowComments?: boolean): Statement[] | undefined {
            statements = append(statements, createExportStatement(exportName, expression, allowComments));
            return statements;
        }

        /**
         * Creates a call to the current file's export function to export a value.
         *
         * @param name The bound name of the export.
         * @param value The exported value.
         * @param allowComments An optional value indicating whether to emit comments for the statement.
         */
        function createExportStatement(name: Identifier | StringLiteral, value: Expression, allowComments?: boolean) {
            const statement = factory.createExpressionStatement(createExportExpression(name, value));
            startOnNewLine(statement);
            if (!allowComments) {
                setEmitFlags(statement, EmitFlags.NoComments);
            }

            return statement;
        }

        /**
         * Creates a call to the current file's export function to export a value.
         *
         * @param name The bound name of the export.
         * @param value The exported value.
         */
        function createExportExpression(name: Identifier | StringLiteral, value: Expression) {
            const exportName = isIdentifier(name) ? factory.createStringLiteralFromNode(name) : name;
            setEmitFlags(value, getEmitFlags(value) | EmitFlags.NoComments);
            return setCommentRange(factory.createCallExpression(exportFunction, /*typeArguments*/ undefined, [exportName, value]), value);
        }

        //
        // Top-Level or Nested Source Element Visitors
        //

        /**
         * Visit nested elements at the top-level of a module.
         *
         * @param node The node to visit.
         */
        function nestedElementVisitor(node: Node): VisitResult<Node> {
            switch (node.kind) {
                case SyntaxKind.VariableStatement:
                    return visitVariableStatement(<VariableStatement>node);

                case SyntaxKind.FunctionDeclaration:
                    return visitFunctionDeclaration(<FunctionDeclaration>node);

                case SyntaxKind.ClassDeclaration:
                    return visitClassDeclaration(<ClassDeclaration>node);

                case SyntaxKind.ForStatement:
                    return visitForStatement(<ForStatement>node);

                case SyntaxKind.ForInStatement:
                    return visitForInStatement(<ForInStatement>node);

                case SyntaxKind.ForOfStatement:
                    return visitForOfStatement(<ForOfStatement>node);

                case SyntaxKind.DoStatement:
                    return visitDoStatement(<DoStatement>node);

                case SyntaxKind.WhileStatement:
                    return visitWhileStatement(<WhileStatement>node);

                case SyntaxKind.LabeledStatement:
                    return visitLabeledStatement(<LabeledStatement>node);

                case SyntaxKind.WithStatement:
                    return visitWithStatement(<WithStatement>node);

                case SyntaxKind.SwitchStatement:
                    return visitSwitchStatement(<SwitchStatement>node);

                case SyntaxKind.CaseBlock:
                    return visitCaseBlock(<CaseBlock>node);

                case SyntaxKind.CaseClause:
                    return visitCaseClause(<CaseClause>node);

                case SyntaxKind.DefaultClause:
                    return visitDefaultClause(<DefaultClause>node);

                case SyntaxKind.TryStatement:
                    return visitTryStatement(<TryStatement>node);

                case SyntaxKind.CatchClause:
                    return visitCatchClause(<CatchClause>node);

                case SyntaxKind.Block:
                    return visitBlock(<Block>node);

                case SyntaxKind.MergeDeclarationMarker:
                    return visitMergeDeclarationMarker(<MergeDeclarationMarker>node);

                case SyntaxKind.EndOfDeclarationMarker:
                    return visitEndOfDeclarationMarker(<EndOfDeclarationMarker>node);

                default:
                    return destructuringAndImportCallVisitor(node);
            }
        }

        /**
         * Visits the body of a ForStatement to hoist declarations.
         *
         * @param node The node to visit.
         */
        function visitForStatement(node: ForStatement): VisitResult<Statement> {
            const savedEnclosingBlockScopedContainer = enclosingBlockScopedContainer;
            enclosingBlockScopedContainer = node;

            node = factory.updateForStatement(
                node,
                node.initializer && visitForInitializer(node.initializer),
                visitNode(node.condition, destructuringAndImportCallVisitor, isExpression),
                visitNode(node.incrementor, destructuringAndImportCallVisitor, isExpression),
                visitNode(node.statement, nestedElementVisitor, isStatement)
            );

            enclosingBlockScopedContainer = savedEnclosingBlockScopedContainer;
            return node;
        }

        /**
         * Visits the body of a ForInStatement to hoist declarations.
         *
         * @param node The node to visit.
         */
        function visitForInStatement(node: ForInStatement): VisitResult<Statement> {
            const savedEnclosingBlockScopedContainer = enclosingBlockScopedContainer;
            enclosingBlockScopedContainer = node;

            node = factory.updateForInStatement(
                node,
                visitForInitializer(node.initializer),
                visitNode(node.expression, destructuringAndImportCallVisitor, isExpression),
                visitNode(node.statement, nestedElementVisitor, isStatement, factory.liftToBlock)
            );

            enclosingBlockScopedContainer = savedEnclosingBlockScopedContainer;
            return node;
        }

        /**
         * Visits the body of a ForOfStatement to hoist declarations.
         *
         * @param node The node to visit.
         */
        function visitForOfStatement(node: ForOfStatement): VisitResult<Statement> {
            const savedEnclosingBlockScopedContainer = enclosingBlockScopedContainer;
            enclosingBlockScopedContainer = node;

            node = factory.updateForOfStatement(
                node,
                node.awaitModifier,
                visitForInitializer(node.initializer),
                visitNode(node.expression, destructuringAndImportCallVisitor, isExpression),
                visitNode(node.statement, nestedElementVisitor, isStatement, factory.liftToBlock)
            );

            enclosingBlockScopedContainer = savedEnclosingBlockScopedContainer;
            return node;
        }

        /**
         * Determines whether to hoist the initializer of a ForStatement, ForInStatement, or
         * ForOfStatement.
         *
         * @param node The node to test.
         */
        function shouldHoistForInitializer(node: ForInitializer): node is VariableDeclarationList {
            return isVariableDeclarationList(node)
                && shouldHoistVariableDeclarationList(node);
        }

        /**
         * Visits the initializer of a ForStatement, ForInStatement, or ForOfStatement
         *
         * @param node The node to visit.
         */
        function visitForInitializer(node: ForInitializer): ForInitializer {
            if (shouldHoistForInitializer(node)) {
                let expressions: Expression[] | undefined;
                for (const variable of node.declarations) {
                    expressions = append(expressions, transformInitializedVariable(variable, /*isExportedDeclaration*/ false));
                    if (!variable.initializer) {
                        hoistBindingElement(variable);
                    }
                }

                return expressions ? factory.inlineExpressions(expressions) : factory.createOmittedExpression();
            }
            else {
                return visitEachChild(node, nestedElementVisitor, context);
            }
        }

        /**
         * Visits the body of a DoStatement to hoist declarations.
         *
         * @param node The node to visit.
         */
        function visitDoStatement(node: DoStatement): VisitResult<Statement> {
            return factory.updateDoStatement(
                node,
                visitNode(node.statement, nestedElementVisitor, isStatement, factory.liftToBlock),
                visitNode(node.expression, destructuringAndImportCallVisitor, isExpression)
            );
        }

        /**
         * Visits the body of a WhileStatement to hoist declarations.
         *
         * @param node The node to visit.
         */
        function visitWhileStatement(node: WhileStatement): VisitResult<Statement> {
            return factory.updateWhileStatement(
                node,
                visitNode(node.expression, destructuringAndImportCallVisitor, isExpression),
                visitNode(node.statement, nestedElementVisitor, isStatement, factory.liftToBlock)
            );
        }

        /**
         * Visits the body of a LabeledStatement to hoist declarations.
         *
         * @param node The node to visit.
         */
        function visitLabeledStatement(node: LabeledStatement): VisitResult<Statement> {
            return factory.updateLabeledStatement(
                node,
                node.label,
                visitNode(node.statement, nestedElementVisitor, isStatement, factory.liftToBlock)
            );
        }

        /**
         * Visits the body of a WithStatement to hoist declarations.
         *
         * @param node The node to visit.
         */
        function visitWithStatement(node: WithStatement): VisitResult<Statement> {
            return factory.updateWithStatement(
                node,
                visitNode(node.expression, destructuringAndImportCallVisitor, isExpression),
                visitNode(node.statement, nestedElementVisitor, isStatement, factory.liftToBlock)
            );
        }

        /**
         * Visits the body of a SwitchStatement to hoist declarations.
         *
         * @param node The node to visit.
         */
        function visitSwitchStatement(node: SwitchStatement): VisitResult<Statement> {
            return factory.updateSwitchStatement(
                node,
                visitNode(node.expression, destructuringAndImportCallVisitor, isExpression),
                visitNode(node.caseBlock, nestedElementVisitor, isCaseBlock)
            );
        }

        /**
         * Visits the body of a CaseBlock to hoist declarations.
         *
         * @param node The node to visit.
         */
        function visitCaseBlock(node: CaseBlock): CaseBlock {
            const savedEnclosingBlockScopedContainer = enclosingBlockScopedContainer;
            enclosingBlockScopedContainer = node;

            node = factory.updateCaseBlock(
                node,
                visitNodes(node.clauses, nestedElementVisitor, isCaseOrDefaultClause)
            );

            enclosingBlockScopedContainer = savedEnclosingBlockScopedContainer;
            return node;
        }

        /**
         * Visits the body of a CaseClause to hoist declarations.
         *
         * @param node The node to visit.
         */
        function visitCaseClause(node: CaseClause): VisitResult<CaseOrDefaultClause> {
            return factory.updateCaseClause(
                node,
                visitNode(node.expression, destructuringAndImportCallVisitor, isExpression),
                visitNodes(node.statements, nestedElementVisitor, isStatement)
            );
        }

        /**
         * Visits the body of a DefaultClause to hoist declarations.
         *
         * @param node The node to visit.
         */
        function visitDefaultClause(node: DefaultClause): VisitResult<CaseOrDefaultClause> {
            return visitEachChild(node, nestedElementVisitor, context);
        }

        /**
         * Visits the body of a TryStatement to hoist declarations.
         *
         * @param node The node to visit.
         */
        function visitTryStatement(node: TryStatement): VisitResult<Statement> {
            return visitEachChild(node, nestedElementVisitor, context);
        }

        /**
         * Visits the body of a CatchClause to hoist declarations.
         *
         * @param node The node to visit.
         */
        function visitCatchClause(node: CatchClause): CatchClause {
            const savedEnclosingBlockScopedContainer = enclosingBlockScopedContainer;
            enclosingBlockScopedContainer = node;

            node = factory.updateCatchClause(
                node,
                node.variableDeclaration,
                visitNode(node.block, nestedElementVisitor, isBlock)
            );

            enclosingBlockScopedContainer = savedEnclosingBlockScopedContainer;
            return node;
        }

        /**
         * Visits the body of a Block to hoist declarations.
         *
         * @param node The node to visit.
         */
        function visitBlock(node: Block): Block {
            const savedEnclosingBlockScopedContainer = enclosingBlockScopedContainer;
            enclosingBlockScopedContainer = node;

            node = visitEachChild(node, nestedElementVisitor, context);

            enclosingBlockScopedContainer = savedEnclosingBlockScopedContainer;
            return node;
        }

        //
        // Destructuring Assignment Visitors
        //

        /**
         * Visit nodes to flatten destructuring assignments to exported symbols.
         *
         * @param node The node to visit.
         */
        function destructuringAndImportCallVisitor(node: Node): VisitResult<Node> {
            if (isDestructuringAssignment(node)) {
                return visitDestructuringAssignment(node);
            }
            else if (isImportCall(node)) {
                return visitImportCallExpression(node);
            }
            else if ((node.transformFlags & TransformFlags.ContainsDestructuringAssignment) || (node.transformFlags & TransformFlags.ContainsDynamicImport)) {
                return visitEachChild(node, destructuringAndImportCallVisitor, context);
            }
            else {
                return node;
            }
        }

        function visitImportCallExpression(node: ImportCall): Expression {
            // import("./blah")
            // emit as
            // System.register([], function (_export, _context) {
            //     return {
            //         setters: [],
            //         execute: () => {
            //             _context.import('./blah');
            //         }
            //     };
            // });
            return factory.createCallExpression(
                factory.createPropertyAccessExpression(
                    contextObject,
                    factory.createIdentifier("import")
                ),
                /*typeArguments*/ undefined,
                some(node.arguments) ? [visitNode(node.arguments[0], destructuringAndImportCallVisitor)] : []
            );
        }

        /**
         * Visits a DestructuringAssignment to flatten destructuring to exported symbols.
         *
         * @param node The node to visit.
         */
        function visitDestructuringAssignment(node: DestructuringAssignment): VisitResult<Expression> {
            if (hasExportedReferenceInDestructuringTarget(node.left)) {
                return flattenDestructuringAssignment(
                    node,
                    destructuringAndImportCallVisitor,
                    context,
                    FlattenLevel.All,
                    /*needsValue*/ true
                );
            }

            return visitEachChild(node, destructuringAndImportCallVisitor, context);
        }

        /**
         * Determines whether the target of a destructuring assigment refers to an exported symbol.
         *
         * @param node The destructuring target.
         */
        function hasExportedReferenceInDestructuringTarget(node: Expression | ObjectLiteralElementLike): boolean {
            if (isAssignmentExpression(node, /*excludeCompoundAssignment*/ true)) {
                return hasExportedReferenceInDestructuringTarget(node.left);
            }
            else if (isSpreadElement(node)) {
                return hasExportedReferenceInDestructuringTarget(node.expression);
            }
            else if (isObjectLiteralExpression(node)) {
                return some(node.properties, hasExportedReferenceInDestructuringTarget);
            }
            else if (isArrayLiteralExpression(node)) {
                return some(node.elements, hasExportedReferenceInDestructuringTarget);
            }
            else if (isShorthandPropertyAssignment(node)) {
                return hasExportedReferenceInDestructuringTarget(node.name);
            }
            else if (isPropertyAssignment(node)) {
                return hasExportedReferenceInDestructuringTarget(node.initializer);
            }
            else if (isIdentifier(node)) {
                const container = resolver.getReferencedExportContainer(node);
                return container !== undefined && container.kind === SyntaxKind.SourceFile;
            }
            else {
                return false;
            }
        }

        //
        // Modifier Visitors
        //

        /**
         * Visit nodes to elide module-specific modifiers.
         *
         * @param node The node to visit.
         */
        function modifierVisitor(node: Node): VisitResult<Node> {
            switch (node.kind) {
                case SyntaxKind.ExportKeyword:
                case SyntaxKind.DefaultKeyword:
                    return undefined;
            }
            return node;
        }

        //
        // Emit Notification
        //

        /**
         * Hook for node emit notifications.
         *
         * @param hint A hint as to the intended usage of the node.
         * @param node The node to emit.
         * @param emitCallback A callback used to emit the node in the printer.
         */
        function onEmitNode(hint: EmitHint, node: Node, emitCallback: (hint: EmitHint, node: Node) => void): void {
            if (node.kind === SyntaxKind.SourceFile) {
                const id = getOriginalNodeId(node);
                currentSourceFile = <SourceFile>node;
                moduleInfo = moduleInfoMap[id];
                exportFunction = exportFunctionsMap[id];
                noSubstitution = noSubstitutionMap[id];
                contextObject = contextObjectMap[id];

                if (noSubstitution) {
                    delete noSubstitutionMap[id];
                }

                previousOnEmitNode(hint, node, emitCallback);

                currentSourceFile = undefined!;
                moduleInfo = undefined!;
                exportFunction = undefined!;
                contextObject = undefined!;
                noSubstitution = undefined;
            }
            else {
                previousOnEmitNode(hint, node, emitCallback);
            }
        }

        //
        // Substitutions
        //

        /**
         * Hooks node substitutions.
         *
         * @param hint A hint as to the intended usage of the node.
         * @param node The node to substitute.
         */
        function onSubstituteNode(hint: EmitHint, node: Node) {
            node = previousOnSubstituteNode(hint, node);
            if (isSubstitutionPrevented(node)) {
                return node;
            }

            if (hint === EmitHint.Expression) {
                return substituteExpression(<Expression>node);
            }
            else if (hint === EmitHint.Unspecified) {
                return substituteUnspecified(node);
            }

            return node;
        }

        /**
         * Substitute the node, if necessary.
         *
         * @param node The node to substitute.
         */
        function substituteUnspecified(node: Node) {
            switch (node.kind) {
                case SyntaxKind.ShorthandPropertyAssignment:
                    return substituteShorthandPropertyAssignment(<ShorthandPropertyAssignment>node);
            }
            return node;
        }

        /**
         * Substitution for a ShorthandPropertyAssignment whose name that may contain an imported or exported symbol.
         *
         * @param node The node to substitute.
         */
        function substituteShorthandPropertyAssignment(node: ShorthandPropertyAssignment) {
            const name = node.name;
            if (!isGeneratedIdentifier(name) && !isLocalName(name)) {
                const importDeclaration = resolver.getReferencedImportDeclaration(name);
                if (importDeclaration) {
                    if (isImportClause(importDeclaration)) {
                        return setTextRange(
                            factory.createPropertyAssignment(
                                factory.cloneNode(name),
                                factory.createPropertyAccessExpression(
                                    factory.getGeneratedNameForNode(importDeclaration.parent),
                                    factory.createIdentifier("default")
                                )
                            ),
                            /*location*/ node
                        );
                    }
                    else if (isImportSpecifier(importDeclaration)) {
                        return setTextRange(
                            factory.createPropertyAssignment(
                                factory.cloneNode(name),
                                factory.createPropertyAccessExpression(
                                    factory.getGeneratedNameForNode(importDeclaration.parent.parent.parent),
                                    factory.cloneNode(importDeclaration.propertyName || importDeclaration.name)
                                ),
                            ),
                            /*location*/ node
                        );
                    }
                }
            }
            return node;
        }

        /**
         * Substitute the expression, if necessary.
         *
         * @param node The node to substitute.
         */
        function substituteExpression(node: Expression) {
            switch (node.kind) {
                case SyntaxKind.Identifier:
                    return substituteExpressionIdentifier(<Identifier>node);
                case SyntaxKind.BinaryExpression:
                    return substituteBinaryExpression(<BinaryExpression>node);
                case SyntaxKind.PrefixUnaryExpression:
                case SyntaxKind.PostfixUnaryExpression:
                    return substituteUnaryExpression(<PrefixUnaryExpression | PostfixUnaryExpression>node);
                case SyntaxKind.MetaProperty:
                    return substituteMetaProperty(<MetaProperty>node);
            }

            return node;
        }

        /**
         * Substitution for an Identifier expression that may contain an imported or exported symbol.
         *
         * @param node The node to substitute.
         */
        function substituteExpressionIdentifier(node: Identifier): Expression {
            if (getEmitFlags(node) & EmitFlags.HelperName) {
                const externalHelpersModuleName = getExternalHelpersModuleName(currentSourceFile);
                if (externalHelpersModuleName) {
                    return factory.createPropertyAccessExpression(externalHelpersModuleName, node);
                }

                return node;
            }

            // When we see an identifier in an expression position that
            // points to an imported symbol, we should substitute a qualified
            // reference to the imported symbol if one is needed.
            //
            // - We do not substitute generated identifiers for any reason.
            // - We do not substitute identifiers tagged with the LocalName flag.
            if (!isGeneratedIdentifier(node) && !isLocalName(node)) {
                const importDeclaration = resolver.getReferencedImportDeclaration(node);
                if (importDeclaration) {
                    if (isImportClause(importDeclaration)) {
                        return setTextRange(
                            factory.createPropertyAccessExpression(
                                factory.getGeneratedNameForNode(importDeclaration.parent),
                                factory.createIdentifier("default")
                            ),
                            /*location*/ node
                        );
                    }
                    else if (isImportSpecifier(importDeclaration)) {
                        return setTextRange(
                            factory.createPropertyAccessExpression(
                                factory.getGeneratedNameForNode(importDeclaration.parent.parent.parent),
                                factory.cloneNode(importDeclaration.propertyName || importDeclaration.name)
                            ),
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
         * @param node The node to substitute.
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
                const exportedNames = getExports(node.left);
                if (exportedNames) {
                    // For each additional export of the declaration, apply an export assignment.
                    let expression: Expression = node;
                    for (const exportName of exportedNames) {
                        expression = createExportExpression(exportName, preventSubstitution(expression));
                    }

                    return expression;
                }
            }

            return node;
        }

        /**
         * Substitution for a UnaryExpression that may contain an imported or exported symbol.
         *
         * @param node The node to substitute.
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
            if ((node.operator === SyntaxKind.PlusPlusToken || node.operator === SyntaxKind.MinusMinusToken)
                && isIdentifier(node.operand)
                && !isGeneratedIdentifier(node.operand)
                && !isLocalName(node.operand)
                && !isDeclarationNameOfEnumOrNamespace(node.operand)) {
                const exportedNames = getExports(node.operand);
                if (exportedNames) {
                    let expression: Expression = node.kind === SyntaxKind.PostfixUnaryExpression
                        ? setTextRange(
                            factory.createPrefixUnaryExpression(
                                node.operator,
                                node.operand
                            ),
                            node
                        )
                        : node;

                    for (const exportName of exportedNames) {
                        expression = createExportExpression(exportName, preventSubstitution(expression));
                    }

                    if (node.kind === SyntaxKind.PostfixUnaryExpression) {
                        expression = node.operator === SyntaxKind.PlusPlusToken
                            ? factory.createSubtract(preventSubstitution(expression), factory.createNumericLiteral(1))
                            : factory.createAdd(preventSubstitution(expression), factory.createNumericLiteral(1));
                    }

                    return expression;
                }
            }

            return node;
        }

        function substituteMetaProperty(node: MetaProperty) {
            if (isImportMeta(node)) {
                return factory.createPropertyAccessExpression(contextObject, factory.createIdentifier("meta"));
            }
            return node;
        }

        /**
         * Gets the exports of a name.
         *
         * @param name The name.
         */
        function getExports(name: Identifier) {
            let exportedNames: Identifier[] | undefined;
            if (!isGeneratedIdentifier(name)) {
                const valueDeclaration = resolver.getReferencedImportDeclaration(name)
                    || resolver.getReferencedValueDeclaration(name);

                if (valueDeclaration) {
                    const exportContainer = resolver.getReferencedExportContainer(name, /*prefixLocals*/ false);
                    if (exportContainer && exportContainer.kind === SyntaxKind.SourceFile) {
                        exportedNames = append(exportedNames, factory.getDeclarationName(valueDeclaration));
                    }

                    exportedNames = addRange(exportedNames, moduleInfo && moduleInfo.exportedBindings[getOriginalNodeId(valueDeclaration)]);
                }
            }

            return exportedNames;
        }

        /**
         * Prevent substitution of a node for this transformer.
         *
         * @param node The node which should not be substituted.
         */
        function preventSubstitution<T extends Node>(node: T): T {
            if (noSubstitution === undefined) noSubstitution = [];
            noSubstitution[getNodeId(node)] = true;
            return node;
        }

        /**
         * Determines whether a node should not be substituted.
         *
         * @param node The node to test.
         */
        function isSubstitutionPrevented(node: Node) {
            return noSubstitution && node.id && noSubstitution[node.id];
        }
    }
}
