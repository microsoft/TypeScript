
///<reference path='references.ts' />
module TypeScript.Services {
    interface LexicalScope {
        items: TypeScript.IIndexable<NavigateToItem>;
        itemNames: string[];
        childScopes: TypeScript.IIndexable<LexicalScope>;
        childScopeNames: string[];
    }

    export class GetScriptLexicalStructureWalker extends TypeScript.SyntaxWalker {
        private nameStack: string[] = [];
        private kindStack: string[] = [];

        private parentScopes: LexicalScope[] = [];
        private currentScope: LexicalScope;

        private createScope(): LexicalScope {
            return {
                items: TypeScript.createIntrinsicsObject<NavigateToItem>(),
                childScopes: TypeScript.createIntrinsicsObject<LexicalScope>(),
                childScopeNames: [],
                itemNames: []
            };
        }

        private pushNewContainerScope(containerName: string, kind: string): LexicalScope {
            Debug.assert(containerName, "No scope name provided");

            var key = kind + "+" + containerName;
            this.nameStack.push(containerName);
            this.kindStack.push(kind);

            var parentScope = this.currentScope;
            this.parentScopes.push(parentScope);

            var scope = parentScope.childScopes[key];
            if (!scope) {
                scope = this.createScope()
                parentScope.childScopes[key] = scope;
                parentScope.childScopeNames.push(key);
            }

            this.currentScope = scope;
            return parentScope;
        }

        private popScope() {
            Debug.assert(this.parentScopes.length > 0, "No parent scopes to return to")
            this.currentScope = this.parentScopes.pop();
            this.kindStack.pop();
            this.nameStack.pop();
        }

        constructor(private fileName: string) {
            super();
            this.currentScope = this.createScope();
        }

        private collectItems(items: NavigateToItem[], scope = this.currentScope) {
            scope.itemNames.forEach(item => {
                items.push(scope.items[item]);
            });

            scope.childScopeNames.forEach(childScope => {
                this.collectItems(items, scope.childScopes[childScope]);
            });
        }

        static getListsOfAllScriptLexicalStructure(items: NavigateToItem[], fileName: string, unit: TypeScript.SourceUnitSyntax) {
            var visitor = new GetScriptLexicalStructureWalker(fileName);
            visitNodeOrToken(visitor, unit);
            visitor.collectItems(items);
        }

        private createItem(node: TypeScript.ISyntaxNode, modifiers: ISyntaxToken[], kind: string, name: string): void {
            var key = kind + "+" + name;

            if (this.currentScope.items[key] !== undefined) {
                this.addAdditionalSpan(node, key);
                return;
            }

            var item = new NavigateToItem();
            item.name = name;
            item.kind = kind;
            item.matchKind = MatchKind.exact;
            item.fileName = this.fileName;
            item.kindModifiers = this.getKindModifiers(modifiers);
            item.minChar = start(node);
            item.limChar = end(node);
            item.containerName = this.nameStack.join(".");
            item.containerKind = this.kindStack.length === 0 ? "" : TypeScript.ArrayUtilities.last(this.kindStack);

            this.currentScope.items[key] = item;
            this.currentScope.itemNames.push(key);
        }

        private addAdditionalSpan(
            node: TypeScript.ISyntaxNode,
            key: string) {

            var item = this.currentScope.items[key]
            Debug.assert(item !== undefined);

            var start = TypeScript.start(node);
            var span = new SpanInfo(start, start + width(node));


            if (item.additionalSpans) {
                item.additionalSpans.push(span);
            }
            else {
                item.additionalSpans = [span];
            }
        }

        private getKindModifiers(modifiers: TypeScript.ISyntaxToken[]): string {
            var result: string[] = [];

            for (var i = 0, n = modifiers.length; i < n; i++) {
                result.push(modifiers[i].text());
            }

            return result.length > 0 ? result.join(',') : ScriptElementKindModifier.none;
        }

        public visitModuleDeclaration(node: TypeScript.ModuleDeclarationSyntax): void {
            var names = this.getModuleNames(node);
            this.visitModuleDeclarationWorker(node, names, 0);
        }

        private visitModuleDeclarationWorker(node: TypeScript.ModuleDeclarationSyntax, names: string[], nameIndex: number): void {
            if (nameIndex === names.length) {
                // We're after all the module names, descend and process all children.
                super.visitModuleDeclaration(node);
            }
            else {
                var name = names[nameIndex];
                var kind = ScriptElementKind.moduleElement;

                this.createItem(node, node.modifiers, kind, name);

                this.pushNewContainerScope(name, kind);

                this.visitModuleDeclarationWorker(node, names, nameIndex + 1);

                this.popScope();
            }
        }

        private getModuleNames(node: TypeScript.ModuleDeclarationSyntax): string[] {
            var result: string[] = [];

            if (node.stringLiteral) {
                result.push(node.stringLiteral.text());
            }
            else {
                this.getModuleNamesHelper(node.name, result);
            }

            return result;
        }

        private getModuleNamesHelper(name: TypeScript.INameSyntax, result: string[]): void {
            if (name.kind() === TypeScript.SyntaxKind.QualifiedName) {
                var qualifiedName = <TypeScript.QualifiedNameSyntax>name;
                this.getModuleNamesHelper(qualifiedName.left, result);
                result.push(qualifiedName.right.text());
            }
            else {
                result.push((<TypeScript.ISyntaxToken>name).text());
            }
        }

        public visitClassDeclaration(node: TypeScript.ClassDeclarationSyntax): void {
            var name = node.identifier.text();
            var kind = ScriptElementKind.classElement;

            this.createItem(node, node.modifiers, kind, name);

            this.pushNewContainerScope(name, kind);

            super.visitClassDeclaration(node);

            this.popScope();
        }

        public visitInterfaceDeclaration(node: TypeScript.InterfaceDeclarationSyntax): void {
            var name = node.identifier.text();
            var kind = ScriptElementKind.interfaceElement;

            this.createItem(node, node.modifiers, kind, name);

            this.pushNewContainerScope(name, kind);

            super.visitInterfaceDeclaration(node);

            this.popScope();
        }

        public visitObjectType(node: TypeScript.ObjectTypeSyntax): void {
            // Ignore an object type if we aren't inside an interface declaration.  We don't want
            // to add some random object type's members to the nav bar.
            if (node.parent.kind() === SyntaxKind.InterfaceDeclaration) {
                super.visitObjectType(node);
            }
        }

        public visitEnumDeclaration(node: TypeScript.EnumDeclarationSyntax): void {
            var name = node.identifier.text();
            var kind = ScriptElementKind.enumElement;

            this.createItem(node, node.modifiers, kind, name);

            this.pushNewContainerScope(name, kind);

            super.visitEnumDeclaration(node);

            this.popScope();
        }

        public visitConstructorDeclaration(node: TypeScript.ConstructorDeclarationSyntax): void {
            this.createItem(node, TypeScript.Syntax.emptyList<ISyntaxToken>(), ScriptElementKind.constructorImplementationElement, "constructor");

            // Search the parameter list of class properties
            var parameters = node.callSignature.parameterList.parameters;
            if (parameters) {
                for (var i = 0, n = parameters.length; i < n; i++) {
                    var parameter = <ParameterSyntax>parameters[i];

                    Debug.assert(parameter.kind() === SyntaxKind.Parameter);

                    if (SyntaxUtilities.containsToken(parameter.modifiers, SyntaxKind.PublicKeyword) ||
                        SyntaxUtilities.containsToken(parameter.modifiers, SyntaxKind.PrivateKeyword)) {
                        this.createItem(node, parameter.modifiers, ScriptElementKind.memberVariableElement, parameter.identifier.text());
                    }
                }
            }

            // No need to descend into a constructor;
        }

        public visitMemberFunctionDeclaration(node: TypeScript.MemberFunctionDeclarationSyntax): void {
            this.createItem(node, node.modifiers, ScriptElementKind.memberFunctionElement, node.propertyName.text());

            // No need to descend into a member function;
        }

        public visitGetAccessor(node: TypeScript.GetAccessorSyntax): void {
            this.createItem(node, node.modifiers, ScriptElementKind.memberGetAccessorElement, node.propertyName.text());

            // No need to descend into a member accessor;
        }

        public visitSetAccessor(node: TypeScript.SetAccessorSyntax): void {
            this.createItem(node, node.modifiers, ScriptElementKind.memberSetAccessorElement, node.propertyName.text());

            // No need to descend into a member accessor;
        }

        public visitVariableDeclarator(node: TypeScript.VariableDeclaratorSyntax): void {
            var modifiers = node.parent.kind() === SyntaxKind.MemberVariableDeclaration
                ? (<MemberVariableDeclarationSyntax>node.parent).modifiers
                : TypeScript.Syntax.emptyList<ISyntaxToken>();
            var kind = node.parent.kind() === SyntaxKind.MemberVariableDeclaration
                ? ScriptElementKind.memberVariableElement
                : ScriptElementKind.variableElement;
            this.createItem(node, modifiers, kind, node.propertyName.text());

            // No need to descend into a variable declarator;
        }

        public visitIndexSignature(node: TypeScript.IndexSignatureSyntax): void {
            this.createItem(node, TypeScript.Syntax.emptyList<ISyntaxToken>(), ScriptElementKind.indexSignatureElement, "[]");

            // No need to descend into an index signature;
        }

        public visitEnumElement(node: TypeScript.EnumElementSyntax): void {
            this.createItem(node, TypeScript.Syntax.emptyList<ISyntaxToken>(), ScriptElementKind.memberVariableElement, node.propertyName.text());

            // No need to descend into an enum element;
        }

        public visitCallSignature(node: TypeScript.CallSignatureSyntax): void {
            this.createItem(node, TypeScript.Syntax.emptyList<ISyntaxToken>(), ScriptElementKind.callSignatureElement, "()");

            // No need to descend into a call signature;
        }

        public visitConstructSignature(node: TypeScript.ConstructSignatureSyntax): void {
            this.createItem(node, TypeScript.Syntax.emptyList<ISyntaxToken>(), ScriptElementKind.constructSignatureElement, "new()");

            // No need to descend into a construct signature;
        }

        public visitMethodSignature(node: TypeScript.MethodSignatureSyntax): void {
            this.createItem(node, TypeScript.Syntax.emptyList<ISyntaxToken>(), ScriptElementKind.memberFunctionElement, node.propertyName.text());

            // No need to descend into a method signature;
        }

        public visitPropertySignature(node: TypeScript.PropertySignatureSyntax): void {
            this.createItem(node, TypeScript.Syntax.emptyList<ISyntaxToken>(), ScriptElementKind.memberVariableElement, node.propertyName.text());

            // No need to descend into a property signature;
        }

        public visitFunctionDeclaration(node: TypeScript.FunctionDeclarationSyntax): void {
            // in the case of:
            //    declare function
            // the parser will synthesize an identifier.
            // we shouldn't add an unnamed function declaration
            if (width(node.identifier) > 0) {
                this.createItem(node, node.modifiers, ScriptElementKind.functionElement, node.identifier.text());
            }

            // No need to descend into a function declaration;
        }

        // Common statement types.  Don't even bother walking into them as we'll never find anything
        // inside that we'd put in the navbar.

        public visitBlock(node: TypeScript.BlockSyntax): void {
        }

        public visitIfStatement(node: TypeScript.IfStatementSyntax): void {
        }

        public visitExpressionStatement(node: TypeScript.ExpressionStatementSyntax): void {
        }

        public visitThrowStatement(node: TypeScript.ThrowStatementSyntax): void {
        }

        public visitReturnStatement(node: TypeScript.ReturnStatementSyntax): void {
        }

        public visitSwitchStatement(node: TypeScript.SwitchStatementSyntax): void {
        }

        public visitWithStatement(node: TypeScript.WithStatementSyntax): void {
        }

        public visitTryStatement(node: TypeScript.TryStatementSyntax): void {
        }

        public visitLabeledStatement(node: TypeScript.LabeledStatementSyntax): void {
        }
    }
}