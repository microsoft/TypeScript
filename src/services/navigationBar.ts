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

    /**
     * Maximum amount of characters to return
     * The amount was chosen arbitrarily.
     */
    const maxLength = 150;

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

    const trackedEs5ClassesStack: (Map<boolean> | undefined)[] = [];
    let trackedEs5Classes: Map<boolean> | undefined;

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
            return map(primaryNavBarMenuItems(rootNavigationBarNode(sourceFile)), convertToPrimaryNavBarMenuItem);
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
        return cleanText(node.getText(curSourceFile));
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

    function addLeafNode(node: Node, name?: DeclarationName): void {
        pushChild(parent, emptyNavigationBarNode(node, name));
    }

    function emptyNavigationBarNode(node: Node, name?: DeclarationName): NavigationBarNode {
        return {
            node,
            name: name || (isDeclaration(node) || isExpression(node) ? getNameOfDeclaration(node) : undefined),
            additionalNodes: undefined,
            parent,
            children: undefined,
            indent: parent.indent + 1
        };
    }

    function addTrackedEs5Class(name: string) {
        if (!trackedEs5Classes) {
            trackedEs5Classes = createMap();
        }
        trackedEs5Classes.set(name, true);
    }
    function endNestedNodes(depth: number): void {
        for (let i = 0; i < depth; i++) endNode();
    }
    function startNestedNodes(targetNode: Node, entityName: BindableStaticNameExpression) {
        const names: (PropertyNameLiteral | WellKnownSymbolExpression)[] = [];
        while (!isPropertyNameLiteral(entityName)) {
            const name = getNameOrArgument(entityName);
            const nameText = getElementOrPropertyAccessName(entityName);
            entityName = entityName.expression;
            if (nameText === "prototype" || isPrivateIdentifier(name)) continue;
            names.push(name);
        }
        names.push(entityName);
        for (let i = names.length - 1; i > 0; i--) {
            const name = names[i];
            startNode(targetNode, name);
        }
        return [names.length - 1, names[0]] as const;
    }

    /**
     * Add a new level of NavigationBarNodes.
     * This pushes to the stack, so you must call `endNode` when you are done adding to this node.
     */
    function startNode(node: Node, name?: DeclarationName): void {
        const navNode: NavigationBarNode = emptyNavigationBarNode(node, name);
        pushChild(parent, navNode);

        // Save the old parent
        parentsStack.push(parent);
        trackedEs5ClassesStack.push(trackedEs5Classes);
        trackedEs5Classes = undefined;
        parent = navNode;
    }

    /** Call after calling `startNode` and adding children to it. */
    function endNode(): void {
        if (parent.children) {
            mergeChildren(parent.children, parent);
            sortChildren(parent.children);
        }
        parent = parentsStack.pop()!;
        trackedEs5Classes = trackedEs5ClassesStack.pop();
    }

    function addNodeWithRecursiveChild(node: Node, child: Node | undefined, name?: DeclarationName): void {
        startNode(node, name);
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
                    if (isParameterPropertyDeclaration(param, ctr)) {
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
                const { namedBindings } = importClause;
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

            case SyntaxKind.ShorthandPropertyAssignment:
                addNodeWithRecursiveChild(node, (<ShorthandPropertyAssignment>node).name);
                break;
            case SyntaxKind.SpreadAssignment:
                const { expression } = <SpreadAssignment>node;
                // Use the expression as the name of the SpreadAssignment, otherwise show as <unknown>.
                isIdentifier(expression) ? addLeafNode(node, expression) : addLeafNode(node);
                break;
            case SyntaxKind.BindingElement:
            case SyntaxKind.PropertyAssignment:
            case SyntaxKind.VariableDeclaration:
                const { name, initializer } = <VariableDeclaration | PropertyAssignment | BindingElement>node;
                if (isBindingPattern(name)) {
                    addChildrenRecursively(name);
                }
                else if (initializer && isFunctionOrClassExpression(initializer)) {
                    // Add a node for the VariableDeclaration, but not for the initializer.
                    startNode(node);
                    forEachChild(initializer, addChildrenRecursively);
                    endNode();
                }
                else {
                    addNodeWithRecursiveChild(node, initializer);
                }
                break;

            case SyntaxKind.FunctionDeclaration:
                const nameNode = (<FunctionLikeDeclaration>node).name;
                // If we see a function declaration track as a possible ES5 class
                if (nameNode && isIdentifier(nameNode)) {
                    addTrackedEs5Class(nameNode.text);
                }
                addNodeWithRecursiveChild(node, (<FunctionLikeDeclaration>node).body);
                break;
            case SyntaxKind.ArrowFunction:
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

            case SyntaxKind.ExportAssignment: {
                const expression = (<ExportAssignment>node).expression;
                if (isObjectLiteralExpression(expression)) {
                    startNode(node);
                    addChildrenRecursively(expression);
                    endNode();
                }
                else {
                    addLeafNode(node);
                }
                break;
            }
            case SyntaxKind.ExportSpecifier:
            case SyntaxKind.ImportEqualsDeclaration:
            case SyntaxKind.IndexSignature:
            case SyntaxKind.CallSignature:
            case SyntaxKind.ConstructSignature:
            case SyntaxKind.TypeAliasDeclaration:
                addLeafNode(node);
                break;

            case SyntaxKind.CallExpression:
            case SyntaxKind.BinaryExpression: {
                const special = getAssignmentDeclarationKind(node as BinaryExpression);
                switch (special) {
                    case AssignmentDeclarationKind.ExportsProperty:
                    case AssignmentDeclarationKind.ModuleExports:
                        addNodeWithRecursiveChild(node, (node as BinaryExpression).right);
                        return;
                    case AssignmentDeclarationKind.Prototype:
                    case AssignmentDeclarationKind.PrototypeProperty: {
                        const binaryExpression = (node as BinaryExpression);
                        const assignmentTarget = binaryExpression.left as PropertyAccessExpression;

                        const prototypeAccess = special === AssignmentDeclarationKind.PrototypeProperty ?
                            assignmentTarget.expression as PropertyAccessExpression :
                            assignmentTarget;

                        let depth = 0;
                        let className: PropertyNameLiteral | WellKnownSymbolExpression;
                        // If we see a prototype assignment, start tracking the target as a class
                        // This is only done for simple classes not nested assignments.
                        if (isIdentifier(prototypeAccess.expression)) {
                            addTrackedEs5Class(prototypeAccess.expression.text);
                            className = prototypeAccess.expression;
                        }
                        else {
                            [depth, className] = startNestedNodes(binaryExpression, prototypeAccess.expression as EntityNameExpression);
                        }
                        if (special === AssignmentDeclarationKind.Prototype) {
                            if (isObjectLiteralExpression(binaryExpression.right)) {
                                if (binaryExpression.right.properties.length > 0) {
                                    startNode(binaryExpression, className);
                                        forEachChild(binaryExpression.right, addChildrenRecursively);
                                    endNode();
                                }
                            }
                        }
                        else if (isFunctionExpression(binaryExpression.right) || isArrowFunction(binaryExpression.right)) {
                            addNodeWithRecursiveChild(node,
                                binaryExpression.right,
                                className);
                        }
                        else {
                            startNode(binaryExpression, className);
                                addNodeWithRecursiveChild(node, binaryExpression.right, assignmentTarget.name);
                            endNode();
                        }
                        endNestedNodes(depth);
                        return;
                    }
                    case AssignmentDeclarationKind.ObjectDefinePropertyValue:
                    case AssignmentDeclarationKind.ObjectDefinePrototypeProperty: {
                        const defineCall = node as BindableObjectDefinePropertyCall;
                        const className = special === AssignmentDeclarationKind.ObjectDefinePropertyValue ?
                            defineCall.arguments[0] :
                            (defineCall.arguments[0] as PropertyAccessExpression).expression as EntityNameExpression;

                        const memberName = defineCall.arguments[1];
                        const [depth, classNameIdentifier] = startNestedNodes(node, className);
                            startNode(node, classNameIdentifier);
                                startNode(node, setTextRange(createIdentifier(memberName.text), memberName));
                                    addChildrenRecursively((node as CallExpression).arguments[2]);
                                endNode();
                            endNode();
                        endNestedNodes(depth);
                        return;
                    }
                    case AssignmentDeclarationKind.Property: {
                        const binaryExpression = (node as BinaryExpression);
                        const assignmentTarget = binaryExpression.left as PropertyAccessExpression | BindableElementAccessExpression;
                        const targetFunction = assignmentTarget.expression;
                        if (isIdentifier(targetFunction) && getElementOrPropertyAccessName(assignmentTarget) !== "prototype" &&
                            trackedEs5Classes && trackedEs5Classes.has(targetFunction.text)) {
                            if (isFunctionExpression(binaryExpression.right) || isArrowFunction(binaryExpression.right)) {
                                addNodeWithRecursiveChild(node, binaryExpression.right, targetFunction);
                            }
                            else if (isBindableStaticAccessExpression(assignmentTarget)) {
                                startNode(binaryExpression, targetFunction);
                                    addNodeWithRecursiveChild(binaryExpression.left, binaryExpression.right, getNameOrArgument(assignmentTarget));
                                endNode();
                            }
                            return;
                        }
                        break;
                    }
                    case AssignmentDeclarationKind.ThisProperty:
                    case AssignmentDeclarationKind.None:
                    case AssignmentDeclarationKind.ObjectDefinePropertyExports:
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
        filterMutate(children, (child, index) => {
            const declName = child.name || getNameOfDeclaration(<Declaration>child.node);
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
                    if (tryMerge(itemWithSameName, child, index, node)) {
                        return false;
                    }
                }
                itemsWithSameName.push(child);
                return true;
            }
            else {
                const itemWithSameName = itemsWithSameName;
                if (tryMerge(itemWithSameName, child, index, node)) {
                    return false;
                }
                nameToItems.set(name, [itemWithSameName, child]);
                return true;
            }
        });
    }
    const isEs5ClassMember: Record<AssignmentDeclarationKind, boolean> = {
        [AssignmentDeclarationKind.Property]: true,
        [AssignmentDeclarationKind.PrototypeProperty]: true,
        [AssignmentDeclarationKind.ObjectDefinePropertyValue]: true,
        [AssignmentDeclarationKind.ObjectDefinePrototypeProperty]: true,
        [AssignmentDeclarationKind.None]: false,
        [AssignmentDeclarationKind.ExportsProperty]: false,
        [AssignmentDeclarationKind.ModuleExports]: false,
        [AssignmentDeclarationKind.ObjectDefinePropertyExports]: false,
        [AssignmentDeclarationKind.Prototype]: true,
        [AssignmentDeclarationKind.ThisProperty]: false,
    };
    function tryMergeEs5Class(a: NavigationBarNode, b: NavigationBarNode, bIndex: number, parent: NavigationBarNode): boolean | undefined {

        function isPossibleConstructor(node: Node) {
            return isFunctionExpression(node) || isFunctionDeclaration(node) || isVariableDeclaration(node);
        }
        const bAssignmentDeclarationKind = isBinaryExpression(b.node) || isCallExpression(b.node) ?
            getAssignmentDeclarationKind(b.node) :
            AssignmentDeclarationKind.None;

        const aAssignmentDeclarationKind = isBinaryExpression(a.node) || isCallExpression(a.node) ?
            getAssignmentDeclarationKind(a.node) :
            AssignmentDeclarationKind.None;

        // We treat this as an es5 class and merge the nodes in in one of several cases
        if ((isEs5ClassMember[bAssignmentDeclarationKind] && isEs5ClassMember[aAssignmentDeclarationKind]) // merge two class elements
            || (isPossibleConstructor(a.node) && isEs5ClassMember[bAssignmentDeclarationKind]) // ctor function & member
            || (isPossibleConstructor(b.node) && isEs5ClassMember[aAssignmentDeclarationKind]) // member & ctor function
            || (isClassDeclaration(a.node) && isEs5ClassMember[bAssignmentDeclarationKind]) // class (generated) & member
            || (isClassDeclaration(b.node) && isEs5ClassMember[aAssignmentDeclarationKind]) // member & class (generated)
            || (isClassDeclaration(a.node) && isPossibleConstructor(b.node)) // class (generated) & ctor
            || (isClassDeclaration(b.node) && isPossibleConstructor(a.node)) // ctor & class (generated)
            ) {

            let lastANode = a.additionalNodes && lastOrUndefined(a.additionalNodes) || a.node;

            if ((!isClassDeclaration(a.node) && !isClassDeclaration(b.node)) // If neither outline node is a class
                || isPossibleConstructor(a.node) || isPossibleConstructor(b.node) // If either function is a constructor function
                ) {
                const ctorFunction = isPossibleConstructor(a.node) ? a.node :
                    isPossibleConstructor(b.node) ? b.node :
                    undefined;

                if (ctorFunction !== undefined) {
                    const ctorNode = setTextRange(
                        createConstructor(/* decorators */ undefined, /* modifiers */ undefined, [], /* body */ undefined),
                        ctorFunction);
                    const ctor = emptyNavigationBarNode(ctorNode);
                    ctor.indent = a.indent + 1;
                    ctor.children = a.node === ctorFunction ? a.children : b.children;
                    a.children = a.node === ctorFunction ? concatenate([ctor], b.children || [b]) : concatenate(a.children || [a], [ctor]);
                }
                else {
                    if (a.children || b.children) {
                        a.children = concatenate(a.children || [a], b.children || [b]);
                        if (a.children) {
                            mergeChildren(a.children, a);
                            sortChildren(a.children);
                        }
                    }
                }

                lastANode = a.node = setTextRange(createClassDeclaration(
                    /* decorators */ undefined,
                    /* modifiers */ undefined,
                    a.name as Identifier || createIdentifier("__class__"),
                    /* typeParameters */ undefined,
                    /* heritageClauses */ undefined,
                    []
                ), a.node);
            }
            else {
                a.children = concatenate(a.children, b.children);
                if (a.children) {
                    mergeChildren(a.children, a);
                }
            }

            const bNode = b.node;
            // We merge if the outline node previous to b (bIndex - 1) is already part of the current class
            // We do this so that statements between class members that do not generate outline nodes do not split up the class outline:
            // Ex This should produce one outline node C:
            //    function C() {}; a = 1; C.prototype.m = function () {}
            // Ex This will produce 3 outline nodes: C, a, C
            //    function C() {}; let a = 1; C.prototype.m = function () {}
            if (parent.children![bIndex - 1].node.end === lastANode.end) {
                setTextRange(lastANode, { pos: lastANode.pos, end: bNode.end });
            }
            else {
                if (!a.additionalNodes) a.additionalNodes = [];
                a.additionalNodes.push(setTextRange(createClassDeclaration(
                    /* decorators */ undefined,
                    /* modifiers */ undefined,
                    a.name as Identifier || createIdentifier("__class__"),
                    /* typeParameters */ undefined,
                    /* heritageClauses */ undefined,
                    []
                ), b.node));
            }
            return true;
        }
        return bAssignmentDeclarationKind === AssignmentDeclarationKind.None ? false : true;
    }

    function tryMerge(a: NavigationBarNode, b: NavigationBarNode, bIndex: number, parent: NavigationBarNode): boolean {
        // const v = false as boolean;
        if (tryMergeEs5Class(a, b, bIndex, parent)) {
            return true;
        }
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
                return hasSyntacticModifier(a, ModifierFlags.Static) === hasSyntacticModifier(b, ModifierFlags.Static);
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
            const propertyName = getPropertyNameForPropertyNameNode(declName);
            return propertyName && unescapeLeadingUnderscores(propertyName);
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
            return cleanText(getModuleName(<ModuleDeclaration>node));
        }

        if (name) {
            const text = isIdentifier(name) ? name.text
                : isElementAccessExpression(name) ? `[${nodeText(name.argumentExpression)}]`
                : nodeText(name);
            if (text.length > 0) {
                return cleanText(text);
            }
        }

        switch (node.kind) {
            case SyntaxKind.SourceFile:
                const sourceFile = <SourceFile>node;
                return isExternalModule(sourceFile)
                    ? `"${escapeString(getBaseFileName(removeFileExtension(normalizePath(sourceFile.fileName))))}"`
                    : "<global>";
            case SyntaxKind.ExportAssignment:
                return isExportAssignment(node) && node.isExportEquals ? InternalSymbolName.ExportEquals : InternalSymbolName.Default;

            case SyntaxKind.ArrowFunction:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.ClassExpression:
                if (getSyntacticModifierFlags(node) & ModifierFlags.Default) {
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

    /** Flattens the NavNode tree to a list of items to appear in the primary navbar menu. */
    function primaryNavBarMenuItems(root: NavigationBarNode): NavigationBarNode[] {
        // The primary (middle) navbar menu displays the general code navigation hierarchy, similar to the navtree.
        // The secondary (right) navbar menu displays the child items of whichever primary item is selected.
        // Some less interesting items without their own child navigation items (e.g. a local variable declaration) only show up in the secondary menu.
        const primaryNavBarMenuItems: NavigationBarNode[] = [];
        function recur(item: NavigationBarNode) {
            if (shouldAppearInPrimaryNavBarMenu(item)) {
                primaryNavBarMenuItems.push(item);
                if (item.children) {
                    for (const child of item.children) {
                        recur(child);
                    }
                }
            }
        }
        recur(root);
        return primaryNavBarMenuItems;

        /** Determines if a node should appear in the primary navbar menu. */
        function shouldAppearInPrimaryNavBarMenu(item: NavigationBarNode): boolean {
            // Items with children should always appear in the primary navbar menu.
            if (item.children) {
                return true;
            }

            // Some nodes are otherwise important enough to always include in the primary navigation menu.
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
                        return false;
                }
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

    function convertToPrimaryNavBarMenuItem(n: NavigationBarNode): NavigationBarItem {
        return {
            text: getItemName(n.node, n.name),
            kind: getNodeKind(n.node),
            kindModifiers: getModifiers(n.node),
            spans: getSpans(n),
            childItems: map(n.children, convertToSecondaryNavBarMenuItem) || emptyChildItemArray,
            indent: n.indent,
            bolded: false,
            grayed: false
        };

        function convertToSecondaryNavBarMenuItem(n: NavigationBarNode): NavigationBarItem {
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
            return cleanText(declarationNameToString(node.name));
        }
        // See if it is a var initializer. If so, use the var name.
        else if (isVariableDeclaration(parent)) {
            return cleanText(declarationNameToString(parent.name));
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
        else if (getSyntacticModifierFlags(node) & ModifierFlags.Default) {
            return "default";
        }
        else if (isClassLike(node)) {
            return "<class>";
        }
        else if (isCallExpression(parent)) {
            let name = getCalledExpressionName(parent.expression);
            if (name !== undefined) {
                name = cleanText(name);

                if (name.length > maxLength) {
                    return `${name} callback`;
                }

                const args = cleanText(mapDefined(parent.arguments, a => isStringLiteralLike(a) ? a.getText(curSourceFile) : undefined).join(", "));
                return `${name}(${args}) callback`;
            }
        }
        return "<function>";
    }

    // See also 'tryGetPropertyAccessOrIdentifierToString'
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

    function cleanText(text: string): string {
        // Truncate to maximum amount of characters as we don't want to do a big replace operation.
        text = text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

        // Replaces ECMAScript line terminators and removes the trailing `\` from each line:
        // \n - Line Feed
        // \r - Carriage Return
        // \u2028 - Line separator
        // \u2029 - Paragraph separator
        return text.replace(/\\?(\r?\n|\r|\u2028|\u2029)/g, "");
    }
}
