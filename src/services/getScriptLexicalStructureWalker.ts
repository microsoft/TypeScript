///<reference path='references.ts' />

module TypeScript.Services {
    export function getNavigationBarItemsHelper(sourceUnit: TypeScript.SourceUnitSyntax): ts.NavigationBarItem[]  {
        var hasGlobalNode = false;

        return getItemsWorker(getTopLevelNodes(sourceUnit), createTopLevelItem);

        function getIndent(node: ISyntaxNode): number {
            var indent = hasGlobalNode ? 1 : 0;

            var current = node.parent;
            while (current) {
                if (current.kind() === SyntaxKind.ModuleDeclaration || current.kind() === SyntaxKind.FunctionDeclaration) {
                    indent++;
                }

                current = current.parent;
            }

            return indent;
        }

        function getKindModifiers(modifiers: TypeScript.ISyntaxToken[]): string {
            var result: string[] = [];

            for (var i = 0, n = modifiers.length; i < n; i++) {
                result.push(modifiers[i].text());
            }

            return result.length > 0 ? result.join(',') : ts.ScriptElementKindModifier.none;
        }

        function getChildNodes(nodes: IModuleElementSyntax[]): ISyntaxNode[] {
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

        function getTopLevelNodes(node: SourceUnitSyntax): ISyntaxNode[] {
            var topLevelNodes: ISyntaxNode[] = [];
            topLevelNodes.push(node);

            addTopLevelNodes(node.moduleElements, topLevelNodes);

            return topLevelNodes;
        }

        function addTopLevelNodes(nodes: IModuleElementSyntax[], topLevelNodes: ISyntaxNode[]): void {
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
                        addTopLevelNodes(moduleDeclaration.moduleElements, topLevelNodes);
                        break;

                    case SyntaxKind.FunctionDeclaration:
                        var functionDeclaration = <FunctionDeclarationSyntax>node;
                        if (isTopLevelFunctionDeclaration(functionDeclaration)) {
                            topLevelNodes.push(node);
                            addTopLevelNodes(functionDeclaration.block.statements, topLevelNodes);
                        }
                        break;
                }
            }
        }

        function isTopLevelFunctionDeclaration(functionDeclaration: FunctionDeclarationSyntax) {
            // A function declaration is 'top level' if it contains any function declarations 
            // within it.
            return functionDeclaration.block && ArrayUtilities.any(functionDeclaration.block.statements, s => s.kind() === SyntaxKind.FunctionDeclaration);
        }

        function getItemsWorker(nodes: ISyntaxNode[], createItem: (n: ISyntaxNode) => ts.NavigationBarItem): ts.NavigationBarItem[] {
            var items: ts.NavigationBarItem[] = [];

            var keyToItem = createIntrinsicsObject<ts.NavigationBarItem>();

            for (var i = 0, n = nodes.length; i < n; i++) {
                var child = nodes[i];
                var item = createItem(child);
                if (item !== undefined) {
                    if (item.text.length > 0) {
                        var key = item.text + "-" + item.kind;

                        var itemWithSameName = keyToItem[key];
                        if (itemWithSameName) {
                            // We had an item with the same name.  Merge these items together.
                            merge(itemWithSameName, item);
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

        function merge(target: ts.NavigationBarItem, source: ts.NavigationBarItem) {
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
                            merge(targetChild, sourceChild);
                            continue outer;
                        }
                    }

                    // Didn't find a match, just add this child to the list.
                    target.childItems.push(sourceChild);
                }
            }
        }

        function createChildItem(node: ISyntaxNode): ts.NavigationBarItem {
            switch (node.kind()) {
                case SyntaxKind.Parameter:
                    var parameter = <ParameterSyntax>node;
                    if (parameter.modifiers.length === 0) {
                        return undefined;
                    }
                    return new ts.NavigationBarItem(parameter.identifier.text(), ts.ScriptElementKind.memberVariableElement, getKindModifiers(parameter.modifiers), [TextSpan.fromBounds(start(node), end(node))]);

                case SyntaxKind.MemberFunctionDeclaration:
                    var memberFunction = <MemberFunctionDeclarationSyntax>node;
                    return new ts.NavigationBarItem(memberFunction.propertyName.text(), ts.ScriptElementKind.memberFunctionElement, getKindModifiers(memberFunction.modifiers), [TextSpan.fromBounds(start(node), end(node))]);

                case SyntaxKind.GetAccessor:
                    var getAccessor = <GetAccessorSyntax>node;
                    return new ts.NavigationBarItem(getAccessor.propertyName.text(), ts.ScriptElementKind.memberGetAccessorElement, getKindModifiers(getAccessor.modifiers), [TextSpan.fromBounds(start(node), end(node))]);

                case SyntaxKind.SetAccessor:
                    var setAccessor = <SetAccessorSyntax>node;
                    return new ts.NavigationBarItem(setAccessor.propertyName.text(), ts.ScriptElementKind.memberSetAccessorElement, getKindModifiers(setAccessor.modifiers), [TextSpan.fromBounds(start(node), end(node))]);

                case SyntaxKind.IndexSignature:
                    var indexSignature = <IndexSignatureSyntax>node;
                    return new ts.NavigationBarItem("[]", ts.ScriptElementKind.indexSignatureElement, ts.ScriptElementKindModifier.none, [TextSpan.fromBounds(start(node), end(node))]);

                case SyntaxKind.EnumElement:
                    var enumElement = <EnumElementSyntax>node;
                    return new ts.NavigationBarItem(enumElement.propertyName.text(), ts.ScriptElementKind.memberVariableElement, ts.ScriptElementKindModifier.none, [TextSpan.fromBounds(start(node), end(node))]);

                case SyntaxKind.CallSignature:
                    var callSignature = <CallSignatureSyntax>node;
                    return new ts.NavigationBarItem("()", ts.ScriptElementKind.callSignatureElement, ts.ScriptElementKindModifier.none, [TextSpan.fromBounds(start(node), end(node))]);

                case SyntaxKind.ConstructSignature:
                    var constructSignature = <ConstructSignatureSyntax>node;
                    return new ts.NavigationBarItem("new()", ts.ScriptElementKind.constructSignatureElement, ts.ScriptElementKindModifier.none, [TextSpan.fromBounds(start(node), end(node))]);

                case SyntaxKind.MethodSignature:
                    var methodSignature = <MethodSignatureSyntax>node;
                    return new ts.NavigationBarItem(methodSignature.propertyName.text(), ts.ScriptElementKind.memberFunctionElement, ts.ScriptElementKindModifier.none, [TextSpan.fromBounds(start(node), end(node))]);

                case SyntaxKind.PropertySignature:
                    var propertySignature = <PropertySignatureSyntax>node;
                    return new ts.NavigationBarItem(propertySignature.propertyName.text(), ts.ScriptElementKind.memberVariableElement, ts.ScriptElementKindModifier.none, [TextSpan.fromBounds(start(node), end(node))]);

                case SyntaxKind.FunctionDeclaration:
                    var functionDeclaration = <FunctionDeclarationSyntax>node;
                    if (!isTopLevelFunctionDeclaration(functionDeclaration)) {
                        return new ts.NavigationBarItem(functionDeclaration.identifier.text(), ts.ScriptElementKind.functionElement, getKindModifiers(functionDeclaration.modifiers), [TextSpan.fromBounds(start(node), end(node))]);
                    }
                    break;

                case SyntaxKind.MemberVariableDeclaration:
                    var memberVariableDeclaration = <MemberVariableDeclarationSyntax>node;
                    return new ts.NavigationBarItem(memberVariableDeclaration.variableDeclarator.propertyName.text(), ts.ScriptElementKind.memberVariableElement, getKindModifiers(memberVariableDeclaration.modifiers), [TextSpan.fromBounds(start(memberVariableDeclaration.variableDeclarator), end(memberVariableDeclaration.variableDeclarator))]);

                case SyntaxKind.VariableDeclarator:
                    var variableDeclarator = <VariableDeclaratorSyntax>node;
                    return new ts.NavigationBarItem(variableDeclarator.propertyName.text(), ts.ScriptElementKind.variableElement, ts.ScriptElementKindModifier.none, [TextSpan.fromBounds(start(variableDeclarator), end(variableDeclarator))]);

                case SyntaxKind.ConstructorDeclaration:
                    var constructorDeclaration = <ConstructorDeclarationSyntax>node;
                    return new ts.NavigationBarItem("constructor", ts.ScriptElementKind.constructorImplementationElement, ts.ScriptElementKindModifier.none, [TextSpan.fromBounds(start(node), end(node))]);
            }

            return undefined;
        }

        function createTopLevelItem(node: ISyntaxNode): ts.NavigationBarItem {
            switch (node.kind()) {
                case SyntaxKind.SourceUnit:
                    return createSourceUnitItem(<SourceUnitSyntax>node);

                case SyntaxKind.ClassDeclaration:
                    return createClassItem(<ClassDeclarationSyntax>node);

                case SyntaxKind.EnumDeclaration:
                    return createEnumItem(<EnumDeclarationSyntax>node);

                case SyntaxKind.InterfaceDeclaration:
                    return createIterfaceItem(<InterfaceDeclarationSyntax>node);

                case SyntaxKind.ModuleDeclaration:
                    return createModuleItem(<ModuleDeclarationSyntax>node);

                case SyntaxKind.FunctionDeclaration:
                    return createFunctionItem(<FunctionDeclarationSyntax>node);
            }

            return undefined;

            function getModuleNames(node: TypeScript.ModuleDeclarationSyntax): string[] {
                var result: string[] = [];

                if (node.stringLiteral) {
                    result.push(node.stringLiteral.text());
                }
                else {
                    getModuleNamesHelper(node.name, result);
                }

                return result;
            }

            function getModuleNamesHelper(name: TypeScript.INameSyntax, result: string[]): void {
                if (name.kind() === TypeScript.SyntaxKind.QualifiedName) {
                    var qualifiedName = <TypeScript.QualifiedNameSyntax>name;
                    getModuleNamesHelper(qualifiedName.left, result);
                    result.push(qualifiedName.right.text());
                }
                else {
                    result.push((<TypeScript.ISyntaxToken>name).text());
                }
            }

            function createModuleItem(node: ModuleDeclarationSyntax): ts.NavigationBarItem {
                var moduleNames = getModuleNames(node);

                var childItems = getItemsWorker(getChildNodes(node.moduleElements), n => createChildItem(n));

                return new ts.NavigationBarItem(moduleNames.join("."),
                    ts.ScriptElementKind.moduleElement,
                    getKindModifiers(node.modifiers),
                    [TextSpan.fromBounds(start(node), end(node))],
                    childItems,
                    getIndent(node));
            }

            function createFunctionItem(node: FunctionDeclarationSyntax) {
                var childItems = getItemsWorker(node.block.statements, n => createChildItem(n));

                return new ts.NavigationBarItem(node.identifier.text(),
                    ts.ScriptElementKind.functionElement,
                    getKindModifiers(node.modifiers),
                    [TextSpan.fromBounds(start(node), end(node))],
                    childItems,
                    getIndent(node));
            }

            function createSourceUnitItem(node: SourceUnitSyntax): ts.NavigationBarItem {
                var childItems = getItemsWorker(getChildNodes(node.moduleElements), n => createChildItem(n));

                if (childItems === undefined || childItems.length === 0) {
                    return undefined;
                }

                hasGlobalNode = true;
                return new ts.NavigationBarItem("<global>",
                    ts.ScriptElementKind.moduleElement,
                    ts.ScriptElementKindModifier.none,
                    [TextSpan.fromBounds(start(node), end(node))],
                    childItems);
            }

            function createClassItem(node: ClassDeclarationSyntax): ts.NavigationBarItem {
                var constructor = <ConstructorDeclarationSyntax>ArrayUtilities.firstOrDefault(
                    node.classElements, n => n.kind() === SyntaxKind.ConstructorDeclaration);

                // Add the constructor parameters in as children of the class (for property parameters).
                var nodes: ISyntaxNode[] = constructor
                    ? (<ISyntaxNode[]>constructor.callSignature.parameterList.parameters).concat(node.classElements)
                    : node.classElements;

                var childItems = getItemsWorker(nodes, n => createChildItem(n));
                return new ts.NavigationBarItem(
                    node.identifier.text(),
                    ts.ScriptElementKind.classElement,
                    getKindModifiers(node.modifiers),
                    [TextSpan.fromBounds(start(node), end(node))],
                    childItems,
                    getIndent(node));
            }

            function createEnumItem(node: TypeScript.EnumDeclarationSyntax): ts.NavigationBarItem {
                var childItems = getItemsWorker(node.enumElements, n => createChildItem(n));
                return new ts.NavigationBarItem(
                    node.identifier.text(),
                    ts.ScriptElementKind.enumElement,
                    getKindModifiers(node.modifiers),
                    [TextSpan.fromBounds(start(node), end(node))],
                    childItems,
                    getIndent(node));
            }

            function createIterfaceItem(node: TypeScript.InterfaceDeclarationSyntax): ts.NavigationBarItem {
                var childItems = getItemsWorker(node.body.typeMembers, n => createChildItem(n));
                return new ts.NavigationBarItem(
                    node.identifier.text(),
                    ts.ScriptElementKind.interfaceElement,
                    getKindModifiers(node.modifiers),
                    [TextSpan.fromBounds(start(node), end(node))],
                    childItems,
                    getIndent(node));
            }
        }
    }
}