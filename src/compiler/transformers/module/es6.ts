/// <reference path="../../factory.ts" />
/// <reference path="../../visitor.ts" />

/*@internal*/
namespace ts {
    export function transformES6Module(context: TransformationContext) {
        const compilerOptions = context.getCompilerOptions();
        const resolver = context.getEmitResolver();

        let currentSourceFile: SourceFile;

        return transformSourceFile;

        function transformSourceFile(node: SourceFile) {
            if (isExternalModule(node) || compilerOptions.isolatedModules) {
                currentSourceFile = node;
                return visitEachChild(node, visitor, context);
            }
            return node;
        }

        function visitor(node: Node): VisitResult<Node> {
            switch (node.kind) {
                case SyntaxKind.ImportDeclaration:
                    return visitImportDeclaration(<ImportDeclaration>node);
                case SyntaxKind.ImportClause:
                    return visitImportClause(<ImportClause>node);
                case SyntaxKind.NamedImports:
                case SyntaxKind.NamespaceImport:
                    return visitNamedBindings(<NamedImportBindings>node);
                case SyntaxKind.ImportSpecifier:
                    return visitImportSpecifier(<ImportSpecifier>node);
            }

            return node;
        }

        function visitImportDeclaration(node: ImportDeclaration) {
            if (node.importClause) {
                const newImportClause = visitNode(node.importClause, visitor, isImportClause);
                if (!newImportClause.name && !newImportClause.namedBindings) {
                    return undefined;
                }
                else if (newImportClause !== node.importClause) {
                    return createImportDeclaration(newImportClause, node.moduleSpecifier);
                }
            }
            return node;
        }

        function visitImportClause(node: ImportClause): ImportClause {
            let newDefaultImport = node.name;
            if (!resolver.isReferencedAliasDeclaration(node)) {
                newDefaultImport = undefined;
            }
            const newNamedBindings = visitNode(node.namedBindings, visitor, isNamedImportBindings, /*optional*/ true);
            return newDefaultImport !== node.name || newNamedBindings !== node.namedBindings
                ? createImportClause(newDefaultImport, newNamedBindings)
                : node; 
        }

        function visitNamedBindings(node: NamedImportBindings): VisitResult<NamedImportBindings> {
            if (node.kind === SyntaxKind.NamespaceImport) {
                return resolver.isReferencedAliasDeclaration(node) ? node: undefined;
            }
            else {
                const newNamedImportElements = visitNodes((<NamedImports>node).elements, visitor, isImportSpecifier);
                if (!newNamedImportElements || newNamedImportElements.length == 0) {
                    return undefined;
                }
                if (newNamedImportElements === (<NamedImports>node).elements) {
                    return node;
                }
                return createNamedImports(newNamedImportElements);
            }
        }

        function visitImportSpecifier(node: ImportSpecifier) {
            return resolver.isReferencedAliasDeclaration(node) ? node : undefined;
        }
    }
}