/// <reference path='services.ts' />

module ts.NavigationBar {
    export function getNavigationBarItems(sourceFile: SourceFile): ts.NavigationBarItem[]  {
        // If the source file has any child items, then it included in the tree
        // and takes lexical ownership of all other top-level items.
        var hasGlobalNode = false;

        return getItemsWorker(getTopLevelNodes(sourceFile), createTopLevelItem);

        function getIndent(node: Node): number {
            // If we have a global node in the tree,
            // then it adds an extra layer of depth to all subnodes.
            var indent = hasGlobalNode ? 1 : 0;

            var current = node.parent;
            while (current) {
                switch (current.kind) {
                    case SyntaxKind.ModuleDeclaration:
                        // If we have a module declared as A.B.C, it is more "intuitive"
                        // to say it only has a single layer of depth
                        do {
                            current = current.parent;
                        }
                        while (current.kind === SyntaxKind.ModuleDeclaration);

                        // fall through
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.EnumDeclaration:
                    case SyntaxKind.InterfaceDeclaration:
                    case SyntaxKind.FunctionDeclaration:
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

                if (node.kind === SyntaxKind.ClassDeclaration ||
                    node.kind === SyntaxKind.EnumDeclaration ||
                    node.kind === SyntaxKind.InterfaceDeclaration ||
                    node.kind === SyntaxKind.ModuleDeclaration ||
                    node.kind === SyntaxKind.FunctionDeclaration) {

                    childNodes.push(node);
                }
                else if (node.kind === SyntaxKind.VariableStatement) {
                    childNodes.push.apply(childNodes, (<VariableStatement>node).declarations);
                }
            }

            return sortNodes(childNodes);
        }

        function getTopLevelNodes(node: SourceFile): Node[] {
            var topLevelNodes: Node[] = [];
            topLevelNodes.push(node);

            addTopLevelNodes(node.statements, topLevelNodes);

            return topLevelNodes;
        }
         
        function sortNodes(nodes: Node[]): Node[] {
            return nodes.slice(0).sort((n1: Declaration, n2: Declaration) => {
                if (n1.name && n2.name) {
                    // TODO(jfreeman): How do we sort declarations with computed names?
                    return (<Identifier>n1.name).text.localeCompare((<Identifier>n2.name).text);
                }
                else if (n1.name) {
                    return 1;
                }
                else if (n2.name) {
                    return -1;
                }
                else {
                    return n1.kind - n2.kind;
                }
            });
        }
        
        function addTopLevelNodes(nodes: Node[], topLevelNodes: Node[]): void {
            nodes = sortNodes(nodes);

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
                        var functionDeclaration = <FunctionLikeDeclaration>node;
                        if (isTopLevelFunctionDeclaration(functionDeclaration)) {
                            topLevelNodes.push(node);
                            addTopLevelNodes((<Block>functionDeclaration.body).statements, topLevelNodes);
                        }
                        break;
                }
            }
        }

        function isTopLevelFunctionDeclaration(functionDeclaration: FunctionLikeDeclaration) {
            if (functionDeclaration.kind === SyntaxKind.FunctionDeclaration) {
                // A function declaration is 'top level' if it contains any function declarations 
                // within it. 
                if (functionDeclaration.body && functionDeclaration.body.kind === SyntaxKind.Block) {
                    // Proper function declarations can only have identifier names
                    if (forEach((<Block>functionDeclaration.body).statements,
                        s => s.kind === SyntaxKind.FunctionDeclaration && !isEmpty((<FunctionDeclaration>s).name.text))) {

                        return true;
                    }

                    // Or if it is not parented by another function.  i.e all functions
                    // at module scope are 'top level'.
                    if (!isFunctionBlock(functionDeclaration.parent)) {
                        return true;
                    }
                }
            }

            return false;
        }
        
        function getItemsWorker(nodes: Node[], createItem: (n: Node) => ts.NavigationBarItem): ts.NavigationBarItem[] {
            var items: ts.NavigationBarItem[] = [];

            var keyToItem: Map<NavigationBarItem> = {};

            for (var i = 0, n = nodes.length; i < n; i++) {
                var child = nodes[i];
                var item = createItem(child);
                if (item !== undefined) {
                    if (item.text.length > 0) {
                        var key = item.text + "-" + item.kind + "-" + item.indent;

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
                    if ((node.flags & NodeFlags.Modifier) === 0) {
                        return undefined;
                    }
                    return createItem(node, getTextOfNode((<ParameterDeclaration>node).name), ts.ScriptElementKind.memberVariableElement);

                case SyntaxKind.Method:
                    return createItem(node, getTextOfNode((<MethodDeclaration>node).name), ts.ScriptElementKind.memberFunctionElement);

                case SyntaxKind.GetAccessor:
                    return createItem(node, getTextOfNode((<AccessorDeclaration>node).name), ts.ScriptElementKind.memberGetAccessorElement);

                case SyntaxKind.SetAccessor:
                    return createItem(node, getTextOfNode((<AccessorDeclaration>node).name), ts.ScriptElementKind.memberSetAccessorElement);

                case SyntaxKind.IndexSignature:
                    return createItem(node, "[]", ts.ScriptElementKind.indexSignatureElement);

                case SyntaxKind.EnumMember:
                    return createItem(node, getTextOfNode((<EnumMember>node).name), ts.ScriptElementKind.memberVariableElement);

                case SyntaxKind.CallSignature:
                    return createItem(node, "()", ts.ScriptElementKind.callSignatureElement);

                case SyntaxKind.ConstructSignature:
                    return createItem(node, "new()", ts.ScriptElementKind.constructSignatureElement);

                case SyntaxKind.Property:
                    return createItem(node, getTextOfNode((<PropertyDeclaration>node).name), ts.ScriptElementKind.memberVariableElement);

                case SyntaxKind.FunctionDeclaration:
                    return createItem(node, getTextOfNode((<FunctionLikeDeclaration>node).name), ts.ScriptElementKind.functionElement);

                case SyntaxKind.VariableDeclaration:
                    if (isConst(node)) {
                        return createItem(node, getTextOfNode((<VariableDeclaration>node).name), ts.ScriptElementKind.constElement);
                    }
                    else if (isLet(node)) {
                        return createItem(node, getTextOfNode((<VariableDeclaration>node).name), ts.ScriptElementKind.letElement);
                    }
                    else {
                        return createItem(node, getTextOfNode((<VariableDeclaration>node).name), ts.ScriptElementKind.variableElement);
                    }
                
                case SyntaxKind.Constructor:
                    return createItem(node, "constructor", ts.ScriptElementKind.constructorImplementationElement);
            }

            return undefined;

            function createItem(node: Node, name: string, scriptElementKind: string): NavigationBarItem {
                return getNavigationBarItem(name, scriptElementKind, getNodeModifiers(node), [getNodeSpan(node)]);
            }
        }

        function isEmpty(text: string) {
            return !text || text.trim() === "";
        }

        function getNavigationBarItem(text: string, kind: string, kindModifiers: string, spans: TextSpan[], childItems: NavigationBarItem[] = [], indent: number = 0): NavigationBarItem {
            if (isEmpty(text)) {
                return undefined;
            }

            return {
                text,
                kind,
                kindModifiers,
                spans,
                childItems,
                indent,
                bolded: false,
                grayed: false
            };
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
                    return getTextOfNode(moduleDeclaration.name);
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

                return getNavigationBarItem(moduleName,
                    ts.ScriptElementKind.moduleElement,
                    getNodeModifiers(node),
                    [getNodeSpan(node)],
                    childItems,
                    getIndent(node));
            }

            function createFunctionItem(node: FunctionDeclaration) {
                if (node.name && node.body && node.body.kind === SyntaxKind.Block) {
                    var childItems = getItemsWorker(sortNodes((<Block>node.body).statements), createChildItem);

                    return getNavigationBarItem(node.name.text,
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

                return getNavigationBarItem(rootName,
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
                    // Note that *all* parameters will be added to the nodes array, but parameters that
                    // are not properties will be filtered out later by createChildItem.
                    var nodes: Node[] = removeComputedProperties(node);
                    if (constructor) {
                        nodes.push.apply(nodes, constructor.parameters);
                    }

                    var childItems = getItemsWorker(sortNodes(nodes), createChildItem);
                }

                return getNavigationBarItem(
                    node.name.text,
                    ts.ScriptElementKind.classElement,
                    getNodeModifiers(node),
                    [getNodeSpan(node)],
                    childItems,
                    getIndent(node));
            }

            function createEnumItem(node: EnumDeclaration): ts.NavigationBarItem {
                var childItems = getItemsWorker(sortNodes(removeComputedProperties(node)), createChildItem);
                return getNavigationBarItem(
                    node.name.text,
                    ts.ScriptElementKind.enumElement,
                    getNodeModifiers(node),
                    [getNodeSpan(node)],
                    childItems,
                    getIndent(node));
            }

            function createIterfaceItem(node: InterfaceDeclaration): ts.NavigationBarItem {
                var childItems = getItemsWorker(sortNodes(removeComputedProperties(node)), createChildItem);
                return getNavigationBarItem(
                    node.name.text,
                    ts.ScriptElementKind.interfaceElement,
                    getNodeModifiers(node),
                    [getNodeSpan(node)],
                    childItems,
                    getIndent(node));
            }
        }

        function removeComputedProperties(node: ClassDeclaration | InterfaceDeclaration | EnumDeclaration): Declaration[] {
            return filter<Declaration>(node.members, member => member.name === undefined || member.name.kind !== SyntaxKind.ComputedPropertyName);
        }

        function getInnermostModule(node: ModuleDeclaration): ModuleDeclaration {
            while (node.body.kind === SyntaxKind.ModuleDeclaration) {
                node = <ModuleDeclaration>node.body;
            }

            return node;
        }

        function getNodeSpan(node: Node) {
            return node.kind === SyntaxKind.SourceFile
                ? TextSpan.fromBounds(node.getFullStart(), node.getEnd())
                : TextSpan.fromBounds(node.getStart(), node.getEnd());
        }

        function getTextOfNode(node: Node): string {
            return getTextOfNodeFromSourceText(sourceFile.text, node);
        }
    }
}