/* @internal */
namespace ts {
export function getOriginalNodeId(node: ts.Node) {
    node = ts.getOriginalNode(node);
    return node ? ts.getNodeId(node) : 0;
}

export interface ExternalModuleInfo {
    externalImports: (ts.ImportDeclaration | ts.ImportEqualsDeclaration | ts.ExportDeclaration)[]; // imports of other external modules
    externalHelpersImportDeclaration: ts.ImportDeclaration | undefined; // import of external helpers
    exportSpecifiers: ts.ESMap<string, ts.ExportSpecifier[]>; // file-local export specifiers by name (no reexports)
    exportedBindings: ts.Identifier[][]; // exported names of local declarations
    exportedNames: ts.Identifier[] | undefined; // all exported names in the module, both local and reexported
    exportEquals: ts.ExportAssignment | undefined; // an export= declaration if one was present
    hasExportStarsToExportValues: boolean; // whether this module contains export*
}

function containsDefaultReference(node: ts.NamedImportBindings | undefined) {
    if (!node) return false;
    if (!ts.isNamedImports(node)) return false;
    return ts.some(node.elements, isNamedDefaultReference);
}

function isNamedDefaultReference(e: ts.ImportSpecifier): boolean {
    return e.propertyName !== undefined && e.propertyName.escapedText === ts.InternalSymbolName.Default;
}

export function chainBundle(context: ts.CoreTransformationContext, transformSourceFile: (x: ts.SourceFile) => ts.SourceFile): (x: ts.SourceFile | ts.Bundle) => ts.SourceFile | ts.Bundle {
    return transformSourceFileOrBundle;

    function transformSourceFileOrBundle(node: ts.SourceFile | ts.Bundle) {
        return node.kind === ts.SyntaxKind.SourceFile ? transformSourceFile(node) : transformBundle(node);
    }

    function transformBundle(node: ts.Bundle) {
        return context.factory.createBundle(ts.map(node.sourceFiles, transformSourceFile), node.prepends);
    }
}

export function getExportNeedsImportStarHelper(node: ts.ExportDeclaration): boolean {
    return !!ts.getNamespaceDeclarationNode(node);
}

export function getImportNeedsImportStarHelper(node: ts.ImportDeclaration): boolean {
    if (!!ts.getNamespaceDeclarationNode(node)) {
        return true;
    }
    const bindings = node.importClause && node.importClause.namedBindings;
    if (!bindings) {
        return false;
    }
    if (!ts.isNamedImports(bindings)) return false;
    let defaultRefCount = 0;
    for (const binding of bindings.elements) {
        if (isNamedDefaultReference(binding)) {
            defaultRefCount++;
        }
    }
    // Import star is required if there's default named refs mixed with non-default refs, or if theres non-default refs and it has a default import
    return (defaultRefCount > 0 && defaultRefCount !== bindings.elements.length) || (!!(bindings.elements.length - defaultRefCount) && ts.isDefaultImport(node));
}

export function getImportNeedsImportDefaultHelper(node: ts.ImportDeclaration): boolean {
    // Import default is needed if there's a default import or a default ref and no other refs (meaning an import star helper wasn't requested)
    return !getImportNeedsImportStarHelper(node) && (ts.isDefaultImport(node) || (!!node.importClause && ts.isNamedImports(node.importClause.namedBindings!) && containsDefaultReference(node.importClause.namedBindings))); // TODO: GH#18217
}

export function collectExternalModuleInfo(context: ts.TransformationContext, sourceFile: ts.SourceFile, resolver: ts.EmitResolver, compilerOptions: ts.CompilerOptions): ExternalModuleInfo {
    const externalImports: (ts.ImportDeclaration | ts.ImportEqualsDeclaration | ts.ExportDeclaration)[] = [];
    const exportSpecifiers = ts.createMultiMap<ts.ExportSpecifier>();
    const exportedBindings: ts.Identifier[][] = [];
    const uniqueExports = new ts.Map<string, boolean>();
    let exportedNames: ts.Identifier[] | undefined;
    let hasExportDefault = false;
    let exportEquals: ts.ExportAssignment | undefined;
    let hasExportStarsToExportValues = false;
    let hasImportStar = false;
    let hasImportDefault = false;

    for (const node of sourceFile.statements) {
        switch (node.kind) {
            case ts.SyntaxKind.ImportDeclaration:
                // import "mod"
                // import x from "mod"
                // import * as x from "mod"
                // import { x, y } from "mod"
                externalImports.push(node as ts.ImportDeclaration);
                if (!hasImportStar && getImportNeedsImportStarHelper(node as ts.ImportDeclaration)) {
                    hasImportStar = true;
                }
                if (!hasImportDefault && getImportNeedsImportDefaultHelper(node as ts.ImportDeclaration)) {
                    hasImportDefault = true;
                }
                break;

            case ts.SyntaxKind.ImportEqualsDeclaration:
                if ((node as ts.ImportEqualsDeclaration).moduleReference.kind === ts.SyntaxKind.ExternalModuleReference) {
                    // import x = require("mod")
                    externalImports.push(node as ts.ImportEqualsDeclaration);
                }

                break;

            case ts.SyntaxKind.ExportDeclaration:
                if ((node as ts.ExportDeclaration).moduleSpecifier) {
                    if (!(node as ts.ExportDeclaration).exportClause) {
                        // export * from "mod"
                        externalImports.push(node as ts.ExportDeclaration);
                        hasExportStarsToExportValues = true;
                    }
                    else {
                        // export * as ns from "mod"
                        // export { x, y } from "mod"
                        externalImports.push(node as ts.ExportDeclaration);
                        if (ts.isNamedExports((node as ts.ExportDeclaration).exportClause!)) {
                            addExportedNamesForExportDeclaration(node as ts.ExportDeclaration);
                        }
                        else {
                            const name = ((node as ts.ExportDeclaration).exportClause as ts.NamespaceExport).name;
                            if (!uniqueExports.get(ts.idText(name))) {
                                multiMapSparseArrayAdd(exportedBindings, getOriginalNodeId(node), name);
                                uniqueExports.set(ts.idText(name), true);
                                exportedNames = ts.append(exportedNames, name);
                            }
                            // we use the same helpers for `export * as ns` as we do for `import * as ns`
                            hasImportStar = true;
                        }
                    }
                }
                else {
                    // export { x, y }
                    addExportedNamesForExportDeclaration(node as ts.ExportDeclaration);
                }
                break;

            case ts.SyntaxKind.ExportAssignment:
                if ((node as ts.ExportAssignment).isExportEquals && !exportEquals) {
                    // export = x
                    exportEquals = node as ts.ExportAssignment;
                }
                break;

            case ts.SyntaxKind.VariableStatement:
                if (ts.hasSyntacticModifier(node, ts.ModifierFlags.Export)) {
                    for (const decl of (node as ts.VariableStatement).declarationList.declarations) {
                        exportedNames = collectExportedVariableInfo(decl, uniqueExports, exportedNames);
                    }
                }
                break;

            case ts.SyntaxKind.FunctionDeclaration:
                if (ts.hasSyntacticModifier(node, ts.ModifierFlags.Export)) {
                    if (ts.hasSyntacticModifier(node, ts.ModifierFlags.Default)) {
                        // export default function() { }
                        if (!hasExportDefault) {
                            multiMapSparseArrayAdd(exportedBindings, getOriginalNodeId(node), context.factory.getDeclarationName(node as ts.FunctionDeclaration));
                            hasExportDefault = true;
                        }
                    }
                    else {
                        // export function x() { }
                        const name = (node as ts.FunctionDeclaration).name!;
                        if (!uniqueExports.get(ts.idText(name))) {
                            multiMapSparseArrayAdd(exportedBindings, getOriginalNodeId(node), name);
                            uniqueExports.set(ts.idText(name), true);
                            exportedNames = ts.append(exportedNames, name);
                        }
                    }
                }
                break;

            case ts.SyntaxKind.ClassDeclaration:
                if (ts.hasSyntacticModifier(node, ts.ModifierFlags.Export)) {
                    if (ts.hasSyntacticModifier(node, ts.ModifierFlags.Default)) {
                        // export default class { }
                        if (!hasExportDefault) {
                            multiMapSparseArrayAdd(exportedBindings, getOriginalNodeId(node), context.factory.getDeclarationName(node as ts.ClassDeclaration));
                            hasExportDefault = true;
                        }
                    }
                    else {
                        // export class x { }
                        const name = (node as ts.ClassDeclaration).name;
                        if (name && !uniqueExports.get(ts.idText(name))) {
                            multiMapSparseArrayAdd(exportedBindings, getOriginalNodeId(node), name);
                            uniqueExports.set(ts.idText(name), true);
                            exportedNames = ts.append(exportedNames, name);
                        }
                    }
                }
                break;
        }
    }

    const externalHelpersImportDeclaration = ts.createExternalHelpersImportDeclarationIfNeeded(context.factory, context.getEmitHelperFactory(), sourceFile, compilerOptions, hasExportStarsToExportValues, hasImportStar, hasImportDefault);
    if (externalHelpersImportDeclaration) {
        externalImports.unshift(externalHelpersImportDeclaration);
    }

    return { externalImports, exportSpecifiers, exportEquals, hasExportStarsToExportValues, exportedBindings, exportedNames, externalHelpersImportDeclaration };

    function addExportedNamesForExportDeclaration(node: ts.ExportDeclaration) {
        for (const specifier of ts.cast(node.exportClause, ts.isNamedExports).elements) {
            if (!uniqueExports.get(ts.idText(specifier.name))) {
                const name = specifier.propertyName || specifier.name;
                if (!node.moduleSpecifier) {
                    exportSpecifiers.add(ts.idText(name), specifier);
                }

                const decl = resolver.getReferencedImportDeclaration(name)
                    || resolver.getReferencedValueDeclaration(name);

                if (decl) {
                    multiMapSparseArrayAdd(exportedBindings, getOriginalNodeId(decl), specifier.name);
                }

                uniqueExports.set(ts.idText(specifier.name), true);
                exportedNames = ts.append(exportedNames, specifier.name);
            }
        }
    }
}

function collectExportedVariableInfo(decl: ts.VariableDeclaration | ts.BindingElement, uniqueExports: ts.ESMap<string, boolean>, exportedNames: ts.Identifier[] | undefined) {
    if (ts.isBindingPattern(decl.name)) {
        for (const element of decl.name.elements) {
            if (!ts.isOmittedExpression(element)) {
                exportedNames = collectExportedVariableInfo(element, uniqueExports, exportedNames);
            }
        }
    }
    else if (!ts.isGeneratedIdentifier(decl.name)) {
        const text = ts.idText(decl.name);
        if (!uniqueExports.get(text)) {
            uniqueExports.set(text, true);
            exportedNames = ts.append(exportedNames, decl.name);
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

/**
 * Used in the module transformer to check if an expression is reasonably without sideeffect,
 *  and thus better to copy into multiple places rather than to cache in a temporary variable
 *  - this is mostly subjective beyond the requirement that the expression not be sideeffecting
 */
export function isSimpleCopiableExpression(expression: ts.Expression) {
    return ts.isStringLiteralLike(expression) ||
        expression.kind === ts.SyntaxKind.NumericLiteral ||
        ts.isKeyword(expression.kind) ||
        ts.isIdentifier(expression);
}

/**
 * A simple inlinable expression is an expression which can be copied into multiple locations
 * without risk of repeating any sideeffects and whose value could not possibly change between
 * any such locations
 */
export function isSimpleInlineableExpression(expression: ts.Expression) {
    return !ts.isIdentifier(expression) && isSimpleCopiableExpression(expression);
}

export function isCompoundAssignment(kind: ts.BinaryOperator): kind is ts.CompoundAssignmentOperator {
    return kind >= ts.SyntaxKind.FirstCompoundAssignment
        && kind <= ts.SyntaxKind.LastCompoundAssignment;
}

export function getNonAssignmentOperatorForCompoundAssignment(kind: ts.CompoundAssignmentOperator): ts.LogicalOperatorOrHigher | ts.SyntaxKind.QuestionQuestionToken {
    switch (kind) {
        case ts.SyntaxKind.PlusEqualsToken: return ts.SyntaxKind.PlusToken;
        case ts.SyntaxKind.MinusEqualsToken: return ts.SyntaxKind.MinusToken;
        case ts.SyntaxKind.AsteriskEqualsToken: return ts.SyntaxKind.AsteriskToken;
        case ts.SyntaxKind.AsteriskAsteriskEqualsToken: return ts.SyntaxKind.AsteriskAsteriskToken;
        case ts.SyntaxKind.SlashEqualsToken: return ts.SyntaxKind.SlashToken;
        case ts.SyntaxKind.PercentEqualsToken: return ts.SyntaxKind.PercentToken;
        case ts.SyntaxKind.LessThanLessThanEqualsToken: return ts.SyntaxKind.LessThanLessThanToken;
        case ts.SyntaxKind.GreaterThanGreaterThanEqualsToken: return ts.SyntaxKind.GreaterThanGreaterThanToken;
        case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken: return ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken;
        case ts.SyntaxKind.AmpersandEqualsToken: return ts.SyntaxKind.AmpersandToken;
        case ts.SyntaxKind.BarEqualsToken: return ts.SyntaxKind.BarToken;
        case ts.SyntaxKind.CaretEqualsToken: return ts.SyntaxKind.CaretToken;
        case ts.SyntaxKind.BarBarEqualsToken: return ts.SyntaxKind.BarBarToken;
        case ts.SyntaxKind.AmpersandAmpersandEqualsToken: return ts.SyntaxKind.AmpersandAmpersandToken;
        case ts.SyntaxKind.QuestionQuestionEqualsToken: return ts.SyntaxKind.QuestionQuestionToken;

    }
}

/**
 * @returns Contained super() call from descending into the statement ignoring parentheses, if that call exists.
 */
export function getSuperCallFromStatement(statement: ts.Statement) {
    if (!ts.isExpressionStatement(statement)) {
        return undefined;
    }

    const expression = ts.skipParentheses(statement.expression);
    return ts.isSuperCall(expression)
        ? expression
        : undefined;
}

/**
 * @returns The index (after prologue statements) of a super call, or -1 if not found.
 */
export function findSuperStatementIndex(statements: ts.NodeArray<ts.Statement>, indexAfterLastPrologueStatement: number) {
    for (let i = indexAfterLastPrologueStatement; i < statements.length; i += 1) {
        const statement = statements[i];

        if (getSuperCallFromStatement(statement)) {
            return i;
        }
    }

    return -1;
}

/**
 * Gets all the static or all the instance property declarations of a class
 *
 * @param node The class node.
 * @param isStatic A value indicating whether to get properties from the static or instance side of the class.
 */
export function getProperties(node: ts.ClassExpression | ts.ClassDeclaration, requireInitializer: true, isStatic: boolean): readonly ts.InitializedPropertyDeclaration[];
export function getProperties(node: ts.ClassExpression | ts.ClassDeclaration, requireInitializer: boolean, isStatic: boolean): readonly ts.PropertyDeclaration[];
export function getProperties(node: ts.ClassExpression | ts.ClassDeclaration, requireInitializer: boolean, isStatic: boolean): readonly ts.PropertyDeclaration[] {
    return ts.filter(node.members, m => isInitializedOrStaticProperty(m, requireInitializer, isStatic)) as ts.PropertyDeclaration[];
}

function isStaticPropertyDeclarationOrClassStaticBlockDeclaration(element: ts.ClassElement): element is ts.PropertyDeclaration | ts.ClassStaticBlockDeclaration {
    return isStaticPropertyDeclaration(element) || ts.isClassStaticBlockDeclaration(element);
}

export function getStaticPropertiesAndClassStaticBlock(node: ts.ClassExpression | ts.ClassDeclaration): readonly (ts.PropertyDeclaration | ts.ClassStaticBlockDeclaration)[];
export function getStaticPropertiesAndClassStaticBlock(node: ts.ClassExpression | ts.ClassDeclaration): readonly (ts.PropertyDeclaration | ts.ClassStaticBlockDeclaration)[];
export function getStaticPropertiesAndClassStaticBlock(node: ts.ClassExpression | ts.ClassDeclaration): readonly (ts.PropertyDeclaration | ts.ClassStaticBlockDeclaration)[] {
    return ts.filter(node.members, isStaticPropertyDeclarationOrClassStaticBlockDeclaration);
}

/**
 * Is a class element either a static or an instance property declaration with an initializer?
 *
 * @param member The class element node.
 * @param isStatic A value indicating whether the member should be a static or instance member.
 */
function isInitializedOrStaticProperty(member: ts.ClassElement, requireInitializer: boolean, isStatic: boolean) {
    return ts.isPropertyDeclaration(member)
        && (!!member.initializer || !requireInitializer)
        && ts.hasStaticModifier(member) === isStatic;
}

function isStaticPropertyDeclaration(member: ts.ClassElement) {
    return ts.isPropertyDeclaration(member) && ts.hasStaticModifier(member);
}

/**
 * Gets a value indicating whether a class element is either a static or an instance property declaration with an initializer.
 *
 * @param member The class element node.
 * @param isStatic A value indicating whether the member should be a static or instance member.
 */
export function isInitializedProperty(member: ts.ClassElement): member is ts.PropertyDeclaration & { initializer: ts.Expression; } {
    return member.kind === ts.SyntaxKind.PropertyDeclaration
        && (member as ts.PropertyDeclaration).initializer !== undefined;
}

/**
 * Gets a value indicating whether a class element is a private instance method or accessor.
 *
 * @param member The class element node.
 */
export function isNonStaticMethodOrAccessorWithPrivateName(member: ts.ClassElement): member is ts.PrivateIdentifierMethodDeclaration | ts.PrivateIdentifierAccessorDeclaration | ts.PrivateIdentifierAutoAccessorPropertyDeclaration {
    return !ts.isStatic(member) && (ts.isMethodOrAccessor(member) || ts.isAutoAccessorPropertyDeclaration(member)) && ts.isPrivateIdentifier(member.name);
}

/**
 * Gets an array of arrays of decorators for the parameters of a function-like node.
 * The offset into the result array should correspond to the offset of the parameter.
 *
 * @param node The function-like node.
 */
function getDecoratorsOfParameters(node: ts.FunctionLikeDeclaration | undefined) {
    let decorators: (readonly ts.Decorator[] | undefined)[] | undefined;
    if (node) {
        const parameters = node.parameters;
        const firstParameterIsThis = parameters.length > 0 && ts.parameterIsThisKeyword(parameters[0]);
        const firstParameterOffset = firstParameterIsThis ? 1 : 0;
        const numParameters = firstParameterIsThis ? parameters.length - 1 : parameters.length;
        for (let i = 0; i < numParameters; i++) {
            const parameter = parameters[i + firstParameterOffset];
            if (decorators || ts.hasDecorators(parameter)) {
                if (!decorators) {
                    decorators = new Array(numParameters);
                }

                decorators[i] = ts.getDecorators(parameter);
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
 */
export function getAllDecoratorsOfClass(node: ts.ClassLikeDeclaration): ts.AllDecorators | undefined {
    const decorators = ts.getDecorators(node);
    const parameters = getDecoratorsOfParameters(ts.getFirstConstructorWithBody(node));
    if (!ts.some(decorators) && !ts.some(parameters)) {
        return undefined;
    }

    return {
        decorators,
        parameters
    };
}

/**
 * Gets an AllDecorators object containing the decorators for the member and its parameters.
 *
 * @param parent The class node that contains the member.
 * @param member The class member.
 */
export function getAllDecoratorsOfClassElement(member: ts.ClassElement, parent: ts.ClassLikeDeclaration): ts.AllDecorators | undefined {
    switch (member.kind) {
        case ts.SyntaxKind.GetAccessor:
        case ts.SyntaxKind.SetAccessor:
            return getAllDecoratorsOfAccessors(member as ts.AccessorDeclaration, parent);

        case ts.SyntaxKind.MethodDeclaration:
            return getAllDecoratorsOfMethod(member as ts.MethodDeclaration);

        case ts.SyntaxKind.PropertyDeclaration:
            return getAllDecoratorsOfProperty(member as ts.PropertyDeclaration);

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
function getAllDecoratorsOfAccessors(accessor: ts.AccessorDeclaration, parent: ts.ClassExpression | ts.ClassDeclaration): ts.AllDecorators | undefined {
    if (!accessor.body) {
        return undefined;
    }

    const { firstAccessor, secondAccessor, getAccessor, setAccessor } = ts.getAllAccessorDeclarations(parent.members, accessor);
    const firstAccessorWithDecorators =
        ts.hasDecorators(firstAccessor) ? firstAccessor :
        secondAccessor && ts.hasDecorators(secondAccessor) ? secondAccessor :
        undefined;

    if (!firstAccessorWithDecorators || accessor !== firstAccessorWithDecorators) {
        return undefined;
    }

    const decorators = ts.getDecorators(firstAccessorWithDecorators);
    const parameters = getDecoratorsOfParameters(setAccessor);
    if (!ts.some(decorators) && !ts.some(parameters)) {
        return undefined;
    }

    return {
        decorators,
        parameters,
        getDecorators: getAccessor && ts.getDecorators(getAccessor),
        setDecorators: setAccessor && ts.getDecorators(setAccessor)
    };
}

/**
 * Gets an AllDecorators object containing the decorators for the method and its parameters.
 *
 * @param method The class method member.
 */
function getAllDecoratorsOfMethod(method: ts.MethodDeclaration): ts.AllDecorators | undefined {
    if (!method.body) {
        return undefined;
    }

    const decorators = ts.getDecorators(method);
    const parameters = getDecoratorsOfParameters(method);
    if (!ts.some(decorators) && !ts.some(parameters)) {
        return undefined;
    }

    return { decorators, parameters };
}

/**
 * Gets an AllDecorators object containing the decorators for the property.
 *
 * @param property The class property member.
 */
function getAllDecoratorsOfProperty(property: ts.PropertyDeclaration): ts.AllDecorators | undefined {
    const decorators = ts.getDecorators(property);
    if (!ts.some(decorators)) {
        return undefined;

    }

    return { decorators };
}

}
