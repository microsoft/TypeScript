///<reference path='references.ts' />

module ts {
    export function getNavigationBarItemsHelper(sourceFile: SourceFile): ts.NavigationBarItem[]  {
        var hasGlobalNode = false;

        return getItemsWorker(getTopLevelNodes(sourceFile), createTopLevelItem);

        function getIndent(node: Node): number {
            var indent = hasGlobalNode ? 1 : 0;

            var current = node.parent;
            while (current) {
                if (current.kind === SyntaxKind.ModuleDeclaration || current.kind === SyntaxKind.FunctionDeclaration) {
                    indent++;
                }

                current = current.parent;
            }

            return indent;
        }

        function getChildNodes(nodes: Node[]): Node[] {
            var childNodes: Node[] = [];    

            for (var i = 0, n = nodes.length; i < n; i++) {
                var node = nodes[i];

                if (node.kind === SyntaxKind.FunctionDeclaration) {
                    childNodes.push(node);
                }
                else if (node.kind === SyntaxKind.VariableStatement) {
                    childNodes.push.apply(childNodes, (<VariableStatement>node).declarations);
                }
            }

            return childNodes;
        }

        function getTopLevelNodes(node: SourceFile): Node[] {
            var topLevelNodes: Node[] = [];
            topLevelNodes.push(node);

            addTopLevelNodes(node.statements, topLevelNodes);

            return topLevelNodes;
        }

        function addTopLevelNodes(nodes: Node[], topLevelNodes: Node[]): void {
            for (var i = 0, n = nodes.length; i < n; i++) {
                var node = nodes[i];
                switch (node.kind) {
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.EnumDeclaration:
                    case SyntaxKind.InterfaceDeclaration:
                        topLevelNodes.push(node);
                        break;

                    case SyntaxKind.ModuleDeclaration:
                        var moduleDeclaration = <ModuleDeclaration>node;
                        topLevelNodes.push(node);
                        addTopLevelNodes((<Block>getInnermostModule(moduleDeclaration).body).statements, topLevelNodes);
                        break;

                    case SyntaxKind.FunctionDeclaration:
                        var functionDeclaration = <FunctionDeclaration>node;
                        if (isTopLevelFunctionDeclaration(functionDeclaration)) {
                            topLevelNodes.push(node);
                            addTopLevelNodes((<Block>functionDeclaration.body).statements, topLevelNodes);
                        }
                        break;
                }
            }
        }

        function isTopLevelFunctionDeclaration(functionDeclaration: FunctionDeclaration) {
            // A function declaration is 'top level' if it contains any function declarations 
            // within it.
            return functionDeclaration.kind === SyntaxKind.FunctionDeclaration &&
               functionDeclaration.body &&
               functionDeclaration.body.kind === SyntaxKind.FunctionBlock &&
               forEach((<Block>functionDeclaration.body).statements, s => s.kind === SyntaxKind.FunctionDeclaration);
        }

        function getItemsWorker(nodes: Node[], createItem: (n: Node) => ts.NavigationBarItem): ts.NavigationBarItem[] {
            var items: ts.NavigationBarItem[] = [];

            var keyToItem: Map<NavigationBarItem> = {};

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

        function createChildItem(node: Node): ts.NavigationBarItem {
            switch (node.kind) {
                case SyntaxKind.Parameter:
                    var parameter = <ParameterDeclaration>node;
                    if ((node.flags & NodeFlags.Modifier) === 0) {
                        return undefined;
                    }
                    return basicChildItem(node, getSourceText(parameter.name), ts.ScriptElementKind.memberVariableElement);

                case SyntaxKind.Method:
                    var method = <MethodDeclaration>node;
                    return basicChildItem(node, getSourceText(method.name), ts.ScriptElementKind.memberFunctionElement);

                case SyntaxKind.GetAccessor:
                    var getAccessor = <AccessorDeclaration>node;
                    return basicChildItem(node, getSourceText(getAccessor.name), ts.ScriptElementKind.memberGetAccessorElement);

                case SyntaxKind.SetAccessor:
                    var setAccessor = <AccessorDeclaration>node;
                    return basicChildItem(node, getSourceText(setAccessor.name), ts.ScriptElementKind.memberSetAccessorElement);

                case SyntaxKind.IndexSignature:
                    return basicChildItem(node, "[]", ts.ScriptElementKind.indexSignatureElement);

                case SyntaxKind.EnumMember:
                    var enumMember = <EnumMember>node;
                    return basicChildItem(node, getSourceText(enumMember.name), ts.ScriptElementKind.memberVariableElement);

                case SyntaxKind.CallSignature:
                    return basicChildItem(node, "()", ts.ScriptElementKind.callSignatureElement);

                case SyntaxKind.ConstructSignature:
                    return basicChildItem(node, "new()", ts.ScriptElementKind.constructSignatureElement);

                case SyntaxKind.Property:
                    var property = <PropertyDeclaration>node;
                    return basicChildItem(node, getSourceText(property.name), ts.ScriptElementKind.memberVariableElement);

                case SyntaxKind.FunctionDeclaration:
                    var functionDeclaration = <FunctionDeclaration>node;
                    if (!isTopLevelFunctionDeclaration(functionDeclaration)) {
                        return basicChildItem(node, getSourceText(functionDeclaration.name), ts.ScriptElementKind.functionElement);
                    }
                    break;

                case SyntaxKind.VariableDeclaration:
                    var variableDeclaration = <VariableDeclaration>node;
                    return basicChildItem(node, getSourceText(variableDeclaration.name), ts.ScriptElementKind.variableElement);
                
                case SyntaxKind.Constructor:
                    return basicChildItem(node, "constructor", ts.ScriptElementKind.constructorImplementationElement);
            }

            return undefined;
        }

        function basicChildItem(node: Node, name: string, scriptElementKind: string): NavigationBarItem {
            return new NavigationBarItem(name, scriptElementKind, getNodeModifiers(node), [getNodeSpan(node)]);
        }

        function createTopLevelItem(node: Node): ts.NavigationBarItem {
            switch (node.kind) {
                case SyntaxKind.SourceFile:
                    return createSourceFileItem(<SourceFile>node);

                case SyntaxKind.ClassDeclaration:
                    return createClassItem(<ClassDeclaration>node);

                case SyntaxKind.EnumDeclaration:
                    return createEnumItem(<EnumDeclaration>node);

                case SyntaxKind.InterfaceDeclaration:
                    return createIterfaceItem(<InterfaceDeclaration>node);

                case SyntaxKind.ModuleDeclaration:
                    return createModuleItem(<ModuleDeclaration>node);

                case SyntaxKind.FunctionDeclaration:
                    return createFunctionItem(<FunctionDeclaration>node);
            }

            return undefined;

            function getModuleName(moduleDeclaration: ModuleDeclaration): string {
                // We want to maintain quotation marks.
                if (moduleDeclaration.name.kind === SyntaxKind.StringLiteral) {
                    return getSourceText(moduleDeclaration.name);
                }

                // Otherwise, we need to aggregate each identifier to build up the qualified name.
                var result: string[] = [];

                result.push(moduleDeclaration.name.text);
                
                while (moduleDeclaration.body && moduleDeclaration.body.kind === SyntaxKind.ModuleDeclaration) {
                    moduleDeclaration = <ModuleDeclaration>moduleDeclaration.body;

                    result.push(moduleDeclaration.name.text);
                } 

                return result.join(".");
            }

            function createModuleItem(node: ModuleDeclaration): NavigationBarItem {
                var moduleName = getModuleName(node);
                
                var childItems = getItemsWorker(getChildNodes((<Block>getInnermostModule(node).body).statements), createChildItem);

                return new ts.NavigationBarItem(moduleName,
                    ts.ScriptElementKind.moduleElement,
                    getNodeModifiers(node),
                    [getNodeSpan(node)],
                    childItems,
                    getIndent(node));
            }

            function createFunctionItem(node: FunctionDeclaration) {
                if (node.name && node.body && node.body.kind === SyntaxKind.FunctionBlock) {
                    var childItems = getItemsWorker((<Block>node.body).statements, createChildItem);

                    return new ts.NavigationBarItem(node.name.text,
                        ts.ScriptElementKind.functionElement,
                        getNodeModifiers(node),
                        [getNodeSpan(node)],
                        childItems,
                        getIndent(node));
                }

                return undefined;
            }

            function createSourceFileItem(node: SourceFile): ts.NavigationBarItem {
                var childItems = getItemsWorker(getChildNodes(node.statements), createChildItem);

                if (childItems === undefined || childItems.length === 0) {
                    return undefined;
                }

                hasGlobalNode = true;
                var rootName = isExternalModule(node) ?
                    "\"" + escapeString(getBaseFilename(removeFileExtension(normalizePath(node.filename)))) + "\"" :
                    "<global>"

                return new ts.NavigationBarItem(rootName,
                    ts.ScriptElementKind.moduleElement,
                    ts.ScriptElementKindModifier.none,
                    [getNodeSpan(node)],
                    childItems);
            }

            function createClassItem(node: ClassDeclaration): ts.NavigationBarItem {
                var childItems: NavigationBarItem[];

                if (node.members) {
                    var constructor = <ConstructorDeclaration>forEach(node.members, member => {
                        return member.kind === SyntaxKind.Constructor && member;
                    });

                    // Add the constructor parameters in as children of the class (for property parameters).
                    var nodes: Node[] = constructor
                        ? constructor.parameters.concat(node.members)
                        : node.members;

                    var childItems = getItemsWorker(nodes, createChildItem);
                }

                return new ts.NavigationBarItem(
                    node.name.text,
                    ts.ScriptElementKind.classElement,
                    getNodeModifiers(node),
                    [getNodeSpan(node)],
                    childItems,
                    getIndent(node));
            }

            function createEnumItem(node: EnumDeclaration): ts.NavigationBarItem {
                var childItems = getItemsWorker(node.members, createChildItem);
                return new ts.NavigationBarItem(
                    node.name.text,
                    ts.ScriptElementKind.enumElement,
                    getNodeModifiers(node),
                    [getNodeSpan(node)],
                    childItems,
                    getIndent(node));
            }

            function createIterfaceItem(node: InterfaceDeclaration): ts.NavigationBarItem {
                var childItems = getItemsWorker(node.members, createChildItem);
                return new ts.NavigationBarItem(
                    node.name.text,
                    ts.ScriptElementKind.interfaceElement,
                    getNodeModifiers(node),
                    [getNodeSpan(node)],
                    childItems,
                    getIndent(node));
            }
        }

        function getInnermostModule(node: ModuleDeclaration): ModuleDeclaration {
            while (node.body.kind === SyntaxKind.ModuleDeclaration) {
                node = <ModuleDeclaration>node.body;
            }

            return node;
        }

        function getNodeSpan(node: Node) {
            return TypeScript.TextSpan.fromBounds(node.getStart(), node.getEnd());
        }

        function getSourceText(node: Node): string {
            return getSourceTextOfNodeFromSourceText(sourceFile.text, node);
        }
    }
}