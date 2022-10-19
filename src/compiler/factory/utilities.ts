/* @internal */
namespace ts {

// Compound nodes

export function createEmptyExports(factory: ts.NodeFactory) {
    return factory.createExportDeclaration(/*modifiers*/ undefined, /*isTypeOnly*/ false, factory.createNamedExports([]), /*moduleSpecifier*/ undefined);
}

export function createMemberAccessForPropertyName(factory: ts.NodeFactory, target: ts.Expression, memberName: ts.PropertyName, location?: ts.TextRange): ts.MemberExpression {
    if (ts.isComputedPropertyName(memberName)) {
         return ts.setTextRange(factory.createElementAccessExpression(target, memberName.expression), location);
    }
    else {
        const expression = ts.setTextRange(
            ts.isMemberName(memberName)
                ? factory.createPropertyAccessExpression(target, memberName)
                : factory.createElementAccessExpression(target, memberName),
            memberName
        );
        ts.getOrCreateEmitNode(expression).flags |= ts.EmitFlags.NoNestedSourceMaps;
        return expression;
    }
}

function createReactNamespace(reactNamespace: string, parent: ts.JsxOpeningLikeElement | ts.JsxOpeningFragment) {
    // To ensure the emit resolver can properly resolve the namespace, we need to
    // treat this identifier as if it were a source tree node by clearing the `Synthesized`
    // flag and setting a parent node.
    const react = ts.parseNodeFactory.createIdentifier(reactNamespace || "React");
    // Set the parent that is in parse tree
    // this makes sure that parent chain is intact for checker to traverse complete scope tree
    ts.setParent(react, ts.getParseTreeNode(parent));
    return react;
}

function createJsxFactoryExpressionFromEntityName(factory: ts.NodeFactory, jsxFactory: ts.EntityName, parent: ts.JsxOpeningLikeElement | ts.JsxOpeningFragment): ts.Expression {
    if (ts.isQualifiedName(jsxFactory)) {
        const left = createJsxFactoryExpressionFromEntityName(factory, jsxFactory.left, parent);
        const right = factory.createIdentifier(ts.idText(jsxFactory.right)) as ts.Mutable<ts.Identifier>;
        right.escapedText = jsxFactory.right.escapedText;
        return factory.createPropertyAccessExpression(left, right);
    }
    else {
        return createReactNamespace(ts.idText(jsxFactory), parent);
    }
}

export function createJsxFactoryExpression(factory: ts.NodeFactory, jsxFactoryEntity: ts.EntityName | undefined, reactNamespace: string, parent: ts.JsxOpeningLikeElement | ts.JsxOpeningFragment): ts.Expression {
    return jsxFactoryEntity ?
        createJsxFactoryExpressionFromEntityName(factory, jsxFactoryEntity, parent) :
        factory.createPropertyAccessExpression(
            createReactNamespace(reactNamespace, parent),
            "createElement"
        );
}

function createJsxFragmentFactoryExpression(factory: ts.NodeFactory, jsxFragmentFactoryEntity: ts.EntityName | undefined, reactNamespace: string, parent: ts.JsxOpeningLikeElement | ts.JsxOpeningFragment): ts.Expression {
    return jsxFragmentFactoryEntity ?
        createJsxFactoryExpressionFromEntityName(factory, jsxFragmentFactoryEntity, parent) :
        factory.createPropertyAccessExpression(
            createReactNamespace(reactNamespace, parent),
            "Fragment"
        );
}

export function createExpressionForJsxElement(factory: ts.NodeFactory, callee: ts.Expression, tagName: ts.Expression, props: ts.Expression | undefined, children: readonly ts.Expression[] | undefined, location: ts.TextRange): ts.LeftHandSideExpression {
    const argumentsList = [tagName];
    if (props) {
        argumentsList.push(props);
    }

    if (children && children.length > 0) {
        if (!props) {
            argumentsList.push(factory.createNull());
        }

        if (children.length > 1) {
            for (const child of children) {
                startOnNewLine(child);
                argumentsList.push(child);
            }
        }
        else {
            argumentsList.push(children[0]);
        }
    }

    return ts.setTextRange(
        factory.createCallExpression(
            callee,
            /*typeArguments*/ undefined,
            argumentsList
        ),
        location
    );
}

export function createExpressionForJsxFragment(factory: ts.NodeFactory, jsxFactoryEntity: ts.EntityName | undefined, jsxFragmentFactoryEntity: ts.EntityName | undefined, reactNamespace: string, children: readonly ts.Expression[], parentElement: ts.JsxOpeningFragment, location: ts.TextRange): ts.LeftHandSideExpression {
    const tagName = createJsxFragmentFactoryExpression(factory, jsxFragmentFactoryEntity, reactNamespace, parentElement);
    const argumentsList = [tagName, factory.createNull()];

    if (children && children.length > 0) {
        if (children.length > 1) {
            for (const child of children) {
                startOnNewLine(child);
                argumentsList.push(child);
            }
        }
        else {
            argumentsList.push(children[0]);
        }
    }

    return ts.setTextRange(
        factory.createCallExpression(
            createJsxFactoryExpression(factory, jsxFactoryEntity, reactNamespace, parentElement),
            /*typeArguments*/ undefined,
            argumentsList
        ),
        location
    );
}

// Utilities

export function createForOfBindingStatement(factory: ts.NodeFactory, node: ts.ForInitializer, boundValue: ts.Expression): ts.Statement {
    if (ts.isVariableDeclarationList(node)) {
        const firstDeclaration = ts.first(node.declarations);
        const updatedDeclaration = factory.updateVariableDeclaration(
            firstDeclaration,
            firstDeclaration.name,
            /*exclamationToken*/ undefined,
            /*type*/ undefined,
            boundValue
        );
        return ts.setTextRange(
            factory.createVariableStatement(
                /*modifiers*/ undefined,
                factory.updateVariableDeclarationList(node, [updatedDeclaration])
            ),
            /*location*/ node
        );
    }
    else {
        const updatedExpression = ts.setTextRange(factory.createAssignment(node, boundValue), /*location*/ node);
        return ts.setTextRange(factory.createExpressionStatement(updatedExpression), /*location*/ node);
    }
}

export function insertLeadingStatement(factory: ts.NodeFactory, dest: ts.Statement, source: ts.Statement) {
    if (ts.isBlock(dest)) {
        return factory.updateBlock(dest, ts.setTextRange(factory.createNodeArray([source, ...dest.statements]), dest.statements));
    }
    else {
        return factory.createBlock(factory.createNodeArray([dest, source]), /*multiLine*/ true);
    }
}

export function createExpressionFromEntityName(factory: ts.NodeFactory, node: ts.EntityName | ts.Expression): ts.Expression {
    if (ts.isQualifiedName(node)) {
        const left = createExpressionFromEntityName(factory, node.left);
        // TODO(rbuckton): Does this need to be parented?
        const right = ts.setParent(ts.setTextRange(factory.cloneNode(node.right), node.right), node.right.parent);
        return ts.setTextRange(factory.createPropertyAccessExpression(left, right), node);
    }
    else {
        // TODO(rbuckton): Does this need to be parented?
        return ts.setParent(ts.setTextRange(factory.cloneNode(node), node), node.parent);
    }
}

export function createExpressionForPropertyName(factory: ts.NodeFactory, memberName: Exclude<ts.PropertyName, ts.PrivateIdentifier>): ts.Expression {
    if (ts.isIdentifier(memberName)) {
        return factory.createStringLiteralFromNode(memberName);
    }
    else if (ts.isComputedPropertyName(memberName)) {
        // TODO(rbuckton): Does this need to be parented?
        return ts.setParent(ts.setTextRange(factory.cloneNode(memberName.expression), memberName.expression), memberName.expression.parent);
    }
    else {
        // TODO(rbuckton): Does this need to be parented?
        return ts.setParent(ts.setTextRange(factory.cloneNode(memberName), memberName), memberName.parent);
    }
}

function createExpressionForAccessorDeclaration(factory: ts.NodeFactory, properties: ts.NodeArray<ts.Declaration>, property: ts.AccessorDeclaration & { readonly name: Exclude<ts.PropertyName, ts.PrivateIdentifier>; }, receiver: ts.Expression, multiLine: boolean) {
    const { firstAccessor, getAccessor, setAccessor } = ts.getAllAccessorDeclarations(properties, property);
    if (property === firstAccessor) {
        return ts.setTextRange(
            factory.createObjectDefinePropertyCall(
                receiver,
                createExpressionForPropertyName(factory, property.name),
                factory.createPropertyDescriptor({
                    enumerable: factory.createFalse(),
                    configurable: true,
                    get: getAccessor && ts.setTextRange(
                        ts.setOriginalNode(
                            factory.createFunctionExpression(
                                ts.getModifiers(getAccessor),
                                /*asteriskToken*/ undefined,
                                /*name*/ undefined,
                                /*typeParameters*/ undefined,
                                getAccessor.parameters,
                                /*type*/ undefined,
                                getAccessor.body! // TODO: GH#18217
                            ),
                            getAccessor
                        ),
                        getAccessor
                    ),
                    set: setAccessor && ts.setTextRange(
                        ts.setOriginalNode(
                            factory.createFunctionExpression(
                                ts.getModifiers(setAccessor),
                                /*asteriskToken*/ undefined,
                                /*name*/ undefined,
                                /*typeParameters*/ undefined,
                                setAccessor.parameters,
                                /*type*/ undefined,
                                setAccessor.body! // TODO: GH#18217
                            ),
                            setAccessor
                        ),
                        setAccessor
                    )
                }, !multiLine)
            ),
            firstAccessor
        );
    }

    return undefined;
}

function createExpressionForPropertyAssignment(factory: ts.NodeFactory, property: ts.PropertyAssignment, receiver: ts.Expression) {
    return ts.setOriginalNode(
        ts.setTextRange(
            factory.createAssignment(
                createMemberAccessForPropertyName(factory, receiver, property.name, /*location*/ property.name),
                property.initializer
            ),
            property
        ),
        property
    );
}

function createExpressionForShorthandPropertyAssignment(factory: ts.NodeFactory, property: ts.ShorthandPropertyAssignment, receiver: ts.Expression) {
    return ts.setOriginalNode(
        ts.setTextRange(
            factory.createAssignment(
                createMemberAccessForPropertyName(factory, receiver, property.name, /*location*/ property.name),
                factory.cloneNode(property.name)
            ),
            /*location*/ property
        ),
        /*original*/ property
    );
}

function createExpressionForMethodDeclaration(factory: ts.NodeFactory, method: ts.MethodDeclaration, receiver: ts.Expression) {
    return ts.setOriginalNode(
        ts.setTextRange(
            factory.createAssignment(
                createMemberAccessForPropertyName(factory, receiver, method.name, /*location*/ method.name),
                ts.setOriginalNode(
                    ts.setTextRange(
                        factory.createFunctionExpression(
                            ts.getModifiers(method),
                            method.asteriskToken,
                            /*name*/ undefined,
                            /*typeParameters*/ undefined,
                            method.parameters,
                            /*type*/ undefined,
                            method.body! // TODO: GH#18217
                        ),
                        /*location*/ method
                    ),
                    /*original*/ method
                )
            ),
            /*location*/ method
        ),
        /*original*/ method
    );
}

export function createExpressionForObjectLiteralElementLike(factory: ts.NodeFactory, node: ts.ObjectLiteralExpression, property: ts.ObjectLiteralElementLike, receiver: ts.Expression): ts.Expression | undefined {
    if (property.name && ts.isPrivateIdentifier(property.name)) {
        ts.Debug.failBadSyntaxKind(property.name, "Private identifiers are not allowed in object literals.");
    }
    switch (property.kind) {
        case ts.SyntaxKind.GetAccessor:
        case ts.SyntaxKind.SetAccessor:
            return createExpressionForAccessorDeclaration(factory, node.properties, property as typeof property & { readonly name: Exclude<ts.PropertyName, ts.PrivateIdentifier> }, receiver, !!node.multiLine);
        case ts.SyntaxKind.PropertyAssignment:
            return createExpressionForPropertyAssignment(factory, property, receiver);
        case ts.SyntaxKind.ShorthandPropertyAssignment:
            return createExpressionForShorthandPropertyAssignment(factory, property, receiver);
        case ts.SyntaxKind.MethodDeclaration:
            return createExpressionForMethodDeclaration(factory, property, receiver);
    }
}

/**
 * Expand the read and increment/decrement operations a pre- or post-increment or pre- or post-decrement expression.
 *
 * ```ts
 * // input
 * <expression>++
 * // output (if result is not discarded)
 * var <temp>;
 * (<temp> = <expression>, <resultVariable> = <temp>++, <temp>)
 * // output (if result is discarded)
 * var <temp>;
 * (<temp> = <expression>, <temp>++, <temp>)
 *
 * // input
 * ++<expression>
 * // output (if result is not discarded)
 * var <temp>;
 * (<temp> = <expression>, <resultVariable> = ++<temp>)
 * // output (if result is discarded)
 * var <temp>;
 * (<temp> = <expression>, ++<temp>)
 * ```
 *
 * It is up to the caller to supply a temporary variable for `<resultVariable>` if one is needed.
 * The temporary variable `<temp>` is injected so that `++` and `--` work uniformly with `number` and `bigint`.
 * The result of the expression is always the final result of incrementing or decrementing the expression, so that it can be used for storage.
 *
 * @param factory {@link NodeFactory} used to create the expanded representation.
 * @param node The original prefix or postfix unary node.
 * @param expression The expression to use as the value to increment or decrement
 * @param resultVariable A temporary variable in which to store the result. Pass `undefined` if the result is discarded, or if the value of `<temp>` is the expected result.
 */
export function expandPreOrPostfixIncrementOrDecrementExpression(factory: ts.NodeFactory, node: ts.PrefixUnaryExpression | ts.PostfixUnaryExpression, expression: ts.Expression, recordTempVariable: (node: ts.Identifier) => void, resultVariable: ts.Identifier | undefined) {
    const operator = node.operator;
    ts.Debug.assert(operator === ts.SyntaxKind.PlusPlusToken || operator === ts.SyntaxKind.MinusMinusToken, "Expected 'node' to be a pre- or post-increment or pre- or post-decrement expression");

    const temp = factory.createTempVariable(recordTempVariable);
    expression = factory.createAssignment(temp, expression);
    ts.setTextRange(expression, node.operand);

    let operation: ts.Expression = ts.isPrefixUnaryExpression(node) ?
        factory.createPrefixUnaryExpression(operator, temp) :
        factory.createPostfixUnaryExpression(temp, operator);
    ts.setTextRange(operation, node);

    if (resultVariable) {
        operation = factory.createAssignment(resultVariable, operation);
        ts.setTextRange(operation, node);
    }

    expression = factory.createComma(expression, operation);
    ts.setTextRange(expression, node);

    if (ts.isPostfixUnaryExpression(node)) {
        expression = factory.createComma(expression, temp);
        ts.setTextRange(expression, node);
    }

    return expression;
}

/**
 * Gets whether an identifier should only be referred to by its internal name.
 */
export function isInternalName(node: ts.Identifier) {
    return (ts.getEmitFlags(node) & ts.EmitFlags.InternalName) !== 0;
}

/**
 * Gets whether an identifier should only be referred to by its local name.
 */
export function isLocalName(node: ts.Identifier) {
    return (ts.getEmitFlags(node) & ts.EmitFlags.LocalName) !== 0;
}

/**
 * Gets whether an identifier should only be referred to by its export representation if the
 * name points to an exported symbol.
 */
export function isExportName(node: ts.Identifier) {
    return (ts.getEmitFlags(node) & ts.EmitFlags.ExportName) !== 0;
}

function isUseStrictPrologue(node: ts.ExpressionStatement): boolean {
    return ts.isStringLiteral(node.expression) && node.expression.text === "use strict";
}

export function findUseStrictPrologue(statements: readonly ts.Statement[]): ts.Statement | undefined {
    for (const statement of statements) {
        if (ts.isPrologueDirective(statement)) {
            if (isUseStrictPrologue(statement)) {
                return statement;
            }
        }
        else {
            break;
        }
    }
    return undefined;
}

export function startsWithUseStrict(statements: readonly ts.Statement[]) {
    const firstStatement = ts.firstOrUndefined(statements);
    return firstStatement !== undefined
        && ts.isPrologueDirective(firstStatement)
        && isUseStrictPrologue(firstStatement);
}

export function isCommaSequence(node: ts.Expression): node is ts.BinaryExpression & {operatorToken: ts.Token<ts.SyntaxKind.CommaToken>} | ts.CommaListExpression {
    return node.kind === ts.SyntaxKind.BinaryExpression && (node as ts.BinaryExpression).operatorToken.kind === ts.SyntaxKind.CommaToken ||
        node.kind === ts.SyntaxKind.CommaListExpression;
}

export function isJSDocTypeAssertion(node: ts.Node): node is ts.JSDocTypeAssertion {
    return ts.isParenthesizedExpression(node)
        && ts.isInJSFile(node)
        && !!ts.getJSDocTypeTag(node);
}

export function getJSDocTypeAssertionType(node: ts.JSDocTypeAssertion) {
    const type = ts.getJSDocType(node);
    ts.Debug.assertIsDefined(type);
    return type;
}

export function isOuterExpression(node: ts.Node, kinds = ts.OuterExpressionKinds.All): node is ts.OuterExpression {
    switch (node.kind) {
        case ts.SyntaxKind.ParenthesizedExpression:
            if (kinds & ts.OuterExpressionKinds.ExcludeJSDocTypeAssertion && isJSDocTypeAssertion(node)) {
                return false;
            }
            return (kinds & ts.OuterExpressionKinds.Parentheses) !== 0;
        case ts.SyntaxKind.TypeAssertionExpression:
        case ts.SyntaxKind.AsExpression:
        case ts.SyntaxKind.SatisfiesExpression:
            return (kinds & ts.OuterExpressionKinds.TypeAssertions) !== 0;
        case ts.SyntaxKind.NonNullExpression:
            return (kinds & ts.OuterExpressionKinds.NonNullAssertions) !== 0;
        case ts.SyntaxKind.PartiallyEmittedExpression:
            return (kinds & ts.OuterExpressionKinds.PartiallyEmittedExpressions) !== 0;
    }
    return false;
}

export function skipOuterExpressions(node: ts.Expression, kinds?: ts.OuterExpressionKinds): ts.Expression;
export function skipOuterExpressions(node: ts.Node, kinds?: ts.OuterExpressionKinds): ts.Node;
export function skipOuterExpressions(node: ts.Node, kinds = ts.OuterExpressionKinds.All) {
    while (isOuterExpression(node, kinds)) {
        node = node.expression;
    }
    return node;
}

export function skipAssertions(node: ts.Expression): ts.Expression;
export function skipAssertions(node: ts.Node): ts.Node;
export function skipAssertions(node: ts.Node): ts.Node {
    return skipOuterExpressions(node, ts.OuterExpressionKinds.Assertions);
}

export function startOnNewLine<T extends ts.Node>(node: T): T {
    return ts.setStartsOnNewLine(node, /*newLine*/ true);
}

export function getExternalHelpersModuleName(node: ts.SourceFile) {
    const parseNode = ts.getOriginalNode(node, ts.isSourceFile);
    const emitNode = parseNode && parseNode.emitNode;
    return emitNode && emitNode.externalHelpersModuleName;
}

export function hasRecordedExternalHelpers(sourceFile: ts.SourceFile) {
    const parseNode = ts.getOriginalNode(sourceFile, ts.isSourceFile);
    const emitNode = parseNode && parseNode.emitNode;
    return !!emitNode && (!!emitNode.externalHelpersModuleName || !!emitNode.externalHelpers);
}

export function createExternalHelpersImportDeclarationIfNeeded(nodeFactory: ts.NodeFactory, helperFactory: ts.EmitHelperFactory, sourceFile: ts.SourceFile, compilerOptions: ts.CompilerOptions, hasExportStarsToExportValues?: boolean, hasImportStar?: boolean, hasImportDefault?: boolean) {
    if (compilerOptions.importHelpers && ts.isEffectiveExternalModule(sourceFile, compilerOptions)) {
        let namedBindings: ts.NamedImportBindings | undefined;
        const moduleKind = ts.getEmitModuleKind(compilerOptions);
        if ((moduleKind >= ts.ModuleKind.ES2015 && moduleKind <= ts.ModuleKind.ESNext) || sourceFile.impliedNodeFormat === ts.ModuleKind.ESNext) {
            // use named imports
            const helpers = ts.getEmitHelpers(sourceFile);
            if (helpers) {
                const helperNames: string[] = [];
                for (const helper of helpers) {
                    if (!helper.scoped) {
                        const importName = helper.importName;
                        if (importName) {
                            ts.pushIfUnique(helperNames, importName);
                        }
                    }
                }
                if (ts.some(helperNames)) {
                    helperNames.sort(ts.compareStringsCaseSensitive);
                    // Alias the imports if the names are used somewhere in the file.
                    // NOTE: We don't need to care about global import collisions as this is a module.
                    namedBindings = nodeFactory.createNamedImports(
                        ts.map(helperNames, name => ts.isFileLevelUniqueName(sourceFile, name)
                            ? nodeFactory.createImportSpecifier(/*isTypeOnly*/ false, /*propertyName*/ undefined, nodeFactory.createIdentifier(name))
                            : nodeFactory.createImportSpecifier(/*isTypeOnly*/ false, nodeFactory.createIdentifier(name), helperFactory.getUnscopedHelperName(name))
                        )
                    );
                    const parseNode = ts.getOriginalNode(sourceFile, ts.isSourceFile);
                    const emitNode = ts.getOrCreateEmitNode(parseNode);
                    emitNode.externalHelpers = true;
                }
            }
        }
        else {
            // use a namespace import
            const externalHelpersModuleName = getOrCreateExternalHelpersModuleNameIfNeeded(nodeFactory, sourceFile, compilerOptions, hasExportStarsToExportValues, hasImportStar || hasImportDefault);
            if (externalHelpersModuleName) {
                namedBindings = nodeFactory.createNamespaceImport(externalHelpersModuleName);
            }
        }
        if (namedBindings) {
            const externalHelpersImportDeclaration = nodeFactory.createImportDeclaration(
                /*modifiers*/ undefined,
                nodeFactory.createImportClause(/*isTypeOnly*/ false, /*name*/ undefined, namedBindings),
                nodeFactory.createStringLiteral(ts.externalHelpersModuleNameText),
                 /*assertClause*/ undefined
            );
            ts.addEmitFlags(externalHelpersImportDeclaration, ts.EmitFlags.NeverApplyImportHelper);
            return externalHelpersImportDeclaration;
        }
    }
}

export function getOrCreateExternalHelpersModuleNameIfNeeded(factory: ts.NodeFactory, node: ts.SourceFile, compilerOptions: ts.CompilerOptions, hasExportStarsToExportValues?: boolean, hasImportStarOrImportDefault?: boolean) {
    if (compilerOptions.importHelpers && ts.isEffectiveExternalModule(node, compilerOptions)) {
        const externalHelpersModuleName = getExternalHelpersModuleName(node);
        if (externalHelpersModuleName) {
            return externalHelpersModuleName;
        }

        const moduleKind = ts.getEmitModuleKind(compilerOptions);
        let create = (hasExportStarsToExportValues || (ts.getESModuleInterop(compilerOptions) && hasImportStarOrImportDefault))
            && moduleKind !== ts.ModuleKind.System
            && (moduleKind < ts.ModuleKind.ES2015 || node.impliedNodeFormat === ts.ModuleKind.CommonJS);
        if (!create) {
            const helpers = ts.getEmitHelpers(node);
            if (helpers) {
                for (const helper of helpers) {
                    if (!helper.scoped) {
                        create = true;
                        break;
                    }
                }
            }
        }

        if (create) {
            const parseNode = ts.getOriginalNode(node, ts.isSourceFile);
            const emitNode = ts.getOrCreateEmitNode(parseNode);
            return emitNode.externalHelpersModuleName || (emitNode.externalHelpersModuleName = factory.createUniqueName(ts.externalHelpersModuleNameText));
        }
    }
}

/**
 * Get the name of that target module from an import or export declaration
 */
export function getLocalNameForExternalImport(factory: ts.NodeFactory, node: ts.ImportDeclaration | ts.ExportDeclaration | ts.ImportEqualsDeclaration, sourceFile: ts.SourceFile): ts.Identifier | undefined {
    const namespaceDeclaration = ts.getNamespaceDeclarationNode(node);
    if (namespaceDeclaration && !ts.isDefaultImport(node) && !ts.isExportNamespaceAsDefaultDeclaration(node)) {
        const name = namespaceDeclaration.name;
        return ts.isGeneratedIdentifier(name) ? name : factory.createIdentifier(ts.getSourceTextOfNodeFromSourceFile(sourceFile, name) || ts.idText(name));
    }
    if (node.kind === ts.SyntaxKind.ImportDeclaration && node.importClause) {
        return factory.getGeneratedNameForNode(node);
    }
    if (node.kind === ts.SyntaxKind.ExportDeclaration && node.moduleSpecifier) {
        return factory.getGeneratedNameForNode(node);
    }
    return undefined;
}

/**
 * Get the name of a target module from an import/export declaration as should be written in the emitted output.
 * The emitted output name can be different from the input if:
 *  1. The module has a /// <amd-module name="<new name>" />
 *  2. --out or --outFile is used, making the name relative to the rootDir
 *  3- The containing SourceFile has an entry in renamedDependencies for the import as requested by some module loaders (e.g. System).
 * Otherwise, a new StringLiteral node representing the module name will be returned.
 */
export function getExternalModuleNameLiteral(factory: ts.NodeFactory, importNode: ts.ImportDeclaration | ts.ExportDeclaration | ts.ImportEqualsDeclaration | ts.ImportCall, sourceFile: ts.SourceFile, host: ts.EmitHost, resolver: ts.EmitResolver, compilerOptions: ts.CompilerOptions) {
    const moduleName = ts.getExternalModuleName(importNode);
    if (moduleName && ts.isStringLiteral(moduleName)) {
        return tryGetModuleNameFromDeclaration(importNode, host, factory, resolver, compilerOptions)
            || tryRenameExternalModule(factory, moduleName, sourceFile)
            || factory.cloneNode(moduleName);
    }

    return undefined;
}

/**
 * Some bundlers (SystemJS builder) sometimes want to rename dependencies.
 * Here we check if alternative name was provided for a given moduleName and return it if possible.
 */
function tryRenameExternalModule(factory: ts.NodeFactory, moduleName: ts.LiteralExpression, sourceFile: ts.SourceFile) {
    const rename = sourceFile.renamedDependencies && sourceFile.renamedDependencies.get(moduleName.text);
    return rename ? factory.createStringLiteral(rename) : undefined;
}

/**
 * Get the name of a module as should be written in the emitted output.
 * The emitted output name can be different from the input if:
 *  1. The module has a /// <amd-module name="<new name>" />
 *  2. --out or --outFile is used, making the name relative to the rootDir
 * Otherwise, a new StringLiteral node representing the module name will be returned.
 */
export function tryGetModuleNameFromFile(factory: ts.NodeFactory, file: ts.SourceFile | undefined, host: ts.EmitHost, options: ts.CompilerOptions): ts.StringLiteral | undefined {
    if (!file) {
        return undefined;
    }
    if (file.moduleName) {
        return factory.createStringLiteral(file.moduleName);
    }
    if (!file.isDeclarationFile && ts.outFile(options)) {
        return factory.createStringLiteral(ts.getExternalModuleNameFromPath(host, file.fileName));
    }
    return undefined;
}

function tryGetModuleNameFromDeclaration(declaration: ts.ImportEqualsDeclaration | ts.ImportDeclaration | ts.ExportDeclaration | ts.ImportCall, host: ts.EmitHost, factory: ts.NodeFactory, resolver: ts.EmitResolver, compilerOptions: ts.CompilerOptions) {
    return tryGetModuleNameFromFile(factory, resolver.getExternalModuleFileFromDeclaration(declaration), host, compilerOptions);
}

/**
 * Gets the initializer of an BindingOrAssignmentElement.
 */
export function getInitializerOfBindingOrAssignmentElement(bindingElement: ts.BindingOrAssignmentElement): ts.Expression | undefined {
    if (ts.isDeclarationBindingElement(bindingElement)) {
        // `1` in `let { a = 1 } = ...`
        // `1` in `let { a: b = 1 } = ...`
        // `1` in `let { a: {b} = 1 } = ...`
        // `1` in `let { a: [b] = 1 } = ...`
        // `1` in `let [a = 1] = ...`
        // `1` in `let [{a} = 1] = ...`
        // `1` in `let [[a] = 1] = ...`
        return bindingElement.initializer;
    }

    if (ts.isPropertyAssignment(bindingElement)) {
        // `1` in `({ a: b = 1 } = ...)`
        // `1` in `({ a: {b} = 1 } = ...)`
        // `1` in `({ a: [b] = 1 } = ...)`
        const initializer = bindingElement.initializer;
        return ts.isAssignmentExpression(initializer, /*excludeCompoundAssignment*/ true)
            ? initializer.right
            : undefined;
    }

    if (ts.isShorthandPropertyAssignment(bindingElement)) {
        // `1` in `({ a = 1 } = ...)`
        return bindingElement.objectAssignmentInitializer;
    }

    if (ts.isAssignmentExpression(bindingElement, /*excludeCompoundAssignment*/ true)) {
        // `1` in `[a = 1] = ...`
        // `1` in `[{a} = 1] = ...`
        // `1` in `[[a] = 1] = ...`
        return bindingElement.right;
    }

    if (ts.isSpreadElement(bindingElement)) {
        // Recovery consistent with existing emit.
        return getInitializerOfBindingOrAssignmentElement(bindingElement.expression as ts.BindingOrAssignmentElement);
    }
}

/**
 * Gets the name of an BindingOrAssignmentElement.
 */
export function getTargetOfBindingOrAssignmentElement(bindingElement: ts.BindingOrAssignmentElement): ts.BindingOrAssignmentElementTarget | undefined {
    if (ts.isDeclarationBindingElement(bindingElement)) {
        // `a` in `let { a } = ...`
        // `a` in `let { a = 1 } = ...`
        // `b` in `let { a: b } = ...`
        // `b` in `let { a: b = 1 } = ...`
        // `a` in `let { ...a } = ...`
        // `{b}` in `let { a: {b} } = ...`
        // `{b}` in `let { a: {b} = 1 } = ...`
        // `[b]` in `let { a: [b] } = ...`
        // `[b]` in `let { a: [b] = 1 } = ...`
        // `a` in `let [a] = ...`
        // `a` in `let [a = 1] = ...`
        // `a` in `let [...a] = ...`
        // `{a}` in `let [{a}] = ...`
        // `{a}` in `let [{a} = 1] = ...`
        // `[a]` in `let [[a]] = ...`
        // `[a]` in `let [[a] = 1] = ...`
        return bindingElement.name;
    }

    if (ts.isObjectLiteralElementLike(bindingElement)) {
        switch (bindingElement.kind) {
            case ts.SyntaxKind.PropertyAssignment:
                // `b` in `({ a: b } = ...)`
                // `b` in `({ a: b = 1 } = ...)`
                // `{b}` in `({ a: {b} } = ...)`
                // `{b}` in `({ a: {b} = 1 } = ...)`
                // `[b]` in `({ a: [b] } = ...)`
                // `[b]` in `({ a: [b] = 1 } = ...)`
                // `b.c` in `({ a: b.c } = ...)`
                // `b.c` in `({ a: b.c = 1 } = ...)`
                // `b[0]` in `({ a: b[0] } = ...)`
                // `b[0]` in `({ a: b[0] = 1 } = ...)`
                return getTargetOfBindingOrAssignmentElement(bindingElement.initializer as ts.BindingOrAssignmentElement);

            case ts.SyntaxKind.ShorthandPropertyAssignment:
                // `a` in `({ a } = ...)`
                // `a` in `({ a = 1 } = ...)`
                return bindingElement.name;

            case ts.SyntaxKind.SpreadAssignment:
                // `a` in `({ ...a } = ...)`
                return getTargetOfBindingOrAssignmentElement(bindingElement.expression as ts.BindingOrAssignmentElement);
        }

        // no target
        return undefined;
    }

    if (ts.isAssignmentExpression(bindingElement, /*excludeCompoundAssignment*/ true)) {
        // `a` in `[a = 1] = ...`
        // `{a}` in `[{a} = 1] = ...`
        // `[a]` in `[[a] = 1] = ...`
        // `a.b` in `[a.b = 1] = ...`
        // `a[0]` in `[a[0] = 1] = ...`
        return getTargetOfBindingOrAssignmentElement(bindingElement.left as ts.BindingOrAssignmentElement);
    }

    if (ts.isSpreadElement(bindingElement)) {
        // `a` in `[...a] = ...`
        return getTargetOfBindingOrAssignmentElement(bindingElement.expression as ts.BindingOrAssignmentElement);
    }

    // `a` in `[a] = ...`
    // `{a}` in `[{a}] = ...`
    // `[a]` in `[[a]] = ...`
    // `a.b` in `[a.b] = ...`
    // `a[0]` in `[a[0]] = ...`
    return bindingElement;
}

/**
 * Determines whether an BindingOrAssignmentElement is a rest element.
 */
export function getRestIndicatorOfBindingOrAssignmentElement(bindingElement: ts.BindingOrAssignmentElement): ts.BindingOrAssignmentElementRestIndicator | undefined {
    switch (bindingElement.kind) {
        case ts.SyntaxKind.Parameter:
        case ts.SyntaxKind.BindingElement:
            // `...` in `let [...a] = ...`
            return bindingElement.dotDotDotToken;

        case ts.SyntaxKind.SpreadElement:
        case ts.SyntaxKind.SpreadAssignment:
            // `...` in `[...a] = ...`
            return bindingElement;
    }

    return undefined;
}

/**
 * Gets the property name of a BindingOrAssignmentElement
 */
export function getPropertyNameOfBindingOrAssignmentElement(bindingElement: ts.BindingOrAssignmentElement): Exclude<ts.PropertyName, ts.PrivateIdentifier> | undefined {
    const propertyName = tryGetPropertyNameOfBindingOrAssignmentElement(bindingElement);
    ts.Debug.assert(!!propertyName || ts.isSpreadAssignment(bindingElement), "Invalid property name for binding element.");
    return propertyName;
}

export function tryGetPropertyNameOfBindingOrAssignmentElement(bindingElement: ts.BindingOrAssignmentElement): Exclude<ts.PropertyName, ts.PrivateIdentifier> | undefined {
    switch (bindingElement.kind) {
        case ts.SyntaxKind.BindingElement:
            // `a` in `let { a: b } = ...`
            // `[a]` in `let { [a]: b } = ...`
            // `"a"` in `let { "a": b } = ...`
            // `1` in `let { 1: b } = ...`
            if (bindingElement.propertyName) {
                const propertyName = bindingElement.propertyName;
                if (ts.isPrivateIdentifier(propertyName)) {
                    return ts.Debug.failBadSyntaxKind(propertyName);
                }
                return ts.isComputedPropertyName(propertyName) && isStringOrNumericLiteral(propertyName.expression)
                    ? propertyName.expression
                    : propertyName;
            }

            break;

        case ts.SyntaxKind.PropertyAssignment:
            // `a` in `({ a: b } = ...)`
            // `[a]` in `({ [a]: b } = ...)`
            // `"a"` in `({ "a": b } = ...)`
            // `1` in `({ 1: b } = ...)`
            if (bindingElement.name) {
                const propertyName = bindingElement.name;
                if (ts.isPrivateIdentifier(propertyName)) {
                    return ts.Debug.failBadSyntaxKind(propertyName);
                }
                return ts.isComputedPropertyName(propertyName) && isStringOrNumericLiteral(propertyName.expression)
                    ? propertyName.expression
                    : propertyName;
            }

            break;

        case ts.SyntaxKind.SpreadAssignment:
            // `a` in `({ ...a } = ...)`
            if (bindingElement.name && ts.isPrivateIdentifier(bindingElement.name)) {
                return ts.Debug.failBadSyntaxKind(bindingElement.name);
            }
            return bindingElement.name;
    }

    const target = getTargetOfBindingOrAssignmentElement(bindingElement);
    if (target && ts.isPropertyName(target)) {
        return target;
    }
}

function isStringOrNumericLiteral(node: ts.Node): node is ts.StringLiteral | ts.NumericLiteral {
    const kind = node.kind;
    return kind === ts.SyntaxKind.StringLiteral
        || kind === ts.SyntaxKind.NumericLiteral;
}

/**
 * Gets the elements of a BindingOrAssignmentPattern
 */
export function getElementsOfBindingOrAssignmentPattern(name: ts.BindingOrAssignmentPattern): readonly ts.BindingOrAssignmentElement[] {
    switch (name.kind) {
        case ts.SyntaxKind.ObjectBindingPattern:
        case ts.SyntaxKind.ArrayBindingPattern:
        case ts.SyntaxKind.ArrayLiteralExpression:
            // `a` in `{a}`
            // `a` in `[a]`
            return name.elements as readonly ts.BindingOrAssignmentElement[];

        case ts.SyntaxKind.ObjectLiteralExpression:
            // `a` in `{a}`
            return name.properties as readonly ts.BindingOrAssignmentElement[];
    }
}

/* @internal */
export function getJSDocTypeAliasName(fullName: ts.JSDocNamespaceBody | undefined) {
    if (fullName) {
        let rightNode = fullName;
        while (true) {
            if (ts.isIdentifier(rightNode) || !rightNode.body) {
                return ts.isIdentifier(rightNode) ? rightNode : rightNode.name;
            }
            rightNode = rightNode.body;
        }
    }
}

export function canHaveIllegalType(node: ts.Node): node is ts.HasIllegalType {
    const kind = node.kind;
    return kind === ts.SyntaxKind.Constructor
        || kind === ts.SyntaxKind.SetAccessor;
}

export function canHaveIllegalTypeParameters(node: ts.Node): node is ts.HasIllegalTypeParameters {
    const kind = node.kind;
    return kind === ts.SyntaxKind.Constructor
        || kind === ts.SyntaxKind.GetAccessor
        || kind === ts.SyntaxKind.SetAccessor;
}

export function canHaveIllegalDecorators(node: ts.Node): node is ts.HasIllegalDecorators {
    const kind = node.kind;
    return kind === ts.SyntaxKind.PropertyAssignment
        || kind === ts.SyntaxKind.ShorthandPropertyAssignment
        || kind === ts.SyntaxKind.FunctionDeclaration
        || kind === ts.SyntaxKind.Constructor
        || kind === ts.SyntaxKind.IndexSignature
        || kind === ts.SyntaxKind.ClassStaticBlockDeclaration
        || kind === ts.SyntaxKind.MissingDeclaration
        || kind === ts.SyntaxKind.VariableStatement
        || kind === ts.SyntaxKind.InterfaceDeclaration
        || kind === ts.SyntaxKind.TypeAliasDeclaration
        || kind === ts.SyntaxKind.EnumDeclaration
        || kind === ts.SyntaxKind.ModuleDeclaration
        || kind === ts.SyntaxKind.ImportEqualsDeclaration
        || kind === ts.SyntaxKind.ImportDeclaration
        || kind === ts.SyntaxKind.NamespaceExportDeclaration
        || kind === ts.SyntaxKind.ExportDeclaration
        || kind === ts.SyntaxKind.ExportAssignment;
}

export function canHaveIllegalModifiers(node: ts.Node): node is ts.HasIllegalModifiers {
    const kind = node.kind;
    return kind === ts.SyntaxKind.ClassStaticBlockDeclaration
        || kind === ts.SyntaxKind.PropertyAssignment
        || kind === ts.SyntaxKind.ShorthandPropertyAssignment
        || kind === ts.SyntaxKind.FunctionType
        || kind === ts.SyntaxKind.MissingDeclaration
        || kind === ts.SyntaxKind.NamespaceExportDeclaration;
}

export const isTypeNodeOrTypeParameterDeclaration = ts.or(ts.isTypeNode, ts.isTypeParameterDeclaration) as (node: ts.Node) => node is ts.TypeNode | ts.TypeParameterDeclaration;
export const isQuestionOrExclamationToken = ts.or(ts.isQuestionToken, ts.isExclamationToken) as (node: ts.Node) => node is ts.QuestionToken | ts.ExclamationToken;
export const isIdentifierOrThisTypeNode = ts.or(ts.isIdentifier, ts.isThisTypeNode) as (node: ts.Node) => node is ts.Identifier | ts.ThisTypeNode;
export const isReadonlyKeywordOrPlusOrMinusToken = ts.or(ts.isReadonlyKeyword, ts.isPlusToken, ts.isMinusToken) as (node: ts.Node) => node is ts.ReadonlyKeyword | ts.PlusToken | ts.MinusToken;
export const isQuestionOrPlusOrMinusToken = ts.or(ts.isQuestionToken, ts.isPlusToken, ts.isMinusToken) as (node: ts.Node) => node is ts.QuestionToken | ts.PlusToken | ts.MinusToken;
export const isModuleName = ts.or(ts.isIdentifier, ts.isStringLiteral) as (node: ts.Node) => node is ts.ModuleName;

export function isLiteralTypeLikeExpression(node: ts.Node): node is ts.NullLiteral | ts.BooleanLiteral | ts.LiteralExpression | ts.PrefixUnaryExpression {
    const kind = node.kind;
    return kind === ts.SyntaxKind.NullKeyword
        || kind === ts.SyntaxKind.TrueKeyword
        || kind === ts.SyntaxKind.FalseKeyword
        || ts.isLiteralExpression(node)
        || ts.isPrefixUnaryExpression(node);
}

function isExponentiationOperator(kind: ts.SyntaxKind): kind is ts.ExponentiationOperator {
    return kind === ts.SyntaxKind.AsteriskAsteriskToken;
}

function isMultiplicativeOperator(kind: ts.SyntaxKind): kind is ts.MultiplicativeOperator {
    return kind === ts.SyntaxKind.AsteriskToken
        || kind === ts.SyntaxKind.SlashToken
        || kind === ts.SyntaxKind.PercentToken;
}

function isMultiplicativeOperatorOrHigher(kind: ts.SyntaxKind): kind is ts.MultiplicativeOperatorOrHigher {
    return isExponentiationOperator(kind)
        || isMultiplicativeOperator(kind);
}

function isAdditiveOperator(kind: ts.SyntaxKind): kind is ts.AdditiveOperator {
    return kind === ts.SyntaxKind.PlusToken
        || kind === ts.SyntaxKind.MinusToken;
}

function isAdditiveOperatorOrHigher(kind: ts.SyntaxKind): kind is ts.AdditiveOperatorOrHigher {
    return isAdditiveOperator(kind)
        || isMultiplicativeOperatorOrHigher(kind);
}

function isShiftOperator(kind: ts.SyntaxKind): kind is ts.ShiftOperator {
    return kind === ts.SyntaxKind.LessThanLessThanToken
        || kind === ts.SyntaxKind.GreaterThanGreaterThanToken
        || kind === ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken;
}

function isShiftOperatorOrHigher(kind: ts.SyntaxKind): kind is ts.ShiftOperatorOrHigher {
    return isShiftOperator(kind)
        || isAdditiveOperatorOrHigher(kind);
}

function isRelationalOperator(kind: ts.SyntaxKind): kind is ts.RelationalOperator {
    return kind === ts.SyntaxKind.LessThanToken
        || kind === ts.SyntaxKind.LessThanEqualsToken
        || kind === ts.SyntaxKind.GreaterThanToken
        || kind === ts.SyntaxKind.GreaterThanEqualsToken
        || kind === ts.SyntaxKind.InstanceOfKeyword
        || kind === ts.SyntaxKind.InKeyword;
}

function isRelationalOperatorOrHigher(kind: ts.SyntaxKind): kind is ts.RelationalOperatorOrHigher {
    return isRelationalOperator(kind)
        || isShiftOperatorOrHigher(kind);
}

function isEqualityOperator(kind: ts.SyntaxKind): kind is ts.EqualityOperator {
    return kind === ts.SyntaxKind.EqualsEqualsToken
        || kind === ts.SyntaxKind.EqualsEqualsEqualsToken
        || kind === ts.SyntaxKind.ExclamationEqualsToken
        || kind === ts.SyntaxKind.ExclamationEqualsEqualsToken;
}

function isEqualityOperatorOrHigher(kind: ts.SyntaxKind): kind is ts.EqualityOperatorOrHigher {
    return isEqualityOperator(kind)
        || isRelationalOperatorOrHigher(kind);
}

function isBitwiseOperator(kind: ts.SyntaxKind): kind is ts.BitwiseOperator {
    return kind === ts.SyntaxKind.AmpersandToken
        || kind === ts.SyntaxKind.BarToken
        || kind === ts.SyntaxKind.CaretToken;
}

function isBitwiseOperatorOrHigher(kind: ts.SyntaxKind): kind is ts.BitwiseOperatorOrHigher {
    return isBitwiseOperator(kind)
        || isEqualityOperatorOrHigher(kind);
}

// NOTE: The version in utilities includes ExclamationToken, which is not a binary operator.
function isLogicalOperator(kind: ts.SyntaxKind): kind is ts.LogicalOperator {
    return kind === ts.SyntaxKind.AmpersandAmpersandToken
        || kind === ts.SyntaxKind.BarBarToken;
}

function isLogicalOperatorOrHigher(kind: ts.SyntaxKind): kind is ts.LogicalOperatorOrHigher {
    return isLogicalOperator(kind)
        || isBitwiseOperatorOrHigher(kind);
}

function isAssignmentOperatorOrHigher(kind: ts.SyntaxKind): kind is ts.AssignmentOperatorOrHigher {
    return kind === ts.SyntaxKind.QuestionQuestionToken
        || isLogicalOperatorOrHigher(kind)
        || ts.isAssignmentOperator(kind);
}

function isBinaryOperator(kind: ts.SyntaxKind): kind is ts.BinaryOperator {
    return isAssignmentOperatorOrHigher(kind)
        || kind === ts.SyntaxKind.CommaToken;
}

export function isBinaryOperatorToken(node: ts.Node): node is ts.BinaryOperatorToken {
    return isBinaryOperator(node.kind);
}

type BinaryExpressionState = <TOuterState, TState, TResult>(machine: BinaryExpressionStateMachine<TOuterState, TState, TResult>, stackIndex: number, stateStack: BinaryExpressionState[], nodeStack: ts.BinaryExpression[], userStateStack: TState[], resultHolder: { value: TResult }, outerState: TOuterState) => number;

namespace BinaryExpressionState {
    /**
     * Handles walking into a `BinaryExpression`.
     * @param machine State machine handler functions
     * @param frame The current frame
     * @returns The new frame
     */
    export function enter<TOuterState, TState, TResult>(machine: BinaryExpressionStateMachine<TOuterState, TState, TResult>, stackIndex: number, stateStack: BinaryExpressionState[], nodeStack: ts.BinaryExpression[], userStateStack: TState[], _resultHolder: { value: TResult }, outerState: TOuterState): number {
        const prevUserState = stackIndex > 0 ? userStateStack[stackIndex - 1] : undefined;
        ts.Debug.assertEqual(stateStack[stackIndex], enter);
        userStateStack[stackIndex] = machine.onEnter(nodeStack[stackIndex], prevUserState, outerState);
        stateStack[stackIndex] = nextState(machine, enter);
        return stackIndex;
    }

    /**
     * Handles walking the `left` side of a `BinaryExpression`.
     * @param machine State machine handler functions
     * @param frame The current frame
     * @returns The new frame
     */
    export function left<TOuterState, TState, TResult>(machine: BinaryExpressionStateMachine<TOuterState, TState, TResult>, stackIndex: number, stateStack: BinaryExpressionState[], nodeStack: ts.BinaryExpression[], userStateStack: TState[], _resultHolder: { value: TResult }, _outerState: TOuterState): number {
        ts.Debug.assertEqual(stateStack[stackIndex], left);
        ts.Debug.assertIsDefined(machine.onLeft);
        stateStack[stackIndex] = nextState(machine, left);
        const nextNode = machine.onLeft(nodeStack[stackIndex].left, userStateStack[stackIndex], nodeStack[stackIndex]);
        if (nextNode) {
            checkCircularity(stackIndex, nodeStack, nextNode);
            return pushStack(stackIndex, stateStack, nodeStack, userStateStack, nextNode);
        }
        return stackIndex;
    }

    /**
     * Handles walking the `operatorToken` of a `BinaryExpression`.
     * @param machine State machine handler functions
     * @param frame The current frame
     * @returns The new frame
     */
    export function operator<TOuterState, TState, TResult>(machine: BinaryExpressionStateMachine<TOuterState, TState, TResult>, stackIndex: number, stateStack: BinaryExpressionState[], nodeStack: ts.BinaryExpression[], userStateStack: TState[], _resultHolder: { value: TResult }, _outerState: TOuterState): number {
        ts.Debug.assertEqual(stateStack[stackIndex], operator);
        ts.Debug.assertIsDefined(machine.onOperator);
        stateStack[stackIndex] = nextState(machine, operator);
        machine.onOperator(nodeStack[stackIndex].operatorToken, userStateStack[stackIndex], nodeStack[stackIndex]);
        return stackIndex;
    }

    /**
     * Handles walking the `right` side of a `BinaryExpression`.
     * @param machine State machine handler functions
     * @param frame The current frame
     * @returns The new frame
     */
    export function right<TOuterState, TState, TResult>(machine: BinaryExpressionStateMachine<TOuterState, TState, TResult>, stackIndex: number, stateStack: BinaryExpressionState[], nodeStack: ts.BinaryExpression[], userStateStack: TState[], _resultHolder: { value: TResult }, _outerState: TOuterState): number {
        ts.Debug.assertEqual(stateStack[stackIndex], right);
        ts.Debug.assertIsDefined(machine.onRight);
        stateStack[stackIndex] = nextState(machine, right);
        const nextNode = machine.onRight(nodeStack[stackIndex].right, userStateStack[stackIndex], nodeStack[stackIndex]);
        if (nextNode) {
            checkCircularity(stackIndex, nodeStack, nextNode);
            return pushStack(stackIndex, stateStack, nodeStack, userStateStack, nextNode);
        }
        return stackIndex;
    }

    /**
     * Handles walking out of a `BinaryExpression`.
     * @param machine State machine handler functions
     * @param frame The current frame
     * @returns The new frame
     */
    export function exit<TOuterState, TState, TResult>(machine: BinaryExpressionStateMachine<TOuterState, TState, TResult>, stackIndex: number, stateStack: BinaryExpressionState[], nodeStack: ts.BinaryExpression[], userStateStack: TState[], resultHolder: { value: TResult }, _outerState: TOuterState): number {
        ts.Debug.assertEqual(stateStack[stackIndex], exit);
        stateStack[stackIndex] = nextState(machine, exit);
        const result = machine.onExit(nodeStack[stackIndex], userStateStack[stackIndex]);
        if (stackIndex > 0) {
            stackIndex--;
            if (machine.foldState) {
                const side = stateStack[stackIndex] === exit ? "right" : "left";
                userStateStack[stackIndex] = machine.foldState(userStateStack[stackIndex], result, side);
            }
        }
        else {
            resultHolder.value = result;
        }
        return stackIndex;
    }

    /**
     * Handles a frame that is already done.
     * @returns The `done` state.
     */
    export function done<TOuterState, TState, TResult>(_machine: BinaryExpressionStateMachine<TOuterState, TState, TResult>, stackIndex: number, stateStack: BinaryExpressionState[], _nodeStack: ts.BinaryExpression[], _userStateStack: TState[], _resultHolder: { value: TResult }, _outerState: TOuterState): number {
        ts.Debug.assertEqual(stateStack[stackIndex], done);
        return stackIndex;
    }

    export function nextState<TOuterState, TState, TResult>(machine: BinaryExpressionStateMachine<TOuterState, TState, TResult>, currentState: BinaryExpressionState) {
        switch (currentState) {
            case enter:
                if (machine.onLeft) return left;
                // falls through
            case left:
                if (machine.onOperator) return operator;
                // falls through
            case operator:
                if (machine.onRight) return right;
                // falls through
            case right: return exit;
            case exit: return done;
            case done: return done;
            default: ts.Debug.fail("Invalid state");
        }
    }

    function pushStack<TState>(stackIndex: number, stateStack: BinaryExpressionState[], nodeStack: ts.BinaryExpression[], userStateStack: TState[], node: ts.BinaryExpression) {
        stackIndex++;
        stateStack[stackIndex] = enter;
        nodeStack[stackIndex] = node;
        userStateStack[stackIndex] = undefined!;
        return stackIndex;
    }

    function checkCircularity(stackIndex: number, nodeStack: ts.BinaryExpression[], node: ts.BinaryExpression) {
        if (ts.Debug.shouldAssert(ts.AssertionLevel.Aggressive)) {
            while (stackIndex >= 0) {
                ts.Debug.assert(nodeStack[stackIndex] !== node, "Circular traversal detected.");
                stackIndex--;
            }
        }
    }
}

/**
 * Holds state machine handler functions
 */
class BinaryExpressionStateMachine<TOuterState, TState, TResult> {
    constructor(
        readonly onEnter: (node: ts.BinaryExpression, prev: TState | undefined, outerState: TOuterState) => TState,
        readonly onLeft: ((left: ts.Expression, userState: TState, node: ts.BinaryExpression) => ts.BinaryExpression | void) | undefined,
        readonly onOperator: ((operatorToken: ts.BinaryOperatorToken, userState: TState, node: ts.BinaryExpression) => void) | undefined,
        readonly onRight: ((right: ts.Expression, userState: TState, node: ts.BinaryExpression) => ts.BinaryExpression | void) | undefined,
        readonly onExit: (node: ts.BinaryExpression, userState: TState) => TResult,
        readonly foldState: ((userState: TState, result: TResult, side: "left" | "right") => TState) | undefined,
    ) {
    }
}

/**
 * Creates a state machine that walks a `BinaryExpression` using the heap to reduce call-stack depth on a large tree.
 * @param onEnter Callback evaluated when entering a `BinaryExpression`. Returns new user-defined state to associate with the node while walking.
 * @param onLeft Callback evaluated when walking the left side of a `BinaryExpression`. Return a `BinaryExpression` to continue walking, or `void` to advance to the right side.
 * @param onRight Callback evaluated when walking the right side of a `BinaryExpression`. Return a `BinaryExpression` to continue walking, or `void` to advance to the end of the node.
 * @param onExit Callback evaluated when exiting a `BinaryExpression`. The result returned will either be folded into the parent's state, or returned from the walker if at the top frame.
 * @param foldState Callback evaluated when the result from a nested `onExit` should be folded into the state of that node's parent.
 * @returns A function that walks a `BinaryExpression` node using the above callbacks, returning the result of the call to `onExit` from the outermost `BinaryExpression` node.
 */
 export function createBinaryExpressionTrampoline<TState, TResult>(
    onEnter: (node: ts.BinaryExpression, prev: TState | undefined) => TState,
    onLeft: ((left: ts.Expression, userState: TState, node: ts.BinaryExpression) => ts.BinaryExpression | void) | undefined,
    onOperator: ((operatorToken: ts.BinaryOperatorToken, userState: TState, node: ts.BinaryExpression) => void) | undefined,
    onRight: ((right: ts.Expression, userState: TState, node: ts.BinaryExpression) => ts.BinaryExpression | void) | undefined,
    onExit: (node: ts.BinaryExpression, userState: TState) => TResult,
    foldState: ((userState: TState, result: TResult, side: "left" | "right") => TState) | undefined,
): (node: ts.BinaryExpression) => TResult;
/**
 * Creates a state machine that walks a `BinaryExpression` using the heap to reduce call-stack depth on a large tree.
 * @param onEnter Callback evaluated when entering a `BinaryExpression`. Returns new user-defined state to associate with the node while walking.
 * @param onLeft Callback evaluated when walking the left side of a `BinaryExpression`. Return a `BinaryExpression` to continue walking, or `void` to advance to the right side.
 * @param onRight Callback evaluated when walking the right side of a `BinaryExpression`. Return a `BinaryExpression` to continue walking, or `void` to advance to the end of the node.
 * @param onExit Callback evaluated when exiting a `BinaryExpression`. The result returned will either be folded into the parent's state, or returned from the walker if at the top frame.
 * @param foldState Callback evaluated when the result from a nested `onExit` should be folded into the state of that node's parent.
 * @returns A function that walks a `BinaryExpression` node using the above callbacks, returning the result of the call to `onExit` from the outermost `BinaryExpression` node.
 */
export function createBinaryExpressionTrampoline<TOuterState, TState, TResult>(
    onEnter: (node: ts.BinaryExpression, prev: TState | undefined, outerState: TOuterState) => TState,
    onLeft: ((left: ts.Expression, userState: TState, node: ts.BinaryExpression) => ts.BinaryExpression | void) | undefined,
    onOperator: ((operatorToken: ts.BinaryOperatorToken, userState: TState, node: ts.BinaryExpression) => void) | undefined,
    onRight: ((right: ts.Expression, userState: TState, node: ts.BinaryExpression) => ts.BinaryExpression | void) | undefined,
    onExit: (node: ts.BinaryExpression, userState: TState) => TResult,
    foldState: ((userState: TState, result: TResult, side: "left" | "right") => TState) | undefined,
): (node: ts.BinaryExpression, outerState: TOuterState) => TResult;
export function createBinaryExpressionTrampoline<TOuterState, TState, TResult>(
    onEnter: (node: ts.BinaryExpression, prev: TState | undefined, outerState: TOuterState) => TState,
    onLeft: ((left: ts.Expression, userState: TState, node: ts.BinaryExpression) => ts.BinaryExpression | void) | undefined,
    onOperator: ((operatorToken: ts.BinaryOperatorToken, userState: TState, node: ts.BinaryExpression) => void) | undefined,
    onRight: ((right: ts.Expression, userState: TState, node: ts.BinaryExpression) => ts.BinaryExpression | void) | undefined,
    onExit: (node: ts.BinaryExpression, userState: TState) => TResult,
    foldState: ((userState: TState, result: TResult, side: "left" | "right") => TState) | undefined,
) {
    const machine = new BinaryExpressionStateMachine(onEnter, onLeft, onOperator, onRight, onExit, foldState);
    return trampoline;

    function trampoline(node: ts.BinaryExpression, outerState?: TOuterState) {
        const resultHolder: { value: TResult } = { value: undefined! };
        const stateStack: BinaryExpressionState[] = [BinaryExpressionState.enter];
        const nodeStack: ts.BinaryExpression[] = [node];
        const userStateStack: TState[] = [undefined!];
        let stackIndex = 0;
        while (stateStack[stackIndex] !== BinaryExpressionState.done) {
            stackIndex = stateStack[stackIndex](machine, stackIndex, stateStack, nodeStack, userStateStack, resultHolder, outerState);
        }
        ts.Debug.assertEqual(stackIndex, 0);
        return resultHolder.value;
    }
}

/**
 * If `nodes` is not undefined, creates an empty `NodeArray` that preserves the `pos` and `end` of `nodes`.
 * @internal
 */
export function elideNodes<T extends ts.Node>(factory: ts.NodeFactory, nodes: ts.NodeArray<T>): ts.NodeArray<T>;
export function elideNodes<T extends ts.Node>(factory: ts.NodeFactory, nodes: ts.NodeArray<T> | undefined): ts.NodeArray<T> | undefined;
export function elideNodes<T extends ts.Node>(factory: ts.NodeFactory, nodes: ts.NodeArray<T> | undefined): ts.NodeArray<T> | undefined {
    if (nodes === undefined) return undefined;
    if (nodes.length === 0) return nodes;
    return ts.setTextRange(factory.createNodeArray([], nodes.hasTrailingComma), nodes);
}

/**
 * Gets the node from which a name should be generated.
 */
export function getNodeForGeneratedName(name: ts.GeneratedIdentifier | ts.GeneratedPrivateIdentifier) {
    if (name.autoGenerateFlags & ts.GeneratedIdentifierFlags.Node) {
        const autoGenerateId = name.autoGenerateId;
        let node = name as ts.Node;
        let original = node.original;
        while (original) {
            node = original;

            // if "node" is a different generated name (having a different "autoGenerateId"), use it and stop traversing.
            if (ts.isMemberName(node)
                && !!(node.autoGenerateFlags! & ts.GeneratedIdentifierFlags.Node)
                && node.autoGenerateId !== autoGenerateId) {
                break;
            }

            original = node.original;
        }
        // otherwise, return the original node for the source
        return node;
    }
    return name;
}

/**
 * Formats a prefix or suffix of a generated name.
 */
export function formatGeneratedNamePart(part: string | undefined): string;
/**
 * Formats a prefix or suffix of a generated name. If the part is a {@link GeneratedNamePart}, calls {@link generateName} to format the source node.
 */
export function formatGeneratedNamePart(part: string | ts.GeneratedNamePart | undefined, generateName: (name: ts.GeneratedIdentifier | ts.GeneratedPrivateIdentifier) => string): string;
export function formatGeneratedNamePart(part: string | ts.GeneratedNamePart | undefined, generateName?: (name: ts.GeneratedIdentifier | ts.GeneratedPrivateIdentifier) => string): string {
    return typeof part === "object" ? formatGeneratedName(/*privateName*/ false, part.prefix, part.node, part.suffix, generateName!) :
        typeof part === "string" ? part.length > 0 && part.charCodeAt(0) === ts.CharacterCodes.hash ? part.slice(1) : part :
        "";
}

function formatIdentifier(name: string | ts.Identifier | ts.PrivateIdentifier, generateName?: (name: ts.GeneratedIdentifier | ts.GeneratedPrivateIdentifier) => string) {
    return typeof name === "string" ? name :
        formatIdentifierWorker(name, ts.Debug.checkDefined(generateName));
}

function formatIdentifierWorker(node: ts.Identifier | ts.PrivateIdentifier, generateName: (name: ts.GeneratedIdentifier | ts.GeneratedPrivateIdentifier) => string) {
    return ts.isGeneratedPrivateIdentifier(node) ? generateName(node).slice(1) :
        ts.isGeneratedIdentifier(node) ? generateName(node) :
        ts.isPrivateIdentifier(node) ? (node.escapedText as string).slice(1) :
        ts.idText(node);
}

/**
 * Formats a generated name.
 * @param privateName When `true`, inserts a `#` character at the start of the result.
 * @param prefix The prefix (if any) to include before the base name.
 * @param baseName The base name for the generated name.
 * @param suffix The suffix (if any) to include after the base name.
 */
export function formatGeneratedName(privateName: boolean, prefix: string | undefined, baseName: string, suffix: string | undefined): string;
/**
 * Formats a generated name.
 * @param privateName When `true`, inserts a `#` character at the start of the result.
 * @param prefix The prefix (if any) to include before the base name.
 * @param baseName The base name for the generated name.
 * @param suffix The suffix (if any) to include after the base name.
 * @param generateName Called to format the source node of {@link prefix} when it is a {@link GeneratedNamePart}.
 */
export function formatGeneratedName(privateName: boolean, prefix: string | ts.GeneratedNamePart | undefined, baseName: string | ts.Identifier | ts.PrivateIdentifier, suffix: string | ts.GeneratedNamePart | undefined, generateName: (name: ts.GeneratedIdentifier | ts.GeneratedPrivateIdentifier) => string): string;
export function formatGeneratedName(privateName: boolean, prefix: string | ts.GeneratedNamePart | undefined, baseName: string | ts.Identifier | ts.PrivateIdentifier, suffix: string | ts.GeneratedNamePart | undefined, generateName?: (name: ts.GeneratedIdentifier | ts.GeneratedPrivateIdentifier) => string) {
    prefix = formatGeneratedNamePart(prefix, generateName!);
    suffix = formatGeneratedNamePart(suffix, generateName!);
    baseName = formatIdentifier(baseName, generateName);
    return `${privateName ? "#" : ""}${prefix}${baseName}${suffix}`;
}


/**
 * Creates a private backing field for an `accessor` {@link PropertyDeclaration}.
 */
export function createAccessorPropertyBackingField(factory: ts.NodeFactory, node: ts.PropertyDeclaration, modifiers: ts.ModifiersArray | undefined, initializer: ts.Expression | undefined) {
    return factory.updatePropertyDeclaration(
        node,
        modifiers,
        factory.getGeneratedPrivateNameForNode(node.name, /*prefix*/ undefined, "_accessor_storage"),
        /*questionOrExclamationToken*/ undefined,
        /*type*/ undefined,
        initializer
    );
}

/**
 * Creates a {@link GetAccessorDeclaration} that reads from a private backing field.
 */
export function createAccessorPropertyGetRedirector(factory: ts.NodeFactory, node: ts.PropertyDeclaration, modifiers: ts.ModifiersArray | undefined, name: ts.PropertyName) {
    return factory.createGetAccessorDeclaration(
        modifiers,
        name,
        [],
        /*type*/ undefined,
        factory.createBlock([
            factory.createReturnStatement(
                factory.createPropertyAccessExpression(
                    factory.createThis(),
                    factory.getGeneratedPrivateNameForNode(node.name, /*prefix*/ undefined, "_accessor_storage")
                )
            )
        ])
    );
}

/**
 * Creates a {@link SetAccessorDeclaration} that writes to a private backing field.
 */
export function createAccessorPropertySetRedirector(factory: ts.NodeFactory, node: ts.PropertyDeclaration, modifiers: ts.ModifiersArray | undefined, name: ts.PropertyName) {
    return factory.createSetAccessorDeclaration(
        modifiers,
        name,
        [factory.createParameterDeclaration(
            /*modifiers*/ undefined,
            /*dotdotDotToken*/ undefined,
            "value"
        )],
        factory.createBlock([
            factory.createExpressionStatement(
                factory.createAssignment(
                    factory.createPropertyAccessExpression(
                        factory.createThis(),
                        factory.getGeneratedPrivateNameForNode(node.name, /*prefix*/ undefined, "_accessor_storage")
                    ),
                    factory.createIdentifier("value")
                )
            )
        ])
    );
}
}
