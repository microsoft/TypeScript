/// <reference path='services.ts' />

/* @internal */
namespace ts.NavigationBar {
    export function getNavigationBarItems(sourceFile: SourceFile, compilerOptions: CompilerOptions): ts.NavigationBarItem[]  {
        // TODO: Handle JS files differently in 'navbar' calls for now, but ideally we should unify
        // the 'navbar' and 'navto' logic for TypeScript and JavaScript.
        if (isSourceFileJavaScript(sourceFile)) {
            return getJsNavigationBarItems(sourceFile, compilerOptions);
        }

        return getItemsWorker(getTopLevelNodes(sourceFile), createTopLevelItem);

        function getIndent(node: Node): number {
            let indent = 1; // Global node is the only one with indent 0.

            let current = node.parent;
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
                    case SyntaxKind.ClassExpression:
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.EnumDeclaration:
                    case SyntaxKind.InterfaceDeclaration:
                    case SyntaxKind.ArrowFunction:
                    case SyntaxKind.FunctionExpression:
                    case SyntaxKind.FunctionDeclaration:
                        indent++;
                }

                current = current.parent;
            }

            return indent;
        }

        function getChildNodes(nodes: Node[]): Node[] {
            const childNodes: Node[] = [];

            function visit(node: Node) {
                switch (node.kind) {
                    case SyntaxKind.VariableStatement:
                        forEach((<VariableStatement>node).declarationList.declarations, visit);
                        break;
                    case SyntaxKind.ObjectBindingPattern:
                    case SyntaxKind.ArrayBindingPattern:
                        forEach((<BindingPattern>node).elements, visit);
                        break;

                    case SyntaxKind.ExportDeclaration:
                        // Handle named exports case e.g.:
                        //    export {a, b as B} from "mod";
                        if ((<ExportDeclaration>node).exportClause) {
                            forEach((<ExportDeclaration>node).exportClause.elements, visit);
                        }
                        break;

                    case SyntaxKind.ImportDeclaration:
                        let importClause = (<ImportDeclaration>node).importClause;
                        if (importClause) {
                            // Handle default import case e.g.:
                            //    import d from "mod";
                            if (importClause.name) {
                                childNodes.push(importClause);
                            }

                            // Handle named bindings in imports e.g.:
                            //    import * as NS from "mod";
                            //    import {a, b as B} from "mod";
                            if (importClause.namedBindings) {
                                if (importClause.namedBindings.kind === SyntaxKind.NamespaceImport) {
                                    childNodes.push(importClause.namedBindings);
                                }
                                else {
                                    forEach((<NamedImports>importClause.namedBindings).elements, visit);
                                }
                            }
                        }
                        break;

                    case SyntaxKind.BindingElement:
                    case SyntaxKind.VariableDeclaration:
                        if (isBindingPattern((<VariableDeclaration>node).name)) {
                            visit((<VariableDeclaration>node).name);
                            break;
                        }
                        // Fall through
                    case SyntaxKind.ClassExpression:
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.EnumDeclaration:
                    case SyntaxKind.InterfaceDeclaration:
                    case SyntaxKind.ModuleDeclaration:
                    case SyntaxKind.ArrowFunction:
                    case SyntaxKind.FunctionExpression:
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.ImportEqualsDeclaration:
                    case SyntaxKind.ImportSpecifier:
                    case SyntaxKind.ExportSpecifier:
                    case SyntaxKind.TypeAliasDeclaration:
                        childNodes.push(node);
                        break;

                    default:
                        forEachChild(node, visit);
                }
            }

            // for (let i = 0, n = nodes.length; i < n; i++) {
            //    let node = nodes[i];

            //    if (node.kind === SyntaxKind.ClassDeclaration ||
            //        node.kind === SyntaxKind.EnumDeclaration ||
            //        node.kind === SyntaxKind.InterfaceDeclaration ||
            //        node.kind === SyntaxKind.ModuleDeclaration ||
            //        node.kind === SyntaxKind.FunctionDeclaration) {

            //        childNodes.push(node);
            //    }
            //    else if (node.kind === SyntaxKind.VariableStatement) {
            //        childNodes.push.apply(childNodes, (<VariableStatement>node).declarations);
            //    }
            // }
            forEach(nodes, visit);
            return sortNodes(childNodes);
        }

        function getTopLevelNodes(node: SourceFile): Node[] {
            const topLevelNodes: Node[] = [];
            topLevelNodes.push(node);

            addTopLevelNodes(node.statements, topLevelNodes);

            return topLevelNodes;
        }

        function sortNodes(nodes: Node[]): Node[] {
            const sortedCopy = nodes.slice(0);
            sortNodesInPlace(sortedCopy);
            return sortedCopy;
        }

        function sortNodesInPlace(nodes: Node[]): void {
            nodes.sort((n1, n2) => {
                // Get the name if it exists. OK if node is not a declaration.
                const name1 = (<Declaration> n1).name, name2 = (<Declaration> n2).name;
                if (name1 && name2) {
                    return localeCompareFix(getPropertyNameForPropertyNameNode(name1), getPropertyNameForPropertyNameNode(name2));
                }
                else if (name1) {
                    return 1;
                }
                else if (name2) {
                    return -1;
                }
                else {
                    return n1.kind - n2.kind;
                }
            });

            // node 0.10 treats "a" as greater than "B".
            // For consistency, sort alphabetically, falling back to which is lower-case.
            function localeCompareFix(a: string, b: string) {
                const cmp = a.toLowerCase().localeCompare(b.toLowerCase());
                if (cmp !== 0)
                    return cmp;
                // Return the *opposite* of the `<` operator, which works the same in node 0.10 and 6.0.
                return a < b ? 1 : a > b ? -1 : 0;
            }
        }

        // Add nodes in a single "level" of top-level nodes (e.g. methods in a class.)
        // Nodes in a single "level" are sorted together.
        // Returns whether any nodes were added.
        function addTopLevelNodes(nodes: Node | Node[], topLevelNodes: Node[]) {
            const decls = getNextLevelOfDeclarations(nodes);
            // Sort each level of declarations together
            sortNodesInPlace(decls);
            for (const decl of decls) {
                addTopLevelNode(decl, topLevelNodes);
            }
        }

        // Gets all declarations contained within `nodes` and their sub-expressions,
        // but not declarations within declarations.
        function getNextLevelOfDeclarations(nodes: Node | Node[]): Node[] {
            const result: Node[] = [];
            function recur(node: Node): void {
                switch (node.kind) {
                    case SyntaxKind.ClassExpression:
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.EnumDeclaration:
                    case SyntaxKind.InterfaceDeclaration:
                    case SyntaxKind.TypeAliasDeclaration:
                    case SyntaxKind.ModuleDeclaration:
                    case SyntaxKind.ArrowFunction:
                    case SyntaxKind.FunctionExpression:
                    case SyntaxKind.FunctionDeclaration:
                        result.push(node);
                        // Its children are handled by addTopLevelNode later.
                        break;
                    default:
                        forEachChild(node, recur);
                }
            }
            if (nodes instanceof Array) {
                for (const node of nodes) {
                    recur(node);
                }
            }
            else {
                recur(nodes);
            }
            return result;
        }

        function addTopLevelNode(node: Node, topLevelNodes: Node[]) {
            switch (node.kind) {
                case SyntaxKind.ClassExpression:
                case SyntaxKind.ClassDeclaration:
                    topLevelNodes.push(node);
                    for (const member of (<ClassDeclaration>node).members) {
                        if (member.kind === SyntaxKind.MethodDeclaration || member.kind === SyntaxKind.Constructor) {
                            type FunctionLikeMember = MethodDeclaration | ConstructorDeclaration;
                            const decl = <FunctionLikeMember>member;
                            if (decl.body) {
                                // Add node, but it will not become an item unless it has children later.
                                topLevelNodes.push(member);
                                addTopLevelNodes(decl.body.statements, topLevelNodes);
                            }
                        }
                    }
                    break;

                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.TypeAliasDeclaration:
                    topLevelNodes.push(node);
                    break;

                case SyntaxKind.ModuleDeclaration:
                    let moduleDeclaration = <ModuleDeclaration>node;
                    topLevelNodes.push(node);
                    addTopLevelNodes((<Block>getInnermostModule(moduleDeclaration).body).statements, topLevelNodes);
                    break;

                case SyntaxKind.ArrowFunction:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.FunctionDeclaration:
                    const decl = <FunctionLikeDeclaration>node;
                    if (decl.body) {
                        topLevelNodes.push(node);
                        addTopLevelNodes(decl.body, topLevelNodes);
                    }
                    break;

                default:
                    // There should be a case in addTopLevelNode for each case in getNextLevelOfDeclarations.
                    throw new Error("Unreachable");
            }
        }

        function getItemsWorker(nodes: Node[], createItem: (n: Node) => ts.NavigationBarItem): ts.NavigationBarItem[] {
            const items: ts.NavigationBarItem[] = [];

            const keyToItem: Map<NavigationBarItem> = {};

            for (const child of nodes) {
                const item = createItem(child);
                if (item !== undefined) {
                    if (item.text.length > 0) {
                        if (isFunctionOrClassExpression(child)) {
                            // Never merge
                            items.push(item);
                            continue;
                        }

                        const key = item.text + "-" + item.kind + "-" + item.indent;

                        const itemWithSameName = keyToItem[key];
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
            addRange(target.spans, source.spans);

            if (source.childItems) {
                if (!target.childItems) {
                    target.childItems = [];
                }

                // Next, recursively merge or add any children in the source as appropriate.
                outer:
                for (const sourceChild of source.childItems) {
                    for (const targetChild of target.childItems) {
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
                    if (isBindingPattern((<ParameterDeclaration>node).name)) {
                        break;
                    }
                    if ((node.flags & NodeFlags.Modifier) === 0) {
                        return undefined;
                    }
                    return createItem(node, getTextOfNode((<ParameterDeclaration>node).name), ts.ScriptElementKind.memberVariableElement);

                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                    return createItem(node, getTextOfNode((<MethodDeclaration>node).name), ts.ScriptElementKind.memberFunctionElement);

                case SyntaxKind.GetAccessor:
                    return createItem(node, getTextOfNode((<AccessorDeclaration>node).name), ts.ScriptElementKind.memberGetAccessorElement);

                case SyntaxKind.SetAccessor:
                    return createItem(node, getTextOfNode((<AccessorDeclaration>node).name), ts.ScriptElementKind.memberSetAccessorElement);

                case SyntaxKind.IndexSignature:
                    return createItem(node, "[]", ts.ScriptElementKind.indexSignatureElement);

                case SyntaxKind.EnumDeclaration:
                    return createItem(node, getTextOfNode((<EnumDeclaration>node).name), ts.ScriptElementKind.enumElement);

                case SyntaxKind.EnumMember:
                    return createItem(node, getTextOfNode((<EnumMember>node).name), ts.ScriptElementKind.memberVariableElement);

                case SyntaxKind.ModuleDeclaration:
                    return createItem(node, getModuleName(<ModuleDeclaration>node), ts.ScriptElementKind.moduleElement);

                case SyntaxKind.InterfaceDeclaration:
                    return createItem(node, getTextOfNode((<InterfaceDeclaration>node).name), ts.ScriptElementKind.interfaceElement);

                case SyntaxKind.TypeAliasDeclaration:
                    return createItem(node, getTextOfNode((<TypeAliasDeclaration>node).name), ts.ScriptElementKind.typeElement);

                case SyntaxKind.CallSignature:
                    return createItem(node, "()", ts.ScriptElementKind.callSignatureElement);

                case SyntaxKind.ConstructSignature:
                    return createItem(node, "new()", ts.ScriptElementKind.constructSignatureElement);

                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.PropertySignature:
                    return createItem(node, getTextOfNode((<PropertyDeclaration>node).name), ts.ScriptElementKind.memberVariableElement);

                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.ClassExpression:
                    return createItem(node, getTextOfNode((<ClassDeclaration>node).name), ts.ScriptElementKind.classElement);

                case SyntaxKind.ArrowFunction:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.FunctionDeclaration:
                    return createItem(node, getFunctionOrClassName(<ArrowFunction | FunctionExpression | FunctionDeclaration>node), ts.ScriptElementKind.functionElement);

                case SyntaxKind.VariableDeclaration:
                case SyntaxKind.BindingElement:
                    let variableDeclarationNode: Node;
                    let name: Node;

                    if (node.kind === SyntaxKind.BindingElement) {
                        name = (<BindingElement>node).name;
                        variableDeclarationNode = node;
                        // binding elements are added only for variable declarations
                        // bubble up to the containing variable declaration
                        while (variableDeclarationNode && variableDeclarationNode.kind !== SyntaxKind.VariableDeclaration) {
                            variableDeclarationNode = variableDeclarationNode.parent;
                        }
                        Debug.assert(variableDeclarationNode !== undefined);
                    }
                    else {
                        Debug.assert(!isBindingPattern((<VariableDeclaration>node).name));
                        variableDeclarationNode = node;
                        name = (<VariableDeclaration>node).name;
                    }

                    if (isConst(variableDeclarationNode)) {
                        return createItem(node, getTextOfNode(name), ts.ScriptElementKind.constElement);
                    }
                    else if (isLet(variableDeclarationNode)) {
                        return createItem(node, getTextOfNode(name), ts.ScriptElementKind.letElement);
                    }
                    else {
                        return createItem(node, getTextOfNode(name), ts.ScriptElementKind.variableElement);
                    }

                case SyntaxKind.Constructor:
                    return createItem(node, "constructor", ts.ScriptElementKind.constructorImplementationElement);

                case SyntaxKind.ExportSpecifier:
                case SyntaxKind.ImportSpecifier:
                case SyntaxKind.ImportEqualsDeclaration:
                case SyntaxKind.ImportClause:
                case SyntaxKind.NamespaceImport:
                    return createItem(node, getTextOfNode((<Declaration>node).name), ts.ScriptElementKind.alias);
            }

            return undefined;

            function createItem(node: Node, name: string, scriptElementKind: string): NavigationBarItem {
                return getNavigationBarItem(name, scriptElementKind, getNodeModifiers(node), [getNodeSpan(node)]);
            }
        }

        function isEmpty(text: string) {
            return !text || text.trim() === "";
        }

        function getNavigationBarItem(text: string, kind: string, kindModifiers: string, spans: TextSpan[], childItems: NavigationBarItem[] = [], indent = 0): NavigationBarItem {
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

                case SyntaxKind.ClassExpression:
                case SyntaxKind.ClassDeclaration:
                    return createClassItem(<ClassDeclaration>node);

                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.Constructor:
                    return createMemberFunctionLikeItem(<MethodDeclaration | ConstructorDeclaration>node);

                case SyntaxKind.EnumDeclaration:
                    return createEnumItem(<EnumDeclaration>node);

                case SyntaxKind.InterfaceDeclaration:
                    return createInterfaceItem(<InterfaceDeclaration>node);

                case SyntaxKind.ModuleDeclaration:
                    return createModuleItem(<ModuleDeclaration>node);

                case SyntaxKind.ArrowFunction:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.FunctionDeclaration:
                    return createFunctionItem(<FunctionDeclaration>node);

                case SyntaxKind.TypeAliasDeclaration:
                    return createTypeAliasItem(<TypeAliasDeclaration>node);
            }

            return undefined;

            function createModuleItem(node: ModuleDeclaration): NavigationBarItem {
                const moduleName = getModuleName(node);

                const childItems = getItemsWorker(getChildNodes((<Block>getInnermostModule(node).body).statements), createChildItem);

                return getNavigationBarItem(moduleName,
                    ts.ScriptElementKind.moduleElement,
                    getNodeModifiers(node),
                    [getNodeSpan(node)],
                    childItems,
                    getIndent(node));
            }

            function createFunctionItem(node: FunctionDeclaration): ts.NavigationBarItem  {
                const children = node.body ? getChildNodes([node.body]) : [];
                const isTopLevel = node.parent.kind === SyntaxKind.ModuleBlock || node.parent.kind === SyntaxKind.SourceFile ||
                    // Functions with declaration children (not including local variables) are worthy
                    children.some(child => child.kind !== SyntaxKind.VariableDeclaration && child.kind !== SyntaxKind.BindingElement) ||
                    // Functions inside class methods are worthy
                    node.parent.parent.kind === SyntaxKind.MethodDeclaration || node.parent.parent.kind === SyntaxKind.Constructor;
                if (!isTopLevel) {
                    return undefined;
                }

                const childItems = getItemsWorker(children, createChildItem);

                return getNavigationBarItem(
                    getFunctionOrClassName(node),
                    ts.ScriptElementKind.functionElement,
                    getNodeModifiers(node),
                    [getNodeSpan(node)],
                    childItems,
                    getIndent(node));
            }

            function createTypeAliasItem(node: TypeAliasDeclaration): ts.NavigationBarItem {
                return getNavigationBarItem(node.name.text,
                    ts.ScriptElementKind.typeElement,
                    getNodeModifiers(node),
                    [getNodeSpan(node)],
                    [],
                    getIndent(node));
            }

            function createMemberFunctionLikeItem(node: MethodDeclaration | ConstructorDeclaration): ts.NavigationBarItem  {
                const childItems = getItemsWorker(sortNodes(node.body.statements), createChildItem);
                // Don't include member functions as top-level if they don't contain other items.
                if (!childItems.length) {
                    return undefined;
                }

                let scriptElementKind: string;
                let memberFunctionName: string;
                if (node.kind === SyntaxKind.MethodDeclaration) {
                    memberFunctionName = getPropertyNameForPropertyNameNode(node.name);
                    scriptElementKind = ts.ScriptElementKind.memberFunctionElement;
                }
                else {
                    memberFunctionName = "constructor";
                    scriptElementKind = ts.ScriptElementKind.constructorImplementationElement;
                }

                return getNavigationBarItem(memberFunctionName,
                    scriptElementKind,
                    getNodeModifiers(node),
                    [getNodeSpan(node)],
                    childItems,
                    getIndent(node));
            }

            function createSourceFileItem(node: SourceFile): ts.NavigationBarItem {
                const childItems = getItemsWorker(getChildNodes(node.statements), createChildItem);

                const rootName = isExternalModule(node)
                    ? "\"" + escapeString(getBaseFileName(removeFileExtension(normalizePath(node.fileName)))) + "\""
                    : "<global>";

                return getNavigationBarItem(rootName,
                    ts.ScriptElementKind.moduleElement,
                    ts.ScriptElementKindModifier.none,
                    [getNodeSpan(node)],
                    childItems);
            }

            function createClassItem(node: ClassDeclaration): ts.NavigationBarItem {
                let childItems: NavigationBarItem[];

                if (node.members) {
                    const constructor = <ConstructorDeclaration>forEach(node.members, member => {
                        return member.kind === SyntaxKind.Constructor && member;
                    });

                    // Add the constructor parameters in as children of the class (for property parameters).
                    // Note that *all non-binding pattern named* parameters will be added to the nodes array, but parameters that
                    // are not properties will be filtered out later by createChildItem.
                    const nodes: Node[] = removeDynamicallyNamedProperties(node);
                    if (constructor) {
                        addRange(nodes, filter(constructor.parameters, p => !isBindingPattern(p.name)));
                    }

                    childItems = getItemsWorker(sortNodes(nodes), createChildItem);
                }

                return getNavigationBarItem(
                    getFunctionOrClassName(node),
                    ts.ScriptElementKind.classElement,
                    getNodeModifiers(node),
                    [getNodeSpan(node)],
                    childItems,
                    getIndent(node));
            }

            function createEnumItem(node: EnumDeclaration): ts.NavigationBarItem {
                const childItems = getItemsWorker(sortNodes(removeComputedProperties(node)), createChildItem);
                return getNavigationBarItem(
                    node.name.text,
                    ts.ScriptElementKind.enumElement,
                    getNodeModifiers(node),
                    [getNodeSpan(node)],
                    childItems,
                    getIndent(node));
            }

            function createInterfaceItem(node: InterfaceDeclaration): ts.NavigationBarItem {
                const childItems = getItemsWorker(sortNodes(removeDynamicallyNamedProperties(node)), createChildItem);
                return getNavigationBarItem(
                    node.name.text,
                    ts.ScriptElementKind.interfaceElement,
                    getNodeModifiers(node),
                    [getNodeSpan(node)],
                    childItems,
                    getIndent(node));
            }
        }

        function getModuleName(moduleDeclaration: ModuleDeclaration): string {
            // We want to maintain quotation marks.
            if (isAmbientModule(moduleDeclaration)) {
                return getTextOfNode(moduleDeclaration.name);
            }

            // Otherwise, we need to aggregate each identifier to build up the qualified name.
            const result: string[] = [];

            result.push(moduleDeclaration.name.text);

            while (moduleDeclaration.body && moduleDeclaration.body.kind === SyntaxKind.ModuleDeclaration) {
                moduleDeclaration = <ModuleDeclaration>moduleDeclaration.body;

                result.push(moduleDeclaration.name.text);
            }

            return result.join(".");
        }

        function removeComputedProperties(node: EnumDeclaration): Declaration[] {
            return filter<Declaration>(node.members, member => member.name === undefined || member.name.kind !== SyntaxKind.ComputedPropertyName);
        }

        /**
         * Like removeComputedProperties, but retains the properties with well known symbol names
         */
        function removeDynamicallyNamedProperties(node: ClassDeclaration | InterfaceDeclaration): Declaration[] {
            return filter<Declaration>(node.members, member => !hasDynamicName(member));
        }

        function getInnermostModule(node: ModuleDeclaration): ModuleDeclaration {
            while (node.body.kind === SyntaxKind.ModuleDeclaration) {
                node = <ModuleDeclaration>node.body;
            }

            return node;
        }

        function getNodeSpan(node: Node) {
            return node.kind === SyntaxKind.SourceFile
                ? createTextSpanFromBounds(node.getFullStart(), node.getEnd())
                : createTextSpanFromBounds(node.getStart(), node.getEnd());
        }

        function getTextOfNode(node: Node): string {
            return getTextOfNodeFromSourceText(sourceFile.text, node);
        }
    }

    export function getJsNavigationBarItems(sourceFile: SourceFile, compilerOptions: CompilerOptions): NavigationBarItem[] {
        let indent = 0;

        const rootName = isExternalModule(sourceFile) ?
            "\"" + escapeString(getBaseFileName(removeFileExtension(normalizePath(sourceFile.fileName)))) + "\""
            : "<global>";

        const sourceFileItem = getNavBarItem(rootName, ScriptElementKind.moduleElement, [getNodeSpan(sourceFile)]);
        let topItem = sourceFileItem;

        // Walk the whole file, because we want to also find function expressions - which may be in variable initializer,
        // call arguments, expressions, etc...
        forEachChild(sourceFile, visitNode);

        function visitNode(node: Node) {
            const newItem = createNavBarItem(node);

            if (newItem) {
                topItem.childItems.push(newItem);
            }

            // Add a level if traversing into a container
            if (newItem && (isFunctionLike(node) || isClassLike(node))) {
                const lastTop = topItem;
                indent++;
                topItem = newItem;
                forEachChild(node, visitNode);
                topItem = lastTop;
                indent--;

                if (newItem && isAnonymousFunction(newItem) && newItem.childItems.length === 0) {
                    topItem.childItems.pop();
                }
            }
            else {
                forEachChild(node, visitNode);
            }
        }

        function createNavBarItem(node: Node): NavigationBarItem {
            switch (node.kind) {
                case SyntaxKind.VariableDeclaration:
                    // Only add to the navbar if at the top-level of the file
                    // Note: "const" and "let" are also SyntaxKind.VariableDeclarations
                    if (node.parent/*VariableDeclarationList*/.parent/*VariableStatement*/
                           .parent/*SourceFile*/.kind !== SyntaxKind.SourceFile) {
                        return undefined;
                    }
                    // If it is initialized with a function expression, handle it when we reach the function expression node
                    const varDecl = node as VariableDeclaration;
                    if (varDecl.initializer && (varDecl.initializer.kind === SyntaxKind.FunctionExpression ||
                                                varDecl.initializer.kind === SyntaxKind.ArrowFunction ||
                                                varDecl.initializer.kind === SyntaxKind.ClassExpression)) {
                        return undefined;
                    }
                    // Fall through
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.Constructor:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                    // "export default function().." looks just like a regular function/class declaration, except with the 'default' flag
                    const name = node.flags && (node.flags & NodeFlags.Default) && !(node as (Declaration)).name ? "default" :
                            node.kind === SyntaxKind.Constructor ? "constructor" :
                            declarationNameToString((node as (Declaration)).name);
                    return getNavBarItem(name, getScriptKindForElementKind(node.kind), [getNodeSpan(node)]);
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.ArrowFunction:
                case SyntaxKind.ClassExpression:
                    return getDefineModuleItem(node) || getFunctionOrClassExpressionItem(node);
                case SyntaxKind.MethodDeclaration:
                    const methodDecl = node as MethodDeclaration;
                    return getNavBarItem(declarationNameToString(methodDecl.name),
                                         ScriptElementKind.memberFunctionElement,
                                         [getNodeSpan(node)]);
                case SyntaxKind.ExportAssignment:
                    // e.g. "export default <expr>"
                    return getNavBarItem("default", ScriptElementKind.variableElement, [getNodeSpan(node)]);
                case SyntaxKind.ImportClause:    // e.g. 'def' in: import def from 'mod' (in ImportDeclaration)
                    if (!(node as ImportClause).name) {
                        // No default import (this node is still a parent of named & namespace imports, which are handled below)
                        return undefined;
                    }
                    // fall through
                case SyntaxKind.ImportSpecifier: // e.g. 'id' in: import {id} from 'mod' (in NamedImports, in ImportClause)
                case SyntaxKind.NamespaceImport: // e.g. '* as ns' in: import * as ns from 'mod' (in ImportClause)
                case SyntaxKind.ExportSpecifier: // e.g. 'a' or 'b'  in: export {a, foo as b} from 'mod'
                    // Export specifiers are only interesting if they are reexports from another module, or renamed, else they are already globals
                    if (node.kind === SyntaxKind.ExportSpecifier) {
                        if (!(node.parent.parent as ExportDeclaration).moduleSpecifier && !(node as ExportSpecifier).propertyName) {
                            return undefined;
                        }
                    }
                    const decl = node as (ImportSpecifier | ImportClause | NamespaceImport | ExportSpecifier);
                    if (!decl.name) {
                        return undefined;
                    }
                    const declName = declarationNameToString(decl.name);
                    return getNavBarItem(declName, ScriptElementKind.constElement, [getNodeSpan(node)]);
                default:
                    return undefined;
            }
        }

        function getNavBarItem(text: string, kind: string, spans: TextSpan[], kindModifiers = ScriptElementKindModifier.none): NavigationBarItem {
            return {
                text, kind, kindModifiers, spans, childItems: [], indent, bolded: false, grayed: false
            };
        }

        function getDefineModuleItem(node: Node): NavigationBarItem {
            if (node.kind !== SyntaxKind.FunctionExpression && node.kind !== SyntaxKind.ArrowFunction) {
                return undefined;
            }

            // No match if this is not a call expression to an identifier named 'define'
            if (node.parent.kind !== SyntaxKind.CallExpression) {
                return undefined;
            }
            const callExpr = node.parent as CallExpression;
            if (callExpr.expression.kind !== SyntaxKind.Identifier || callExpr.expression.getText() !== "define") {
                return undefined;
            }

            // Return a module of either the given text in the first argument, or of the source file path
            let defaultName = node.getSourceFile().fileName;
            if (callExpr.arguments[0].kind === SyntaxKind.StringLiteral) {
                defaultName = ((callExpr.arguments[0]) as StringLiteral).text;
            }
            return getNavBarItem(defaultName, ScriptElementKind.moduleElement, [getNodeSpan(node.parent)]);
        }

        function getFunctionOrClassExpressionItem(node: Node): NavigationBarItem {
            if (node.kind !== SyntaxKind.FunctionExpression &&
                    node.kind !== SyntaxKind.ArrowFunction &&
                    node.kind !== SyntaxKind.ClassExpression) {
                return undefined;
            }

            const fnExpr = node as FunctionExpression | ArrowFunction | ClassExpression;
            const fnName = getFunctionOrClassName(fnExpr);
            const scriptKind = node.kind === SyntaxKind.ClassExpression ? ScriptElementKind.classElement : ScriptElementKind.functionElement;
            return getNavBarItem(fnName, scriptKind, [getNodeSpan(node)]);
        }

        function getNodeSpan(node: Node) {
            return node.kind === SyntaxKind.SourceFile
                ? createTextSpanFromBounds(node.getFullStart(), node.getEnd())
                : createTextSpanFromBounds(node.getStart(), node.getEnd());
        }

        function getScriptKindForElementKind(kind: SyntaxKind) {
            switch (kind) {
                case SyntaxKind.VariableDeclaration:
                    return ScriptElementKind.variableElement;
                case SyntaxKind.FunctionDeclaration:
                    return ScriptElementKind.functionElement;
                case SyntaxKind.ClassDeclaration:
                    return ScriptElementKind.classElement;
                case SyntaxKind.Constructor:
                    return ScriptElementKind.constructorImplementationElement;
                case SyntaxKind.GetAccessor:
                    return ScriptElementKind.memberGetAccessorElement;
                case SyntaxKind.SetAccessor:
                    return ScriptElementKind.memberSetAccessorElement;
                default:
                    return "unknown";
            }
        }

        return sourceFileItem.childItems;
    }

    const anonymousFunctionText = "<function>";
    const anonymousClassText = "<class>";

    /** Get the name for a (possibly anonymous) class/function expression. */
    function getFunctionOrClassName(node: FunctionExpression | FunctionDeclaration | ArrowFunction | ClassLikeDeclaration): string {
        if (node.name && getFullWidth(node.name) > 0) {
            return declarationNameToString(node.name);
        }
        // See if it is a var initializer. If so, use the var name.
        else if (node.parent.kind === SyntaxKind.VariableDeclaration) {
            return declarationNameToString((node.parent as VariableDeclaration).name);
        }
        // See if it is of the form "<expr> = function(){...}". If so, use the text from the left-hand side.
        else if (node.parent.kind === SyntaxKind.BinaryExpression &&
            (node.parent as BinaryExpression).operatorToken.kind === SyntaxKind.EqualsToken) {
            return (node.parent as BinaryExpression).left.getText();
        }
        // See if it is a property assignment, and if so use the property name
        else if (node.parent.kind === SyntaxKind.PropertyAssignment && (node.parent as PropertyAssignment).name) {
            return (node.parent as PropertyAssignment).name.getText();
        }
        // Default exports are named "default"
        else if (node.flags & NodeFlags.Default) {
            return "default";
        }
        else {
            return node.kind === SyntaxKind.ClassExpression ? anonymousClassText : anonymousFunctionText;
        }
    }

    function isAnonymousFunction(item: NavigationBarItem): boolean {
        return item.text === anonymousFunctionText;
    }

    function isFunctionOrClassExpression(node: Node): boolean {
        return node.kind === SyntaxKind.FunctionExpression || node.kind === SyntaxKind.ArrowFunction || node.kind === SyntaxKind.ClassExpression;
    }
}
