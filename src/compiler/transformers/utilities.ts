import {
    __String,
    AccessorDeclaration,
    AllDecorators,
    append,
    BinaryOperator,
    BindingElement,
    Bundle,
    cast,
    ClassDeclaration,
    ClassElement,
    ClassExpression,
    ClassLikeDeclaration,
    ClassStaticBlockDeclaration,
    CompoundAssignmentOperator,
    CoreTransformationContext,
    createExternalHelpersImportDeclarationIfNeeded,
    Decorator,
    every,
    ExportAssignment,
    ExportDeclaration,
    ExportSpecifier,
    Expression,
    filter,
    formatGeneratedName,
    FunctionDeclaration,
    FunctionLikeDeclaration,
    GeneratedIdentifierFlags,
    getAllAccessorDeclarations,
    getDecorators,
    getFirstConstructorWithBody,
    getNamespaceDeclarationNode,
    getNodeForGeneratedName,
    getNodeId,
    getOriginalNode,
    hasDecorators,
    hasStaticModifier,
    hasSyntacticModifier,
    Identifier,
    idText,
    ImportDeclaration,
    ImportEqualsDeclaration,
    ImportSpecifier,
    InitializedPropertyDeclaration,
    InternalSymbolName,
    isAutoAccessorPropertyDeclaration,
    isBindingPattern,
    isClassStaticBlockDeclaration,
    isDefaultImport,
    isExpressionStatement,
    isGeneratedIdentifier,
    isGeneratedPrivateIdentifier,
    isIdentifier,
    isKeyword,
    isLocalName,
    isMemberName,
    isMethodOrAccessor,
    isNamedExports,
    isNamedImports,
    isOmittedExpression,
    isPrivateIdentifier,
    isPropertyDeclaration,
    isStatic,
    isStringLiteralLike,
    isSuperCall,
    isTryStatement,
    LogicalOperatorOrHigher,
    map,
    MethodDeclaration,
    ModifierFlags,
    NamedImportBindings,
    NamespaceExport,
    Node,
    NodeArray,
    ParameterDeclaration,
    parameterIsThisKeyword,
    PrivateIdentifier,
    PrivateIdentifierAccessorDeclaration,
    PrivateIdentifierAutoAccessorPropertyDeclaration,
    PrivateIdentifierMethodDeclaration,
    PropertyDeclaration,
    skipParentheses,
    some,
    SourceFile,
    Statement,
    SuperCall,
    SyntaxKind,
    TransformationContext,
    unorderedRemoveItem,
    VariableDeclaration,
    VariableStatement,
} from "../_namespaces/ts";

/** @internal */
export function getOriginalNodeId(node: Node) {
    node = getOriginalNode(node);
    return node ? getNodeId(node) : 0;
}

/** @internal */
export interface ExternalModuleInfo {
    externalImports: (ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration)[]; // imports of other external modules
    externalHelpersImportDeclaration: ImportDeclaration | undefined; // import of external helpers
    exportSpecifiers: IdentifierNameMap<ExportSpecifier[]>; // file-local export specifiers by name (no reexports)
    exportedBindings: Identifier[][]; // exported names of local declarations
    exportedNames: Identifier[] | undefined; // all exported names in the module, both local and reexported
    exportEquals: ExportAssignment | undefined; // an export= declaration if one was present
    hasExportStarsToExportValues: boolean; // whether this module contains export*
}

function containsDefaultReference(node: NamedImportBindings | undefined) {
    if (!node) return false;
    if (!isNamedImports(node)) return false;
    return some(node.elements, isNamedDefaultReference);
}

function isNamedDefaultReference(e: ImportSpecifier): boolean {
    return e.propertyName !== undefined && e.propertyName.escapedText === InternalSymbolName.Default;
}

/** @internal */
export function chainBundle(context: CoreTransformationContext, transformSourceFile: (x: SourceFile) => SourceFile): (x: SourceFile | Bundle) => SourceFile | Bundle {
    return transformSourceFileOrBundle;

    function transformSourceFileOrBundle(node: SourceFile | Bundle) {
        return node.kind === SyntaxKind.SourceFile ? transformSourceFile(node) : transformBundle(node);
    }

    function transformBundle(node: Bundle) {
        return context.factory.createBundle(map(node.sourceFiles, transformSourceFile), node.prepends);
    }
}

/** @internal */
export function getExportNeedsImportStarHelper(node: ExportDeclaration): boolean {
    return !!getNamespaceDeclarationNode(node);
}

/** @internal */
export function getImportNeedsImportStarHelper(node: ImportDeclaration): boolean {
    if (!!getNamespaceDeclarationNode(node)) {
        return true;
    }
    const bindings = node.importClause && node.importClause.namedBindings;
    if (!bindings) {
        return false;
    }
    if (!isNamedImports(bindings)) return false;
    let defaultRefCount = 0;
    for (const binding of bindings.elements) {
        if (isNamedDefaultReference(binding)) {
            defaultRefCount++;
        }
    }
    // Import star is required if there's default named refs mixed with non-default refs, or if theres non-default refs and it has a default import
    return (defaultRefCount > 0 && defaultRefCount !== bindings.elements.length) || (!!(bindings.elements.length - defaultRefCount) && isDefaultImport(node));
}

/** @internal */
export function getImportNeedsImportDefaultHelper(node: ImportDeclaration): boolean {
    // Import default is needed if there's a default import or a default ref and no other refs (meaning an import star helper wasn't requested)
    return !getImportNeedsImportStarHelper(node) && (isDefaultImport(node) || (!!node.importClause && isNamedImports(node.importClause.namedBindings!) && containsDefaultReference(node.importClause.namedBindings))); // TODO: GH#18217
}

/** @internal */
export function collectExternalModuleInfo(context: TransformationContext, sourceFile: SourceFile): ExternalModuleInfo {
    const resolver = context.getEmitResolver();
    const compilerOptions = context.getCompilerOptions();
    const externalImports: (ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration)[] = [];
    const exportSpecifiers = new IdentifierNameMultiMap<ExportSpecifier>();
    const exportedBindings: Identifier[][] = [];
    const uniqueExports = new Map<string, boolean>();
    let exportedNames: Identifier[] | undefined;
    let hasExportDefault = false;
    let exportEquals: ExportAssignment | undefined;
    let hasExportStarsToExportValues = false;
    let hasImportStar = false;
    let hasImportDefault = false;

    for (const node of sourceFile.statements) {
        switch (node.kind) {
            case SyntaxKind.ImportDeclaration:
                // import "mod"
                // import x from "mod"
                // import * as x from "mod"
                // import { x, y } from "mod"
                externalImports.push(node as ImportDeclaration);
                if (!hasImportStar && getImportNeedsImportStarHelper(node as ImportDeclaration)) {
                    hasImportStar = true;
                }
                if (!hasImportDefault && getImportNeedsImportDefaultHelper(node as ImportDeclaration)) {
                    hasImportDefault = true;
                }
                break;

            case SyntaxKind.ImportEqualsDeclaration:
                if ((node as ImportEqualsDeclaration).moduleReference.kind === SyntaxKind.ExternalModuleReference) {
                    // import x = require("mod")
                    externalImports.push(node as ImportEqualsDeclaration);
                }

                break;

            case SyntaxKind.ExportDeclaration:
                if ((node as ExportDeclaration).moduleSpecifier) {
                    if (!(node as ExportDeclaration).exportClause) {
                        // export * from "mod"
                        externalImports.push(node as ExportDeclaration);
                        hasExportStarsToExportValues = true;
                    }
                    else {
                        // export * as ns from "mod"
                        // export { x, y } from "mod"
                        externalImports.push(node as ExportDeclaration);
                        if (isNamedExports((node as ExportDeclaration).exportClause!)) {
                            addExportedNamesForExportDeclaration(node as ExportDeclaration);
                        }
                        else {
                            const name = ((node as ExportDeclaration).exportClause as NamespaceExport).name;
                            if (!uniqueExports.get(idText(name))) {
                                multiMapSparseArrayAdd(exportedBindings, getOriginalNodeId(node), name);
                                uniqueExports.set(idText(name), true);
                                exportedNames = append(exportedNames, name);
                            }
                            // we use the same helpers for `export * as ns` as we do for `import * as ns`
                            hasImportStar = true;
                        }
                    }
                }
                else {
                    // export { x, y }
                    addExportedNamesForExportDeclaration(node as ExportDeclaration);
                }
                break;

            case SyntaxKind.ExportAssignment:
                if ((node as ExportAssignment).isExportEquals && !exportEquals) {
                    // export = x
                    exportEquals = node as ExportAssignment;
                }
                break;

            case SyntaxKind.VariableStatement:
                if (hasSyntacticModifier(node, ModifierFlags.Export)) {
                    for (const decl of (node as VariableStatement).declarationList.declarations) {
                        exportedNames = collectExportedVariableInfo(decl, uniqueExports, exportedNames, exportedBindings);
                    }
                }
                break;

            case SyntaxKind.FunctionDeclaration:
                if (hasSyntacticModifier(node, ModifierFlags.Export)) {
                    if (hasSyntacticModifier(node, ModifierFlags.Default)) {
                        // export default function() { }
                        if (!hasExportDefault) {
                            multiMapSparseArrayAdd(exportedBindings, getOriginalNodeId(node), context.factory.getDeclarationName(node as FunctionDeclaration));
                            hasExportDefault = true;
                        }
                    }
                    else {
                        // export function x() { }
                        const name = (node as FunctionDeclaration).name!;
                        if (!uniqueExports.get(idText(name))) {
                            multiMapSparseArrayAdd(exportedBindings, getOriginalNodeId(node), name);
                            uniqueExports.set(idText(name), true);
                            exportedNames = append(exportedNames, name);
                        }
                    }
                }
                break;

            case SyntaxKind.ClassDeclaration:
                if (hasSyntacticModifier(node, ModifierFlags.Export)) {
                    if (hasSyntacticModifier(node, ModifierFlags.Default)) {
                        // export default class { }
                        if (!hasExportDefault) {
                            multiMapSparseArrayAdd(exportedBindings, getOriginalNodeId(node), context.factory.getDeclarationName(node as ClassDeclaration));
                            hasExportDefault = true;
                        }
                    }
                    else {
                        // export class x { }
                        const name = (node as ClassDeclaration).name;
                        if (name && !uniqueExports.get(idText(name))) {
                            multiMapSparseArrayAdd(exportedBindings, getOriginalNodeId(node), name);
                            uniqueExports.set(idText(name), true);
                            exportedNames = append(exportedNames, name);
                        }
                    }
                }
                break;
        }
    }

    const externalHelpersImportDeclaration = createExternalHelpersImportDeclarationIfNeeded(context.factory, context.getEmitHelperFactory(), sourceFile, compilerOptions, hasExportStarsToExportValues, hasImportStar, hasImportDefault);
    if (externalHelpersImportDeclaration) {
        externalImports.unshift(externalHelpersImportDeclaration);
    }

    return { externalImports, exportSpecifiers, exportEquals, hasExportStarsToExportValues, exportedBindings, exportedNames, externalHelpersImportDeclaration };

    function addExportedNamesForExportDeclaration(node: ExportDeclaration) {
        for (const specifier of cast(node.exportClause, isNamedExports).elements) {
            if (!uniqueExports.get(idText(specifier.name))) {
                const name = specifier.propertyName || specifier.name;
                if (!node.moduleSpecifier) {
                    exportSpecifiers.add(name, specifier);
                }

                const decl = resolver.getReferencedImportDeclaration(name)
                    || resolver.getReferencedValueDeclaration(name);

                if (decl) {
                    multiMapSparseArrayAdd(exportedBindings, getOriginalNodeId(decl), specifier.name);
                }

                uniqueExports.set(idText(specifier.name), true);
                exportedNames = append(exportedNames, specifier.name);
            }
        }
    }
}

function collectExportedVariableInfo(decl: VariableDeclaration | BindingElement, uniqueExports: Map<string, boolean>, exportedNames: Identifier[] | undefined, exportedBindings: Identifier[][]) {
    if (isBindingPattern(decl.name)) {
        for (const element of decl.name.elements) {
            if (!isOmittedExpression(element)) {
                exportedNames = collectExportedVariableInfo(element, uniqueExports, exportedNames, exportedBindings);
            }
        }
    }
    else if (!isGeneratedIdentifier(decl.name)) {
        const text = idText(decl.name);
        if (!uniqueExports.get(text)) {
            uniqueExports.set(text, true);
            exportedNames = append(exportedNames, decl.name);
            if (isLocalName(decl.name)) {
                multiMapSparseArrayAdd(exportedBindings, getOriginalNodeId(decl), decl.name);
            }
        }
    }
    return exportedNames;
}

/** Use a sparse array as a multi-map. */
function multiMapSparseArrayAdd<V>(map: V[][], key: number, value: V): V[] {
    let values = map[key];
    if (values) {
        values.push(value);
    }
    else {
        map[key] = values = [value];
    }
    return values;
}

/** @internal */
export class IdentifierNameMap<V> {
    private readonly _map = new Map<string, V>();

    get size() {
        return this._map.size;
    }

    has(key: Identifier) {
        return this._map.has(IdentifierNameMap.toKey(key));
    }

    get(key: Identifier) {
        return this._map.get(IdentifierNameMap.toKey(key));
    }

    set(key: Identifier, value: V) {
        this._map.set(IdentifierNameMap.toKey(key), value);
        return this;
    }

    delete(key: Identifier): boolean {
        return this._map?.delete(IdentifierNameMap.toKey(key)) ?? false;
    }

    clear(): void {
        this._map.clear();
    }

    values() {
        return this._map.values();
    }

    private static toKey(name: Identifier | PrivateIdentifier): string {
        if (isGeneratedPrivateIdentifier(name) || isGeneratedIdentifier(name)) {
            const autoGenerate = name.emitNode.autoGenerate;
            if ((autoGenerate.flags & GeneratedIdentifierFlags.KindMask) === GeneratedIdentifierFlags.Node) {
                const node = getNodeForGeneratedName(name);
                const baseName = isMemberName(node) && node !== name ? IdentifierNameMap.toKey(node) : `(generated@${getNodeId(node)})`;
                return formatGeneratedName(/*privateName*/ false, autoGenerate.prefix, baseName, autoGenerate.suffix, IdentifierNameMap.toKey);
            }
            else {
                const baseName = `(auto@${autoGenerate.id})`;
                return formatGeneratedName(/*privateName*/ false, autoGenerate.prefix, baseName, autoGenerate.suffix, IdentifierNameMap.toKey);
            }
        }
        if (isPrivateIdentifier(name)) {
            return idText(name).slice(1);
        }
        return idText(name);
    }
}

/** @internal */
export class IdentifierNameMultiMap<V> extends IdentifierNameMap<V[]> {
    add(key: Identifier, value: V): V[] {
        let values = this.get(key);
        if (values) {
            values.push(value);
        }
        else {
            this.set(key, values = [value]);
        }
        return values;
    }

    remove(key: Identifier, value: V) {
        const values = this.get(key);
        if (values) {
            unorderedRemoveItem(values, value);
            if (!values.length) {
                this.delete(key);
            }
        }
    }
}

/**
 * Used in the module transformer to check if an expression is reasonably without sideeffect,
 *  and thus better to copy into multiple places rather than to cache in a temporary variable
 *  - this is mostly subjective beyond the requirement that the expression not be sideeffecting
 *
 * @internal
 */
export function isSimpleCopiableExpression(expression: Expression) {
    return isStringLiteralLike(expression) ||
        expression.kind === SyntaxKind.NumericLiteral ||
        isKeyword(expression.kind) ||
        isIdentifier(expression);
}

/**
 * A simple inlinable expression is an expression which can be copied into multiple locations
 * without risk of repeating any sideeffects and whose value could not possibly change between
 * any such locations
 *
 * @internal
 */
export function isSimpleInlineableExpression(expression: Expression) {
    return !isIdentifier(expression) && isSimpleCopiableExpression(expression);
}

/** @internal */
export function isCompoundAssignment(kind: BinaryOperator): kind is CompoundAssignmentOperator {
    return kind >= SyntaxKind.FirstCompoundAssignment
        && kind <= SyntaxKind.LastCompoundAssignment;
}

/** @internal */
export function getNonAssignmentOperatorForCompoundAssignment(kind: CompoundAssignmentOperator): LogicalOperatorOrHigher | SyntaxKind.QuestionQuestionToken {
    switch (kind) {
        case SyntaxKind.PlusEqualsToken:
            return SyntaxKind.PlusToken;
        case SyntaxKind.MinusEqualsToken:
            return SyntaxKind.MinusToken;
        case SyntaxKind.AsteriskEqualsToken:
            return SyntaxKind.AsteriskToken;
        case SyntaxKind.AsteriskAsteriskEqualsToken:
            return SyntaxKind.AsteriskAsteriskToken;
        case SyntaxKind.SlashEqualsToken:
            return SyntaxKind.SlashToken;
        case SyntaxKind.PercentEqualsToken:
            return SyntaxKind.PercentToken;
        case SyntaxKind.LessThanLessThanEqualsToken:
            return SyntaxKind.LessThanLessThanToken;
        case SyntaxKind.GreaterThanGreaterThanEqualsToken:
            return SyntaxKind.GreaterThanGreaterThanToken;
        case SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
            return SyntaxKind.GreaterThanGreaterThanGreaterThanToken;
        case SyntaxKind.AmpersandEqualsToken:
            return SyntaxKind.AmpersandToken;
        case SyntaxKind.BarEqualsToken:
            return SyntaxKind.BarToken;
        case SyntaxKind.CaretEqualsToken:
            return SyntaxKind.CaretToken;
        case SyntaxKind.BarBarEqualsToken:
            return SyntaxKind.BarBarToken;
        case SyntaxKind.AmpersandAmpersandEqualsToken:
            return SyntaxKind.AmpersandAmpersandToken;
        case SyntaxKind.QuestionQuestionEqualsToken:
            return SyntaxKind.QuestionQuestionToken;
    }
}

/**
 * @returns Contained super() call from descending into the statement ignoring parentheses, if that call exists.
 *
 * @internal
 */
export function getSuperCallFromStatement(statement: Statement): SuperCall | undefined {
    if (!isExpressionStatement(statement)) {
        return undefined;
    }

    const expression = skipParentheses(statement.expression);
    return isSuperCall(expression)
        ? expression
        : undefined;
}

function findSuperStatementIndexPathWorker(statements: NodeArray<Statement>, start: number, indices: number[]) {
    for (let i = start; i < statements.length; i += 1) {
        const statement = statements[i];
        if (getSuperCallFromStatement(statement)) {
            indices.unshift(i);
            return true;
        }
        else if (isTryStatement(statement) && findSuperStatementIndexPathWorker(statement.tryBlock.statements, 0, indices)) {
            indices.unshift(i);
            return true;
        }
    }

    return false;
}

/**
 * Finds a path of indices to navigate to a `super()` call, descending only through `try` statements.
 *
 * @returns An array of indicies to walk down through `try` statements, with the last element being the index of
 * the statement containing `super()`. Otherwise, an empty array if `super()` was not found.
 *
 * @internal
 */
export function findSuperStatementIndexPath(statements: NodeArray<Statement>, start: number) {
    const indices: number[] = [];
    findSuperStatementIndexPathWorker(statements, start, indices);
    return indices;
}

/**
 * Gets all the static or all the instance property declarations of a class
 *
 * @param node The class node.
 * @param isStatic A value indicating whether to get properties from the static or instance side of the class.
 *
 * @internal
 */
export function getProperties(node: ClassExpression | ClassDeclaration, requireInitializer: true, isStatic: boolean): readonly InitializedPropertyDeclaration[];
/** @internal */
export function getProperties(node: ClassExpression | ClassDeclaration, requireInitializer: boolean, isStatic: boolean): readonly PropertyDeclaration[];
/** @internal */
export function getProperties(node: ClassExpression | ClassDeclaration, requireInitializer: boolean, isStatic: boolean): readonly PropertyDeclaration[] {
    return filter(node.members, m => isInitializedOrStaticProperty(m, requireInitializer, isStatic)) as PropertyDeclaration[];
}

function isStaticPropertyDeclarationOrClassStaticBlockDeclaration(element: ClassElement): element is PropertyDeclaration | ClassStaticBlockDeclaration {
    return isStaticPropertyDeclaration(element) || isClassStaticBlockDeclaration(element);
}

/** @internal */
export function getStaticPropertiesAndClassStaticBlock(node: ClassExpression | ClassDeclaration): readonly (PropertyDeclaration | ClassStaticBlockDeclaration)[];
/** @internal */
export function getStaticPropertiesAndClassStaticBlock(node: ClassExpression | ClassDeclaration): readonly (PropertyDeclaration | ClassStaticBlockDeclaration)[];
/** @internal */
export function getStaticPropertiesAndClassStaticBlock(node: ClassExpression | ClassDeclaration): readonly (PropertyDeclaration | ClassStaticBlockDeclaration)[] {
    return filter(node.members, isStaticPropertyDeclarationOrClassStaticBlockDeclaration);
}

/**
 * Is a class element either a static or an instance property declaration with an initializer?
 *
 * @param member The class element node.
 * @param isStatic A value indicating whether the member should be a static or instance member.
 */
function isInitializedOrStaticProperty(member: ClassElement, requireInitializer: boolean, isStatic: boolean) {
    return isPropertyDeclaration(member)
        && (!!member.initializer || !requireInitializer)
        && hasStaticModifier(member) === isStatic;
}

function isStaticPropertyDeclaration(member: ClassElement) {
    return isPropertyDeclaration(member) && hasStaticModifier(member);
}

/**
 * Gets a value indicating whether a class element is either a static or an instance property declaration with an initializer.
 *
 * @param member The class element node.
 * @param isStatic A value indicating whether the member should be a static or instance member.
 *
 * @internal
 */
export function isInitializedProperty(member: ClassElement): member is PropertyDeclaration & { initializer: Expression; } {
    return member.kind === SyntaxKind.PropertyDeclaration
        && (member as PropertyDeclaration).initializer !== undefined;
}

/**
 * Gets a value indicating whether a class element is a private instance method or accessor.
 *
 * @param member The class element node.
 *
 * @internal
 */
export function isNonStaticMethodOrAccessorWithPrivateName(member: ClassElement): member is PrivateIdentifierMethodDeclaration | PrivateIdentifierAccessorDeclaration | PrivateIdentifierAutoAccessorPropertyDeclaration {
    return !isStatic(member) && (isMethodOrAccessor(member) || isAutoAccessorPropertyDeclaration(member)) && isPrivateIdentifier(member.name);
}

/**
 * Gets an array of arrays of decorators for the parameters of a function-like node.
 * The offset into the result array should correspond to the offset of the parameter.
 *
 * @param node The function-like node.
 */
function getDecoratorsOfParameters(node: FunctionLikeDeclaration | undefined) {
    let decorators: (readonly Decorator[] | undefined)[] | undefined;
    if (node) {
        const parameters = node.parameters;
        const firstParameterIsThis = parameters.length > 0 && parameterIsThisKeyword(parameters[0]);
        const firstParameterOffset = firstParameterIsThis ? 1 : 0;
        const numParameters = firstParameterIsThis ? parameters.length - 1 : parameters.length;
        for (let i = 0; i < numParameters; i++) {
            const parameter = parameters[i + firstParameterOffset];
            if (decorators || hasDecorators(parameter)) {
                if (!decorators) {
                    decorators = new Array(numParameters);
                }

                decorators[i] = getDecorators(parameter);
            }
        }
    }

    return decorators;
}

/**
 * Gets an AllDecorators object containing the decorators for the class and the decorators for the
 * parameters of the constructor of the class.
 *
 * @param node The class node.
 *
 * @internal
 */
export function getAllDecoratorsOfClass(node: ClassLikeDeclaration): AllDecorators | undefined {
    const decorators = getDecorators(node);
    const parameters = getDecoratorsOfParameters(getFirstConstructorWithBody(node));
    if (!some(decorators) && !some(parameters)) {
        return undefined;
    }

    return {
        decorators,
        parameters,
    };
}

/**
 * Gets an AllDecorators object containing the decorators for the member and its parameters.
 *
 * @param parent The class node that contains the member.
 * @param member The class member.
 *
 * @internal
 */
export function getAllDecoratorsOfClassElement(member: ClassElement, parent: ClassLikeDeclaration, useLegacyDecorators: boolean): AllDecorators | undefined {
    switch (member.kind) {
        case SyntaxKind.GetAccessor:
        case SyntaxKind.SetAccessor:
            if (!useLegacyDecorators) {
                return getAllDecoratorsOfMethod(member as AccessorDeclaration);
            }
            return getAllDecoratorsOfAccessors(member as AccessorDeclaration, parent);

        case SyntaxKind.MethodDeclaration:
            return getAllDecoratorsOfMethod(member as MethodDeclaration);

        case SyntaxKind.PropertyDeclaration:
            return getAllDecoratorsOfProperty(member as PropertyDeclaration);

        default:
            return undefined;
    }
}

/**
 * Gets an AllDecorators object containing the decorators for the accessor and its parameters.
 *
 * @param parent The class node that contains the accessor.
 * @param accessor The class accessor member.
 */
function getAllDecoratorsOfAccessors(accessor: AccessorDeclaration, parent: ClassExpression | ClassDeclaration): AllDecorators | undefined {
    if (!accessor.body) {
        return undefined;
    }

    const { firstAccessor, secondAccessor, getAccessor, setAccessor } = getAllAccessorDeclarations(parent.members, accessor);
    const firstAccessorWithDecorators = hasDecorators(firstAccessor) ? firstAccessor :
        secondAccessor && hasDecorators(secondAccessor) ? secondAccessor :
        undefined;

    if (!firstAccessorWithDecorators || accessor !== firstAccessorWithDecorators) {
        return undefined;
    }

    const decorators = getDecorators(firstAccessorWithDecorators);
    const parameters = getDecoratorsOfParameters(setAccessor);
    if (!some(decorators) && !some(parameters)) {
        return undefined;
    }

    return {
        decorators,
        parameters,
        getDecorators: getAccessor && getDecorators(getAccessor),
        setDecorators: setAccessor && getDecorators(setAccessor),
    };
}

/**
 * Gets an AllDecorators object containing the decorators for the method and its parameters.
 *
 * @param method The class method member.
 */
function getAllDecoratorsOfMethod(method: MethodDeclaration | AccessorDeclaration): AllDecorators | undefined {
    if (!method.body) {
        return undefined;
    }

    const decorators = getDecorators(method);
    const parameters = getDecoratorsOfParameters(method);
    if (!some(decorators) && !some(parameters)) {
        return undefined;
    }

    return { decorators, parameters };
}

/**
 * Gets an AllDecorators object containing the decorators for the property.
 *
 * @param property The class property member.
 */
function getAllDecoratorsOfProperty(property: PropertyDeclaration): AllDecorators | undefined {
    const decorators = getDecorators(property);
    if (!some(decorators)) {
        return undefined;
    }

    return { decorators };
}

/** @internal */
export interface PrivateEnvironment<TData, TEntry> {
    readonly data: TData;

    /**
     * A mapping of private names to information needed for transformation.
     */
    identifiers?: Map<__String, TEntry>;

    /**
     * A mapping of generated private names to information needed for transformation.
     */
    generatedIdentifiers?: Map<Node, TEntry>;
}

/** @internal */
export interface LexicalEnvironment<in out TEnvData, TPrivateEnvData, TPrivateEntry> {
    data: TEnvData;
    privateEnv?: PrivateEnvironment<TPrivateEnvData, TPrivateEntry>;
    readonly previous: LexicalEnvironment<TEnvData, TPrivateEnvData, TPrivateEntry> | undefined;
}

/** @internal */
export function walkUpLexicalEnvironments<TEnvData, TPrivateEnvData, TPrivateEntry, U>(
    env: LexicalEnvironment<TEnvData, TPrivateEnvData, TPrivateEntry> | undefined,
    cb: (env: LexicalEnvironment<TEnvData, TPrivateEnvData, TPrivateEntry>) => U,
): U | undefined {
    while (env) {
        const result = cb(env);
        if (result !== undefined) return result;
        env = env.previous;
    }
}

/** @internal */
export function newPrivateEnvironment<TData, TEntry>(data: TData): PrivateEnvironment<TData, TEntry> {
    return { data };
}

/** @internal */
export function getPrivateIdentifier<TData, TEntry>(
    privateEnv: PrivateEnvironment<TData, TEntry> | undefined,
    name: PrivateIdentifier,
) {
    return isGeneratedPrivateIdentifier(name) ?
        privateEnv?.generatedIdentifiers?.get(getNodeForGeneratedName(name)) :
        privateEnv?.identifiers?.get(name.escapedText);
}

/** @internal */
export function setPrivateIdentifier<TData, TEntry>(
    privateEnv: PrivateEnvironment<TData, TEntry>,
    name: PrivateIdentifier,
    entry: TEntry,
) {
    if (isGeneratedPrivateIdentifier(name)) {
        privateEnv.generatedIdentifiers ??= new Map();
        privateEnv.generatedIdentifiers.set(getNodeForGeneratedName(name), entry);
    }
    else {
        privateEnv.identifiers ??= new Map();
        privateEnv.identifiers.set(name.escapedText, entry);
    }
}

/** @internal */
export function accessPrivateIdentifier<
    TEnvData,
    TPrivateEnvData,
    TPrivateEntry,
>(
    env: LexicalEnvironment<TEnvData, TPrivateEnvData, TPrivateEntry> | undefined,
    name: PrivateIdentifier,
) {
    return walkUpLexicalEnvironments(env, env => getPrivateIdentifier(env.privateEnv, name));
}

/** @internal */
export function isSimpleParameter(node: ParameterDeclaration) {
    return !node.initializer && isIdentifier(node.name);
}

/** @internal */
export function isSimpleParameterList(nodes: NodeArray<ParameterDeclaration>) {
    return every(nodes, isSimpleParameter);
}
