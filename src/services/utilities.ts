/* @internal */ // Don't expose that we use this
// Based on lib.es6.d.ts
interface PromiseConstructor {
    new <T>(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;
    reject(reason: any): Promise<never>;
    all<T>(values: (T | PromiseLike<T>)[]): Promise<T[]>;
}
/* @internal */
declare var Promise: PromiseConstructor; // eslint-disable-line no-var

/* @internal */
namespace ts {
// These utilities are common to multiple language service features.
//#region
export const scanner: ts.Scanner = ts.createScanner(ts.ScriptTarget.Latest, /*skipTrivia*/ true);

export const enum SemanticMeaning {
    None = 0x0,
    Value = 0x1,
    Type = 0x2,
    Namespace = 0x4,
    All = Value | Type | Namespace
}

export function getMeaningFromDeclaration(node: ts.Node): SemanticMeaning {
    switch (node.kind) {
        case ts.SyntaxKind.VariableDeclaration:
            return ts.isInJSFile(node) && ts.getJSDocEnumTag(node) ? SemanticMeaning.All : SemanticMeaning.Value;

        case ts.SyntaxKind.Parameter:
        case ts.SyntaxKind.BindingElement:
        case ts.SyntaxKind.PropertyDeclaration:
        case ts.SyntaxKind.PropertySignature:
        case ts.SyntaxKind.PropertyAssignment:
        case ts.SyntaxKind.ShorthandPropertyAssignment:
        case ts.SyntaxKind.MethodDeclaration:
        case ts.SyntaxKind.MethodSignature:
        case ts.SyntaxKind.Constructor:
        case ts.SyntaxKind.GetAccessor:
        case ts.SyntaxKind.SetAccessor:
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.FunctionExpression:
        case ts.SyntaxKind.ArrowFunction:
        case ts.SyntaxKind.CatchClause:
        case ts.SyntaxKind.JsxAttribute:
            return SemanticMeaning.Value;

        case ts.SyntaxKind.TypeParameter:
        case ts.SyntaxKind.InterfaceDeclaration:
        case ts.SyntaxKind.TypeAliasDeclaration:
        case ts.SyntaxKind.TypeLiteral:
            return SemanticMeaning.Type;

        case ts.SyntaxKind.JSDocTypedefTag:
            // If it has no name node, it shares the name with the value declaration below it.
            return (node as ts.JSDocTypedefTag).name === undefined ? SemanticMeaning.Value | SemanticMeaning.Type : SemanticMeaning.Type;

        case ts.SyntaxKind.EnumMember:
        case ts.SyntaxKind.ClassDeclaration:
            return SemanticMeaning.Value | SemanticMeaning.Type;

        case ts.SyntaxKind.ModuleDeclaration:
            if (ts.isAmbientModule(node as ts.ModuleDeclaration)) {
                return SemanticMeaning.Namespace | SemanticMeaning.Value;
            }
            else if (ts.getModuleInstanceState(node as ts.ModuleDeclaration) === ts.ModuleInstanceState.Instantiated) {
                return SemanticMeaning.Namespace | SemanticMeaning.Value;
            }
            else {
                return SemanticMeaning.Namespace;
            }

        case ts.SyntaxKind.EnumDeclaration:
        case ts.SyntaxKind.NamedImports:
        case ts.SyntaxKind.ImportSpecifier:
        case ts.SyntaxKind.ImportEqualsDeclaration:
        case ts.SyntaxKind.ImportDeclaration:
        case ts.SyntaxKind.ExportAssignment:
        case ts.SyntaxKind.ExportDeclaration:
            return SemanticMeaning.All;

        // An external module can be a Value
        case ts.SyntaxKind.SourceFile:
            return SemanticMeaning.Namespace | SemanticMeaning.Value;
    }

    return SemanticMeaning.All;
}

export function getMeaningFromLocation(node: ts.Node): SemanticMeaning {
    node = getAdjustedReferenceLocation(node);
    const parent = node.parent;
    if (node.kind === ts.SyntaxKind.SourceFile) {
        return SemanticMeaning.Value;
    }
    else if (ts.isExportAssignment(parent)
        || ts.isExportSpecifier(parent)
        || ts.isExternalModuleReference(parent)
        || ts.isImportSpecifier(parent)
        || ts.isImportClause(parent)
        || ts.isImportEqualsDeclaration(parent) && node === parent.name) {
        return SemanticMeaning.All;
    }
    else if (isInRightSideOfInternalImportEqualsDeclaration(node)) {
        return getMeaningFromRightHandSideOfImportEquals(node as ts.Identifier);
    }
    else if (ts.isDeclarationName(node)) {
        return getMeaningFromDeclaration(parent);
    }
    else if (ts.isEntityName(node) && ts.findAncestor(node, ts.or(ts.isJSDocNameReference, ts.isJSDocLinkLike, ts.isJSDocMemberName))) {
        return SemanticMeaning.All;
    }
    else if (isTypeReference(node)) {
        return SemanticMeaning.Type;
    }
    else if (isNamespaceReference(node)) {
        return SemanticMeaning.Namespace;
    }
    else if (ts.isTypeParameterDeclaration(parent)) {
        ts.Debug.assert(ts.isJSDocTemplateTag(parent.parent)); // Else would be handled by isDeclarationName
        return SemanticMeaning.Type;
    }
    else if (ts.isLiteralTypeNode(parent)) {
        // This might be T["name"], which is actually referencing a property and not a type. So allow both meanings.
        return SemanticMeaning.Type | SemanticMeaning.Value;
    }
    else {
        return SemanticMeaning.Value;
    }
}

function getMeaningFromRightHandSideOfImportEquals(node: ts.Node): SemanticMeaning {
    //     import a = |b|; // Namespace
    //     import a = |b.c|; // Value, type, namespace
    //     import a = |b.c|.d; // Namespace
    const name = node.kind === ts.SyntaxKind.QualifiedName ? node : ts.isQualifiedName(node.parent) && node.parent.right === node ? node.parent : undefined;
    return name && name.parent.kind === ts.SyntaxKind.ImportEqualsDeclaration ? SemanticMeaning.All : SemanticMeaning.Namespace;
}

export function isInRightSideOfInternalImportEqualsDeclaration(node: ts.Node) {
    while (node.parent.kind === ts.SyntaxKind.QualifiedName) {
        node = node.parent;
    }
    return ts.isInternalModuleImportEqualsDeclaration(node.parent) && node.parent.moduleReference === node;
}

function isNamespaceReference(node: ts.Node): boolean {
    return isQualifiedNameNamespaceReference(node) || isPropertyAccessNamespaceReference(node);
}

function isQualifiedNameNamespaceReference(node: ts.Node): boolean {
    let root = node;
    let isLastClause = true;
    if (root.parent.kind === ts.SyntaxKind.QualifiedName) {
        while (root.parent && root.parent.kind === ts.SyntaxKind.QualifiedName) {
            root = root.parent;
        }

        isLastClause = (root as ts.QualifiedName).right === node;
    }

    return root.parent.kind === ts.SyntaxKind.TypeReference && !isLastClause;
}

function isPropertyAccessNamespaceReference(node: ts.Node): boolean {
    let root = node;
    let isLastClause = true;
    if (root.parent.kind === ts.SyntaxKind.PropertyAccessExpression) {
        while (root.parent && root.parent.kind === ts.SyntaxKind.PropertyAccessExpression) {
            root = root.parent;
        }

        isLastClause = (root as ts.PropertyAccessExpression).name === node;
    }

    if (!isLastClause && root.parent.kind === ts.SyntaxKind.ExpressionWithTypeArguments && root.parent.parent.kind === ts.SyntaxKind.HeritageClause) {
        const decl = root.parent.parent.parent;
        return (decl.kind === ts.SyntaxKind.ClassDeclaration && (root.parent.parent as ts.HeritageClause).token === ts.SyntaxKind.ImplementsKeyword) ||
            (decl.kind === ts.SyntaxKind.InterfaceDeclaration && (root.parent.parent as ts.HeritageClause).token === ts.SyntaxKind.ExtendsKeyword);
    }

    return false;
}

function isTypeReference(node: ts.Node): boolean {
    if (ts.isRightSideOfQualifiedNameOrPropertyAccess(node)) {
        node = node.parent;
    }

    switch (node.kind) {
        case ts.SyntaxKind.ThisKeyword:
            return !ts.isExpressionNode(node);
        case ts.SyntaxKind.ThisType:
            return true;
    }

    switch (node.parent.kind) {
        case ts.SyntaxKind.TypeReference:
            return true;
        case ts.SyntaxKind.ImportType:
            return !(node.parent as ts.ImportTypeNode).isTypeOf;
        case ts.SyntaxKind.ExpressionWithTypeArguments:
            return ts.isPartOfTypeNode(node.parent);
    }

    return false;
}

export function isCallExpressionTarget(node: ts.Node, includeElementAccess = false, skipPastOuterExpressions = false): boolean {
    return isCalleeWorker(node, ts.isCallExpression, selectExpressionOfCallOrNewExpressionOrDecorator, includeElementAccess, skipPastOuterExpressions);
}

export function isNewExpressionTarget(node: ts.Node, includeElementAccess = false, skipPastOuterExpressions = false): boolean {
    return isCalleeWorker(node, ts.isNewExpression, selectExpressionOfCallOrNewExpressionOrDecorator, includeElementAccess, skipPastOuterExpressions);
}

export function isCallOrNewExpressionTarget(node: ts.Node, includeElementAccess = false, skipPastOuterExpressions = false): boolean {
    return isCalleeWorker(node, ts.isCallOrNewExpression, selectExpressionOfCallOrNewExpressionOrDecorator, includeElementAccess, skipPastOuterExpressions);
}

export function isTaggedTemplateTag(node: ts.Node, includeElementAccess = false, skipPastOuterExpressions = false): boolean {
    return isCalleeWorker(node, ts.isTaggedTemplateExpression, selectTagOfTaggedTemplateExpression, includeElementAccess, skipPastOuterExpressions);
}

export function isDecoratorTarget(node: ts.Node, includeElementAccess = false, skipPastOuterExpressions = false): boolean {
    return isCalleeWorker(node, ts.isDecorator, selectExpressionOfCallOrNewExpressionOrDecorator, includeElementAccess, skipPastOuterExpressions);
}

export function isJsxOpeningLikeElementTagName(node: ts.Node, includeElementAccess = false, skipPastOuterExpressions = false): boolean {
    return isCalleeWorker(node, ts.isJsxOpeningLikeElement, selectTagNameOfJsxOpeningLikeElement, includeElementAccess, skipPastOuterExpressions);
}

function selectExpressionOfCallOrNewExpressionOrDecorator(node: ts.CallExpression | ts.NewExpression | ts.Decorator) {
    return node.expression;
}

function selectTagOfTaggedTemplateExpression(node: ts.TaggedTemplateExpression) {
    return node.tag;
}

function selectTagNameOfJsxOpeningLikeElement(node: ts.JsxOpeningLikeElement) {
    return node.tagName;
}

function isCalleeWorker<T extends ts.CallExpression | ts.NewExpression | ts.TaggedTemplateExpression | ts.Decorator | ts.JsxOpeningLikeElement>(node: ts.Node, pred: (node: ts.Node) => node is T, calleeSelector: (node: T) => ts.Expression, includeElementAccess: boolean, skipPastOuterExpressions: boolean) {
    let target = includeElementAccess ? climbPastPropertyOrElementAccess(node) : climbPastPropertyAccess(node);
    if (skipPastOuterExpressions) {
        target = ts.skipOuterExpressions(target);
    }
    return !!target && !!target.parent && pred(target.parent) && calleeSelector(target.parent) === target;
}

export function climbPastPropertyAccess(node: ts.Node) {
    return isRightSideOfPropertyAccess(node) ? node.parent : node;
}

export function climbPastPropertyOrElementAccess(node: ts.Node) {
    return isRightSideOfPropertyAccess(node) || isArgumentExpressionOfElementAccess(node) ? node.parent : node;
}

export function getTargetLabel(referenceNode: ts.Node, labelName: string): ts.Identifier | undefined {
    while (referenceNode) {
        if (referenceNode.kind === ts.SyntaxKind.LabeledStatement && (referenceNode as ts.LabeledStatement).label.escapedText === labelName) {
            return (referenceNode as ts.LabeledStatement).label;
        }
        referenceNode = referenceNode.parent;
    }
    return undefined;
}

export function hasPropertyAccessExpressionWithName(node: ts.CallExpression, funcName: string): boolean {
    if (!ts.isPropertyAccessExpression(node.expression)) {
        return false;
    }

    return node.expression.name.text === funcName;
}

export function isJumpStatementTarget(node: ts.Node): node is ts.Identifier & { parent: ts.BreakOrContinueStatement } {
    return ts.isIdentifier(node) && ts.tryCast(node.parent, ts.isBreakOrContinueStatement)?.label === node;
}

export function isLabelOfLabeledStatement(node: ts.Node): node is ts.Identifier {
    return ts.isIdentifier(node) && ts.tryCast(node.parent, ts.isLabeledStatement)?.label === node;
}

export function isLabelName(node: ts.Node): boolean {
    return isLabelOfLabeledStatement(node) || isJumpStatementTarget(node);
}

export function isTagName(node: ts.Node): boolean {
    return ts.tryCast(node.parent, ts.isJSDocTag)?.tagName === node;
}

export function isRightSideOfQualifiedName(node: ts.Node) {
    return ts.tryCast(node.parent, ts.isQualifiedName)?.right === node;
}

export function isRightSideOfPropertyAccess(node: ts.Node) {
    return ts.tryCast(node.parent, ts.isPropertyAccessExpression)?.name === node;
}

export function isArgumentExpressionOfElementAccess(node: ts.Node) {
    return ts.tryCast(node.parent, ts.isElementAccessExpression)?.argumentExpression === node;
}

export function isNameOfModuleDeclaration(node: ts.Node) {
    return ts.tryCast(node.parent, ts.isModuleDeclaration)?.name === node;
}

export function isNameOfFunctionDeclaration(node: ts.Node): boolean {
    return ts.isIdentifier(node) && ts.tryCast(node.parent, ts.isFunctionLike)?.name === node;
}

export function isLiteralNameOfPropertyDeclarationOrIndexAccess(node: ts.StringLiteral | ts.NumericLiteral | ts.NoSubstitutionTemplateLiteral): boolean {
    switch (node.parent.kind) {
        case ts.SyntaxKind.PropertyDeclaration:
        case ts.SyntaxKind.PropertySignature:
        case ts.SyntaxKind.PropertyAssignment:
        case ts.SyntaxKind.EnumMember:
        case ts.SyntaxKind.MethodDeclaration:
        case ts.SyntaxKind.MethodSignature:
        case ts.SyntaxKind.GetAccessor:
        case ts.SyntaxKind.SetAccessor:
        case ts.SyntaxKind.ModuleDeclaration:
            return ts.getNameOfDeclaration(node.parent as ts.Declaration) === node;
        case ts.SyntaxKind.ElementAccessExpression:
            return (node.parent as ts.ElementAccessExpression).argumentExpression === node;
        case ts.SyntaxKind.ComputedPropertyName:
            return true;
        case ts.SyntaxKind.LiteralType:
            return node.parent.parent.kind === ts.SyntaxKind.IndexedAccessType;
        default:
            return false;
    }
}

export function isExpressionOfExternalModuleImportEqualsDeclaration(node: ts.Node) {
    return ts.isExternalModuleImportEqualsDeclaration(node.parent.parent) &&
        ts.getExternalModuleImportEqualsDeclarationExpression(node.parent.parent) === node;
}

export function getContainerNode(node: ts.Node): ts.Declaration | undefined {
    if (ts.isJSDocTypeAlias(node)) {
        // This doesn't just apply to the node immediately under the comment, but to everything in its parent's scope.
        // node.parent = the JSDoc comment, node.parent.parent = the node having the comment.
        // Then we get parent again in the loop.
        node = node.parent.parent;
    }

    while (true) {
        node = node.parent;
        if (!node) {
            return undefined;
        }
        switch (node.kind) {
            case ts.SyntaxKind.SourceFile:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.MethodSignature:
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.FunctionExpression:
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.SetAccessor:
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.InterfaceDeclaration:
            case ts.SyntaxKind.EnumDeclaration:
            case ts.SyntaxKind.ModuleDeclaration:
                return node as ts.Declaration;
        }
    }
}

export function getNodeKind(node: ts.Node): ts.ScriptElementKind {
    switch (node.kind) {
        case ts.SyntaxKind.SourceFile:
            return ts.isExternalModule(node as ts.SourceFile) ? ts.ScriptElementKind.moduleElement : ts.ScriptElementKind.scriptElement;
        case ts.SyntaxKind.ModuleDeclaration:
            return ts.ScriptElementKind.moduleElement;
        case ts.SyntaxKind.ClassDeclaration:
        case ts.SyntaxKind.ClassExpression:
            return ts.ScriptElementKind.classElement;
        case ts.SyntaxKind.InterfaceDeclaration: return ts.ScriptElementKind.interfaceElement;
        case ts.SyntaxKind.TypeAliasDeclaration:
        case ts.SyntaxKind.JSDocCallbackTag:
        case ts.SyntaxKind.JSDocTypedefTag:
            return ts.ScriptElementKind.typeElement;
        case ts.SyntaxKind.EnumDeclaration: return ts.ScriptElementKind.enumElement;
        case ts.SyntaxKind.VariableDeclaration:
            return getKindOfVariableDeclaration(node as ts.VariableDeclaration);
        case ts.SyntaxKind.BindingElement:
            return getKindOfVariableDeclaration(ts.getRootDeclaration(node) as ts.VariableDeclaration);
        case ts.SyntaxKind.ArrowFunction:
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.FunctionExpression:
            return ts.ScriptElementKind.functionElement;
        case ts.SyntaxKind.GetAccessor: return ts.ScriptElementKind.memberGetAccessorElement;
        case ts.SyntaxKind.SetAccessor: return ts.ScriptElementKind.memberSetAccessorElement;
        case ts.SyntaxKind.MethodDeclaration:
        case ts.SyntaxKind.MethodSignature:
            return ts.ScriptElementKind.memberFunctionElement;
        case ts.SyntaxKind.PropertyAssignment:
            const { initializer } = node as ts.PropertyAssignment;
            return ts.isFunctionLike(initializer) ? ts.ScriptElementKind.memberFunctionElement : ts.ScriptElementKind.memberVariableElement;
        case ts.SyntaxKind.PropertyDeclaration:
        case ts.SyntaxKind.PropertySignature:
        case ts.SyntaxKind.ShorthandPropertyAssignment:
        case ts.SyntaxKind.SpreadAssignment:
            return ts.ScriptElementKind.memberVariableElement;
        case ts.SyntaxKind.IndexSignature: return ts.ScriptElementKind.indexSignatureElement;
        case ts.SyntaxKind.ConstructSignature: return ts.ScriptElementKind.constructSignatureElement;
        case ts.SyntaxKind.CallSignature: return ts.ScriptElementKind.callSignatureElement;
        case ts.SyntaxKind.Constructor:
        case ts.SyntaxKind.ClassStaticBlockDeclaration:
            return ts.ScriptElementKind.constructorImplementationElement;
        case ts.SyntaxKind.TypeParameter: return ts.ScriptElementKind.typeParameterElement;
        case ts.SyntaxKind.EnumMember: return ts.ScriptElementKind.enumMemberElement;
        case ts.SyntaxKind.Parameter: return ts.hasSyntacticModifier(node, ts.ModifierFlags.ParameterPropertyModifier) ? ts.ScriptElementKind.memberVariableElement : ts.ScriptElementKind.parameterElement;
        case ts.SyntaxKind.ImportEqualsDeclaration:
        case ts.SyntaxKind.ImportSpecifier:
        case ts.SyntaxKind.ExportSpecifier:
        case ts.SyntaxKind.NamespaceImport:
        case ts.SyntaxKind.NamespaceExport:
            return ts.ScriptElementKind.alias;
        case ts.SyntaxKind.BinaryExpression:
            const kind = ts.getAssignmentDeclarationKind(node as ts.BinaryExpression);
            const { right } = node as ts.BinaryExpression;
            switch (kind) {
                case ts.AssignmentDeclarationKind.ObjectDefinePropertyValue:
                case ts.AssignmentDeclarationKind.ObjectDefinePropertyExports:
                case ts.AssignmentDeclarationKind.ObjectDefinePrototypeProperty:
                case ts.AssignmentDeclarationKind.None:
                    return ts.ScriptElementKind.unknown;
                case ts.AssignmentDeclarationKind.ExportsProperty:
                case ts.AssignmentDeclarationKind.ModuleExports:
                    const rightKind = getNodeKind(right);
                    return rightKind === ts.ScriptElementKind.unknown ? ts.ScriptElementKind.constElement : rightKind;
                case ts.AssignmentDeclarationKind.PrototypeProperty:
                    return ts.isFunctionExpression(right) ? ts.ScriptElementKind.memberFunctionElement : ts.ScriptElementKind.memberVariableElement;
                case ts.AssignmentDeclarationKind.ThisProperty:
                    return ts.ScriptElementKind.memberVariableElement; // property
                case ts.AssignmentDeclarationKind.Property:
                    // static method / property
                    return ts.isFunctionExpression(right) ? ts.ScriptElementKind.memberFunctionElement : ts.ScriptElementKind.memberVariableElement;
                case ts.AssignmentDeclarationKind.Prototype:
                    return ts.ScriptElementKind.localClassElement;
                default: {
                    ts.assertType<never>(kind);
                    return ts.ScriptElementKind.unknown;
                }
            }
        case ts.SyntaxKind.Identifier:
            return ts.isImportClause(node.parent) ? ts.ScriptElementKind.alias : ts.ScriptElementKind.unknown;
        case ts.SyntaxKind.ExportAssignment:
            const scriptKind = getNodeKind((node as ts.ExportAssignment).expression);
            // If the expression didn't come back with something (like it does for an identifiers)
            return scriptKind === ts.ScriptElementKind.unknown ? ts.ScriptElementKind.constElement : scriptKind;
        default:
            return ts.ScriptElementKind.unknown;
    }

    function getKindOfVariableDeclaration(v: ts.VariableDeclaration): ts.ScriptElementKind {
        return ts.isVarConst(v)
            ? ts.ScriptElementKind.constElement
            : ts.isLet(v)
                ? ts.ScriptElementKind.letElement
                : ts.ScriptElementKind.variableElement;
    }
}

export function isThis(node: ts.Node): boolean {
    switch (node.kind) {
        case ts.SyntaxKind.ThisKeyword:
            // case SyntaxKind.ThisType: TODO: GH#9267
            return true;
        case ts.SyntaxKind.Identifier:
            // 'this' as a parameter
            return ts.identifierIsThisKeyword(node as ts.Identifier) && node.parent.kind === ts.SyntaxKind.Parameter;
        default:
            return false;
    }
}

// Matches the beginning of a triple slash directive
const tripleSlashDirectivePrefixRegex = /^\/\/\/\s*</;

export interface ListItemInfo {
    listItemIndex: number;
    list: ts.Node;
}

export function getLineStartPositionForPosition(position: number, sourceFile: ts.SourceFileLike): number {
    const lineStarts = ts.getLineStarts(sourceFile);
    const line = sourceFile.getLineAndCharacterOfPosition(position).line;
    return lineStarts[line];
}

export function rangeContainsRange(r1: ts.TextRange, r2: ts.TextRange): boolean {
    return startEndContainsRange(r1.pos, r1.end, r2);
}

export function rangeContainsRangeExclusive(r1: ts.TextRange, r2: ts.TextRange): boolean {
    return rangeContainsPositionExclusive(r1, r2.pos) && rangeContainsPositionExclusive(r1, r2.end);
}

export function rangeContainsPosition(r: ts.TextRange, pos: number): boolean {
    return r.pos <= pos && pos <= r.end;
}

export function rangeContainsPositionExclusive(r: ts.TextRange, pos: number) {
    return r.pos < pos && pos < r.end;
}

export function startEndContainsRange(start: number, end: number, range: ts.TextRange): boolean {
    return start <= range.pos && end >= range.end;
}

export function rangeContainsStartEnd(range: ts.TextRange, start: number, end: number): boolean {
    return range.pos <= start && range.end >= end;
}

export function rangeOverlapsWithStartEnd(r1: ts.TextRange, start: number, end: number) {
    return startEndOverlapsWithStartEnd(r1.pos, r1.end, start, end);
}

export function nodeOverlapsWithStartEnd(node: ts.Node, sourceFile: ts.SourceFile, start: number, end: number) {
    return startEndOverlapsWithStartEnd(node.getStart(sourceFile), node.end, start, end);
}

export function startEndOverlapsWithStartEnd(start1: number, end1: number, start2: number, end2: number) {
    const start = Math.max(start1, start2);
    const end = Math.min(end1, end2);
    return start < end;
}

/**
 * Assumes `candidate.start <= position` holds.
 */
export function positionBelongsToNode(candidate: ts.Node, position: number, sourceFile: ts.SourceFile): boolean {
    ts.Debug.assert(candidate.pos <= position);
    return position < candidate.end || !isCompletedNode(candidate, sourceFile);
}

function isCompletedNode(n: ts.Node | undefined, sourceFile: ts.SourceFile): boolean {
    if (n === undefined || ts.nodeIsMissing(n)) {
        return false;
    }

    switch (n.kind) {
        case ts.SyntaxKind.ClassDeclaration:
        case ts.SyntaxKind.InterfaceDeclaration:
        case ts.SyntaxKind.EnumDeclaration:
        case ts.SyntaxKind.ObjectLiteralExpression:
        case ts.SyntaxKind.ObjectBindingPattern:
        case ts.SyntaxKind.TypeLiteral:
        case ts.SyntaxKind.Block:
        case ts.SyntaxKind.ModuleBlock:
        case ts.SyntaxKind.CaseBlock:
        case ts.SyntaxKind.NamedImports:
        case ts.SyntaxKind.NamedExports:
            return nodeEndsWith(n, ts.SyntaxKind.CloseBraceToken, sourceFile);
        case ts.SyntaxKind.CatchClause:
            return isCompletedNode((n as ts.CatchClause).block, sourceFile);
        case ts.SyntaxKind.NewExpression:
            if (!(n as ts.NewExpression).arguments) {
                return true;
            }
        // falls through

        case ts.SyntaxKind.CallExpression:
        case ts.SyntaxKind.ParenthesizedExpression:
        case ts.SyntaxKind.ParenthesizedType:
            return nodeEndsWith(n, ts.SyntaxKind.CloseParenToken, sourceFile);

        case ts.SyntaxKind.FunctionType:
        case ts.SyntaxKind.ConstructorType:
            return isCompletedNode((n as ts.SignatureDeclaration).type, sourceFile);

        case ts.SyntaxKind.Constructor:
        case ts.SyntaxKind.GetAccessor:
        case ts.SyntaxKind.SetAccessor:
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.FunctionExpression:
        case ts.SyntaxKind.MethodDeclaration:
        case ts.SyntaxKind.MethodSignature:
        case ts.SyntaxKind.ConstructSignature:
        case ts.SyntaxKind.CallSignature:
        case ts.SyntaxKind.ArrowFunction:
            if ((n as ts.FunctionLikeDeclaration).body) {
                return isCompletedNode((n as ts.FunctionLikeDeclaration).body, sourceFile);
            }

            if ((n as ts.FunctionLikeDeclaration).type) {
                return isCompletedNode((n as ts.FunctionLikeDeclaration).type, sourceFile);
            }

            // Even though type parameters can be unclosed, we can get away with
            // having at least a closing paren.
            return hasChildOfKind(n, ts.SyntaxKind.CloseParenToken, sourceFile);

        case ts.SyntaxKind.ModuleDeclaration:
            return !!(n as ts.ModuleDeclaration).body && isCompletedNode((n as ts.ModuleDeclaration).body, sourceFile);

        case ts.SyntaxKind.IfStatement:
            if ((n as ts.IfStatement).elseStatement) {
                return isCompletedNode((n as ts.IfStatement).elseStatement, sourceFile);
            }
            return isCompletedNode((n as ts.IfStatement).thenStatement, sourceFile);

        case ts.SyntaxKind.ExpressionStatement:
            return isCompletedNode((n as ts.ExpressionStatement).expression, sourceFile) ||
                hasChildOfKind(n, ts.SyntaxKind.SemicolonToken, sourceFile);

        case ts.SyntaxKind.ArrayLiteralExpression:
        case ts.SyntaxKind.ArrayBindingPattern:
        case ts.SyntaxKind.ElementAccessExpression:
        case ts.SyntaxKind.ComputedPropertyName:
        case ts.SyntaxKind.TupleType:
            return nodeEndsWith(n, ts.SyntaxKind.CloseBracketToken, sourceFile);

        case ts.SyntaxKind.IndexSignature:
            if ((n as ts.IndexSignatureDeclaration).type) {
                return isCompletedNode((n as ts.IndexSignatureDeclaration).type, sourceFile);
            }

            return hasChildOfKind(n, ts.SyntaxKind.CloseBracketToken, sourceFile);

        case ts.SyntaxKind.CaseClause:
        case ts.SyntaxKind.DefaultClause:
            // there is no such thing as terminator token for CaseClause/DefaultClause so for simplicity always consider them non-completed
            return false;

        case ts.SyntaxKind.ForStatement:
        case ts.SyntaxKind.ForInStatement:
        case ts.SyntaxKind.ForOfStatement:
        case ts.SyntaxKind.WhileStatement:
            return isCompletedNode((n as ts.IterationStatement).statement, sourceFile);
        case ts.SyntaxKind.DoStatement:
            // rough approximation: if DoStatement has While keyword - then if node is completed is checking the presence of ')';
            return hasChildOfKind(n, ts.SyntaxKind.WhileKeyword, sourceFile)
                ? nodeEndsWith(n, ts.SyntaxKind.CloseParenToken, sourceFile)
                : isCompletedNode((n as ts.DoStatement).statement, sourceFile);

        case ts.SyntaxKind.TypeQuery:
            return isCompletedNode((n as ts.TypeQueryNode).exprName, sourceFile);

        case ts.SyntaxKind.TypeOfExpression:
        case ts.SyntaxKind.DeleteExpression:
        case ts.SyntaxKind.VoidExpression:
        case ts.SyntaxKind.YieldExpression:
        case ts.SyntaxKind.SpreadElement:
            const unaryWordExpression = n as (ts.TypeOfExpression | ts.DeleteExpression | ts.VoidExpression | ts.YieldExpression | ts.SpreadElement);
            return isCompletedNode(unaryWordExpression.expression, sourceFile);

        case ts.SyntaxKind.TaggedTemplateExpression:
            return isCompletedNode((n as ts.TaggedTemplateExpression).template, sourceFile);
        case ts.SyntaxKind.TemplateExpression:
            const lastSpan = ts.lastOrUndefined((n as ts.TemplateExpression).templateSpans);
            return isCompletedNode(lastSpan, sourceFile);
        case ts.SyntaxKind.TemplateSpan:
            return ts.nodeIsPresent((n as ts.TemplateSpan).literal);

        case ts.SyntaxKind.ExportDeclaration:
        case ts.SyntaxKind.ImportDeclaration:
            return ts.nodeIsPresent((n as ts.ExportDeclaration | ts.ImportDeclaration).moduleSpecifier);

        case ts.SyntaxKind.PrefixUnaryExpression:
            return isCompletedNode((n as ts.PrefixUnaryExpression).operand, sourceFile);
        case ts.SyntaxKind.BinaryExpression:
            return isCompletedNode((n as ts.BinaryExpression).right, sourceFile);
        case ts.SyntaxKind.ConditionalExpression:
            return isCompletedNode((n as ts.ConditionalExpression).whenFalse, sourceFile);

        default:
            return true;
    }
}

/*
 * Checks if node ends with 'expectedLastToken'.
 * If child at position 'length - 1' is 'SemicolonToken' it is skipped and 'expectedLastToken' is compared with child at position 'length - 2'.
 */
function nodeEndsWith(n: ts.Node, expectedLastToken: ts.SyntaxKind, sourceFile: ts.SourceFile): boolean {
    const children = n.getChildren(sourceFile);
    if (children.length) {
        const lastChild = ts.last(children);
        if (lastChild.kind === expectedLastToken) {
            return true;
        }
        else if (lastChild.kind === ts.SyntaxKind.SemicolonToken && children.length !== 1) {
            return children[children.length - 2].kind === expectedLastToken;
        }
    }
    return false;
}

export function findListItemInfo(node: ts.Node): ListItemInfo | undefined {
    const list = findContainingList(node);

    // It is possible at this point for syntaxList to be undefined, either if
    // node.parent had no list child, or if none of its list children contained
    // the span of node. If this happens, return undefined. The caller should
    // handle this case.
    if (!list) {
        return undefined;
    }

    const children = list.getChildren();
    const listItemIndex = ts.indexOfNode(children, node);

    return {
        listItemIndex,
        list
    };
}

export function hasChildOfKind(n: ts.Node, kind: ts.SyntaxKind, sourceFile: ts.SourceFile): boolean {
    return !!findChildOfKind(n, kind, sourceFile);
}

export function findChildOfKind<T extends ts.Node>(n: ts.Node, kind: T["kind"], sourceFile: ts.SourceFileLike): T | undefined {
    return ts.find(n.getChildren(sourceFile), (c): c is T => c.kind === kind);
}

export function findContainingList(node: ts.Node): ts.SyntaxList | undefined {
    // The node might be a list element (nonsynthetic) or a comma (synthetic). Either way, it will
    // be parented by the container of the SyntaxList, not the SyntaxList itself.
    // In order to find the list item index, we first need to locate SyntaxList itself and then search
    // for the position of the relevant node (or comma).
    const syntaxList = ts.find(node.parent.getChildren(), (c): c is ts.SyntaxList => ts.isSyntaxList(c) && rangeContainsRange(c, node));
    // Either we didn't find an appropriate list, or the list must contain us.
    ts.Debug.assert(!syntaxList || ts.contains(syntaxList.getChildren(), node));
    return syntaxList;
}

function isDefaultModifier(node: ts.Node) {
    return node.kind === ts.SyntaxKind.DefaultKeyword;
}

function isClassKeyword(node: ts.Node) {
    return node.kind === ts.SyntaxKind.ClassKeyword;
}

function isFunctionKeyword(node: ts.Node) {
    return node.kind === ts.SyntaxKind.FunctionKeyword;
}

function getAdjustedLocationForClass(node: ts.ClassDeclaration | ts.ClassExpression) {
    if (ts.isNamedDeclaration(node)) {
        return node.name;
    }
    if (ts.isClassDeclaration(node)) {
        // for class and function declarations, use the `default` modifier
        // when the declaration is unnamed.
        const defaultModifier = node.modifiers && ts.find(node.modifiers, isDefaultModifier);
        if (defaultModifier) return defaultModifier;
    }
    if (ts.isClassExpression(node)) {
        // for class expressions, use the `class` keyword when the class is unnamed
        const classKeyword = ts.find(node.getChildren(), isClassKeyword);
        if (classKeyword) return classKeyword;
    }
}

function getAdjustedLocationForFunction(node: ts.FunctionDeclaration | ts.FunctionExpression) {
    if (ts.isNamedDeclaration(node)) {
        return node.name;
    }
    if (ts.isFunctionDeclaration(node)) {
        // for class and function declarations, use the `default` modifier
        // when the declaration is unnamed.
        const defaultModifier = ts.find(node.modifiers, isDefaultModifier);
        if (defaultModifier) return defaultModifier;
    }
    if (ts.isFunctionExpression(node)) {
        // for function expressions, use the `function` keyword when the function is unnamed
        const functionKeyword = ts.find(node.getChildren(), isFunctionKeyword);
        if (functionKeyword) return functionKeyword;
    }
}

function getAncestorTypeNode(node: ts.Node) {
    let lastTypeNode: ts.TypeNode | undefined;
    ts.findAncestor(node, a => {
        if (ts.isTypeNode(a)) {
            lastTypeNode = a;
        }
        return !ts.isQualifiedName(a.parent) && !ts.isTypeNode(a.parent) && !ts.isTypeElement(a.parent);
    });
    return lastTypeNode;
}

export function getContextualTypeFromParentOrAncestorTypeNode(node: ts.Expression, checker: ts.TypeChecker): ts.Type | undefined {
    if (node.flags & (ts.NodeFlags.JSDoc & ~ts.NodeFlags.JavaScriptFile)) return undefined;

    const contextualType = getContextualTypeFromParent(node, checker);
    if (contextualType) return contextualType;

    const ancestorTypeNode = getAncestorTypeNode(node);
    return ancestorTypeNode && checker.getTypeAtLocation(ancestorTypeNode);
}

function getAdjustedLocationForDeclaration(node: ts.Node, forRename: boolean) {
    if (!forRename) {
        switch (node.kind) {
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.ClassExpression:
                return getAdjustedLocationForClass(node as ts.ClassDeclaration | ts.ClassExpression);
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.FunctionExpression:
                return getAdjustedLocationForFunction(node as ts.FunctionDeclaration | ts.FunctionExpression);
            case ts.SyntaxKind.Constructor:
                return node;
        }
    }
    if (ts.isNamedDeclaration(node)) {
        return node.name;
    }
}

function getAdjustedLocationForImportDeclaration(node: ts.ImportDeclaration, forRename: boolean) {
    if (node.importClause) {
        if (node.importClause.name && node.importClause.namedBindings) {
            // do not adjust if we have both a name and named bindings
            return;
        }

        // /**/import [|name|] from ...;
        // import /**/type [|name|] from ...;
        if (node.importClause.name) {
            return node.importClause.name;
        }

        // /**/import { [|name|] } from ...;
        // /**/import { propertyName as [|name|] } from ...;
        // /**/import * as [|name|] from ...;
        // import /**/type { [|name|] } from ...;
        // import /**/type { propertyName as [|name|] } from ...;
        // import /**/type * as [|name|] from ...;
        if (node.importClause.namedBindings) {
            if (ts.isNamedImports(node.importClause.namedBindings)) {
                // do nothing if there is more than one binding
                const onlyBinding = ts.singleOrUndefined(node.importClause.namedBindings.elements);
                if (!onlyBinding) {
                    return;
                }
                return onlyBinding.name;
            }
            else if (ts.isNamespaceImport(node.importClause.namedBindings)) {
                return node.importClause.namedBindings.name;
            }
        }
    }
    if (!forRename) {
        // /**/import "[|module|]";
        // /**/import ... from "[|module|]";
        // import /**/type ... from "[|module|]";
        return node.moduleSpecifier;
    }
}

function getAdjustedLocationForExportDeclaration(node: ts.ExportDeclaration, forRename: boolean) {
    if (node.exportClause) {
        // /**/export { [|name|] } ...
        // /**/export { propertyName as [|name|] } ...
        // /**/export * as [|name|] ...
        // export /**/type { [|name|] } from ...
        // export /**/type { propertyName as [|name|] } from ...
        // export /**/type * as [|name|] ...
        if (ts.isNamedExports(node.exportClause)) {
            // do nothing if there is more than one binding
            const onlyBinding = ts.singleOrUndefined(node.exportClause.elements);
            if (!onlyBinding) {
                return;
            }
            return node.exportClause.elements[0].name;
        }
        else if (ts.isNamespaceExport(node.exportClause)) {
            return node.exportClause.name;
        }
    }
    if (!forRename) {
        // /**/export * from "[|module|]";
        // export /**/type * from "[|module|]";
        return node.moduleSpecifier;
    }
}

function getAdjustedLocationForHeritageClause(node: ts.HeritageClause) {
    // /**/extends [|name|]
    // /**/implements [|name|]
    if (node.types.length === 1) {
        return node.types[0].expression;
    }

    // /**/extends name1, name2 ...
    // /**/implements name1, name2 ...
}

function getAdjustedLocation(node: ts.Node, forRename: boolean): ts.Node {
    const { parent } = node;
    // /**/<modifier> [|name|] ...
    // /**/<modifier> <class|interface|type|enum|module|namespace|function|get|set> [|name|] ...
    // /**/<class|interface|type|enum|module|namespace|function|get|set> [|name|] ...
    // /**/import [|name|] = ...
    //
    // NOTE: If the node is a modifier, we don't adjust its location if it is the `default` modifier as that is handled
    // specially by `getSymbolAtLocation`.
    if (ts.isModifier(node) && (forRename || node.kind !== ts.SyntaxKind.DefaultKeyword) ? ts.canHaveModifiers(parent) && ts.contains(parent.modifiers, node) :
        node.kind === ts.SyntaxKind.ClassKeyword ? ts.isClassDeclaration(parent) || ts.isClassExpression(node) :
            node.kind === ts.SyntaxKind.FunctionKeyword ? ts.isFunctionDeclaration(parent) || ts.isFunctionExpression(node) :
                node.kind === ts.SyntaxKind.InterfaceKeyword ? ts.isInterfaceDeclaration(parent) :
                    node.kind === ts.SyntaxKind.EnumKeyword ? ts.isEnumDeclaration(parent) :
                        node.kind === ts.SyntaxKind.TypeKeyword ? ts.isTypeAliasDeclaration(parent) :
                            node.kind === ts.SyntaxKind.NamespaceKeyword || node.kind === ts.SyntaxKind.ModuleKeyword ? ts.isModuleDeclaration(parent) :
                                node.kind === ts.SyntaxKind.ImportKeyword ? ts.isImportEqualsDeclaration(parent) :
                                    node.kind === ts.SyntaxKind.GetKeyword ? ts.isGetAccessorDeclaration(parent) :
                                        node.kind === ts.SyntaxKind.SetKeyword && ts.isSetAccessorDeclaration(parent)) {
        const location = getAdjustedLocationForDeclaration(parent, forRename);
        if (location) {
            return location;
        }
    }
    // /**/<var|let|const> [|name|] ...
    if ((node.kind === ts.SyntaxKind.VarKeyword || node.kind === ts.SyntaxKind.ConstKeyword || node.kind === ts.SyntaxKind.LetKeyword) &&
        ts.isVariableDeclarationList(parent) && parent.declarations.length === 1) {
        const decl = parent.declarations[0];
        if (ts.isIdentifier(decl.name)) {
            return decl.name;
        }
    }
    if (node.kind === ts.SyntaxKind.TypeKeyword) {
        // import /**/type [|name|] from ...;
        // import /**/type { [|name|] } from ...;
        // import /**/type { propertyName as [|name|] } from ...;
        // import /**/type ... from "[|module|]";
        if (ts.isImportClause(parent) && parent.isTypeOnly) {
            const location = getAdjustedLocationForImportDeclaration(parent.parent, forRename);
            if (location) {
                return location;
            }
        }
        // export /**/type { [|name|] } from ...;
        // export /**/type { propertyName as [|name|] } from ...;
        // export /**/type * from "[|module|]";
        // export /**/type * as ... from "[|module|]";
        if (ts.isExportDeclaration(parent) && parent.isTypeOnly) {
            const location = getAdjustedLocationForExportDeclaration(parent, forRename);
            if (location) {
                return location;
            }
        }
    }
    // import { propertyName /**/as [|name|] } ...
    // import * /**/as [|name|] ...
    // export { propertyName /**/as [|name|] } ...
    // export * /**/as [|name|] ...
    if (node.kind === ts.SyntaxKind.AsKeyword) {
        if (ts.isImportSpecifier(parent) && parent.propertyName ||
            ts.isExportSpecifier(parent) && parent.propertyName ||
            ts.isNamespaceImport(parent) ||
            ts.isNamespaceExport(parent)) {
            return parent.name;
        }
        if (ts.isExportDeclaration(parent) && parent.exportClause && ts.isNamespaceExport(parent.exportClause)) {
            return parent.exportClause.name;
        }
    }
    // /**/import [|name|] from ...;
    // /**/import { [|name|] } from ...;
    // /**/import { propertyName as [|name|] } from ...;
    // /**/import ... from "[|module|]";
    // /**/import "[|module|]";
    if (node.kind === ts.SyntaxKind.ImportKeyword && ts.isImportDeclaration(parent)) {
        const location = getAdjustedLocationForImportDeclaration(parent, forRename);
        if (location) {
            return location;
        }
    }
    if (node.kind === ts.SyntaxKind.ExportKeyword) {
        // /**/export { [|name|] } ...;
        // /**/export { propertyName as [|name|] } ...;
        // /**/export * from "[|module|]";
        // /**/export * as ... from "[|module|]";
        if (ts.isExportDeclaration(parent)) {
            const location = getAdjustedLocationForExportDeclaration(parent, forRename);
            if (location) {
                return location;
            }
        }
        // NOTE: We don't adjust the location of the `default` keyword as that is handled specially by `getSymbolAtLocation`.
        // /**/export default [|name|];
        // /**/export = [|name|];
        if (ts.isExportAssignment(parent)) {
            return ts.skipOuterExpressions(parent.expression);
        }
    }
    // import name = /**/require("[|module|]");
    if (node.kind === ts.SyntaxKind.RequireKeyword && ts.isExternalModuleReference(parent)) {
        return parent.expression;
    }
    // import ... /**/from "[|module|]";
    // export ... /**/from "[|module|]";
    if (node.kind === ts.SyntaxKind.FromKeyword && (ts.isImportDeclaration(parent) || ts.isExportDeclaration(parent)) && parent.moduleSpecifier) {
        return parent.moduleSpecifier;
    }
    // class ... /**/extends [|name|] ...
    // class ... /**/implements [|name|] ...
    // class ... /**/implements name1, name2 ...
    // interface ... /**/extends [|name|] ...
    // interface ... /**/extends name1, name2 ...
    if ((node.kind === ts.SyntaxKind.ExtendsKeyword || node.kind === ts.SyntaxKind.ImplementsKeyword) && ts.isHeritageClause(parent) && parent.token === node.kind) {
        const location = getAdjustedLocationForHeritageClause(parent);
        if (location) {
            return location;
        }
    }
    if (node.kind === ts.SyntaxKind.ExtendsKeyword) {
        // ... <T /**/extends [|U|]> ...
        if (ts.isTypeParameterDeclaration(parent) && parent.constraint && ts.isTypeReferenceNode(parent.constraint)) {
            return parent.constraint.typeName;
        }
        // ... T /**/extends [|U|] ? ...
        if (ts.isConditionalTypeNode(parent) && ts.isTypeReferenceNode(parent.extendsType)) {
            return parent.extendsType.typeName;
        }
    }
    // ... T extends /**/infer [|U|] ? ...
    if (node.kind === ts.SyntaxKind.InferKeyword && ts.isInferTypeNode(parent)) {
        return parent.typeParameter.name;
    }
    // { [ [|K|] /**/in keyof T]: ... }
    if (node.kind === ts.SyntaxKind.InKeyword && ts.isTypeParameterDeclaration(parent) && ts.isMappedTypeNode(parent.parent)) {
        return parent.name;
    }
    // /**/keyof [|T|]
    if (node.kind === ts.SyntaxKind.KeyOfKeyword && ts.isTypeOperatorNode(parent) && parent.operator === ts.SyntaxKind.KeyOfKeyword &&
        ts.isTypeReferenceNode(parent.type)) {
        return parent.type.typeName;
    }
    // /**/readonly [|name|][]
    if (node.kind === ts.SyntaxKind.ReadonlyKeyword && ts.isTypeOperatorNode(parent) && parent.operator === ts.SyntaxKind.ReadonlyKeyword &&
        ts.isArrayTypeNode(parent.type) && ts.isTypeReferenceNode(parent.type.elementType)) {
        return parent.type.elementType.typeName;
    }
    if (!forRename) {
        // /**/new [|name|]
        // /**/void [|name|]
        // /**/void obj.[|name|]
        // /**/typeof [|name|]
        // /**/typeof obj.[|name|]
        // /**/await [|name|]
        // /**/await obj.[|name|]
        // /**/yield [|name|]
        // /**/yield obj.[|name|]
        // /**/delete obj.[|name|]
        if (node.kind === ts.SyntaxKind.NewKeyword && ts.isNewExpression(parent) ||
            node.kind === ts.SyntaxKind.VoidKeyword && ts.isVoidExpression(parent) ||
            node.kind === ts.SyntaxKind.TypeOfKeyword && ts.isTypeOfExpression(parent) ||
            node.kind === ts.SyntaxKind.AwaitKeyword && ts.isAwaitExpression(parent) ||
            node.kind === ts.SyntaxKind.YieldKeyword && ts.isYieldExpression(parent) ||
            node.kind === ts.SyntaxKind.DeleteKeyword && ts.isDeleteExpression(parent)) {
            if (parent.expression) {
                return ts.skipOuterExpressions(parent.expression);
            }
        }
        // left /**/in [|name|]
        // left /**/instanceof [|name|]
        if ((node.kind === ts.SyntaxKind.InKeyword || node.kind === ts.SyntaxKind.InstanceOfKeyword) && ts.isBinaryExpression(parent) && parent.operatorToken === node) {
            return ts.skipOuterExpressions(parent.right);
        }
        // left /**/as [|name|]
        if (node.kind === ts.SyntaxKind.AsKeyword && ts.isAsExpression(parent) && ts.isTypeReferenceNode(parent.type)) {
            return parent.type.typeName;
        }
        // for (... /**/in [|name|])
        // for (... /**/of [|name|])
        if (node.kind === ts.SyntaxKind.InKeyword && ts.isForInStatement(parent) ||
            node.kind === ts.SyntaxKind.OfKeyword && ts.isForOfStatement(parent)) {
            return ts.skipOuterExpressions(parent.expression);
        }
    }
    return node;
}

/**
 * Adjusts the location used for "find references" and "go to definition" when the cursor was not
 * on a property name.
 */
export function getAdjustedReferenceLocation(node: ts.Node): ts.Node {
    return getAdjustedLocation(node, /*forRename*/ false);
}

/**
 * Adjusts the location used for "rename" when the cursor was not on a property name.
 */
export function getAdjustedRenameLocation(node: ts.Node): ts.Node {
    return getAdjustedLocation(node, /*forRename*/ true);
}

/**
 * Gets the token whose text has range [start, end) and
 * position >= start and (position < end or (position === end && token is literal or keyword or identifier))
 */
export function getTouchingPropertyName(sourceFile: ts.SourceFile, position: number): ts.Node {
    return getTouchingToken(sourceFile, position, n => ts.isPropertyNameLiteral(n) || ts.isKeyword(n.kind) || ts.isPrivateIdentifier(n));
}

/**
 * Returns the token if position is in [start, end).
 * If position === end, returns the preceding token if includeItemAtEndPosition(previousToken) === true
 */
export function getTouchingToken(sourceFile: ts.SourceFile, position: number, includePrecedingTokenAtEndPosition?: (n: ts.Node) => boolean): ts.Node {
    return getTokenAtPositionWorker(sourceFile, position, /*allowPositionInLeadingTrivia*/ false, includePrecedingTokenAtEndPosition, /*includeEndPosition*/ false);
}

/** Returns a token if position is in [start-of-leading-trivia, end) */
export function getTokenAtPosition(sourceFile: ts.SourceFile, position: number): ts.Node {
    return getTokenAtPositionWorker(sourceFile, position, /*allowPositionInLeadingTrivia*/ true, /*includePrecedingTokenAtEndPosition*/ undefined, /*includeEndPosition*/ false);
}

/** Get the token whose text contains the position */
function getTokenAtPositionWorker(sourceFile: ts.SourceFile, position: number, allowPositionInLeadingTrivia: boolean, includePrecedingTokenAtEndPosition: ((n: ts.Node) => boolean) | undefined, includeEndPosition: boolean): ts.Node {
    let current: ts.Node = sourceFile;
    let foundToken: ts.Node | undefined;
    outer: while (true) {
        // find the child that contains 'position'

        const children = current.getChildren(sourceFile);
        const i = ts.binarySearchKey(children, position, (_, i) => i, (middle, _) => {
            // This last callback is more of a selector than a comparator -
            // `EqualTo` causes the `middle` result to be returned
            // `GreaterThan` causes recursion on the left of the middle
            // `LessThan` causes recursion on the right of the middle

            // Let's say you have 3 nodes, spanning positons
            // pos: 1, end: 3
            // pos: 3, end: 3
            // pos: 3, end: 5
            // and you're looking for the token at positon 3 - all 3 of these nodes are overlapping with position 3.
            // In fact, there's a _good argument_ that node 2 shouldn't even be allowed to exist - depending on if
            // the start or end of the ranges are considered inclusive, it's either wholly subsumed by the first or the last node.
            // Unfortunately, such nodes do exist. :( - See fourslash/completionsImport_tsx.tsx - empty jsx attributes create
            // a zero-length node.
            // What also you may not expect is that which node we return depends on the includePrecedingTokenAtEndPosition flag.
            // Specifically, if includePrecedingTokenAtEndPosition is set, we return the 1-3 node, while if it's unset, we
            // return the 3-5 node. (The zero length node is never correct.) This is because the includePrecedingTokenAtEndPosition
            // flag causes us to return the first node whose end position matches the position and which produces and acceptable token
            // kind. Meanwhile, if includePrecedingTokenAtEndPosition is unset, we look for the first node whose start is <= the
            // position and whose end is greater than the position.


            // There are more sophisticated end tests later, but this one is very fast
            // and allows us to skip a bunch of work
            const end = children[middle].getEnd();
            if (end < position) {
                return ts.Comparison.LessThan;
            }

            const start = allowPositionInLeadingTrivia ? children[middle].getFullStart() : children[middle].getStart(sourceFile, /*includeJsDoc*/ true);
            if (start > position) {
                return ts.Comparison.GreaterThan;
            }

            // first element whose start position is before the input and whose end position is after or equal to the input
            if (nodeContainsPosition(children[middle], start, end)) {
                if (children[middle - 1]) {
                    // we want the _first_ element that contains the position, so left-recur if the prior node also contains the position
                    if (nodeContainsPosition(children[middle - 1])) {
                        return ts.Comparison.GreaterThan;
                    }
                }
                return ts.Comparison.EqualTo;
            }

            // this complex condition makes us left-recur around a zero-length node when includePrecedingTokenAtEndPosition is set, rather than right-recur on it
            if (includePrecedingTokenAtEndPosition && start === position && children[middle - 1] && children[middle - 1].getEnd() === position && nodeContainsPosition(children[middle - 1])) {
                return ts.Comparison.GreaterThan;
            }
            return ts.Comparison.LessThan;
        });

        if (foundToken) {
            return foundToken;
        }
        if (i >= 0 && children[i]) {
            current = children[i];
            continue outer;
        }

        return current;
    }

    function nodeContainsPosition(node: ts.Node, start?: number, end?: number) {
        end ??= node.getEnd();
        if (end < position) {
            return false;
        }
        start ??= allowPositionInLeadingTrivia ? node.getFullStart() : node.getStart(sourceFile, /*includeJsDoc*/ true);
        if (start > position) {
            // If this child begins after position, then all subsequent children will as well.
            return false;
        }
        if (position < end || (position === end && (node.kind === ts.SyntaxKind.EndOfFileToken || includeEndPosition))) {
            return true;
        }
        else if (includePrecedingTokenAtEndPosition && end === position) {
            const previousToken = findPrecedingToken(position, sourceFile, node);
            if (previousToken && includePrecedingTokenAtEndPosition(previousToken)) {
                foundToken = previousToken;
                return true;
            }
        }
        return false;
    }
}

/**
 * Returns the first token where position is in [start, end),
 * excluding `JsxText` tokens containing only whitespace.
 */
export function findFirstNonJsxWhitespaceToken(sourceFile: ts.SourceFile, position: number): ts.Node | undefined {
    let tokenAtPosition = getTokenAtPosition(sourceFile, position);
    while (isWhiteSpaceOnlyJsxText(tokenAtPosition)) {
        const nextToken = findNextToken(tokenAtPosition, tokenAtPosition.parent, sourceFile);
        if (!nextToken) return;
        tokenAtPosition = nextToken;
    }
    return tokenAtPosition;
}

/**
 * The token on the left of the position is the token that strictly includes the position
 * or sits to the left of the cursor if it is on a boundary. For example
 *
 *   fo|o               -> will return foo
 *   foo <comment> |bar -> will return foo
 *
 */
export function findTokenOnLeftOfPosition(file: ts.SourceFile, position: number): ts.Node | undefined {
    // Ideally, getTokenAtPosition should return a token. However, it is currently
    // broken, so we do a check to make sure the result was indeed a token.
    const tokenAtPosition = getTokenAtPosition(file, position);
    if (ts.isToken(tokenAtPosition) && position > tokenAtPosition.getStart(file) && position < tokenAtPosition.getEnd()) {
        return tokenAtPosition;
    }

    return findPrecedingToken(position, file);
}

export function findNextToken(previousToken: ts.Node, parent: ts.Node, sourceFile: ts.SourceFileLike): ts.Node | undefined {
    return find(parent);

    function find(n: ts.Node): ts.Node | undefined {
        if (ts.isToken(n) && n.pos === previousToken.end) {
            // this is token that starts at the end of previous token - return it
            return n;
        }
        return ts.firstDefined(n.getChildren(sourceFile), child => {
            const shouldDiveInChildNode =
                // previous token is enclosed somewhere in the child
                (child.pos <= previousToken.pos && child.end > previousToken.end) ||
                // previous token ends exactly at the beginning of child
                (child.pos === previousToken.end);
            return shouldDiveInChildNode && nodeHasTokens(child, sourceFile) ? find(child) : undefined;
        });
    }
}

/**
 * Finds the rightmost token satisfying `token.end <= position`,
 * excluding `JsxText` tokens containing only whitespace.
 */
export function findPrecedingToken(position: number, sourceFile: ts.SourceFileLike, startNode: ts.Node, excludeJsdoc?: boolean): ts.Node | undefined;
export function findPrecedingToken(position: number, sourceFile: ts.SourceFile, startNode?: ts.Node, excludeJsdoc?: boolean): ts.Node | undefined;
export function findPrecedingToken(position: number, sourceFile: ts.SourceFileLike, startNode?: ts.Node, excludeJsdoc?: boolean): ts.Node | undefined {
    const result = find((startNode || sourceFile) as ts.Node);
    ts.Debug.assert(!(result && isWhiteSpaceOnlyJsxText(result)));
    return result;

    function find(n: ts.Node): ts.Node | undefined {
        if (isNonWhitespaceToken(n) && n.kind !== ts.SyntaxKind.EndOfFileToken) {
            return n;
        }

        const children = n.getChildren(sourceFile);
        const i = ts.binarySearchKey(children, position, (_, i) => i, (middle, _) => {
            // This last callback is more of a selector than a comparator -
            // `EqualTo` causes the `middle` result to be returned
            // `GreaterThan` causes recursion on the left of the middle
            // `LessThan` causes recursion on the right of the middle
            if (position < children[middle].end) {
                // first element whose end position is greater than the input position
                if (!children[middle - 1] || position >= children[middle - 1].end) {
                    return ts.Comparison.EqualTo;
                }
                return ts.Comparison.GreaterThan;
            }
            return ts.Comparison.LessThan;
        });
        if (i >= 0 && children[i]) {
            const child = children[i];
            // Note that the span of a node's tokens is [node.getStart(...), node.end).
            // Given that `position < child.end` and child has constituent tokens, we distinguish these cases:
            // 1) `position` precedes `child`'s tokens or `child` has no tokens (ie: in a comment or whitespace preceding `child`):
            // we need to find the last token in a previous child.
            // 2) `position` is within the same span: we recurse on `child`.
            if (position < child.end) {
                const start = child.getStart(sourceFile, /*includeJsDoc*/ !excludeJsdoc);
                const lookInPreviousChild =
                    (start >= position) || // cursor in the leading trivia
                    !nodeHasTokens(child, sourceFile) ||
                    isWhiteSpaceOnlyJsxText(child);

                if (lookInPreviousChild) {
                    // actual start of the node is past the position - previous token should be at the end of previous child
                    const candidate = findRightmostChildNodeWithTokens(children, /*exclusiveStartPosition*/ i, sourceFile, n.kind);
                    return candidate && findRightmostToken(candidate, sourceFile);
                }
                else {
                    // candidate should be in this node
                    return find(child);
                }
            }
        }

        ts.Debug.assert(startNode !== undefined || n.kind === ts.SyntaxKind.SourceFile || n.kind === ts.SyntaxKind.EndOfFileToken || ts.isJSDocCommentContainingNode(n));

        // Here we know that none of child token nodes embrace the position,
        // the only known case is when position is at the end of the file.
        // Try to find the rightmost token in the file without filtering.
        // Namely we are skipping the check: 'position < node.end'
        const candidate = findRightmostChildNodeWithTokens(children, /*exclusiveStartPosition*/ children.length, sourceFile, n.kind);
        return candidate && findRightmostToken(candidate, sourceFile);
    }
}

function isNonWhitespaceToken(n: ts.Node): boolean {
    return ts.isToken(n) && !isWhiteSpaceOnlyJsxText(n);
}

function findRightmostToken(n: ts.Node, sourceFile: ts.SourceFileLike): ts.Node | undefined {
    if (isNonWhitespaceToken(n)) {
        return n;
    }

    const children = n.getChildren(sourceFile);
    if (children.length === 0) {
        return n;
    }

    const candidate = findRightmostChildNodeWithTokens(children, /*exclusiveStartPosition*/ children.length, sourceFile, n.kind);
    return candidate && findRightmostToken(candidate, sourceFile);
}

/**
 * Finds the rightmost child to the left of `children[exclusiveStartPosition]` which is a non-all-whitespace token or has constituent tokens.
 */
function findRightmostChildNodeWithTokens(children: ts.Node[], exclusiveStartPosition: number, sourceFile: ts.SourceFileLike, parentKind: ts.SyntaxKind): ts.Node | undefined {
    for (let i = exclusiveStartPosition - 1; i >= 0; i--) {
        const child = children[i];

        if (isWhiteSpaceOnlyJsxText(child)) {
            if (i === 0 && (parentKind === ts.SyntaxKind.JsxText || parentKind === ts.SyntaxKind.JsxSelfClosingElement)) {
                ts.Debug.fail("`JsxText` tokens should not be the first child of `JsxElement | JsxSelfClosingElement`");
            }
        }
        else if (nodeHasTokens(children[i], sourceFile)) {
            return children[i];
        }
    }
}

export function isInString(sourceFile: ts.SourceFile, position: number, previousToken = findPrecedingToken(position, sourceFile)): boolean {
    if (previousToken && ts.isStringTextContainingNode(previousToken)) {
        const start = previousToken.getStart(sourceFile);
        const end = previousToken.getEnd();

        // To be "in" one of these literals, the position has to be:
        //   1. entirely within the token text.
        //   2. at the end position of an unterminated token.
        //   3. at the end of a regular expression (due to trailing flags like '/foo/g').
        if (start < position && position < end) {
            return true;
        }

        if (position === end) {
            return !!(previousToken as ts.LiteralExpression).isUnterminated;
        }
    }

    return false;
}

/**
 * returns true if the position is in between the open and close elements of an JSX expression.
 */
export function isInsideJsxElementOrAttribute(sourceFile: ts.SourceFile, position: number) {
    const token = getTokenAtPosition(sourceFile, position);

    if (!token) {
        return false;
    }

    if (token.kind === ts.SyntaxKind.JsxText) {
        return true;
    }

    // <div>Hello |</div>
    if (token.kind === ts.SyntaxKind.LessThanToken && token.parent.kind === ts.SyntaxKind.JsxText) {
        return true;
    }

    // <div> { | </div> or <div a={| </div>
    if (token.kind === ts.SyntaxKind.LessThanToken && token.parent.kind === ts.SyntaxKind.JsxExpression) {
        return true;
    }

    // <div> {
    // |
    // } < /div>
    if (token && token.kind === ts.SyntaxKind.CloseBraceToken && token.parent.kind === ts.SyntaxKind.JsxExpression) {
        return true;
    }

    // <div>|</div>
    if (token.kind === ts.SyntaxKind.LessThanToken && token.parent.kind === ts.SyntaxKind.JsxClosingElement) {
        return true;
    }

    return false;
}

function isWhiteSpaceOnlyJsxText(node: ts.Node): boolean {
    return ts.isJsxText(node) && node.containsOnlyTriviaWhiteSpaces;
}

export function isInTemplateString(sourceFile: ts.SourceFile, position: number) {
    const token = getTokenAtPosition(sourceFile, position);
    return ts.isTemplateLiteralKind(token.kind) && position > token.getStart(sourceFile);
}

export function isInJSXText(sourceFile: ts.SourceFile, position: number) {
    const token = getTokenAtPosition(sourceFile, position);
    if (ts.isJsxText(token)) {
        return true;
    }
    if (token.kind === ts.SyntaxKind.OpenBraceToken && ts.isJsxExpression(token.parent) && ts.isJsxElement(token.parent.parent)) {
        return true;
    }
    if (token.kind === ts.SyntaxKind.LessThanToken && ts.isJsxOpeningLikeElement(token.parent) && ts.isJsxElement(token.parent.parent)) {
        return true;
    }
    return false;
}

export function isInsideJsxElement(sourceFile: ts.SourceFile, position: number): boolean {
    function isInsideJsxElementTraversal(node: ts.Node): boolean {
        while (node) {
            if (node.kind >= ts.SyntaxKind.JsxSelfClosingElement && node.kind <= ts.SyntaxKind.JsxExpression
                || node.kind === ts.SyntaxKind.JsxText
                || node.kind === ts.SyntaxKind.LessThanToken
                || node.kind === ts.SyntaxKind.GreaterThanToken
                || node.kind === ts.SyntaxKind.Identifier
                || node.kind === ts.SyntaxKind.CloseBraceToken
                || node.kind === ts.SyntaxKind.OpenBraceToken
                || node.kind === ts.SyntaxKind.SlashToken) {
                node = node.parent;
            }
            else if (node.kind === ts.SyntaxKind.JsxElement) {
                if (position > node.getStart(sourceFile)) return true;

                node = node.parent;
            }
            else {
                return false;
            }
        }

        return false;
    }

    return isInsideJsxElementTraversal(getTokenAtPosition(sourceFile, position));
}

export function findPrecedingMatchingToken(token: ts.Node, matchingTokenKind: ts.SyntaxKind.OpenBraceToken | ts.SyntaxKind.OpenParenToken | ts.SyntaxKind.OpenBracketToken, sourceFile: ts.SourceFile) {
    const closeTokenText = ts.tokenToString(token.kind)!;
    const matchingTokenText = ts.tokenToString(matchingTokenKind)!;
    const tokenFullStart = token.getFullStart();
    // Text-scan based fast path - can be bamboozled by comments and other trivia, but often provides
    // a good, fast approximation without too much extra work in the cases where it fails.
    const bestGuessIndex = sourceFile.text.lastIndexOf(matchingTokenText, tokenFullStart);
    if (bestGuessIndex === -1) {
        return undefined; // if the token text doesn't appear in the file, there can't be a match - super fast bail
    }
    // we can only use the textual result directly if we didn't have to count any close tokens within the range
    if (sourceFile.text.lastIndexOf(closeTokenText, tokenFullStart - 1) < bestGuessIndex) {
        const nodeAtGuess = findPrecedingToken(bestGuessIndex + 1, sourceFile);
        if (nodeAtGuess && nodeAtGuess.kind === matchingTokenKind) {
            return nodeAtGuess;
        }
    }
    const tokenKind = token.kind;
    let remainingMatchingTokens = 0;
    while (true) {
        const preceding = findPrecedingToken(token.getFullStart(), sourceFile);
        if (!preceding) {
            return undefined;
        }
        token = preceding;

        if (token.kind === matchingTokenKind) {
            if (remainingMatchingTokens === 0) {
                return token;
            }

            remainingMatchingTokens--;
        }
        else if (token.kind === tokenKind) {
            remainingMatchingTokens++;
        }
    }
}

export function removeOptionality(type: ts.Type, isOptionalExpression: boolean, isOptionalChain: boolean) {
    return isOptionalExpression ? type.getNonNullableType() :
        isOptionalChain ? type.getNonOptionalType() :
            type;
}

export function isPossiblyTypeArgumentPosition(token: ts.Node, sourceFile: ts.SourceFile, checker: ts.TypeChecker): boolean {
    const info = getPossibleTypeArgumentsInfo(token, sourceFile);
    return info !== undefined && (ts.isPartOfTypeNode(info.called) ||
        getPossibleGenericSignatures(info.called, info.nTypeArguments, checker).length !== 0 ||
        isPossiblyTypeArgumentPosition(info.called, sourceFile, checker));
}

export function getPossibleGenericSignatures(called: ts.Expression, typeArgumentCount: number, checker: ts.TypeChecker): readonly ts.Signature[] {
    let type = checker.getTypeAtLocation(called);
    if (ts.isOptionalChain(called.parent)) {
        type = removeOptionality(type, ts.isOptionalChainRoot(called.parent), /*isOptionalChain*/ true);
    }

    const signatures = ts.isNewExpression(called.parent) ? type.getConstructSignatures() : type.getCallSignatures();
    return signatures.filter(candidate => !!candidate.typeParameters && candidate.typeParameters.length >= typeArgumentCount);
}

export interface PossibleTypeArgumentInfo {
    readonly called: ts.Identifier;
    readonly nTypeArguments: number;
}

export interface PossibleProgramFileInfo {
    ProgramFiles?: string[];
}

// Get info for an expression like `f <` that may be the start of type arguments.
export function getPossibleTypeArgumentsInfo(tokenIn: ts.Node | undefined, sourceFile: ts.SourceFile): PossibleTypeArgumentInfo | undefined {
    // This is a rare case, but one that saves on a _lot_ of work if true - if the source file has _no_ `<` character,
    // then there obviously can't be any type arguments - no expensive brace-matching backwards scanning required

    if (sourceFile.text.lastIndexOf("<", tokenIn ? tokenIn.pos : sourceFile.text.length) === -1) {
        return undefined;
    }

    let token: ts.Node | undefined = tokenIn;
    // This function determines if the node could be type argument position
    // Since during editing, when type argument list is not complete,
    // the tree could be of any shape depending on the tokens parsed before current node,
    // scanning of the previous identifier followed by "<" before current node would give us better result
    // Note that we also balance out the already provided type arguments, arrays, object literals while doing so
    let remainingLessThanTokens = 0;
    let nTypeArguments = 0;
    while (token) {
        switch (token.kind) {
            case ts.SyntaxKind.LessThanToken:
                // Found the beginning of the generic argument expression
                token = findPrecedingToken(token.getFullStart(), sourceFile);
                if (token && token.kind === ts.SyntaxKind.QuestionDotToken) {
                    token = findPrecedingToken(token.getFullStart(), sourceFile);
                }
                if (!token || !ts.isIdentifier(token)) return undefined;
                if (!remainingLessThanTokens) {
                    return ts.isDeclarationName(token) ? undefined : { called: token, nTypeArguments };
                }
                remainingLessThanTokens--;
                break;

            case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
                remainingLessThanTokens = + 3;
                break;

            case ts.SyntaxKind.GreaterThanGreaterThanToken:
                remainingLessThanTokens = + 2;
                break;

            case ts.SyntaxKind.GreaterThanToken:
                remainingLessThanTokens++;
                break;

            case ts.SyntaxKind.CloseBraceToken:
                // This can be object type, skip until we find the matching open brace token
                // Skip until the matching open brace token
                token = findPrecedingMatchingToken(token, ts.SyntaxKind.OpenBraceToken, sourceFile);
                if (!token) return undefined;
                break;

            case ts.SyntaxKind.CloseParenToken:
                // This can be object type, skip until we find the matching open brace token
                // Skip until the matching open brace token
                token = findPrecedingMatchingToken(token, ts.SyntaxKind.OpenParenToken, sourceFile);
                if (!token) return undefined;
                break;

            case ts.SyntaxKind.CloseBracketToken:
                // This can be object type, skip until we find the matching open brace token
                // Skip until the matching open brace token
                token = findPrecedingMatchingToken(token, ts.SyntaxKind.OpenBracketToken, sourceFile);
                if (!token) return undefined;
                break;

            // Valid tokens in a type name. Skip.
            case ts.SyntaxKind.CommaToken:
                nTypeArguments++;
                break;

            case ts.SyntaxKind.EqualsGreaterThanToken:
            // falls through

            case ts.SyntaxKind.Identifier:
            case ts.SyntaxKind.StringLiteral:
            case ts.SyntaxKind.NumericLiteral:
            case ts.SyntaxKind.BigIntLiteral:
            case ts.SyntaxKind.TrueKeyword:
            case ts.SyntaxKind.FalseKeyword:
            // falls through

            case ts.SyntaxKind.TypeOfKeyword:
            case ts.SyntaxKind.ExtendsKeyword:
            case ts.SyntaxKind.KeyOfKeyword:
            case ts.SyntaxKind.DotToken:
            case ts.SyntaxKind.BarToken:
            case ts.SyntaxKind.QuestionToken:
            case ts.SyntaxKind.ColonToken:
                break;

            default:
                if (ts.isTypeNode(token)) {
                    break;
                }

                // Invalid token in type
                return undefined;
        }

        token = findPrecedingToken(token.getFullStart(), sourceFile);
    }

    return undefined;
}

/**
 * Returns true if the cursor at position in sourceFile is within a comment.
 *
 * @param tokenAtPosition Must equal `getTokenAtPosition(sourceFile, position)`
 * @param predicate Additional predicate to test on the comment range.
 */
export function isInComment(sourceFile: ts.SourceFile, position: number, tokenAtPosition?: ts.Node): ts.CommentRange | undefined {
    return ts.formatting.getRangeOfEnclosingComment(sourceFile, position, /*precedingToken*/ undefined, tokenAtPosition);
}

export function hasDocComment(sourceFile: ts.SourceFile, position: number): boolean {
    const token = getTokenAtPosition(sourceFile, position);
    return !!ts.findAncestor(token, ts.isJSDoc);
}

function nodeHasTokens(n: ts.Node, sourceFile: ts.SourceFileLike): boolean {
    // If we have a token or node that has a non-zero width, it must have tokens.
    // Note: getWidth() does not take trivia into account.
    return n.kind === ts.SyntaxKind.EndOfFileToken ? !!(n as ts.EndOfFileToken).jsDoc : n.getWidth(sourceFile) !== 0;
}

export function getNodeModifiers(node: ts.Node, excludeFlags = ts.ModifierFlags.None): string {
    const result: string[] = [];
    const flags = ts.isDeclaration(node)
        ? ts.getCombinedNodeFlagsAlwaysIncludeJSDoc(node) & ~excludeFlags
        : ts.ModifierFlags.None;

    if (flags & ts.ModifierFlags.Private) result.push(ts.ScriptElementKindModifier.privateMemberModifier);
    if (flags & ts.ModifierFlags.Protected) result.push(ts.ScriptElementKindModifier.protectedMemberModifier);
    if (flags & ts.ModifierFlags.Public) result.push(ts.ScriptElementKindModifier.publicMemberModifier);
    if (flags & ts.ModifierFlags.Static || ts.isClassStaticBlockDeclaration(node)) result.push(ts.ScriptElementKindModifier.staticModifier);
    if (flags & ts.ModifierFlags.Abstract) result.push(ts.ScriptElementKindModifier.abstractModifier);
    if (flags & ts.ModifierFlags.Export) result.push(ts.ScriptElementKindModifier.exportedModifier);
    if (flags & ts.ModifierFlags.Deprecated) result.push(ts.ScriptElementKindModifier.deprecatedModifier);
    if (node.flags & ts.NodeFlags.Ambient) result.push(ts.ScriptElementKindModifier.ambientModifier);
    if (node.kind === ts.SyntaxKind.ExportAssignment) result.push(ts.ScriptElementKindModifier.exportedModifier);

    return result.length > 0 ? result.join(",") : ts.ScriptElementKindModifier.none;
}

export function getTypeArgumentOrTypeParameterList(node: ts.Node): ts.NodeArray<ts.Node> | undefined {
    if (node.kind === ts.SyntaxKind.TypeReference || node.kind === ts.SyntaxKind.CallExpression) {
        return (node as ts.CallExpression).typeArguments;
    }

    if (ts.isFunctionLike(node) || node.kind === ts.SyntaxKind.ClassDeclaration || node.kind === ts.SyntaxKind.InterfaceDeclaration) {
        return (node as ts.FunctionLikeDeclaration).typeParameters;
    }

    return undefined;
}

export function isComment(kind: ts.SyntaxKind): boolean {
    return kind === ts.SyntaxKind.SingleLineCommentTrivia || kind === ts.SyntaxKind.MultiLineCommentTrivia;
}

export function isStringOrRegularExpressionOrTemplateLiteral(kind: ts.SyntaxKind): boolean {
    if (kind === ts.SyntaxKind.StringLiteral
        || kind === ts.SyntaxKind.RegularExpressionLiteral
        || ts.isTemplateLiteralKind(kind)) {
        return true;
    }
    return false;
}

export function isPunctuation(kind: ts.SyntaxKind): boolean {
    return ts.SyntaxKind.FirstPunctuation <= kind && kind <= ts.SyntaxKind.LastPunctuation;
}

export function isInsideTemplateLiteral(node: ts.TemplateLiteralToken, position: number, sourceFile: ts.SourceFile): boolean {
    return ts.isTemplateLiteralKind(node.kind)
        && (node.getStart(sourceFile) < position && position < node.end) || (!!node.isUnterminated && position === node.end);
}

export function isAccessibilityModifier(kind: ts.SyntaxKind) {
    switch (kind) {
        case ts.SyntaxKind.PublicKeyword:
        case ts.SyntaxKind.PrivateKeyword:
        case ts.SyntaxKind.ProtectedKeyword:
            return true;
    }

    return false;
}

export function cloneCompilerOptions(options: ts.CompilerOptions): ts.CompilerOptions {
    const result = ts.clone(options);
    ts.setConfigFileInOptions(result, options && options.configFile);
    return result;
}

export function isArrayLiteralOrObjectLiteralDestructuringPattern(node: ts.Node) {
    if (node.kind === ts.SyntaxKind.ArrayLiteralExpression ||
        node.kind === ts.SyntaxKind.ObjectLiteralExpression) {
        // [a,b,c] from:
        // [a, b, c] = someExpression;
        if (node.parent.kind === ts.SyntaxKind.BinaryExpression &&
            (node.parent as ts.BinaryExpression).left === node &&
            (node.parent as ts.BinaryExpression).operatorToken.kind === ts.SyntaxKind.EqualsToken) {
            return true;
        }

        // [a, b, c] from:
        // for([a, b, c] of expression)
        if (node.parent.kind === ts.SyntaxKind.ForOfStatement &&
            (node.parent as ts.ForOfStatement).initializer === node) {
            return true;
        }

        // [a, b, c] of
        // [x, [a, b, c] ] = someExpression
        // or
        // {x, a: {a, b, c} } = someExpression
        if (isArrayLiteralOrObjectLiteralDestructuringPattern(node.parent.kind === ts.SyntaxKind.PropertyAssignment ? node.parent.parent : node.parent)) {
            return true;
        }
    }

    return false;
}

export function isInReferenceComment(sourceFile: ts.SourceFile, position: number): boolean {
    return isInReferenceCommentWorker(sourceFile, position, /*shouldBeReference*/ true);
}

export function isInNonReferenceComment(sourceFile: ts.SourceFile, position: number): boolean {
    return isInReferenceCommentWorker(sourceFile, position, /*shouldBeReference*/ false);
}

function isInReferenceCommentWorker(sourceFile: ts.SourceFile, position: number, shouldBeReference: boolean): boolean {
    const range = isInComment(sourceFile, position, /*tokenAtPosition*/ undefined);
    return !!range && shouldBeReference === tripleSlashDirectivePrefixRegex.test(sourceFile.text.substring(range.pos, range.end));
}

export function getReplacementSpanForContextToken(contextToken: ts.Node | undefined) {
    if (!contextToken) return undefined;

    switch (contextToken.kind) {
        case ts.SyntaxKind.StringLiteral:
        case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
            return createTextSpanFromStringLiteralLikeContent(contextToken as ts.StringLiteralLike);
        default:
            return createTextSpanFromNode(contextToken);
    }
}

export function createTextSpanFromNode(node: ts.Node, sourceFile?: ts.SourceFile, endNode?: ts.Node): ts.TextSpan {
    return ts.createTextSpanFromBounds(node.getStart(sourceFile), (endNode || node).getEnd());
}

export function createTextSpanFromStringLiteralLikeContent(node: ts.StringLiteralLike) {
    if (node.isUnterminated) return undefined;
    return ts.createTextSpanFromBounds(node.getStart() + 1, node.getEnd() - 1);
}

export function createTextRangeFromNode(node: ts.Node, sourceFile: ts.SourceFile): ts.TextRange {
    return ts.createRange(node.getStart(sourceFile), node.end);
}

export function createTextSpanFromRange(range: ts.TextRange): ts.TextSpan {
    return ts.createTextSpanFromBounds(range.pos, range.end);
}

export function createTextRangeFromSpan(span: ts.TextSpan): ts.TextRange {
    return ts.createRange(span.start, span.start + span.length);
}

export function createTextChangeFromStartLength(start: number, length: number, newText: string): ts.TextChange {
    return createTextChange(ts.createTextSpan(start, length), newText);
}

export function createTextChange(span: ts.TextSpan, newText: string): ts.TextChange {
    return { span, newText };
}

export const typeKeywords: readonly ts.SyntaxKind[] = [
    ts.SyntaxKind.AnyKeyword,
    ts.SyntaxKind.AssertsKeyword,
    ts.SyntaxKind.BigIntKeyword,
    ts.SyntaxKind.BooleanKeyword,
    ts.SyntaxKind.FalseKeyword,
    ts.SyntaxKind.InferKeyword,
    ts.SyntaxKind.KeyOfKeyword,
    ts.SyntaxKind.NeverKeyword,
    ts.SyntaxKind.NullKeyword,
    ts.SyntaxKind.NumberKeyword,
    ts.SyntaxKind.ObjectKeyword,
    ts.SyntaxKind.ReadonlyKeyword,
    ts.SyntaxKind.StringKeyword,
    ts.SyntaxKind.SymbolKeyword,
    ts.SyntaxKind.TrueKeyword,
    ts.SyntaxKind.VoidKeyword,
    ts.SyntaxKind.UndefinedKeyword,
    ts.SyntaxKind.UniqueKeyword,
    ts.SyntaxKind.UnknownKeyword,
];

export function isTypeKeyword(kind: ts.SyntaxKind): boolean {
    return ts.contains(typeKeywords, kind);
}

export function isTypeKeywordToken(node: ts.Node): node is ts.Token<ts.SyntaxKind.TypeKeyword> {
    return node.kind === ts.SyntaxKind.TypeKeyword;
}

export function isTypeKeywordTokenOrIdentifier(node: ts.Node) {
    return isTypeKeywordToken(node) || ts.isIdentifier(node) && node.text === "type";
}

/** True if the symbol is for an external module, as opposed to a namespace. */
export function isExternalModuleSymbol(moduleSymbol: ts.Symbol): boolean {
    return !!(moduleSymbol.flags & ts.SymbolFlags.Module) && moduleSymbol.name.charCodeAt(0) === ts.CharacterCodes.doubleQuote;
}

/** Returns `true` the first time it encounters a node and `false` afterwards. */
export type NodeSeenTracker<T = ts.Node> = (node: T) => boolean;
export function nodeSeenTracker<T extends ts.Node>(): NodeSeenTracker<T> {
    const seen: true[] = [];
    return node => {
        const id = ts.getNodeId(node);
        return !seen[id] && (seen[id] = true);
    };
}

export function getSnapshotText(snap: ts.IScriptSnapshot): string {
    return snap.getText(0, snap.getLength());
}

export function repeatString(str: string, count: number): string {
    let result = "";
    for (let i = 0; i < count; i++) {
        result += str;
    }
    return result;
}

export function skipConstraint(type: ts.Type): ts.Type {
    return type.isTypeParameter() ? type.getConstraint() || type : type;
}

export function getNameFromPropertyName(name: ts.PropertyName): string | undefined {
    return name.kind === ts.SyntaxKind.ComputedPropertyName
        // treat computed property names where expression is string/numeric literal as just string/numeric literal
        ? ts.isStringOrNumericLiteralLike(name.expression) ? name.expression.text : undefined
        : ts.isPrivateIdentifier(name) ? ts.idText(name) : ts.getTextOfIdentifierOrLiteral(name);
}

export function programContainsModules(program: ts.Program): boolean {
    return program.getSourceFiles().some(s => !s.isDeclarationFile && !program.isSourceFileFromExternalLibrary(s) && !!(s.externalModuleIndicator || s.commonJsModuleIndicator));
}
export function programContainsEsModules(program: ts.Program): boolean {
    return program.getSourceFiles().some(s => !s.isDeclarationFile && !program.isSourceFileFromExternalLibrary(s) && !!s.externalModuleIndicator);
}
export function compilerOptionsIndicateEsModules(compilerOptions: ts.CompilerOptions): boolean {
    return !!compilerOptions.module || ts.getEmitScriptTarget(compilerOptions) >= ts.ScriptTarget.ES2015 || !!compilerOptions.noEmit;
}

export function createModuleSpecifierResolutionHost(program: ts.Program, host: ts.LanguageServiceHost): ts.ModuleSpecifierResolutionHost {
    // Mix in `getSymlinkCache` from Program when host doesn't have it
    // in order for non-Project hosts to have a symlinks cache.
    return {
        fileExists: fileName => program.fileExists(fileName),
        getCurrentDirectory: () => host.getCurrentDirectory(),
        readFile: ts.maybeBind(host, host.readFile),
        useCaseSensitiveFileNames: ts.maybeBind(host, host.useCaseSensitiveFileNames),
        getSymlinkCache: ts.maybeBind(host, host.getSymlinkCache) || program.getSymlinkCache,
        getModuleSpecifierCache: ts.maybeBind(host, host.getModuleSpecifierCache),
        getPackageJsonInfoCache: () => program.getModuleResolutionCache()?.getPackageJsonInfoCache(),
        getGlobalTypingsCacheLocation: ts.maybeBind(host, host.getGlobalTypingsCacheLocation),
        redirectTargetsMap: program.redirectTargetsMap,
        getProjectReferenceRedirect: fileName => program.getProjectReferenceRedirect(fileName),
        isSourceOfProjectReferenceRedirect: fileName => program.isSourceOfProjectReferenceRedirect(fileName),
        getNearestAncestorDirectoryWithPackageJson: ts.maybeBind(host, host.getNearestAncestorDirectoryWithPackageJson),
        getFileIncludeReasons: () => program.getFileIncludeReasons(),
    };
}

export function getModuleSpecifierResolverHost(program: ts.Program, host: ts.LanguageServiceHost): ts.SymbolTracker["moduleResolverHost"] {
    return {
        ...createModuleSpecifierResolutionHost(program, host),
        getCommonSourceDirectory: () => program.getCommonSourceDirectory(),
    };
}

export function moduleResolutionRespectsExports(moduleResolution: ts.ModuleResolutionKind): boolean {
    return moduleResolution >= ts.ModuleResolutionKind.Node16 && moduleResolution <= ts.ModuleResolutionKind.NodeNext;
}

export function moduleResolutionUsesNodeModules(moduleResolution: ts.ModuleResolutionKind): boolean {
    return moduleResolution === ts.ModuleResolutionKind.NodeJs || moduleResolution >= ts.ModuleResolutionKind.Node16 && moduleResolution <= ts.ModuleResolutionKind.NodeNext;
}

export function makeImportIfNecessary(defaultImport: ts.Identifier | undefined, namedImports: readonly ts.ImportSpecifier[] | undefined, moduleSpecifier: string, quotePreference: QuotePreference): ts.ImportDeclaration | undefined {
    return defaultImport || namedImports && namedImports.length ? makeImport(defaultImport, namedImports, moduleSpecifier, quotePreference) : undefined;
}

export function makeImport(defaultImport: ts.Identifier | undefined, namedImports: readonly ts.ImportSpecifier[] | undefined, moduleSpecifier: string | ts.Expression, quotePreference: QuotePreference, isTypeOnly?: boolean): ts.ImportDeclaration {
    return ts.factory.createImportDeclaration(
        /*modifiers*/ undefined,
        defaultImport || namedImports
            ? ts.factory.createImportClause(!!isTypeOnly, defaultImport, namedImports && namedImports.length ? ts.factory.createNamedImports(namedImports) : undefined)
            : undefined,
        typeof moduleSpecifier === "string" ? makeStringLiteral(moduleSpecifier, quotePreference) : moduleSpecifier,
        /*assertClause*/ undefined);
}

export function makeStringLiteral(text: string, quotePreference: QuotePreference): ts.StringLiteral {
    return ts.factory.createStringLiteral(text, quotePreference === QuotePreference.Single);
}

export const enum QuotePreference { Single, Double }

export function quotePreferenceFromString(str: ts.StringLiteral, sourceFile: ts.SourceFile): QuotePreference {
    return ts.isStringDoubleQuoted(str, sourceFile) ? QuotePreference.Double : QuotePreference.Single;
}

export function getQuotePreference(sourceFile: ts.SourceFile, preferences: ts.UserPreferences): QuotePreference {
    if (preferences.quotePreference && preferences.quotePreference !== "auto") {
        return preferences.quotePreference === "single" ? QuotePreference.Single : QuotePreference.Double;
    }
    else {
        // ignore synthetic import added when importHelpers: true
        const firstModuleSpecifier = sourceFile.imports &&
            ts.find(sourceFile.imports, n => ts.isStringLiteral(n) && !ts.nodeIsSynthesized(n.parent)) as ts.StringLiteral;
        return firstModuleSpecifier ? quotePreferenceFromString(firstModuleSpecifier, sourceFile) : QuotePreference.Double;
    }
}

export function getQuoteFromPreference(qp: QuotePreference): string {
    switch (qp) {
        case QuotePreference.Single: return "'";
        case QuotePreference.Double: return '"';
        default: return ts.Debug.assertNever(qp);
    }
}

export function symbolNameNoDefault(symbol: ts.Symbol): string | undefined {
    const escaped = symbolEscapedNameNoDefault(symbol);
    return escaped === undefined ? undefined : ts.unescapeLeadingUnderscores(escaped);
}

export function symbolEscapedNameNoDefault(symbol: ts.Symbol): ts.__String | undefined {
    if (symbol.escapedName !== ts.InternalSymbolName.Default) {
        return symbol.escapedName;
    }

    return ts.firstDefined(symbol.declarations, decl => {
        const name = ts.getNameOfDeclaration(decl);
        return name && name.kind === ts.SyntaxKind.Identifier ? name.escapedText : undefined;
    });
}

export function isModuleSpecifierLike(node: ts.Node): node is ts.StringLiteralLike {
    return ts.isStringLiteralLike(node) && (
        ts.isExternalModuleReference(node.parent) ||
        ts.isImportDeclaration(node.parent) ||
        ts.isRequireCall(node.parent, /*requireStringLiteralLikeArgument*/ false) && node.parent.arguments[0] === node ||
        ts.isImportCall(node.parent) && node.parent.arguments[0] === node);
}

export type ObjectBindingElementWithoutPropertyName = ts.BindingElement & { name: ts.Identifier };

export function isObjectBindingElementWithoutPropertyName(bindingElement: ts.Node): bindingElement is ObjectBindingElementWithoutPropertyName {
    return ts.isBindingElement(bindingElement) &&
        ts.isObjectBindingPattern(bindingElement.parent) &&
        ts.isIdentifier(bindingElement.name) &&
        !bindingElement.propertyName;
}

export function getPropertySymbolFromBindingElement(checker: ts.TypeChecker, bindingElement: ObjectBindingElementWithoutPropertyName): ts.Symbol | undefined {
    const typeOfPattern = checker.getTypeAtLocation(bindingElement.parent);
    return typeOfPattern && checker.getPropertyOfType(typeOfPattern, bindingElement.name.text);
}

export function getParentNodeInSpan(node: ts.Node | undefined, file: ts.SourceFile, span: ts.TextSpan): ts.Node | undefined {
    if (!node) return undefined;

    while (node.parent) {
        if (ts.isSourceFile(node.parent) || !spanContainsNode(span, node.parent, file)) {
            return node;
        }

        node = node.parent;
    }
}

function spanContainsNode(span: ts.TextSpan, node: ts.Node, file: ts.SourceFile): boolean {
    return ts.textSpanContainsPosition(span, node.getStart(file)) &&
        node.getEnd() <= ts.textSpanEnd(span);
}

export function findModifier(node: ts.Node, kind: ts.Modifier["kind"]): ts.Modifier | undefined {
    return ts.canHaveModifiers(node) ? ts.find(node.modifiers, (m): m is ts.Modifier => m.kind === kind) : undefined;
}

export function insertImports(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, imports: ts.AnyImportOrRequireStatement | readonly ts.AnyImportOrRequireStatement[], blankLineBetween: boolean): void {
    const decl = ts.isArray(imports) ? imports[0] : imports;
    const importKindPredicate: (node: ts.Node) => node is ts.AnyImportOrRequireStatement = decl.kind === ts.SyntaxKind.VariableStatement ? ts.isRequireVariableStatement : ts.isAnyImportSyntax;
    const existingImportStatements = ts.filter(sourceFile.statements, importKindPredicate);
    const sortedNewImports = ts.isArray(imports) ? ts.stableSort(imports, ts.OrganizeImports.compareImportsOrRequireStatements) : [imports];
    if (!existingImportStatements.length) {
        changes.insertNodesAtTopOfFile(sourceFile, sortedNewImports, blankLineBetween);
    }
    else if (existingImportStatements && ts.OrganizeImports.importsAreSorted(existingImportStatements)) {
        for (const newImport of sortedNewImports) {
            const insertionIndex = ts.OrganizeImports.getImportDeclarationInsertionIndex(existingImportStatements, newImport);
            if (insertionIndex === 0) {
                // If the first import is top-of-file, insert after the leading comment which is likely the header.
                const options = existingImportStatements[0] === sourceFile.statements[0] ?
                { leadingTriviaOption: ts.textChanges.LeadingTriviaOption.Exclude } : {};
                changes.insertNodeBefore(sourceFile, existingImportStatements[0], newImport, /*blankLineBetween*/ false, options);
            }
            else {
                const prevImport = existingImportStatements[insertionIndex - 1];
                changes.insertNodeAfter(sourceFile, prevImport, newImport);
            }
        }
    }
    else {
        const lastExistingImport = ts.lastOrUndefined(existingImportStatements);
        if (lastExistingImport) {
            changes.insertNodesAfter(sourceFile, lastExistingImport, sortedNewImports);
        }
        else {
            changes.insertNodesAtTopOfFile(sourceFile, sortedNewImports, blankLineBetween);
        }
    }
}

export function getTypeKeywordOfTypeOnlyImport(importClause: ts.ImportClause, sourceFile: ts.SourceFile): ts.Token<ts.SyntaxKind.TypeKeyword> {
    ts.Debug.assert(importClause.isTypeOnly);
    return ts.cast(importClause.getChildAt(0, sourceFile), isTypeKeywordToken);
}

export function textSpansEqual(a: ts.TextSpan | undefined, b: ts.TextSpan | undefined): boolean {
    return !!a && !!b && a.start === b.start && a.length === b.length;
}
export function documentSpansEqual(a: ts.DocumentSpan, b: ts.DocumentSpan): boolean {
    return a.fileName === b.fileName && textSpansEqual(a.textSpan, b.textSpan);
}

/**
 * Iterates through 'array' by index and performs the callback on each element of array until the callback
 * returns a truthy value, then returns that value.
 * If no such value is found, the callback is applied to each element of array and undefined is returned.
 */
export function forEachUnique<T, U>(array: readonly T[] | undefined, callback: (element: T, index: number) => U): U | undefined {
    if (array) {
        for (let i = 0; i < array.length; i++) {
            if (array.indexOf(array[i]) === i) {
                const result = callback(array[i], i);
                if (result) {
                    return result;
                }
            }
        }
    }
    return undefined;
}

export function isTextWhiteSpaceLike(text: string, startPos: number, endPos: number): boolean {
    for (let i = startPos; i < endPos; i++) {
        if (!ts.isWhiteSpaceLike(text.charCodeAt(i))) {
            return false;
        }
    }

    return true;
}

export function getMappedLocation(location: ts.DocumentPosition, sourceMapper: ts.SourceMapper, fileExists: ((path: string) => boolean) | undefined): ts.DocumentPosition | undefined {
    const mapsTo = sourceMapper.tryGetSourcePosition(location);
    return mapsTo && (!fileExists || fileExists(ts.normalizePath(mapsTo.fileName)) ? mapsTo : undefined);
}

export function getMappedDocumentSpan(documentSpan: ts.DocumentSpan, sourceMapper: ts.SourceMapper, fileExists?: (path: string) => boolean): ts.DocumentSpan | undefined {
    const { fileName, textSpan } = documentSpan;
    const newPosition = getMappedLocation({ fileName, pos: textSpan.start }, sourceMapper, fileExists);
    if (!newPosition) return undefined;
    const newEndPosition = getMappedLocation({ fileName, pos: textSpan.start + textSpan.length }, sourceMapper, fileExists);
    const newLength = newEndPosition
        ? newEndPosition.pos - newPosition.pos
        : textSpan.length; // This shouldn't happen
    return {
        fileName: newPosition.fileName,
        textSpan: {
            start: newPosition.pos,
            length: newLength,
        },
        originalFileName: documentSpan.fileName,
        originalTextSpan: documentSpan.textSpan,
        contextSpan: getMappedContextSpan(documentSpan, sourceMapper, fileExists),
        originalContextSpan: documentSpan.contextSpan
    };
}

export function getMappedContextSpan(documentSpan: ts.DocumentSpan, sourceMapper: ts.SourceMapper, fileExists?: (path: string) => boolean): ts.TextSpan | undefined {
    const contextSpanStart = documentSpan.contextSpan && getMappedLocation(
        { fileName: documentSpan.fileName, pos: documentSpan.contextSpan.start },
        sourceMapper,
        fileExists
    );
    const contextSpanEnd = documentSpan.contextSpan && getMappedLocation(
        { fileName: documentSpan.fileName, pos: documentSpan.contextSpan.start + documentSpan.contextSpan.length },
        sourceMapper,
        fileExists
    );
    return contextSpanStart && contextSpanEnd ?
        { start: contextSpanStart.pos, length: contextSpanEnd.pos - contextSpanStart.pos } :
        undefined;
}

// #endregion

// Display-part writer helpers
// #region
export function isFirstDeclarationOfSymbolParameter(symbol: ts.Symbol) {
    const declaration = symbol.declarations ? ts.firstOrUndefined(symbol.declarations) : undefined;
    return !!ts.findAncestor(declaration, n =>
        ts.isParameter(n) ? true : ts.isBindingElement(n) || ts.isObjectBindingPattern(n) || ts.isArrayBindingPattern(n) ? false : "quit");
}

const displayPartWriter = getDisplayPartWriter();
function getDisplayPartWriter(): ts.DisplayPartsSymbolWriter {
    const absoluteMaximumLength = ts.defaultMaximumTruncationLength * 10; // A hard cutoff to avoid overloading the messaging channel in worst-case scenarios
    let displayParts: ts.SymbolDisplayPart[];
    let lineStart: boolean;
    let indent: number;
    let length: number;

    resetWriter();
    const unknownWrite = (text: string) => writeKind(text, ts.SymbolDisplayPartKind.text);
    return {
        displayParts: () => {
            const finalText = displayParts.length && displayParts[displayParts.length - 1].text;
            if (length > absoluteMaximumLength && finalText && finalText !== "...") {
                if (!ts.isWhiteSpaceLike(finalText.charCodeAt(finalText.length - 1))) {
                    displayParts.push(displayPart(" ", ts.SymbolDisplayPartKind.space));
                }
                displayParts.push(displayPart("...", ts.SymbolDisplayPartKind.punctuation));
            }
            return displayParts;
        },
        writeKeyword: text => writeKind(text, ts.SymbolDisplayPartKind.keyword),
        writeOperator: text => writeKind(text, ts.SymbolDisplayPartKind.operator),
        writePunctuation: text => writeKind(text, ts.SymbolDisplayPartKind.punctuation),
        writeTrailingSemicolon: text => writeKind(text, ts.SymbolDisplayPartKind.punctuation),
        writeSpace: text => writeKind(text, ts.SymbolDisplayPartKind.space),
        writeStringLiteral: text => writeKind(text, ts.SymbolDisplayPartKind.stringLiteral),
        writeParameter: text => writeKind(text, ts.SymbolDisplayPartKind.parameterName),
        writeProperty: text => writeKind(text, ts.SymbolDisplayPartKind.propertyName),
        writeLiteral: text => writeKind(text, ts.SymbolDisplayPartKind.stringLiteral),
        writeSymbol,
        writeLine,
        write: unknownWrite,
        writeComment: unknownWrite,
        getText: () => "",
        getTextPos: () => 0,
        getColumn: () => 0,
        getLine: () => 0,
        isAtStartOfLine: () => false,
        hasTrailingWhitespace: () => false,
        hasTrailingComment: () => false,
        rawWrite: ts.notImplemented,
        getIndent: () => indent,
        increaseIndent: () => { indent++; },
        decreaseIndent: () => { indent--; },
        clear: resetWriter,
        trackSymbol: () => false,
        reportInaccessibleThisError: ts.noop,
        reportInaccessibleUniqueSymbolError: ts.noop,
        reportPrivateInBaseOfClassExpression: ts.noop,
    };

    function writeIndent() {
        if (length > absoluteMaximumLength) return;
        if (lineStart) {
            const indentString = ts.getIndentString(indent);
            if (indentString) {
                length += indentString.length;
                displayParts.push(displayPart(indentString, ts.SymbolDisplayPartKind.space));
            }
            lineStart = false;
        }
    }

    function writeKind(text: string, kind: ts.SymbolDisplayPartKind) {
        if (length > absoluteMaximumLength) return;
        writeIndent();
        length += text.length;
        displayParts.push(displayPart(text, kind));
    }

    function writeSymbol(text: string, symbol: ts.Symbol) {
        if (length > absoluteMaximumLength) return;
        writeIndent();
        length += text.length;
        displayParts.push(symbolPart(text, symbol));
    }

    function writeLine() {
        if (length > absoluteMaximumLength) return;
        length += 1;
        displayParts.push(lineBreakPart());
        lineStart = true;
    }

    function resetWriter() {
        displayParts = [];
        lineStart = true;
        indent = 0;
        length = 0;
    }
}

export function symbolPart(text: string, symbol: ts.Symbol) {
    return displayPart(text, displayPartKind(symbol));

    function displayPartKind(symbol: ts.Symbol): ts.SymbolDisplayPartKind {
        const flags = symbol.flags;

        if (flags & ts.SymbolFlags.Variable) {
            return isFirstDeclarationOfSymbolParameter(symbol) ? ts.SymbolDisplayPartKind.parameterName : ts.SymbolDisplayPartKind.localName;
        }
        if (flags & ts.SymbolFlags.Property) return ts.SymbolDisplayPartKind.propertyName;
        if (flags & ts.SymbolFlags.GetAccessor) return ts.SymbolDisplayPartKind.propertyName;
        if (flags & ts.SymbolFlags.SetAccessor) return ts.SymbolDisplayPartKind.propertyName;
        if (flags & ts.SymbolFlags.EnumMember) return ts.SymbolDisplayPartKind.enumMemberName;
        if (flags & ts.SymbolFlags.Function) return ts.SymbolDisplayPartKind.functionName;
        if (flags & ts.SymbolFlags.Class) return ts.SymbolDisplayPartKind.className;
        if (flags & ts.SymbolFlags.Interface) return ts.SymbolDisplayPartKind.interfaceName;
        if (flags & ts.SymbolFlags.Enum) return ts.SymbolDisplayPartKind.enumName;
        if (flags & ts.SymbolFlags.Module) return ts.SymbolDisplayPartKind.moduleName;
        if (flags & ts.SymbolFlags.Method) return ts.SymbolDisplayPartKind.methodName;
        if (flags & ts.SymbolFlags.TypeParameter) return ts.SymbolDisplayPartKind.typeParameterName;
        if (flags & ts.SymbolFlags.TypeAlias) return ts.SymbolDisplayPartKind.aliasName;
        if (flags & ts.SymbolFlags.Alias) return ts.SymbolDisplayPartKind.aliasName;

        return ts.SymbolDisplayPartKind.text;
    }
}

export function displayPart(text: string, kind: ts.SymbolDisplayPartKind): ts.SymbolDisplayPart {
    return { text, kind: ts.SymbolDisplayPartKind[kind] };
}

export function spacePart() {
    return displayPart(" ", ts.SymbolDisplayPartKind.space);
}

export function keywordPart(kind: ts.SyntaxKind) {
    return displayPart(ts.tokenToString(kind)!, ts.SymbolDisplayPartKind.keyword);
}

export function punctuationPart(kind: ts.SyntaxKind) {
    return displayPart(ts.tokenToString(kind)!, ts.SymbolDisplayPartKind.punctuation);
}

export function operatorPart(kind: ts.SyntaxKind) {
    return displayPart(ts.tokenToString(kind)!, ts.SymbolDisplayPartKind.operator);
}

export function parameterNamePart(text: string) {
    return displayPart(text, ts.SymbolDisplayPartKind.parameterName);
}

export function propertyNamePart(text: string) {
    return displayPart(text, ts.SymbolDisplayPartKind.propertyName);
}

export function textOrKeywordPart(text: string) {
    const kind = ts.stringToToken(text);
    return kind === undefined
        ? textPart(text)
        : keywordPart(kind);
}

export function textPart(text: string) {
    return displayPart(text, ts.SymbolDisplayPartKind.text);
}

export function typeAliasNamePart(text: string) {
    return displayPart(text, ts.SymbolDisplayPartKind.aliasName);
}

export function typeParameterNamePart(text: string) {
    return displayPart(text, ts.SymbolDisplayPartKind.typeParameterName);
}

export function linkTextPart(text: string) {
    return displayPart(text, ts.SymbolDisplayPartKind.linkText);
}

export function linkNamePart(text: string, target: ts.Declaration): ts.JSDocLinkDisplayPart {
    return {
        text,
        kind: ts.SymbolDisplayPartKind[ts.SymbolDisplayPartKind.linkName],
        target: {
            fileName: ts.getSourceFileOfNode(target).fileName,
            textSpan: createTextSpanFromNode(target),
        },
    };
}

export function linkPart(text: string) {
    return displayPart(text, ts.SymbolDisplayPartKind.link);
}

export function buildLinkParts(link: ts.JSDocLink | ts.JSDocLinkCode | ts.JSDocLinkPlain, checker?: ts.TypeChecker): ts.SymbolDisplayPart[] {
    const prefix = ts.isJSDocLink(link) ? "link"
        : ts.isJSDocLinkCode(link) ? "linkcode"
        : "linkplain";
    const parts = [linkPart(`{@${prefix} `)];
    if (!link.name) {
        if (link.text) {
            parts.push(linkTextPart(link.text));
        }
    }
    else {
        const symbol = checker?.getSymbolAtLocation(link.name);
        const suffix = findLinkNameEnd(link.text);
        const name = ts.getTextOfNode(link.name) + link.text.slice(0, suffix);
        const text = skipSeparatorFromLinkText(link.text.slice(suffix));
        const decl = symbol?.valueDeclaration || symbol?.declarations?.[0];
        if (decl) {
            parts.push(linkNamePart(name, decl));
            if (text) parts.push(linkTextPart(text));
        }
        else {
            parts.push(linkTextPart(name + (suffix || text.indexOf("://") === 0 ? "" : " ") + text));
        }
    }
    parts.push(linkPart("}"));
    return parts;
}

function skipSeparatorFromLinkText(text: string) {
    let pos = 0;
    if (text.charCodeAt(pos++) === ts.CharacterCodes.bar) {
        while (pos < text.length && text.charCodeAt(pos) === ts.CharacterCodes.space) pos++;
        return text.slice(pos);
    }
    return text;
}

function findLinkNameEnd(text: string) {
    if (text.indexOf("()") === 0) return 2;
    if (text[0] !== "<") return 0;
    let brackets = 0;
    let i = 0;
    while (i < text.length) {
        if (text[i] === "<") brackets++;
        if (text[i] === ">") brackets--;
        i++;
        if (!brackets) return i;
    }
    return 0;
}

const carriageReturnLineFeed = "\r\n";
/**
 * The default is CRLF.
 */
export function getNewLineOrDefaultFromHost(host: ts.FormattingHost, formatSettings?: ts.FormatCodeSettings) {
    return formatSettings?.newLineCharacter ||
        host.getNewLine?.() ||
        carriageReturnLineFeed;
}

export function lineBreakPart() {
    return displayPart("\n", ts.SymbolDisplayPartKind.lineBreak);
}

export function mapToDisplayParts(writeDisplayParts: (writer: ts.DisplayPartsSymbolWriter) => void): ts.SymbolDisplayPart[] {
    try {
        writeDisplayParts(displayPartWriter);
        return displayPartWriter.displayParts();
    }
    finally {
        displayPartWriter.clear();
    }
}

export function typeToDisplayParts(typechecker: ts.TypeChecker, type: ts.Type, enclosingDeclaration?: ts.Node, flags: ts.TypeFormatFlags = ts.TypeFormatFlags.None): ts.SymbolDisplayPart[] {
    return mapToDisplayParts(writer => {
        typechecker.writeType(type, enclosingDeclaration, flags | ts.TypeFormatFlags.MultilineObjectLiterals | ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope, writer);
    });
}

export function symbolToDisplayParts(typeChecker: ts.TypeChecker, symbol: ts.Symbol, enclosingDeclaration?: ts.Node, meaning?: ts.SymbolFlags, flags: ts.SymbolFormatFlags = ts.SymbolFormatFlags.None): ts.SymbolDisplayPart[] {
    return mapToDisplayParts(writer => {
        typeChecker.writeSymbol(symbol, enclosingDeclaration, meaning, flags | ts.SymbolFormatFlags.UseAliasDefinedOutsideCurrentScope, writer);
    });
}

export function signatureToDisplayParts(typechecker: ts.TypeChecker, signature: ts.Signature, enclosingDeclaration?: ts.Node, flags: ts.TypeFormatFlags = ts.TypeFormatFlags.None): ts.SymbolDisplayPart[] {
    flags |= ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope | ts.TypeFormatFlags.MultilineObjectLiterals | ts.TypeFormatFlags.WriteTypeArgumentsOfSignature | ts.TypeFormatFlags.OmitParameterModifiers;
    return mapToDisplayParts(writer => {
        typechecker.writeSignature(signature, enclosingDeclaration, flags, /*signatureKind*/ undefined, writer);
    });
}

export function nodeToDisplayParts(node: ts.Node, enclosingDeclaration: ts.Node): ts.SymbolDisplayPart[] {
    const file = enclosingDeclaration.getSourceFile();
    return mapToDisplayParts(writer => {
        const printer = ts.createPrinter({ removeComments: true, omitTrailingSemicolon: true });
        printer.writeNode(ts.EmitHint.Unspecified, node, file, writer);
    });
}

export function isImportOrExportSpecifierName(location: ts.Node): location is ts.Identifier {
    return !!location.parent && ts.isImportOrExportSpecifier(location.parent) && location.parent.propertyName === location;
}

export function getScriptKind(fileName: string, host: ts.LanguageServiceHost): ts.ScriptKind {
    // First check to see if the script kind was specified by the host. Chances are the host
    // may override the default script kind for the file extension.
    return ts.ensureScriptKind(fileName, host.getScriptKind && host.getScriptKind(fileName));
}

export function getSymbolTarget(symbol: ts.Symbol, checker: ts.TypeChecker): ts.Symbol {
    let next: ts.Symbol = symbol;
    while (isAliasSymbol(next) || (isTransientSymbol(next) && next.target)) {
        if (isTransientSymbol(next) && next.target) {
            next = next.target;
        }
        else {
            next = ts.skipAlias(next, checker);
        }
    }
    return next;
}

function isTransientSymbol(symbol: ts.Symbol): symbol is ts.TransientSymbol {
    return (symbol.flags & ts.SymbolFlags.Transient) !== 0;
}

function isAliasSymbol(symbol: ts.Symbol): boolean {
    return (symbol.flags & ts.SymbolFlags.Alias) !== 0;
}

export function getUniqueSymbolId(symbol: ts.Symbol, checker: ts.TypeChecker) {
    return ts.getSymbolId(ts.skipAlias(symbol, checker));
}

export function getFirstNonSpaceCharacterPosition(text: string, position: number) {
    while (ts.isWhiteSpaceLike(text.charCodeAt(position))) {
        position += 1;
    }
    return position;
}

export function getPrecedingNonSpaceCharacterPosition(text: string, position: number) {
    while (position > -1 && ts.isWhiteSpaceSingleLine(text.charCodeAt(position))) {
        position -= 1;
    }
    return position + 1;
}

/**
 * Creates a deep, memberwise clone of a node with no source map location.
 *
 * WARNING: This is an expensive operation and is only intended to be used in refactorings
 * and code fixes (because those are triggered by explicit user actions).
 */
export function getSynthesizedDeepClone<T extends ts.Node | undefined>(node: T, includeTrivia = true): T {
    const clone = node && getSynthesizedDeepCloneWorker(node);
    if (clone && !includeTrivia) suppressLeadingAndTrailingTrivia(clone);
    return clone;
}

export function getSynthesizedDeepCloneWithReplacements<T extends ts.Node>(
    node: T,
    includeTrivia: boolean,
    replaceNode: (node: ts.Node) => ts.Node | undefined
): T {
    let clone = replaceNode(node);
    if (clone) {
        ts.setOriginalNode(clone, node);
    }
    else {
        clone = getSynthesizedDeepCloneWorker(node as NonNullable<T>, replaceNode);
    }

    if (clone && !includeTrivia) suppressLeadingAndTrailingTrivia(clone);
    return clone as T;
}

function getSynthesizedDeepCloneWorker<T extends ts.Node>(node: T, replaceNode?: (node: ts.Node) => ts.Node | undefined): T {
    const nodeClone: (n: T) => T = replaceNode
        ? n => getSynthesizedDeepCloneWithReplacements(n, /*includeTrivia*/ true, replaceNode)
        : getSynthesizedDeepClone;
    const nodesClone: (ns: ts.NodeArray<T>) => ts.NodeArray<T> = replaceNode
        ? ns => ns && getSynthesizedDeepClonesWithReplacements(ns, /*includeTrivia*/ true, replaceNode)
        : ns => ns && getSynthesizedDeepClones(ns);
    const visited =
        ts.visitEachChild(node, nodeClone, ts.nullTransformationContext, nodesClone, nodeClone);

    if (visited === node) {
        // This only happens for leaf nodes - internal nodes always see their children change.
        const clone =
            ts.isStringLiteral(node) ? ts.setOriginalNode(ts.factory.createStringLiteralFromNode(node), node) as ts.Node as T :
                ts.isNumericLiteral(node) ? ts.setOriginalNode(ts.factory.createNumericLiteral(node.text, node.numericLiteralFlags), node) as ts.Node as T :
                    ts.factory.cloneNode(node);
        return ts.setTextRange(clone, node);
    }

    // PERF: As an optimization, rather than calling factory.cloneNode, we'll update
    // the new node created by visitEachChild with the extra changes factory.cloneNode
    // would have made.
    (visited as ts.Mutable<T>).parent = undefined!;
    return visited;
}

export function getSynthesizedDeepClones<T extends ts.Node>(nodes: ts.NodeArray<T>, includeTrivia?: boolean): ts.NodeArray<T>;
export function getSynthesizedDeepClones<T extends ts.Node>(nodes: ts.NodeArray<T> | undefined, includeTrivia?: boolean): ts.NodeArray<T> | undefined;
export function getSynthesizedDeepClones<T extends ts.Node>(nodes: ts.NodeArray<T> | undefined, includeTrivia = true): ts.NodeArray<T> | undefined {
    return nodes && ts.factory.createNodeArray(nodes.map(n => getSynthesizedDeepClone(n, includeTrivia)), nodes.hasTrailingComma);
}

export function getSynthesizedDeepClonesWithReplacements<T extends ts.Node>(
    nodes: ts.NodeArray<T>,
    includeTrivia: boolean,
    replaceNode: (node: ts.Node) => ts.Node | undefined
): ts.NodeArray<T> {
    return ts.factory.createNodeArray(nodes.map(n => getSynthesizedDeepCloneWithReplacements(n, includeTrivia, replaceNode)), nodes.hasTrailingComma);
}

/**
 * Sets EmitFlags to suppress leading and trailing trivia on the node.
 */
export function suppressLeadingAndTrailingTrivia(node: ts.Node) {
    suppressLeadingTrivia(node);
    suppressTrailingTrivia(node);
}

/**
 * Sets EmitFlags to suppress leading trivia on the node.
 */
export function suppressLeadingTrivia(node: ts.Node) {
    addEmitFlagsRecursively(node, ts.EmitFlags.NoLeadingComments, getFirstChild);
}

/**
 * Sets EmitFlags to suppress trailing trivia on the node.
 */
export function suppressTrailingTrivia(node: ts.Node) {
    addEmitFlagsRecursively(node, ts.EmitFlags.NoTrailingComments, ts.getLastChild);
}

export function copyComments(sourceNode: ts.Node, targetNode: ts.Node) {
    const sourceFile = sourceNode.getSourceFile();
    const text = sourceFile.text;
    if (hasLeadingLineBreak(sourceNode, text)) {
        copyLeadingComments(sourceNode, targetNode, sourceFile);
    }
    else {
        copyTrailingAsLeadingComments(sourceNode, targetNode, sourceFile);
    }
    copyTrailingComments(sourceNode, targetNode, sourceFile);
}

function hasLeadingLineBreak(node: ts.Node, text: string) {
    const start = node.getFullStart();
    const end = node.getStart();
    for (let i = start; i < end; i++) {
        if (text.charCodeAt(i) === ts.CharacterCodes.lineFeed) return true;
    }
    return false;
}

function addEmitFlagsRecursively(node: ts.Node, flag: ts.EmitFlags, getChild: (n: ts.Node) => ts.Node | undefined) {
    ts.addEmitFlags(node, flag);
    const child = getChild(node);
    if (child) addEmitFlagsRecursively(child, flag, getChild);
}

function getFirstChild(node: ts.Node): ts.Node | undefined {
    return node.forEachChild(child => child);
}

export function getUniqueName(baseName: string, sourceFile: ts.SourceFile): string {
    let nameText = baseName;
    for (let i = 1; !ts.isFileLevelUniqueName(sourceFile, nameText); i++) {
        nameText = `${baseName}_${i}`;
    }
    return nameText;
}

/**
 * @return The index of the (only) reference to the extracted symbol.  We want the cursor
 * to be on the reference, rather than the declaration, because it's closer to where the
 * user was before extracting it.
 */
export function getRenameLocation(edits: readonly ts.FileTextChanges[], renameFilename: string, name: string, preferLastLocation: boolean): number {
    let delta = 0;
    let lastPos = -1;
    for (const { fileName, textChanges } of edits) {
        ts.Debug.assert(fileName === renameFilename);
        for (const change of textChanges) {
            const { span, newText } = change;
            const index = indexInTextChange(newText, ts.escapeString(name));
            if (index !== -1) {
                lastPos = span.start + delta + index;

                // If the reference comes first, return immediately.
                if (!preferLastLocation) {
                    return lastPos;
                }
            }
            delta += newText.length - span.length;
        }
    }

    // If the declaration comes first, return the position of the last occurrence.
    ts.Debug.assert(preferLastLocation);
    ts.Debug.assert(lastPos >= 0);
    return lastPos;
}

export function copyLeadingComments(sourceNode: ts.Node, targetNode: ts.Node, sourceFile: ts.SourceFile, commentKind?: ts.CommentKind, hasTrailingNewLine?: boolean) {
    ts.forEachLeadingCommentRange(sourceFile.text, sourceNode.pos, getAddCommentsFunction(targetNode, sourceFile, commentKind, hasTrailingNewLine, ts.addSyntheticLeadingComment));
}


export function copyTrailingComments(sourceNode: ts.Node, targetNode: ts.Node, sourceFile: ts.SourceFile, commentKind?: ts.CommentKind, hasTrailingNewLine?: boolean) {
    ts.forEachTrailingCommentRange(sourceFile.text, sourceNode.end, getAddCommentsFunction(targetNode, sourceFile, commentKind, hasTrailingNewLine, ts.addSyntheticTrailingComment));
}

/**
 * This function copies the trailing comments for the token that comes before `sourceNode`, as leading comments of `targetNode`.
 * This is useful because sometimes a comment that refers to `sourceNode` will be a leading comment for `sourceNode`, according to the
 * notion of trivia ownership, and instead will be a trailing comment for the token before `sourceNode`, e.g.:
 * `function foo(\* not leading comment for a *\ a: string) {}`
 * The comment refers to `a` but belongs to the `(` token, but we might want to copy it.
 */
export function copyTrailingAsLeadingComments(sourceNode: ts.Node, targetNode: ts.Node, sourceFile: ts.SourceFile, commentKind?: ts.CommentKind, hasTrailingNewLine?: boolean) {
    ts.forEachTrailingCommentRange(sourceFile.text, sourceNode.pos, getAddCommentsFunction(targetNode, sourceFile, commentKind, hasTrailingNewLine, ts.addSyntheticLeadingComment));
}

function getAddCommentsFunction(targetNode: ts.Node, sourceFile: ts.SourceFile, commentKind: ts.CommentKind | undefined, hasTrailingNewLine: boolean | undefined, cb: (node: ts.Node, kind: ts.CommentKind, text: string, hasTrailingNewLine?: boolean) => void) {
    return (pos: number, end: number, kind: ts.CommentKind, htnl: boolean) => {
        if (kind === ts.SyntaxKind.MultiLineCommentTrivia) {
            // Remove leading /*
            pos += 2;
            // Remove trailing */
            end -= 2;
        }
        else {
            // Remove leading //
            pos += 2;
        }
        cb(targetNode, commentKind || kind, sourceFile.text.slice(pos, end), hasTrailingNewLine !== undefined ? hasTrailingNewLine : htnl);
    };
}

function indexInTextChange(change: string, name: string): number {
    if (ts.startsWith(change, name)) return 0;
    // Add a " " to avoid references inside words
    let idx = change.indexOf(" " + name);
    if (idx === -1) idx = change.indexOf("." + name);
    if (idx === -1) idx = change.indexOf('"' + name);
    return idx === -1 ? -1 : idx + 1;
}

/* @internal */
export function needsParentheses(expression: ts.Expression): boolean {
    return ts.isBinaryExpression(expression) && expression.operatorToken.kind === ts.SyntaxKind.CommaToken
        || ts.isObjectLiteralExpression(expression)
        || ts.isAsExpression(expression) && ts.isObjectLiteralExpression(expression.expression);
}

export function getContextualTypeFromParent(node: ts.Expression, checker: ts.TypeChecker): ts.Type | undefined {
    const { parent } = node;
    switch (parent.kind) {
        case ts.SyntaxKind.NewExpression:
            return checker.getContextualType(parent as ts.NewExpression);
        case ts.SyntaxKind.BinaryExpression: {
            const { left, operatorToken, right } = parent as ts.BinaryExpression;
            return isEqualityOperatorKind(operatorToken.kind)
                ? checker.getTypeAtLocation(node === right ? left : right)
                : checker.getContextualType(node);
        }
        case ts.SyntaxKind.CaseClause:
            return (parent as ts.CaseClause).expression === node ? getSwitchedType(parent as ts.CaseClause, checker) : undefined;
        default:
            return checker.getContextualType(node);
    }
}

export function quote(sourceFile: ts.SourceFile, preferences: ts.UserPreferences, text: string): string {
    // Editors can pass in undefined or empty string - we want to infer the preference in those cases.
    const quotePreference = getQuotePreference(sourceFile, preferences);
    const quoted = JSON.stringify(text);
    return quotePreference === QuotePreference.Single ? `'${ts.stripQuotes(quoted).replace(/'/g, "\\'").replace(/\\"/g, '"')}'` : quoted;
}

export function isEqualityOperatorKind(kind: ts.SyntaxKind): kind is ts.EqualityOperator {
    switch (kind) {
        case ts.SyntaxKind.EqualsEqualsEqualsToken:
        case ts.SyntaxKind.EqualsEqualsToken:
        case ts.SyntaxKind.ExclamationEqualsEqualsToken:
        case ts.SyntaxKind.ExclamationEqualsToken:
            return true;
        default:
            return false;
    }
}

export function isStringLiteralOrTemplate(node: ts.Node): node is ts.StringLiteralLike | ts.TemplateExpression | ts.TaggedTemplateExpression {
    switch (node.kind) {
        case ts.SyntaxKind.StringLiteral:
        case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
        case ts.SyntaxKind.TemplateExpression:
        case ts.SyntaxKind.TaggedTemplateExpression:
            return true;
        default:
            return false;
    }
}

export function hasIndexSignature(type: ts.Type): boolean {
    return !!type.getStringIndexType() || !!type.getNumberIndexType();
}

export function getSwitchedType(caseClause: ts.CaseClause, checker: ts.TypeChecker): ts.Type | undefined {
    return checker.getTypeAtLocation(caseClause.parent.parent.expression);
}

export const ANONYMOUS = "anonymous function";

export function getTypeNodeIfAccessible(type: ts.Type, enclosingScope: ts.Node, program: ts.Program, host: ts.LanguageServiceHost): ts.TypeNode | undefined {
    const checker = program.getTypeChecker();
    let typeIsAccessible = true;
    const notAccessible = () => typeIsAccessible = false;
    const res = checker.typeToTypeNode(type, enclosingScope, ts.NodeBuilderFlags.NoTruncation, {
        trackSymbol: (symbol, declaration, meaning) => {
            typeIsAccessible = typeIsAccessible && checker.isSymbolAccessible(symbol, declaration, meaning, /*shouldComputeAliasToMarkVisible*/ false).accessibility === ts.SymbolAccessibility.Accessible;
            return !typeIsAccessible;
        },
        reportInaccessibleThisError: notAccessible,
        reportPrivateInBaseOfClassExpression: notAccessible,
        reportInaccessibleUniqueSymbolError: notAccessible,
        moduleResolverHost: getModuleSpecifierResolverHost(program, host)
    });
    return typeIsAccessible ? res : undefined;
}

function syntaxRequiresTrailingCommaOrSemicolonOrASI(kind: ts.SyntaxKind) {
    return kind === ts.SyntaxKind.CallSignature
        || kind === ts.SyntaxKind.ConstructSignature
        || kind === ts.SyntaxKind.IndexSignature
        || kind === ts.SyntaxKind.PropertySignature
        || kind === ts.SyntaxKind.MethodSignature;
}

function syntaxRequiresTrailingFunctionBlockOrSemicolonOrASI(kind: ts.SyntaxKind) {
    return kind === ts.SyntaxKind.FunctionDeclaration
        || kind === ts.SyntaxKind.Constructor
        || kind === ts.SyntaxKind.MethodDeclaration
        || kind === ts.SyntaxKind.GetAccessor
        || kind === ts.SyntaxKind.SetAccessor;
}

function syntaxRequiresTrailingModuleBlockOrSemicolonOrASI(kind: ts.SyntaxKind) {
    return kind === ts.SyntaxKind.ModuleDeclaration;
}

export function syntaxRequiresTrailingSemicolonOrASI(kind: ts.SyntaxKind) {
    return kind === ts.SyntaxKind.VariableStatement
        || kind === ts.SyntaxKind.ExpressionStatement
        || kind === ts.SyntaxKind.DoStatement
        || kind === ts.SyntaxKind.ContinueStatement
        || kind === ts.SyntaxKind.BreakStatement
        || kind === ts.SyntaxKind.ReturnStatement
        || kind === ts.SyntaxKind.ThrowStatement
        || kind === ts.SyntaxKind.DebuggerStatement
        || kind === ts.SyntaxKind.PropertyDeclaration
        || kind === ts.SyntaxKind.TypeAliasDeclaration
        || kind === ts.SyntaxKind.ImportDeclaration
        || kind === ts.SyntaxKind.ImportEqualsDeclaration
        || kind === ts.SyntaxKind.ExportDeclaration
        || kind === ts.SyntaxKind.NamespaceExportDeclaration
        || kind === ts.SyntaxKind.ExportAssignment;
}

export const syntaxMayBeASICandidate = ts.or(
    syntaxRequiresTrailingCommaOrSemicolonOrASI,
    syntaxRequiresTrailingFunctionBlockOrSemicolonOrASI,
    syntaxRequiresTrailingModuleBlockOrSemicolonOrASI,
    syntaxRequiresTrailingSemicolonOrASI);

function nodeIsASICandidate(node: ts.Node, sourceFile: ts.SourceFileLike): boolean {
    const lastToken = node.getLastToken(sourceFile);
    if (lastToken && lastToken.kind === ts.SyntaxKind.SemicolonToken) {
        return false;
    }

    if (syntaxRequiresTrailingCommaOrSemicolonOrASI(node.kind)) {
        if (lastToken && lastToken.kind === ts.SyntaxKind.CommaToken) {
            return false;
        }
    }
    else if (syntaxRequiresTrailingModuleBlockOrSemicolonOrASI(node.kind)) {
        const lastChild = ts.last(node.getChildren(sourceFile));
        if (lastChild && ts.isModuleBlock(lastChild)) {
            return false;
        }
    }
    else if (syntaxRequiresTrailingFunctionBlockOrSemicolonOrASI(node.kind)) {
        const lastChild = ts.last(node.getChildren(sourceFile));
        if (lastChild && ts.isFunctionBlock(lastChild)) {
            return false;
        }
    }
    else if (!syntaxRequiresTrailingSemicolonOrASI(node.kind)) {
        return false;
    }

    // See comment in parser’s `parseDoStatement`
    if (node.kind === ts.SyntaxKind.DoStatement) {
        return true;
    }

    const topNode = ts.findAncestor(node, ancestor => !ancestor.parent)!;
    const nextToken = findNextToken(node, topNode, sourceFile);
    if (!nextToken || nextToken.kind === ts.SyntaxKind.CloseBraceToken) {
        return true;
    }

    const startLine = sourceFile.getLineAndCharacterOfPosition(node.getEnd()).line;
    const endLine = sourceFile.getLineAndCharacterOfPosition(nextToken.getStart(sourceFile)).line;
    return startLine !== endLine;
}

export function positionIsASICandidate(pos: number, context: ts.Node, sourceFile: ts.SourceFileLike): boolean {
    const contextAncestor = ts.findAncestor(context, ancestor => {
        if (ancestor.end !== pos) {
            return "quit";
        }
        return syntaxMayBeASICandidate(ancestor.kind);
    });

    return !!contextAncestor && nodeIsASICandidate(contextAncestor, sourceFile);
}

export function probablyUsesSemicolons(sourceFile: ts.SourceFile): boolean {
    let withSemicolon = 0;
    let withoutSemicolon = 0;
    const nStatementsToObserve = 5;
    ts.forEachChild(sourceFile, function visit(node): boolean | undefined {
        if (syntaxRequiresTrailingSemicolonOrASI(node.kind)) {
            const lastToken = node.getLastToken(sourceFile);
            if (lastToken?.kind === ts.SyntaxKind.SemicolonToken) {
                withSemicolon++;
            }
            else {
                withoutSemicolon++;
            }
        }
        else if (syntaxRequiresTrailingCommaOrSemicolonOrASI(node.kind)) {
            const lastToken = node.getLastToken(sourceFile);
            if (lastToken?.kind === ts.SyntaxKind.SemicolonToken) {
                withSemicolon++;
            }
            else if (lastToken && lastToken.kind !== ts.SyntaxKind.CommaToken) {
                const lastTokenLine = ts.getLineAndCharacterOfPosition(sourceFile, lastToken.getStart(sourceFile)).line;
                const nextTokenLine = ts.getLineAndCharacterOfPosition(sourceFile, ts.getSpanOfTokenAtPosition(sourceFile, lastToken.end).start).line;
                // Avoid counting missing semicolon in single-line objects:
                // `function f(p: { x: string /*no semicolon here is insignificant*/ }) {`
                if (lastTokenLine !== nextTokenLine) {
                    withoutSemicolon++;
                }
            }
        }

        if (withSemicolon + withoutSemicolon >= nStatementsToObserve) {
            return true;
        }

        return ts.forEachChild(node, visit);
    });

    // One statement missing a semicolon isn't sufficient evidence to say the user
    // doesn’t want semicolons, because they may not even be done writing that statement.
    if (withSemicolon === 0 && withoutSemicolon <= 1) {
        return true;
    }

    // If even 2/5 places have a semicolon, the user probably wants semicolons
    return withSemicolon / withoutSemicolon > 1 / nStatementsToObserve;
}

export function tryGetDirectories(host: Pick<ts.LanguageServiceHost, "getDirectories">, directoryName: string): string[] {
    return tryIOAndConsumeErrors(host, host.getDirectories, directoryName) || [];
}

export function tryReadDirectory(host: Pick<ts.LanguageServiceHost, "readDirectory">, path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[]): readonly string[] {
    return tryIOAndConsumeErrors(host, host.readDirectory, path, extensions, exclude, include) || ts.emptyArray;
}

export function tryFileExists(host: Pick<ts.LanguageServiceHost, "fileExists">, path: string): boolean {
    return tryIOAndConsumeErrors(host, host.fileExists, path);
}

export function tryDirectoryExists(host: ts.LanguageServiceHost, path: string): boolean {
    return tryAndIgnoreErrors(() => ts.directoryProbablyExists(path, host)) || false;
}

export function tryAndIgnoreErrors<T>(cb: () => T): T | undefined {
    try {
        return cb();
    }
    catch {
        return undefined;
    }
}

export function tryIOAndConsumeErrors<T>(host: unknown, toApply: ((...a: any[]) => T) | undefined, ...args: any[]) {
    return tryAndIgnoreErrors(() => toApply && toApply.apply(host, args));
}

export function findPackageJsons(startDirectory: string, host: Pick<ts.LanguageServiceHost, "fileExists">, stopDirectory?: string): string[] {
    const paths: string[] = [];
    ts.forEachAncestorDirectory(startDirectory, ancestor => {
        if (ancestor === stopDirectory) {
            return true;
        }
        const currentConfigPath = ts.combinePaths(ancestor, "package.json");
        if (tryFileExists(host, currentConfigPath)) {
            paths.push(currentConfigPath);
        }
    });
    return paths;
}

export function findPackageJson(directory: string, host: ts.LanguageServiceHost): string | undefined {
    let packageJson: string | undefined;
    ts.forEachAncestorDirectory(directory, ancestor => {
        if (ancestor === "node_modules") return true;
        packageJson = ts.findConfigFile(ancestor, (f) => tryFileExists(host, f), "package.json");
        if (packageJson) {
            return true; // break out
        }
    });
    return packageJson;
}

export function getPackageJsonsVisibleToFile(fileName: string, host: ts.LanguageServiceHost): readonly ts.ProjectPackageJsonInfo[] {
    if (!host.fileExists) {
        return [];
    }

    const packageJsons: ts.ProjectPackageJsonInfo[] = [];
    ts.forEachAncestorDirectory(ts.getDirectoryPath(fileName), ancestor => {
        const packageJsonFileName = ts.combinePaths(ancestor, "package.json");
        if (host.fileExists(packageJsonFileName)) {
            const info = createPackageJsonInfo(packageJsonFileName, host);
            if (info) {
                packageJsons.push(info);
            }
        }
    });

    return packageJsons;
}

export function createPackageJsonInfo(fileName: string, host: { readFile?(fileName: string): string | undefined }): ts.ProjectPackageJsonInfo | undefined {
    if (!host.readFile) {
        return undefined;
    }

    type PackageJsonRaw = Record<typeof dependencyKeys[number], Record<string, string> | undefined>;
    const dependencyKeys = ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"] as const;
    const stringContent = host.readFile(fileName) || "";
    const content = tryParseJson(stringContent) as PackageJsonRaw | undefined;
    const info: Pick<ts.ProjectPackageJsonInfo, typeof dependencyKeys[number]> = {};
    if (content) {
        for (const key of dependencyKeys) {
            const dependencies = content[key];
            if (!dependencies) {
                continue;
            }
            const dependencyMap = new ts.Map<string, string>();
            for (const packageName in dependencies) {
                dependencyMap.set(packageName, dependencies[packageName]);
            }
            info[key] = dependencyMap;
        }
    }

    const dependencyGroups = [
        [ts.PackageJsonDependencyGroup.Dependencies, info.dependencies],
        [ts.PackageJsonDependencyGroup.DevDependencies, info.devDependencies],
        [ts.PackageJsonDependencyGroup.OptionalDependencies, info.optionalDependencies],
        [ts.PackageJsonDependencyGroup.PeerDependencies, info.peerDependencies],
    ] as const;

    return {
        ...info,
        parseable: !!content,
        fileName,
        get,
        has(dependencyName, inGroups) {
            return !!get(dependencyName, inGroups);
        },
    };

    function get(dependencyName: string, inGroups = ts.PackageJsonDependencyGroup.All) {
        for (const [group, deps] of dependencyGroups) {
            if (deps && (inGroups & group)) {
                const dep = deps.get(dependencyName);
                if (dep !== undefined) {
                    return dep;
                }
            }
        }
    }
}

export interface PackageJsonImportFilter {
    allowsImportingAmbientModule: (moduleSymbol: ts.Symbol, moduleSpecifierResolutionHost: ts.ModuleSpecifierResolutionHost) => boolean;
    allowsImportingSourceFile: (sourceFile: ts.SourceFile, moduleSpecifierResolutionHost: ts.ModuleSpecifierResolutionHost) => boolean;
    /**
     * Use for a specific module specifier that has already been resolved.
     * Use `allowsImportingAmbientModule` or `allowsImportingSourceFile` to resolve
     * the best module specifier for a given module _and_ determine if it’s importable.
     */
    allowsImportingSpecifier: (moduleSpecifier: string) => boolean;
}

export function createPackageJsonImportFilter(fromFile: ts.SourceFile, preferences: ts.UserPreferences, host: ts.LanguageServiceHost): PackageJsonImportFilter {
    const packageJsons = (
        (host.getPackageJsonsVisibleToFile && host.getPackageJsonsVisibleToFile(fromFile.fileName)) || getPackageJsonsVisibleToFile(fromFile.fileName, host)
      ).filter(p => p.parseable);

    let usesNodeCoreModules: boolean | undefined;
    return { allowsImportingAmbientModule, allowsImportingSourceFile, allowsImportingSpecifier };

    function moduleSpecifierIsCoveredByPackageJson(specifier: string) {
        const packageName = getNodeModuleRootSpecifier(specifier);
        for (const packageJson of packageJsons) {
            if (packageJson.has(packageName) || packageJson.has(ts.getTypesPackageName(packageName))) {
                return true;
            }
        }
        return false;
    }

    function allowsImportingAmbientModule(moduleSymbol: ts.Symbol, moduleSpecifierResolutionHost: ts.ModuleSpecifierResolutionHost): boolean {
        if (!packageJsons.length || !moduleSymbol.valueDeclaration) {
            return true;
        }

        const declaringSourceFile = moduleSymbol.valueDeclaration.getSourceFile();
        const declaringNodeModuleName = getNodeModulesPackageNameFromFileName(declaringSourceFile.fileName, moduleSpecifierResolutionHost);
        if (typeof declaringNodeModuleName === "undefined") {
            return true;
        }

        const declaredModuleSpecifier = ts.stripQuotes(moduleSymbol.getName());
        if (isAllowedCoreNodeModulesImport(declaredModuleSpecifier)) {
            return true;
        }

        return moduleSpecifierIsCoveredByPackageJson(declaringNodeModuleName)
            || moduleSpecifierIsCoveredByPackageJson(declaredModuleSpecifier);
    }

    function allowsImportingSourceFile(sourceFile: ts.SourceFile, moduleSpecifierResolutionHost: ts.ModuleSpecifierResolutionHost): boolean {
        if (!packageJsons.length) {
            return true;
        }

        const moduleSpecifier = getNodeModulesPackageNameFromFileName(sourceFile.fileName, moduleSpecifierResolutionHost);
        if (!moduleSpecifier) {
            return true;
        }

        return moduleSpecifierIsCoveredByPackageJson(moduleSpecifier);
    }

    function allowsImportingSpecifier(moduleSpecifier: string) {
        if (!packageJsons.length || isAllowedCoreNodeModulesImport(moduleSpecifier)) {
            return true;
        }
        if (ts.pathIsRelative(moduleSpecifier) || ts.isRootedDiskPath(moduleSpecifier)) {
            return true;
        }
        return moduleSpecifierIsCoveredByPackageJson(moduleSpecifier);
    }

    function isAllowedCoreNodeModulesImport(moduleSpecifier: string) {
        // If we’re in JavaScript, it can be difficult to tell whether the user wants to import
        // from Node core modules or not. We can start by seeing if the user is actually using
        // any node core modules, as opposed to simply having @types/node accidentally as a
        // dependency of a dependency.
        if (ts.isSourceFileJS(fromFile) && ts.JsTyping.nodeCoreModules.has(moduleSpecifier)) {
            if (usesNodeCoreModules === undefined) {
                usesNodeCoreModules = consumesNodeCoreModules(fromFile);
            }
            if (usesNodeCoreModules) {
                return true;
            }
        }
        return false;
    }

    function getNodeModulesPackageNameFromFileName(importedFileName: string, moduleSpecifierResolutionHost: ts.ModuleSpecifierResolutionHost): string | undefined {
        if (!ts.stringContains(importedFileName, "node_modules")) {
            return undefined;
        }
        const specifier = ts.moduleSpecifiers.getNodeModulesPackageName(
            host.getCompilationSettings(),
            fromFile,
            importedFileName,
            moduleSpecifierResolutionHost,
            preferences,
        );

        if (!specifier) {
            return undefined;
        }
        // Paths here are not node_modules, so we don’t care about them;
        // returning anything will trigger a lookup in package.json.
        if (!ts.pathIsRelative(specifier) && !ts.isRootedDiskPath(specifier)) {
            return getNodeModuleRootSpecifier(specifier);
        }
    }

    function getNodeModuleRootSpecifier(fullSpecifier: string): string {
        const components = ts.getPathComponents(ts.getPackageNameFromTypesPackageName(fullSpecifier)).slice(1);
        // Scoped packages
        if (ts.startsWith(components[0], "@")) {
            return `${components[0]}/${components[1]}`;
        }
        return components[0];
    }
}

function tryParseJson(text: string) {
    try {
        return JSON.parse(text);
    }
    catch {
        return undefined;
    }
}

export function consumesNodeCoreModules(sourceFile: ts.SourceFile): boolean {
    return ts.some(sourceFile.imports, ({ text }) => ts.JsTyping.nodeCoreModules.has(text));
}

export function isInsideNodeModules(fileOrDirectory: string): boolean {
    return ts.contains(ts.getPathComponents(fileOrDirectory), "node_modules");
}

export function isDiagnosticWithLocation(diagnostic: ts.Diagnostic): diagnostic is ts.DiagnosticWithLocation {
    return diagnostic.file !== undefined && diagnostic.start !== undefined && diagnostic.length !== undefined;
}

export function findDiagnosticForNode(node: ts.Node, sortedFileDiagnostics: readonly ts.Diagnostic[]): ts.DiagnosticWithLocation | undefined {
    const span: Partial<ts.TextSpan> = createTextSpanFromNode(node);
    const index = ts.binarySearchKey(sortedFileDiagnostics, span, ts.identity, ts.compareTextSpans);
    if (index >= 0) {
        const diagnostic = sortedFileDiagnostics[index];
        ts.Debug.assertEqual(diagnostic.file, node.getSourceFile(), "Diagnostics proided to 'findDiagnosticForNode' must be from a single SourceFile");
        return ts.cast(diagnostic, isDiagnosticWithLocation);
    }
}

export function getDiagnosticsWithinSpan(span: ts.TextSpan, sortedFileDiagnostics: readonly ts.Diagnostic[]): readonly ts.DiagnosticWithLocation[] {
    let index = ts.binarySearchKey(sortedFileDiagnostics, span.start, diag => diag.start, ts.compareValues);
    if (index < 0) {
        index = ~index;
    }
    while (sortedFileDiagnostics[index - 1]?.start === span.start) {
        index--;
    }

    const result: ts.DiagnosticWithLocation[] = [];
    const end = ts.textSpanEnd(span);
    while (true) {
        const diagnostic = ts.tryCast(sortedFileDiagnostics[index], isDiagnosticWithLocation);
        if (!diagnostic || diagnostic.start > end) {
            break;
        }
        if (ts.textSpanContainsTextSpan(span, diagnostic)) {
            result.push(diagnostic);
        }
        index++;
    }

    return result;
}

/* @internal */
export function getRefactorContextSpan({ startPosition, endPosition }: ts.RefactorContext): ts.TextSpan {
    return ts.createTextSpanFromBounds(startPosition, endPosition === undefined ? startPosition : endPosition);
}

/* @internal */
export function getFixableErrorSpanExpression(sourceFile: ts.SourceFile, span: ts.TextSpan): ts.Expression | undefined {
    const token = getTokenAtPosition(sourceFile, span.start);
    // Checker has already done work to determine that await might be possible, and has attached
    // related info to the node, so start by finding the expression that exactly matches up
    // with the diagnostic range.
    const expression = ts.findAncestor(token, node => {
        if (node.getStart(sourceFile) < span.start || node.getEnd() > ts.textSpanEnd(span)) {
            return "quit";
        }
        return ts.isExpression(node) && textSpansEqual(span, createTextSpanFromNode(node, sourceFile));
    }) as ts.Expression | undefined;

    return expression;
}

/**
 * If the provided value is an array, the mapping function is applied to each element; otherwise, the mapping function is applied
 * to the provided value itself.
 */
export function mapOneOrMany<T, U>(valueOrArray: T | readonly T[], f: (x: T, i: number) => U): U | U[];
export function mapOneOrMany<T, U>(valueOrArray: T | readonly T[] | undefined, f: (x: T, i: number) => U): U | U[] | undefined;
export function mapOneOrMany<T, U>(valueOrArray: T | readonly T[], f: (x: T, i: number) => U, resultSelector: (x: U[]) => U): U;
export function mapOneOrMany<T, U>(valueOrArray: T | readonly T[] | undefined, f: (x: T, i: number) => U, resultSelector: (x: U[]) => U): U | undefined;
export function mapOneOrMany<T, U>(valueOrArray: T | readonly T[] | undefined, f: (x: T, i: number) => U, resultSelector: (x: U[]) => U | U[] = ts.identity): U | U[] | undefined {
    return valueOrArray ? ts.isArray(valueOrArray) ? resultSelector(ts.map(valueOrArray, f)) : f(valueOrArray, 0) : undefined;
}

/**
 * If the provided value is an array, the first element of the array is returned; otherwise, the provided value is returned instead.
 */
export function firstOrOnly<T>(valueOrArray: T | readonly T[]): T {
    return ts.isArray(valueOrArray) ? ts.first(valueOrArray) : valueOrArray;
}

export function getNamesForExportedSymbol(symbol: ts.Symbol, scriptTarget: ts.ScriptTarget | undefined): string | [lowercase: string, capitalized: string] {
    if (needsNameFromDeclaration(symbol)) {
        const fromDeclaration = getDefaultLikeExportNameFromDeclaration(symbol);
        if (fromDeclaration) return fromDeclaration;
        const fileNameCase = ts.codefix.moduleSymbolToValidIdentifier(getSymbolParentOrFail(symbol), scriptTarget, /*preferCapitalized*/ false);
        const capitalized = ts.codefix.moduleSymbolToValidIdentifier(getSymbolParentOrFail(symbol), scriptTarget, /*preferCapitalized*/ true);
        if (fileNameCase === capitalized) return fileNameCase;
        return [fileNameCase, capitalized];
    }
    return symbol.name;
}

export function getNameForExportedSymbol(symbol: ts.Symbol, scriptTarget: ts.ScriptTarget | undefined, preferCapitalized?: boolean) {
    if (needsNameFromDeclaration(symbol)) {
        // Name of "export default foo;" is "foo". Name of "export default 0" is the filename converted to camelCase.
        return getDefaultLikeExportNameFromDeclaration(symbol)
            || ts.codefix.moduleSymbolToValidIdentifier(getSymbolParentOrFail(symbol), scriptTarget, !!preferCapitalized);
    }
    return symbol.name;

}

function needsNameFromDeclaration(symbol: ts.Symbol) {
    return !(symbol.flags & ts.SymbolFlags.Transient) && (symbol.escapedName === ts.InternalSymbolName.ExportEquals || symbol.escapedName === ts.InternalSymbolName.Default);
}

function getDefaultLikeExportNameFromDeclaration(symbol: ts.Symbol) {
    return ts.firstDefined(symbol.declarations, d => ts.isExportAssignment(d) ? ts.tryCast(ts.skipOuterExpressions(d.expression), ts.isIdentifier)?.text : undefined);
}

function getSymbolParentOrFail(symbol: ts.Symbol) {
    return ts.Debug.checkDefined(
        symbol.parent,
        `Symbol parent was undefined. Flags: ${ts.Debug.formatSymbolFlags(symbol.flags)}. ` +
        `Declarations: ${symbol.declarations?.map(d => {
            const kind = ts.Debug.formatSyntaxKind(d.kind);
            const inJS = ts.isInJSFile(d);
            const { expression } = d as any;
            return (inJS ? "[JS]" : "") + kind + (expression ? ` (expression: ${ts.Debug.formatSyntaxKind(expression.kind)})` : "");
        }).join(", ")}.`);
}

/**
 * Useful to check whether a string contains another string at a specific index
 * without allocating another string or traversing the entire contents of the outer string.
 *
 * This function is useful in place of either of the following:
 *
 * ```ts
 * // Allocates
 * haystack.substr(startIndex, needle.length) === needle
 *
 * // Full traversal
 * haystack.indexOf(needle, startIndex) === startIndex
 * ```
 *
 * @param haystack The string that potentially contains `needle`.
 * @param needle The string whose content might sit within `haystack`.
 * @param startIndex The index within `haystack` to start searching for `needle`.
 */
export function stringContainsAt(haystack: string, needle: string, startIndex: number) {
    const needleLength = needle.length;
    if (needleLength + startIndex > haystack.length) {
        return false;
    }
    for (let i = 0; i < needleLength; i++) {
        if (needle.charCodeAt(i) !== haystack.charCodeAt(i + startIndex)) return false;
    }
    return true;
}

export function startsWithUnderscore(name: string): boolean {
    return name.charCodeAt(0) === ts.CharacterCodes._;
}

export function isGlobalDeclaration(declaration: ts.Declaration) {
    return !isNonGlobalDeclaration(declaration);
}

export function isNonGlobalDeclaration(declaration: ts.Declaration) {
    const sourceFile = declaration.getSourceFile();
    // If the file is not a module, the declaration is global
    if (!sourceFile.externalModuleIndicator && !sourceFile.commonJsModuleIndicator) {
        return false;
    }
    // If the file is a module written in TypeScript, it still might be in a `declare global` augmentation
    return ts.isInJSFile(declaration) || !ts.findAncestor(declaration, ts.isGlobalScopeAugmentation);
}

export function isDeprecatedDeclaration(decl: ts.Declaration) {
    return !!(ts.getCombinedNodeFlagsAlwaysIncludeJSDoc(decl) & ts.ModifierFlags.Deprecated);
}

export function shouldUseUriStyleNodeCoreModules(file: ts.SourceFile, program: ts.Program): boolean {
    const decisionFromFile = ts.firstDefined(file.imports, node => {
        if (ts.JsTyping.nodeCoreModules.has(node.text)) {
            return ts.startsWith(node.text, "node:");
        }
    });
    return decisionFromFile ?? program.usesUriStyleNodeCoreModules;
}

export function getNewLineKind(newLineCharacter: string): ts.NewLineKind {
    return newLineCharacter === "\n" ? ts.NewLineKind.LineFeed : ts.NewLineKind.CarriageReturnLineFeed;
}

export type DiagnosticAndArguments = ts.DiagnosticMessage | [ts.DiagnosticMessage, string] | [ts.DiagnosticMessage, string, string];
export function diagnosticToString(diag: DiagnosticAndArguments): string {
    return ts.isArray(diag)
        ? ts.formatStringFromArgs(ts.getLocaleSpecificMessage(diag[0]), diag.slice(1) as readonly string[])
        : ts.getLocaleSpecificMessage(diag);
}

/**
 * Get format code settings for a code writing context (e.g. when formatting text changes or completions code).
 */
export function getFormatCodeSettingsForWriting({ options }: ts.formatting.FormatContext, sourceFile: ts.SourceFile): ts.FormatCodeSettings {
    const shouldAutoDetectSemicolonPreference = !options.semicolons || options.semicolons === ts.SemicolonPreference.Ignore;
    const shouldRemoveSemicolons = options.semicolons === ts.SemicolonPreference.Remove || shouldAutoDetectSemicolonPreference && !probablyUsesSemicolons(sourceFile);
    return {
        ...options,
        semicolons: shouldRemoveSemicolons ? ts.SemicolonPreference.Remove : ts.SemicolonPreference.Ignore,
    };
}

export function jsxModeNeedsExplicitImport(jsx: ts.JsxEmit | undefined) {
    return jsx === ts.JsxEmit.React || jsx === ts.JsxEmit.ReactNative;
}

export function isSourceFileFromLibrary(program: ts.Program, node: ts.SourceFile) {
    return program.isSourceFileFromExternalLibrary(node) || program.isSourceFileDefaultLibrary(node);
}

// #endregion
}
