import * as ts from "../../_namespaces/ts";

/** @internal */
export function transformSystemModule(context: ts.TransformationContext) {
    interface DependencyGroup {
        name: ts.StringLiteral;
        externalImports: (ts.ImportDeclaration | ts.ImportEqualsDeclaration | ts.ExportDeclaration)[];
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
    context.enableSubstitution(ts.SyntaxKind.Identifier); // Substitutes expression identifiers for imported symbols.
    context.enableSubstitution(ts.SyntaxKind.ShorthandPropertyAssignment); // Substitutes expression identifiers for imported symbols
    context.enableSubstitution(ts.SyntaxKind.BinaryExpression); // Substitutes assignments to exported symbols.
    context.enableSubstitution(ts.SyntaxKind.MetaProperty); // Substitutes 'import.meta'
    context.enableEmitNotification(ts.SyntaxKind.SourceFile); // Restore state when substituting nodes in a file.

    const moduleInfoMap: ts.ExternalModuleInfo[] = []; // The ExternalModuleInfo for each file.
    const deferredExports: (ts.Statement[] | undefined)[] = []; // Exports to defer until an EndOfDeclarationMarker is found.
    const exportFunctionsMap: ts.Identifier[] = []; // The export function associated with a source file.
    const noSubstitutionMap: boolean[][] = []; // Set of nodes for which substitution rules should be ignored for each file.
    const contextObjectMap: ts.Identifier[] = []; // The context object associated with a source file.

    let currentSourceFile: ts.SourceFile; // The current file.
    let moduleInfo: ts.ExternalModuleInfo; // ExternalModuleInfo for the current file.
    let exportFunction: ts.Identifier; // The export function for the current file.
    let contextObject: ts.Identifier; // The context object for the current file.
    let hoistedStatements: ts.Statement[] | undefined;
    let enclosingBlockScopedContainer: ts.Node;
    let noSubstitution: boolean[] | undefined; // Set of nodes for which substitution rules should be ignored.

    return ts.chainBundle(context, transformSourceFile);

    /**
     * Transforms the module aspects of a SourceFile.
     *
     * @param node The SourceFile node.
     */
    function transformSourceFile(node: ts.SourceFile) {
        if (node.isDeclarationFile || !(ts.isEffectiveExternalModule(node, compilerOptions) || node.transformFlags & ts.TransformFlags.ContainsDynamicImport)) {
            return node;
        }

        const id = ts.getOriginalNodeId(node);
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
        moduleInfo = moduleInfoMap[id] = ts.collectExternalModuleInfo(context, node, resolver, compilerOptions);

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
                factory.createParameterDeclaration(/*modifiers*/ undefined, /*dotDotDotToken*/ undefined, exportFunction),
                factory.createParameterDeclaration(/*modifiers*/ undefined, /*dotDotDotToken*/ undefined, contextObject)
            ],
            /*type*/ undefined,
            moduleBodyBlock
        );

        // Write the call to `System.register`
        // Clear the emit-helpers flag for later passes since we'll have already used it in the module body
        // So the helper will be emit at the correct position instead of at the top of the source-file
        const moduleName = ts.tryGetModuleNameFromFile(factory, node, host, compilerOptions);
        const dependencies = factory.createArrayLiteralExpression(ts.map(dependencyGroups, dependencyGroup => dependencyGroup.name));
        const updated = ts.setEmitFlags(
            factory.updateSourceFile(
                node,
                ts.setTextRange(
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
            ), ts.EmitFlags.NoTrailingComments);

        if (!ts.outFile(compilerOptions)) {
            ts.moveEmitHelpers(updated, moduleBodyBlock, helper => !helper.scoped);
        }

        if (noSubstitution) {
            noSubstitutionMap[id] = noSubstitution;
            noSubstitution = undefined;
        }

        currentSourceFile = undefined!;
        moduleInfo = undefined!;
        exportFunction = undefined!;
        contextObject = undefined!;
        hoistedStatements = undefined;
        enclosingBlockScopedContainer = undefined!;
        return updated;
    }

    /**
     * Collects the dependency groups for this files imports.
     *
     * @param externalImports The imports for the file.
     */
    function collectDependencyGroups(externalImports: (ts.ImportDeclaration | ts.ImportEqualsDeclaration | ts.ExportDeclaration)[]) {
        const groupIndices = new ts.Map<string, number>();
        const dependencyGroups: DependencyGroup[] = [];
        for (const externalImport of externalImports) {
            const externalModuleName = ts.getExternalModuleNameLiteral(factory, externalImport, currentSourceFile, host, resolver, compilerOptions);
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
    function createSystemModuleBody(node: ts.SourceFile, dependencyGroups: DependencyGroup[]) {
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

        const statements: ts.Statement[] = [];

        // We start a new lexical environment in this function body, but *not* in the
        // body of the execute function. This allows us to emit temporary declarations
        // only in the outer module body and not in the inner one.
        startLexicalEnvironment();

        // Add any prologue directives.
        const ensureUseStrict = ts.getStrictOptionValue(compilerOptions, "alwaysStrict") || (!compilerOptions.noImplicitUseStrict && ts.isExternalModule(currentSourceFile));
        const statementOffset = factory.copyPrologue(node.statements, statements, ensureUseStrict, topLevelVisitor);

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
        ts.visitNode(moduleInfo.externalHelpersImportDeclaration, topLevelVisitor, ts.isStatement);

        // Visit the statements of the source file, emitting any transformations into
        // the `executeStatements` array. We do this *before* we fill the `setters` array
        // as we both emit transformations as well as aggregate some data used when creating
        // setters. This allows us to reduce the number of times we need to loop through the
        // statements of the source file.
        const executeStatements = ts.visitNodes(node.statements, topLevelVisitor, ts.isStatement, statementOffset);

        // Emit early exports for function declarations.
        ts.addRange(statements, hoistedStatements);

        // We emit hoisted variables early to align roughly with our previous emit output.
        // Two key differences in this approach are:
        // - Temporary variables will appear at the top rather than at the bottom of the file
        ts.insertStatementsAfterStandardPrologue(statements, endLexicalEnvironment());

        const exportStarFunction = addExportStarIfNeeded(statements)!; // TODO: GH#18217
        const modifiers = node.transformFlags & ts.TransformFlags.ContainsAwait ?
            factory.createModifiersFromModifierFlags(ts.ModifierFlags.Async) :
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
    function addExportStarIfNeeded(statements: ts.Statement[]) {
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
                if (externalImport.kind === ts.SyntaxKind.ExportDeclaration && externalImport.exportClause) {
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

        const exportedNames: ts.ObjectLiteralElementLike[] = [];
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
    function createExportStarFunction(localNames: ts.Identifier | undefined) {
        const exportStarFunction = factory.createUniqueName("exportStar");
        const m = factory.createIdentifier("m");
        const n = factory.createIdentifier("n");
        const exports = factory.createIdentifier("exports");
        let condition: ts.Expression = factory.createStrictInequality(n, factory.createStringLiteral("default"));
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
            /*modifiers*/ undefined,
            /*asteriskToken*/ undefined,
            exportStarFunction,
            /*typeParameters*/ undefined,
            [factory.createParameterDeclaration(/*modifiers*/ undefined, /*dotDotDotToken*/ undefined, m)],
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
                        ts.setEmitFlags(
                            factory.createIfStatement(
                                condition,
                                factory.createExpressionStatement(
                                    factory.createAssignment(
                                        factory.createElementAccessExpression(exports, n),
                                        factory.createElementAccessExpression(m, n)
                                    )
                                )
                            ),
                            ts.EmitFlags.SingleLine
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
    function createSettersArray(exportStarFunction: ts.Identifier, dependencyGroups: DependencyGroup[]) {
        const setters: ts.Expression[] = [];
        for (const group of dependencyGroups) {
            // derive a unique name for parameter from the first named entry in the group
            const localName = ts.forEach(group.externalImports, i => ts.getLocalNameForExternalImport(factory, i, currentSourceFile));
            const parameterName = localName ? factory.getGeneratedNameForNode(localName) : factory.createUniqueName("");
            const statements: ts.Statement[] = [];
            for (const entry of group.externalImports) {
                const importVariableName = ts.getLocalNameForExternalImport(factory, entry, currentSourceFile)!; // TODO: GH#18217
                switch (entry.kind) {
                    case ts.SyntaxKind.ImportDeclaration:
                        if (!entry.importClause) {
                            // 'import "..."' case
                            // module is imported only for side-effects, no emit required
                            break;
                        }
                        // falls through

                    case ts.SyntaxKind.ImportEqualsDeclaration:
                        ts.Debug.assert(importVariableName !== undefined);
                        // save import into the local
                        statements.push(
                            factory.createExpressionStatement(
                                factory.createAssignment(importVariableName, parameterName)
                            )
                        );
                        if (ts.hasSyntacticModifier(entry, ts.ModifierFlags.Export)) {
                            statements.push(
                                factory.createExpressionStatement(
                                    factory.createCallExpression(
                                        exportFunction,
                                        /*typeArguments*/ undefined,
                                        [
                                            factory.createStringLiteral(ts.idText(importVariableName)),
                                            parameterName,
                                        ]
                                    )
                                )
                            );
                        }
                        break;

                    case ts.SyntaxKind.ExportDeclaration:
                        ts.Debug.assert(importVariableName !== undefined);
                        if (entry.exportClause) {
                            if (ts.isNamedExports(entry.exportClause)) {
                                //  export {a, b as c} from 'foo'
                                //
                                // emit as:
                                //
                                //  exports_({
                                //     "a": _["a"],
                                //     "c": _["b"]
                                //  });
                                const properties: ts.PropertyAssignment[] = [];
                                for (const e of entry.exportClause.elements) {
                                    properties.push(
                                        factory.createPropertyAssignment(
                                            factory.createStringLiteral(ts.idText(e.name)),
                                            factory.createElementAccessExpression(
                                                parameterName,
                                                factory.createStringLiteral(ts.idText(e.propertyName || e.name))
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
                                                factory.createStringLiteral(ts.idText(entry.exportClause.name)),
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
                    [factory.createParameterDeclaration(/*modifiers*/ undefined, /*dotDotDotToken*/ undefined, parameterName)],
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
    function topLevelVisitor(node: ts.Node): ts.VisitResult<ts.Node> {
        switch (node.kind) {
            case ts.SyntaxKind.ImportDeclaration:
                return visitImportDeclaration(node as ts.ImportDeclaration);

            case ts.SyntaxKind.ImportEqualsDeclaration:
                return visitImportEqualsDeclaration(node as ts.ImportEqualsDeclaration);

            case ts.SyntaxKind.ExportDeclaration:
                return visitExportDeclaration(node as ts.ExportDeclaration);

            case ts.SyntaxKind.ExportAssignment:
                return visitExportAssignment(node as ts.ExportAssignment);

            default:
                return topLevelNestedVisitor(node);
        }
    }

    /**
     * Visits an ImportDeclaration node.
     *
     * @param node The node to visit.
     */
    function visitImportDeclaration(node: ts.ImportDeclaration): ts.VisitResult<ts.Statement> {
        let statements: ts.Statement[] | undefined;
        if (node.importClause) {
            hoistVariableDeclaration(ts.getLocalNameForExternalImport(factory, node, currentSourceFile)!); // TODO: GH#18217
        }

        if (hasAssociatedEndOfDeclarationMarker(node)) {
            // Defer exports until we encounter an EndOfDeclarationMarker node
            const id = ts.getOriginalNodeId(node);
            deferredExports[id] = appendExportsOfImportDeclaration(deferredExports[id], node);
        }
        else {
            statements = appendExportsOfImportDeclaration(statements, node);
        }

        return ts.singleOrMany(statements);
    }

    function visitExportDeclaration(node: ts.ExportDeclaration): ts.VisitResult<ts.Statement> {
        ts.Debug.assertIsDefined(node);
        return undefined;
    }

    /**
     * Visits an ImportEqualsDeclaration node.
     *
     * @param node The node to visit.
     */
    function visitImportEqualsDeclaration(node: ts.ImportEqualsDeclaration): ts.VisitResult<ts.Statement> {
        ts.Debug.assert(ts.isExternalModuleImportEqualsDeclaration(node), "import= for internal module references should be handled in an earlier transformer.");

        let statements: ts.Statement[] | undefined;
        hoistVariableDeclaration(ts.getLocalNameForExternalImport(factory, node, currentSourceFile)!); // TODO: GH#18217

        if (hasAssociatedEndOfDeclarationMarker(node)) {
            // Defer exports until we encounter an EndOfDeclarationMarker node
            const id = ts.getOriginalNodeId(node);
            deferredExports[id] = appendExportsOfImportEqualsDeclaration(deferredExports[id], node);
        }
        else {
            statements = appendExportsOfImportEqualsDeclaration(statements, node);
        }

        return ts.singleOrMany(statements);
    }

    /**
     * Visits an ExportAssignment node.
     *
     * @param node The node to visit.
     */
    function visitExportAssignment(node: ts.ExportAssignment): ts.VisitResult<ts.Statement> {
        if (node.isExportEquals) {
            // Elide `export=` as it is illegal in a SystemJS module.
            return undefined;
        }

        const expression = ts.visitNode(node.expression, visitor, ts.isExpression);
        const original = node.original;
        if (original && hasAssociatedEndOfDeclarationMarker(original)) {
            // Defer exports until we encounter an EndOfDeclarationMarker node
            const id = ts.getOriginalNodeId(node);
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
    function visitFunctionDeclaration(node: ts.FunctionDeclaration): ts.VisitResult<ts.Statement> {
        if (ts.hasSyntacticModifier(node, ts.ModifierFlags.Export)) {
            hoistedStatements = ts.append(hoistedStatements,
                factory.updateFunctionDeclaration(
                    node,
                    ts.visitNodes(node.modifiers, modifierVisitor, ts.isModifierLike),
                    node.asteriskToken,
                    factory.getDeclarationName(node, /*allowComments*/ true, /*allowSourceMaps*/ true),
                    /*typeParameters*/ undefined,
                    ts.visitNodes(node.parameters, visitor, ts.isParameterDeclaration),
                    /*type*/ undefined,
                    ts.visitNode(node.body, visitor, ts.isBlock)));
        }
        else {
            hoistedStatements = ts.append(hoistedStatements, ts.visitEachChild(node, visitor, context));
        }

        if (hasAssociatedEndOfDeclarationMarker(node)) {
            // Defer exports until we encounter an EndOfDeclarationMarker node
            const id = ts.getOriginalNodeId(node);
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
    function visitClassDeclaration(node: ts.ClassDeclaration): ts.VisitResult<ts.Statement> {
        let statements: ts.Statement[] | undefined;

        // Hoist the name of the class declaration to the outer module body function.
        const name = factory.getLocalName(node);
        hoistVariableDeclaration(name);

        // Rewrite the class declaration into an assignment of a class expression.
        statements = ts.append(statements,
            ts.setTextRange(
                factory.createExpressionStatement(
                    factory.createAssignment(
                        name,
                        ts.setTextRange(
                            factory.createClassExpression(
                                ts.visitNodes(node.modifiers, modifierVisitor, ts.isModifierLike),
                                node.name,
                                /*typeParameters*/ undefined,
                                ts.visitNodes(node.heritageClauses, visitor, ts.isHeritageClause),
                                ts.visitNodes(node.members, visitor, ts.isClassElement)
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
            const id = ts.getOriginalNodeId(node);
            deferredExports[id] = appendExportsOfHoistedDeclaration(deferredExports[id], node);
        }
        else {
            statements = appendExportsOfHoistedDeclaration(statements, node);
        }

        return ts.singleOrMany(statements);
    }

    /**
     * Visits a variable statement, hoisting declared names to the top-level module body.
     * Each declaration is rewritten into an assignment expression.
     *
     * @param node The node to visit.
     */
    function visitVariableStatement(node: ts.VariableStatement): ts.VisitResult<ts.Statement> {
        if (!shouldHoistVariableDeclarationList(node.declarationList)) {
            return ts.visitNode(node, visitor, ts.isStatement);
        }

        let expressions: ts.Expression[] | undefined;
        const isExportedDeclaration = ts.hasSyntacticModifier(node, ts.ModifierFlags.Export);
        const isMarkedDeclaration = hasAssociatedEndOfDeclarationMarker(node);
        for (const variable of node.declarationList.declarations) {
            if (variable.initializer) {
                expressions = ts.append(expressions, transformInitializedVariable(variable, isExportedDeclaration && !isMarkedDeclaration));
            }
            else {
                hoistBindingElement(variable);
            }
        }

        let statements: ts.Statement[] | undefined;
        if (expressions) {
            statements = ts.append(statements, ts.setTextRange(factory.createExpressionStatement(factory.inlineExpressions(expressions)), node));
        }

        if (isMarkedDeclaration) {
            // Defer exports until we encounter an EndOfDeclarationMarker node
            const id = ts.getOriginalNodeId(node);
            deferredExports[id] = appendExportsOfVariableStatement(deferredExports[id], node, isExportedDeclaration);
        }
        else {
            statements = appendExportsOfVariableStatement(statements, node, /*exportSelf*/ false);
        }

        return ts.singleOrMany(statements);
    }

    /**
     * Hoists the declared names of a VariableDeclaration or BindingElement.
     *
     * @param node The declaration to hoist.
     */
    function hoistBindingElement(node: ts.VariableDeclaration | ts.BindingElement): void {
        if (ts.isBindingPattern(node.name)) {
            for (const element of node.name.elements) {
                if (!ts.isOmittedExpression(element)) {
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
    function shouldHoistVariableDeclarationList(node: ts.VariableDeclarationList) {
        // hoist only non-block scoped declarations or block scoped declarations parented by source file
        return (ts.getEmitFlags(node) & ts.EmitFlags.NoHoisting) === 0
            && (enclosingBlockScopedContainer.kind === ts.SyntaxKind.SourceFile
                || (ts.getOriginalNode(node).flags & ts.NodeFlags.BlockScoped) === 0);
    }

    /**
     * Transform an initialized variable declaration into an expression.
     *
     * @param node The node to transform.
     * @param isExportedDeclaration A value indicating whether the variable is exported.
     */
    function transformInitializedVariable(node: ts.VariableDeclaration, isExportedDeclaration: boolean): ts.Expression {
        const createAssignment = isExportedDeclaration ? createExportedVariableAssignment : createNonExportedVariableAssignment;
        return ts.isBindingPattern(node.name)
            ? ts.flattenDestructuringAssignment(
                node,
                visitor,
                context,
                ts.FlattenLevel.All,
                /*needsValue*/ false,
                createAssignment
            )
            : node.initializer ? createAssignment(node.name, ts.visitNode(node.initializer, visitor, ts.isExpression)) : node.name;
    }

    /**
     * Creates an assignment expression for an exported variable declaration.
     *
     * @param name The name of the variable.
     * @param value The value of the variable's initializer.
     * @param location The source map location for the assignment.
     */
    function createExportedVariableAssignment(name: ts.Identifier, value: ts.Expression, location?: ts.TextRange) {
        return createVariableAssignment(name, value, location, /*isExportedDeclaration*/ true);
    }

    /**
     * Creates an assignment expression for a non-exported variable declaration.
     *
     * @param name The name of the variable.
     * @param value The value of the variable's initializer.
     * @param location The source map location for the assignment.
     */
    function createNonExportedVariableAssignment(name: ts.Identifier, value: ts.Expression, location?: ts.TextRange) {
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
    function createVariableAssignment(name: ts.Identifier, value: ts.Expression, location: ts.TextRange | undefined, isExportedDeclaration: boolean) {
        hoistVariableDeclaration(factory.cloneNode(name));
        return isExportedDeclaration
            ? createExportExpression(name, preventSubstitution(ts.setTextRange(factory.createAssignment(name, value), location)))
            : preventSubstitution(ts.setTextRange(factory.createAssignment(name, value), location));
    }

    /**
     * Visits a MergeDeclarationMarker used as a placeholder for the beginning of a merged
     * and transformed declaration.
     *
     * @param node The node to visit.
     */
    function visitMergeDeclarationMarker(node: ts.MergeDeclarationMarker): ts.VisitResult<ts.Statement> {
        // For an EnumDeclaration or ModuleDeclaration that merges with a preceeding
        // declaration we do not emit a leading variable declaration. To preserve the
        // begin/end semantics of the declararation and to properly handle exports
        // we wrapped the leading variable declaration in a `MergeDeclarationMarker`.
        //
        // To balance the declaration, we defer the exports of the elided variable
        // statement until we visit this declaration's `EndOfDeclarationMarker`.
        if (hasAssociatedEndOfDeclarationMarker(node) && node.original!.kind === ts.SyntaxKind.VariableStatement) {
            const id = ts.getOriginalNodeId(node);
            const isExportedDeclaration = ts.hasSyntacticModifier(node.original!, ts.ModifierFlags.Export);
            deferredExports[id] = appendExportsOfVariableStatement(deferredExports[id], node.original as ts.VariableStatement, isExportedDeclaration);
        }

        return node;
    }

    /**
     * Determines whether a node has an associated EndOfDeclarationMarker.
     *
     * @param node The node to test.
     */
    function hasAssociatedEndOfDeclarationMarker(node: ts.Node) {
        return (ts.getEmitFlags(node) & ts.EmitFlags.HasEndOfDeclarationMarker) !== 0;
    }

    /**
     * Visits a DeclarationMarker used as a placeholder for the end of a transformed
     * declaration.
     *
     * @param node The node to visit.
     */
    function visitEndOfDeclarationMarker(node: ts.EndOfDeclarationMarker): ts.VisitResult<ts.Statement> {
        // For some transformations we emit an `EndOfDeclarationMarker` to mark the actual
        // end of the transformed declaration. We use this marker to emit any deferred exports
        // of the declaration.
        const id = ts.getOriginalNodeId(node);
        const statements = deferredExports[id];
        if (statements) {
            delete deferredExports[id];
            return ts.append(statements, node);
        }
        else {
            const original = ts.getOriginalNode(node);
            if (ts.isModuleOrEnumDeclaration(original)) {
                return ts.append(appendExportsOfDeclaration(statements, original), node);
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
    function appendExportsOfImportDeclaration(statements: ts.Statement[] | undefined, decl: ts.ImportDeclaration) {
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
                case ts.SyntaxKind.NamespaceImport:
                    statements = appendExportsOfDeclaration(statements, namedBindings);
                    break;

                case ts.SyntaxKind.NamedImports:
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
    function appendExportsOfImportEqualsDeclaration(statements: ts.Statement[] | undefined, decl: ts.ImportEqualsDeclaration): ts.Statement[] | undefined {
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
    function appendExportsOfVariableStatement(statements: ts.Statement[] | undefined, node: ts.VariableStatement, exportSelf: boolean): ts.Statement[] | undefined {
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
    function appendExportsOfBindingElement(statements: ts.Statement[] | undefined, decl: ts.VariableDeclaration | ts.BindingElement, exportSelf: boolean): ts.Statement[] | undefined {
        if (moduleInfo.exportEquals) {
            return statements;
        }

        if (ts.isBindingPattern(decl.name)) {
            for (const element of decl.name.elements) {
                if (!ts.isOmittedExpression(element)) {
                    statements = appendExportsOfBindingElement(statements, element, exportSelf);
                }
            }
        }
        else if (!ts.isGeneratedIdentifier(decl.name)) {
            let excludeName: string | undefined;
            if (exportSelf) {
                statements = appendExportStatement(statements, decl.name, factory.getLocalName(decl));
                excludeName = ts.idText(decl.name);
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
    function appendExportsOfHoistedDeclaration(statements: ts.Statement[] | undefined, decl: ts.ClassDeclaration | ts.FunctionDeclaration): ts.Statement[] | undefined {
        if (moduleInfo.exportEquals) {
            return statements;
        }

        let excludeName: string | undefined;
        if (ts.hasSyntacticModifier(decl, ts.ModifierFlags.Export)) {
            const exportName = ts.hasSyntacticModifier(decl, ts.ModifierFlags.Default) ? factory.createStringLiteral("default") : decl.name!;
            statements = appendExportStatement(statements, exportName, factory.getLocalName(decl));
            excludeName = ts.getTextOfIdentifierOrLiteral(exportName);
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
    function appendExportsOfDeclaration(statements: ts.Statement[] | undefined, decl: ts.Declaration, excludeName?: string): ts.Statement[] | undefined {
        if (moduleInfo.exportEquals) {
            return statements;
        }

        const name = factory.getDeclarationName(decl);
        const exportSpecifiers = moduleInfo.exportSpecifiers.get(ts.idText(name));
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
    function appendExportStatement(statements: ts.Statement[] | undefined, exportName: ts.Identifier | ts.StringLiteral, expression: ts.Expression, allowComments?: boolean): ts.Statement[] | undefined {
        statements = ts.append(statements, createExportStatement(exportName, expression, allowComments));
        return statements;
    }

    /**
     * Creates a call to the current file's export function to export a value.
     *
     * @param name The bound name of the export.
     * @param value The exported value.
     * @param allowComments An optional value indicating whether to emit comments for the statement.
     */
    function createExportStatement(name: ts.Identifier | ts.StringLiteral, value: ts.Expression, allowComments?: boolean) {
        const statement = factory.createExpressionStatement(createExportExpression(name, value));
        ts.startOnNewLine(statement);
        if (!allowComments) {
            ts.setEmitFlags(statement, ts.EmitFlags.NoComments);
        }

        return statement;
    }

    /**
     * Creates a call to the current file's export function to export a value.
     *
     * @param name The bound name of the export.
     * @param value The exported value.
     */
    function createExportExpression(name: ts.Identifier | ts.StringLiteral, value: ts.Expression) {
        const exportName = ts.isIdentifier(name) ? factory.createStringLiteralFromNode(name) : name;
        ts.setEmitFlags(value, ts.getEmitFlags(value) | ts.EmitFlags.NoComments);
        return ts.setCommentRange(factory.createCallExpression(exportFunction, /*typeArguments*/ undefined, [exportName, value]), value);
    }

    //
    // Top-Level or Nested Source Element Visitors
    //

    /**
     * Visit nested elements at the top-level of a module.
     *
     * @param node The node to visit.
     */
    function topLevelNestedVisitor(node: ts.Node): ts.VisitResult<ts.Node> {
        switch (node.kind) {
            case ts.SyntaxKind.VariableStatement:
                return visitVariableStatement(node as ts.VariableStatement);

            case ts.SyntaxKind.FunctionDeclaration:
                return visitFunctionDeclaration(node as ts.FunctionDeclaration);

            case ts.SyntaxKind.ClassDeclaration:
                return visitClassDeclaration(node as ts.ClassDeclaration);

            case ts.SyntaxKind.ForStatement:
                return visitForStatement(node as ts.ForStatement, /*isTopLevel*/ true);

            case ts.SyntaxKind.ForInStatement:
                return visitForInStatement(node as ts.ForInStatement);

            case ts.SyntaxKind.ForOfStatement:
                return visitForOfStatement(node as ts.ForOfStatement);

            case ts.SyntaxKind.DoStatement:
                return visitDoStatement(node as ts.DoStatement);

            case ts.SyntaxKind.WhileStatement:
                return visitWhileStatement(node as ts.WhileStatement);

            case ts.SyntaxKind.LabeledStatement:
                return visitLabeledStatement(node as ts.LabeledStatement);

            case ts.SyntaxKind.WithStatement:
                return visitWithStatement(node as ts.WithStatement);

            case ts.SyntaxKind.SwitchStatement:
                return visitSwitchStatement(node as ts.SwitchStatement);

            case ts.SyntaxKind.CaseBlock:
                return visitCaseBlock(node as ts.CaseBlock);

            case ts.SyntaxKind.CaseClause:
                return visitCaseClause(node as ts.CaseClause);

            case ts.SyntaxKind.DefaultClause:
                return visitDefaultClause(node as ts.DefaultClause);

            case ts.SyntaxKind.TryStatement:
                return visitTryStatement(node as ts.TryStatement);

            case ts.SyntaxKind.CatchClause:
                return visitCatchClause(node as ts.CatchClause);

            case ts.SyntaxKind.Block:
                return visitBlock(node as ts.Block);

            case ts.SyntaxKind.MergeDeclarationMarker:
                return visitMergeDeclarationMarker(node as ts.MergeDeclarationMarker);

            case ts.SyntaxKind.EndOfDeclarationMarker:
                return visitEndOfDeclarationMarker(node as ts.EndOfDeclarationMarker);

            default:
                return visitor(node);
        }
    }

    /**
     * Visits the body of a ForStatement to hoist declarations.
     *
     * @param node The node to visit.
     */
    function visitForStatement(node: ts.ForStatement, isTopLevel: boolean): ts.VisitResult<ts.Statement> {
        const savedEnclosingBlockScopedContainer = enclosingBlockScopedContainer;
        enclosingBlockScopedContainer = node;

        node = factory.updateForStatement(
            node,
            ts.visitNode(node.initializer, isTopLevel ? visitForInitializer : discardedValueVisitor, ts.isForInitializer),
            ts.visitNode(node.condition, visitor, ts.isExpression),
            ts.visitNode(node.incrementor, discardedValueVisitor, ts.isExpression),
            ts.visitIterationBody(node.statement, isTopLevel ? topLevelNestedVisitor : visitor, context)
        );

        enclosingBlockScopedContainer = savedEnclosingBlockScopedContainer;
        return node;
    }

    /**
     * Visits the body of a ForInStatement to hoist declarations.
     *
     * @param node The node to visit.
     */
    function visitForInStatement(node: ts.ForInStatement): ts.VisitResult<ts.Statement> {
        const savedEnclosingBlockScopedContainer = enclosingBlockScopedContainer;
        enclosingBlockScopedContainer = node;

        node = factory.updateForInStatement(
            node,
            visitForInitializer(node.initializer),
            ts.visitNode(node.expression, visitor, ts.isExpression),
            ts.visitIterationBody(node.statement, topLevelNestedVisitor, context)
        );

        enclosingBlockScopedContainer = savedEnclosingBlockScopedContainer;
        return node;
    }

    /**
     * Visits the body of a ForOfStatement to hoist declarations.
     *
     * @param node The node to visit.
     */
    function visitForOfStatement(node: ts.ForOfStatement): ts.VisitResult<ts.Statement> {
        const savedEnclosingBlockScopedContainer = enclosingBlockScopedContainer;
        enclosingBlockScopedContainer = node;

        node = factory.updateForOfStatement(
            node,
            node.awaitModifier,
            visitForInitializer(node.initializer),
            ts.visitNode(node.expression, visitor, ts.isExpression),
            ts.visitIterationBody(node.statement, topLevelNestedVisitor, context)
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
    function shouldHoistForInitializer(node: ts.ForInitializer): node is ts.VariableDeclarationList {
        return ts.isVariableDeclarationList(node)
            && shouldHoistVariableDeclarationList(node);
    }

    /**
     * Visits the initializer of a ForStatement, ForInStatement, or ForOfStatement
     *
     * @param node The node to visit.
     */
    function visitForInitializer(node: ts.ForInitializer): ts.ForInitializer {
        if (shouldHoistForInitializer(node)) {
            let expressions: ts.Expression[] | undefined;
            for (const variable of node.declarations) {
                expressions = ts.append(expressions, transformInitializedVariable(variable, /*isExportedDeclaration*/ false));
                if (!variable.initializer) {
                    hoistBindingElement(variable);
                }
            }

            return expressions ? factory.inlineExpressions(expressions) : factory.createOmittedExpression();
        }
        else {
            return ts.visitNode(node, discardedValueVisitor, ts.isExpression);
        }
    }

    /**
     * Visits the body of a DoStatement to hoist declarations.
     *
     * @param node The node to visit.
     */
    function visitDoStatement(node: ts.DoStatement): ts.VisitResult<ts.Statement> {
        return factory.updateDoStatement(
            node,
            ts.visitIterationBody(node.statement, topLevelNestedVisitor, context),
            ts.visitNode(node.expression, visitor, ts.isExpression)
        );
    }

    /**
     * Visits the body of a WhileStatement to hoist declarations.
     *
     * @param node The node to visit.
     */
    function visitWhileStatement(node: ts.WhileStatement): ts.VisitResult<ts.Statement> {
        return factory.updateWhileStatement(
            node,
            ts.visitNode(node.expression, visitor, ts.isExpression),
            ts.visitIterationBody(node.statement, topLevelNestedVisitor, context)
        );
    }

    /**
     * Visits the body of a LabeledStatement to hoist declarations.
     *
     * @param node The node to visit.
     */
    function visitLabeledStatement(node: ts.LabeledStatement): ts.VisitResult<ts.Statement> {
        return factory.updateLabeledStatement(
            node,
            node.label,
            ts.visitNode(node.statement, topLevelNestedVisitor, ts.isStatement, factory.liftToBlock)
        );
    }

    /**
     * Visits the body of a WithStatement to hoist declarations.
     *
     * @param node The node to visit.
     */
    function visitWithStatement(node: ts.WithStatement): ts.VisitResult<ts.Statement> {
        return factory.updateWithStatement(
            node,
            ts.visitNode(node.expression, visitor, ts.isExpression),
            ts.visitNode(node.statement, topLevelNestedVisitor, ts.isStatement, factory.liftToBlock)
        );
    }

    /**
     * Visits the body of a SwitchStatement to hoist declarations.
     *
     * @param node The node to visit.
     */
    function visitSwitchStatement(node: ts.SwitchStatement): ts.VisitResult<ts.Statement> {
        return factory.updateSwitchStatement(
            node,
            ts.visitNode(node.expression, visitor, ts.isExpression),
            ts.visitNode(node.caseBlock, topLevelNestedVisitor, ts.isCaseBlock)
        );
    }

    /**
     * Visits the body of a CaseBlock to hoist declarations.
     *
     * @param node The node to visit.
     */
    function visitCaseBlock(node: ts.CaseBlock): ts.CaseBlock {
        const savedEnclosingBlockScopedContainer = enclosingBlockScopedContainer;
        enclosingBlockScopedContainer = node;

        node = factory.updateCaseBlock(
            node,
            ts.visitNodes(node.clauses, topLevelNestedVisitor, ts.isCaseOrDefaultClause)
        );

        enclosingBlockScopedContainer = savedEnclosingBlockScopedContainer;
        return node;
    }

    /**
     * Visits the body of a CaseClause to hoist declarations.
     *
     * @param node The node to visit.
     */
    function visitCaseClause(node: ts.CaseClause): ts.VisitResult<ts.CaseOrDefaultClause> {
        return factory.updateCaseClause(
            node,
            ts.visitNode(node.expression, visitor, ts.isExpression),
            ts.visitNodes(node.statements, topLevelNestedVisitor, ts.isStatement)
        );
    }

    /**
     * Visits the body of a DefaultClause to hoist declarations.
     *
     * @param node The node to visit.
     */
    function visitDefaultClause(node: ts.DefaultClause): ts.VisitResult<ts.CaseOrDefaultClause> {
        return ts.visitEachChild(node, topLevelNestedVisitor, context);
    }

    /**
     * Visits the body of a TryStatement to hoist declarations.
     *
     * @param node The node to visit.
     */
    function visitTryStatement(node: ts.TryStatement): ts.VisitResult<ts.Statement> {
        return ts.visitEachChild(node, topLevelNestedVisitor, context);
    }

    /**
     * Visits the body of a CatchClause to hoist declarations.
     *
     * @param node The node to visit.
     */
    function visitCatchClause(node: ts.CatchClause): ts.CatchClause {
        const savedEnclosingBlockScopedContainer = enclosingBlockScopedContainer;
        enclosingBlockScopedContainer = node;

        node = factory.updateCatchClause(
            node,
            node.variableDeclaration,
            ts.visitNode(node.block, topLevelNestedVisitor, ts.isBlock)
        );

        enclosingBlockScopedContainer = savedEnclosingBlockScopedContainer;
        return node;
    }

    /**
     * Visits the body of a Block to hoist declarations.
     *
     * @param node The node to visit.
     */
    function visitBlock(node: ts.Block): ts.Block {
        const savedEnclosingBlockScopedContainer = enclosingBlockScopedContainer;
        enclosingBlockScopedContainer = node;

        node = ts.visitEachChild(node, topLevelNestedVisitor, context);

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
    function visitorWorker(node: ts.Node, valueIsDiscarded: boolean): ts.VisitResult<ts.Node> {
        if (!(node.transformFlags & (ts.TransformFlags.ContainsDestructuringAssignment | ts.TransformFlags.ContainsDynamicImport | ts.TransformFlags.ContainsUpdateExpressionForIdentifier))) {
            return node;
        }
        switch (node.kind) {
            case ts.SyntaxKind.ForStatement:
                return visitForStatement(node as ts.ForStatement, /*isTopLevel*/ false);
            case ts.SyntaxKind.ExpressionStatement:
                return visitExpressionStatement(node as ts.ExpressionStatement);
            case ts.SyntaxKind.ParenthesizedExpression:
                return visitParenthesizedExpression(node as ts.ParenthesizedExpression, valueIsDiscarded);
            case ts.SyntaxKind.PartiallyEmittedExpression:
                return visitPartiallyEmittedExpression(node as ts.PartiallyEmittedExpression, valueIsDiscarded);
            case ts.SyntaxKind.BinaryExpression:
                if (ts.isDestructuringAssignment(node)) {
                    return visitDestructuringAssignment(node, valueIsDiscarded);
                }
                break;
            case ts.SyntaxKind.CallExpression:
                if (ts.isImportCall(node)) {
                    return visitImportCallExpression(node);
                }
                break;
            case ts.SyntaxKind.PrefixUnaryExpression:
            case ts.SyntaxKind.PostfixUnaryExpression:
                return visitPrefixOrPostfixUnaryExpression(node as ts.PrefixUnaryExpression | ts.PostfixUnaryExpression, valueIsDiscarded);
        }
        return ts.visitEachChild(node, visitor, context);
    }

    /**
     * Visit nodes to flatten destructuring assignments to exported symbols.
     *
     * @param node The node to visit.
     */
    function visitor(node: ts.Node): ts.VisitResult<ts.Node> {
        return visitorWorker(node, /*valueIsDiscarded*/ false);
    }

    function discardedValueVisitor(node: ts.Node): ts.VisitResult<ts.Node> {
        return visitorWorker(node, /*valueIsDiscarded*/ true);
    }

    function visitExpressionStatement(node: ts.ExpressionStatement) {
        return factory.updateExpressionStatement(node, ts.visitNode(node.expression, discardedValueVisitor, ts.isExpression));
    }

    function visitParenthesizedExpression(node: ts.ParenthesizedExpression, valueIsDiscarded: boolean) {
        return factory.updateParenthesizedExpression(node, ts.visitNode(node.expression, valueIsDiscarded ? discardedValueVisitor : visitor, ts.isExpression));
    }

    function visitPartiallyEmittedExpression(node: ts.PartiallyEmittedExpression, valueIsDiscarded: boolean) {
        return factory.updatePartiallyEmittedExpression(node, ts.visitNode(node.expression, valueIsDiscarded ? discardedValueVisitor : visitor, ts.isExpression));
    }

    function visitImportCallExpression(node: ts.ImportCall): ts.Expression {
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
        const externalModuleName = ts.getExternalModuleNameLiteral(factory, node, currentSourceFile, host, resolver, compilerOptions);
        const firstArgument = ts.visitNode(ts.firstOrUndefined(node.arguments), visitor);
        // Only use the external module name if it differs from the first argument. This allows us to preserve the quote style of the argument on output.
        const argument = externalModuleName && (!firstArgument || !ts.isStringLiteral(firstArgument) || firstArgument.text !== externalModuleName.text) ? externalModuleName : firstArgument;
        return factory.createCallExpression(
            factory.createPropertyAccessExpression(
                contextObject,
                factory.createIdentifier("import")
            ),
            /*typeArguments*/ undefined,
            argument ? [argument] : []
        );
    }

    /**
     * Visits a DestructuringAssignment to flatten destructuring to exported symbols.
     *
     * @param node The node to visit.
     */
    function visitDestructuringAssignment(node: ts.DestructuringAssignment, valueIsDiscarded: boolean): ts.VisitResult<ts.Expression> {
        if (hasExportedReferenceInDestructuringTarget(node.left)) {
            return ts.flattenDestructuringAssignment(
                node,
                visitor,
                context,
                ts.FlattenLevel.All,
                !valueIsDiscarded
            );
        }

        return ts.visitEachChild(node, visitor, context);
    }

    /**
     * Determines whether the target of a destructuring assignment refers to an exported symbol.
     *
     * @param node The destructuring target.
     */
    function hasExportedReferenceInDestructuringTarget(node: ts.Expression | ts.ObjectLiteralElementLike): boolean {
        if (ts.isAssignmentExpression(node, /*excludeCompoundAssignment*/ true)) {
            return hasExportedReferenceInDestructuringTarget(node.left);
        }
        else if (ts.isSpreadElement(node)) {
            return hasExportedReferenceInDestructuringTarget(node.expression);
        }
        else if (ts.isObjectLiteralExpression(node)) {
            return ts.some(node.properties, hasExportedReferenceInDestructuringTarget);
        }
        else if (ts.isArrayLiteralExpression(node)) {
            return ts.some(node.elements, hasExportedReferenceInDestructuringTarget);
        }
        else if (ts.isShorthandPropertyAssignment(node)) {
            return hasExportedReferenceInDestructuringTarget(node.name);
        }
        else if (ts.isPropertyAssignment(node)) {
            return hasExportedReferenceInDestructuringTarget(node.initializer);
        }
        else if (ts.isIdentifier(node)) {
            const container = resolver.getReferencedExportContainer(node);
            return container !== undefined && container.kind === ts.SyntaxKind.SourceFile;
        }
        else {
            return false;
        }
    }

    function visitPrefixOrPostfixUnaryExpression(node: ts.PrefixUnaryExpression | ts.PostfixUnaryExpression, valueIsDiscarded: boolean) {
        // When we see a prefix or postfix increment expression whose operand is an exported
        // symbol, we should ensure all exports of that symbol are updated with the correct
        // value.
        //
        // - We do not transform generated identifiers for any reason.
        // - We do not transform identifiers tagged with the LocalName flag.
        // - We do not transform identifiers that were originally the name of an enum or
        //   namespace due to how they are transformed in TypeScript.
        // - We only transform identifiers that are exported at the top level.
        if ((node.operator === ts.SyntaxKind.PlusPlusToken || node.operator === ts.SyntaxKind.MinusMinusToken)
            && ts.isIdentifier(node.operand)
            && !ts.isGeneratedIdentifier(node.operand)
            && !ts.isLocalName(node.operand)
            && !ts.isDeclarationNameOfEnumOrNamespace(node.operand)) {
            const exportedNames = getExports(node.operand);
            if (exportedNames) {
                let temp: ts.Identifier | undefined;
                let expression: ts.Expression = ts.visitNode(node.operand, visitor, ts.isExpression);
                if (ts.isPrefixUnaryExpression(node)) {
                    expression = factory.updatePrefixUnaryExpression(node, expression);
                }
                else {
                    expression = factory.updatePostfixUnaryExpression(node, expression);
                    if (!valueIsDiscarded) {
                        temp = factory.createTempVariable(hoistVariableDeclaration);
                        expression = factory.createAssignment(temp, expression);
                        ts.setTextRange(expression, node);
                    }
                    expression = factory.createComma(expression, factory.cloneNode(node.operand));
                    ts.setTextRange(expression, node);
                }

                for (const exportName of exportedNames) {
                    expression = createExportExpression(exportName, preventSubstitution(expression));
                }

                if (temp) {
                    expression = factory.createComma(expression, temp);
                    ts.setTextRange(expression, node);
                }

                return expression;
            }
        }
        return ts.visitEachChild(node, visitor, context);
    }

    //
    // Modifier Visitors
    //

    /**
     * Visit nodes to elide module-specific modifiers.
     *
     * @param node The node to visit.
     */
    function modifierVisitor(node: ts.Node): ts.VisitResult<ts.Node> {
        switch (node.kind) {
            case ts.SyntaxKind.ExportKeyword:
            case ts.SyntaxKind.DefaultKeyword:
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
    function onEmitNode(hint: ts.EmitHint, node: ts.Node, emitCallback: (hint: ts.EmitHint, node: ts.Node) => void): void {
        if (node.kind === ts.SyntaxKind.SourceFile) {
            const id = ts.getOriginalNodeId(node);
            currentSourceFile = node as ts.SourceFile;
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
    function onSubstituteNode(hint: ts.EmitHint, node: ts.Node) {
        node = previousOnSubstituteNode(hint, node);
        if (isSubstitutionPrevented(node)) {
            return node;
        }

        if (hint === ts.EmitHint.Expression) {
            return substituteExpression(node as ts.Expression);
        }
        else if (hint === ts.EmitHint.Unspecified) {
            return substituteUnspecified(node);
        }

        return node;
    }

    /**
     * Substitute the node, if necessary.
     *
     * @param node The node to substitute.
     */
    function substituteUnspecified(node: ts.Node) {
        switch (node.kind) {
            case ts.SyntaxKind.ShorthandPropertyAssignment:
                return substituteShorthandPropertyAssignment(node as ts.ShorthandPropertyAssignment);
        }
        return node;
    }

    /**
     * Substitution for a ShorthandPropertyAssignment whose name that may contain an imported or exported symbol.
     *
     * @param node The node to substitute.
     */
    function substituteShorthandPropertyAssignment(node: ts.ShorthandPropertyAssignment) {
        const name = node.name;
        if (!ts.isGeneratedIdentifier(name) && !ts.isLocalName(name)) {
            const importDeclaration = resolver.getReferencedImportDeclaration(name);
            if (importDeclaration) {
                if (ts.isImportClause(importDeclaration)) {
                    return ts.setTextRange(
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
                else if (ts.isImportSpecifier(importDeclaration)) {
                    return ts.setTextRange(
                        factory.createPropertyAssignment(
                            factory.cloneNode(name),
                            factory.createPropertyAccessExpression(
                                factory.getGeneratedNameForNode(importDeclaration.parent?.parent?.parent || importDeclaration),
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
    function substituteExpression(node: ts.Expression) {
        switch (node.kind) {
            case ts.SyntaxKind.Identifier:
                return substituteExpressionIdentifier(node as ts.Identifier);
            case ts.SyntaxKind.BinaryExpression:
                return substituteBinaryExpression(node as ts.BinaryExpression);
            case ts.SyntaxKind.MetaProperty:
                return substituteMetaProperty(node as ts.MetaProperty);
        }

        return node;
    }

    /**
     * Substitution for an Identifier expression that may contain an imported or exported symbol.
     *
     * @param node The node to substitute.
     */
    function substituteExpressionIdentifier(node: ts.Identifier): ts.Expression {
        if (ts.getEmitFlags(node) & ts.EmitFlags.HelperName) {
            const externalHelpersModuleName = ts.getExternalHelpersModuleName(currentSourceFile);
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
        if (!ts.isGeneratedIdentifier(node) && !ts.isLocalName(node)) {
            const importDeclaration = resolver.getReferencedImportDeclaration(node);
            if (importDeclaration) {
                if (ts.isImportClause(importDeclaration)) {
                    return ts.setTextRange(
                        factory.createPropertyAccessExpression(
                            factory.getGeneratedNameForNode(importDeclaration.parent),
                            factory.createIdentifier("default")
                        ),
                        /*location*/ node
                    );
                }
                else if (ts.isImportSpecifier(importDeclaration)) {
                    return ts.setTextRange(
                        factory.createPropertyAccessExpression(
                            factory.getGeneratedNameForNode(importDeclaration.parent?.parent?.parent || importDeclaration),
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
    function substituteBinaryExpression(node: ts.BinaryExpression): ts.Expression {
        // When we see an assignment expression whose left-hand side is an exported symbol,
        // we should ensure all exports of that symbol are updated with the correct value.
        //
        // - We do not substitute generated identifiers for any reason.
        // - We do not substitute identifiers tagged with the LocalName flag.
        // - We do not substitute identifiers that were originally the name of an enum or
        //   namespace due to how they are transformed in TypeScript.
        // - We only substitute identifiers that are exported at the top level.
        if (ts.isAssignmentOperator(node.operatorToken.kind)
            && ts.isIdentifier(node.left)
            && !ts.isGeneratedIdentifier(node.left)
            && !ts.isLocalName(node.left)
            && !ts.isDeclarationNameOfEnumOrNamespace(node.left)) {
            const exportedNames = getExports(node.left);
            if (exportedNames) {
                // For each additional export of the declaration, apply an export assignment.
                let expression: ts.Expression = node;
                for (const exportName of exportedNames) {
                    expression = createExportExpression(exportName, preventSubstitution(expression));
                }

                return expression;
            }
        }

        return node;
    }

    function substituteMetaProperty(node: ts.MetaProperty) {
        if (ts.isImportMeta(node)) {
            return factory.createPropertyAccessExpression(contextObject, factory.createIdentifier("meta"));
        }
        return node;
    }

    /**
     * Gets the exports of a name.
     *
     * @param name The name.
     */
    function getExports(name: ts.Identifier) {
        let exportedNames: ts.Identifier[] | undefined;
        if (!ts.isGeneratedIdentifier(name)) {
            const valueDeclaration = resolver.getReferencedImportDeclaration(name)
                || resolver.getReferencedValueDeclaration(name);

            if (valueDeclaration) {
                const exportContainer = resolver.getReferencedExportContainer(name, /*prefixLocals*/ false);
                if (exportContainer && exportContainer.kind === ts.SyntaxKind.SourceFile) {
                    exportedNames = ts.append(exportedNames, factory.getDeclarationName(valueDeclaration));
                }

                exportedNames = ts.addRange(exportedNames, moduleInfo && moduleInfo.exportedBindings[ts.getOriginalNodeId(valueDeclaration)]);
            }
        }

        return exportedNames;
    }

    /**
     * Prevent substitution of a node for this transformer.
     *
     * @param node The node which should not be substituted.
     */
    function preventSubstitution<T extends ts.Node>(node: T): T {
        if (noSubstitution === undefined) noSubstitution = [];
        noSubstitution[ts.getNodeId(node)] = true;
        return node;
    }

    /**
     * Determines whether a node should not be substituted.
     *
     * @param node The node to test.
     */
    function isSubstitutionPrevented(node: ts.Node) {
        return noSubstitution && node.id && noSubstitution[node.id];
    }
}
