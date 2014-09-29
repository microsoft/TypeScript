
module TypeScript.Services {
    export class NavigationBarItemGetter {
        private hasGlobalNode = false;

        private getIndent(node: ISyntaxNode): number {
            var indent = this.hasGlobalNode ? 1 : 0;

            var current = node.parent;
            while (current != null) {
                if (current.kind() == SyntaxKind.ModuleDeclaration || current.kind() === SyntaxKind.FunctionDeclaration) {
                    indent++;
                }

                current = current.parent;
            }

            return indent;
        }

        private getKindModifiers(modifiers: TypeScript.ISyntaxToken[]): string {
            var result: string[] = [];

            for (var i = 0, n = modifiers.length; i < n; i++) {
                result.push(modifiers[i].text());
            }

            return result.length > 0 ? result.join(',') : ts.ScriptElementKindModifier.none;
        }

        public getItems(node: TypeScript.SourceUnitSyntax): ts.NavigationBarItem[] {
            return this.getItemsWorker(() => this.getTopLevelNodes(node), n => this.createTopLevelItem(n));
        }

        private getChildNodes(nodes: IModuleElementSyntax[]): ISyntaxNode[] {
            var childNodes: ISyntaxNode[] = [];

            for (var i = 0, n = nodes.length; i < n; i++) {
                var node = <ISyntaxNode>nodes[i];

                if (node.kind() === SyntaxKind.FunctionDeclaration) {
                    childNodes.push(node);
                }
                else if (node.kind() === SyntaxKind.VariableStatement) {
                    var variableDeclaration = (<VariableStatementSyntax>node).variableDeclaration;
                    childNodes.push.apply(childNodes, variableDeclaration.variableDeclarators);
                }
            }

            return childNodes;
        }

        private getTopLevelNodes(node: SourceUnitSyntax): ISyntaxNode[] {
            var topLevelNodes: ISyntaxNode[] = [];
            topLevelNodes.push(node);

            this.addTopLevelNodes(node.moduleElements, topLevelNodes);

            return topLevelNodes;
        }

        private addTopLevelNodes(nodes: IModuleElementSyntax[], topLevelNodes: ISyntaxNode[]): void {
            for (var i = 0, n = nodes.length; i < n; i++) {
                var node = nodes[i];
                switch (node.kind()) {
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.EnumDeclaration:
                    case SyntaxKind.InterfaceDeclaration:
                        topLevelNodes.push(node);
                        break;

                    case SyntaxKind.ModuleDeclaration:
                        var moduleDeclaration = <ModuleDeclarationSyntax>node;
                        topLevelNodes.push(node);
                        this.addTopLevelNodes(moduleDeclaration.moduleElements, topLevelNodes);
                        break;

                    case SyntaxKind.FunctionDeclaration:
                        var functionDeclaration = <FunctionDeclarationSyntax>node;
                        if (this.isTopLevelFunctionDeclaration(functionDeclaration)) {
                            topLevelNodes.push(node);
                            this.addTopLevelNodes(functionDeclaration.block.statements, topLevelNodes);
                        }
                        break;
                }
            }
        }

        public isTopLevelFunctionDeclaration(functionDeclaration: FunctionDeclarationSyntax) {
            // A function declaration is 'top level' if it contains any function declarations 
            // within it.
            return functionDeclaration.block && ArrayUtilities.any(functionDeclaration.block.statements, s => s.kind() === SyntaxKind.FunctionDeclaration);
        }

        private getItemsWorker(getNodes: () => ISyntaxNode[], createItem: (n: ISyntaxNode) => ts.NavigationBarItem): ts.NavigationBarItem[] {
            var items: ts.NavigationBarItem[] = [];

            var keyToItem = createIntrinsicsObject<ts.NavigationBarItem>();

            var nodes = getNodes();
            for (var i = 0, n = nodes.length; i < n; i++) {
                var child = nodes[i];
                var item = createItem(child);
                if (item != null) {
                    if (item.text.length > 0) {
                        var key = item.text + "-" + item.kind;

                        var itemWithSameName = keyToItem[key];
                        if (itemWithSameName) {
                            // We had an item with the same name.  Merge these items together.
                            this.merge(itemWithSameName, item);
                        }
                        else {
                            keyToItem[key] = item;
                            items.push(item);
                        }
                    }
                }
            }

            return items;
        }

        private merge(target: ts.NavigationBarItem, source: ts.NavigationBarItem) {
            // First, add any spans in the source to the target.
            target.spans.push.apply(target.spans, source.spans);

            if (source.childItems) {
                if (!target.childItems) {
                    target.childItems = [];
                }

                // Next, recursively merge or add any children in the source as appropriate.
                outer:
                for (var i = 0, n = source.childItems.length; i < n; i++) {
                    var sourceChild = source.childItems[i];

                    for (var j = 0, m = target.childItems.length; j < m; j++) {
                        var targetChild = target.childItems[j];

                        if (targetChild.text === sourceChild.text && targetChild.kind === sourceChild.kind) {
                            // Found a match.  merge them.
                            this.merge(targetChild, sourceChild);
                            continue outer;
                        }
                    }

                    // Didn't find a match, just add this child to the list.
                    target.childItems.push(sourceChild);
                }
            }
        }

        private getNavigationBarItem(text: string, kind: string, kindModifiers: string, spans: TypeScript.TextSpan[], childItems: ts.NavigationBarItem[]= [], indent: number = 0): ts.NavigationBarItem {
            return {
                text: text,
                kind: kind,
                kindModifiers: kindModifiers,
                spans: spans,
                childItems: childItems,
                indent: indent,
                bolded: false,
                grayed: false
            };
        }

        private createChildItem(node: ISyntaxNode): ts.NavigationBarItem {
            switch (node.kind()) {
                case SyntaxKind.Parameter:
                    var parameter = <ParameterSyntax>node;
                    if (parameter.modifiers.length === 0) {
                        return null;
                    }
                    return this.getNavigationBarItem(parameter.identifier.text(), ts.ScriptElementKind.memberVariableElement, this.getKindModifiers(parameter.modifiers), [TextSpan.fromBounds(start(node), end(node))]);

                case SyntaxKind.MemberFunctionDeclaration:
                    var memberFunction = <MemberFunctionDeclarationSyntax>node;
                    return this.getNavigationBarItem(memberFunction.propertyName.text(), ts.ScriptElementKind.memberFunctionElement, this.getKindModifiers(memberFunction.modifiers), [TextSpan.fromBounds(start(node), end(node))]);

                case SyntaxKind.GetAccessor:
                    var getAccessor = <GetAccessorSyntax>node;
                    return this.getNavigationBarItem(getAccessor.propertyName.text(), ts.ScriptElementKind.memberGetAccessorElement, this.getKindModifiers(getAccessor.modifiers), [TextSpan.fromBounds(start(node), end(node))]);

                case SyntaxKind.SetAccessor:
                    var setAccessor = <SetAccessorSyntax>node;
                    return this.getNavigationBarItem(setAccessor.propertyName.text(), ts.ScriptElementKind.memberSetAccessorElement, this.getKindModifiers(setAccessor.modifiers), [TextSpan.fromBounds(start(node), end(node))]);

                case SyntaxKind.IndexSignature:
                    var indexSignature = <IndexSignatureSyntax>node;
                    return this.getNavigationBarItem("[]", ts.ScriptElementKind.indexSignatureElement, ts.ScriptElementKindModifier.none, [TextSpan.fromBounds(start(node), end(node))]);

                case SyntaxKind.EnumElement:
                    var enumElement = <EnumElementSyntax>node;
                    return this.getNavigationBarItem(enumElement.propertyName.text(), ts.ScriptElementKind.memberVariableElement, ts.ScriptElementKindModifier.none, [TextSpan.fromBounds(start(node), end(node))]);

                case SyntaxKind.CallSignature:
                    var callSignature = <CallSignatureSyntax>node;
                    return this.getNavigationBarItem("()", ts.ScriptElementKind.callSignatureElement, ts.ScriptElementKindModifier.none, [TextSpan.fromBounds(start(node), end(node))]);

                case SyntaxKind.ConstructSignature:
                    var constructSignature = <ConstructSignatureSyntax>node;
                    return this.getNavigationBarItem("new()", ts.ScriptElementKind.constructSignatureElement, ts.ScriptElementKindModifier.none, [TextSpan.fromBounds(start(node), end(node))]);

                case SyntaxKind.MethodSignature:
                    var methodSignature = <MethodSignatureSyntax>node;
                    return this.getNavigationBarItem(methodSignature.propertyName.text(), ts.ScriptElementKind.memberFunctionElement, ts.ScriptElementKindModifier.none, [TextSpan.fromBounds(start(node), end(node))]);

                case SyntaxKind.PropertySignature:
                    var propertySignature = <PropertySignatureSyntax>node;
                    return this.getNavigationBarItem(propertySignature.propertyName.text(), ts.ScriptElementKind.memberVariableElement, ts.ScriptElementKindModifier.none, [TextSpan.fromBounds(start(node), end(node))]);

                case SyntaxKind.FunctionDeclaration:
                    var functionDeclaration = <FunctionDeclarationSyntax>node;
                    if (!this.isTopLevelFunctionDeclaration(functionDeclaration)) {
                        return this.getNavigationBarItem(functionDeclaration.identifier.text(), ts.ScriptElementKind.functionElement, this.getKindModifiers(functionDeclaration.modifiers), [TextSpan.fromBounds(start(node), end(node))]);
                    }
                    break;

                case SyntaxKind.MemberVariableDeclaration:
                    var memberVariableDeclaration = <MemberVariableDeclarationSyntax>node;
                    return this.getNavigationBarItem(memberVariableDeclaration.variableDeclarator.propertyName.text(), ts.ScriptElementKind.memberVariableElement, this.getKindModifiers(memberVariableDeclaration.modifiers), [TextSpan.fromBounds(start(memberVariableDeclaration.variableDeclarator), end(memberVariableDeclaration.variableDeclarator))]);

                case SyntaxKind.VariableDeclarator:
                    var variableDeclarator = <VariableDeclaratorSyntax>node;
                    return this.getNavigationBarItem(variableDeclarator.propertyName.text(), ts.ScriptElementKind.variableElement, ts.ScriptElementKindModifier.none, [TextSpan.fromBounds(start(variableDeclarator), end(variableDeclarator))]);

                case SyntaxKind.ConstructorDeclaration:
                    var constructorDeclaration = <ConstructorDeclarationSyntax>node;
                    return this.getNavigationBarItem("constructor", ts.ScriptElementKind.constructorImplementationElement, ts.ScriptElementKindModifier.none, [TextSpan.fromBounds(start(node), end(node))]);
            }

            return null;
        }

        private createTopLevelItem(node: ISyntaxNode): ts.NavigationBarItem {
            switch (node.kind()) {
                case SyntaxKind.SourceUnit:
                    return this.createSourceUnitItem(<SourceUnitSyntax>node);

                case SyntaxKind.ClassDeclaration:
                    return this.createClassItem(<ClassDeclarationSyntax>node);

                case SyntaxKind.EnumDeclaration:
                    return this.createEnumItem(<EnumDeclarationSyntax>node);

                case SyntaxKind.InterfaceDeclaration:
                    return this.createIterfaceItem(<InterfaceDeclarationSyntax>node);

                case SyntaxKind.ModuleDeclaration:
                    return this.createModuleItem(<ModuleDeclarationSyntax>node);

                case SyntaxKind.FunctionDeclaration:
                    return this.createFunctionItem(<FunctionDeclarationSyntax>node);
            }

            return null;
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

        private createModuleItem(node: ModuleDeclarationSyntax): ts.NavigationBarItem {
            var moduleNames = this.getModuleNames(node);

            var childItems = this.getItemsWorker(() => this.getChildNodes(node.moduleElements), n => this.createChildItem(n));

            return this.getNavigationBarItem(moduleNames.join("."),
                ts.ScriptElementKind.moduleElement,
                this.getKindModifiers(node.modifiers),
                [TextSpan.fromBounds(start(node), end(node))],
                childItems,
                this.getIndent(node));
        }

        private createFunctionItem(node: FunctionDeclarationSyntax) {
            var childItems = this.getItemsWorker(() => node.block.statements, n => this.createChildItem(n));

            return this.getNavigationBarItem(node.identifier.text(),
                ts.ScriptElementKind.functionElement,
                this.getKindModifiers(node.modifiers),
                [TextSpan.fromBounds(start(node), end(node))],
                childItems,
                this.getIndent(node));
        }

        private createSourceUnitItem(node: SourceUnitSyntax): ts.NavigationBarItem {
            var childItems = this.getItemsWorker(() => this.getChildNodes(node.moduleElements), n => this.createChildItem(n));

            if (childItems === null || childItems.length === 0) {
                return null;
            }

            this.hasGlobalNode = true;
            return this.getNavigationBarItem("<global>",
                ts.ScriptElementKind.moduleElement,
                ts.ScriptElementKindModifier.none,
                [TextSpan.fromBounds(start(node), end(node))],
                childItems);
        }

        private createClassItem(node: ClassDeclarationSyntax): ts.NavigationBarItem {
            var constructor = <ConstructorDeclarationSyntax>ArrayUtilities.firstOrDefault(
                node.classElements, n => n.kind() === SyntaxKind.ConstructorDeclaration);

            // Add the constructor parameters in as children of hte class (for property parameters).
            var nodes: ISyntaxNode[] = constructor
                ? (<ISyntaxNode[]>constructor.callSignature.parameterList.parameters).concat(node.classElements)
                : node.classElements;

            var childItems = this.getItemsWorker(() => nodes, n => this.createChildItem(n));
            return this.getNavigationBarItem(
                node.identifier.text(),
                ts.ScriptElementKind.classElement,
                this.getKindModifiers(node.modifiers),
                [TextSpan.fromBounds(start(node), end(node))],
                childItems,
                this.getIndent(node));
        }

        private createEnumItem(node: TypeScript.EnumDeclarationSyntax): ts.NavigationBarItem {
            var childItems = this.getItemsWorker(() => node.enumElements, n => this.createChildItem(n));
            return this.getNavigationBarItem(
                node.identifier.text(),
                ts.ScriptElementKind.enumElement,
                this.getKindModifiers(node.modifiers),
                [TextSpan.fromBounds(start(node), end(node))],
                childItems,
                this.getIndent(node));
        }

        private createIterfaceItem(node: TypeScript.InterfaceDeclarationSyntax): ts.NavigationBarItem {
            var childItems = this.getItemsWorker(() => node.body.typeMembers, n => this.createChildItem(n));
            return this.getNavigationBarItem(
                node.identifier.text(),
                ts.ScriptElementKind.interfaceElement,
                this.getKindModifiers(node.modifiers),
                [TextSpan.fromBounds(start(node), end(node))],
                childItems,
                this.getIndent(node));
        }
    }
}