/// <reference path="./module.ts" />
/// <reference path="../destructuring.ts" />
/*@internal*/
namespace ts {
    export function createSystemModuleTransformation(transformer: Transformer): Transformation {
        interface DependencyGroup {
            name: Identifier;
            externalImports: (ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration)[];
        }

        let {
            makeUniqueName,
            createUniqueIdentifier,
            getGeneratedNameForNode,
            hoistVariableDeclaration,
            hoistFunctionDeclaration,
            startLexicalEnvironment,
            endLexicalEnvironment,
            createNodes,
            pipeNode,
            pipeNodes,
            mapNode,
            mapNodes,
            flattenNode,
            visitNode,
            visitNodes,
            visitStatement,
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
        let exportFunctionForFile: Identifier;
        let dependencyGroups: DependencyGroup[];
        let statementOffset: number;
        let exportStarFunction: Identifier;
        let exportedLocalNames: Identifier[];
        let exportedFunctionDeclarations: ExpressionStatement[] = [];
        let noSubstitution: boolean[] = [];

        // Set up a substitution callback
        let savedExpressionSubstitution = transformer.getExpressionSubstitution();
        transformer.setExpressionSubstitution(substituteExpressionWithFallback);

        return transformSystemModule;

        /**
         * Transforms a source file to a System module.
         */
        function transformSystemModule(node: SourceFile) {
            if (isExternalModule(node) || compilerOptions.isolatedModules) {
                return transformSystemModuleWorker(node);
            }

            return node;
        }

        /**
         * Transforms a source file to a System module.
         */
        function transformSystemModuleWorker(node: SourceFile) {
            currentSourceFile = node;
            exportFunctionForFile = undefined;
            dependencyGroups = undefined;
            statementOffset = undefined;

            // Get an updated source file flattened into a SystemJS module.
            return updateSourceFileNode(node, flattenNode(node, emitSystemModule), node.endOfFileToken);
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
         * Emits the source file as a System module.
         */
        function emitSystemModule(node: SourceFile, write: (node: Statement) => void) {
            // System modules has the following shape:
            //
            //  System.register(['dep-1', ... 'dep-n'], function(exports) {
            //      <module body function>
            //  });
            //
            // 'exports' here is a function `exports<T>(name: string, value: T): T`
            // that is used to publish exported values.
            //
            // 'exports' returns its 'value' argument so in most cases expressions
            // that mutate exported values can be rewritten as:
            //
            //  expr -> exports('name', expr).
            //
            // The only exception in this rule is postfix unary operators,
            // see comment to 'substitutePostfixUnaryExpression' for more details.

            // Collect information about the external module and dependency groups.
            ({ externalImports, exportSpecifiers, exportEquals, hasExportStars } = collectExternalModuleInfo(node, resolver));
            dependencyGroups = collectDependencyGroups(externalImports);

            // Emit prologue directives before the call to `System.register`.
            statementOffset = emitPrologueDirectives(node.statements, write);

            // Make sure that the name of the 'exports' function does not conflict with
            // existing identifiers.
            exportFunctionForFile = transformer.createUniqueIdentifier("exports");

            // Map the dependency groups into an array of imports.
            let imports = createArrayLiteralExpression(map(dependencyGroups, getNameOfDependencyGroup));


            // Create the module body function
            let moduleBodyStatements = flattenNode(node, emitSystemModuleBody);
            let moduleBodyFunction = createSystemModuleBodyFunction(node, moduleBodyStatements);

            // Write the call to `System.register`
            write(createSystemRegisterCall(node.moduleName, imports, moduleBodyFunction));
        }

        /**
         * Emits the statements for the module body function for the source file.
         * @param node The source file for the module.
         * @param write The callback used to emit statements.
         */
        function emitSystemModuleBody(node: SourceFile, write: (node: Statement) => void) {
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

            // Visit the statements of the source file, emitting any transformations into
            // the `executeStatements` array. We do this *before* we fill the `setters` array
            // as we both emit transformations as well as aggregate some data used when creating
            // setters. This allows us to reduce the number of times we need to loop through the
            // statements of the source file.
            let executeStatements = visitNodes(node.statements, visitModuleElement, isStatementNode, statementOffset);

            // We emit the lexical environment (hoisted variables and function declarations)
            // early to align roughly with our previous emit output.
            // Two key differences in this approach are:
            // - Temporary variables will appear at the top rather than at the bottom of the file
            // - Calls to the exporter for exported function declarations are grouped after
            //   the declarations.
            endLexicalEnvironment(write);

            // Emit early exports for function declarations.
            forEach(exportedFunctionDeclarations, write);

            if (hasExportStars) {
                emitExportStar(write);
            }

            // Here we emit the setters for the source file to the `setters` array.
            let setters = createNodes(emitSetters);

            // Write the module definition object.
            write(createReturnStatement(createModuleDefinitionObject(setters, executeStatements)));
        }

        function emitExportStar(write: (node: Statement) => void): void {
            // when resolving exports local exported entries/indirect exported entries in the module
            // should always win over entries with similar names that were added via star exports
            // to support this we store names of local/indirect exported entries in a set.
            // this set is used to filter names brought by star expors.

            // local names set should only be added if we have anything exported
            if (!exportedLocalNames && isEmpty(exportSpecifiers)) {
                // no exported declarations (export var ...) or export specifiers (export {x})
                // check if we have any non star export declarations.
                let hasExportDeclarationWithExportClause = false;
                for (let externalImport of externalImports) {
                    if (externalImport.kind === SyntaxKind.ExportDeclaration && (<ExportDeclaration>externalImport).exportClause) {
                        hasExportDeclarationWithExportClause = true;
                        break;
                    }
                }

                if (!hasExportDeclarationWithExportClause) {
                    // we still need to emit exportStar helper
                    write(createExportStarFunction(/*localNames*/ undefined));
                    return;
                }
            }

            let exportedNames: ObjectLiteralElement[] = [];
            if (exportedLocalNames) {
                for (let exportedLocalName of exportedLocalNames) {
                    // write name of exported declaration, i.e 'export var x...'
                    let exportedName = createStringLiteralForIdentifier(exportedLocalName);
                    exportedNames.push(createPropertyAssignment(exportedName, createTrueKeyword()));
                }
            }

            for (let externalImport of externalImports) {
                if (externalImport.kind !== SyntaxKind.ExportDeclaration) {
                    continue;
                }

                let exportDecl = <ExportDeclaration>externalImport;
                if (!exportDecl.exportClause) {
                    // export * from ...
                    continue;
                }

                for (let element of exportDecl.exportClause.elements) {
                    // write name of indirectly exported entry, i.e. 'export {x} from ...'
                    let exportedName = createStringLiteralForIdentifier(element.name || element.propertyName);
                    exportedNames.push(createPropertyAssignment(exportedName, createTrueKeyword()));
                }
            }

            let exportedNamesStorageRef = createUniqueIdentifier("exportedNames");
            write(createVariableStatement3(exportedNamesStorageRef, createObjectLiteralExpression(exportedNames)));
            write(createExportStarFunction(exportedNamesStorageRef));
        }

        /**
         * Emits a setter callback for each dependency group.
         * @param write The callback used to write each callback.
         */
        function emitSetters(write: (node: Expression) => void) {
            for (let group of dependencyGroups) {
                // derive a unique name for parameter from the first named entry in the group
                let parameterName = createUniqueIdentifier(forEach(group.externalImports, getLocalNameTextForExternalImport) || "");
                let statements: Statement[] = [];
                for (let entry of group.externalImports) {
                    let importVariableName = getLocalNameForExternalImport(entry);
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
                            statements.push(createExpressionStatement(createAssignmentExpression(importVariableName, parameterName)));
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
                                let properties: PropertyAssignment[] = [];
                                for (let e of (<ExportDeclaration>entry).exportClause.elements) {
                                    let exportName = createStringLiteralForIdentifier(e.name);
                                    let importName = createStringLiteralForIdentifier(e.propertyName || e.name);
                                    let importAccess = createElementAccessExpression2(parameterName, importName);
                                    properties.push(createPropertyAssignment(exportName, importAccess));
                                }

                                let exportedValues = createObjectLiteralExpression(properties);
                                statements.push(createExpressionStatement(createCallExpression2(exportFunctionForFile, [exportedValues])));
                            }
                            else {
                                //  export * from 'foo'
                                //
                                // emit as:
                                //
                                //  exportStar(foo_1_1);
                                statements.push(createExpressionStatement(createCallExpression2(exportStarFunction, [parameterName])));
                            }
                            break;
                    }
                }

                let setter = createFunctionExpression3([createParameter2(parameterName)], createBlock(statements));
                startOnNewLine(setter);
                write(setter);
            }
        }

        function visitModuleElement(node: Node, write: (node: Node) => void): void {
            switch (node.kind) {
                case SyntaxKind.ImportDeclaration:
                    return visitImportDeclaration(<ImportDeclaration>node, write);
                case SyntaxKind.ImportEqualsDeclaration:
                    return visitImportEqualsDeclaration(<ImportEqualsDeclaration>node, write);
                case SyntaxKind.ExportDeclaration:
                    return visitExportDeclaration(<ExportDeclaration>node, write);
                case SyntaxKind.ExportAssignment:
                    return visitExportAssignment(<ExportAssignment>node, write);
                default:
                    return visitNonModuleElement(node, write);
            }
        }

        function visitNonModuleElement(node: Node, write: (node: Node) => void): void {
            switch (node.kind) {
                case SyntaxKind.VariableStatement:
                    return visitVariableStatement(<VariableStatement>node, write);
                case SyntaxKind.FunctionDeclaration:
                    return visitFunctionDeclaration(<FunctionDeclaration>node, write);
                case SyntaxKind.ClassDeclaration:
                    return visitClassDeclaration(<ClassDeclaration>node, write);
                case SyntaxKind.ForStatement:
                    return visitForStatement(<ForStatement>node, write);
                case SyntaxKind.ForInStatement:
                    return visitForInStatement(<ForInStatement>node, write);
                case SyntaxKind.ForOfStatement:
                    return visitForOfStatement(<ForOfStatement>node, write);
                case SyntaxKind.DoStatement:
                    return visitDoStatement(<DoStatement>node, write);
                case SyntaxKind.WhileStatement:
                    return visitWhileStatement(<WhileStatement>node, write);
                case SyntaxKind.LabeledStatement:
                    return visitLabeledStatement(<LabeledStatement>node, write);
                case SyntaxKind.WithStatement:
                    return visitWithStatement(<WithStatement>node, write);
                case SyntaxKind.SwitchStatement:
                    return visitSwitchStatement(<SwitchStatement>node, write);
                case SyntaxKind.CaseBlock:
                    return visitCaseBlock(<CaseBlock>node, write);
                case SyntaxKind.CaseClause:
                    return visitCaseClause(<CaseClause>node, write);
                case SyntaxKind.DefaultClause:
                    return visitDefaultClause(<DefaultClause>node, write);
                case SyntaxKind.TryStatement:
                    return visitTryStatement(<TryStatement>node, write);
                case SyntaxKind.CatchClause:
                    return visitCatchClause(<CatchClause>node, write);
                case SyntaxKind.Block:
                    return visitBlock(<Block>node, write);
                default:
                    return write(node);
            }
        }

        function visitImportDeclaration(node: ImportDeclaration, write: (node: Statement) => void): void {
            if (node.importClause && contains(externalImports, node)) {
                hoistVariableDeclaration(getLocalNameForExternalImport(node));
            }
        }

        function visitImportEqualsDeclaration(node: ImportEqualsDeclaration, write: (node: Statement) => void): void {
            if (contains(externalImports, node)) {
                hoistVariableDeclaration(getLocalNameForExternalImport(node));
            }

            // NOTE(rbuckton): Do we support export import = require('') in System?
        }

        function visitExportDeclaration(node: ExportDeclaration, write: (node: Statement) => void): void {
            if (!node.moduleSpecifier) {
                pipeNodes(node.exportClause.elements, emitExportSpecifier, write);
            }
        }

        function emitExportSpecifier(specifier: ExportSpecifier, write: (node: Statement) => void): void {
            if (!resolver.getReferencedValueDeclaration(specifier.propertyName || specifier.name) &&
                !resolver.isValueAliasDeclaration(specifier)) {
                return;
            }

            recordExportName(specifier.name);
            write(createExpressionStatement(createExportExpression(specifier.name, specifier.propertyName || specifier.name)));
        }

        function visitExportAssignment(node: ExportAssignment, write: (node: Statement) => void): void {
            if (!node.isExportEquals && resolver.isValueAliasDeclaration(node)) {
                write(createExportStatement(createStringLiteral("default"), node.expression));
            }
        }

        /**
         * Visits a variable statement, hoisting declared names to the top-level module body.
         * Each declaration is rewritten into an assignment expression.
         * @param node The variable statement to visit.
         * @param write The callback used to write any resulting statements.
         */
        function visitVariableStatement(node: VariableStatement, write: (node: Statement) => void): void {
            let through = node.flags & NodeFlags.Export
                ? transformExportedVariableDeclarationListToStatement
                : transformVariableDeclarationListToStatement;
            pipeNode(node.declarationList, through, write);
        }

        /**
         * Transforms an exported VariableDeclarationList into an ExpressionStatement containing assignment expressions.
         * @param node The list to transform
         * @param write The callback used to write the resulting expression statement.
         * @param isExported A value used to indicate whether the containing statement was exported.
         */
        function transformExportedVariableDeclarationListToStatement(node: VariableDeclarationList, write: (node: Statement) => void): void {
            transformVariableDeclarationListToStatement(node, write, /*isExported*/ true);
        }

        /**
         * Transforms a VariableDeclarationList into an ExpressionStatement containing assignment expressions.
         * @param node The list to transform
         * @param write The callback used to write the resulting expression statement.
         * @param isExported A value used to indicate whether the containing statement was exported.
         */
        function transformVariableDeclarationListToStatement(node: VariableDeclarationList, write: (node: Statement) => void, isExported?: boolean): void {
            let expressions = mapNodes(node.declarations, isExported ? transformExportedVariableDeclarationToExpression : transformVariableDeclarationToExpression);
            if (expressions.length) {
                write(createExpressionStatement(inlineExpressions(expressions)));
            }
        }

        /**
         * Transforms a VariableDeclarationList into an initializer Expression for a for loop.
         * @param node The list to transform
         * @param write The callback used to write the resulting expression statement.
         */
        function transformVariableDeclarationListToExpression(node: VariableDeclarationList, write: (node: Expression) => void): void {
            let expressions = mapNodes(node.declarations, transformVariableDeclarationToExpression);
            if (expressions.length) {
                write(inlineExpressions(expressions));
            }
            else {
                write(createOmittedExpression());
            }
        }

        /**
         * Transforms an exported VariableDeclaration into one or more assignment expressions.
         * @param node The VariableDeclaration to transform.
         * @param write The callback used to write any assignment expressions for the variable.
         * @param isExported A value used to indicate whether the containing statement was exported.
         */
        function transformExportedVariableDeclarationToExpression(node: VariableDeclaration, write: (node: Expression) => void): void {
            transformVariableDeclarationToExpression(node, write, /*isExported*/ true);
        }

        /**
         * Transforms a VariableDeclaration into one or more assignment expressions.
         * @param node The VariableDeclaration to transform.
         * @param write The callback used to write any assignment expressions for the variable.
         * @param isExported A value used to indicate whether the containing statement was exported.
         */
        function transformVariableDeclarationToExpression(node: VariableDeclaration, write: (node: Expression) => void, isExported?: boolean): void {
            // Hoist any bound names within the declaration.
            hoistBindingElement(node, isExported);

            if (!node.initializer) {
                // If the variable has no initializer, ignore it.
                return;
            }

            let name = node.name;
            if (isIdentifier(name)) {
                // If the variable has an IdentifierName, write out an assignment expression in its place.
                write(createAssignmentExpression(name, node.initializer));
            }
            else {
                // If the variable has a BindingPattern, flatten the variable into multiple assignment expressions.
                flattenVariableDestructuringAsExpression(transformer, node, write);
            }
        }

        /**
         * Visits a FunctionDeclaration, hoisting it to the outer module body function.
         * @param node The function declaration to visit.
         * @param write A callback used to write statements to the inner module body function.
         */
        function visitFunctionDeclaration(node: FunctionDeclaration, write: (node: Statement) => void): void {
            let isExported = node.flags & NodeFlags.Export;
            if (isExported) {
                // If the function is exported, ensure it has a name and rewrite the function without any export flags.
                let name = node.name || getGeneratedNameForNode(node);
                node = createFunctionDeclaration3(node.asteriskToken, name, node.parameters, node.body, node);

                // Record a declaration export in the outer module body function.
                recordExportedFunctionDeclaration(node);

                let isDefaultExport = node.flags & NodeFlags.Default;
                if (!isDefaultExport) {
                    recordExportName(name);
                }
            }

            // Hoist the function declaration to the outer module body function.
            hoistFunctionDeclaration(node);
        }

        /**
         * Visits a ClassDeclaration, hoisting its name to the outer module body function.
         * @param node The class declaration to visit.
         * @param write A callback used to write statements to the inner module body function.
         */
        function visitClassDeclaration(node: ClassDeclaration, write: (node: Statement) => void): void {
            // Hoist the name of the class declaration to the outer module body function.
            let name = getDeclarationName(node);
            hoistVariableDeclaration(name);

            // Rewrite the class declaration into an assignment of a class expression.
            let baseTypeNode = getClassExtendsHeritageClauseElement(node);
            let expression = createClassExpression2(node.name, baseTypeNode, node.members, node);
            write(createAssignmentStatement(name, expression, node));

            // If the class was exported, write a declaration export to the inner module body function.
            let isExported = node.flags & NodeFlags.Export;
            if (isExported) {
                let isDefaultExport = node.flags & NodeFlags.Default;
                if (!isDefaultExport) {
                    recordExportName(name);
                }

                write(createDeclarationExport(node));
            }
        }

        /**
         * Visits the body of a ForStatement to hoist declarations.
         * @param node The statement to visit.
         * @param write A callback used to write out the result.
         */
        function visitForStatement(node: ForStatement, write: (node: ForStatement) => void): void {
            let initializer = node.initializer;
            if (isVariableDeclarationList(initializer)) {
                write(updateForStatement(node,
                    mapNode(initializer, transformVariableDeclarationListToExpression),
                    node.condition,
                    node.incrementor,
                    visitStatement(node.statement, visitNonModuleElement)
                ));
            }
            else {
                write(accept(node, visitNonModuleElement));
            }
        }

        /**
         * Transforms and hoists the declaration list of a ForInStatement or ForOfStatement into an expression.
         * @param node The decalaration list to transform.
         * @param write A callback used to write out the result.
         */
        function transformForBinding(node: VariableDeclarationList, write: (node: Expression) => void): void {
            let firstDeclaration = firstOrUndefined(node.declarations);
            hoistBindingElement(firstDeclaration, /*isExported*/ false);

            let name = firstDeclaration.name;
            write(isIdentifier(name) ? name : convertBindingPatternToExpression(name));
        }

        /**
         * Visits the body of a ForInStatement to hoist declarations.
         * @param node The statement to visit.
         * @param write A callback used to write out the result.
         */
        function visitForInStatement(node: ForInStatement, write: (node: ForInStatement) => void): void {
            let initializer = node.initializer;
            if (isVariableDeclarationList(initializer)) {
                write(updateForInStatement(
                    node,
                    mapNode(initializer, transformForBinding),
                    node.expression,
                    visitStatement(node.statement, visitNonModuleElement)
                ));
            }
            else {
                write(accept(node, visitNonModuleElement));
            }
        }

        /**
         * Visits the body of a ForOfStatement to hoist declarations.
         * @param node The statement to visit.
         * @param write A callback used to write out the result.
         */
        function visitForOfStatement(node: ForOfStatement, write: (node: ForOfStatement) => void): void {
            let initializer = node.initializer;
            if (isVariableDeclarationList(initializer)) {
                write(updateForOfStatement(
                    node,
                    mapNode(initializer, transformForBinding),
                    node.expression,
                    visitStatement(node.statement, visitNonModuleElement)
                ));
            }
            else {
                write(accept(node, visitNonModuleElement));
            }
        }

        /**
         * Visits the body of a DoStatement to hoist declarations.
         * @param node The statement to visit.
         * @param write A callback used to write out the result.
         */
        function visitDoStatement(node: DoStatement, write: (node: DoStatement) => void): void {
            write(updateDoStatement(
                node,
                visitStatement(node.statement, visitNonModuleElement),
                node.expression
            ));
        }

        /**
         * Visits the body of a WhileStatement to hoist declarations.
         * @param node The statement to visit.
         * @param write A callback used to write out the result.
         */
        function visitWhileStatement(node: WhileStatement, write: (node: WhileStatement) => void): void {
            write(updateWhileStatement(
                node,
                node.expression,
                visitStatement(node.statement, visitNonModuleElement)
            ));
        }

        /**
         * Visits the body of a LabeledStatement to hoist declarations.
         * @param node The statement to visit.
         * @param write A callback used to write out the result.
         */
        function visitLabeledStatement(node: LabeledStatement, write: (node: LabeledStatement) => void): void {
            write(updateLabeledStatement(
                node,
                node.label,
                visitStatement(node.statement, visitNonModuleElement)
            ));
        }

        /**
         * Visits the body of a WithStatement to hoist declarations.
         * @param node The statement to visit.
         * @param write A callback used to write out the result.
         */
        function visitWithStatement(node: WithStatement, write: (node: WithStatement) => void): void {
            write(updateWithStatement(
                node,
                node.expression,
                visitStatement(node.statement, visitNonModuleElement)
            ));
        }

        /**
         * Visits the body of a SwitchStatement to hoist declarations.
         * @param node The statement to visit.
         * @param write A callback used to write out the result.
         */
        function visitSwitchStatement(node: SwitchStatement, write: (node: SwitchStatement) => void): void {
            write(updateSwitchStatement(
                node,
                node.expression,
                visitNode(node.caseBlock, visitNonModuleElement, isCaseBlock)
            ));
        }

        /**
         * Visits the body of a CaseBlock to hoist declarations.
         * @param node The node to visit.
         * @param write A callback used to write out the result.
         */
        function visitCaseBlock(node: CaseBlock, write: (node: CaseBlock) => void): void {
            write(updateCaseBlock(
                node,
                visitNodes(node.clauses, visitNonModuleElement, isCaseOrDefaultClause)
            ));
        }

        /**
         * Visits the body of a CaseClause to hoist declarations.
         * @param node The clause to visit.
         * @param write A callback used to write out the result.
         */
        function visitCaseClause(node: CaseClause, write: (node: CaseClause) => void): void {
            write(updateCaseClause(
                node,
                node.expression,
                visitNodes(node.statements, visitNonModuleElement, isStatementNode)
            ));
        }

        /**
         * Visits the body of a DefaultClause to hoist declarations.
         * @param node The clause to visit.
         * @param write A callback used to write out the result.
         */
        function visitDefaultClause(node: DefaultClause, write: (node: DefaultClause) => void): void {
            write(accept(node, visitNonModuleElement));
        }

        /**
         * Visits the body of a TryStatement to hoist declarations.
         * @param node The statement to visit.
         * @param write A callback used to write out the result.
         */
        function visitTryStatement(node: TryStatement, write: (node: TryStatement) => void): void {
            write(accept(node, visitNonModuleElement));
        }

        /**
         * Visits the body of a CatchClause to hoist declarations.
         * @param node The clause to visit.
         * @param write A callback used to write out the result.
         */
        function visitCatchClause(node: CatchClause, write: (node: CatchClause) => void): void {
            write(updateCatchClause(
                node,
                node.variableDeclaration,
                visitNode(node.block, visitNonModuleElement, isBlock)
            ));
        }

        /**
         * Visits the body of a Block to hoist declarations.
         * @param node The block to visit.
         * @param write A callback used to write out the result.
         */
        function visitBlock(node: Block, write: (node: Block) => void): void {
            write(accept(node, visitNonModuleElement));
        }

        //
        // Substitutions
        //

        /**
         * Attempt to subsitute the provided expression, falling back to a substitution from a previous phase.
         * @param node The node to substitute.
         * @param parentNode The parent of node.
         * @param sourceFile The source file for the node.
         */
        function substituteExpressionWithFallback(node: Expression): Expression {
            let substitute = substituteExpression(node);
            return savedExpressionSubstitution ? savedExpressionSubstitution(substitute) : substitute;
        }

        /**
         * Substitute the expression, if necessary.
         * @param node The node to substitute.
         * @param parentNode The parent of node.
         * @param sourceFile The source file for the node.
         */
        function substituteExpression(node: Expression): Expression {
            if (isIdentifier(node)) {
                return substituteExpressionIdentifier(node)
            }
            else if (isBinaryExpression(node)) {
                return substituteBinaryExpression(node);
            }
            else if (isPostfixUnaryExpression(node)) {
                return substitutePostfixUnaryExpression(node);
            }
            return node;
        }

        /**
         * Substitution for identifiers exported at the top level of a module.
         */
        function substituteExpressionIdentifier(node: Identifier): Expression {
            let importDeclaration = resolver.getReferencedImportDeclaration(node);
            if (importDeclaration) {
                return createImportBinding(importDeclaration);
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
            if (!noSubstitution[getNodeId(node)]) {
                noSubstitution[getNodeId(node)] = true;

                let left = node.left;
                if (isIdentifier(left)) {
                    let exportDeclaration = resolver.getReferencedExportContainer(left);
                    if (exportDeclaration) {
                        return createExportExpression(left, node);
                    }
                }
                else if (isObjectLiteralExpression(left) || isArrayLiteralExpression(left)) {
                    if (hasExportedReferenceInDestructuringPattern(left)) {
                        return mapNode(node, substituteDestructuring);
                    }
                }
            }

            return node;
        }

        function isExportedBinding(name: Identifier) {
            return isSourceFile(resolver.getReferencedExportContainer(name));
        }

        function hasExportedReferenceInDestructuringPattern(node: ObjectLiteralExpression | ArrayLiteralExpression | Identifier): boolean {
            if (isObjectLiteralExpression(node)) {
                return forEach(node.properties, hasExportedReferenceInObjectDestructuringElement);
            }
            else if (isArrayLiteralExpression(node)) {
                return forEach(node.elements, hasExportedReferenceInArrayDestructuringElement);
            }
            else if (isIdentifier(node)) {
                return isExportedBinding(node);
            }

            return false;
        }

        function hasExportedReferenceInObjectDestructuringElement(node: ObjectLiteralElement): boolean {
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
                let expression = node.expression;
                return isIdentifier(expression) && isExportedBinding(expression);
            }
            else {
                return hasExportedReferenceInDestructuringElement(node);
            }
        }

        function hasExportedReferenceInDestructuringElement(node: Expression): boolean {
            if (isBinaryExpression(node)) {
                let left = node.left;
                return node.operatorToken.kind === SyntaxKind.EqualsToken
                    && isDestructuringPattern(left)
                    && hasExportedReferenceInDestructuringPattern(left);
            }
            else if (isIdentifier(node)) {
                return isExportedBinding(node);
            }
            else if (isSpreadElementExpression(node)) {
                let expression = node.expression;
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
            return isIdentifier(node) || isObjectLiteralExpression(node) || isArrayLiteralExpression(node);
        }

        function substituteDestructuring(node: BinaryExpression, write: (node: Expression) => void): void {
            flattenDestructuringAssignment(transformer, node, write);
        }

        function substitutePostfixUnaryExpression(node: PostfixUnaryExpression): Expression {
            let operand = node.operand;
            if (isIdentifier(operand)) {
                let exportDeclaration = resolver.getReferencedExportContainer(operand);
                if (exportDeclaration) {
                    let prefixUnary = createPrefixUnaryExpression(node.operator, operand, node);
                    let exportName = createStringLiteralForIdentifier(operand);
                    let exportCall = createExportExpression(operand, prefixUnary);
                    let expression = node.operator === SyntaxKind.PlusPlusToken
                        ? createSubtractExpression(exportCall, createNumericLiteral2(1))
                        : createAddExpression(exportCall, createNumericLiteral2(1));
                    return createParenthesizedExpression(expression);
                }
            }
            return node;
        }

        function createSystemRegisterCall(moduleName: string, imports: ArrayLiteralExpression, moduleBodyFunction: FunctionExpression) {
            let registerArguments: Expression[] = [imports, moduleBodyFunction];
            if (moduleName) {
                registerArguments.unshift(createStringLiteral(moduleName));
            }

            let systemRegister = createPropertyAccessExpression3(createIdentifier("System"), "register");
            return createExpressionStatement(createCallExpression2(systemRegister, registerArguments));
        }

        /**
         * Creates the module body function for a `System.register` call.
         * @param node The source file for the module.
         */
        function createSystemModuleBodyFunction(node: SourceFile, statements: Statement[]) {
            // Flatten the source file into multiple statements for the new module body.
            let moduleBody = createBlock(statements);

            // Add emit helpers if needed
            if (resolver.getNodeCheckFlags(node) & NodeCheckFlags.EmitHelpersMask) {
                transformer.setGeneratedNodeFlags(moduleBody, GeneratedNodeFlags.EmitHelpers);
            }

            return createFunctionExpression3([createParameter2(exportFunctionForFile)], moduleBody);
        }

        function createModuleDefinitionObject(setters: Expression[], statements: Statement[]) {
            return createObjectLiteralExpression2({
                "setters": createArrayLiteralExpression(setters),
                "execute": createFunctionExpression3([], createBlock(statements))
            });
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

        function getLocalNameTextForExternalImport(node: ImportDeclaration | ExportDeclaration | ImportEqualsDeclaration): string {
            let name = getLocalNameForExternalImport(node);
            return name ? name.text : undefined;
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

        /**
         * Gets a name to use for a DeclarationStatement.
         * @param node The declaration statement.
         */
        function getDeclarationName(node: DeclarationStatement) {
            return node.name ? makeSynthesized(node.name) : getGeneratedNameForNode(node);
        }

        function createExportStarFunction(localNames: Identifier) {
            exportStarFunction = createUniqueIdentifier("exportStar");
            let m = createIdentifier("m");
            let n = createIdentifier("n");
            let exports = createIdentifier("exports");
            let condition: Expression = createStrictInequalityExpression(n, createStringLiteral("default"));
            if (localNames) {
                condition = createLogicalAndExpression(
                    condition,
                    createLogicalNotExpression(createHasOwnPropertyCall(localNames, n))
                );
            }

            return createFunctionDeclaration2(exportStarFunction, [createParameter2(m)], createBlock([
                createVariableStatement3(exports, createObjectLiteralExpression([])),
                createForInStatement(createVariableDeclarationList2(n), m, createBlock([
                    createIfStatement(condition, createExpressionStatement(createAssignmentExpression(
                        createElementAccessExpression2(exports, n),
                        createElementAccessExpression2(m, n)
                    )))
                ])),
                createExpressionStatement(createCallExpression2(exportFunctionForFile, [exports]))
            ]));
        }

        /**
         * Creates a call to the current file's export function to export a value.
         * @param name The bound name of the export.
         * @param value The exported value.
         */
        function createExportExpression(name: Identifier | StringLiteral, value: Expression) {
            let exportName = isIdentifier(name) ? createStringLiteralForIdentifier(name) : name;
            return createCallExpression2(exportFunctionForFile, [exportName, value]);
        }

        /**
         * Creates a call to the current file's export function to export a value.
         * @param name The bound name of the export.
         * @param value The exported value.
         */
        function createExportStatement(name: Identifier | StringLiteral, value: Expression) {
            return createExpressionStatement(createExportExpression(name, value));
        }

        /**
         * Creates a call to the current file's export function to export a declaration.
         * @param node The declaration to export.
         */
        function createDeclarationExport(node: DeclarationStatement) {
            let declarationName = getDeclarationName(node);
            let exportName = node.flags & NodeFlags.Default ? createStringLiteral("default") : declarationName;
            return createExportStatement(exportName, declarationName);
        }

        function createImportBinding(importDeclaration: Declaration): LeftHandSideExpression {
            let importAlias: Identifier;
            let name: Identifier;
            if (isImportClause(importDeclaration)) {
                importAlias = getGeneratedNameForNode(importDeclaration.parent);
                name = createIdentifier("default", SyntaxKind.DefaultKeyword);
            }
            else if (isImportSpecifier(importDeclaration)) {
                importAlias = getGeneratedNameForNode(importDeclaration.parent.parent.parent);
                name = importDeclaration.propertyName || importDeclaration.name;
            }

            if (name.originalKeywordKind && languageVersion === ScriptTarget.ES3) {
                return createElementAccessExpression2(importAlias, createStringLiteralForIdentifier(name));
            }
            else {
                return createPropertyAccessExpression2(importAlias, makeSynthesized(name));
            }
        }

        function collectDependencyGroups(externalImports: (ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration)[]) {
            let groupIndices: Map<number> = {};
            let dependencyGroups: DependencyGroup[] = [];
            for (let i = 0; i < externalImports.length; ++i) {
                let externalImport = externalImports[i];
                let externalModuleName = getExternalModuleNameLiteral(externalImport);
                let text = externalModuleName.text;
                if (hasProperty(groupIndices, text)) {
                    // deduplicate/group entries in dependency list by the dependency name
                    let groupIndex = groupIndices[text];
                    dependencyGroups[groupIndex].externalImports.push(externalImport);
                    continue;
                }
                else {
                    groupIndices[text] = dependencyGroups.length;
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

        function hoistBindingElement(node: VariableDeclaration | BindingElement, isExported: boolean) {
            let name = node.name;
            if (isIdentifier(name)) {
                hoistVariableDeclaration(makeSynthesized(name));
                if (isExported) {
                    recordExportName(name);
                }
            }
            else if (isBindingPattern(name)) {
                forEach(name.elements, isExported ? hoistExportedBindingElement : hoistNonExportedBindingElement);
            }
        }

        function hoistExportedBindingElement(node: VariableDeclaration | BindingElement) {
            hoistBindingElement(node, /*isExported*/ true);
        }

        function hoistNonExportedBindingElement(node: VariableDeclaration | BindingElement) {
            hoistBindingElement(node, /*isExported*/ false);
        }
    }
}