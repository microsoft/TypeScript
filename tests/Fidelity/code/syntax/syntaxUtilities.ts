///<reference path='references.ts' />

module TypeScript {
    export class SyntaxUtilities {
        public static isAnyFunctionExpressionOrDeclaration(ast: ISyntaxElement): boolean {
            switch (ast.kind()) {
                case SyntaxKind.SimpleArrowFunctionExpression:
                case SyntaxKind.ParenthesizedArrowFunctionExpression:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.MemberFunctionDeclaration:
                case SyntaxKind.FunctionPropertyAssignment:
                case SyntaxKind.ConstructorDeclaration:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                    return true;
            }

            return false;
        }

        public static isLastTokenOnLine(token: ISyntaxToken, text: ISimpleText): boolean {
            var _nextToken = nextToken(token, text);
            if (!_nextToken) {
                return true;
            }

            var lineMap = text.lineMap();
            var tokenLine = lineMap.getLineNumberFromPosition(end(token, text));
            var nextTokenLine = lineMap.getLineNumberFromPosition(start(_nextToken, text));

            return tokenLine !== nextTokenLine;
        }

        public static isLeftHandSizeExpression(element: ISyntaxElement) {
            if (element) {
                switch (element.kind()) {
                    case SyntaxKind.MemberAccessExpression:
                    case SyntaxKind.ElementAccessExpression:
                    case SyntaxKind.ObjectCreationExpression:
                    case SyntaxKind.InvocationExpression:
                    case SyntaxKind.ArrayLiteralExpression:
                    case SyntaxKind.ParenthesizedExpression:
                    case SyntaxKind.ObjectLiteralExpression:
                    case SyntaxKind.FunctionExpression:
                    case SyntaxKind.IdentifierName:
                    case SyntaxKind.RegularExpressionLiteral:
                    case SyntaxKind.NumericLiteral:
                    case SyntaxKind.StringLiteral:
                    case SyntaxKind.FalseKeyword:
                    case SyntaxKind.NullKeyword:
                    case SyntaxKind.ThisKeyword:
                    case SyntaxKind.TrueKeyword:
                    case SyntaxKind.SuperKeyword:
                        return true;
                }
            }

            return false;
        }

        public static isExpression(element: ISyntaxElement) {
            if (element) {
                switch (element.kind()) {
                    case SyntaxKind.IdentifierName:
                    case SyntaxKind.RegularExpressionLiteral:
                    case SyntaxKind.NumericLiteral:
                    case SyntaxKind.StringLiteral:
                    case SyntaxKind.FalseKeyword:
                    case SyntaxKind.NullKeyword:
                    case SyntaxKind.ThisKeyword:
                    case SyntaxKind.TrueKeyword:
                    case SyntaxKind.SuperKeyword:

                    case SyntaxKind.PlusExpression:
                    case SyntaxKind.NegateExpression:
                    case SyntaxKind.BitwiseNotExpression:
                    case SyntaxKind.LogicalNotExpression:
                    case SyntaxKind.PreIncrementExpression:
                    case SyntaxKind.PreDecrementExpression:
                    case SyntaxKind.DeleteExpression:
                    case SyntaxKind.TypeOfExpression:
                    case SyntaxKind.VoidExpression:
                    case SyntaxKind.CommaExpression:
                    case SyntaxKind.AssignmentExpression:
                    case SyntaxKind.AddAssignmentExpression:
                    case SyntaxKind.SubtractAssignmentExpression:
                    case SyntaxKind.MultiplyAssignmentExpression:
                    case SyntaxKind.DivideAssignmentExpression:
                    case SyntaxKind.ModuloAssignmentExpression:
                    case SyntaxKind.AndAssignmentExpression:
                    case SyntaxKind.ExclusiveOrAssignmentExpression:
                    case SyntaxKind.OrAssignmentExpression:
                    case SyntaxKind.LeftShiftAssignmentExpression:
                    case SyntaxKind.SignedRightShiftAssignmentExpression:
                    case SyntaxKind.UnsignedRightShiftAssignmentExpression:
                    case SyntaxKind.ConditionalExpression:
                    case SyntaxKind.LogicalOrExpression:
                    case SyntaxKind.LogicalAndExpression:
                    case SyntaxKind.BitwiseOrExpression:
                    case SyntaxKind.BitwiseExclusiveOrExpression:
                    case SyntaxKind.BitwiseAndExpression:
                    case SyntaxKind.EqualsWithTypeConversionExpression:
                    case SyntaxKind.NotEqualsWithTypeConversionExpression:
                    case SyntaxKind.EqualsExpression:
                    case SyntaxKind.NotEqualsExpression:
                    case SyntaxKind.LessThanExpression:
                    case SyntaxKind.GreaterThanExpression:
                    case SyntaxKind.LessThanOrEqualExpression:
                    case SyntaxKind.GreaterThanOrEqualExpression:
                    case SyntaxKind.InstanceOfExpression:
                    case SyntaxKind.InExpression:
                    case SyntaxKind.LeftShiftExpression:
                    case SyntaxKind.SignedRightShiftExpression:
                    case SyntaxKind.UnsignedRightShiftExpression:
                    case SyntaxKind.MultiplyExpression:
                    case SyntaxKind.DivideExpression:
                    case SyntaxKind.ModuloExpression:
                    case SyntaxKind.AddExpression:
                    case SyntaxKind.SubtractExpression:
                    case SyntaxKind.PostIncrementExpression:
                    case SyntaxKind.PostDecrementExpression:
                    case SyntaxKind.MemberAccessExpression:
                    case SyntaxKind.InvocationExpression:
                    case SyntaxKind.ArrayLiteralExpression:
                    case SyntaxKind.ObjectLiteralExpression:
                    case SyntaxKind.ObjectCreationExpression:
                    case SyntaxKind.ParenthesizedExpression:
                    case SyntaxKind.ParenthesizedArrowFunctionExpression:
                    case SyntaxKind.SimpleArrowFunctionExpression:
                    case SyntaxKind.CastExpression:
                    case SyntaxKind.ElementAccessExpression:
                    case SyntaxKind.FunctionExpression:
                    case SyntaxKind.OmittedExpression:
                        return true;
                }
            }

            return false;
        }

        public static isSwitchClause(element: ISyntaxElement) {
            if (element) {
                switch (element.kind()) {
                    case SyntaxKind.CaseSwitchClause:
                    case SyntaxKind.DefaultSwitchClause:
                        return true;
                }
            }

            return false;
        }

        public static isTypeMember(element: ISyntaxElement) {
            if (element) {
                switch (element.kind()) {
                    case SyntaxKind.ConstructSignature:
                    case SyntaxKind.MethodSignature:
                    case SyntaxKind.IndexSignature:
                    case SyntaxKind.PropertySignature:
                    case SyntaxKind.CallSignature:
                        return true;
                }
            }

            return false;
        }

        public static isClassElement(element: ISyntaxElement) {
            if (element) {
                switch (element.kind()) {
                    case SyntaxKind.ConstructorDeclaration:
                    case SyntaxKind.IndexMemberDeclaration:
                    case SyntaxKind.MemberFunctionDeclaration:
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                    case SyntaxKind.MemberFunctionDeclaration:
                    case SyntaxKind.MemberVariableDeclaration:
                        return true;
                }
            }

            return false;
        }

        public static isModuleElement(element: ISyntaxElement) {
            if (element) {
                switch (element.kind()) {
                    case SyntaxKind.ImportDeclaration:
                    case SyntaxKind.ExportAssignment:
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.InterfaceDeclaration:
                    case SyntaxKind.ModuleDeclaration:
                    case SyntaxKind.EnumDeclaration:

                    // Keep in sync with isStatement:
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.VariableStatement:
                    case SyntaxKind.Block:
                    case SyntaxKind.IfStatement:
                    case SyntaxKind.ExpressionStatement:
                    case SyntaxKind.ThrowStatement:
                    case SyntaxKind.ReturnStatement:
                    case SyntaxKind.SwitchStatement:
                    case SyntaxKind.BreakStatement:
                    case SyntaxKind.ContinueStatement:
                    case SyntaxKind.ForInStatement:
                    case SyntaxKind.ForStatement:
                    case SyntaxKind.WhileStatement:
                    case SyntaxKind.WithStatement:
                    case SyntaxKind.EmptyStatement:
                    case SyntaxKind.TryStatement:
                    case SyntaxKind.LabeledStatement:
                    case SyntaxKind.DoStatement:
                    case SyntaxKind.DebuggerStatement:
                        return true;
                }
            }

            return false;
        }

        public static isStatement(element: ISyntaxElement) {
            if (element) {
                switch (element.kind()) {
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.VariableStatement:
                    case SyntaxKind.Block:
                    case SyntaxKind.IfStatement:
                    case SyntaxKind.ExpressionStatement:
                    case SyntaxKind.ThrowStatement:
                    case SyntaxKind.ReturnStatement:
                    case SyntaxKind.SwitchStatement:
                    case SyntaxKind.BreakStatement:
                    case SyntaxKind.ContinueStatement:
                    case SyntaxKind.ForInStatement:
                    case SyntaxKind.ForStatement:
                    case SyntaxKind.WhileStatement:
                    case SyntaxKind.WithStatement:
                    case SyntaxKind.EmptyStatement:
                    case SyntaxKind.TryStatement:
                    case SyntaxKind.LabeledStatement:
                    case SyntaxKind.DoStatement:
                    case SyntaxKind.DebuggerStatement:
                        return true;
                }
            }

            return false;
        }

        public static isAngleBracket(positionedElement: ISyntaxElement): boolean {
            var element = positionedElement;
            var parent = positionedElement.parent;
            if (parent && (element.kind() === SyntaxKind.LessThanToken || element.kind() === SyntaxKind.GreaterThanToken)) {
                switch (parent.kind()) {
                    case SyntaxKind.TypeArgumentList:
                    case SyntaxKind.TypeParameterList:
                    case SyntaxKind.CastExpression:
                        return true;
                }
            }

            return false;
        }

        public static getToken(list: ISyntaxToken[], kind: SyntaxKind): ISyntaxToken {
            for (var i = 0, n = list.length; i < n; i++) {
                var token = list[i];
                if (token.kind() === kind) {
                    return token;
                }
            }

            return undefined;
        }

        public static containsToken(list: ISyntaxToken[], kind: SyntaxKind): boolean {
            return !!SyntaxUtilities.getToken(list, kind);
        }

        public static hasExportKeyword(moduleElement: IModuleElementSyntax): boolean {
            return !!SyntaxUtilities.getExportKeyword(moduleElement);
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
                    return undefined;
            }
        }

        public static isAmbientDeclarationSyntax(positionNode: ISyntaxNode): boolean {
            if (!positionNode) {
                return false;
            }

            var node = positionNode;
            switch (node.kind()) {
                case SyntaxKind.ModuleDeclaration:
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.VariableStatement:
                case SyntaxKind.EnumDeclaration:
                    if (SyntaxUtilities.containsToken(<ISyntaxToken[]>(<any>node).modifiers, SyntaxKind.DeclareKeyword)) {
                        return true;
                    }
                    // Fall through to check if syntax container is ambient

                case SyntaxKind.ImportDeclaration:
                case SyntaxKind.ConstructorDeclaration:
                case SyntaxKind.MemberFunctionDeclaration:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                case SyntaxKind.MemberVariableDeclaration:
                    if (SyntaxUtilities.isClassElement(node) || SyntaxUtilities.isModuleElement(node)) {
                        return SyntaxUtilities.isAmbientDeclarationSyntax(Syntax.containingNode(positionNode));
                    }

                case SyntaxKind.EnumElement:
                    return SyntaxUtilities.isAmbientDeclarationSyntax(Syntax.containingNode(Syntax.containingNode(positionNode)));

                default: 
                    return SyntaxUtilities.isAmbientDeclarationSyntax(Syntax.containingNode(positionNode));
            }
        }
    }
}