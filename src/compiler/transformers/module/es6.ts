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
            if (isDeclarationFile(node)) {
                return node;
            }

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
                case SyntaxKind.ImportEqualsDeclaration:
                    return visitImportEqualsDeclaration(<ImportEqualsDeclaration>node);
                case SyntaxKind.ImportClause:
                    return visitImportClause(<ImportClause>node);
                case SyntaxKind.NamedImports:
                case SyntaxKind.NamespaceImport:
                    return visitNamedBindings(<NamedImportBindings>node);
                case SyntaxKind.ImportSpecifier:
                    return visitImportSpecifier(<ImportSpecifier>node);
                case SyntaxKind.ExportAssignment:
                    return visitExportAssignment(<ExportAssignment>node);
                case SyntaxKind.ExportDeclaration:
                    return visitExportDeclaration(<ExportDeclaration>node);
                case SyntaxKind.NamedExports:
                    return visitNamedExports(<NamedExports>node);
                case SyntaxKind.ExportSpecifier:
                    return visitExportSpecifier(<ExportSpecifier>node);
            }

            return node;
        }

        function visitExportAssignment(node: ExportAssignment): ExportAssignment {
            if (node.isExportEquals) {
                return undefined; // do not emit export equals for ES6
            }
            const original = getOriginalNode(node);
            return nodeIsSynthesized(original) || resolver.isValueAliasDeclaration(original) ? node : undefined;
        }

        function visitExportDeclaration(node: ExportDeclaration): ExportDeclaration {
            if (!node.exportClause) {
                return resolver.moduleExportsSomeValue(node.moduleSpecifier) ? node : undefined;
            }
            if (!resolver.isValueAliasDeclaration(node)) {
                return undefined;
            }
            const newExportClause = visitNode(node.exportClause, visitor, isNamedExports, /*optional*/ true);
            if (node.exportClause === newExportClause) {
                return node;
            }
            return newExportClause
                ? createExportDeclaration(
                    /*decorators*/ undefined,
                    /*modifiers*/ undefined,
                    newExportClause,
                    node.moduleSpecifier)
                : undefined;
        }

        function visitNamedExports(node: NamedExports): NamedExports {
            const newExports = visitNodes(node.elements, visitor, isExportSpecifier);
            if (node.elements === newExports) {
                return node;
            }
            return newExports.length ? createNamedExports(newExports) : undefined;
        }

        function visitExportSpecifier(node: ExportSpecifier): ExportSpecifier {
            return resolver.isValueAliasDeclaration(node) ? node : undefined;
        }

        function visitImportEqualsDeclaration(node: ImportEqualsDeclaration): ImportEqualsDeclaration {
            return !isExternalModuleImportEqualsDeclaration(node) || resolver.isReferencedAliasDeclaration(node) ? node : undefined;
        }

        function visitImportDeclaration(node: ImportDeclaration) {
            if (node.importClause) {
                const newImportClause = visitNode(node.importClause, visitor, isImportClause);
                if (!newImportClause.name && !newImportClause.namedBindings) {
                    return undefined;
                }
                else if (newImportClause !== node.importClause) {
                    return createImportDeclaration(
                        /*decorators*/ undefined,
                        /*modifiers*/ undefined,
                        newImportClause,
                        node.moduleSpecifier);
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
                return resolver.isReferencedAliasDeclaration(node) ? node : undefined;
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