import {
    compareStringsCaseSensitive,
    first,
    last,
    map,
    pushIfUnique,
    some,
} from "../core";
import * as Debug from "../debug";
import { getExternalModuleNameFromPath } from "../moduleNameResolverUtilities";
import { parseNodeFactory } from "../parser";
import { setParent } from "../parserUtilities";
import { isIdentifierText } from "../scanner";
import {
    AccessorDeclaration,
    AdditiveOperator,
    AdditiveOperatorOrHigher,
    AssignmentExpression,
    AssignmentOperatorOrHigher,
    AssignmentPattern,
    BinaryExpression,
    BinaryOperator,
    BinaryOperatorToken,
    BindingOrAssignmentElement,
    BindingOrAssignmentElementRestIndicator,
    BindingOrAssignmentElementTarget,
    BindingOrAssignmentPattern,
    BitwiseOperator,
    BitwiseOperatorOrHigher,
    Block,
    BooleanLiteral,
    CharacterCodes,
    CommaListExpression,
    CompilerOptions,
    ComputedPropertyName,
    Declaration,
    DefaultKeyword,
    EmitFlags,
    EmitHelperFactory,
    EmitHost,
    EmitResolver,
    EntityName,
    EqualityOperator,
    EqualityOperatorOrHigher,
    EqualsToken,
    ExclamationToken,
    ExponentiationOperator,
    ExportDeclaration,
    ExportKeyword,
    Expression,
    ForInitializer,
    GeneratedIdentifier,
    GeneratedIdentifierFlags,
    GeneratedNamePart,
    GeneratedPrivateIdentifier,
    GetAccessorDeclaration,
    HasIllegalModifiers,
    HasIllegalType,
    Identifier,
    ImportCall,
    ImportDeclaration,
    ImportEqualsDeclaration,
    InternalEmitFlags,
    JSDocNamespaceBody,
    JSDocTypeAssertion,
    JsxOpeningFragment,
    JsxOpeningLikeElement,
    LeftHandSideExpression,
    LiteralExpression,
    LogicalOperator,
    LogicalOperatorOrHigher,
    MemberExpression,
    MethodDeclaration,
    MinusToken,
    Modifier,
    ModifiersArray,
    ModuleKind,
    ModuleName,
    MultiplicativeOperator,
    MultiplicativeOperatorOrHigher,
    Mutable,
    NamedImportBindings,
    Node,
    NodeArray,
    NodeFactory,
    NullLiteral,
    NumericLiteral,
    ObjectLiteralElementLike,
    ObjectLiteralExpression,
    ParenthesizedExpression,
    PlusToken,
    PostfixUnaryExpression,
    PrefixUnaryExpression,
    PrivateIdentifier,
    PropertyAssignment,
    PropertyDeclaration,
    PropertyName,
    QuestionToken,
    ReadonlyKeyword,
    RelationalOperator,
    RelationalOperatorOrHigher,
    ScriptTarget,
    SetAccessorDeclaration,
    ShiftOperator,
    ShiftOperatorOrHigher,
    ShorthandPropertyAssignment,
    SourceFile,
    Statement,
    StringLiteral,
    SyntaxKind,
    TextRange,
    ThisTypeNode,
    Token,
    TransformFlags,
    TypeNode,
} from "../types";
import {
    externalHelpersModuleNameText,
    getAllAccessorDeclarations,
    getEmitFlags,
    getEmitModuleKind,
    getESModuleInterop,
    getExternalModuleName,
    getNamespaceDeclarationNode,
    getSourceTextOfNodeFromSourceFile,
    isAssignmentExpression,
    isAssignmentOperator,
    isDefaultImport,
    isEffectiveExternalModule,
    isExportNamespaceAsDefaultDeclaration,
    isFileLevelUniqueName,
    isNumericLiteralName,
    nodeIsSynthesized,
    outFile,
    skipOuterExpressions,
} from "../utilities";
import {
    getJSDocType,
    getModifiers,
    getOriginalNode,
    getParseTreeNode,
    idText,
    isAssignmentPattern,
    isDeclarationBindingElement,
    isGeneratedIdentifier,
    isGeneratedPrivateIdentifier,
    isLiteralExpression,
    isMemberName,
    isModifierKind,
    isObjectLiteralElementLike,
    isPropertyName,
} from "../utilitiesPublic";
import {
    addEmitFlags,
    addInternalEmitFlags,
    getEmitHelpers,
    getOrCreateEmitNode,
    setStartsOnNewLine,
} from "./emitNode";
import {
    isBlock,
    isCommaListExpression,
    isComputedPropertyName,
    isExclamationToken,
    isIdentifier,
    isMinusToken,
    isParenthesizedExpression,
    isPlusToken,
    isPostfixUnaryExpression,
    isPrefixUnaryExpression,
    isPrivateIdentifier,
    isPropertyAssignment,
    isQualifiedName,
    isQuestionToken,
    isReadonlyKeyword,
    isShorthandPropertyAssignment,
    isSourceFile,
    isSpreadAssignment,
    isSpreadElement,
    isStringLiteral,
    isThisTypeNode,
    isVariableDeclarationList,
} from "./nodeTests";
import {
    setOriginalNode,
    setTextRange,
} from "./utilitiesPublic";

// Compound nodes

/** @internal */
export function createEmptyExports(factory: NodeFactory) {
    return factory.createExportDeclaration(/*modifiers*/ undefined, /*isTypeOnly*/ false, factory.createNamedExports([]), /*moduleSpecifier*/ undefined);
}

/** @internal */
export function createMemberAccessForPropertyName(factory: NodeFactory, target: Expression, memberName: PropertyName, location?: TextRange): MemberExpression {
    if (isComputedPropertyName(memberName)) {
         return setTextRange(factory.createElementAccessExpression(target, memberName.expression), location);
    }
    else {
        const expression = setTextRange(
            isMemberName(memberName)
                ? factory.createPropertyAccessExpression(target, memberName)
                : factory.createElementAccessExpression(target, memberName),
            memberName
        );
        addEmitFlags(expression, EmitFlags.NoNestedSourceMaps);
        return expression;
    }
}

function createReactNamespace(reactNamespace: string, parent: JsxOpeningLikeElement | JsxOpeningFragment) {
    // To ensure the emit resolver can properly resolve the namespace, we need to
    // treat this identifier as if it were a source tree node by clearing the `Synthesized`
    // flag and setting a parent node.
    const react = parseNodeFactory.createIdentifier(reactNamespace || "React");
    // Set the parent that is in parse tree
    // this makes sure that parent chain is intact for checker to traverse complete scope tree
    setParent(react, getParseTreeNode(parent));
    return react;
}

function createJsxFactoryExpressionFromEntityName(factory: NodeFactory, jsxFactory: EntityName, parent: JsxOpeningLikeElement | JsxOpeningFragment): Expression {
    if (isQualifiedName(jsxFactory)) {
        const left = createJsxFactoryExpressionFromEntityName(factory, jsxFactory.left, parent);
        const right = factory.createIdentifier(idText(jsxFactory.right)) as Mutable<Identifier>;
        right.escapedText = jsxFactory.right.escapedText;
        return factory.createPropertyAccessExpression(left, right);
    }
    else {
        return createReactNamespace(idText(jsxFactory), parent);
    }
}

/** @internal */
export function createJsxFactoryExpression(factory: NodeFactory, jsxFactoryEntity: EntityName | undefined, reactNamespace: string, parent: JsxOpeningLikeElement | JsxOpeningFragment): Expression {
    return jsxFactoryEntity ?
        createJsxFactoryExpressionFromEntityName(factory, jsxFactoryEntity, parent) :
        factory.createPropertyAccessExpression(
            createReactNamespace(reactNamespace, parent),
            "createElement"
        );
}

function createJsxFragmentFactoryExpression(factory: NodeFactory, jsxFragmentFactoryEntity: EntityName | undefined, reactNamespace: string, parent: JsxOpeningLikeElement | JsxOpeningFragment): Expression {
    return jsxFragmentFactoryEntity ?
        createJsxFactoryExpressionFromEntityName(factory, jsxFragmentFactoryEntity, parent) :
        factory.createPropertyAccessExpression(
            createReactNamespace(reactNamespace, parent),
            "Fragment"
        );
}

/** @internal */
export function createExpressionForJsxElement(factory: NodeFactory, callee: Expression, tagName: Expression, props: Expression | undefined, children: readonly Expression[] | undefined, location: TextRange): LeftHandSideExpression {
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

    return setTextRange(
        factory.createCallExpression(
            callee,
            /*typeArguments*/ undefined,
            argumentsList
        ),
        location
    );
}

/** @internal */
export function createExpressionForJsxFragment(factory: NodeFactory, jsxFactoryEntity: EntityName | undefined, jsxFragmentFactoryEntity: EntityName | undefined, reactNamespace: string, children: readonly Expression[], parentElement: JsxOpeningFragment, location: TextRange): LeftHandSideExpression {
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

    return setTextRange(
        factory.createCallExpression(
            createJsxFactoryExpression(factory, jsxFactoryEntity, reactNamespace, parentElement),
            /*typeArguments*/ undefined,
            argumentsList
        ),
        location
    );
}

// Utilities

/** @internal */
export function createForOfBindingStatement(factory: NodeFactory, node: ForInitializer, boundValue: Expression): Statement {
    if (isVariableDeclarationList(node)) {
        const firstDeclaration = first(node.declarations);
        const updatedDeclaration = factory.updateVariableDeclaration(
            firstDeclaration,
            firstDeclaration.name,
            /*exclamationToken*/ undefined,
            /*type*/ undefined,
            boundValue
        );
        return setTextRange(
            factory.createVariableStatement(
                /*modifiers*/ undefined,
                factory.updateVariableDeclarationList(node, [updatedDeclaration])
            ),
            /*location*/ node
        );
    }
    else {
        const updatedExpression = setTextRange(factory.createAssignment(node, boundValue), /*location*/ node);
        return setTextRange(factory.createExpressionStatement(updatedExpression), /*location*/ node);
    }
}

/** @internal */
export function insertLeadingStatement(factory: NodeFactory, dest: Statement, source: Statement): Block {
    if (isBlock(dest)) {
        return factory.updateBlock(dest, setTextRange(factory.createNodeArray([source, ...dest.statements]), dest.statements));
    }
    else {
        return factory.createBlock(factory.createNodeArray([dest, source]), /*multiLine*/ true);
    }
}

/** @internal */
export function createExpressionFromEntityName(factory: NodeFactory, node: EntityName | Expression): Expression {
    if (isQualifiedName(node)) {
        const left = createExpressionFromEntityName(factory, node.left);
        // TODO(rbuckton): Does this need to be parented?
        const right = setParent(setTextRange(factory.cloneNode(node.right), node.right), node.right.parent);
        return setTextRange(factory.createPropertyAccessExpression(left, right), node);
    }
    else {
        // TODO(rbuckton): Does this need to be parented?
        return setParent(setTextRange(factory.cloneNode(node), node), node.parent);
    }
}

/** @internal */
export function createExpressionForPropertyName(factory: NodeFactory, memberName: Exclude<PropertyName, PrivateIdentifier>): Expression {
    if (isIdentifier(memberName)) {
        return factory.createStringLiteralFromNode(memberName);
    }
    else if (isComputedPropertyName(memberName)) {
        // TODO(rbuckton): Does this need to be parented?
        return setParent(setTextRange(factory.cloneNode(memberName.expression), memberName.expression), memberName.expression.parent);
    }
    else {
        // TODO(rbuckton): Does this need to be parented?
        return setParent(setTextRange(factory.cloneNode(memberName), memberName), memberName.parent);
    }
}

function createExpressionForAccessorDeclaration(factory: NodeFactory, properties: NodeArray<Declaration>, property: AccessorDeclaration & { readonly name: Exclude<PropertyName, PrivateIdentifier>; }, receiver: Expression, multiLine: boolean) {
    const { firstAccessor, getAccessor, setAccessor } = getAllAccessorDeclarations(properties, property);
    if (property === firstAccessor) {
        return setTextRange(
            factory.createObjectDefinePropertyCall(
                receiver,
                createExpressionForPropertyName(factory, property.name),
                factory.createPropertyDescriptor({
                    enumerable: factory.createFalse(),
                    configurable: true,
                    get: getAccessor && setTextRange(
                        setOriginalNode(
                            factory.createFunctionExpression(
                                getModifiers(getAccessor),
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
                    set: setAccessor && setTextRange(
                        setOriginalNode(
                            factory.createFunctionExpression(
                                getModifiers(setAccessor),
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

function createExpressionForPropertyAssignment(factory: NodeFactory, property: PropertyAssignment, receiver: Expression) {
    return setOriginalNode(
        setTextRange(
            factory.createAssignment(
                createMemberAccessForPropertyName(factory, receiver, property.name, /*location*/ property.name),
                property.initializer
            ),
            property
        ),
        property
    );
}

function createExpressionForShorthandPropertyAssignment(factory: NodeFactory, property: ShorthandPropertyAssignment, receiver: Expression) {
    return setOriginalNode(
        setTextRange(
            factory.createAssignment(
                createMemberAccessForPropertyName(factory, receiver, property.name, /*location*/ property.name),
                factory.cloneNode(property.name)
            ),
            /*location*/ property
        ),
        /*original*/ property
    );
}

function createExpressionForMethodDeclaration(factory: NodeFactory, method: MethodDeclaration, receiver: Expression) {
    return setOriginalNode(
        setTextRange(
            factory.createAssignment(
                createMemberAccessForPropertyName(factory, receiver, method.name, /*location*/ method.name),
                setOriginalNode(
                    setTextRange(
                        factory.createFunctionExpression(
                            getModifiers(method),
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

/** @internal */
export function createExpressionForObjectLiteralElementLike(factory: NodeFactory, node: ObjectLiteralExpression, property: ObjectLiteralElementLike, receiver: Expression): Expression | undefined {
    if (property.name && isPrivateIdentifier(property.name)) {
        Debug.failBadSyntaxKind(property.name, "Private identifiers are not allowed in object literals.");
    }
    switch (property.kind) {
        case SyntaxKind.GetAccessor:
        case SyntaxKind.SetAccessor:
            return createExpressionForAccessorDeclaration(factory, node.properties, property as typeof property & { readonly name: Exclude<PropertyName, PrivateIdentifier> }, receiver, !!node.multiLine);
        case SyntaxKind.PropertyAssignment:
            return createExpressionForPropertyAssignment(factory, property, receiver);
        case SyntaxKind.ShorthandPropertyAssignment:
            return createExpressionForShorthandPropertyAssignment(factory, property, receiver);
        case SyntaxKind.MethodDeclaration:
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
 *
 * @internal
 */
export function expandPreOrPostfixIncrementOrDecrementExpression(factory: NodeFactory, node: PrefixUnaryExpression | PostfixUnaryExpression, expression: Expression, recordTempVariable: (node: Identifier) => void, resultVariable: Identifier | undefined) {
    const operator = node.operator;
    Debug.assert(operator === SyntaxKind.PlusPlusToken || operator === SyntaxKind.MinusMinusToken, "Expected 'node' to be a pre- or post-increment or pre- or post-decrement expression");

    const temp = factory.createTempVariable(recordTempVariable);
    expression = factory.createAssignment(temp, expression);
    setTextRange(expression, node.operand);

    let operation: Expression = isPrefixUnaryExpression(node) ?
        factory.createPrefixUnaryExpression(operator, temp) :
        factory.createPostfixUnaryExpression(temp, operator);
    setTextRange(operation, node);

    if (resultVariable) {
        operation = factory.createAssignment(resultVariable, operation);
        setTextRange(operation, node);
    }

    expression = factory.createComma(expression, operation);
    setTextRange(expression, node);

    if (isPostfixUnaryExpression(node)) {
        expression = factory.createComma(expression, temp);
        setTextRange(expression, node);
    }

    return expression;
}

/**
 * Gets whether an identifier should only be referred to by its internal name.
 *
 * @internal
 */
export function isInternalName(node: Identifier) {
    return (getEmitFlags(node) & EmitFlags.InternalName) !== 0;
}

/**
 * Gets whether an identifier should only be referred to by its local name.
 *
 * @internal
 */
export function isLocalName(node: Identifier) {
    return (getEmitFlags(node) & EmitFlags.LocalName) !== 0;
}

/**
 * Gets whether an identifier should only be referred to by its export representation if the
 * name points to an exported symbol.
 *
 * @internal
 */
export function isExportName(node: Identifier) {
    return (getEmitFlags(node) & EmitFlags.ExportName) !== 0;
}

/** @internal */
export function isCommaExpression(node: Expression): node is BinaryExpression & { operatorToken: Token<SyntaxKind.CommaToken> } {
    return node.kind === SyntaxKind.BinaryExpression && (node as BinaryExpression).operatorToken.kind === SyntaxKind.CommaToken;
}

/** @internal */
export function isCommaSequence(node: Expression): node is BinaryExpression & {operatorToken: Token<SyntaxKind.CommaToken>} | CommaListExpression {
    return isCommaExpression(node) || isCommaListExpression(node);
}

/** @internal */
export function getJSDocTypeAssertionType(node: JSDocTypeAssertion): TypeNode {
    const type = getJSDocType(node);
    Debug.assertIsDefined(type);
    return type;
}

/** @internal */
export function startOnNewLine<T extends Node>(node: T): T {
    return setStartsOnNewLine(node, /*newLine*/ true);
}

/** @internal */
export function getExternalHelpersModuleName(node: SourceFile) {
    const parseNode = getOriginalNode(node, isSourceFile);
    const emitNode = parseNode && parseNode.emitNode;
    return emitNode && emitNode.externalHelpersModuleName;
}

/** @internal */
export function hasRecordedExternalHelpers(sourceFile: SourceFile) {
    const parseNode = getOriginalNode(sourceFile, isSourceFile);
    const emitNode = parseNode && parseNode.emitNode;
    return !!emitNode && (!!emitNode.externalHelpersModuleName || !!emitNode.externalHelpers);
}

/** @internal */
export function createExternalHelpersImportDeclarationIfNeeded(nodeFactory: NodeFactory, helperFactory: EmitHelperFactory, sourceFile: SourceFile, compilerOptions: CompilerOptions, hasExportStarsToExportValues?: boolean, hasImportStar?: boolean, hasImportDefault?: boolean) {
    if (compilerOptions.importHelpers && isEffectiveExternalModule(sourceFile, compilerOptions)) {
        let namedBindings: NamedImportBindings | undefined;
        const moduleKind = getEmitModuleKind(compilerOptions);
        if ((moduleKind >= ModuleKind.ES2015 && moduleKind <= ModuleKind.ESNext) || sourceFile.impliedNodeFormat === ModuleKind.ESNext) {
            // use named imports
            const helpers = getEmitHelpers(sourceFile);
            if (helpers) {
                const helperNames: string[] = [];
                for (const helper of helpers) {
                    if (!helper.scoped) {
                        const importName = helper.importName;
                        if (importName) {
                            pushIfUnique(helperNames, importName);
                        }
                    }
                }
                if (some(helperNames)) {
                    helperNames.sort(compareStringsCaseSensitive);
                    // Alias the imports if the names are used somewhere in the file.
                    // NOTE: We don't need to care about global import collisions as this is a module.
                    namedBindings = nodeFactory.createNamedImports(
                        map(helperNames, name => isFileLevelUniqueName(sourceFile, name)
                            ? nodeFactory.createImportSpecifier(/*isTypeOnly*/ false, /*propertyName*/ undefined, nodeFactory.createIdentifier(name))
                            : nodeFactory.createImportSpecifier(/*isTypeOnly*/ false, nodeFactory.createIdentifier(name), helperFactory.getUnscopedHelperName(name))
                        )
                    );
                    const parseNode = getOriginalNode(sourceFile, isSourceFile);
                    const emitNode = getOrCreateEmitNode(parseNode);
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
                nodeFactory.createStringLiteral(externalHelpersModuleNameText),
                 /*assertClause*/ undefined
            );
            addInternalEmitFlags(externalHelpersImportDeclaration, InternalEmitFlags.NeverApplyImportHelper);
            return externalHelpersImportDeclaration;
        }
    }
}

/** @internal */
export function getOrCreateExternalHelpersModuleNameIfNeeded(factory: NodeFactory, node: SourceFile, compilerOptions: CompilerOptions, hasExportStarsToExportValues?: boolean, hasImportStarOrImportDefault?: boolean) {
    if (compilerOptions.importHelpers && isEffectiveExternalModule(node, compilerOptions)) {
        const externalHelpersModuleName = getExternalHelpersModuleName(node);
        if (externalHelpersModuleName) {
            return externalHelpersModuleName;
        }

        const moduleKind = getEmitModuleKind(compilerOptions);
        let create = (hasExportStarsToExportValues || (getESModuleInterop(compilerOptions) && hasImportStarOrImportDefault))
            && moduleKind !== ModuleKind.System
            && (moduleKind < ModuleKind.ES2015 || node.impliedNodeFormat === ModuleKind.CommonJS);
        if (!create) {
            const helpers = getEmitHelpers(node);
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
            const parseNode = getOriginalNode(node, isSourceFile);
            const emitNode = getOrCreateEmitNode(parseNode);
            return emitNode.externalHelpersModuleName || (emitNode.externalHelpersModuleName = factory.createUniqueName(externalHelpersModuleNameText));
        }
    }
}

/**
 * Get the name of that target module from an import or export declaration
 *
 * @internal
 */
export function getLocalNameForExternalImport(factory: NodeFactory, node: ImportDeclaration | ExportDeclaration | ImportEqualsDeclaration, sourceFile: SourceFile): Identifier | undefined {
    const namespaceDeclaration = getNamespaceDeclarationNode(node);
    if (namespaceDeclaration && !isDefaultImport(node) && !isExportNamespaceAsDefaultDeclaration(node)) {
        const name = namespaceDeclaration.name;
        return isGeneratedIdentifier(name) ? name : factory.createIdentifier(getSourceTextOfNodeFromSourceFile(sourceFile, name) || idText(name));
    }
    if (node.kind === SyntaxKind.ImportDeclaration && node.importClause) {
        return factory.getGeneratedNameForNode(node);
    }
    if (node.kind === SyntaxKind.ExportDeclaration && node.moduleSpecifier) {
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
 *
 * @internal
 */
export function getExternalModuleNameLiteral(factory: NodeFactory, importNode: ImportDeclaration | ExportDeclaration | ImportEqualsDeclaration | ImportCall, sourceFile: SourceFile, host: EmitHost, resolver: EmitResolver, compilerOptions: CompilerOptions) {
    const moduleName = getExternalModuleName(importNode);
    if (moduleName && isStringLiteral(moduleName)) {
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
function tryRenameExternalModule(factory: NodeFactory, moduleName: LiteralExpression, sourceFile: SourceFile) {
    const rename = sourceFile.renamedDependencies && sourceFile.renamedDependencies.get(moduleName.text);
    return rename ? factory.createStringLiteral(rename) : undefined;
}

/**
 * Get the name of a module as should be written in the emitted output.
 * The emitted output name can be different from the input if:
 *  1. The module has a /// <amd-module name="<new name>" />
 *  2. --out or --outFile is used, making the name relative to the rootDir
 * Otherwise, a new StringLiteral node representing the module name will be returned.
 *
 * @internal
 */
export function tryGetModuleNameFromFile(factory: NodeFactory, file: SourceFile | undefined, host: EmitHost, options: CompilerOptions): StringLiteral | undefined {
    if (!file) {
        return undefined;
    }
    if (file.moduleName) {
        return factory.createStringLiteral(file.moduleName);
    }
    if (!file.isDeclarationFile && outFile(options)) {
        return factory.createStringLiteral(getExternalModuleNameFromPath(host, file.fileName));
    }
    return undefined;
}

function tryGetModuleNameFromDeclaration(declaration: ImportEqualsDeclaration | ImportDeclaration | ExportDeclaration | ImportCall, host: EmitHost, factory: NodeFactory, resolver: EmitResolver, compilerOptions: CompilerOptions) {
    return tryGetModuleNameFromFile(factory, resolver.getExternalModuleFileFromDeclaration(declaration), host, compilerOptions);
}

/**
 * Gets the initializer of an BindingOrAssignmentElement.
 *
 * @internal
 */
export function getInitializerOfBindingOrAssignmentElement(bindingElement: BindingOrAssignmentElement): Expression | undefined {
    if (isDeclarationBindingElement(bindingElement)) {
        // `1` in `let { a = 1 } = ...`
        // `1` in `let { a: b = 1 } = ...`
        // `1` in `let { a: {b} = 1 } = ...`
        // `1` in `let { a: [b] = 1 } = ...`
        // `1` in `let [a = 1] = ...`
        // `1` in `let [{a} = 1] = ...`
        // `1` in `let [[a] = 1] = ...`
        return bindingElement.initializer;
    }

    if (isPropertyAssignment(bindingElement)) {
        // `1` in `({ a: b = 1 } = ...)`
        // `1` in `({ a: {b} = 1 } = ...)`
        // `1` in `({ a: [b] = 1 } = ...)`
        const initializer = bindingElement.initializer;
        return isAssignmentExpression(initializer, /*excludeCompoundAssignment*/ true)
            ? initializer.right
            : undefined;
    }

    if (isShorthandPropertyAssignment(bindingElement)) {
        // `1` in `({ a = 1 } = ...)`
        return bindingElement.objectAssignmentInitializer;
    }

    if (isAssignmentExpression(bindingElement, /*excludeCompoundAssignment*/ true)) {
        // `1` in `[a = 1] = ...`
        // `1` in `[{a} = 1] = ...`
        // `1` in `[[a] = 1] = ...`
        return bindingElement.right;
    }

    if (isSpreadElement(bindingElement)) {
        // Recovery consistent with existing emit.
        return getInitializerOfBindingOrAssignmentElement(bindingElement.expression as BindingOrAssignmentElement);
    }
}

/**
 * Gets the name of an BindingOrAssignmentElement.
 *
 * @internal
 */
export function getTargetOfBindingOrAssignmentElement(bindingElement: BindingOrAssignmentElement): BindingOrAssignmentElementTarget | undefined {
    if (isDeclarationBindingElement(bindingElement)) {
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

    if (isObjectLiteralElementLike(bindingElement)) {
        switch (bindingElement.kind) {
            case SyntaxKind.PropertyAssignment:
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
                return getTargetOfBindingOrAssignmentElement(bindingElement.initializer as BindingOrAssignmentElement);

            case SyntaxKind.ShorthandPropertyAssignment:
                // `a` in `({ a } = ...)`
                // `a` in `({ a = 1 } = ...)`
                return bindingElement.name;

            case SyntaxKind.SpreadAssignment:
                // `a` in `({ ...a } = ...)`
                return getTargetOfBindingOrAssignmentElement(bindingElement.expression as BindingOrAssignmentElement);
        }

        // no target
        return undefined;
    }

    if (isAssignmentExpression(bindingElement, /*excludeCompoundAssignment*/ true)) {
        // `a` in `[a = 1] = ...`
        // `{a}` in `[{a} = 1] = ...`
        // `[a]` in `[[a] = 1] = ...`
        // `a.b` in `[a.b = 1] = ...`
        // `a[0]` in `[a[0] = 1] = ...`
        return getTargetOfBindingOrAssignmentElement(bindingElement.left as BindingOrAssignmentElement);
    }

    if (isSpreadElement(bindingElement)) {
        // `a` in `[...a] = ...`
        return getTargetOfBindingOrAssignmentElement(bindingElement.expression as BindingOrAssignmentElement);
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
 *
 * @internal
 */
export function getRestIndicatorOfBindingOrAssignmentElement(bindingElement: BindingOrAssignmentElement): BindingOrAssignmentElementRestIndicator | undefined {
    switch (bindingElement.kind) {
        case SyntaxKind.Parameter:
        case SyntaxKind.BindingElement:
            // `...` in `let [...a] = ...`
            return bindingElement.dotDotDotToken;

        case SyntaxKind.SpreadElement:
        case SyntaxKind.SpreadAssignment:
            // `...` in `[...a] = ...`
            return bindingElement;
    }

    return undefined;
}

/**
 * Gets the property name of a BindingOrAssignmentElement
 *
 * @internal
 */
export function getPropertyNameOfBindingOrAssignmentElement(bindingElement: BindingOrAssignmentElement): Exclude<PropertyName, PrivateIdentifier> | undefined {
    const propertyName = tryGetPropertyNameOfBindingOrAssignmentElement(bindingElement);
    Debug.assert(!!propertyName || isSpreadAssignment(bindingElement), "Invalid property name for binding element.");
    return propertyName;
}

/** @internal */
export function tryGetPropertyNameOfBindingOrAssignmentElement(bindingElement: BindingOrAssignmentElement): Exclude<PropertyName, PrivateIdentifier> | undefined {
    switch (bindingElement.kind) {
        case SyntaxKind.BindingElement:
            // `a` in `let { a: b } = ...`
            // `[a]` in `let { [a]: b } = ...`
            // `"a"` in `let { "a": b } = ...`
            // `1` in `let { 1: b } = ...`
            if (bindingElement.propertyName) {
                const propertyName = bindingElement.propertyName;
                if (isPrivateIdentifier(propertyName)) {
                    return Debug.failBadSyntaxKind(propertyName);
                }
                return isComputedPropertyName(propertyName) && isStringOrNumericLiteral(propertyName.expression)
                    ? propertyName.expression
                    : propertyName;
            }

            break;

        case SyntaxKind.PropertyAssignment:
            // `a` in `({ a: b } = ...)`
            // `[a]` in `({ [a]: b } = ...)`
            // `"a"` in `({ "a": b } = ...)`
            // `1` in `({ 1: b } = ...)`
            if (bindingElement.name) {
                const propertyName = bindingElement.name;
                if (isPrivateIdentifier(propertyName)) {
                    return Debug.failBadSyntaxKind(propertyName);
                }
                return isComputedPropertyName(propertyName) && isStringOrNumericLiteral(propertyName.expression)
                    ? propertyName.expression
                    : propertyName;
            }

            break;

        case SyntaxKind.SpreadAssignment:
            // `a` in `({ ...a } = ...)`
            if (bindingElement.name && isPrivateIdentifier(bindingElement.name)) {
                return Debug.failBadSyntaxKind(bindingElement.name);
            }
            return bindingElement.name;
    }

    const target = getTargetOfBindingOrAssignmentElement(bindingElement);
    if (target && isPropertyName(target)) {
        return target;
    }
}

function isStringOrNumericLiteral(node: Node): node is StringLiteral | NumericLiteral {
    const kind = node.kind;
    return kind === SyntaxKind.StringLiteral
        || kind === SyntaxKind.NumericLiteral;
}

/**
 * Gets the elements of a BindingOrAssignmentPattern
 *
 * @internal
 */
export function getElementsOfBindingOrAssignmentPattern(name: BindingOrAssignmentPattern): readonly BindingOrAssignmentElement[] {
    switch (name.kind) {
        case SyntaxKind.ObjectBindingPattern:
        case SyntaxKind.ArrayBindingPattern:
        case SyntaxKind.ArrayLiteralExpression:
            // `a` in `{a}`
            // `a` in `[a]`
            return name.elements as readonly BindingOrAssignmentElement[];

        case SyntaxKind.ObjectLiteralExpression:
            // `a` in `{a}`
            return name.properties as readonly BindingOrAssignmentElement[];
    }
}

/** @internal */
export function getJSDocTypeAliasName(fullName: JSDocNamespaceBody | undefined) {
    if (fullName) {
        let rightNode = fullName;
        while (true) {
            if (isIdentifier(rightNode) || !rightNode.body) {
                return isIdentifier(rightNode) ? rightNode : rightNode.name;
            }
            rightNode = rightNode.body;
        }
    }
}

/** @internal */
export function canHaveIllegalType(node: Node): node is HasIllegalType {
    const kind = node.kind;
    return kind === SyntaxKind.Constructor
        || kind === SyntaxKind.SetAccessor;
}

/** @internal */
export function canHaveIllegalModifiers(node: Node): node is HasIllegalModifiers {
    const kind = node.kind;
    return kind === SyntaxKind.ClassStaticBlockDeclaration
        || kind === SyntaxKind.PropertyAssignment
        || kind === SyntaxKind.ShorthandPropertyAssignment
        || kind === SyntaxKind.MissingDeclaration
        || kind === SyntaxKind.NamespaceExportDeclaration;
}

export function isQuestionOrExclamationToken(node: Node): node is QuestionToken | ExclamationToken {
    return isQuestionToken(node) || isExclamationToken(node);
}

export function isIdentifierOrThisTypeNode(node: Node): node is Identifier | ThisTypeNode {
    return isIdentifier(node) || isThisTypeNode(node);
}

export function isReadonlyKeywordOrPlusOrMinusToken(node: Node): node is ReadonlyKeyword | PlusToken | MinusToken {
    return isReadonlyKeyword(node) || isPlusToken(node) || isMinusToken(node);
}

export function isQuestionOrPlusOrMinusToken(node: Node): node is QuestionToken | PlusToken | MinusToken {
    return isQuestionToken(node) || isPlusToken(node) || isMinusToken(node);
}

export function isModuleName(node: Node): node is ModuleName {
    return isIdentifier(node) || isStringLiteral(node);
}

/** @internal */
export function isLiteralTypeLikeExpression(node: Node): node is NullLiteral | BooleanLiteral | LiteralExpression | PrefixUnaryExpression {
    const kind = node.kind;
    return kind === SyntaxKind.NullKeyword
        || kind === SyntaxKind.TrueKeyword
        || kind === SyntaxKind.FalseKeyword
        || isLiteralExpression(node)
        || isPrefixUnaryExpression(node);
}

function isExponentiationOperator(kind: SyntaxKind): kind is ExponentiationOperator {
    return kind === SyntaxKind.AsteriskAsteriskToken;
}

function isMultiplicativeOperator(kind: SyntaxKind): kind is MultiplicativeOperator {
    return kind === SyntaxKind.AsteriskToken
        || kind === SyntaxKind.SlashToken
        || kind === SyntaxKind.PercentToken;
}

function isMultiplicativeOperatorOrHigher(kind: SyntaxKind): kind is MultiplicativeOperatorOrHigher {
    return isExponentiationOperator(kind)
        || isMultiplicativeOperator(kind);
}

function isAdditiveOperator(kind: SyntaxKind): kind is AdditiveOperator {
    return kind === SyntaxKind.PlusToken
        || kind === SyntaxKind.MinusToken;
}

function isAdditiveOperatorOrHigher(kind: SyntaxKind): kind is AdditiveOperatorOrHigher {
    return isAdditiveOperator(kind)
        || isMultiplicativeOperatorOrHigher(kind);
}

function isShiftOperator(kind: SyntaxKind): kind is ShiftOperator {
    return kind === SyntaxKind.LessThanLessThanToken
        || kind === SyntaxKind.GreaterThanGreaterThanToken
        || kind === SyntaxKind.GreaterThanGreaterThanGreaterThanToken;
}

function isShiftOperatorOrHigher(kind: SyntaxKind): kind is ShiftOperatorOrHigher {
    return isShiftOperator(kind)
        || isAdditiveOperatorOrHigher(kind);
}

function isRelationalOperator(kind: SyntaxKind): kind is RelationalOperator {
    return kind === SyntaxKind.LessThanToken
        || kind === SyntaxKind.LessThanEqualsToken
        || kind === SyntaxKind.GreaterThanToken
        || kind === SyntaxKind.GreaterThanEqualsToken
        || kind === SyntaxKind.InstanceOfKeyword
        || kind === SyntaxKind.InKeyword;
}

function isRelationalOperatorOrHigher(kind: SyntaxKind): kind is RelationalOperatorOrHigher {
    return isRelationalOperator(kind)
        || isShiftOperatorOrHigher(kind);
}

function isEqualityOperator(kind: SyntaxKind): kind is EqualityOperator {
    return kind === SyntaxKind.EqualsEqualsToken
        || kind === SyntaxKind.EqualsEqualsEqualsToken
        || kind === SyntaxKind.ExclamationEqualsToken
        || kind === SyntaxKind.ExclamationEqualsEqualsToken;
}

function isEqualityOperatorOrHigher(kind: SyntaxKind): kind is EqualityOperatorOrHigher {
    return isEqualityOperator(kind)
        || isRelationalOperatorOrHigher(kind);
}

function isBitwiseOperator(kind: SyntaxKind): kind is BitwiseOperator {
    return kind === SyntaxKind.AmpersandToken
        || kind === SyntaxKind.BarToken
        || kind === SyntaxKind.CaretToken;
}

function isBitwiseOperatorOrHigher(kind: SyntaxKind): kind is BitwiseOperatorOrHigher {
    return isBitwiseOperator(kind)
        || isEqualityOperatorOrHigher(kind);
}

// NOTE: The version in utilities includes ExclamationToken, which is not a binary operator.
function isLogicalOperator(kind: SyntaxKind): kind is LogicalOperator {
    return kind === SyntaxKind.AmpersandAmpersandToken
        || kind === SyntaxKind.BarBarToken;
}

function isLogicalOperatorOrHigher(kind: SyntaxKind): kind is LogicalOperatorOrHigher {
    return isLogicalOperator(kind)
        || isBitwiseOperatorOrHigher(kind);
}

function isAssignmentOperatorOrHigher(kind: SyntaxKind): kind is AssignmentOperatorOrHigher {
    return kind === SyntaxKind.QuestionQuestionToken
        || isLogicalOperatorOrHigher(kind)
        || isAssignmentOperator(kind);
}

function isBinaryOperator(kind: SyntaxKind): kind is BinaryOperator {
    return isAssignmentOperatorOrHigher(kind)
        || kind === SyntaxKind.CommaToken;
}

export function isBinaryOperatorToken(node: Node): node is BinaryOperatorToken {
    return isBinaryOperator(node.kind);
}

function isExportOrDefaultKeywordKind(kind: SyntaxKind): kind is SyntaxKind.ExportKeyword | SyntaxKind.DefaultKeyword {
    return kind === SyntaxKind.ExportKeyword || kind === SyntaxKind.DefaultKeyword;
}

/** @internal */
export function isExportOrDefaultModifier(node: Node): node is ExportKeyword | DefaultKeyword {
    const kind = node.kind;
    return isExportOrDefaultKeywordKind(kind);
}

/** @internal */
export function isNonExportDefaultModifier(node: Node): node is Exclude<Modifier, ExportKeyword | DefaultKeyword> {
    const kind = node.kind;
    return isModifierKind(kind) && !isExportOrDefaultKeywordKind(kind);
}

/**
 * If `nodes` is not undefined, creates an empty `NodeArray` that preserves the `pos` and `end` of `nodes`.
 * @internal
 */
export function elideNodes<T extends Node>(factory: NodeFactory, nodes: NodeArray<T>): NodeArray<T>;
/** @internal */
export function elideNodes<T extends Node>(factory: NodeFactory, nodes: NodeArray<T> | undefined): NodeArray<T> | undefined;
/** @internal */
export function elideNodes<T extends Node>(factory: NodeFactory, nodes: NodeArray<T> | undefined): NodeArray<T> | undefined {
    if (nodes === undefined) return undefined;
    if (nodes.length === 0) return nodes;
    return setTextRange(factory.createNodeArray([], nodes.hasTrailingComma), nodes);
}

/**
 * Gets the node from which a name should be generated.
 *
 * @internal
 */
export function getNodeForGeneratedName(name: GeneratedIdentifier | GeneratedPrivateIdentifier) {
    const autoGenerate = name.emitNode.autoGenerate;
    if (autoGenerate.flags & GeneratedIdentifierFlags.Node) {
        const autoGenerateId = autoGenerate.id;
        let node = name as Node;
        let original = node.original;
        while (original) {
            node = original;
            const autoGenerate = node.emitNode?.autoGenerate;
            // if "node" is a different generated name (having a different "autoGenerateId"), use it and stop traversing.
            if (isMemberName(node) && (
                autoGenerate === undefined ||
                !!(autoGenerate.flags & GeneratedIdentifierFlags.Node) &&
                autoGenerate.id !== autoGenerateId)) {
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
 *
 * @internal
 */
export function formatGeneratedNamePart(part: string | undefined): string;
/**
 * Formats a prefix or suffix of a generated name. If the part is a {@link GeneratedNamePart}, calls {@link generateName} to format the source node.
 *
 * @internal
 */
export function formatGeneratedNamePart(part: string | GeneratedNamePart | undefined, generateName: (name: GeneratedIdentifier | GeneratedPrivateIdentifier) => string): string;
/** @internal */
export function formatGeneratedNamePart(part: string | GeneratedNamePart | undefined, generateName?: (name: GeneratedIdentifier | GeneratedPrivateIdentifier) => string): string {
    return typeof part === "object" ? formatGeneratedName(/*privateName*/ false, part.prefix, part.node, part.suffix, generateName!) :
        typeof part === "string" ? part.length > 0 && part.charCodeAt(0) === CharacterCodes.hash ? part.slice(1) : part :
        "";
}

function formatIdentifier(name: string | Identifier | PrivateIdentifier, generateName?: (name: GeneratedIdentifier | GeneratedPrivateIdentifier) => string) {
    return typeof name === "string" ? name :
        formatIdentifierWorker(name, Debug.checkDefined(generateName));
}

function formatIdentifierWorker(node: Identifier | PrivateIdentifier, generateName: (name: GeneratedIdentifier | GeneratedPrivateIdentifier) => string) {
    return isGeneratedPrivateIdentifier(node) ? generateName(node).slice(1) :
        isGeneratedIdentifier(node) ? generateName(node) :
        isPrivateIdentifier(node) ? (node.escapedText as string).slice(1) :
        idText(node);
}

/**
 * Formats a generated name.
 * @param privateName When `true`, inserts a `#` character at the start of the result.
 * @param prefix The prefix (if any) to include before the base name.
 * @param baseName The base name for the generated name.
 * @param suffix The suffix (if any) to include after the base name.
 *
 * @internal
 */
export function formatGeneratedName(privateName: boolean, prefix: string | undefined, baseName: string, suffix: string | undefined): string;
/**
 * Formats a generated name.
 * @param privateName When `true`, inserts a `#` character at the start of the result.
 * @param prefix The prefix (if any) to include before the base name.
 * @param baseName The base name for the generated name.
 * @param suffix The suffix (if any) to include after the base name.
 * @param generateName Called to format the source node of {@link prefix} when it is a {@link GeneratedNamePart}.
 *
 * @internal
 */
export function formatGeneratedName(privateName: boolean, prefix: string | GeneratedNamePart | undefined, baseName: string | Identifier | PrivateIdentifier, suffix: string | GeneratedNamePart | undefined, generateName: (name: GeneratedIdentifier | GeneratedPrivateIdentifier) => string): string;
/** @internal */
export function formatGeneratedName(privateName: boolean, prefix: string | GeneratedNamePart | undefined, baseName: string | Identifier | PrivateIdentifier, suffix: string | GeneratedNamePart | undefined, generateName?: (name: GeneratedIdentifier | GeneratedPrivateIdentifier) => string) {
    prefix = formatGeneratedNamePart(prefix, generateName!);
    suffix = formatGeneratedNamePart(suffix, generateName!);
    baseName = formatIdentifier(baseName, generateName);
    return `${privateName ? "#" : ""}${prefix}${baseName}${suffix}`;
}

/**
 * Creates a private backing field for an `accessor` {@link PropertyDeclaration}.
 *
 * @internal
 */
export function createAccessorPropertyBackingField(factory: NodeFactory, node: PropertyDeclaration, modifiers: ModifiersArray | undefined, initializer: Expression | undefined) {
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
 *
 * @internal
 */
export function createAccessorPropertyGetRedirector(factory: NodeFactory, node: PropertyDeclaration, modifiers: ModifiersArray | undefined, name: PropertyName): GetAccessorDeclaration {
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
 *
 * @internal
 */
export function createAccessorPropertySetRedirector(factory: NodeFactory, node: PropertyDeclaration, modifiers: ModifiersArray | undefined, name: PropertyName): SetAccessorDeclaration {
    return factory.createSetAccessorDeclaration(
        modifiers,
        name,
        [factory.createParameterDeclaration(
            /*modifiers*/ undefined,
            /*dotDotDotToken*/ undefined,
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

/** @internal */
export function createPropertyNameNodeForIdentifierOrLiteral(factory: NodeFactory, name: string, target: ScriptTarget, singleQuote?: boolean, stringNamed?: boolean) {
    return isIdentifierText(name, target) ? factory.createIdentifier(name) :
        !stringNamed && isNumericLiteralName(name) && +name >= 0 ? factory.createNumericLiteral(+name) :
        factory.createStringLiteral(name, !!singleQuote);
}

/** @internal */
export function findComputedPropertyNameCacheAssignment(name: ComputedPropertyName) {
    let node = name.expression;
    while (true) {
        node = skipOuterExpressions(node);
        if (isCommaListExpression(node)) {
            node = last(node.elements);
            continue;
        }

        if (isCommaExpression(node)) {
            node = node.right;
            continue;
        }

        if (isAssignmentExpression(node, /*excludeCompoundAssignment*/ true) && isGeneratedIdentifier(node.left)) {
            return node as AssignmentExpression<EqualsToken> & { readonly left: GeneratedIdentifier };
        }

        break;
    }
}

function isSyntheticParenthesizedExpression(node: Expression): node is ParenthesizedExpression {
    return isParenthesizedExpression(node) && nodeIsSynthesized(node) && !node.emitNode;
}

function flattenCommaListWorker(node: Expression, expressions: Expression[]) {
    if (isSyntheticParenthesizedExpression(node)) {
        flattenCommaListWorker(node.expression, expressions);
    }
    else if (isCommaExpression(node)) {
        flattenCommaListWorker(node.left, expressions);
        flattenCommaListWorker(node.right, expressions);
    }
    else if (isCommaListExpression(node)) {
        for (const child of node.elements) {
            flattenCommaListWorker(child, expressions);
        }
    }
    else {
        expressions.push(node);
    }
}

/**
 * Flatten a CommaExpression or CommaListExpression into an array of one or more expressions, unwrapping any nested
 * comma expressions and synthetic parens.
 *
 * @internal
 */
export function flattenCommaList(node: Expression) {
    const expressions: Expression[] = [];
    flattenCommaListWorker(node, expressions);
    return expressions;
}

/**
 * Walk an AssignmentPattern to determine if it contains object rest (`...`) syntax. We cannot rely on
 * propagation of `TransformFlags.ContainsObjectRestOrSpread` since it isn't propagated by default in
 * ObjectLiteralExpression and ArrayLiteralExpression since we do not know whether they belong to an
 * AssignmentPattern at the time the nodes are parsed.
 *
 * @internal
 */
export function containsObjectRestOrSpread(node: AssignmentPattern): boolean {
    if (node.transformFlags & TransformFlags.ContainsObjectRestOrSpread) return true;
    if (node.transformFlags & TransformFlags.ContainsES2018) {
        // check for nested spread assignments, otherwise '{ x: { a, ...b } = foo } = c'
        // will not be correctly interpreted by the ES2018 transformer
        for (const element of getElementsOfBindingOrAssignmentPattern(node)) {
            const target = getTargetOfBindingOrAssignmentElement(element);
            if (target && isAssignmentPattern(target)) {
                if (target.transformFlags & TransformFlags.ContainsObjectRestOrSpread) {
                    return true;
                }
                if (target.transformFlags & TransformFlags.ContainsES2018) {
                    if (containsObjectRestOrSpread(target)) return true;
                }
            }
        }
    }
    return false;
}
