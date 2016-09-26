/// <reference path="../../factory.ts" />
/// <reference path="../../visitor.ts" />

/*@internal*/
namespace ts {
    export function transformSystemModule(context: TransformationContext) {
        interface DependencyGroup {
            name: StringLiteral;
            externalImports: (ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration)[];
        }

        const {
            startLexicalEnvironment,
            endLexicalEnvironment,
            hoistVariableDeclaration,
            hoistFunctionDeclaration,
        } = context;

        const compilerOptions = context.getCompilerOptions();
        const resolver = context.getEmitResolver();
        const host = context.getEmitHost();
        const languageVersion = getEmitScriptTarget(compilerOptions);
        const previousOnSubstituteNode = context.onSubstituteNode;
        const previousOnEmitNode = context.onEmitNode;
        context.onSubstituteNode = onSubstituteNode;
        context.onEmitNode = onEmitNode;
        context.enableSubstitution(SyntaxKind.Identifier);
        context.enableSubstitution(SyntaxKind.BinaryExpression);
        context.enableSubstitution(SyntaxKind.PrefixUnaryExpression);
        context.enableSubstitution(SyntaxKind.PostfixUnaryExpression);
        context.enableEmitNotification(SyntaxKind.SourceFile);

        const exportFunctionForFileMap: Identifier[] = [];
        let currentSourceFile: SourceFile;
        let externalImports: (ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration)[];
        let exportSpecifiers: Map<string, ExportSpecifier[]>;
        let exportEquals: ExportAssignment;
        let hasExportStarsToExportValues: boolean;
        let exportFunctionForFile: Identifier;
        let contextObjectForFile: Identifier;
        let exportedLocalNames: Identifier[];
        let exportedFunctionDeclarations: ExpressionStatement[];

        let enclosingBlockScopedContainer: Node;
        let currentParent: Node;
        let currentNode: Node;

        return transformSourceFile;

        function transformSourceFile(node: SourceFile) {
            if (isDeclarationFile(node)) {
                return node;
            }

            if (isExternalModule(node) || compilerOptions.isolatedModules) {
                currentSourceFile = node;
                currentNode = node;

                // Perform the transformation.
                const updated = transformSystemModuleWorker(node);
                aggregateTransformFlags(updated);

                currentSourceFile = undefined;
                externalImports = undefined;
                exportSpecifiers = undefined;
                exportEquals = undefined;
                hasExportStarsToExportValues = false;
                exportFunctionForFile = undefined;
                contextObjectForFile = undefined;
                exportedLocalNames = undefined;
                exportedFunctionDeclarations = undefined;
                return updated;
            }

            return node;
        }

        function transformSystemModuleWorker(node: SourceFile) {
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
            Debug.assert(!exportFunctionForFile);

            // Collect information about the external module and dependency groups.
            ({ externalImports, exportSpecifiers, exportEquals, hasExportStarsToExportValues } = collectExternalModuleInfo(node, resolver));

            // Make sure that the name of the 'exports' function does not conflict with
            // existing identifiers.
            exportFunctionForFile = createUniqueName("exports");
            contextObjectForFile = createUniqueName("context");

            exportFunctionForFileMap[getOriginalNodeId(node)] = exportFunctionForFile;

            const dependencyGroups = collectDependencyGroups(externalImports);

            const statements: Statement[] = [];

            // Add the body of the module.
            addSystemModuleBody(statements, node, dependencyGroups);

            const moduleName = tryGetModuleNameFromFile(node, host, compilerOptions);
            const dependencies = createArrayLiteral(map(dependencyGroups, getNameOfDependencyGroup));
            const body = createFunctionExpression(
                /*asteriskToken*/ undefined,
                /*name*/ undefined,
                /*typeParameters*/ undefined,
                [
                    createParameter(exportFunctionForFile),
                    createParameter(contextObjectForFile)
                ],
                /*type*/ undefined,
                setEmitFlags(
                    createBlock(statements, /*location*/ undefined, /*multiLine*/ true),
                    EmitFlags.EmitEmitHelpers
                )
            );

            // Write the call to `System.register`
            // Clear the emit-helpers flag for later passes since we'll have already used it in the module body
            // So the helper will be emit at the correct position instead of at the top of the source-file
            return updateSourceFile(node, [
                createStatement(
                    createCall(
                        createPropertyAccess(createIdentifier("System"), "register"),
                        /*typeArguments*/ undefined,
                        moduleName
                            ? [moduleName, dependencies, body]
                            : [dependencies, body]
                    )
                )
            ], /*nodeEmitFlags*/ ~EmitFlags.EmitEmitHelpers & getEmitFlags(node));
        }

        /**
         * Adds the statements for the module body function for the source file.
         *
         * @param statements The output statements for the module body.
         * @param node The source file for the module.
         * @param statementOffset The offset at which to begin visiting the statements of the SourceFile.
         */
        function addSystemModuleBody(statements: Statement[], node: SourceFile, dependencyGroups: DependencyGroup[]) {
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
            //      var file_1; // local alias
            //      var y;
            //      function foo() { return y + file_1.x(); }
            //      exports("foo", foo);
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

            // We start a new lexical environment in this function body, but *not* in the
            // body of the execute function. This allows us to emit temporary declarations
            // only in the outer module body and not in the inner one.
            startLexicalEnvironment();

            // Add any prologue directives.
            const statementOffset = addPrologueDirectives(statements, node.statements, /*ensureUseStrict*/ !compilerOptions.noImplicitUseStrict, visitSourceElement);

            // var __moduleName = context_1 && context_1.id;
            statements.push(
                createVariableStatement(
                    /*modifiers*/ undefined,
                    createVariableDeclarationList([
                        createVariableDeclaration(
                            "__moduleName",
                            /*type*/ undefined,
                            createLogicalAnd(
                                contextObjectForFile,
                                createPropertyAccess(contextObjectForFile, "id")
                            )
                        )
                    ])
                )
            );

            // Visit the statements of the source file, emitting any transformations into
            // the `executeStatements` array. We do this *before* we fill the `setters` array
            // as we both emit transformations as well as aggregate some data used when creating
            // setters. This allows us to reduce the number of times we need to loop through the
            // statements of the source file.
            const executeStatements = visitNodes(node.statements, visitSourceElement, isStatement, statementOffset);

            // We emit the lexical environment (hoisted variables and function declarations)
            // early to align roughly with our previous emit output.
            // Two key differences in this approach are:
            // - Temporary variables will appear at the top rather than at the bottom of the file
            // - Calls to the exporter for exported function declarations are grouped after
            //   the declarations.
            addRange(statements, endLexicalEnvironment());

            // Emit early exports for function declarations.
            addRange(statements, exportedFunctionDeclarations);

            const exportStarFunction = addExportStarIfNeeded(statements);

            statements.push(
                createReturn(
                    setMultiLine(
                        createObjectLiteral([
                            createPropertyAssignment("setters",
                                generateSetters(exportStarFunction, dependencyGroups)
                            ),
                            createPropertyAssignment("execute",
                                createFunctionExpression(
                                    /*asteriskToken*/ undefined,
                                    /*name*/ undefined,
                                    /*typeParameters*/ undefined,
                                    /*parameters*/ [],
                                    /*type*/ undefined,
                                    createBlock(
                                        executeStatements,
                                        /*location*/ undefined,
                                        /*multiLine*/ true
                                    )
                                )
                            )
                        ]),
                        /*multiLine*/ true
                    )
                )
            );
        }

        function addExportStarIfNeeded(statements: Statement[]) {
            if (!hasExportStarsToExportValues) {
                return;
            }
            // when resolving exports local exported entries/indirect exported entries in the module
            // should always win over entries with similar names that were added via star exports
            // to support this we store names of local/indirect exported entries in a set.
            // this set is used to filter names brought by star expors.

            // local names set should only be added if we have anything exported
            if (!exportedLocalNames && mapIsEmpty(exportSpecifiers)) {
                // no exported declarations (export var ...) or export specifiers (export {x})
                // check if we have any non star export declarations.
                let hasExportDeclarationWithExportClause = false;
                for (const externalImport of externalImports) {
                    if (externalImport.kind === SyntaxKind.ExportDeclaration && (<ExportDeclaration>externalImport).exportClause) {
                        hasExportDeclarationWithExportClause = true;
                        break;
                    }
                }

                if (!hasExportDeclarationWithExportClause) {
                    // we still need to emit exportStar helper
                    return addExportStarFunction(statements, /*localNames*/ undefined);
                }
            }

            const exportedNames: ObjectLiteralElementLike[] = [];
            if (exportedLocalNames) {
                for (const exportedLocalName of exportedLocalNames) {
                    // write name of exported declaration, i.e 'export var x...'
                    exportedNames.push(
                        createPropertyAssignment(
                            createLiteral(exportedLocalName.text),
                            createLiteral(true)
                        )
                    );
                }
            }

            for (const externalImport of externalImports) {
                if (externalImport.kind !== SyntaxKind.ExportDeclaration) {
                    continue;
                }

                const exportDecl = <ExportDeclaration>externalImport;
                if (!exportDecl.exportClause) {
                    // export * from ...
                    continue;
                }

                for (const element of exportDecl.exportClause.elements) {
                    // write name of indirectly exported entry, i.e. 'export {x} from ...'
                    exportedNames.push(
                        createPropertyAssignment(
                            createLiteral((element.name || element.propertyName).text),
                            createLiteral(true)
                        )
                    );
                }
            }

            const exportedNamesStorageRef = createUniqueName("exportedNames");
            statements.push(
                createVariableStatement(
                    /*modifiers*/ undefined,
                    createVariableDeclarationList([
                        createVariableDeclaration(
                            exportedNamesStorageRef,
                            /*type*/ undefined,
                            createObjectLiteral(exportedNames, /*location*/ undefined, /*multiline*/ true)
                        )
                    ])
                )
            );

            return addExportStarFunction(statements, exportedNamesStorageRef);
        }

        /**
         * Emits a setter callback for each dependency group.
         * @param write The callback used to write each callback.
         */
        function generateSetters(exportStarFunction: Identifier, dependencyGroups: DependencyGroup[]) {
            const setters: Expression[] = [];
            for (const group of dependencyGroups) {
                // derive a unique name for parameter from the first named entry in the group
                const localName = forEach(group.externalImports, i => getLocalNameForExternalImport(i, currentSourceFile));
                const parameterName = localName ? getGeneratedNameForNode(localName) : createUniqueName("");
                const statements: Statement[] = [];
                for (const entry of group.externalImports) {
                    const importVariableName = getLocalNameForExternalImport(entry, currentSourceFile);
                    switch (entry.kind) {
                        case SyntaxKind.ImportDeclaration:
                            if (!(<ImportDeclaration>entry).importClause) {
                                // 'import "..."' case
                                // module is imported only for side-effects, no emit required
                                break;
                            }

                        // fall-through
                        case SyntaxKind.ImportEqualsDeclaration:
                            Debug.assert(importVariableName !== undefined);
                            // save import into the local
                            statements.push(
                                createStatement(
                                    createAssignment(importVariableName, parameterName)
                                )
                            );
                            break;

                        case SyntaxKind.ExportDeclaration:
                            Debug.assert(importVariableName !== undefined);
                            if ((<ExportDeclaration>entry).exportClause) {
                                //  export {a, b as c} from 'foo'
                                //
                                // emit as:
                                //
                                //  exports_({
                                //     "a": _["a"],
                                //     "c": _["b"]
                                //  });
                                const properties: PropertyAssignment[] = [];
                                for (const e of (<ExportDeclaration>entry).exportClause.elements) {
                                    properties.push(
                                        createPropertyAssignment(
                                            createLiteral(e.name.text),
                                            createElementAccess(
                                                parameterName,
                                                createLiteral((e.propertyName || e.name).text)
                                            )
                                        )
                                    );
                                }

                                statements.push(
                                    createStatement(
                                        createCall(
                                            exportFunctionForFile,
                                            /*typeArguments*/ undefined,
                                            [createObjectLiteral(properties, /*location*/ undefined, /*multiline*/ true)]
                                        )
                                    )
                                );
                            }
                            else {
                                //  export * from 'foo'
                                //
                                // emit as:
                                //
                                //  exportStar(foo_1_1);
                                statements.push(
                                    createStatement(
                                        createCall(
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
                    createFunctionExpression(
                        /*asteriskToken*/ undefined,
                        /*name*/ undefined,
                        /*typeParameters*/ undefined,
                        [createParameter(parameterName)],
                        /*type*/ undefined,
                        createBlock(statements, /*location*/ undefined, /*multiLine*/ true)
                    )
                );
            }

            return createArrayLiteral(setters, /*location*/ undefined, /*multiLine*/ true);
        }

        function visitSourceElement(node: Node): VisitResult<Node> {
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
                    return visitNestedNode(node);
            }
        }

        function visitNestedNode(node: Node): VisitResult<Node> {
            const savedEnclosingBlockScopedContainer = enclosingBlockScopedContainer;
            const savedCurrentParent = currentParent;
            const savedCurrentNode = currentNode;

            const currentGrandparent = currentParent;
            currentParent = currentNode;
            currentNode = node;

            if (currentParent && isBlockScope(currentParent, currentGrandparent)) {
                enclosingBlockScopedContainer = currentParent;
            }

            const result = visitNestedNodeWorker(node);

            enclosingBlockScopedContainer = savedEnclosingBlockScopedContainer;
            currentParent = savedCurrentParent;
            currentNode = savedCurrentNode;

            return result;
        }

        function visitNestedNodeWorker(node: Node): VisitResult<Node> {
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

                case SyntaxKind.ExpressionStatement:
                    return visitExpressionStatement(<ExpressionStatement>node);

                default:
                    return node;
            }
        }

        function visitImportDeclaration(node: ImportDeclaration): Node {
            if (node.importClause && contains(externalImports, node)) {
                hoistVariableDeclaration(getLocalNameForExternalImport(node, currentSourceFile));
            }

            return undefined;
        }

        function visitImportEqualsDeclaration(node: ImportEqualsDeclaration): Node {
            if (contains(externalImports, node)) {
                hoistVariableDeclaration(getLocalNameForExternalImport(node, currentSourceFile));
            }

            // NOTE(rbuckton): Do we support export import = require('') in System?
            return undefined;
        }

        function visitExportDeclaration(node: ExportDeclaration): VisitResult<Statement> {
            if (!node.moduleSpecifier) {
                const statements: Statement[] = [];
                addRange(statements, map(node.exportClause.elements, visitExportSpecifier));
                return statements;
            }

            return undefined;
        }

        function visitExportSpecifier(specifier: ExportSpecifier): Statement {
            if (resolver.getReferencedValueDeclaration(specifier.propertyName || specifier.name)
                || resolver.isValueAliasDeclaration(specifier)) {
                recordExportName(specifier.name);
                return createExportStatement(
                    specifier.name,
                    specifier.propertyName || specifier.name
                );
            }
            return undefined;
        }

        function visitExportAssignment(node: ExportAssignment): Statement {
            if (!node.isExportEquals) {
                if (nodeIsSynthesized(node) || resolver.isValueAliasDeclaration(node)) {
                    return createExportStatement(
                        createLiteral("default"),
                        node.expression
                    );
                }
            }

            return undefined;
        }

        /**
         * Visits a variable statement, hoisting declared names to the top-level module body.
         * Each declaration is rewritten into an assignment expression.
         *
         * @param node The variable statement to visit.
         */
        function visitVariableStatement(node: VariableStatement): VisitResult<Statement> {
            // hoist only non-block scoped declarations or block scoped declarations parented by source file
            const shouldHoist =
                ((getCombinedNodeFlags(getOriginalNode(node.declarationList)) & NodeFlags.BlockScoped) == 0) ||
                enclosingBlockScopedContainer.kind === SyntaxKind.SourceFile;
            if (!shouldHoist) {
                return node;
            }
            const isExported = hasModifier(node, ModifierFlags.Export);
            const expressions: Expression[] = [];
            for (const variable of node.declarationList.declarations) {
                const visited = <Expression>transformVariable(variable, isExported);
                if (visited) {
                    expressions.push(visited);
                }
            }

            if (expressions.length) {
                return createStatement(inlineExpressions(expressions), node);
            }

            return undefined;
        }

        /**
         * Transforms a VariableDeclaration into one or more assignment expressions.
         *
         * @param node The VariableDeclaration to transform.
         * @param isExported A value used to indicate whether the containing statement was exported.
         */
        function transformVariable(node: VariableDeclaration, isExported: boolean): VariableDeclaration | Expression {
            // Hoist any bound names within the declaration.
            hoistBindingElement(node, isExported);

            if (!node.initializer) {
                // If the variable has no initializer, ignore it.
                return;
            }

            const name = node.name;
            if (isIdentifier(name)) {
                // If the variable has an IdentifierName, write out an assignment expression in its place.
                return createAssignment(name, node.initializer);
            }
            else {
                // If the variable has a BindingPattern, flatten the variable into multiple assignment expressions.
                return flattenVariableDestructuringToExpression(context, node, hoistVariableDeclaration);
            }
        }

        /**
         * Visits a FunctionDeclaration, hoisting it to the outer module body function.
         *
         * @param node The function declaration to visit.
         */
        function visitFunctionDeclaration(node: FunctionDeclaration): Node {
            if (hasModifier(node, ModifierFlags.Export)) {
                // If the function is exported, ensure it has a name and rewrite the function without any export flags.
                const name = node.name || getGeneratedNameForNode(node);
                const newNode = createFunctionDeclaration(
                    /*decorators*/ undefined,
                    /*modifiers*/ undefined,
                    node.asteriskToken,
                    name,
                    /*typeParameters*/ undefined,
                    node.parameters,
                    /*type*/ undefined,
                    node.body,
                    /*location*/ node);

                // Record a declaration export in the outer module body function.
                recordExportedFunctionDeclaration(node);

                if (!hasModifier(node, ModifierFlags.Default)) {
                    recordExportName(name);
                }

                setOriginalNode(newNode, node);
                node = newNode;
            }

            // Hoist the function declaration to the outer module body function.
            hoistFunctionDeclaration(node);
            return undefined;
        }

        function visitExpressionStatement(node: ExpressionStatement): VisitResult<Statement> {
            const originalNode = getOriginalNode(node);
            if ((originalNode.kind === SyntaxKind.ModuleDeclaration || originalNode.kind === SyntaxKind.EnumDeclaration) && hasModifier(originalNode, ModifierFlags.Export)) {
                const name = getDeclarationName(<ModuleDeclaration | EnumDeclaration>originalNode);
                // We only need to hoistVariableDeclaration for EnumDeclaration
                // as ModuleDeclaration is already hoisted when the transformer call visitVariableStatement
                // which then call transformsVariable for each declaration in declarationList
                if (originalNode.kind === SyntaxKind.EnumDeclaration) {
                    hoistVariableDeclaration(name);
                }
                return [
                    node,
                    createExportStatement(name, name)
                ];
            }
            return node;
        }

        /**
         * Visits a ClassDeclaration, hoisting its name to the outer module body function.
         *
         * @param node The class declaration to visit.
         */
        function visitClassDeclaration(node: ClassDeclaration): VisitResult<Statement> {
            // Hoist the name of the class declaration to the outer module body function.
            const name = getDeclarationName(node);
            hoistVariableDeclaration(name);

            const statements: Statement[] = [];

            // Rewrite the class declaration into an assignment of a class expression.
            statements.push(
                createStatement(
                    createAssignment(
                        name,
                        createClassExpression(
                            /*modifiers*/ undefined,
                            node.name,
                            /*typeParameters*/ undefined,
                            node.heritageClauses,
                            node.members,
                            /*location*/ node
                        )
                    ),
                    /*location*/ node
                )
            );

            // If the class was exported, write a declaration export to the inner module body function.
            if (hasModifier(node, ModifierFlags.Export)) {
                if (!hasModifier(node, ModifierFlags.Default)) {
                    recordExportName(name);
                }

                statements.push(createDeclarationExport(node));
            }

            return statements;
        }

        function shouldHoistLoopInitializer(node: VariableDeclarationList | Expression) {
            return isVariableDeclarationList(node) && (getCombinedNodeFlags(node) & NodeFlags.BlockScoped) === 0;
        }

        /**
         * Visits the body of a ForStatement to hoist declarations.
         *
         * @param node The statement to visit.
         */
        function visitForStatement(node: ForStatement): ForStatement {
            const initializer = node.initializer;
            if (shouldHoistLoopInitializer(initializer)) {
                const expressions: Expression[] = [];
                for (const variable of (<VariableDeclarationList>initializer).declarations) {
                    const visited = <Expression>transformVariable(variable, /*isExported*/ false);
                    if (visited) {
                        expressions.push(visited);
                    }
                };

                return createFor(
                    expressions.length
                        ? inlineExpressions(expressions)
                        : <OmittedExpression>createSynthesizedNode(SyntaxKind.OmittedExpression),
                    node.condition,
                    node.incrementor,
                    visitNode(node.statement, visitNestedNode, isStatement),
                    /*location*/ node
                );
            }
            else {
                return visitEachChild(node, visitNestedNode, context);
            }
        }

        /**
         * Transforms and hoists the declaration list of a ForInStatement or ForOfStatement into an expression.
         *
         * @param node The decalaration list to transform.
         */
        function transformForBinding(node: VariableDeclarationList): Expression {
            const firstDeclaration = firstOrUndefined(node.declarations);
            hoistBindingElement(firstDeclaration, /*isExported*/ false);

            const name = firstDeclaration.name;
            return isIdentifier(name)
                ? name
                : flattenVariableDestructuringToExpression(context, firstDeclaration, hoistVariableDeclaration);
        }

        /**
         * Visits the body of a ForInStatement to hoist declarations.
         *
         * @param node The statement to visit.
         */
        function visitForInStatement(node: ForInStatement): ForInStatement {
            const initializer = node.initializer;
            if (shouldHoistLoopInitializer(initializer)) {
                const updated = getMutableClone(node);
                updated.initializer = transformForBinding(<VariableDeclarationList>initializer);
                updated.statement = visitNode(node.statement, visitNestedNode, isStatement, /*optional*/ false, liftToBlock);
                return updated;
            }
            else {
                return visitEachChild(node, visitNestedNode, context);
            }
        }

        /**
         * Visits the body of a ForOfStatement to hoist declarations.
         *
         * @param node The statement to visit.
         */
        function visitForOfStatement(node: ForOfStatement): ForOfStatement {
            const initializer = node.initializer;
            if (shouldHoistLoopInitializer(initializer)) {
                const updated = getMutableClone(node);
                updated.initializer = transformForBinding(<VariableDeclarationList>initializer);
                updated.statement = visitNode(node.statement, visitNestedNode, isStatement, /*optional*/ false, liftToBlock);
                return updated;
            }
            else {
                return visitEachChild(node, visitNestedNode, context);
            }
        }

        /**
         * Visits the body of a DoStatement to hoist declarations.
         *
         * @param node The statement to visit.
         */
        function visitDoStatement(node: DoStatement) {
            const statement = visitNode(node.statement, visitNestedNode, isStatement, /*optional*/ false, liftToBlock);
            if (statement !== node.statement) {
                const updated = getMutableClone(node);
                updated.statement = statement;
                return updated;
            }
            return node;
        }

        /**
         * Visits the body of a WhileStatement to hoist declarations.
         *
         * @param node The statement to visit.
         */
        function visitWhileStatement(node: WhileStatement) {
            const statement = visitNode(node.statement, visitNestedNode, isStatement, /*optional*/ false, liftToBlock);
            if (statement !== node.statement) {
                const updated = getMutableClone(node);
                updated.statement = statement;
                return updated;
            }
            return node;
        }

        /**
         * Visits the body of a LabeledStatement to hoist declarations.
         *
         * @param node The statement to visit.
         */
        function visitLabeledStatement(node: LabeledStatement) {
            const statement = visitNode(node.statement, visitNestedNode, isStatement, /*optional*/ false, liftToBlock);
            if (statement !== node.statement) {
                const updated = getMutableClone(node);
                updated.statement = statement;
                return updated;
            }
            return node;
        }

        /**
         * Visits the body of a WithStatement to hoist declarations.
         *
         * @param node The statement to visit.
         */
        function visitWithStatement(node: WithStatement) {
            const statement = visitNode(node.statement, visitNestedNode, isStatement, /*optional*/ false, liftToBlock);
            if (statement !== node.statement) {
                const updated = getMutableClone(node);
                updated.statement = statement;
                return updated;
            }
            return node;
        }

        /**
         * Visits the body of a SwitchStatement to hoist declarations.
         *
         * @param node The statement to visit.
         */
        function visitSwitchStatement(node: SwitchStatement) {
            const caseBlock = visitNode(node.caseBlock, visitNestedNode, isCaseBlock);
            if (caseBlock !== node.caseBlock) {
                const updated = getMutableClone(node);
                updated.caseBlock = caseBlock;
                return updated;
            }
            return node;
        }

        /**
         * Visits the body of a CaseBlock to hoist declarations.
         *
         * @param node The node to visit.
         */
        function visitCaseBlock(node: CaseBlock) {
            const clauses = visitNodes(node.clauses, visitNestedNode, isCaseOrDefaultClause);
            if (clauses !== node.clauses) {
                const updated = getMutableClone(node);
                updated.clauses = clauses;
                return updated;
            }
            return node;
        }

        /**
         * Visits the body of a CaseClause to hoist declarations.
         *
         * @param node The clause to visit.
         */
        function visitCaseClause(node: CaseClause) {
            const statements = visitNodes(node.statements, visitNestedNode, isStatement);
            if (statements !== node.statements) {
                const updated = getMutableClone(node);
                updated.statements = statements;
                return updated;
            }
            return node;
        }

        /**
         * Visits the body of a DefaultClause to hoist declarations.
         *
         * @param node The clause to visit.
         */
        function visitDefaultClause(node: DefaultClause) {
            return visitEachChild(node, visitNestedNode, context);
        }

        /**
         * Visits the body of a TryStatement to hoist declarations.
         *
         * @param node The statement to visit.
         */
        function visitTryStatement(node: TryStatement) {
            return visitEachChild(node, visitNestedNode, context);
        }

        /**
         * Visits the body of a CatchClause to hoist declarations.
         *
         * @param node The clause to visit.
         */
        function visitCatchClause(node: CatchClause) {
            const block = visitNode(node.block, visitNestedNode, isBlock);
            if (block !== node.block) {
                const updated = getMutableClone(node);
                updated.block = block;
                return updated;
            }
            return node;
        }

        /**
         * Visits the body of a Block to hoist declarations.
         *
         * @param node The block to visit.
         */
        function visitBlock(node: Block) {
            return visitEachChild(node, visitNestedNode, context);
        }

        //
        // Substitutions
        //

        function onEmitNode(emitContext: EmitContext, node: Node, emitCallback: (emitContext: EmitContext, node: Node) => void): void {
            if (node.kind === SyntaxKind.SourceFile) {
                exportFunctionForFile = exportFunctionForFileMap[getOriginalNodeId(node)];
                previousOnEmitNode(emitContext, node, emitCallback);
                exportFunctionForFile = undefined;
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
            }
            return node;
        }

        /**
         * Substitution for identifiers exported at the top level of a module.
         */
        function substituteExpressionIdentifier(node: Identifier): Expression {
            const importDeclaration = resolver.getReferencedImportDeclaration(node);
            if (importDeclaration) {
                const importBinding = createImportBinding(importDeclaration);
                if (importBinding) {
                    return importBinding;
                }
            }

            return node;
        }

        function substituteBinaryExpression(node: BinaryExpression): Expression {
            if (isAssignmentOperator(node.operatorToken.kind)) {
                return substituteAssignmentExpression(node);
            }

            return node;
        }

        function substituteAssignmentExpression(node: BinaryExpression): Expression {
            setEmitFlags(node, EmitFlags.NoSubstitution);

            const left = node.left;
            switch (left.kind) {
                case SyntaxKind.Identifier:
                    const exportDeclaration = resolver.getReferencedExportContainer(<Identifier>left);
                    if (exportDeclaration) {
                        return createExportExpression(<Identifier>left, node);
                    }
                    break;

                case SyntaxKind.ObjectLiteralExpression:
                case SyntaxKind.ArrayLiteralExpression:
                    if (hasExportedReferenceInDestructuringPattern(<ObjectLiteralExpression | ArrayLiteralExpression>left)) {
                        return substituteDestructuring(node);
                    }
                    break;
            }

            return node;
        }

        function isExportedBinding(name: Identifier) {
            const container = resolver.getReferencedExportContainer(name);
            return container && container.kind === SyntaxKind.SourceFile;
        }

        function hasExportedReferenceInDestructuringPattern(node: ObjectLiteralExpression | ArrayLiteralExpression | Identifier): boolean {
            switch (node.kind) {
                case SyntaxKind.Identifier:
                    return isExportedBinding(<Identifier>node);

                case SyntaxKind.ObjectLiteralExpression:
                    for (const property of (<ObjectLiteralExpression>node).properties) {
                        if (hasExportedReferenceInObjectDestructuringElement(property)) {
                            return true;
                        }
                    }

                    break;

                case SyntaxKind.ArrayLiteralExpression:
                    for (const element of (<ArrayLiteralExpression>node).elements) {
                        if (hasExportedReferenceInArrayDestructuringElement(element)) {
                            return true;
                        }
                    }

                    break;
            }

            return false;
        }

        function hasExportedReferenceInObjectDestructuringElement(node: ObjectLiteralElementLike): boolean {
            if (isShorthandPropertyAssignment(node)) {
                return isExportedBinding(node.name);
            }
            else if (isPropertyAssignment(node)) {
                return hasExportedReferenceInDestructuringElement(node.initializer);
            }
            else {
                return false;
            }
        }

        function hasExportedReferenceInArrayDestructuringElement(node: Expression): boolean {
            if (isSpreadElementExpression(node)) {
                const expression = node.expression;
                return isIdentifier(expression) && isExportedBinding(expression);
            }
            else {
                return hasExportedReferenceInDestructuringElement(node);
            }
        }

        function hasExportedReferenceInDestructuringElement(node: Expression): boolean {
            if (isBinaryExpression(node)) {
                const left = node.left;
                return node.operatorToken.kind === SyntaxKind.EqualsToken
                    && isDestructuringPattern(left)
                    && hasExportedReferenceInDestructuringPattern(left);
            }
            else if (isIdentifier(node)) {
                return isExportedBinding(node);
            }
            else if (isSpreadElementExpression(node)) {
                const expression = node.expression;
                return isIdentifier(expression) && isExportedBinding(expression);
            }
            else if (isDestructuringPattern(node)) {
                return hasExportedReferenceInDestructuringPattern(node);
            }
            else {
                return false;
            }
        }

        function isDestructuringPattern(node: Expression): node is ObjectLiteralExpression | ArrayLiteralExpression | Identifier {
            const kind = node.kind;
            return kind === SyntaxKind.Identifier
                || kind === SyntaxKind.ObjectLiteralExpression
                || kind === SyntaxKind.ArrayLiteralExpression;
        }

        function substituteDestructuring(node: BinaryExpression) {
            return flattenDestructuringAssignment(context, node, /*needsValue*/ true, hoistVariableDeclaration);
        }

        function substituteUnaryExpression(node: PrefixUnaryExpression | PostfixUnaryExpression): Expression {
            const operand = node.operand;
            const operator = node.operator;
            const substitute =
                isIdentifier(operand) &&
                (
                    node.kind === SyntaxKind.PostfixUnaryExpression ||
                    (node.kind === SyntaxKind.PrefixUnaryExpression && (operator === SyntaxKind.PlusPlusToken || operator === SyntaxKind.MinusMinusToken))
                );

            if (substitute) {
                const exportDeclaration = resolver.getReferencedExportContainer(<Identifier>operand);
                if (exportDeclaration) {
                    const expr = createPrefix(node.operator, operand, node);
                    setEmitFlags(expr, EmitFlags.NoSubstitution);
                    const call = createExportExpression(<Identifier>operand, expr);
                    if (node.kind === SyntaxKind.PrefixUnaryExpression) {
                        return call;
                    }
                    else {
                        // export function returns the value that was passes as the second argument
                        // however for postfix unary expressions result value should be the value before modification.
                        // emit 'x++' as '(export('x', ++x) - 1)' and 'x--' as '(export('x', --x) + 1)'
                        return operator === SyntaxKind.PlusPlusToken
                            ? createSubtract(call, createLiteral(1))
                            : createAdd(call, createLiteral(1));
                    }
                }
            }
            return node;
        }

        /**
         * Gets a name to use for a DeclarationStatement.
         * @param node The declaration statement.
         */
        function getDeclarationName(node: DeclarationStatement) {
            return node.name ? getSynthesizedClone(node.name) : getGeneratedNameForNode(node);
        }

        function addExportStarFunction(statements: Statement[], localNames: Identifier) {
            const exportStarFunction = createUniqueName("exportStar");
            const m = createIdentifier("m");
            const n = createIdentifier("n");
            const exports = createIdentifier("exports");
            let condition: Expression = createStrictInequality(n, createLiteral("default"));
            if (localNames) {
                condition = createLogicalAnd(
                    condition,
                    createLogicalNot(createHasOwnProperty(localNames, n))
                );
            }

            statements.push(
                createFunctionDeclaration(
                    /*decorators*/ undefined,
                    /*modifiers*/ undefined,
                    /*asteriskToken*/ undefined,
                    exportStarFunction,
                    /*typeParameters*/ undefined,
                    [createParameter(m)],
                    /*type*/ undefined,
                    createBlock([
                        createVariableStatement(
                            /*modifiers*/ undefined,
                            createVariableDeclarationList([
                                createVariableDeclaration(
                                    exports,
                                    /*type*/ undefined,
                                    createObjectLiteral([])
                                )
                            ])
                        ),
                        createForIn(
                            createVariableDeclarationList([
                                createVariableDeclaration(n, /*type*/ undefined)
                            ]),
                            m,
                            createBlock([
                                setEmitFlags(
                                    createIf(
                                        condition,
                                        createStatement(
                                            createAssignment(
                                                createElementAccess(exports, n),
                                                createElementAccess(m, n)
                                            )
                                        )
                                    ),
                                    EmitFlags.SingleLine
                                )
                            ])
                        ),
                        createStatement(
                            createCall(
                                exportFunctionForFile,
                                /*typeArguments*/ undefined,
                                [exports]
                            )
                        )
                    ],
                    /*location*/ undefined,
                    /*multiline*/ true)
                )
            );

            return exportStarFunction;
        }

        /**
         * Creates a call to the current file's export function to export a value.
         * @param name The bound name of the export.
         * @param value The exported value.
         */
        function createExportExpression(name: Identifier | StringLiteral, value: Expression) {
            const exportName = isIdentifier(name) ? createLiteral(name.text) : name;
            return createCall(exportFunctionForFile, /*typeArguments*/ undefined, [exportName, value]);
        }

        /**
         * Creates a call to the current file's export function to export a value.
         * @param name The bound name of the export.
         * @param value The exported value.
         */
        function createExportStatement(name: Identifier | StringLiteral, value: Expression) {
            return createStatement(createExportExpression(name, value));
        }

        /**
         * Creates a call to the current file's export function to export a declaration.
         * @param node The declaration to export.
         */
        function createDeclarationExport(node: DeclarationStatement) {
            const declarationName = getDeclarationName(node);
            const exportName = hasModifier(node, ModifierFlags.Default) ? createLiteral("default") : declarationName;
            return createExportStatement(exportName, declarationName);
        }

        function createImportBinding(importDeclaration: Declaration): LeftHandSideExpression {
            let importAlias: Identifier;
            let name: Identifier;
            if (isImportClause(importDeclaration)) {
                importAlias = getGeneratedNameForNode(importDeclaration.parent);
                name = createIdentifier("default");
            }
            else if (isImportSpecifier(importDeclaration)) {
                importAlias = getGeneratedNameForNode(importDeclaration.parent.parent.parent);
                name = importDeclaration.propertyName || importDeclaration.name;
            }
            else {
                return undefined;
            }

            if (name.originalKeywordKind && languageVersion === ScriptTarget.ES3) {
                return createElementAccess(importAlias, createLiteral(name.text));
            }
            else {
                return createPropertyAccess(importAlias, getSynthesizedClone(name));
            }
        }

        function collectDependencyGroups(externalImports: (ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration)[]) {
            const groupIndices = new StringMap<number>();
            const dependencyGroups: DependencyGroup[] = [];
            for (let i = 0; i < externalImports.length; i++) {
                const externalImport = externalImports[i];
                const externalModuleName = getExternalModuleNameLiteral(externalImport, currentSourceFile, host, resolver, compilerOptions);
                const text = externalModuleName.text;
                const groupIndex = groupIndices.get(text);
                if (groupIndex !== undefined) {
                    // deduplicate/group entries in dependency list by the dependency name
                    dependencyGroups[groupIndex].externalImports.push(externalImport);
                    continue;
                }
                else {
                    groupIndices.set(text, dependencyGroups.length);
                    dependencyGroups.push({
                        name: externalModuleName,
                        externalImports: [externalImport]
                    });
                }
            }

            return dependencyGroups;
        }

        function getNameOfDependencyGroup(dependencyGroup: DependencyGroup) {
            return dependencyGroup.name;
        }

        function recordExportName(name: Identifier) {
            if (!exportedLocalNames) {
                exportedLocalNames = [];
            }

            exportedLocalNames.push(name);
        }

        function recordExportedFunctionDeclaration(node: FunctionDeclaration) {
            if (!exportedFunctionDeclarations) {
                exportedFunctionDeclarations = [];
            }

            exportedFunctionDeclarations.push(createDeclarationExport(node));
        }

        function hoistBindingElement(node: VariableDeclaration | ArrayBindingElement, isExported: boolean): void {
            if (isOmittedExpression(node)) {
                return;
            }

            const name = node.name;
            if (isIdentifier(name)) {
                hoistVariableDeclaration(getSynthesizedClone(name));
                if (isExported) {
                    recordExportName(name);
                }
            }
            else if (isBindingPattern(name)) {
                forEach(name.elements, isExported ? hoistExportedBindingElement : hoistNonExportedBindingElement);
            }
        }

        function hoistExportedBindingElement(node: VariableDeclaration | ArrayBindingElement) {
            hoistBindingElement(node, /*isExported*/ true);
        }

        function hoistNonExportedBindingElement(node: VariableDeclaration | ArrayBindingElement) {
            hoistBindingElement(node, /*isExported*/ false);
        }

        function updateSourceFile(node: SourceFile, statements: Statement[], nodeEmitFlags: EmitFlags) {
            const updated = getMutableClone(node);
            updated.statements = createNodeArray(statements, node.statements);
            setEmitFlags(updated, nodeEmitFlags);
            return updated;
        }
    }
}