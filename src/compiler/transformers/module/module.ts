import * as ts from "../../_namespaces/ts";

/** @internal */
export function transformModule(context: ts.TransformationContext) {
    interface AsynchronousDependencies {
        aliasedModuleNames: ts.Expression[];
        unaliasedModuleNames: ts.Expression[];
        importAliasNames: ts.ParameterDeclaration[];
    }

    function getTransformModuleDelegate(moduleKind: ts.ModuleKind): (node: ts.SourceFile) => ts.SourceFile {
        switch (moduleKind) {
            case ts.ModuleKind.AMD: return transformAMDModule;
            case ts.ModuleKind.UMD: return transformUMDModule;
            default: return transformCommonJSModule;
        }
    }

    const {
        factory,
        getEmitHelperFactory: emitHelpers,
        startLexicalEnvironment,
        endLexicalEnvironment,
        hoistVariableDeclaration
    } = context;

    const compilerOptions = context.getCompilerOptions();
    const resolver = context.getEmitResolver();
    const host = context.getEmitHost();
    const languageVersion = ts.getEmitScriptTarget(compilerOptions);
    const moduleKind = ts.getEmitModuleKind(compilerOptions);
    const previousOnSubstituteNode = context.onSubstituteNode;
    const previousOnEmitNode = context.onEmitNode;
    context.onSubstituteNode = onSubstituteNode;
    context.onEmitNode = onEmitNode;
    context.enableSubstitution(ts.SyntaxKind.CallExpression); // Substitute calls to imported/exported symbols to avoid incorrect `this`.
    context.enableSubstitution(ts.SyntaxKind.TaggedTemplateExpression); // Substitute calls to imported/exported symbols to avoid incorrect `this`.
    context.enableSubstitution(ts.SyntaxKind.Identifier); // Substitutes expression identifiers with imported/exported symbols.
    context.enableSubstitution(ts.SyntaxKind.BinaryExpression); // Substitutes assignments to exported symbols.
    context.enableSubstitution(ts.SyntaxKind.ShorthandPropertyAssignment); // Substitutes shorthand property assignments for imported/exported symbols.
    context.enableEmitNotification(ts.SyntaxKind.SourceFile); // Restore state when substituting nodes in a file.

    const moduleInfoMap: ts.ExternalModuleInfo[] = []; // The ExternalModuleInfo for each file.
    const deferredExports: (ts.Statement[] | undefined)[] = []; // Exports to defer until an EndOfDeclarationMarker is found.

    let currentSourceFile: ts.SourceFile; // The current file.
    let currentModuleInfo: ts.ExternalModuleInfo; // The ExternalModuleInfo for the current file.
    const noSubstitution: boolean[] = []; // Set of nodes for which substitution rules should be ignored.
    let needUMDDynamicImportHelper: boolean;

    return ts.chainBundle(context, transformSourceFile);

    /**
     * Transforms the module aspects of a SourceFile.
     *
     * @param node The SourceFile node.
     */
    function transformSourceFile(node: ts.SourceFile) {
        if (node.isDeclarationFile ||
            !(ts.isEffectiveExternalModule(node, compilerOptions) ||
                node.transformFlags & ts.TransformFlags.ContainsDynamicImport ||
                (ts.isJsonSourceFile(node) && ts.hasJsonModuleEmitEnabled(compilerOptions) && ts.outFile(compilerOptions)))) {
            return node;
        }

        currentSourceFile = node;
        currentModuleInfo = ts.collectExternalModuleInfo(context, node, resolver, compilerOptions);
        moduleInfoMap[ts.getOriginalNodeId(node)] = currentModuleInfo;

        // Perform the transformation.
        const transformModule = getTransformModuleDelegate(moduleKind);
        const updated = transformModule(node);
        currentSourceFile = undefined!;
        currentModuleInfo = undefined!;
        needUMDDynamicImportHelper = false;
        return updated;
    }


    function shouldEmitUnderscoreUnderscoreESModule() {
        if (!currentModuleInfo.exportEquals && ts.isExternalModule(currentSourceFile)) {
            return true;
        }
        return false;
    }

    /**
     * Transforms a SourceFile into a CommonJS module.
     *
     * @param node The SourceFile node.
     */
    function transformCommonJSModule(node: ts.SourceFile) {
        startLexicalEnvironment();

        const statements: ts.Statement[] = [];
        const ensureUseStrict = ts.getStrictOptionValue(compilerOptions, "alwaysStrict") || (!compilerOptions.noImplicitUseStrict && ts.isExternalModule(currentSourceFile));
        const statementOffset = factory.copyPrologue(node.statements, statements, ensureUseStrict && !ts.isJsonSourceFile(node), topLevelVisitor);

        if (shouldEmitUnderscoreUnderscoreESModule()) {
            ts.append(statements, createUnderscoreUnderscoreESModule());
        }
        if (ts.length(currentModuleInfo.exportedNames)) {
            const chunkSize = 50;
            for (let i=0; i<currentModuleInfo.exportedNames!.length; i += chunkSize) {
                ts.append(
                    statements,
                    factory.createExpressionStatement(
                        ts.reduceLeft(
                            currentModuleInfo.exportedNames!.slice(i, i + chunkSize),
                            (prev, nextId) => factory.createAssignment(factory.createPropertyAccessExpression(factory.createIdentifier("exports"), factory.createIdentifier(ts.idText(nextId))), prev),
                            factory.createVoidZero() as ts.Expression
                        )
                    )
                );
            }
        }

        ts.append(statements, ts.visitNode(currentModuleInfo.externalHelpersImportDeclaration, topLevelVisitor, ts.isStatement));
        ts.addRange(statements, ts.visitNodes(node.statements, topLevelVisitor, ts.isStatement, statementOffset));
        addExportEqualsIfNeeded(statements, /*emitAsReturn*/ false);
        ts.insertStatementsAfterStandardPrologue(statements, endLexicalEnvironment());

        const updated = factory.updateSourceFile(node, ts.setTextRange(factory.createNodeArray(statements), node.statements));
        ts.addEmitHelpers(updated, context.readEmitHelpers());
        return updated;
    }

    /**
     * Transforms a SourceFile into an AMD module.
     *
     * @param node The SourceFile node.
     */
    function transformAMDModule(node: ts.SourceFile) {
        const define = factory.createIdentifier("define");
        const moduleName = ts.tryGetModuleNameFromFile(factory, node, host, compilerOptions);
        const jsonSourceFile = ts.isJsonSourceFile(node) && node;

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

        const { aliasedModuleNames, unaliasedModuleNames, importAliasNames } = collectAsynchronousDependencies(node, /*includeNonAmdDependencies*/ true);

        // Create an updated SourceFile:
        //
        //     define(mofactory.updateSourceFile", "module2"], function ...
        const updated = factory.updateSourceFile(node,
            ts.setTextRange(
                factory.createNodeArray([
                    factory.createExpressionStatement(
                        factory.createCallExpression(
                            define,
                            /*typeArguments*/ undefined,
                            [
                                // Add the module name (if provided).
                                ...(moduleName ? [moduleName] : []),

                                // Add the dependency array argument:
                                //
                                //     ["require", "exports", module1", "module2", ...]
                                factory.createArrayLiteralExpression(jsonSourceFile ? ts.emptyArray : [
                                    factory.createStringLiteral("require"),
                                    factory.createStringLiteral("exports"),
                                    ...aliasedModuleNames,
                                    ...unaliasedModuleNames
                                ]),

                                // Add the module body function argument:
                                //
                                //     function (require, exports, module1, module2) ...
                                jsonSourceFile ?
                                    jsonSourceFile.statements.length ? jsonSourceFile.statements[0].expression : factory.createObjectLiteralExpression() :
                                    factory.createFunctionExpression(
                                        /*modifiers*/ undefined,
                                        /*asteriskToken*/ undefined,
                                        /*name*/ undefined,
                                        /*typeParameters*/ undefined,
                                        [
                                            factory.createParameterDeclaration(/*modifiers*/ undefined, /*dotDotDotToken*/ undefined, "require"),
                                            factory.createParameterDeclaration(/*modifiers*/ undefined, /*dotDotDotToken*/ undefined, "exports"),
                                            ...importAliasNames
                                        ],
                                        /*type*/ undefined,
                                        transformAsynchronousModuleBody(node)
                                    )
                            ]
                        )
                    )
                ]),
                /*location*/ node.statements
            )
        );

        ts.addEmitHelpers(updated, context.readEmitHelpers());
        return updated;
    }

    /**
     * Transforms a SourceFile into a UMD module.
     *
     * @param node The SourceFile node.
     */
    function transformUMDModule(node: ts.SourceFile) {
        const { aliasedModuleNames, unaliasedModuleNames, importAliasNames } = collectAsynchronousDependencies(node, /*includeNonAmdDependencies*/ false);
        const moduleName = ts.tryGetModuleNameFromFile(factory, node, host, compilerOptions);
        const umdHeader = factory.createFunctionExpression(
            /*modifiers*/ undefined,
            /*asteriskToken*/ undefined,
            /*name*/ undefined,
            /*typeParameters*/ undefined,
            [factory.createParameterDeclaration(/*modifiers*/ undefined, /*dotDotDotToken*/ undefined, "factory")],
            /*type*/ undefined,
            ts.setTextRange(
                factory.createBlock(
                    [
                        factory.createIfStatement(
                            factory.createLogicalAnd(
                                factory.createTypeCheck(factory.createIdentifier("module"), "object"),
                                factory.createTypeCheck(factory.createPropertyAccessExpression(factory.createIdentifier("module"), "exports"), "object")
                            ),
                            factory.createBlock([
                                factory.createVariableStatement(
                                    /*modifiers*/ undefined,
                                    [
                                        factory.createVariableDeclaration(
                                            "v",
                                            /*exclamationToken*/ undefined,
                                            /*type*/ undefined,
                                            factory.createCallExpression(
                                                factory.createIdentifier("factory"),
                                                /*typeArguments*/ undefined,
                                                [
                                                    factory.createIdentifier("require"),
                                                    factory.createIdentifier("exports")
                                                ]
                                            )
                                        )
                                    ]
                                ),
                                ts.setEmitFlags(
                                    factory.createIfStatement(
                                        factory.createStrictInequality(
                                            factory.createIdentifier("v"),
                                            factory.createIdentifier("undefined")
                                        ),
                                        factory.createExpressionStatement(
                                            factory.createAssignment(
                                                factory.createPropertyAccessExpression(factory.createIdentifier("module"), "exports"),
                                                factory.createIdentifier("v")
                                            )
                                        )
                                    ),
                                    ts.EmitFlags.SingleLine
                                )
                            ]),
                            factory.createIfStatement(
                                factory.createLogicalAnd(
                                    factory.createTypeCheck(factory.createIdentifier("define"), "function"),
                                    factory.createPropertyAccessExpression(factory.createIdentifier("define"), "amd")
                                ),
                                factory.createBlock([
                                    factory.createExpressionStatement(
                                        factory.createCallExpression(
                                            factory.createIdentifier("define"),
                                            /*typeArguments*/ undefined,
                                            [
                                                // Add the module name (if provided).
                                                ...(moduleName ? [moduleName] : []),
                                                factory.createArrayLiteralExpression([
                                                    factory.createStringLiteral("require"),
                                                    factory.createStringLiteral("exports"),
                                                    ...aliasedModuleNames,
                                                    ...unaliasedModuleNames
                                                ]),
                                                factory.createIdentifier("factory")
                                            ]
                                        )
                                    )
                                ])
                            )
                        )
                    ],
                    /*multiLine*/ true
                ),
                /*location*/ undefined
            )
        );

        // Create an updated SourceFile:
        //
        //  (function (factory) {
        //      if (typeof module === "object" && typeof module.exports === "object") {
        //          var v = factory(require, exports);
        //          if (v !== undefined) module.exports = v;
        //      }
        //      else if (typeof define === 'function' && define.amd) {
        //          define(["require", "exports"], factory);
        //      }
        //  })(function ...)

        const updated = factory.updateSourceFile(
            node,
            ts.setTextRange(
                factory.createNodeArray([
                    factory.createExpressionStatement(
                        factory.createCallExpression(
                            umdHeader,
                            /*typeArguments*/ undefined,
                            [
                                // Add the module body function argument:
                                //
                                //     function (require, exports) ...
                                factory.createFunctionExpression(
                                    /*modifiers*/ undefined,
                                    /*asteriskToken*/ undefined,
                                    /*name*/ undefined,
                                    /*typeParameters*/ undefined,
                                    [
                                        factory.createParameterDeclaration(/*modifiers*/ undefined, /*dotDotDotToken*/ undefined, "require"),
                                        factory.createParameterDeclaration(/*modifiers*/ undefined, /*dotDotDotToken*/ undefined, "exports"),
                                        ...importAliasNames
                                    ],
                                    /*type*/ undefined,
                                    transformAsynchronousModuleBody(node)
                                )
                            ]
                        )
                    )
                ]),
                /*location*/ node.statements
            )
        );

        ts.addEmitHelpers(updated, context.readEmitHelpers());
        return updated;
    }

    /**
     * Collect the additional asynchronous dependencies for the module.
     *
     * @param node The source file.
     * @param includeNonAmdDependencies A value indicating whether to include non-AMD dependencies.
     */
    function collectAsynchronousDependencies(node: ts.SourceFile, includeNonAmdDependencies: boolean): AsynchronousDependencies {
        // names of modules with corresponding parameter in the factory function
        const aliasedModuleNames: ts.Expression[] = [];

        // names of modules with no corresponding parameters in factory function
        const unaliasedModuleNames: ts.Expression[] = [];

        // names of the parameters in the factory function; these
        // parameters need to match the indexes of the corresponding
        // module names in aliasedModuleNames.
        const importAliasNames: ts.ParameterDeclaration[] = [];

        // Fill in amd-dependency tags
        for (const amdDependency of node.amdDependencies) {
            if (amdDependency.name) {
                aliasedModuleNames.push(factory.createStringLiteral(amdDependency.path));
                importAliasNames.push(factory.createParameterDeclaration(/*modifiers*/ undefined, /*dotDotDotToken*/ undefined, amdDependency.name));
            }
            else {
                unaliasedModuleNames.push(factory.createStringLiteral(amdDependency.path));
            }
        }

        for (const importNode of currentModuleInfo.externalImports) {
            // Find the name of the external module
            const externalModuleName = ts.getExternalModuleNameLiteral(factory, importNode, currentSourceFile, host, resolver, compilerOptions);

            // Find the name of the module alias, if there is one
            const importAliasName = ts.getLocalNameForExternalImport(factory, importNode, currentSourceFile);
            // It is possible that externalModuleName is undefined if it is not string literal.
            // This can happen in the invalid import syntax.
            // E.g : "import * from alias from 'someLib';"
            if (externalModuleName) {
                if (includeNonAmdDependencies && importAliasName) {
                    // Set emitFlags on the name of the classDeclaration
                    // This is so that when printer will not substitute the identifier
                    ts.setEmitFlags(importAliasName, ts.EmitFlags.NoSubstitution);
                    aliasedModuleNames.push(externalModuleName);
                    importAliasNames.push(factory.createParameterDeclaration(/*modifiers*/ undefined, /*dotDotDotToken*/ undefined, importAliasName));
                }
                else {
                    unaliasedModuleNames.push(externalModuleName);
                }
            }
        }

        return { aliasedModuleNames, unaliasedModuleNames, importAliasNames };
    }

    function getAMDImportExpressionForImport(node: ts.ImportDeclaration | ts.ExportDeclaration | ts.ImportEqualsDeclaration) {
        if (ts.isImportEqualsDeclaration(node) || ts.isExportDeclaration(node) || !ts.getExternalModuleNameLiteral(factory, node, currentSourceFile, host, resolver, compilerOptions)) {
            return undefined;
        }
        const name = ts.getLocalNameForExternalImport(factory, node, currentSourceFile)!; // TODO: GH#18217
        const expr = getHelperExpressionForImport(node, name);
        if (expr === name) {
            return undefined;
        }
        return factory.createExpressionStatement(factory.createAssignment(name, expr));
    }

    /**
     * Transforms a SourceFile into an AMD or UMD module body.
     *
     * @param node The SourceFile node.
     */
    function transformAsynchronousModuleBody(node: ts.SourceFile) {
        startLexicalEnvironment();

        const statements: ts.Statement[] = [];
        const statementOffset = factory.copyPrologue(node.statements, statements, /*ensureUseStrict*/ !compilerOptions.noImplicitUseStrict, topLevelVisitor);

        if (shouldEmitUnderscoreUnderscoreESModule()) {
            ts.append(statements, createUnderscoreUnderscoreESModule());
        }
        if (ts.length(currentModuleInfo.exportedNames)) {
            ts.append(statements, factory.createExpressionStatement(ts.reduceLeft(currentModuleInfo.exportedNames, (prev, nextId) => factory.createAssignment(factory.createPropertyAccessExpression(factory.createIdentifier("exports"), factory.createIdentifier(ts.idText(nextId))), prev), factory.createVoidZero() as ts.Expression)));
        }

        // Visit each statement of the module body.
        ts.append(statements, ts.visitNode(currentModuleInfo.externalHelpersImportDeclaration, topLevelVisitor, ts.isStatement));
        if (moduleKind === ts.ModuleKind.AMD) {
            ts.addRange(statements, ts.mapDefined(currentModuleInfo.externalImports, getAMDImportExpressionForImport));
        }
        ts.addRange(statements, ts.visitNodes(node.statements, topLevelVisitor, ts.isStatement, statementOffset));

        // Append the 'export =' statement if provided.
        addExportEqualsIfNeeded(statements, /*emitAsReturn*/ true);

        // End the lexical environment for the module body
        // and merge any new lexical declarations.
        ts.insertStatementsAfterStandardPrologue(statements, endLexicalEnvironment());

        const body = factory.createBlock(statements, /*multiLine*/ true);
        if (needUMDDynamicImportHelper) {
            ts.addEmitHelper(body, dynamicImportUMDHelper);
        }

        return body;
    }

    /**
     * Adds the down-level representation of `export=` to the statement list if one exists
     * in the source file.
     *
     * @param statements The Statement list to modify.
     * @param emitAsReturn A value indicating whether to emit the `export=` statement as a
     * return statement.
     */
    function addExportEqualsIfNeeded(statements: ts.Statement[], emitAsReturn: boolean) {
        if (currentModuleInfo.exportEquals) {
            const expressionResult = ts.visitNode(currentModuleInfo.exportEquals.expression, visitor);
            if (expressionResult) {
                if (emitAsReturn) {
                    const statement = factory.createReturnStatement(expressionResult);
                    ts.setTextRange(statement, currentModuleInfo.exportEquals);
                    ts.setEmitFlags(statement, ts.EmitFlags.NoTokenSourceMaps | ts.EmitFlags.NoComments);
                    statements.push(statement);
                }
                else {
                    const statement = factory.createExpressionStatement(
                        factory.createAssignment(
                            factory.createPropertyAccessExpression(
                                factory.createIdentifier("module"),
                                "exports"
                            ),
                            expressionResult
                        )
                    );

                    ts.setTextRange(statement, currentModuleInfo.exportEquals);
                    ts.setEmitFlags(statement, ts.EmitFlags.NoComments);
                    statements.push(statement);
                }
            }
        }
    }

    //
    // Top-Level Source Element Visitors
    //

    /**
     * Visits a node at the top level of the source file.
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

            case ts.SyntaxKind.VariableStatement:
                return visitVariableStatement(node as ts.VariableStatement);

            case ts.SyntaxKind.FunctionDeclaration:
                return visitFunctionDeclaration(node as ts.FunctionDeclaration);

            case ts.SyntaxKind.ClassDeclaration:
                return visitClassDeclaration(node as ts.ClassDeclaration);

            case ts.SyntaxKind.MergeDeclarationMarker:
                return visitMergeDeclarationMarker(node as ts.MergeDeclarationMarker);

            case ts.SyntaxKind.EndOfDeclarationMarker:
                return visitEndOfDeclarationMarker(node as ts.EndOfDeclarationMarker);

            default:
                return visitor(node);
        }
    }

    function visitorWorker(node: ts.Node, valueIsDiscarded: boolean): ts.VisitResult<ts.Node> {
        // This visitor does not need to descend into the tree if there is no dynamic import, destructuring assignment, or update expression
        // as export/import statements are only transformed at the top level of a file.
        if (!(node.transformFlags & (ts.TransformFlags.ContainsDynamicImport | ts.TransformFlags.ContainsDestructuringAssignment | ts.TransformFlags.ContainsUpdateExpressionForIdentifier))) {
            return node;
        }

        switch (node.kind) {
            case ts.SyntaxKind.ForStatement:
                return visitForStatement(node as ts.ForStatement);
            case ts.SyntaxKind.ExpressionStatement:
                return visitExpressionStatement(node as ts.ExpressionStatement);
            case ts.SyntaxKind.ParenthesizedExpression:
                return visitParenthesizedExpression(node as ts.ParenthesizedExpression, valueIsDiscarded);
            case ts.SyntaxKind.PartiallyEmittedExpression:
                return visitPartiallyEmittedExpression(node as ts.PartiallyEmittedExpression, valueIsDiscarded);
            case ts.SyntaxKind.CallExpression:
                if (ts.isImportCall(node) && currentSourceFile.impliedNodeFormat === undefined) {
                    return visitImportCallExpression(node);
                }
                break;
            case ts.SyntaxKind.BinaryExpression:
                if (ts.isDestructuringAssignment(node)) {
                    return visitDestructuringAssignment(node, valueIsDiscarded);
                }
                break;
            case ts.SyntaxKind.PrefixUnaryExpression:
            case ts.SyntaxKind.PostfixUnaryExpression:
                return visitPreOrPostfixUnaryExpression(node as ts.PrefixUnaryExpression | ts.PostfixUnaryExpression, valueIsDiscarded);
        }

        return ts.visitEachChild(node, visitor, context);
    }

    function visitor(node: ts.Node): ts.VisitResult<ts.Node> {
        return visitorWorker(node, /*valueIsDiscarded*/ false);
    }

    function discardedValueVisitor(node: ts.Node): ts.VisitResult<ts.Node> {
        return visitorWorker(node, /*valueIsDiscarded*/ true);
    }

    function destructuringNeedsFlattening(node: ts.Expression): boolean {
        if (ts.isObjectLiteralExpression(node)) {
            for (const elem of node.properties) {
                switch (elem.kind) {
                    case ts.SyntaxKind.PropertyAssignment:
                        if (destructuringNeedsFlattening(elem.initializer)) {
                            return true;
                        }
                        break;
                    case ts.SyntaxKind.ShorthandPropertyAssignment:
                        if (destructuringNeedsFlattening(elem.name)) {
                            return true;
                        }
                        break;
                    case ts.SyntaxKind.SpreadAssignment:
                        if (destructuringNeedsFlattening(elem.expression)) {
                            return true;
                        }
                        break;
                    case ts.SyntaxKind.MethodDeclaration:
                    case ts.SyntaxKind.GetAccessor:
                    case ts.SyntaxKind.SetAccessor:
                        return false;
                    default: ts.Debug.assertNever(elem, "Unhandled object member kind");
                }
            }
        }
        else if (ts.isArrayLiteralExpression(node)) {
            for (const elem of node.elements) {
                if (ts.isSpreadElement(elem)) {
                    if (destructuringNeedsFlattening(elem.expression)) {
                        return true;
                    }
                }
                else if (destructuringNeedsFlattening(elem)) {
                    return true;
                }
            }
        }
        else if (ts.isIdentifier(node)) {
            return ts.length(getExports(node)) > (ts.isExportName(node) ? 1 : 0);
        }
        return false;
    }

    function visitDestructuringAssignment(node: ts.DestructuringAssignment, valueIsDiscarded: boolean): ts.Expression {
        if (destructuringNeedsFlattening(node.left)) {
            return ts.flattenDestructuringAssignment(node, visitor, context, ts.FlattenLevel.All, !valueIsDiscarded, createAllExportExpressions);
        }
        return ts.visitEachChild(node, visitor, context);
    }

    function visitForStatement(node: ts.ForStatement) {
        return factory.updateForStatement(
            node,
            ts.visitNode(node.initializer, discardedValueVisitor, ts.isForInitializer),
            ts.visitNode(node.condition, visitor, ts.isExpression),
            ts.visitNode(node.incrementor, discardedValueVisitor, ts.isExpression),
            ts.visitIterationBody(node.statement, visitor, context)
        );
    }

    function visitExpressionStatement(node: ts.ExpressionStatement) {
        return factory.updateExpressionStatement(
            node,
            ts.visitNode(node.expression, discardedValueVisitor, ts.isExpression)
        );
    }

    function visitParenthesizedExpression(node: ts.ParenthesizedExpression, valueIsDiscarded: boolean) {
        return factory.updateParenthesizedExpression(node, ts.visitNode(node.expression, valueIsDiscarded ? discardedValueVisitor : visitor, ts.isExpression));
    }

    function visitPartiallyEmittedExpression(node: ts.PartiallyEmittedExpression, valueIsDiscarded: boolean) {
        return factory.updatePartiallyEmittedExpression(node, ts.visitNode(node.expression, valueIsDiscarded ? discardedValueVisitor : visitor, ts.isExpression));
    }

    function visitPreOrPostfixUnaryExpression(node: ts.PrefixUnaryExpression | ts.PostfixUnaryExpression, valueIsDiscarded: boolean) {
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
                    noSubstitution[ts.getNodeId(expression)] = true;
                    expression = createExportExpression(exportName, expression);
                    ts.setTextRange(expression, node);
                }

                if (temp) {
                    noSubstitution[ts.getNodeId(expression)] = true;
                    expression = factory.createComma(expression, temp);
                    ts.setTextRange(expression, node);
                }
                return expression;
            }
        }
        return ts.visitEachChild(node, visitor, context);
    }

    function visitImportCallExpression(node: ts.ImportCall): ts.Expression {
        const externalModuleName = ts.getExternalModuleNameLiteral(factory, node, currentSourceFile, host, resolver, compilerOptions);
        const firstArgument = ts.visitNode(ts.firstOrUndefined(node.arguments), visitor);
        // Only use the external module name if it differs from the first argument. This allows us to preserve the quote style of the argument on output.
        const argument = externalModuleName && (!firstArgument || !ts.isStringLiteral(firstArgument) || firstArgument.text !== externalModuleName.text) ? externalModuleName : firstArgument;
        const containsLexicalThis = !!(node.transformFlags & ts.TransformFlags.ContainsLexicalThis);
        switch (compilerOptions.module) {
            case ts.ModuleKind.AMD:
                return createImportCallExpressionAMD(argument, containsLexicalThis);
            case ts.ModuleKind.UMD:
                return createImportCallExpressionUMD(argument ?? factory.createVoidZero(), containsLexicalThis);
            case ts.ModuleKind.CommonJS:
            default:
                return createImportCallExpressionCommonJS(argument);
        }
    }

    function createImportCallExpressionUMD(arg: ts.Expression, containsLexicalThis: boolean): ts.Expression {
        // (function (factory) {
        //      ... (regular UMD)
        // }
        // })(function (require, exports, useSyncRequire) {
        //      "use strict";
        //      Object.defineProperty(exports, "__esModule", { value: true });
        //      var __syncRequire = typeof module === "object" && typeof module.exports === "object";
        //      var __resolved = new Promise(function (resolve) { resolve(); });
        //      .....
        //      __syncRequire
        //          ? __resolved.then(function () { return require(x); }) /*CommonJs Require*/
        //          : new Promise(function (_a, _b) { require([x], _a, _b); }); /*Amd Require*/
        // });
        needUMDDynamicImportHelper = true;
        if (ts.isSimpleCopiableExpression(arg)) {
            const argClone = ts.isGeneratedIdentifier(arg) ? arg : ts.isStringLiteral(arg) ? factory.createStringLiteralFromNode(arg) : ts.setEmitFlags(ts.setTextRange(factory.cloneNode(arg), arg), ts.EmitFlags.NoComments);
            return factory.createConditionalExpression(
                /*condition*/ factory.createIdentifier("__syncRequire"),
                /*questionToken*/ undefined,
                /*whenTrue*/ createImportCallExpressionCommonJS(arg),
                /*colonToken*/ undefined,
                /*whenFalse*/ createImportCallExpressionAMD(argClone, containsLexicalThis)
            );
        }
        else {
            const temp = factory.createTempVariable(hoistVariableDeclaration);
            return factory.createComma(factory.createAssignment(temp, arg), factory.createConditionalExpression(
                /*condition*/ factory.createIdentifier("__syncRequire"),
                /*questionToken*/ undefined,
                /*whenTrue*/ createImportCallExpressionCommonJS(temp, /* isInlineable */ true),
                /*colonToken*/ undefined,
                /*whenFalse*/ createImportCallExpressionAMD(temp, containsLexicalThis)
            ));
        }
    }

    function createImportCallExpressionAMD(arg: ts.Expression | undefined, containsLexicalThis: boolean): ts.Expression {
        // improt("./blah")
        // emit as
        // define(["require", "exports", "blah"], function (require, exports) {
        //     ...
        //     new Promise(function (_a, _b) { require([x], _a, _b); }); /*Amd Require*/
        // });
        const resolve = factory.createUniqueName("resolve");
        const reject = factory.createUniqueName("reject");
        const parameters = [
            factory.createParameterDeclaration(/*modifiers*/ undefined, /*dotDotDotToken*/ undefined, /*name*/ resolve),
            factory.createParameterDeclaration(/*modifiers*/ undefined, /*dotDotDotToken*/ undefined, /*name*/ reject)
        ];
        const body = factory.createBlock([
            factory.createExpressionStatement(
                factory.createCallExpression(
                    factory.createIdentifier("require"),
                    /*typeArguments*/ undefined,
                    [factory.createArrayLiteralExpression([arg || factory.createOmittedExpression()]), resolve, reject]
                )
            )
        ]);

        let func: ts.FunctionExpression | ts.ArrowFunction;
        if (languageVersion >= ts.ScriptTarget.ES2015) {
            func = factory.createArrowFunction(
                /*modifiers*/ undefined,
                /*typeParameters*/ undefined,
                parameters,
                /*type*/ undefined,
                /*equalsGreaterThanToken*/ undefined,
                body);
        }
        else {
            func = factory.createFunctionExpression(
                /*modifiers*/ undefined,
                /*asteriskToken*/ undefined,
                /*name*/ undefined,
                /*typeParameters*/ undefined,
                parameters,
                /*type*/ undefined,
                body);

            // if there is a lexical 'this' in the import call arguments, ensure we indicate
            // that this new function expression indicates it captures 'this' so that the
            // es2015 transformer will properly substitute 'this' with '_this'.
            if (containsLexicalThis) {
                ts.setEmitFlags(func, ts.EmitFlags.CapturesThis);
            }
        }

        const promise = factory.createNewExpression(factory.createIdentifier("Promise"), /*typeArguments*/ undefined, [func]);
        if (ts.getESModuleInterop(compilerOptions)) {
            return factory.createCallExpression(factory.createPropertyAccessExpression(promise, factory.createIdentifier("then")), /*typeArguments*/ undefined, [emitHelpers().createImportStarCallbackHelper()]);
        }
        return promise;
    }

    function createImportCallExpressionCommonJS(arg: ts.Expression | undefined, isInlineable?: boolean): ts.Expression {
        // import(x)
        // emit as
        // var _a;
        // (_a = x, Promise.resolve().then(() => require(_a)) /*CommonJs Require*/
        // We have to wrap require in then callback so that require is done in asynchronously
        // if we simply do require in resolve callback in Promise constructor. We will execute the loading immediately
        // If the arg is not inlineable, we have to evaluate it in the current scope with a temp var
        const temp = arg && !ts.isSimpleInlineableExpression(arg) && !isInlineable ? factory.createTempVariable(hoistVariableDeclaration) : undefined;
        const promiseResolveCall = factory.createCallExpression(
            factory.createPropertyAccessExpression(factory.createIdentifier("Promise"), "resolve"),
            /*typeArguments*/ undefined,
            /*argumentsArray*/ [],
        );
        let requireCall: ts.Expression = factory.createCallExpression(
            factory.createIdentifier("require"),
            /*typeArguments*/ undefined,
            temp ? [temp] : arg ? [arg] : [],
        );
        if (ts.getESModuleInterop(compilerOptions)) {
            requireCall = emitHelpers().createImportStarHelper(requireCall);
        }

        let func: ts.FunctionExpression | ts.ArrowFunction;
        if (languageVersion >= ts.ScriptTarget.ES2015) {
            func = factory.createArrowFunction(
                /*modifiers*/ undefined,
                /*typeParameters*/ undefined,
                /*parameters*/ [],
                /*type*/ undefined,
                /*equalsGreaterThanToken*/ undefined,
                requireCall);
        }
        else {
            func = factory.createFunctionExpression(
                /*modifiers*/ undefined,
                /*asteriskToken*/ undefined,
                /*name*/ undefined,
                /*typeParameters*/ undefined,
                /*parameters*/ [],
                /*type*/ undefined,
                factory.createBlock([factory.createReturnStatement(requireCall)]));
        }

        const downleveledImport = factory.createCallExpression(factory.createPropertyAccessExpression(promiseResolveCall, "then"), /*typeArguments*/ undefined, [func]);

        return temp === undefined ? downleveledImport : factory.createCommaListExpression([factory.createAssignment(temp, arg!), downleveledImport]);
    }

    function getHelperExpressionForExport(node: ts.ExportDeclaration, innerExpr: ts.Expression) {
        if (!ts.getESModuleInterop(compilerOptions) || ts.getEmitFlags(node) & ts.EmitFlags.NeverApplyImportHelper) {
            return innerExpr;
        }
        if (ts.getExportNeedsImportStarHelper(node)) {
            return emitHelpers().createImportStarHelper(innerExpr);
        }
        return innerExpr;
    }

    function getHelperExpressionForImport(node: ts.ImportDeclaration, innerExpr: ts.Expression) {
        if (!ts.getESModuleInterop(compilerOptions) || ts.getEmitFlags(node) & ts.EmitFlags.NeverApplyImportHelper) {
            return innerExpr;
        }
        if (ts.getImportNeedsImportStarHelper(node)) {
            return emitHelpers().createImportStarHelper(innerExpr);
        }
        if (ts.getImportNeedsImportDefaultHelper(node)) {
            return emitHelpers().createImportDefaultHelper(innerExpr);
        }
        return innerExpr;
    }

    /**
     * Visits an ImportDeclaration node.
     *
     * @param node The node to visit.
     */
    function visitImportDeclaration(node: ts.ImportDeclaration): ts.VisitResult<ts.Statement> {
        let statements: ts.Statement[] | undefined;
        const namespaceDeclaration = ts.getNamespaceDeclarationNode(node);
        if (moduleKind !== ts.ModuleKind.AMD) {
            if (!node.importClause) {
                // import "mod";
                return ts.setOriginalNode(ts.setTextRange(factory.createExpressionStatement(createRequireCall(node)), node), node);
            }
            else {
                const variables: ts.VariableDeclaration[] = [];
                if (namespaceDeclaration && !ts.isDefaultImport(node)) {
                    // import * as n from "mod";
                    variables.push(
                        factory.createVariableDeclaration(
                            factory.cloneNode(namespaceDeclaration.name),
                            /*exclamationToken*/ undefined,
                            /*type*/ undefined,
                            getHelperExpressionForImport(node, createRequireCall(node))
                        )
                    );
                }
                else {
                    // import d from "mod";
                    // import { x, y } from "mod";
                    // import d, { x, y } from "mod";
                    // import d, * as n from "mod";
                    variables.push(
                        factory.createVariableDeclaration(
                            factory.getGeneratedNameForNode(node),
                            /*exclamationToken*/ undefined,
                            /*type*/ undefined,
                            getHelperExpressionForImport(node, createRequireCall(node))
                        )
                    );

                    if (namespaceDeclaration && ts.isDefaultImport(node)) {
                        variables.push(
                            factory.createVariableDeclaration(
                                factory.cloneNode(namespaceDeclaration.name),
                                /*exclamationToken*/ undefined,
                                /*type*/ undefined,
                                factory.getGeneratedNameForNode(node)
                            )
                        );
                    }
                }

                statements = ts.append(statements,
                    ts.setOriginalNode(
                        ts.setTextRange(
                            factory.createVariableStatement(
                                /*modifiers*/ undefined,
                                factory.createVariableDeclarationList(
                                    variables,
                                    languageVersion >= ts.ScriptTarget.ES2015 ? ts.NodeFlags.Const : ts.NodeFlags.None
                                )
                            ),
                            /*location*/ node),
                        /*original*/ node
                    )
                );
            }
        }
        else if (namespaceDeclaration && ts.isDefaultImport(node)) {
            // import d, * as n from "mod";
            statements = ts.append(statements,
                factory.createVariableStatement(
                    /*modifiers*/ undefined,
                    factory.createVariableDeclarationList(
                        [
                            ts.setOriginalNode(
                                ts.setTextRange(
                                    factory.createVariableDeclaration(
                                        factory.cloneNode(namespaceDeclaration.name),
                                        /*exclamationToken*/ undefined,
                                        /*type*/ undefined,
                                        factory.getGeneratedNameForNode(node)
                                    ),
                                    /*location*/ node),
                                /*original*/ node
                            )
                        ],
                        languageVersion >= ts.ScriptTarget.ES2015 ? ts.NodeFlags.Const : ts.NodeFlags.None
                    )
                )
            );
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

    /**
     * Creates a `require()` call to import an external module.
     *
     * @param importNode The declararation to import.
     */
    function createRequireCall(importNode: ts.ImportDeclaration | ts.ImportEqualsDeclaration | ts.ExportDeclaration) {
        const moduleName = ts.getExternalModuleNameLiteral(factory, importNode, currentSourceFile, host, resolver, compilerOptions);
        const args: ts.Expression[] = [];
        if (moduleName) {
            args.push(moduleName);
        }

        return factory.createCallExpression(factory.createIdentifier("require"), /*typeArguments*/ undefined, args);
    }

    /**
     * Visits an ImportEqualsDeclaration node.
     *
     * @param node The node to visit.
     */
    function visitImportEqualsDeclaration(node: ts.ImportEqualsDeclaration): ts.VisitResult<ts.Statement> {
        ts.Debug.assert(ts.isExternalModuleImportEqualsDeclaration(node), "import= for internal module references should be handled in an earlier transformer.");

        let statements: ts.Statement[] | undefined;
        if (moduleKind !== ts.ModuleKind.AMD) {
            if (ts.hasSyntacticModifier(node, ts.ModifierFlags.Export)) {
                statements = ts.append(statements,
                    ts.setOriginalNode(
                        ts.setTextRange(
                            factory.createExpressionStatement(
                                createExportExpression(
                                    node.name,
                                    createRequireCall(node)
                                )
                            ),
                            node),
                        node
                    )
                );
            }
            else {
                statements = ts.append(statements,
                    ts.setOriginalNode(
                        ts.setTextRange(
                            factory.createVariableStatement(
                                /*modifiers*/ undefined,
                                factory.createVariableDeclarationList(
                                    [
                                        factory.createVariableDeclaration(
                                            factory.cloneNode(node.name),
                                            /*exclamationToken*/ undefined,
                                            /*type*/ undefined,
                                            createRequireCall(node)
                                        )
                                    ],
                                    /*flags*/ languageVersion >= ts.ScriptTarget.ES2015 ? ts.NodeFlags.Const : ts.NodeFlags.None
                                )
                            ),
                            node),
                        node
                    )
                );
            }
        }
        else {
            if (ts.hasSyntacticModifier(node, ts.ModifierFlags.Export)) {
                statements = ts.append(statements,
                    ts.setOriginalNode(
                        ts.setTextRange(
                            factory.createExpressionStatement(
                                createExportExpression(factory.getExportName(node), factory.getLocalName(node))
                            ),
                            node),
                        node
                    )
                );
            }
        }

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
     * Visits an ExportDeclaration node.
     *
     * @param The node to visit.
     */
    function visitExportDeclaration(node: ts.ExportDeclaration): ts.VisitResult<ts.Statement> {
        if (!node.moduleSpecifier) {
            // Elide export declarations with no module specifier as they are handled
            // elsewhere.
            return undefined;
        }

        const generatedName = factory.getGeneratedNameForNode(node);

        if (node.exportClause && ts.isNamedExports(node.exportClause)) {
            const statements: ts.Statement[] = [];
            // export { x, y } from "mod";
            if (moduleKind !== ts.ModuleKind.AMD) {
                statements.push(
                    ts.setOriginalNode(
                        ts.setTextRange(
                            factory.createVariableStatement(
                                /*modifiers*/ undefined,
                                factory.createVariableDeclarationList([
                                    factory.createVariableDeclaration(
                                        generatedName,
                                        /*exclamationToken*/ undefined,
                                        /*type*/ undefined,
                                        createRequireCall(node)
                                    )
                                ])
                            ),
                            /*location*/ node),
                        /* original */ node
                    )
                );
            }
            for (const specifier of node.exportClause.elements) {
                if (languageVersion === ts.ScriptTarget.ES3) {
                    statements.push(
                        ts.setOriginalNode(
                            ts.setTextRange(
                                factory.createExpressionStatement(
                                    emitHelpers().createCreateBindingHelper(generatedName, factory.createStringLiteralFromNode(specifier.propertyName || specifier.name), specifier.propertyName ? factory.createStringLiteralFromNode(specifier.name) : undefined)
                                ),
                                specifier),
                            specifier
                        )
                    );
                }
                else {
                    const exportNeedsImportDefault =
                        !!ts.getESModuleInterop(compilerOptions) &&
                        !(ts.getEmitFlags(node) & ts.EmitFlags.NeverApplyImportHelper) &&
                        ts.idText(specifier.propertyName || specifier.name) === "default";
                    const exportedValue = factory.createPropertyAccessExpression(
                        exportNeedsImportDefault ? emitHelpers().createImportDefaultHelper(generatedName) : generatedName,
                        specifier.propertyName || specifier.name);
                    statements.push(
                        ts.setOriginalNode(
                            ts.setTextRange(
                                factory.createExpressionStatement(
                                    createExportExpression(factory.getExportName(specifier), exportedValue, /* location */ undefined, /* liveBinding */ true)
                                ),
                                specifier),
                            specifier
                        )
                    );
                }
            }

            return ts.singleOrMany(statements);
        }
        else if (node.exportClause) {
            const statements: ts.Statement[] = [];
            // export * as ns from "mod";
            // export * as default from "mod";
            statements.push(
                ts.setOriginalNode(
                    ts.setTextRange(
                        factory.createExpressionStatement(
                            createExportExpression(
                                factory.cloneNode(node.exportClause.name),
                                getHelperExpressionForExport(node, moduleKind !== ts.ModuleKind.AMD ?
                                    createRequireCall(node) :
                                    ts.isExportNamespaceAsDefaultDeclaration(node) ? generatedName :
                                        factory.createIdentifier(ts.idText(node.exportClause.name)))
                            )
                        ),
                        node
                    ),
                    node
                )
            );

            return ts.singleOrMany(statements);
        }
        else {
            // export * from "mod";
            return ts.setOriginalNode(
                ts.setTextRange(
                    factory.createExpressionStatement(
                        emitHelpers().createExportStarHelper(moduleKind !== ts.ModuleKind.AMD ? createRequireCall(node) : generatedName)
                    ),
                    node),
                node
            );
        }
    }

    /**
     * Visits an ExportAssignment node.
     *
     * @param node The node to visit.
     */
    function visitExportAssignment(node: ts.ExportAssignment): ts.VisitResult<ts.Statement> {
        if (node.isExportEquals) {
            return undefined;
        }

        let statements: ts.Statement[] | undefined;
        const original = node.original;
        if (original && hasAssociatedEndOfDeclarationMarker(original)) {
            // Defer exports until we encounter an EndOfDeclarationMarker node
            const id = ts.getOriginalNodeId(node);
            deferredExports[id] = appendExportStatement(deferredExports[id], factory.createIdentifier("default"), ts.visitNode(node.expression, visitor), /*location*/ node, /*allowComments*/ true);
        }
        else {
            statements = appendExportStatement(statements, factory.createIdentifier("default"), ts.visitNode(node.expression, visitor), /*location*/ node, /*allowComments*/ true);
        }

        return ts.singleOrMany(statements);
    }

    /**
     * Visits a FunctionDeclaration node.
     *
     * @param node The node to visit.
     */
    function visitFunctionDeclaration(node: ts.FunctionDeclaration): ts.VisitResult<ts.Statement> {
        let statements: ts.Statement[] | undefined;
        if (ts.hasSyntacticModifier(node, ts.ModifierFlags.Export)) {
            statements = ts.append(statements,
                ts.setOriginalNode(
                    ts.setTextRange(
                        factory.createFunctionDeclaration(
                            ts.visitNodes(node.modifiers, modifierVisitor, ts.isModifier),
                            node.asteriskToken,
                            factory.getDeclarationName(node, /*allowComments*/ true, /*allowSourceMaps*/ true),
                            /*typeParameters*/ undefined,
                            ts.visitNodes(node.parameters, visitor),
                            /*type*/ undefined,
                            ts.visitEachChild(node.body, visitor, context)
                        ),
                        /*location*/ node
                    ),
                    /*original*/ node
                )
            );
        }
        else {
            statements = ts.append(statements, ts.visitEachChild(node, visitor, context));
        }

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
     * Visits a ClassDeclaration node.
     *
     * @param node The node to visit.
     */
    function visitClassDeclaration(node: ts.ClassDeclaration): ts.VisitResult<ts.Statement> {
        let statements: ts.Statement[] | undefined;
        if (ts.hasSyntacticModifier(node, ts.ModifierFlags.Export)) {
            statements = ts.append(statements,
                ts.setOriginalNode(
                    ts.setTextRange(
                        factory.createClassDeclaration(
                            ts.visitNodes(node.modifiers, modifierVisitor, ts.isModifierLike),
                            factory.getDeclarationName(node, /*allowComments*/ true, /*allowSourceMaps*/ true),
                            /*typeParameters*/ undefined,
                            ts.visitNodes(node.heritageClauses, visitor),
                            ts.visitNodes(node.members, visitor)
                        ),
                        node
                    ),
                    node
                )
            );
        }
        else {
            statements = ts.append(statements, ts.visitEachChild(node, visitor, context));
        }

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
     * Visits a VariableStatement node.
     *
     * @param node The node to visit.
     */
    function visitVariableStatement(node: ts.VariableStatement): ts.VisitResult<ts.Statement> {
        let statements: ts.Statement[] | undefined;
        let variables: ts.VariableDeclaration[] | undefined;
        let expressions: ts.Expression[] | undefined;

        if (ts.hasSyntacticModifier(node, ts.ModifierFlags.Export)) {
            let modifiers: ts.NodeArray<ts.Modifier> | undefined;
            let removeCommentsOnExpressions = false;

            // If we're exporting these variables, then these just become assignments to 'exports.x'.
            for (const variable of node.declarationList.declarations) {
                if (ts.isIdentifier(variable.name) && ts.isLocalName(variable.name)) {
                    if (!modifiers) {
                        modifiers = ts.visitNodes(node.modifiers, modifierVisitor, ts.isModifier);
                    }

                    variables = ts.append(variables, variable);
                }
                else if (variable.initializer) {
                    if (!ts.isBindingPattern(variable.name) && (ts.isArrowFunction(variable.initializer) || ts.isFunctionExpression(variable.initializer) || ts.isClassExpression(variable.initializer))) {
                        const expression = factory.createAssignment(
                            ts.setTextRange(
                                factory.createPropertyAccessExpression(
                                    factory.createIdentifier("exports"),
                                    variable.name
                                ),
                                /*location*/ variable.name
                            ),
                            factory.createIdentifier(ts.getTextOfIdentifierOrLiteral(variable.name))
                        );
                        const updatedVariable = factory.createVariableDeclaration(
                            variable.name,
                            variable.exclamationToken,
                            variable.type,
                            ts.visitNode(variable.initializer, visitor)
                        );

                        variables = ts.append(variables, updatedVariable);
                        expressions = ts.append(expressions, expression);
                        removeCommentsOnExpressions = true;
                    }
                    else {
                        expressions = ts.append(expressions, transformInitializedVariable(variable as ts.InitializedVariableDeclaration));
                    }
                }
            }

            if (variables) {
                statements = ts.append(statements, factory.updateVariableStatement(node, modifiers, factory.updateVariableDeclarationList(node.declarationList, variables)));
            }

            if (expressions) {
                const statement = ts.setOriginalNode(ts.setTextRange(factory.createExpressionStatement(factory.inlineExpressions(expressions)), node), node);
                if (removeCommentsOnExpressions) {
                    ts.removeAllComments(statement);
                }
                statements = ts.append(statements, statement);
            }
        }
        else {
            statements = ts.append(statements, ts.visitEachChild(node, visitor, context));
        }

        if (hasAssociatedEndOfDeclarationMarker(node)) {
            // Defer exports until we encounter an EndOfDeclarationMarker node
            const id = ts.getOriginalNodeId(node);
            deferredExports[id] = appendExportsOfVariableStatement(deferredExports[id], node);
        }
        else {
            statements = appendExportsOfVariableStatement(statements, node);
        }

        return ts.singleOrMany(statements);
    }

    function createAllExportExpressions(name: ts.Identifier, value: ts.Expression, location?: ts.TextRange) {
        const exportedNames = getExports(name);
        if (exportedNames) {
            // For each additional export of the declaration, apply an export assignment.
            let expression: ts.Expression = ts.isExportName(name) ? value : factory.createAssignment(name, value);
            for (const exportName of exportedNames) {
                // Mark the node to prevent triggering substitution.
                ts.setEmitFlags(expression, ts.EmitFlags.NoSubstitution);
                expression = createExportExpression(exportName, expression, /*location*/ location);
            }

            return expression;
        }
        return factory.createAssignment(name, value);
    }

    /**
     * Transforms an exported variable with an initializer into an expression.
     *
     * @param node The node to transform.
     */
    function transformInitializedVariable(node: ts.InitializedVariableDeclaration): ts.Expression {
        if (ts.isBindingPattern(node.name)) {
            return ts.flattenDestructuringAssignment(
                ts.visitNode(node, visitor),
                /*visitor*/ undefined,
                context,
                ts.FlattenLevel.All,
                /*needsValue*/ false,
                createAllExportExpressions
            );
        }
        else {
            return factory.createAssignment(
                ts.setTextRange(
                    factory.createPropertyAccessExpression(
                        factory.createIdentifier("exports"),
                        node.name
                    ),
                    /*location*/ node.name
                ),
                node.initializer ? ts.visitNode(node.initializer, visitor) : factory.createVoidZero()
            );
        }
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
        // To balance the declaration, add the exports of the elided variable
        // statement.
        if (hasAssociatedEndOfDeclarationMarker(node) && node.original!.kind === ts.SyntaxKind.VariableStatement) {
            const id = ts.getOriginalNodeId(node);
            deferredExports[id] = appendExportsOfVariableStatement(deferredExports[id], node.original as ts.VariableStatement);
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
    function appendExportsOfImportDeclaration(statements: ts.Statement[] | undefined, decl: ts.ImportDeclaration): ts.Statement[] | undefined {
        if (currentModuleInfo.exportEquals) {
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
                        statements = appendExportsOfDeclaration(statements, importBinding, /* liveBinding */ true);
                    }

                    break;
            }
        }

        return statements;
    }

    /**
     * Appends the exports of an ImportEqualsDeclaration to a statement list, returning the
     * statement list.
     *
     * @param statements A statement list to which the down-level export statements are to be
     * appended. If `statements` is `undefined`, a new array is allocated if statements are
     * appended.
     * @param decl The declaration whose exports are to be recorded.
     */
    function appendExportsOfImportEqualsDeclaration(statements: ts.Statement[] | undefined, decl: ts.ImportEqualsDeclaration): ts.Statement[] | undefined {
        if (currentModuleInfo.exportEquals) {
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
     */
    function appendExportsOfVariableStatement(statements: ts.Statement[] | undefined, node: ts.VariableStatement): ts.Statement[] | undefined {
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
     * @param statements A statement list to which the down-level export statements are to be
     * appended. If `statements` is `undefined`, a new array is allocated if statements are
     * appended.
     * @param decl The declaration whose exports are to be recorded.
     */
    function appendExportsOfBindingElement(statements: ts.Statement[] | undefined, decl: ts.VariableDeclaration | ts.BindingElement): ts.Statement[] | undefined {
        if (currentModuleInfo.exportEquals) {
            return statements;
        }

        if (ts.isBindingPattern(decl.name)) {
            for (const element of decl.name.elements) {
                if (!ts.isOmittedExpression(element)) {
                    statements = appendExportsOfBindingElement(statements, element);
                }
            }
        }
        else if (!ts.isGeneratedIdentifier(decl.name)) {
            statements = appendExportsOfDeclaration(statements, decl);
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
        if (currentModuleInfo.exportEquals) {
            return statements;
        }

        if (ts.hasSyntacticModifier(decl, ts.ModifierFlags.Export)) {
            const exportName = ts.hasSyntacticModifier(decl, ts.ModifierFlags.Default) ? factory.createIdentifier("default") : factory.getDeclarationName(decl);
            statements = appendExportStatement(statements, exportName, factory.getLocalName(decl), /*location*/ decl);
        }

        if (decl.name) {
            statements = appendExportsOfDeclaration(statements, decl);
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
     */
    function appendExportsOfDeclaration(statements: ts.Statement[] | undefined, decl: ts.Declaration, liveBinding?: boolean): ts.Statement[] | undefined {
        const name = factory.getDeclarationName(decl);
        const exportSpecifiers = currentModuleInfo.exportSpecifiers.get(ts.idText(name));
        if (exportSpecifiers) {
            for (const exportSpecifier of exportSpecifiers) {
                statements = appendExportStatement(statements, exportSpecifier.name, name, /*location*/ exportSpecifier.name, /* allowComments */ undefined, liveBinding);
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
     * @param location The location to use for source maps and comments for the export.
     * @param allowComments Whether to allow comments on the export.
     */
    function appendExportStatement(statements: ts.Statement[] | undefined, exportName: ts.Identifier, expression: ts.Expression, location?: ts.TextRange, allowComments?: boolean, liveBinding?: boolean): ts.Statement[] | undefined {
        statements = ts.append(statements, createExportStatement(exportName, expression, location, allowComments, liveBinding));
        return statements;
    }

    function createUnderscoreUnderscoreESModule() {
        let statement: ts.Statement;
        if (languageVersion === ts.ScriptTarget.ES3) {
            statement = factory.createExpressionStatement(
                createExportExpression(
                    factory.createIdentifier("__esModule"),
                    factory.createTrue()
                )
            );
        }
        else {
            statement = factory.createExpressionStatement(
                factory.createCallExpression(
                    factory.createPropertyAccessExpression(factory.createIdentifier("Object"), "defineProperty"),
                    /*typeArguments*/ undefined,
                    [
                        factory.createIdentifier("exports"),
                        factory.createStringLiteral("__esModule"),
                        factory.createObjectLiteralExpression([
                            factory.createPropertyAssignment("value", factory.createTrue())
                        ])
                    ]
                )
            );
        }
        ts.setEmitFlags(statement, ts.EmitFlags.CustomPrologue);
        return statement;
    }

    /**
     * Creates a call to the current file's export function to export a value.
     *
     * @param name The bound name of the export.
     * @param value The exported value.
     * @param location The location to use for source maps and comments for the export.
     * @param allowComments An optional value indicating whether to emit comments for the statement.
     */
    function createExportStatement(name: ts.Identifier, value: ts.Expression, location?: ts.TextRange, allowComments?: boolean, liveBinding?: boolean) {
        const statement = ts.setTextRange(factory.createExpressionStatement(createExportExpression(name, value, /* location */ undefined, liveBinding)), location);
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
     * @param location The location to use for source maps and comments for the export.
     */
    function createExportExpression(name: ts.Identifier, value: ts.Expression, location?: ts.TextRange, liveBinding?: boolean) {
        return ts.setTextRange(
            liveBinding && languageVersion !== ts.ScriptTarget.ES3 ? factory.createCallExpression(
                factory.createPropertyAccessExpression(
                    factory.createIdentifier("Object"),
                    "defineProperty"
                ),
                /*typeArguments*/ undefined,
                [
                    factory.createIdentifier("exports"),
                    factory.createStringLiteralFromNode(name),
                    factory.createObjectLiteralExpression([
                        factory.createPropertyAssignment("enumerable", factory.createTrue()),
                        factory.createPropertyAssignment("get", factory.createFunctionExpression(
                            /*modifiers*/ undefined,
                            /*asteriskToken*/ undefined,
                            /*name*/ undefined,
                            /*typeParameters*/ undefined,
                            /*parameters*/ [],
                            /*type*/ undefined,
                            factory.createBlock([factory.createReturnStatement(value)])
                        ))
                    ])
                ]
            ) : factory.createAssignment(
                factory.createPropertyAccessExpression(
                    factory.createIdentifier("exports"),
                    factory.cloneNode(name)
                ),
                value
            ),
            location
        );
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
        // Elide module-specific modifiers.
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
     * @param emit A callback used to emit the node in the printer.
     */
    function onEmitNode(hint: ts.EmitHint, node: ts.Node, emitCallback: (hint: ts.EmitHint, node: ts.Node) => void): void {
        if (node.kind === ts.SyntaxKind.SourceFile) {
            currentSourceFile = node as ts.SourceFile;
            currentModuleInfo = moduleInfoMap[ts.getOriginalNodeId(currentSourceFile)];

            previousOnEmitNode(hint, node, emitCallback);

            currentSourceFile = undefined!;
            currentModuleInfo = undefined!;
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
        if (node.id && noSubstitution[node.id]) {
            return node;
        }

        if (hint === ts.EmitHint.Expression) {
            return substituteExpression(node as ts.Expression);
        }
        else if (ts.isShorthandPropertyAssignment(node)) {
            return substituteShorthandPropertyAssignment(node);
        }

        return node;
    }

    /**
     * Substitution for a ShorthandPropertyAssignment whose declaration name is an imported
     * or exported symbol.
     *
     * @param node The node to substitute.
     */
    function substituteShorthandPropertyAssignment(node: ts.ShorthandPropertyAssignment): ts.ObjectLiteralElementLike {
        const name = node.name;
        const exportedOrImportedName = substituteExpressionIdentifier(name);
        if (exportedOrImportedName !== name) {
            // A shorthand property with an assignment initializer is probably part of a
            // destructuring assignment
            if (node.objectAssignmentInitializer) {
                const initializer = factory.createAssignment(exportedOrImportedName, node.objectAssignmentInitializer);
                return ts.setTextRange(factory.createPropertyAssignment(name, initializer), node);
            }
            return ts.setTextRange(factory.createPropertyAssignment(name, exportedOrImportedName), node);
        }
        return node;
    }

    /**
     * Substitution for an Expression that may contain an imported or exported symbol.
     *
     * @param node The node to substitute.
     */
    function substituteExpression(node: ts.Expression) {
        switch (node.kind) {
            case ts.SyntaxKind.Identifier:
                return substituteExpressionIdentifier(node as ts.Identifier);
            case ts.SyntaxKind.CallExpression:
                return substituteCallExpression(node as ts.CallExpression);
            case ts.SyntaxKind.TaggedTemplateExpression:
                return substituteTaggedTemplateExpression(node as ts.TaggedTemplateExpression);
            case ts.SyntaxKind.BinaryExpression:
                return substituteBinaryExpression(node as ts.BinaryExpression);
        }

        return node;
    }

    function substituteCallExpression(node: ts.CallExpression) {
        if (ts.isIdentifier(node.expression)) {
            const expression = substituteExpressionIdentifier(node.expression);
            noSubstitution[ts.getNodeId(expression)] = true;
            if (!ts.isIdentifier(expression) && !(ts.getEmitFlags(node.expression) & ts.EmitFlags.HelperName)) {
                return ts.addEmitFlags(
                    factory.updateCallExpression(node,
                        expression,
                        /*typeArguments*/ undefined,
                        node.arguments
                    ),
                    ts.EmitFlags.IndirectCall
                );

            }
        }
        return node;
    }

    function substituteTaggedTemplateExpression(node: ts.TaggedTemplateExpression) {
        if (ts.isIdentifier(node.tag)) {
            const tag = substituteExpressionIdentifier(node.tag);
            noSubstitution[ts.getNodeId(tag)] = true;
            if (!ts.isIdentifier(tag) && !(ts.getEmitFlags(node.tag) & ts.EmitFlags.HelperName)) {
                return ts.addEmitFlags(
                    factory.updateTaggedTemplateExpression(node,
                        tag,
                        /*typeArguments*/ undefined,
                        node.template
                    ),
                    ts.EmitFlags.IndirectCall
                );
            }
        }
        return node;
    }

    /**
     * Substitution for an Identifier expression that may contain an imported or exported
     * symbol.
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
        else if (!(ts.isGeneratedIdentifier(node) && !(node.autoGenerateFlags & ts.GeneratedIdentifierFlags.AllowNameSubstitution)) && !ts.isLocalName(node)) {
            const exportContainer = resolver.getReferencedExportContainer(node, ts.isExportName(node));
            if (exportContainer && exportContainer.kind === ts.SyntaxKind.SourceFile) {
                return ts.setTextRange(
                    factory.createPropertyAccessExpression(
                        factory.createIdentifier("exports"),
                        factory.cloneNode(node)
                    ),
                    /*location*/ node
                );
            }
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
                    const name = importDeclaration.propertyName || importDeclaration.name;
                    return ts.setTextRange(
                        factory.createPropertyAccessExpression(
                            factory.getGeneratedNameForNode(importDeclaration.parent?.parent?.parent || importDeclaration),
                            factory.cloneNode(name)
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
                    // Mark the node to prevent triggering this rule again.
                    noSubstitution[ts.getNodeId(expression)] = true;
                    expression = createExportExpression(exportName, expression, /*location*/ node);
                }

                return expression;
            }
        }

        return node;
    }

    /**
     * Gets the additional exports of a name.
     *
     * @param name The name.
     */
    function getExports(name: ts.Identifier): ts.Identifier[] | undefined {
        if (!ts.isGeneratedIdentifier(name)) {
            const valueDeclaration = resolver.getReferencedImportDeclaration(name)
                || resolver.getReferencedValueDeclaration(name);
            if (valueDeclaration) {
                return currentModuleInfo
                    && currentModuleInfo.exportedBindings[ts.getOriginalNodeId(valueDeclaration)];
            }
        }
    }
}

// emit helper for dynamic import
const dynamicImportUMDHelper: ts.EmitHelper = {
    name: "typescript:dynamicimport-sync-require",
    scoped: true,
    text: `
            var __syncRequire = typeof module === "object" && typeof module.exports === "object";`
};
