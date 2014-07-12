///<reference path='references.ts' />

module TypeScript {
    export class SyntaxUtilities {
        public static isAngleBracket(positionedElement: PositionedElement): boolean {
            var element = positionedElement.element();
            var parent = positionedElement.parentElement();
            if (parent !== null && (element.kind() === SyntaxKind.LessThanToken || element.kind() === SyntaxKind.GreaterThanToken)) {
                switch (parent.kind()) {
                    case SyntaxKind.TypeArgumentList:
                    case SyntaxKind.TypeParameterList:
                    case SyntaxKind.CastExpression:
                        return true;
                }
            }

            return false;
        }

        public static getToken(list: ISyntaxList, kind: SyntaxKind): ISyntaxToken {
            for (var i = 0, n = list.childCount(); i < n; i++) {
                var token = <ISyntaxToken>list.childAt(i);
                if (token.tokenKind === kind) {
                    return token;
                }
            }

            return null;
        }

        public static containsToken(list: ISyntaxList, kind: SyntaxKind): boolean {
            return SyntaxUtilities.getToken(list, kind) !== null;
        }

        public static hasExportKeyword(moduleElement: IModuleElementSyntax): boolean {
            return SyntaxUtilities.getExportKeyword(moduleElement) !== null;
        }

        public static getExportKeyword(moduleElement: IModuleElementSyntax): ISyntaxToken {
            switch (moduleElement.kind()) {
                case SyntaxKind.ModuleDeclaration:
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.VariableStatement:
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.ImportDeclaration:
                    return SyntaxUtilities.getToken((<any>moduleElement).modifiers, SyntaxKind.ExportKeyword);
                default: 
                    return null;
            }
        }

        public static isAmbientDeclarationSyntax(positionNode: PositionedNode): boolean {
            if (!positionNode) {
                return false;
            }

            var node = positionNode.node();
            switch (node.kind()) {
                case SyntaxKind.ModuleDeclaration:
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.VariableStatement:
                case SyntaxKind.EnumDeclaration:
                    if (SyntaxUtilities.containsToken(<ISyntaxList>(<any>node).modifiers, SyntaxKind.DeclareKeyword)) {
                        return true;
                    }
                    // Fall through to check if syntax container is ambient

                case SyntaxKind.ImportDeclaration:
                case SyntaxKind.ConstructorDeclaration:
                case SyntaxKind.MemberFunctionDeclaration:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                case SyntaxKind.MemberVariableDeclaration:
                    if (node.isClassElement() || node.isModuleElement()) {
                        return SyntaxUtilities.isAmbientDeclarationSyntax(positionNode.containingNode());
                    }

                case SyntaxKind.EnumElement:
                    return SyntaxUtilities.isAmbientDeclarationSyntax(positionNode.containingNode().containingNode());

                default: 
                    return SyntaxUtilities.isAmbientDeclarationSyntax(positionNode.containingNode());
            }
        }
    }
}