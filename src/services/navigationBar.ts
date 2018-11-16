/* @internal */
namespace ts.NavigationBar {
    /**
     * Matches all whitespace characters in a string. Eg:
     *
     * "app.
     *
     * onactivated"
     *
     * matches because of the newline, whereas
     *
     * "app.onactivated"
     *
     * does not match.
     */
    const whiteSpaceRegex = /\s+/g;

    // Keep sourceFile handy so we don't have to search for it every time we need to call `getText`.
    let curCancellationToken: CancellationToken;
    let curSourceFile: SourceFile;

    /**
     * For performance, we keep navigation bar parents on a stack rather than passing them through each recursion.
     * `parent` is the current parent and is *not* stored in parentsStack.
     * `startNode` sets a new parent and `endNode` returns to the previous parent.
     */
    let parentsStack: NavigationBarNode[] = [];
    let parent: NavigationBarNode;

    // NavigationBarItem requires an array, but will not mutate it, so just give it this for performance.
    let emptyChildItemArray: NavigationBarItem[] = [];

    /**
     * Represents a navigation bar item and its children.
     * The returned NavigationBarItem is more complicated and doesn't include 'parent', so we use these to do work before converting.
     */
    interface NavigationBarNode {
        node: Node;
        name: DeclarationName | undefined;
        additionalNodes: Node[] | undefined;
        parent: NavigationBarNode | undefined; // Present for all but root node
        children: NavigationBarNode[] | undefined;
        indent: number; // # of parents
    }

    export function getNavigationBarItems(sourceFile: SourceFile, cancellationToken: CancellationToken): NavigationBarItem[] {
        curCancellationToken = cancellationToken;
        curSourceFile = sourceFile;
        try {
            return map(topLevelItems(rootNavigationBarNode(sourceFile)), convertToTopLevelItem);
        }
        finally {
            reset();
        }
    }

    export function getNavigationTree(sourceFile: SourceFile, cancellationToken: CancellationToken): NavigationTree {
        curCancellationToken = cancellationToken;
        curSourceFile = sourceFile;
        try {
            return convertToTree(rootNavigationBarNode(sourceFile));
        }
        finally {
            reset();
        }
    }

    function reset() {
        curSourceFile = undefined!;
        curCancellationToken = undefined!;
        parentsStack = [];
        parent = undefined!;
        emptyChildItemArray = [];
    }

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

    function rootNavigationBarNode(sourceFile: SourceFile): NavigationBarNode {
        Debug.assert(!parentsStack.length);
        const root: NavigationBarNode = { node: sourceFile, name: undefined, additionalNodes: undefined, parent: undefined, children: undefined, indent: 0 };
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
            name: isDeclaration(node) || isExpression(node) ? getNameOfDeclaration(node) : undefined,
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
            mergeChildren(parent.children, parent);
            sortChildren(parent.children);
        }
        parent = parentsStack.pop()!;
    }

    function addNodeWithRecursiveChild(node: Node, child: Node | undefined): void {
        startNode(node);
        addChildrenRecursively(child);
        endNode();
    }

    /** Look for navigation bar items in node's subtree, adding them to the current `parent`. */
    function addChildrenRecursively(node: Node | undefined): void {
        curCancellationToken.throwIfCancellationRequested();

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
                const importClause = <ImportClause>node;
                // Handle default import case e.g.:
                //    import d from "mod";
                if (importClause.name) {
                    addLeafNode(importClause.name);
                }

                // Handle named bindings in imports e.g.:
                //    import * as NS from "mod";
                //    import {a, b as B} from "mod";
                const {namedBindings} = importClause;
                if (namedBindings) {
                    if (namedBindings.kind === SyntaxKind.NamespaceImport) {
                        addLeafNode(namedBindings);
                    }
                    else {
                        for (const element of namedBindings.elements) {
                            addLeafNode(element);
                        }
                    }
                }
                break;

            case SyntaxKind.BindingElement:
            case SyntaxKind.VariableDeclaration:
                const { name, initializer } = <VariableDeclaration | BindingElement>node;
                if (isBindingPattern(name)) {
                    addChildrenRecursively(name);
                }
                else if (initializer && isFunctionOrClassExpression(initializer)) {
                    if (initializer.name) {
                        // Don't add a node for the VariableDeclaration, just for the initializer.
                        addChildrenRecursively(initializer);
                    }
                    else {
                        // Add a node for the VariableDeclaration, but not for the initializer.
                        startNode(node);
                        forEachChild(initializer, addChildrenRecursively);
                        endNode();
                    }
                }
                else {
                    addNodeWithRecursiveChild(node, initializer);
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

            case SyntaxKind.BinaryExpression: {
                const special = getAssignmentDeclarationKind(node as BinaryExpression);
                switch (special) {
                    case AssignmentDeclarationKind.ExportsProperty:
                    case AssignmentDeclarationKind.ModuleExports:
                    case AssignmentDeclarationKind.PrototypeProperty:
                    case AssignmentDeclarationKind.Prototype:
                        addNodeWithRecursiveChild(node, (node as BinaryExpression).right);
                        return;
                    case AssignmentDeclarationKind.ThisProperty:
                    case AssignmentDeclarationKind.Property:
                    case AssignmentDeclarationKind.None:
                    case AssignmentDeclarationKind.ObjectDefinePropertyValue:
                    case AssignmentDeclarationKind.ObjectDefinePropertyExports:
                    case AssignmentDeclarationKind.ObjectDefinePrototypeProperty:
                        break;
                    default:
                        Debug.assertNever(special);
                }
            }
            // falls through

            default:
                if (hasJSDocNodes(node)) {
                    forEach(node.jsDoc, jsDoc => {
                        forEach(jsDoc.tags, tag => {
                            if (isJSDocTypeAlias(tag)) {
                                addLeafNode(tag);
                            }
                        });
                    });
                }

                forEachChild(node, addChildrenRecursively);
        }
    }

    /** Merge declarations of the same kind. */
    function mergeChildren(children: NavigationBarNode[], node: NavigationBarNode): void {
        const nameToItems = createMap<NavigationBarNode | NavigationBarNode[]>();
        filterMutate(children, child => {
            const declName = getNameOfDeclaration(<Declaration>child.node);
            const name = declName && nodeText(declName);
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
                    if (tryMerge(itemWithSameName, child, node)) {
                        return false;
                    }
                }
                itemsWithSameName.push(child);
                return true;
            }
            else {
                const itemWithSameName = itemsWithSameName;
                if (tryMerge(itemWithSameName, child, node)) {
                    return false;
                }
                nameToItems.set(name, [itemWithSameName, child]);
                return true;
            }
        });
    }

    function tryMerge(a: NavigationBarNode, b: NavigationBarNode, parent: NavigationBarNode): boolean {
        if (shouldReallyMerge(a.node, b.node, parent)) {
            merge(a, b);
            return true;
        }
        return false;
    }

    /** a and b have the same name, but they may not be mergeable. */
    function shouldReallyMerge(a: Node, b: Node, parent: NavigationBarNode): boolean {
        if (a.kind !== b.kind || a.parent !== b.parent && !(isOwnChild(a, parent) && isOwnChild(b, parent))) {
            return false;
        }
        switch (a.kind) {
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
                return hasModifier(a, ModifierFlags.Static) === hasModifier(b, ModifierFlags.Static);
            case SyntaxKind.ModuleDeclaration:
                return areSameModule(<ModuleDeclaration>a, <ModuleDeclaration>b);
            default:
                return true;
        }
    }

    // We want to merge own children like `I` in in `module A { interface I {} } module A { interface I {} }`
    // We don't want to merge unrelated children like `m` in `const o = { a: { m() {} }, b: { m() {} } };`
    function isOwnChild(n: Node, parent: NavigationBarNode): boolean {
        const par = isModuleBlock(n.parent) ? n.parent.parent : n.parent;
        return par === parent.node || contains(parent.additionalNodes, par);
    }

    // We use 1 NavNode to represent 'A.B.C', but there are multiple source nodes.
    // Only merge module nodes that have the same chain. Don't merge 'A.B.C' with 'A'!
    function areSameModule(a: ModuleDeclaration, b: ModuleDeclaration): boolean {
        // TODO: GH#18217
        return a.body!.kind === b.body!.kind && (a.body!.kind !== SyntaxKind.ModuleDeclaration || areSameModule(<ModuleDeclaration>a.body, <ModuleDeclaration>b.body));
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
            mergeChildren(target.children, target);
            sortChildren(target.children);
        }
    }

    /** Recursively ensure that each NavNode's children are in sorted order. */
    function sortChildren(children: NavigationBarNode[]): void {
        children.sort(compareChildren);
    }

    function compareChildren(child1: NavigationBarNode, child2: NavigationBarNode) {
        return compareStringsCaseSensitiveUI(tryGetName(child1.node)!, tryGetName(child2.node)!) // TODO: GH#18217
            || compareValues(navigationBarNodeKind(child1), navigationBarNodeKind(child2));
    }

    /**
     * This differs from getItemName because this is just used for sorting.
     * We only sort nodes by name that have a more-or-less "direct" name, as opposed to `new()` and the like.
     * So `new()` can still come before an `aardvark` method.
     */
    function tryGetName(node: Node): string | undefined {
        if (node.kind === SyntaxKind.ModuleDeclaration) {
            return getModuleName(<ModuleDeclaration>node);
        }

        const declName = getNameOfDeclaration(<Declaration>node);
        if (declName && isPropertyName(declName)) {
            return unescapeLeadingUnderscores(getPropertyNameForPropertyNameNode(declName)!); // TODO: GH#18217
        }
        switch (node.kind) {
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction:
            case SyntaxKind.ClassExpression:
                return getFunctionOrClassName(<FunctionExpression | ArrowFunction | ClassExpression>node);
            default:
                return undefined;
        }
    }

    function getItemName(node: Node, name: Node | undefined): string {
        if (node.kind === SyntaxKind.ModuleDeclaration) {
            return getModuleName(<ModuleDeclaration>node);
        }

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
                // We may get a string with newlines or other whitespace in the case of an object dereference
                // (eg: "app\n.onactivated"), so we should remove the whitespace for readabiltiy in the
                // navigation bar.
                return getFunctionOrClassName(<ArrowFunction | FunctionExpression | ClassExpression>node);
            case SyntaxKind.Constructor:
                return "constructor";
            case SyntaxKind.ConstructSignature:
                return "new()";
            case SyntaxKind.CallSignature:
                return "()";
            case SyntaxKind.IndexSignature:
                return "[]";
            default:
                return "<unknown>";
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
                case SyntaxKind.JSDocCallbackTag:
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

                switch (navigationBarNodeKind(item.parent!)) {
                    case SyntaxKind.ModuleBlock:
                    case SyntaxKind.SourceFile:
                    case SyntaxKind.MethodDeclaration:
                    case SyntaxKind.Constructor:
                        return true;
                    default:
                        return hasSomeImportantChild(item);
                }
            }
            function hasSomeImportantChild(item: NavigationBarNode): boolean {
                return some(item.children, child => {
                    const childKind = navigationBarNodeKind(child);
                    return childKind !== SyntaxKind.VariableDeclaration && childKind !== SyntaxKind.BindingElement;
                });
            }
        }
    }

    function convertToTree(n: NavigationBarNode): NavigationTree {
        return {
            text: getItemName(n.node, n.name),
            kind: getNodeKind(n.node),
            kindModifiers: getModifiers(n.node),
            spans: getSpans(n),
            nameSpan: n.name && getNodeSpan(n.name),
            childItems: map(n.children, convertToTree)
        };
    }

    function convertToTopLevelItem(n: NavigationBarNode): NavigationBarItem {
        return {
            text: getItemName(n.node, n.name),
            kind: getNodeKind(n.node),
            kindModifiers: getModifiers(n.node),
            spans: getSpans(n),
            childItems: map(n.children, convertToChildItem) || emptyChildItemArray,
            indent: n.indent,
            bolded: false,
            grayed: false
        };

        function convertToChildItem(n: NavigationBarNode): NavigationBarItem {
            return {
                text: getItemName(n.node, n.name),
                kind: getNodeKind(n.node),
                kindModifiers: getNodeModifiers(n.node),
                spans: getSpans(n),
                childItems: emptyChildItemArray,
                indent: 0,
                bolded: false,
                grayed: false
            };
        }
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

    function getModuleName(moduleDeclaration: ModuleDeclaration): string {
        // We want to maintain quotation marks.
        if (isAmbientModule(moduleDeclaration)) {
            return getTextOfNode(moduleDeclaration.name);
        }

        // Otherwise, we need to aggregate each identifier to build up the qualified name.
        const result: string[] = [];

        result.push(getTextOfIdentifierOrLiteral(moduleDeclaration.name));

        while (moduleDeclaration.body && moduleDeclaration.body.kind === SyntaxKind.ModuleDeclaration) {
            moduleDeclaration = <ModuleDeclaration>moduleDeclaration.body;

            result.push(getTextOfIdentifierOrLiteral(moduleDeclaration.name));
        }

        return result.join(".");
    }

    /**
     * For 'module A.B.C', we want to get the node for 'C'.
     * We store 'A' as associated with a NavNode, and use getModuleName to traverse down again.
     */
    function getInteriorModule(decl: ModuleDeclaration): ModuleDeclaration {
        return decl.body && isModuleDeclaration(decl.body) ? getInteriorModule(decl.body) : decl;
    }

    function isComputedProperty(member: EnumMember): boolean {
        return !member.name || member.name.kind === SyntaxKind.ComputedPropertyName;
    }

    function getNodeSpan(node: Node): TextSpan {
        return node.kind === SyntaxKind.SourceFile ? createTextSpanFromRange(node) : createTextSpanFromNode(node, curSourceFile);
    }

    function getModifiers(node: Node): string {
        if (node.parent && node.parent.kind === SyntaxKind.VariableDeclaration) {
            node = node.parent;
        }
        return getNodeModifiers(node);
    }

    function getFunctionOrClassName(node: FunctionExpression | FunctionDeclaration | ArrowFunction | ClassLikeDeclaration): string {
        const { parent } = node;
        if (node.name && getFullWidth(node.name) > 0) {
            return declarationNameToString(node.name);
        }
        // See if it is a var initializer. If so, use the var name.
        else if (isVariableDeclaration(parent)) {
            return declarationNameToString(parent.name);
        }
        // See if it is of the form "<expr> = function(){...}". If so, use the text from the left-hand side.
        else if (isBinaryExpression(parent) && parent.operatorToken.kind === SyntaxKind.EqualsToken) {
            return nodeText(parent.left).replace(whiteSpaceRegex, "");
        }
        // See if it is a property assignment, and if so use the property name
        else if (isPropertyAssignment(parent)) {
            return nodeText(parent.name);
        }
        // Default exports are named "default"
        else if (getModifierFlags(node) & ModifierFlags.Default) {
            return "default";
        }
        else if (isClassLike(node)) {
            return "<class>";
        }
        else if (isCallExpression(parent)) {
            const name = getCalledExpressionName(parent.expression);
            if (name !== undefined) {
                const args = mapDefined(parent.arguments, a => isStringLiteral(a) ? a.getText(curSourceFile) : undefined).join(", ");
                return `${name}(${args}) callback`;
            }
        }
        return "<function>";
    }

    function getCalledExpressionName(expr: Expression): string | undefined {
        if (isIdentifier(expr)) {
            return expr.text;
        }
        else if (isPropertyAccessExpression(expr)) {
            const left = getCalledExpressionName(expr.expression);
            const right = expr.name.text;
            return left === undefined ? right : `${left}.${right}`;
        }
        else {
            return undefined;
        }
    }

    function isFunctionOrClassExpression(node: Node): node is ArrowFunction | FunctionExpression | ClassExpression {
        switch (node.kind) {
            case SyntaxKind.ArrowFunction:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ClassExpression:
                return true;
            default:
                return false;
        }
    }
}
