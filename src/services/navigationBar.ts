/// <reference path='services.ts' />

/* @internal */
namespace ts.NavigationBar {
    /**
     * Represents a navigation bar item and its children.
     * The returned NavigationBarItem is more complicated and doesn't include 'parent', so we use these to do work before converting.
     */
    interface NavigationBarNode {
        node: Node;
        additionalNodes: Node[] | undefined;
        parent: NavigationBarNode | undefined; // Present for all but root node
        children: NavigationBarNode[] | undefined;
        indent: number; // # of parents
    }

    export function getNavigationBarItems(sourceFile: SourceFile): NavigationBarItem[] {
        curSourceFile = sourceFile;
        const result = map(topLevelItems(rootNavigationBarNode(sourceFile)), convertToTopLevelItem);
        curSourceFile = undefined;
        return result;
    }

    // Keep sourceFile handy so we don't have to search for it every time we need to call `getText`.
    let curSourceFile: SourceFile;
    function nodeText(node: Node): string {
        return node.getText(curSourceFile);
    }

    function navigationBarNodeKind(n: NavigationBarNode): SyntaxKind {
        return n.node.kind;
    }

    function pushChild(parent: NavigationBarNode, child: NavigationBarNode): void {
        if (parent.children) {
            parent.children.push(child);
        }
        else {
            parent.children = [child];
        }
    }

    /*
    For performance, we keep navigation bar parents on a stack rather than passing them through each recursion.
    `parent` is the current parent and is *not* stored in parentsStack.
    `startNode` sets a new parent and `endNode` returns to the previous parent.
    */
    const parentsStack: NavigationBarNode[] = [];
    let parent: NavigationBarNode;

    function rootNavigationBarNode(sourceFile: SourceFile): NavigationBarNode {
        Debug.assert(!parentsStack.length);
        const root: NavigationBarNode = { node: sourceFile, additionalNodes: undefined, parent: undefined, children: undefined, indent: 0 };
        parent = root;
        for (const statement of sourceFile.statements) {
            addChildrenRecursively(statement);
        }
        endNode();
        Debug.assert(!parent && !parentsStack.length);
        return root;
    }

    function addLeafNode(node: Node): void {
        pushChild(parent, emptyNavigationBarNode(node));
    }

    function emptyNavigationBarNode(node: Node): NavigationBarNode {
        return {
            node,
            additionalNodes: undefined,
            parent,
            children: undefined,
            indent: parent.indent + 1
        };
    }

    /**
     * Add a new level of NavigationBarNodes.
     * This pushes to the stack, so you must call `endNode` when you are done adding to this node.
     */
    function startNode(node: Node): void {
        const navNode: NavigationBarNode = emptyNavigationBarNode(node);
        pushChild(parent, navNode);

        // Save the old parent
        parentsStack.push(parent);
        parent = navNode;
    }

    /** Call after calling `startNode` and adding children to it. */
    function endNode(): void {
        if (parent.children) {
            mergeChildren(parent.children);
            sortChildren(parent.children);
        }
        parent = parentsStack.pop();
    }

    function addNodeWithRecursiveChild(node: Node, child: Node): void {
        startNode(node);
        addChildrenRecursively(child);
        endNode();
    }

    /** Look for navigation bar items in node's subtree, adding them to the current `parent`. */
    function addChildrenRecursively(node: Node): void {
        if (!node || isToken(node)) {
            return;
        }

        switch (node.kind) {
            case SyntaxKind.Constructor:
                // Get parameter properties, and treat them as being on the *same* level as the constructor, not under it.
                const ctr = <ConstructorDeclaration>node;
                addNodeWithRecursiveChild(ctr, ctr.body);

                // Parameter properties are children of the class, not the constructor.
                for (const param of ctr.parameters) {
                    if (isParameterPropertyDeclaration(param)) {
                        addLeafNode(param);
                    }
                }
                break;

            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.MethodSignature:
                if (!hasDynamicName((<ClassElement | TypeElement>node))) {
                    addNodeWithRecursiveChild(node, (<FunctionLikeDeclaration>node).body);
                }
                break;

            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.PropertySignature:
                if (!hasDynamicName((<ClassElement | TypeElement>node))) {
                    addLeafNode(node);
                }
                break;

            case SyntaxKind.ImportClause:
                let importClause = <ImportClause>node;
                // Handle default import case e.g.:
                //    import d from "mod";
                if (importClause.name) {
                    addLeafNode(importClause);
                }

                // Handle named bindings in imports e.g.:
                //    import * as NS from "mod";
                //    import {a, b as B} from "mod";
                const {namedBindings} = importClause;
                if (namedBindings) {
                    if (namedBindings.kind === SyntaxKind.NamespaceImport) {
                        addLeafNode(<NamespaceImport>namedBindings);
                    }
                    else {
                        for (const element of (<NamedImports>namedBindings).elements) {
                            addLeafNode(element);
                        }
                    }
                }
                break;

            case SyntaxKind.BindingElement:
            case SyntaxKind.VariableDeclaration:
                const decl = <VariableDeclaration>node;
                const name = decl.name;
                if (isBindingPattern(name)) {
                    addChildrenRecursively(name);
                }
                else if (decl.initializer && isFunctionOrClassExpression(decl.initializer)) {
                    // For `const x = function() {}`, just use the function node, not the const.
                    addChildrenRecursively(decl.initializer);
                }
                else {
                    addNodeWithRecursiveChild(decl, decl.initializer);
                }
                break;

            case SyntaxKind.ArrowFunction:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
                addNodeWithRecursiveChild(node, (<FunctionLikeDeclaration>node).body);
                break;

            case SyntaxKind.EnumDeclaration:
                startNode(node);
                for (const member of (<EnumDeclaration>node).members) {
                    if (!isComputedProperty(member)) {
                        addLeafNode(member);
                    }
                }
                endNode();
                break;

            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.ClassExpression:
            case SyntaxKind.InterfaceDeclaration:
                startNode(node);
                for (const member of (<InterfaceDeclaration>node).members) {
                    addChildrenRecursively(member);
                }
                endNode();
                break;

            case SyntaxKind.ModuleDeclaration:
                addNodeWithRecursiveChild(node, getInteriorModule(<ModuleDeclaration>node).body);
                break;

            case SyntaxKind.ExportSpecifier:
            case SyntaxKind.ImportEqualsDeclaration:
            case SyntaxKind.IndexSignature:
            case SyntaxKind.CallSignature:
            case SyntaxKind.ConstructSignature:
            case SyntaxKind.TypeAliasDeclaration:
                addLeafNode(node);
                break;

            default:
                forEach(node.jsDocComments, jsDocComment => {
                    forEach(jsDocComment.tags, tag => {
                        if (tag.kind === SyntaxKind.JSDocTypedefTag) {
                            addLeafNode(tag);
                        }
                    });
                });

                forEachChild(node, addChildrenRecursively);
        }
    }

    /** Merge declarations of the same kind. */
    function mergeChildren(children: NavigationBarNode[]): void {
        const nameToItems = new StringMap<NavigationBarNode | NavigationBarNode[]>();
        filterMutate(children, child => {
            const decl = <Declaration>child.node;
            const name = decl.name && nodeText(decl.name);
            if (!name) {
                // Anonymous items are never merged.
                return true;
            }

            const itemsWithSameName = nameToItems.get(name);
            if (!itemsWithSameName) {
                nameToItems.set(name, child);
                return true;
            }

            if (itemsWithSameName instanceof Array) {
                for (const itemWithSameName of itemsWithSameName) {
                    if (tryMerge(itemWithSameName, child)) {
                        return false;
                    }
                }
                itemsWithSameName.push(child);
                return true;
            }
            else {
                const itemWithSameName = itemsWithSameName;
                if (tryMerge(itemWithSameName, child)) {
                    return false;
                }
                nameToItems.set(name, [itemWithSameName, child]);
                return true;
            }

            function tryMerge(a: NavigationBarNode, b: NavigationBarNode): boolean {
                if (shouldReallyMerge(a.node, b.node)) {
                    merge(a, b);
                    return true;
                }
                return false;
            }
        });

        /** a and b have the same name, but they may not be mergeable. */
        function shouldReallyMerge(a: Node, b: Node): boolean {
            return a.kind === b.kind && (a.kind !== SyntaxKind.ModuleDeclaration || areSameModule(<ModuleDeclaration>a, <ModuleDeclaration>b));

            // We use 1 NavNode to represent 'A.B.C', but there are multiple source nodes.
            // Only merge module nodes that have the same chain. Don't merge 'A.B.C' with 'A'!
            function areSameModule(a: ModuleDeclaration, b: ModuleDeclaration): boolean {
                if (a.body.kind !== b.body.kind) {
                    return false;
                }
                if (a.body.kind !== SyntaxKind.ModuleDeclaration) {
                    return true;
                }
                return areSameModule(<ModuleDeclaration>a.body, <ModuleDeclaration>b.body);
            }
        }

        /** Merge source into target. Source should be thrown away after this is called. */
        function merge(target: NavigationBarNode, source: NavigationBarNode): void {
            target.additionalNodes = target.additionalNodes || [];
            target.additionalNodes.push(source.node);
            if (source.additionalNodes) {
                target.additionalNodes.push(...source.additionalNodes);
            }

            target.children = concatenate(target.children, source.children);
            if (target.children) {
                mergeChildren(target.children);
                sortChildren(target.children);
            }
        }
    }

    /** Recursively ensure that each NavNode's children are in sorted order. */
    function sortChildren(children: NavigationBarNode[]): void {
        children.sort(compareChildren);
    }

    function compareChildren(child1: NavigationBarNode, child2: NavigationBarNode): number {
        const name1 = tryGetName(child1.node), name2 = tryGetName(child2.node);
        if (name1 && name2) {
            const cmp = localeCompareFix(name1, name2);
            return cmp !== 0 ? cmp : navigationBarNodeKind(child1) - navigationBarNodeKind(child2);
        }
        else {
            return name1 ? 1 : name2 ? -1 : navigationBarNodeKind(child1) - navigationBarNodeKind(child2);
        }
    }

    // More efficient to create a collator once and use its `compare` than to call `a.localeCompare(b)` many times.
    const collator: { compare(a: string, b: string): number } = typeof Intl === "undefined" ? undefined : new Intl.Collator();
    // Intl is missing in Safari, and node 0.10 treats "a" as greater than "B".
    const localeCompareIsCorrect = collator && collator.compare("a", "B") < 0;
    const localeCompareFix: (a: string, b: string) => number = localeCompareIsCorrect ? collator.compare : function(a, b) {
        // This isn't perfect, but it passes all of our tests.
        for (let i = 0; i < Math.min(a.length, b.length); i++) {
            const chA = a.charAt(i), chB = b.charAt(i);
            if (chA === "\"" && chB === "'") {
                return 1;
            }
            if (chA === "'" && chB === "\"") {
                return -1;
            }
            const cmp = chA.toLocaleLowerCase().localeCompare(chB.toLocaleLowerCase());
            if (cmp !== 0) {
                return cmp;
            }
        }
        return a.length - b.length;
    };

    /**
     * This differs from getItemName because this is just used for sorting.
     * We only sort nodes by name that have a more-or-less "direct" name, as opposed to `new()` and the like.
     * So `new()` can still come before an `aardvark` method.
     */
    function tryGetName(node: Node): string | undefined {
        if (node.kind === SyntaxKind.ModuleDeclaration) {
            return getModuleName(<ModuleDeclaration>node);
        }

        const decl = <Declaration>node;
        if (decl.name) {
            return getPropertyNameForPropertyNameNode(decl.name);
        }
        switch (node.kind) {
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction:
            case SyntaxKind.ClassExpression:
                return getFunctionOrClassName(<FunctionExpression | ArrowFunction | ClassExpression>node);
            case SyntaxKind.JSDocTypedefTag:
                return getJSDocTypedefTagName(<JSDocTypedefTag>node);
            default:
                return undefined;
        }
    }

    function getItemName(node: Node): string {
        if (node.kind === SyntaxKind.ModuleDeclaration) {
            return getModuleName(<ModuleDeclaration>node);
        }

        const name = (<Declaration>node).name;
        if (name) {
            const text = nodeText(name);
            if (text.length > 0) {
                return text;
            }
        }

        switch (node.kind) {
            case SyntaxKind.SourceFile:
                const sourceFile = <SourceFile>node;
                return isExternalModule(sourceFile)
                    ? `"${escapeString(getBaseFileName(removeFileExtension(normalizePath(sourceFile.fileName))))}"`
                    : "<global>";
            case SyntaxKind.ArrowFunction:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.ClassExpression:
                if (getModifierFlags(node) & ModifierFlags.Default) {
                    return "default";
                }
                return getFunctionOrClassName(<ArrowFunction | FunctionExpression | ClassExpression>node);
            case SyntaxKind.Constructor:
                return "constructor";
            case SyntaxKind.ConstructSignature:
                return "new()";
            case SyntaxKind.CallSignature:
                return "()";
            case SyntaxKind.IndexSignature:
                return "[]";
            case SyntaxKind.JSDocTypedefTag:
                return getJSDocTypedefTagName(<JSDocTypedefTag>node);
            default:
                return "<unknown>";
        }
    }

    function getJSDocTypedefTagName(node: JSDocTypedefTag): string {
        if (node.name) {
            return node.name.text;
        }
        else {
            const parentNode = node.parent && node.parent.parent;
            if (parentNode && parentNode.kind === SyntaxKind.VariableStatement) {
                if ((<VariableStatement>parentNode).declarationList.declarations.length > 0) {
                    const nameIdentifier = (<VariableStatement>parentNode).declarationList.declarations[0].name;
                    if (nameIdentifier.kind === SyntaxKind.Identifier) {
                        return (<Identifier>nameIdentifier).text;
                    }
                }
            }
            return "<typedef>";
        }
    }

    /** Flattens the NavNode tree to a list, keeping only the top-level items. */
    function topLevelItems(root: NavigationBarNode): NavigationBarNode[] {
        const topLevel: NavigationBarNode[] = [];
        function recur(item: NavigationBarNode) {
            if (isTopLevel(item)) {
                topLevel.push(item);
                if (item.children) {
                    for (const child of item.children) {
                        recur(child);
                    }
                }
            }
        }
        recur(root);
        return topLevel;

        function isTopLevel(item: NavigationBarNode): boolean {
            switch (navigationBarNodeKind(item)) {
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.ClassExpression:
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.ModuleDeclaration:
                case SyntaxKind.SourceFile:
                case SyntaxKind.TypeAliasDeclaration:
                case SyntaxKind.JSDocTypedefTag:
                    return true;

                case SyntaxKind.Constructor:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                case SyntaxKind.VariableDeclaration:
                    return hasSomeImportantChild(item);

                case SyntaxKind.ArrowFunction:
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.FunctionExpression:
                    return isTopLevelFunctionDeclaration(item);

                default:
                    return false;
            }
            function isTopLevelFunctionDeclaration(item: NavigationBarNode): boolean {
                if (!(<FunctionDeclaration>item.node).body) {
                    return false;
                }

                switch (navigationBarNodeKind(item.parent)) {
                    case SyntaxKind.ModuleBlock:
                    case SyntaxKind.SourceFile:
                    case SyntaxKind.MethodDeclaration:
                    case SyntaxKind.Constructor:
                        return true;
                    default:
                        return hasSomeImportantChild(item);
                }
            }
            function hasSomeImportantChild(item: NavigationBarNode) {
                return forEach(item.children, child => {
                    const childKind = navigationBarNodeKind(child);
                    return childKind !== SyntaxKind.VariableDeclaration && childKind !== SyntaxKind.BindingElement;
                });
            }
        }
    }

    // NavigationBarItem requires an array, but will not mutate it, so just give it this for performance.
    const emptyChildItemArray: NavigationBarItem[] = [];

    function convertToTopLevelItem(n: NavigationBarNode): NavigationBarItem {
        return {
            text: getItemName(n.node),
            kind: getNodeKind(n.node),
            kindModifiers: getNodeModifiers(n.node),
            spans: getSpans(n),
            childItems: map(n.children, convertToChildItem) || emptyChildItemArray,
            indent: n.indent,
            bolded: false,
            grayed: false
        };

        function convertToChildItem(n: NavigationBarNode): NavigationBarItem {
            return {
                text: getItemName(n.node),
                kind: getNodeKind(n.node),
                kindModifiers: getNodeModifiers(n.node),
                spans: getSpans(n),
                childItems: emptyChildItemArray,
                indent: 0,
                bolded: false,
                grayed: false
            };
        }

        function getSpans(n: NavigationBarNode): TextSpan[] {
            const spans = [getNodeSpan(n.node)];
            if (n.additionalNodes) {
                for (const node of n.additionalNodes) {
                    spans.push(getNodeSpan(node));
                }
            }
            return spans;
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

    /**
     * For 'module A.B.C', we want to get the node for 'C'.
     * We store 'A' as associated with a NavNode, and use getModuleName to traverse down again.
     */
    function getInteriorModule(decl: ModuleDeclaration): ModuleDeclaration {
        return decl.body.kind === SyntaxKind.ModuleDeclaration ? getInteriorModule(<ModuleDeclaration>decl.body) : decl;
    }

    function isComputedProperty(member: EnumMember): boolean {
        return !member.name || member.name.kind === SyntaxKind.ComputedPropertyName;
    }

    function getNodeSpan(node: Node): TextSpan {
        return node.kind === SyntaxKind.SourceFile
            ? createTextSpanFromBounds(node.getFullStart(), node.getEnd())
            : createTextSpanFromBounds(node.getStart(curSourceFile), node.getEnd());
    }

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
            return nodeText((node.parent as BinaryExpression).left);
        }
        // See if it is a property assignment, and if so use the property name
        else if (node.parent.kind === SyntaxKind.PropertyAssignment && (node.parent as PropertyAssignment).name) {
            return nodeText((node.parent as PropertyAssignment).name);
        }
        // Default exports are named "default"
        else if (getModifierFlags(node) & ModifierFlags.Default) {
            return "default";
        }
        else {
            return isClassLike(node) ? "<class>" : "<function>";
        }
    }

    function isFunctionOrClassExpression(node: Node): boolean {
        return node.kind === SyntaxKind.FunctionExpression || node.kind === SyntaxKind.ArrowFunction || node.kind === SyntaxKind.ClassExpression;
    }
}
