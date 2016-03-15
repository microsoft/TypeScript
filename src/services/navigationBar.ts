/// <reference path='services.ts' />

/* @internal */
namespace ts.NavigationBar {
    export function getNavigationBarItems(sourceFile: SourceFile, compilerOptions: CompilerOptions): ts.NavigationBarItem[]  {
        // TODO: Handle JS files differently in 'navbar' calls for now, but ideally we should unify
        // the 'navbar' and 'navto' logic for TypeScript and JavaScript.
        if (isSourceFileJavaScript(sourceFile)) {
            return getJsNavigationBarItems(sourceFile, compilerOptions);
        }

        // If the source file has any child items, then it included in the tree
        // and takes lexical ownership of all other top-level items.
        let hasGlobalNode = false;

        return getItemsWorker(getTopLevelNodes(sourceFile), createTopLevelItem);

        function getIndent(node: Node): number {
            // If we have a global node in the tree,
            // then it adds an extra layer of depth to all subnodes.
            let indent = hasGlobalNode ? 1 : 0;

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
            let childNodes: Node[] = [];

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
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.EnumDeclaration:
                    case SyntaxKind.InterfaceDeclaration:
                    case SyntaxKind.ModuleDeclaration:
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.ImportEqualsDeclaration:
                    case SyntaxKind.ImportSpecifier:
                    case SyntaxKind.ExportSpecifier:
                        childNodes.push(node);
                        break;
                }
            }

            //for (let i = 0, n = nodes.length; i < n; i++) {
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
            //}
            forEach(nodes, visit);
            return sortNodes(childNodes);
        }

        function getTopLevelNodes(node: SourceFile): Node[] {
            let topLevelNodes: Node[] = [];
            topLevelNodes.push(node);

            addTopLevelNodes(node.statements, topLevelNodes);

            return topLevelNodes;
        }

        function sortNodes(nodes: Node[]): Node[] {
            return nodes.slice(0).sort((n1: Declaration, n2: Declaration) => {
                if (n1.name && n2.name) {
                    return getPropertyNameForPropertyNameNode(n1.name).localeCompare(getPropertyNameForPropertyNameNode(n2.name));
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

            for (let node of nodes) {
                switch (node.kind) {
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.EnumDeclaration:
                    case SyntaxKind.InterfaceDeclaration:
                        topLevelNodes.push(node);
                        break;

                    case SyntaxKind.ModuleDeclaration:
                        let moduleDeclaration = <ModuleDeclaration>node;
                        topLevelNodes.push(node);
                        addTopLevelNodes((<Block>getInnermostModule(moduleDeclaration).body).statements, topLevelNodes);
                        break;

                    case SyntaxKind.FunctionDeclaration:
                        let functionDeclaration = <FunctionLikeDeclaration>node;
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
            let items: ts.NavigationBarItem[] = [];

            let keyToItem: Map<NavigationBarItem> = {};

            for (let child of nodes) {
                let item = createItem(child);
                if (item !== undefined) {
                    if (item.text.length > 0) {
                        let key = item.text + "-" + item.kind + "-" + item.indent;

                        let itemWithSameName = keyToItem[key];
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
                for (let sourceChild of source.childItems) {
                    for (let targetChild of target.childItems) {
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

                case SyntaxKind.EnumMember:
                    return createItem(node, getTextOfNode((<EnumMember>node).name), ts.ScriptElementKind.memberVariableElement);

                case SyntaxKind.CallSignature:
                    return createItem(node, "()", ts.ScriptElementKind.callSignatureElement);

                case SyntaxKind.ConstructSignature:
                    return createItem(node, "new()", ts.ScriptElementKind.constructSignatureElement);

                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.PropertySignature:
                    return createItem(node, getTextOfNode((<PropertyDeclaration>node).name), ts.ScriptElementKind.memberVariableElement);

                case SyntaxKind.FunctionDeclaration:
                    return createItem(node, getTextOfNode((<FunctionLikeDeclaration>node).name), ts.ScriptElementKind.functionElement);

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
                if (isAmbientModule(moduleDeclaration)) {
                    return getTextOfNode(moduleDeclaration.name);
                }

                // Otherwise, we need to aggregate each identifier to build up the qualified name.
                let result: string[] = [];

                result.push(moduleDeclaration.name.text);

                while (moduleDeclaration.body && moduleDeclaration.body.kind === SyntaxKind.ModuleDeclaration) {
                    moduleDeclaration = <ModuleDeclaration>moduleDeclaration.body;

                    result.push(moduleDeclaration.name.text);
                }

                return result.join(".");
            }

            function createModuleItem(node: ModuleDeclaration): NavigationBarItem {
                let moduleName = getModuleName(node);

                let childItems = getItemsWorker(getChildNodes((<Block>getInnermostModule(node).body).statements), createChildItem);

                return getNavigationBarItem(moduleName,
                    ts.ScriptElementKind.moduleElement,
                    getNodeModifiers(node),
                    [getNodeSpan(node)],
                    childItems,
                    getIndent(node));
            }

            function createFunctionItem(node: FunctionDeclaration) {
                if (node.body && node.body.kind === SyntaxKind.Block) {
                    let childItems = getItemsWorker(sortNodes((<Block>node.body).statements), createChildItem);

                    return getNavigationBarItem(!node.name ? "default": node.name.text ,
                        ts.ScriptElementKind.functionElement,
                        getNodeModifiers(node),
                        [getNodeSpan(node)],
                        childItems,
                        getIndent(node));
                }

                return undefined;
            }

            function createSourceFileItem(node: SourceFile): ts.NavigationBarItem {
                let childItems = getItemsWorker(getChildNodes(node.statements), createChildItem);

                if (childItems === undefined || childItems.length === 0) {
                    return undefined;
                }

                hasGlobalNode = true;
                let rootName = isExternalModule(node)
                    ? "\"" + escapeString(getBaseFileName(removeFileExtension(normalizePath(node.fileName)))) + "\""
                    : "<global>"

                return getNavigationBarItem(rootName,
                    ts.ScriptElementKind.moduleElement,
                    ts.ScriptElementKindModifier.none,
                    [getNodeSpan(node)],
                    childItems);
            }

            function createClassItem(node: ClassDeclaration): ts.NavigationBarItem {
                let childItems: NavigationBarItem[];

                if (node.members) {
                    let constructor = <ConstructorDeclaration>forEach(node.members, member => {
                        return member.kind === SyntaxKind.Constructor && member;
                    });

                    // Add the constructor parameters in as children of the class (for property parameters).
                    // Note that *all non-binding pattern named* parameters will be added to the nodes array, but parameters that
                    // are not properties will be filtered out later by createChildItem.
                    let nodes: Node[] = removeDynamicallyNamedProperties(node);
                    if (constructor) {
                        addRange(nodes, filter(constructor.parameters, p => !isBindingPattern(p.name)));
                    }

                    childItems = getItemsWorker(sortNodes(nodes), createChildItem);
                }

                var nodeName = !node.name ? "default" : node.name.text;

                return getNavigationBarItem(
                    nodeName,
                    ts.ScriptElementKind.classElement,
                    getNodeModifiers(node),
                    [getNodeSpan(node)],
                    childItems,
                    getIndent(node));
            }

            function createEnumItem(node: EnumDeclaration): ts.NavigationBarItem {
                let childItems = getItemsWorker(sortNodes(removeComputedProperties(node)), createChildItem);
                return getNavigationBarItem(
                    node.name.text,
                    ts.ScriptElementKind.enumElement,
                    getNodeModifiers(node),
                    [getNodeSpan(node)],
                    childItems,
                    getIndent(node));
            }

            function createIterfaceItem(node: InterfaceDeclaration): ts.NavigationBarItem {
                let childItems = getItemsWorker(sortNodes(removeDynamicallyNamedProperties(node)), createChildItem);
                return getNavigationBarItem(
                    node.name.text,
                    ts.ScriptElementKind.interfaceElement,
                    getNodeModifiers(node),
                    [getNodeSpan(node)],
                    childItems,
                    getIndent(node));
            }
        }

        function removeComputedProperties(node: EnumDeclaration): Declaration[] {
            return filter<Declaration>(node.members, member => member.name === undefined || member.name.kind !== SyntaxKind.ComputedPropertyName);
        }

        /**
         * Like removeComputedProperties, but retains the properties with well known symbol names
         */
        function removeDynamicallyNamedProperties(node: ClassDeclaration | InterfaceDeclaration): Declaration[]{
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
        const anonFnText = "<function>";
        const anonClassText = "<class>";
        let indent = 0;

        let rootName = isExternalModule(sourceFile) ?
            "\"" + escapeString(getBaseFileName(removeFileExtension(normalizePath(sourceFile.fileName)))) + "\""
            : "<global>";

        let sourceFileItem = getNavBarItem(rootName, ScriptElementKind.moduleElement, [getNodeSpan(sourceFile)]);
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

                // If the last item added was an anonymous function expression, and it had no children, discard it.
                if (newItem && newItem.text === anonFnText && newItem.childItems.length === 0) {
                    topItem.childItems.pop();
                }
            }
            else {
                forEachChild(node, visitNode);
            }
        }

        function createNavBarItem(node: Node) : NavigationBarItem {
            switch (node.kind) {
                case SyntaxKind.VariableDeclaration:
                    // Only add to the navbar if at the top-level of the file
                    // Note: "const" and "let" are also SyntaxKind.VariableDeclarations
                    if(node.parent/*VariableDeclarationList*/.parent/*VariableStatement*/
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
            }
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
            if (callExpr.expression.kind !== SyntaxKind.Identifier || callExpr.expression.getText() !== 'define') {
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
            let fnName: string;
            if (fnExpr.name && getFullWidth(fnExpr.name) > 0) {
                // The expression has an identifier, so use that as the name
                fnName = declarationNameToString(fnExpr.name);
            }
            else {
                // See if it is a var initializer. If so, use the var name.
                if (fnExpr.parent.kind === SyntaxKind.VariableDeclaration) {
                    fnName = declarationNameToString((fnExpr.parent as VariableDeclaration).name);
                }
                // See if it is of the form "<expr> = function(){...}". If so, use the text from the left-hand side.
                else if (fnExpr.parent.kind === SyntaxKind.BinaryExpression &&
                         (fnExpr.parent as BinaryExpression).operatorToken.kind === SyntaxKind.EqualsToken) {
                    fnName = (fnExpr.parent as BinaryExpression).left.getText();
                    if (fnName.length > 20) {
                        fnName = fnName.substring(0, 17) + "...";
                    }
                }
                // See if it is a property assignment, and if so use the property name
                else if (fnExpr.parent.kind === SyntaxKind.PropertyAssignment &&
                         (fnExpr.parent as PropertyAssignment).name) {
                    fnName = (fnExpr.parent as PropertyAssignment).name.getText();
                }
                else {
                    fnName = node.kind === SyntaxKind.ClassExpression ? anonClassText : anonFnText;
                }
            }
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
}
