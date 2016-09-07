/* @internal */
namespace ts.Meaning {
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
            case SyntaxKind.EnumMember:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.MethodSignature:
            case SyntaxKind.Constructor:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction:
            case SyntaxKind.CatchClause:
                return SemanticMeaning.Value;

            case SyntaxKind.TypeParameter:
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.TypeAliasDeclaration:
            case SyntaxKind.TypeLiteral:
                return SemanticMeaning.Type;

            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.EnumDeclaration:
                return SemanticMeaning.Value | SemanticMeaning.Type;

            case SyntaxKind.ModuleDeclaration:
                if (isAmbientModule(<ModuleDeclaration>node)) {
                    return SemanticMeaning.Namespace | SemanticMeaning.Value;
                }
                else if (getModuleInstanceState(node) === ModuleInstanceState.Instantiated) {
                    return SemanticMeaning.Namespace | SemanticMeaning.Value;
                }
                else {
                    return SemanticMeaning.Namespace;
                }

            case SyntaxKind.NamedImports:
            case SyntaxKind.ImportSpecifier:
            case SyntaxKind.ImportEqualsDeclaration:
            case SyntaxKind.ImportDeclaration:
            case SyntaxKind.ExportAssignment:
            case SyntaxKind.ExportDeclaration:
                return SemanticMeaning.Value | SemanticMeaning.Type | SemanticMeaning.Namespace;

            // An external module can be a Value
            case SyntaxKind.SourceFile:
                return SemanticMeaning.Namespace | SemanticMeaning.Value;
        }

        return SemanticMeaning.Value | SemanticMeaning.Type | SemanticMeaning.Namespace;
    }

    export function getMeaningFromLocation(node: Node): SemanticMeaning {
        if (node.parent.kind === SyntaxKind.ExportAssignment) {
            return SemanticMeaning.Value | SemanticMeaning.Type | SemanticMeaning.Namespace;
        }
        else if (isInRightSideOfImport(node)) {
            return getMeaningFromRightHandSideOfImportEquals(node);
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
        else {
            return SemanticMeaning.Value;
        }
    }

    function getMeaningFromRightHandSideOfImportEquals(node: Node) {
        Debug.assert(node.kind === SyntaxKind.Identifier);

        //     import a = |b|; // Namespace
        //     import a = |b.c|; // Value, type, namespace
        //     import a = |b.c|.d; // Namespace

        if (node.parent.kind === SyntaxKind.QualifiedName &&
            (<QualifiedName>node.parent).right === node &&
            node.parent.parent.kind === SyntaxKind.ImportEqualsDeclaration) {
            return SemanticMeaning.Value | SemanticMeaning.Type | SemanticMeaning.Namespace;
        }
        return SemanticMeaning.Namespace;
    }

    function isInRightSideOfImport(node: Node) {
        while (node.parent.kind === SyntaxKind.QualifiedName) {
            node = node.parent;
        }
        return isInternalModuleImportEqualsDeclaration(node.parent) && (<ImportEqualsDeclaration>node.parent).moduleReference === node;
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

        return node.parent.kind === SyntaxKind.TypeReference ||
            (node.parent.kind === SyntaxKind.ExpressionWithTypeArguments && !isExpressionWithTypeArgumentsInClassExtendsClause(<ExpressionWithTypeArguments>node.parent)) ||
            (node.kind === SyntaxKind.ThisKeyword && !isPartOfExpression(node)) ||
            node.kind === SyntaxKind.ThisType;
    }
}
