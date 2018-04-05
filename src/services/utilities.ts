/* @internal */ // Don't expose that we use this
// Based on lib.es6.d.ts
interface PromiseConstructor {
    new <T>(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;
    reject(reason: any): Promise<never>;
    all<T>(values: (T | PromiseLike<T>)[]): Promise<T[]>;
}
/* @internal */
declare var Promise: PromiseConstructor;

// These utilities are common to multiple language service features.
/* @internal */
namespace ts {
    export const scanner: Scanner = createScanner(ScriptTarget.Latest, /*skipTrivia*/ true);

    export const enum SemanticMeaning {
        None = 0x0,
        Value = 0x1,
        Type = 0x2,
        Namespace = 0x4,
        All = Value | Type | Namespace
    }

    export function getMeaningFromDeclaration(node: Node): SemanticMeaning {
        switch (node.kind) {
            case SyntaxKind.Parameter:
            case SyntaxKind.VariableDeclaration:
            case SyntaxKind.BindingElement:
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.PropertySignature:
            case SyntaxKind.PropertyAssignment:
            case SyntaxKind.ShorthandPropertyAssignment:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.MethodSignature:
            case SyntaxKind.Constructor:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction:
            case SyntaxKind.CatchClause:
            case SyntaxKind.JsxAttribute:
                return SemanticMeaning.Value;

            case SyntaxKind.TypeParameter:
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.TypeAliasDeclaration:
            case SyntaxKind.TypeLiteral:
                return SemanticMeaning.Type;

            case SyntaxKind.JSDocTypedefTag:
                // If it has no name node, it shares the name with the value declaration below it.
                return (node as JSDocTypedefTag).name === undefined ? SemanticMeaning.Value | SemanticMeaning.Type : SemanticMeaning.Type;

            case SyntaxKind.EnumMember:
            case SyntaxKind.ClassDeclaration:
                return SemanticMeaning.Value | SemanticMeaning.Type;

            case SyntaxKind.ModuleDeclaration:
                if (isAmbientModule(<ModuleDeclaration>node)) {
                    return SemanticMeaning.Namespace | SemanticMeaning.Value;
                }
                else if (getModuleInstanceState(node as ModuleDeclaration) === ModuleInstanceState.Instantiated) {
                    return SemanticMeaning.Namespace | SemanticMeaning.Value;
                }
                else {
                    return SemanticMeaning.Namespace;
                }

            case SyntaxKind.EnumDeclaration:
            case SyntaxKind.NamedImports:
            case SyntaxKind.ImportSpecifier:
            case SyntaxKind.ImportEqualsDeclaration:
            case SyntaxKind.ImportDeclaration:
            case SyntaxKind.ExportAssignment:
            case SyntaxKind.ExportDeclaration:
                return SemanticMeaning.All;

            // An external module can be a Value
            case SyntaxKind.SourceFile:
                return SemanticMeaning.Namespace | SemanticMeaning.Value;
        }

        return SemanticMeaning.All;
    }

    export function getMeaningFromLocation(node: Node): SemanticMeaning {
        if (node.kind === SyntaxKind.SourceFile) {
            return SemanticMeaning.Value;
        }
        else if (node.parent.kind === SyntaxKind.ExportAssignment) {
            return SemanticMeaning.All;
        }
        else if (isInRightSideOfInternalImportEqualsDeclaration(node)) {
            return getMeaningFromRightHandSideOfImportEquals(node as Identifier);
        }
        else if (isDeclarationName(node)) {
            return getMeaningFromDeclaration(node.parent);
        }
        else if (isTypeReference(node)) {
            return SemanticMeaning.Type;
        }
        else if (isNamespaceReference(node)) {
            return SemanticMeaning.Namespace;
        }
        else if (isTypeParameterDeclaration(node.parent)) {
            Debug.assert(isJSDocTemplateTag(node.parent.parent)); // Else would be handled by isDeclarationName
            return SemanticMeaning.Type;
        }
        else {
            return SemanticMeaning.Value;
        }
    }

    function getMeaningFromRightHandSideOfImportEquals(node: Node): SemanticMeaning {
        //     import a = |b|; // Namespace
        //     import a = |b.c|; // Value, type, namespace
        //     import a = |b.c|.d; // Namespace
        const name = node.kind === SyntaxKind.QualifiedName ? node : isQualifiedName(node.parent) && node.parent.right === node ? node.parent : undefined;
        return name && name.parent.kind === SyntaxKind.ImportEqualsDeclaration ? SemanticMeaning.All : SemanticMeaning.Namespace;
    }

    export function isInRightSideOfInternalImportEqualsDeclaration(node: Node) {
        while (node.parent.kind === SyntaxKind.QualifiedName) {
            node = node.parent;
        }
        return isInternalModuleImportEqualsDeclaration(node.parent) && node.parent.moduleReference === node;
    }

    function isNamespaceReference(node: Node): boolean {
        return isQualifiedNameNamespaceReference(node) || isPropertyAccessNamespaceReference(node);
    }

    function isQualifiedNameNamespaceReference(node: Node): boolean {
        let root = node;
        let isLastClause = true;
        if (root.parent.kind === SyntaxKind.QualifiedName) {
            while (root.parent && root.parent.kind === SyntaxKind.QualifiedName) {
                root = root.parent;
            }

            isLastClause = (<QualifiedName>root).right === node;
        }

        return root.parent.kind === SyntaxKind.TypeReference && !isLastClause;
    }

    function isPropertyAccessNamespaceReference(node: Node): boolean {
        let root = node;
        let isLastClause = true;
        if (root.parent.kind === SyntaxKind.PropertyAccessExpression) {
            while (root.parent && root.parent.kind === SyntaxKind.PropertyAccessExpression) {
                root = root.parent;
            }

            isLastClause = (<PropertyAccessExpression>root).name === node;
        }

        if (!isLastClause && root.parent.kind === SyntaxKind.ExpressionWithTypeArguments && root.parent.parent.kind === SyntaxKind.HeritageClause) {
            const decl = root.parent.parent.parent;
            return (decl.kind === SyntaxKind.ClassDeclaration && (<HeritageClause>root.parent.parent).token === SyntaxKind.ImplementsKeyword) ||
                (decl.kind === SyntaxKind.InterfaceDeclaration && (<HeritageClause>root.parent.parent).token === SyntaxKind.ExtendsKeyword);
        }

        return false;
    }

    function isTypeReference(node: Node): boolean {
        if (isRightSideOfQualifiedNameOrPropertyAccess(node)) {
            node = node.parent;
        }

        switch (node.kind) {
            case SyntaxKind.ThisKeyword:
                return !isExpressionNode(node);
            case SyntaxKind.ThisType:
                return true;
        }

        switch (node.parent.kind) {
            case SyntaxKind.TypeReference:
                return true;
            case SyntaxKind.ExpressionWithTypeArguments:
                return !isExpressionWithTypeArgumentsInClassExtendsClause(<ExpressionWithTypeArguments>node.parent);
        }

        return false;
    }

    export function isCallExpressionTarget(node: Node): boolean {
        return isCallOrNewExpressionTarget(node, SyntaxKind.CallExpression);
    }

    export function isNewExpressionTarget(node: Node): boolean {
        return isCallOrNewExpressionTarget(node, SyntaxKind.NewExpression);
    }

    function isCallOrNewExpressionTarget(node: Node, kind: SyntaxKind) {
        const target = climbPastPropertyAccess(node);
        return target && target.parent && target.parent.kind === kind && (<CallExpression>target.parent).expression === target;
    }

    export function climbPastPropertyAccess(node: Node) {
        return isRightSideOfPropertyAccess(node) ? node.parent : node;
    }

    export function getTargetLabel(referenceNode: Node, labelName: string): Identifier {
        while (referenceNode) {
            if (referenceNode.kind === SyntaxKind.LabeledStatement && (<LabeledStatement>referenceNode).label.escapedText === labelName) {
                return (<LabeledStatement>referenceNode).label;
            }
            referenceNode = referenceNode.parent;
        }
        return undefined;
    }

    export function isJumpStatementTarget(node: Node): node is Identifier & { parent: BreakOrContinueStatement } {
        return node.kind === SyntaxKind.Identifier && isBreakOrContinueStatement(node.parent) && node.parent.label === node;
     }

    export function isLabelOfLabeledStatement(node: Node): node is Identifier {
        return node.kind === SyntaxKind.Identifier && isLabeledStatement(node.parent) && node.parent.label === node;
    }

    export function isLabelName(node: Node): boolean {
        return isLabelOfLabeledStatement(node) || isJumpStatementTarget(node);
    }

    export function isRightSideOfQualifiedName(node: Node) {
        return node.parent.kind === SyntaxKind.QualifiedName && (<QualifiedName>node.parent).right === node;
    }

    export function isRightSideOfPropertyAccess(node: Node) {
        return node && node.parent && node.parent.kind === SyntaxKind.PropertyAccessExpression && (<PropertyAccessExpression>node.parent).name === node;
    }

    export function isNameOfModuleDeclaration(node: Node) {
        return node.parent.kind === SyntaxKind.ModuleDeclaration && (<ModuleDeclaration>node.parent).name === node;
    }

    export function isNameOfFunctionDeclaration(node: Node): boolean {
        return node.kind === SyntaxKind.Identifier &&
            isFunctionLike(node.parent) && (<FunctionLikeDeclaration>node.parent).name === node;
    }

    export function isLiteralNameOfPropertyDeclarationOrIndexAccess(node: StringLiteral | NumericLiteral): boolean {
        switch (node.parent.kind) {
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.PropertySignature:
            case SyntaxKind.PropertyAssignment:
            case SyntaxKind.EnumMember:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.MethodSignature:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.ModuleDeclaration:
                return getNameOfDeclaration(<Declaration>node.parent) === node;
            case SyntaxKind.ElementAccessExpression:
                return (<ElementAccessExpression>node.parent).argumentExpression === node;
            case SyntaxKind.ComputedPropertyName:
                return true;
            case SyntaxKind.LiteralType:
                return node.parent.parent.kind === SyntaxKind.IndexedAccessType;
        }
    }

    export function isExpressionOfExternalModuleImportEqualsDeclaration(node: Node) {
        return isExternalModuleImportEqualsDeclaration(node.parent.parent) &&
            getExternalModuleImportEqualsDeclarationExpression(node.parent.parent) === node;
    }

    export function getContainerNode(node: Node): Declaration {
        if (node.kind === SyntaxKind.JSDocTypedefTag) {
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
                case SyntaxKind.SourceFile:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.ModuleDeclaration:
                    return <Declaration>node;
            }
        }
    }

    export function getNodeKind(node: Node): ScriptElementKind {
        switch (node.kind) {
            case SyntaxKind.SourceFile:
                return isExternalModule(<SourceFile>node) ? ScriptElementKind.moduleElement : ScriptElementKind.scriptElement;
            case SyntaxKind.ModuleDeclaration:
                return ScriptElementKind.moduleElement;
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.ClassExpression:
                return ScriptElementKind.classElement;
            case SyntaxKind.InterfaceDeclaration: return ScriptElementKind.interfaceElement;
            case SyntaxKind.TypeAliasDeclaration: return ScriptElementKind.typeElement;
            case SyntaxKind.EnumDeclaration: return ScriptElementKind.enumElement;
            case SyntaxKind.VariableDeclaration:
                return getKindOfVariableDeclaration(<VariableDeclaration>node);
            case SyntaxKind.BindingElement:
                return getKindOfVariableDeclaration(<VariableDeclaration>getRootDeclaration(node));
            case SyntaxKind.ArrowFunction:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
                return ScriptElementKind.functionElement;
            case SyntaxKind.GetAccessor: return ScriptElementKind.memberGetAccessorElement;
            case SyntaxKind.SetAccessor: return ScriptElementKind.memberSetAccessorElement;
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.MethodSignature:
                return ScriptElementKind.memberFunctionElement;
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.PropertySignature:
                return ScriptElementKind.memberVariableElement;
            case SyntaxKind.IndexSignature: return ScriptElementKind.indexSignatureElement;
            case SyntaxKind.ConstructSignature: return ScriptElementKind.constructSignatureElement;
            case SyntaxKind.CallSignature: return ScriptElementKind.callSignatureElement;
            case SyntaxKind.Constructor: return ScriptElementKind.constructorImplementationElement;
            case SyntaxKind.TypeParameter: return ScriptElementKind.typeParameterElement;
            case SyntaxKind.EnumMember: return ScriptElementKind.enumMemberElement;
            case SyntaxKind.Parameter: return hasModifier(node, ModifierFlags.ParameterPropertyModifier) ? ScriptElementKind.memberVariableElement : ScriptElementKind.parameterElement;
            case SyntaxKind.ImportEqualsDeclaration:
            case SyntaxKind.ImportSpecifier:
            case SyntaxKind.ImportClause:
            case SyntaxKind.ExportSpecifier:
            case SyntaxKind.NamespaceImport:
                return ScriptElementKind.alias;
            case SyntaxKind.JSDocTypedefTag:
                return ScriptElementKind.typeElement;
            case SyntaxKind.BinaryExpression:
                const kind = getSpecialPropertyAssignmentKind(node as BinaryExpression);
                const { right } = node as BinaryExpression;
                switch (kind) {
                    case SpecialPropertyAssignmentKind.None:
                        return ScriptElementKind.unknown;
                    case SpecialPropertyAssignmentKind.ExportsProperty:
                    case SpecialPropertyAssignmentKind.ModuleExports:
                        const rightKind = getNodeKind(right);
                        return rightKind === ScriptElementKind.unknown ? ScriptElementKind.constElement : rightKind;
                    case SpecialPropertyAssignmentKind.PrototypeProperty:
                        return isFunctionExpression(right) ? ScriptElementKind.memberFunctionElement : ScriptElementKind.memberVariableElement;
                    case SpecialPropertyAssignmentKind.ThisProperty:
                        return ScriptElementKind.memberVariableElement; // property
                    case SpecialPropertyAssignmentKind.Property:
                        // static method / property
                        return isFunctionExpression(right) ? ScriptElementKind.memberFunctionElement : ScriptElementKind.memberVariableElement;
                    case SpecialPropertyAssignmentKind.Prototype:
                        return ScriptElementKind.localClassElement;
                    default: {
                        assertTypeIsNever(kind);
                        return ScriptElementKind.unknown;
                    }
                }
            default:
                return ScriptElementKind.unknown;
        }

        function getKindOfVariableDeclaration(v: VariableDeclaration): ScriptElementKind {
            return isConst(v)
                ? ScriptElementKind.constElement
                : isLet(v)
                    ? ScriptElementKind.letElement
                    : ScriptElementKind.variableElement;
        }
    }

    export function isThis(node: Node): boolean {
        switch (node.kind) {
            case SyntaxKind.ThisKeyword:
            // case SyntaxKind.ThisType: TODO: GH#9267
                return true;
            case SyntaxKind.Identifier:
                // 'this' as a parameter
                return identifierIsThisKeyword(node as Identifier) && node.parent.kind === SyntaxKind.Parameter;
            default:
                return false;
        }
    }

    // Matches the beginning of a triple slash directive
    const tripleSlashDirectivePrefixRegex = /^\/\/\/\s*</;

    export interface ListItemInfo {
        listItemIndex: number;
        list: Node;
    }

    export function getLineStartPositionForPosition(position: number, sourceFile: SourceFileLike): number {
        const lineStarts = getLineStarts(sourceFile);
        const line = sourceFile.getLineAndCharacterOfPosition(position).line;
        return lineStarts[line];
    }

    export function rangeContainsRange(r1: TextRange, r2: TextRange): boolean {
        return startEndContainsRange(r1.pos, r1.end, r2);
    }

    export function startEndContainsRange(start: number, end: number, range: TextRange): boolean {
        return start <= range.pos && end >= range.end;
    }

    export function rangeContainsStartEnd(range: TextRange, start: number, end: number): boolean {
        return range.pos <= start && range.end >= end;
    }

    export function rangeOverlapsWithStartEnd(r1: TextRange, start: number, end: number) {
        return startEndOverlapsWithStartEnd(r1.pos, r1.end, start, end);
    }

    export function startEndOverlapsWithStartEnd(start1: number, end1: number, start2: number, end2: number) {
        const start = Math.max(start1, start2);
        const end = Math.min(end1, end2);
        return start < end;
    }

    /**
     * Assumes `candidate.start <= position` holds.
     */
    export function positionBelongsToNode(candidate: Node, position: number, sourceFile: SourceFile): boolean {
        Debug.assert(candidate.pos <= position);
        return position < candidate.end || !isCompletedNode(candidate, sourceFile);
    }

    function isCompletedNode(n: Node, sourceFile: SourceFile): boolean {
        if (nodeIsMissing(n)) {
            return false;
        }

        switch (n.kind) {
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.EnumDeclaration:
            case SyntaxKind.ObjectLiteralExpression:
            case SyntaxKind.ObjectBindingPattern:
            case SyntaxKind.TypeLiteral:
            case SyntaxKind.Block:
            case SyntaxKind.ModuleBlock:
            case SyntaxKind.CaseBlock:
            case SyntaxKind.NamedImports:
            case SyntaxKind.NamedExports:
                return nodeEndsWith(n, SyntaxKind.CloseBraceToken, sourceFile);
            case SyntaxKind.CatchClause:
                return isCompletedNode((<CatchClause>n).block, sourceFile);
            case SyntaxKind.NewExpression:
                if (!(<NewExpression>n).arguments) {
                    return true;
                }
            // falls through
            case SyntaxKind.CallExpression:
            case SyntaxKind.ParenthesizedExpression:
            case SyntaxKind.ParenthesizedType:
                return nodeEndsWith(n, SyntaxKind.CloseParenToken, sourceFile);

            case SyntaxKind.FunctionType:
            case SyntaxKind.ConstructorType:
                return isCompletedNode((<SignatureDeclaration>n).type, sourceFile);

            case SyntaxKind.Constructor:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.MethodSignature:
            case SyntaxKind.ConstructSignature:
            case SyntaxKind.CallSignature:
            case SyntaxKind.ArrowFunction:
                if ((<FunctionLikeDeclaration>n).body) {
                    return isCompletedNode((<FunctionLikeDeclaration>n).body, sourceFile);
                }

                if ((<FunctionLikeDeclaration>n).type) {
                    return isCompletedNode((<FunctionLikeDeclaration>n).type, sourceFile);
                }

                // Even though type parameters can be unclosed, we can get away with
                // having at least a closing paren.
                return hasChildOfKind(n, SyntaxKind.CloseParenToken, sourceFile);

            case SyntaxKind.ModuleDeclaration:
                return (<ModuleDeclaration>n).body && isCompletedNode((<ModuleDeclaration>n).body, sourceFile);

            case SyntaxKind.IfStatement:
                if ((<IfStatement>n).elseStatement) {
                    return isCompletedNode((<IfStatement>n).elseStatement, sourceFile);
                }
                return isCompletedNode((<IfStatement>n).thenStatement, sourceFile);

            case SyntaxKind.ExpressionStatement:
                return isCompletedNode((<ExpressionStatement>n).expression, sourceFile) ||
                    hasChildOfKind(n, SyntaxKind.SemicolonToken, sourceFile);

            case SyntaxKind.ArrayLiteralExpression:
            case SyntaxKind.ArrayBindingPattern:
            case SyntaxKind.ElementAccessExpression:
            case SyntaxKind.ComputedPropertyName:
            case SyntaxKind.TupleType:
                return nodeEndsWith(n, SyntaxKind.CloseBracketToken, sourceFile);

            case SyntaxKind.IndexSignature:
                if ((<IndexSignatureDeclaration>n).type) {
                    return isCompletedNode((<IndexSignatureDeclaration>n).type, sourceFile);
                }

                return hasChildOfKind(n, SyntaxKind.CloseBracketToken, sourceFile);

            case SyntaxKind.CaseClause:
            case SyntaxKind.DefaultClause:
                // there is no such thing as terminator token for CaseClause/DefaultClause so for simplicity always consider them non-completed
                return false;

            case SyntaxKind.ForStatement:
            case SyntaxKind.ForInStatement:
            case SyntaxKind.ForOfStatement:
            case SyntaxKind.WhileStatement:
                return isCompletedNode((<IterationStatement>n).statement, sourceFile);
            case SyntaxKind.DoStatement:
                // rough approximation: if DoStatement has While keyword - then if node is completed is checking the presence of ')';
                return hasChildOfKind(n, SyntaxKind.WhileKeyword, sourceFile)
                    ? nodeEndsWith(n, SyntaxKind.CloseParenToken, sourceFile)
                    : isCompletedNode((<DoStatement>n).statement, sourceFile);

            case SyntaxKind.TypeQuery:
                return isCompletedNode((<TypeQueryNode>n).exprName, sourceFile);

            case SyntaxKind.TypeOfExpression:
            case SyntaxKind.DeleteExpression:
            case SyntaxKind.VoidExpression:
            case SyntaxKind.YieldExpression:
            case SyntaxKind.SpreadElement:
                const unaryWordExpression = n as (TypeOfExpression | DeleteExpression | VoidExpression | YieldExpression | SpreadElement);
                return isCompletedNode(unaryWordExpression.expression, sourceFile);

            case SyntaxKind.TaggedTemplateExpression:
                return isCompletedNode((<TaggedTemplateExpression>n).template, sourceFile);
            case SyntaxKind.TemplateExpression:
                const lastSpan = lastOrUndefined((<TemplateExpression>n).templateSpans);
                return isCompletedNode(lastSpan, sourceFile);
            case SyntaxKind.TemplateSpan:
                return nodeIsPresent((<TemplateSpan>n).literal);

            case SyntaxKind.ExportDeclaration:
            case SyntaxKind.ImportDeclaration:
                return nodeIsPresent((<ExportDeclaration | ImportDeclaration>n).moduleSpecifier);

            case SyntaxKind.PrefixUnaryExpression:
                return isCompletedNode((<PrefixUnaryExpression>n).operand, sourceFile);
            case SyntaxKind.BinaryExpression:
                return isCompletedNode((<BinaryExpression>n).right, sourceFile);
            case SyntaxKind.ConditionalExpression:
                return isCompletedNode((<ConditionalExpression>n).whenFalse, sourceFile);

            default:
                return true;
        }
    }

    /*
     * Checks if node ends with 'expectedLastToken'.
     * If child at position 'length - 1' is 'SemicolonToken' it is skipped and 'expectedLastToken' is compared with child at position 'length - 2'.
     */
    function nodeEndsWith(n: Node, expectedLastToken: SyntaxKind, sourceFile: SourceFile): boolean {
        const children = n.getChildren(sourceFile);
        if (children.length) {
            const last = lastOrUndefined(children);
            if (last.kind === expectedLastToken) {
                return true;
            }
            else if (last.kind === SyntaxKind.SemicolonToken && children.length !== 1) {
                return children[children.length - 2].kind === expectedLastToken;
            }
        }
        return false;
    }

    export function findListItemInfo(node: Node): ListItemInfo {
        const list = findContainingList(node);

        // It is possible at this point for syntaxList to be undefined, either if
        // node.parent had no list child, or if none of its list children contained
        // the span of node. If this happens, return undefined. The caller should
        // handle this case.
        if (!list) {
            return undefined;
        }

        const children = list.getChildren();
        const listItemIndex = indexOfNode(children, node);

        return {
            listItemIndex,
            list
        };
    }

    export function hasChildOfKind(n: Node, kind: SyntaxKind, sourceFile: SourceFile): boolean {
        return !!findChildOfKind(n, kind, sourceFile);
    }

    export function findChildOfKind<T extends Node>(n: Node, kind: T["kind"], sourceFile: SourceFileLike): T | undefined {
        return find(n.getChildren(sourceFile), (c): c is T => c.kind === kind);
    }

    export function findContainingList(node: Node): SyntaxList | undefined {
        // The node might be a list element (nonsynthetic) or a comma (synthetic). Either way, it will
        // be parented by the container of the SyntaxList, not the SyntaxList itself.
        // In order to find the list item index, we first need to locate SyntaxList itself and then search
        // for the position of the relevant node (or comma).
        const syntaxList = find(node.parent.getChildren(), (c): c is SyntaxList => isSyntaxList(c) && rangeContainsRange(c, node));
        // Either we didn't find an appropriate list, or the list must contain us.
        Debug.assert(!syntaxList || contains(syntaxList.getChildren(), node));
        return syntaxList;
    }

    /* Gets the token whose text has range [start, end) and
     * position >= start and (position < end or (position === end && token is keyword or identifier))
     */
    export function getTouchingWord(sourceFile: SourceFile, position: number, includeJsDocComment: boolean): Node {
        return getTouchingToken(sourceFile, position, includeJsDocComment, n => isWord(n.kind));
    }

    /* Gets the token whose text has range [start, end) and position >= start
     * and (position < end or (position === end && token is keyword or identifier or numeric/string literal))
     */
    export function getTouchingPropertyName(sourceFile: SourceFile, position: number, includeJsDocComment: boolean): Node {
        return getTouchingToken(sourceFile, position, includeJsDocComment, n => isPropertyName(n.kind));
    }

    /**
     * Returns the token if position is in [start, end).
     * If position === end, returns the preceding token if includeItemAtEndPosition(previousToken) === true
     */
    export function getTouchingToken(sourceFile: SourceFile, position: number, includeJsDocComment: boolean, includePrecedingTokenAtEndPosition?: (n: Node) => boolean): Node {
        return getTokenAtPositionWorker(sourceFile, position, /*allowPositionInLeadingTrivia*/ false, includePrecedingTokenAtEndPosition, /*includeEndPosition*/ false, includeJsDocComment);
    }

    /** Returns a token if position is in [start-of-leading-trivia, end) */
    export function getTokenAtPosition(sourceFile: SourceFile, position: number, includeJsDocComment: boolean, includeEndPosition?: boolean): Node {
        return getTokenAtPositionWorker(sourceFile, position, /*allowPositionInLeadingTrivia*/ true, /*includePrecedingTokenAtEndPosition*/ undefined, includeEndPosition, includeJsDocComment);
    }

    /** Get the token whose text contains the position */
    function getTokenAtPositionWorker(sourceFile: SourceFile, position: number, allowPositionInLeadingTrivia: boolean, includePrecedingTokenAtEndPosition: (n: Node) => boolean, includeEndPosition: boolean, includeJsDocComment: boolean): Node {
        let current: Node = sourceFile;
        outer: while (true) {
            if (isToken(current)) {
                // exit early
                return current;
            }

            // find the child that contains 'position'
            for (const child of current.getChildren()) {
                if (!includeJsDocComment && isJSDocNode(child)) {
                    continue;
                }

                const start = allowPositionInLeadingTrivia ? child.getFullStart() : child.getStart(sourceFile, includeJsDocComment);
                if (start > position) {
                    // If this child begins after position, then all subsequent children will as well.
                    break;
                }

                const end = child.getEnd();
                if (position < end || (position === end && (child.kind === SyntaxKind.EndOfFileToken || includeEndPosition))) {
                    current = child;
                    continue outer;
                }
                else if (includePrecedingTokenAtEndPosition && end === position) {
                    const previousToken = findPrecedingToken(position, sourceFile, child);
                    if (previousToken && includePrecedingTokenAtEndPosition(previousToken)) {
                        return previousToken;
                    }
                }
            }

            return current;
        }
    }

    /**
     * The token on the left of the position is the token that strictly includes the position
     * or sits to the left of the cursor if it is on a boundary. For example
     *
     *   fo|o               -> will return foo
     *   foo <comment> |bar -> will return foo
     *
     */
    export function findTokenOnLeftOfPosition(file: SourceFile, position: number): Node {
        // Ideally, getTokenAtPosition should return a token. However, it is currently
        // broken, so we do a check to make sure the result was indeed a token.
        const tokenAtPosition = getTokenAtPosition(file, position, /*includeJsDocComment*/ false);
        if (isToken(tokenAtPosition) && position > tokenAtPosition.getStart(file) && position < tokenAtPosition.getEnd()) {
            return tokenAtPosition;
        }

        return findPrecedingToken(position, file);
    }

    export function findNextToken(previousToken: Node, parent: Node): Node {
        return find(parent);

        function find(n: Node): Node {
            if (isToken(n) && n.pos === previousToken.end) {
                // this is token that starts at the end of previous token - return it
                return n;
            }

            const children = n.getChildren();
            for (const child of children) {
                const shouldDiveInChildNode =
                    // previous token is enclosed somewhere in the child
                    (child.pos <= previousToken.pos && child.end > previousToken.end) ||
                    // previous token ends exactly at the beginning of child
                    (child.pos === previousToken.end);

                if (shouldDiveInChildNode && nodeHasTokens(child)) {
                    return find(child);
                }
            }

            return undefined;
        }
    }

    /**
     * Finds the rightmost token satisfying `token.end <= position`,
     * excluding `JsxText` tokens containing only whitespace.
     */
    export function findPrecedingToken(position: number, sourceFile: SourceFile, startNode?: Node, includeJsDoc?: boolean): Node | undefined {
        const result = find(startNode || sourceFile);
        Debug.assert(!(result && isWhiteSpaceOnlyJsxText(result)));
        return result;

        function find(n: Node): Node | undefined {
            if (isNonWhitespaceToken(n)) {
                return n;
            }

            const children = n.getChildren(sourceFile);
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                // Note that the span of a node's tokens is [node.getStart(...), node.end).
                // Given that `position < child.end` and child has constituent tokens, we distinguish these cases:
                // 1) `position` precedes `child`'s tokens or `child` has no tokens (ie: in a comment or whitespace preceding `child`):
                // we need to find the last token in a previous child.
                // 2) `position` is within the same span: we recurse on `child`.
                if (position < child.end) {
                    const start = child.getStart(sourceFile, includeJsDoc);
                    const lookInPreviousChild =
                        (start >= position) || // cursor in the leading trivia
                        !nodeHasTokens(child) ||
                        isWhiteSpaceOnlyJsxText(child);

                    if (lookInPreviousChild) {
                        // actual start of the node is past the position - previous token should be at the end of previous child
                        const candidate = findRightmostChildNodeWithTokens(children, /*exclusiveStartPosition*/ i);
                        return candidate && findRightmostToken(candidate, sourceFile);
                    }
                    else {
                        // candidate should be in this node
                        return find(child);
                    }
                }
            }

            Debug.assert(startNode !== undefined || n.kind === SyntaxKind.SourceFile || isJSDocCommentContainingNode(n));

            // Here we know that none of child token nodes embrace the position,
            // the only known case is when position is at the end of the file.
            // Try to find the rightmost token in the file without filtering.
            // Namely we are skipping the check: 'position < node.end'
            if (children.length) {
                const candidate = findRightmostChildNodeWithTokens(children, /*exclusiveStartPosition*/ children.length);
                return candidate && findRightmostToken(candidate, sourceFile);
            }
        }
    }

    function isNonWhitespaceToken(n: Node): boolean {
        return isToken(n) && !isWhiteSpaceOnlyJsxText(n);
    }

    function findRightmostToken(n: Node, sourceFile: SourceFile): Node | undefined {
        if (isNonWhitespaceToken(n)) {
            return n;
        }

        const children = n.getChildren(sourceFile);
        const candidate = findRightmostChildNodeWithTokens(children, /*exclusiveStartPosition*/ children.length);
        return candidate && findRightmostToken(candidate, sourceFile);
    }

    /**
     * Finds the rightmost child to the left of `children[exclusiveStartPosition]` which is a non-all-whitespace token or has constituent tokens.
     */
    function findRightmostChildNodeWithTokens(children: Node[], exclusiveStartPosition: number): Node | undefined {
        for (let i = exclusiveStartPosition - 1; i >= 0; i--) {
            const child = children[i];

            if (isWhiteSpaceOnlyJsxText(child)) {
                Debug.assert(i > 0, "`JsxText` tokens should not be the first child of `JsxElement | JsxSelfClosingElement`");
            }
            else if (nodeHasTokens(children[i])) {
                return children[i];
            }
        }
    }

    export function isInString(sourceFile: SourceFile, position: number, previousToken = findPrecedingToken(position, sourceFile)): boolean {
        if (previousToken && isStringTextContainingNode(previousToken)) {
            const start = previousToken.getStart();
            const end = previousToken.getEnd();

            // To be "in" one of these literals, the position has to be:
            //   1. entirely within the token text.
            //   2. at the end position of an unterminated token.
            //   3. at the end of a regular expression (due to trailing flags like '/foo/g').
            if (start < position && position < end) {
                return true;
            }

            if (position === end) {
                return !!(<LiteralExpression>previousToken).isUnterminated;
            }
        }

        return false;
    }

    /**
     * returns true if the position is in between the open and close elements of an JSX expression.
     */
    export function isInsideJsxElementOrAttribute(sourceFile: SourceFile, position: number) {
        const token = getTokenAtPosition(sourceFile, position, /*includeJsDocComment*/ false);

        if (!token) {
            return false;
        }

        if (token.kind === SyntaxKind.JsxText) {
            return true;
        }

        // <div>Hello |</div>
        if (token.kind === SyntaxKind.LessThanToken && token.parent.kind === SyntaxKind.JsxText) {
            return true;
        }

        // <div> { | </div> or <div a={| </div>
        if (token.kind === SyntaxKind.LessThanToken && token.parent.kind === SyntaxKind.JsxExpression) {
            return true;
        }

        // <div> {
        // |
        // } < /div>
        if (token && token.kind === SyntaxKind.CloseBraceToken && token.parent.kind === SyntaxKind.JsxExpression) {
            return true;
        }

        // <div>|</div>
        if (token.kind === SyntaxKind.LessThanToken && token.parent.kind === SyntaxKind.JsxClosingElement) {
            return true;
        }

        return false;
    }

    function isWhiteSpaceOnlyJsxText(node: Node): boolean {
        return isJsxText(node) && node.containsOnlyWhiteSpaces;
    }

    export function isInTemplateString(sourceFile: SourceFile, position: number) {
        const token = getTokenAtPosition(sourceFile, position, /*includeJsDocComment*/ false);
        return isTemplateLiteralKind(token.kind) && position > token.getStart(sourceFile);
    }

    export function findPrecedingMatchingToken(token: Node, matchingTokenKind: SyntaxKind, sourceFile: SourceFile) {
        const tokenKind = token.kind;
        let remainingMatchingTokens = 0;
        while (true) {
            token = findPrecedingToken(token.getFullStart(), sourceFile);
            if (!token) {
                return undefined;
            }

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

    export function isPossiblyTypeArgumentPosition(token: Node, sourceFile: SourceFile) {
        // This function determines if the node could be type argument position
        // Since during editing, when type argument list is not complete,
        // the tree could be of any shape depending on the tokens parsed before current node,
        // scanning of the previous identifier followed by "<" before current node would give us better result
        // Note that we also balance out the already provided type arguments, arrays, object literals while doing so
        let remainingLessThanTokens = 0;
        while (token) {
            switch (token.kind) {
                case SyntaxKind.LessThanToken:
                    // Found the beginning of the generic argument expression
                    token = findPrecedingToken(token.getFullStart(), sourceFile);
                    const tokenIsIdentifier = token && isIdentifier(token);
                    if (!remainingLessThanTokens || !tokenIsIdentifier) {
                        return tokenIsIdentifier;
                    }
                    remainingLessThanTokens--;
                    break;

                case SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
                    remainingLessThanTokens = + 3;
                    break;

                case SyntaxKind.GreaterThanGreaterThanToken:
                    remainingLessThanTokens = + 2;
                    break;

                case SyntaxKind.GreaterThanToken:
                    remainingLessThanTokens++;
                    break;

                case SyntaxKind.CloseBraceToken:
                    // This can be object type, skip untill we find the matching open brace token
                    // Skip untill the matching open brace token
                    token = findPrecedingMatchingToken(token, SyntaxKind.OpenBraceToken, sourceFile);
                    if (!token) return false;
                    break;

                case SyntaxKind.CloseParenToken:
                    // This can be object type, skip untill we find the matching open brace token
                    // Skip untill the matching open brace token
                    token = findPrecedingMatchingToken(token, SyntaxKind.OpenParenToken, sourceFile);
                    if (!token) return false;
                    break;

                case SyntaxKind.CloseBracketToken:
                    // This can be object type, skip untill we find the matching open brace token
                    // Skip untill the matching open brace token
                    token = findPrecedingMatchingToken(token, SyntaxKind.OpenBracketToken, sourceFile);
                    if (!token) return false;
                    break;

                // Valid tokens in a type name. Skip.
                case SyntaxKind.CommaToken:
                case SyntaxKind.EqualsGreaterThanToken:

                case SyntaxKind.Identifier:
                case SyntaxKind.StringLiteral:
                case SyntaxKind.NumericLiteral:
                case SyntaxKind.TrueKeyword:
                case SyntaxKind.FalseKeyword:

                case SyntaxKind.TypeOfKeyword:
                case SyntaxKind.ExtendsKeyword:
                case SyntaxKind.KeyOfKeyword:
                case SyntaxKind.DotToken:
                case SyntaxKind.BarToken:
                case SyntaxKind.QuestionToken:
                case SyntaxKind.ColonToken:
                    break;

                default:
                    if (isTypeNode(token)) {
                        break;
                    }

                    // Invalid token in type
                    return false;
            }

            token = findPrecedingToken(token.getFullStart(), sourceFile);
        }

        return false;
    }

    /**
     * Returns true if the cursor at position in sourceFile is within a comment.
     *
     * @param tokenAtPosition Must equal `getTokenAtPosition(sourceFile, position)
     * @param predicate Additional predicate to test on the comment range.
     */
    export function isInComment(
        sourceFile: SourceFile,
        position: number,
        tokenAtPosition?: Node,
        predicate?: (c: CommentRange) => boolean): boolean {
        return !!formatting.getRangeOfEnclosingComment(sourceFile, position, /*onlyMultiLine*/ false, /*precedingToken*/ undefined, tokenAtPosition, predicate);
    }

    export function hasDocComment(sourceFile: SourceFile, position: number) {
        const token = getTokenAtPosition(sourceFile, position, /*includeJsDocComment*/ false);

        // First, we have to see if this position actually landed in a comment.
        const commentRanges = getLeadingCommentRanges(sourceFile.text, token.pos);

        return forEach(commentRanges, jsDocPrefix);

        function jsDocPrefix(c: CommentRange): boolean {
            const text = sourceFile.text;
            return text.length >= c.pos + 3 && text[c.pos] === "/" && text[c.pos + 1] === "*" && text[c.pos + 2] === "*";
        }
    }

    function nodeHasTokens(n: Node): boolean {
        // If we have a token or node that has a non-zero width, it must have tokens.
        // Note: getWidth() does not take trivia into account.
        return n.getWidth() !== 0;
    }

    export function getNodeModifiers(node: Node): string {
        const flags = getCombinedModifierFlags(node);
        const result: string[] = [];

        if (flags & ModifierFlags.Private) result.push(ScriptElementKindModifier.privateMemberModifier);
        if (flags & ModifierFlags.Protected) result.push(ScriptElementKindModifier.protectedMemberModifier);
        if (flags & ModifierFlags.Public) result.push(ScriptElementKindModifier.publicMemberModifier);
        if (flags & ModifierFlags.Static) result.push(ScriptElementKindModifier.staticModifier);
        if (flags & ModifierFlags.Abstract) result.push(ScriptElementKindModifier.abstractModifier);
        if (flags & ModifierFlags.Export) result.push(ScriptElementKindModifier.exportedModifier);
        if (node.flags & NodeFlags.Ambient) result.push(ScriptElementKindModifier.ambientModifier);

        return result.length > 0 ? result.join(",") : ScriptElementKindModifier.none;
    }

    export function getTypeArgumentOrTypeParameterList(node: Node): NodeArray<Node> {
        if (node.kind === SyntaxKind.TypeReference || node.kind === SyntaxKind.CallExpression) {
            return (<CallExpression>node).typeArguments;
        }

        if (isFunctionLike(node) || node.kind === SyntaxKind.ClassDeclaration || node.kind === SyntaxKind.InterfaceDeclaration) {
            return (<FunctionLikeDeclaration>node).typeParameters;
        }

        return undefined;
    }

    export function isWord(kind: SyntaxKind): boolean {
        return kind === SyntaxKind.Identifier || isKeyword(kind);
    }

    function isPropertyName(kind: SyntaxKind): boolean {
        return kind === SyntaxKind.StringLiteral || kind === SyntaxKind.NumericLiteral || isWord(kind);
    }

    export function isComment(kind: SyntaxKind): boolean {
        return kind === SyntaxKind.SingleLineCommentTrivia || kind === SyntaxKind.MultiLineCommentTrivia;
    }

    export function isStringOrRegularExpressionOrTemplateLiteral(kind: SyntaxKind): boolean {
        if (kind === SyntaxKind.StringLiteral
            || kind === SyntaxKind.RegularExpressionLiteral
            || isTemplateLiteralKind(kind)) {
            return true;
        }
        return false;
    }

    export function isPunctuation(kind: SyntaxKind): boolean {
        return SyntaxKind.FirstPunctuation <= kind && kind <= SyntaxKind.LastPunctuation;
    }

    export function isInsideTemplateLiteral(node: LiteralExpression, position: number) {
        return isTemplateLiteralKind(node.kind)
            && (node.getStart() < position && position < node.getEnd()) || (!!node.isUnterminated && position === node.getEnd());
    }

    export function isAccessibilityModifier(kind: SyntaxKind) {
        switch (kind) {
            case SyntaxKind.PublicKeyword:
            case SyntaxKind.PrivateKeyword:
            case SyntaxKind.ProtectedKeyword:
                return true;
        }

        return false;
    }

    export function cloneCompilerOptions(options: CompilerOptions): CompilerOptions {
        const result = clone(options);
        setConfigFileInOptions(result, options && options.configFile);
        return result;
    }

    export function isArrayLiteralOrObjectLiteralDestructuringPattern(node: Node) {
        if (node.kind === SyntaxKind.ArrayLiteralExpression ||
            node.kind === SyntaxKind.ObjectLiteralExpression) {
            // [a,b,c] from:
            // [a, b, c] = someExpression;
            if (node.parent.kind === SyntaxKind.BinaryExpression &&
                (<BinaryExpression>node.parent).left === node &&
                (<BinaryExpression>node.parent).operatorToken.kind === SyntaxKind.EqualsToken) {
                return true;
            }

            // [a, b, c] from:
            // for([a, b, c] of expression)
            if (node.parent.kind === SyntaxKind.ForOfStatement &&
                (<ForOfStatement>node.parent).initializer === node) {
                return true;
            }

            // [a, b, c] of
            // [x, [a, b, c] ] = someExpression
            // or
            // {x, a: {a, b, c} } = someExpression
            if (isArrayLiteralOrObjectLiteralDestructuringPattern(node.parent.kind === SyntaxKind.PropertyAssignment ? node.parent.parent : node.parent)) {
                return true;
            }
        }

        return false;
    }

    export function hasTrailingDirectorySeparator(path: string) {
        const lastCharacter = path.charAt(path.length - 1);
        return lastCharacter === "/" || lastCharacter === "\\";
    }

    export function isInReferenceComment(sourceFile: SourceFile, position: number): boolean {
        return isInComment(sourceFile, position, /*tokenAtPosition*/ undefined, c => {
            const commentText = sourceFile.text.substring(c.pos, c.end);
            return tripleSlashDirectivePrefixRegex.test(commentText);
        });
    }

    export function isInNonReferenceComment(sourceFile: SourceFile, position: number): boolean {
        return isInComment(sourceFile, position, /*tokenAtPosition*/ undefined, c => {
            const commentText = sourceFile.text.substring(c.pos, c.end);
            return !tripleSlashDirectivePrefixRegex.test(commentText);
        });
    }

    export function createTextSpanFromNode(node: Node, sourceFile?: SourceFile): TextSpan {
        return createTextSpanFromBounds(node.getStart(sourceFile), node.getEnd());
    }

    export function createTextSpanFromRange(range: TextRange): TextSpan {
        return createTextSpanFromBounds(range.pos, range.end);
    }

    export function createTextChangeFromStartLength(start: number, length: number, newText: string): TextChange {
        return createTextChange(createTextSpan(start, length), newText);
    }

    export function createTextChange(span: TextSpan, newText: string): TextChange {
        return { span, newText };
    }

    export const typeKeywords: ReadonlyArray<SyntaxKind> = [
        SyntaxKind.AnyKeyword,
        SyntaxKind.BooleanKeyword,
        SyntaxKind.KeyOfKeyword,
        SyntaxKind.NeverKeyword,
        SyntaxKind.NullKeyword,
        SyntaxKind.NumberKeyword,
        SyntaxKind.ObjectKeyword,
        SyntaxKind.StringKeyword,
        SyntaxKind.SymbolKeyword,
        SyntaxKind.VoidKeyword,
        SyntaxKind.UndefinedKeyword,
        SyntaxKind.UniqueKeyword,
    ];

    export function isTypeKeyword(kind: SyntaxKind): boolean {
        return contains(typeKeywords, kind);
    }

    /** True if the symbol is for an external module, as opposed to a namespace. */
    export function isExternalModuleSymbol(moduleSymbol: Symbol): boolean {
        Debug.assert(!!(moduleSymbol.flags & SymbolFlags.Module));
        return moduleSymbol.name.charCodeAt(0) === CharacterCodes.doubleQuote;
    }

    /** Returns `true` the first time it encounters a node and `false` afterwards. */
    export function nodeSeenTracker<T extends Node>(): (node: T) => boolean {
        const seen: true[] = [];
        return node => {
            const id = getNodeId(node);
            return !seen[id] && (seen[id] = true);
        };
    }

    export function getSnapshotText(snap: IScriptSnapshot): string {
        return snap.getText(0, snap.getLength());
    }

    export function repeatString(str: string, count: number): string {
        let result = "";
        for (let i = 0; i < count; i++) {
            result += str;
        }
        return result;
    }

    export function skipConstraint(type: Type): Type {
        return type.isTypeParameter() ? type.getConstraint() : type;
    }

    export function getNameFromPropertyName(name: PropertyName): string | undefined {
        return name.kind === SyntaxKind.ComputedPropertyName
            // treat computed property names where expression is string/numeric literal as just string/numeric literal
            ? isStringOrNumericLiteral(name.expression) ? name.expression.text : undefined
            : getTextOfIdentifierOrLiteral(name);
    }
}

// Display-part writer helpers
/* @internal */
namespace ts {
    export function isFirstDeclarationOfSymbolParameter(symbol: Symbol) {
        return symbol.declarations && symbol.declarations.length > 0 && symbol.declarations[0].kind === SyntaxKind.Parameter;
    }

    const displayPartWriter = getDisplayPartWriter();
    function getDisplayPartWriter(): DisplayPartsSymbolWriter {
        let displayParts: SymbolDisplayPart[];
        let lineStart: boolean;
        let indent: number;

        resetWriter();
        const unknownWrite = (text: string) => writeKind(text, SymbolDisplayPartKind.text);
        return {
            displayParts: () => displayParts,
            writeKeyword: text => writeKind(text, SymbolDisplayPartKind.keyword),
            writeOperator: text => writeKind(text, SymbolDisplayPartKind.operator),
            writePunctuation: text => writeKind(text, SymbolDisplayPartKind.punctuation),
            writeSpace: text => writeKind(text, SymbolDisplayPartKind.space),
            writeStringLiteral: text => writeKind(text, SymbolDisplayPartKind.stringLiteral),
            writeParameter: text => writeKind(text, SymbolDisplayPartKind.parameterName),
            writeProperty: text => writeKind(text, SymbolDisplayPartKind.propertyName),
            writeLiteral: text => writeKind(text, SymbolDisplayPartKind.stringLiteral),
            writeSymbol,
            writeLine,
            write: unknownWrite,
            writeTextOfNode: unknownWrite,
            getText: () => "",
            getTextPos: () => 0,
            getColumn: () => 0,
            getLine: () => 0,
            isAtStartOfLine: () => false,
            rawWrite: notImplemented,
            getIndent: () => indent,
            increaseIndent: () => { indent++; },
            decreaseIndent: () => { indent--; },
            clear: resetWriter,
            trackSymbol: noop,
            reportInaccessibleThisError: noop,
            reportInaccessibleUniqueSymbolError: noop,
            reportPrivateInBaseOfClassExpression: noop,
        };

        function writeIndent() {
            if (lineStart) {
                const indentString = getIndentString(indent);
                if (indentString) {
                    displayParts.push(displayPart(indentString, SymbolDisplayPartKind.space));
                }
                lineStart = false;
            }
        }

        function writeKind(text: string, kind: SymbolDisplayPartKind) {
            writeIndent();
            displayParts.push(displayPart(text, kind));
        }

        function writeSymbol(text: string, symbol: Symbol) {
            writeIndent();
            displayParts.push(symbolPart(text, symbol));
        }

        function writeLine() {
            displayParts.push(lineBreakPart());
            lineStart = true;
        }

        function resetWriter() {
            displayParts = [];
            lineStart = true;
            indent = 0;
        }
    }

    export function symbolPart(text: string, symbol: Symbol) {
        return displayPart(text, displayPartKind(symbol));

        function displayPartKind(symbol: Symbol): SymbolDisplayPartKind {
            const flags = symbol.flags;

            if (flags & SymbolFlags.Variable) {
                return isFirstDeclarationOfSymbolParameter(symbol) ? SymbolDisplayPartKind.parameterName : SymbolDisplayPartKind.localName;
            }
            else if (flags & SymbolFlags.Property) { return SymbolDisplayPartKind.propertyName; }
            else if (flags & SymbolFlags.GetAccessor) { return SymbolDisplayPartKind.propertyName; }
            else if (flags & SymbolFlags.SetAccessor) { return SymbolDisplayPartKind.propertyName; }
            else if (flags & SymbolFlags.EnumMember) { return SymbolDisplayPartKind.enumMemberName; }
            else if (flags & SymbolFlags.Function) { return SymbolDisplayPartKind.functionName; }
            else if (flags & SymbolFlags.Class) { return SymbolDisplayPartKind.className; }
            else if (flags & SymbolFlags.Interface) { return SymbolDisplayPartKind.interfaceName; }
            else if (flags & SymbolFlags.Enum) { return SymbolDisplayPartKind.enumName; }
            else if (flags & SymbolFlags.Module) { return SymbolDisplayPartKind.moduleName; }
            else if (flags & SymbolFlags.Method) { return SymbolDisplayPartKind.methodName; }
            else if (flags & SymbolFlags.TypeParameter) { return SymbolDisplayPartKind.typeParameterName; }
            else if (flags & SymbolFlags.TypeAlias) { return SymbolDisplayPartKind.aliasName; }
            else if (flags & SymbolFlags.Alias) { return SymbolDisplayPartKind.aliasName; }

            return SymbolDisplayPartKind.text;
        }
    }

    export function displayPart(text: string, kind: SymbolDisplayPartKind): SymbolDisplayPart {
        return { text, kind: SymbolDisplayPartKind[kind] };
    }

    export function spacePart() {
        return displayPart(" ", SymbolDisplayPartKind.space);
    }

    export function keywordPart(kind: SyntaxKind) {
        return displayPart(tokenToString(kind), SymbolDisplayPartKind.keyword);
    }

    export function punctuationPart(kind: SyntaxKind) {
        return displayPart(tokenToString(kind), SymbolDisplayPartKind.punctuation);
    }

    export function operatorPart(kind: SyntaxKind) {
        return displayPart(tokenToString(kind), SymbolDisplayPartKind.operator);
    }

    export function textOrKeywordPart(text: string) {
        const kind = stringToToken(text);
        return kind === undefined
            ? textPart(text)
            : keywordPart(kind);
    }

    export function textPart(text: string) {
        return displayPart(text, SymbolDisplayPartKind.text);
    }

    const carriageReturnLineFeed = "\r\n";
    /**
     * The default is CRLF.
     */
    export function getNewLineOrDefaultFromHost(host: LanguageServiceHost | LanguageServiceShimHost, formatSettings?: FormatCodeSettings) {
        return (formatSettings && formatSettings.newLineCharacter) ||
            (host.getNewLine && host.getNewLine()) ||
            carriageReturnLineFeed;
    }

    export function lineBreakPart() {
        return displayPart("\n", SymbolDisplayPartKind.lineBreak);
    }

    /* @internal */
    export function mapToDisplayParts(writeDisplayParts: (writer: DisplayPartsSymbolWriter) => void): SymbolDisplayPart[] {
        try {
            writeDisplayParts(displayPartWriter);
            return displayPartWriter.displayParts();
        }
        finally {
            displayPartWriter.clear();
        }
    }

    export function typeToDisplayParts(typechecker: TypeChecker, type: Type, enclosingDeclaration?: Node, flags?: TypeFormatFlags): SymbolDisplayPart[] {
        return mapToDisplayParts(writer => {
            typechecker.writeType(type, enclosingDeclaration, flags | TypeFormatFlags.MultilineObjectLiterals, writer);
        });
    }

    export function symbolToDisplayParts(typeChecker: TypeChecker, symbol: Symbol, enclosingDeclaration?: Node, meaning?: SymbolFlags, flags?: SymbolFormatFlags): SymbolDisplayPart[] {
        return mapToDisplayParts(writer => {
            typeChecker.writeSymbol(symbol, enclosingDeclaration, meaning, flags | SymbolFormatFlags.UseAliasDefinedOutsideCurrentScope, writer);
        });
    }

    export function signatureToDisplayParts(typechecker: TypeChecker, signature: Signature, enclosingDeclaration?: Node, flags?: TypeFormatFlags): SymbolDisplayPart[] {
        flags |= TypeFormatFlags.UseAliasDefinedOutsideCurrentScope | TypeFormatFlags.MultilineObjectLiterals | TypeFormatFlags.WriteTypeArgumentsOfSignature | TypeFormatFlags.OmitParameterModifiers;
        return mapToDisplayParts(writer => {
            typechecker.writeSignature(signature, enclosingDeclaration, flags, /*signatureKind*/ undefined, writer);
        });
    }

    export function isImportOrExportSpecifierName(location: Node): location is Identifier {
        return location.parent &&
            (location.parent.kind === SyntaxKind.ImportSpecifier || location.parent.kind === SyntaxKind.ExportSpecifier) &&
            (<ImportOrExportSpecifier>location.parent).propertyName === location;
    }

    /**
     * Strip off existed single quotes or double quotes from a given string
     *
     * @return non-quoted string
     */
    export function stripQuotes(name: string) {
        const length = name.length;
        if (length >= 2 && name.charCodeAt(0) === name.charCodeAt(length - 1) && startsWithQuote(name)) {
            return name.substring(1, length - 1);
        }
        return name;
    }

    export function startsWithQuote(name: string): boolean {
        return isSingleOrDoubleQuote(name.charCodeAt(0));
    }

    export function scriptKindIs(fileName: string, host: LanguageServiceHost, ...scriptKinds: ScriptKind[]): boolean {
        const scriptKind = getScriptKind(fileName, host);
        return forEach(scriptKinds, k => k === scriptKind);
    }

    export function getScriptKind(fileName: string, host?: LanguageServiceHost): ScriptKind {
        // First check to see if the script kind was specified by the host. Chances are the host
        // may override the default script kind for the file extension.
        return ensureScriptKind(fileName, host && host.getScriptKind && host.getScriptKind(fileName));
    }

    export function getUniqueSymbolId(symbol: Symbol, checker: TypeChecker) {
        return getSymbolId(skipAlias(symbol, checker));
    }

    export function getFirstNonSpaceCharacterPosition(text: string, position: number) {
        while (isWhiteSpaceLike(text.charCodeAt(position))) {
            position += 1;
        }
        return position;
    }

    /**
     * Creates a deep, memberwise clone of a node with no source map location.
     *
     * WARNING: This is an expensive operation and is only intended to be used in refactorings
     * and code fixes (because those are triggered by explicit user actions).
     */
    export function getSynthesizedDeepClone<T extends Node>(node: T | undefined): T | undefined {
        if (node === undefined) {
            return undefined;
        }

        const visited = visitEachChild(node, getSynthesizedDeepClone, nullTransformationContext);
        if (visited === node) {
            // This only happens for leaf nodes - internal nodes always see their children change.
            const clone = getSynthesizedClone(node);
            if (isStringLiteral(clone)) {
                clone.textSourceNode = node as any;
            }
            else if (isNumericLiteral(clone)) {
                clone.numericLiteralFlags = (node as any).numericLiteralFlags;
            }
            clone.pos = node.pos;
            clone.end = node.end;
            return clone;
        }

        // PERF: As an optimization, rather than calling getSynthesizedClone, we'll update
        // the new node created by visitEachChild with the extra changes getSynthesizedClone
        // would have made.

        visited.parent = undefined;

        return visited;
    }

    export function getSynthesizedDeepClones<T extends Node>(nodes: NodeArray<T> | undefined): NodeArray<T> | undefined {
        return nodes && createNodeArray(nodes.map(getSynthesizedDeepClone), nodes.hasTrailingComma);
    }

    /**
     * Sets EmitFlags to suppress leading and trailing trivia on the node.
     */
    /* @internal */
    export function suppressLeadingAndTrailingTrivia(node: Node) {
        suppressLeadingTrivia(node);
        suppressTrailingTrivia(node);
    }

    /**
     * Sets EmitFlags to suppress leading trivia on the node.
     */
    /* @internal */
    export function suppressLeadingTrivia(node: Node) {
        addEmitFlagsRecursively(node, EmitFlags.NoLeadingComments, getFirstChild);
    }

    /**
     * Sets EmitFlags to suppress trailing trivia on the node.
     */
    /* @internal */
    export function suppressTrailingTrivia(node: Node) {
        addEmitFlagsRecursively(node, EmitFlags.NoTrailingComments, getLastChild);
    }

    function addEmitFlagsRecursively(node: Node, flag: EmitFlags, getChild: (n: Node) => Node) {
        addEmitFlags(node, flag);
        const child = getChild(node);
        if (child) addEmitFlagsRecursively(child, flag, getChild);
    }

    function getFirstChild(node: Node): Node | undefined {
        return node.forEachChild(child => child);
    }
}
